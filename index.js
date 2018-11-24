const fs = require('fs');
const parser = require('./parser');
const path = require('path');

const usage = `usage:
  sql-md [your-file.sql.md]
`;

function verifyArguments(args) {
  if (args.length !== 1) return false;
  if (!fs.existsSync(args[0])) return false;
  return true;
}

const args = process.argv.slice(2);
if (!verifyArguments(args)) {
  console.log(usage);
  process.exit(1);
}
const filename = args[0];

const parsed = parser(fs.readFileSync(args[0]).toString());
const sqlMdBuild = fs.readFileSync(path.resolve(__dirname, './sql-md.js')).toString();

const html = `
  <html>
    <head>
      <title>SQL Markdown Document</title>
      <style>
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      </style>
    </head>
    <body>
      <script>
        window.sqlMarkdown = ${JSON.stringify(parsed)};
      </script>
      <script src="data:application/javascript;base64,${Buffer.from(sqlMdBuild).toString(
        'base64',
      )}"></script>
    </body>
  </html>
`;

fs.writeFileSync(`${encodeURIComponent(filename)}.html`, html);
