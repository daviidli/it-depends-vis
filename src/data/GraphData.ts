import IResponse from './types/IResponse';
import * as d3 from 'd3';
import { DependencyType } from './types/DependencyType';
import { Graph } from './types/GraphType';

export interface IEdge extends d3.SimulationLinkDatum<INode> {
	source: INode,
	target: INode,
	weight: number,
	type: string
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

	public getEdgesFrom(node: INode) {
		return this.edges.filter((edge) => edge.source === node);
	}

	private parseNodes(names: string[], sizes: number[] | undefined): INode[] {
		const nodes: INode[] = [];

		if (sizes && names.length !== sizes.length) {
			throw new Error('bad response');
		}

		for (let i = 0; i < names.length; i++) {
			nodes.push({
				id: this.cleanName(names[i]),
				name: names[i],
				size: sizes ? sizes[i] : 2,
				x: 0,
				y: 0
			});
		}

		return nodes;
	}

	private parseEdges(data: number[][] | DependencyType[][][]): IEdge[] {
		const edges: IEdge[] = [];

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				if (i === j) {
					continue;
				}

				if (typeof data[i][j] === 'number') {
					const dataVal: number = data[i][j] as number;

					if (data[i][j] === 0) {
						continue;
					}

					edges.push({
						source: this.nodes[j],
						target: this.nodes[i],
						weight: Math.round(dataVal * 100) / 100,
						type: Graph.CROSSCUT
					});
				} else {
					const depTypes: DependencyType[] = data[i][j] as DependencyType[];
					
					// TODO currently only takes the first dependency type as the vis can't show more than one right now

					// depTypes.forEach((type) => {
					// 	edges.push({
					// 		source: this.nodes[j],
					// 		target: this.nodes[i],
					// 		weight: 0.8,
					// 		type: type
					// 	});
					// });

					if (depTypes.length) {
						edges.push({
							source: this.nodes[j],
							target: this.nodes[i],
							weight: 1,
							type: depTypes[0]
						});
					}
				}
			}
		}

		return edges;
	}

	private cleanName(name: string): string {
		return name.replace(' ', '').replace('(', '').replace(')', '').replace('.', '');
		// TODO: make this more robust
	}
}