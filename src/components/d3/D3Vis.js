import * as d3 from 'd3';
import { prop } from 'ramda';

const tree = d3.tree().nodeSize([10, 10]);

const diagonal = d3.linkHorizontal().x(prop('x')).y(prop('y'));

const createVis = (width, height) => {

	const edgeWeight = d3
		.scaleLinear()
		.domain([0, 100])
		.range([0, 100]);


	const svg = d3
		.select('div#d3-vis')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g');
};

export default createVis;
