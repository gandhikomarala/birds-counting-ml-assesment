# AvianVision AI - Automated Avian Swarm Counting & Biomass Platform

AvianVision AI is an end-to-end computer vision, density regression, and bioacoustics platform engineered for high-accuracy avian swarm detection, multi-species classification, aerial density mapping, and real-time morphometric biomass estimation.

## Architecture
- **Object Detection & Tracking**: YOLOv8x fine-tuned on aerial avian imagery + ByteTrack Kalman filtering.
- **Swarm Density Estimation**: CSRNet dilated convolutional network for dense flock regression.
- **Morphometric Biomass**: Pixel-area morphometric scaling for live flock weight index computation.
- **Bioacoustic Spectrograms**: Mel-frequency audio transformer for bird call species identification.

## Installation Instructions
```bash
# Clone the repository
git clone git@github.com:gandhikomarala/birds-counting-ml-assesment.git
cd birds-counting-ml-assesment

# Backend dependencies
cd backend
pip install -r requirements.txt

# Frontend dependencies
cd ../frontend
npm install
```

## Build Instructions
```bash
# Build the production frontend distribution
cd frontend
npm run build

# Build with Docker Compose
cd ..
docker-compose build
```

## Run Instructions
```bash
# Start FastAPI backend server
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Start Frontend Dev Server
cd frontend
npm run dev -- --port 3000

# Run all with Docker Compose
docker-compose up -d
```

## Test Instructions
```bash
# Run backend Pytest suite
pytest backend/tests

# Run frontend Vitest suite
cd frontend && npm test
```
