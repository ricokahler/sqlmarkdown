# Welcome to SQL Markdown - A simple example

> **SQL Markdown**
>
> Convert markdown with SQL snippets to an interactive literate programming playground.<br>
> Powered by [sql.js](https://github.com/kripken/sql.js/) (sqlite compiled to javascript)

## Create the tables

SQL Markdown makes it really easy to write about what your queries are doing.

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

## Insert some data

It's great for educational purposes.

```sql
-- run_on_start
INSERT INTO Persons VALUES (
  1,
  'Kahler',
  'Rico',
  '123 street',
  'Detroit'
)
```

And makes for great demos!

## See the results

```sql
-- run_on_start
SELECT * FROM Persons;
```

## Get started with SQL Markdown

[Back to the readme](https://github.com/ricokahler/sqlmarkdown)
