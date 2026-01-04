.PHONY: db-dev-up db-dev-down db-dev-exex db-dev-reset db-dev-logs

COMPOSE = docker compose --env-file=./.env -f deploy/docker/dev/compose.yaml

# spin up compose contaier
db-dev-up:
	$(COMPOSE) up -d

# spin down compose contaier
db-dev-down:
	$(COMPOSE) down

# Exec inside db container
db-dev-exex:
	$(COMPOSE) exec -it postgres sh

# Stop and wipe dev database volume, then start fresh
db-dev-reset:
	$(COMPOSE) down -v
	$(COMPOSE) up -d

# Follow Postgres logs for quick troubleshooting
db-dev-logs:
	$(COMPOSE) logs -f postgres
