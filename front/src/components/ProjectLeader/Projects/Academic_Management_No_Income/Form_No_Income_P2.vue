<template>
  <div>
    <NavbarProject class="fixed-top" propText="โครงการบริการวิชาการที่ไม่มีรายได้" />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
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
            <p>ส่วนที่ 2 ลักษณะของโครงการเเละประเด็นด้าน SDGs</p>
          </div>
          <div></div>
          <div class="mb-2">
            <p class="text-white fs-5">
              ประเภทของโครงการ
              <span class="text-white-50 fs-6"
                >(เลือกได้มากกว่า 2 ประเภท หากลักษณะโครงการเป็นแบบบูรณาการ)</span
              >
            </p>
            <!-- <p class="text-white">ประเภทของโครงการ: {{ Project_Data_P2.project_type }}</p> -->
            <div class="container">
              <div class="row row-cols-2 g-0 gy-3 justify-content-between">
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    type="checkbox"
                    v-model="Project_Data_P2.project_type.study.checked"
                    id="study"
                  />
                  <label class="form-check-label text-white mx-2" for="study"
                    >สำรวจ/ศึกษา/เก็บความรู้</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    type="checkbox"
                    v-model="Project_Data_P2.project_type.laps.checked"
                    id="lap"
                  />
                  <label class="form-check-label text-white mx-2" for="lap"
                    >อบรมเชิงปฏิบัติการ</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    type="checkbox"
                    v-model="Project_Data_P2.project_type.lecture.checked"
                    id="lecture"
                  />
                  <label class="form-check-label text-white mx-2" for="lecture"
                    >บรรยายให้ความรู้</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    type="checkbox"
                    v-model="Project_Data_P2.project_type.comment.checked"
                    id="comment"
                  />
                  <label class="form-check-label text-white mx-2" for="comment"
                    >ระดมความคิดเห็น</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <!--ส่วนที่2-->
            <p class="text-white fs-5">
              ประเด็นของการบริการวิชาการ
              <span class="text-white-50 fs-6"
                >(เลือกได้มากกว่า 2 ประเภท หากลักษณะโครงการเป็นแบบบูรณาการ)</span
              >
            </p>
            <!-- <p class="text-white">ประเด็นของการบริการวิชาการ: {{ Project_Data_P2.academicServiceIssues }}</p> -->
            <div class="container">
              <div class="row row-cols-2 g-0 gy-3 justify-content-between">
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    v-model="Project_Data_P2.academicServiceIssues.social_education.checked"
                    type="checkbox"
                    id="Social"
                    value="ด้านสังคม/การศึกษา"
                  />
                  <label class="form-check-label text-white mx-2" for="Social/Education"
                    >ด้านสังคม/การศึกษา</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    v-model="Project_Data_P2.academicServiceIssues.medical_health.checked"
                    type="checkbox"
                    id="Medical"
                    value="ด้านการเเพทย์/ด้านสาธารณสุข"
                  />
                  <label class="form-check-label text-white mx-2" for="Medical"
                    >ด้านการเเพทย์/ด้านสาธารณสุข</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    v-model="Project_Data_P2.academicServiceIssues.economy_career.checked"
                    type="checkbox"
                    id="Economic"
                    value="ด้านเศรษฐกิจ/อาชีพ"
                  />
                  <label class="form-check-label text-white mx-2" for="Economic"
                    >ด้านเศรษฐกิจ/อาชีพ</label
                  >
                </div>
                <div class="col d-flex align-items-center">
                  <input
                    class="form-check-input me-2 circle-input"
                    v-model="Project_Data_P2.academicServiceIssues.environment.checked"
                    type="checkbox"
                    id="Environment"
                    value="ด้านสิ่งเเวดล้อม"
                  />
                  <label class="form-check-label text-white mx-2" for="Environment"
                    >ด้านสิ่งเเวดล้อม</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2 mt-3">
            <!--ส่วนที่ 3-->
            <p class="text-white fs-5">
              ความสอดคล้องกับเป้าหมายการพัฒนาที่ยั่งยืน<span class="text-white-50 fs-6">
                (Sustainable Development Goals: SDGs)</span
              >
              <span class="text-white-50 fs-6 block" style="display: block"
                >(สามารถเลือกได้มากกว่า 1 ข้อ)</span
              >
            </p>
            <div class="container">
              <div class="row d-flex flex-column">
                <div
                  v-for="(sdg, index) in sdgs"
                  :key="sdg.id"
                  class="col-12 d-flex flex-wrap align-items-center mb-3"
                >
                  <div class="d-flex align-items-center mx-3">
                    <input
                      class="form-check-input circle-input"
                      type="checkbox"
                      :id="sdg.id"
                      v-model="sdg.isCheck"
                      @change="updateSelectedSDGs(sdg)"
                    />
                  </div>

                  <label class="d-flex align-items-center flex-grow-1" :for="sdg.id">
                    <img
                      :src="sdg.img_order_path"
                      class="sdg-img me-2 rounded"
                      alt="SDGs"
                      @mouseover="showPopup = index"
                      @mousemove="handleMouseMove($event, index)"
                      @mouseleave="showPopup = null"
                    />

                    <div class="flex-grow-1">
                      <span class="text-white"> {{ index + 1 + ". " + sdg.topic }} </span>
                      <!-- <input type="text" class="form-control mt-2 custom-input" v-model="sdg.value"  @input="updateSDGValue(sdg)"  :disabled="!sdg.isCheck"
                            placeholder="อธิบายความสอดคล้องของโครงการกับเป้าหมายการพัฒนาที่ยั่งยืนข้อนี้" :class="{ 'is-invalid': sdg.isCheck && sdg.required && !sdg.value }" >
                            <div v-if="sdg.isCheck && sdg.required && !sdg.value" class="invalid-feedback">
                              กรุณากรอกข้อมูล
                            </div> -->
                      <textarea
                        type="text"
                        class="form-control mt-2 custom-input"
                        v-model="sdg.value"
                        @input="updateSDGValue(sdg)"
                        :disabled="!sdg.isCheck"
                        placeholder="อธิบายความสอดคล้องของโครงการกับเป้าหมายการพัฒนาที่ยั่งยืนข้อนี้"
                        :class="{ 'is-invalid': sdg.isCheck && sdg.required && !sdg.value }"
                        rows="1"
                      ></textarea>
                      <div
                        v-show="sdg.isCheck && sdg.required && !sdg.value"
                        class="invalid-feedback"
                      >
                        กรุณากรอกข้อมูล
                      </div>
                    </div>
                  </label>

                  <div v-if="showPopup === index" class="popup" :style="popupStyle">
                    {{ sdg.pop_info }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6 d-flex justify-content-end">
              <button
                class="btn btn-secondary"
                style="width: 140px"
                :disabled="currentStep === 1"
              >
                <router-link
                  class="text-white text-decoration-none"
                  @click="nextStep"
                  :to="{
                    path: '/pl/no_income/p_1',
                    query: { project_id: project_id || '', project_type: 1 },
                  }"
                  >ย้อนกลับ</router-link
                >
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
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import { ref, reactive, watch, onMounted, watchEffect, onUnmounted } from "vue";
import parseJwt from "../../../../../utils/DecodeToken";
import ProgressBar from "@/components/ProgressBar.vue";
import NavbarProject from "@/components/NavbarProject.vue";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const router = useRouter();
const loading = ref(false)
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

