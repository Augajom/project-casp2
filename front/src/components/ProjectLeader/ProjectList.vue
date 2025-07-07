<template>
  <div>
      <NavbarProject propText="ข้อมูลโครงการ" />
      <div class="container-fluid p-3" style="min-height: 100%; min-width: 800px">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center mx-3" >
              <img src="../../assets/arrow_back.png" @click="router.push('/role/project-direction')"  style="max-width: 20px;cursor: pointer;" alt="arrow_back">
            </div>
            <select
              v-model="selectedType"
              class="form-select form-select-sm p-2"
              style="min-width: 200px; min-height: 40px"
            >
              <option selected value="">โครงการทั้งหมด</option>
              <option value="3">หลักสูตรระยะสั้น</option>
              <option value="1">โครงการบริหารวิชาการที่ไม่มีรายได้</option>
              <option value="2">โครงการบริการวิชาการที่มีรายได้จากค่าบริการวิชาการ</option>
              <option value="4">
                โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน
              </option>
            </select>
          </div>

          <div class="role-name" style="margin-right: 17rem; margin-top: 1rem;">
            <p>ขณะนี้คุณใช้สิทธิ์ของหัวหน้าคณะบริหารโครงการ</p>
          </div>

          <div>
            <router-link to="/role/project-leader">
              <button class="btn btn-sm btn-primary rounded">
                <span class="fs-5">+ </span>
                <span>เพิ่มโครงการ</span>
              </button>
            </router-link>
          </div>
        </div>
        <hr />
        <div class="mt-3 d-flex justify-content-between">
          <div
            class="d-flex justify-content-start align-items-center px-2"
            style="min-width: 200px"
          >
            <span class="fs-5"
              ><b>ข้อมูลโครงการ ( {{ faculty }} )</b></span
            >
          </div>
          <div>
            <div class="d-flex align-items-center" style="min-width: 300px">
              <div class="input-group px-2">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  style="border-radius: 10px; min-height: 40px"
                  placeholder="ค้นหาโครงการ..."
                />
              </div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <div v-if="filteredProjects.length > 0">
            <div
              v-for="(project, index) in filteredProjects"
              :key="index"
              class="position-relative"
            >
              <!-- โครงการ -->
              <div
                class="row project-row position-relative"
                @mouseenter="hoverIndex = index"
                @mouseleave="hoverIndex = hoverIndex === index ? null : hoverIndex"
                style="border-radius: 15px; transition: all 0.5s ease"
              >
                <!-- ข้อมูลโครงการ -->
                <div
                  :class="
                    hoverIndex === index
                      ? 'col-xl-10 col-lg-8 col-md-7 col-sm-6 col-12 border shadow-sm p-3 mb-3 bg-body rounded'
                      : 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 border shadow-sm p-3 mb-3 bg-blue text-white rounded'
                  "
                >
                  <div class="p-2 d-flex justify-content-between" style="gap: 10rem;">
                    <div class="fs-6">
                      <span class="mx-1"></span
                      ><span class="fw-bold text-box">{{ project.project_name }} </span>
                      <span> </span>
                    </div>
                    <div>
                      <span
                        v-if="project.project_status_id == 1"
                        class="fw-bold"
                        style="color: #dcdcdc"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 2"
                        class="fw-bold"
                        style="color: yellow"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 3"
                        class="fw-bold"
                        style="color: red"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 4"
                        class="fw-bold"
                        style="color: yellow"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 5"
                        class="fw-bold"
                        style="color: red"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 6"
                        class="fw-bold"
                        style="color: yellow"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id == 7"
                        class="fw-bold"
                        style="color: red"
                        >{{ project.project_status }}</span
                      >
                      <span
                        v-if="project.project_status_id > 7"
                        class="fw-bold"
                        style="color: green"
                        >{{ project.project_status }}</span
                      >
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-5">
                    <span class="mx-3">{{ project.project_type_name }}</span>
                    <!-- for label -->
                    <div>
                      {{ formatDate(project.update_at) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- ปุ่มอยู่นอกแถวโครงการ -->
              <div
                class="action-buttons"
                @mouseenter="hoverIndex = index"
                @mouseleave="hoverIndex = null"
                :class="{ 'show-buttons': hoverIndex === index }"
              >
                <button
                  v-if="project.project_status_id !== 1"
                  class="btn btn-sm btn-secondary mx-1"
                  @click="viewProject(project)"
                >
                  <i class="fas fa-eye"></i> View
                </button>
                <button
                  v-if="[1, 3, 5].includes(project.project_status_id)"
                  class="btn btn-sm btn-warning mx-1"
                  @click="editProject(project)"
                >
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button
                  class="btn btn-sm btn-danger mx-1"
                  v-if="project.project_status_id === 1"
                  @click="deleteProject(project.project_id)"
                >
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <div
            v-else-if="projectData.length > 0 && filteredProjects.length === 0"
            class="text-center text-muted mt-3"
          >
            ไม่มีโครงการที่ตรงกับการค้นหา
          </div>

          <!-- กรณียังไม่มีโครงการเลย -->
          <div v-else class="text-center text-muted mt-5">
            ดูเหมือนคุณจะยังไม่มีโครงการ. <a href="/role/project-leader">สร้างโครงการ</a>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script setup>
// API
import axios from "axios";

// Vue Composition
import { ref, onMounted, computed } from "vue";

// Component
import NavbarProject from "../NavbarProject.vue";

//Utils
import parseJwt from "../../../utils/DecodeToken";

// Swal
import Swal from "sweetalert2";

// Router & Cookies Setup
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const router = useRouter();
const { cookies } = useCookies();

// State
const selectedType = ref("");
const projectData = ref([]);
const faculty = ref("");
const searchQuery = ref("");
const hoverIndex = ref(null);
const user_id = ref(null)
// toast setting
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

// Functions
const filteredProjects = computed(() => {
  return projectData.value.filter((project) => {
    const matchesName = project.project_name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesType =
      selectedType.value === "" || project.project_type === Number(selectedType.value);
    return matchesName && matchesType;
  });
});

const editProject = (project) => {
  //console.log(project.project_type);
  // const  router  = useRouter()
  const projecType = parseInt(project.project_type, 10);
  let path = "";
  switch (projecType) {
    case 1:
      path = "/pl/no_income/p_1";
      break;
    case 2:
      path = "/pl/in_come/p_1";
      break;
    case 3:
      path = "/pl/st/p_1";
      break;
    case 4:
      path = "/pl/TS/p_1";
      break;
    default:
      console.warn("Invalid project ID:", projecType);
      return;
  }

  router.push({
    path,
    query: { project_type: projecType, project_id: project.project_id },
  });
};
const viewProject = (project) => {
  //console.log("view", project);
  router.push({
    path: "/role/project-leader/timeline",
    query: { project_type: project.project_type, project_id: project.project_id },
  });
};
const deleteProject = async (project) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger ms-2',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "ลบโครงการนี้",
    text: "คุณต้องการลบโครงการนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ฉันต้องการลบ",
    cancelButtonText: "ไม่, ยกเลิก",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.post("http://localhost:5000/pl/del/project", {
          project_id: project,
          user_id: user_id.value,
        });

        if (response.data.success) {
          //console.log("✅ Deleted project:", project);

          // Optional: Refresh or filter project list here
          // projects.value = projects.value.filter(p => p.id !== project);
          setTimeout(() => {
            location.reload();
        }, 500);
          swalWithBootstrapButtons.fire({
            title: "ลบเรียบร้อย!",
            text: "โครงการถูกลบเรียบร้อย",
            icon: "success"
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "เกิดข้อผิดพลาด",
            text: response.data.message || "ไม่สามารถลบโครงการได้",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("❌ Error deleting project:", error);
        swalWithBootstrapButtons.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้",
          icon: "error"
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "ยกเลิกแล้ว",
        text: "โครงการยังไม่ถูกลบ",
        icon: "error"
      });
    }
  });
};

