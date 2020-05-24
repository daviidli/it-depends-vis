import { connect } from 'react-redux';
import {
	setRepo, setCommits, setStartCommit, setEndCommit
} from '../actions/actions';
import Home from '../components/home/Home';

const actions = {
	setRepo,
	setCommits,
	setStartCommit,
	setEndCommit
};

export default connect(null, actions)(Home);
