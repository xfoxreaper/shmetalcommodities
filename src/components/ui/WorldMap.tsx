'use client';

import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Location {
  name: string;
  coordinates: [number, number];
  isHQ?: boolean;
  labelOffset?: [number, number];
}

const locations: Location[] = [
  { name: 'Hamburg', coordinates: [10.0, 53.55], isHQ: true, labelOffset: [0, -18] },
  { name: 'London', coordinates: [-0.13, 51.51], labelOffset: [-20, -12] },
  { name: 'Rotterdam', coordinates: [4.48, 51.92], labelOffset: [0, 12] },
  { name: 'Dubai', coordinates: [55.27, 25.2], labelOffset: [0, -12] },
  { name: 'Shanghai', coordinates: [121.47, 31.23], labelOffset: [0, -12] },
  { name: 'New York', coordinates: [-74.01, 40.71], labelOffset: [0, -12] },
];

const hq = locations[0];

export function WorldMap() {
  return (
    <div className="w-full max-w-[1000px] mx-auto">
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
        <rect x={0} y={0} width={900} height={440} fill="#070F1C" rx={0} />

        {/* Land masses */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rpiKey}
                geography={geo}
                fill="#111D30"
                stroke="#1A2D47"
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

        {/* Trade route lines from HQ to each office */}
        {locations
          .filter((loc) => !loc.isHQ)
          .map((loc) => (
            <Line
              key={`route-${loc.name}`}
              from={hq.coordinates}
              to={loc.coordinates}
              stroke="#B89A5A"
              strokeWidth={0.8}
              strokeOpacity={0.15}
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
          ))}

        {/* Location markers */}
        {locations.map(({ name, coordinates, isHQ, labelOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            {isHQ ? (
              <>
                {/* Outer glow ring */}
                <circle r={16} fill="#B89A5A" opacity={0.06} />
                <circle r={10} fill="#B89A5A" opacity={0.12} />
                {/* Animated pulse */}
                <circle r={6} fill="#B89A5A" opacity={0.2}>
                  <animate
                    attributeName="r"
                    from="6"
                    to="16"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.25"
                    to="0"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Core dot */}
                <circle r={4.5} fill="#B89A5A" />
                <circle r={2} fill="#F5F0E8" opacity={0.6} />
                {/* Label */}
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -14}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 11,
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
                  y={(labelOffset?.[1] ?? -14) + 11}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 7,
                    fill: '#B89A5A',
                    opacity: 0.5,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  HQ
                </text>
              </>
            ) : (
              <>
                {/* Subtle glow */}
                <circle r={6} fill="#B89A5A" opacity={0.08} />
                {/* Dot */}
                <circle r={3} fill="#B89A5A" opacity={0.75} />
                <circle r={1.2} fill="#F5F0E8" opacity={0.4} />
                {/* Label */}
                <text
                  textAnchor="middle"
                  x={labelOffset?.[0] ?? 0}
                  y={labelOffset?.[1] ?? -10}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 9,
                    fill: '#D4BC82',
                    opacity: 0.7,
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
