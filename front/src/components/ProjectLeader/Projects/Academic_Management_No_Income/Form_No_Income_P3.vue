<template>
  <div>
      <NavbarProject class="fixed-top " propText="โครงการบริการวิชาการที่ไม่มีรายได้" />
      <ProgressBar class="fixed-top border"  :step="currentStep" @update:step="currentStep" />
      <Loader v-if="loading" />
      <div class="container-fluid d-flex justify-content-center" style="max-height: auto;margin-top: 230px;">
        <div class="d-flex flex-column  border p-4 shadow mb-5 "
          style="max-width: 1200px;min-width: 1200px;background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 mt-3">
            <p>
              ส่วนที่ 3 หลักการและเหตุผล วัตถุประสงค์ ตัวชี้วัด
            </p>
          </div>
          <div class="row p-4">
            <div class="mb-2">
              <p class="text-white fs-5 ">
                ความสำคัญของโครงการ และความเชื่อมโยงของโครงการกับแผนพัฒนามหาวิทยาลัยแม่ฟ้าหลวง และ/หรือแผนอื่น ๆ ที่เกี่ยวข้อง
              </p>
              <div>
                <textarea type="text" class="form-control beautiful-box" v-model="Project_Data_P3.projectDetails" style="max-width: 100%; min-width: 100%; height: 15px;"
                  :placeholder="`โปรดกรอก หลักการและเหตุผล`"></textarea>
              </div>
            </div>
            <hr class="text-white mt-2">
            <div class="mb-2">
              <p class="text-white fs-5 ">
                วัตถุประสงค์โครงการให้สอดคล้องกับตัวโครงการ หลักการและเหตุผล ของโครงการ
              </p>
              <div v-for="( objective ,index ) in Project_Data_P3.projectObjectives" :key="index">
                <div v-if="index+1 == 1">
                  <textarea type="text" class="form-control beautiful-box" v-model="objective.value"  style="max-width: 100%; min-width: 100%; height: 15px;"
                  :placeholder="`วัตถุประสงค์โครงการ`" ></textarea>
                </div>
                <div class="row mt-3" v-else>
                  <div class="col-10">
                    <textarea type="text" class="form-control beautiful-box" style="max-width: 100%; min-width: 100%; height: 15px;"
                    :placeholder="`วัตถุประสงค์โครงการ`" v-model="objective.value" ></textarea>
                  </div>
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <div @click="decrease_Objective(index)" class="btn btn-danger p-2">
                        ลดวัตถุประสงค์
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-2 d-flex justify-content-center">
              <button class="btn mt-2" @click="addObjective()"  :disabled="is_objective_limit" style="width: 200px; background-color: #0d6efd; color: white;">
                เพิ่มวัตถุประสงค์โครงการ
              </button>
            </div>
            <hr class="text-white mt-3">
            <div class="mt-3">
              <p class="text-white fs-4 mb-0">
                เส้นทางสู่ผลกระทบของงานวิจัย (Impact Pathway)
              </p>
            </div>
            <div class="mb-1 mt-0">
              <div class="p-2">
                <span class="text-white fs-5 mb-0">
                  1. Input หรือปัจจัยนำเข้า :
                  ปัจจัยนำเข้าซึ่งเป็นปัจจัยที่ขับเคลื่อนให้งานบริการวิชาการสำเร็จและสร้างผลกระทบต่อสังคม
                  ส่วนใหญ่ประกอบด้วย
                </span>
                <div class="p-2">
                  <p class="text-white fs-6 mb-0">
                    1.1 งบประมาณโครงการ
                  </p>
                  <p class="text-white fs-6 mb-0">
                    1.2 หัวหน้าคณะบริหารโครงกร
                  </p>
                  <p class="text-white fs-6 mb-0">
                    1.3 ระยะเวลาดำเนินการ
                  </p>
                </div>
              </div>

              <div class="mt-3 mb-1">
                <div class="mt-3" v-for="(input,index) in Project_Data_P3.input" :key="index">
                  <div v-if="index == 0">
                    <textarea type="text" class="form-control beautiful-box" v-model="input.value" style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 1.${index + 4}`"></textarea>
                  </div>
                  <div v-else>
                    <div class="row">
                      <div class="col-10">
                        <textarea type="text" class="form-control beautiful-box" v-model="input.value"  style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 1.${index + 4}`"></textarea>
                      </div>
                      <div class="col-2 d-flex justify-content-center align-items-center">
                        <button @click="decrease_input(index)" class="btn btn-danger">ลบปัจจัยนำเข้านี้</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button @click="addInput" :disabled="is_input_limit" class="btn mt-3" style="width: 200px; background-color: #0d6efd; color: white;"> เพิ่มปัจจัยนำเข้า </button>
              </div>
            </div>
            <div class="mb-1 mt-0">
              <span class="text-white fs-5 mb-0">
                2. Output ผลผลิตของโครงการมีความคาดหวังสมรรถนะ (Competency, Competence)
                (ผลผลิตที่เกิดขึ้นทันที เกิดขึ้นโดยตรงหลังจากการดำเนินโครงการ/กิจกรรมแล้วเสร็จ)
              </span>
              <div class="p-2">
                <p class="text-white fs-6 mb-0">
                  2.1 จำนวนผู้เข้าร่วมโครงการไม่น้อยกว่าร้อยละ 80
                </p>
                <p class="text-white fs-6 mb-0">
                  2.2 ผู้เข้าร่วมโครงการมีความพึงพอใจในระดับค่าเฉลี่ยรวมไม่น้อยกว่า 4.50
                </p>
              </div>

              <div class="mt-3 mb-1">
                <div class="mt-3" v-for="(output,index) in Project_Data_P3.outputs" :key="index">
                  <div v-if="index == 0">
                    <textarea class="form-control beautiful-box" v-model="output.value"  style="width: 100%; resize: vertical;" rows="1" :placeholder="`โปรดระบุ 2.${index+3}`"></textarea>
                  </div>
                  <div v-else>
                    <div class="row align-items-center">
                      <div class="col-10">
                        <textarea class="form-control beautiful-box" v-model="output.value"  style="width: 100%; resize: vertical;" rows="1" :placeholder="`โปรดระบุ 2.${index+3}`"></textarea>
                      </div>
                      <div class="col-2 d-flex justify-content-center align-items-center">
                        <button @click="decrease_output(index)" class="btn btn-danger" style="width: 100%; max-width: 120px;">ลบผลผลิตนี้</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="d-flex justify-content-center">
                <button @click="addOutput" class="btn mt-3" style="width: 200px; background-color: #0d6efd; color: white;"> เพิ่มผลผลิต </button>
              </div>
            </div>
            <div class="mb-1 mt-0">
              <span class="text-white fs-5 mb-0">
                3. Outcome ผลลัพธ์ที่คาดว่าจะได้รับจากการดำเนินโครงการ (ผลที่เกิดต่อเนื่องมาจากผลผลิต)
              </span>
              <div class="p-2">
                <p class="text-white fs-6 mb-0">
                  3.1 User ผู้ใช้ประโยชน์จากผลผลิตของงานบริการวิชาการ
                  งานบริการวิชาการที่เกิดผลลัพธ์ที่สำคัญต้องมีผู้ใช้ประโยชน์ (User) มีการยอมรับหรือการนำไปใช้ในหลายระดับ
                </p>
              </div>

              <div class="mt-3 mb-1">
                <div class="mt-3" v-for="(outcome_user,index) in Project_Data_P3.outcome_user" :key="index">
                  <div v-if="index == 0">
                    <textarea type="text" class="form-control beautiful-box" v-model="outcome_user.value" style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 3.1.${index + 1}`"></textarea>
                  </div>
                  <div v-else>
                    <div class="row">
                      <div class="col-10">
                        <textarea type="text" class="form-control beautiful-box" v-model="outcome_user.value" style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 3.1.${index + 1}`"></textarea>
                      </div>
                      <div class="col-2 d-flex justify-cotent-center align-items-center">
                        <button @click="decrease_outcome_user(index)" class="btn btn-danger">ลบผู้ใช้ประโยชน์นี้</button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn mt-3" @click="addOutcomeUser" :disabled="is_outcome_user_limit" style="width: 200px; background-color: #0d6efd; color: white;"> เพิ่มผู้ใช้ประโยชน์ </button>
              </div>

              <p class="text-white fs-6 mb-0 mt-1 p-2">
                3.2 Change การเปลี่ยนแปลงที่เกิดขึ้นพิจารณาการใช้ประโยชน์ผลผลิต (Output) แยกตามผู้ใช้ (User) แต่ละประเภท
                ซึ่งการเปลี่ยนแปลงอาจเกิดขึ้นต่างช่วงเวลากัน
              </p>

              <div class="mt-3 mb-1">
                <div v-for="(outcome_change,index) in Project_Data_P3.outcome_change" :key="index" class="mt-3">
                  <div v-if="index == 0">
                    <textarea type="text" class="form-control beautiful-box" v-model="outcome_change.value" style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 3.2.${index + 1}`"></textarea>
                  </div>
                  <div v-else>
                    <div class="row">
                      <div class="col-9">
                        <textarea type="text" class="form-control beautiful-box" v-model="outcome_change.value" style="max-width: 100%; min-width: 100%; height: 15px;" :placeholder="`โปรดระบุ 3.2.${index + 1}`"></textarea>
                      </div>
                      <div class="col-3 d-flex justify-content-center align-items-center">
                        <button @click="decrease_outcome_change(index)" class="btn btn-danger">ลบการเปลี่ยนเเปลงนี้</button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="d-flex justify-content-center">
                <button @click="addOutcomeChange" :disabled="is_outcome_change_limit" class="btn mt-3" style="width: 200px; background-color: #0d6efd; color: white;"> เพิ่มการเปลี่ยนแปลง </button>
              </div>
            </div>
            <div class="mb-3 mt-0">
              <span class="text-white fs-5 ">
                4. Impact
                ผลกระทบ คือ การเปลี่ยนแปลงจากผลลัพธ์ในวงกว้างโดยทั่วไป
                สามารถกำหนดผลกระทบออกเป็น 3 ประเภท ซึ่งขึ้นอยู่กับลักษณะของโครงการ สามารถก่อให้เกิดผลกระทบเพียง 1 หรือ 2
                หรือ 3 ประเภทได้ พิจารณาได้ทั้งผลกระทบทางตรงและทางอ้อม ที่เป็นเชิงบวกและเชิงลบ
              </span>

              <div class="row mt-4">
                <div 
                  v-for="(impact) in Project_Data_P3.impacts" 
                  :key="impact.id" 
                  class="row align-items-center mb-3"
                >
                  <!-- Left Column: Checkbox & Label -->
                  <div class="col-3 d-flex justify-content-between align-items-center ">
                    <input 
                      type="checkbox" 
                      class="form-check-input me-2 mx-5 circle-input" 
                      :id="impact.id" 
                      v-model="impact.isCheck"
                    >
                    <label class="form-check-label text-white" :for="impact.id">
                      {{ impact.title }}
                    </label>
                  </div>

                  <!-- Right Column: Input Field -->
                  <div class="col-9">
                    <textarea
                      type="text" 
                      class="form-control beautiful-box" 
                      :placeholder="`อย่างไร โปรดระบุ`"
                      v-model="impact.value"
                      :disabled="!impact.isCheck"
                      style="height: 15px;"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="mb-1 mt-0">
                <span class="text-white fs-5 mb-0">
                  5. ทฤษฎีการเปลี่ยนเแปลง (ToC)
                  ข้อความ/ประโยคสั้นๆ ที่จะอธิบายให้เห็นถึงโครงการ สู่ผลลัพธ์ และเป้าหมายระยะยาว <br>"ถ้ามีโครงการ .. (ชื่อโครงการฯ/กิจกรรม) ... แล้ว
                            จะทำให้ ... (ผู้ที่ใช้ประโยชน์ พื้นที่ ฯลฯ) (ผลลัพธ์) ..
                            นำมาสู่ ... (ผลกระทบ) ..."
                  <br>ตัวอย่าง “ถ้ามีโครงการคัดกรองมะเร็งเต้านมและมะเร็งปากมดลูกในพื้นที่ดอยตุงแล้ว
                      จะทำให้ชาวบ้านบนดอยตุงมีคุณภาพชีวิตที่ดีขึ้น 
                      ลดความเสี่ยงในการเสียชีวิตจากการเป็นมะเร็ง
                      นำมาสู่การลดภาระค่าใช้จ่ายด้านสาธารณสุข และมีสุขภาวะชุมชนยั่งยืน” 
                </span>
                <div class="mt-3 mb-1 d-flex justify-content-center">
                  <textarea type="text" class="form-control beautiful-box" v-model="Project_Data_P3.toc" style="max-width: 100%; min-width: 100%;"
                    :placeholder="`โปรดระบุ`"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 d-flex justify-content-end">
                <router-link :to="{path:'/pl/no_income/p_2',query:{project_id: project_id || '',project_type:1}}">
                  <button class="btn btn-secondary" style="width: 140px;" @click="prevStep"
                    :disabled="currentStep === 1">ย้อนกลับ</button>
                </router-link>
              </div>
              <!-- <div class="col-6">
                <router-link :to="{path:'/pl/no_income/p_4',query:{project_id: project_id || '',project_type:1}}">
                  <button class="btn btn-success" style="width: 140px;" @click="nextStep" :disabled="currentStep === 7">
                    ถัดไป
                  </button>
                </router-link>
              </div> -->
              <div class="col-6"><button class="btn btn-success" style="width: 140px;" @click="submitForm"  :disabled="!isCanGo">
                    <!-- <router-link class="text-white text-decoration-none"  @click="nextStep" :to="{path:'/pl/no_income/p_2',query:{project_id: project_id || '',project_type:1}}"> -->
                      <span>บันทึก</span>
                    <!-- </router-link> -->
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script setup>
//api
import axios from 'axios'
import { useCookies } from "vue3-cookies";
import { useRoute,useRouter } from 'vue-router'
const  { cookies }  = useCookies();
//
import ProgressBar from '@/components/ProgressBar.vue'
import Loader from '@/components/Loader.vue';
import parseJwt from '../../../../../utils/DecodeToken';
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import NavbarProject from '@/components/NavbarProject.vue'
//swal
import Swal from 'sweetalert2'
const router = useRouter(); 
const loading = ref(false)
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
//   iconColor: 'black',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const currentStep = ref(3);

const project_id = ref(null)
const project_type = ref(null)
const user_id = ref(null)
const affiliation_id = ref(null)

let isInitialized = false
let canEdit = false
let isCanGo = false

var Project_Data_P3 = reactive({
  projectDetails: "", 
  projectObjectives: [ // เพิ่มได้หลายอัน
    {
      id: 1,
      value:'' // required
    },
  ], 
  input:[ // เพิ่มได้หลายอัน
    {
      id:1,
      value:'' // required
    }
  ],
  outputs: [ // เพิ่มได้หลายอัน
    {
      id:1,
      value:'' // required
    }
  ], 
  outcome_user: [ // เพิ่มได้หลายอัน
    {
      id:1,
      value:'' // required
    }
  ],
  outcome_change: [ // เพิ่มได้หลายอัน
    {
      id:1,
      value:'' // required
    }
  ], 
  impacts: [ // เพิ่มได้หลายอัน
    {
      id: 1,
      title: 'เศรษฐกิจ',
      isCheck: false, //if true, value can not be a empty
      value: '' 
    },
    {
      id: 2,
      title: 'สังคม',
      isCheck: false, //if true, value can not be a empty
      value:''
    },
    {
      id: 3,
      title: 'สิ่งแวดล้อม',
      isCheck: false, //if true, value can not be a empty
      value:''
    }
  ],
  toc: ""  // required
})


const objective_limit = 6
const is_objective_limit = ref(false)
const addObjective = () => {
  if (Project_Data_P3.projectObjectives.length >= objective_limit) {
    is_objective_limit.value = true;
    return; // ป้องกันการเพิ่มเกินลิมิต
  }

  Project_Data_P3.projectObjectives.push({
    id: Project_Data_P3.projectObjectives.length + 1,
    value: ''
  });

  // เช็คว่าถึงลิมิตหรือยัง
  if (Project_Data_P3.projectObjectives.length >= objective_limit) {
    is_objective_limit.value = true;
  }
}
const decrease_Objective = (index) => {
  if (Project_Data_P3.projectObjectives.length > 1) {
    Project_Data_P3.projectObjectives.splice(index, 1);

    Project_Data_P3.projectObjectives.forEach((obj, i) => {
      obj.id = i + 1
    })

    if (Project_Data_P3.projectObjectives.length < objective_limit) {
      is_objective_limit.value = false;
    }
  }
}

const input_limits = 6
const is_input_limit = ref(false)
const addInput = () => {
  if (Project_Data_P3.input.length >= input_limits) {
    is_input_limit.value = true;
    return
  }

  Project_Data_P3.input.push({
    id: Project_Data_P3.input.length + 1,
    value: ''
  })

  if (Project_Data_P3.input.length >= input_limits) {
    is_input_limit.value = true;
  }
}

const decrease_input = (index) => {
  if (Project_Data_P3.input.length > 1) {
    Project_Data_P3.input.splice(index, 1);

    Project_Data_P3.input.forEach((obj, i) => {
      obj.id = i + 1
    })

    if (Project_Data_P3.input.length < input_limits) {
      is_input_limit.value = false;
    }
  }
}

const output_limits = 6
const is_output_limit = ref(false)
const addOutput = ()=>{
  if (Project_Data_P3.outputs.length >= output_limits) {
    is_output_limit.value = true;
    return
  }

  Project_Data_P3.outputs.push({
    id: Project_Data_P3.outputs.length + 1,
    value: ''
  })

  if (Project_Data_P3.outputs.length >= output_limits) {
    is_output_limit.value = true;
  }
}
const decrease_output = (index) => {
  if (Project_Data_P3.outputs.length > 1) {
    Project_Data_P3.outputs.splice(index, 1);

    Project_Data_P3.outputs.forEach((obj, i) => {
      obj.id = i + 1
    })

    if (Project_Data_P3.outputs.length < output_limits) {
      is_output_limit.value = false;
    }
  }
}

const outcome_user_limits = 6
const is_outcome_user_limit = ref(false)
const addOutcomeUser = ()=>{
  if (Project_Data_P3.outcome_user.length >= outcome_user_limits) {
    is_outcome_user_limit.value = true;
    return
  }

  Project_Data_P3.outcome_user.push({
    id: Project_Data_P3.outcome_user.length + 1,
    value: ''
  })

  if (Project_Data_P3.outcome_user.length >= outcome_user_limits) {
    is_outcome_user_limit.value = true;
  }
}
const decrease_outcome_user = (index) => {
  if (Project_Data_P3.outcome_user.length > 1) {
    Project_Data_P3.outcome_user.splice(index, 1);

    Project_Data_P3.outcome_user.forEach((obj, i) => {
      obj.id = i + 1
    })

    if (Project_Data_P3.outcome_user.length < outcome_user_limits) {
      is_outcome_user_limit.value = false;
    }
  }
}

const outcome_change_limits = 6
const is_outcome_change_limit = ref(false)
const addOutcomeChange = ()=>{
  if (Project_Data_P3.outcome_change.length >= outcome_change_limits) {
    is_outcome_change_limit.value = true;
    return
  }

  Project_Data_P3.outcome_change.push({
    id: Project_Data_P3.outcome_change.length + 1,
    value: ''
  })

  if (Project_Data_P3.outcome_change.length >= outcome_change_limits) {
    is_outcome_change_limit.value = true;
  }
}
const decrease_outcome_change  = (index) => {
  if (Project_Data_P3.outcome_change.length > 1) {
    Project_Data_P3.outcome_change.splice(index, 1);

    Project_Data_P3.outcome_change.forEach((obj, i) => {
      obj.id = i + 1
    })

    if (Project_Data_P3.outcome_change.length < outcome_change_limits) {
      is_outcome_change_limit.value = false;
    }
  }
}

function debounce(func, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const getDataWhenProjectID = async ()=>{
  try{
    const response = await axios.post('http://localhost:5000/pl/get/p_3',{
      project_id: project_id.value, 
      project_type: project_type.value,
      project_user: user_id.value,
    })
    
    const project_data = JSON.parse(response.data.data[0].project_data_p_3)
    //console.log(project_data)
    Project_Data_P3.projectDetails = project_data.projectDetails
    Project_Data_P3.projectObjectives =  project_data.projectObjectives
    Project_Data_P3.input = project_data.input
    Project_Data_P3.outputs =  project_data.outputs
    Project_Data_P3.outcome_user = project_data.outcome_user
    Project_Data_P3.outcome_change = project_data.outcome_change
    Project_Data_P3.impacts = project_data.impacts
    Project_Data_P3.toc = project_data.toc

    // //console.log('sending a request to fetch editing data project id = ',project_id)
  }catch(err){
    //console.log(err)
    //console.log('error fetching editing data = ',project_id.value)
  }
}

const autoSave = debounce(async () => {
  try {

    const response = await axios.post('http://localhost:5000/pl/p_3/no_income/save', { 
    project_id: project_id.value, 
    project_type: project_type.value,
    project_user: user_id.value,
    project_data: Project_Data_P3 ,
    project_affiliation: affiliation_id.value 
  })
    //console.log(response.data)
    if(response.data.success){
      project_id.value = response.data.insert_id;
      //console.log('project_id',project_id.value)
      router.replace({path:'/pl/no_income/p_4',query:{project_id: project_id.value || '', project_type:1}})
       Toast.fire({
                    icon: 'success',
                    iconColor: 'green',
                    title: `บันทึกอัตโนมัติสำเร็จ`,
                })
                await setTimeout(() => {
                loading.value = false
              }, 500)
      }else{
         Toast.fire({
                    icon: 'error',
                    iconColor: 'red',
                    title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
                })
      }
    
  } catch (error) {
    console.error(error)
     Toast.fire({
                    icon: 'error',
                    iconColor: 'red',
                    title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
                })
  }
}, 3000) 
 


const submitForm = async ()=>{
  loading.value = true
  await autoSave()
  nextStep()
}

// watch(
//       Project_Data_P3,
//       (newVal) => {
//         if (!newVal.projectDetails.trim()) {
//           isCanGo = false;
//           return;
//         }

//         const mustFilledArrays = [
//           newVal.projectObjectives,
//           newVal.input,
//           newVal.outputs,
//           newVal.outcome_user,
//           newVal.outcome_change
//         ];

//         const hasEmptyField = mustFilledArrays.some(arr =>
//           arr.some(item => !item.value || item.value.trim() === '')
//         );
//         if (hasEmptyField) {
//           isCanGo = false;
//           return;
//         }

//         const hasInvalidImpact = newVal.impacts.some(imp =>
//           imp.isCheck && (!imp.value || imp.value.trim() === '')
//         );
//         if (hasInvalidImpact) {
//           isCanGo = false;
//           return;
//         }

//         if (!newVal.toc || newVal.toc.trim() === '') {
//           isCanGo = false;
//           return;
//         }

//         isCanGo = true;
//       },
//       { deep: true, immediate: true }
//     );

watch(
  Project_Data_P3,
  (newVal) => {
    //console.log('--- Checking Project_Data_P3 ---');
    
    if (!newVal.projectDetails?.trim()) {
      //console.log('❌ projectDetails is empty');
      isCanGo = false;
      return;
    }
    //console.log('✅ projectDetails:', newVal.projectDetails);

    const mustFilledArrays = [
      newVal.projectObjectives,
      newVal.input,
      newVal.outputs,
      newVal.outcome_user,
      newVal.outcome_change
    ];

    const hasEmptyField = mustFilledArrays.some(arr =>
      !Array.isArray(arr) || arr.some(item => !item.value || item.value.trim() === '')
    );
    if (hasEmptyField) {
      //console.log('❌ Found empty fields in one of the required arrays');
      isCanGo = false;
      return;
    }
    //console.log('✅ All fields in required arrays are filled');

    if (!Array.isArray(newVal.impacts)) {
      //console.log('❌ impacts is not an array');
      isCanGo = false;
      return;
    }
    const hasInvalidImpact = newVal.impacts.some(imp =>
      imp.isCheck && (!imp.value || imp.value.trim() === '')
    );
    if (hasInvalidImpact) {
      //console.log('❌ Selected impacts have empty value fields');
      isCanGo = false;
      return;
    }
    //console.log('✅ impacts are valid');

    if (!newVal.toc?.trim()) {
      //console.log('❌ toc is empty');
      isCanGo = false;
      return;
    }
    //console.log('✅ toc:', newVal.toc);

    //console.log('🎉 All fields are filled, isCanGo = true');
    isCanGo = true;
  },
  { deep: true, immediate: true }
);


onMounted( async ()=>{
  const route = useRoute(); 
  const user = parseJwt(cookies.get('accesstoken'))
  user_id.value = user.user_id
  affiliation_id.value = user.affiliation_id
  
  
  if(route.query.project_type){
    const projectType = route.query.project_type; 
    project_type.value = projectType
  }

  if(route.query.project_id){
    const projectId = route.query.project_id; 
    project_id.value = projectId

    isInitialized = true
    canEdit = false // true
    await getDataWhenProjectID()
    canEdit = true
  }else{
    isInitialized = true
    canEdit = true //false 
  }
  //console.log('Project id:', project_id.value)
  //console.log('Project Type:', project_type.value)
  //console.log('user_id:', user_id.value)
})

watch(Project_Data_P3, (newVal, oldVal) => {
  //console.log('Project_Data_P3 has changed:');
  if(isInitialized && !canEdit){
    //console.log('return when fetching state')
    return 0
  }
}, { deep: true })
onUnmounted(()=>{
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
  })
})

const nextStep = () => {
  if (currentStep.value < 7) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style scoped>
.custom-input-four {
  /* width: 100%;
  border-radius: 5px; */
  max-width: 100%;
  min-width: 300px; 
}

.beautiful-box {
  min-height: 50px;
  border-radius: 6px;
  resize: vertical;
}


.circle-input{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid white;
}

.custom-input {
        width: 100%; 
        text-align: left; 
    }
</style>