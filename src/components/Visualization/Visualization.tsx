import React, { useEffect } from 'react';
import * as d3 from 'd3';
import GraphData, { INode, IEdge } from '../../data/GraphData';

const Visualization = () => {
	const id = 'visualization';

	const sampleResponse = {
		names: ['constructor (A)', 'main (A)', 'receiveInput (A)', 'constructor (B)', 'doSomething (B)', 'doSomethingElse (B)', 'constructor (C1)', 'foo (C1)', 'constructor (C2)', 'barbar (C2)'],
		size: [1,1,6,2,4,1,1,2,1,1],
		data: [
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

	const graphData: GraphData = new GraphData(sampleResponse);
	const nodes: any[] = graphData.getNodes();
	const edges: any[] = graphData.getEdges();

	const drag = (simulation: any): any => {
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

	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;	
	
		const svg = d3.select('#' + id)
			.attr('width', width)
			.attr('height', height);

		const simulation = d3.forceSimulation(nodes)
			.force('link', d3.forceLink(edges).id((edge: any) => edge.id).distance(500).strength(0.3))
			.force('charge', d3.forceManyBody().strength((node: any) => node.size * -500))
			.force('center', d3.forceCenter(width / 2, height / 2));

		const link = svg.append('g')
			.selectAll('path')
			.data(edges)
			.enter()
			.insert('path')
				.attr('class', 'link')
				.attr('stroke', '#000')
				.attr('stroke-width', (edge) => Math.sqrt(edge.weight * 10))
				.attr('fill', 'none')
				.attr('marker-end', function(d) { return 'url(#arrow)'; })

		const node = svg.append('g')
				.attr('stroke', '#fff')
				.attr('stroke-width', 1.5)
			.selectAll('circle')
			.data(nodes)
			.join('circle')
				.attr('r', (d: any) => d.size * 10)
				.attr('fill', '#fedcba')
				.call(drag(simulation));

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
				.attr('d', (d) => {
					const dx = d.target.x - d.source.x;
					const dy = d.target.y - d.source.y;
					const dr = Math.sqrt(dx * dx + dy * dy);
					return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
				})
				.attr('d', function(d) {
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
				.attr('cx', (node) => node.x)
				.attr('cy', (node) => node.y);
		});
	}, []);
	
	
	return (
		<svg id={id}></svg>
	);
};

export default Visualization;
