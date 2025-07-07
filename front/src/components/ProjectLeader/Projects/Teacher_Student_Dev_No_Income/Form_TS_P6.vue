<template>
  <div>
    <NavbarProject class="fixed-top " propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน" />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
    <Loader v-if="loading" />
    <div class="container-fluid" style="min-height: 1300px; margin-top: 250px;">
      <div class="d-flex justify-content-center" >
        <div class="container d-flex flex-column border px-5 shadow p-3 mb-5 "
          style="max-width: 1200px;min-width: 1200px; background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 my-3">
            <p @mouseover="showPopup = true"
              @mouseleave="showPopup = false">
              ส่วนที่ 6 งบประมาณรายจ่าย (กรอกเฉพาะตัวเลขเท่านั้น)
            </p>
            <div v-if="showPopup" class="popup">
             <p class="fs-6">ในกรณีที่ไม่เป็นไปตาม ระเบียบ/ประกาศ ของทางมหาวิทยาลัยแม่ฟ้าหลวงให้ชี้แจง โดยกดเลือก "เพิ่มรายการ เลือกแบบระบุเอง"</p>
            </div>
          </div>

          <div class="mb-2">
            <div class="d-flex align-items-center justify-content-between text-white fs-5 my-3"
              v-for="(budget, index) in budget_list" :key="index">
              <div style="width: 40px">
                <input type="checkbox" class="form-check-input me-3 circle-input" :id="budget.id"
                  v-model="budget.checked">
              </div>
              <div style="width: 350px" class="me-3">
                <label :for="budget.id" class="form-check-label fs-5 text-white my-2"
                  @mousemove="handleBudgetMouseMove($event, index)" @mouseover="showBudgetPopup = index"
                  @mouseleave="showBudgetPopup = null">{{ budget.label }}</label>
                <input type="text" v-if="budget.id === 'bg10'" v-model="budget.customText" style="margin-top: 1rem;"
                  class="form-control beautiful-box" placeholder="โปรดระบุรายละเอียดเพิ่มเติม">
              </div>
              <div style="width: 120px"><input v-model="budget.amount1" type="number"
                  class="form-control beautiful-box w-100" :placeholder="budget.unit1"></div>
              <!-- <div style="width: 80px" class="text-center"><label>{{budget.unit1 }}</label></div>
              <div style="width: 20px" class="text-center me-2"><label v-show="budget.unit2 && budget.unit2 !== ''">
                  X</label></div> -->
                  <div style="width: 100px"></div>
              <div style="width: 120px"><input v-show="budget.unit2 && budget.unit2 !== ''" v-model="budget.amount2"
                  type="number" class="form-control beautiful-box w-100" :placeholder="budget.unit2"></div>
              <!-- <div style="width: 120px" class="text-center"><label v-show="budget.unit2 && budget.unit2 !== ''">{{
                  budget.unit2 }} X</label></div> -->
                  <div style="width: 100px"></div>
              <div style="width: 120px"><input v-show="budget.unit3 && budget.unit3 !== ''" v-model="budget.amount3"
                  type="number" class="form-control beautiful-box w-100" :placeholder="budget.unit3"></div>
              <!-- <div style="width: 100px" class="text-center"><label v-show="budget.unit3 && budget.unit3 !== ''">{{
                  budget.unit3 }} =</label></div> -->
                  <div style="width: 100px"></div>
              <div style="width: 120px"><input type="text" :value="parseFloat(budget.total || 0).toLocaleString('en-US')"
                  class="form-control beautiful-box w-100" readonly></div>
              <!-- <div style="width: 100px" class="text-center"><label>บาท</label></div> -->
               <div style="width: 100px"></div>
              <div v-if="showBudgetPopup === index && budget.info && budget.info !== ''" class="popup"
                :style="budgetPopupStyle">
                {{ budget.info }}
              </div>
            </div>
          </div>

          <div class="mb-2">
            <div class="d-flex align-items-center justify-content-between text-white fs-5 my-3">
              <div class="d-flex alignment-items-center">
                <input type="checkbox" class="form-check-input me-3 circle-input" v-model="enableBudgetDropdown"
                  id="enableBudgetDropdown">
                <select v-model="selectedBudgetToAdd" class="form-select bg-white text-black me-3" style="width: 450px; "
                  :disabled="!enableBudgetDropdown">
                  <option value="" disabled>+ เพิ่มรายการ (กรณีมีรายการเพิ่มนอกรายการข้างต้น)</option>
                  <option value="custom-budget">เพิ่มรายการเอง (ระบุ)</option>
                  <option v-for="budget in availableBudgets" :key="budget.id" :value="budget.id">{{ budget.label }}
                  </option>
                </select>

                <button v-if="enableBudgetDropdown && selectedBudgetToAdd" @click="addSelectedBudget"
                  class="btn btn-success btn-sm" :disabled="!selectedBudgetToAdd">
                  Add
                </button>
              </div>
            </div>
          </div>

          <div v-if="addedBudgets.length > 0" class="d-flex flex-column gap-3 text-white fs-5">
      <div v-for="(budget, index) in addedBudgets" :key="'added-' + index" class="budget-item">
        <div class="d-flex align-items-center">
          <div style="width: 40px">
            <input type="checkbox" class="form-check-input me-3 circle-input" :id="'added-' + budget.id"
              v-model="budget.checked">
          </div>
          <div style="width: 350px" class="me-3">
            <label :for="'added-' + budget.id" class="form-check-label"
              @mousemove="handleBudgetMouseMove($event, 'added-' + index)"
              @mouseover="showBudgetPopup = 'added-' + index" @mouseleave="showBudgetPopup = null">
              <template v-if="budget.id.startsWith('custom-budget')">
                <input type="text" v-model="budget.label" class="form-control beautiful-box"
                  placeholder="ระบุชื่อรายการ">
              </template>
              <template v-else>
                {{ budget.label }}
              </template>
            </label>
            <input v-if="budget.id.startsWith('bg10') || budget.id.startsWith('custom-budget')" type="text" v-model="budget.customText"
              class="form-control beautiful-box mt-1" placeholder="โปรดระบุรายละเอียดเพิ่มเติม">
          </div>
          <div style="width: 120px">
            <input v-model="budget.amount1" type="number" class="form-control beautiful-box w-100"
              @input="calculateTotal(budget)" :placeholder="budget.unit1">
          </div>
          <!-- <div style="width: 80px" class="text-center"><label>{{budget.unit1 }} </label></div>
          <div style="width: 20px" class="text-center me-2">
            <label v-show="budget.unit2 && budget.unit2 !== ''"> X</label>
          </div> -->
          <div style="width: 100px"></div>
          <div style="width: 120px">
            <input v-show="budget.unit2 && budget.unit2 !== ''" v-model="budget.amount2" type="number"
              class="form-control beautiful-box w-100" @input="calculateTotal(budget)" :placeholder="budget.unit2">
          </div>
          <!-- <div style="width: 120px" class="text-center">
            <label v-show="budget.unit2 && budget.unit2 !== ''">{{ budget.unit2 }} X</label>
          </div> -->
          <div style="width: 100px"></div>
          <div style="width: 120px">
            <input v-show="budget.unit3 && budget.unit3 !== ''" v-model="budget.amount3" type="number"
              class="form-control beautiful-box w-100" @input="calculateTotal(budget)" :placeholder="budget.unit3">
          </div>
          <!-- <div style="width: 100px" class="text-center">
            <label v-show="budget.unit3 && budget.unit3 !== ''">{{ budget.unit3 }} =</label>
          </div> -->
          <div style="width: 100px"></div>
          <div style="width: 120px">
            <input type="text" :value="parseFloat(budget.total || 0).toLocaleString('en-US')"
              class="form-control beautiful-box w-100" readonly>
          </div>
          <!-- <div style="width: 100px" class="text-center me-5"><label>บาท</label></div> -->
          <div style="width: 100px"></div>
          <div class="d-flex justify-content-end">
            <button @click="removeAddedBudget(index)" class="btn btn-danger btn-sm p-2" style="width: 80px;">
              <i class="bi bi-trash"></i> ลบ
            </button>
          </div>
        </div>

        <div v-if="showBudgetPopup === 'added-' + index && budget.info && budget.info !== 'null'" class="popup"
          :style="budgetPopupStyle">
          {{ budget.info }}
        </div>
      </div>
    </div>

          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end align-items-center">
              <div class="text-white fs-4 me-3 d-flex align-items-center">
                <label for="totalBudgetInput" class="me-2">รวมจำนวนเงินทั้งสิ้น:</label>
                <input type="text" id="totalBudgetInput"
                  :value="totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })"
                  class="form-control beautiful-box" readonly style="width: 200px;"> <span class="ms-2">บาท</span>
              </div>
            </div>
          </div>


          <div class="row justify-content-center">
              <div class="col-auto">
                  <button
                    class="btn btn-secondary"
                    style="width: 140px"
                    @click="prevStep"
                    :disabled="currentStep === 1"
                  >
                    ย้อนกลับ
                  </button>
              </div>

              <div class="col-auto">
                <button
                  class="btn text-white"
                  style="width: 140px; background-color: #0d6efd;"
                  @click="saveData()"
                >
                  <span>บันทึก</span>
                </button>
              </div>

              <div class="col-auto">
                <button
                  class="btn btn-success"
                  style="width: 140px"
                  @click="submitForm"
                  :disabled="!isCanGo"
                >
                  <span>ถัดไป</span>
                </button>
              </div>
            </div>
          
        </div>
      </div>
      <!-- <p class="text-center text-danger fs-3" v-if="budget_list[0].checked == true || budget_list[1].checked == true"></p>
      <p class="text-center text-danger fs-3" v-else>ในกรณีที่ไม่เป็นไปตาม ระเบียบ / ประกาศ ของทางมหาวิทยาลัยแม่ฟ้าหลวงให้ชี้แจง โดยกดปุ่ม “อธิบายเพิ่มเติม"</p> -->
    </div>
    <div class="floating-container" ref="menuContainer">
      <!-- ปุ่มไอคอน -->
      <div
        v-if="!showMenu"
        class="floating-icon"
        @click.stop="toggleMenu"
        title="ระเบียบและคำอธิบายเพิ่มเติม"
      >
        <i class="fa-solid fa-link"></i>
      </div>

      <!-- เมนูลิงก์ -->
      <div v-if="showMenu" class="link-menu">
        <a
          href="https://docs.google.com/spreadsheets/d/1mmFyQATSjLHDcSvlHSSk8-hd7ZksaGcfSFhuR546vww/edit?gid=1182232505"
          target="_blank"
          >ระเบียบฯ ฉบับย่อ-อัตราต่างๆ</a
        >
        <a
          href="https://docs.google.com/spreadsheets/d/10Ph3lMBpQZr2dUDi8KsR6Ua_Ji88OmqDKH1uJ1gSfj4/edit?pli=1&gid=929914857#gid=929914857"
          target="_blank"
          >คำอธิบายการเบิกค่าใช้จ่ายบริการวิชาการ</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onUnmounted, onMounted, computed ,onBeforeUnmount } from 'vue'
