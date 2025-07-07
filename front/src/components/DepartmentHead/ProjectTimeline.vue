<template>
  <div>
      <Navbar />
        <router-link to="/role/department-head">
            <div class="mx-3 my-3">
                <img src="../../assets/arrow_back.png"   style="width: 20px;cursor: pointer;" alt="arrow_back">
            </div>
        </router-link>
        <div class="container-md border p-4 mt-5 bg-primary shadow p-3 mb-5" style="border-radius: 15px;">
            <div class="row mt-3">
                <div class="col-6 px-3 fw-light" style="color: white;">{{ data.project_type_thai_name }}</div>
                <div class="col-6 px-3 text-end" style="color: white;">
                    <span>ข้อมูลอัพเดทล่าสุดเมื่อ : </span>
                    <span class="fw-light">{{ formatDate(data.project_created_at) }}</span>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6 fs-5 px-3 text-box" style="color: white; max-width: 40.4rem;"><b>{{ project_info.project_name }}</b></div>
                <div class="col-6 px-3 text-end" style="color: white;">
                    <span>เเก้ไขล่าสุดเมื่อ : </span>
                    <span class="fw-light">{{ formatDate(data.update_at) }}</span>
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
                        <!-- <div class="dot" :class="{ active: item.active }"></div> -->
                        <div class="dot active" ></div>
                        
                        <div v-if="index !== timeline.length - 1" class="line"></div>

                        <div class="content">
                            <div class="status-line">
                                <!-- {{ item }} -->
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
                  <div class="row text-white">รายละเอียดโครงการ</div>
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
                      <span class="col-6 rounded">Excel</span>
                    </div>
                  </div> -->
                  <GenerateExcelButton :project-id="project_id_int" />
                </div>
                <div class="col-4">
                  <div class="row"></div>
                  <div class="row"></div>
                </div>
              </div>
            </div>
            <hr class="mx-2 text-white">
            <div class="px-2 mb-3">
                <div class="row">
                    <span class="text-white">
                        การพิจารณากลั่นกรอง โดยหัวหน้าหน่วยงาน เพื่อเสนอต่อคณะกรรมการบริหารงานบริการวิชาการ
                    </span>
                </div>
                <!-- <span>{{ status }}</span> -->
                <div class="row mt-3">
                    <div v-if="project_status == 2" class="col-12">
                        <div class="form-check form-check-inline mx-5">
                            <input class="form-check-input circle-input" type="radio" v-model="status" name="status" value='3'>
                            <label class="form-check-label text-danger" for="inlineRadio1">ไม่เห็นชอบ มีการแก้ไข</label>
                        </div>
                        <div class="form-check form-check-inline mx-5">
                            <input class="form-check-input circle-input" type="radio" v-model="status" name="status" value='4'>
                            <label class="form-check-label text-success" for="inlineRadio2">เห็นชอบ</label>
                        </div>
                    </div>
                    <div v-else  class="col-12 text-start mx-5">
                        <span class="text-secondary">ผลการพิจารณาได้รับการอัพเดทเรียบร้อยแล้ว</span>
                    </div>
                </div>
                <transition name="fade-slide">
                <div v-if="status == 3" class="row mt-3">
                    <div class="mb-3">
                        <label for="comments" class="form-label text-white">แสดงความคิดเห็นต่อการพิจารณาครั้งนี้</label>
                        <input type="text" class="form-control" v-model="comment" placeholder="แสดงความคิดเห็นของคุณ...">
                    </div>
                </div>
            </transition>
            </div>
            <div class="row mt-3">

                <div class="col-6 d-flex justify-content-end">
                    <button class="btn btn-secondary" @click="doubleCancle">
                        ยกเลิก
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn btn-success" @click="updateProjectDecision" :disabled="status == 0">
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>
  </div>
    
</template>

<script setup>
import axios from 'axios'
import { ref,reactive,onMounted } from 'vue'
import Navbar from '../Navbar.vue'
import Swal from "sweetalert2"
import { useRoute,useRouter } from 'vue-router'
import GenerateExcelButton from '../GenerateExcel.vue';

const router = useRouter()
const route = useRoute()

const status = ref(0)
const comment = ref('')

const project_id = route.query.project_id
const project_id_int = parseInt(route.query.project_id, 10);
const project_type = Number(route.query.project_type)
const project_info = ref([])
const timeline = ref([])
const data = ref([])
let project_status = ref(0)
const existingFiles = ref([]);
// SELECT project_status.project_status_name, project_timelines.specified_at, project_timelines.project_timeline_comment 
// FROM project_timelines RIGHT JOIN project_status 
// ON project_timelines.project_timeline_status_id = project_status.project_status_id
// WHERE project_timelines.project_timeline_projectId = 106 
// ORDER BY project_timelines.specified_at


const updateProjectDecision = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "หากยืนยันแล้วจะไม่สามารถย้อนกลับได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยันผลพิจารณา",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        if (status.value == 3) {
          comment.value = comment.value;
        } else {
          comment.value = null;
        }
        
        if(status.value == 3 && (comment.value == null || comment.value == '') ){
          return await Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            text: "กรุณาเเสดงความคิดเห็น",
            icon: "error"
          });
        }

        const response = await axios.post('http://localhost:5000/head/consider/status', {
          status: status.value,
          project_id: project_id,
          comment: comment.value
        });

        if (response.data.success) {
          await Swal.fire({
            title: "อัพเดทสำเร็จ",
            text: "คุณได้อัพเดทสถานะของโครงการนี้เรียบร้อยแล้ว",
            icon: "success"
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: response.data.message || "การอัพเดทไม่สำเร็จ",
            icon: "error"
          });
        }

      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถอัพเดทสถานะได้",
          icon: "error"
        });
        console.error(error);
      }
    }
  });
}




const doubleCancle = ()=>{
    if(status.value != 0){
       return status.value = 0
    }else{
        Swal.fire({
            title: "ออกจากหน้านี้",
            text: "คุณต้องการออกจากการพิจารณาหรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'ไม่',
            confirmButtonText: "ใช่",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/role/department-head')   
            }
        });
    
    }

}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit',minute: '2-digit' }
  return date.toLocaleDateString('th-TH', options)
}

onMounted( async ()=> {
  try {
    const [timelineDataRes, timelineListRes] = await Promise.all([
      axios.post('http://localhost:5000/head/timelines/data', {
        project_id: project_id
      }),
      axios.post('http://localhost:5000/head/timelines', {
        project_id: project_id
      })
    ]);

    data.value = timelineDataRes.data.data.data
    project_info.value = JSON.parse(timelineDataRes.data.data.data.project_data_p_1)
    project_status.value = timelineDataRes.data.data.data.project_status
    const timelineResult = timelineListRes.data.data.data
    timeline.value = Array.isArray(timelineResult) ? timelineResult : []
      //console.log(timelineResult)
  } catch (error) {
    //console.log(error)
  }
})

// File Display
const fetchExistingFiles = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/head/file/timeline?projectId=${project_id}&projectType=${project_type}`
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

.circle-input{
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
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
