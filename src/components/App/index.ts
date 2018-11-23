import Store from 'store';
import App from './App';

interface OwnProps {
  content: Array<{ query: string } | { markdown: string }>;
}

export default Store.withStore({
  mapStateToProps: (state, ownProps: OwnProps) => {
    return {
      content: ownProps.content,
      asideFullscreen: false,
      bodyFullScreen: false,
    };
  },
  mapDispatchToProps: () => ({}),
})(App);
