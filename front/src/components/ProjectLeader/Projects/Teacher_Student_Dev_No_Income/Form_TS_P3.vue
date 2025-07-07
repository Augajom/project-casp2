<template>
  <div>
    <NavbarProject class="fixed-top " propText="โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน" />
    <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
    <Loader v-if="loading" />
    <div class="container-fluid" style="margin-top: 250px;">
      <div class="d-flex justify-content-center">
        <div class=" d-flex flex-column  border px-5 shadow p-3 mb-5 "
          style="max-width: 1200px;min-width: 1200px; background-color: #374375;border-radius: 12px;height: auto;">
          <div class="row text-white fs-3 my-3">
            <p>
              ส่วนที่ 3 หลักการและเหตุผล วัตถุประสงค์ ตัวชี้วัด
            </p>
          </div>

          <div class="mb-3">
            <div>
              <label for="principle_reason" class="form-label fs-5 text-white">
                หลักการและเหตุผล (ความสำคัญของโครงการ)
              </label>
              <textarea id="principle_reason" v-model="Project_Data_TS_P3.principle_reason" class="form-control beautiful-box mb-2"
                placeholder="โปรดระบุ" required></textarea>
            </div>
            <div>
              <label for="relate_to_other"
                class="form-label fs-5 text-white">ความเชื่อมโยงของโครงการกับแผนพัฒนามหาวิทยาลัยแม่ฟ้าหลวง และ/หรือแผนอื่น ๆ ที่เกี่ยวข้อง</label>
              <textarea id="relate_to_other" v-model="Project_Data_TS_P3.relate_to_other" class="form-control beautiful-box mb-2"
                placeholder="โปรดระบุ" required></textarea>
            </div>
            <div>
              <label for="objectives" class="form-label fs-5 text-white">วัตถุประสงค์โครงการ</label>
              <div class="d-flex align-items-center mb-2" v-for="(item, index) in Project_Data_TS_P3.objectives"
                :key="index">
                <textarea v-model="item.objective"
                  class="form-control beautiful-box mt-2"
                  :placeholder="`โปรดระบุวัตถุประสงค์ที่ ${index + 1}`"
                  required></textarea>
                <button class="btn btn-danger ms-2 mt-2" style="width:700px; height:50px;" v-if="index > 0"
                  @click="removeObjective(index)">
                  <div class="d-flex justify-content-center">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn align-items-center text-center shadow mt-2"
                  style="background-color: #0d6efd; color: white; width:400px; text-align:center"
                  @click="addObjective">
                  <div class="d-flex justify-content-center align-self-center">
                    <span class="material-icons">add</span>
                    <span>เพิ่มวัตถุประสงค์ของโครงการ</span>
                  </div>
                </button>
              </div>
            </div>
            <hr class="text-white">
          </div>


          <div class='mb-2'>
            <p class="text-white fs-5">เส้นทางสู่ผลกระทบของโครงการ (Impact Pathway)</p>
            <p class="text-white fs-6 ">1. ปัจจัยนำเข้าของโครงการ (Inputs) คือ
              ปัจจัยนำเข้าซึ่งเป็นปัจจัยที่ขับเคลื่อนให้งานบริการวิชาการสำเร็จและสร้างผลกระทบต่อสังคม ส่วนใหญ่ประกอบด้วย
            </p>
            <p class="text-white fs-6">&emsp;1.1 งบประมาณโครงการ<br>&emsp;1.2 หัวหน้าคณะบริหารโครงการ<br>&emsp;1.3 ระยะเวลาดำเนินการ</p>
            <div>
              <div class="d-flex align-items-center mt-1" v-for="(item, index) in Project_Data_TS_P3.inputs" :key="index">
                <textarea
                  v-model="item.input"
                  class="form-control beautiful-box mt-2"
                  :placeholder="`โปรดระบุปัจจัยนำเข้าที่ 1.${index + 4}`"
                  required
                ></textarea>
                <button class="btn btn-danger ms-2 mt-2" style="width:700px; height:50px;" v-if="index > 0"
                  @click="removeInput(index)">
                  <div class="d-flex justify-content-center ms-2">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn align-items-center text-center shadow mt-2"
                  style="background-color: #0d6efd; color: white; width:400px; text-align:center" @click="addInput">
                  <div class="d-flex align-self-center justify-content-center ">
                    <span class="material-icons">add</span>
                    <span>เพิ่มปัจจัยนำเข้า</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class='mb-2'>
            <p class="text-white fs-6">2. ผลผลิตของโครงการ (Output) ความคาดหวังสมรรถนะ (Competency Competence)<br>(ผลผลิตที่เกิดขึ้นทันที เกิดขึ้นโดยตรงหลังจากการดำเนินโครงการ/กิจกรรมแล้วเสร็จ)</p>
            <!-- <p class="text-white fs-6 ">(ผลผลิตที่เกิดขึ้นทันที เกิดขึ้นโดยตรงหลังจากการดำเนินโครงการ/กิจกรรมแล้วเสร็จ) -->
            <!-- </p> -->
            <div class="p-2">
              <p class="text-white fs-6 mb-0">
                2.1 จำนวนผู้เข้าร่วมโครงการไม่น้อยกว่าร้อยละ 80
              </p>
              <p class="text-white fs-6 mb-0">
                2.2 ผู้เข้าร่วมโครงการมีความพึงพอใจในระดับค่าเฉลี่ยรวมไม่น้อยกว่า 4.50
              </p>
            </div>
            <div>
              <div class="d-flex align-items-center mt-1" v-for="(item, index) in Project_Data_TS_P3.outputs"
                :key="index">
                <textarea
                  v-model="item.output"
                  class="form-control beautiful-box mt-2"
                  :disabled="item.disable"
                  :placeholder="`โปรดระบุผลผลิตที่ 2.${index + 3}`"
                  row="1"
                  required
                ></textarea>
                <button class="btn btn-danger ms-2 mt-2" style="width:700px; height:50px;" v-if="index > 0"
                  @click="removeOutput(index)">
                  <div class="d-flex justify-content-center">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn align-items-center text-center shadow mt-2"
                  style="background-color: #0d6efd; color: white; width:400px; text-align:center" @click="addOutput">
                  <div class="d-flex align-self-center justify-content-center">
                    <span class="material-icons">add</span>
                    <span>เพิ่มผลผลิต</span>
                  </div>
                </button>
              </div>
            </div>
          </div>


          <div class='mb-2'>
            <p class="text-white fs-6">3. ผลลัพธ์ที่คาดว่าจะได้รับจากการดำเนินโครงการ (Outcome)
              (ผลที่เกิดต่อเนื่องมาจากผลผลิต)</p>
            <p class="text-white fs-6 ">&emsp;3.1 ผู้ใช้ประโยชน์จากผลผลิตของงาน และโครงการที่เกิดผลลัพธ์ (User) คือ
              ผู้ใช้ประโยชน์จากผลผลิตของงานบริการวิชาการ งานบริการที่เกิดผลลัพธ์ที่สำคัญต้องมีผู้ใช้ประโยชน์ (User)
              มีการยอมรับหรือการนำไปใช้ในหลายระดับ</p>
            <div>
              <div class="d-flex align-items-center mt-1" v-for="(item, index) in Project_Data_TS_P3.outcome_users"
                :key="index">
                <textarea
                  v-model="item.outcome_user"
                  class="form-control beautiful-box mt-2"
                  :placeholder="`โปรดระบุผลลัพธ์ผู้ใช้ประโยชน์ที่ ${index + 1}`"
                  required
                ></textarea>
                <button class="btn btn-danger ms-2 mt-2" style="width:700px; height:50px;" v-if="index > 0"
                  @click="removeOutcome_user(index)">
                  <div class="d-flex justify-content-center">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn align-items-center text-center shadow mt-2"
                  style="background-color: #0d6efd; color: white; width:400px; text-align:center"
                  @click="addOutcome_user">
                  <div class="d-flex align-self-center justify-content-center">
                    <span class="material-icons">add</span>
                    <span>เพิ่มผู้ใช้ประโยชน์</span>
                  </div>
                </button>
              </div>
            </div>
            <p class="text-white fs-6 mt-2">&emsp;3.2 การเปลี่ยนแปลงที่เกิดขึ้น (Change) คือ
              การเปลี่ยนแปลงที่เกิดขึ้นพิจารณาการใช้ประโยชน์ผลผลิต (Output) แยกตามผู้ใช้ (User)
              แต่ละประเภทซึ่งการเปลี่ยนแปลงอาจเกิดขึ้นต่างช่วงเวลากัน</p>
            <div>
              <div class="d-flex align-items-center mt-1" v-for="(item, index) in Project_Data_TS_P3.outcome_changes"
                :key="index">
                <textarea
                  v-model="item.outcome_change"
                  class="form-control beautiful-box mt-2"
                  :placeholder="`โปรดระบุผลลัพธ์การเปลี่ยนแปลงข้อที่ ${index + 1}`"
                  required
                ></textarea>
                <button class="btn btn-danger ms-2 mt-2" style="width:700px; height:50px;" v-if="index > 0"
                  @click="removeOutcome_change(index)">
                  <div class="d-flex justify-content-center ">
                    <span class="material-icons">delete</span>
                    <span>ลบ</span>
                  </div>
                </button>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn align-items-center text-center shadow mt-2"
                  style="background-color: #0d6efd; color: white; width:400px; text-align:center"
                  @click="addOutcome_change">
                  <div class="d-flex align-self-center justify-content-center">
                    <span class="material-icons">add</span>
                    <span>เพิ่มการเปลี่ยนแปลงที่เกิดขึ้น</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class='mb-2'>
            <p class="text-white fs-6">4.ผลกระทบที่เกิดขึ้นจากการดำเนินโครงการ (Impact) คือ การเปลี่ยนแปลงจากผลลัพธ์ในวงกว้างทั่วไปสามารถกำหนดผลกระทบออกเป็น 3 ประเภท
              ซึ่งขึ้นอยู่กับลักษณะของโครงการสามารถก่อให้เกิดผลกระทบเพียง 1 หรือ 2 หรือ 3 ประเภทได้
              พิจารณาได้ทั้งผลกระทบทางตรงและทางอ้อม ที่เป็นเชิงบวกและเชิงลบ<br>(สามารถเลือกได้มากกว่า 1 ด้าน)</p>

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input circle-input" type="checkbox" id="impact_economy" v-model="impactEconomyChecked">
                <label for="impact_economy" class="text-white">ผลกระทบด้านเศรษฐกิจ</label>
              </div>
              <div v-if="impactEconomyChecked" class="mt-2">
                <div class="d-flex align-item-center mt-2" v-for="(item, index) in Project_Data_TS_P3.impact_economy"
                  :key="'economy-' + index">
                  <textarea
                    v-model="item.economy"
                    class="form-control beautiful-box"
                    :placeholder="`โปรดระบุผลกระทบที่เกิดขึ้นด้านเศรษฐกิจที่ ${index + 1}`"
                    required
                  ></textarea>
                  <button class="btn btn-danger ms-2" style="width:120px; height:50px;" v-if="index > 0"
                    @click="removeImpact('economy', index)">
                    <div class="d-flex justify-content-center  align-items-center">
                      <span class="material-icons">delete</span>
                      <span class="ms-1">ลบ</span>
                    </div>
                  </button>
                  <button class="btn d-flex justify-content-center align align-item-center text-center shadow ms-2"
                    style="background-color: #0d6efd; color: white; width:700px; text-align:center" v-if="index === 0"
                    @click="addImpact('economy')">
                    <div class="d-flex align align-self-center ">
                      <span class="material-icons">add</span>
                      <span class="ms-1">เพิ่มการเปลี่ยนแปลงที่เกิดขึ้น</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <!-- </div> -->

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input circle-input" type="checkbox" id="impact_socialty" v-model="impactSocialtyChecked">
                <label for="impact_socialty" class="text-white">ผลกระทบด้านสังคม</label>
              </div>
              <div v-if="impactSocialtyChecked" class="mt-2">
                <div class="d-flex align-item-center mt-2" v-for="(item, index) in Project_Data_TS_P3.impact_socialty"
                  :key="'socialty-' + index">
                  <textarea
                    v-model="item.socialty"
                    class="form-control beautiful-box"
                    :placeholder="`โปรดระบุผลกระทบที่เกิดขึ้นด้านสังคมที่ ${index + 1}`"
                    required
                  ></textarea>
                  <button class="btn btn-danger ms-2" style="width:120px; height:50px;" v-if="index > 0"
                    @click="removeImpact('socialty', index)">
                    <div class="d-flex justify-content-center  align-items-center">
                      <span class="material-icons">delete</span>
                      <span class="ms-1">ลบ</span>
                    </div>
                  </button>
                  <button class="btn d-flex justify-content-center align align-item-center text-center shadow ms-2"
                    style="background-color: #0d6efd; color: white; width:700px; text-align:center" v-if="index === 0"
                    @click="addImpact('socialty')">
                    <div class="d-flex align align-self-center ">
                      <span class="material-icons">add</span>
                      <span class="ms-1">เพิ่มการเปลี่ยนแปลงที่เกิดขึ้น</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

           
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input circle-input" type="checkbox" id="impact_environment"
                  v-model="impactEnvironmentChecked">
                <label for="impact_environment" class="text-white">ผลกระทบด้านสิ่งแวดล้อม</label>
              </div>
              <div v-if="impactEnvironmentChecked" class="mt-2">
                <div class="d-flex align-item-center mt-2" v-for="(item, index) in Project_Data_TS_P3.impact_environment"
                  :key="'environment-' + index">
                  <textarea
                    v-model="item.environment"
                    class="form-control beautiful-box"
                    :placeholder="`โปรดระบุผลกระทบที่เกิดขึ้นด้านสิ่งแวดล้อมที่ ${index + 1}`"
                    required
                  ></textarea>
                  <button class="btn btn-danger ms-2" style="width:120px; height:50px;" v-if="index > 0"
                    @click="removeImpact('environment', index)">
                    <div class="d-flex justify-content-center align-items-center">
                      <span class="material-icons">delete</span>
                      <span class="ms-1">ลบ</span>
                    </div>
                  </button>
                  <button class="btn d-flex justify-content-center align align-item-center text-center shadow ms-2"
                    style="background-color: #0d6efd; color: white; width:700px; text-align:center" v-if="index === 0"
                    @click="addImpact('environment')">
                    <div class="d-flex align align-self-center ">
                      <span class="material-icons">add</span>
                      <span class="ms-1">เพิ่มการเปลี่ยนแปลงที่เกิดขึ้น</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <!-- <hr class="text-white"> -->
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->


          <div class="mb-2">
            <label for="toc" class="form-label fs-6 text-white" @mouseover="showPopup = true"
              @mouseleave="showPopup = false">5. ทฤษฎีการเปลี่ยนเแปลง (ToC)
                  ข้อความ/ประโยคสั้นๆ ที่จะอธิบายให้เห็นถึงโครงการ สู่ผลลัพธ์ และเป้าหมายระยะยาว <br>"ถ้ามีโครงการ .. (ชื่อโครงการฯ/กิจกรรม) ... แล้ว
                            จะทำให้ ... (ผู้ที่ใช้ประโยชน์ พื้นที่ ฯลฯ) (ผลลัพธ์) ..
                            นำมาสู่ ... (ผลกระทบ) ..."
                  <br>ตัวอย่าง “ถ้ามีโครงการคัดกรองมะเร็งเต้านมและมะเร็งปากมดลูกในพื้นที่ดอยตุงแล้ว
                      จะทำให้ชาวบ้านบนดอยตุงมีคุณภาพชีวิตที่ดีขึ้น 
                      ลดความเสี่ยงในการเสียชีวิตจากการเป็นมะเร็ง
                      นำมาสู่การลดภาระค่าใช้จ่ายด้านสาธารณสุข และมีสุขภาวะชุมชนยั่งยืน” 
                  </label>
                <!-- TOC (ข้อความหรือประโยคสั้นๆ
              ที่จะอธิบายให้เห็นถึงโครงการสู่ผลลัพธ์และเป้าหมายระยะยาว เพื่อให้อ่านแล้วเข้าใจภาพรวมของโครงการ) -->
            <textarea id="toc" v-model="Project_Data_TS_P3.toc" class="form-control beautiful-box"
              placeholder="อธิบายผลกระทบที่เกิดขึ้น" rows="1"></textarea>
            <div v-if="showPopup" class="popup">
              ตัวอย่าง>> ถ้ามีโครงการส่งมอบอาหารให้คนไร้บ้านแล้ว จะทำให้คนไร้บ้านมีภาวะอดอยากลดลง
              ในระยะยาวนำมาซึ่งคุณภาพชีวิตของคนไร้บ้านและปัญหาสังคมลดลง
            </div>
          </div>


          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end">

              <button class="btn btn-secondary" style="width: 140px;" @click="prevStep">ย้อนกลับ</button>
            </div>
            <div class="col-6">
              <!-- <router-link to="/pl/TS/p_4"> -->
              <button class="btn btn-success" style="width: 140px;" @click="submitForm" :disabled="!isCanGo">
                <span>บันทึก</span></button>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, watch, onUnmounted, onMounted } from 'vue'
