"use strict";
var g = hexi(512, 512, setup);
g.scaleToWindow();
var ball = undefined;
g.start();

//The `setup` function to initialize your application
function setup() {

  //Make a ball sprite.
  //circle arguments: diameter, fillStyle, strokeStyle, lineWidth, x, y
  ball = g.circle(64, "powderBlue", "black", 2, 192, 256);

  //Set the ball's velocity to 0
  ball.vx = g.randomInt(5, 15);
  ball.vy = g.randomInt(5, 15);

  //Physics properties
  ball.gravity = 0.3;
  ball.frictionX = 1;
  ball.frictionY = 0;
  ball.mass = 1.3;

  //Acceleration and friction properties
  ball.accelerationX = 0.2;
  ball.accelerationY = -0.2;
  ball.frictionX = 1;
  ball.frictionY = 1;

  g.pointer.tap = function () {
    ball.x = g.pointer.x - ball.halfWidth;
    ball.y = g.pointer.y - ball.halfHeight;
    ball.vx = g.randomInt(-15, 15);
    ball.vy = g.randomInt(-15, 15);
  };

  var message = g.text("Tap to give the ball a new random velocity", "18px Futura", "black", 6, 6);
  g.state = play;
}

function play() {

  ball.vy += ball.gravity;
  ball.vx *= ball.frictionX;
  ball.x += ball.vx;
  ball.y += ball.vy;

  var collision = g.contain(ball, g.stage, true);
  if (collision) {
    if (collision.has("bottom")) {
      ball.frictionX = 0.98;
    } else {
      ball.frictionX = 1;
    }
  }
}
