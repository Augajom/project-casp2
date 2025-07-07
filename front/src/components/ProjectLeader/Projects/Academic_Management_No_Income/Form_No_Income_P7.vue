<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่ไม่มีรายได้" />
      <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
      <div style="margin-top: 250px;"> 
      <div class="container d-flex justify-content-center" style="max-width: 1300px;margin-top: 100px;">
        <div class="d-flex flex-column  border p-3 px-5 shadow p-3 mb-5 "
          style="max-width: 1200px;min-width: 1200px;background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 mt-3">
              <p>
                ส่วนที่ 7 สรุปรายละเอียดงบประมาณ (กรอกเฉพาะตัวเลขเท่านั้น)
              </p>
          </div>
            
            <!-- code right here -->
          <div class="mb-3">

            <div class="row px-5 mt-5">
              <div class="col-3 text-center text-white">จำนวนกลุ่มเป้าหมาย</div>
              <div class="col-6">
                <input type="text" class="form-control text-end" style="min-width: 50px !important;" placeholder="" v-model="Project_Data_P7.targetGroupCount" :class="{'is-invalid': Project_Data_P7.targetGroupCount == 0,'is-valid': Project_Data_P7.targetGroupCount > 0}">
              </div>
              <div class="col-1 text-white">คน</div>
            </div>

            <div class="row px-5 mt-5">
              <div class="col-3 text-center text-white">ค่าใช้จ่ายต่อคน</div>
              <div class="col-6">
                <input type="text" class="form-control text-end"  style="min-width: 50px !important;" placeholder="" :value="formattedCostPerPerson"   disabled>
              </div>
              <div class="col-1 text-white">บาท</div>
            </div>

            <div class="row px-5 mt-5">
              <div class="col-3 text-center text-white">ค่าใช้จ่ายทั้งหมด</div>
              <div class="col-6">
                <input type="text" class="form-control text-end" v-model="formattedTotalCost" style="min-width: 50px !important;" placeholder=""  disabled>
              </div>
              <div class="col-1 text-white">บาท</div>
            </div>
          </div>
          <hr class="text-white">
          <div class="mb-3 mt-2 text-center">
            <!-- หัวข้อ -->
            <div class="row">
              <p class="text-white">แนบไฟล์กำหนดการโครงการ</p>
            </div>

            <!-- กล่องทั้งหมดตรงกลาง -->
            <div class="d-inline-block text-start" style="max-width: 100%;">
              <!-- ปุ่มแนบไฟล์ + ชื่อไฟล์ -->
              <div class="d-flex align-items-center justify-content-center mb-2">
                <label
                  for="file-upload"
                  class="btn btn-sm btn-light me-2"
                  style="margin-top: 0.5rem;"
                >
                  แนบไฟล์
                </label>
                <input
                  id="file-upload"
                  type="file"
                  class="d-none"
                  @change="handleFileChange"
                />
                <p class="text-white mb-0" style="margin-top: 0.8rem; max-width: 100%; word-break: break-word;">
                  <span v-if="fileName">{{ fileName }}</span>
                  <span v-else>ยังไม่ได้เลือกไฟล์</span>
                </p>
              </div>

              <!-- คำแนะนำการแนบไฟล์ -->
              <p class="text-warning mb-2">
                สามารถแนบไฟล์ Word (.doc, .docx), PDF (.pdf), Excel (.xls, .xlsx) และขนาดไม่เกิน 10 MB.
              </p>

              <!-- ไฟล์เดิม -->
              <div v-if="existingFileName" class="mt-3 text-center">
                <p class="text-white mb-0" style="max-width: 100%; word-break: break-word;">
                  ไฟล์เดิม :
                  <a
                    class="btn btn-sm btn-secondary"
                    :href="`http://localhost:5000/Files/${existingFileName}`"
                    :download="existingFileName"
                    target="_blank"
                  >
                    {{ existingFileName.split('-').slice(5).join('-') }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <hr class="text-white">
            <div class="row  ">
              <p class="text-center text-white">ตรวจสอบข้อมูล</p>
            </div>
            <div class="d-flex justify-content-center">
              <router-link
                v-if="pdfPreview.path"
                class="text-white text-decoration-none"
                :to="pdfPreview"
              >
                <div class="btn btn-danger d-flex align-items-center justify-content-center" style="width: 200px;">
                  <img src="../../../../assets/download.png" width="18" alt="download" class="me-2">
                  <span>PDF</span>
                </div>
              </router-link>
            </div>
          <hr class="text-white">
            <div class="row justify-content-center">
              <div class="col-auto">
                <router-link :to="{path:'/pl/no_income/p_6',query:{project_id: project_id || '',project_type:1}}">
                  <button  
                    class="btn btn-secondary" 
                    style="width: 140px;" 
                    @click="prevStep" 
                    :disabled="currentStep === 1"
                  >
                    ย้อนกลับ
                  </button>
                </router-link>
              </div>
              <div class="col-auto">
                <button
                  class="btn text-white"
                  style="width: 140px; background-color: #0d6efd;"
                  @click="saveData()"
                >
                  <span>บันทึก</span>
                </button>
              </div>
              <div class="col-auto">
                <button 
                  class="btn btn-success" 
                  style="width: 160px;" 
                  @click="SendProposal"  
                  v-if="is_proposal_open" 
                  :disabled="!isCanGo"
                >
                  ส่งข้อเสนอโครงการ
                </button>
              </div>
            </div>
        </div>
      </div>
      </div>
  </div>
  
</template>

<script setup>
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar.vue'
import parseJwt from '../../../../../utils/DecodeToken'
import NavbarProject from '@/components/NavbarProject.vue'
import {reactive, ref, watch,computed, onMounted} from 'vue'
import Swal from 'sweetalert2'
import { useRoute,useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
const  { cookies }  = useCookies()
const router = useRouter()
const loading = ref(false)
let isCanGo = ref(false)
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

const Project_Data_P7 = reactive({
    targetGroupCount:0,
    costPerPerson:0,
    totalCost:0,
    file: null,
})


const currentStep = ref(7);

const project_id = ref(null)
const project_type = ref(null)
const user_id = ref(null)
const affiliation_id = ref(null)

let isInitialized = false
let canEdit = false

let is_proposal_open = ref(false) 



//Upload File
const files = ref([]);
const fileName = ref('')
const pageName = 'page7' // อย่าลืมเปลี่ยนตามหน้าที่เอาไปวางเพื่ออิงหน้านั้นๆ

const allowedTypes = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);

  const validFiles = selectedFiles.filter(
    (file) => allowedTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
  );

  if (validFiles.length !== selectedFiles.length) {
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `ต้องเป็นไฟล์ PDF, Word, Excel และขนาดไม่เกิน 10 MB. เท่านั้น`,
    });
  }

  files.value = validFiles;
  Project_Data_P7.file = validFiles.length > 0 ? validFiles[0] : null;

  // อัพเดทชื่อไฟล์แรกถ้ามี
  fileName.value = validFiles.length > 0 ? validFiles[0].name : '';
};

