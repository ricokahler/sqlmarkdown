export default function createState<S>(initialState: S) {
  let currentState = initialState;
  const subscribers = new Set<(s: S) => void>();

  function setState(stateSetter: Partial<S> | ((prevState: S) => Partial<S>)) {
    if (typeof stateSetter === 'function') {
      const partialState = stateSetter(currentState);
      currentState = Object.assign({}, currentState, partialState);
      for (const subscriber of subscribers) {
        subscriber(currentState);
      }
    }
  }

  function current() {
    return currentState;
  }

  function subscribe(subscriber: (s: S) => void) {
    subscribers.add(subscriber);

    function unsubscribe() {
      return subscribers.delete(subscriber);
    }

    return unsubscribe;
  }

  return {
    setState,
    current,
    subscribe,
  };
}
