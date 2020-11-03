import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay } from '../audio/utils.js';
import { getAudioChannel } from '../audio/index.js';
import { WINDLOOP_BEGIN, WINDLOOP_END, LANDSCAPE_END } from '../constants.js';

export const part0_background = fetchAllFrames('scene1/0_background', 349);
export const part1_intro = fetchAllFrames('scene1/1_intro', 14);
export const part2_ride = fetchAllFrames('scene1/2_ride', 4);
export const part3_brake_Fg = fetchAllFrames('scene1/3_brake/foreground', 87);
export const part3_brake_Mg = fetchAllFrames('scene1/3_brake/middleground', 87);

export const scene1 = async ({ foreground, middleground, background }) => {
	audioPlay('../assets/audio/scene1/intro.ogg', getAudioChannel(0));
	const scene1LandscapeLoop = {isTrue: true};
	loopFrames(background.image, part0_background, scene1LandscapeLoop);
	await drawFrames(foreground.image, part1_intro.slice(0, WINDLOOP_BEGIN));

	getAudioChannel(1).src = '../assets/audio/scene1/wind.ogg';
	getAudioChannel(1).loop = true;
	getAudioChannel(1).play();
	await drawFrames(foreground.image, part1_intro.slice(WINDLOOP_BEGIN));

	// This was earlier in a while not started loop
	audioPlay('../assets/audio/scene1/gallop.ogg', getAudioChannel(0));
	await drawFrames(foreground.image, part2_ride);

	const brakeShouldRun = {isTrue: true}
	audioPlay('../assets/audio/scene1/brake.ogg', getAudioChannel(0));
	loopFrames(middleground.image, part3_brake_Mg, brakeShouldRun);
	await drawFrames(foreground.image, part3_brake_Fg.slice(0, WINDLOOP_END));
	getAudioChannel(1).pause();
	await drawFrames(foreground.image, part3_brake_Fg.slice(WINDLOOP_END, LANDSCAPE_END));
	scene1LandscapeLoop.isTrue = false;
	await drawFrames(foreground.image, part3_brake_Fg.slice(LANDSCAPE_END));
	brakeShouldRun.isTrue = false
}