const submitFile = async () => {
  if (files.value.length === 0 && !existingFileName) {
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `กรุณาเลือกไฟล์ก่อน`,
    });
    return;
  }

  const formData = new FormData();
  formData.append("file", files.value[0]);

  const query = `?projectId=${project_id.value}&projectType=${project_type.value}&page=${pageName}`;

  try {
    const response = await axios.post(
      `http://localhost:5000/pl/upload/file${query}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      //console.log("✅ อัปโหลดไฟล์สำเร็จ", response.data);
      Project_Data_P7.file = response.data.file.filename;
       isCanGo.value = true;
    } else {
      console.warn("❌ อัปโหลดล้มเหลว");
    }
  } catch (error) {
    console.error("❌ไม่มีการอัพโหลดไฟล์ ✅หรือมีไฟล์อยู่แล้ว", error);
  }
};

//Api Get File มาแสดงบนเว็ป
const existingFileName = ref(null);

const fetchExistingFile = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/pl/file/display?projectId=${project_id.value}&projectType=${project_type.value}&page=${pageName}`
    );
    existingFileName.value = res.data.file;
  } catch (err) {
    console.error("ไม่สามารถโหลดไฟล์เดิม:", err);
  }
};

watch(
  () => [Project_Data_P7.targetGroupCount, Project_Data_P7.file, existingFileName.value],
  ([groupCount, file, existing]) => {
    isCanGo.value = groupCount > 0 && (file || existing);
  },
  { immediate: true }
);





