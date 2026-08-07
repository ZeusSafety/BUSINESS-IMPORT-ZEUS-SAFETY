import fs from 'fs';

const geo = JSON.parse(
  fs.readFileSync(
    new URL('./peru-departamentos.geojson', import.meta.url),
    'utf8',
  ),
);

const W = 520;
const H = 780;
const PAD = 18;

function project(lon, lat) {
  return [lon, -lat];
}

let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

function ringBounds(ring) {
  for (const [lon, lat] of ring) {
    const [x, y] = project(lon, lat);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
}

for (const f of geo.features) {
  const g = f.geometry;
  if (g.type === 'Polygon') g.coordinates.forEach(ringBounds);
  else if (g.type === 'MultiPolygon')
    g.coordinates.forEach((p) => p.forEach(ringBounds));
}

const sx = (W - PAD * 2) / (maxX - minX);
const sy = (H - PAD * 2) / (maxY - minY);
const s = Math.min(sx, sy);
const ox = (W - (maxX - minX) * s) / 2;
const oy = (H - (maxY - minY) * s) / 2;

function toXY(lon, lat) {
  const [x, y] = project(lon, lat);
  return [ox + (x - minX) * s, oy + (y - minY) * s];
}

function ringPath(ring) {
  return (
    ring
      .map((pt, i) => {
        const [x, y] = toXY(pt[0], pt[1]);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join('') + 'Z'
  );
}

function geomPath(g) {
  if (g.type === 'Polygon') return g.coordinates.map(ringPath).join('');
  if (g.type === 'MultiPolygon')
    return g.coordinates.map((p) => p.map(ringPath).join('')).join('');
  return '';
}

const cities = {
  lima: [-77.0428, -12.0464],
  piura: [-80.6328, -5.1945],
  trujillo: [-79.0288, -8.1116],
  arequipa: [-71.5375, -16.409],
  cusco: [-71.9675, -13.5319],
  cajamarca: [-78.5128, -7.1617],
  ica: [-75.7286, -14.0678],
  huancayo: [-75.2049, -12.0651],
  iquitos: [-73.2538, -3.7437],
  tacna: [-70.2509, -18.0066],
};

const cityXY = {};
for (const [k, v] of Object.entries(cities)) {
  const [x, y] = toXY(v[0], v[1]);
  cityXY[k] = { x: +x.toFixed(2), y: +y.toFixed(2) };
}

const paths = geo.features.map((f) => ({
  name: f.properties.NOMBDEP,
  d: geomPath(f.geometry),
}));

const out = { W, H, paths, cityXY };
fs.writeFileSync(
  new URL('../data/peru-map-data.json', import.meta.url),
  JSON.stringify(out),
);

// Also write a static SVG for reference / Image fallback
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none">
${paths
  .map(
    (p) =>
      `  <path data-name="${p.name}" d="${p.d}" fill="#BFD8F8" stroke="#0b2d60" stroke-width="1.2" stroke-linejoin="round"/>`,
  )
  .join('\n')}
</svg>
`;
fs.writeFileSync(new URL('../public/peru-map-real.svg', import.meta.url), svg);
console.log('OK', paths.length, 'departments');
