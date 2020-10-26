const asyncForEach = async (l, cb) => {
	for (let i = 0; i < l.length; i++) {
		await cb(l[i], i, l);
	}
}

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const leftPadZero = (num, length) => num.toString().padStart(length, '0');

const drawFrames = async (drawnImage, frames, delay=100) => {
	await asyncForEach(frames, async frame => {
		drawnImage.src = frame;
		await sleep(delay);
	})
}

const getFramePath = (frameType, i) => `../assets/frames/${frameType}/${leftPadZero(i, 3)}.png`;
const fetchAllFrames = (frameType, numFrames) => [...Array(numFrames + 1).keys()]
		.map(i => getFramePath(frameType, i));

const scene1_intro = fetchAllFrames('scene1/1_intro', 16);
const scene1_ride = fetchAllFrames('scene1/2_ride', 4);
const scene1_brake_Fg = fetchAllFrames('scene1/3_brake/foreground', 87);
const scene1_brake_Bg = fetchAllFrames('scene1/3_brake/background', 87);

const scene2_intro = fetchAllFrames('scene2/1_intro', 23);
const scene2_arrival = fetchAllFrames('scene2/2_arrival', 119);
const scene2_3_postArrivalFg = fetchAllFrames('scene2/3_post_arrival/foreground', 14);
const scene2_3_postArrivalMg = fetchAllFrames('scene2/3_post_arrival/middleground', 0);
const scene2_3_postArrivalBg = fetchAllFrames('scene2/3_post_arrival/background', 23);

let start = false;

const clearCanvas = context => context.clearRect(0, 0, context.canvas.width, context.canvas.height);
const draw = (context, options) => {
	context.drawImage(
		options.image,
		options.dx,
		options.dy
	);
}

const loopFrames = async (image, frames, signal) => {
	// To keep reference to outside variable, wrap run boolean in object
	while(signal.run) {
		await drawFrames(image, frames);
	}
}

const messageBox = document.getElementById('typewriter');
const typeDialog = async (message) => {
	asyncForEach(message, async letter => {
		messageBox.innerHTML += letter;
		await sleep(65);
	})
}
const endDialog = () => {
	messageBox.innerHTML = '';
}

const audio = new Audio();
audio.muted = true;
audio.volume = 0.5;
const audioPlay = (path) => {
	if (audio.src !== path) {
		audio.src = path;
	}
	audio.play();
}

async function run(foreground, middleground, background) {
	await drawFrames(foreground.image, scene1_intro);
	while (!start) {
		audioPlay('../assets/audio/scene1/gallop.ogg');
		await drawFrames(foreground.image, scene1_ride);
	}
	const brakeSignal = {run: true}
	audioPlay('../assets/audio/scene1/brake.ogg');
	loopFrames(background.image, scene1_brake_Bg, brakeSignal);
	await drawFrames(foreground.image, scene1_brake_Fg);
	brakeSignal.run = false

	// Scene 2 begin
	await asyncForEach(Array(1), async () => {
		audioPlay('../assets/audio/scene2/snore.ogg');
		await drawFrames(foreground.image, scene2_intro);
	});

	typeDialog('The quick green fox jumped over the lazy brown dog');
	audioPlay('../assets/audio/scene2/arrival.ogg');
	await drawFrames(foreground.image, scene2_arrival);

	const postArrivalSignal = {run: true};
	drawFrames(middleground.image, scene2_3_postArrivalMg);
	loopFrames(background.image, scene2_3_postArrivalBg, postArrivalSignal);
	loopFrames(foreground.image, scene2_3_postArrivalFg, postArrivalSignal);
	await sleep(100*1000);
	postArrivalSignal.run = false;
}

function sprites() {
	const startButton = document.getElementById('start-button');
	startButton.onclick = () => {
		start = true;
		audio.muted = false; // bypass audioblock
		startButton.style.display = 'none';
	}

	const [fg, mg, bg] = ['foregroundCanvas', 'middlegroundCanvas', 'backgroundCanvas'].map(
		canvasId => {
			const context = document.getElementById(canvasId).getContext('2d');
			const imgData = { image: new Image, dx: 0, dy: 0, context };
			imgData.image.onload = () => {
				clearCanvas(context);
				draw(context, imgData);
			}
			return imgData;
		}
	);

	run(fg, mg, bg);
}

sprites();