import parseJwt from '../../../../../utils/DecodeToken';
import Loader from '@/components/Loader.vue';
import axios from 'axios'
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

const currentStep = ref(3);
const showPopup = ref(false);

const impactEconomyChecked = ref(false);
const impactSocialtyChecked = ref(false);
const impactEnvironmentChecked = ref(false);

// let isInitialized = false
// let canEdit = false
let isCanGo = ref(false)
let loading = ref(false)

var Project_Data_TS_P3 = reactive({
  project_id: '',
  project_type: '',
  principle_reason: '',
  relate_to_other: '',
  objectives: [{
    objective: ''
  }],
  inputs: [{
    input: ''
  }],
  outputs: [
    { output: '' }
  ],
  outcome_users: [{
    outcome_user: ''
  }],
  outcome_changes: [{
    outcome_change: ''
  }],
  toc: '',
  impact_economy: [{ economy: '' }],
  impact_socialty: [{ socialty: '' }],
  impact_environment: [{ environment: '' }],
})

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  //   iconColor: 'black',
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

//logic frontend
const addObjective = () => {
  if (Project_Data_TS_P3.objectives.length < 10) {
    Project_Data_TS_P3.objectives.push({
      objective: ''
    });
  } else {
    alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
  }
};
const removeObjective = (index) => {
  Project_Data_TS_P3.objectives.splice(index, 1);
};

