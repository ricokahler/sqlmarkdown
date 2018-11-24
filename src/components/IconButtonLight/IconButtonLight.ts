import styled from 'styled-components';
import * as styles from 'styles';

export default styled.button`
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
