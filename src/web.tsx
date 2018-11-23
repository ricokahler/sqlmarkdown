import React from 'react';
import ReactDom from 'react-dom';
import 'normalize.css';
import Store from 'store';

// icon config
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

library.add(faChevronDown);
library.add(faChevronUp);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faBan);

import App from 'components/App';
import sqlMarkdown from 'sqlMarkdown'; // this gets resolves a file via webpack alias

console.log({ sqlMarkdown });

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(
  <Store.Provider>
    <App content={sqlMarkdown} />
  </Store.Provider>,
  root,
);
