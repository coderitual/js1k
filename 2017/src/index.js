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

  for (let j = 0; j < h / 22; j++) { 
    for (let i = 0; i < w / 22; i++) {
      const x = i * 22 + (j % 2 ? 0 : 11);
      const y = j * 22;


      const v = [m[0] - x, m[1] - y];                         // vector to the middle
      const vl = Math.sqrt(v[0] * v[0] + v[1] * v[1]);        // vector length
      const vn = [v[0] / vl, v[1] / vl];                      // normalized vector
      const mv = (Math.cos(dt / 500 - vl / 100) - 1) * 60;    // movement modifier
      drawCircle(x + vn[0] * mv, y + vn[1] * mv, 2);
    }
  }
};

const loop = (dt) => {
  requestAnimationFrame(loop);
  update(dt);
};

loop();