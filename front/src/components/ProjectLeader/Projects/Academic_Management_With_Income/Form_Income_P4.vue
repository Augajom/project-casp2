<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่มีรายได้" />
    <ProgressBar
      class="fixed-top border"
      :step="currentStep"
      @update:step="currentStep"
    />
    <Loader v-if="loading" />
    <div class="container-fluid" style="min-height: auto; margin-top: 250px">
      <div class="d-flex justify-content-center">
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
          <div class="row text-white fs-3 my-3">
            <p>ส่วนที่ 4 แผนการดำเนินงานเเละกลุ่มเป้าหมาย</p>
          </div>
          <div class="p-2">
            <div class="row">
              <div class="mb-3">
                <label class="fs-4 fw-light text-white" for="project_duration"
                  ><b>ระยะเวลาการดำเนินการ</b></label
                >

                <div class="row mt-3">
                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <div>
                        <div class="text-center">
                          <label class="text-white" for="start_date"
                            >ระยะเวลาเริ่มต้น</label
                          >
                        </div>
                        <div class="mt-2">
                          <input
                            type="date"
                            class="form-control text-center fw-light text-muted beautiful-box"
                            v-model="Project_Data_P4.startDate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <div>
                        <div class="text-center">
                          <label class="text-white" for="end_date">ระยะเวลาสิ้นสุด</label>
                        </div>
                        <div class="d-flex mt-2">
                          <input
                            type="date"
                            class="form-control text-center fw-light text-muted beautiful-box"
                            v-model="Project_Data_P4.endDate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="text-white" for="location">
                  <span class="fs-4 fw-light"><b>สถานที่จัดโครงการ</b></span>
                  <span class="fw-light">
                    (ให้ระบุสถานที่จัดให้ชัดเจน เช่น ห้องประชุมของอาคาร
                    ห้องประชุมของหน่วยงาน หรือ ชื่อสถานที่จัด)</span
                  >
                </label>
                <input
                  class="form-control mt-3 beautiful-box"
                  type="text"
                  v-model="Project_Data_P4.location"
                  placeholder="ระบุสถานที่"
                  aria-label="default input example"
                />
              </div>

              <div class="mb-3 mt-2">
                <label class="fw-light text-white" for="multipleSessions"
                  ><span class="fs-4"><b>กรณีดำเนินโครงการมากกว่า 1 ครั้ง </b></span>
                  <span
                    >(ให้ระบุสถานที่ เเละ ระยะเวลาเริ่มดำเนินการ) ตัวอย่าง ห้อง E4A-507
                    (2-3 มิ.ย. 2568)</span
                  ></label
                >

                <div class="mt-3">
                  <div
                    v-for="(session, index) in Project_Data_P4.multipleSessions"
                    :key="index"
                  >
                    <div
                      class="row mt-3"
                      @mouseover="hoveredIndex = index"
                      @mouseleave="hoveredIndex = null"
                    >
                      <div
                        :class="
                          index === 0
                            ? 'col-6'
                            : hoveredIndex === index
                            ? 'col-5'
                            : 'col-6'
                        "
                      >
                        <input
                          class="form-control beautiful-box"
                          type="text"
                          v-model="session.location"
                          v-if="index === 0"
                          :placeholder="
                            'ระบุสถานที่ ครั้งที่ 1'
                          "
                        />
                        <input
                          class="form-control beautiful-box"
                          type="text"
                          v-model="session.location"
                          v-else
                          :placeholder="
                            'ระบุสถานที่ ครั้งที่ ' + (index + 1) + ' (ถ้ามี)'
                          "
                        />
                      </div>
                      <div
                        :class="
                          index === 0
                            ? 'col-6'
                            : hoveredIndex === index
                            ? 'col-5'
                            : 'col-6'
                        "
                      >
                        <input
                          class="form-control text-center text-muted beautiful-box"
                          v-model="session.date"
                          type="date"
                        />
                      </div>
                      <div
                        v-if="index > 0"
                        :class="
                          hoveredIndex === index
                            ? 'col-2 d-flex justify-content-center align-items-center'
                            : 'd-none'
                        "
                      >
                        <button
                          @click="decrease_multipleSession(index)"
                          class="btn btn-danger"
                        >
                          ลบรายการนี้
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center mt-3">
                  <button
                    @click="addMultipleSession"
                    class="btn p-2 d-flex align-items-center"
                    style="background-color: #0d6efd; color: white"
                  >
                    <span class="fs-3 mx text-end">+</span
                    ><span class="mx-2">เพิ่มจำนวนครั้งการจัดโครงการ</span>
                  </button>
                </div>
              </div>

              <div class="mb-3 mt-3">
                <label class="fw-light text-white" for="project_duration"
                  ><span class="fs-4"><b>ประเภทของกลุ่มเป้าหมาย </b></span
                  ><span class="fs-6">(สามารถเลือกได้หลายกลุ่มเป้าหมาย)</span></label
                >
                <div class="container mt-3">
                  <div class="row row-cols-2 g-0 gy-3 justify-content-between">
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.student.checked"
                        type="checkbox"
                      />
                      <label class="form-check-label text-white fs-5 mx-2" for="study"
                        >นักเรียน/นักศึกษา</label
                      >
                    </div>
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.professional.checked"
                        type="checkbox"
                      />
                      <label
                        class="form-check-label text-white fs-5 mx-2"
                        for="professional"
                        >วิชาชีพ</label
                      >
                    </div>
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.teacher.checked"
                        type="checkbox"
                      />
                      <label class="form-check-label text-white fs-5 mx-2" for="lecture"
                        >ครู</label
                      >
                    </div>
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.general.checked"
                        type="checkbox"
                      />
                      <label class="form-check-label text-white fs-5 mx-2" for="comment"
                        >บุคลากรทั่วไป</label
                      >
                    </div>
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.government.checked"
                        type="checkbox"
                      />
                      <label class="form-check-label text-white fs-5 mx-2" for="comment"
                        >ข้าราชการ</label
                      >
                    </div>
                    <div class="col d-flex align-items-center">
                      <input
                        class="form-check-input me-2 circle-input"
                        v-model="Project_Data_P4.targetGroups.etc.checked"
                        type="checkbox"
                      />
                      <label class="form-check-label text-white fs-5 mx-2" for="comment"
                        >อื่น ๆ</label
                      >
                    </div>
                  </div>
                </div>
                <div v-if="Project_Data_P4.targetGroups.etc.checked" class="mb-3 mt-3">
                  <input
                    type="text"
                    class="form-control beautiful-box"
                    v-model="Project_Data_P4.targetGroups.etc.value"
                    placeholder="อื่น ๆ โปรดระบุ เช่น นักเรียนระดับชั้นมัธยมศึกษาตอนต้น"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="fw-light text-white" for="project_duration"
                  ><span class="fs-4"><b>ระบุพื้นที่ของกลุ่มเป้าหมาย </b></span
                  ><span class="fs-6"
                    >(เช่น โรงเรียน, ตำบล หรือ จังหวัด สำหรับประชาสัมพันธ์)</span
                  ></label
                >
                <input
                  type="text"
                  class="form-control beautiful-box mt-3"
                  v-model="Project_Data_P4.targetArea"
                  placeholder="ระบุกลุ่มพื้นที่เป้าหมาย"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6 d-flex justify-content-end">
              <router-link
                :to="{
                  path: '/pl/in_come/p_3',
                  query: { project_id: project_id || '', project_type: 2 },
                }"
              >
                <button
                  class="btn btn-secondary"
                  style="width: 140px"
                  @click="prevStep"
                  :disabled="currentStep === 1"
                >
                  ย้อนกลับ
                </button>
              </router-link>
            </div>
            <!-- <div class="col-6">
                <router-link :to="{path:'/pl/no_income/p_5',query:{project_id: project_id || '',project_type:1}}">
                  <button class="btn btn-success" style="width: 140px;" @click="nextStep"  :disabled="currentStep === 7">ถัดไป</button>
                </router-link>
              </div> -->
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import Loader from "@/components/Loader.vue";
import parseJwt from "../../../../../utils/DecodeToken";
import ProgressBar from "@/components/ProgressBar.vue";
import NavbarProject from "@/components/NavbarProject.vue";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const router = useRouter();
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
const loading = ref(false);
const hoveredIndex = ref(null);
const currentStep = ref(4);

