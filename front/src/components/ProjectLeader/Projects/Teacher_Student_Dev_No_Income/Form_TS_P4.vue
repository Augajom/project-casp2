<template>
  <div>
    <NavbarProject class="fixed-top " propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน"
    />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep"
    />
    <Loader v-if="loading" />
    <div class="container-fluid" style="margin-top: 250px;">
      <div class="d-flex justify-content-center">
        <div class=" d-flex flex-column  border px-5 shadow p-3 mb-5 " style="max-width: 1200px;min-width: 1200px; background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 my-3">
            <p>
              ส่วนที่ 4 แผนการดำเนินงานและกลุ่มเป้าหมาย
            </p>
          </div>
          <div class="mb-3">
            <label class="fs-4 fw-light text-white " for="">
              <b>
                ระยะเวลาการดำเนินการ
              </b>
            </label>
            <div class="row mt-3">
              <div class="col-6">
                <div class="d-flex  flex-column">
                  <div>
                    <div class="text-center">
                      <label class="text-white" for="startDate">
                        ระยะเวลาเริ่มต้น
                      </label>
                    </div>
                    <div>
                      <input type="date" class="form-control text-center fw-light text-muted beautiful-box"
                      v-model="Project_Data_TS_P4.startDate">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex  flex-column">
                  <div>
                    <div class="text-center">
                      <label class="text-white" for="end_date">
                        ระยะเวลาสิ้นสุด
                      </label>
                    </div>
                    <div>
                      <input type="date" class="form-control text-center fw-light text-muted beautiful-box"
                      v-model="Project_Data_TS_P4.endDate">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="text-white" for="">
              <span class="fs-4 fw-light">
                <b>
                  สถานที่จัดโครงการ
                </b>
              </span>
              <span class="fw-light">
                (ให้ระบุสถานที่จัดให้ชัดเจน เช่น ห้องประชุมของอาคาร ห้องประชุมของหน่วยงาน
                หรือ ชื่อสถานที่จัด)
              </span>
            </label>
            <input class="form-control mt-3 beautiful-box" type="text" v-model="Project_Data_TS_P4.detail_venue"
            placeholder="ระบุสถานที่" aria-label="default input example">
          </div>
          <div class="mb-3 mt-2">
            <label class=" fw-light text-white " for="multipleSessions">
              <span class="fs-4">
                <b>
                  กรณีดำเนินโครงการมากกว่า 1 ครั้ง
                </b>
              </span>
              <span>
                (ให้ระบุสถานที่ เเละ ระยะเวลาเริ่มดำเนินการ) ตัวอย่าง ห้อง E4A-507 (2-3
                มิ.ย. 2568)
              </span>
            </label>
            <div class="mt-3">
              <div v-for="(session, index) in Project_Data_TS_P4.multipleSessions" :key="index">
                <div class="row mt-3 " @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                  <div :class="index === 0 ? 'col-6' : hoveredIndex === index ? 'col-5' : 'col-6'">
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
                  <div :class="index === 0 ? 'col-6' : hoveredIndex === index ? 'col-5' : 'col-6'">
                    <input class="form-control text-center text-muted beautiful-box" v-model="session.date"
                    type="date" />
                  </div>
                  <div v-if="index > 0" :class="hoveredIndex === index ? 'col-2 d-flex justify-content-center align-items-center' : 'd-none'">
                    <button @click.stop="decrease_multipleSession(index)" class="btn btn-danger btn-sm"
                    style="width:100px; height:30px;" :class="{ 'd-none': hoveredIndex !== index }">
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button @click="addMultipleSession" style="background-color: #0d6efd; color: white;"
              class="btn p-2 d-flex align-items-center">
                <span class="fs-3 mx text-end">
                  +
                </span>
                <span class="mx-2">
                  เพิ่มจำนวนครั้งการจัดโครงการ
                </span>
              </button>
            </div>
          </div>
          <hr class="text-white">
          <div class="mb-2">
            <p class="text-white fs-4 ">
              กลุ่มเป้าหมาย
            </p>
            <!-- <div class="d-flex me-3"> -->
            <div class="d-flex text-white align-items-center fs-5 me-2 mb-4">
              <div class="form-check">
                <input type="checkbox" id="teacher_target" class="form-check-input me-2 circle-input"
                v-model="teacherTargetChecked" @change="validateTarget('teacher')">
                <label for="teacher_target" class="form-check-label fs-5 text-white me-2"
                style="width: 80px;">
                  ครู
                </label>
              </div>
              <label class="mx-2">
                จำนวน
              </label>
              <input type="number" v-model="Project_Data_TS_P4.teacher_target.amount"
              class="form-control beautiful-box" style="width:150px" :class="{ 'is-invalid': teacherTargetChecked && !Project_Data_TS_P4.teacher_target.amount }">
              <label class="ms-2">
                คน
              </label>
              <label class="ms-2 me-3">
                ประเภทกลุ่มเป้าหมาย
              </label>
              <input type="text" v-model="Project_Data_TS_P4.teacher_target.detail"
              class="form-control beautiful-box" style="width:523px" placeholder="ระบุประเภทกลุ่มเป้าหมาย เช่น ระดับประถมศึกษา ระดับมัธยมศึกษา เป็นต้น"
              :class="{ 'is-invalid': teacherTargetChecked && !Project_Data_TS_P4.teacher_target.detail }">
              <div v-if="teacherTargetChecked && (!Project_Data_TS_P4.teacher_target.amount || !Project_Data_TS_P4.teacher_target.detail)"
              class="container w-25 text-danger fs-6 mx-3">
                กรุณากรอกจำนวนและประเภทกลุ่มเป้าหมาย
              </div>
            </div>
            <div class="d-flex text-white align-items-center fs-5 me-2">
              <div class="form-check">
                <input type="checkbox" id="student_target" class="form-check-input me-2 circle-input"
                v-model="studentTargetChecked" @change="validateTarget('student')">
                <label for="teacher_target" class="form-check-label fs-5 text-white me-2"
                style="width: 80px;">
                  นักเรียน
                </label>
              </div>
              <label class="mx-2">
                จำนวน
              </label>
              <input type="number" v-model="Project_Data_TS_P4.student_target.amount"
              class="form-control beautiful-box" style="width:150px" :class="{ 'is-invalid': studentTargetChecked && !Project_Data_TS_P4.student_target.amount }">
              <label class="ms-2">
                คน
              </label>
              <label class="ms-2 me-3">
                ประเภทกลุ่มเป้าหมาย
              </label>
              <input type="text" v-model="Project_Data_TS_P4.student_target.detail"
              class="form-control beautiful-box" style="width:523px" placeholder="ระบุประเภทกลุ่มเป้าหมาย เช่น ระดับชั้น ม.4 - ม.6 เป็นต้น"
              :class="{ 'is-invalid': studentTargetChecked && !Project_Data_TS_P4.student_target.detail }">
              <div v-if="studentTargetChecked && (!Project_Data_TS_P4.student_target.amount || !Project_Data_TS_P4.student_target.detail)"
              class="container w-25 h-25 text-danger fs-6 mx-3">
                กรุณากรอกจำนวนและประเภทกลุ่มเป้าหมาย
              </div>
            </div>
            <!-- </div> -->
            <label class="mb-2 mt-4 text-white fs-4">
              ระบุพื้นที่กลุ่มเป้าหมาย
            </label>
            <textarea v-model="Project_Data_TS_P4.target_area" class="form-control beautiful-box"
            placeholder="ระบุพื้นที่กลุ่มเป้าหมาย เช่น จังหวัดเชียงราย จังหวัดพะเยา เป็นต้น"
            rows="1">
            </textarea>
          </div>
          <div class="my-2 text-white fs-4">
            <p class="mb-1 mt-3">
              กำหนดการ
            </p>
            <div>
              <p class="text-warning" style="margin: 0.7rem 0 0 5.5rem; font-size: 16px;">
                สามารถแนบไฟล์ Word (.doc, .docx), PDF (.pdf), Excel (.xls, .xlsx) และ ขนาดไม่เกิน 10 MB.
              </p>
              <div class="d-flex">
                <div class="relative inline-block">
                  <!-- ปุ่มแทน input -->
                  <label for="file-upload" class="btn btn-sm btn-light" style="left: 90px; position: relative; margin-top: 0.5rem;">
                    แนบไฟล์
                  </label>
                  <!-- input file ซ่อน -->
                  <input id="file-upload" type="file" class="d-none" @change="handleFileChange"
                  />
                </div>
                <p class="text-white" style="margin: 0.7rem 0 0 6rem; font-size: 18px; width: 55rem;">
                  <span v-if="fileName">
                    {{ fileName }}
                  </span>
                  <span v-else>
                    ยังไม่ได้เลือกไฟล์
                  </span>
                </p>
              </div>
              <!-- แสดงชื่อไฟล์ที่เคยอัปโหลดหรือที่เลือกไว้ล่าสุด -->
              <div v-if="existingFileName">
                <p class="text-white" style="left: 90px; position: relative; margin-top: 1rem; font-size: 18px; width: 60rem;">
                  ไฟล์เดิม :
                  <a class="btn btn-sm btn-secondary" :href="`http://localhost:5000/Files/${existingFileName}`"
                  :download="existingFileName" target="_blank">
                    {{existingFileName.split('-').slice(5).join('-')}}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end">
              <!-- <router-link to="/pl/TS/p_3"> -->
              <button class="btn btn-secondary" style="width: 140px;" @click="prevStep">
                ย้อนกลับ
              </button>
              <!-- </router-link> -->
            </div>
            <div class="col-6">
              <!-- <router-link to="/pl/TS/p_5"> -->
              <button class="btn btn-success" style="width: 140px;" @click="submitForm"
              :disabled="!isCanGo">
                <span>บันทึก</span>
              </button>
              <!-- </router-link> -->
            </div>
            <div v-if="false" style="display: none;">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import parseJwt from '../../../../../utils/DecodeToken';
