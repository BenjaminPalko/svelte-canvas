import type { Vector2 } from '../Vector2';
import { Shape } from './Shape';

export class Circle extends Shape {
	constructor(
		position: Vector2,
		public radius: number
	) {
		super(position);
	}

	UpdatePosition(position: Vector2) {
		return new Circle(position, this.radius);
	}

	Render(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.fillStyle = '#fff';
		context.fill();
	}

	WithinBounds(point: Vector2): boolean {
		const diff = point.Sub(this.position);
		return diff.x <= this.radius || diff.y <= this.radius;
	}
}
