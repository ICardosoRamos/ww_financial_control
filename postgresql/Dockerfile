FROM postgres:latest

# Copy the initialization script into the container
COPY ww_financial_control_db.sql /docker-entrypoint-initdb.d/

# Set the default database and user
ENV POSTGRES_DB=ww_financial_control_db
ENV POSTGRES_USER=ww_financial_control_user
ENV POSTGRES_PASSWORD=admin

# Expose the port
EXPOSE 5432