import axios from 'axios'
import Loader from '@/components/Loader.vue';
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

const currentStep = ref(4);
const teacherTargetChecked = ref(false);
const studentTargetChecked = ref(false);
// const hasChanges = ref(false);
const lastSaveTime = ref(0);
const isLoading = ref(false);
const hoveredIndex = ref(null);
let isCanGo = ref(false)
let loading = ref(false)

const isFormDirty = ref(false);
// const hasFetchedData = ref(false);

const Project_Data_TS_P4 = reactive({
  project_id: project_id.value || '',
  project_type: project_type.value || '',
  startDate: '',
  endDate: '',
  detail_date: '',
  detail_venue: '',
  teacher_target: { amount: '', detail: '' },
  student_target: { amount: '', detail: '' },
  target_area: '',
  attached_file: null,
  multipleSessions: [
    {
      session_id: 1,
      location: "",
      date: ""
    }
  ],
  file: null,
});

//try
const selectedFile = ref(null);
const currentFileNameToShow = ref('');
const existingFileNameFromDb = ref(null);
const fileError = ref("");

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel"
];
const MAX_SIZE_MB = 10;

// const currentFileName = computed(() => {
//   return currentFile.value?.name || (Project_Data_TS_P4.attached_file ? Project_Data_TS_P4.attached_file.split('-').slice(5).join('-') : '');
// });

