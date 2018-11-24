import Store from 'store';
import Repl from './Repl';

export default Store.withStore({
  mapStateToProps: state => {
    return {
      queryHistory: state.queryHistory,
      terminalHidden: state.terminalHidden,
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
    onHideTerminal: () => {
      dispatch(state => ({ ...state, terminalHidden: !state.terminalHidden }));
    },
    onExpandAside: () => {
      dispatch(state => ({ ...state, asideExpanded: !state.asideExpanded }));
    },
    onClear: () => {
      dispatch(state => ({ ...state, queryHistory: [] }));
    },
  }),
})(Repl);
