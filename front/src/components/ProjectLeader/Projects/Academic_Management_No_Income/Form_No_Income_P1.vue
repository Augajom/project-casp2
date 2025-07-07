<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่ไม่มีรายได้" />
    <ProgressBar
      class="fixed-top border"
      :step="currentStep"
      @update:step="currentStep"
    />
    <Loader v-if="loading" />
    <div style="margin-top: 220px">
      <div
        class="container d-flex justify-content-center"
        style="max-width: 1300px; margin-top: 100px"
      >
        <div
          class="d-flex flex-column border p-3 px-5 shadow p-3 mb-5"
          style="
            max-width: 1200px;
            min-width: 1200px;
            background-color: #374375;
            border-radius: 12px;
            height: auto;
          "
        >
          <div class="row text-white fs-3 mt-3">
            <p>ส่วนที่ 1 รายละเอียดโครงการ/คณะบริหารโครงการ</p>
          </div>
          <div class="mb-2">
            <label for="project_name" class="form-label fs-5 text-white"
              >ชื่อโครงการ</label
            >
            <input
              type="text"
              v-model="Project_Data_P1.project_name"
              class="form-control beautiful-box"
              placeholder="โปรดกรอก ชื่อโครงการ"
            />
          </div>

          <div v-for="(item, index) in Project_Data_P1.agency_group" :key="index">
            <hr class="text-white" />
            <div class="mb-3">
              <div class="row">
                <div class="col-9">
                  <label for="project_name" class="form-label fs-5 text-white"
                    >หน่วยงานคณะบริหารโครงการ {{ index + 1 }} (ให้ระบุชื่อหน่วยงาน)</label
                  >
                  <input
                    type="text"
                    v-model="item.executive_board"
                    class="form-control beautiful-box"
                    :placeholder="`โปรดกรอก หน่วยงานคณะบริหารโครงการ ${index + 1}`"
                  />
                </div>
                <div class="col-3">
                  <label for="project_name" class="form-label fs-5 text-white"
                    >ร้อยละการมีส่วนร่วม</label
                  >
                  <input
                    type="number"
                    min="0"
                    v-model="item.percentage_of_participation"
                    class="form-control beautiful-box"
                    placeholder="ร้อยละการมีส่วนร่วม"
                  />
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label for="project_name" class="form-label fs-5 text-white"
                >ชื่อหัวหน้าหน่วยงาน</label
              >
              <input
                type="text"
                v-model="item.executive_board_leader_name"
                class="form-control beautiful-box"
                :placeholder="`โปรดกรอก ชื่อหัวหน้าหน่วยงาน ${index + 1}`"
              />
            </div>
            <div v-if="index != 0" class="d-grid mt-3 mb-2">
              <button class="btn btn-danger" @click="decrease_agency_group(index)">
                ลดหน่วยงานร่วมดำเนินโครงการนี้
              </button>
            </div>
          </div>

          <hr class="text-white" />
          <div
            v-if="isFullPercen"
            class="d-flex justify-content-center align-items-center"
          >
            <p class="text-danger">Please enter the full participation percentage</p>
          </div>

          <div class="d-flex justify-content-center mb-5">
            <button
              class="btn beautiful-box"
              @click="increase_agency_group"
              :disabled="is_agency_full"
              style="background-color: #0d6efd; color: white"
            >
              <i class="fa fa-plus mx-3" aria-hidden="true"></i
              >เพิ่มหน่วยงานร่วมดำเนินโครงการ ({{
                Project_Data_P1.agency_group.length
              }}/6)
            </button>
          </div>

          <div class="mb-4">
            <label for="project_name" class="form-label fs-5 text-white"
              >ชื่อหัวหน้าคณะบริหารโครงการ
            </label>
            <input
              type="text"
              v-model="Project_Data_P1.project_manager_leader_name"
              class="form-control beautiful-box"
              placeholder="โปรดกรอก ชื่อหัวหน้าคณะบริหารโครงการ "
            />
          </div>

          <div
            v-for="(item, index) in Project_Data_P1.project_manager_team_lists"
            :key="index"
          >
            <div class="mb-4">
              <div class="row" v-if="index == 0">
                <div class="col-12">
                  <label for="project_name" class="form-label fs-5 text-white"
                    >ชื่อคณะบริหารโครงการ ลำดับที่ {{ index + 1 }}</label
                  >
                  <input
                    type="text"
                    class="form-control beautiful-box"
                    v-model="item.project_manager_team"
                    :placeholder="`โปรดกรอก คณะบริหารโครงการ ลำดับที่ ${index + 1} `"
                  />
                </div>
              </div>
              <div class="row" v-else>
                <div class="col-10">
                  <label for="project_name" class="form-label fs-5 text-white"
                    >ชื่อคณะบริหารโครงการ ลำดับที่ {{ index + 1 }}</label
                  >
                  <input
                    type="text"
                    class="form-control beautiful-box"
                    v-model="item.project_manager_team"
                    :placeholder="`โปรดกรอก คณะบริหารโครงการ ลำดับที่ ${index + 1} `"
                  />
                </div>
                <div class="col-2 d-flex justify-content-center align-items-end">
                  <button
                    class="btn btn-danger beautiful-box"
                    @click="decrease_pm_list(index)"
                  >
                    ลบรายชื่อ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center mb-3">
            <button
              class="btn beautiful-box"
              @click="increase_pm_list"
              :disabled="is_pm_list_full"
              style="background-color: #0d6efd; color: white"
            >
              <i class="fa fa-plus mx-3" aria-hidden="true"></i
              >เพิ่มรายชื่อคณะบริหารโครงการ ({{
                Project_Data_P1.project_manager_team_lists.length
              }}/6)
            </button>
          </div>

          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end">
              <button
                class="btn btn-secondary"
                style="width: 140px"
                @click="router.push('/role/project-leader')"
              >
                ย้อนกลับ
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-success"
                style="width: 140px"
                @click="submitForm"
                :disabled="!isCanGo"
              >
                <!-- <router-link class="text-white text-decoration-none"  @click="nextStep" :to="{path:'/pl/no_income/p_2',query:{project_id: project_id || '',project_type:1}}"> -->
                
                <span>บันทึก</span>
                <!-- </router-link> -->
              </button>
            </div>
            <!-- <button @click="prevStep" :disabled="currentStep === 1">Previous</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { throttle } from 'lodash';