//Upload File
const files = ref([]);
const fileName = ref('')
const pageName = 'page4' // อย่าลืมเปลี่ยนตามหน้าที่เอาไปวางเพื่ออิงหน้านั้นๆ

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
  Project_Data_TS_P4.file = validFiles.length > 0 ? validFiles[0] : null; // อย่าลืมเปลี่ยนชื่อให้ตรงกับ data ที่เก็บ ในที่นี้คือ Project_Data_P7

  // อัพเดทชื่อไฟล์แรกถ้ามี
  fileName.value = validFiles.length > 0 ? validFiles[0].name : '';
};

const submitFile = async () => {
  if (files.value.length === 0 && !existingFileName.value) {
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `กรุณาเลือกไฟล์ก่อน`,
    });
    return;
  }

  const formData = new FormData();
  if (files.value.length > 0) {
    formData.append("file", files.value[0]);
    } else if (existingFileName.value) {
    // If no new file selected but an existing one is present, skip file submission.
    // This prevents unnecessary uploads if the user only viewed the page.
    return;
  } else {
    return; // Should not happen if validation works
  }

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
      Project_Data_TS_P4.attached_file = response.data.file.filename;
	
      // if (existingFileName.value) {
      //     Project_Data_TS_P4.file = { name: existingFileName.value };
      //   }
        existingFileName.value = response.data.file.filename;
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
    //console.log('📂 Fetched existing file:', res.data.file);
    existingFileName.value = res.data.file;

    if (existingFileName.value) {
      fileName.value = existingFileName.value.split('-').slice(5).join('-');
    }
    
  } catch (err) {
    console.error("ไม่สามารถโหลดไฟล์เดิม:", err);
  }
};

