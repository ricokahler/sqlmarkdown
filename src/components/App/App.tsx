import React from 'react';
import styled from 'styled-components';
import Store from 'store';

import Repl from 'components/Repl';
import TablePreview from 'components/TablePreview';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const Body = styled.div``;
const Aside = styled.div``;

interface AppProps {
  content: Array<{ query: string } | { markdown: string }>;
}

export default class App extends React.Component<AppProps> {
  render() {
    return (
      <Store.Provider>
        <Root>
          <Body>{}</Body>
          <Aside>
            <TablePreview />
            <Repl />
          </Aside>
        </Root>
      </Store.Provider>
    );
  }
}
