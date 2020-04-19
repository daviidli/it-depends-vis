import axios from 'axios';
import { pipe, prop, identity } from 'ramda';
import {
	fork, attemptP, mapRej, map
} from 'fluture/index';
import { push } from 'connected-react-router';
import store from '../../store/store';
import { setData, setError } from '../../actions/actions';
import { dispatch, dispatchThunk } from '../../utils/reduxUtils';
import routes from '../../constants/routes.json';

const goHome = dispatchThunk(store, push(routes.HOME));
const goToVis = dispatchThunk(store, push(routes.VIS));

const dispatchData = pipe(prop('data'), setData, dispatch(store));
const dispatchError = pipe(setError, dispatch(store));

const putRequest = repo => attemptP(() => axios.put(`http://localhost:8080/init?url=${repo}`));

const onRepoChange = pipe(
	putRequest,
	map(pipe(dispatchData, goToVis)),
	mapRej(pipe(dispatchError, goHome)),
	fork(identity)(identity)
);

export default onRepoChange;
