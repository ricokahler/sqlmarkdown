import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';

import Repl from 'components/Repl';
import Query from 'components/Query';
import TableViewer from 'components/TableViewer';
import IconButton from 'components/IconButtonDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  background-color: ${styles.whiteBis};
  display: flex;
  flex-direction: column;
`;
const Aside = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
`;
const Markdown = styled.div`
  margin-bottom: ${styles.space(0)};
`;
const ButtonRow = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${styles.grayLight};
  padding: 0 ${styles.space(-1)};
`;
const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  & > * {
    flex: 0 0 auto;
  }
  padding: ${styles.space(0)};
  overflow: auto;
`;
const ContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60vw;
  width: 60rem;
  margin: 0 auto;
  & > * {
    flex: 0 0 auto;
  }
`;

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
  onExpandBody: () => void;
  onQuery: (query: string) => void;
}

export default class App extends React.Component<AppProps> {
  componentDidMount() {
    const { content, onQuery } = this.props;

    setTimeout(() => {
      const queriesToRunOnStart = content
        .filter(isQuery)
        .filter(({ query }) => query.includes('-- run_on_start'))
        .map(node => node.query);

      for (const query of queriesToRunOnStart) {
        onQuery(query);
      }
    }, 300);
  }
  render() {
    const { content, asideExpanded, bodyExpanded, onExpandBody, onQuery } = this.props;
    return (
      <Root>
        {!asideExpanded && (
          <Body>
            <ButtonRow>
              <IconButton onClick={onExpandBody}>
                <FontAwesomeIcon icon={bodyExpanded ? 'chevron-left' : 'chevron-right'} />
              </IconButton>
            </ButtonRow>
            <Content>
              <ContentCenter>
                {content.map(item => {
                  if (isQuery(item)) {
                    return <Query query={item.query} onExecute={onQuery} />;
                  }

                  if (isMarkdown(item)) {
                    return <Markdown dangerouslySetInnerHTML={{ __html: item.markdown }} />;
                  }
                  return null;
                })}
              </ContentCenter>
            </Content>
          </Body>
        )}
        {!bodyExpanded && (
          <Aside style={{ flex: asideExpanded ? '1 1 auto' : '0 0 auto' }}>
            <TableViewer />
            <Repl />
          </Aside>
        )}
      </Root>
    );
  }
}
