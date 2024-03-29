import { drawFrames, loopFrames, fetchAllFrames } from './utils.js';
import { audioPlay, audioLoopStart, audioLoopStop } from '../audio/utils.js';
import { getAudioChannel } from '../audio/index.js';
import { multipleChoice, typeDialog } from '../typography.js';
import { asyncForEach } from '../utils.js';
import { santa, oldMan } from './actors.js';

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
	audioPlay('../assets/audio/scene2/oldMan/oldMan01.ogg', channel0);
	await typeDialog(oldMan, "Unnskyld meg, men er ikke du sjølveste julenissen?", '#8a2a32', '#6e2128');
	audioPlay('../assets/audio/scene2/oldMan/oldMan02.ogg', channel0);
	await typeDialog(oldMan, "Jammen så artig da. Siden du er her, så har du vel ikke tid til et lite spørsmål fra en gammel fis?");
	audioPlay('../assets/audio/scene2/oldMan/oldMan03.ogg', channel0);

	const possibleChoices = [
		'Saturnalia og romerriket',
		'Blót og vikingene',
		'Jesus, keiseren og paven',
		'Julenissen reise'
	];
	const userChoice = await multipleChoice(oldMan, 'Hvor kommer julen fra??', possibleChoices);
	channel0.volume = 0.2;
	switch (userChoice) {
		case possibleChoices[0]:
			audioPlay('../assets/audio/scene2/santa/santa01.ogg', channel0);
			await typeDialog(santa, "Jo, før vi feiret fødselen av jesus feiret romerne Saturnalia.");
			audioPlay('../assets/audio/scene2/santa/santa03.ogg', channel0);
			await typeDialog(santa, "En høytid hvor det ble ofret dyr foran saturntempelet med en påfølgende bankett for alle og enhver som levde i Roma.");
			audioPlay('../assets/audio/scene2/santa/santa02.ogg', channel0);
			await typeDialog(santa, 'Likt våre juletradisjoner ble det også gitt gaver, og alle som arbeidet hadde fri.');
			audioPlay('../assets/audio/scene2/oldMan/oldMan04.ogg', channel0);
			await typeDialog(oldMan, "Nei, faktisk så lurte jeg egentlig på vikingenes julefeiring, jól, eller blót.");
			audioPlay('../assets/audio/scene2/oldMan/oldMan05.ogg', channel0);
			await typeDialog(oldMan, "Dette var en offerfest i midten av vintersesongen (Vikingene feiret bare to sesonger, sommer og vinter)");
			audioPlay('../assets/audio/scene2/oldMan/oldMan06.ogg', channel0);
			await typeDialog(oldMan, "Dyr ble slaktet og øl drukket i håp om å tilfredstille Gudene, slik at de kunne bringe solen tilbake. Dette var tross alt den mørkeste tiden av året.");
			break;

		case possibleChoices[1]:
			audioPlay('../assets/audio/scene2/santa/santa01.ogg', channel0);
			await typeDialog(santa, 'Jo, før vi feiret hva vi nå kaller jul feiret vikingene jól, eller blót.');
			audioPlay('../assets/audio/scene2/santa/santa03.ogg', channel0);
			await typeDialog(santa, "Dette var en offerfest i midten av vintersesongen (Vikingene feiret bare to sesonger, sommer og vinter)");
			audioPlay('../assets/audio/scene2/santa/santa02.ogg', channel0);
			await typeDialog(santa, "Dyr ble slaktet og øl drukket i håp om å tilfredstille Gudene, slik at de kunne bringe solen tilbake. Dette var tross alt den mørkeste tiden av året.");
			audioPlay('../assets/audio/scene2/oldMan/oldMan04.ogg', channel0);
			await typeDialog(oldMan, "Nei, faktisk så lurte jeg egentlig på den gamle romerske julefeiringen, Saturnalia");
			audioPlay('../assets/audio/scene2/oldMan/oldMan05.ogg', channel0);
			await typeDialog(oldMan, "Dette var en offerfest hvor dyr ble ofret foran saturntempelet med en påfølgende bankett for alle og enhver som levde i Roma");
			audioPlay('../assets/audio/scene2/oldMan/oldMan06.ogg', channel0);
			await typeDialog(oldMan, 'Likt våre juletradisjoner ble det også gitt gaver, og alle som arbeidet hadde fri.');
			break;

		case possibleChoices[2]:
			audioPlay('../assets/audio/scene2/santa/santa01.ogg', channel0);
			await typeDialog(santa, 'Den kristne julen var først feiret under den romerske keiser Constantine, ca 336 A.D i Roma. Ikke lenge etter, 350 A.D. gjorde Pave Julius det offisielt.');
			audioPlay('../assets/audio/scene2/santa/santa03.ogg', channel0);
			await typeDialog(santa, "Ettersom det ikke står noe i bibelen om når Jesus ble født valgte paven og Constantin den 25 desember som kristus sin offisielle fødselsdato.");
			audioPlay('../assets/audio/scene2/santa/santa02.ogg', channel0);
			await typeDialog(santa, "Siden flere hedenske høytider ble feiret rundt denne tiden, er det en stor sannsynlighet for at denne datoen ble valgt i et forsøk på å absorbere de hedenske skikkene inn i den kristne troen.");
			audioPlay('../assets/audio/scene2/oldMan/oldMan04.ogg', channel0);
			await typeDialog(oldMan, "Nei, faktisk så lurte jeg egentlig på den gamle romerske julefeiringen, Saturnalia")
			audioPlay('../assets/audio/scene2/oldMan/oldMan05.ogg', channel0);
			await typeDialog(oldMan, "Dette var en offerfest hvor dyr ble ofret foran saturntempelet med en påfølgende bankett for alle og enhver som levde i Roma");
			audioPlay('../assets/audio/scene2/oldMan/oldMan06.ogg', channel0);
			await typeDialog(oldMan, 'Likt våre juletradisjoner ble det også gitt gaver, og alle som arbeidet hadde fri.');
			break;

		case possibleChoices[3]:
			audioPlay('../assets/audio/scene2/santa/santa01.ogg', channel0);
			await typeDialog(santa, 'Vi feirer jul for å ønske julenissen velkommen. Etter en lang, men lynraske reise er det fint å få et lite klapp på ryggen som takk for innsatsen..');
			audioPlay('../assets/audio/scene2/oldMan/oldMan04.ogg', channel0);
			await typeDialog(oldMan, "Nei, faktisk så lurte jeg egentlig litt på om den kristne julefeiring");
			audioPlay('../assets/audio/scene2/oldMan/oldMan05.ogg', channel0);
			await typeDialog(oldMan, 'Den kristne julen var først feiret under den romerske keiser Constantine, ca 336 A.D i Roma. Ikke lenge etter, 350 A.D. gjorde Pave Julius det offisielt. ');
			audioPlay('../assets/audio/scene2/oldMan/oldMan06.ogg', channel0);
			await typeDialog(oldMan, "Ettersom det ikke står noe i bibelen om når Jesus ble født valgte paven og Constantin den 25 desember som kristus sin offisielle fødselsdato.");
			audioPlay('../assets/audio/scene2/oldMan/oldMan07.ogg', channel0);
			await typeDialog(oldMan, "Siden flere hedenske høytider ble feiret rundt denne tiden, er det en stor sannsynlighet for at denne datoen ble valgt i et forsøk på å absorbere de hedenske skikkene inn i den kristne troen.");
			break;
	}
	postArrivalShouldRun.isTrue = false;
	await drawFrames(foreground.image, part3_postArrivalDot);

	channel0.volume = 0.5;
	audioPlay('../assets/audio/scene2/departure.ogg', channel0);
	await drawFrames(foreground.image, part4_departure);

	audioLoopStop(channel1);

	postArrivalRoomShouldRun.isTrue = false;
}