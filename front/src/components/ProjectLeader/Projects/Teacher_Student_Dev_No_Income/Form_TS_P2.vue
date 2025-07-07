<template>
  <div>
    <NavbarProject
      class="fixed-top"
      propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน"
    />
    <ProgressBar
      class="fixed-top border"
      :step="currentStep"
      @update:step="currentStep"
    />
    <Loader v-if="loading" />
    <div class="container-fluid" style="margin-top: 250px">
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
          <div class="row text-white my-1 mt-3">
            <p class="fs-3">ส่วนที่ 2 ลักษณะของโครงการและประเด็น SDGs</p>
            <p class="fs-4">
              ความสอดคล้องกับวัตถุประสงค์ของมูลนิธิมหาวิทยาลัยแม่ฟ้าหลวงเพื่อการพัฒนาครูชนบท
              <span class="text-white-50 fs-6 block" style="display: block"
                >(สามารถเลือกได้มากกว่า 1 ข้อ)</span
              >
            </p>
            <!-- <p>(สามารถเลือกได้มากกว่า 1 ข้อ)</p> -->
          </div>
          <div class="mb-2">
            <!-- <div class="container"> -->
            <div class="" v-for="(option, index) in options1" :key="index">
              <div class="col d-flex align-items-center my-2">
                <input
                  class="form-check-input me-4 circle-input"
                  type="checkbox"
                  :id="option.id"
                  v-model="option.checked"
                />
                <label class="form-check-label text-white" :for="option.id">{{
                  option.label
                }}</label>
              </div>
              <input
                v-if="
                  option.checked &&
                  option.id !== 'promoteVolunteer' &&
                  option.id !== 'nonPolitics'
                "
                type="text"
                v-model="option.description"
                class="form-control"
                style="width: 63rem; margin-left: 2.5rem"
                :class="{ 'is-invalid': option.checked && !option.description.trim() }"
                placeholder="โปรดระบุเหตุผล"
              />
            </div>

            <div class="text-white mt-4">
              <p class="fs-4">
                สาระวิชาที่เกี่ยวข้อง
                <span class="text-white-50 fs-6 block" style="display: block"
                  >(สามารถเลือกได้มากกว่า 1 สาระวิชา)</span
                >
              </p>
              <!-- <p>(สามารถเลือกได้มากกว่า 1 สาระวิชา)</p> -->
            </div>

            <div class="row">
              <div
                class="col col-6 d-flex align-items-center my-2"
                v-for="(option, index) in options2"
                :key="index"
              >
                <input
                  class="form-check-input me-4 circle-input"
                  type="checkbox"
                  :id="option.id"
                  v-model="option.checked"
                />
                <label class="form-check-label text-white" :for="option.id">{{
                  option.label
                }}</label>
                <input
                  v-if="option.id === 'other_subject' && option.checked"
                  v-model="options2[options2.length - 1].description"
                  type="text"
                  class="form-control ms-2"
                  :class="{ 'is-invalid': option.checked && !option.description.trim() }"
                  placeholder="โปรดระบุรายละเอียดเพิ่มเติม"
                  style="width: auto; flex: 1"
                />
              </div>
            </div>

            <div class="text-white mt-4">
              <p class="fs-5">
                ความสอดคล้องกับเป้าหมายการพัฒนาที่ยิ่งยืน
                <span class="text-white-50 fs-6">
                  (Sustainable Development Goals: SDGs)</span
                >
                <span class="text-white-50 fs-6 block" style="display: block"
                  >(สามารถเลือกได้มากกว่า 1 ข้อ)</span
                >
              </p>
              <!-- <p>(สามารถเลือกได้มากกว่า 1 ข้อ)</p> -->
            </div>
          </div>
          <div class="mb-2">
            <div class="justify-content-start">
              <div class="row d-flex flex-column">
                <div
                  v-for="(sdg, index) in sdgs"
                  :key="sdg.id"
                  class="col-12 d-flex flex-wrap align-items-center mb-3 position-relative"
                >
                  <div class="d-flex align-items-center mx-3">
                    <input
                      class="form-check-input circle-input me-2"
                      type="checkbox"
                      :id="sdg.id"
                      :value="sdg.id"
                      v-model="sdg.checked"
                      @change="validateInput(sdg)"
                    />
                  </div>
                  <label class="d-flex align-items-center flex-grow-1" :for="sdg.id">
                    <img
                      :src="sdg.img_order_path"
                      class="sdg-img me-2 rounded"
                      alt="SDGs"
                      @mousemove="handleMouseMove($event, index)"
                      @mouseover="showPopup = index"
                      @mouseleave="showPopup = null"
                    />
                    <div class="flex-grow-1">
                      <span class="text-white"> {{ index + 1 + ". " + sdg.topic }} </span>
                      <textarea
                        type="text"
                        class="form-control mt-2 custom-input"
                        v-model="sdg.description"
                        :placeholder="`อธิบายความสอดคล้องของโครงการกับเป้าหมายการพัฒนาที่ยั่งยืนข้อนี้`"
                        :class="{ 'is-invalid': sdg.required && !sdg.description }"
                        :disabled="!sdg.checked"
                        rows="1"
                      ></textarea>
                      <div
                        v-if="sdg.required && !sdg.description"
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
          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end">
              <button class="btn btn-secondary" style="width: 140px" @click="prevStep">
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
import { ref, reactive, watch, onUnmounted, onMounted } from "vue";
import parseJwt from "../../../../../utils/DecodeToken";
import Loader from "@/components/Loader.vue";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar.vue";
import NavbarProject from "@/components/NavbarProject.vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import Swal from "sweetalert2";
const router = useRouter();
const { cookies } = useCookies();
const route = useRoute();
const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

