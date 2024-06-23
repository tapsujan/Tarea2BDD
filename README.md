# Tarea2BDD
tarea 2
bun add -d prisma
bun add @prisma/user
modify url in env
in api folder:
bun prisma generate schema=./prisma/schema.prisma
bun prisma migrate
bun run start
