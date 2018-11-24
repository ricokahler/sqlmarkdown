import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';

import Repl from 'components/Repl';
import TablePreview from 'components/TablePreview';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  display: flex;
`;

const Body = styled.div`
  flex: 1 1 auto;
  background-color: ${styles.whiteTer};
`;
const Aside = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
`;
const Markdown = styled.div``;

function isQuery(maybe: any): maybe is { query: string } {
  if (!maybe) return false;
  if (!maybe.query) return false;
  return true;
}

function isMarkdown(maybe: any): maybe is { markdown: string } {
  if (!maybe) return false;
  if (!maybe.markdown) return false;
  return true;
}

interface AppProps {
  content: Array<{ query: string } | { markdown: string }>;
  asideExpanded: boolean;
  bodyExpanded: boolean;
}

export default class App extends React.Component<AppProps> {
  render() {
    const { content, asideExpanded, bodyExpanded } = this.props;
    return (
      <Root>
        {!asideExpanded && (
          <Body>
            {content.map(item => {
              if (isQuery(item)) {
                return null;
              }

              if (isMarkdown(item)) {
                return <Markdown dangerouslySetInnerHTML={{ __html: item.markdown }} />;
              }

              return null;
            })}
          </Body>
        )}
        {!bodyExpanded && (
          <Aside style={{ flex: asideExpanded ? '1 1 auto' : '0 0 auto' }}>
            <TablePreview />
            <Repl />
          </Aside>
        )}
      </Root>
    );
  }
}
