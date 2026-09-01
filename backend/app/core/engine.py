import math
import time
import uuid
from typing import List, Dict, Tuple
from app.schemas.models import Detection, BoundingBox, MovementDirection, TelemetrySnapshot, DetectResponse

SPECIES_CATALOG = [
    {"common": "Bald Eagle", "scientific": "Haliaeetus leucocephalus", "family": "Accipitridae"},
    {"common": "Peregrine Falcon", "scientific": "Falco peregrinus", "family": "Falconidae"},
    {"common": "Great Horned Owl", "scientific": "Bubo virginianus", "family": "Strigidae"},
    {"common": "American Robin", "scientific": "Turdus migratorius", "family": "Turdidae"},
    {"common": "Osprey", "scientific": "Pandion haliaetus", "family": "Pandionidae"}
]

class CentroidTracker:
    def __init__(self, max_disappeared=30):
        self.next_track_id = 1
        self.objects: Dict[int, Tuple[float, float]] = {}
        self.history: Dict[int, List[Tuple[float, float]]] = {}
        self.disappeared: Dict[int, int] = {}

    def register(self, centroid: Tuple[float, float]) -> int:
        track_id = self.next_track_id
        self.objects[track_id] = centroid
        self.history[track_id] = [centroid]
        self.disappeared[track_id] = 0
        self.next_track_id += 1
        return track_id

    def update(self, rects: List[Tuple[float, float, float, float]]) -> List[Tuple[int, Tuple[float, float, float, float]]]:
        if len(rects) == 0:
            return []

        results = []
        for r in rects:
            cx = (r[0] + r[2]) / 2.0
            cy = (r[1] + r[3]) / 2.0
            
            # Simple association
            matched_id = None
            for tid, pt in self.objects.items():
                dist = math.hypot(cx - pt[0], cy - pt[1])
                if dist < 60:
                    matched_id = tid
                    break
            
            if matched_id is None:
                matched_id = self.register((cx, cy))
            else:
                self.objects[matched_id] = (cx, cy)
                self.history[matched_id].append((cx, cy))
            
            results.append((matched_id, r))
        return results

    def calculate_direction(self, track_id: int) -> MovementDirection:
        pts = self.history.get(track_id, [])
        if len(pts) < 2:
            return MovementDirection.NORTH_EAST
        dx = pts[-1][0] - pts[0][0]
        dy = pts[-1][1] - pts[0][1]
        
        angle = math.degrees(math.atan2(dy, dx))
        if -22.5 <= angle < 22.5: return MovementDirection.EAST
        elif 22.5 <= angle < 67.5: return MovementDirection.SOUTH_EAST
        elif 67.5 <= angle < 112.5: return MovementDirection.SOUTH
        elif 112.5 <= angle < 157.5: return MovementDirection.SOUTH_WEST
        elif angle >= 157.5 or angle < -157.5: return MovementDirection.WEST
        elif -157.5 <= angle < -112.5: return MovementDirection.NORTH_WEST
        elif -112.5 <= angle < -67.5: return MovementDirection.NORTH
        else: return MovementDirection.NORTH_EAST

class VisionPipelineEngine:
    tracker = CentroidTracker()
    session_start = time.time()

    @classmethod
    def process_frame(cls, simulated_preset: str = "wetland") -> DetectResponse:
        now_str = time.strftime("%H:%M:%S")
        
        # Sample detected bounding boxes
        sample_boxes = [
            (120.0, 75.0, 260.0, 235.0, SPECIES_CATALOG[0], 0.984),
            (340.0, 130.0, 440.0, 240.0, SPECIES_CATALOG[1], 0.941),
            (470.0, 90.0, 560.0, 190.0, SPECIES_CATALOG[3], 0.892)
        ]
        
        tracked = cls.tracker.update([(b[0], b[1], b[2], b[3]) for b in sample_boxes])
        
        detections = []
        for idx, (tid, rect) in enumerate(tracked):
            meta = sample_boxes[idx][4]
            conf = sample_boxes[idx][5]
            dir_val = cls.tracker.calculate_direction(tid)
            
            detections.append(Detection(
                detection_id=f"DET-{uuid.uuid4().hex[:6].upper()}",
                track_id=tid,
                common_name=meta["common"],
                scientific_name=meta["scientific"],
                confidence=conf,
                box=BoundingBox(
                    x_min=rect[0], y_min=rect[1],
                    x_max=rect[2], y_max=rect[3],
                    width=rect[2]-rect[0], height=rect[3]-rect[1]
                ),
                direction=dir_val,
                timestamp=now_str
            ))
            
        return DetectResponse(
            session_id=f"SESS-{int(cls.session_start)}",
            frame_id=int(time.time() * 10) % 10000,
            telemetry=TelemetrySnapshot(
                birds_visible_now=len(detections),
                total_unique_tracks=cls.tracker.next_track_id - 1,
                dominant_direction=MovementDirection.NORTH_EAST,
                latest_species="Peregrine Falcon",
                session_time_seconds=int(time.time() - cls.session_start)
            ),
            detections=detections
        )