// Load existing file when page opens
// onMounted(async () => {
//   if (project_id.value) {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/pl/file/display?projectId=${project_id.value}&projectType=${project_type.value}&page=page4`
//       );
//       existingFileName.value = res.data.file;
//     } catch (err) {
//       existingFileName.value = null;
//     }
//   }
// });

//end of try

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


//logic frontend
const multipleSessions_limits = 6
const is_multipleSession_limit = ref(false)
const addMultipleSession = () => {
  if (Project_Data_TS_P4.multipleSessions.length >= multipleSessions_limits) {
    is_multipleSession_limit.value = true;
    return
  }

  Project_Data_TS_P4.multipleSessions.push(
    {
      session_id: Project_Data_TS_P4.multipleSessions.length + 1,
      location: "",
      date: "",
    }
  )

  if (Project_Data_TS_P4.multipleSessions.length >= multipleSessions_limits) {
    is_multipleSession_limit.value = true;
  }
}

const decrease_multipleSession = (index) => {
  if (Project_Data_TS_P4.multipleSessions.length > 1) {
    Project_Data_TS_P4.multipleSessions.splice(index, 1);

    Project_Data_TS_P4.multipleSessions.forEach((obj, i) => {
      obj.session_id = i + 1
    })

    if (Project_Data_TS_P4.multipleSessions.length < multipleSessions_limits) {
      is_multipleSession_limit.value = false;
    }
  }
}


const validateTarget = (type) => {
  if (type === 'teacher') {
    if (!teacherTargetChecked.value) {
      Project_Data_TS_P4.teacher_target.amount = '';
      Project_Data_TS_P4.teacher_target.detail = '';
    }
  } else if (type === 'student') {
    if (!studentTargetChecked.value) {
      Project_Data_TS_P4.student_target.amount = '';
      Project_Data_TS_P4.student_target.detail = '';
    }
  }
};
// end of logic frontend

