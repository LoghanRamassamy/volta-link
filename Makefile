.PHONY: start stop build logs clean test

start:
	docker compose up --build

stop:
	docker compose down

clean:
	docker compose down -v

logs:
	docker compose logs -f

test:
	docker compose run --rm backend npm test
	docker compose run --rm frontend npm test
