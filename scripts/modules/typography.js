import { asyncForEach, sleep, waitForClick } from './utils.js';
import { audioPlay } from './audio/utils.js'
import { getAudioChannel } from './audio/index.js';

const messageBox = document.getElementById('text');
const messageContent = document.getElementById('typewriter');

const typewriter = async (message) => {
	let impatient = false;
	messageBox.onclick = () => impatient = true;

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
};

const typewriterCleanup = () => {
	getAudioChannel(3).volume = 0.4;
	audioPlay('assets/audio/textbox.ogg', getAudioChannel(3));
	messageBox.style.display = 'none';
	messageContent.innerHTML = '';
	messageBox.onclick = null;
}

export const typeDialog = async (message) => {
	getAudioChannel(2).volume = 0.1;

	await typewriter(message);
	await waitForClick(messageBox);
	typewriterCleanup();
};

const NUM_OPTIONS = 4;
const options = [...Array(NUM_OPTIONS).keys()].map(i => document.getElementById(`option${i}`));
const multipleChoiceBlock = document.getElementById('multiple-choice-block');
export const multipleChoice = async (question, choices) => {
	await typewriter(question);
	multipleChoiceBlock.style.display = 'flex';

	return new Promise(resolve => {
		options.forEach((option, i) => {
			option.innerHTML = `${String.fromCharCode(0xFEFF0041+i)}: ${choices[i]}`;

			option.onclick = () => {
				multipleChoiceBlock.style.display = 'none';
				typewriterCleanup();
				resolve(choices[i]);
			};
		});
	});
};