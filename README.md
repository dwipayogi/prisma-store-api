
# Store API

an API to connect and interacting with MySQL database for store. Creating using  [Express](https://expressjs.com/) and [Prisma ORM](https://www.prisma.io/)


## Tech Stack
**Framework:** Express

**Other:** Prisma


## Installation

Install with npm

```bash
  npm install
```

Add your env database in _.env_ file

```bash
  npx prisma migrate dev --name init
  npm run dev
```

you can access the API in **localhost:3000**

check all routes in routes folder