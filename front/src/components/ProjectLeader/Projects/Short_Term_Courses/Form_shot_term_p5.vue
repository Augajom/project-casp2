<template>
  <div>
      <NavbarProject class="fixed-top " propText="โครงการหลักสูตรระยะสั้น (ประเภทเทียบเคียงหลักสูตรการศึกษา)" />
        <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
        <Loader  v-if="loading"/>
        <div class="container-fluid" style="min-height: 1300px; margin-top: 250px">
        <div class="d-flex justify-content-center">
          <div
            class="container d-flex flex-column border px-5 shadow p-3 mb-5"
            style="
              max-width: 1200px;
              min-width: 1200px;
              background-color: #374375;
              border-radius: 12px;
              height: auto;
            "
          >
            <div class="row text-white fs-3 mt-3">
              <p>ส่วนที่ 5 การประเมินผลและการติดตาม</p>
            </div>
            <div class="p-2">
              <div class="row">
                <label class="text-white" for="location">
                  <span class="fs-5 fw-light"
                    ><b
                      >แนวทางการประเมินผลหรือวิธีวัด (Assessment) ความสามารถ และ/หรือผลการเรียนรู้ในเชิงคุณภาพ</b
                    ></span
                  >
                </label>
                <div class="container mt-1 p-3">
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.assessmentMethods.prePostTest.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ประเมินจากผลการทดสอบ ก่อน-หลัง การดำเนินโครงการ
                      </label>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.assessmentMethods.projectEvaluation.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ประเมินจากชิ้นงาน/ผลงานของผู้เข้าร่วมโครงการ
                      </label>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.assessmentMethods.observation.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ประเมินจากการสัมภาษณ์/สอบถาม
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.assessmentMethods.others.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        อื่น ๆ
                      </label>
                    </div>
                  </div>
                  <input
                    type="text "
                    v-if="Project_Data_ST_P5.assessmentMethods.others.checked"
                    v-model="Project_Data_ST_P5.assessmentMethods.others.value"
                    class="form-control mt-3 beautiful-box"
                    placeholder="อื่น ๆ โปรดระบุให้ละเอียด"
                  />
                </div>
              </div>

              <div class="row mt-1">
                <label class="text-white" for="location">
                  <span class="fs-5 fw-light"><b>แนวทางการติดตามโครงการ</b></span>
                </label>
                <div class="container mt-1 p-3">
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.followUpMethods.followUpObservation.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ประเมินจากการลงพื้นที่ (สัมภาษณ์/สอบถาม)
                      </label>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.followUpMethods.followUpPerformance.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ประเมินจากการจัดส่งแบบติดตาม
                      </label>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.followUpMethods.otherDetails.checked"
                        type="checkbox"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        อื่น ๆ
                      </label>
                    </div>
                  </div>
                  <input
                    type="text "
                    v-if="Project_Data_ST_P5.followUpMethods.otherDetails.checked"
                    v-model="Project_Data_ST_P5.followUpMethods.otherDetails.value"
                    class="form-control mt-3 beautiful-box"
                    placeholder="อื่น ๆ โปรดระบุให้ละเอียด"
                  />
                </div>
              </div>
              <div class="mb-3 mt-3">
                <label class="fs-5 fw-light text-white" for="project_duration"
                  ><b>โปรดระบุช่วงเวลาสำหรับติดตามผลลัพธ์ของโครงการ</b></label
                >
                <div class="row mt-3">
                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <div>
                        <div class="text-center">
                          <label class="text-white" for="start_date">ระยะเวลาเริ่มต้น</label>
                        </div>
                        <div class="mt-2">
                          <input
                            type="date"
                            v-model="Project_Data_ST_P5.followUpDuration.startDate"
                            class="form-control text-center fw-light text-muted beautiful-box"
                            name=""
                            id=""
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
                            v-model="Project_Data_ST_P5.followUpDuration.endDate"
                            class="form-control text-center fw-light text-muted beautiful-box"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <label class="text-white" for="location">
                  <span class="fs-5 fw-light"
                    ><b>โครงการเกิดจากการสำรวจความต้องการของกลุ่มเป้าหมายอย่างไร</b></span
                  >
                </label>
                <div class="container mt-1 p-3">
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.projectImpact.description"
                        type="radio"
                        name="target"
                        value="report"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ข้อมูลจากรายงานการสรุปผลความต้องการของศูนย์บริการวิชาการ
                      </label>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.projectImpact.description"
                        type="radio"
                        name="target"
                        value="committee"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        คณะทำงานสำรวจความต้องการของกลุ่มเป้าหมายเอง (โปรดแนบข้อมูลเพิ่มเติม)
                      </label>
                    </div>
                    <div
                      class="mt-2"
                      v-if="Project_Data_ST_P5.projectImpact.description === 'committee'"
                    >
                      <div>
                        <p class="text-warning" style="margin: 0.7rem 0 0 5.5rem;">
                          สามารถแนบไฟล์ Word (.doc, .docx), PDF (.pdf), Excel (.xls, .xlsx) และ ขนาดไม่เกิน 10 MB.
                        </p>
                        <div class="d-flex">
                          <div class="relative inline-block">
                            <!-- ปุ่มแทน input -->
                            <label
                              for="file-upload"
                              class="btn btn-sm btn-light"
                              style="left: 90px; position: relative; margin-top: 0.5rem;"
                            >
                              แนบไฟล์
                            </label>

                            <!-- input file ซ่อน -->
                            <input
                              id="file-upload"
                              type="file"
                              class="d-none"
                              @change="handleFileChange"
                            />
                          </div>
                          <p class="text-white" style="margin: 0.7rem 0 0 6rem; width: 55rem;">
                            <span v-if="fileName">{{ fileName }}</span>
                            <span v-else>ยังไม่ได้เลือกไฟล์</span>
                          </p>
                        </div>

                        <!-- แสดงชื่อไฟล์ที่เคยอัปโหลดหรือที่เลือกไว้ล่าสุด -->
                        <div v-if="existingFileName">
                          <p class="text-white"
                          style="left: 90px; position: relative; margin-top: 1rem; width: 60rem;">

                            ไฟล์เดิม :
                            <a
                              class="btn btn-sm btn-secondary"
                              :href="`http://localhost:5000/Files/${existingFileName}`"
                              :download="existingFileName" target="_blank"
                              >{{existingFileName.split('-').slice(5).join('-')}}</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-1 d-flex justify-content-center">
                      <input
                        class="form-check-input circle-input"
                        v-model="Project_Data_ST_P5.projectImpact.description"
                        type="radio"
                        name="target"
                        value="externalData"
                      />
                    </div>
                    <div class="col-11">
                      <label class="form-check-label text-white" for="flexCheckDefault">
                        ใช้ข้อมูลความต้องการจากแหล่งอื่น (โปรดแนบข้อมูลเพิ่มเติม)
                      </label>
                    </div>
                    <div
                      class="mt-2"
                      v-if="Project_Data_ST_P5.projectImpact.description === 'externalData'"
                    >
                      <div>
                        <p class="text-warning" style="margin: 0.7rem 0 0 5.5rem;">
                          สามารถแนบไฟล์ Word (.doc, .docx), PDF (.pdf), Excel (.xls, .xlsx) และ ขนาดไม่เกิน 10 MB.
                        </p>
                        <div class="d-flex">
                          <div class="relative inline-block">
                            <!-- ปุ่มแทน input -->
                            <label
                              for="file-upload"
                              class="btn btn-sm btn-light"
                              style="left: 90px; position: relative; margin-top: 0.5rem;"
                            >
                              แนบไฟล์
                            </label>

                            <!-- input file ซ่อน -->
                            <input
                              id="file-upload"
                              type="file"
                              class="d-none"
                              @change="handleFileChange"
                            />
                          </div>
                          <p class="text-white" style="margin: 0.7rem 0 0 6rem; width: 55rem;">
                            <span v-if="fileName">{{ fileName }}</span>
                            <span v-else>ยังไม่ได้เลือกไฟล์</span>
                          </p>
                        </div>

                        <!-- แสดงชื่อไฟล์ที่เคยอัปโหลดหรือที่เลือกไว้ล่าสุด -->
                        <div v-if="existingFileName">
                          <p class="text-white"
                          style="left: 90px; position: relative; margin-top: 1rem; width: 60rem;">

                            ไฟล์เดิม :
                            <a
                              class="btn btn-sm btn-secondary"
                              :href="`http://localhost:5000/Files/${existingFileName}`"
                              :download="existingFileName" target="_blank"
                              >{{existingFileName.split('-').slice(5).join('-')}}</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 d-flex justify-content-end">
                <router-link
                  :to="{
                    path: '/pl/st/p_4',
                    query: { project_id: project_id || '', project_type: 3 },
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
              
              <div class="col-6">
                <button
                  class="btn btn-success"
                  style="width: 140px"
                  @click="submitForm"
                  :disabled="!isCanGo"
                >  
                  <span>บันทึก</span>
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
import Loader from "@/components/Loader.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import parseJwt from "../../../../../utils/DecodeToken";
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
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

