<template>
  <div>
    <NavbarProject class="fixed-top " propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน" />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
    <Loader v-if="loading" />
    <div class="container-fluid" style="margin-top: 250px;">
      <div class="d-flex justify-content-center" >
        <div class="container d-flex flex-column border px-5 shadow p-3 mb-5 "
          style="max-width: 1200px;min-width: 1200px; background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 my-3">
            <p>
              ส่วนที่ 1 รายละเอียดโครงการ/คณะบริหารโครงการ
            </p>
          </div>

          <div class="mb-2">
            <label for="project_name" class="form-label fs-5 text-white">ชื่อโครงการ</label>
            <input type="text" v-model="Project_Data_TS_P1.project_name" class="form-control beautiful-box"
              placeholder="โปรดกรอก ชื่อโครงการ" required>
          </div>
          <hr class="text-white">

          <div class="mb-2">
            
            <p class="text-white" v-if="totalPercentage >= 100" style="color: #ffcc00;">
              ผลรวมครบ 100% แล้ว ไม่สามารถเพิ่มหน่วยงานได้อีก
            </p>

            <div v-for="(item, index) in Project_Data_TS_P1.agency_group" :key="index">
              <label for="affiliation" class="form-label fs-5 text-white">ชื่อหน่วยงานที่ {{ index+1 }} (ร้อยละการมีส่วนร่วม)</label>
              <div class="d-flex align-items-center mt-3">
                <input type="text" v-model="item.executive_board" class="form-control beautiful-box"
                  :placeholder="`โปรดระบุชื่อหน่วยงานที่ ${index + 1}`" required style="flex-grow: 1;" />
                <input type="number" min="0" max="100" v-model="item.percentage_of_participation"
                  class="form-control beautiful-box ms-2" placeholder="ร้อยละการมีส่วนร่วม" @input="updatePercentage(index)" required style="width: 400px;">
              </div>

              <div class="d-flex align-items-center mt-2">
                <input type="text" v-model="item.executive_board_leader_name" class="form-control beautiful-box"
                  :placeholder="`โปรดระบุชื่อหัวหน้าหน่วยงานที่ ${index + 1}`" required style="flex-grow: 1;">
              </div>

              <div class="d-flex justify-content-center mt-2">
                <button class="btn btn-danger" style="width:400px; height:50px;" v-if="index > 0"
                  @click="removeagency(index)">
                  <div class="d-flex justify-content-center align-items-center">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <hr class="text-white my-3" v-if="index < Project_Data_TS_P1.agency_group.length - 1">
            </div>

            <p v-if="!canAddAgency" class="text-warning mt-1">สามารถเพิ่มได้สูงสุด 5 รายการ เมื่อรวมร้อยละไม่เกิน 100</p>

            <div class="d-flex justify-content-center align-items-center mt-3">
              <button class="btn d-flex justify-content-center align-items-center text-center shadow ms-2 mt-2"
                v-if="canAddAgency || Project_Data_TS_P1.agency_group.length === 1" @click="addAgency" :disabled="!canAddAgency"
                style="background-color: #0d6efd; color: white; width:350px; text-align:center">
                <div class="d-flex align-self-center ">
                  <span class="material-icons">add</span>
                  <span>เพิ่มหน่วยงาน (ร่วมจัด)</span>
                </div>
              </button>
            </div>
          </div>
          <hr class="text-white">

          <div class="mb-2">
            <div>
              <label for="" class="form-label fs-5 text-white">ชื่อหัวหน้าโครงการ</label>
              <div class="d-flex align-item-center mt-1"
                v-for="(item, index) in Project_Data_TS_P1.project_manager_leader_name_list" :key="index">
                <input type="text" v-model="item.project_manager_leader_name" class="form-control beautiful-box mt-2"
                  :placeholder="`โปรดระบุชื่อหัวหน้าโครงการคนที่ ${index + 1}`" required>
                <button class="btn btn-danger ms-2 mt-2" style="width:349px; height:50px;" v-if="index > 0"
                  @click="removePJ_leader_name(index)">
                  <div class="d-flex justify-content-center">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <p v-if="!canAddLeader" class="text-warning mt-1">สามารถเพิ่มได้สูงสุด 5 รายการ</p>

              <div class="d-flex justify-content-center align-items-center mt-3">
                <button class="btn d-flex justify-content-center align-items-center text-center shadow ms-2 mt-2"
                style="background-color: #0d6efd; color: white; width:350px; text-align:center"
                v-if="canAddLeader" @click="addPJ_leader_name" :disabled="!canAddLeader">
                <div class="d-flex align-self-center">
                  <span class="material-icons">add</span>
                  <span>เพิ่มชื่อหัวหน้าโครงการ (ร่วมจัด)</span>
                </div>
              </button>
              </div>
            </div>
            <hr class="text-white">
          </div>

          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end">
                <button class="btn btn-secondary" style="width: 140px;" @click="router.push('/role/project-leader')">ย้อนกลับ</button>
            </div>
            <div class="col-6">
              
                <button class="btn btn-success" style="width: 140px;" @click="submitForm"
                  :disabled="!isFormValid">
                  <span>บันทึก</span>
                </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <p>
    </p>
    <div>
    </div>
  </div>
  
