import { sleep } from '../utils.js';

export const audioPlay = async (path, audioElement) => {
	if (audioElement.src !== path) {
		audioElement.src = path;
	}

	// Wait for the player to load file
	await audioElement.play();
	// Exit the function after the duration of the audiofile
	await sleep(audioElement.duration*1000);
};

export const audioLoopStart = (path, audioElement) => {
	audioElement.loop = true;
	audioElement.src = path;
	audioElement.play();
};

export const audioLoopStop = audioElement => {
	audioElement.loop = false;
	audioElement.pause();
};