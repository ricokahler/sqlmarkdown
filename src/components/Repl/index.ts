import Store from 'store';
import Repl from './Repl';

export default Store.withStore({
  mapStateToProps: state => {
    return {
      queryHistory: state.queryHistory,
      terminalExpanded: state.terminalExpanded,
      asideExpanded: state.asideExpanded,
    };
  },
  mapDispatchToProps: dispatch => ({
    onQuery: (query: string) => {
      dispatch(state => ({
        ...state,
        queryHistory: [...state.queryHistory, query],
      }));
    },
    onExpandTerminal: () => {
      dispatch(state => ({ ...state, terminalExpanded: !state.terminalExpanded }));
    },
    onExpandAside: () => {
      dispatch(state => ({ ...state, asideExpanded: !state.asideExpanded }));
    },
    onClear: () => {
      dispatch(state => ({ ...state, queryHistory: [] }));
    },
  }),
})(Repl);
