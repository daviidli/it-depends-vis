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

		this.margin = { top: 250, left: 250, right: 100 };
		this.width = window.innerWidth - this.margin.left - this.margin.right;
		this.height = window.innerHeight - this.margin.top - 100;

		this.changeOrder = this.changeOrder.bind(this);
		this.updateData = this.updateData.bind(this);
		this.appendRow = this.appendRow.bind(this);
		this.appendCol = this.appendCol.bind(this);

		this.loaded = false;
	}

	componentDidMount() {
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
			.style('opacity', 0)
			.style(
				'bottom',
				`${this.height + 40}px`
			)
			.style(
				'right',
				`${this.width + this.margin.right + 20}px`
			);

		const data = this.updateData([''], [[]], 0);

		this.x.domain(this.orderings.descending);

		this.svg.append('rect')
			.attr('class', 'background')
			.attr('width', this.width)
			.attr('height', this.height)
			.style('fill', '#fff');

		this.appendRow(data);
		this.appendCol(data);
	}

	shouldComponentUpdate(nextProps) {
		if (!nextProps.files) {
			return false;
		}

		if (nextProps.ordering !== this.props.ordering) {
			this.changeOrder(nextProps.ordering);
		}

		if (
			nextProps.mappings !== this.props.mappings
			|| nextProps.files !== this.props.files
			|| nextProps.topCount !== this.props.topCount
		) {
			const data = this.updateData(nextProps.files, nextProps.mappings, nextProps.topCount);
			this.x.domain(this.orderings[nextProps.ordering]); // todo: fix to whatever is selected
			this.svg.selectAll('.row').remove();
			this.svg.selectAll('.column').remove();
			this.appendRow(data);
			this.appendCol(data);
		}

		return false;
	}

	appendRow(data) {
		const {
			x, z, colors, tooltip
		} = this;
		const mouseOver = function mouseOver(p) {
			d3.selectAll('.row-label').classed('active', (d, i) => i === p.row);
			d3.selectAll('.col-label').classed('active', (d, i) => i === p.col);
			d3.selectAll(`.cell.row-${p.row}.col-${p.col}`).classed(
				'active',
				true
			);

			tooltip
				.transition()
				.duration(300)
				.style('opacity', 0.9);

			tooltip.append('p').attr('class', '').text(`source: ${p.source}`);
			tooltip.append('p').text(`target: ${p.target}`);
			tooltip.append('p').text(`value: ${p.val * 100}%`);
		};

		const mouseOut = function mouseOut(p) {
			d3.selectAll('.row-label').classed('active', false);
			d3.selectAll('.col-label').classed('active', false);
			d3.selectAll(`.cell.row-${p.row}.col-${p.col}`).classed(
				'active',
				false
			);
			tooltip.transition().duration(300).style('opacity', 0);
			tooltip.selectAll('p').remove();
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
					if (sourcePath.length !== 1 && targetPath.length !== 1) {
						if (sourcePath[0] === targetPath[0]) {
							return colors(sourcePath[0]);
						}
						return '#000';
					}
					return colors('');
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
	ordering: PropTypes.oneOf(['descending', 'ascending', 'directory']).isRequired
};

export default D3;
