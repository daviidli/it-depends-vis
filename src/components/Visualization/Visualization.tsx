import React from 'react';
import * as d3 from 'd3';
import GraphData, { INode, IEdge } from '../../data/GraphData';

class Visualization extends React.Component {
	private id: string;
	private graphData: GraphData;
	private nodes: INode[];
	private edges: IEdge[];

	constructor(props: any) {
		super(props);
		this.id = 'visualization';

		const sampleResponse = {
			names: ['constructor (A)', 'main (A)', 'receiveInput (A)', 'constructor (B)', 'doSomething (B)', 'doSomethingElse (B)', 'constructor (C1)', 'foo (C1)', 'constructor (C2)', 'barbar (C2)'],
			size: [1,1,6,2,4,1,1,2,1,1],
			data: [
				[1,1,0.166666667,0.5,0.25,0,0,0,0,0],
				[1,1,0.166666667,0.5,0.25,0,0,0,0,0],
				[1,1,1,1,0.75,1,1,1,1,0],
				[1,1,0.333333333,1,0.25,1,0,0,0,0],
				[1,1,0.5,0.5,1,0,0,0.5,0,0],
				[0,0,0.166666667,0.5,0,1,0,0,0,0],
				[0,0,0.166666667,0,0,0,1,0.5,1,0],
				[0,0,0.333333333,0,0.25,0,1,1,1,0],
				[0,0,0.166666667,0,0,0,1,0.5,1,0],
				[0,0,0,0,0,0,0,0,0,1]
			]
		};

		// const sampleResponse = {
		// 	names: ['A', 'B'],
		// 	size: [2, 4],
		// 	data: [
		// 		[1, 0.3],
		// 		[0.6, 1]
		// 	]
		// }

		this.graphData = new GraphData(sampleResponse);
		this.nodes = this.graphData.getNodes();
		this.edges = this.graphData.getEdges();
	}

	componentDidMount() {
		const width = window.innerWidth;
		const height = window.innerHeight;	
	
		const svg = d3.select('#' + this.id)
			.attr('width', width)
			.attr('height', height);

		const simulation = d3.forceSimulation(this.nodes)
			.force('link', d3.forceLink(this.edges).id((edge: any) => edge.id).distance(200).strength(1))
			.force('charge', d3.forceManyBody().strength((node: any) => node.size * -100))
			.force('center', d3.forceCenter(width / 2, height / 2));

		const link = svg.append('g')
			.selectAll('path')
			.data(this.edges)
			.enter()
			.insert('path')
				.attr('class', (e: any) => 'src_' + e.source.name.replace(' ', '').replace('(', '').replace(')', '') + ' ' + 'tar_' + e.target.name.replace(' ', '').replace('(', '').replace(')', ''))
				.attr('stroke', '#000')
				.attr('stroke-width', (edge: any) => Math.sqrt(edge.weight * 10))
				.attr('fill', 'none')
				.attr('marker-end', function(d) { return 'url(#arrow)'; })
				.attr('opacity', 0);

		const node = svg.append('g')
				.attr('stroke', '#fff')
				.attr('stroke-width', 1.5)
			.selectAll('circle')
			.data(this.nodes)
			.join('circle')
				.on('click', function(d: any) {
					const node = svg.select('.' + d.name.replace(' ', '').replace('(', '').replace(')', ''));

					let opacity = 0;
					if (node.attr('active') !== '1') {
						opacity = 1;
					}

					svg.select('.' + d.name.replace(' ', '').replace('(', '').replace(')', ''))
							.attr('active', opacity);
					svg.selectAll('.src_' + d.name.replace(' ', '').replace('(', '').replace(')', ''))
						.attr('opacity', opacity);
				})
				.attr('r', (d: any) => d.size * 10)
				.attr('fill', '#fedcba')
				.attr('class', (d: any) => d.name.replace(' ', '').replace('(', '').replace(')', ''))
				.call(this.drag(simulation));

		svg.append('defs').selectAll('marker')
				.data(['arrow'])
			.enter().append('marker')
				.attr('id', (type) => type)
				.attr('viewBox', '0 -5 10 10')
				.attr('refX', 0)
				.attr('refY', 0)
				.attr('markerWidth', 6)
				.attr('markerHeight', 6)
				.attr('orient', 'auto')
			.append('path')
				.attr('d', 'M0,-5L10,0L0,5');

		simulation.on('tick', () => {
			link
				.attr('d', (d: any) => {
					const dx = d.target.x - d.source.x;
					const dy = d.target.y - d.source.y;
					const dr = Math.sqrt(dx * dx + dy * dy);
					return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
				})
				.attr('d', function(d: any) {
					const pathLength = this.getTotalLength();
					const markerLength = 5 * Math.sqrt(d.weight * 10);
					const markerSize = Math.sqrt(Math.pow(markerLength, 2) * 2);
					const radius = (d.target.size * 10) + markerSize;

					const m = this.getPointAtLength(pathLength - radius);
					const dx = m.x - d.source.x;
					const dy = m.y - d.source.y;
					const dr = Math.sqrt(dx * dx + dy * dy);

					return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + m.x + ',' + m.y;
				});
			node
				.attr('cx', (node: any) => node.x)
				.attr('cy', (node: any) => node.y);
		});
	}

	render() {
		return (
			<svg id={this.id}></svg>
		);
	}

	private drag(simulation: any): any {
		const onDragStart = (d: any) => {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		const onDrag = (d: any) => {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		const onDragEnd = (d: any) => {
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return d3.drag()
			.on('start', onDragStart)
			.on('drag', onDrag)
			.on('end', onDragEnd);
	};
};

export default Visualization;