</template>


<script setup>
import { ref, reactive, watch, onUnmounted, onMounted, computed } from 'vue'
import Loader from '@/components/Loader.vue';
import parseJwt from '../../../../../utils/DecodeToken';
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar.vue'
import Swal from 'sweetalert2'
import NavbarProject from '@/components/NavbarProject.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies";
const router = useRouter()
const route = useRoute()
const { cookies } = useCookies()
const currentStep = ref(1)
const MAX_ITEMS = 5
const project_id = ref(null)
const project_type = ref(null)
const user_id = ref(null)
const affiliation_id = ref(null)

let loading = ref(false)
let isInitialized = false
let canEdit = false
let isCanGo = false

var Project_Data_TS_P1 = reactive({
  project_name: '',
  agency_group: [{
    executive_board: '',
    percentage_of_participation: '',
    executive_board_leader_name: ''
  }],
  project_manager_leader_name_list: [
    { project_manager_leader_name: '' }
  ],
  project_manager_team_lists: [{
    project_manager_team: ''
  }],
})

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

// function debounce(func, delay) {
//   let timer
//   return function (...args) {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }

const autoSave = async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/p_1/save', {
      project_id: project_id.value,
      // project_type: project_type.value,
      project_type: 4,
      project_user: user_id.value,
      project_data: Project_Data_TS_P1,
      project_affiliation: affiliation_id.value
    })

    //console.log("response", response.data)

    if (response.data.success) {
      project_id.value = response.data.insert_id || project_id.value;
      // router.replace({path:'/pl/TS/p_2',query:{project_id: project_id.value || '', project_type: 4 }})
      await setTimeout(() => {
                loading.value = false
              }, 500)
      //console.log('Updated project_id:', project_id.value);
   
      Toast.fire({
        icon: 'success',
        iconColor: 'green',
        title: `บันทึกข้อมูลสำเร็จ`,
      })
      return project_id.value;
    } 
    throw new Error(response.data.message || "Save failed");
  } catch (error) {
    console.error(error)
    Toast.fire({
      icon: 'error',
      iconColor: 'red',
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
    return null;
  }
}

const submitForm = async () => {
  loading.value = true
  if (!isFormValid.value) {
    Swal.fire('Error', 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'error');
    loading.value = false; 
    return;
  }
  const savedProjectId = await autoSave();
    if (savedProjectId) {
      nextStep();
    }else {
    loading.value = false; // Turn off loading if save failed
  }
}


watch(() => route.query.project_id, async (newId) => {
  if (newId && newId !== project_id.value) {
    project_id.value = newId
    await getDataWhenProjectID()
  }
})

//logic for this progress
const canAddAffiliation = computed(() => {
  const total = Project_Data_TS_P1.agency_group.reduce(
    (sum, item) => sum + (parseFloat(item.percentage_of_participation) || 0),
    0
  );
  return Project_Data_TS_P1.agency_group.length < MAX_ITEMS && total < 100;
});

const addAffiliation = () => {
  if (totalPercentage.value >= 100) {
    Swal.fire({
      icon: 'warning',
      title: 'ไม่สามารถเพิ่มได้',
      text: 'ผลรวมร้อยละการมีส่วนร่วมครบ 100% แล้ว',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  if (Project_Data_TS_P1.agency_group.length < MAX_ITEMS) {
    Project_Data_TS_P1.agency_group.push({
      executive_board: '',
      percentage_of_participation: '',
      executive_board_leader_name: ''
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'ไม่สามารถเพิ่มได้',
      text: 'สามารถเพิ่มชื่อหน่วยงานได้สูงสุด 5 รายการ',
      confirmButtonText: 'ตกลง'
    });
  }
};

const canAddLeader = computed(() => {
  return Project_Data_TS_P1.project_manager_leader_name_list.length < MAX_ITEMS;
});

const addPJ_leader_name = () => {
  if (canAddLeader.value) {
    Project_Data_TS_P1.project_manager_leader_name_list.push({
      project_manager_leader_name: ''
    })
  }
};

const removePJ_leader_name = (index) => {
  if (Project_Data_TS_P1.project_manager_leader_name_list.length > 1)
    Project_Data_TS_P1.project_manager_leader_name_list.splice(index, 1);
};

const totalPercentage = computed(() => {
  return Project_Data_TS_P1.agency_group.reduce(
    (sum, item) => 
    {
    // Ensure item.percentage_of_participation is treated as a number
    return sum + (Number(item.percentage_of_participation) || 0);
  }, 0);
});

const canAddAgency = computed(() => {
  const currentTotal = totalPercentage.value;
  const currentCount = Project_Data_TS_P1.agency_group.length;

  //  if (currentTotal >= 100 || currentCount >= MAX_ITEMS) {
  //   return false;
  // }

  // if (currentCount <= 1) return true;

  // const lastAgency = Project_Data_TS_P1.agency_group[currentCount - 1];
  // const isLastAgencyFilled = lastAgency &&
  //                                  lastAgency.executive_board?.trim() !== '' &&
  //                                  lastAgency.executive_board_leader_name?.trim() !== '';

  // return isLastAgencyFilled;
  return currentCount < MAX_ITEMS && currentTotal < 100;
});

const addAgency = () => {
  if (!canAddAgency.value) { // Check the computed property
      if (totalPercentage.value >= 100) {
          Swal.fire({
              icon: 'warning',
              title: 'ไม่สามารถเพิ่มได้',
              text: 'ผลรวมร้อยละการมีส่วนร่วมครบ 100% แล้ว',
              confirmButtonText: 'ตกลง'
          });
      } else if (Project_Data_TS_P1.agency_group.length >= MAX_ITEMS) {
          Swal.fire({
              icon: 'warning',
              title: 'ไม่สามารถเพิ่มได้',
              text: `สามารถเพิ่มหน่วยงานได้สูงสุด ${MAX_ITEMS} รายการ`,
              confirmButtonText: 'ตกลง'
          });
      } else { // This implies last item is not filled
           Swal.fire({
              icon: 'warning',
              title: 'ไม่สามารถเพิ่มได้',
              text: 'กรุณากรอกข้อมูลหน่วยงานล่าสุดให้ครบถ้วนก่อน',
              confirmButtonText: 'ตกลง'
          });
      }
      return;
  }
Project_Data_TS_P1.agency_group.push({
    executive_board: '',
    percentage_of_participation: '', 
    executive_board_leader_name: ''
  });
};

const removeagency = (index) => {
  // Ensure there's at least one item left
  if (Project_Data_TS_P1.agency_group.length > 1) {
    Project_Data_TS_P1.agency_group.splice(index, 1);
  } else {
    // If only one is left and they try to delete, clear its fields instead
    Project_Data_TS_P1.agency_group[0] = {
      executive_board: '',
      percentage_of_participation: '',
      executive_board_leader_name: ''
    };
  }
};

const addExecutive_leader_name = () => {
  if (Project_Data_TS_P1.agency_group.length < MAX_ITEMS) {
    Project_Data_TS_P1.agency_group.push({
      executive_board: '',
      percentage_of_participation: '',
      executive_board_leader_name: ''
    });
  }
};

watch(() => Project_Data_TS_P1.agency_group, (newList) => {
  const total = newList.reduce((sum, item) => sum + (parseFloat(item.percentage_of_participation) || 0), 0);
  if (total > 100) {
    Swal.fire('Warning', 'ผลรวมร้อยละการมีส่วนร่วมต้องไม่เกิน 100%', 'warning');
  }
}, { deep: true });

const updatePercentage = (index) => {
  // Ensure the value is a number and within 0-100 range
  let value = Number(Project_Data_TS_P1.agency_group[index].percentage_of_participation);
  if (isNaN(value) || value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  Project_Data_TS_P1.agency_group[index].percentage_of_participation = value;

  // Recalculate total and warn if over 100
  const currentTotal = totalPercentage.value;
  if (currentTotal > 100) {
    Swal.fire('Warning', 'ผลรวมร้อยละการมีส่วนร่วมต้องไม่เกิน 100%', 'warning');
  }
};

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/get/p_1', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    })
    canEdit = false

    if (response.data.success && response.data.data?.length > 0) {
      const project_data = JSON.parse(response.data.data[0].project_data_p_1)

      // Then populate with fetched data
      Project_Data_TS_P1.project_name = project_data.project_name || ''
      
      // Handle agency group
      if (project_data.agency_group && project_data.agency_group.length > 0) {
        Project_Data_TS_P1.agency_group = project_data.agency_group.map(agency => ({
          executive_board: agency.executive_board || '',
          percentage_of_participation: agency.percentage_of_participation !== undefined ? 
          (agency.percentage_of_participation === null ? '' : parseFloat(agency.percentage_of_participation)) : '',
          executive_board_leader_name: agency.executive_board_leader_name || ''
        }));
      }else {
        // If no agency data, ensure at least one empty group is present
        Project_Data_TS_P1.agency_group = [{
          executive_board: '',
          percentage_of_participation: '',
          executive_board_leader_name: ''
        }];
      }
      // Handle project manager leader names - this is the key fix
      if (project_data.project_manager_leader_name_list && project_data.project_manager_leader_name_list.length > 0) {
        Project_Data_TS_P1.project_manager_leader_name_list = project_data.project_manager_leader_name_list.map(leader => ({
          project_manager_leader_name: leader.project_manager_leader_name || ''
        }));
      } else {
        // Fallback to single empty leader if no data exists
        Project_Data_TS_P1.project_manager_leader_name_list = [
          { project_manager_leader_name: '' }
        ];
      }
      isCanGo = true
    }
    else {
      //console.log('No project data found');
    }
  } catch (err) {
    console.error('Error fetching project data:', err)
    Toast.fire({
      icon: 'error',
      title: 'ไม่สามารถโหลดข้อมูลโครงการได้'
    })
  }
}

const isFormValid = computed(() => {
  if (!Project_Data_TS_P1.project_name.trim()) return false

  const validAgencies = Project_Data_TS_P1.agency_group.every(
    item =>
      item.executive_board.trim() &&
      // item.percentage_of_participation &&
      item.executive_board_leader_name.trim() &&
      (typeof item.percentage_of_participation === 'number' 
      && item.percentage_of_participation >= 0 
      && item.percentage_of_participation !== '')
  )

  const validLeaders = Project_Data_TS_P1.project_manager_leader_name_list.every(
    item => item.project_manager_leader_name.trim()
  )
  // const validTeams = Project_Data_TS_P1.project_manager_team_lists.every(
  //   item => item.project_manager_team.trim()
  // )
  // const validHead = Project_Data_TS_P1.project_manager_leader_name_list.every(
  //   item => item.project_manager_leader_name.trim()
  // )

 const totalPercentageValue = totalPercentage.value;

  return (
    validAgencies &&
    validLeaders &&
    // validHead &&
    totalPercentageValue === 100
  )
})


onMounted(async () => {
  const user = parseJwt(cookies.get('accesstoken'))
  user_id.value = user.user_id
  affiliation_id.value = user.affiliation_id
  //console.log('ID', project_id.value)
  const route = useRoute()

  if (route.query.project_type) {
    const projectType = route.query.project_type;
    project_type.value = projectType
  }

  if (route.query.project_id) {
    const projectId = route.query.project_id;
    project_id.value = projectId

    isInitialized = true
    canEdit = false // true
    await getDataWhenProjectID()
    canEdit = true
  } else {
    isInitialized = true
    canEdit = true //false 
  }

  //console.log('Project id:', project_id.value)
  //console.log('Project Type:', project_type.value)
  //console.log('user_id:', user_id.value)
})


const nextStep = () => {
  router.push({
    path: '/pl/TS/p_2',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  });
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
} 
</script>

<style lang="css" scoped>
.beautiful-box {
  height: 50px !important;
  border-radius: 6px !important;
}
</style>