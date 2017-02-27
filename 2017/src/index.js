const w = a.width;
const h = a.height;
const m = [w / 2, h / 2]

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI*2, true); 
  c.closePath();
  c.fill();
};

const update = (dt) => {
  c.fillStyle = '#000';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#FFF';

  for (let j = 0; j < h / 21; j++) { 
    for (let i = 0; i < w / 21; i++) {
      const x = i * 22 + (j % 2 ? 0 : 11);
      const y = j * 22;

      // vector to the middle
      const v = [m[0] - x, m[y] - y];
      drawCircle(x, y, 2);
    }
  }
};

const loop = (dt) => {
  requestAnimationFrame(loop);
  update(dt);
};

loop();