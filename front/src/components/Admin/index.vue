<template>
  <div>
    <AdminBar />
    <div class="container-fluid mt-4">
      <div class="d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center p-2">
          <div class="justify-content-center align-items-center d-flex">
            <div class="pe-4">
              <img
                src="../../assets/arrow_back.png"
                @click="Back()"
                style="width: 20px; cursor: pointer"
                alt="arrow_back"
              />
            </div>
          </div>
          <p class="mt-3" style="margin-left: 17rem">
            โครงการทั้งหมดที่ได้รับการเสนอจาก ทุกหน่วยงาน
          </p>
          <div class="form-check form-switch">
            <button
              class="btn btn-secondary"
              @click="router.push('/role/admin/fiscal-year')"
            >
              การตั้งค่าระบบรับข้อเสนอโครงการ
            </button>
            <!-- <input class="form-check-input" type="checkbox" @change="stateChange"  v-model="status">
                        <span class="text-success" v-if="status">เปิดให้ส่งข้อเสนอ</span>
                        <span class="text-danger" v-else>ไม่เปิดให้ส่งข้อเสนอ</span> -->
          </div>
        </div>
        <hr />
      </div>
      <div class="d-flex align-items-center p-3 justify-content-between">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <h6 class="me-3">ข้อมูลโครงการ</h6>
          </div>

          <!-- dropdown testing area -->
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              แสดงโครงการตามเงื่อนไข
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" @click="resetFilters">โครงการทั้งหมด</a></li>

              <li class="dropdown-submenu position-relative">
                <a class="dropdown-item dropdown-toggle" href="#">แบ่งตามประเภทโครงการ</a>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      @click="selectedProjectType = 1"
                      :class="{
                        'active bg-primary text-white': selectedProjectType == 1,
                      }"
                      >โครงการบริการวิชาการที่ไม่มีรายได้</a
                    >
                  </li>
                  <!-- project type 1  -->
                  <li>
                    <a
                      class="dropdown-item"
                      @click="selectedProjectType = 2"
                      :class="{
                        'active bg-primary text-white': selectedProjectType == 2,
                      }"
                      >โครงการบริการวิชาการที่มีรายได้</a
                    >
                  </li>
                  <!-- project type 2  -->

                  <li>
                    <a
                      class="dropdown-item"
                      @click="selectedProjectType = 3"
                      :class="{
                        'active bg-primary text-white': selectedProjectType == 3,
                      }"
                      >โครงการที่มีรายได้หลักสูตรระยะสั้น</a
                    >
                  </li>
                  <!-- project type 3  -->
                  <li>
                    <a
                      class="dropdown-item"
                      @click="selectedProjectType = 4"
                      :class="{
                        'active bg-primary text-white': selectedProjectType == 4,
                      }"
                      >โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูเเละนักเรียน</a
                    >
                  </li>
                  <!-- project type 4  -->
                </ul>
              </li>

              <li class="dropdown-submenu position-relative">
                <a class="dropdown-item dropdown-toggle" href="#">แบ่งตามสถานะ</a>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '4'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '4' }"
                      >เห็นชอบโดยหัวหน้าหน่วยงาน</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '5'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '5' }"
                      >ตีกลับจากศูนย์บริการวิชาการ</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '6'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '6' }"
                      >เสนอคณะกรรมการบริหารงานบริการวิชาการ</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '7'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '7' }"
                      >ไม่อนุมัติ</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '8'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '8' }"
                      >อนุมัติ</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '9'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '9' }"
                      >อนุมัติเเบบมีเงื่อนไข</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '10'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '10' }"
                      >เห็นชอบในหลักการ Major Revision</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '11'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '11' }"
                      >เห็นชอบในหลักการ ให้ใช้งบประมาณจากแหล่งอื่น</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '12'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '12' }"
                      >เห็นชอบในหลักการ ให้ประชาสัมพันธ์</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="selectedStatus = '13'"
                      :class="{ 'active bg-primary text-white': selectedStatus == '13' }"
                      >เห็นชอบในหลักการ ให้สำรวจกลุ่มเป้าหมาย</a
                    >
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu position-relative">
                <a class="dropdown-item dropdown-toggle" href="#">แบ่งเเยกตามหน่วยงาน</a>
                <ul
                  class="dropdown-menu"
                  style="max-height: 300px; overflow-y: auto; width: max-content"
                >
                  <li v-for="(affiliation, index) in affiliationOptions" :key="index">
                    <a
                      class="dropdown-item"
                      @click="selectedAffiliation = affiliation.affiliation_ID"
                      :class="{
                        'active bg-primary text-white':
                          selectedAffiliation == affiliation.affiliation_ID,
                      }"
                    >
                      {{ affiliation.affiliation_name }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="position-relative">
          <input
            type="text"
            class="form-control rounded-pill ps-5"
            v-model="searchQuery"
            placeholder="ค้นหาโครงการ"
          />
          <i
            class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
          ></i>
        </div>
      </div>
      <div class="p-4">
        <div v-if="filteredProjects.length > 0">
          <div
            v-for="(project, index) in filteredProjects"
            :key="index"
            class="position-relative rounded"
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
                    : ' col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 border shadow-sm p-3 mb-3 bg-blue text-white rounded'
                "
              >
                <div class="p-2 d-flex justify-content-between" style="gap: 10rem">
                  <div class="fs-6">
                    <span class="mx-1"></span
                    ><span class="fw-bold text-box">{{ project.project_name }}</span>
                    <!-- <span>( {{ project.project_type_name }} )</span> -->
                  </div>
                  <div>
                    <!-- <span>{{ project.project_status }}</span> -->
                    <span v-if="project.project_status_id == 4" class="text-warning">{{
                      project.project_status
                    }}</span>
                    <span v-if="project.project_status_id == 5" class="text-danger">{{
                      project.project_status
                    }}</span>
                    <span v-if="project.project_status_id == 6" class="text-warning">{{
                      project.project_status
                    }}</span>
                    <span v-if="project.project_status_id == 7" class="text-danger">{{
                      project.project_status
                    }}</span>
                    <span v-if="project.project_status_id > 7" class="text-success">{{
                      project.project_status
                    }}</span>
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
            </div>
          </div>
        </div>
        <div
          v-else-if="projectData.length == 0 && filteredProjects.length === 0"
          class="text-center text-muted mt-3"
        >
          ไม่มีโครงการที่ตรงกับการค้นหา
        </div>

        <!-- กรณียังไม่มีโครงการเลย -->
        <div v-else class="text-center text-muted mt-5">
          ดูเหมือนจะยังไม่มีโครงการที่ส่งมาให้พิจารณา
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import parseJwt from "../../../utils/DecodeToken";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import AdminBar from "./AdminBar.vue";
import Swal from "sweetalert2";
const router = useRouter();
const { cookies } = useCookies();
const selectedType = ref("");
const status = ref();

const projectData = ref([]);
const faculty = ref("");
const searchQuery = ref("");
const hoverIndex = ref(null);
const toggleState = ref(0);

const selectedAffiliation = ref("");
const selectedProjectType = ref("");
const selectedStatus = ref("");

const affiliationOptions = ref([]);

const filteredProjects = computed(() => {
  return projectData.value.filter((project) => {
    const nameMatch = project.project_name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const affiliationMatch =
      !selectedAffiliation.value ||
      project.project_affiliation == selectedAffiliation.value;
    const typeMatch =
      !selectedProjectType.value || project.project_type == selectedProjectType.value;
    const statusMatch =
      !selectedStatus.value || project.project_status_id == selectedStatus.value;
    return nameMatch && affiliationMatch && typeMatch && statusMatch;
  });
});

const resetFilters = () => {
  selectedAffiliation.value = "";
  selectedProjectType.value = "";
  selectedStatus.value = "";
  searchQuery.value = "";
};

const viewProject = (project) => {
  //console.log('view',project)
  router.push({
    path: "/role/admin/timeline",
    query: { project_type: project.project_type, project_id: project.project_id },
  });
};

const stateChange = () => {
  Swal.fire({
    title: "เปลี่ยนสถานะการส่งโครงการ?",
    text: "คุณต้องการเปลี่ยนสถานะการยื่นเสนอโครงการหรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "เปลียนสถานะ",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5000/admin/toggle/proposal_state", {
          status: status.value,
        });
        Swal.fire({
          title: "เปลี่ยนเรียบร้อยแล้ว",
          text: "สถานะถูกอัพเดทเรียบร้อย",
          icon: "success",
        });
      } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถเปลี่ยนสถานะได้", "error");
      }
    } else {
      // ถ้ายกเลิก ให้ย้อน toggle กลับ
      status.value = !status.value;
    }
  });
};

