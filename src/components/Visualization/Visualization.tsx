import React from 'react';
import * as d3 from 'd3';
import GraphData, { INode, IEdge } from '../../data/GraphData';

class Visualization extends React.Component {
	private id: string;
	private graphData: GraphData;
	private nodes: INode[];
	private edges: IEdge[];
	private persistedNodes: INode[];
	private persistedEdges: IEdge[];
	private labelNodes: INode[];

	private link: any;
	private persistedLink: any;
	private node: any;
	private label: any;
	private simulation: any;
	private g: any;

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

		this.graphData = new GraphData(sampleResponse);
		this.nodes = this.graphData.getNodes();
		this.edges = [];
		this.persistedNodes = [];
		this.persistedEdges = [];
		this.labelNodes = this.nodes;
	}

	componentDidMount() {
		const width = window.innerWidth;
		const height = window.innerHeight;	
	
		const svg = d3.select('#' + this.id)
			.attr('width', width)
			.attr('height', height);
		
		const zoomContainer = svg.append('g');
		
		svg.call(d3.zoom()
			.extent([[0, 0], [width, height]])
			.scaleExtent([0.25, 4])
			.on("zoom", () => {
				zoomContainer.attr('transform', d3.event.transform);
			}) as any);

		this.g = zoomContainer.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height * 0.4 + ')');

		this.link = this.g.append('g')
			.attr('stroke', '#000')
			.attr('stroke-width', 1.5)
			.selectAll('.link');

		this.persistedLink = this.g.append('g')
			.attr('stroke', '#000')
			.attr('stroke-width', 1.5)
			.selectAll('.pLink');

		this.node = this.g.append('g')
			.attr('stroke', '#fff')
			.attr('stroke-width', 1.5)
			.selectAll('.node');

		this.label = this.g.append('g')
			.selectAll('.label');

		this.g.append('defs').selectAll('marker')
			.data(['#000', '#aaa'])
			.enter().append('marker')
				.attr('id', (type: string) => type)
				.attr('viewBox', '0 -5 10 10')
				.attr('refX', 0)
				.attr('refY', 0)
				.attr('markerWidth', 4)
				.attr('markerHeight', 4)
				.attr('orient', 'auto')
			.append('path')
				.attr('d', 'M0,-5L10,0L0,5')
				.attr('fill', (type: string) => type)

		this.simulation = d3.forceSimulation(this.nodes)
			.force('charge', d3.forceManyBody().strength(-500))
			.force('link', d3.forceLink(this.persistedEdges).distance((edge: IEdge) => 200 + (300 * (1 - edge.weight))))
			.force('x', d3.forceX())
			.force('y', d3.forceY())
			.alphaTarget(1)
			.on('tick', this.tick.bind(this));

		this.restart();
	}

	render() {
		return (
			<svg id={this.id}></svg>
		);
	}

	private tick() {
		this.node
			.attr('cx', (node: INode) => node.x)
			.attr('cy', (node: INode) => node.y);
		this.link
			.attr('d', this.calculateCurvedPath)
			.attr('d', this.calculateArrowOffset);
		this.persistedLink
			.attr('d', this.calculateCurvedPath)
			.attr('d', this.calculateArrowOffset);
		this.label
			.attr('transform', (node: INode) => 'translate(' + node.x + ',' + node.y + ')');
	}

	private restart() {
		this.node = this.node.data(this.nodes, (node: INode) => node.name);
		this.node.exit().remove();
		this.node = this.node.enter().append('circle')
			.on('mouseover', this.onMouseOver.bind(this))
			.on('mouseout', this.onMouseOut.bind(this))
			.on('click', this.onClick.bind(this))
			.attr('id', (node: INode) => node.id)
			.attr('r', (node: INode) => node.size * 10)
			.attr('fill', '#fedcba')
			.call(this.drag(this.simulation))
			.merge(this.node);
		
		this.link = this.link.data(this.edges, (d: IEdge) => d.source.name + '-' + d.target.name);
		this.link.exit().remove();
		this.link = this.link.enter().append('path')
			.attr('stroke', '#aaa')
			.attr('stroke-width', (edge: IEdge) => Math.sqrt(edge.weight) * 4)
			.attr('fill', 'none')
			.attr('marker-end', () => 'url(##aaa)')
			.merge(this.link);

		this.persistedLink = this.persistedLink.data(this.persistedEdges, (d: IEdge) => d.source.name + '-' + d.target.name);
		this.persistedLink.exit().remove();
		this.persistedLink = this.persistedLink.enter().append('path')
			.attr('stroke', '#000')
			.attr('stroke-width', (edge: IEdge) => Math.sqrt(edge.weight) * 4)
			.attr('fill', 'none')
			.attr('marker-end', () => 'url(##000)')
			.merge(this.persistedLink);

		this.label = this.label.data(Array.from(this.labelNodes), (node: INode) => node.id);
		this.label.exit().remove();
		this.label = this.label.enter().append('text')
			.attr('x', (node: INode) => -1 * node.name.length / 4 + 1 + 'em')
			.attr('y', (node: INode) => node.size * 10 + 20)
			.text((node: INode) => node.name)
			.merge(this.label);

		this.simulation.nodes(this.nodes);
		this.simulation.force('link').links(this.persistedEdges);
		this.simulation.alpha(1).restart();
	}

	private onMouseOver(node: INode) {
		this.g.select('#' + node.id).attr('stroke', '#aaa').attr('stroke-width', 4);
		this.edges = this.graphData.getEdgesFrom(node);
		this.restart();
	}

	private onMouseOut(node: INode) {
		this.g.select('#' + node.id).attr('stroke', null).attr('stroke-width', null);
		this.edges = [];
		this.restart();
	}

	private onClick(node: INode) {
		const index = this.persistedNodes.indexOf(node);
		const edgesFromNode = this.graphData.getEdgesFrom(node);
		if (index < 0) {
			this.persistedNodes.push(node);
			this.persistedEdges.push(...edgesFromNode);
		} else {
			this.persistedNodes.splice(index, 1);
			this.persistedEdges = this.persistedEdges.filter((edge) => edgesFromNode.indexOf(edge) < 0);
		}
		
		this.restart();
	}

	private drag(simulation: any): any {
		const onDragStart = (node: any) => {
			if (!d3.event.active) {
				simulation.alphaTarget(0.3).restart();
			}
			node.fx = node.x;
			node.fy = node.y;
		}

		const onDrag = (node: any) => {
			node.fx = d3.event.x;
			node.fy = d3.event.y;
		}

		const onDragEnd = (node: any) => {
			if (!d3.event.active) simulation.alphaTarget(0);
			node.fx = null;
			node.fy = null;
		}

		return d3.drag()
			.on('start', onDragStart)
			.on('drag', onDrag)
			.on('end', onDragEnd);
	};

	private calculateCurvedPath(edge: IEdge): string {
		const dx = edge.target.x - edge.source.x;
		const dy = edge.target.y - edge.source.y;
		const dr = Math.sqrt(dx * dx + dy * dy);
		return 'M' + edge.source.x + ',' + edge.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + edge.target.x + ',' + edge.target.y;
	}

	private calculateArrowOffset(this: any, edge: IEdge): string {
		const pathLength = this.getTotalLength();
		const markerLength = 4 * Math.sqrt(edge.weight * 10);
		const markerSize = Math.sqrt(Math.pow(markerLength, 2) * 2);
		const radius = (edge.target.size * 10) + markerSize;

		const m = this.getPointAtLength(pathLength - radius);
		const dx = m.x - edge.source.x;
		const dy = m.y - edge.source.y;
		const dr = Math.sqrt(dx * dx + dy * dy);

		return 'M' + edge.source.x + ',' + edge.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + m.x + ',' + m.y;
	}
};

export default Visualization;
