# Computer Vision Pipeline Specification

```
[ Input Frame (Camera/Video/Image) ]
               │
               ▼
   [ Frame Preprocessor ] ──► (Resize, Normalize, Convert Color Space)
               │
               ▼
     [ YOLOv8 Detector ] ──► (Inference Bounding Boxes + Confidence Scores)
               │
               ▼
   [ Species Classifier ] ──► (Crop ROI ──► Taxonomic Classification)
               │
               ▼
    [ Centroid Tracker ] ──► (Track ID Assignment, Velocity & Direction)
               │
               ▼
 [ Telemetry Aggregator ] ──► (WebSocket Broadcast & Live UI Overlay)
```
