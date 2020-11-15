import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay, audioLoopStart, audioLoopStop } from '../audio/utils.js';
import { WINDLOOP_BEGIN } from '../constants.js';
import { getAudioChannel } from '../audio/index.js';
import { typeDialog } from '../typography.js';
import { narrator, santa, oldMan } from './actors.js';

import {
	part0_background as scene1_0_background,
	part1_intro as scene1_1_intro,
	part2_ride as scene1_2_ride
} from './scene1.js';

export const part1_end = fetchAllFrames('scene3/1_end', 29);

export const scene3 = async ({ foreground, middleground, background }) => {
	const channel0 = getAudioChannel(0);
	const channel1 = getAudioChannel(1);

	channel0.volume = 0.3;
	audioPlay('../assets/audio/scene1/intro.ogg', channel0);
	const scene3LandscapeLoop = {isTrue: true};
	loopFrames(background.image, scene1_0_background, scene3LandscapeLoop);
	await drawFrames(middleground.image, scene1_1_intro.slice(0, WINDLOOP_BEGIN));

	channel1.volume = 0.1;
	audioLoopStart('assets/audio/scene1/wind.ogg', channel1);
	await drawFrames(middleground.image, scene1_1_intro.slice(WINDLOOP_BEGIN));

	audioLoopStart('assets/audio/scene1/gallop.ogg', channel0);

	const scene3RideLoop = {isTrue: true}
	loopFrames(middleground.image, scene1_2_ride, scene3RideLoop);
	await typeDialog (narrator, "Og med ny informasjon om både den førkristne og kristne juletradisjonen, dro julenissen raskt videre på sin vei, for nå var han allerede forsinket i sin rute");
	await typeDialog (narrator, "Hva vil stoppe julenissen neste gang? Vil han måtte kjempe mot nordavinden, eller tappert unngå enda et innkommende norwegian fly? Ja, for det er ikke bare julenissen som er på reisefot i juletiden, selv med Corona virus så er det så mange som (kom med noe statistikk) nordmenn som tar fly hjem hvert år, faktisk.")
	await typeDialog (narrator, "Finn ut i neste FAKTISKE kalenderluke.")

	audioLoopStop(channel0);
	audioLoopStop(channel1);

	channel0.volume = 0.5;
	audioPlay('../assets/audio/scene3/end02.ogg', channel0);
	await drawFrames(foreground.image, part1_end);
}