const currentStep = ref(5);

const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

let loading = ref(false)
let isInitialized = false;
let canEdit = false;
let isCanGo = ref(false);

const Project_Data_ST_P5 = reactive({
  assessmentMethods: {
    //must ckecked at least 1
    prePostTest: {
      checked: false,
      value: "ประเมินผลการทดสอบ ก่อน-หลัง การดำเนินโครงการ",
    },
    projectEvaluation: {
      checked: false,
      value: "ประเมินจากข้อมูล/ผลลัพธ์ของผู้เข้าร่วมโครงการ",
    },
    observation: { checked: false, value: "ประเมินจากการสังเกตการณ์/สอบถาม" },
    others: { checked: false, value: "" }, // if ckecked is true ,value must not empty
  },
  followUpMethods: {
    //must ckecked at least 1
    followUpObservation: {
      checked: false,
      value: "ประเมินจากการติดตามที่ (สัมภาษณ์/สอบถาม)",
    },
    followUpPerformance: { checked: false, value: "ประเมินผลจากการต่อยอดโครงการ" },
    otherDetails: { checked: false, value: "" }, // if ckecked is true ,value must not empty
  },
  followUpDuration: {
    startDate: "", // mm/dd/yyyy //required
    endDate: "", // mm/dd/yyyy //required
  },
  projectImpact: {
    id: 1,
    file: null,
    description: "", // if description is "report" tis no need to have file, file cannot be null
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

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/ST/get/p_5", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data = JSON.parse(response.data.data[0].project_data_p_5);
    //console.log(project_data);
    Project_Data_ST_P5.assessmentMethods = project_data.assessmentMethods;
    Project_Data_ST_P5.followUpMethods = project_data.followUpMethods;
    Project_Data_ST_P5.followUpDuration = project_data.followUpDuration;
    Project_Data_ST_P5.projectImpact = project_data.projectImpact;

    // //console.log('sending a request to fetch editing data project id = ',project_id)
  } catch (err) {
    //console.log(err);
    //console.log("error fetching editing data = ", project_id.value);
  }
};

//Upload File
const files = ref([]);
const fileName = ref('')
const pageName = 'page5' // อย่าลืมเปลี่ยนตามหน้าที่เอาไปวางเพื่ออิงหน้านั้นๆ

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
  Project_Data_ST_P5.projectImpact.file = validFiles.length > 0 ? validFiles[0] : null; // อย่าลืมเปลี่ยนชื่อให้ตรงกับ data ที่เก็บ ในที่นี้คือ Project_Data_P7

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
      Project_Data_ST_P5.projectImpact.fileName = response.data.file.filename;
    } else {
      console.warn("❌ อัปโหลดล้มเหลว");
    }
  } catch (error) {
    console.error("❌ ไม่มีการอัพโหลดไฟล์ ✅หรือมีไฟล์อยู่แล้ว", error);
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

    // ✅ ถ้ามีไฟล์อยู่แล้ว ถือว่าไฟล์ถูกแนบ
    if (existingFileName.value) {
      Project_Data_ST_P5.projectImpact.file = { name: existingFileName.value };
    }
  } catch (err) {
    console.error("ไม่สามารถโหลดไฟล์เดิม:", err);
  }
};


