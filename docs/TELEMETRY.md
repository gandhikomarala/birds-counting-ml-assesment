# Telemetry & Vector Analysis Specification

## Movement Vector Calculation
For each active bird track:
$$\Delta x = x_t - x_{t-1}, \quad \Delta y = y_t - y_{t-1}$$
$$\theta = \operatorname{atan2}(\Delta y, \Delta x)$$

## Directional Mapping
- $-22.5^\circ \le \theta < 22.5^\circ$: **EAST**
- $22.5^\circ \le \theta < 67.5^\circ$: **SOUTH-EAST**
- $67.5^\circ \le \theta < 112.5^\circ$: **SOUTH**
- $112.5^\circ \le \theta < 157.5^\circ$: **SOUTH-WEST**
- $\theta \ge 157.5^\circ$ or $\theta < -157.5^\circ$: **WEST**
- $-157.5^\circ \le \theta < -112.5^\circ$: **NORTH-WEST**
- $-112.5^\circ \le \theta < -67.5^\circ$: **NORTH**
- $-67.5^\circ \le \theta < -22.5^\circ$: **NORTH-EAST**
