# final-project-1
```
Kelompok 4
Dhewan Agum Mahendra (Leader)
Imam Fauzi
Muhammad Hamada
```
### Create Database reflection
```
CREATE DATABASE reflection
```
### Create user table
```
CREATE TABLE IF NOT EXISTS public."user" (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);
```
### Create reflection table
```
CREATE TABLE IF NOT EXISTS public.reflection (
  id SERIAL PRIMARY KEY,
  success VARCHAR NOT NULL,
  low_point VARCHAR NOT NULL,
  take_away VARCHAR NOT NULL,
  "UserId" INTEGER NOT NULL REFERENCES public."user"(id) ON UPDATE NO ACTION ON DELETE NO ACTION,
  "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION public.update_mytable()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
### npm command
```
npm init
npm run start
```

