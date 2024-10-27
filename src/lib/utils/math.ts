export const clamp = (input: number, min: number, max: number): number => {
	return input < min ? min : input > max ? max : input;
};

// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
export const mapRange = (current: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
	const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
	return clamp(mapped, out_min, out_max);
};

export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
