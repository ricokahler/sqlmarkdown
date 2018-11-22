import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Repl from 'components/Repl';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const Queries = styled.div``;
const Aside = styled.div``;

export default class App extends React.Component {
  static propTypes = {
    queries: PropTypes.arrayOf(PropTypes.string),
  };

  handleQuery = (query: string) => {};

  render() {
    return (
      <Root>
        <Queries>{}</Queries>
        <Aside>
          <Repl />
        </Aside>
      </Root>
    );
  }
}
