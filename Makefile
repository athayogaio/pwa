dc_dev:
	COMPOSE_PROJECT_NAME=develop docker-compose --env-file backend/.env -p develop $(filter-out $@,$(MAKECMDGOALS))