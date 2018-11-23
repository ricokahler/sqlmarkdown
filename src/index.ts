import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

const usage = `usage:
  sql-md [your-file.sql.md]
`;

function verifyArguments(args: string[]) {
  if (args.length !== 1) return false;
  if (!fs.existsSync(args[0])) return false;
  return true;
}

const args = process.argv.slice(2);
if (!verifyArguments(args)) {
  console.log(usage);
  process.exit(1);
}
const filename = `${args[0]}.js`;

webpack(
  {
    mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
    entry: path.resolve(__dirname, './web.tsx'),
    output: {
      path: path.resolve('.'),
      filename,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'awesome-typescript-loader' }],
        },
        {
          test: /\.css/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { minimize: true } }],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
      modules: [path.resolve(__dirname, './'), 'node_modules'],
    },
    externals: {
      sqlMarkdown: 'sqlMarkdown',
    },
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err);
      console.log(stats.toString());
      process.exit(1);
    }

    const html = `
      <html>
        <body>
          <script>
            const sqlMarkdown = ${JSON.stringify([{ query: 'test' }])};
            ${stats.compilation.assets[filename].source()}
          </script>
        </body>
      </html>
    `;

    fs.writeFileSync(`${filename}.html`, html);
    process.exit(0);
  },
);
