import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Switch');
const {
	bool,
	func,
	number,
	object,
	oneOfType,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"]}
 *
 * This is a toggle -- a component that is in one of two particular states at
 * any given moment in time -- that uses a visualization of a physical on/off
 * switch made popular by smartphone OSes to reflect its current state.
 *
 * It uses a hidden native check box control under the hood but leverages other
 * HTML elements to visualize its state.
 */
const Switch = React.createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates whether the component should appear and act disabled by
		 * having a "greyed out" palette and ignoring user interactions.
		 */
		isDisabled: bool,

		/**
		 * Indicates that the component is in the "selected" state when true
		 * and in the "unselected" state when false.
		 */
		isSelected: bool,

		/**
		 * Called when the user clicks on the component or when they press the
		 * space key while the component is in focus.
		 *
		 * Signature: `(isSelected, { uniqueId, event }) => {}`
		 */
		onSelect: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Set an identifier on the component that will be returned when `onSelect`
		 * fires.
		 */
		uniqueId: oneOfType([string, number]),
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop
		};
	},

	componentDidMount() {
		this.nativeElement = this.refs.nativeElement;
	},

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			style,
			...passThroughs
		} = this.props;

		return (
			<span
					className={classNames(boundClassNames('~', {
						'is-disabled': isDisabled,
						'is-selected': isSelected
					}), className)}
					onClick={this.handleClicked}
					onTouchEnd={this.handleClicked}
					style={style}
			>
				<input
						onChange={_.noop}
						{...passThroughs}
						checked={isSelected}
						className={boundClassNames('native')}
						disabled={isDisabled}
						ref='nativeElement'
						type='checkbox'
				/>
				<span className={boundClassNames('visualization-container')} />
				<span className={boundClassNames('visualization-glow')} />
				<span className={boundClassNames('visualization-handle')} />
			</span>
		);
	},

	handleClicked(event) {
		const {
			isDisabled,
			isSelected,
			onSelect,
			uniqueId,
		} = this.props;

		if (!isDisabled) {
			onSelect(!isSelected, { uniqueId, event });
			this.nativeElement.focus();
		}
	}
});

export default Switch;
