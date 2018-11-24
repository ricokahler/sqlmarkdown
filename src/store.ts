import sql from 'sql.js';
import { Observable, Observer } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import createStore from 'createStore';

const db = new sql.Database();

interface RootState {
  queryHistory: string[];
  terminalHidden: boolean;
  asideExpanded: boolean;
  bodyExpanded: boolean;
  queryResults:
    | undefined
    | {
        results?: sql.QueryResults[];
        message?: string;
        error?: boolean;
      };
}

const initialState: RootState = {
  queryHistory: [] as string[],
  terminalHidden: false,
  asideExpanded: false,
  bodyExpanded: false,
  queryResults: undefined,
};

const store = createStore(initialState);

const state$ = Observable.create((observer: Observer<RootState>) => {
  store.subscribe(observer.next.bind(observer));
}) as Observable<RootState>;

state$
  .pipe(
    map(state => state.queryHistory),
    distinctUntilChanged(),
    map(queryHistory => queryHistory[queryHistory.length - 1]),
    filter(query => !!query),
  )
  .subscribe(query => {
    try {
      const results = db.exec(query);
      store.setState(prevState => ({
        ...prevState,
        queryResults: { results },
      }));
    } catch (e) {
      store.setState(prevState => ({
        ...prevState,
        queryResults: {
          error: true,
          message: e.message,
        },
      }));
    }
  });

export default store;
