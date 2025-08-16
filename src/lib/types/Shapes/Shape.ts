import type { Vector2 } from '../Vector2';

export abstract class Shape {
	constructor(public readonly position: Vector2) {}

	abstract UpdatePosition(position: Vector2): Shape;
	abstract Render(context: CanvasRenderingContext2D): void;
	abstract WithinBounds(point: Vector2): boolean;
}
