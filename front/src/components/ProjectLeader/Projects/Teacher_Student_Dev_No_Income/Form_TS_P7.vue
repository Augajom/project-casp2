<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน" />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep"/>
    <Loader v-if="loading" />
    <div class="" style="margin-top: 250px;">
      <div class="container-fluid" style="max-width: 1300px;margin-top: 100px;">
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-column border px-5 shadow p-3 mb-5" style="max-width: 1200px;min-width: 1200px; background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 my-3">
            <p>ส่วนที่ 7 สรุปรายละเอียดงบประมาณ</p>
          </div>
          
          <div class="mb-3">
            <div class="row px-5 mt-5 align-items-center">
               <div class="col-3 text-center text-white">จำนวนกลุ่มเป้าหมาย</div> <div class="col-6">
                <input 
                  type="text" 
                  v-model="Project_Data_TS_P7.target_group_amount"
                  :class="['form-control', 'text-end', 'beautiful-box', {'bg-warning': Project_Data_TS_P7.target_group_amount <= 0}]"
                  disabled 
                >
              </div>
              <div class="col-1 text-white">คน</div>
              <div class="col-2 text-warning" v-if="Project_Data_TS_P7.target_group_amount <= 0">(Invalid)</div> 
            </div>
            
            <div class="row px-5 mt-5 align-items-center">
              <div class="col-3 text-center text-white">ค่าใช้จ่ายต่อคน</div> <div class="col-6">
                <input 
                  type="text" 
                  :value="formattedCostPerPerson" 
                  class="form-control text-end beautiful-box" 
                  disabled>
              </div>
              <div class="col-1 text-white">บาท</div>
              <div class="col-2"></div> </div>
            
            <div class="row px-5 mt-5 align-items-center">
              <div class="col-3 text-center text-white">รวมค่าใช้จ่ายทั้งหมด</div> <div class="col-6">
                <input 
                  type="text" 
                  :value="formattedNetTotalCost" 
                  :class="['form-control', 'text-end','beautiful-box', {'bg-warning': Project_Data_TS_P7.net_total_cost <= 0}]" 
                  disabled>
              </div>
              <div class="col-1 text-white">บาท</div>
              <div class="col-2"></div> </div>
          </div>

          <hr class="text-white" />
          <div class="row">
            <p class="text-center text-white">ตรวจสอบข้อมูล</p>
          </div>
          <div class="d-flex justify-content-center">
            <router-link
              v-if="pdfPreview.path"
              class="text-white text-decoration-none"
              :to="pdfPreview"
            >
              <div
                v-if="pdfPreview.path"
                class="btn btn-danger d-flex align-items-center justify-content-center text-white"
                style="width: 200px; cursor: pointer;"
                @click="saveThenPreview"
              >
                <img src="../../../../assets/download.png" width="18" alt="download" class="me-2">
                <span>PDF</span>
              </div>
            </router-link>
          </div>
          <hr class="text-white">
          
          <div class="row mt-3 justify-content-center"> 
            <div class="col-auto ">
              <button class="btn btn-secondary" style="width: 140px;" @click="prevStep" :disabled="currentStep === 1">ย้อนกลับ</button>
            </div>
            <div class="col-auto">
                <button
                  class="btn text-white"
                  style="width: 140px; background-color: #0d6efd;"
                  @click="saveDataActual()"
                >
                  <span>บันทึก</span>
                </button>
              </div>
            <div class="col-auto">
              <button class="btn btn-success" style="width: 160px;" @click="SendProposal" v-if="is_proposal_open">เสนอโครงการ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, toRaw } from 'vue'
import parseJwt from '../../../../../utils/DecodeToken';
import Loader from '@/components/Loader.vue';
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar.vue'
import NavbarProject from '@/components/NavbarProject.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies";
import Swal from 'sweetalert2'
const router = useRouter()
const { cookies } = useCookies()
const route = useRoute()
const project_id = ref(null)
const project_type = ref(null)
const user_id = ref(null)
const affiliation_id = ref(null)

const currentStep = ref(7)
let is_proposal_open = ref(false) 
let isInitialized  = ref(false) 
let canEdit  = ref(false) 
let isLoading = ref(false) 
let loading = ref(false)


const Project_Data_TS_P7 = reactive({
  target_group_amount: 0,   
  //net_total_cost / target_group_amount = cost_per_person
  cost_per_person: 0, 
  net_total_cost: 0, 
  summary_text: '' 
})


const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
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


