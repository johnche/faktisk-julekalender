const asyncForEach = async (l, cb) => {
	for (let i = 0; i < l.length; i++) {
		await cb(l[i], i, l);
	}
}

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const leftPadZero = (num, length) => num.toString().padStart(length, '0');

const drawFrames = async (drawnImage, frames, shouldDraw={isTrue: true}, delay=100) => {
	await asyncForEach(frames, async frame => {
		if (!shouldDraw.isTrue) {
			return;
		}
		drawnImage.src = frame;
		await sleep(delay);
	});
}

const getFramePath = (frameType, i) => `../assets/frames/${frameType}/${leftPadZero(i, 3)}.png`;
const fetchAllFrames = (frameType, numFrames) => [...Array(numFrames + 1).keys()]
		.map(i => getFramePath(frameType, i));

const scene1_0_background = fetchAllFrames('scene1/0_background', 349);
const scene1_1_intro = fetchAllFrames('scene1/1_intro', 14);
const scene1_2_ride = fetchAllFrames('scene1/2_ride', 4);
const scene1_3_brake_Fg = fetchAllFrames('scene1/3_brake/foreground', 87);
const scene1_3_brake_Mg = fetchAllFrames('scene1/3_brake/middleground', 87);

const scene2_1_intro = fetchAllFrames('scene2/1_intro', 23);
const scene2_2_arrival = fetchAllFrames('scene2/2_arrival', 119);
const scene2_3_postArrivalFg = fetchAllFrames('scene2/3_post_arrival/foreground', 14);
const scene2_3_postArrivalMg = fetchAllFrames('scene2/3_post_arrival/middleground', 0);
const scene2_3_postArrivalBg = fetchAllFrames('scene2/3_post_arrival/background', 11);
const scene2_4_departure = fetchAllFrames('scene2/4_departure', 12);
const scene3_1_end = fetchAllFrames('scene3/1_end', 29);

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
	// To keep reference to outside variable, wrap the condition boolean in object
	while(signal.isTrue) {
		await drawFrames(image, frames, signal);
	}
}

const messageBox = document.getElementById('typewriter');
const typeDialog = async (message) => {
	message.innerHTML = '';
	asyncForEach(message, async letter => {
		messageBox.innerHTML += letter;
		await sleep(65);
	})
}
const endDialog = () => {
	messageBox.innerHTML = '';
}

const WINDLOOP_BEGIN = 5;	// intro005
const WINDLOOP_END = 8;		// brake008
const LANDSCAPE_END = 13;	// brake013

const audio1 = new Audio();
const audio2 = new Audio();
audio1.muted = true;
audio1.volume = 0.5;
audio2.muted = true;
audio2.volume = 0.5;
const audioPlay = async (path, audioElement=audio1) => {
	if (audioElement.src !== path) {
		audioElement.src = path;
	}

	// Wait for the player to load file
	await audioElement.play();
	console.log(audioElement);
	console.log('sleeping', audioElement.duration)
	// Exit the function after the duration of the audiofile
	await sleep(audioElement.duration*1000);
	console.log('done')
}
const loopAudioStart = async (path, audioElement) => {
	audioElement.loop = signal.true;
	audioPlay(path, audioLooped);
}

async function run(foreground, middleground, background) {
	audioPlay('../assets/audio/scene1/intro.ogg');
	console.log(scene1_1_intro.slice(0, WINDLOOP_BEGIN))
	const scene1LandscapeLoop = {isTrue: true};
	loopFrames(background.image, scene1_0_background, scene1LandscapeLoop);
	await drawFrames(foreground.image, scene1_1_intro.slice(0, WINDLOOP_BEGIN));

	audio2.src = '../assets/audio/scene1/wind.ogg';
	audio2.loop = true;
	audio2.play();
	await drawFrames(foreground.image, scene1_1_intro.slice(WINDLOOP_BEGIN));

	while (!start) {
		audioPlay('../assets/audio/scene1/gallop.ogg');
		await drawFrames(foreground.image, scene1_2_ride);
	}
	const brakeShouldRun = {isTrue: true}
	audioPlay('../assets/audio/scene1/brake.ogg');
	loopFrames(middleground.image, scene1_3_brake_Mg, brakeShouldRun);
	await drawFrames(foreground.image, scene1_3_brake_Fg.slice(0, WINDLOOP_END));
	audio2.pause();
	await drawFrames(foreground.image, scene1_3_brake_Fg.slice(WINDLOOP_END, LANDSCAPE_END));
	scene1LandscapeLoop.isTrue = false;
	await drawFrames(foreground.image, scene1_3_brake_Fg.slice(LANDSCAPE_END));
	brakeShouldRun.isTrue = false

	// Scene 2 begin
	await asyncForEach(Array(1), async () => {
		audioPlay('../assets/audio/scene2/snore.ogg');
		await drawFrames(foreground.image, scene2_1_intro);
	});

	typeDialog('The quick green fox jumped over the lazy brown dog');
	audioPlay('../assets/audio/scene2/arrival.ogg');
	await drawFrames(foreground.image, scene2_2_arrival);
	const postArrivalShouldRun = {isTrue: true};
	const postArrivalRoomShouldRun = {isTrue: true};
	drawFrames(middleground.image, scene2_3_postArrivalMg);
	loopFrames(background.image, scene2_3_postArrivalBg, postArrivalRoomShouldRun);
	loopFrames(foreground.image, scene2_3_postArrivalFg, postArrivalShouldRun);
	await sleep(2*1000);
	postArrivalShouldRun.isTrue = false;
	await drawFrames(foreground.image, scene2_4_departure);
	postArrivalRoomShouldRun.isTrue = false;

	// Scene 3 begin
	await drawFrames(foreground.image, scene3_1_end);
}

function sprites() {
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

	drawFrames(fg.image, ['../assets/frames/scene1/1_intro/000.png']);
	const startButton = document.getElementById('start-button');
	startButton.onclick = () => {
		start = true;
		audio1.muted = false; // bypass audioblock
		audio2.muted = false; // bypass audioblock
		startButton.style.display = 'none';
		clearCanvas(fg.context);
		run(fg, mg, bg);
	}

}

sprites();