# AvianVision AI — Computer Vision Wildlife Observation Platform

AvianVision AI is an intelligent wildlife observation and computer vision platform designed to detect, classify, track, and analyze avian species from live camera streams, high-resolution imagery, and video recordings.

## Key Features
- **Live Observation Canvas**: Real-time bounding box overlays with confidence ratings and species identification.
- **Taxonomic Classification**: Distinguishes species with common names, scientific Latin binomials, and taxonomy data.
- **Flock Telemetry Engine**: Computes flock movement vectors (North-East, South-West), velocities, and active track counts.
- **Observation History Ledger**: Filterable and searchable chronological log of observed wildlife events.
- **FastAPI Microservices**: Modular REST & WebSocket APIs for real-time frame inference.

## Quick Start
```bash
# Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Docker Deployment
docker-compose up -d --build
```
