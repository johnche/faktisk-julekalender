const asyncForEach = async (l, cb) => {
	for (let i = 0; i < l.length; i++) {
		await cb(l[i], i, l);
	}
}

const sleep = async (ms) => {
	return await new Promise(resolve => setTimeout(resolve, ms));
}

const leftPadZero = (num, length) => num.toString().padStart(length, '0');

const drawFrames = async (drawnImage, frames, delay=100) => {
	await asyncForEach(frames, async frame => {
		drawnImage.src = frame;
		await sleep(delay);
	})
}

const getFramePath = (frameType, i) => `../assets/frames/${frameType}/${leftPadZero(i, 3)}.png`;
const fetchAllFrames = (frameType, numFrames) => [...Array(numFrames + 1).keys()].map(i => getFramePath(frameType, i));

const scene1_santaPreStart = fetchAllFrames('scene1/pre_start_1', 4);
const scene1_santaPostStart = fetchAllFrames('scene1/post_start_1', 87);

const scene2_introLoop = fetchAllFrames('scene2/1_intro_loop', 23);
const scene2_arrival = fetchAllFrames('scene2/2_arrival', 119);
const scene2_3_postArrivalBg = fetchAllFrames('scene2/3_post_arrival_bg', 11);
const scene2_3_postArrivalMg = ['../assets/frames/scene2/3_post_arrival_mg/000.png'];
const scene2_3_postArrivalFg = fetchAllFrames('scene2/3_post_arrival_fg', 14);

let start = false;

const clearCanvas = context => context.clearRect(0, 0, context.canvas.width, context.canvas.height);
const draw = (context, options) => {
	context.drawImage(
		options.image,
		options.dx,
		options.dy
	);
}

async function run(foreground, middleground, background) {
	while (!start) {
		await drawFrames(foreground.image, scene1_santaPreStart);
	}
	await drawFrames(foreground.image, scene1_santaPostStart);

	// Scene 2 begin
	await asyncForEach(Array(5), async () => {
		await drawFrames(foreground.image, scene2_introLoop);
	});
	await drawFrames(foreground.image, scene2_arrival);
	await drawFrames(middleground.image, scene2_3_postArrivalMg);
	while(true) {
		await drawFrames(background.image, scene2_3_postArrivalBg);
	}
}

function sprites() {
	const startButton = document.getElementById('start-button');
	startButton.onclick = () => {
		start = true;
		startButton.remove();
	}

	const [fg, mg, bg] = ['foregroundCanvas', 'middlegroundCanvas', 'backgroundCanvas'].map(
		canvasId => {
			const context = document.getElementById(canvasId).getContext('2d');
			const imgData = { image: new Image, dx: 0, dy: 0 };
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