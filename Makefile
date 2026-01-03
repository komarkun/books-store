.PHONY: db-dev db-dev-reset db-dev-logs

COMPOSE = docker compose --env-file=./.env -f deploy/docker/dev/compose.yaml

db-dev:
	$(COMPOSE) up -d

# Stop and wipe dev database volume, then start fresh
db-dev-reset:
	$(COMPOSE) down -v
	$(COMPOSE) up -d

# Follow Postgres logs for quick troubleshooting
db-dev-logs:
	$(COMPOSE) logs -f postgres
