import type { Action } from 'svelte/action';
import type { Mouse } from '~/types';

export const shadow: Action<HTMLElement, { mouse: Mouse; maxLength: number; disabled?: boolean }> = (node, options) => {
	const { mouse, maxLength, disabled } = options;

	if (disabled) {
		node.style.removeProperty('--shadow-x');
		node.style.removeProperty('--shadow-y');
		return;
	}

	const rect = node.getBoundingClientRect();

	const centerX = rect.left + rect.width * 0.5;
	const centerY = rect.top + rect.height * 0.5;

	const dx = mouse.x - centerX;
	const dy = mouse.y - centerY;

	const dist = Math.sqrt(dx ** 2 + dy ** 2);

	const angle = Math.atan2(dy, dx);

	const shadowDistance = Math.min(dist, maxLength);
	const shadowX = -Math.cos(angle) * shadowDistance;
	const shadowY = -Math.sin(angle) * shadowDistance;

	node.style.setProperty('--shadow-x', `${shadowX}px`);
	node.style.setProperty('--shadow-y', `${shadowY}px`);
};

