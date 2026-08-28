import React, { useState } from 'react';
import { 
  Eye, Activity, Layers, Play, RefreshCw, BarChart2,
  Volume2, ShieldCheck, Cpu, Sliders, MapPin, Sparkles,
  Camera, CheckCircle2, AlertCircle, Info, Radio
} from 'lucide-react';

interface BoundingBox {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  species: string;
  conf: number;
  weightG: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'vision' | 'density' | 'bioacoustics' | 'species'>('vision');
  const [analyzing, setAnalyzing] = useState(false);
  const [confThresh, setConfThresh] = useState(0.45);
  const [showDensityMap, setShowDensityMap] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('flamingos');
  
  const [birdCount, setBirdCount] = useState(84);
  const [biomassKg, setBiomassKg] = useState(268.8);
  const [densityIndex, setDensityIndex] = useState(6.72);
  const [inferenceTime, setInferenceTime] = useState(42.5);

  const [detections, setDetections] = useState<BoundingBox[]>([
    { id: 1, x: 120, y: 80, w: 45, h: 65, species: 'Greater Flamingo', conf: 0.96, weightG: 3250 },
    { id: 2, x: 190, y: 110, w: 40, h: 60, species: 'Greater Flamingo', conf: 0.94, weightG: 3180 },
    { id: 3, x: 260, y: 70, w: 50, h: 70, species: 'Greater Flamingo', conf: 0.98, weightG: 3340 },
    { id: 4, x: 340, y: 130, w: 42, h: 58, species: 'Painted Stork', conf: 0.89, weightG: 2850 },
    { id: 5, x: 420, y: 95, w: 48, h: 62, species: 'Greater Flamingo', conf: 0.92, weightG: 3210 },
    { id: 6, x: 500, y: 150, w: 44, h: 60, species: 'Little Egret', conf: 0.87, weightG: 460 },
  ]);

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      if (selectedScenario === 'flamingos') {
        setBirdCount(84);
        setBiomassKg(268.8);
        setDensityIndex(6.72);
      } else if (selectedScenario === 'pelicans') {
        setBirdCount(42);
        setBiomassKg(399.0);
        setDensityIndex(3.36);
      } else {
        setBirdCount(29);
        setBiomassKg(211.7);
        setDensityIndex(2.32);
      }
      setInferenceTime(38.4);
      setAnalyzing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                AvianVision AI
              </h1>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                v3.2 Computer Vision
              </span>
            </div>
            <p className="text-xs text-slate-400">Automated Avian Swarm Counting, Tracking & Morphometric Biomass Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-medium">YOLOv8x + CSRNet Live</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-xs text-cyan-300 font-medium">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{inferenceTime} ms Latency</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          {/* Controls Card */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Detection & Inference Settings</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                ByteTrack ON
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Ecological Dataset Scenario</label>
                <select 
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="flamingos">Pulicat Lagoon - Wetland Flamingo Swarm (Aerial Drone)</option>
                  <option value="pelicans">Nelapattu Sanctuary - Great White Pelican Island</option>
                  <option value="cranes">Kolleru Lake - Sarus Crane Migratory Corridor</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-400 font-medium">Confidence Threshold</label>
                  <span className="text-xs text-cyan-400 font-bold">{Math.round(confThresh * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min={0.2} 
                  max={0.95} 
                  step={0.05}
                  value={confThresh} 
                  onChange={(e) => setConfThresh(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>CSRNet Density Heatmap Layer</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={showDensityMap}
                  onChange={(e) => setShowDensityMap(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="w-full glow-btn text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Running DeepSORT & Density Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Execute Avian Counting & Biomass Estimation</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-800">
              <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>NMS IoU: 0.45 | Morphometric Index: Active</span>
            </div>
          </div>

          {/* Metrics Tiles */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Total Bird Count</span>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400">{birdCount}</div>
              <span className="text-[10px] text-emerald-400 font-medium">99.1% Detection Precision</span>
            </div>

            <div className="glass-panel rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Estimated Biomass</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">{biomassKg} kg</div>
              <span className="text-[10px] text-emerald-300 font-medium">Morphometric Index</span>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1.5 glass-panel rounded-2xl border border-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                activeTab === 'vision' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Visual Inference</span>
            </button>

            <button
              onClick={() => setActiveTab('bioacoustics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                activeTab === 'bioacoustics' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Bioacoustic Spectrogram</span>
            </button>

            <button
              onClick={() => setActiveTab('species')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                activeTab === 'species' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Species Catalog</span>
            </button>
          </div>

          {/* Visual Workspace Canvas */}
          {activeTab === 'vision' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    Aerial Frame Detection & Bounding Box Tracking
                  </h2>
                  <p className="text-xs text-slate-400">Kalman filter trajectories & centroid velocity vectors</p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Resolution: 1920x1080 FHD</span>
                </div>
              </div>

              {/* Simulation Canvas */}
              <div className="w-full h-80 rounded-xl bg-[#030614] border border-slate-800 relative flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full absolute inset-0">
                  <defs>
                    <pattern id="grid_v" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(51, 65, 85, 0.2)" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid_v)" />

                  {/* Density Overlay if enabled */}
                  {showDensityMap && (
                    <g opacity="0.65">
                      <circle cx="240" cy="120" r="80" fill="#ef4444" filter="blur(20px)" />
                      <circle cx="380" cy="140" r="70" fill="#f59e0b" filter="blur(20px)" />
                      <circle cx="500" cy="160" r="60" fill="#10b981" filter="blur(20px)" />
                    </g>
                  )}

                  {/* Bounding Boxes */}
                  {detections.map((box) => (
                    <g key={box.id}>
                      <rect 
                        x={box.x} 
                        y={box.y} 
                        width={box.w} 
                        height={box.h} 
                        fill="none" 
                        stroke="#06b6d4" 
                        strokeWidth="1.8" 
                        rx="3" 
                      />
                      <rect 
                        x={box.x} 
                        y={box.y - 16} 
                        width="95" 
                        height="16" 
                        fill="#06b6d4" 
                        rx="2" 
                      />
                      <text x={box.x + 4} y={box.y - 4} fill="#050816" fontSize="9" fontWeight="bold">
                        #{box.id} {box.species.split(' ')[0]} ({Math.round(box.conf*100)}%)
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="absolute bottom-3 left-3 glass-panel rounded-xl px-3 py-2 text-[11px] text-slate-300 flex items-center gap-3">
                  <span className="text-cyan-400 font-semibold">Avian Count: {birdCount} Birds</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-emerald-400 font-semibold">Biomass: {biomassKg} kg</span>
                  <span className="text-slate-500">|</span>
                  <span>Density: {densityIndex} / sq.m</span>
                </div>
              </div>
            </div>
          )}

          {/* Bioacoustics Tab */}
          {activeTab === 'bioacoustics' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    Acoustic Spectrogram & Bioacoustic Call Classifier
                  </h2>
                  <p className="text-xs text-slate-400">Mel-frequency cepstral coefficients & harmonic spectrum</p>
                </div>
                <div className="text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                  44.1 kHz Hi-Res Audio
                </div>
              </div>

              {/* Simulated Spectrogram Graph */}
              <div className="w-full h-72 rounded-xl bg-[#020510] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>16 kHz</span>
                  <span className="text-emerald-400 font-mono">Detected: Greater Flamingo (0.94 Conf)</span>
                  <span>0.00s - 12.00s</span>
                </div>

                <div className="h-44 w-full flex items-end gap-1.5 px-2">
                  {Array.from({ length: 48 }).map((_, idx) => {
                    const heightPct = Math.sin(idx * 0.3) * 40 + Math.cos(idx * 0.15) * 30 + 35;
                    return (
                      <div 
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-emerald-500 via-cyan-400 to-indigo-500 rounded-t-sm opacity-80 hover:opacity-100 transition"
                        style={{ height: `${Math.max(10, Math.min(100, heightPct))}%` }}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 border-t border-slate-800 pt-2">
                  <span>0 Hz</span>
                  <span>Dominant Peak: 1,420 Hz</span>
                  <span>Bandwidth: 850 Hz</span>
                </div>
              </div>
            </div>
          )}

          {/* Species Catalog Tab */}
          {activeTab === 'species' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex-1 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Avian Species Classification & Biomass Lookup
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-80 overflow-y-auto">
                {[
                  { name: 'Greater Flamingo', sci: 'Phoenicopterus roseus', avgW: '3.2 kg', status: 'Least Concern', color: 'text-pink-400' },
                  { name: 'Great White Pelican', sci: 'Pelecanus onocrotalus', avgW: '9.5 kg', status: 'Least Concern', color: 'text-amber-400' },
                  { name: 'Sarus Crane', sci: 'Antigone antigone', avgW: '7.3 kg', status: 'Vulnerable', color: 'text-rose-400' },
                  { name: 'Painted Stork', sci: 'Mycteria leucocephala', avgW: '2.8 kg', status: 'Near Threatened', color: 'text-indigo-400' },
                  { name: 'Little Egret', sci: 'Egretta garzetta', avgW: '0.45 kg', status: 'Least Concern', color: 'text-cyan-400' },
                  { name: 'Peregrine Falcon', sci: 'Falco peregrinus', avgW: '0.92 kg', status: 'Least Concern', color: 'text-emerald-400' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center">
                    <div>
                      <span className={`text-xs font-bold ${s.color} block`}>{s.name}</span>
                      <span className="text-[11px] text-slate-400 italic block">{s.sci}</span>
                      <span className="text-[10px] text-slate-500">Avg Weight: {s.avgW}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded-lg font-medium">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
