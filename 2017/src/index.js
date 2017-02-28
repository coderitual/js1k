const w = a.width;
const h = a.height;
const m = [w / 2, h / 2]

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI*2, true);
  c.closePath();
  c.fill();
};

const step = 30;                                    // distance between point
const wshift = (w - ((w / step) | 0) * step) / 2;   // shift to center relative to width
const hshift = (h - ((h / step) | 0) * step) / 2;   // shift to center relative to height

const update = (dt) => {
  c.fillStyle = 'rgba(32, 30, 28, 0.5)';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#fff';
  c.strokeStyle = '#fff';

  for (let j = 0; j < h / step; j++) {
    for (let i = 0; i < w / step; i++) {
      const x = i * step + (j % 2 ? 0 : step / 2) + wshift;   // shift even lines
      const y = j * step + hshift;

      const v = [m[0] - x, m[1] - y];                         // vector to the middle
      const vl = Math.sqrt(v[0] * v[0] + v[1] * v[1]);        // vector length
      const vn = [v[0] / vl, v[1] / vl];                      // normalized vector
      const mv = (Math.cos(dt / 360 - vl / 100) - 1) * 50;    // movement modifier
      
      drawCircle(x + vn[0] * mv, y + vn[1] * mv, 3);

      for (let i = 0; i < 5; i++) {
        const lv = (Math.cos((dt - 50 * i) / 360 - vl / 100) - 1) * 50;
        c.beginPath();
        c.moveTo(x + vn[0] * mv, y + vn[1] * mv);
        c.lineWidth = 5 - i;
        c.lineTo(x + vn[0] * lv, y + vn[1] * lv);
        c.stroke();
      }
    }
  }
};

const loop = (dt) => {
  requestAnimationFrame(loop);
  update(dt);
};

loop();