import Store from 'store';

import Repl from './Repl';

export default Store.withStore({
  mapStateToProps: state => {
    return {
      queryHistory: ['test'],
      terminalExpanded: state.terminalExpanded,
      asideExpanded: state.asideExpanded,
    };
  },
  mapDispatchToProps: dispatch => ({
    onQuery: (query: string) => {},
    onExpandTerminal: () => {
      dispatch(state => ({ ...state, terminalExpanded: !state.terminalExpanded }));
    },
    onExpandAside: () => {
      dispatch(state => ({ ...state, asideExpanded: !state.asideExpanded }));
    },
  }),
})(Repl);
