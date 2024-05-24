#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
while! nc -z postgres_db 5432; do
  sleep 0.1
done
echo "PostgreSQL is up - proceeding..."

# Add server to pgAdmin4
echo "Adding PostgreSQL server to pgAdmin4..."
PGADMIN_HOST=$(hostname -i)
PGADMIN_PORT=80
PGADMIN_USER=pgadmin4@pgadmin.org
PGADMIN_PASSWORD=root
PGADMIN_SERVER_NAME="My PostgreSQL Server"

curl -X POST http://$PGADMIN_HOST:$PGADMIN_PORT/api/server \
     -H "Content-Type: application/json" \
     -u $PGADMIN_USER:$PGADMIN_PASSWORD \
     -d '{
           "server": {
             "name": "'"$PGADMIN_SERVER_NAME"'",
             "host": "postgres_db",
             "port": 5432,
             "maintenance_database": "",
             "username": "ww_financial_control_user",
             "password": "admin",
             "sslmode": "prefer"
           }
         }'