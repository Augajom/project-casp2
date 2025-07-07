<template>
  <div>
    <NavbarProject
      class="fixed-top"
      propText="โครงการหลักสูตรระยะสั้น (ประเภทเทียบเคียงหลักสูตรการศึกษา)"
    />
    <ProgressBar
      class="fixed-top border"
      :step="currentStep"
      @update:step="currentStep"
    />
    <Loader v-if="loading" />
    <div style="margin-top: 250px">
      <div
        class="container d-flex justify-content-center"
        style="max-width: 1300px; margin-top: 100px"
      >
        <div
          class="d-flex flex-column border p-3 px-5 shadow mb-5"
          style="
            max-width: 1200px;
            min-width: 1200px;
            background-color: #374375;
            border-radius: 12px;
          "
        >
          <div class="row text-white fs-3 mt-3">
            <p>ส่วนที่ 7 สรุปรายละเอียดงบประมาณ (กรอกเฉพาะตัวเลขเท่านั้น)</p>
          </div>

          <!-- Registration Fee Section -->
          <div class="mb-0">
            <p class="fs-4 text-white">ค่าลงทะเบียน</p>
          </div>
          <div>
            <div
              class="row text-center mb-3"
              v-for="(row, index) in Project_Data_ST_P7.rows"
              :key="index"
            >
              <div class="col">
                <input
                  v-model="row.type"
                  type="text"
                  class="form-control"
                  placeholder="กรอกประเภท"
                />
              </div>
              <div class="col">
                <input
                  v-model.number="row.rate"
                  type="number"
                  class="form-control"
                  placeholder="อัตรา"
                />
              </div>
              <div class="col">
                <input
                  v-model.number="row.people"
                  type="number"
                  class="form-control"
                  placeholder="จำนวนคน"
                />
              </div>
              <div class="col">
                <input
                  :value="
                    (row.rate * row.people).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  type="text"
                  class="form-control"
                  readonly
                />
              </div>
            </div>

            <div
              class="text-center mb-3"
              v-if="Project_Data_ST_P7.rows.length > 1"
            >
              <button
                class="btn btn-danger"
                @click="removeRow(Project_Data_ST_P7.rows.length - 1)"
              >
                ลบแถวล่าสุด
              </button>
            </div>
            <div class="text-center mb-4">
              <button
                class="btn"
                style="background-color: #0d6efd; color: white"
                @click="addRow"
                :disabled="Project_Data_ST_P7.rows.length >= 10"
              >
                เพิ่มประเภทอัตราค่าลงทะเบียน
              </button>
            </div>
          </div>
          <div class="mb-3">
            <p class="fs-5 text-white">รวมค่าลงทะเบียน</p>
            <div class="row text-center">
              <div class="col">
                <p class="text-white">รวมรายได้ทั้งหมด (บาท)</p>
                <input
                  :value="
                    Number(totalBudget).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  type="text"
                  class="form-control"
                  placeholder="รวมรายได้ทั้งหมด"
                  readonly
                />
              </div>
              <div class="col">
                <p class="text-white">รวมจำนวนคนผู้เข้าร่วม (คน)</p>
                <input
                  :value="
                    Number(totalPeople).toLocaleString()
                  "
                  type="text"
                  class="form-control"
                  placeholder="รวมจำนวนคนผู้เข้าร่วม"
                  readonly
                />
              </div>
            </div>
          </div>
          <hr class="text-white" />
          <!-- Conditions Section -->
          <div class="mb-0">
            <p class="fs-4 text-white">
              ค่าสนับสนุนอื่น ๆ (ค่าบูธ/หน่วยงานภายนอก)
            </p>
          </div>
          <div
            v-for="(item, index) in Project_Data_ST_P7.conditions"
            :key="index"
            class="mb-4 mt-0"
          >
            <p class="fs-5 text-white mb-2">เกณฑ์ข้อกำหนด/เงื่อนไข</p>
            <textarea
              class="form-control mb-3"
              rows="3"
              v-model="item.condition"
            ></textarea>

            <div class="row text-center mb-2">
              <div class="col"><p class="fs-5 text-white mb-1">อัตรา (บาท)</p></div>
              <div class="col">
                <p class="fs-5 text-white mb-1">จำนวนหน่วยงาน</p>
              </div>
              <div class="col">
                <p class="fs-5 text-white mb-1">รวมจำนวนเงิน (บาท)</p>
              </div>
            </div>

            <div class="row text-center">
              <div class="col">
                <input
                  type="number"
                  class="form-control mb-2"
                  placeholder="อัตรา"
                  v-model.number="item.amount"
                />
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control mb-2"
                  placeholder="จำนวนหน่วยงาน"
                  v-model.number="item.units"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control mb-2"
                  :value="
                    Number(item.amount * item.units).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  placeholder="รวมจำนวนเงิน"
                  readonly
                />
              </div>
            </div>

            <div class="text-center mt-2" v-if="index > 0">
              <button
                class="btn btn-danger btn-lg"
                @click="removeConditionSet(index)"
              >
                ลบเงื่อนไข
              </button>
            </div>
          </div>

          <div class="text-center mb-4">
            <button
              class="btn"
              style="background-color: #0d6efd; color: white"
              @click="addConditionSet"
            >
              + เพิ่มเกณฑ์/เงื่อนไขและจำนวนเงิน
            </button>
          </div>
          <hr class="text-white" />
          <!-- Summary Section -->
          <div class="container">
            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">รวมรายได้ (บาท)</div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  :value="
                    Number(Project_Data_ST_P7.totalIncome || 0).toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  "
                  placeholder="รวมรายได้"
                  readonly
                />
              </div>
            </div>
            <!--ดึงจากหน้า6-->
            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">ค่าใช้จ่าย (บาท)</div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ค่าใช้จ่าย"
                  :value="
                    Number(Project_Data_ST_P7.totalCost || 0).toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  "
                  readonly
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">
                ค่าดำเนินส่วนกลาง (บาท)
              </div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="รวมค่าใช้จ่ายทั้งหมด"
                  :value="
                    Number(Project_Data_ST_P7.CommonFee || 0).toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  "
                  readonly
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">
                รวมค่าใช้จ่ายทั้งหมด (บาท)
              </div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="รวมค่าใช้จ่ายทั้งหมด"
                  readonly
                  :value="
                    Number(
                      Project_Data_ST_P7.totalCostSummary || 0
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">
                รวมรายได้หลังหักค่าใช้จ่าย (บาท)
              </div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="รวมรายได้หลังหักค่าใช้จ่าย"
                  :value="
                    Number(
                      Project_Data_ST_P7.netIncomeAfterCost || 0
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  readonly
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">จุดคุ้มทุน (คน)</div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="จุดคุ้มทุน"
                  :value="
                    Number(
                      Project_Data_ST_P7.breakEvenPoint || 0
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  readonly
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">ค่าใช้จ่ายต่อคน (บาท)</div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ค่าใช้จ่ายต่อคน"
                  :value="
                    Number(
                      Project_Data_ST_P7.costPerPerson || 0
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
                  readonly
                />
              </div>
            </div>

            <div class="row mb-2 align-items-center">
              <div class="col-5 text-end text-white fs-5">
                อัตรากำไรสุทธิ (Net Profit Margin)
              </div>
              <div class="col-4" style="margin-left: 100px">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ร้อยละยอดกำไรสุทธิ"
                  :value="Project_Data_ST_P7.netProfitPercent"
                  readonly
                />
              </div>
            </div>
          </div>

          <hr class="text-white" />
          <div>
            <div class="text-white fs-4">
              การจัดสรรค่าตอบแทนในกรณีปรากฎมีรายได้เหนือค่าใช้จ่าย
            </div>
            <div class="container">
              <div class="row mb-2 align-items-center">
                <div class="col-6 text-start text-white fs-5">
                  มหาวิทยาลัย ร้อยละ 50
                </div>
                <div class="col-4" style="margin-left: 100px">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="0.00"
                    :value="
                      Number(
                        Project_Data_ST_P7.universityIncome || 0
                      ).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>

          <hr class="text-white" />
          <div>
            <div class="text-white fs-4">
              ค่าตอบแทนหน่วยงานคณะบริหารโครงการตามสัดส่วนของการมีส่วมร่วม
            </div>
            <div class="container">
              <div class="row mb-2 align-items-center">
                <div class="col-6 text-start text-white fs-5">
                  หน่วยงานคณะบริหารโครงการ<br />
                  (กองทุนส่งเสริมการพัฒนาบุคลากร) ร้อยละ 25
                </div>
                <div class="col-4" style="margin-left: 100px">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="0.00"
                    :value="
                      Number(
                        Project_Data_ST_P7.facultyUnitShare || 0
                      ).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
          <hr class="text-white" />
          <div>
            <div class="text-white fs-4">
              ค่าตอบแทนคณะบริหารโครงการตามสัดส่วนของการมีส่วมร่วม
            </div>
            <div class="container">
              <div class="row mb-2 align-items-center">
                <div class="col-6 text-start text-white fs-5">
                  คณะบริหารโครงการ ร้อยละ 25
                </div>
                <div class="col-4" style="margin-left: 100px">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="0.00"
                    :value="
                      Number(
                        Project_Data_ST_P7.facultyManageShare || 0
                      ).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- File Attachment -->
          <hr class="text-white" />

          <div class="mb-3 mt-2 text-center">
            <!-- หัวข้อ -->
            <div class="row">
              <p class="text-white">แนบไฟล์กำหนดการโครงการ</p>
            </div>

            <!-- กล่องเนื้อหาทั้งหมด -->
            <div class="d-flex justify-content-center">
              <div style="max-width: 800px; width: 100%">
                <!-- ปุ่มแนบไฟล์ + ชื่อไฟล์ -->
                <div
                  class="d-flex justify-content-center align-items-center flex-wrap"
                >
                  <label
                    for="file-upload"
                    class="btn btn-sm btn-light"
                    style="margin-top: 0.5rem"
                  >
                    แนบไฟล์
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    class="d-none"
                    @change="handleFileChange"
                  />

                  <p
                    class="text-white mb-0 ms-3"
                    style="margin-top: 0.8rem; word-break: break-word"
                  >
                    <span v-if="fileName">{{ fileName }}</span>
                    <span v-else>ยังไม่ได้เลือกไฟล์</span>
                  </p>
                </div>

                <!-- คำอธิบาย -->
                <p class="text-warning text-center mt-2">
                  สามารถแนบไฟล์ Word (.doc, .docx), PDF (.pdf), Excel (.xls,
                  .xlsx) และ ขนาดไม่เกิน 10MB
                </p>

                <!-- ไฟล์เดิม -->
                <div
                  v-if="existingFileName"
                  class="d-flex justify-content-center mt-3"
                >
                  <p class="text-white mb-0" style="word-break: break-word">
                    ไฟล์เดิม :
                    <a
                      class="btn btn-sm btn-secondary"
                      :href="`https://asds-cas.mfu.ac.th/api/Files/${existingFileName}`"
                      :download="existingFileName"
                      target="_blank"
                    >
                      {{ existingFileName.split("-").slice(5).join("-") }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
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
                class="btn btn-danger d-flex align-items-center justify-content-center"
                style="width: 200px"
              >
                <img
                  src="../../../../assets/download.png"
                  width="18"
                  alt="download"
                  class="me-2"
                />
                <span>PDF</span>
              </div>
            </router-link>
          </div>
          <hr class="text-white" />
          <div class="row justify-content-center">
            <div class="col-auto">
              <router-link
                :to="{
                  path: '/pl/st/p_6',
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
            <div class="col-auto">
              <button
                class="btn text-white"
                style="width: 140px; background-color: #0d6efd"
                @click="saveData()"
              >
                <span>บันทึก</span>
              </button>
            </div>
            <div class="col-auto">
              <button
                class="btn btn-success"
                style="width: 160px"
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
import axios from "axios";
import ProgressBar from "@/components/ProgressBar.vue";
import parseJwt from "../../../../../utils/DecodeToken";
import Loader from "@/components/Loader.vue";
import NavbarProject from "@/components/NavbarProject.vue";
import { reactive, ref, watch, computed, onMounted, watchEffect } from "vue";
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

const currentStep = ref(7);
const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);
const loading = ref(false);
let isCanGo = false;
let isInitialized = false;
let canEdit = false;

let is_proposal_open = ref(false);
const Project_Data_ST_P7 = reactive({
  rows: [{ type: "", rate: "", people: "" }],
  conditions: [
    {
      condition: "",
      amount: 0,
      units: 0,
    },
  ],
  totalIncome: "", //3
  totalCost: "", //4
  CommonFee: "", //5
  totalCostSummary: "", //6
  netIncomeAfterCost: "", //7
  breakEvenPoint: "",
  costPerPerson: "",
  netProfitPercent: "",
  universityIncome: "",
  // projectAdminFund: '',
  facultyManageShare: "",
  file: null,
});

// คำนวณรวมงบประมาณ
const totalBudget = computed(() => {
  return Project_Data_ST_P7.rows.reduce(
    (sum, row) => sum + Number(row.rate) * Number(row.people),
    0
  );
});

// คำนวณรวมจำนวนคน
const totalPeople = computed(() => {
  return Project_Data_ST_P7.rows.reduce(
    (sum, row) => sum + Number(row.people),
    0
  );
});

// ฟังก์ชันเพิ่มแถว
function addRow() {
  if (Project_Data_ST_P7.rows.length < 10) {
    Project_Data_ST_P7.rows.push({ type: "", rate: "", people: "" });
  }
}

// ฟังก์ชันลบแถวล่าสุด
function removeRow(index) {
  if (Project_Data_ST_P7.rows.length > 1) {
    Project_Data_ST_P7.rows.splice(index, 1);
  }
}

function addConditionSet() {
  Project_Data_ST_P7.conditions.push({
    condition: "",
    amount: 0,
    units: 0,
  });
}

function removeConditionSet(index) {
  if (Project_Data_ST_P7.conditions.length > 1) {
    Project_Data_ST_P7.conditions.splice(index, 1);
  }
}

//รวมรายได้ (บาท)
const totalIncome = computed(() => {
  const totalFromRows = Project_Data_ST_P7.rows.reduce((sum, row) => {
    return sum + Number(row.rate) * Number(row.people);
  }, 0);

  const totalFromConditions = Project_Data_ST_P7.conditions.reduce(
    (sum, cond) => {
      return sum + Number(cond.amount) * Number(cond.units);
    },
    0
  );

  const total = totalFromRows + totalFromConditions;
  return parseFloat(total.toFixed(2));
});

const formattedtotalIncome = computed(() => {
  const income = totalIncome.value;
  if (!isNaN(income)) {
    return income.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "0.00";
});

//ค่าดำเนินการส่วนกลาง
watchEffect(() => {
  const income = totalIncome.value;
  Project_Data_ST_P7.totalIncome = income.toFixed(2);

  if (income <= 1000000) {
    Project_Data_ST_P7.CommonFee = (income * 0.1).toFixed(2);
  } else if (income <= 3000000) {
    Project_Data_ST_P7.CommonFee = (income * 0.15).toFixed(2);
  } else {
    Project_Data_ST_P7.CommonFee = (income * 0.2).toFixed(2);
  }
});

//vc ส่วนกลาง
const rowsWithVC = computed(() => {
  return Project_Data_ST_P7.rows.map((row) => {
    const rate = parseFloat(row.rate) || 0;
    const vc = rate * 0.1;
    return {
      ...row,
      vc: vc.toFixed(2),
    };
  });
});
// watch rowsWithVC เพื่อดูค่าที่อัปเดต
// watch(rowsWithVC, (newVal) => {
// }, { immediate: true });

//vc แต่ละ ค่าลง
const rowsWithAddedVC = computed(() => {
  const Vc = parseFloat(Project_Data_ST_P7.Vc) || 0;
  return rowsWithVC.value.map((row) => {
    const newVc = Number(row.vc) + Vc; // แปลงเป็น number ทั้งคู่
    const rate = parseFloat(row.rate) || 0;
    return {
      ...row,
      vccost: newVc.toFixed(2), // ปัดทศนิยม
      totalVc: (Number(row.vc) + newVc).toFixed(2),
      rateMinusVccost: (rate - newVc).toFixed(2), // rate - vccost
    };
  });
});
// watch ดู rowsWithAddedVC
// watch(rowsWithAddedVC, (newVal) => {
//   console.log('Updated rowsWithAddedVC:', newVal);
//   newVal.forEach((row, index) => {
//     console.log(`Row ${index} rateMinusVccost:`, row.rateMinusVccost);
//   });
// }, { immediate: true });

//สัดส่วนการขาย (%)
const rowsWithPeoplePercent = computed(() => {
  const totalPeople = Project_Data_ST_P7.rows.reduce((sum, row) => {
    return sum + (Number(row.people) || 0);
  }, 0);

  return Project_Data_ST_P7.rows.map((row) => {
    const people = Number(row.people) || 0;
    const percent = totalPeople > 0 ? (people / totalPeople) * 100 : 0;
    return {
      ...row,
      percentPeople: percent.toFixed(2), // เก็บเป็น string ทศนิยม 2 ตำแหน่ง
    };
  });
});

//กำไรส่วนเกินเฉลี่ยต่อหน่วย
const rowsFinalCalculation = computed(() => {
  // ต้องมั่นใจว่า rowsWithPeoplePercent กับ rowsWithAddedVC มีลำดับ row เดียวกัน
  const peoplePercents = rowsWithPeoplePercent.value;
  const addedVCs = rowsWithAddedVC.value;

  return peoplePercents.map((rowPercent, idx) => {
    const rateMinusVccost = parseFloat(addedVCs[idx]?.rateMinusVccost) || 0;
    const percentPeople = parseFloat(rowPercent.percentPeople) || 0;

    const calculation = (percentPeople * rateMinusVccost) / 100;

    return {
      finalValue: calculation.toFixed(2),
    };
  });
});

const totalFinalValue = computed(() => {
  return rowsFinalCalculation.value
    .reduce((sum, row) => {
      return sum + (parseFloat(row.finalValue) || 0);
    }, 0)
    .toFixed(2);
});

//จุดคุ้มทุน
watchEffect(() => {
  const Fc = parseFloat(Project_Data_ST_P7.Fc) || 0;
  const total = rowsFinalCalculation.value.reduce((sum, row) => {
    return sum + parseFloat(row.finalValue || 0);
  }, 0);

  const ratio = total !== 0 ? Fc / total : 0;
  Project_Data_ST_P7.breakEvenPoint = ratio; // บันทึก breakevenPoint

  console.log(
    `Fc: ${Fc}, total: ${total}, breakevenPoint: ${Project_Data_ST_P7.breakEvenPoint}`
  );
});

// watch(breakpoint, (newVal) => {;
//   Project_Data_ST_P7.breakEvenPoint = newVal; // ✅ อัปเดตเข้า reactive object
// }, { immediate: true });

//Upload File
const files = ref([]);
const fileName = ref("");
const pageName = "page7"; // อย่าลืมเปลี่ยนตามหน้าที่เอาไปวางเพื่ออิงหน้านั้นๆ

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
  Project_Data_ST_P7.file = validFiles.length > 0 ? validFiles[0] : null; // อย่าลืมเปลี่ยนชื่อให้ตรงกับ data ที่เก็บ ในที่นี้คือ Project_Data_P7

  // อัพเดทชื่อไฟล์แรกถ้ามี
  fileName.value = validFiles.length > 0 ? validFiles[0].name : "";
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
      `https://asds-cas.mfu.ac.th/api/pl/upload/file${query}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      //console.log("✅ อัปโหลดไฟล์สำเร็จ", response.data);
      Project_Data_P5.projectImpact.fileName = response.data.file.filename;
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
      `https://asds-cas.mfu.ac.th/api/pl/file/display?projectId=${project_id.value}&projectType=${project_type.value}&page=${pageName}`
    );
    existingFileName.value = res.data.file;

    // ✅ ถ้ามีไฟล์อยู่แล้ว ถือว่าไฟล์ถูกแนบ
    if (existingFileName.value) {
      Project_Data_ST_P7.file = { name: existingFileName.value };
    }
  } catch (err) {
    console.error("ไม่สามารถโหลดไฟล์เดิม:", err);
  }
};

//ค่าใช้จ่ายทั้งหมด
const getDataWhenProjectID = async () => {
  try {
    //console.log('Sending request with:', {
    //   project_id: project_id.value,
    //   project_type: project_type.value,
    //   project_user: user_id.value,
    // })

    const response = await axios.post("https://asds-cas.mfu.ac.th/api/pl/ST/get/p_7", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data_6 = JSON.parse(response.data.data[0].project_data_p_6);
    const project_data_7 = JSON.parse(response.data.data[0].project_data_p_7);

    if (project_data_6 != null || project_data_7 != null) {
      Project_Data_ST_P7.totalCost = project_data_6.total;
      Project_Data_ST_P7.Fc = project_data_6.totalFc;
      Project_Data_ST_P7.Vc = project_data_6.totalVc;
      Project_Data_ST_P7.rows = project_data_7.rows;
      Project_Data_ST_P7.conditions = project_data_7.conditions;
      Project_Data_ST_P7.totalIncome = project_data_7.totalIncome;
      Project_Data_ST_P7.CommonFee = project_data_7.CommonFee;
      Project_Data_ST_P7.totalCostSummary = project_data_7.totalCostSummary;
      Project_Data_ST_P7.netIncomeAfterCost = project_data_7.netIncomeAfterCost;
      Project_Data_ST_P7.breakEvenPoint = project_data_7.breakEvenPoint;
      Project_Data_ST_P7.costPerPerson = project_data_7.costPerPerson;
      Project_Data_ST_P7.netProfitPercent = project_data_7.netProfitPercent;
      Project_Data_ST_P7.universityIncome = project_data_7.universityIncome;
      // Project_Data_ST_P7.projectAdminFund = project_data_7.projectAdminFund;
      Project_Data_ST_P7.facultyManageShare = project_data_7.facultyManageShare;

      isCanGo = true;
    } else {
      isCanGo = false;
    }
  } catch (err) {
    console.error(err);
    //console.log('error fetching editing data = ', project_id.value)
  }
};

watch(
  Project_Data_ST_P7,
  (newVal) => {
    //console.log('--- Validating Project_Data_ST_P7 ---');
    let valid = true;

    // Validate rows
    const hasInvalidRow = newVal.rows.some(
      (row) => !row.type.trim() || row.rate <= 0 || row.people <= 0
    );
    if (hasInvalidRow) {
      //console.log('❌ Invalid row(s) found');
      valid = false;
    } else {
      //console.log('✅ All rows are valid');
    }

    // // Validate conditions
    // const hasInvalidCondition = newVal.conditions.some(
    //   (cond) => !cond.condition.trim() || cond.amount <= 0 || cond.units <= 0
    // );
    // if (hasInvalidCondition) {
    //   //console.log('❌ Invalid condition(s) found');
    //   valid = false;
    // } else {
    //   //console.log('✅ All conditions are valid');
    // }

    // Required string fields
    const requiredFields = [
      "totalIncome",
      "totalCost",
      "CommonFee",
      "totalCostSummary",
      "netIncomeAfterCost",
      "breakEvenPoint",
      "costPerPerson",
      "netProfitPercent",
      "universityIncome",
      "facultyManageShare",
    ];

    for (const field of requiredFields) {
      if (!newVal[field] || newVal[field].toString().trim() === "") {
        //console.log(`❌ ${field} is empty`);
        valid = false;
      } else {
        //console.log(`✅ ${field} is filled`);
      }
    }

    // Validate file
    if (!newVal.file) {
      //console.log('❌ file is not attached');
      valid = false;
    } else {
      //console.log('✅ file is attached');
    }

    isCanGo = valid;
    //console.log(valid ? '🎉 All fields are valid, isCanGo = true' : '❌ Validation failed, isCanGo = false');
  },
  { deep: true, immediate: true }
);

const formattedtotalCost = computed(() => {
  const cost = Number(Project_Data_ST_P7.totalCost);
  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "0.00";
});
//รวมค่าใช้จ่ายทั้งหมด
watchEffect(() => {
  const cost = Number(Project_Data_ST_P7.totalCost);
  const fee = Number(Project_Data_ST_P7.CommonFee);
  const total = cost + fee;

  Project_Data_ST_P7.totalCostSummary = !isNaN(total)
    ? total.toFixed(2)
    : "0.00";
});
//รวมรายได้ (บาท)หลังหักค่าใช้จ่าย
watchEffect(() => {
  const income = Number(Project_Data_ST_P7.totalIncome);
  const cost = Number(Project_Data_ST_P7.totalCost);
  const fee = Number(Project_Data_ST_P7.CommonFee);

  const totalCostSummary = cost + fee;
  Project_Data_ST_P7.totalCostSummary = !isNaN(totalCostSummary)
    ? totalCostSummary.toFixed(2)
    : "0.00";

  const net = income - totalCostSummary;
  Project_Data_ST_P7.netIncomeAfterCost = !isNaN(net) ? net.toFixed(2) : "0.00";
});
//ต่อคน
watchEffect(() => {
  const income = Number(Project_Data_ST_P7.totalIncome);
  const cost = Number(Project_Data_ST_P7.totalCost);
  const fee = Number(Project_Data_ST_P7.CommonFee);

  // ✅ คำนวณต้นทุนรวม
  const totalCostSummary = cost + fee;
  Project_Data_ST_P7.totalCostSummary = !isNaN(totalCostSummary)
    ? totalCostSummary.toFixed(2)
    : "0.00";

  // ✅ คำนวณกำไรสุทธิหลังหักค่าใช้จ่าย
  const net = income - totalCostSummary;
  Project_Data_ST_P7.netIncomeAfterCost = !isNaN(net) ? net.toFixed(2) : "0.00";

  // ✅ รวมจำนวนคนทั้งหมดจากทุก row
  const totalPeople = Project_Data_ST_P7.rows.reduce((sum, row) => {
    return sum + (Number(row.people) || 0);
  }, 0);
  console.log('people :' , totalPeople)

  // ✅ คำนวณค่าใช้จ่ายต่อคน
  const costPerPerson = totalPeople > 0 ? totalCostSummary / totalPeople : 0;
  Project_Data_ST_P7.costPerPerson = !isNaN(costPerPerson)
    ? costPerPerson.toFixed(2)
    : "0.00";
  console.log('totalcost :' , costPerPerson)
});



//มหาลัยได้รีับ
watchEffect(() => {
  const income = Number(Project_Data_ST_P7.totalIncome);
  const cost = Number(Project_Data_ST_P7.totalCost);
  const fee = Number(Project_Data_ST_P7.CommonFee);

  const totalCostSummary = cost + fee;
  Project_Data_ST_P7.totalCostSummary = !isNaN(totalCostSummary)
    ? totalCostSummary.toFixed(2)
    : "0.00";

  const net = income - totalCostSummary;
  Project_Data_ST_P7.netIncomeAfterCost = !isNaN(net) ? net.toFixed(2) : "0.00";


  const universityIncome = net * 0.5;
  Project_Data_ST_P7.universityIncome = !isNaN(universityIncome)
    ? universityIncome.toFixed(2)
    : "0.00";

  const netProfitPercent = income > 0 ? (universityIncome / income) * 100 : 0;

  Project_Data_ST_P7.netProfitPercent = !isNaN(netProfitPercent)
    ? netProfitPercent.toFixed(2)
    : "0.00";
  const facultyShare = net * 0.25;
  Project_Data_ST_P7.facultyUnitShare = !isNaN(facultyShare)
    ? facultyShare.toFixed(2)
    : "0.00";

  const facultyManageShare = net * 0.25;
  Project_Data_ST_P7.facultyManageShare = !isNaN(facultyManageShare)
    ? facultyManageShare.toFixed(2)
    : "0.00";
});

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
    loading.value = true;
    await submitFile();
    autoSave();
    try {
      const response = await axios.post(
        "https://asds-cas.mfu.ac.th/api/pl/proposal/send",
        {
          project_id: project_id.value,
          project_type: project_type.value,
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "สำเร็จ",
          text: "บันทึกข้อมูลโครงการสำเร็จ",
          icon: "success",
        });
        await setTimeout(() => {
          loading.value = false;
        }, 500);
        router.push("/role/project-leader/project-lists");
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: response.data.message || "ไม่สามารถส่งข้อเสนอได้",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text:
          error.response?.data?.message ||
          error.message ||
          "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์",
        icon: "error",
      });
    }
  }
};

