import React, { useEffect } from 'react';
import * as d3 from 'd3';
import GraphData, { INode } from '../../data/GraphData';

const Visualization = () => {
	const className = 'visualization';

	useEffect(() => {
		const sampleResponse = {
			names: ["Foo.java", "Bar.java", "Baz.java"],
			size: [10, 20, 30],
			data: [
				[1, 0.2, 0.8],
				[0.5, 1, 0.3],
				[0.7, 0.6, 1]
			]
		};

		const graphData: GraphData = new GraphData(sampleResponse);
		const nodes: any[] = graphData.getNodes();
		const edges: any[] = graphData.getEdges();
	
		const width = window.innerWidth;
		const height = window.innerHeight;	
	
		const svg = d3.select('.' + className)
			.attr('width', width)
			.attr('height', height);
	
		const simulation = d3.forceSimulation()
			.force('charge', d3.forceManyBody().strength(-50))
			.force('link', d3.forceLink(edges))
			.force('center', d3.forceCenter(width / 2, height / 2));
		
		const renderedNodes = svg.append('g')
			.selectAll('g')
			.data(nodes)
			.enter().append('circle')
				.attr('r', (data) => data.size)
				.attr('fill', 'red');

		const linkElements = svg.append('g')
			.selectAll('line')
			.data(edges)
			.enter().append('line')
				.attr('stroke-width', (edge: any) => edge.weight)
				.attr('stroke', '#aaa');

	
		simulation.nodes(nodes).on('tick', () => {
			renderedNodes
				.attr('cx', (node) => node.x)
				.attr('cy', (node) => node.y)
			linkElements
				.attr('x1', (edge: any) => {
					console.log(edge)
					return 0;
				})
				.attr('y1', (edge) => edge.source.y)
				.attr('x2', (edge) => edge.target.x)
				.attr('y2', (edge) => edge.target.y)
		});
		
		const dragDrop: any = d3.drag()
			.on('start', (node: any) => {
				node.fx = node.x;
				node.fy = node.y;
			})
			.on('drag', (node: any) => {
				simulation.alphaTarget(0.7).restart()
				node.fx = d3.event.x
				node.fy = d3.event.y
			})
			.on('end', (node: any) => {
				if (!d3.event.active) {
					simulation.alphaTarget(0)
				}
				node.fx = null
				node.fy = null
			});

		renderedNodes.call(dragDrop);
			
		
	}, []);
	
	
	return (
		<svg className={className}></svg>
	);
};

export default Visualization;