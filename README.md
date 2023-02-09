# WEPPO project - store

## Running the project

### Local database setup

#### 1. [Instal postgres](https://www.postgresql.org/download/)
#### 2. Create empty database and set password for default user:
1. `$ sudo su - postgres`
2. `# createdb shopDB`
3. `# psql shopDB`
4. `shopDB=# \password postgres` and type new password when prompted.
`dbConnection.ts` file assumes password is `postgres`.

#### 3. Actual tables in this database will be created by javascript code when running the project for the first time.

### NPM setup

`npm install`

`npm run build` - will build project

`npm run dev` - dev server

`npm run start` - run prod

Based on: https://www.webmound.com/best-typescript-setup-with-nodejs-express-project/
