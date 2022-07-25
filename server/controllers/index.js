const models = require('../models');

module.exports = {

  getQuestions: (req, res) => {
    const {product_id, page = 1, count = 5} = req.query;
// console.log('inside controller questions')
    models.getQuestionsDB(product_id, page, count)
      .then((results) => {
        // console.log('controller result', results)
        res.status(200).send(results.rows[0])
        // res.status(200).json(result.rows[0].row_to_json);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getAnswers: (req, res) => {
    const {question_id} = req.params;
    const {page = 1, count = 5} = req.query;
    // console.log('inside controller questions')
    models.getAnswersDB(question_id, page, count)
      .then((result) => {
        // console.log('result', result)
        res.status(200).json(result.rows[0].json_build_object);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  postQuestion: (req, res) => {
    const {product_id, body, name, email} = req.body;

    models.postQuestionDB(product_id, body, name, email)
    .then((result) => {
      res.status(201).send('Post Created');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  postAnswer: (req, res) => {
    const {question_id} = req.params;
    const {body, name, email, photos} = req.body;

    models.postAnswerDB(question_id, body, name, email, photos)
    .then((result) => {
      res.status(201).send()
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  putQuestionHelpful: (req, res) => {
    const {question_id} = req.params;

    models.putQuestionHelpfulDB(question_id)
      .then((result) => res.status(204).send('Question helpful was recorded'))
      .catch((err) => res.status(500).send(err));

  },
  putQuestionReport: (req, res) => {
    const {question_id} = req.params;

    models.putQuestionReportDB(question_id)
      .then((result) => res.status(204).send('Question was reported'))
      .catch((err) => res.status(500).send(err));
  },

  putAnswerHelpful: (req, res) => {
    const {answer_id} = req.params;

    models.putAnswerHelpfulDB(answer_id)
      .then((result) => res.status(204).send('Answer helpful was recorded'))
      .catch((err) => res.status(500).send(err));

  },

  putAnswerReport: (req, res) => {
    const {answer_id} = req.params;

    models.putAnswerReportDB(answer_id)
      .then((result) => res.status(204).send('Answer was reported'))
      .catch((err) => res.status(500).send(err));
  }
}