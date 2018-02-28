/**
 * js1k - XXXX
 * coptyright © coderitual
 */

/**
 * a = <canvas>
 * b = <body>
 * c = context
 */

 /**
  * For non canvas demo, insert DOM after canvas
  * a.insertAdjacentHTML('afterend', '<div></div>');
  */

b.style.background = 'radial-gradient(circle at 0 0, #555 0%, #212121 100%)';

void (function update(dt) {
  requestAnimationFrame(update);
  c.fillRect(0, 10, dt, 50);
})();