const validateForm = () => {

  // Validate required fields
  if (!Project_Data_TS_P4.detail_venue?.trim()) {
    return false;
  }

  if (!Project_Data_TS_P4.startDate) {
    return false;
  }

  if (!Project_Data_TS_P4.endDate) {
    return false;
  }

  if (Project_Data_TS_P4.startDate === Project_Data_TS_P4.endDate) {
    return false;
  }

  if (!Project_Data_TS_P4.target_area?.trim()) {
    return false;
  }

  // Validate at least one target group is selected
  if (!teacherTargetChecked.value && !studentTargetChecked.value) {
    return false;
  } else {
    // Validate teacher target if checked
    if (teacherTargetChecked.value) {
      if (!Project_Data_TS_P4.teacher_target.amount) {
        return false;
      }
      if (!Project_Data_TS_P4.teacher_target.detail?.trim()) {
        return false;
      }
    }

    // Validate student target if checked
    if (studentTargetChecked.value) {
      if (!Project_Data_TS_P4.student_target.amount) {
        return false;
      }
      if (!Project_Data_TS_P4.student_target.detail?.trim()) {
        return false;
      }
    }
  }

  // Validate date range
  if (Project_Data_TS_P4.startDate && Project_Data_TS_P4.endDate) {
    const startDate = new Date(Project_Data_TS_P4.startDate);
    const endDate = new Date(Project_Data_TS_P4.endDate);

    if (startDate > endDate) {
      return false;
    }
  }

  // Validate multiple sessions if they exist
  if (Project_Data_TS_P4.multipleSessions.length > 1) {
  const hasInvalidSession = Project_Data_TS_P4.multipleSessions.some(session => {
    return !session.location?.trim() || !session.date;
  });
  if (hasInvalidSession) return false;
}

  if (Project_Data_TS_P4.file === null && existingFileName.value === null) {
  return false;
}
  return true;
};

onMounted(async () => {
  const user = parseJwt(cookies.get('accesstoken'))
  user_id.value = user.user_id
  affiliation_id.value = user.affiliation_id

  if (route.query.project_type) {
    project_type.value = route.query.project_type
  }

  if (route.query.project_id) {
    project_id.value = route.query.project_id
    await getProjectData() // This will now correctly load existing form data and file name
  } else {
    Swal.fire('Error', 'ไม่พบรหัสโครงการ', 'error');
    router.push({ path: '/pl/TS/p_3' });
  }

  if (project_id.value && project_type.value) {
    fetchExistingFile();
  }
})

const getProjectData = async () => { 
  try {
    isLoading.value = true;
    //console.log("Fetching project data for P4...");

    const response = await axios.post('http://localhost:5000/pl/TS/get/p_4', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value
    });

    // Fix structure here
     let projectData = response.data?.data?.data?.project_data_p_4 || {};

    // IMPORTANT: Parse the JSON string if it's a string
    if (typeof projectData === 'string') {
      try {
        projectData = JSON.parse(projectData);
      } catch (parseError) {
        console.error('Error parsing project_data_p_4 JSON from backend:', parseError);
        // Fallback to empty object if parsing fails to prevent further errors
        projectData = {};
      }
    } else if (typeof projectData !== 'object' || projectData === null) {
        // Ensure fetchedProjectData is an object or initialize it as an empty object
        projectData = {};
    }

    //console.log("Processed Project Data:", projectData);

    const updates = {
      startDate: projectData.startDate || '',
      endDate: projectData.endDate || '',
      detail_venue: projectData.detail_venue || '',
      target_area: projectData.target_area || '',
      teacher_target: {
        amount: projectData.teacher_target?.amount || '',
        detail: projectData.teacher_target?.detail || ''
      },
      student_target: {
        amount: projectData.student_target?.amount || '',
        detail: projectData.student_target?.detail || ''
      },
      attached_file: projectData.attached_file || null,
      multipleSessions: projectData.multipleSessions?.length
        ? projectData.multipleSessions.map((session, index) => ({
            session_id: index + 1,
            location: session.location || "",
            date: session.date || ""
          }))
        : [{ session_id: 1, location: "", date: "" }]
    };

    Object.assign(Project_Data_TS_P4, updates);

    teacherTargetChecked.value = !!projectData.teacher_target?.amount;
    studentTargetChecked.value = !!projectData.student_target?.amount;

    //console.log("Final Form State:", Project_Data_TS_P4);
  } catch (error) {
    console.error('Error loading project data:', error);
    Toast.fire({
      icon: 'error',
      title: 'Error loading project data',
      text: error.message
    });
  } finally {
    isLoading.value = false;
  }
};


