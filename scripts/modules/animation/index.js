import { drawFrames, clearCanvas, draw } from './utils.js'
import { scene1 } from './scene1.js';
import { scene2 } from './scene2.js';
import { scene3 } from './scene3.js';

let foreground;
let middleground;
let background;

const clearAll = (imagesObject) => {
	Object.values(imagesObject).forEach(image => clearCanvas(image.context));
};

export const play = async () => {
	const images = { foreground, middleground, background };

	clearAll(images);
	await scene1(images);
	//clearAll(images);
	await scene2(images);
	//clearAll(images);
	await scene3(images);
};

export const init = () => {
	[foreground, middleground, background] = [
		'foregroundCanvas',
		'middlegroundCanvas',
		'backgroundCanvas'
	].map(canvasId => {
			const context = document.getElementById(canvasId).getContext('2d');
			const imgData = { image: new Image, dx: 0, dy: 0, context };
			imgData.image.onload = () => {
				clearCanvas(context);
				draw(context, imgData);
			}
			return imgData;
		});

	drawFrames(foreground.image, ['../assets/frames/scene1/1_intro/000.png']);
}