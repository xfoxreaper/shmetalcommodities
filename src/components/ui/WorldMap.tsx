'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Location {
  name: string;
  coordinates: [number, number]; // [lng, lat]
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

/* ────────────────────────────────────────────
   Shipping lane waypoints (lng, lat)
   Routes follow real maritime corridors:
   - North Sea, English Channel, Gibraltar,
     Suez Canal, Strait of Malacca, etc.
   ──────────────────────────────────────────── */

type ShippingRoute = {
  id: string;
  waypoints: [number, number][]; // [lng, lat] sequence
  vesselCount: number;
  durations: number[];
  delays: number[];
};

const shippingRoutes: ShippingRoute[] = [
  // Hamburg → London (North Sea, down the English coast)
  {
    id: 'hamburg-london',
    waypoints: [
      [10.0, 53.55], [8.5, 54.0], [6.0, 54.5], [3.5, 53.5], [1.5, 52.0], [-0.13, 51.51],
    ],
    vesselCount: 2, durations: [8, 10], delays: [0, 5],
  },
  // Hamburg → Rotterdam (short North Sea hop)
  {
    id: 'hamburg-rotterdam',
    waypoints: [
      [10.0, 53.55], [8.0, 54.0], [6.0, 54.2], [4.8, 53.0], [4.48, 51.92],
    ],
    vesselCount: 2, durations: [6, 8], delays: [0, 4],
  },
  // Hamburg → Dubai (North Sea → Channel → Bay of Biscay → Gibraltar → Med → Suez → Red Sea → Arabian Sea)
  {
    id: 'hamburg-dubai',
    waypoints: [
      [10.0, 53.55], [6.0, 54.0], [2.0, 51.0], [-4.0, 48.5], [-9.0, 43.0],
      [-6.0, 36.0], [-1.0, 36.0], [5.0, 37.0], [10.0, 36.5],
      [18.0, 34.0], [26.0, 34.0], [30.0, 32.0], [32.5, 30.0],
      [33.0, 28.0], [34.5, 26.5], [38.0, 22.0], [42.0, 16.0],
      [45.0, 13.0], [50.0, 18.0], [55.27, 25.2],
    ],
    vesselCount: 3, durations: [22, 25, 28], delays: [0, 7, 15],
  },
  // Hamburg → Shanghai (via Suez → Indian Ocean → Malacca Strait → South China Sea)
  {
    id: 'hamburg-shanghai',
    waypoints: [
      [10.0, 53.55], [6.0, 54.0], [2.0, 51.0], [-4.0, 48.5], [-9.0, 43.0],
      [-6.0, 36.0], [-1.0, 36.0], [5.0, 37.0], [10.0, 36.5],
      [18.0, 34.0], [26.0, 34.0], [30.0, 32.0], [32.5, 30.0],
      [33.0, 28.0], [34.5, 26.5], [38.0, 22.0], [42.0, 16.0],
      [48.0, 12.0], [55.0, 12.0], [62.0, 14.0], [70.0, 12.0],
      [78.0, 8.0], [85.0, 5.0], [95.0, 3.0], [100.0, 2.0],
      [104.0, 1.5], [108.0, 5.0], [112.0, 10.0], [115.0, 16.0],
      [118.0, 22.0], [121.47, 31.23],
    ],
    vesselCount: 3, durations: [32, 36, 40], delays: [0, 10, 22],
  },
  // Hamburg → New York (North Sea → Atlantic crossing)
  {
    id: 'hamburg-newyork',
    waypoints: [
      [10.0, 53.55], [6.0, 54.0], [2.0, 51.0], [-5.0, 50.0],
      [-10.0, 50.0], [-18.0, 50.0], [-28.0, 48.0], [-38.0, 46.0],
      [-48.0, 44.0], [-58.0, 42.5], [-65.0, 41.5], [-70.0, 41.0],
      [-74.01, 40.71],
    ],
    vesselCount: 2, durations: [18, 22], delays: [0, 10],
  },
  // Return: Dubai → Hamburg
  {
    id: 'dubai-hamburg',
    waypoints: [
      [55.27, 25.2], [50.0, 18.0], [45.0, 13.0], [42.0, 16.0],
      [38.0, 22.0], [34.5, 26.5], [33.0, 28.0], [32.5, 30.0],
      [30.0, 32.0], [26.0, 34.0], [18.0, 34.0], [10.0, 36.5],
      [5.0, 37.0], [-1.0, 36.0], [-6.0, 36.0], [-9.0, 43.0],
      [-4.0, 48.5], [2.0, 51.0], [6.0, 54.0], [10.0, 53.55],
    ],
    vesselCount: 2, durations: [24, 27], delays: [3, 14],
  },
  // Return: Shanghai → Hamburg
  {
    id: 'shanghai-hamburg',
    waypoints: [
      [121.47, 31.23], [118.0, 22.0], [115.0, 16.0], [112.0, 10.0],
      [108.0, 5.0], [104.0, 1.5], [100.0, 2.0], [95.0, 3.0],
      [85.0, 5.0], [78.0, 8.0], [70.0, 12.0], [62.0, 14.0],
      [55.0, 12.0], [48.0, 12.0], [42.0, 16.0], [38.0, 22.0],
      [34.5, 26.5], [33.0, 28.0], [32.5, 30.0], [30.0, 32.0],
      [26.0, 34.0], [18.0, 34.0], [10.0, 36.5], [5.0, 37.0],
      [-1.0, 36.0], [-6.0, 36.0], [-9.0, 43.0], [-4.0, 48.5],
      [2.0, 51.0], [6.0, 54.0], [10.0, 53.55],
    ],
    vesselCount: 2, durations: [34, 38], delays: [5, 20],
  },
  // Return: New York → Hamburg
  {
    id: 'newyork-hamburg',
    waypoints: [
      [-74.01, 40.71], [-70.0, 41.0], [-65.0, 41.5], [-58.0, 42.5],
      [-48.0, 44.0], [-38.0, 46.0], [-28.0, 48.0], [-18.0, 50.0],
      [-10.0, 50.0], [-5.0, 50.0], [2.0, 51.0], [6.0, 54.0],
      [10.0, 53.55],
    ],
    vesselCount: 1, durations: [20], delays: [8],
  },
];

