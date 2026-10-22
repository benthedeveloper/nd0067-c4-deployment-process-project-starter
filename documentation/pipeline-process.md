# Pipeline Process

This repo uses CircleCI to build and deploy the Udagram application. The pipeline configuration is stored at `.circleci/config.yml`.

## CircleCI project setup

The CircleCI project is connected to this GitHub repository and uses the repository as its checkout source. The pipeline is configured to read `.circleci/config.yml` and trigger on pushes to the repository.

Project environment variables are configured in CircleCI under **Project Settings → Environment Variables**. The pipeline needs AWS credentials and configuration, database connection settings, and the JWT secret. The configured variable names include:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`
- `AWS_REGION`
- `AWS_PROFILE`
- `AWS_BUCKET`
- `JWT_SECRET`
- `POSTGRES_HOST`
- `POSTGRES_DB`
- `POSTGRES_USERNAME`
- `POSTGRES_PASSWORD`

Keep these values in CircleCI or another secure environment-variable store; do not commit their values to the repository. See the [API environment-variable guide](../udagram/udagram-api/src/config/README.md) for what the application uses them for.

## Pipeline stages

The `udagram` workflow has three jobs:

1. **Build** — Runs for pushes to the repository. It uses Node.js 14.15, checks out the code, installs frontend and API dependencies, lints the frontend, and builds both applications.
2. **Approval** — On the `master` branch, CircleCI pauses at a manual approval step after a successful build.
3. **Deploy** — Runs after approval. It installs the Elastic Beanstalk CLI and configures the AWS CLI, then installs and builds both applications before deploying the frontend and API.

The frontend is published to the S3 bucket configured by its deployment script. The API is deployed to the Elastic Beanstalk environment selected by its deployment script. See the [infrastructure description](infrastructure-description.md) for details about the AWS resources.

## Running and monitoring the pipeline

After pushing a commit, open the project in CircleCI and select the pipeline to view its workflow and job logs. A failed build must be addressed before deployment can proceed. For a successful `master` build, approve the **hold** job to allow the deployment job to run.

The CircleCI screenshots in this directory show the pipeline history and the project environment-variable settings:

- [Pipeline history](screenshots/circle-ci-screenshot.png)
- [Environment-variable settings](screenshots/circle-ci-env-vars.png)

## Configuration

The workflow and job steps are defined in [`.circleci/config.yml`](../.circleci/config.yml). The commands invoked by the pipeline are defined in the root [`package.json`](../package.json) and the frontend and API package manifests.
