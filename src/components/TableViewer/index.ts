import Store from 'store';
import TableViewer from './TableViewer';

export default Store.withStore({
  mapStateToProps: ({ queryResults }) => {
    return {
      results: queryResults && queryResults.results,
      message: queryResults && queryResults.message,
      error: queryResults && queryResults.error,
    };
  },
  mapDispatchToProps: () => ({}),
})(TableViewer);
