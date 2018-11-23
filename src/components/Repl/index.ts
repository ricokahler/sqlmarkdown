import Store from 'store';

import Repl from './Repl';

export default Store.withStore({
  mapStateToProps: state => {
    return {
      queryHistory: ['test'],
    };
  },
  mapDispatchToProps: () => ({
    onQuery: (query: string) => {},
  }),
})(Repl);
