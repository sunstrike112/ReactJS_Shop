import { MANAGEMENT_ICON } from 'Assets'

export const EVALUATION_STATUSES = [
  {
    value: null,
    label: '-'
  },
  {
    value: 'NEW',
    label: 'new'
  },
  {
    value: 'SUBMITTED',
    label: 'submitted'
  },
  {
    value: 'RESUBMITTED',
    label: 'resubmitted'
  },
  {
    value: 'EVALUATION_COMPLETED',
    label: 'evaluation_completed'
  },
  {
    value: 'WAITING_FOR_RELEASE',
    label: 'waiting_for_release'
  }
]

export default {
  course_result: [
    {
      name: 'status_learn_course_of_user',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/status-learn-course',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ],

  course_unit: [
    {
      name: 'unit_learn_course_of_user',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/completion-status-by-user',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: '/course-result/unit-learn-course',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/unit-learn-course',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'test_results',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/test-results',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'statistical_results_of_survey',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/statistical-results-of-survey',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'survey_answer',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/survey-answer',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'report_histories',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/report-histories',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'questionnaire_analysis',
      Icon: MANAGEMENT_ICON,
      path: '/course-result/report-histories',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ]
}
