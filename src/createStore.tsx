import React from 'react';
import createState from './createState';

interface ConnectionOptions<
  S,
  DestinationPropsFromDispatch,
  DestinationPropsFromState,
  OutwardProps
> {
  mapDispatchToProps: (
    dispatch: (stateSetter: (s: S) => S) => void,
    ownProps: OutwardProps,
  ) => DestinationPropsFromDispatch;
  mapStateToProps: (state: S, ownProps: OutwardProps) => DestinationPropsFromState;
}

export default function createStore<S>(initialState: S) {
  const Store = React.createContext<S>(initialState);
  const store = createState(initialState);

  class Provider extends React.Component<{}, { providerState: S }> {
    state = {
      providerState: initialState,
    };
    unsubscribe: undefined | (() => void);

    componentDidMount() {
      this.unsubscribe = store.subscribe(newState => {
        this.setState({ providerState: newState });
      });
    }

    componentWillUnmount() {
      if (!this.unsubscribe) return;
      this.unsubscribe();
    }

    render() {
      return (
        <Store.Provider value={this.state.providerState}>{this.props.children}</Store.Provider>
      );
    }
  }

  function withStore<DestinationPropsFromDispatch, DestinationPropsFromState, OutwardProps>({
    mapDispatchToProps,
    mapStateToProps,
  }: ConnectionOptions<S, DestinationPropsFromDispatch, DestinationPropsFromState, OutwardProps>) {
    return (
      Component: React.ComponentType<DestinationPropsFromDispatch & DestinationPropsFromState>,
    ) =>
      class WithStore extends React.Component<OutwardProps> {
        propsFromDispatch = mapDispatchToProps(store.setState, this.props);
        renderChildren = (state: S) => {
          const withStoreState = mapStateToProps(state, this.props);
          return <Component {...this.propsFromDispatch} {...withStoreState} />;
        };

        render() {
          return <Store.Consumer children={this.renderChildren} />;
        }
      };
  }

  return { Provider, withStore };
}
