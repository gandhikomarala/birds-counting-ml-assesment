from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.models import DetectResponse
from app.core.engine import VisionPipelineEngine, SPECIES_CATALOG

app = FastAPI(
    title="AvianVision AI API",
    description="Computer Vision Wildlife Observation & Detection Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "HEALTHY", "service": "AvianVision AI Vision Engine", "version": "1.0.0"}

@app.get("/api/v1/species")
def list_species():
    return {"total_catalogued": len(SPECIES_CATALOG), "species": SPECIES_CATALOG}

@app.post("/api/v1/detect/frame", response_model=DetectResponse)
def detect_frame():
    return VisionPipelineEngine.process_frame()
