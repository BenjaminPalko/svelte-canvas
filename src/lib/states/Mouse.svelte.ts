import { Vector2 } from "../types/Vector2";

type ButtonStateType = (typeof ButtonState)[keyof typeof ButtonState];

const ButtonState = {
	UP: "up",
	DOWN: "down",
};

export class Mouse {
	inCanvas: boolean;
	position: Vector2;
	leftButton: ButtonStateType;
	rightButton: ButtonStateType;

	readonly ButtonState = ButtonState;

	constructor() {
		this.inCanvas = false;
		this.position = Vector2.Zero;
		this.leftButton = ButtonState.UP;
		this.rightButton = ButtonState.UP;
	}
}

const mouse = $state(new Mouse());

export default mouse;
