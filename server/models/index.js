const pool = require('../db');

module.exports = {
  getQuestionsDB(product_id, page, count) {

    const queryString = `
    select row_to_json(question)
    from (
      select product_id, (
        select json_agg(
          json_build_object(
            'question_id', id,
            'question_body', question_body,
            'question_date', question_date,
            'asker_name', asker_name,
            'question_helpfulness', helpful,
            'reported', reported,
            'answers', (
              select json_object_agg(
                id,
                json_build_object(
                  'id', id,
                  'body', body,
                  'date', answer_date,
                  'answerer_name', answerer_name,
                  'helpfulness', helpful,
                  'photos', (
                    select array(
                      select url
                      from photos
                      where answer_id = answers.id
                    )
                  )
                )
              )
              from answers
              where question_id = questions.id
            )
          )
        )
        from questions
        where product_id = $1 and reported = false
      ) as results
      from questions
      where product_id = $1
    )
    question limit $2 offset $3`;

    const values = [product_id, count, count * page - count];
    return pool
      .query(queryString, values)
  },

  getAnswersDB(question_id, page, count) {
    const queryString = `
    select json_build_object(
      'question', id,
      'page', ${page},
      'count', ${count},
      'results', (
        select json_agg(
          json_build_object(
            'answer_id', id,
            'body', body,
            'date', answer_date,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (
              select json_agg(
                json_build_object(
                  'id', id,
                  'url', url
                )
              ) from photos
            where answer_id = answers.id
          )
        )
      ) as results
      from answers
      where question_id = questions.id
      )
    )
    from questions
    where id = $1 limit $2 offset $3`;

    const values = [question_id, count, count * page - count];

    return pool.query(queryString, values)
  },

  postQuestionDB(product_id, body, name, email) {
    console.log('inside ostQuestionDB')
    const queryString = `
    insert into
      questions
        (product_id, question_body, asker_name, asker_email)
      values
        ('${product_id}', '${body}', '${name}', '${email}')
    `
    return pool.query(queryString)

  },

  postAnswerDB(question_id, body, name, email, photos) {
    console.log('inside ostQuestionDB')
    const queryString = `
    with answer_post as(
      insert into
        answers
          (question_id, body, answerer_name, answerer_email)
        values
          ('${question_id}', '${body}', '${name}', '${email}')
      returning id
    )
    insert into
      photos
        (answer_id, url)
      values
        ((select id from answer_post), unnest('${photos}'::text[]))
    `;

    return pool.query(queryString)
  },

  putQuestionHelpfulDB(question_id) {
    const queryString = `
    update questions
    set helpful = helpful + 1
    where id = ${question_id}`;

    return pool.query(queryString);
  },

  putQuestionReportDB(question_id) {
    const queryString = `
    update questions
    set reported = true
    where id = ${question_id}`;

    return pool.query(queryString);
  },

  putAnswerHelpfulDB(answer_id) {
    const queryString = `
    update answers
    set helpful = helpful + 1
    where id = ${answer_id}`;

    return pool.query(queryString);
  },

  putAnswerReportDB(answer_id) {
    const queryString = `
    update answers
    set reported = true
    where id = ${answer_id}`;

  return pool.query(queryString);
  }
}