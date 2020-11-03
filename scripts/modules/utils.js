export const asyncForEach = async (l, cb) => {
	for (let i = 0; i < l.length; i++) {
		await cb(l[i], i, l);
	}
}

export const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const leftPadZero = (num, length) => num.toString().padStart(length, '0');

export const random = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)) + min;
};