const autoSave = debounce(async () => {
  try {
    const response = await axios.post(
      "https://asds-cas.mfu.ac.th/api/pl/p_7/shot_term/save",
      {
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: Project_Data_ST_P7,
        project_affiliation: affiliation_id.value,
      }
    );
    //console.log(response.data)
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log('project_id',project_id.value)
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
}, 3000);

const saveData = debounce(async () => {
  try {
    const response = await axios.post(
      "https://asds-cas.mfu.ac.th/api/pl/p_7/shot_term/save",
      {
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: Project_Data_ST_P7,
        project_affiliation: affiliation_id.value,
      }
    );
    //console.log(response.data)
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกข้อมูลสำเร็จ`,
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

const pdfPreview = computed(() => {
  if (project_type.value === "3" || project_type.value === 3) {
    return {
      path: "/st/pdf",
      query: {
        project_id: project_id.value || "",
        project_type: project_type.value,
      },
    };
  }
  return { path: "" };
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

watch(
  Project_Data_ST_P7,
  (newVal, oldVal) => {
    //console.log('Project_Data_P7 has changed:');
    if (isInitialized && !canEdit) {
      //console.log('return when fetching state')
      return 0;
    }
  },
  { deep: true }
);

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

  const response = await axios.post("https://asds-cas.mfu.ac.th/api/pl/proposal");
  //console.log(response.data)
  if (response.data.success) {
    is_proposal_open.value = response.data.is_proposal_open;
  }

  if (project_id.value && project_type.value) {
    fetchExistingFile();
  }
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
.label-text {
  min-width: 300px; /* หรือใช้ fixed width เช่น width: 320px; */
  text-align: right;
  margin-right: 20px;
  white-space: nowrap;
}
</style>
