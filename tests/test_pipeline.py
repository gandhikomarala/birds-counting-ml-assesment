import pytest
from backend.app.core.engine import CentroidTracker, VisionPipelineEngine, MovementDirection

def test_centroid_tracker_registration():
    tracker = CentroidTracker()
    tid = tracker.register((100.0, 100.0))
    assert tid == 1
    assert tracker.next_track_id == 2
    assert tracker.objects[1] == (100.0, 100.0)

def test_direction_calculation():
    tracker = CentroidTracker()
    tid = tracker.register((100.0, 100.0))
    tracker.history[tid].append((150.0, 50.0)) # Moved East and Up (North-East in screen coords)
    dir_val = tracker.calculate_direction(tid)
    assert dir_val in [MovementDirection.NORTH_EAST, MovementDirection.EAST]

def test_vision_pipeline_frame_processing():
    res = VisionPipelineEngine.process_frame()
    assert res.telemetry.birds_visible_now >= 1
    assert len(res.detections) >= 1
    assert res.detections[0].confidence > 0.8
    assert res.detections[0].scientific_name != ""
