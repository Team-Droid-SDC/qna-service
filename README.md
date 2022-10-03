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

<img width="540" alt="Screen Shot 2022-10-02 at 11 21 42 PM" src="https://user-images.githubusercontent.com/47969884/193513003-867fdafa-bc2a-4e0e-92fc-18c4ad8baa51.png">

## Installation and Setup
1. Fork and clone the repo and navigate to the root directory
2. To install dependencies:
```
npm install
```
## Contributor
- [Jongmyung Jeong](https://github.com/pqqrpr)

## End points
### List Questions
#### GET /qa/questions
- Retrieves a list of questions for a particular product. This list does not include any reported questions.

```
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": 0,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": 0,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```

### List Answers
#### GET /qa/questions/:question_id/answers
- Returns answers for a given question. This list does not include any reported answers.
```
{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
```

### Add a Question
#### POST /qa/questions
- Adds a question for the given product
### Add an Answer
#### POST /qa/questions/:question_id/answers
- Adds an answer for the given question
### Mark Question as Helpful
#### PUT /qa/questions/:question_id/helpful
- Updates a question to show it was found helpful.
### Report Question
#### PUT /qa/questions/:question_id/report
- Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
### Mark Answer as Helpful
#### PUT /qa/answers/:answer_id/helpful
- Updates an answer to show it was found helpful.
### Report Answer
#### PUT /qa/answers/:answer_id/report
- Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