/* ── Projection hook ── */
type Proj = (coord: [number, number]) => [number, number] | null;

function useProjection() {
  const [proj, setProj] = useState<Proj | null>(null);

  useEffect(() => {
    import('d3-geo').then(({ geoMercator }) => {
      const p = geoMercator()
        .scale(160)
        .center([25, 38])
        .translate([900 / 2, 440 / 2]);
      setProj(() => p);
    });
  }, []);

  return proj;
}

/* ── Build SVG path from waypoints via Catmull-Rom spline ── */
function waypointPath(points: [number, number][]): string {
  if (points.length < 2) return '';
  if (points.length === 2) return `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;

  let d = `M${points[0][0]},${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Catmull-Rom to cubic bezier conversion (alpha=0.5)
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }

  return d;
}

/* ── Radar grid ── */
function RadarGrid() {
  return (
    <g opacity={0.04} stroke="#B89A5A" strokeWidth={0.3}>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 55} x2={900} y2={i * 55} />
      ))}
      {Array.from({ length: 17 }, (_, i) => (
        <line key={`v${i}`} x1={i * 56.25} y1={0} x2={i * 56.25} y2={440} />
      ))}
    </g>
  );
}

/* ── Boat-shaped radar blip ── */
function BoatVessel({
  pathId,
  duration,
  delay,
}: {
  pathId: string;
  duration: number;
  delay: number;
}) {
  const motionProps = {
    dur: `${duration}s`,
    begin: `${delay}s`,
    repeatCount: 'indefinite' as const,
    rotate: 'auto' as const,
  };

  return (
    <g>
      {/* Wake trail (elongated glow behind the boat) */}
      <ellipse rx={8} ry={2} fill="#B89A5A" opacity={0.08} cx={-4} cy={0}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </ellipse>
      {/* Boat hull shape — pointed bow, wider stern */}
      <path
        d="M4,0 L-2,-2 L-3,0 L-2,2 Z"
        fill="#B89A5A"
        opacity={0.85}
      >
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </path>
      {/* Bright center (bridge/cabin) */}
      <circle r={0.6} fill="#F5F0E8" opacity={0.9}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/* ── Radar sweep ── */
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
        x1={cx} y1={cy} x2={cx + 250} y2={cy}
        stroke="url(#sweepGrad)" strokeWidth={1.5}
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

/* ── Main component ── */
export function WorldMap() {
  const proj = useProjection();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const project = useCallback(
    (coord: [number, number]) => proj?.(coord) ?? null,
    [proj],
  );

  // Build projected route paths
  const routeData = useMemo(() => {
    if (!proj) return [];
    return shippingRoutes.map((route) => {
      const projected = route.waypoints
        .map((wp) => project(wp))
        .filter(Boolean) as [number, number][];
      if (projected.length < 2) return null;
      const pathId = `route-${route.id}`;
      const d = waypointPath(projected);
      return { ...route, pathId, d };
    }).filter(Boolean) as Array<ShippingRoute & { pathId: string; d: string }>;
  }, [proj, project]);

  const hamburgPx = proj ? project(locations[0].coordinates) : null;

  return (
    <div className="w-full max-w-[1000px] mx-auto relative">
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(6,13,24,0.7) 100%)',
        }}
      />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 160, center: [25, 38] }}
        width={900}
        height={440}
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Ocean */}
        <rect x={0} y={0} width={900} height={440} fill="#060D18" />

        <RadarGrid />

        {/* Land */}
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

        {/* Radar sweep */}
        {mounted && hamburgPx && <RadarSweep cx={hamburgPx[0]} cy={hamburgPx[1]} />}

        {/* Shipping lane paths + dashed route lines */}
        {routeData.map(({ pathId, d }) => (
          <g key={pathId}>
            <path id={pathId} d={d} fill="none" stroke="none" />
            <path
              d={d}
              fill="none"
              stroke="#B89A5A"
              strokeWidth={0.5}
              strokeOpacity={0.08}
              strokeDasharray="2 5"
            />
          </g>
        ))}

        {/* Animated boat vessels */}
        {mounted && routeData.map((route) =>
          Array.from({ length: route.vesselCount }, (_, i) => (
            <BoatVessel
              key={`boat-${route.pathId}-${i}`}
              pathId={route.pathId}
              duration={route.durations[i]}
              delay={route.delays[i]}
            />
          ))
        )}

        {/* Port markers */}
        {locations.map(({ name, coordinates, isHQ, labelOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            {isHQ ? (
              <>
                <circle r={20} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.1} />
                <circle r={12} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.15} />
                <circle r={8} fill="#B89A5A" opacity={0.08} />
                <circle r={5} fill="#B89A5A" opacity={0.2}>
                  <animate attributeName="r" from="5" to="18" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.2" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle r={4} fill="#B89A5A" />
                <circle r={1.8} fill="#F5F0E8" opacity={0.7} />
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -14}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 10, fill: '#B89A5A', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase' as const,
                  }}
                >{name}</text>
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={(labelOffset?.[1] ?? -14) + 10}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 6.5, fill: '#B89A5A', opacity: 0.5,
                    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  }}
                >HEADQUARTERS</text>
              </>
            ) : (
              <>
                <circle r={8} fill="none" stroke="#B89A5A" strokeWidth={0.3} opacity={0.12} />
                <circle r={5} fill="#B89A5A" opacity={0.06} />
                <circle r={2.5} fill="#B89A5A" opacity={0.8} />
                <circle r={1} fill="#F5F0E8" opacity={0.5} />
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -10}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 8.5, fill: '#D4BC82', opacity: 0.75,
                    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  }}
                >{name}</text>
              </>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