const currentStep = ref(2);
const showPopup = ref(false);
const mousePosition = ref({ x: 0, y: 0 });
const popupStyle = ref({});

let isInitialized = false;
let canEdit = false;
let isCanGo = false;
let loading = ref(false);

var Project_Data_TS_P2 = reactive({
  objectives: [],
  subjects: [],
  sdgs: [],
  other_subject: "",
});

const options1 = ref([
  {
    id: "improveTeaching",
    label: "เพื่อพัฒนาครูชนบทให้มีความรู้ความสามารถในการสอน",
    checked: false,
    description: "",
  },
  {
    id: "improveQuality",
    label: "เพื่อพัฒนาคุณภาพการศึกษาระดับโรงเรียนในรูปแบบต่างๆ",
    checked: false,
    description: "",
  },
  {
    id: "localStudent",
    label: "เพื่อนักเรียนที่อยู่ในท้องถิ่นชนบท",
    checked: false,
    description: "",
  },
  {
    id: "promoteVolunteer",
    label: "เพื่อดำเนินการส่งเสริมกิจกรรมสาธารณะ",
    checked: false,
    description: "",
  },
  {
    id: "nonPolitics",
    label: "ไม่ดำเนินการเกี่ยวข้องกับการเมือง",
    checked: false,
    description: "",
  },
]);

