# SQL Markdown

> **SQL Markdown**
>
> Convert markdown with SQL snippets to an interactive literate programming playground.<br>
> Powered by [sql.js](https://github.com/kripken/sql.js/) (sqlite compiled to javascript)

### [DEMO](https://ricokahler.github.io/sqlmarkdown/index.html)

## What is SQL Markdown?

SQL Markdown is markdown converter that will convert your markdown to an interactive web page in a single HTML file.

Whenever SQL Markdown sees a `sql` snippet, it will mark the SQL code as runnable in the playground generated by the converter.

SQL Snippets look like this:

    ```sql
    -- run_on_start
    CREATE TABLE Persons (
      PersonID int,
      LastName varchar(255),
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255)
    );
    ```

> **Note:** You can additionally add the comment `-- run_on_start` to signal to the interactive playground that that query should be ran when the playground is created.

See the:

1. [simple example markdown](./examples/example.sql.md)
2. [simple example rendered](https://ricokahler.github.io/sqlmarkdown/index.html)

## Installation and usage

Make sure you have the [lastest version of node.js](https://nodejs.org/en/download/) installed (the latest LTS is recommended).

Then run the following:

```
npm install --global sqlmarkdown
```

> **Note:** you may need `sudo` before `npm install --global`

Then to render a SQL markdown page:

```
sqlmarkdown my-doc.sql.md
```

Which will produce `my-doc.sql.md.html`.

## Enjoy!
