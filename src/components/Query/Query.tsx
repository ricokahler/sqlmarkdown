import React from 'react';
import styled from 'styled-components';

const Root = styled.div``;

interface QueryProps {
  query: string;
  onExecute: () => void;
}

export default class Query extends React.PureComponent<QueryProps> {
  render() {
    return <Root>{}</Root>;
  }
}
