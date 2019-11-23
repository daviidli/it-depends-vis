import React from 'react';
import * as d3 from 'd3';
import GraphData, { INode, IEdge } from '../../data/GraphData';
import { Graph } from '../../data/types/GraphType';
import { DependencyType } from '../../data/types/DependencyType';

import './Visualization.scss';

interface IMarker {
	name: string,
	path: string,
	viewBox: string,
	refX: number,
	refY: number,
	width: number,
	height: number
	color?: string
};

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
	private edgeLabels: any;
	private simulation: any;
	private g: any;

	private readonly colors = {
		hover: '#F50057',
		persisted: '#95a5a6',
		node: '#2c387e',
		nodeHover: '#F50057',
		nodeOutline: '#bdc3c7'
	};

	private readonly markers : IMarker[] = [
		{
			name: Graph.CROSSCUT,
			path: 'M0,-5L10,0L0,5',
			viewBox: '0 -5 10 10',
			refX: 0,
			refY: 0,
			width: 4,
			height: 4
		},
		{
			name: DependencyType.INHERITANCE,
			path: 'M10 5 0 0 0 10 Z M8 5 1 8.4 1 1.6Z',
			viewBox: '0 0 10 10',
			refX: 0,
			refY: 5,
			width: 3,
			height: 3
		},
		{
			name: DependencyType.IMPLEMENTATION,
			path: 'M10 5 0 0 0 10 Z M8 5 1 8.4 1 1.6Z',
			viewBox: '0 0 10 10',
			refX: 0,
			refY: 5,
			width: 3,
			height: 3
		},
		{
			name: DependencyType.ASSOCIATION,
			path: 'M2,2 L10,6 L2,10 L6,6 L2,2',
			viewBox: '0 0 12 12',
			refX: 6,
			refY: 6,
			width: 6,
			height: 6
		},
		{
			name: DependencyType.DEPENDENCY,
			path: 'M2,2 L10,6 L2,10 L6,6 L2,2',
			viewBox: '0 0 16 10',
			refX: 6,
			refY: 6,
			width: 6,
			height: 6
		},
		{
			name: DependencyType.REFERENCES,
			path: 'M0,-5L10,0L0,5',
			viewBox: '0 -5 10 10',
			refX: 0,
			refY: 0,
			width: 4,
			height: 4
		},
		{
			name: DependencyType.CALLS,
			path: 'M0,-5L10,0L0,5',
			viewBox: '0 -5 10 10',
			refX: 0,
			refY: 0,
			width: 4,
			height: 4
		}
	];

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

		this.persistedLink = this.g.append('g')
			.selectAll('.pLink');

		this.link = this.g.append('g')
			.selectAll('.link');

		this.edgeLabels = this.g.append('text')
			.attr('dy', -5)
			.selectAll('.percentages');

		this.node = this.g.append('g')
			.attr('stroke', this.colors.nodeOutline)
			.attr('stroke-width', 5)
			.selectAll('.node');

		this.label = this.g.append('g')
			.selectAll('.label');

		const markers = [...this.markers.map((marker) => {
			marker.color = this.colors.hover;
			return marker;
		}), ...this.markers.map((marker) => {
			const newMarker = Object.create(marker);
			newMarker.color = this.colors.persisted;
			return newMarker;
		})];

		this.g.append('defs').selectAll('marker')
			.data(markers)
			.enter().append('marker')
				.attr('id', (marker: IMarker) => marker.name + '-' + marker.color)
				.attr('viewBox', (marker: IMarker) => marker.viewBox)
				.attr('refX', (marker: IMarker) => marker.refX)
				.attr('refY', (marker: IMarker) => marker.refY)
				.attr('markerWidth', (marker: IMarker) => marker.width)
				.attr('markerHeight', (marker: IMarker) => marker.height)
				.attr('orient', 'auto')
			.append('path')
				.attr('d', (marker: IMarker) => marker.path)
				.attr('fill', (marker: IMarker) => marker.color)

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

		this.restartLink(filteredEdges);
		this.restartPersistedLinks(filteredPersistedEdges);
		this.restartEdgeLabels([...filteredEdges, ...filteredPersistedEdges]);
		this.restartNode();
		this.restartLabels();

		this.simulation.nodes(this.nodes);
		this.simulation.force('link').links(filteredPersistedEdges);
		this.simulation.alpha(1).restart();
	}

	private restartNode() {
		this.node = this.node.data(this.nodes, (node: INode) => node.name);
		this.node.exit().remove();
		this.node = this.node.enter().append('circle')
			.on('mouseover', this.onMouseOver.bind(this))
			.on('mouseout', this.onMouseOut.bind(this))
			.on('click', this.onClick.bind(this))
			.attr('id', (node: INode) => node.id)
			.attr('r', this.getRadius)
			.attr('fill', this.colors.node)
			.call(this.drag(this.simulation))
			.merge(this.node);
	}

	private restartLink(edges: IEdge[]) {
		this.link = this.link.data(edges, this.getEdgeId);
		this.link.exit().remove();
		this.link = this.link.enter().append('path')
			.attr('stroke', this.colors.hover)
			.attr('stroke-width', this.getEdgeWeight)
			.attr('fill', 'none')
			.attr('id', this.getEdgeId)
			.attr('marker-end', (edge: IEdge) => `url(#${edge.type}-${this.colors.hover})`)
			.attr('class', (edge: IEdge) => edge.type)
			.merge(this.link);
	}

	private restartPersistedLinks(persistedEdges: IEdge[]) {
		this.persistedLink = this.persistedLink.data(persistedEdges, this.getEdgeId);
		this.persistedLink.exit().remove();
		this.persistedLink = this.persistedLink.enter().append('path')
			.attr('stroke', this.colors.persisted)
			.attr('stroke-width', this.getEdgeWeight)
			.attr('fill', 'none')
			.attr('id', this.getEdgeId)
			.attr('marker-end', (edge: IEdge) => `url(#${edge.type}-${this.colors.persisted})`)
			.attr('class', (edge: IEdge) => edge.type)
			.merge(this.persistedLink);
	}

	private restartEdgeLabels(edges: IEdge[]) {
		this.edgeLabels = this.edgeLabels.data(edges, this.getEdgeId);
		this.edgeLabels.exit().remove();
		this.edgeLabels = this.edgeLabels.enter().append('textPath')
			.attr('xlink:href', (edge: IEdge) => '#' + this.getEdgeId(edge))
			.attr('startOffset', '45%')
			.attr('fill', '#454545')
			.text((edge: IEdge) => {
				if (edge.type === Graph.CROSSCUT) {
					return edge.weight * 100 + '%';
				} else {
					return edge.type;
				}
			})
			.merge(this.edgeLabels);
	}

	private restartLabels() {
		this.label = this.label.data(this.nodes, (node: INode) => node.id);
		this.label.exit().remove();
		this.label = this.label.enter().append('text')
			.attr('x', (node: INode) => -1 * node.name.length / 2 + 'ch')
			.attr('y', (node: INode) => this.getRadius(node) + 20)
			.attr('fill', '#000')
			.text((node: INode) => node.name)
			.merge(this.label);
	}

	private onMouseOver(node: INode) {
		this.g.select('#' + node.id).attr('stroke', this.colors.nodeHover).attr('stroke-width', 5);
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
		const markerLength = 6 * Math.sqrt(edge.weight * 10);
		const markerSize = Math.sqrt(Math.pow(markerLength, 2) * 2);
		const radius = (edge.target.size * 10) + markerSize;

		const m = this.getPointAtLength(pathLength - radius);
		const dx = m.x - edge.source.x;
		const dy = m.y - edge.source.y;
		const dr = Math.sqrt(dx * dx + dy * dy);

		return 'M' + edge.source.x + ',' + edge.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + m.x + ',' + m.y;
	}

	private isWithinRange(edge: IEdge) {
		return edge.type !== Graph.CROSSCUT || (edge.weight >= this.props.percentageLow && edge.weight <= this.props.percentageHigh);
	}

	private getRadius(node: INode): number {
		return node.size * 10;
	}

	private getEdgeId(edge: IEdge): string {
		return edge.source.id + '-' + edge.target.id;
	}

	private getEdgeWeight(edge: IEdge): number {
		return Math.pow(edge.weight, 1.25) * 7;
	}
};

export default Visualization;
