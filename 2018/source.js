// Template of source code
// Following code is just a suggestion

t = 0;

L = function() {
  setTimeout(L, 9);
  c.fillRect(0, 10, t++, 50);
};

L();
fun