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

/*
  Shared waypoint segments for reuse across routes.
  All coords are [longitude, latitude].

  Key straits & passages with extra waypoints to prevent spline overshoot:
  - Dover Strait: [1.4, 51.0]
  - Ushant (tip of Brittany): [-5.3, 48.3]
  - Cape Finisterre: [-9.5, 42.8] (well offshore)
  - Cape St. Vincent: [-9.2, 36.8]
  - Gibraltar: [-5.6, 35.9] entry, [-5.3, 36.0] mid, [-4.5, 36.1] exit
  - Suez approach: [32.2, 31.5] Port Said, [32.5, 30.0] Suez
  - Bab el-Mandeb: [43.4, 12.6]
  - Strait of Hormuz: [56.4, 26.5]
  - South of Sri Lanka: [80.5, 5.5]
  - Malacca Strait: [98.0, 4.5] entry, [100.5, 2.5] mid, [103.8, 1.3] Singapore exit
  - South China Sea: [107.0, 5.0] → [113.0, 12.0] → [117.0, 20.0]
*/

// Hamburg → Dover Strait (North Sea, staying in water off Netherlands)
const hamburgToDover: [number, number][] = [
  [10.0, 53.55], [8.0, 54.5], [5.5, 53.8], [3.5, 52.5], [1.8, 51.5], [1.4, 51.0],
];

// Dover → past Ushant → Bay of Biscay → off Cape Finisterre (staying well offshore)
const doverToBiscay: [number, number][] = [
  [0.5, 50.2], [-1.5, 49.5], [-5.3, 48.3], [-7.0, 46.5], [-9.0, 44.5], [-10.0, 42.5],
];

// Cape Finisterre → past Portugal → Gibraltar (offshore, not through land)
const biscayToGibraltar: [number, number][] = [
  [-10.0, 40.0], [-9.5, 37.5], [-7.0, 36.5], [-5.6, 35.9], [-5.3, 36.0], [-4.5, 36.1],
];

// Gibraltar → central Med → east Med → Port Said (staying in open water)
const gibraltarToSuez: [number, number][] = [
  [-2.0, 36.3], [1.0, 37.0], [5.0, 37.5], [9.0, 37.0], [13.0, 36.0],
  [17.0, 34.5], [21.0, 34.0], [25.0, 34.5], [28.5, 33.5], [31.0, 32.0],
  [32.2, 31.5],
];

// Suez Canal → Red Sea → Bab el-Mandeb (tight waypoints through canal)
const suezToRedSea: [number, number][] = [
  [32.3, 31.0], [32.5, 30.0], [32.8, 29.0], [33.5, 27.5], [35.0, 25.0],
  [37.0, 22.0], [39.5, 18.0], [41.5, 15.0], [43.4, 12.6],
];

// Red Sea exit → Gulf of Aden → around Arabian Peninsula → Strait of Hormuz → Dubai
const redSeaToDubai: [number, number][] = [
  [45.0, 12.0], [48.5, 12.5], [52.0, 16.0], [56.0, 21.0],
  [56.4, 26.5], [55.5, 25.5], [55.27, 25.2],
];

// Red Sea exit → Indian Ocean → south of Sri Lanka → Malacca → Singapore → SCS → Shanghai
const redSeaToShanghai: [number, number][] = [
  [46.0, 11.5], [50.0, 10.0], [55.0, 9.0], [60.0, 10.0], [66.0, 10.0],
  [72.0, 8.0], [76.5, 6.5], [80.5, 5.5], [85.0, 4.0], [90.0, 3.0],
  // Malacca Strait (tight, many waypoints to hug the channel)
  [95.0, 4.0], [97.0, 3.5], [98.5, 3.0], [100.0, 2.5], [101.5, 2.0], [103.8, 1.3],
  // Singapore → South China Sea → East China Sea
  [105.5, 2.0], [107.5, 5.0], [110.0, 8.0], [113.0, 12.0], [116.0, 17.0],
  [118.5, 22.0], [120.5, 27.0], [121.47, 31.23],
];

// Dover → south of Ireland → open North Atlantic → New York
const doverToNewYork: [number, number][] = [
  [0.0, 50.0], [-3.0, 49.5], [-6.0, 49.0], [-8.0, 48.5],
  // Pass south of Ireland (Fastnet), staying well offshore
  [-10.5, 50.0], [-12.0, 51.5], [-15.0, 52.0],
  // Open Atlantic
  [-22.0, 51.0], [-30.0, 49.0], [-40.0, 46.0], [-50.0, 44.0],
  [-60.0, 42.5], [-67.0, 41.5], [-71.0, 40.8], [-74.01, 40.71],
];

