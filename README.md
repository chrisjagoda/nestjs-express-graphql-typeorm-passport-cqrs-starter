## Nest Express Graphql CQRS Example Starter Repo

# WIP #

An example repo demonstrating how to put together a fully containerized modern NestJS CRUD API with some cool/useful features including:
* Docker for containerization
* Database integration with TypeORM
* CQRS using NestJS
* GraphQL using apollo-server-express
* Authentication using Passport

With planned support for:
* User Group/Role Authorization with role-acl
* Email using Sendgrid
* CI/CD with CircleCI
* Automated testing (including integration and regression tests for GraphQL API routes)
* and much more.

# Usage (quick start)
 1. clone the repo
 2. `npm install`
 3. Setup temp environment configs
   * Run in CLI from project root `./setenv.test.sh`
   * Imporant: when deploying your app, don't use the `.env` file, set vars in your CI provider or container manager
 4. `docker-compose up`
   * This will spin up Postgres, PGAdmin, and Redis
   * To stop them, and remove local volumes: `docker-compose down -v`
 5. Start up app in developer mode (will watch and recompile for changes)
   * `npm run start`
 6. Open browser tab to [Postgres Admin](http://localhost:8080/browser) for Postgres Admin
   * click on "Servers" and then "Object > Create > Server"
   * "General > Name" the connection "Test Server"
   * click on "Connection" tab:
      * Host: `postgres` (network exposed by docker-compose)
      * Password: `yourPostgresPassword`
   * click on "Save"
   * traverse "Servers > Test Server > Databases > `yourPostgresDb` > Schemas > public"