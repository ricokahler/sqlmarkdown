declare module 'sqlMarkdown' {
  const sql: Array<{ query: string } | { markdown: string }>;
  export = sql;
}
