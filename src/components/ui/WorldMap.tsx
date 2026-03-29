'use client';

import { useEffect, useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Location {
  name: string;
  coordinates: [number, number];
  isHQ?: boolean;
  labelOffset?: [number, number];
}

const locations: Location[] = [
  { name: 'Hamburg', coordinates: [10.0, 53.55], isHQ: true, labelOffset: [0, -18] },
  { name: 'London', coordinates: [-0.13, 51.51], labelOffset: [-22, -10] },
  { name: 'Rotterdam', coordinates: [4.48, 51.92], labelOffset: [0, 14] },
  { name: 'Dubai', coordinates: [55.27, 25.2], labelOffset: [12, -10] },
  { name: 'Shanghai', coordinates: [121.47, 31.23], labelOffset: [0, -12] },
  { name: 'New York', coordinates: [-74.01, 40.71], labelOffset: [0, -12] },
];

/* ── Projected pixel coords (pre-calculated for our projection) ── */
/* We compute these client-side to avoid SSR floating-point mismatch */

function useProjectedCoords() {
  const [coords, setCoords] = useState<Map<string, [number, number]> | null>(null);

  useEffect(() => {
    // Use d3-geo projection matching our ComposableMap config
    import('d3-geo').then(({ geoMercator }) => {
      const proj = geoMercator()
        .scale(160)
        .center([25, 38])
        .translate([900 / 2, 440 / 2]);

      const map = new Map<string, [number, number]>();
      for (const loc of locations) {
        const p = proj(loc.coordinates);
        if (p) map.set(loc.name, [p[0], p[1]]);
      }
      setCoords(map);
    });
  }, []);

  return coords;
}

/* ── Route path generator (great-circle arc as SVG path) ── */
function arcPath(from: [number, number], to: [number, number], segments = 50): string {
  // Quadratic bezier with control point offset for curvature
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const cx = (from[0] + to[0]) / 2 - dy * 0.15;
  const cy = (from[1] + to[1]) / 2 + dx * 0.15;
  return `M${from[0]},${from[1]} Q${cx},${cy} ${to[0]},${to[1]}`;
}

/* ── Route definitions ── */
interface Route {
  id: string;
  from: string;
  to: string;
  vesselCount: number;
  durations: number[]; // seconds per vessel
  delays: number[]; // initial delay per vessel
}

const routes: Route[] = [
  { id: 'hamburg-london', from: 'Hamburg', to: 'London', vesselCount: 2, durations: [6, 8], delays: [0, 3] },
  { id: 'hamburg-rotterdam', from: 'Hamburg', to: 'Rotterdam', vesselCount: 2, durations: [5, 7], delays: [0, 4] },
  { id: 'hamburg-dubai', from: 'Hamburg', to: 'Dubai', vesselCount: 3, durations: [12, 14, 16], delays: [0, 4, 9] },
  { id: 'hamburg-shanghai', from: 'Hamburg', to: 'Shanghai', vesselCount: 3, durations: [16, 18, 20], delays: [0, 6, 12] },
  { id: 'hamburg-newyork', from: 'Hamburg', to: 'New York', vesselCount: 2, durations: [14, 16], delays: [0, 7] },
  // Return routes (some ships coming back)
  { id: 'dubai-hamburg', from: 'Dubai', to: 'Hamburg', vesselCount: 2, durations: [13, 15], delays: [2, 8] },
  { id: 'shanghai-hamburg', from: 'Shanghai', to: 'Hamburg', vesselCount: 2, durations: [17, 19], delays: [3, 11] },
  { id: 'newyork-hamburg', from: 'New York', to: 'Hamburg', vesselCount: 1, durations: [15], delays: [5] },
];

/* ── Grid overlay (radar aesthetic) ── */
function RadarGrid() {
  return (
    <g opacity={0.04} stroke="#B89A5A" strokeWidth={0.3}>
      {/* Horizontal lines */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 55} x2={900} y2={i * 55} />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 17 }, (_, i) => (
        <line key={`v${i}`} x1={i * 56.25} y1={0} x2={i * 56.25} y2={440} />
      ))}
    </g>
  );
}

