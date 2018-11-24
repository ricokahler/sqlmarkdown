# A simple example

## Create the tables

```sql
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
SELECT * FROM Persons;
```

## Enjoy SQL-MD!
