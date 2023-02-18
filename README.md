:coffee: User Service
---
One of the microservice for my personal project, this is the only one service I exposed to public, from here you can modefy this codes to make your other services it will be like a template architecture/structured based on __[nodejs best practices](https://github.com/goldbergyoni/nodebestpractices)__.

#### Usage
- clone this repository
- create a secrets with keys ```PUBLIC_KEY, PRIVATE_KEY```.
- cd inside the project folder
- set environment variables ```APP_PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_STRICT_QUERY,```
- set environment variables ```PUBLIC_KEY, PRIVATE_KEY``` RS256 for passport-jwt encryption and decryption
- run ```npm install, npm run dev```
- run ```npm run build``` to build native ```es2016```
- run ```npm run test:watch``` to test in watch mode
- when using docker ```docker build -t user-service:latest .``` to build docker image.

#### Deploy
- __[aws](https://aws.amazon.com/)__ ```EKS, ECS, EC2```
- __[vultr](https://www.vultr.com/)__ ```Cloud Compute, Kubernetes```
- Or any other cloud hosting but more recommended in containerize environment.

__Production Libraries__

- __[bcrypt](https://www.npmjs.com/package/bcrypt)__ - A library to help you hash passwords.
- __[express](https://www.npmjs.com/package/express)__ - Fast, unopinionated, minimalist web framework for Node.js.
- __[express-validator](https://www.npmjs.com/package/express-validator)__ - An express.js middleware for validator.
- __[mongoose](https://www.npmjs.com/package/mongoose)__ - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- __[passport](https://www.npmjs.com/package/passport)__ - Passport is Express-compatible authentication middleware for Node.js.
- __[passport-jwt](https://www.npmjs.com/package/passport-jwt)__ - A Passport strategy for authenticating with a JSON Web Token.

- __[pino](https://www.npmjs.com/package/pino)__ - Very low overhead Node.js logger.
- __[pino-pretty](https://www.npmjs.com/package/pino-pretty)__ - This module provides a basic ndjson formatter to be used in development. If an incoming line looks like it could be a log line from an ndjson logger, in particular the Pino logging library, then it will apply extra formatting by considering things like the log level and timestamp.

__Development Libraries__

- __[@jest/globals](https://www.npmjs.com/package/@jest/globals)__ - Jest support for typescript with ts-jest
- __[nodemon](https://www.npmjs.com/package/nodemon)__ - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- __[supertest](https://www.npmjs.com/package/supertest)__ - The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.
- __[ts-jest](https://www.npmjs.com/package/ts-jest)__ - A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.
- __[ts-node](https://www.npmjs.com/package/ts-node)__ - TypeScript execution and REPL for node.js, with source map and native ESM support.
- __[typescript](https://www.npmjs.com/package/typescript)__ - TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS.

This repository is still updating.
