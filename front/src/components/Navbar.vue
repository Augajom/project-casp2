<template>
        <nav class="navbar">
            <div class="container-fluid d-flex align-items-center justify-content-between px-1">
                <div class="d-flex align-items-center"> 
                    <div @click="router.push('/user/role')">
                        <img src="/img/cas.jpg" width="40px" height="40px" class="circle" style="cursor: pointer;">
                    </div>
                </div>
                <div class="d-flex justify-content-between" style="max-width: 500px;">
                   <div class="d-flex align-items-center">
                        <a class="text-white" style="text-decoration: none;cursor: pointer;" href="/คู่มือการใช้งานระบบรับข้อเสนอโครงการบริการวิชาการ.pdf" target="_blank">คู่มือใช้งานระบบ</a>
                   </div>
                   <div class="d-flex align-items-center mx-5">
                       <!-- <router-link to="/user/role"> -->
                           <span class="text-white" @click="ChangeRole" style="text-decoration: none;cursor: pointer;">
                            เปลี่ยนสิทธิ์
                           </span>
                       <!-- </router-link> -->
                   </div >
                       
                   
                   <button type="button" @click="logout" class="btn btn-outline-danger d-flex align-items-center">
                       <span class="material-symbols-outlined me-2">logout</span>
                       Logout
                   </button>
               </div>
            </div>
        </nav>
</template>

<script setup>
import { ref,reactive } from 'vue'
import axios from "axios"
import { useCookies } from "vue3-cookies"
import { useRoute,useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const  router = useRouter()
const { cookies } = useCookies()
const route = useRoute()

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
        cookies.remove("accesstoken")
        cookies.remove("refreshtoken")
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

.admin-links {
    display: flex; 
    align-items: center; 
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
</style>
