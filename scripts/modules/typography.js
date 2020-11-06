import { asyncForEach, sleep, waitForClick } from './utils.js';

const messageBox = document.getElementById('text');
const messageContent = document.getElementById('typewriter');

export const typeDialog = async (message) => {
	messageBox.style.display = 'block';
	await asyncForEach(message, async letter => {
		messageContent.innerHTML += letter;
		await sleep(50);
	});

	await waitForClick(messageBox);
	messageBox.style.display = 'none';
	messageContent.innerHTML = '';
};