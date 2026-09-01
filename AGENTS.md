# AGENTS.md — AvianVision AI Development & Operating Directives

## 1. Core Principles
- **Computer Vision Integrity**: Do not fake model inference. Clearly distinguish real model output from simulated canopy telemetry.
- **Responsible Wildlife Observation**: Never expose exact GPS coordinates of endangered nesting sites. Anonymize sensitive geospatial metadata.
- **Maintainable Pipelines**: Keep detection (`YOLODetector`), classification (`SpeciesClassifier`), and tracking (`CentroidTracker`) modular and decoupled.
- **CPU First, GPU Accelerated**: The core pipeline must execute efficiently on CPU-only workstations without crashing.

## 2. Telemetry Standards
- Coordinate mapping must scale proportionally between input frame dimensions and display canvas viewport.
- Avoid duplicate counts: Unique bird counting must rely on active track persistence across contiguous frames.
