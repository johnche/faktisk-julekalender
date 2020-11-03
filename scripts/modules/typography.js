import { asyncForEach, sleep } from './utils.js';

const messageBox = document.getElementById('typewriter');

export const typeDialog = async (message) => {
	messageBox.innerHTML = '';
	await asyncForEach(message, async letter => {
		messageBox.innerHTML += letter;
		await sleep(65);
	})
};