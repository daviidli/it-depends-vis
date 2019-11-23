import { DependencyType } from './DependencyType';

export default interface IResponse {
	names: string[],
	data: number[][] | DependencyType[][][],
	size?: number[]
}