import parseJwt from '../../../../../utils/DecodeToken';
import Loader from '@/components/Loader.vue';
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar.vue'
import NavbarProject from '@/components/NavbarProject.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies";
import Swal from 'sweetalert2'
const router = useRouter()
const currentStep = ref(6);
const { cookies } = useCookies()
const route = useRoute()
const project_id = ref(null)
const project_type = ref(null)
const user_id = ref(null)
const affiliation_id = ref(null)
let isCanGo = ref(false)
let loading = ref(false)
const showPopup = ref(false);

const Project_Data_TS_P6 = reactive({
  project_id: '',
  project_type: '',
  budgets: [],
  net_total_cost: 0.00
});

const budget_list = ref([
  { id: 'bg1', label: 'ค่าตอบแทนวิทยากร', info: 'อัตราค่าตอบแทนไม่เกินชั่วโมงละ 500 บาทต่อคน', unit1: 'บาท', unit2: 'ชั่วโมง', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg2', label: 'ค่าตอบแทนผู้ช่วยวิทยากร', info: 'อัตราค่าตอบแทนไม่เกินชั่วโมงละ 250 บาทต่อคน', unit1: 'บาท', unit2: 'ชั่วโมง', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg3', label: 'เงินค่าอาหารทำการนอกเวลาสำหรับพนักงาน', info: 'วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท, นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท', unit1: 'บาท', unit2: 'วัน', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg4', label: 'เงินค่าอาหารทำการนอกเวลาสำหรับพนักงานขับรถ', info: 'วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท, นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท', unit1: 'บาท', unit2: 'วัน', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg5', label: 'ค่าอาหารกลางวัน (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg6', label: 'ค่าอาหารว่าง (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg7', label: 'ค่าอาหารเย็น (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg8', label: 'ค่าเช่ารถเหมายานพาหนะ', info: 'null', unit1: 'บาท', unit2: 'วัน', unit3: 'คัน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg9', label: 'ค่าน้ำมันเชื้อเพลิงรถเช่า', info: 'null', unit1: 'บาท', unit2: 'วัน', unit3: 'คัน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
  { id: 'bg10', label: 'ค่าวัสดุประกอบการอบรม', info: 'null', unit1: 'บาท', unit2: '', unit3: '', checked: false, amount1: '', amount2: '', amount3: '', total: '', customText: '' },
])

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
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const enableBudgetDropdown = ref(false);
const selectedBudgetToAdd = ref('');
const addedBudgets = ref([]);
const availableBudgets = computed(() => {
  // Filter out budgets that are already in the main list and not 'bg10' or its added instances
  // Also filter out budgets that have been added dynamically, except if they are 'custom-budget' which can be added multiple times.
  return budget_list.value.filter(budget =>
    !addedBudgets.value.some(added => added.id === budget.id)
  );
});
const showBudgetPopup = ref(null);
const budgetMousePosition = ref({ x: 0, y: 0 });
const budgetPopupStyle = ref({});



// const formatDecimal = (event, budget, field) => {

//   let value = event.target.value;
//   value = value.replace(/[^\d.]/g, '');

//   const decimalCount = value.split('.').length - 1;
//   if (decimalCount > 1) {
//     value = value.substring(0, value.lastIndexOf('.'));
//   }
//   if (value.includes('.')) {
//     const parts = value.split('.');
//     if (parts[1].length > 2) {
//       value = `${parts[0]}.${parts[1].substring(0, 2)}`;
//     }
//   }

//   budget[field] = value;
//   calculateTotal(budget);
// };

const calculateTotal = (budget) => {
  // For 'bg10' and custom-budget items, total is just amount1
  if (budget.id.startsWith('bg10') || budget.id.startsWith('custom-budget')) {
    budget.total = (parseFloat(budget.amount1) || 0).toFixed(2);
    return;
  }

  const amount1 = parseFloat(budget.amount1) || 0;
  const amount2 = parseFloat(budget.amount2) || (budget.unit1 && budget.unit1 !== '' ? 1 : 0);
  const amount3 = parseFloat(budget.amount3) || (budget.unit2 && budget.unit2 !== '' ? 1 : 0);
  budget.total = (amount1 * amount2 * amount3).toFixed(2);
};

const totalBudget = computed(() => {
  // Combine both original and added budgets
  const allBudgets = [...budget_list.value, ...addedBudgets.value];

  // Sum only checked budgets
  return allBudgets
    .filter(budget => budget.checked)
    .reduce((sum, budget) => {
      // Convert total to number (remove commas if present)
      const amount = parseFloat(String(budget.total).replace(/,/g, '')) || 0;
      return sum + amount;
    }, 0);
});
watch(totalBudget, (newTotal) => {
  Project_Data_TS_P6.net_total_cost = newTotal;
}, { immediate: true });

const addSelectedBudget = () => {
  if (selectedBudgetToAdd.value === 'custom-budget') {
    const newCustomBudget = {
      id: `custom-budget-${Date.now()}`,
      label: '', // This will be the user-typed label
      info: 'null',
      unit1: 'บาท',
      unit2: '',
      unit3: '',
      checked: true,
      amount1: '',
      amount2: '',
      amount3: '',
      total: '0',
      customText: '' // This field will be used if custom-budget needs extra info, similar to bg10
    };
    addedBudgets.value.push(newCustomBudget);
  } else if (selectedBudgetToAdd.value) {
    const originalBudget = budget_list.value.find(b => b.id === selectedBudgetToAdd.value);
    if (originalBudget) {
      const newBudget = {
        ...JSON.parse(JSON.stringify(originalBudget)),
        id: `${originalBudget.id}-${Date.now()}`, // Add unique identifier
        checked: true,
        amount1: '',
        amount2: '',
        amount3: '',
        total: '0',
        // Add this line to include customText for bg10 items
        customText: originalBudget.id === 'bg10' ? '' : undefined
      };
      addedBudgets.value.push(newBudget);
    }
  }
  selectedBudgetToAdd.value = ''; // Reset dropdown after adding
};

const prepareBudgetData = () => {
  const allBudgets = [...budget_list.value, ...addedBudgets.value];
  const itemsToSave = allBudgets
    .filter(budget => budget.checked)
    .map(budget => {
      const baseBudget = {
        id: budget.id,
        label: budget.label,
        amount1: parseFloat(budget.amount1) || 0,
        amount2: parseFloat(budget.amount2) || (budget.unit1 && budget.unit1 !== '' ? 1 : 0),
        amount3: parseFloat(budget.amount3) || (budget.unit2 && budget.unit2 !== '' ? 1 : 0),
        total: parseFloat(budget.total) || 0,
        unit1: budget.unit1,
        unit2: budget.unit2,
        unit3: budget.unit3,
        info: budget.info,
        checked: budget.checked, // Ensure checked status is saved
      };

      // Add customText only if it's a bg10 or custom-budget item
      if (budget.id.startsWith('bg10') || budget.id.startsWith('custom-budget')) {
        baseBudget.customText = budget.customText || '';
      }
      // For custom-budget, ensure the label is also saved (as it's user-defined)
      if (budget.id.startsWith('custom-budget')) {
        baseBudget.label = budget.label;
      }
      return baseBudget;
    });
  return {
    budget_items: itemsToSave,
    net_total_budget: totalBudget.value
  };
};

const removeAddedBudget = (index) => {
  addedBudgets.value.splice(index, 1);
};


const handleBudgetMouseMove = (event, index) => {
  budgetMousePosition.value = {
    x: event.clientX,
    y: event.clientY
  };
  budgetPopupStyle.value = {
    left: `${budgetMousePosition.value.x + 15}px`,
    top: `${budgetMousePosition.value.y + 15}px`,
    position: 'fixed'
  };
  showBudgetPopup.value = index;
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
    await getProjectData()
  }
})

