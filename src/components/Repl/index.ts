import store from 'store';

import Repl from './Repl';

export default store.withStore({
  mapStateToProps: state => {
    return {
      queryHistory: ['test'],
    };
  },
  mapDispatchToProps: () => ({
    onQuery: (query: string) => {},
  }),
})(Repl);
