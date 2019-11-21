import React from 'react';
import * as d3 from 'd3';
import GraphData, { INode, IEdge } from '../../data/GraphData';

interface VisualizationProps {
	percentageLow: number,
	percentageHigh: number,
	graphData: GraphData
};

interface VisualizationState {
	mounted: boolean
};

class Visualization extends React.Component<VisualizationProps, VisualizationState> {
	private id: string;
	private graphData: GraphData;
	private nodes: INode[] = [];
	private edges: IEdge[] = [];
	private persistedNodes: INode[] = [];
	private persistedEdges: IEdge[] = [];

	private link: any;
	private persistedLink: any;
	private node: any;
	private label: any;
	private percentages: any;
	private simulation: any;
	private g: any;

	constructor(props: any) {
		super(props);

		this.id = 'visualization';
		this.graphData = this.props.graphData;
		this.nodes = this.graphData.getNodes();
		this.state = {
			mounted: false
		};
	}

	shouldComponentUpdate(nextProps: VisualizationProps) {
		if (nextProps.graphData !== this.props.graphData) {
			return true;
		} else {
			if (this.state.mounted) {
				this.restart();
			}
			return false;
		}
	}
	
	componentDidUpdate() {
		this.graphData = this.props.graphData;
		this.nodes = this.graphData.getNodes();
		this.edges = [];
		this.persistedEdges = [];

		if (this.state.mounted) {
			this.restart();
		}
	}

	componentDidMount() {
		this.setState({ mounted: true });
		this.startD3Graph();
	}

	render() {
		if (this.state.mounted) {
			this.restart();
		}
		
		return (
			<svg id={this.id}></svg>
		);
	}

	private startD3Graph() {
		const width = window.innerWidth;
		const height = window.innerHeight;	
	
		const svg = d3.select('#' + this.id)
			.attr('width', width)
			.attr('height', height);
		
		const zoomContainer = svg.append('g');
		
		svg.call(d3.zoom()
			.extent([[0, 0], [width, height]])
			.scaleExtent([0.25, 4])
			.on('zoom', () => {
				zoomContainer.attr('transform', d3.event.transform);
			}) as any);

		this.g = zoomContainer.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height * 0.4 + ')');

		this.link = this.g.append('g')
			.attr('stroke', '#000')
			.attr('stroke-width', 1)
			.selectAll('.link');

		this.persistedLink = this.g.append('g')
			.attr('stroke', '#000')
			.attr('stroke-width', 1)
			.selectAll('.pLink');

		this.node = this.g.append('g')
			.attr('stroke', '#000')
			.attr('stroke-width', 4)
			.selectAll('.node');

		this.percentages = this.g.append('text')
			.attr('dy', -5)
			.selectAll('.percentages');

		this.label = this.g.append('g')
			.selectAll('.label');

		this.g.append('defs').selectAll('marker')
			.data(['#000', '#e74c3c'])
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
			.force('charge', d3.forceManyBody().strength(-1000))
			.force('link', d3.forceLink(this.persistedEdges).distance(400).strength(0.05))
			.force('x', d3.forceX().strength(0.1))
			.force('y', d3.forceY().strength(0.1))
			.alphaTarget(1)
			.on('tick', this.tick.bind(this));

		this.restart();
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
		const filteredEdges = this.edges.filter(this.isWithinRange.bind(this));
		const filteredPersistedEdges = this.persistedEdges.filter(this.isWithinRange.bind(this));

		this.node = this.node.data(this.nodes, (node: INode) => node.name);
		this.node.exit().remove();
		this.node = this.node.enter().append('circle')
			.on('mouseover', this.onMouseOver.bind(this))
			.on('mouseout', this.onMouseOut.bind(this))
			.on('click', this.onClick.bind(this))
			.attr('id', (node: INode) => node.id)
			.attr('r', this.getRadius)
			.attr('fill', '#2c3e50')
			.call(this.drag(this.simulation))
			.merge(this.node);
		
		this.link = this.link
			.data(filteredEdges, this.getEdgeId);
		this.link.exit().remove();
		this.link = this.link.enter().append('path')
			.attr('stroke', '#e74c3c')
			.attr('stroke-width', this.getEdgeWeight)
			.attr('fill', 'none')
			.attr('id', this.getEdgeId)
			.attr('marker-end', () => 'url(##e74c3c)')
			.merge(this.link);

		this.persistedLink = this.persistedLink
			.data(filteredPersistedEdges, this.getEdgeId);
		this.persistedLink.exit().remove();
		this.persistedLink = this.persistedLink.enter().append('path')
			.attr('stroke', '#000')
			.attr('stroke-width', this.getEdgeWeight)
			.attr('fill', 'none')
			.attr('id', this.getEdgeId)
			.attr('marker-end', () => 'url(##000)')
			.merge(this.persistedLink);

		this.percentages = this.percentages
			.data([...filteredEdges, ...filteredPersistedEdges], this.getEdgeId);
		this.percentages.exit().remove();
		this.percentages = this.percentages.enter().append('textPath')
			.attr('xlink:href', (edge: IEdge) => '#' + this.getEdgeId(edge))
			.attr('startOffset', '50%')
			.text((edge: IEdge) => edge.weight * 100 + '%')
			.merge(this.percentages);

		this.label = this.label.data(this.nodes, (node: INode) => node.id);
		this.label.exit().remove();
		this.label = this.label.enter().append('text')
			.attr('x', (node: INode) => -1 * node.name.length / 4 + 1 + 'em')
			.attr('y', (node: INode) => this.getRadius(node) + 20)
			.text((node: INode) => node.name)
			.merge(this.label);

		this.simulation.nodes(this.nodes);
		this.simulation.force('link').links(filteredPersistedEdges);
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

	private isWithinRange(edge: IEdge) {
		return edge.weight >= this.props.percentageLow && edge.weight <= this.props.percentageHigh;
	}

	private getRadius(node: INode): number {
		return node.size * 10;
	}

	private getEdgeId(edge: IEdge): string {
		return edge.source.id + '-' + edge.target.id;
	}

	private getEdgeWeight(edge: IEdge): number {
		return Math.pow(edge.weight, 1.5) * 6
	}
};

export default Visualization;