const options2 = ref([
  { id: "science", label: "วิชาวิทยาศาสตร์", checked: false },
  { id: "math", label: "วิชาคณิตศาสตร์", checked: false },
  { id: "thai", label: "วิชาภาษาไทย", checked: false },
  { id: "social_Sci", label: "วิชาสังคม", checked: false },
  { id: "health_edu", label: "วิชาสุขศึกษา พลศึกษา", checked: false },
  { id: "bacis_work", label: "วิชาการงานพื้นฐานอาชีพ", checked: false },
  { id: "language", label: "วิชาภาษาต่างประเทศ", checked: false },
  { id: "other_subject", label: "วิชาอื่น ๆ", checked: false, description: "" },
]);
const sdgs = ref([
  {
    id: "SDG1",
    topic: "No Poverty",
    pop_info: `เป้าหมายที่ 1: ยุติความยากจนทุกรูปแบบในทุกที่ (End poverty in all its forms everywhere)`,
    img_order_path: "/img/SDGs/SDG-Goal-01.png",
    // selected: true,
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG2",
    topic: "Zero Hunger",
    pop_info: `เป้าหมายที่ 2: ยุติความหิวโหย บรรลุความมั่นคงทางอาหาร และโภชนาการที่ดี (End hunger, achieve food security and improved nutrition, and promote sustainable agriculture)`,
    img_order_path: "/img/SDGs/SDG-Goal-02.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG3",
    topic: "Good Health and Well-Being",
    pop_info: `เป้าหมายที่ 3: สร้างหลักประกันให้มีสุขภาพที่ดีและความเป็นอยู่ที่ดีของทุกคนในทุกช่วงวัย (Ensure healthy lives and promote well-being for all at all ages)`,
    img_order_path: "/img/SDGs/SDG-Goal-03.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG4",
    topic: "Quality Education",
    pop_info: `เป้าหมายที่ 4: สร้างหลักประกันว่าทุกคนได้รับการศึกษาที่มีคุณภาพอย่างครอบคลุมและเสมอภาค (Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all)`,
    img_order_path: "/img/SDGs/SDG-Goal-04.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG5",
    topic: "Gender Equality",
    pop_info: `เป้าหมายที่ 5: บรรลุความเสมอภาคระหว่างเพศ และเพิ่มพลังอำนาจให้แก่ผู้หญิงและเด็กหญิงทุกคน (Achieve gender equality and empower all women and girls)`,
    img_order_path: "/img/SDGs/SDG-Goal-05.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG6",
    topic: "Clean Water and Sanitation",
    pop_info: `เป้าหมายที่ 6: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงน้ำและสุขาภิบาลที่ถูกสุขลักษณะ (Ensure availability and sustainable management of water and sanitation for all)`,
    img_order_path: "/img/SDGs/SDG-Goal-06.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG7",
    topic: "Affordable and Clean Energy",
    pop_info: `เป้าหมายที่ 7: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงพลังงานสมัยใหม่ที่มั่นคงและยั่งยืน (Ensure access to affordable, reliable, sustainable and modern energy for all)`,
    img_order_path: "/img/SDGs/SDG-Goal-07.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG8",
    topic: "Decent Work and Economic Growth",
    pop_info: `เป้าหมายที่ 8: ส่งเสริมการเติบโตทางเศรษฐกิจที่ยั่งยืน และการมีงานที่เหมาะสมสำหรับทุกคน (Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all)`,
    img_order_path: "/img/SDGs/SDG-Goal-08.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG9",
    topic: "Industry, Innovation, and Infrastructure",
    pop_info: `เป้าหมายที่ 9: พัฒนาโครงสร้างพื้นฐาน ส่งเสริมนวัตกรรม และเพิ่มขีดความสามารถด้านอุตสาหกรรม (Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation)`,
    img_order_path: "/img/SDGs/SDG-Goal-09.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG10",
    topic: "Reduced Inequality",
    pop_info: `เป้าหมายที่ 10: ลดความเหลื่อมล้ำภายในและระหว่างประเทศ (Reduce inequality within and among countries)`,
    img_order_path: "/img/SDGs/SDG-Goal-10.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG11",
    topic: "Sustainable Cities and Communities",
    pop_info: `เป้าหมายที่ 11: ทำให้เมืองและที่อยู่อาศัยมีความยั่งยืน (Make cities and human settlements inclusive, safe, resilient, and sustainable)`,
    img_order_path: "/img/SDGs/SDG-Goal-11.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG12",
    topic: "Responsible Consumption and Production",
    pop_info: `เป้าหมายที่ 12: สร้างหลักประกันให้มีรูปแบบการผลิตและการบริโภคที่ยั่งยืน (Ensure sustainable consumption and production patterns)`,
    img_order_path: "/img/SDGs/SDG-Goal-12.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG13",
    topic: "Climate Action",
    pop_info: `เป้าหมายที่ 13: ดำเนินมาตรการอย่างเร่งด่วนเพื่อลดผลกระทบจากการเปลี่ยนแปลงสภาพภูมิอากาศ (Take urgent action to combat climate change and its impacts)`,
    img_order_path: "/img/SDGs/SDG-Goal-13.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG14",
    topic: "Life Below Water",
    pop_info: `เป้าหมายที่ 14: อนุรักษ์และใช้ประโยชน์จากทรัพยากรทางทะเลอย่างยั่งยืน (Conserve and sustainably use the oceans, seas, and marine resources)`,
    img_order_path: "/img/SDGs/SDG-Goal-14.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG15",
    topic: "Life on Land",
    pop_info: `เป้าหมายที่ 15: ปกป้องและฟื้นฟูระบบนิเวศบนบก และหยุดยั้งการสูญเสียความหลากหลายทางชีวภาพ (Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss)`,
    img_order_path: "/img/SDGs/SDG-Goal-15.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG16",
    topic: "Peace, Justice, and Strong Institutions",
    pop_info: `เป้าหมายที่ 16: ส่งเสริมสังคมที่สงบสุข ยุติธรรม และมีประสิทธิภาพ (Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels)`,
    img_order_path: "/img/SDGs/SDG-Goal-16.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
  {
    id: "SDG17",
    topic: "Partnerships for the Goals",
    pop_info: `เป้าหมายที่ 17: เสริมสร้างวิธีการดำเนินงานและฟื้นฟูความเป็นหุ้นส่วนเพื่อการพัฒนาที่ยั่งยืน (Strengthen the means of implementation and revitalize the global partnership for sustainable development)`,
    img_order_path: "/img/SDGs/SDG-Goal-17.png",
    checked: false,
    description: "",
    required: false,
    value: "",
  },
]);

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

const getProjectData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/TS/get/p_2", {
      project_id: project_id.value,
      // project_type: project_type.value,
      project_type: 4,
      project_user: user_id.value,
    });

    if (
      //try
      response.data?.success &&
      //
      response.data.data?.length > 0
    ) {
      const savedData = JSON.parse(response.data.data[0].project_data_p_2);

      //try
      // Initialize empty form if no data exists
      if (!savedData) {
        Project_Data_TS_P2 = {
          objectives: [],
          subjects: [],
          sdgs: [],
          other_subject: "",
        };
        return;
      }
      //end of try

      // Update checkboxes and descriptions from saved data
      options1.value.forEach((opt) => {
        const savedObj = savedData.objectives.find((o) => o.id === opt.id);
        if (savedObj) {
          opt.checked = true;
          opt.description = savedObj.description;
        }
        //try
        else {
          opt.checked = false;
          opt.description = "";
        }
        //end of try
      });

      options2.value.forEach((opt) => {
        if (savedData.subjects.includes(opt.id)) {
          opt.checked = true;
        }
        if (opt.id === "other_subject" && savedData.other_subject) {
          opt.checked = true;
          opt.description = savedData.other_subject;
        }
      });

      sdgs.value.forEach((sdg) => {
        const savedSdg = savedData.sdgs.find((s) => s.id === sdg.id);
        if (savedSdg) {
          sdg.checked = true;
          sdg.description = savedSdg.description;
        }
      });
    }
    //try
    else {
      //console.log('No project data found, initializing empty form');
      Project_Data_TS_P2 = {
        objectives: [],
        subjects: [],
        sdgs: [],
        other_subject: "",
      };
    }
    //end of try
  } catch (error) {
    console.error("Failed to load project data:", error);
    Toast.fire({
      icon: "error",
      title: "ไม่สามารถโหลดข้อมูลโครงการได้",
    });

    //try
    // Initialize empty form on error
    Project_Data_TS_P2 = {
      objectives: [],
      subjects: [],
      sdgs: [],
      other_subject: "",
    };
    //end of try
  }
};

