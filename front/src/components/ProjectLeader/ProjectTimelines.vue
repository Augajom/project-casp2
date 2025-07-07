<template>
  <div>
      <Navbar />
        <div >
            <img src="../../assets/arrow_back.png" @click="router.back()" class="mx-2 mt-2"  style="width: 20px;cursor: pointer;" alt="arrow_back">
        </div>
        <div class="container-md border p-4 mt-5 bg-primary shadow p-3 mb-5" style="border-radius: 15px;">
            <div class="row mt-3">
                <div class="col-6 px-3 fw-light" style="color: white;">{{ data.project_type_thai_name }}</div>
                <div class="col-6 px-3 text-end" style="color: white;">
                    <span>ข้อมูลอัพเดทล่าสุดเมื่อ : </span>
                    <span>{{ formatDate(data.project_created_at) }}</span>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6 fs-5 px-3 text-box" style="color: white; max-width: 40.4rem;">{{ project_info.project_name }}</div>
                <div class="col-6 px-3 text-end" style="color: white;">
                    <span>เเก้ไขล่าสุดเมื่อ : </span>
                    <span>{{ formatDate(data.update_at) }}</span>
                </div>
            </div>
            <div class="row mt-2 px-3 mb-3" style="color: white;">
                <div class="col-6">
                    <span class="row fw-light">
                        เสนอโดย {{ data.user_name }}
                    </span>
                    <span class="row fw-light">
                        หน่วยงาน{{ data.affiliation_name }}
                    </span>
                </div>
                <div class="col-6"></div>
            </div>
            <div class="px-5 my-5">
                <div v-if="Array.isArray(timeline) && timeline.length != 0" class="timeline">
                    <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
                        <div class="dot active" ></div>
                        
                        <div v-if="index !== timeline.length - 1" class="line"></div>

                        <div class="content">
                            <div class="status-line">
                                <strong v-if="item.status_id == 2" ><span class="text-warning">{{ item.status }}</span>  </strong> 
                                <strong v-else-if="item.status_id == 3" ><span class="text-danger">{{ item.status }}</span>  </strong> 
                                <strong v-else-if="item.status_id == 4" ><span class="text-warning">{{ item.status }}</span>  </strong> 
                                <strong v-else-if="item.status_id == 5" ><span class="text-danger">{{ item.status }}</span>  </strong> 
                                <strong v-else-if="item.status_id == 6" ><span class="text-warning">{{ item.status }}</span>  </strong> 
                                <strong v-else-if="item.status_id == 7"><span class="text-danger">{{ item.status }}</span> </strong>
                                <strong v-else-if="item.status_id > 7"><span class="text-success">{{ item.status }}</span> </strong>
                                <span v-if="item.detail != null" class="by"> : {{ item.detail }}</span>
                                <span v-else class="by text-secondary"></span>
                            </div>
                            <div class="date" v-if="item.date">เมื่อวันที่ {{ formatDate(item.date) }}</div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-white py-10 p-5" style="border:1.8px dashed white;border-radius: 15px;">
                    <div class="text-3xl mb-2">
                      <img src="../../assets/pending_actions.png" width="35px" alt="pending">
                    </div>
                    <p class="text-lg font-semibold">ยังไม่มีข้อมูลแสดงผลในขณะนี้</p>
                    <p class="text-sm text-gray-300">ระบบจะอัพเดทสถานะเมื่อมีความคืบหน้า</p>
                </div>
            </div>
            
            <div v-if="existingFiles.length > 0" class="mx-2">
              <p class="text-white fs-5" style="position: relative; margin-top: 1rem;">
                ไฟล์แนบ
              </p>
              <div
                v-for="file in existingFiles"
                :key="file"
                class="mb-2"
              >
                <a
                  class="btn btn-sm btn-secondary"
                  style="margin: 0 0 0.5rem 0;"
                  :href="`http://localhost:5000/Files/${file}`"
                  :download="file"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ file.split('-').slice(5).join('-') }}
                </a>
              </div>
            </div>


            <div class="mb-3 px-2">
              <div class="fs-5 text-white">รายละเอียดโครงการ</div>
            </div>
            <div class="px-2 mb-4">
              <div class="row">
                <div class="col-3 px-4">
                  <div class="row ms-4 text-white">รายละเอียดโครงการ</div>
                  <div class="row mt-2" style="margin-left: 1px;">
                     <router-link
                      class="text-white text-decoration-none"
                      style="text-decoration: none"
                      :to="{
                        path: project_type === 1
                          ? '/no-income/pdf'
                          : project_type === 2
                          ? '/in-come/pdf'
                          : project_type === 3
                          ? '/st/pdf'
                          : project_type === 4
                          ? '/TS/pdf'
                          : '/',
                        query: {
                          project_id: project_id || '',
                          project_type: project_type
                        }
                      }"
                    >
                      <div class="btn btn-danger row" style="width: 200px;">
                        <span class="col-6">
                          <img src="../../assets/download.png" width="18px" alt="download">
                        </span>
                        <span class="col-6 rounded">
                          PDF
                        </span>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-3 px-4">
                  <div class="row text-white">รายละเอียดงบประมาณโครงการ</div>
                  <!-- <div class="row mt-2" style="margin-left: 1px;">
                    <div class="btn btn-success row" style="width: 200px;">
                      <span class="col-6 "><img src="../../assets/download.png" width="18px" alt="download"></span>
                      <span class="col-6 rounded">Exel</span>
                    </div>
                  </div> -->
                  <GenerateExcelButton :project-id="project_id_int" />
                </div>
                <div class="col-4">
          <div class="row"></div>
                </div>
              </div>

              
            </div>
        </div>
  </div>
    
