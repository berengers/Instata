## Infrastructure Schema

![infrastructure schema](https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggVERcbiAgQShDbGllbnQpXG4gIEIoTmdpbnggTG9hZCBCYWxhbmNlcjxici8-bG9jYWxob3N0OjgwODApXG4gIEMoTm9kZWpzIFNlcnZlcjxici8-bG9jYWxob3N0OjQwMDApXG4gIEQoTmdpbnggU3RhdGljIFNlcnZlcjxici8-bG9jYWxob3N0OjgwMDApXG4gIEUoUG9zdGdyZXNxbDxici8-bG9jYWxob3N0OjU0MzIpXG5cbiAgQSAtLT4gQlxuICBCIC0tPiB8IC9hcGkgfCBDXG4gIEIgLS0-IHwgLyB8IERcbiAgQyAtLT4gRVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

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
