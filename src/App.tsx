import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HelpModal from './components/Modal/HelpModal';
import HelpModalContextProvider from './components/Modal/HelpModalContext';
import Footer from './components/Footer/Footer';
import Visualization from './components/Visualization/Visualization';
import IResponse from './data/types/IResponse';
import { SettingsContext, DataContext } from './AppContext';
import GraphData from './data/GraphData';
import { Granularity } from './data/types/GranularityType';
import { Graph } from './data/types/GraphType';
import axios from 'axios';
import { indexOfCommit } from './components/Header/CommitDropdown';

export interface ICommit {
	name: string,
	author: string,
	value: string,
	sha: string
};

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
	commits: ICommit[]
};

const App = () => {
	const url: string = 'https://it-depends.herokuapp.com';
	// const url = 'http://localhost:8080'
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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

		const getCommits = async () => {
			try {
				const response = await axios.put(`${url}/init?url=${settings.repository}`);
				const commits = response.data.commits.reverse();
				const processedCommits = commits.map(processCommit);
				setData((prev: IData) => ({...prev, commits: processedCommits}));
				setSettings((prev: ISettings) => ({...prev, startCommit: processedCommits[0].value, endCommit: processedCommits[processedCommits.length - 1].value}));
			} catch (e) {
				console.log(e);
				setData((prev: IData) => ({...prev, commits: []}));
				setSettings((prev: ISettings) => ({...prev, startCommit: '', endCommit: ''}))
				// TODO: show error in UI
			}
		};

		getCommits();
	}, [settings.repository, setSettings, setData])

	useEffect(() => {
		if (settings.repository.length === 0 || settings.startCommit === '' || settings.endCommit === '') {
			return;
		}

		const getGranularity = () => {
			switch(settings.granularity) {
				case Granularity.FILES:
					return 'file';
				case Granularity.CLASSES:
					return 'class';
				case Granularity.FUNCTIONS:
					return 'method';
			}
		}

		const getVisData = async () => {
			const commits = data.commits;
			const granularity = getGranularity();

			let responseData: IResponse;
			if (settings.graph === Graph.CROSSCUT) {
				const startIndex = indexOfCommit(commits, settings.startCommit);
				const endIndex = indexOfCommit(commits, settings.endCommit);
				try {
					const response = await axios.get(`${url}/crosscut/${granularity}?start=${startIndex}&end=${endIndex}&url=${settings.repository}`);
					responseData = response.data;
					responseData.names = responseData.names.map((name: string) => {
						const i = name.lastIndexOf('/');
						return name.substring(i + 1, name.length);
					});
				} catch (e) {
					console.log(e);
					responseData = {
						names: [],
						size: [],
						data: []
					};
				}
			} else {
				const startIndex = indexOfCommit(commits, settings.startCommit);
				const endIndex = indexOfCommit(commits, settings.endCommit);
				const startSha = commits[startIndex].sha;
				const endSha = commits[endIndex].sha;
				try {
					const response = await axios.get(`${url}/dependency/${granularity}?start=${startSha}&end=${endSha}&url=${settings.repository}`);
					responseData = response.data;
				} catch (e) {
					console.log(e);
					responseData = {
						names: [],
						size: [],
						data: []
					};
				}
			}

			if (typeof responseData.size === 'number') {
				const size = responseData.names.map(() => Math.floor(Math.random() * (6 - 1) + 1));
				responseData.size = size;
			}
			setData((prev: any) => ({...prev, response: responseData}))
		}

		getVisData();
	}, [settings.startCommit, settings.endCommit, settings.granularity, settings.repository, settings.graph, data.commits, setData]);

	useEffect(() => {
		setGraphData(new GraphData(data.response));
	}, [data.response, setGraphData]);

	const processCommit = (commit: any, i: number): ICommit => {
		const indexOfNL = commit.message.indexOf('\n');
		const name = indexOfNL === -1 ? commit.message : commit.message.substring(0, indexOfNL);
		const author = commit.author ? commit.author.login : '';

		return { name: name, author: author, value: `${i}. ${name} - ${author}`, sha: commit.sha };
	};

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
				/>
				<Footer />
			</SettingsContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
