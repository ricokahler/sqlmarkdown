import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';

import IconButton from 'components/IconButtonDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${styles.space(0)};
  background-color: ${styles.grayLighter};
  margin-bottom: ${styles.space(0)};
`;
const TextArea = styled.textarea`
  flex: 0 0 auto;
  resize: vertical;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: monospace;
  margin-bottom: ${styles.space(0)};
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
  constructor(props: QueryProps) {
    super(props);

    this.state = {
      currentQuery: props.query,
    };
  }

  handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    this.setState({ currentQuery: value });
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
        <TextArea value={currentQuery} onChange={this.handleQueryChange} rows={10} />
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