const validateForm = () => {
  const allBudgets = [...budget_list.value, ...addedBudgets.value];

  // Check if at least one budget item is checked
  const hasCheckedBudget = allBudgets.some(budget => budget.checked);
  if (!hasCheckedBudget) {
    return false;
  }

  // Check all checked budgets
  for (const budget of allBudgets) {
    if (budget.checked) {
      // For bg10 and custom-budget items, we need amount1 and label/customText
      if (budget.id.startsWith('bg10') || budget.id.startsWith('custom-budget')) {
        const amount1 = parseFloat(budget.amount1);
        if (isNaN(amount1) || amount1 <= 0) {
          return false;
        }
        // For bg10, check customText. For custom-budget, check label.
        if (budget.id.startsWith('bg10') && !budget.customText?.trim()) {
          return false;
        }
        if (budget.id.startsWith('custom-budget') && !budget.label?.trim()) {
          return false;
        }
      }
      // For other items
      else {
        const amount1 = parseFloat(budget.amount1);
        if (isNaN(amount1) || amount1 <= 0) {
          return false;
        }

        if (budget.unit2 && budget.unit2 !== '') {
          const amount2 = parseFloat(budget.amount2);
          if (isNaN(amount2) || amount2 <= 0) {
            return false;
          }
        }

        if (budget.unit3 && budget.unit3 !== '') {
          const amount3 = parseFloat(budget.amount3);
          if (isNaN(amount3) || amount3 <= 0) {
            return false;
          }
        }
      }
    }
  }

  return true;
};



