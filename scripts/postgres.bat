mkdir C:\1\docker-volumes\fastify-effect-starter\postgres
docker run --name fastify-effect-starter-postgres -d ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=password ^
  -e POSTGRES_DB=fastify-effect-starter ^
  -p 5432:5432 ^
  -v C:\1\docker-volumes\fastify-effect-starter\postgres:/var/lib/postgresql/data ^
  postgres:15beta1
