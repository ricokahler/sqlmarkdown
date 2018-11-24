import styled from 'styled-components';
import * as styles from 'styles';

export default styled.button`
  color: ${styles.grayLight};
  outline: none;
  background-color: transparent;
  outline: none;
  border: none;
  padding: ${styles.space(-1)};

  &:focus {
    color: ${styles.focus(styles.grayLight)};
  }
  &:hover {
    color: ${styles.hover(styles.grayLight)};
  }
  &:active {
    color: ${styles.active(styles.grayLight)};
  }
`;
