# A simple example

## Create the tables

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

## See the results

```sql
-- run_on_start
SELECT * FROM Persons;
```

## Enjoy SQL-MD!