const SendProposal = async () => {
  const confirm = await Swal.fire({
    title: "ส่งข้อเสนอ",
    text: "ยืนยันส่งข้อเสนอโครงการ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
  });

  if (confirm.isConfirmed) {
    try {
      await submitFile();
      autoSave()
      const response = await axios.post('http://localhost:5000/pl/proposal/send', {
        project_id: project_id.value,
        project_type: project_type.value
      });

      if (response.data.success) {
        Swal.fire({
          title: "สำเร็จ",
          text: "บันทึกข้อมูลโครงการสำเร็จ",
          icon: "success"
        });
        router.push('/role/project-leader/project-lists')
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: response.data.message || "ไม่สามารถส่งข้อเสนอได้",
          icon: "error"
        });
      }
    } catch (error) {
      //console.log(error)
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.response?.data?.message || error.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์",
        icon: "error"
      });
    }
  }
};






const formattedCostPerPerson = computed(() => {
  const cost = Project_Data_P7.costPerPerson;

  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return "0.00"; 
})
watch(
  () => [Project_Data_P7.targetGroupCount, Project_Data_P7.totalCost],
  () => {
    
    if (Project_Data_P7.targetGroupCount > 0 && (Project_Data_P7.file || existingFileName.value)) {
      isCanGo.value = true;
    } else {
      isCanGo.value = false;
    }
  }
,{immediate: true})

watch(
  () => [Project_Data_P7.totalCost, Project_Data_P7.targetGroupCount],
  ([newTotalCost, newTargetGroupCount]) => {
    if (newTargetGroupCount > 0 ) {
      Project_Data_P7.costPerPerson = newTotalCost / newTargetGroupCount;
    } else {
      Project_Data_P7.costPerPerson = 0;
    }
  }
);

const formattedTotalCost = computed(() => {
  const cost = Project_Data_P7.totalCost;

  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  return "0.00"; 
});

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
    const response = await axios.post('http://localhost:5000/pl/get/p_7',{
      project_id: project_id.value, 
      project_type: project_type.value,
      project_user: user_id.value,
    })
    
    const project_data_6 = JSON.parse(response.data.data[0].project_data_p_6)
    const project_data_7 = JSON.parse(response.data.data[0].project_data_p_7)
    if (project_data_6 != null ) {
    Project_Data_P7.totalCost = project_data_6.total
    Project_Data_P7.targetGroupCount = project_data_7.targetGroupCount

    isCanGo.value = true
    } else {
      isCanGo.value = false
    }
    
    // //console.log('sending a request to fetch editing data project id = ',project_id)
  }catch(err){
    console.log(err)
    //console.log('error fetching editing data = ',project_id.value)
  }
}

const autoSave = debounce(async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/p_7/no_income/save',  { 
    project_id: project_id.value, 
    project_type: project_type.value,
    project_user: user_id.value,
    project_data: Project_Data_P7 ,
    project_affiliation: affiliation_id.value 
  })
    //console.log(response.data)
    if(response.data.success){
      project_id.value = response.data.insert_id;
      //console.log('project_id',project_id.value)
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

const saveData = debounce(async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/p_7/no_income/save',  { 
    project_id: project_id.value, 
    project_type: project_type.value,
    project_user: user_id.value,
    project_data: Project_Data_P7 ,
    project_affiliation: affiliation_id.value 
  })
    //console.log(response.data)
    if(response.data.success){
      project_id.value = response.data.insert_id;
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกข้อมูลสำเร็จ`,
      })
      await setTimeout(() => {
                loading.value = false
              }, 500);
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
},) 

const pdfPreview = computed(() => {
  if (project_type.value === '1' || project_type.value === 1) {
    return {
      path: '/no-income/pdf',
      query: {
        project_id: project_id.value || '',
        project_type: project_type.value
      }
    }
  }
  return { path: '' }
})
 

watch(Project_Data_P7, (newVal, oldVal) => {
  //console.log('Project_Data_P7 has changed:');
  if(isInitialized && !canEdit){
    //console.log('return when fetching state')
    return 0
  }
}, { deep: true })

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

  const response = await axios.post('http://localhost:5000/pl/proposal')
  //console.log(response.data)
  if(response.data.success){
    is_proposal_open.value = response.data.is_proposal_open
  }

  if (project_id.value && project_type.value) {
    fetchExistingFile();
  }
  
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

<style lang="css" scoped>
.beautiful-box{
  height: 50px !important;
  border-radius: 6px !important;
}
</style>