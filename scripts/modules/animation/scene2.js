import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay } from '../audio/utils.js';
import { getAudioChannel } from '../audio/index.js';
import { sleep } from '../utils.js';
import { typeDialog } from '../typography.js';
import { asyncForEach } from '../utils.js';

export const part1_intro = fetchAllFrames('scene2/1_intro', 23);
export const part2_arrival = fetchAllFrames('scene2/2_arrival', 119);
export const part3_postArrivalFg = fetchAllFrames('scene2/3_post_arrival/foreground', 14);
export const part3_postArrivalMg = fetchAllFrames('scene2/3_post_arrival/middleground', 0);
export const part3_postArrivalBg = fetchAllFrames('scene2/3_post_arrival/background', 11);
export const part4_departure = fetchAllFrames('scene2/4_departure', 12);

export const scene2 = async ({ foreground, middleground, background }) => {
	await asyncForEach(Array(1), async () => {
		audioPlay('../assets/audio/scene2/snore.ogg', getAudioChannel(0));
		await drawFrames(foreground.image, part1_intro);
	});

	audioPlay('../assets/audio/scene2/arrival.ogg', getAudioChannel(0));
	await drawFrames(foreground.image, part2_arrival);

	const postArrivalShouldRun = {isTrue: true};
	const postArrivalRoomShouldRun = {isTrue: true};
	drawFrames(middleground.image, part3_postArrivalMg);
	loopFrames(background.image, part3_postArrivalBg, postArrivalRoomShouldRun);
	loopFrames(foreground.image, part3_postArrivalFg, postArrivalShouldRun);

	await sleep(2*1000); // placeholder for questions
	postArrivalShouldRun.isTrue = false;

	audioPlay('../assets/audio/scene2/departure.ogg', getAudioChannel(0));
	await drawFrames(foreground.image, part4_departure);
	postArrivalRoomShouldRun.isTrue = false;
}