<template>
    <div>
        <nav class="navbar bg-primary">
            <div class="container-fluid d-flex align-items-center justify-content-between px-1">
                <div class="d-flex align-items-center"> 
                    <div @click="router.push('/user/role')">
                        <img src="/img/cas.jpg" width="40px" height="40px" class="circle " style="cursor: pointer;">
                    </div>
                    <div class="d-flex align-items-center justify-content-center text-center mx-3">
                        <p class="fs-6 text-white m-0">{{ propText }}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between" style="min-width: 230px;">
                   
                    <div class="d-flex align-items-center">
                        <!-- <router-link to="/user/role"> -->
                            <span class="text-white " @click="ChangeRole" style="text-decoration: none;cursor: pointer;">
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
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useCookies } from "vue3-cookies"
import { useRouter,useRoute } from 'vue-router'
import Swal from "sweetalert2";
const router = useRouter()
const route = useRoute()
const { cookies } = useCookies()

// รับ props ที่ส่งเข้ามา
defineProps({
    propText: {
        type: String,
        required: true // ต้องส่งค่ามาเสมอ
    }
})

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
        localStorage.removeItem('nav_config')
        localStorage.removeItem('permissions')
        localStorage.removeItem('userData')
        localStorage.removeItem('user')
        router.push('/')
    }
  })
}
</script>

<style scoped>
.circle {
    border: 1px solid;
    border-radius: 50%;
    overflow: hidden;
}

.navbar {
    padding-left: 5px;
    padding-right: 5px;
}
</style>
