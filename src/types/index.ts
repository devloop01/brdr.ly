export type AxisType = 'x' | 'y';
export type HandleId = 'top' | 'right' | 'bottom' | 'left';

export interface Handle {
	id: HandleId;
	progress: number;
	axis: AxisType;
	position: [number, number];
}

export type Theme = 'light' | 'dark';

export type Mouse = { x: number; y: number };