function debounce(func, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const formattedTargetAmount = computed(() => {
  const amount = Project_Data_TS_P7.target_group_amount; // Use the correct property name

  if (!isNaN(amount)) {
    return amount.toLocaleString("en-US"); // No decimals needed for target amount
  }
  return "0";
});
// Formatted values
const formattedCostPerPerson = computed(() => {
  const cost = Project_Data_TS_P7.cost_per_person;

  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return "0.00"; 
})

const formattedNetTotalCost = computed(() => {
  const cost = Project_Data_TS_P7.net_total_cost;
  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  return "0.00"; 
})

watch(
  () => [Project_Data_TS_P7.target_group_amount, Project_Data_TS_P7.net_total_cost],
  () => {
    
    if (Project_Data_TS_P7.target_group_amount > 0) {
      Project_Data_TS_P7.cost_per_person = Project_Data_TS_P7.net_total_cost / Project_Data_TS_P7.target_group_amount;
    } else {
      Project_Data_TS_P7.cost_per_person = 0;
    }
  }
)

const getProjectData = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:5000/pl/TS/get/p_7', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value
    });

//try
     //console.log("TS_Get_P7 Frontend Received:", response.data);
    let teacherAmount = 0;
    let studentAmount = 0;
    let totalBudgetP6 = 0;
//end of try
//focus
    // const project_data_TS_6 = JSON.parse(response.data.data[0].project_data_p_6)
    // const project_data_TS_4 = JSON.parse(response.data.data[0].project_data_p_4)
    // Project_Data_TS_P7.net_total_cost = project_data_TS_6.total
    // Project_Data_TS_P7.target_group_amount = project_data_TS_4.targetGroupCount
    // //console.log('data 6',project_data_6)
    // //console.log('data 4',project_data_4)
    if (response.data?.success && response.data.data?.length > 0) {
      const projectData = response.data.data[0];

      // --- Process P4 Data ---
      if (projectData.project_data_p_4) {
        try {
          const p4_data = typeof projectData.project_data_p_4 === 'string'
            ? JSON.parse(projectData.project_data_p_4)
            : projectData.project_data_p_4;

          const teacherAmount = parseFloat(p4_data.teacher_target?.amount) || 0;
          const studentAmount = parseFloat(p4_data.student_target?.amount) || 0;

          const total = (teacherAmount + studentAmount);
          //console.log(total)
          Project_Data_TS_P7.target_group_amount = total;
        } catch (e) {
          console.error('Error parsing P4 data from P7 endpoint:', e);
        }
      } else {
        console.warn('No project_data_p_4 found for project_id:', project_id.value);
        Toast.fire({ icon: 'warning', title: 'ไม่พบข้อมูลกลุ่มเป้าหมาย (P4)' });
      }

      // --- Process P6 Data ---
      if (projectData.project_data_p_6) {
        try {
          const p6_data_parsed = JSON.parse(projectData.project_data_p_6);

          if (typeof p6_data_parsed === 'object' && p6_data_parsed !== null && p6_data_parsed.net_total_budget !== undefined) {
              
              totalBudgetP6 = parseFloat(p6_data_parsed.net_total_budget) || 0;
          } else if (Array.isArray(p6_data_parsed)) {
              
              totalBudgetP6 = p6_data_parsed.reduce((sum, budget) => {
                  return sum + (parseFloat(budget.total) || 0);
              }, 0);
          } else {
              console.warn('P6 data is in an unexpected format in P7:', p6_data_parsed);
              totalBudgetP6 = 0;
          }

        } catch (e) {
          console.error('Error parsing P6 data from P7 endpoint:', e);
          Toast.fire({ icon: 'error', title: 'ไม่สามารถโหลดข้อมูลงบประมาณได้ (P6)' });
        }
      } else {
        console.warn('No project_data_p_6 found for project_id:', project_id.value);
        Toast.fire({ icon: 'warning', title: 'ไม่พบข้อมูลงบประมาณ (P6)' });
      }

    
      if (projectData.project_data_p_7) { // Assuming your P7 backend query now fetches project_data_p_7
        try {
          const p7_existing_data = JSON.parse(projectData.project_data_p_7);
          Project_Data_TS_P7.summary_text = p7_existing_data.summary_text || '';
        } catch (e) {
          console.error('Error parsing existing P7 data from P7 endpoint:', e);
          Toast.fire({ icon: 'error', title: 'ไม่สามารถโหลดข้อมูลสรุปโครงการที่บันทึกไว้ (P7) ได้' });
        }
      }

    } else {
      console.warn('No data found for project_id:', project_id.value, 'or API success false.');
      Toast.fire({ icon: 'info', title: 'ไม่พบข้อมูลโครงการสำหรับ P4 และ P6' });
    }

    // --- Perform calculations and update Project_Data_TS_P7 ---
    // These calculations should always run based on the fetched P4 and P6 data
    Project_Data_TS_P7.net_total_cost = totalBudgetP6;

    if (Project_Data_TS_P7.target_group_amount > 0) {
      Project_Data_TS_P7.cost_per_person = Project_Data_TS_P7.net_total_cost / Project_Data_TS_P7.target_group_amount;
    } else {
      Project_Data_TS_P7.cost_per_person = 0; // Avoid division by zero
    }

  } catch (error) {
    console.error('Failed to load project data:', error);
    //console.log('error fetching editing data = ',project_id.value)
    Toast.fire({
      icon: 'error',
      title: 'ไม่สามารถโหลดข้อมูลโครงการได้'
    });
  }
};