const autoSave = async () => {
  if (isLoading.value) return false;
  isLoading.value = true;

  try {
    const dataToSave = {
      ...Project_Data_TS_P4,
      // Project_Data_TS_P4.attached_file already holds the correct value
      teacher_target: teacherTargetChecked.value ? Project_Data_TS_P4.teacher_target : { amount: '', detail: '' },
      student_target: studentTargetChecked.value ? Project_Data_TS_P4.student_target : { amount: '', detail: '' },
    };

    const response = await axios.post('http://localhost:5000/pl/TS/p_4/save', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: dataToSave // This will now include Project_Data_TS_P4.attached_file
    });

    if (response.data.success) {
      lastSaveTime.value = Date.now();
      isFormDirty.value = false;
      return true;
    } else {
      throw new Error(response.data.message || 'Save failed from server');
    }
  } catch (error) {
    console.error('Auto-save failed:', error);
    return false;
  } finally {
    isLoading.value = false;
  }
};


const debouncedAutoSave = debounce(async () => {

  if (isFormDirty.value && !isLoading.value) {
    try {
      const saved = await autoSave();
      if (saved) {
        Toast.fire({
          icon: 'success',
          title: `บันทึกอัตโนมัติสำเร็จ`,
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: `บันทึกอัตโนมัติไม่สำเร็จ`,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: `บันทึกอัตโนมัติไม่สำเร็จ: ${error.message || ''}`,
      });
    }
  }
}, 3000);


const submitForm = async () => {
   loading.value = true
  try {
    const formDataSaved = await autoSave();

    if (!formDataSaved) {
      throw new Error('ไม่สามารถบันทึกข้อมูลแบบฟอร์มได้');
    }

    Toast.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลและไฟล์สำเร็จ!'
    })
    await setTimeout(() => {
                loading.value = false
              }, 500);
    submitFile();
    nextStep();
  } catch (error) {
    console.error('Form submission error:', error);
    Swal.fire({
      icon: "error",
      title: "บันทึกไม่สำเร็จ",
      text: error.message
    });
  }
};

watch([
  () => Project_Data_TS_P4.startDate,
  () => Project_Data_TS_P4.endDate,
  () => Project_Data_TS_P4.detail_venue,
  () => Project_Data_TS_P4.target_area,
  () => teacherTargetChecked.value,
  () => studentTargetChecked.value,
  () => Project_Data_TS_P4.teacher_target.amount,
  () => Project_Data_TS_P4.teacher_target.detail,
  () => Project_Data_TS_P4.student_target.amount,
  () => Project_Data_TS_P4.student_target.detail,
  () => Project_Data_TS_P4.multipleSessions,
  () => Project_Data_TS_P4.file,
  () => existingFileName.value,
], () => {
  isCanGo.value = validateForm();
}, { deep: true });

const nextStep = () => {
  router.push({
    path: '/pl/TS/p_5',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  });
};

const prevStep = () => {
  router.push({
    path: '/pl/TS/p_3',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
};

// watch(Project_Data_TS_P4, () => {
//   if (!isLoading.value) {
//     isFormDirty.value = true;
//   }
//   debouncedAutoSave();
// }, { deep: true });

// watch(selectedFile, () => {
//   if (!isLoading.value) {
//     isFormDirty.value = true;
//   }
//   debouncedAutoSave();
// });
// watch(existingFileName, () => {
//   if (!isLoading.value) {
//     isFormDirty.value = true;
//     debouncedAutoSave();
//   }
// })

</script>

<style lang="css" scoped>
.beautiful-box {
  min-height: 50px;
  border-radius: 6px;
  resize: vertical;
}

.form-check-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-check-input {
  transform: scale(1.5);
}

.file-upload-container {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;
  width: 300px;
}

.file-upload-label {
  display: flex;
  align-items: center;
  color: #374375;
  font-size: 16px;
}

.file-upload-label .material-icons {
  margin-right: 8px
}

.file-input {
  display: none;
}

.circle-input {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}
</style>