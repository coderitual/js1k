const program = g.createProgram();
const vertexShader = g.createShader(g.VERTEX_SHADER);
g.shaderSource(vertexShader, `attribute vec2 P;void main(){gl_Position=vec4(P,0,1);}`)
g.compileShader(vertexShader);
g.attachShader(program, vertexShader);

const fragmentShader = g.createShader(g.FRAGMENT_SHADER);
g.shaderSource(fragmentShader, `
precision mediump float;uniform vec2 R,M;uniform float T; float t=5e-3;void main(){for( float i=0.;i<64.;i++){vec3 p=vec3((2.*gl_FragCoord.xy-R)/R.yy,t-1.),b=vec3(.707,.707,0); float a=T;p.xz*=mat2(cos(a),-sin(a),sin(a),cos(a));for( float i=0.;i<20.;i++){ a=(M/R*6.).x;p.xz*=mat2(cos(a),-sin(a),sin(a),cos(a)); a=(M/R*6.).y;p.xy*=mat2(cos(a),-sin(a),sin(a),cos(a));p-=min(0.,dot(p,b))*b*2.;b=b.zxx;p-=min(0.,dot(p,b))*b*2.;b=b.zxz;p-=min(0.,dot(p,b))*b*2.;b=b.xxy;p=p*1.5-.25;}t+=length(p)/3325.;if(length(p)/3325.<5e-3||t>2.){b=vec3(1);p*=.5;gl_FragColor=vec4(p/length(p)*(t<2.?5./i:i/64.),dot(p,b));break;}}}
`);

g.compileShader(fragmentShader);
g.attachShader(program, fragmentShader)
g.linkProgram(program);
g.useProgram(program);

g.bindBuffer(A=g.ARRAY_BUFFER,g.createBuffer())
g.bufferData(A,new Int8Array([-3,1,1,-3,1,1]), g.STATIC_DRAW)

g.enableVertexAttribArray(0)
g.vertexAttribPointer(b=0,2, g.BYTE,0,0,0)

g.uniform2f(g.getUniformLocation(program,'R'),a.width*=.8,a.height*=.8)
g.uniform2f(g.getUniformLocation(program,'M'),0,0)

onmousemove=function(e){g.uniform2f(g.getUniformLocation(program,"M"),b=e.pageX,e.pageY)};
(s=function(e){g.uniform1f(g.getUniformLocation(program,"T"),A+=.01);g.drawArrays(6,0,3);requestAnimationFrame(s)})();