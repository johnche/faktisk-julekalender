import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay, audioLoopStart, audioLoopStop } from '../audio/utils.js';
import { getAudioChannel } from '../audio/index.js';
import { sleep } from '../utils.js';
import { multipleChoice, typeDialog } from '../typography.js';
import { asyncForEach } from '../utils.js';

export const part1_intro = fetchAllFrames('scene2/1_intro', 23);
export const part2_arrival = fetchAllFrames('scene2/2_arrival', 119);
export const part3_postArrivalFg = fetchAllFrames('scene2/3_post_arrival/foreground', 14);
export const part3_postArrivalMg = fetchAllFrames('scene2/3_post_arrival/middleground', 0);
export const part3_postArrivalBg = fetchAllFrames('scene2/3_post_arrival/background', 11);
export const part3_postArrivalDot = fetchAllFrames('scene2/3_post_arrival/dotdotdot', 27);
export const part4_departure = fetchAllFrames('scene2/4_departure', 12);

export const scene2 = async ({ foreground, middleground, background }) => {
	const channel0 = getAudioChannel(0);
	const channel1 = getAudioChannel(1);

	audioLoopStart('assets/audio/music/scene2.ogg', channel1);

	await asyncForEach(Array(1), async () => {
		channel0.volume = 0.3;
		audioPlay('../assets/audio/scene2/snore.ogg', channel0);
		await drawFrames(foreground.image, part1_intro);
	});

	channel0.volume = 0.5;
	audioPlay('../assets/audio/scene2/arrival.ogg', channel0);
	await drawFrames(foreground.image, part2_arrival);

	const postArrivalShouldRun = {isTrue: true};
	const postArrivalRoomShouldRun = {isTrue: true};
	drawFrames(middleground.image, part3_postArrivalMg);
	loopFrames(background.image, part3_postArrivalBg, postArrivalRoomShouldRun);
	loopFrames(foreground.image, part3_postArrivalFg, postArrivalShouldRun);

	channel0.volume = 0.1;
	audioPlay('../assets/audio/scene2/oldMan01.ogg', channel0);
	await typeDialog ("Unnskyld meg, men er ikke du sjølveste julenissen?");
	audioPlay('../assets/audio/scene2/oldMan02.ogg', channel0);
	await typeDialog ("Jammen så artig da. Siden du er her, så har du vel ikke tid til et lite spørsmål fra en gammel fis?");
	audioPlay('../assets/audio/scene2/oldMan03.ogg', channel0);

	const possibleChoices = [
		'Saturnalia og romerriket',
		'Blót og vikingene',
		'Jesus, keiseren og paven',
		'Finn på noe sært'
	];
	const userChoice = await multipleChoice('Hvor kommer julen fra??', possibleChoices);
	switch (userChoice) {
		case possibleChoices[0]: await typeDialog('hmm ok'); break;
		case possibleChoices[1]: await typeDialog('jaså ja'); break;
		case possibleChoices[2]: await typeDialog('du mener, charles ives?'); break;
		case possibleChoices[3]: await typeDialog('mjåååå'); break;
	}

	postArrivalShouldRun.isTrue = false;
	await drawFrames(foreground.image, part3_postArrivalDot);

	channel0.volume = 0.5;
	audioPlay('../assets/audio/scene2/departure.ogg', channel0);
	await drawFrames(foreground.image, part4_departure);

	audioLoopStop(channel1);

	postArrivalRoomShouldRun.isTrue = false;
}