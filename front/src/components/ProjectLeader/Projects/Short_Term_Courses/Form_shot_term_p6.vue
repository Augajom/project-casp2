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
            <p>ส่วนที่ 6 งบประมาณรายจ่าย (กรอกเฉพาะตัวเลขเท่านั้น)</p>
          </div>

          <div class="mb-3 p-3">
            <div class="row mt-2">
              <div class="col-1">
                <input
                  class="form-check-input circle-input"
                  type="checkbox"
                  v-model="Project_Data_ST_P6.compensation.checked"
                />
              </div>
              <div class="col-11">
                <label
                  class="form-check-label text-white fs-5"
                  for="flexCheckDefault"
                >
                  หมวดค่าตอบแทน
                </label>
              </div>
              <div
                v-if="Project_Data_ST_P6.compensation.checked"
                class="row d-flex justify-content-center mt-3"
              >
                <div
                  class="text-white"
                  style="min-width: 890px; max-width: 890px"
                >
                  <div
                    v-if="
                      Project_Data_ST_P6.compensation.selectedCompensations !==
                      0
                    "
                  >
                    <div
                      class="row"
                      v-for="comp in Project_Data_ST_P6.compensation
                        .selectedCompensations"
                      :key="comp.id"
                    >
                      <div class="row">
                        <div
                          class="col-1 d-flex flex-column justify-content-center"
                        >
                          <!-- <div class="row d-flex justify-content-center">
                                <input v-model="comp.note.checked" class="form-check-input"  type="checkbox" >
                              </div> -->
                          <div class="row d-flex justify-content-center">
                            <p
                              @click="noteToggle(comp)"
                              v-if="!comp.note.checked"
                              class="text-white text-center btn btn-outline-warning"
                              style="font-size: 10px; cursor: pointer"
                            >
                              อธิบาย<br />เพิ่มเติม
                            </p>
                            <p
                              @click="noteToggle(comp)"
                              v-else
                              class="text-white text-center btn btn-outline-warning"
                              style="font-size: 10px; cursor: pointer"
                            >
                              ซ่อนหมายเหตุ
                            </p>
                          </div>
                        </div>

                        <div
                          class="col-2 d-flex justify-content-center align-items-center"
                          @mouseover="showPopup = comp.id"
                          @mousemove="handleMouseMove($event, comp.id)"
                          @mouseleave="showPopup = null"
                        >
                          <p>{{ comp.name }}</p>
                          <div v-if="showPopup === comp.id" class="popup" :style="popupStyle">
                            {{ comp.categories.comment }}
                          </div>
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="comp.categories.unit1"
                            v-model="comp.unit1"
                            :placeholder="comp.categories.unit1"
                          />
                        </div>
                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="comp.categories.unit2"
                            v-model="comp.unit2"
                            :placeholder="comp.categories.unit2"
                          />
                        </div>
                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="comp.categories.unit3"
                            v-model="comp.unit3"
                            :placeholder="comp.categories.unit3"
                          />
                        </div>
                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="comp.categories.unit4"
                            v-model="comp.unit4"
                            :placeholder="comp.categories.unit4"
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            min="0"
                            style="width: 5.5rem; margin-right: 2rem"
                            :value="
                              Math.floor(
                                comp.unit1 *
                                  comp.unit2 *
                                  comp.unit3 *
                                  (comp.unit4 || 1)
                              ).toLocaleString('en-US')
                            "
                            placeholder="ผลรวม"
                            disabled
                          />
                        </div>
                        <div
                          class="col-1 d-flex justify-content-center align-items-center"
                        >
                          <button
                            @click="removeCompensation(comp.id)"
                            class="btn btn-sm btn-danger"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="comp.note.checked" class="row mx-3 my-2">
                          <input
                            type="text"
                            class="form-control"
                            v-model="comp.note.value"
                            :placeholder="'หมายเหตุสำหรับ ' + comp.name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row d-flex justify-content-center mt-3"
                    style="left: 13px; position: relative"
                  >
                    <select
                      class="form-select"
                      v-model="selectedOptionId"
                      @change="addCompensation"
                    >
                      <option value="" disabled selected>
                        เลือกรายการ หมวดค่าตอบเเทน
                      </option>
                      <option
                        v-for="option in compensationOptions"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- หมวดค่าอาหาร -->
            <div class="row mt-2">
              <div class="col-1">
                <input
                  class="form-check-input circle-input"
                  v-model="Project_Data_ST_P6.foodAccommodation.checked"
                  type="checkbox"
                />
              </div>
              <div class="col-11">
                <label
                  class="form-check-label text-white fs-5"
                  for="flexCheckDefault"
                >
                  หมวดค่าอาหารและเครื่องดื่ม และค่าที่พัก
                </label>
              </div>
              <div
                v-if="Project_Data_ST_P6.foodAccommodation.checked"
                class="row d-flex justify-content-center mt-3"
              >
                <div
                  class="text-white"
                  style="min-width: 890px; max-width: 890px"
                >
                  <div
                    v-if="
                      Project_Data_ST_P6.foodAccommodation
                        .selectedFoodAccommodation !== 0
                    "
                  >
                    <div
                      class="row"
                      v-for="food in Project_Data_ST_P6.foodAccommodation
                        .selectedFoodAccommodation"
                      :key="food.id"
                    >

                      <div class="row">
                        <div
                          class="col-1 d-flex flex-column justify-content-center"
                        >
                          <!-- <div class="row d-flex justify-content-center">
                                <input v-model="food.note.checked" class="form-check-input"  type="checkbox" >
                              </div> -->
                          <div class="row d-flex justify-content-center">
                            <p
                              @click="noteToggle(food)"
                              v-if="!food.note.checked"
                              class="text-white text-center btn btn-outline-warning"
                              style="font-size: 10px; cursor: pointer"
                            >
                              อธิบาย<br />เพิ่มเติม
                            </p>
                            <p
                              @click="noteToggle(food)"
                              v-else
                              class="text-white text-center btn btn-outline-warning"
                              style="font-size: 10px; cursor: pointer"
                            >
                              ซ่อนหมายเหตุ
                            </p>
                          </div>
                        </div>
                        <div
                          class="col-2 d-flex justify-content-center align-items-center"
                          @mouseover="showPopup = food.id"
                          @mousemove="handleMouseMove($event, food.id)"
                          @mouseleave="showPopup = null"
                        >
                          <p>{{ food.name }}</p>
                          <div v-if="showPopup === food.id" class="popup" :style="popupStyle">
                            {{ food.categories.comment }}
                          </div>
                        </div>
                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="food.categories.unit1"
                            v-model="food.unit1"
                            :placeholder="food.categories.unit1"
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="food.categories.unit2"
                            v-model="food.unit2"
                            :placeholder="food.categories.unit2"
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            type="number"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-if="food.categories.unit3"
                            v-model="food.unit3"
                            :placeholder="food.categories.unit3"
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            min="0"
                            style="width: 6rem; margin-right: 2rem"
                            v-model="food.unit4"
                            v-if="food.categories.unit4"
                            :placeholder="food.categories.unit4"
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center mx-3"
                        >
                          <input
                            class="form-control"
                            min="0"
                            style="width: 5.5rem; margin-right: 2rem"
                            :value="
                              Math.floor(
                                food.unit1 *
                                  (food.unit2 || 1) *
                                  (food.unit3 || 1) *
                                  (food.unit4 || 1)
                              ).toLocaleString('en-US')
                            "
                            placeholder="ผลรวม"
                            disabled
                          />
                        </div>

                        <div
                          class="col-1 d-flex justify-content-center align-items-center"
                        >
                          <button
                            @click="removefoodAccommodation(food.id)"
                            class="btn btn-sm btn-danger"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="food.note.checked" class="row mx-3 my-2">
                          <input
                            type="text"
                            class="form-control"
                            v-model="food.note.value"
                            :placeholder="'หมายเหตุสำหรับ ' + food.name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row d-flex justify-content-center mt-3"
                    style="left: 13px; position: relative"
                  >

                    <select
                      class="form-select"
                      v-model="selectedOptionId"
                      @change="addfoodAccommodation"
                    >
                      <option value="" disabled selected>
                        เลือกรายการ หมวดค่าอาหารและเครื่องดื่ม และค่าที่พัก
                      </option>
                      <option
                        v-for="option in foodAccommodationOptions"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- หมวดค่าใช้จ่ายอื่น ๆ -->
            <div class="row mt-2">
              <div class="col-1">
                <input
                  class="form-check-input circle-input"
                  v-model="Project_Data_ST_P6.otherExpenses.checked"
                  type="checkbox"
                />
              </div>
              <div class="col-11">
                <label
                  class="form-check-label text-white fs-5"
                  for="flexCheckDefault"
                >
                  หมวดค่าใช้จ่ายอื่น ๆ
                </label>
              </div>
              <div
                v-if="Project_Data_ST_P6.otherExpenses.checked"
                class="row d-flex justify-content-center mt-3"
              >
                <div
                  class="text-white"
                  style="min-width: 890px; max-width: 890px"
                  v-if="
                    Project_Data_ST_P6.otherExpenses.selectedOtherExpenses
                      .length !== 0
                  "
                >
                  <div
                    class="row"
                    v-for="other in Project_Data_ST_P6.otherExpenses
                      .selectedOtherExpenses"
                    :key="other.id"
                  >
                    <div class="row">
                      <div
                        class="col-1 d-flex flex-column justify-content-center"
                      >
                        <!-- <div class="row d-flex justify-content-center">
                                <input v-model="food.note.checked" class="form-check-input"  type="checkbox" >
                              </div> -->
                        <div class="row d-flex justify-content-center">
                          <p
                            @click="noteToggle(other)"
                            v-if="!other.note.checked"
                            class="text-white text-center btn btn-outline-warning"
                            style="font-size: 10px; cursor: pointer"
                          >
                            อธิบาย<br />เพิ่มเติม
                          </p>
                          <p
                            @click="noteToggle(other)"
                            v-else
                            class="text-white text-center btn btn-outline-warning"
                            style="font-size: 10px; cursor: pointer"
                          >
                            ซ่อนหมายเหตุ
                          </p>
                        </div>
                      </div>
                      <div
                        class="col-2 d-flex justify-content-center align-items-center"
                        @mouseover="showPopup = other.id"
                        @mousemove="handleMouseMove($event, other.id)"
                        @mouseleave="showPopup = null"
                      >
                        <p>{{ other.name }}</p>
                        <div v-if="showPopup === other.id" class="popup" :style="popupStyle">
                          {{ other.categories.comment }}
                        </div>
                      </div>
                      <div
                        class="col-1 d-flex justify-content-center align-items-center mx-3"
                      >
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          style="width: 6rem; margin-right: 2rem"
                          v-if="other.categories.unit1"
                          v-model="other.unit1"
                          :placeholder="other.categories.unit1"
                        />
                      </div>
                      <div
                        class="col-1 d-flex justify-content-center align-items-center mx-3"
                      >
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          style="width: 6rem; margin-right: 2rem"
                          v-if="other.categories.unit2"
                          v-model="other.unit2"
                          :placeholder="other.categories.unit2"
                        />
                      </div>
                      <div
                        class="col-1 d-flex justify-content-center align-items-center mx-3"
                      >
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          style="width: 6rem; margin-right: 2rem"
                          v-if="other.categories.unit3"
                          v-model="other.unit3"
                          :placeholder="other.categories.unit3"
                        />
                      </div>
                      <div
                        class="col-1 d-flex justify-content-center align-items-center mx-3"
                      >
                        <input
                          class="form-control"
                          min="0"
                          style="width: 6rem; margin-right: 2rem"
                          v-if="other.categories.unit4"
                          v-model="other.unit4"
                          :placeholder="other.categories.unit4"
                        />
                      </div>

                      <div
                        class="col-1 d-flex justify-content-center align-items-center mx-3"
                      >
                        <input
                          class="form-control"
                          min="0"
                          style="width: 5.5rem; margin-right: 2rem"
                          :value="
                            Math.floor(
                              other.unit1 *
                                (other.unit2 || 1) *
                                (other.unit3 || 1) *
                                (other.unit4 || 1)
                            ).toLocaleString('en-US')
                          "
                          placeholder="ผลรวม"
                          disabled
                        />
                      </div>

                      <div
                        class="col-1 d-flex justify-content-center align-items-center"
                      >
                        <button
                          @click="removeOtherExpense(other.id)"
                          class="btn btn-sm btn-danger"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div v-if="other.note.checked" class="row mx-3 my-2">
                        <input
                          type="text"
                          class="form-control"
                          v-model="other.note.value"
                          :placeholder="'หมายเหตุสำหรับ ' + other.name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row d-flex justify-content-center mt-3"
                  style="left: 13px; position: relative; width: 57rem"
                >
                  <select
                    class="form-select"
                    v-model="selectedOptionId"
                    @change="addOtherExpense"
                  >
                    <option value="" disabled selected>
                      เลือกรายการ หมวดค่าใช้จ่ายอื่น ๆ
                    </option>
                    <option
                      v-for="option in otherExpensesOptions"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3 d-flex justify-content-center">
            <div class="row" style="left: -40px; position: relative">
              <div class="col-3 text-white fs-6">รวมจำนวนเงินทั้งสิ้น</div>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control text-center"
                  :value="formattedCostPerPerson"
                  disabled
                />
              </div>
              <div class="col-1 text-white">บาท</div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-auto">
              <router-link
                :to="{
                  path: '/pl/st/p_5',
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
      <p
        class="text-center text-danger fs-3"
        v-if="
          Project_Data_ST_P6.compensation.checked == true ||
          Project_Data_ST_P6.foodAccommodation.checked == true ||
          Project_Data_ST_P6.otherExpenses.checked == true
        "
      ></p>
      <p class="text-center text-danger fs-3" v-else>
        ในกรณีที่ไม่เป็นไปตาม ระเบียบ/ประกาศ
        ของทางมหาวิทยาลัยแม่ฟ้าหลวงให้ชี้แจง โดยกดปุ่ม “อธิบายเพิ่มเติม"
      </p>
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
import axios from "axios";
import ProgressBar from "@/components/ProgressBar.vue";
import parseJwt from "../../../../../utils/DecodeToken";
import {
  ref,
  reactive,
  watch,
  onMounted,
  computed,
  onBeforeUnmount,
} from "vue";
import NavbarProject from "@/components/NavbarProject.vue";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import Loader from "@/components/Loader.vue";

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