const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

let isInitialized = false;
let canEdit = false;
const isCanGo = ref(false);

const Project_Data_P4 = reactive({
  location: "", // required
  startDate: "", // required
  endDate: "", // required
  multipleSessions: [
    {
      session_id: 1,
      location: "", // required
      date: "", // required
    },
  ],
  targetGroups: {
    // at least 1 must checked
    student: { checked: false, value: "นักเรียน/นักศึกษา" },
    teacher: { checked: false, value: "ครู" },
    government: { checked: false, value: "ข้าราชการ" },
    professional: { checked: false, value: "วิชาชีพ" },
    general: { checked: false, value: "บุคลากรทั่วไป" },
    etc: { checked: false, value: "" }, // if checked, value can not be empty
  },
  targetArea: "", // required
});

const multipleSessions_limits = 6;
const is_multipleSession_limit = ref(false);
const addMultipleSession = () => {
  if (Project_Data_P4.multipleSessions.length >= multipleSessions_limits) {
    is_multipleSession_limit.value = true;
    return;
  }

  Project_Data_P4.multipleSessions.push({
    session_id: Project_Data_P4.multipleSessions.length + 1,
    location: "",
    date: "",
  });

  if (Project_Data_P4.multipleSessions.length >= multipleSessions_limits) {
    is_multipleSession_limit.value = true;
  }
};

