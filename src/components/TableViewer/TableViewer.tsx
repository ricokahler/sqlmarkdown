import React from 'react';
import styled from 'styled-components';
import * as styles from 'styles';
import { QueryResults } from 'sql.js';
import { lighten } from 'polished';

const Root = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: ${styles.space(1)};
`;
const Box = styled.div`
  margin: auto;
  text-align: center;
  color: ${styles.gray};
`;
const Title = styled.div`
  font-size: ${styles.space(1)};
  font-weight: bold;
`;
const Message = styled.div`
  font-size: ${styles.space(0)};
`;
const Results = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${lighten(0.4, styles.blue)} !important;
  }
`;
const Table = styled.table`
  margin-bottom: ${styles.space(0)};
  margin-right: ${styles.space(0)};
  background-color: ${styles.whiteBis};
  & tr:nth-child(even) {
    background-color: ${styles.whiteTer};
  }
  border: 1px solid ${styles.grayLighter};
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableHeaderCell = styled.th``;
const TableCell = styled.td``;

interface TableViewerProps {
  results: QueryResults[] | undefined;
  message: string | undefined;
  error: boolean | undefined;
}

export default class TableViewer extends React.PureComponent<TableViewerProps> {
  render() {
    const { results: _results, message, error } = this.props;

    const nothing = _results === undefined && !error;
    const results = _results || [];
    const empty = results.length <= 0;

    return (
      <Root>
        {error ? (
          <Box>
            <Title>Oh no!</Title>
            <Message>{message || 'An error occurred with your last query.'}</Message>
          </Box>
        ) : nothing ? (
          <Box>
            <Title>Nothing here yet!</Title>
            <Message>Run a query and their results will show up here.</Message>
          </Box>
        ) : empty ? (
          <Box>
            <Title>No results.</Title>
            <Message>Your query did not return a result set.</Message>
          </Box>
        ) : (
          <Results>
            {results.map(({ columns, values }, tableIndex) => (
              <Table key={tableIndex}>
                <TableHead>
                  <TableRow>
                    {columns.map((column, columnIndex) => (
                      <TableHeaderCell key={columnIndex}>{column}</TableHeaderCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ))}
          </Results>
        )}
      </Root>
    );
  }
}
