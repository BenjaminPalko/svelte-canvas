import type { Vector2 } from "../Vector2";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
	constructor(
		position: Vector2,
		public readonly dimensions: Vector2,
	) {
		super(position);
	}

	UpdatePosition(position: Vector2) {
		return new Rectangle(position, this.dimensions);
	}

	Render(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.fillStyle = "#fff";
		context.fillRect(
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y,
		);
	}

	WithinBounds(point: Vector2): boolean {
		const diff = point.Sub(this.position);
		return diff.x <= this.dimensions.x || diff.y <= this.dimensions.y;
	}
}