const addInput = () => {
  if (Project_Data_TS_P3.inputs.length < 10) {
    Project_Data_TS_P3.inputs.push({
      input: ''
    });
  } else {
    alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
  }
};
const removeInput = (index) => {
  Project_Data_TS_P3.inputs.splice(index, 1);
};

const addOutput = () => {
  if (Project_Data_TS_P3.outputs.length < 10) {
    Project_Data_TS_P3.outputs.push({
      output: '', disable: false
    });
  } else {
    alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
  }
};
const removeOutput = (index) => {
  Project_Data_TS_P3.outputs.splice(index, 1);
};

const addOutcome_user = () => {
  if (Project_Data_TS_P3.outcome_users.length < 10) {
    Project_Data_TS_P3.outcome_users.push({
      outcome_user: ''
    });
  } else {
    alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
  }
};
const removeOutcome_user = (index) => {
  Project_Data_TS_P3.outcome_users.splice(index, 1);
};

const addOutcome_change = () => {
  if (Project_Data_TS_P3.outcome_changes.length < 10) {
    Project_Data_TS_P3.outcome_changes.push({
      outcome_change: ''
    });
  } else {
    alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
  }
};
const removeOutcome_change = (index) => {
  Project_Data_TS_P3.outcome_changes.splice(index, 1);
};

