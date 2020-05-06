/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

const ddd = {
	names: ['file1', 'file2', 'file3', 'file4'],
	mapping: [
		[1, 0.1, 0.2, 0.3],
		[0.4, 1, 0.5, 0.6],
		[0.7, 0.8, 1, 0.9],
		[0.1, 0.2, 0.3, 1]
	]
};

const formatData = (names, mappings) => {
	const ret = [];

	mappings.forEach((row, i) => {
		ret.push(
			row.map((r, j) => ({
				row: i,
				col: j,
				source: names[i],
				target: names[j],
				val: r
			}))
		);
	});

	return ret;
};

const createVis = (width, height, files, mappings) => {
	const margin = { top: 150, left: 50 };

	if (!files) {
		return;
	}
	const data = formatData(files, mappings);

	const x = d3
		.scaleBand()
		.range([0, width])
		.padding(0.05);
	const z = d3.scaleLinear().domain([0, 1]).clamp(true);

	const svg = d3
		.select('#d3-vis')
		.attr('width', width + margin.left)
		.attr('height', height + margin.top)
		.style('margin-left', `${margin.left}px`)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	const orders = {
		normal: d3.range(data.length),
		reverse: d3.range(data.length).reverse()
	};

	const mouseOver = function mouseOver(p) {
		d3
			.selectAll('.row text')
			.classed('active', (d, i) => i === p.row);
		d3
			.selectAll('.column text')
			.classed('active', (d, i) => i === p.col);
		// d3
		// 	.selectAll('.cell')
		// 	.classed('active', d => d.row === p.row || d.col === p.col);
	};

	const mouseOut = function mouseOut() {
		d3
			.selectAll('text')
			.classed('active', false);
		d3
			.selectAll('.cell')
			.classed('active', false);
	};

	const rowFn = function rowFn(row) {
		d3
			.select(this)
			.selectAll('.cell')
			.data(row)
			.enter()
			.append('rect')
			.attr('class', 'cell')
			.attr('x', d => x(d.col))
			.attr('width', x.bandwidth())
			.attr('height', x.bandwidth())
			.style('fill-opacity', d => z(d.val))
			.style('fill', '#000')
			.on('mouseover', mouseOver)
			.on('mouseout', mouseOut);
	};

	const orderFn = function orderFn(value) {
		x.domain(orders[value]);

		const t = svg
			.transition()
			.duration(1000);

		t
			.selectAll('.row')
			.delay((d, i) => 1 * x(i))
			.attr('transform', (d, i) => `translate(0, ${x(i)})`)
			.selectAll('.cell')
			.delay(d => 1 * x(d.row))
			.attr('x', d => x(d.col));

		t
			.selectAll('.column')
			.delay((d, i) => 1 * x(i))
			.attr('transform', (d, i) => `translate(${x(i)})rotate(-90)`);
	};

	x.domain(orders.normal);

	svg
		.append('rect')
		.attr('class', 'background')
		.attr('width', width)
		.attr('height', height)
		.style('fill', '#fff');

	const row = svg
		.selectAll('.row')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'row')
		.attr('transform', (d, i) => `translate(0, ${x(i)})`)
		.each(rowFn);

	row
		.append('line')
		.attr('x2', width);

	row
		.append('text')
		.attr('x', -6)
		.attr('y', x.bandwidth() / 2)
		.attr('dy', '.32em')
		.attr('text-anchor', 'end')
		.text((d, i) => d[i].target);

	const col = svg
		.selectAll('.col')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'column')
		.attr('transform', (d, i) => `translate(${x(i)})rotate(-90)`);

	col
		.append('line')
		.attr('x1', -width);

	col
		.append('text')
		.attr('x', 6)
		.attr('y', x.bandwidth() / 2)
		.attr('dy', '0.32em')
		.attr('text-anchor', 'start')
		.text((d, i) => d[i].source);

	const observer = new MutationObserver(attr => orderFn(attr[0].target.className));
	observer.observe(document.getElementById('order'), { attributes: true });
	return observer;
};

export default createVis;