import { ref, reactive, watch, onUnmounted, onMounted, computed } from "vue";
import parseJwt from "../../../../../utils/DecodeToken";
import axios from "axios";
import Loader from "@/components/Loader.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Swal from "sweetalert2";
import NavbarProject from "@/components/NavbarProject.vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const router = useRouter();
const isFullPercen = ref(false);
const currentStep = ref(1);
const loading = ref(false);

const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

let isInitialized = false;
let canEdit = false;
const isCanGo = ref(false);

var Project_Data_P1 = reactive({
  project_name: "",
  agency_group: [
    {
      executive_board: "",
      percentage_of_participation: 0,
      executive_board_leader_name: "",
    },
  ],
  project_manager_leader_name: "",
  project_manager_team_lists: [
    {
      project_manager_team: "",
    },
  ],
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  //   iconColor: 'black',
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// start when data is changed
const autoSave = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/p_1/no_income/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_P1,
      project_affiliation: affiliation_id.value,
    });

    //console.log("response", response.data);

    if (response.data.success) {
      project_id.value = response.data.insert_id;
      router.replace({
        path: "/pl/no_income/p_2",
        query: { project_id: project_id.value || "", project_type: 1 },
      });
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
      });
    } else {
      throw new Error("Save failed");
    }
  } catch (error) {
    console.error(error);
    await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
  }
};

// const totalPercentage = computed(() => {
//   return Project_Data_P1.agency_group.reduce((sum, agency) => {
//     return sum + (parseFloat(agency.percentage_of_participation) || 0);
//   }, 0);
// });

const submitForm = async () => {
  loading.value = true;
  await autoSave();
  nextStep();
};

// logic เพิ่มหรือลบข้อมูล ส่วนที่ 1
const agency_group_limits = 6;
const is_agency_full = ref(false);
const decrease_agency_group = (index) => {
  if (Project_Data_P1.agency_group.length > 1) {
    Project_Data_P1.agency_group.splice(index, 1);

    if (Project_Data_P1.agency_group.length < agency_group_limits) {
      is_agency_full.value = false;
    }
  }
};
const increase_agency_group = () => {
  const totalPercentage = Project_Data_P1.agency_group.reduce((sum, agency) => {
    return sum + (parseFloat(agency.percentage_of_participation) || 0);
  }, 0);

  if (is_agency_full.value) return;

  Project_Data_P1.agency_group.push({
    executive_board: "",
    percentage_of_participation: 0,
    executive_board_leader_name: "",
  });
};

