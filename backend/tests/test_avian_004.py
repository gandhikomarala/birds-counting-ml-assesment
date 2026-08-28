"""Pytest test suite for AvianVision AI neural kernel 004."""
import pytest
from app.ml.avian_module_004 import AvianDetectionPipeline004

def test_density_regression_004():
    pipeline = AvianDetectionPipeline004()
    pts = [(10.0, 20.0), (30.0, 40.0), (50.0, 60.0)]
    res = pipeline.compute_density_regression_map(pts)
    assert "integrated_density" in res
    assert res["estimated_flock_count"] >= 1

def test_biomass_estimation_004():
    pipeline = AvianDetectionPipeline004()
    biomass = pipeline.estimate_morphometric_biomass(1200.0)
    assert biomass > 0.0
