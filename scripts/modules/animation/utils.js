import {
	asyncForEach,
	sleep,
	leftPadZero
} from '../utils.js';

export const drawFrames = async (
	drawnImage,
	frames,
	shouldDraw={isTrue: true},
	delay=100
	) => {
	await asyncForEach(frames, async frame => {
		if (!shouldDraw.isTrue) {
			return;
		}
		drawnImage.src = frame;
		await sleep(delay);
	});
};

export const loopFrames = async (image, frames, signal) => {
	// To keep reference to outside variable, wrap the condition boolean in object
	while(signal.isTrue) {
		await drawFrames(image, frames, signal);
	}
};

export const getFramePath = (frameType, i) => {
	return `../assets/frames/${frameType}/${leftPadZero(i, 3)}.png`;
};

export const fetchAllFrames = (frameType, numFrames) => {
	return [...Array(numFrames + 1).keys()].map(i => getFramePath(frameType, i));
};

export const clearCanvas = context => {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

export const draw = (context, options) => {
	context.drawImage(
		options.image,
		options.dx,
		options.dy
	);
};
