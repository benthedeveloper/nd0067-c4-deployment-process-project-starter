# App Dependencies

Udagram is made up of 2 independently installed NodeJS projects: an Angular/Ionic frontend and a NodeJS/Express API. Each has its own `package.json`. Install dependencies from each corresponding project directory.

## Frontend

**Location:** `udagram/udagram-frontend`

### Runtime dependencies

- **Angular 8.2** (`@angular/*`) provides the application framework, routing, forms, and browser rendering. The project also declares `@angular/http` 7.2.
- **Ionic Angular 4.1** (`@ionic/angular`) provides the mobile-oriented UI components, with Ionic Native packages for core integration, splash screen, and status bar.
- **RxJS 6.5**, **Zone.js 0.9**, and **Core-js 2.5** support reactive programming, Angular change detection, and JavaScript compatibility.

### Development and test dependencies

- **Angular CLI 8.3** and Angular DevKit build packages compile and serve the app.
- **TypeScript 3.5** and Angular's compiler provide the TypeScript build toolchain.
- **Karma** and **Jasmine** run unit tests; **Protractor** and Jasmine support end-to-end tests.
- **TSLint**, **Codelyzer**, and **typescript-eslint** provide linting.

### Requirements and commands

Use Node.js 14 for this legacy Angular toolchain; the frontend may not build with current Node.js releases. From `udagram/udagram-frontend`, run:

```sh
npm install
npm start
```

The `build`, `test`, `e2e`, and `lint` scripts are also defined in the frontend `package.json`. If npm reports peer-dependency conflicts during installation, the project README suggests `npm install -f` as a workaround.

## Backend API

**Location:** `udagram/udagram-api`

### Runtime dependencies

- **Express 4.16** handles HTTP requests and API routes; **body-parser** parses JSON request bodies and **CORS** enables browser access from the frontend.
- **Sequelize 6.26** and **sequelize-typescript 2.1** define the data models and connect to PostgreSQL. **pg 8.11** is the PostgreSQL driver, and **reflect-metadata** supports TypeScript decorators used by the models.
- **AWS SDK for JavaScript v2** provides S3 access and signed upload/download URLs.
- **bcryptjs** hashes and verifies account passwords; **jsonwebtoken** creates and verifies authentication tokens; **email-validator** validates email addresses.
- **dotenv 8.2** loads local environment variables during development.

### Development and test dependencies

- **TypeScript 4.2**, **ts-node-dev**, and the associated `@types/*` packages support compiling and running the TypeScript API during development.
- **Mocha**, **Chai**, and **chai-http** are included for API testing. The current `test` script is a placeholder and exits with an error rather than running a test suite.
- **ESLint** with the Google configuration and **typescript-eslint** provide linting packages.

### Requirements and configuration

The API `package.json` declares Node.js **14.15.0**. The API also needs AWS credentials and environment variables for the PostgreSQL connection, AWS region and media bucket, and JWT secret. See the [API environment-variable guide](../udagram/udagram-api/src/config/README.md) for the variable names.

From `udagram/udagram-api`, install packages and run the development server with:

```sh
npm install
npm run dev
```

You may verify the server is running locally at: [http://localhost:8080/api/v0/feed](http://localhost:8080/api/v0/feed).

The API's `build`, `prod`, and `deploy` scripts are defined in its `package.json`. The package manifests and lockfiles are the source of truth for dependency versions; version ranges shown here summarize the declared versions.
