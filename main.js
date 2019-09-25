const WP = require('wallpaper'),
	PI = require('pureimage'),
	fs = require('fs');

let counter = 0;

const screenWidth = 3840,
	screenHeight = 1080;

let paddle1 = {
	width : 25,
	height : 100,
	x : 10,
	y : 10
};

let paddle2 = {
	width : 25,
	height : 100,
	x : screenWidth-10-25,
	y : 10
};

let ball = {
	width: 20,
	height: 20,
	x: screenWidth/2,
	y: screenHeight/2,
	vx: 30,
	vy : 30
};


paddle1.y = screenHeight/2 - paddle1.height;
paddle2.y = screenHeight/2 - paddle2.height;



(async function() {
	while (true){


		console.log("loop");

		img = PI.make(3840, 1080);
		var ctx = img.getContext('2d');

		//update

		//ball x

		if(ball.vx > 0) {

			if(ball.x + ball.vx > paddle2.x) {
				ball.vx = -ball.vx;
				let left = paddle2.x - ball.x;

				ball.x = paddle.x - left;
			}

			else {
				ball.x = ball.x + ball.vx
			}

		}

		else {

			if(ball.x + ball.vx < paddle1.x){
				ball.vx = -ball.vx;
				let left = ball.x - paddle1.x;

				ball.x = paddle1.x + left;
			}

			else {

				ball.x = ball.x + ball.vx;
			}


		}


		//paddle1.y = (ball.y + ball.height.2) - paddle1.height

		//paddle2.y = (ball.y + ball.height.2) - paddle2.height


		//Background
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';

		ctx.fillRect(0, 0, 3840, 1080);

		//Set White
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';

		//draw Paddle 1
		ctx.fillRect( paddle1.x, paddle1.y, paddle1.width , paddle1.height);


		//draw Paddle 2
		ctx.fillRect( paddle2.x, paddle2.y, paddle2.width , paddle2.height);

		//draw ball
		ctx.fillRect( ball.x, ball.y, ball.width, ball.height);

		console.log("draw");


		//encode(img)

		try {
			await PI.encodePNGToStream(img, fs.createWriteStream('img' + counter + '.png') );
			console.log("Wrote out file");

			WP.set('img'+ counter +'.png');

			counter = counter + 1;

			console.log(counter);

		} catch(e) {
			console.log("Error writing file", e.message);
		}

	}

})();



