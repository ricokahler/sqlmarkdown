import React from 'react';
import ReactDom from 'react-dom';
import 'normalize.css';
import Store from 'store';

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
