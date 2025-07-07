<template>
    <nav class="navbar">
    <div class="container-fluid d-flex align-items-center justify-content-between px-1">
    <div class="d-flex align-items-center"> 
        <div class="d-flex align-items-center">
            <div @click="router.push('/user/role')">
                <img src="/img/cas.jpg" width="40px" height="40px" class="circle " style="cursor: pointer;">
            </div>
        </div>
        
        <div class="admin-links ms-2 d-flex align-items-center"> 
            
            <a class="nav-link" @click = "gotoIndex">
                โครงการ
            </a>
            <a class="nav-link" @click = "gotoUserlist">
                ระบบจัดการรายชื่อผู้ใช้งาน
            </a>
            <div>
                <a class="nav-link" 
                @click = "gotoFiscalManage" >
                    ระบบจัดการปีงบประมาณ
                </a>
            </div>
            
            <a class="nav-link" @click = "gotoDashboard">
                Dashboard
            </a>
        </div>
        
    </div>
    <div class="d-flex justify-content-between" style="min-width: 220px;">
        <div class="d-flex align-items-center">
                       
                           <span class="text-white" @click="ChangeRole" style="text-decoration: none; cursor:pointer;">
                            เปลี่ยนสิทธิ์
                           </span>
                       
                   </div >
        <button type="button" class="btn btn-outline-danger d-flex align-items-center" @click="logout">
            <span class="material-symbols-outlined me-2">logout</span>
            Logout
        </button>
    </div>
</div>
</nav>
</template>

<script setup>

import { useRouter,useRoute } from 'vue-router';
import { useCookies } from "vue3-cookies"
import Swal from 'sweetalert2';
const { cookies } = useCookies()
const router = useRouter();
const route = useRoute();
const gotoIndex = () => {
    router.push({ name: 'admin-page' })
};
const gotoUserlist = () => {
    router.push({ name: 'admin-userlists' })
}
const gotoFiscalManage = () => {
    router.push({ name: 'admin-fiscal-year' })
}
const gotoDashboard = () => {
    router.push({ name: 'admin-dashboard' })
}




const ChangeRole = ()=>{
    if(route.path == '/user/role'){
        return Swal.fire({
            icon: "warning",
            title: "ขณะนี้อยู่ในหน้าเปลี่ยนสิทธิ์อยู่เเล้ว",
            text: "กรุณาดำเนินการเลือกสิทธิ์",
            confirmButtonText: "ดำเนินการต่อ",
          })
         
    }
    Swal.fire({
    title: "คุณต้องการเปลี่ยนสิทธิ์หรือไม่?",
    // text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ดำเนินการต่อ",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/user/role')
        }
    });
}

const logout = ()=>{
    Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณแน่ใจหรือไม่ที่จะออกจากระบบ!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
  }).then( (result)=> {
    if (result.isConfirmed) {
        cookies.remove("accesstoken");
        cookies.remove("refreshtoken");
        localStorage.removeItem('nav_config')
        localStorage.removeItem('permissions')
        localStorage.removeItem('userData')
        localStorage.removeItem('user')
        router.push('/')
    }
  })
}


</script>

<style lang="css" scoped>
.circle {
    border: 1px solid;
    border-radius: 50%;
    overflow: hidden;
}
.navbar {
    padding-left: 5px;
    padding-right: 5px;
    background-color: var(--bs-primary);
}
.btn-danger:hover{
    transition: 0.5s;
}

.admin-links {
    display: flex; 
    align-items: center; 
    cursor: pointer;
}
.nav-link {
    color: white; 
    text-decoration: none; 
    margin-right: 15px; 
}
.nav-link:hover {
    text-decoration: underline; 
    color: white; 
}

.disabled {
  pointer-events: none;
  color: gray;
  cursor: not-allowed;
  text-decoration: none;
}

</style>