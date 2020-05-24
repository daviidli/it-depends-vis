/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './D3.scss';

class D3 extends React.Component {
	static getTopMappings(files, mappings, topCount) {
		const summedMappings = mappings.map((m, i) => ({
			total: m.reduce((acc, val) => acc + val),
			index: i
		}));
		summedMappings.sort((a, b) => b.total - a.total);
		const newIndexes = summedMappings
			.slice(0, topCount)
			.map(m => m.index);
		return {
			topMappings: newIndexes.map(row => newIndexes.map(col => mappings[row][col])),
			topFiles: newIndexes.map(i => files[i])
		};
	}

	static formatData(files, mappings) {
		return mappings.map((row, i) => row.map((r, j) => ({
			row: i,
			col: j,
			source: files[i],
			target: files[j],
			val: r
		})));
	}

	constructor(props) {
		super(props);

		this.margin = {
			top: 250, left: 250, right: 100, bottom: 25
		};
		this.width = props.width - this.margin.left - this.margin.right;
		this.height = this.width + this.margin.bottom;

		this.changeOrder = this.changeOrder.bind(this);
		this.updateData = this.updateData.bind(this);
		this.appendRow = this.appendRow.bind(this);
		this.appendCol = this.appendCol.bind(this);
		this.initializeVis = this.initializeVis.bind(this);
		this.renderData = this.renderData.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		this.initializeVis();
	}

	shouldComponentUpdate(nextProps) {
		const {
			ordering,
			mappings,
			files,
			topCount,
			width,
			height
		} = this.props;
		const {
			ordering: nextOrdering,
			mappings: nextMappings,
			files: nextFiles,
			topCount: nextTopCount,
			width: nextWidth,
			height: nextHeight
		} = nextProps;

		if (width !== nextWidth || height !== nextHeight) {
			return true;
		}

		if (!nextFiles) {
			return false;
		}

		if (nextOrdering !== ordering) {
			this.changeOrder(nextOrdering);
		}

		if (nextMappings !== mappings || nextFiles !== files || nextTopCount !== topCount) {
			this.renderData(nextFiles, nextMappings, nextTopCount, nextOrdering);
		}

		return false;
	}

	componentDidUpdate() {
		const {
			ordering, mappings, files, topCount, width
		} = this.props;
		d3.select('#d3-vis').selectAll('g').remove();
		d3.select('.tooltip').remove();
		this.updateDimensions(width);
		this.initializeVis();
		this.renderData(files, mappings, topCount, ordering);
	}

	updateDimensions(width) {
		this.width = width - this.margin.left - this.margin.right;
		this.height = this.width + this.margin.bottom;
	}

	initializeVis() {
		this.x = d3
			.scaleBand()
			.range([0, this.width])
			.padding(0.05);

		this.z = d3.scaleLinear().domain([0, 1]).clamp(true);

		this.svg = d3
			.select('#d3-vis')
			.attr('width', this.width + this.margin.left)
			.attr('height', this.height + this.margin.top)
			.append('g')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

		this.tooltip = d3
			.select('.vis')
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0);