const shippingRoutes: ShippingRoute[] = [
  // Hamburg → London (Elbe → North Sea → Thames)
  {
    id: 'hamburg-london',
    waypoints: [
      [10.0, 53.55], [8.0, 54.3], [5.5, 53.5], [3.0, 52.5], [1.5, 51.8], [0.5, 51.5], [-0.13, 51.51],
    ],
    vesselCount: 2, durations: [8, 10], delays: [0, 5],
  },
  // Hamburg → Rotterdam (Elbe → North Sea → Hook of Holland)
  {
    id: 'hamburg-rotterdam',
    waypoints: [
      [10.0, 53.55], [7.5, 54.3], [5.0, 53.5], [4.0, 52.5], [4.48, 51.92],
    ],
    vesselCount: 2, durations: [6, 8], delays: [0, 4],
  },
  // Hamburg → Dubai (North Sea → Channel → Biscay → Gibraltar → Med → Suez → Red Sea → Persian Gulf)
  {
    id: 'hamburg-dubai',
    waypoints: [
      ...hamburgToDover, ...doverToBiscay, ...biscayToGibraltar,
      ...gibraltarToSuez, ...suezToRedSea, ...redSeaToDubai,
    ],
    vesselCount: 3, durations: [28, 32, 36], delays: [0, 9, 20],
  },
  // Hamburg → Shanghai (same as Dubai to Red Sea, then Indian Ocean → Malacca → SCS)
  {
    id: 'hamburg-shanghai',
    waypoints: [
      ...hamburgToDover, ...doverToBiscay, ...biscayToGibraltar,
      ...gibraltarToSuez, ...suezToRedSea, ...redSeaToShanghai,
    ],
    vesselCount: 3, durations: [38, 42, 48], delays: [0, 14, 28],
  },
  // Hamburg → New York (North Sea → Channel → south of Ireland → Atlantic)
  {
    id: 'hamburg-newyork',
    waypoints: [...hamburgToDover, ...doverToNewYork],
    vesselCount: 2, durations: [20, 24], delays: [0, 12],
  },
  // Return: Dubai → Hamburg (reverse)
  {
    id: 'dubai-hamburg',
    waypoints: [
      ...redSeaToDubai.slice().reverse(), ...suezToRedSea.slice().reverse(),
      ...gibraltarToSuez.slice().reverse(), ...biscayToGibraltar.slice().reverse(),
      ...doverToBiscay.slice().reverse(), ...hamburgToDover.slice().reverse(),
    ],
    vesselCount: 2, durations: [30, 34], delays: [4, 18],
  },
  // Return: Shanghai → Hamburg (reverse)
  {
    id: 'shanghai-hamburg',
    waypoints: [
      ...redSeaToShanghai.slice().reverse(), ...suezToRedSea.slice().reverse(),
      ...gibraltarToSuez.slice().reverse(), ...biscayToGibraltar.slice().reverse(),
      ...doverToBiscay.slice().reverse(), ...hamburgToDover.slice().reverse(),
    ],
    vesselCount: 2, durations: [40, 46], delays: [6, 24],
  },
  // Return: New York → Hamburg (reverse)
  {
    id: 'newyork-hamburg',
    waypoints: [
      ...doverToNewYork.slice().reverse(), ...hamburgToDover.slice().reverse(),
    ],
    vesselCount: 1, durations: [22], delays: [8],
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

/* ── Cargo ship radar blip ── */
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
      {/* V-shaped wake spreading behind the ship */}
      <path
        d="M-5,0 L-14,-4 M-5,0 L-14,4"
        fill="none"
        stroke="#B89A5A"
        strokeWidth={0.4}
        opacity={0.12}
      >
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </path>
      {/* Wake wash (fading trail) */}
      <ellipse rx={10} ry={1.5} fill="#B89A5A" opacity={0.05} cx={-8} cy={0}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </ellipse>
      {/* Hull — cargo ship profile: sharp bow, parallel sides, flat stern */}
      <path
        d="M7,0 L4,-1.8 L-3,-2 L-5,-1.5 L-5,1.5 L-3,2 L4,1.8 Z"
        fill="#B89A5A"
        opacity={0.8}
      >
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </path>
      {/* Bridge superstructure (raised block near stern) */}
      <rect x={-4} y={-1} width={2.5} height={2} rx={0.3} fill="#D4BC82" opacity={0.7}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </rect>
      {/* Cargo hold (subtle line dividers on deck) */}
      <line x1={0} y1={-1.2} x2={0} y2={1.2} stroke="#8C7340" strokeWidth={0.3} opacity={0.4}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </line>
      <line x1={2.5} y1={-1} x2={2.5} y2={1} stroke="#8C7340" strokeWidth={0.3} opacity={0.4}>
        <animateMotion {...motionProps}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </line>
      {/* Navigation light (bright dot at bow) */}
      <circle r={0.5} cx={6} cy={0} fill="#F5F0E8" opacity={0.95}>
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
    <div className="w-full relative">
      {/* Edge fade — blends map edges into the navy section seamlessly */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            linear-gradient(to bottom, var(--color-navy) 0%, transparent 12%, transparent 70%, var(--color-navy) 100%),
            linear-gradient(to right, var(--color-navy) 0%, transparent 10%, transparent 90%, var(--color-navy) 100%)
          `,
        }}
      />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 160, center: [25, 38] }}
        width={900}
        height={440}
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Ocean — matches navy section bg so there's no visible boundary */}
        <rect x={0} y={0} width={900} height={440} fill="#0A1628" />

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