const getProjectData = async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/get/p_6', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value
    });

    budget_list.value = [
      { id: 'bg1', label: 'ค่าตอบแทนวิทยากร', info: 'อัตราค่าตอบแทนไม่เกินชั่วโมงละ 500 บาทต่อคน', unit1: 'บาท', unit2: 'ชั่วโมง', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg2', label: 'ค่าตอบแทนผู้ช่วยวิทยากร', info: 'อัตราค่าตอบแทนไม่เกินชั่วโมงละ 250 บาทต่อคน', unit1: 'บาท', unit2: 'ชั่วโมง', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg3', label: 'เงินค่าอาหารทำการนอกเวลาสำหรับพนักงาน', info: 'วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท, นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท', unit1: 'บาท', unit2: 'วัน', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg4', label: 'เงินค่าอาหารทำการนอกเวลาสำหรับพนักงานขับรถ', info: 'วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท, นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท', unit1: 'บาท', unit2: 'วัน', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg5', label: 'ค่าอาหารกลางวัน (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg6', label: 'ค่าอาหารว่าง (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg7', label: 'ค่าอาหารเย็น (ผู้เข้าร่วม และคณะทำงาน)', info: 'อาหารกลางวันและอาหารเย็น 150 บาท/คน/มื้ออาหารว่าง 50 บาท/คน/มื้อ', unit1: 'บาท', unit2: 'มื้อ', unit3: 'คน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg8', label: 'ค่าเช่ารถเหมายานพาหนะ', info: '', unit1: 'บาท', unit2: 'วัน', unit3: 'คัน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg9', label: 'ค่าน้ำมันเชื้อเพลิงรถเช่า', info: '', unit1: 'บาท', unit2: 'วัน', unit3: 'คัน', checked: false, amount1: '', amount2: '', amount3: '', total: '' },
      { id: 'bg10', label: 'ค่าวัสดุประกอบการอบรม', info: '', unit1: 'บาท', unit2: '', unit3: '', checked: false, amount1: '', amount2: '', amount3: '', total: '', customText: '' },
    ];
    addedBudgets.value = [];
    Project_Data_TS_P6.net_total_budget = 0;

    if (response.data?.success && response.data.data?.length > 0) {
      const projectData = response.data.data[0];
      let fetchedBudgetItems = [];

      try {
        if (projectData.project_data_p_6 && typeof projectData.project_data_p_6 === 'string') {
          const parsedP6Data = JSON.parse(projectData.project_data_p_6);

          if (parsedP6Data && typeof parsedP6Data === 'object' && Array.isArray(parsedP6Data.budget_items)) {
            fetchedBudgetItems = parsedP6Data.budget_items;

          } else if (Array.isArray(parsedP6Data)) {

            console.warn('Loading old P6 data format. net_total_budget will be recalculated.');
            fetchedBudgetItems = parsedP6Data;
          } else {
            console.warn('Unexpected P6 data format received:', parsedP6Data);
            return;
          }
        } else {

          return;
        }
      } catch (parseError) {
        console.error('Error parsing project_data_p_6 string from backend:', parseError);
        Toast.fire({ icon: 'error', title: 'ข้อมูลงบประมาณเดิมไม่ถูกต้อง' });
        return;
      }


      fetchedBudgetItems.forEach(fetchedBudget => {
        const originalIdPrefix = fetchedBudget.id?.split('-')[0];
        const isAddedBudget = fetchedBudget.id !== originalIdPrefix; // True if it's an added instance (e.g., bg1-123456789)
        const isCustomBudget = fetchedBudget.id?.startsWith('custom-budget');

        if (isCustomBudget) {
          // Recreate the custom budget item
          const newCustomBudget = {
            id: fetchedBudget.id,
            label: fetchedBudget.label || '',
            info: fetchedBudget.info || 'null',
            unit1: fetchedBudget.unit1 || 'บาท',
            unit2: fetchedBudget.unit2 || '',
            unit3: fetchedBudget.unit3 || '',
            checked: fetchedBudget.checked ?? true,
            amount1: fetchedBudget.amount1?.toString() || '',
            amount2: fetchedBudget.amount2?.toString() || '',
            amount3: fetchedBudget.amount3?.toString() || '',
            total: (fetchedBudget.total || 0).toString(),
            customText: fetchedBudget.customText || ''
          };
          addedBudgets.value.push(newCustomBudget);
        } else {
          const originalBudgetDefinition = budget_list.value.find(b => b.id === originalIdPrefix);

          if (originalBudgetDefinition && !isAddedBudget) {
            // It's one of the original fixed budget items
            Object.assign(originalBudgetDefinition, {
              checked: fetchedBudget.checked ?? true,
              amount1: fetchedBudget.amount1?.toString() || '',
              amount2: fetchedBudget.amount2?.toString() || '',
              amount3: fetchedBudget.amount3?.toString() || '',
              total: (fetchedBudget.total || 0).toString(),
              ...(originalIdPrefix === 'bg10' && { customText: fetchedBudget.customText || '' })
            });
          } else if (originalBudgetDefinition && isAddedBudget) {
            // It's an added instance of an original budget item
            const newAddedBudget = {
              ...JSON.parse(JSON.stringify(originalBudgetDefinition)),
              ...fetchedBudget,
              id: fetchedBudget.id,
              checked: fetchedBudget.checked ?? true,
              amount1: fetchedBudget.amount1?.toString() || '',
              amount2: fetchedBudget.amount2?.toString() || '',
              amount3: fetchedBudget.amount3?.toString() || '',
              total: (fetchedBudget.total || 0).toString()
            };
            addedBudgets.value.push(newAddedBudget);
          } else {
            console.warn('Fetched budget item has no matching original definition or unknown type:', fetchedBudget);
            // Fallback for potentially corrupted or unrecognized added items
            addedBudgets.value.push({
              id: fetchedBudget.id || `unrecognized-${Date.now()}`,
              label: fetchedBudget.label || 'รายการเพิ่มเติม (ไม่ระบุ)',
              info: fetchedBudget.info || '',
              unit1: fetchedBudget.unit1 || '',
              unit2: fetchedBudget.unit2 || '',
              unit3: fetchedBudget.unit3 || '',
              checked: fetchedBudget.checked ?? true,
              amount1: fetchedBudget.amount1?.toString() || '',
              amount2: fetchedBudget.amount2?.toString() || '',
              amount3: fetchedBudget.amount3?.toString() || '',
              total: (fetchedBudget.total || 0).toString(),
              customText: fetchedBudget.customText || ''
            });
          }
        }
      });
    } else {
    }
  } catch (error) {
    console.error('Failed to load project data:', error);
    Toast.fire({
      icon: 'error',
      title: 'ไม่สามารถโหลดข้อมูลโครงการได้'
    });
  }
};