const addImpact = (type) => {
  if (type === 'economy') {
    if (Project_Data_TS_P3.impact_economy.length < 10) {
      Project_Data_TS_P3.impact_economy.push({
        economy: ''
      });
    } else {
      alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
    }
  } else if (type === 'socialty') {
    if (Project_Data_TS_P3.impact_socialty.length < 10) {
      Project_Data_TS_P3.impact_socialty.push({
        socialty: ''
      });
    } else {
      alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
    }
  } else if (type === 'environment') {
  
    if (Project_Data_TS_P3.impact_environment.length < 10) {
      Project_Data_TS_P3.impact_environment.push({
        environment: ''
      });
    } else {
      alert('สามารถเพิ่มได้สูงสุด 10 รายการเท่านั้น');
    }
  }
};

const removeImpact = (type, index) => {
  if (type === 'economy') {
    Project_Data_TS_P3.impact_economy.splice(index, 1);
  } else if (type === 'socialty') {
    Project_Data_TS_P3.impact_socialty.splice(index, 1);
  } else if (type === 'environment') {
    Project_Data_TS_P3.impact_environment.splice(index, 1);
  }
};
//end of logic frontend

//try
const validateForm = (projectData) => {
  const data = projectData;

  if (!projectData) return false;
  if (!projectData?.principle_reason?.trim()) return false;
  if (!data.relate_to_other?.trim()) return false;

  if (!data.objectives || data.objectives.length === 0 || data.objectives.some(obj => !obj.objective?.trim())) {
    return false;
  }

  if (!data.inputs || data.inputs.length === 0 || data.inputs.some(input => !input.input?.trim())) {
    return false;
  }

  if (!data.outputs || data.outputs.length === 0 || data.outputs.some(output => !output.output?.trim())) {
    return false;
  }

  if (!data.outcome_users || data.outcome_users.length === 0 || data.outcome_users.some(user => !user.outcome_user?.trim())) {
    return false;
  }

  if (!data.outcome_changes || data.outcome_changes.length === 0 || data.outcome_changes.some(change => !change.outcome_change?.trim())) {
    return false;
  }

  if (!data.toc?.trim()) return false;

  // Impact checks
  if (impactEconomyChecked.value) {
    if (data.impact_economy.length === 0 || data.impact_economy.some(item => !item.economy?.trim())) {
      return false;
    }
  }

  if (impactSocialtyChecked.value) {
    if (data.impact_socialty.length === 0 || data.impact_socialty.some(item => !item.socialty?.trim())) {
      return false;
    }
  }

  if (impactEnvironmentChecked.value) {
    if (data.impact_environment.length === 0 || data.impact_environment.some(item => !item.environment?.trim())) {
      return false;
    }
  }

  if (!impactEconomyChecked.value && !impactSocialtyChecked.value && !impactEnvironmentChecked.value) {
    return false;
  }

  return true;
};

