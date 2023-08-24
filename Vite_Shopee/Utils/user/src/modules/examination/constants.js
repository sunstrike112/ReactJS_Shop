export const STATUS = {
  START: 'START',
  TESTING: 'TESTING'
}

export const QUESTION_TYPE = {
  CHOOSE_MANY: 'CHOOSE_MANY',
  SELECT_ONE: 'SELECT_ONE',
  DESCRIPTION: 'DESCRIPTION'
}

export const TABS = [
  {
    key: 'TOTAL',
    title: 'examination.test_result.num_question',
    Numquestion: 'numberQuestion'
  },
  {
    key: 'CORRECT',
    title: 'examination.test_result.num_correct_answer',
    Numquestion: 'correctAnswer'
  },
  {
    key: 'INCORRECT',
    title: 'examination.test_result.num_incorrect_answer',
    Numquestion: 'unCorrectAnswer'
  },
  {
    key: 'UNANSWER',
    title: 'examination.test_result.number_unanswered_questions',
    Numquestion: 'unansweredQuestion'
  }
]
