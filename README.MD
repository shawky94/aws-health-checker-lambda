# Health checker

## AWS Lambda handler that monitors website uptime

The 'health checker' is a lightweight Node.js application that serves as an AWS Lambda handler. It is designed to monitor and report the uptime of various websites, and includes a range of features to enhance its functionality. This application is intended to provide a reliable and efficient means of monitoring website uptime, ensuring that businesses and organizations can maintain a consistent level of service for their users.

## Features

- AWS Single region checks
- AWS multi region checks
- Dynamic list of websites to monitor
- Dynamic list of admins to notify

## Tech

To ensure that the npm package is lightweight and efficient, no external dependencies are utilized in its development. This approach helps to keep the package small and streamlined, allowing it to perform optimally in various environments.

## Prerequisites

- Create 3 dynamoDB tables: `checkHealth`, `checkUrl` and `admin`
- Give you lambda function permission to use `SES` and `DynamoDB` services
- Populate `admin` table with admin emails. primary key is `adminEmail`
- Populate `checkUrl` table with admin emails. primary key is `url`
- Set env variables for the lambda function:
  MAIN_REGION = 'us-east-1'
  RUN_IN_MULTI_REGIONS = `true` or `false`

## Installation

```sh
npm i health-checker-aws
```

## Usage

```sh
import healthCheckerAws from "health-checker-aws";

exports.handler = healthCheckerAws.handler;
```

## License

MIT