const getProjectData = async () => {
  try {
    const response = await axios.post('http://localhost:5000/pl/TS/get/p_3', {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value
    });

    watch(impactEconomyChecked, (newValue) => {
  if (newValue && Project_Data_TS_P3.impact_economy.length === 0) {
    Project_Data_TS_P3.impact_economy.push({ economy: '' });
  }
});

watch(impactSocialtyChecked, (newValue) => {
  if (newValue && Project_Data_TS_P3.impact_socialty.length === 0) {
    Project_Data_TS_P3.impact_socialty.push({ socialty: '' });
  }
});

watch(impactEnvironmentChecked, (newValue) => {
  if (newValue && Project_Data_TS_P3.impact_environment.length === 0) {
    Project_Data_TS_P3.impact_environment.push({ environment: '' });
  }
});

    if (response.data?.success && response.data.data?.length > 0) {
      const project_data = JSON.parse(response.data.data[0].project_data_p_3);
      
      // Update all fields including impact sections
      Object.assign(Project_Data_TS_P3, {
        ...project_data,
        project_id: project_id.value,
        project_type: project_type.value
      });

      // Set checkbox states based on actual data
      impactEconomyChecked.value = Project_Data_TS_P3.impact_economy?.some(item => item.economy?.trim());
      impactSocialtyChecked.value = Project_Data_TS_P3.impact_socialty?.some(item => item.socialty?.trim());
      impactEnvironmentChecked.value = Project_Data_TS_P3.impact_environment?.some(item => item.environment?.trim());

      // // Clear impact data if checkbox is unchecked
      // if (!impactEconomyChecked.value) {
      //   Project_Data_TS_P3.impact_economy = [{ economy: '' }];
      // }
      // if (!impactSocialtyChecked.value) {
      //   Project_Data_TS_P3.impact_socialty = [{ socialty: '' }];
      // }
      // if (!impactEnvironmentChecked.value) {
      //   Project_Data_TS_P3.impact_environment = [{ environment: '' }];
      // }
    } else {
      // Initialize with empty data
      Object.assign(Project_Data_TS_P3, {
        project_id: project_id.value,
        project_type: project_type.value,
        principle_reason: '',
        relate_to_other: '',
        objectives: [{ objective: '' }],
        inputs: [{ input: '' }],
        outputs: [
          { output: '' }
        ],
        outcome_users: [{ outcome_user: '' }],
        outcome_changes: [{ outcome_change: '' }],
        toc: '',
        impact_economy: [{ economy: '' }],
        impact_socialty: [{ socialty: '' }],
        impact_environment: [{ environment: '' }],
      });
      impactEconomyChecked.value = false;
      impactSocialtyChecked.value = false;
      impactEnvironmentChecked.value = false;
    }
  } catch (error) {
    console.error('Failed to load project data:', error);
    Toast.fire({
      icon: 'error',
      title: 'ไม่สามารถโหลดข้อมูลโครงการได้'
    });
  }
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
  //try
  else {
    // Handle case where project_id is missing
    Swal.fire('Error', 'ไม่พบรหัสโครงการ', 'error');
    router.push({ path: '/pl/TS/p_2' });
  }
  //end of try
})


