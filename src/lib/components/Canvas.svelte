<script lang="ts" module>
	import { type Snippet } from 'svelte';

	type CanvasProps = {
		children?: Snippet;
	};
</script>

<script lang="ts">
	import Mouse from '$lib/states/Mouse.svelte';
	import { Circle, Shape } from '$lib/types/Shapes';
	import { Vector2 } from '$lib/types/Vector2';

	let { children }: CanvasProps = $props();

	let lastFrameTime = $state(0);
	let ref = $state<HTMLCanvasElement>();

	let shapes = $state<Shape[]>([]);
	let selected = $state<Shape>();

	$effect(() => {
		requestAnimationFrame((time) => redraw(time));
	});

	function redraw(delta: number) {
		if (!ref) {
			return;
		}
		ref.width = window.innerWidth;
		ref.height = window.innerHeight;

		const context = ref!.getContext('2d')!;
		context.reset();

		if (Mouse.inCanvas && Mouse.leftButton == Mouse.ButtonState.DOWN && selected) {
			selected = selected.UpdatePosition(selected.position.Lerp(Mouse.position, delta * 0.02));
		}

		shapes.forEach((shape) => shape.Render(context));
		requestAnimationFrame((time) => {
			redraw(time - lastFrameTime);
			lastFrameTime = time;
		});
	}

	function onMouseEnter(event: MouseEvent) {
		Mouse.inCanvas = true;
	}
	function onMouseLeave(event: MouseEvent) {
		Mouse.inCanvas = false;
	}
	function onMouseDown(event: MouseEvent) {
		event.preventDefault();
		Mouse.leftButton = Mouse.ButtonState.DOWN;
		Mouse.position = new Vector2(event.x, event.y);
		selected = shapes.find((shape) => shape.WithinBounds(Mouse.position));
		if (!selected) {
			shapes.push(new Circle(Mouse.position, 10));
		}
	}
	function onMouseUp(event: MouseEvent) {
		event.preventDefault();
		Mouse.leftButton = Mouse.ButtonState.UP;
		selected = undefined;
	}
	function onMouseMove(event: MouseEvent) {
		Mouse.position = new Vector2(event.x, event.y);
	}
</script>

<canvas
	class="bg-slate-800"
	bind:this={ref}
	draggable="false"
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
	onmousedown={onMouseDown}
	onmouseup={onMouseUp}
	onmousemove={onMouseMove}
>
	{@render children?.()}
</canvas>
