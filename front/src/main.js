import axios from 'axios';
import { createApp, reactive, nextTick } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import vue3GoogleLogin from 'vue3-google-login'
import { useCookies } from "vue3-cookies"
import { useAuthStore } from '../store/authStore';
import { createHead } from '@vueuse/head'

import Swal from 'sweetalert2'

const app = createApp(App)
const pinia = createPinia();
const { cookies } = useCookies()

// import '@/assets/index.css' //css import
import '@/assets/bootstrap.css'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/user/role',
    name: 'set-role',
    component: () => import('@/components/ChooseRole.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/role/project-direction',
    name: 'project-leader-direction-page',
    component: () => import('@/components/ProjectLeader/ProjectDirections.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/role/project-leader',
    name: 'project-leader-page',
    component: () => import('@/components/ProjectLeader/index.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/role/project-leader/project-lists',
    name: 'project-leader-project-lists-page',
    component: () => import('@/components/ProjectLeader/ProjectList.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/role/project-leader/timeline',
    name: 'project-leader-timeline-page',
    component: () => import('@/components/ProjectLeader/ProjectTimelines.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_1',
    name: 'project-leader-no-income-page-1',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P1.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_2',
    name: 'project-leader-no-income-page-2',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P2.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_3',
    name: 'project-leader-no-income-page-3',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P3.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_4',
    name: 'project-leader-no-income-page-4',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P4.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_5',
    name: 'project-leader-no-income-page-5',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P5.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_6',
    name: 'project-leader-no-income-page-6',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P6.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/no_income/p_7',
    name: 'project-leader-no-income-page-7',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_No_Income/Form_No_Income_P7.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_1',
    name: 'project-leader-TS-page-1',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P1.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_2',
    name: 'project-leader-TS-page-2',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P2.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_3',
    name: 'project-leader-TS-page-3',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P3.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_4',
    name: 'project-leader-TS-page-4',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P4.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_5',
    name: 'project-leader-TS-page-5',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P5.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_6',
    name: 'project-leader-TS-page-6',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P6.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/TS/p_7',
    name: 'project-leader-TS-page-7',
    component: () => import('@/components/ProjectLeader/Projects/Teacher_Student_Dev_No_Income/Form_TS_P7.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/st/p_1',
    name: 'project-leader-st-page-1',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p1.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_2',
    name: 'project-leader-st-page-2',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p2.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_3',
    name: 'project-leader-st-page-3',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p3.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_4',
    name: 'project-leader-st-page-4',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p4.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_5',
    name: 'project-leader-st-page-5',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p5.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_6',
    name: 'project-leader-st-page-6',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p6.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    
    path: '/pl/st/p_7',
    name: 'project-leader-st-page-7',
    component: () => import('@/components/ProjectLeader/Projects/Short_Term_Courses/Form_shot_term_p7.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },

  {
    path: '/pl/in_come/p_1',
    name: 'project-leader-income-page-1',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P1.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_2',
    name: 'project-leader-income-page-2',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P2.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_3',
    name: 'project-leader-income-page-3',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P3.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_4',
    name: 'project-leader-income-page-4',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P4.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_5',
    name: 'project-leader-income-page-5',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P5.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_6',
    name: 'project-leader-income-page-6',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P6.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/pl/in_come/p_7',
    name: 'project-leader-income-page-7',
    component: () => import('@/components/ProjectLeader/Projects/Academic_Management_With_Income/Form_Income_P7.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1] }
  },
  {
    path: '/role/department-head',
    name: 'department-head-page',
    component: () => import('@/components/DepartmentHead/index.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [2] }
  },
  {
    path: '/role/department-head/timeline',
    name: 'department-head-ProjectTimeline-page',
    component: () => import('@/components/DepartmentHead/ProjectTimeline.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [2] }
  },
  {
    path: '/role/executive-board',
    name: 'executive-board-page',
    component: () => import('@/components/ExecutiveBoard/index.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [3] }
  },
  {
    path: '/role/executive-board/timeline',
    name: 'executive-board-ProjectTimeline-page',
    component: () => import('@/components/ExecutiveBoard/ProjectTimeline.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [3] }
  },
  {
    path: '/role/admin',
    name: 'admin-page',
    component: () => import('@/components/Admin/index.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/role/admin/userlists',
    name: 'admin-userlists',
    component: () => import('@/components/Admin/UserManage.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/role/admin/manage',
    name: 'admin-manage-role',
    component: () => import('@/components/Admin/ManageRoles.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/role/admin/add',
    name: 'admin-add-role',
    component: () => import('@/components/Admin/AddUser.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }

  },
  {
    path: '/role/admin/timeline',
    name: 'admin-projecttimeline',
    component: () => import('@/components/Admin/ProjectTimeline.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/role/admin/website/manage',
    name: 'admin-choose-manage',
    component: () => import('@/components/Admin/ChooseManage.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },

  {
    path: '/role/admin/budget/manage',
    name: 'admin-budget-manage',
    component: () => import('@/components/Admin/BudgetOptionManage.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },{
    path: '/role/admin/profile/manage',
    name: 'admin-profile-manage',
    component: () => import('@/components/Admin/ProfileManage.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/in-come/pdf',
    name: 'income-pdf-download',
    component: () => import('@/components/PDF_templete/Income_PDF.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1,2,3,4] }
  },
  {
    path: '/no-income/pdf',
    name: 'no-income-pdf-download',
    component: () => import('@/components/PDF_templete/No_Income_PDF.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1,2,3,4] }
  },
  {
    path: '/st/pdf',
    name: 'short-term-pdf-download',
    component: () => import('@/components/PDF_templete/Short_Term_PDF.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1,2,3,4] }
  },
  {
    path: '/TS/pdf',
    name: 'teacher-student-pdf-download',
    component: () => import('@/components/PDF_templete/Teacher_Student_PDF.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [1,2,3,4] }
  },{
    path: '/role/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/components/Admin/dashboard.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  {
    path: '/role/admin/fiscal-year',
    name: 'admin-fiscal-year',
    component: () => import('@/components/Admin/ManageFiscalYears.vue'),
    // meta: { requiresAuth: true},
    meta: { requiresAuth: true, role: [4] }
  },
  // path สำหรับเช็คว่ามี Page อยู่จริงหรือไม่
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const accessToken = cookies.get('accesstoken')
  const refreshToken = cookies.get('refreshtoken')

  // //console.log("Navigating to:", to.path);
  // //console.log("Access Token:", accessToken);
  // //console.log("Refresh Token:", refreshToken);

  if ((!accessToken || !refreshToken) && to.path !== '/') {
    // //console.log("No valid tokens, redirecting to login.");
      next('/')
    Swal.fire({
      icon: 'warning',
      title: 'หมดเวลาการเข้าสู่ระบบ',
      text: 'กรุณาเข้าสู่ระบบอีกครั้ง',
      confirmButtonText: 'ตกลง',
    }).then(() => {
      cookies.remove("accesstoken")
      cookies.remove("refreshtoken")
      
    })

    return 
  }

  if (to.meta.requiresAuth) {
    // //console.log("Auth required for:", to.path);
    
    if (!authStore.isAuthenticated) {
      // //console.log("User is not authenticated, redirecting.");
      next('/')
      Swal.fire({
        icon: 'error',
        title: 'ไม่ได้เข้าสู่ระบบ',
        text: 'โปรดเข้าสู่ระบบก่อนใช้งาน',
        confirmButtonText: 'ตกลง',
      }).then(() => {
        cookies.remove("accesstoken")
        cookies.remove("refreshtoken")
        
      })
      return
    }

    if (to.path !== '/' && to.path !== '/user/role') {
      // console.log("Checking permission for:", to.meta.role);
      // console.log(authStore.hasPermission(to.meta.role))
      
      if (!authStore.hasPermission(to.meta.role)) {
        next('/')
         Swal.fire({
          icon: 'error',
          title: 'ไม่มีสิทธิ์เข้าถึง',
          text: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
          confirmButtonText: 'กลับหน้าแรก',
        }).then(() => {
          cookies.remove("accesstoken")
          cookies.remove("refreshtoken")
          
        })
      }
    }
  }

  // //console.log("Navigation allowed.");
  next()
})

axios.interceptors.request.use(
  config => {
    const token = cookies.get('accesstoken')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ตั้ง interceptor ของ axios เพื่อตรวจจับ 498
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 498)) {
      const { cookies } = useCookies() 
      cookies.remove('accesstoken')
      cookies.remove('refreshtoken')
      router.push('/')
      Swal.fire({
        icon: 'error',
        title: 'การเข้าถึงถูกจำกัด',
        html: 'สิทธิ์ของคุณถูกปิดใช้งานโดยผู้ดูแลระบบ<br>กรุณาติดต่อศูนย์บริการวิชาการ',
        confirmButtonText: 'กลับหน้าล็อคอิน',
      })
    }
    return Promise.reject(error)
  }

)

// Provide the store to the entire app
createApp(App)
.use(router)
.use(pinia)
.use(useCookies)
.use(vue3GoogleLogin,{
  clientId:'21706456586-6jm6p160kta04n4d2ag7ft6uipjvr4e5.apps.googleusercontent.com'
})
.mount('#app')


nextTick(() => {
  const loader = document.getElementById('loader')
  if (loader) {
    loader.remove()
  }
})