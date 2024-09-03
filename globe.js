const globe = document.getElementById('globe');
const numPoints = 300;

for (let i = 0; i < numPoints; i++) {
    const point = document.createElement('div');
    point.className = 'globe-point';

    const phi = Math.acos(-1 + (2 * i) / numPoints);
    const theta = Math.sqrt(numPoints * Math.PI) * phi;

    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);

    const scale = 40;
    point.style.transform = `translate3d(${x * scale + 50}px, ${y * scale + 50}px, ${z * scale}px)`;

    globe.appendChild(point);
}