const currentStep = ref(2);
const showPopup = ref(false);

let project_id = ref(null);
let project_type = ref(null);
let user_id = ref(null);
let affiliation_id = ref(null);

const mousePosition = ref({ x: 0, y: 0 });
const popupStyle = ref({});

let isInitialized = false;
let canEdit = false;
let isCanGo = false;

const sdgs = reactive([
  {
    id: 'SDG1',
    topic: 'No Poverty',
    pop_info: `เป้าหมายที่ 1: ยุติความยากจนทุกรูปแบบในทุกที่ (End poverty in all its forms everywhere)`,
    img_order_path: '/img/SDGs/SDG-Goal-01.png',
    // selected: true,
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG2',
    topic: 'Zero Hunger',
    pop_info: `เป้าหมายที่ 2: ยุติความหิวโหย บรรลุความมั่นคงทางอาหาร และโภชนาการที่ดี (End hunger, achieve food security and improved nutrition, and promote sustainable agriculture)`,
    img_order_path: '/img/SDGs/SDG-Goal-02.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG3',
    topic: 'Good Health and Well-Being',
    pop_info: `เป้าหมายที่ 3: สร้างหลักประกันให้มีสุขภาพที่ดีและความเป็นอยู่ที่ดีของทุกคนในทุกช่วงวัย (Ensure healthy lives and promote well-being for all at all ages)`,
    img_order_path: '/img/SDGs/SDG-Goal-03.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG4',
    topic: 'Quality Education',
    pop_info: `เป้าหมายที่ 4: สร้างหลักประกันว่าทุกคนได้รับการศึกษาที่มีคุณภาพอย่างครอบคลุมและเสมอภาค (Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-04.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG5',
    topic: 'Gender Equality',
    pop_info: `เป้าหมายที่ 5: บรรลุความเสมอภาคระหว่างเพศ และเพิ่มพลังอำนาจให้แก่ผู้หญิงและเด็กหญิงทุกคน (Achieve gender equality and empower all women and girls)`,
    img_order_path: '/img/SDGs/SDG-Goal-05.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG6',
    topic: 'Clean Water and Sanitation',
    pop_info: `เป้าหมายที่ 6: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงน้ำและสุขาภิบาลที่ถูกสุขลักษณะ (Ensure availability and sustainable management of water and sanitation for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-06.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG7',
    topic: 'Affordable and Clean Energy',
    pop_info: `เป้าหมายที่ 7: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงพลังงานสมัยใหม่ที่มั่นคงและยั่งยืน (Ensure access to affordable, reliable, sustainable and modern energy for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-07.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG8',
    topic: 'Decent Work and Economic Growth',
    pop_info: `เป้าหมายที่ 8: ส่งเสริมการเติบโตทางเศรษฐกิจที่ยั่งยืน และการมีงานที่เหมาะสมสำหรับทุกคน (Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-08.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG9',
    topic: 'Industry, Innovation, and Infrastructure',
    pop_info: `เป้าหมายที่ 9: พัฒนาโครงสร้างพื้นฐาน ส่งเสริมนวัตกรรม และเพิ่มขีดความสามารถด้านอุตสาหกรรม (Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation)`,
    img_order_path: '/img/SDGs/SDG-Goal-09.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG10',
    topic: 'Reduced Inequality',
    pop_info: `เป้าหมายที่ 10: ลดความเหลื่อมล้ำภายในและระหว่างประเทศ (Reduce inequality within and among countries)`,
    img_order_path: '/img/SDGs/SDG-Goal-10.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG11',
    topic: 'Sustainable Cities and Communities',
    pop_info: `เป้าหมายที่ 11: ทำให้เมืองและที่อยู่อาศัยมีความยั่งยืน (Make cities and human settlements inclusive, safe, resilient, and sustainable)`,
    img_order_path: '/img/SDGs/SDG-Goal-11.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG12',
    topic: 'Responsible Consumption and Production',
    pop_info: `เป้าหมายที่ 12: สร้างหลักประกันให้มีรูปแบบการผลิตและการบริโภคที่ยั่งยืน (Ensure sustainable consumption and production patterns)`,
    img_order_path: '/img/SDGs/SDG-Goal-12.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG13',
    topic: 'Climate Action',
    pop_info: `เป้าหมายที่ 13: ดำเนินมาตรการอย่างเร่งด่วนเพื่อลดผลกระทบจากการเปลี่ยนแปลงสภาพภูมิอากาศ (Take urgent action to combat climate change and its impacts)`,
    img_order_path: '/img/SDGs/SDG-Goal-13.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG14',
    topic: 'Life Below Water',
    pop_info: `เป้าหมายที่ 14: อนุรักษ์และใช้ประโยชน์จากทรัพยากรทางทะเลอย่างยั่งยืน (Conserve and sustainably use the oceans, seas, and marine resources)`,
    img_order_path: '/img/SDGs/SDG-Goal-14.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG15',
    topic: 'Life on Land',
    pop_info: `เป้าหมายที่ 15: ปกป้องและฟื้นฟูระบบนิเวศบนบก และหยุดยั้งการสูญเสียความหลากหลายทางชีวภาพ (Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss)`,
    img_order_path: '/img/SDGs/SDG-Goal-15.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG16',
    topic: 'Peace, Justice, and Strong Institutions',
    pop_info: `เป้าหมายที่ 16: ส่งเสริมสังคมที่สงบสุข ยุติธรรม และมีประสิทธิภาพ (Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels)`,
    img_order_path: '/img/SDGs/SDG-Goal-16.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG17',
    topic: 'Partnerships for the Goals',
    pop_info: `เป้าหมายที่ 17: เสริมสร้างวิธีการดำเนินงานและฟื้นฟูความเป็นหุ้นส่วนเพื่อการพัฒนาที่ยั่งยืน (Strengthen the means of implementation and revitalize the global partnership for sustainable development)`,
    img_order_path: '/img/SDGs/SDG-Goal-17.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  }
])

var Project_Data_P2 = reactive({
  project_type: {
    study: { checked: false, value: "สำรวจ/ศึกษา/เก็บความรู้" },
    laps: { checked: false, value: "อบรมเชิงปฏิบัติการ" },
    lecture: { checked: false, value: "บรรยายให้ความรู้" },
    comment: { checked: false, value: "ระดมความคิดเห็น" },
  },
  academicServiceIssues: {
    social_education: { checked: false, value: "ด้านสังคม/การศึกษา" },
    medical_health: { checked: false, value: "ด้านการแพทย์/ด้านสาธารณสุข" },
    economy_career: { checked: false, value: "ด้านเศรษฐกิจ/อาชีพ" },
    environment: { checked: false, value: "ด้านสิ่งแวดล้อม" },
  },
  sdgs: [],
});

const handleMouseMove = (event, index) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  };
  popupStyle.value = {
    left: `${mousePosition.value.x + 15}px`,
    top: `${mousePosition.value.y + 15}px`,
    position: "fixed",
  };
  showPopup.value = index;
};

const updateSelectedSDGs = (sdg) => {
  if (sdg.isCheck) {
    if (!Project_Data_P2.sdgs.some((item) => item.id === sdg.id)) {
      Project_Data_P2.sdgs.push({
        id: sdg.id,
        topic: sdg.topic,
        is_check: true,
        value: sdg.value,
      });
    }
  } else {
    Project_Data_P2.sdgs = Project_Data_P2.sdgs.filter((item) => item.id !== sdg.id);
  }
};

const updateSDGValue = (sdg) => {
  if (sdg.isCheck) {
    const existingSDG = Project_Data_P2.sdgs.find((item) => item.id === sdg.id);
    if (existingSDG) {
      existingSDG.value = sdg.value;
    } else {
      Project_Data_P2.sdgs.push({
        id: sdg.id,
        topic: sdg.topic,
        is_check: true,
        value: sdg.value,
      });
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
    const response = await axios.post("http://localhost:5000/pl/get/p_2", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data = JSON.parse(response.data.data[0].project_data_p_2);
    //console.log("data", project_data);
    if (project_data != null) {
      Project_Data_P2.project_type = project_data.project_type;
      Project_Data_P2.academicServiceIssues = project_data.academicServiceIssues;
      Project_Data_P2.sdgs = project_data.sdgs;
      isCanGo = true;
    } else {
      isCanGo = false;
    }
    // //console.log('sending a request to fetch editing data project id = ',project_id)
  } catch (err) {
    //console.log(err);
    //console.log("error fetching editing data = ", project_id.value);
  }
};

const autoSave = debounce(async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/p_2/no_income/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_P2,
      project_affiliation: affiliation_id.value,
    });

    //console.log("response", response.data);

    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log("project_id", project_id.value);
      router.replace({
        path: "/pl/no_income/p_3",
        query: { project_id: project_id.value || "", project_type: 1 },
      });
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
      })
      await setTimeout(() => {
                loading.value = false
              }, 500);
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
}, 3000);

