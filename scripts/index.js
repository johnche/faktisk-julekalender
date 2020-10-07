const random = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)) + min;
};

const unequalRandom = () => Math.random() >= 0.6;

const getSnowflake = (className) => {
	const snowflake = document.createElement('div');
	const randomNum = Math.random();
	const animationClass = randomNum < 0.25
		? 'backgroundFlake'
		: randomNum >= 0.25 && randomNum < 0.5
		? 'semibackgroundFlake'
		: randomNum >= 0.5 && randomNum < 0.75
		? 'semiforegroundFlake'
		: 'foregroundFlake';
	snowflake.classList.add(animationClass)
	snowflake.classList.add(className);

	snowflake.style.left = `${random(-5, 105)}vw`;
	snowflake.style.marginTop = '-40px';
	//snowflake.style.animation = unequalRandom() ? animation1 : animation2;
	snowflake.style.animationDelay = `${Math.random()*-10}s`
	return snowflake;
};

const cloud = document.getElementById('cloud');
const numFlakes = 400;
for (let i = 0; i < numFlakes; i++) {
	cloud.appendChild(getSnowflake('drop'));
}