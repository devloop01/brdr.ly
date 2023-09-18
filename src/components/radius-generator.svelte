<div class="generator">
	<div class="generator-shape__wrapper">
		<div class="generator-shape" />
	</div>
	<!-- {containment &&
	  handles.map((handle) => (
		<Handle
		  handle={handle}
		  containment={containment}
		  onHandleUpdate={onChangeHandler}
		></Handle>
	  ))} -->
</div>

<style lang="postcss">
	.generator {
		--mouse-x: 0;
		--mouse-y: 0;

		position: relative;
		margin: 0 auto;
		height: 60vmin;
		width: 60vmin;
		padding: theme(padding.4);

		&:hover {
			& > .radius-handle:hover,
			& > .radius-handle:hover::before {
				opacity: 1;
				scale: 1;
			}

			& > .radius-handle:not(:hover),
			& > .radius-handle:not(:hover)::before {
				scale: 0.75;
				opacity: 0.75;
			}

			& > .generator-shape__wrapper {
				border-color: rgb(255 255 255 / 0.75);
			}
		}
	}

	.generator-shape__wrapper {
		height: 100%;
		width: 100%;
		border: 2px dashed rgb(255 255 255 / 0.25);
		transition-property: border;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}

	.generator-shape {
		height: 100%;
		width: 100%;
		border: 1px solid var(--purple-light);
		background: var(--purple-light);
		background: radial-gradient(
			circle at var(--mouse-x) var(--mouse-y),
			var(--purple-light) 0%,
			var(--purple-dark) 100%
		);
		box-shadow: 1.25rem 1.25rem 0 0 rgb(0 0 0 / 0.2);
	}
</style>
