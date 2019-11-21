import IResponse from "./IResponse";
import * as d3 from 'd3';

export interface IEdge extends d3.SimulationLinkDatum<INode> {
	source: INode,
	target: INode,
	weight: number
}

export interface INode extends d3.SimulationNodeDatum {
	name: string,
	id: string,
	size: number,
	x: number,
	y: number
}

export default class GraphData {
	private nodes: INode[];
	private edges: IEdge[];
	private data: number[][];

	constructor(response: IResponse) {
		this.data = response.data;
		this.nodes = this.parseNodes(response.names, response.size);
		this.edges = this.parseEdges(response.data);
	}

	public getNodes(): INode[] {
		return this.nodes;
	}

	public getEdges(): IEdge[] {
		return this.edges;
	}

	public getEdgesFrom(node: INode) {
		return this.edges.filter((edge) => edge.source === node);
	}

	private parseNodes(names: string[], sizes: number[]): INode[] {
		const nodes: INode[] = [];

		if (names.length !== sizes.length) {
			throw new Error('bad response');
		}

		for (let i = 0; i < names.length; i++) {
			nodes.push({
				id: this.cleanName(names[i]),
				name: names[i],
				size: sizes[i],
				x: 0,
				y: 0
			});
		}

		return nodes;
	}

	private parseEdges(data: number[][]): IEdge[] {
		const edges: IEdge[] = [];

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				if (i === j || data[i][j] === 0) {
					continue;
				}

				edges.push({
					source: this.nodes[j],
					target: this.nodes[i],
					weight: data[i][j]
				});
			}
		}

		return edges;
	}

	private cleanName(name: string): string {
		return name.replace(' ', '').replace('(', '').replace(')', '');
		// TODO: make this more robust
	}
}