</template>

<script setup>
import axios from 'axios'
import { ref,reactive,onMounted,watch } from 'vue'
import Navbar from '../Navbar.vue'
import { useRoute,useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import parseJwt from '../../../utils/DecodeToken'
import Swal from "sweetalert2"
//try by Aris
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
import GenerateExcelButton from '../GenerateExcel.vue';
//

const route = useRoute()
const router = useRouter()
const cookies = useCookies()

const project_id = route.query.project_id;
const project_id_int = parseInt(route.query.project_id, 10);
const project_type = Number(route.query.project_type)
const existingFiles = ref([]);

const data = ref([])
const project_info = ref([]) 
// const 
let timeline = ref([])
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit',minute: '2-digit' }
  return date.toLocaleDateString('th-TH', options)
}
onMounted( async ()=>{
  try {
    const [timelineDataRes, timelineListRes] = await Promise.all([
      axios.post('http://localhost:5000/pl/timelines/data', {
        project_id: project_id
      }),
      axios.post('http://localhost:5000/pl/timelines', {
        project_id: project_id
      })
    ]);

    data.value = timelineDataRes.data.data.data
    project_info.value = JSON.parse(timelineDataRes.data.data.data.project_data_p_1)
    timeline.value = timelineListRes.data.data.data
   
  } catch (error) {
    //console.log(error)
  }
})

// File Display
const fetchExistingFiles = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/pl/file/timeline?projectId=${project_id}&projectType=${project_type}`
    );
    existingFiles.value = res.data.files || [];
  } catch (err) {
    console.error("ไม่สามารถโหลดไฟล์เดิม:", err);
  }
};

onMounted(() => {
  fetchExistingFiles();
});

</script>

<style scoped>
.timeline {
  position: relative;
  margin-left: 30px;
  padding-left: 10px;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;
}

.dot {
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  left: -26px;
  top: 0;
  z-index: 1;
}

.dot.active {
  background-color: #ffffff;
}

.line {
  position: absolute;
  left: -14px;
  top: 14px;
  width: 2px;
  height: calc(100% + 16px);
  background-color: #ccc;
}

.content {
  color: white;
  padding-top: 1px;
}

.detail,
.date {
  color: #ccc;
  font-size: 0.9em;
  margin-top: 5px;
}

.text-box {
  overflow-wrap: anywhere;
}
</style>
