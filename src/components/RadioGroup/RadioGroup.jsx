import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import getRandom from '../../util/random';

import RadioButton from '../RadioButton/RadioButton';
import reducers from './RadioGroup.reducers';

const boundClassNames = bindClassNames('RadioGroup');

const {
	func,
	node,
	number,
	string
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"]}
 *
 * This is a group of related radio buttons whose values are mutually exclusive
 * and one whom must be selected any given moment in time.

 * Any props that are not explicitly defined in `propTypes` are spread onto the
 * root element.
 */
const RadioGroup = React.createClass(createLucidComponentDefinition({
	displayName: 'RadioGroup',

	childProps: {
		RadioButton: { ...RadioButton.propTypes }
	},

	reducers,

	propTypes: {
		/**
		 * Should be instances of `RadioGroup.RadioButton` which supports the
		 * same props as `RadioButton`.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed along to the `RadioGroup.RadioButton` children whose `name`
		 * props are ignored.
		 */
		name: string,

		/**
		 * Called when the user clicks on one of the child radio buttons or when
		 * they press the space key while one is in focus, and only called when
		 * the component is in the unselected state.
		 *
		 * Signature: `(selectedIndex, { uniqueId, event }) => {}`
		 */
		onSelect: func,

		/**
		 * Indicates which of the `RadioGroup.RadioButton` children is currently
		 * selected. The index of the last `RadioGroup.RadioButton` child with
		 * `isSelected` equal to true takes precedence over this prop.
		 */
		selectedIndex: number
	},

	getDefaultProps() {
		return {
			name: `${boundClassNames('~')}-${getRandom()}`,
			onSelect: _.noop,
			selectedIndex: 0
		};
	},

	render() {
		const {
			children,
			className,
			name,
			selectedIndex,
			...passThroughs
		} = this.props;

		const radioButtonChildProps = RadioGroup.RadioButton.findInAllAsProps(this.props);
		const selectedIndexFromChildren = _.findLastIndex(radioButtonChildProps, {
			isSelected: true
		});

		// If there are any `RadioGroup.RadioButton` children with `isSelected`
		// equal to true, then the index of the last one should override the
		// value of the `selectedIndex` prop.
		const actualSelectedIndex = selectedIndexFromChildren !== -1 ?
				selectedIndexFromChildren :
				selectedIndex;

		return (
			<span
					{...passThroughs}
					className={classNames(boundClassNames('~'), className)}
			>
				{_.map(radioButtonChildProps, (radioButtonChildProp, index) => {
					return (
						<RadioButton
								{...radioButtonChildProp}
								isSelected={actualSelectedIndex === index}
								key={index}
								uniqueId={index}
								name={name}
								onSelect={this.handleSelected}
						/>
					);
				})}
				{children}
			</span>
		);
	},

	handleSelected(isSelected, { uniqueId, event }) {
		const clickedRadioButtonProps = RadioGroup.RadioButton.findInAllAsProps(this.props)[uniqueId];

		// If the `RadioGroup.RadioButton` child has an `onSelect` prop that is
		// a function, call that prior to calling the group's `onSelect` prop.
		if (_.isFunction(clickedRadioButtonProps.onSelect)) {
			clickedRadioButtonProps.onSelect(isSelected, { uniqueId, event });
		}

		this.props.onSelect(uniqueId, { uniqueId, event });
	}
}));

export default RadioGroup;
