a.style.cssText = 'top:0;bottom:0;left:0;right:0;margin:auto;position:absolute;';

var mr = Math.random;

var WIDTH = 480;
var HEIGHT = 720;

var points = 0;
var hs = localStorage.getItem('h') || 0;
var enemies = [];

var player = {
    pos: [WIDTH/2, HEIGHT/2],
    angle: 0,
    av: 0,
    aa: 0.2,
    acc: 10,
    vel: 0
};

document.addEventListener('mouseup', function() {
    player.aa = -player.aa; 
});

function drawCircle(x,y,r) {
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI*2, true); 
    c.closePath();
    c.fill();
};

function drawTriangle(x,y,r) {
    c.save();
    c.translate(x, y);
    c.rotate(r);
    c.beginPath();
    c.moveTo(-10,10);
    c.lineTo(10,10);
    c.lineTo(0,-10);
    c.fill();
    c.restore();
};

var last = 0;
var denemy = 0;

(function update(time) {
    requestAnimationFrame(update);
    
    dt = (time - last) / 1000;
    
    denemy += dt;
    points += Math.round(dt + 10);
    
    // UPDATE
    
    if(denemy > 1) {
        denemy = 0;
        enemies.push({
            pos: [mr() * WIDTH, mr() * HEIGHT],
            vec: [mr() * 2 - 1, mr() * 2 - 1],
            speed: mr() * 150 + 50
        });
    }
    
     // player
    player.av += player.aa;
    player.av = player.aa >= 0 ? Math.min(player.av, 3) : Math.max(player.av, -3);
      
    player.angle += player.av * dt;
    
    var dx = Math.cos(player.angle - Math.PI / 2);
    var dy = Math.sin(player.angle - Math.PI / 2);
    
    player.vel += player.acc;
    player.vel = Math.min(player.vel, 150);

    player.pos[0] += dx * player.vel * dt;
    player.pos[1] += dy * player.vel * dt;
    
    if(player.pos[0] > WIDTH) player.pos[0] = 0;
    if(player.pos[0] < 0) player.pos[0] = WIDTH;
    if(player.pos[1] > HEIGHT) player.pos[1] = 0;
    if(player.pos[1] < 0) player.pos[1] = HEIGHT;
    
    enemies.forEach(function(e) {
        
        e.pos[0] += e.vec[0] * e.speed * dt;
        e.pos[1] += e.vec[1] * e.speed * dt;
        
        if(e.pos[0] > WIDTH) e.pos[0] = 0;
        if(e.pos[0] < 0) e.pos[0] = WIDTH;
        if(e.pos[1] > HEIGHT) e.pos[1] = 0;
        if(e.pos[1] < 0) e.pos[1] = HEIGHT;
        
        var d = (e.pos[0]-player.pos[0])*(e.pos[0]-player.pos[0]) + (e.pos[1]-player.pos[1])*(e.pos[1]-player.pos[1]);
        if(d < 15*15) {
            // death
            if(points > hs) {
                localStorage.setItem('h', points);
                hs = points;
            }
            
            points = 0;
            enemies = [];
        }
    });
    
    // RENDER
    
    // clear background
    c.fillStyle = '#1c2641';
    c.fillRect(0, 0, WIDTH, HEIGHT);
    
    // draw player
    c.fillStyle = '#ffc03e'
    drawTriangle(player.pos[0], player.pos[1], player.angle);
    
    c.fillStyle = '#4da1fb'
    enemies.forEach(function(e) {
        drawCircle(e.pos[0], e.pos[1], 10);
    });

    // draw points
    c.fillStyle = 'rgba(255,255,255,0.8)'
    c.font = '28px monospace';
    c.fillText(points, 20, 35);
    
    c.fillStyle = 'rgba(255,192,62,0.5)'
    c.font = '20px monospace';
    c.fillText(hs, 20, 55);
    
    last = time;
    
})(0);