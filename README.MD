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