// date formater
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("th-TH", options);
};

onMounted(async () => {
  const token = cookies.get("accesstoken");
  const extracttoken = parseJwt(token);
  user_id.value = extracttoken.user_id
  faculty.value = extracttoken.affiliation_name;
  // //console.log(extracttoken)

  try {
    const response = await axios.post("http://localhost:5000/pl/projects", {
      user_id: extracttoken.user_id,
      user_affiliation: extracttoken.affiliation_id,
    });

    // //console.log(response.data)

    if (response.data.success && response.data.data.length > 0) {
      projectData.value = response.data.data.map((project) => ({
        project_id: project.project_id,
        project_type: project.project_type,
        project_status_id: project.project_status,
        project_type_name: project.project_type_thai_name,
        project_status: project.project_status_name,
        update_at: project.update_at,
        ...JSON.parse(project.project_data_p_1),
      }));
    }
    // //console.log(projectData.value)
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
});
</script>

<style scoped>
body {
  background-color: #f3f0e8 !important;
}
.project-row {
  position: relative;
  transition: all 0.5s ease;
}
.bg-blue {
  background-color: var(--bs-primary);
}
/* ปุ่มอยู่นอกแถวโครงการ */
.action-buttons {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.015s ease;
}

/* แสดงปุ่มเมื่อ hover */
.show-buttons {
  opacity: 1;
  pointer-events: auto;
}

.text-box {
  overflow-wrap: anywhere;
}
/* .btn{
    font-size: 14px;
    padding: 5px 10px;
} */
</style>
