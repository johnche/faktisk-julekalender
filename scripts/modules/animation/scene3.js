import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay } from '../audio/utils.js';
import { sleep } from '../utils.js';
import { WINDLOOP_BEGIN } from '../constants.js';
import { getAudioChannel } from '../audio/index.js';
import {
	part0_background as scene1_0_background,
	part1_intro as scene1_1_intro,
	part2_ride as scene1_2_ride
} from './scene1.js';

export const part1_end = fetchAllFrames('scene3/1_end', 29);

export const scene3 = async ({ foreground, middleground, background }) => {
	audioPlay('../assets/audio/scene1/intro.ogg', getAudioChannel(0));
	console.log(scene1_1_intro.slice(0, WINDLOOP_BEGIN))
	const scene3LandscapeLoop = {isTrue: true};
	loopFrames(background.image, scene1_0_background, scene3LandscapeLoop);
	await drawFrames(middleground.image, scene1_1_intro.slice(0, WINDLOOP_BEGIN));

	getAudioChannel(1).src = '../assets/audio/scene1/wind.ogg';
	getAudioChannel(1).loop = true;
	getAudioChannel(1).play();
	await drawFrames(middleground.image, scene1_1_intro.slice(WINDLOOP_BEGIN));

	getAudioChannel(0).src = '../assets/audio/scene1/gallop.ogg';
	getAudioChannel(0).loop = true;
	getAudioChannel(0).play();
	const scene3RideLoop = {isTrue: true}
	loopFrames(middleground.image, scene1_2_ride, scene3RideLoop);

	await sleep(4*1000); // placeholder for epilogue text

	getAudioChannel(0).pause();
	getAudioChannel(1).pause();
	audioPlay('../assets/audio/scene3/end.ogg', getAudioChannel(0));
	await drawFrames(foreground.image, part1_end);
}