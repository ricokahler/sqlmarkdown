import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';
import uuid from 'uuid/v4';

import AceEditor from 'react-ace';
import IconButton from 'components/IconButtonDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'brace/mode/sql';
import 'brace/theme/dracula';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${styles.grayDarker};
  margin-bottom: ${styles.space(0)};
  font-family: monospace;
  & * {
    font-family: monospace;
  }
`;
const ButtonBar = styled.div`
  border-top: 1px solid ${styles.grayLight};
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
`;

interface QueryProps {
  query: string;
  onExecute: (query: string) => void;
}

interface QueryState {
  currentQuery: string;
}

export default class Query extends React.PureComponent<QueryProps, QueryState> {
  divId = `query-${uuid()}`;
  constructor(props: QueryProps) {
    super(props);

    this.state = {
      currentQuery: props.query,
    };
  }

  handleQueryChange = (currentQuery: string) => {
    this.setState({ currentQuery });
  };

  handleReset = () => {
    this.setState({ currentQuery: this.props.query });
  };

  handleExecute = () => {
    const { currentQuery } = this.state;
    if (!currentQuery) return;
    this.props.onExecute(currentQuery);
  };

  render() {
    const { currentQuery } = this.state;

    return (
      <Root>
        <AceEditor
          mode="sql"
          theme="dracula"
          width="100%"
          value={currentQuery}
          onChange={this.handleQueryChange}
          name={this.divId}
          editorProps={{ $blockScrolling: true }}
          height="500px"
        />
        <ButtonBar>
          <IconButton onClick={this.handleReset}>
            <FontAwesomeIcon icon="undo" />
          </IconButton>
          <IconButton onClick={this.handleExecute}>
            <FontAwesomeIcon icon="play" />
          </IconButton>
        </ButtonBar>
      </Root>
    );
  }
}
