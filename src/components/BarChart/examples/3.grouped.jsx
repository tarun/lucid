import React from 'react';
import BarChart from '../BarChart';

const data = [
	{ x: 'Monday', apples: 10, pears: 20, peaches: 35 },
	{ x: 'Tuesday', apples: 20, pears: 5, peaches: 20 },
	{ x: 'Wednesday', apples: 5, pears: 15, peaches: 5 },
];

export default React.createClass({
	render() {
		return (
			<div>
				<BarChart
					data={data}
					yAxisFields={['apples', 'pears', 'peaches']}
					yAxisMin={0}
					yAxisTitle='Fruit Count'
				/>
			</div>
		);
	},
});
