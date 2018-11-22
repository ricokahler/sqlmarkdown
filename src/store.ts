import createStore from 'createStore';

const initialState = {
  queryHistory: [] as string[],
};

export default createStore(initialState);
