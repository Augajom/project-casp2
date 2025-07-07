<template>
    <div>
        <Navbar class="fixed-top" />
        <div class="mx-3 d-flex justify-content-between" style="max-width: 100%;">
            <div>
            <img src="../../assets/arrow_back.png" @click="Back()"  style="width: 20px;cursor: pointer;margin-top: 70px;" alt="arrow_back"> 
            </div>
            <div class="text-dark" style="width: 250px;cursor: pointer;margin-top: 70px;">
                สถานะโครงการ :
                <span class="text-success" v-if="status">เปิดให้ส่งข้อเสนอ</span>
                <span class="text-danger" v-else>ไม่เปิดให้ส่งข้อเสนอ</span>
            </div>
        </div>
        <hr>
        <div class="container d-flex justify-content-center align-items-center" style="height: 90vh; max-width: 775px;min-width: 775px;">
            <div class="container p-3" style="min-width: 500px;">
                <div class="row">
                    <h2 class="text-center ">โปรดเลือกประเภทของโครงการ</h2>
                </div>
                <div class="row mt-3" >
                    <div class="row mb-3">
                        
                        <div class="col-6 col-md-6 p-2 d-flex justify-content-center">
                            <router-link :to="{ path: '/pl/no_income/p_1', query: { project_type: 1 } }">
                                <button class="box" style="border: none; border-radius: 10px 10px 0 0; width: 100%; max-width: 250px;">
                                <div class="box d-flex flex-column align-items-center justify-content-between"
                                    style="aspect-ratio: 1; border-radius: 10px 10px 0 0; background-color: rgb(237, 237, 237); border-bottom: 10px solid var(--bs-primary); position: relative; padding: 10px;">
                                    
                                    <!-- Add spacing above and below the text -->
                                    <h5 class="mt-1" style="font-size: 15px; padding: 8px 5px 0 5px; ">โครงการบริการวิชาการที่ไม่มีรายได้</h5>
                                    
                                    <div style="position: absolute; bottom: 0; right: 0;">
                                    <i class="fas fa-newspaper m-3 fs-1"></i>
                                    </div>
                                </div>
                                </button>
                            </router-link>
                            </div>
                            <div class="col-6 col-md-6 p-2 d-flex justify-content-center">
                            <router-link :to="{path:'/pl/in_come/p_1',query:{project_type: 2}}">
                                <button class="box" style="border: none; border-radius: 10px 10px 0 0; width: 100%; max-width: 250px;">
                                    <div class="box d-flex flex-column align-items-center justify-content-between"
                                    style="aspect-ratio: 1; border-radius: 10px 10px 0 0; background-color: rgb(237, 237, 237); border-bottom: 10px solid var(--bs-primary); position: relative; padding: 13px;">
                                        <h5 class="mt-1" style="font-size: 15px; padding: 5px 10px 0 10px; ">โครงการบริการวิชาการที่มีรายได้</h5>
                                        <div  style="position: absolute; bottom: 0; right: 0;">
                                        <i class="fas fa-newspaper m-3 fs-1"></i>  
                                        </div>
                                        <div style="position: absolute; bottom: 10px; right: 10px;">
                                            <i class="fa-solid fa-money-bill-1 fs-5  " style="color: rgb(214, 201, 51);"></i>
                                        </div>
                                    </div>
                                </button>
                            </router-link>
                        </div>
                    </div>
                    <hr>
                    <div class="row ">
                        <div class="col-6 col-md-6 p-2 d-flex justify-content-center">
                            <router-link :to="{path:'/pl/TS/p_1',query:{project_type:4} }">
                                <button class="box" style="border: none; border-radius: 10px 10px 0 0; width: 100%; max-width: 250px;">
                                    <div class="box d-flex flex-column align-items-center justify-content-between"
                                    style="aspect-ratio: 1; border-radius: 10px 10px 0 0; background-color: rgb(237, 237, 237); border-bottom: 10px solid var(--bs-primary); position: relative; padding: 10px;">
                                    <h5 class="mt-1" style="font-size: 15px; padding: 5px 10px 0 10px; ">โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูเเละนักเรียน</h5>
                                    <div  style="position: absolute; bottom: 0; right: 0;">
                                    <i class="fas fa-newspaper m-3 fs-1"></i>  
                                    </div>
                                </div>
                            </button>
                            </router-link>
                            
                        </div>
                        <div class="col-6 col-md-6 p-2 d-flex justify-content-center">
                            <router-link :to="{path:'/pl/st/p_1',query:{project_type:3}}">
                                <button class="box" style="border: none; border-radius: 10px 10px 0 0; width: 100%; max-width: 250px;">
                                    <div class="box d-flex flex-column align-items-center justify-content-between"
                                    style="aspect-ratio: 1; border-radius: 10px 10px 0 0; background-color: rgb(237, 237, 237); border-bottom: 10px solid var(--bs-primary); position: relative; padding: 10px;">
                                    <h5 class="mt-1" style="font-size: 15px; padding: 5px 5px 0 5px; ">โครงการที่มีรายได้หลักสูตรระยะสั้น</h5>
                                        <div  style="position: absolute; bottom: 0; right: 0;">
                                        <i class="fas fa-newspaper m-3 fs-1"></i>  
                                        </div>
                                        <div style="position: absolute; bottom: 10px; right: 10px;">
                                            <i class="fa-solid fa-money-bill-1 fs-5" style="color: rgb(214, 201, 51);"></i>
                                        </div>
                                    </div>
                                </button>
                            </router-link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import axios from 'axios'
import Navbar from '../Navbar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()
const router = useRouter()
const status = ref(false)
const Back = ()=>{
    router.push('/role/project-direction')
}


const redirectToPage = (path,data)=> {
    router.push({ path, query: { project_type: data, project_id: null } })
}
onMounted( async()=>{
    try {
        const response = await axios.post('http://localhost:5000/pl/proposal')
        //console.log(response.data)
        if(response.data.success){
            status.value = response.data.is_proposal_open
        }else{
            console.error('Get System status error')
        }
    } catch (error) {
        console.error(error)
    }
})
</script>

<style lang="css" scoped>
.box:hover {
    background-color: rgb(207, 207, 207) !important;
    transition: 0.5s;
}
</style>