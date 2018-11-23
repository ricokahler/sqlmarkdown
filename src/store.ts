import sql from 'sql.js';
import { Observable, Observer } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import createStore from 'createStore';

const db = new sql.Database();

const initialState = {
  queryHistory: [] as string[],
};

type RootState = typeof initialState;

const store = createStore(initialState);

const state$ = Observable.create((observer: Observer<RootState>) => {
  store.subscribe(observer.next);
}) as Observable<RootState>;

state$
  .pipe(
    map(state => state.queryHistory),
    distinctUntilChanged(),
    map(queryHistory => queryHistory[0]),
    filter(query => !!query),
  )
  .subscribe(query => {
    // const result = db.exec(query);
  });

export default store;
