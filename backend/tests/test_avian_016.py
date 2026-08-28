"""Pytest test suite for AvianVision AI neural kernel 016."""
import pytest
from app.ml.avian_module_016 import AvianDetectionPipeline016

def test_density_regression_016():
    pipeline = AvianDetectionPipeline016()
    pts = [(10.0, 20.0), (30.0, 40.0), (50.0, 60.0)]
    res = pipeline.compute_density_regression_map(pts)
    assert "integrated_density" in res
    assert res["estimated_flock_count"] >= 1

def test_biomass_estimation_016():
    pipeline = AvianDetectionPipeline016()
    biomass = pipeline.estimate_morphometric_biomass(1200.0)
    assert biomass > 0.0
