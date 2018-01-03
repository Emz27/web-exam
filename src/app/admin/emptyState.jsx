const emptyExam = {
  exam_id:'',
  exam_description:'',
  exam_type_id:'',
  exam_type_description:'',
  subject_id:'',
  subject_description:'',
  teacher_subject_id:'',
  teacher_id:'',
  teacher_name:'',
  date_start:'',
  date_end:'',
  duration:'',
  total_item:'',
  total_point:'',

  enumeration_questions:[],
  multiple_choice_questions:[],
  true_false_questions:[],
  identification_questions:[],

  exam_questions:[],
}
const emptyQuestion = {
  question_id:'',
  question_description: '',
  subject_id: '',
  subject_description: '',
  teacher_id: '',
  teacher_name: '',
  teacher_subject_id:'',
  exam_type_id: '',
  exam_type_description:'',
  question_type_id: '',
  question_type_description:'',
  option_limit: 0,
  point: 1,

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
