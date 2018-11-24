import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  flex: 1 0 auto;
`;

interface TablePreviewProps {}

export default class TablePreview extends React.PureComponent<TablePreviewProps> {
  render() {
    return <Root>table preview todo</Root>;
  }
}