/* ── Animated vessel along a route path ── */
function Vessel({
  pathId,
  duration,
  delay,
  reverse,
}: {
  pathId: string;
  duration: number;
  delay: number;
  reverse?: boolean;
}) {
  return (
    <g>
      {/* Vessel trail glow */}
      <circle r={4} fill="#B89A5A" opacity={0.15}>
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyPoints={reverse ? '1;0' : '0;1'}
          keyTimes="0;1"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      {/* Vessel core dot */}
      <circle r={2} fill="#B89A5A" opacity={0.8}>
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyPoints={reverse ? '1;0' : '0;1'}
          keyTimes="0;1"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      {/* Bright center */}
      <circle r={0.8} fill="#F5F0E8" opacity={0.9}>
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyPoints={reverse ? '1;0' : '0;1'}
          keyTimes="0;1"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/* ── Radar sweep (rotating line from Hamburg) ── */
function RadarSweep({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <defs>
        <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B89A5A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#B89A5A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1={cx}
        y1={cy}
        x2={cx + 250}
        y2={cy}
        stroke="url(#sweepGrad)"
        strokeWidth={1.5}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="8s"
          repeatCount="indefinite"
        />
      </line>
    </g>
  );
}

export function WorldMap() {
  const projCoords = useProjectedCoords();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-compute route paths once coords are ready
  const routePaths = useMemo(() => {
    if (!projCoords) return [];
    return routes.map((route) => {
      const from = projCoords.get(route.from);
      const to = projCoords.get(route.to);
      if (!from || !to) return null;
      const pathId = `route-${route.id}`;
      const d = arcPath(from, to);
      return { ...route, pathId, d, fromCoord: from, toCoord: to };
    }).filter(Boolean) as Array<Route & { pathId: string; d: string; fromCoord: [number, number]; toCoord: [number, number] }>;
  }, [projCoords]);

  const hamburgPx = projCoords?.get('Hamburg');

  return (
    <div className="w-full max-w-[1000px] mx-auto relative">
      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(7,15,28,0.6) 100%)',
        }}
      />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 160,
          center: [25, 38],
        }}
        width={900}
        height={440}
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Ocean background */}
        <rect x={0} y={0} width={900} height={440} fill="#060D18" />

        {/* Radar grid */}
        <RadarGrid />

        {/* Land masses */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rpiKey}
                geography={geo}
                fill="#0E1A2C"
                stroke="#162640"
                strokeWidth={0.4}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Radar sweep from Hamburg */}
        {mounted && hamburgPx && (
          <RadarSweep cx={hamburgPx[0]} cy={hamburgPx[1]} />
        )}

        {/* Route paths (invisible, used for animateMotion) + visible dashed lines */}
        {routePaths.map(({ pathId, d }) => (
          <g key={pathId}>
            {/* Hidden path for motion reference */}
            <path id={pathId} d={d} fill="none" stroke="none" />
            {/* Visible dashed trade route */}
            <path
              d={d}
              fill="none"
              stroke="#B89A5A"
              strokeWidth={0.6}
              strokeOpacity={0.1}
              strokeDasharray="3 4"
            />
          </g>
        ))}

        {/* Animated vessels */}
        {mounted && routePaths.map((route) =>
          Array.from({ length: route.vesselCount }, (_, i) => (
            <Vessel
              key={`vessel-${route.pathId}-${i}`}
              pathId={route.pathId}
              duration={route.durations[i]}
              delay={route.delays[i]}
              reverse={route.from !== 'Hamburg'}
            />
          ))
        )}

        {/* Location markers */}
        {locations.map(({ name, coordinates, isHQ, labelOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            {isHQ ? (
              <>
                {/* Radar rings */}
                <circle r={20} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.1} />
                <circle r={12} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.15} />
                {/* Outer glow */}
                <circle r={8} fill="#B89A5A" opacity={0.08} />
                {/* Animated pulse */}
                <circle r={5} fill="#B89A5A" opacity={0.2}>
                  <animate attributeName="r" from="5" to="18" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.2" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Core */}
                <circle r={4} fill="#B89A5A" />
                <circle r={1.8} fill="#F5F0E8" opacity={0.7} />
                {/* Label */}
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -14}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 10,
                    fill: '#B89A5A',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {name}
                </text>
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={(labelOffset?.[1] ?? -14) + 10}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 6.5,
                    fill: '#B89A5A',
                    opacity: 0.5,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  HEADQUARTERS
                </text>
              </>
            ) : (
              <>
                {/* Station ring */}
                <circle r={8} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.12} />
                {/* Glow */}
                <circle r={5} fill="#B89A5A" opacity={0.06} />
                {/* Dot */}
                <circle r={2.5} fill="#B89A5A" opacity={0.8} />
                <circle r={1} fill="#F5F0E8" opacity={0.5} />
                {/* Label */}
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -10}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 8.5,
                    fill: '#D4BC82',
                    opacity: 0.75,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {name}
                </text>
              </>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
