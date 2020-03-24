## Infrastructure Schema

![infrastructure schema](infra.png)

## Run full stack

```sh
docker-compose -f docker-compose.stack.yaml -f docker-compose.app.yaml build
docker-compose -f docker-compose.stack.yaml -f docker-compose.app.yaml up -d
```

## Dev workflow

```sh
docker-compose -f docker-compose.stack.yaml up -d

## run client in dev mode
cd client
npm start

## run server in dev mode
cd server
DB=postgres://postgres:postgres@127.0.0.1:5432/postgres node src/index.js 
```
