
build:
	- docker compose up -d
	- docker compose logs -f app
	
kill:
	- docker stop app postgresql
	- docker rm app postgresql
	- docker system prune -af --volumes

start:
	- docker start app postgresql

stop:
	- docker stot app postgresql

restart:
	- docker restart app postgresql

logs:
	- docker compose logs -f

shell:
	- docker compose exec app /bin/bash

clean:
	- docker system prune -af --volumes

down:
	- docker compose down

up:
	- docker compose up -d --build

reset: 
	- docker compose down --volumes --remove-orphans
	- docker system prune -af --volumes

permission:
	- chmod -R 777 .