onMounted(async () => {
  const user = parseJwt(cookies.get("accesstoken"));
  user_id.value = user.user_id;
  affiliation_id.value = user.affiliation_id;

  if (route.query.project_type) {
    const projectType = route.query.project_type;
    project_type.value = projectType;
  }

  if (route.query.project_type) {
    project_type.value = route.query.project_type;
  }

  if (route.query.project_id) {
    project_id.value = route.query.project_id;
    await getProjectData();
  }
  //try
  else {
    // Handle case where project_id is missing
    Swal.fire("Error", "ไม่พบรหัสโครงการ", "error");
    router.push({ path: "/pl/TS/p_1" });
  }
  //end of try
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

// Validation function
// const validateForm = () => {
//   // objectives
//   const invalidObjective = options1.value.find(
//     o => o.checked && !o.description.trim()
//   );
//   if (invalidObjective) {
//     Swal.fire('ผิดพลาด', 'โปรดระบุเหตุผลในวัตถุประสงค์ที่เลือก', 'error');
//     return false;
//   }
//   if (options1.value.every(o => !o.checked)) {
//     Swal.fire('ผิดพลาด', 'กรุณาเลือกวัตถุประสงค์อย่างน้อย 1 ข้อ', 'error');
//     return false;
//   }

//   // subjects
//   const other = options2.value.find(o => o.id === 'other_subject');
//   if (other.checked && !other.description.trim()) {
//     Swal.fire('ผิดพลาด', 'โปรดระบุรายละเอียดของวิชาอื่น ๆ', 'error');
//     return false;
//   }
//   if (
//     options2.value.filter(o => o.checked && o.id !== 'other_subject').length === 0 &&
//     !other.checked
//   ) {
//     Swal.fire('ผิดพลาด', 'กรุณาเลือกสาระวิชาอย่างน้อย 1 ข้อ', 'error');
//     return false;
//   }

//   // SDGs
//   const invalidSdg = sdgs.value.find(s => s.checked && !s.description.trim());
//   if (invalidSdg) {
//     Swal.fire(
//       'ผิดพลาด',
//       `กรุณากรอกคำอธิบายสำหรับ SDG ${invalidSdg.topic}`,
//       'error'
//     );
//     return false;
//   }

//   return true;
// };

const validateForm = () => {
  // Validate options1 (Objectives)
  const checkedObjectives = options1.value.filter((o) => o.checked);
  if (checkedObjectives.length === 0) {
    return (isCanGo = false);
  }

  // Only check description for objectives that need it
  const objectivesNeedingDescription = checkedObjectives.filter(
    (o) => o.id !== "promoteVolunteer" && o.id !== "nonPolitics"
  );
  const invalidObjectiveDescription = objectivesNeedingDescription.find(
    (o) => o.description.trim() === ""
  );
  if (invalidObjectiveDescription) {
    return (isCanGo = false);
  }

  // Rest of your validation remains the same...
  // Validate options2 (Subjects)
  const checkedSubjects = options2.value.filter((o) => o.checked);
  if (checkedSubjects.length === 0) {
    return (isCanGo = false);
  }
  const otherSubjectOption = options2.value.find((o) => o.id === "other_subject");
  if (
    otherSubjectOption &&
    otherSubjectOption.checked &&
    otherSubjectOption.description.trim() === ""
  ) {
    return (isCanGo = false);
  }

  // Validate SDGs
  const checkedSdgs = sdgs.value.filter((sdg) => sdg.checked);
  if (checkedSdgs.length === 0) {
    return (isCanGo = false);
  }
  const invalidSdgDescription = checkedSdgs.find((sdg) => sdg.description.trim() === "");
  if (invalidSdgDescription) {
    return (isCanGo = false);
  }

  return (isCanGo = true); // All validations passed
};

// function debounce(func, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }

const autoSave = async () => {
  if (!validateForm()) return;
  try {
    // const project_id = '';
    const response = await axios.post("http://localhost:5000/pl/TS/p_2/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_TS_P2,
    });
    // //console.log(response.data)
    if (response.data.success) {
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
      });
      return true;
    } else {
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
      });
    }
    throw new Error("Save failed");
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
    return false;
  }
};