		this.svg.append('rect')
			.attr('class', 'background')
			.attr('width', this.width)
			.attr('height', this.height)
			.style('fill', '#fff');
	}

	appendRow(data) {
		const {
			x, z, colors, tooltip, margin, props
		} = this;
		const mouseOver = function mouseOver(p) {
			d3.selectAll('.row-label').classed('active', (d, i) => i === p.row);
			d3.selectAll('.col-label').classed('active', (d, i) => i === p.col);
			d3.selectAll(`.cell.row-${p.row}.col-${p.col}`).classed(
				'active',
				true
			);

			tooltip.selectAll('p').remove();

			tooltip
				.style('z-index', '1')
				.style(
					'bottom',
					`${props.height - x(p.row) - margin.top - 80}px`
				);

			if (x(p.col) <= props.width / 2) {
				tooltip
					.style('right', 'inherit')
					.style(
						'left',
						`${x(p.col) + margin.left}px`
					);
			} else {
				tooltip
					.style('left', 'inherit')
					.style(
						'right',
						`${props.width - x(p.col) - margin.left - (1.25 * x.bandwidth())}px`
					);
			}

			tooltip
				.transition()
				.duration(300)
				.style('opacity', 0.9);

			tooltip.append('p').attr('class', '').text(`source: ${p.source}`);
			tooltip.append('p').text(`target: ${p.target}`);
			tooltip.append('p').text(`value: ${Math.round(p.val * 10000) / 100}%`);
		};

		const mouseOut = function mouseOut(p) {
			d3.selectAll('.row-label').classed('active', false);
			d3.selectAll('.col-label').classed('active', false);
			d3.selectAll(`.cell.row-${p.row}.col-${p.col}`).classed(
				'active',
				false
			);
			tooltip.transition().duration(300).style('opacity', 0).style('z-index', '-1');
		};

		const appendRow = function appendRow(row) {
			const selectData = d3.select(this)
				.selectAll('.cell')
				.data(row);
			selectData.exit().remove();
			selectData
				.enter()
				.append('rect')
				.attr('class', d => `cell row-${d.row} col-${d.col}`)
				.attr('x', d => x(d.col))
				.attr('width', x.bandwidth())
				.attr('height', x.bandwidth())
				.style('fill-opacity', d => z(d.val))
				.style('fill', d => {
					const sourcePath = d.source.split('/');
					const targetPath = d.target.split('/');

					if (sourcePath.length === 1 && targetPath.length === 1) {
						return colors('');
					}

					if (sourcePath[0] === targetPath[0]) {
						return colors(sourcePath[0]);
					}

					return '#000';
				})
				.on('mouseover', mouseOver)
				.on('mouseout', mouseOut);
		};

		const selectData = this.svg.selectAll('.row').data(data);
		selectData.exit().remove();
		const row = selectData
			.enter()
			.append('g')
			.attr('class', 'row')
			.attr('transform', (d, i) => `translate(0, ${this.x(i)})`)
			.each(appendRow);

		row.append('line').attr('x2', this.width);

		row.append('text')
			.attr('class', 'row-label')
			.attr('x', -6)
			.attr('y', this.x.bandwidth() / 2)
			.attr('dy', '.32em')
			.attr('text-anchor', 'end')
			.text((d, i) => d[i].source.split('/').slice(-1));
	}

	appendCol(data) {
		const selectData = this.svg.selectAll('.column').data(data);
		selectData.exit().remove();
		const col = selectData
			.enter()
			.append('g')
			.attr('class', 'column')
			.attr('transform', (d, i) => `translate(${this.x(i)})rotate(-90)`);

		col.append('line').attr('x1', -this.width);

		col.append('text')
			.attr('class', 'col-label')
			.attr('x', 6)
			.attr('y', this.x.bandwidth() / 2)
			.attr('dy', '0.32em')
			.attr('text-anchor', 'start')
			.text((d, i) => d[i].target.split('/').slice(-1));
	}

	changeOrder(value) {
		this.x.domain(this.orderings[value]);

		const t = this.svg.transition().duration(1000);

		const row = t
			.selectAll('.row')
			.delay((d, i) => 1 * this.x(i))
			.attr('transform', (d, i) => `translate(0, ${this.x(i)})`);

		row.selectAll('.cell')
			.delay(d => 1 * this.x(d.row))
			.attr('x', d => this.x(d.col));

		t.selectAll('.column')
			.delay((d, i) => 1 * this.x(i))
			.attr('transform', (d, i) => `translate(${this.x(i)})rotate(-90)`);
	}

	updateData(files, mappings, topCount) {
		const transposedMappings = mappings[0].map((col, i) => mappings.map(row => row[i]));
		const { topMappings, topFiles } = D3.getTopMappings(
			files,
			transposedMappings,
			topCount
		);
		const data = D3.formatData(topFiles, topMappings);

		this.colors = d3
			.scaleOrdinal(d3.schemeSet1)
			.domain(['', ...topFiles.map(name => name.split('/')[0])]);

		this.orderings = {
			descending: d3.range(data.length),
			ascending: d3.range(data.length).reverse(),
			directory: d3.range(data.length).sort((a, b) => {
				if (topFiles[a] < topFiles[b]) return -1;
				if (topFiles[b] < topFiles[a]) return 1;
				return 0;
			})
		};

		this.x.domain(this.orderings.descending);

		return data;
	}

	renderData(files, mappings, topCount, ordering) {
		const data = this.updateData(files, mappings, topCount);
		this.x.domain(this.orderings[ordering]);
		this.svg.selectAll('.row').remove();
		this.svg.selectAll('.column').remove();
		this.appendRow(data);
		this.appendCol(data);
	}

	render() {
		return (
			<div className="vis-container">
				<div className="vis">
					<svg id="d3-vis" />
				</div>
			</div>
		);
	}
}

D3.propTypes = {
	files: PropTypes.arrayOf(PropTypes.string).isRequired,
	mappings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	topCount: PropTypes.number.isRequired,
	ordering: PropTypes.oneOf(['descending', 'ascending', 'directory']).isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
};

export default D3;
