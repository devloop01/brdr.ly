export type AxisType = 'x' | 'y';
export type HandleId = 'top' | 'right' | 'bottom' | 'left';

export interface Handle {
	id: HandleId;
	progress: number;
	axis: AxisType;
	position: [number, number];
}