const autoSave = debounce(async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/p_5/shot_term/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_ST_P5,
      project_affiliation: affiliation_id.value,
    });
    //console.log(response.data);
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log("project_id", project_id.value);
      router.replace({
        path: "/pl/st/p_6",
        query: { project_id: project_id.value || "", project_type: 3 },
      });
      await setTimeout(() => {
        loading.value = false;
      }, 500);
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
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
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
  }
},  );

watch(
    Project_Data_ST_P5,
  (newVal, oldVal) => {
    //console.log("Project_Data_ST_P5 has changed:");
    if (isInitialized && !canEdit) {
      //console.log("return when fetching state");
      return 0;
    }
    // autoSave()
  },
  { deep: true }
);

watch(
  Project_Data_ST_P5,
  (newVal) => {
    //console.log("--- Checking Project_Data_P5 ---");

    // 1. ตรวจ assessmentMethods: ต้องมีอย่างน้อย 1 ตัวที่ checked
    const assessment = Object.values(newVal.assessmentMethods);
    const isAssessmentChecked = assessment.some((method) => method.checked);
    if (!isAssessmentChecked) {
      //console.log("❌ No assessment method is checked");
      isCanGo.value = false;
      return;
    }
    //console.log("✅ At least one assessment method is checked");

    // ถ้า others ถูกเลือก value ต้องไม่ว่าง
    if (
      newVal.assessmentMethods.others.checked &&
      !newVal.assessmentMethods.others.value?.trim()
    ) {
      //console.log("❌ assessmentMethods.others is checked but value is empty");
      isCanGo.value = false;
      return;
    }
    if (newVal.assessmentMethods.others.checked) {
      //console.log("✅ assessmentMethods.others:", newVal.assessmentMethods.others.value);
    }

    // 2. ตรวจ followUpMethods: ต้องมีอย่างน้อย 1 ตัวที่ checked
    const followUp = Object.values(newVal.followUpMethods);
    const isFollowUpChecked = followUp.some((method) => method.checked);
    if (!isFollowUpChecked) {
      //console.log("❌ No follow-up method is checked");
      isCanGo.value = false;
      return;
    }
    //console.log("✅ At least one follow-up method is checked");

    // ถ้า otherDetails ถูกเลือก value ต้องไม่ว่าง
    if (
      newVal.followUpMethods.otherDetails.checked &&
      !newVal.followUpMethods.otherDetails.value?.trim()
    ) {
      //console.log("❌ followUpMethods.otherDetails is checked but value is empty");
      isCanGo.value = false;
      return;
    }
    // if (newVal.followUpMethods.otherDetails.checked) {
    //   //console.log(
    //     "✅ followUpMethods.otherDetails:",
    //     newVal.followUpMethods.otherDetails.value
    //   );
    // }

    // 3. ตรวจ followUpDuration
    if (!newVal.followUpDuration.startDate?.trim()) {
      //console.log("❌ followUpDuration.startDate is empty");
      isCanGo.value = false;
      return;
    }
    //console.log("✅ followUpDuration.startDate:", newVal.followUpDuration.startDate);

    if (!newVal.followUpDuration.endDate?.trim()) {
      //console.log("❌ followUpDuration.endDate is empty");
      isCanGo.value = false;
      return;
    }
    //console.log("✅ followUpDuration.endDate:", newVal.followUpDuration.endDate);

    if (newVal.followUpDuration.endDate?.trim() < newVal.followUpDuration.startDate?.trim()) {
      isCanGo.value = false;
      return;
    }

    if (newVal.followUpDuration.endDate?.trim() === newVal.followUpDuration.startDate?.trim()) {
      isCanGo.value = false;
      return;
    }

    // 4. ตรวจ projectImpact
    const impact = newVal.projectImpact;
    if (!impact.description?.trim()) {
      //console.log("❌ projectImpact.description is empty");
      isCanGo.value = false;
      return;
    }

    if (impact.description !== "report" && impact.file == null) {
      //console.log('❌ projectImpact.file is required when description is not "report"');
      isCanGo.value = false;
      return;
    }

    //console.log("✅ projectImpact is valid");

    // ✅ ทุกอย่างผ่าน
    //console.log("🎉 All fields in Project_Data_P5 are valid, isCanGo = true");
    isCanGo.value = true;
  },
  { deep: true, immediate: true }
);

const submitForm = async () => {
  loading.value = true
  await submitFile(); 
  await autoSave();
  nextStep();
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
  //console.log("Project id:", project_id.value);
  //console.log("Project Type:", project_type.value);
  //console.log("user_id:", user_id.value);

  if (project_id.value && project_type.value) {
    fetchExistingFile();
  }
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
.circle-input {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid white;
}

.beautiful-box {
  height: 50px !important;
  border-radius: 6px !important;
}
</style>
