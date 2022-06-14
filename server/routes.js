const controller = require('./controllers');
const router = require('express').Router();

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);
router.post('/qa/questions', controller.postQuestion);
router.post('/qa/questions/:question_id/answers', controller.postAnswer);
router.put('/qa/questions/:question_id/helpful', controller.putQuestionHelpful);
router.put('/qa/questions/:question_id/report', controller.putQuestionReport);
router.put('/qa/answers/:answer_id/helpful', controller.putAnswerHelpful);
router.put('/qa/answers/:answer_id/report', controller.putAnswerReport);

module.exports = router;

// use explain and analyze to see execution plans
// avoid parallel scans
// if execution plans contains parallel scans, problely need indexes