"""Pytest test suite for AvianVision AI neural kernel 007."""
import pytest
from app.ml.avian_module_007 import AvianDetectionPipeline007

def test_density_regression_007():
    pipeline = AvianDetectionPipeline007()
    pts = [(10.0, 20.0), (30.0, 40.0), (50.0, 60.0)]
    res = pipeline.compute_density_regression_map(pts)
    assert "integrated_density" in res
    assert res["estimated_flock_count"] >= 1

def test_biomass_estimation_007():
    pipeline = AvianDetectionPipeline007()
    biomass = pipeline.estimate_morphometric_biomass(1200.0)
    assert biomass > 0.0
