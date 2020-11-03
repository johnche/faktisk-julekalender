import { sleep } from '../utils.js';

export const audioPlay = async (path, audioElement) => {
	if (audioElement.src !== path) {
		audioElement.src = path;
	}

	// Wait for the player to load file
	await audioElement.play();
	// Exit the function after the duration of the audiofile
	await sleep(audioElement.duration*1000);
}

export const loopAudioStart = async (path, audioElement) => {
	// TODO fix?
	audioElement.loop = signal.true;
	audioPlay(path, audioLooped);
}