import Store from 'store';
import App from './App';

interface OwnProps {
  content: Array<{ query: string } | { markdown: string }>;
}

export default Store.withStore({
  mapStateToProps: (state, ownProps: OwnProps) => {
    return {
      content: ownProps.content,
      asideExpanded: state.asideExpanded,
      bodyExpanded: state.bodyExpanded,
    };
  },
  mapDispatchToProps: () => ({}),
})(App);
