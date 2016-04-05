import _ from 'lodash';
import React from 'react';

const {
	func
} = React.PropTypes;

/**
 * {"categories": ["utility"]}
 *
 * This is a helper component used to capture mouse events to determine when the
 * user starts, is and stops dragging.
 */
const DragCaptureZone = React.createClass({
	propTypes: {
		/**
		 * Called as the user drags the mouse.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDrag: func,
		
		/**
		 * Called when the user releases the mouse button after having dragged.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDragEnd: func,
		
		/**
		 * Called when the user presses the mouse button down while over the
		 * component.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDragStart: func
	},

	getDefaultProps() {
		return {
			onDrag: _.noop,
			onDragEnd: _.noop,
			onDragStart: _.noop
		};
	},

	getInitialState() {
		return {
			pageX: 0,
			pageY: 0
		};
	},

	render() {
		return <div key='DragCaptureZone' {...this.props} onMouseDown={this.handleDragStart} />;
	},

	handleDrag(event) {
		const {
			pageX,
			pageY
		} = event;

		event.preventDefault();

		this.props.onDrag({
			dX: pageX - this.state.pageX,
			dY: pageY - this.state.pageY,
			pageX,
			pageY
		}, {
			event,
			props: this.props
		});
	},

	handleDragEnd(event) {
		const {
			pageX,
			pageY
		} = event;

		event.preventDefault();

		window.document.removeEventListener('mousemove', this.handleDrag);
		window.document.removeEventListener('mouseup', this.handleDragEnd);

		this.props.onDragEnd({
			dX: pageX - this.state.pageX,
			dY: pageY - this.state.pageY,
			pageX,
			pageY
		}, {
			event,
			props: this.props
		});

		this.setState({
			pageX: 0,
			pageY: 0
		});
	},

	handleDragStart(event) {
		const {
			pageX,
			pageY
		} = event;

		event.preventDefault();

		window.document.addEventListener('mousemove', this.handleDrag);
		window.document.addEventListener('mouseup', this.handleDragEnd);

		this.props.onDragStart({
			dX: 0,
			dY: 0,
			pageX,
			pageY
		}, {
			event,
			props: this.props
		});

		this.setState({
			pageX,
			pageY
		});
	}
});

export default DragCaptureZone;