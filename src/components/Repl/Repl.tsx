import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';
const { max, min } = Math;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/IconButtonLight';

const prompt = 'SQL> ';

const Root = styled.div`
  flex: 0 0 auto;
  background-color: black;
  color: white;
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
  height: 20rem;
  overflow: auto;
`;
const History = styled.div`
  flex: 1 1 auto;
`;
const Query = styled.div`
  font-family: monospace;
  margin-bottom: ${styles.space(-1)};
`;
const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  border-bottom: 1px solid ${styles.grayDark};
`;

export interface ReplProps {
  queryHistory: string[];
  terminalHidden: boolean;
  asideExpanded: boolean;
  onQuery: (query: string) => void;
  onHideTerminal: () => void;
  onExpandAside: () => void;
  onClear: () => void;
}

interface ReplState {
  hidden: boolean;
  query: string;
  historyIndex: number | undefined;
}

export default class Repl extends React.PureComponent<ReplProps, ReplState> {
  inputRef = React.createRef<HTMLInputElement>();
  state: ReplState = {
    hidden: false,
    query: '',
    historyIndex: undefined,
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const query = value.substring(prompt.length, value.length);
    this.setState({ query });
  };

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onQuery, queryHistory } = this.props;
    const { query } = this.state;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (!query) return;
      onQuery(query);
      this.setState({ query: '', historyIndex: undefined });
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.setState(({ historyIndex }) => {
        if (typeof historyIndex === 'number') {
          const nextQuery = queryHistory[historyIndex - 1];
          if (!nextQuery) return null;

          return {
            historyIndex: max(0, historyIndex - 1),
            query: nextQuery,
          };
        }

        const nextQuery = queryHistory[queryHistory.length - 1];
        if (!nextQuery) return null;

        return {
          historyIndex: max(0, queryHistory.length - 1),
          query: nextQuery,
        };
      });
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.setState(({ historyIndex }) => {
        if (typeof historyIndex === 'number') {
          const nextQuery = queryHistory[historyIndex + 1];
          if (!nextQuery) return null;

          return {
            historyIndex: min(historyIndex + 1, queryHistory.length - 1),
            query: nextQuery,
          };
        }

        const nextQuery = queryHistory[0];
        if (!nextQuery) return null;

        return {
          historyIndex: min(queryHistory.length + 1, queryHistory.length - 1),
          query: nextQuery,
        };
      });
    }
  };

  handleBodyClick = () => {
    const inputEl = this.inputRef.current;
    if (!inputEl) return;
    inputEl.focus();
  };

  render() {
    const {
      queryHistory,
      terminalHidden,
      asideExpanded,
      onHideTerminal,
      onExpandAside,
      onClear,
    } = this.props;
    const { query } = this.state;

    return (
      <Root>
        <ButtonBar>
          <IconButton onClick={onExpandAside}>
            <FontAwesomeIcon icon={asideExpanded ? 'chevron-right' : 'chevron-left'} />
          </IconButton>
          <IconButton onClick={onHideTerminal}>
            <FontAwesomeIcon icon={terminalHidden ? 'chevron-up' : 'chevron-down'} />
          </IconButton>
          <IconButton onClick={onClear}>
            <FontAwesomeIcon icon="ban" />
          </IconButton>
        </ButtonBar>
        {!terminalHidden && (
          <Body onClick={this.handleBodyClick}>
            <History>
              {queryHistory.map((query, index) => (
                <Query key={index}>{query}</Query>
              ))}
            </History>
            <Input
              ref={this.inputRef}
              value={`${prompt}${query}`}
              onChange={this.handleInput}
              onKeyDown={this.handleInputKeyDown}
            />
          </Body>
        )}
      </Root>
    );
  }
}
