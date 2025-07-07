<template>
    <div>
        <Navbar/>
        <div class="container-fluid mt-4">
            <div class="d-flex flex-column ">
                <div class="d-flex justify-content-between align-items-center p-2">
                    <div class='justify-content-center align-items-center d-flex'>
                    <div class="pe-4">
                        <img src="../../assets/arrow_back.png" @click="Back()" style="width: 20px;cursor: pointer;"
                        alt="arrow_back">
                    </div>
                    
                    </div>
                    <p class="mt-3" style="margin-left: 10rem">โครงการทั้งหมดที่ได้รับการเสนอจาก หัวหน้าโครงการ ({{ faculty }}) </p>
                    <router-link type="button" class="btn btn-primary d-flex align-items-center"
                        :to="{
                        path: '/role/project-leader',
                        }">
                        <span class="material-icons">add</span>
                        เพิ่มโครงการ
                    </router-link>
                </div>
                <hr>
            </div>
            <div class="d-flex align-items-center p-3 justify-content-between">
                <div class="d-flex">
                    <h6 class="me-3">ข้อมูลโครงการ</h6>
                    <!-- <select id="filtersh" v-model="selectedFilter"
                        class="btn dropdown-toggle btn-sm bg-primary text-white me-3">
                        <option value="all">โครงการทั้งหมด</option>
                        <option value="type">แบ่งตามประเภทโครงการ</option>
                        <option value="status">แบ่งตามสถานะการจัดส่งข้อเสนอโครงการ</option>
                    </select> -->
                </div>
                <div class="position-relative">
                    <input type="text" class="form-control rounded-pill ps-5" v-model="searchQuery" placeholder="ค้นหาโครงการ">
                    <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                </div>
            </div>
            <div class="p-4">
                <div v-if="filteredProjects.length > 0">
                    <div v-for="(project, index) in filteredProjects" :key="index" class="position-relative rounded">
                        <!-- โครงการ -->
                        <div class="row project-row position-relative "
                            @mouseenter="hoverIndex = index" 
                            @mouseleave="hoverIndex = hoverIndex === index ? null : hoverIndex"
                            style="border-radius: 15px; transition: all 0.5s ease;">
                            
                            <!-- ข้อมูลโครงการ -->
                            <div :class="hoverIndex === index ? 'col-xl-10 col-lg-8 col-md-7 col-sm-6 col-12 border shadow-sm p-3 mb-3 bg-body rounded' : ' col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 border shadow-sm p-3 mb-3 bg-blue text-white rounded'">
                                <div class="p-2 d-flex justify-content-between" style="gap: 10rem;">
                                    <div class="fs-6">
                                        <span class="mx-1"></span><span class="fw-bold text-box">{{ project.project_name }}</span> 
                                        <!-- <span>( {{ project.project_type_name }} )</span> -->
                                    </div>
                                    <div>
                                        <span v-if="project.project_status_id == 2" class="text-warning">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id == 3" class="text-danger">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id == 4" class="text-success">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id == 5" class="text-danger">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id == 6" class="text-warning">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id == 7" class="text-danger">{{ project.project_status }}</span>
                                        <span v-if="project.project_status_id > 7" class="text-success">{{ project.project_status }}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-5">
                                    <span class="mx-3">{{ project.project_type_name }}</span> <!-- for label -->
                                    <div>
                                        {{ formatDate(project.update_at) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ปุ่มอยู่นอกแถวโครงการ -->
                        <div class="action-buttons"
                            @mouseenter="hoverIndex = index" 
                            @mouseleave="hoverIndex = null"
                            :class="{ 'show-buttons': hoverIndex === index }">
                            <button v-if="project.project_status_id !== 1" class="btn btn-sm btn-secondary mx-1" @click="viewProject(project)">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <!-- <button v-if="project.project_status_id === 1" class="btn btn-sm btn-warning mx-1" @click="editProject(project)">
                                <i class="fas fa-edit"></i> Edit
                            </button> -->
                            <!-- <button class="btn btn-sm btn-danger mx-1" @click="deleteProject(project.project_id)">
                                <i class="fas fa-trash"></i> Delete
                            </button> -->
                        </div>
                    </div>
                </div>
                <div v-else-if="projectData.length > 0 && filteredProjects.length === 0" class="text-center text-muted mt-3">
                    ไม่มีโครงการที่ตรงกับการค้นหา
                </div>

                <!-- กรณียังไม่มีโครงการเลย -->
                <div v-else class="text-center text-muted mt-5">
                    ดูเหมือนจะยังไม่มีโครงการที่ส่งมา ({{ faculty }})
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref,watch,onMounted,computed } from 'vue'
import parseJwt from '../../../utils/DecodeToken'
import Navbar from '../Navbar.vue';
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
const  router  = useRouter()
const { cookies } = useCookies()
const selectedType = ref('');
const projectData = ref([]) 
const faculty = ref('')
const searchQuery = ref('') 
const hoverIndex = ref(null)

const filteredProjects = computed(() => {
  return projectData.value.filter(project => {
    const matchesName = project.project_name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === '' || project.project_type === Number(selectedType.value);
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
        query: { project_type: projecType, project_id: project.project_id } 
    });
}
const viewProject = (project)=>{
    //console.log('view',project)
    router.push({ 
        path:'/role/department-head/timeline', 
        query: { project_type: project.project_type, project_id: project.project_id } 
    });
}
const deleteProject = (project)=>{
    //console.log('delete',project)
}

const Back = ()=>{
    router.push('/user/role')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('th-TH', options)
}

onMounted(async () => {
    const token = cookies.get('accesstoken')
    const extracttoken = parseJwt(token)
    faculty.value = extracttoken.affiliation_name
    //console.log(extracttoken)

    try {
        const response = await axios.post('http://localhost:5000/head/projects', {
            user_affiliation: extracttoken.affiliation_id
        })

        //console.log(response.data)

        if (response.data.success && response.data.data.length > 0) {
            projectData.value = response.data.data.map(project => ({
                project_id: project.project_id,
                project_type: project.project_type,
                project_status_id:project.project_status,
                project_type_name:project.project_type_thai_name,
                project_status: project.project_status_name,
                update_at: project.update_at,
                ...JSON.parse(project.project_data_p_1) 
            }))
        }
        //console.log(projectData.value)
    } catch (error) {
        console.error("Error fetching project data:", error)
    }
})

</script>

<style lang="css" scoped>
.project-row {
    position: relative;
    transition: all 0.5s ease;
}
.bg-blue{
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
</style>