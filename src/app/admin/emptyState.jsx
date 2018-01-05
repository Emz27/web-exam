const emptyExam = {
  exam_id:'',
  exam_description:'',
  exam_type_id:'',
  exam_type_description:'',
  exam_subject_id:'',
  exam_subject_description:'',
  exam_teacher_subject_id:'',
  exam_teacher_id:'',
  exam_teacher_name:'',
  exam_date_start:'',
  exam_date_end:'',
  exam_duration:'',
  exam_total_item:'',
  exam_total_point:'',

  enumeration_questions:[],
  multiple_choice_questions:[],
  true_false_questions:[],
  identification_questions:[],

  exam_questions:[],
}
const emptyQuestion = {
  question_id:'',
  question_description: '',
  question_subject_id: '',
  question_subject_description: '',
  question_teacher_id: '',
  question_teacher_name: '',
  question_teacher_subject_id:'',
  question_type_id: '',
  question_type_description:'',
  question_option_limit: 0,
  question_point: 1,

  question_options: [],
}
const emptyUser= {
  id:'',
  username:'',
  password:'',
  firstname: '',
  middlename: '',
  lastname: '',
  type: '2',
  type_description: '',

  subject_id: [],
  subject_subject:[],
  subject_description: [],
  subject_teacher: [],
}

export {emptyQuestion,emptyUser,emptyExam}