// const submitForm = async () => {
//   if (!validateForm()) return;

//   // const saved = await autoSave()
//   // if (saved) {
//   //   nextStep()
//   // }

//   //try
//   try {
//     const saved = await autoSave();
//     if (saved) {
//       nextStep();
//     }
//   } catch (error) {
//     console.error('Form submission error:', error);
//     Toast.fire({
//       icon: 'error',
//       title: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม'
//     });
//   }
//   //end of try
// };

const submitForm = async () => {
  loading.value = true;
  // 1. Validate the form first
  // if (!validateForm()) {
  //     return; // Stop if validation fails, the Swal.fire will already show an error
  // }

  // 2. Prepare data for saving
  const dataToSave = {
    objectives: options1.value
      .filter((opt) => opt.checked)
      .map((opt) => ({
        id: opt.id,
        description: opt.description,
      })),
    subjects: options2.value
      .filter((opt) => opt.checked && opt.id !== "other_subject")
      .map((opt) => opt.id),
    other_subject: options2.value.find((opt) => opt.id === "other_subject")?.checked
      ? options2.value.find((opt) => opt.id === "other_subject").description
      : "",
    sdgs: sdgs.value
      .filter((sdg) => sdg.checked)
      .map((sdg) => ({
        id: sdg.id,
        topic: sdg.topic,
        description: sdg.description,
      })),
  };

  try {
    // 3. Send data to the backend
    const response = await axios.post("http://localhost:5000/pl/TS/p_2/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: dataToSave, // Use the prepared data
    });

    // 4. Check response and show success/error toast
    if (response.data.success) {
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      await setTimeout(() => {
        loading.value = false;
      }, 500);
      // 5. Navigate to the next step only after successful save
      nextStep();
    } else {
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: "บันทึกข้อมูลล้มเหลว, กรุณาลองใหม่",
      });
    }
  } catch (error) {
    console.error("Error saving project data:", error);
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
    });
  }
};

