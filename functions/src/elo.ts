import { Cat } from './models';

export const getExpected = (a: number, b: number) => {
	return 1 / (1 + Math.pow(10, (b - a) / 400));
};

export const calculateNewRating = (cat: Cat, win: boolean) => {
	const { elo, projectedElo } = cat;
	return Math.round(elo + 32 * ((win ? 1 : 0) - projectedElo));
};
