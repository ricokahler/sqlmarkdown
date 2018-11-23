import React from 'react';
import styled from 'styled-components';

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
  border: 1px solid red;
`;
const Aside = styled.div`
  flex: 0 0 auto;
  width: 30rem;
  border: 1px solid blue;
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
  asideFullscreen: boolean;
  bodyFullScreen: boolean;
}

export default class App extends React.Component<AppProps> {
  render() {
    const { content, asideFullscreen, bodyFullScreen } = this.props;
    return (
      <Root>
        {!asideFullscreen && (
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
        {!bodyFullScreen && (
          <Aside>
            <TablePreview />
            <Repl />
          </Aside>
        )}
      </Root>
    );
  }
}
