import * as snow from './modules/snow.js';
import * as audio from './modules/audio/index.js';
import * as animation from './modules/animation/index.js'
import { audioPlay } from './modules/audio/utils.js'

function main() {
	const audioConfig = {
		defaultVolume: 0.5,
		numChannels: 4
	};

	snow.init();
	audio.init(audioConfig);
	animation.init();

	const startButton = document.getElementById('start-button');
	startButton.onclick = () => {
		audio.unmute(); // bypass audioblock
		audioPlay('assets/audio/button.ogg', audio.getAudioChannel(2));
		startButton.style.display = 'none';
		animation.play();
	}
}

main();