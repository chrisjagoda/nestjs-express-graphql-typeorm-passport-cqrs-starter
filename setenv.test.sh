#!/bin/sh

## DO NOT USE THESE DEFAULT VALUES
## BEST PRACTICE IS USE SECRETS TO SET ENV PARAMS WITH YOUR CI 
## PROVIDER AND CONTAINER ORCHESTRATION (I.E. KUBERNETES) SYSTEMS

echo "Creating test env .env file ..."
tee -a .env << END
API_BASE_URL=http://localhost:3000
PORT=3000
JWT_SECRET=yourJwtSecret
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=yourPostgresUser
POSTGRES_PASSWORD=yourPostgresPassword
POSTGRES_DB=yourPostgresDb
REDIS_HOST=localhost
REDIS_PORT=6379
SENDGRID_API_KEY=yourSendGridApiKey
ES_HOST=http://localhost:9200
ES_LOG_LEVEL=info
END

echo "Creating test env docker.env file..."
tee -a docker.env << END
POSTGRES_USER=yourPostgresUser
POSTGRES_PASSWORD=yourPostgresPassword
POSTGRES_DB=yourPostgresDb
PGADMIN_DEFAULT_EMAIL=test@example.com
PGADMIN_DEFAULT_PASSWORD=yourPgAdminPassword
END

echo "Done creating test env configs"
