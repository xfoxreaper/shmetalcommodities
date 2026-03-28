'use client';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Location {
  name: string;
  coordinates: [number, number];
  isHQ?: boolean;
}

const locations: Location[] = [
  { name: 'Hamburg', coordinates: [10.0, 53.55], isHQ: true },
  { name: 'London', coordinates: [-0.13, 51.51] },
  { name: 'Rotterdam', coordinates: [4.48, 51.92] },
  { name: 'Dubai', coordinates: [55.27, 25.2] },
  { name: 'Shanghai', coordinates: [121.47, 31.23] },
  { name: 'New York', coordinates: [-74.01, 40.71] },
];

export function WorldMap() {
  return (
    <div className="w-full overflow-hidden rounded">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [30, 35],
        }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rpiKey}
                geography={geo}
                fill="#1A2A40"
                stroke="#2A3A52"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: '#1E3048' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {locations.map(({ name, coordinates, isHQ }) => (
          <Marker key={name} coordinates={coordinates}>
            {isHQ ? (
              <>
                {/* Pulse ring for HQ */}
                <circle r={8} fill="#B89A5A" opacity={0.2}>
                  <animate
                    attributeName="r"
                    from="6"
                    to="14"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r={5} fill="#B89A5A" />
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 10,
                    fill: '#B89A5A',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {name}
                </text>
              </>
            ) : (
              <>
                <circle r={3} fill="#B89A5A" opacity={0.7} />
                <text
                  textAnchor="middle"
                  y={-8}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 8,
                    fill: '#B89A5A',
                    opacity: 0.6,
                    letterSpacing: '0.05em',
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
