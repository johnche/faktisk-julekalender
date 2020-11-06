import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay } from '../audio/utils.js';
import { getAudioChannel } from '../audio/index.js';
import { WINDLOOP_BEGIN, WINDLOOP_END, LANDSCAPE_END } from '../constants.js';
import { typeDialog } from '../typography.js';

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
	// getAudioChannel(1).src = '../assets/audio/scene1/wind.ogg';
	// getAudioChannel(1).loop = true; 
	// getAudioChannel(1).play();
	await drawFrames(foreground.image, part1_intro.slice(WINDLOOP_BEGIN));

	//can I have this playing once, then go straight to the loop? 
	audioPlay('../assets/audio/music/intro_scene1.ogg', getAudioChannel(1));
	getAudioChannel(1).src = '../assets/audio/music/scene1.ogg';
	getAudioChannel(1).loop = true; 
	getAudioChannel(1).play();

	getAudioChannel(0).src = '../assets/audio/scene1/gallop.ogg';
	getAudioChannel(0).loop = true;
	getAudioChannel(0).play();
	const loopRide = {isTrue: true};
	loopFrames(foreground.image, part2_ride, loopRide);
	await typeDialog('Julenissen har endelig begynt på sin lange reise verden rundt, for å levere julegavene i god tid før julaften.');
	await typeDialog('Som regel så er det en blanding av dårlig vær og sikte, eller et og annet utilregnelig flygende objekt som er den største tidstyven for julenissen');
	await typeDialog('Men i år, i en liten bygd i Norge, er det faktisk noe litt annet som vil sette kjepper i reinsdyrene på hans vei...');
	loopRide.isTrue = false;
	getAudioChannel(0).loop = false;

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