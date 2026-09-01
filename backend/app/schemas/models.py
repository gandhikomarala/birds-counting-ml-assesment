from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from enum import Enum

class MovementDirection(str, Enum):
    NORTH = "North"
    NORTH_EAST = "North-East"
    EAST = "East"
    SOUTH_EAST = "South-East"
    SOUTH = "South"
    SOUTH_WEST = "South-West"
    WEST = "West"
    NORTH_WEST = "North-West"
    STATIONARY = "Stationary"

class BoundingBox(BaseModel):
    x_min: float
    y_min: float
    x_max: float
    y_max: float
    width: float
    height: float

class Detection(BaseModel):
    detection_id: str
    track_id: int
    common_name: str
    scientific_name: str
    confidence: float
    box: BoundingBox
    direction: MovementDirection
    timestamp: str

class TelemetrySnapshot(BaseModel):
    birds_visible_now: int
    total_unique_tracks: int
    dominant_direction: MovementDirection
    latest_species: str
    session_time_seconds: int

class DetectResponse(BaseModel):
    session_id: str
    frame_id: int
    telemetry: TelemetrySnapshot
    detections: List[Detection]
