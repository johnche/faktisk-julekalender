import { asyncForEach, sleep, waitForClick } from './utils.js';
import { audioPlay } from './audio/utils.js'
import { getAudioChannel } from './audio/index.js';

const messageBox = document.getElementById('text');
const messageContent = document.getElementById('typewriter');

export const typeDialog = async (message) => {
	let impatient = false;
	messageBox.onclick = () => impatient = true;

	getAudioChannel(2).volume = 0.02;
	messageBox.style.display = 'block';
	await asyncForEach(message, async letter => {
		if (impatient) {
			messageContent.innerHTML = message;
			return false;
		}
		messageContent.innerHTML += letter;
		await audioPlay('assets/audio/text.ogg', getAudioChannel(2));
		await sleep(40);
	});

	await waitForClick(messageBox);
	messageBox.style.display = 'none';
	messageContent.innerHTML = '';
	messageBox.onclick = null;
};