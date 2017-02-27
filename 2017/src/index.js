const w = a.width;
const h = a.height;
const m = [w / 2, h / 2]

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI*2, true); 
  c.closePath();
  c.fill();
};


const parts = 28;
const wshift = w / parts * parts / 2;
console.log(m[0], wshift)

const update = (dt) => {
  c.fillStyle = "rgba(0, 0, 0, 0.25)";
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#FFF';

  for (let j = 0; j < h / parts; j++) { 
    for (let i = 0; i < w / parts; i++) {
      const x = i * parts + (j % 2 ? parts / 2 : 0);
      const y = j * parts;

      const v = [m[0] - x, m[1] - y];                         // vector to the middle
      const vl = Math.sqrt(v[0] * v[0] + v[1] * v[1]);        // vector length
      const vn = [v[0] / vl, v[1] / vl];                      // normalized vector
      const mv = (Math.cos(dt / 360 - vl / 100) - 1) * 50;    // movement modifier
      drawCircle(x + vn[0] * mv, y + vn[1] * mv, 2);
    }
  }
  c.fillStyle = '#FF0000';
  drawCircle(m[0],m[1], 2);
};

const loop = (dt) => {
  requestAnimationFrame(loop);
  update(dt);
};

loop();