const nextStep = () => {
  router.push({
    path: "/pl/TS/p_3",
    query: {
      project_id: project_id.value,
      project_type: project_type.value,
    },
  });
};
const prevStep = () => {
  router.push({
    path: "/pl/TS/p_1",
    query: {
      project_id: project_id.value,
      project_type: project_type.value,
    },
  });
};

//when form change or update
watch(
  [options1, options2, sdgs],
  () => {
    //console.log('Form data updated:', Project_Data_TS_P2);

    // Update objectives
    Project_Data_TS_P2.objectives = options1.value
      .filter((opt) => opt.checked)
      .map((opt) => ({
        id: opt.id,
        description: opt.description,
      }));
    // Update subjects (excluding "other" which is handled separately)
    Project_Data_TS_P2.subjects = options2.value
      .filter((opt) => opt.checked && opt.id !== "other_subject")
      .map((opt) => opt.id);

    // Handle other subject
    const otherSubject = options2.value.find((opt) => opt.id === "other_subject");
    Project_Data_TS_P2.other_subject = otherSubject?.checked
      ? otherSubject.description
      : "";

    // Update SDGs
    Project_Data_TS_P2.sdgs = sdgs.value
      .filter((sdg) => sdg.checked)
      .map((sdg) => ({
        id: sdg.id,
        topic: sdg.topic,
        description: sdg.description,
      }));

    validateForm();
  },
  { deep: true, immediate: true }
);

const validateInput = (sdg) => {
  sdg.required = sdg.checked;
};

// Add watcher to trigger autoSave when Project_Data_TS_P2 changes
// watch(() => ({ ...Project_Data_TS_P2 }), () => {
//   autoSave();
// }, { deep: true });
</script>

<style lang="css" scoped>
.beautiful-box {
  height: 50px !important;
  border-radius: 6px !important;
}

.sdg-img {
  width: 70px;
  height: 70px;
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

.custom-input {
  max-width: 100%;
  min-width: 300px;
}

.form-check-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-check-input {
  transform: scale(1.5);
}

.circle-input {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}
</style>