const submitForm = async () => {
  loading.value = true
  await autoSave();
  nextStep();
};

function isProject_Data_P2_Valid(oldVal, newVal) {
  const hasProjectType = Object.values(newVal.project_type).some((item) => item.checked);
  const hasAcademicIssue = Object.values(newVal.academicServiceIssues).some(
    (item) => item.checked
  );
  const sdgs = newVal.sdgs;
  const hasSdgs = Array.isArray(sdgs) && sdgs.length > 0;
  const hasEmptyCheckedSdg =
    hasSdgs && sdgs.some((sdg) => sdg.is_check && (!sdg.value || sdg.value.trim() === ""));
  return hasProjectType && hasAcademicIssue && hasSdgs && !hasEmptyCheckedSdg;
}

watch(
  Project_Data_P2,
  (newVal, oldVal) => {
    if (isInitialized && !canEdit) return;
    isCanGo = isProject_Data_P2_Valid(oldVal, newVal);
  },
  { deep: true,immediate: true }
);


// watch(() => Project_Data_P2.sdgs, (newVal, oldVal) => {
//   //console.log('Updated SDGs:', newVal);
// }, { deep: true })

watchEffect(() => {
  sdgs.forEach((sdg) => {
    const matched = Project_Data_P2.sdgs.find((selected) => selected.id === sdg.id);
    sdg.isCheck = !!matched;
    sdg.value = matched ? matched.value : "";
  });
});

onMounted(async () => {
  const route = useRoute();
  const user = parseJwt(cookies.get("accesstoken"));
  user_id.value = user.user_id;
  affiliation_id.value = user.affiliation_id;

  if (route.query.project_type) {
    project_type.value = route.query.project_type;
  }

  if (route.query.project_id) {
    project_id.value = route.query.project_id;
    isInitialized = true;
    canEdit = false;
    await getDataWhenProjectID();
    canEdit = true;
  } else {
    isInitialized = true;
    canEdit = true;
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

<style scoped>
.form-check-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-check-input {
  transform: scale(1.5);
}

.block {
  display: block;
}

.custom-input {
  max-width: 100%;
  min-width: 300px;
}
.image-container {
  position: relative;
  display: inline-block;
}

.sdg-img {
  width: 70px;
  height: 70px;
}

.circle-input {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}

.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.918);
  z-index: 1000;
  color: white;
  padding: 10px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  pointer-events: none;
}
</style>