watch(
  () => Project_Data_P1.agency_group.map((a) => a.percentage_of_participation),
  () => {
    const totalPercentage = Project_Data_P1.agency_group.reduce((sum, agency) => {
      return sum + (parseFloat(agency.percentage_of_participation) || 0);
    }, 0);

    if (
      totalPercentage >= 100 ||
      Project_Data_P1.agency_group.length >= agency_group_limits
    ) {
      is_agency_full.value = true;
    } else {
      is_agency_full.value = false;
    }
  },
  { deep: true }
);

// logic เพิ่มหรือลบข้อมูล ส่วนที่ 2
const pm_lists_limits = 6;
const is_pm_list_full = ref(false);
const increase_pm_list = () => {
  if (Project_Data_P1.project_manager_team_lists.length + 1 === pm_lists_limits) {
    is_pm_list_full.value = true;
  }
  Project_Data_P1.project_manager_team_lists.push({ project_manager_team: "" });
};
const decrease_pm_list = (index) => {
  Project_Data_P1.project_manager_team_lists.splice(index, 1);
  is_pm_list_full.value = false;
};

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/get/p_1", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });
    canEdit = false;
    const project_data = JSON.parse(response.data.data[0].project_data_p_1);
    Project_Data_P1.project_name = project_data.project_name;
    Project_Data_P1.agency_group = project_data.agency_group;
    Project_Data_P1.project_manager_leader_name =
      project_data.project_manager_leader_name;
    Project_Data_P1.project_manager_team_lists = project_data.project_manager_team_lists;
    isCanGo.value = true;
    //console.log("Skip autosave:  initial load completed");
  } catch (err) {
    //console.log(err);
    //console.log("error fetching editing data = ", project_id.value);
  }
};

watch(
  Project_Data_P1,
  async (newVal, oldVal) => {
    if (isInitialized && !canEdit) {
      return;
    }

    const data = newVal;

    const isMainValid =
      data.project_name?.trim() !== "" &&
      (
        data.project_manager_leader_name?.trim() !== "" ||
        (
          Array.isArray(data.project_manager_team_lists) &&
          data.project_manager_team_lists.some(
            (item) => item.project_manager_team?.trim() !== ""
          )
        )
      );


    const isAgencyGroupValid =
      Array.isArray(data.agency_group) &&
      data.agency_group.every(
        (item) =>
          item.executive_board?.trim() !== "" &&
          ((item.percentage_of_participation !== 0) && (item.percentage_of_participation !== "")) &&
          item.executive_board_leader_name?.trim() !== ""
      );

    const totalPercentage = data.agency_group.reduce((sum, agency) => {
      return sum + (parseFloat(agency.percentage_of_participation) || 0);
    }, 0);

    const allValid = isMainValid && isAgencyGroupValid;

    if (allValid && totalPercentage === 100) {
      isCanGo.value = true;
      isFullPercen.value = false;
      
    } else {
      isCanGo.value = false;
      isFullPercen.value = true;
    }
  },
  { immediate: true,deep: true  }
);

onMounted(async () => {
  const user = parseJwt(cookies.get("accesstoken"));
  user_id.value = user.user_id;
  affiliation_id.value = user.affiliation_id;
  //console.log("ID", project_id.value);
  const route = useRoute();

  if (route.query.project_type) {
    const projectType = route.query.project_type;
    project_type.value = projectType;
  }

  if (route.query.project_id) {
    const projectId = route.query.project_id;
    project_id.value = projectId;

    isInitialized = true;
    canEdit = false; // true
    await getDataWhenProjectID();
    canEdit = true;
  } else {
    isInitialized = true;
    canEdit = true; //false
  }

  //console.log("Project id:", project_id.value);
  //console.log("Project Type:", project_type.value);
  //console.log("user_id:", user_id.value);
});

const nextStep = () => {
  if (currentStep.value < 7) {
    currentStep.value++;
  }
};

onUnmounted(() => {
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
  });
});

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style lang="css" scoped>
.beautiful-box {
  height: 50px !important;
  border-radius: 6px !important;
}
</style>