const autoSave = async () => {
  try {
//try
const dataToSave = {
      ...Project_Data_TS_P3,
      impact_economy: impactEconomyChecked.value ? Project_Data_TS_P3.impact_economy : [],
      impact_socialty: impactSocialtyChecked.value ? Project_Data_TS_P3.impact_socialty : [],
      impact_environment: impactEnvironmentChecked.value ? Project_Data_TS_P3.impact_environment : []
    };
    //end of try

    const response = await axios.post('http://localhost:5000/pl/TS/p_3/save',
      {
        project_id: project_id.value,
        project_type: project_type.value,
        project_user: user_id.value,
        project_data: dataToSave
      })
    //console.log(response.data)
    if (response.data.success) {
      Toast.fire({
        icon: 'success',
        iconColor: 'green',
        title: `บันทึกข้อมูลสำเร็จ`,
      })
      return true;
    }throw new Error('Save failed')
  } catch (error) {
    console.error(error)
    Toast.fire({
      icon: 'error',
      iconColor: 'red',
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    })
    return false;
  }
}

const submitForm = async () => {
  loading.value = true
  try {
    const saved = await autoSave();
    if (saved) {
      await setTimeout(() => {
                loading.value = false
              }, 500)
      nextStep();
    }
  } catch (error) {
    console.error('Form submission error:', error);
    Toast.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม'
    });
  }
};

