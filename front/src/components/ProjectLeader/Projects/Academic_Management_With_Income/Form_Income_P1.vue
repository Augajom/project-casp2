<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่มีรายได้" />
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

          <div>
            <div class="row">
              <div class="col-9">
                <label for="project_name" class="form-label fs-5 text-white"
                  >ชื่อหัวหน้าคณะบริหารโครงการ
                </label>
                <input
                  type="text"
                  v-model="
                    Project_Data_P1.project_manager_leader_lists.project_manager_leader
                  "
                  class="form-control beautiful-box"
                  placeholder="โปรดกรอก ชื่อหัวหน้าคณะบริหารโครงการ"
                />
              </div>
              <div class="col-3">
                <label for="project_name" class="form-label fs-5 text-white"
                  >ร้อยละการมีส่วนร่วม</label
                >
                <input
                  type="number"
                  min="0"
                  v-model="
                    Project_Data_P1.project_manager_leader_lists
                      .percentage_of_participation
                  "
                  class="form-control beautiful-box"
                  placeholder="ร้อยละการมีส่วนร่วม"
                />
              </div>
            </div>
          </div>

          <div
            v-for="(item, index) in Project_Data_P1.project_manager_team_lists"
            :key="index"
          >
            <hr class="text-white" />
            <div class="row">
              <div class="col-9">
                <label for="project_name" class="form-label fs-5 text-white"
                  >รายชื่อคณะบริหารโครงการ</label
                >
                <input
                  type="text"
                  v-model="item.project_manager_team"
                  class="form-control beautiful-box"
                  :placeholder="`โปรดกรอก ชื่อคณะบริหารโครงการ ลำดับที่ ${index + 1}`"
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
              <div v-if="index != 0" class="d-grid mt-3 mb-2">
                <button class="btn btn-danger" @click="decrease_pm_lists(index)">
                  ลดชื่อคณะบริหารที่ร่วมดำเนินโครงการนี้
                </button>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center mb-5">
            <button
              class="btn beautiful-box"
              @click="increase_pm_list"
              :disabled="is_pm_list_full"
              style="background-color: #0d6efd; color: white; margin-top: 2rem"
            >
              <i class="fa fa-plus mx-3" aria-hidden="true"></i
              >เพิ่มรายชื่อคณะบริหารโครงการ ({{ Project_Data_P1.project_manager_team_lists.length }}/6)
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
              <div>
                <button
                  class="btn btn-success"
                  style="width: 140px"
                  @click="submitForm"
                  :disabled="!isFormValid"
                >
                  บันทึก
                </button>
              </div>
            </div>
            <!-- <button @click="prevStep" :disabled="currentStep === 1">Previous</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar.vue";
import Loader from "@/components/Loader.vue";
import Swal from "sweetalert2";
import NavbarProject from "@/components/NavbarProject.vue";
import { useRoute, useRouter } from "vue-router";
import parseJwt from "../../../../../utils/DecodeToken";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const router = useRouter();
let isInitialized = false;
let canEdit = false;
const loading = ref(false);
const isFullPercen = ref(false);
const currentStep = ref(1);
const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

