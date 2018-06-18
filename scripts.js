var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var radius = 50;
var color = ['white', 'yellow', 'blue', 'pink'];
if(canvas.getContext){
  var ctx = canvas.getContext('2d');

  var mouse = {
    x: undefined,
    y: undefined
  };

  var maxRadius = 30;
  var minRadius = 2;


  window.addEventListener('resize' , function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });


  window.addEventListener('mousemove' , function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  });

  function Circle(x, y, dx, dy, radius, clr){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.clr = clr;

    this.draw = function(){
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
      ctx.fillStyle = this.clr;
      ctx.fill();
    }

    this.animation = function(){
      if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
        this.dx = -this.dx;
      }
      if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
        this.dy = -this.dy;
      }
    this.x += this.dx;
    this.y += this.dy;

    if((mouse.x - this.x <40) && (mouse.x - this.x >-40) && (mouse.y - this.y <40) && (mouse.y - this.y >-40)){
      if(this.radius < maxRadius){
      this.radius += 1;
    }
  }else if(this.radius > minRadius){
      this.radius -= 1;
    }

    this.draw();
    }
  }
  var cirArray = [];

  for(var i = 0; i < 200; i++){
    cirArray.push(new Circle(Math.random()*(innerWidth - radius*2) + radius, Math.random()*(innerHeight - radius*2)+radius, (Math.random()-0.5)*4, (Math.random()-0.5)*4, radius, color[Math.floor(Math.random() * color.length)]));
    console.log(color[Math.floor(Math.random() * i)]);
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var j = 0; j < cirArray.length; j++){
      cirArray[j].animation();
    }
  }
  animate();
}
