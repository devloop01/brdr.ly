export type AxisType = 'x' | 'y';

export interface Handle {
	id: 'top' | 'right' | 'bottom' | 'left';
	progress: number;
	axis: AxisType;
	position: [number, number];
}