const Project_Data_P1 = reactive({
  project_name: "",
  agency_group: [
    {
      executive_board: "",
      percentage_of_participation: 0,
      executive_board_leader_name: "",
    },
  ],
  project_manager_leader_lists: {
    project_manager_leader: "",
    percentage_of_participation: "",
  },
  project_manager_team_lists: [
    {
      project_manager_team: "",
      percentage_of_participation: "",
    },
  ],
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  customClass: { popup: "colored-toast" },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const submitForm = async () => {
  loading.value = true;
  await submitFormThenNext();
  await nextStep();
};

const submitFormThenNext = async () => {
  if (!isFormValid.value) return; // ⛔️ บล็อกทุกทางไว้

  //console.log("ส่งข้อมูล:", JSON.stringify(Project_Data_P1));

  try {
    const response = await axios.post("http://localhost:5000/pl/p_1/income/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_P1,
      project_affiliation: affiliation_id.value,
    });

    //console.log("response", response.data);

    if (response.data.success) {
      Toast.fire({ icon: "success", iconColor: "green", title: `บันทึกข้อมูลสำเร็จ` });
      await setTimeout(() => {
        loading.value = false;
      }, 500);
      router.push({
        path: "/pl/in_come/p_2",
        query: {
          project_id: response.data.insert_id || "",
          project_type: 2,
        },
      });
    } else {
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
      });
    }
  } catch (error) {
    console.error(error);
    Toast.fire({ icon: "error", iconColor: "red", title: `เกิดข้อผิดพลาด` });
  }
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
    Project_Data_P1.project_manager_leader_lists =
      project_data.project_manager_leader_lists;
    Project_Data_P1.project_manager_team_lists = project_data.project_manager_team_lists;
    //console.log('Skip autosave:  initial load completed')
  } catch (err) {
    //console.log(err)
    //console.log('error fetching editing data = ',project_id.value)
  }
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
  const leaderPercent =
    Number(Project_Data_P1.project_manager_leader_lists.percentage_of_participation) || 0;
  const teamPercent = Project_Data_P1.project_manager_team_lists.reduce(
    (sum, member) => sum + (Number(member.percentage_of_participation) || 0),
    0
  );
  const totalPercent = leaderPercent + teamPercent;

  const currentLength = Project_Data_P1.project_manager_team_lists.length;

  if (currentLength >= pm_lists_limits) {
    is_pm_list_full.value = true;
    return;
  }

  if (totalPercent >= 100) {
    is_pm_list_full.value = true;
    return;
  }

  Project_Data_P1.project_manager_team_lists.push({
    project_manager_team: "",
    percentage_of_participation: "",
  });

  // อัพเดทสถานะว่าถ้าเพิ่มครบ 6 แล้วให้บล็อก
  if (currentLength + 1 >= pm_lists_limits || totalPercent >= 100) {
    is_pm_list_full.value = true;
  }
};

const decrease_pm_lists = (index) => {
  Project_Data_P1.project_manager_team_lists.splice(index, 1);

  const leaderPercent =
    Number(Project_Data_P1.project_manager_leader_lists.percentage_of_participation) || 0;
  const teamPercent = Project_Data_P1.project_manager_team_lists.reduce(
    (sum, member) => sum + (Number(member.percentage_of_participation) || 0),
    0
  );

  is_pm_list_full.value = 
    Project_Data_P1.project_manager_team_lists.length >= pm_lists_limits ||
    leaderPercent + teamPercent >= 100;
};


const isFormValid = computed(() => {
  if (!Project_Data_P1.project_name.trim()) return false;

  // เช็ค agency_group
  for (const agency of Project_Data_P1.agency_group) {
    if (
      !agency.executive_board.trim() ||
      !agency.executive_board_leader_name.trim() ||
      agency.percentage_of_participation === null ||
      agency.percentage_of_participation === "" ||
      isNaN(agency.percentage_of_participation) ||
      Number(agency.percentage_of_participation) <= 0
    )
      return false;
  }

  // เช็ค project_manager_team_lists
  for (const member of Project_Data_P1.project_manager_team_lists) {
    if (
      Number(member.percentage_of_participation) < 0
    )
      return false;
  }

  // เช็ค project_manager_leader_lists
  if (
    Number(Project_Data_P1.project_manager_leader_lists.percentage_of_participation) < 0
  )
    return false;

  // รวมเปอร์เซ็นต์ leader + team ต้องเท่ากับ 100
  const leaderPercent = Number(
    Project_Data_P1.project_manager_leader_lists.percentage_of_participation
  );
  const teamPercent = Project_Data_P1.project_manager_team_lists.reduce((sum, member) => {
    return sum + (Number(member.percentage_of_participation) || 0);
  }, 0);

  if (leaderPercent + teamPercent !== 100) return false;

  // ✅ เพิ่ม: ตรวจสอบ agency_group รวมเปอร์เซ็นต์
  const agencyTotal = Project_Data_P1.agency_group.reduce((sum, agency) => {
    return sum + (parseFloat(agency.percentage_of_participation) || 0);
  }, 0);
  if (agencyTotal !== 100) return false;

  return true;
});

watch(
  () => [
    ...Project_Data_P1.project_manager_team_lists.map(m => m.percentage_of_participation),
    Project_Data_P1.project_manager_leader_lists.percentage_of_participation,
  ],
  () => {
    const leaderPercent =
      Number(Project_Data_P1.project_manager_leader_lists.percentage_of_participation) || 0;
    const teamPercent = Project_Data_P1.project_manager_team_lists.reduce(
      (sum, member) => sum + (Number(member.percentage_of_participation) || 0),
      0
    );
    const total = leaderPercent + teamPercent;

    is_pm_list_full.value =
      Project_Data_P1.project_manager_team_lists.length >= pm_lists_limits ||
      total >= 100;
  },
  { deep: true }
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