const autoSave = async () => {
  const errors = validateForm();
  if (!errors) { // validateForm now returns true/false directly
    return false;
  }
  try {
    const dataToSave = JSON.stringify(prepareBudgetData());

    const response = await axios.post('http://localhost:5000/pl/TS/p_6/save', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: dataToSave
    })
    if (response.data.success) {
      return true; // Indicate success
    }
    else {
      throw new Error(response.data.message || 'Save Failed');
    }
  } catch (error) {
    console.error("Auto-save error:", error.response?.data || error.message);
    Toast.fire({
      icon: 'error',
      iconColor: 'red',
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    })
    return false; // Indicate failure
  }
}

const saveData = debounce(async () => {
  try {
    const dataToSave = JSON.stringify(prepareBudgetData());

    const response = await axios.post("http://localhost:5000/pl/TS/p_6/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: dataToSave
    });
    //console.log(response.data);
    if (response.data.success) {
      Project_Data_TS_P6.project_id = response.data.insert_id;
      Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกข้อมูลสำเร็จ`,
      })
      await setTimeout(() => {
                loading.value = false
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
},);

const submitForm = async () => {

  const isValid = validateForm(); // validateForm now returns boolean
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: 'ข้อมูลไม่สมบูรณ์',
      html: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วนและถูกต้อง', // More generic message as specific errors are handled by validateForm internal logic
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  try {
    loading.value = true
    const saveSuccessful = await autoSave(); // autoSave already shows toast for failure
    if (saveSuccessful) {
      await Toast.fire({
        icon: 'success',
        iconColor: 'green',
        title: `บันทึกข้อมูลสำเร็จ!`,
      })
      await setTimeout(() => {
        loading.value = false
      }, 1500);
      nextStep();
    } else {
      loading.value = false; // Stop loading if save wasn't successful
    }

  } catch (error) {
    console.error('Form submission error:', error);
    Toast.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม'
    });
    loading.value = false;
  }
};

const nextStep = () => {
  router.push({
    path: '/pl/TS/p_7',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
};

const prevStep = () => {
  router.push({
    path: '/pl/TS/p_5',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
};

watch(() => {
  isCanGo.value = validateForm(); // Call validateForm without args as it accesses refs directly
}, { deep: true, immediate: true });

watch(() => [...budget_list.value, ...addedBudgets.value], (budgets) => {
  budgets.forEach(budget => {
    calculateTotal(budget); // Recalculate total for each budget item on change
  });
}, { deep: true });

watch(
  [() => Project_Data_TS_P6.project_id,
  () => budget_list.value,
  () => addedBudgets.value],
  { deep: true }
);

const showMenu = ref(false);
const menuContainer = ref(null);

const toggleMenu = () => {
  showMenu.value = true;
};

const handleClickOutside = (event) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target)) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
 
</script>

<style lang="css" scoped>
.beautiful-box {
  height: 50px !important;
  border-radius: 6px !important;
}

.form-check-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-check-input {
  transform: scale(1.5);
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

.circle-input {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}
.floating-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.floating-icon {
  background-color: #007bff;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 20px;
}

.link-menu {
  margin-top: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.link-menu a {
  text-decoration: none;
  color: #333;
  padding: 5px 0;
}

.link-menu a:hover {
  color: #007bff;
}
</style>