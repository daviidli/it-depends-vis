import IResponse from "./IResponse";
import * as d3 from 'd3';

export interface IEdge extends d3.SimulationLinkDatum<INode> {
	source: INode,
	target: INode,
	weight: number
}

export interface INode extends d3.SimulationNodeDatum {
	name: string,
	size: number
}

export default class GraphData {
	private nodes: INode[];
	private edges: IEdge[];

	constructor(response: IResponse) {
		this.nodes = this.parseNodes(response.names, response.size);
		this.edges = this.parseEdges(response.data);
	}

	public getNodes(): INode[] {
		return this.nodes;
	}

	public getEdges(): IEdge[] {
		return this.edges;
	}

	private parseNodes(names: string[], sizes: number[]): INode[] {
		const nodes: INode[] = [];

		if (names.length !== sizes.length) {
			throw new Error('bad response');
		}

		for (let i = 0; i < names.length; i++) {
			nodes.push({
				name: names[i],
				size: sizes[i]
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
					source: this.nodes[i],
					target: this.nodes[j],
					weight: data[i][j]
				});
			}
		}

		return edges;
	}
}