import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HelpModal from './components/Modal/HelpModal';
import HelpModalContextProvider from './components/Modal/HelpModalContext';
import Footer from './components/Footer/Footer';
import Visualization from './components/Visualization/Visualization';
import IResponse from './data/IResponse';
import { SettingsContext, DataContext } from './AppContext';
import GraphData from './data/GraphData';
import { Granularity } from './data/GranularityType';
import { Graph } from './data/GraphType';
import { DependencyType } from './data/DependencyType';

export interface ISettings {
	repository: string,
	startCommit: string,
	endCommit: string,
	granularity: Granularity,
	graph: Graph
};

export interface IData {
	response: IResponse,
	percentageLow: number,
	percentageHigh: number,
	commits: string[]
};

const App = () => {
	const [settings, setSettings] = useState<ISettings>({
		repository: '',
		startCommit: '',
		endCommit: '',
		granularity: Granularity.FILES,
		graph: Graph.CROSSCUT
	});

	const [data, setData] = useState<IData>({
		response: {
			names: [],
			size: [],
			data: []
		},
		percentageLow: 0,
		percentageHigh: 100,
		commits: []
	});

	const [graphData, setGraphData] = useState<GraphData>(new GraphData({ names: [], size: [], data: [] }));

	useEffect(() => {
		if (settings.repository.length === 0) {
			return;
		}
		// call backend
		let response: IResponse;
		if (settings.graph === Graph.CROSSCUT) {
			response = {
				names: ['constructor (A)', 'main (A)', 'receiveInput (A)', 'constructor (B)', 'doSomething (B)', 'doSomethingElse (B)', 'constructor (C1)', 'foo (C1)', 'constructor (C2)', 'barbar (C2)'],
				size: [1,1,6,2,4,1,1,2,1,1],
				data: [
					[1,1,1,1,1,0,0,0,0,0],
					[1,1,1,1,1,0,0,0,0,0],
					[0.166666667,0.166666667,1,0.333333333,0.5,0.166666667,0.166666667,0.333333333,0.166666667,0],
					[0.5,0.5,1,1,0.5,0.5,0,0,0,0],
					[0.25,0.25,0.75,0.25,1,0,0,0.25,0,0],
					[0,0,1,1,0,1,0,0,0,0],
					[0,0,1,0,0,0,1,1,1,0],
					[0,0,1,0,0.5,0,0.5,1,0.5,0],
					[0,0,1,0,0,0,1,1,1,0],
					[0,0,0,0,0,0,0,0,0,1]
				]
			};
		} else {
			response = {
				names: ["Foo", "Foo.function1", "Foo.function2", "Bar.function1", "Bar"],
				data: [
					[[], [], [DependencyType.DEPENDENCY], [], []],
					[[], [], [DependencyType.ASSOCIATION], [], []],
					[[], [], [], [], [DependencyType.DEPENDENCY]],
					[[DependencyType.CALLS], [], [], [], []],
					[[], [], [], [DependencyType.INHERITANCE], []],
				]
			}
		}

		const commits: string[] = [
			'commit #1',
			'commit #2',
			'commit #3',
			'commit #4',
			'commit #5',
			'commit #6',
			'commit #7',
			'commit #8',
			'commit #9',
			'commit #10'
		];
		setData((prev: IData) => ({...prev, response: response, commits: commits}));
	}, [settings, setData]);

	useEffect(() => {
		setGraphData(new GraphData(data.response));
	}, [data.response, setGraphData]);

	return (
		<DataContext.Provider value={[data, setData]}>
			<SettingsContext.Provider value={[settings, setSettings]}>
				<HelpModalContextProvider>
					<HelpModal />
					<Header />
				</HelpModalContextProvider>
				<Visualization
					graphData={graphData}
					percentageLow={data.percentageLow / 100}
					percentageHigh={data.percentageHigh / 100}
					graphType={settings.graph}
				/>
				<Footer />
			</SettingsContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
