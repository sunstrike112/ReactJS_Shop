const modules = [
  { name: 'Common', subModules: ['common', 'menu', 'error_message'] },
  {
    name: 'Admin_Course management',
    subModules: ['course', 'course_category', 'unit_setting', 'create_lecture', 'report_setting', 'test_question_management', 'test_question', 'upload_file']
  },
  {
    name: 'Admin_User management',
    subModules: ['user']
  },
  {
    name: 'Admin_Video management',
    subModules: ['recording']
  },
  { name: 'Other', subModules: ['contact', 'notification'] }
]

module.exports = {
  modules
}
