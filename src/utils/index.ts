import type { Handle } from '~/types';

export * from './cva';
export * from './persisted';
export * from './math';

export function createRadiusTextFromHandles(handles: Handle[]): string {
	// console.log(handles);
	const getHandleProgress = (hId: Handle['id']): number => handles.filter((h) => h.id === hId)[0].progress;

	const top = getHandleProgress('top');
	const right = getHandleProgress('right');
	const bottom = getHandleProgress('bottom');
	const left = getHandleProgress('left');

	let borderRadius = top + '% ';
	borderRadius += 100 - top + '% ';
	borderRadius += 100 - bottom + '% ';
	borderRadius += bottom + '% / ';
	borderRadius += left + '% ';
	borderRadius += right + '% ';
	borderRadius += 100 - right + '% ';
	borderRadius += 100 - left + '% ';
	return borderRadius;
}

export const writeToClipboard = async (str: string) => {
	try {
		await navigator.clipboard.writeText(str);
		console.log('copied to clipboard');
	} catch (err) {
		throw new Error('Failed to copy!');
	}
};