const decrease_multipleSession = (index) => {
  if (Project_Data_P4.multipleSessions.length > 1) {
    Project_Data_P4.multipleSessions.splice(index, 1);

    Project_Data_P4.multipleSessions.forEach((obj, i) => {
      obj.session_id = i + 1;
    });

    if (Project_Data_P4.multipleSessions.length < multipleSessions_limits) {
      is_multipleSession_limit.value = false;
    }
  }
};

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/get/p_4", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data = JSON.parse(response.data.data[0].project_data_p_4);
    //console.log(project_data)
    Project_Data_P4.location = project_data.location;
    Project_Data_P4.startDate = project_data.startDate;
    Project_Data_P4.endDate = project_data.endDate;
    Project_Data_P4.multipleSessions = project_data.multipleSessions;
    Project_Data_P4.targetGroups = project_data.targetGroups;
    Project_Data_P4.targetGroupDetails = project_data.targetGroupDetails;
    Project_Data_P4.targetArea = project_data.targetArea;

    // //console.log('sending a request to fetch editing data project id = ',project_id)
  } catch (err) {
    //console.log(err)
    //console.log('error fetching editing data = ',project_id.value)
  }
};

const autoSave = debounce(async () => {
  // loading.value = true
  try {
    const response = await axios.post("http://localhost:5000/pl/p_4/income/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_P4,
      project_affiliation: affiliation_id.value,
    });
    //console.log(response.data)
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log('project_id',project_id.value)
      router.replace({
        path: "/pl/in_come/p_5",
        query: { project_id: project_id.value || "", project_type: 2 },
      });
      // loading.value = false
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
      });
      await setTimeout(() => {
        loading.value = false;
      }, 500);
    } else {
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
      });
    }
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
  }
});

watch(
  Project_Data_P4,
  (newVal, oldVal) => {
    //console.log('Project_Data_P4 has changed:');
    if (isInitialized && !canEdit) {
      //console.log('return when fetching state')
      return 0;
    }
  },
  { deep: true }
);

watch(
  Project_Data_P4,
  (newVal) => {
    //console.log('--- Checking Project_Data_P4 ---');

    if (!newVal.location?.trim()) {
      //console.log('❌ location is empty');
      isCanGo.value = false;
      return;
    }
    //console.log('✅ location:', newVal.location);

    if (!newVal.startDate?.trim()) {
      //console.log('❌ startDate is empty');
      isCanGo.value = false;
      return;
    }
    //console.log('✅ startDate:', newVal.startDate);

    if (!newVal.endDate?.trim()) {
      //console.log('❌ endDate is empty');
      isCanGo.value = false;
      return;
    }
    //console.log('✅ endDate:', newVal.endDate);

    if (newVal.endDate?.trim() < newVal.startDate?.trim()) {
      isCanGo.value = false;
      return;
    }

    if (newVal.endDate?.trim() === newVal.startDate?.trim()) {
      isCanGo.value = false;
      return;
    }

    if (!newVal.targetGroups || typeof newVal.targetGroups !== "object") {
      //console.log('❌ targetGroups is invalid');
      isCanGo.value = false;
      return;
    }
    const groups = Object.values(newVal.targetGroups);
    const isAnyChecked = groups.some((group) => group.checked);
    if (!isAnyChecked) {
      //console.log('❌ No target group is checked');
      isCanGo.value = false;
      return;
    }
    //console.log('✅ At least one target group is checked');

    if (newVal.targetGroups.etc.checked) {
      if (!newVal.targetGroups.etc.value?.trim()) {
        //console.log('❌ targetGroups.etc is checked but value is empty');
        isCanGo.value = false;
        return;
      }
      //console.log('✅ targetGroups.etc is valid');
    }

    if (!newVal.targetArea?.trim()) {
      //console.log('❌ targetArea is empty');
      isCanGo.value = false;
      return;
    }
    //console.log('✅ targetArea:', newVal.targetArea);

    //console.log('🎉 All fields are valid, isCanGo = true');
    isCanGo.value = true;
  },
  { deep: true, immediate: true }
);

const submitForm = async () => {
  loading.value = true;
  await autoSave();
  await nextStep();
};

onMounted(async () => {
  const route = useRoute();
  const user = parseJwt(cookies.get("accesstoken"));
  user_id.value = user.user_id;
  affiliation_id.value = user.affiliation_id;

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
  //console.log('Project id:', project_id.value)
  //console.log('Project Type:', project_type.value)
  //console.log('user_id:', user_id.value)
});

onUnmounted(() => {
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
  });
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
.circle-input {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid white;
}
</style>
