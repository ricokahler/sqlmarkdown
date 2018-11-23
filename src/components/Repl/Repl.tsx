import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const prompt = 'SQL> ';

const Root = styled.div`
  background-color: black;
  color: white;
  height: 20rem;
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-weight: bold;
`;
const Input = styled.input`
  flex: 0 0 auto;
  background-color: transparent;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  font-family: monospace;
`;
const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: ${styles.space(-2)};
`;
const History = styled.div`
  flex: 1 1 auto;
`;
const Query = styled.div``;
const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  border-bottom: 1px solid ${styles.grayDark};
`;
const IconButton = styled.button`
  color: white;
  outline: none;
  background-color: transparent;
  outline: none;
  border: none;
  padding: ${styles.space(-1)};

  &:focus {
    color: ${styles.focus('white')};
  }
  &:hover {
    color: ${styles.hover('white')};
  }
  &:active {
    color: ${styles.active('white')};
  }
`;

export interface ReplProps {
  queryHistory: string[];
  terminalExpanded: boolean;
  asideExpanded: boolean;
  onQuery: (query: string) => void;
  onExpandTerminal: () => void;
  onExpandAside: () => void;
}

interface ReplState {
  hidden: boolean;
  query: string;
}

export default class Repl extends React.PureComponent<ReplProps, ReplState> {
  inputRef = React.createRef<HTMLInputElement>();
  state: ReplState = {
    hidden: false,
    query: '',
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const query = value.substring(prompt.length, value.length);
    this.setState({ query });
  };

  handleBodyClick = () => {
    const inputEl = this.inputRef.current;
    if (!inputEl) return;
    inputEl.focus();
  };

  render() {
    const {
      queryHistory,
      terminalExpanded,
      asideExpanded,
      onExpandTerminal,
      onExpandAside,
    } = this.props;
    const { query } = this.state;

    return (
      <Root>
        <ButtonBar>
          <IconButton onClick={onExpandAside}>
            <FontAwesomeIcon icon={asideExpanded ? 'chevron-right' : 'chevron-left'} />
          </IconButton>
          <IconButton onClick={onExpandTerminal}>
            <FontAwesomeIcon icon={terminalExpanded ? 'chevron-down' : 'chevron-up'} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon="ban" />
          </IconButton>
        </ButtonBar>
        <Body onClick={this.handleBodyClick}>
          <History>
            {queryHistory.map((query, index) => (
              <Query key={index}>{query}</Query>
            ))}
          </History>
          <Input ref={this.inputRef} value={`${prompt}${query}`} onChange={this.handleInput} />
        </Body>
      </Root>
    );
  }
}
