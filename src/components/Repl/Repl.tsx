import React from 'react';
import styled from 'styled-components';

const Root = styled.div``;
const Input = styled.input``;
const History = styled.div``;
const Query = styled.div``;
const ButtonBar = styled.div``;

export interface ReplProps {
  queryHistory: string[];
  onQuery: (query: string) => void;
}

interface ReplState {
  hidden: boolean;
}

export default class Repl extends React.PureComponent<ReplProps, ReplState> {
  state: ReplState = {
    hidden: false,
  };

  render() {
    const { queryHistory } = this.props;

    return (
      <Root>
        <ButtonBar>{}</ButtonBar>
        <History>
          {queryHistory.map((query, index) => (
            <Query key={index}>{query}</Query>
          ))}
        </History>
        <Input />
      </Root>
    );
  }
}