const Back = () => {
  router.push("/user/role");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("th-TH", options);
};
onMounted(async () => {
  // 1. ดึงข้อมูล affiliation
  try {
    const affiliationResponse = await axios.get("http://localhost:5000/affiliations");
    if (affiliationResponse.data.success) {
      affiliationOptions.value = affiliationResponse.data.result;
    } else {
      console.error("Get System status error");
    }
  } catch (error) {
    console.error("Error fetching affiliations:", error);
  }

  // 2. ดึงข้อมูลโปรเจกต์ของผู้ใช้
  try {
    const token = cookies.get("accesstoken");
    const extracttoken = parseJwt(token);
    faculty.value = extracttoken.affiliation_name;

    const projectResponse = await axios.post("http://localhost:5000/admin/projects", {
      user_affiliation: extracttoken.affiliation_id,
    });

    if (projectResponse.data.success && projectResponse.data.data.length > 0) {
      projectData.value = projectResponse.data.data.map((project) => ({
        project_id: project.project_id,
        project_type: project.project_type,
        project_status_id: project.project_status,
        project_type_name: project.project_type_thai_name,
        project_status: project.project_status_name,
        project_affiliation: project.project_affiliation,
        update_at: project.update_at,
        ...JSON.parse(project.project_data_p_1),
      }));
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }

  // 3. ตั้งค่า submenu แสดง dropdown ซ้อน
  const dropdownSubmenus = document.querySelectorAll(".dropdown-submenu");

  dropdownSubmenus.forEach((submenu) => {
    submenu.addEventListener("mouseenter", () => {
      const menu = submenu.querySelector(".dropdown-menu");
      if (menu) {
        menu.classList.add("show");
      }
    });

    submenu.addEventListener("mouseleave", () => {
      const menu = submenu.querySelector(".dropdown-menu");
      if (menu) {
        menu.classList.remove("show");
      }
    });
  });
});
</script>

<style lang="css" scoped>
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

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: 0;
  margin-left: 0;
  border-radius: 0.25rem;
  z-index: 1050;
  min-width: 200px;
  background-color: white;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: 0;
}
</style>
