const emptyQuestion = {
  id:'',
  description: '',
  subject_id: '',
  subject_description: '',
  teacher_id: '',
  teacher_name: '',
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

export {emptyQuestion,emptyUser}
