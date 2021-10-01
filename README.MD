# Minimal repository for TypeORM @BeforeInsert hook issue

## Requirements
1. [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start
1. Install the npm package:

   `npm install`

2. Start database:

   `npm run start:mysql`

3. Run script:
   1. For manual transforming

      `npm run start:manual_transform`

   2. For transforming inside `@BeforeInsert`

      `npm run start:typeorm_transform`

## What is going on?
TypeORM has [BeforeInsert](https://orkhan.gitbook.io/typeorm/docs/listeners-and-subscribers#beforeinsert) hook for extra logic before repository/manager `save`. 

I want to transform one virtual field `features` to a particular entity based on `type`.

When I make this transforming before repository/manager `save` TypeORM saves `AmenityA` and `AmenityB` entities data to the database.

But when I placed this transforming in `BeforeInsert` block TypeORM won't save `AmenityA` and `AmenityB` entities data to the database (but `BeforeInsert` block executing).

You can view logs in the console or view actual data in the database.

## Question
How to solve this issue?
