import React from 'react';
import ReactDom from 'react-dom';
import 'normalize.css';

import App from 'components/App';
import sqlMarkdown from 'sqlMarkdown'; // this gets resolves a file via webpack alias

console.log({ sqlMarkdown });

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(<App content={sqlMarkdown} />, root);
