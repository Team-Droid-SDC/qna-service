# Questions and Answers API
## Overview
This project is an API infrastructure service for the question and answers module of a retail e-commerce application.
## Technologies
Node.js | Express.js | PostgreSQL | AWS EC2 | NGINX | K6 | Loader.io
## Discription
- Designed the back-end system with a scalable RESTful API and database(PostgreSQL)
- Utilized an ETL process from 18M data sources into a PostgreSQL database.
- Re-built an existing API service with Node.js and Express.js
- Optimized the performance by refining queries and identifying bottlenecks with stress tests, locally K6 and cloud-based Loader.io.
- Deployed the server and databse on AWS EC2
- Horizontally scaled 3 intances and set up a load balancer with caching through Nginx
- Achieved latency of 84ms and a 0% error rate, throughput of over 1000rps.

<img width="540" alt="Screen Shot 2022-10-02 at 11 19 28 PM" src="https://user-images.githubusercontent.com/47969884/193512737-40f2e392-de2d-4110-821b-37c48a5efa29.png">

## Installation and Setup
1. Fork and clone the repo and navigate to the root directory
2. To install dependencies:
```
npm install
```
## Contributor
- [Jongmyung Jeong](https://github.com/pqqrpr)