const autoSave = debounce (async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/p_7/save',
      {
        //focus
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: toRaw(Project_Data_TS_P7),
        project_affiliation: affiliation_id.value 
      })
    //console.log(response.data)
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log('project_id',project_id.value)
      // router.replace({path:'/pl/TS/p_7',query:{project_id: project_id.value || '', project_type:1}})
      Toast.fire({
        icon: 'success',
        iconColor: 'green',
        title: `บันทึกอัตโนมัติสำเร็จ`,
      })
      return true;
    }else{
         Toast.fire({
                    icon: 'error',
                    iconColor: 'red',
                    title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
                })
                throw new Error(response.data.message || 'Auto-save failed from server');
    }
    throw new Error('Save failed')
  } catch (error) {
    console.error(error)
    Toast.fire({
      icon: 'error',
      iconColor: 'red',
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    })
    return false;
  }
},);

const saveDataActual = async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/p_7/save',  { 
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: toRaw(Project_Data_TS_P7),
      project_affiliation: affiliation_id.value 
    });
    
    if(response.data.success){
      project_id.value = response.data.insert_id;
      await new Promise(resolve => setTimeout(resolve, 500)); // delay 500ms
      return true; // success
    } else {
      Toast.fire({
        icon: 'error',
        iconColor: 'red',
        title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
      });
      return false; // failed
    }
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: 'error',
      iconColor: 'red',
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
    return false;
  }
}

const debouncedSaveData = debounce(() => {
  saveDataActual();
}, 500);


const pdfPreview = computed(() => {
  if (project_type.value === '4' || project_type.value === 4) {
    return {
      path: '/TS/pdf',
      query: {
        project_id: project_id.value || '',
        project_type: project_type.value
      }
    }
  }
  return { path: '' }
})

const saveThenPreview = async () => {
  const saved = await saveDataActual();
  if (saved) {
    router.push(pdfPreview.value);
  } else {
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "ไม่สามารถเปิด PDF ได้ เนื่องจากบันทึกข้อมูลไม่สำเร็จ"
    });
  }
};



onMounted(async () => {
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
    await getProjectData()
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
  
})


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
    await autoSave();
    loading.value = true
    try {
      const response = await axios.post('http://localhost:5000/pl/proposal/send', {
        project_id: project_id.value,
        project_type: project_type.value
      });

      if (response.data.success) {
        Swal.fire({
          title: "สำเร็จ",
          text: "บันทึกข้อมูลโครงการสำเร็จ",
          icon: "success"
        })
        await setTimeout(() => {
                loading.value = false
              }, 500);
        router.push('/role/project-leader/project-lists')
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: response.data.message || "ไม่สามารถส่งข้อเสนอได้",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.response?.data?.message || error.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์",
        icon: "error"
      });
    }
  }
};


// const nextStep = () => {
//   router.push({
//     path: '/pl/TS/p_6',
//     query: {
//       project_id: project_id.value,
//       project_type: project_type.value
//     }
//   })
// }

const prevStep = () => {
  router.push({
    path: '/pl/TS/p_6',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
}
</script>

<style lang="css" scoped>
.beautiful-box {
  height: 50px;
  border-radius: 6px;
  text-align: right;
  padding-right: 15px;
  background-color: #f8f9fa;
  color: #212529;
  font-weight: 500;
}

.bg-warning {
  background-color: rgba(255, 193, 7, 0.2) !important;
  color: #ffc107;
}
</style>