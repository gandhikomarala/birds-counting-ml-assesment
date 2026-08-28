# AvianVision AI - Automated Avian Swarm Counting & Biomass Platform

AvianVision AI is an end-to-end computer vision and bioacoustics platform engineered for high-accuracy avian swarm detection, multi-species classification, aerial density mapping, and real-time morphometric biomass estimation.

## Architecture
- **Object Detection & Tracking**: YOLOv8x fine-tuned on aerial avian imagery + ByteTrack Kalman filtering.
- **Swarm Density Estimation**: CSRNet dilated convolutional network for dense flock regression.
- **Morphometric Biomass**: Pixel-area morphometric scaling for live flock weight index computation.
- **Bioacoustic Spectrograms**: Audio transformer for bird call species identification.

## Quick Start
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev
```