//try

watch(
  [
    () => Project_Data_TS_P3.principle_reason,
    () => Project_Data_TS_P3.relate_to_other,
    () => Project_Data_TS_P3.objectives,
    () => Project_Data_TS_P3.inputs,
    () => Project_Data_TS_P3.outputs,
    () => Project_Data_TS_P3.outcome_users,
    () => Project_Data_TS_P3.outcome_changes,
    () => Project_Data_TS_P3.toc,
    () => Project_Data_TS_P3.impact_economy,
    () => Project_Data_TS_P3.impact_socialty,
    () => Project_Data_TS_P3.impact_environment,
    impactEconomyChecked,
    impactSocialtyChecked,
    impactEnvironmentChecked
  ],
  () => {
    isCanGo.value = validateForm(Project_Data_TS_P3);
  },
  { deep: true, immediate: true }
);
//end of try

const nextStep = () => {
  router.push({
    path: '/pl/TS/p_4',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
};

const prevStep = () => {
  router.push({
    path: '/pl/TS/p_2',
    query: {
      project_id: project_id.value,
      project_type: project_type.value
    }
  })
};

// watch(() => ({ ...Project_Data_TS_P3 }), () => {
//   autoSave();
// }, { deep: true });
</script>

<style lang="css" scoped>
.beautiful-box {
  min-height: 50px;
  border-radius: 6px;
  resize: vertical;
}

.popup {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.918);
  z-index: 10;
  color: white;
  padding: 10px;
  margin-top: 50px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  transform: translateX(-50%);
  top: 1500px;
  left: 300px;
}
.circle-input{
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}
</style>