const currentStep = ref(6);
let loading = ref(false);
const project_id = ref(null);
const project_type = ref(null);
const user_id = ref(null);
const affiliation_id = ref(null);

let isInitialized = false;
let canEdit = false;
let isCanGo = false;

const showPopup = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const popupStyle = ref({});

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


const Project_Data_ST_P6 = reactive({
  compensation: {
    checked: false,
    selectedCompensations: [],
  },
  foodAccommodation: {
    checked: false,
    selectedFoodAccommodation: [],
  },
  otherExpenses: {
    checked: false,
    selectedOtherExpenses: [],
  },
  totalFc:0,
  totalVc:0,
  total: 0,
});

const formattedCostPerPerson = computed(() => {
  const cost = Project_Data_ST_P6.total;

  if (!isNaN(cost)) {
    return cost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "0.00";
});

function calculateTotal() {
  let total = 0;
  let totalFc = 0;
  let totalVc = 0;

  const groups = [
    Project_Data_ST_P6.compensation.selectedCompensations,
    Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation,
    Project_Data_ST_P6.otherExpenses.selectedOtherExpenses,
  ];

  for (const group of groups) {
    for (const item of group) {
      const price = Number(item.unit1) || 0;
      const qty2 = Number(item.unit2) || 1;
      const qty3 = Number(item.unit3) || 1;
      const qty4 = Number(item.unit4) || 1;

      const type = item.categories?.type?.toLowerCase() || "";
      const totalItem = price * qty2 * qty3 * qty4;

      if (type === "fc") {
        totalFc += totalItem;
      } else if (type === "vc") {
        const peopleCount = qty2 > 0 ? qty2 : 1;
        totalVc += totalItem / peopleCount;
      }

      total += totalItem;
    }
  }

  
  Project_Data_ST_P6.total = total;
  Project_Data_ST_P6.totalFc = totalFc;
  Project_Data_ST_P6.totalVc = totalVc;
  
  console.log("รวมทั้งหมด (Total):", total.toFixed(2));
  console.log("รวม FC (Fixed Cost):", totalFc.toFixed(2));
  console.log("รวม VC (Variable Cost):", totalVc.toFixed(2));
  
}

watch(
  () => [
    Project_Data_ST_P6.compensation.selectedCompensations,
    Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation,
    Project_Data_ST_P6.otherExpenses.selectedOtherExpenses,
  ],
  () => {
    calculateTotal();
  },
  { deep: true }
);

const selectedOptionId = ref("");

const compensationOptions = ref([
  {
    id: 1,
    name: "เงินค่าอาหารทำการนอกเวลา สำหรับพนักงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `1. วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท
2. นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 2,
    name: "เงินค่าอาหารทำการนอกเวลา สำหรับพนักงานขับรถ",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `1. วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท
2. นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 3,
    name: "เงินค่าอาหารทำการนอกเวลา สำหรับพนักงานชั่วคราวรายเดือน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `1. วันทำการปกติ เวลา 16.00-19.30 น. วันละ 200 บาท
2. นอกเวลาทำการ (ทำงานเกิน 8 ชั่วโมง) วันละ 300 บาท`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 4,
    name: "เงินค่าอาหารทำการนอกเวลา สำหรับพนักงานชั่วคราวรายวัน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `วันทำการปกติ/หยุดทำการ เวลา 16.00-19.30 น. วันละ 200 บาท`,},
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 5,
    name: "ค่าตอบแทนวิทยากรภายใน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `อัตราค่าตอบแทนไม่เกินชั่วโมงละ 1,500 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 6,
    name: "ค่าตอบแทนวิทยากรภายนอก",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `อัตราค่าตอบแทนไม่เกินชั่วโมงละ 1,500 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 7,
    name: "ค่าตอบแทนผู้ช่วยวิทยากรภายใน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `อัตราค่าตอบแทนไม่เกินชั่วโมงละ 750 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 8,
    name: "ค่าตอบแทนผู้ช่วยวิทยากรภายนอก",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `อัตราค่าตอบแทนไม่เกินชั่วโมงละ 750 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 9,
    name: "ค่าตอบแทนนักศึกษาช่วยงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `นักศึกษาช่วยงานด้านวิชาการ 60 บาท/ชั่วโมง
นักศึกษาช่วยงานด้านสนับสนุนทั่วไป 30 บาท/ชั่วโมง
หากเบิกค่าอาหารและเครื่องดื่มจะไม่สามารถเบิกในส่วนนี้ได้`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 10,
    name: "ค่าตอบแทนอื่น",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "ชั่วโมง", unit4: "วัน", comment: `เช่น ค่าวิพากษ์หลักสูตร ค่าตอบแทนการสอบภาคปฏิบัติ ค่าตอบแทนล่าม ค่าตอบแทนพิธีกร ค่าตอบแทนผู้เชี่ยวชาญ เป็นต้น`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 11,
    name: "ค่าเบี้ยเลี้ยง",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `ปฏิบัติงานต่างจังหวัด 350 บาท/วัน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
]);
const foodAccommodationOptions = ref([
  {
    id: 1,
    name: "ค่าอาหารกลางวันอาจารย์",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารกลางวันไม่เกิน 250 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 2,
    name: "ค่าอาหารเย็นอาจารย์",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารเย็นไม่เกิน 300 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 3,
    name: "ค่าอาหารว่างอาจารย์",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารว่างและเครื่องดื่มไม่เกิน 80 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 4,
    name: "ค่าอาหารกลางวันผู้บริหาร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารกลางวันไม่เกิน 250 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 5,
    name: "ค่าอาหารเย็นผู้บริหาร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารเย็นไม่เกิน 300 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 6,
    name: "ค่าอาหารว่างผู้บริหาร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารว่างและเครื่องดื่มไม่เกิน 80 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 7,
    name: "ค่าอาหารกลางวันวิทยากร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารกลางวันไม่เกิน 250 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 8,
    name: "ค่าอาหารเย็นวิทยากร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารเย็นไม่เกิน 300 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 9,
    name: "ค่าอาหารว่างวิทยากร",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารว่างและเครื่องดื่มไม่เกิน 80 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 10,
    name: "ค่าอาหารกลางวันผู้เข้าร่วมโครงการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารกลางวันไม่เกิน 250 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 11,
    name: "ค่าอาหารเย็นผู้เข้าร่วมโครงการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารเย็นไม่เกิน 300 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 12,
    name: "ค่าอาหารว่างผู้เข้าร่วมโครงการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารว่างและเครื่องดื่มไม่เกิน 80 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 13,
    name: "ค่าอาหารในงานเลี้ยงผู้เข้าร่วมโครงการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารในงานเลี้ยงไม่เกิน 550 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 14,
    name: "ค่าอาหารในงานเลี้ยงคณะทำงาน (วิทยากร อาจารย์ พนักงาน)",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารในงานเลี้ยงไม่เกิน 550 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 15,
    name: "ค่าอาหารกลางวันนักศึกษา",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารกลางวันไม่เกิน 150 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 16,
    name: "ค่าอาหารเย็นนักศึกษา",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารเย็นไม่เกิน 150 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 17,
    name: "ค่าอาหารว่างนักศึกษา",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "มื้อ", unit4: "วัน", comment: `ค่าอาหารว่างและเครื่องดื่มไม่เกิน 50 บาท/คน/มื้อ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 18,
    name: "ค่าที่พักผู้บริหารและบุคคลทั่วไป",
    categories: { type:"fc",unit1: "บาท", unit2: "คน", unit3: "คืน", comment: `จ่ายจริง ไม่เกิน 1,800 บาท/คืน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 19,
    name: "ค่าที่พักผู้เข้าร่วมโครงการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", unit3: "คืน", comment: `จ่ายจริง ไม่เกิน 1,800 บาท/คืน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 20,
    name: "ค่าที่พักหัวหน้าฝ่าย",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "คืน", comment: `จ่ายจริง ไม่เกิน 1,600 บาท/คืน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 21,
    name: "ค่าที่พักพนักงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "คืน", comment: `จ่ายจริง ไม่เกิน 1,400 บาท/คืน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 22,
    name: "ค่าที่พักนักศึกษา",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "คืน", comment: `จ่ายจริง ไม่เกิน 1,000 บาท/คืน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
]);
const otherExpensesOptions = ref([
  {
    id: 1,
    name: "ค่าเบี้ยเลี้ยงพนักงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", unit3: "วัน", comment: `ปฏิบัติงานต่างจังหวัด 250 บาท/วัน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 2,
    name: "ค่ารับรองวิทยากร",
    categories: {type:"fc", unit1: "บาท", unit2: "วัน", comment: `ไม่เกินวันละ 1,500 บาท `, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 3,
    name: "ค่าจ้างเหมาบริการอื่น ๆ",
    categories: {type:"fc", unit1: "บาท", unit2: "งาน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 4,
    name: "ค่ายานพาหนะเครื่องบินผู้บริหาร/อาจารย์",
    categories: {type:"fc", unit1: "บาท", unit2: "เที่ยว", unit3: "คน", comment: `ไป - กลับไม่เกิน 5,500 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 5,
    name: "ค่ายานพาหนะเครื่องบินหัวหน้าฝ่าย",
    categories: {type:"fc", unit1: "บาท", unit2: "เที่ยว", unit3: "คน", comment: `ไป - กลับไม่เกิน 5,000 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 6,
    name: "ค่ายานพาหนะเครื่องบินพนักงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "เที่ยว", unit3: "คน", comment: `ไป-กลับไม่เกิน 4,000 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 7,
    name: "ค่ายานพาหนะเครื่องบิน (วิทยากรภายนอก / บุคคลทั่วไป)",
    categories: {type:"fc", unit1: "บาท", unit2: "เที่ยว", unit3: "คน", comment: `ไป - กลับไม่เกิน 5,500 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 8,
    name: "ค่าพาหนะในการเดินทางไปปฏิบัติงาน (รถยนต์ส่วนบุคคล)",
    categories: {type:"fc", unit1: "บาท", unit2: "กม.", unit3: "เที่ยว", comment: `ระยะทาง 4 บาท/กิโลเมตร `, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 9,
    name: "ค่าพาหนะในการเดินทางไปปฏิบัติงาน",
    categories: {type:"fc", unit1: "บาท", unit2: "เที่ยว", unit3: "คน", unit4: "วัน", comment: `เหมาจ่าย ไป - กลับ TAXI ไม่เกิน 700 บาท/คน`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 10,
    name: "ค่าเช่าเหมายานพาหนะ พร้อมน้ำมันเชื้อเพลิง",
    categories: {type:"fc", unit1: "บาท", unit2: "คัน", unit3: "วัน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 11,
    name: "ค่าเช่าเหมาบริการ-ยานพาหนะ",
    categories: {type:"fc", unit1: "บาท", unit2: "คัน", unit3: "วัน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 12,
    name: "ค่าวัสดุเชื้อเพลิงและหล่อลื่น",
    categories: {type:"fc", unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 13,
    name: "ค่าเวชภัณฑ์ที่มิใช่ยา",
    categories: { type:"fc",unit1: "บาท", comment: `ผ้าพันแผล สำลี ถุงมือยาง หน้ากากอนามัย แอลกอฮอล์ล้างแผล พลาสเตอร์ปิดแผล ฯลฯ`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 14,
    name: "ค่าวัสดุเวชภัณฑ์ยา",
    categories: {type:"fc", unit1: "บาท", comment: `ยาภายในและภายนอก`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 15,
    name: "ค่าวัสดุอุปโภค/บริโภค",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 16,
    name: "ค่าวัสดุห้องปฏิบัติการ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 17,
    name: "ค่าวัสดุสื่อ/ตำรา/วารสาร",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 18,
    name: "ค่าวัสดุสำนักงาน",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 19,
    name: "ค่าวัสดุวิทยาศาสตร์เครื่องสำอางฯ",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 20,
    name: "ค่าวัสดุวิทยาศาสตร์",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 21,
    name: "ค่าวัสดุไฟฟ้าและวิทยุ",
    categories: { type:"fc",unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 22,
    name: "ค่าวัสดุทันตกรรม",
    categories: { type:"vc",unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 23,
    name: "ค่าวัสดุตกแต่ง",
    categories: {type:"fc", unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 24,
    name: "ค่าวัสดุงานบ้านงานครัว",
    categories: { type:"vc",unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 25,
    name: "ค่าวัสดุคอมพิวเตอร์",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 26,
    name: "ค่าวัสดุกีฬา",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 27,
    name: "ค่าวัสดุการเกษตร",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 28,
    name: "ค่าวัสดุก่อสร้างและประปา",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 29,
    name: "ค่าไปรษณีย์และขนส่ง",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 30,
    name: "ค่าบรรจุภัณฑ์",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 31,
    name: "ค่าธรรมเนียมอื่น",
    categories: {type:"fc", unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 32,
    name: "ค่าธรรมเนียมธนาคาร",
    categories: { type:"fc",unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 33,
    name: "ค่าถ่ายเอกสารและเข้าเล่ม",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 34,
    name: "ค่าดอกไม้",
    categories: {type:"fc", unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 35,
    name: "ค่าใช้จ่ายประชาสัมพันธ์",
    categories: {type:"fc", unit1: "บาท", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 36,
    name: "ค่าใช้จ่ายเงินสนับสนุนกิจกรรมนักศึกษา",
    categories: {type:"fc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 37,
    name: "ค่าจ้างซักผ้า",
    categories: {type:"fc", unit1: "บาท", unit2: "งาน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 38,
    name: "ค่าของขวัญ/เงินรางวัล",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 39,
    name: "ค่าของขวัญ/ของที่ระลึก",
    categories: {type:"vc", unit1: "บาท", unit2: "คน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  },
  {
    id: 40,
    name: "ค่าเช่า/บำรุงสถานที่",
    categories: {type:"fc", unit1: "บาท", unit2: "ห้อง", unit3: "วัน", comment: `ไม่มีความหมาย`, },
    note: { checked: false, value: "" },
    hide: false,
  }
]);


// It works
const addCompensation = () => {
  if (!selectedOptionId.value) return;

  const option = compensationOptions.value.find(
    (opt) => opt.id === parseInt(selectedOptionId.value)
  );
  if (!option) return;

  const newCompensation = {
    id: Date.now(),
    name: option.name,
    unit1: null,
    unit2: null,
    unit3: null,
    unit4: null,
    note: { checked: false, value: "" },
    categories: option.categories || {},
  };

  Project_Data_ST_P6.compensation.selectedCompensations.push(newCompensation);

  selectedOptionId.value = "";
};
// It works
const removeCompensation = (id) => {
  Project_Data_ST_P6.compensation.selectedCompensations =
    Project_Data_ST_P6.compensation.selectedCompensations.filter(
      (comp) => comp.id !== id
    );
};
// It works
const noteToggle = (state) => {
  state.note.checked = !state.note.checked; // สลับค่า checked
};
// It works
const addfoodAccommodation = () => {
  if (!selectedOptionId.value) return;

  const option = foodAccommodationOptions.value.find(
    (opt) => opt.id === parseInt(selectedOptionId.value)
  );
  if (!option) return;

  const newfoodAccommodation = {
    id: Date.now(),
    name: option.name,
    unit1: null,
    unit2: null,
    unit3: null,
    unit4: null,
    note: { checked: false, value: "" },
    categories: option.categories || {},
  };

  Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation.push(
    newfoodAccommodation
  );

  selectedOptionId.value = "";
};
// It works
const removefoodAccommodation = (id) => {
  Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation =
    Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation.filter(
      (state) => state.id !== id
    );
};
// It works
const addOtherExpense = () => {
  if (!selectedOptionId.value) return;

  const option = otherExpensesOptions.value.find(
    (opt) => opt.id === parseInt(selectedOptionId.value)
  );
  if (!option) return;

  const newotherExpenses = {
    id: Date.now(),
    name: option.name,
    unit1: null,
    unit2: null,
    unit3: null,
    unit4: null,
    note: { checked: false, value: "" },
    categories: option.categories || {},
  };

  Project_Data_ST_P6.otherExpenses.selectedOtherExpenses.push(newotherExpenses);

  selectedOptionId.value = "";
};
// It works
const removeOtherExpense = (id) => {
  Project_Data_ST_P6.otherExpenses.selectedOtherExpenses =
    Project_Data_ST_P6.otherExpenses.selectedOtherExpenses.filter(
      (comp) => comp.id !== id
    );
};

watch(
  () => Project_Data_ST_P6.total,
  (newTotal) => {
    if (newTotal === 0) {
      isCanGo = false;
    } else {
      isCanGo = true;
    }
  }
);
const submitForm = async () => {
  loading.value = true;
  await autoSave();
   nextStep();
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
    const response = await axios.post("http://localhost:5000/pl/ST/get/p_6", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data = JSON.parse(response.data.data[0].project_data_p_6);
    //console.log("data", project_data.total);
    Project_Data_ST_P6.compensation = project_data.compensation;
    Project_Data_ST_P6.foodAccommodation = project_data.foodAccommodation;
    Project_Data_ST_P6.otherExpenses = project_data.otherExpenses;
    Project_Data_ST_P6.totalFc = project_data.totalFc;
    Project_Data_ST_P6.totalVc = project_data.totalVc;
    Project_Data_ST_P6.total = project_data.total;
    // //console.log('sending a request to fetch editing data project id = ',project_id)
  } catch (err) {
    //console.log(err);
    //console.log("error fetching editing data = ", project_id.value);
  }
};

const saveData = debounce(async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/pl/p_6/shot_term/save",
      {
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: Project_Data_ST_P6,
        project_affiliation: affiliation_id.value,
      }
    );
    //console.log(response.data);
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

const autoSave = debounce(async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/pl/p_6/shot_term/save",
      {
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: Project_Data_ST_P6,
        project_affiliation: affiliation_id.value,
      }
    );
    //console.log(response.data);
    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log("project_id", project_id.value);
      router.replace({
        path: "/pl/st/p_7",
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
});


// func for checked
const backupData = ref({
  compensation: [],
  foodAccommodation: [],
  otherExpenses: [],
});

watch(
  Project_Data_ST_P6,
  (newVal) => {
    let valid = true;

    const hasItems =
      newVal.compensation.selectedCompensations.length > 0 ||
      newVal.foodAccommodation.selectedFoodAccommodation.length > 0 ||
      newVal.otherExpenses.selectedOtherExpenses.length > 0;

    if (!hasItems) {
      valid = false;
    }

    const checkUnits = (items) => {
      for (const item of items) {
        const price = Number(item.unit1);
        const qty2 = Number(item.unit2);
        const qty3 = Number(item.unit3);
        const qty4 = Number(item.unit4);

        const hasPrice = !isNaN(price) && price > 0;
        const hasQuantity = !isNaN(qty2) || !isNaN(qty3) || !isNaN(qty4);

        if (!hasPrice || !hasQuantity) {
          valid = false;
        }
      }
    };

    checkUnits(newVal.compensation.selectedCompensations);
    checkUnits(newVal.foodAccommodation.selectedFoodAccommodation);
    checkUnits(newVal.otherExpenses.selectedOtherExpenses);

    isCanGo = valid; // ✅ ทำงานได้แล้ว
  },
  { deep: true, immediate: true }
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
  //console.log("Project id:", project_id.value);
  //console.log("Project Type:", project_type.value);
  //console.log("user_id:", user_id.value);
});

// Compensation
watch(
  () => Project_Data_ST_P6.compensation.checked,
  (newVal) => {
    if (!newVal) {
      backupData.value.compensation = JSON.parse(
        JSON.stringify(Project_Data_ST_P6.compensation.selectedCompensations)
      );
      Project_Data_ST_P6.compensation.selectedCompensations.forEach((item) => {
        item.unit1 = 0;
        item.unit2 = 0;
        item.unit3 = 0;
        item.unit4 = 0;
        item.note = { checked: false, value: "" };
      });
      Project_Data_ST_P6.compensation.selectedCompensations = [];
    } else {
      if (
        backupData.value.compensation.length > 0 &&
        Project_Data_ST_P6.compensation.selectedCompensations.length === 0
      ) {
        Project_Data_ST_P6.compensation.selectedCompensations = JSON.parse(
          JSON.stringify(backupData.value.compensation)
        );
      }
    }
  }
);

// Food & Accommodation
watch(
  () => Project_Data_ST_P6.foodAccommodation.checked,
  (newVal) => {
    if (!newVal) {
      backupData.value.foodAccommodation = JSON.parse(
        JSON.stringify(
          Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation
        )
      );
      Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation.forEach(
        (item) => {
          item.unit1 = 0;
          item.unit2 = 0;
          item.unit3 = 0;
          item.unit4 = 0;
          item.note = { checked: false, value: "" };
        }
      );
      Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation = [];
    } else {
      if (
        backupData.value.foodAccommodation.length > 0 &&
        Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation
          .length === 0
      ) {
        Project_Data_ST_P6.foodAccommodation.selectedFoodAccommodation =
          JSON.parse(JSON.stringify(backupData.value.foodAccommodation));
      }
    }
  }
);

// Other Expenses
watch(
  () => Project_Data_ST_P6.otherExpenses.checked,
  (newVal) => {
    if (!newVal) {
      backupData.value.otherExpenses = JSON.parse(
        JSON.stringify(Project_Data_ST_P6.otherExpenses.selectedOtherExpenses)
      );
      Project_Data_ST_P6.otherExpenses.selectedOtherExpenses.forEach((item) => {
        item.unit1 = 0;
        item.unit2 = 0;
        item.unit3 = 0;
        item.unit4 = 0;
        item.note = { checked: false, value: "" };
      });
      Project_Data_ST_P6.otherExpenses.selectedOtherExpenses = [];
    } else {
      if (
        backupData.value.otherExpenses.length > 0 &&
        Project_Data_ST_P6.otherExpenses.selectedOtherExpenses.length === 0
      ) {
        Project_Data_ST_P6.otherExpenses.selectedOtherExpenses = JSON.parse(
          JSON.stringify(backupData.value.otherExpenses)
        );
      }
    }
  }
);

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

.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.918);
  z-index: 1000;
  color: white;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  pointer-events: none;
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
