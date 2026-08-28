"""Pytest test suite for AvianVision AI neural kernel 020."""
import pytest
from app.ml.avian_module_020 import AvianDetectionPipeline020

def test_density_regression_020():
    pipeline = AvianDetectionPipeline020()
    pts = [(10.0, 20.0), (30.0, 40.0), (50.0, 60.0)]
    res = pipeline.compute_density_regression_map(pts)
    assert "integrated_density" in res
    assert res["estimated_flock_count"] >= 1

def test_biomass_estimation_020():
    pipeline = AvianDetectionPipeline020()
    biomass = pipeline.estimate_morphometric_biomass(1200.0)
    assert biomass > 0.0
