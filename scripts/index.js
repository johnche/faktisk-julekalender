const random = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)) + min;
};

const getSnowflake = (className) => {
	const snowflake = document.createElement('div');
	snowflake.className = className;
	snowflake.style.left = `${random(-5, 105)}vw`;
	snowflake.style.marginTop = '-40px';
	snowflake.style.animationDelay = `${Math.random()*10}s`
	return snowflake;
};

const cloud = document.getElementById('cloud');
const numFlakes = 100;
for (let i = 0; i < numFlakes; i++) {
	cloud.appendChild(getSnowflake('drop'));
}