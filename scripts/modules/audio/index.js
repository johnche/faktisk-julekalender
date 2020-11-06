let audioChannels;

export const unmute = () => audioChannels.forEach(channel => channel.muted = false);

export const getAudioChannel = (index) => {
	if (index >= audioChannels.length || index < 0) {
		throw new Error(
			`Channel index ${index} out of bounds. Number of channels: ${audioChannels.length}`
			);
	}
	return audioChannels[index];
};

export const setAllVolume = (volume) => {
	audioChannels.forEach(channel => channel.volume = volume);
};

export const audioStopAll = () => {
	audioChannels.forEach(channel => channel.pause());
}

export const init = ({numChannels = 1, defaultVolume = 0.5}) => {
	audioChannels = Array(numChannels).fill().map(() => new Audio());
	audioChannels.forEach(channel => {
		channel.muted = true;
		channel.volume = defaultVolume;
	});
};