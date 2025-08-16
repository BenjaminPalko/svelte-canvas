export class Vector2 {
	public readonly x: number;
	public readonly y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static get Zero() {
		return new Vector2(0, 0);
	}

	get Magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Add(other: Vector2) {
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	Sub(other: Vector2) {
		return new Vector2(this.x - other.x, this.y - other.y);
	}

	Scale(magnitude: number) {
		return new Vector2(this.x * magnitude, this.y * magnitude);
	}

	Dot(other: Vector2) {
		return this.x * other.x + this.y * other.y;
	}

	Lerp(other: Vector2, t: number) {
		return new Vector2(
			this.lerp(this.x, other.x, t),
			this.lerp(this.y, other.y, t),
		);
	}

	private lerp(v0: number, v1: number, t: number) {
		return (1 - t) * v0 + t * v1;
	}
}
