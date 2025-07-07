<template>
    <div>
        <Navbar />
        <div class="mx-3">
            <img src="../../assets/arrow_back.png" @click="router.push('/user/role')"  style="width: 20px;cursor: pointer;margin-top: 12px;" alt="arrow_back">
        </div>
        <div class="d-flex justify-content-center align-items-center" style="height: 80vh;">
            <div class="container mt-3 p-3">
                <div class="row text-center mb-5">
                    <h3>
                        จัดการโครงการ
                    </h3>
                </div>
                <div class="row d-flex justify-content-center">
                    <router-link class="col-5 mx-1 text-decoration-none border shadow-sm p-3 mb-5 bg-body" to="/role/project-leader" style=" background-color: rgb(237, 237, 237);">
                    <div class="p-5 rounded d-flex justify-content-center align-items-center">
                            <span class="fs-2 mx-3">
                                <img src="../../assets/add_circle.png" alt="add_circle" width="25">
                            </span>
                            <span class="fs-5 text-dark">เขียนโครงการใหม่ </span>
                        </div> 
                    </router-link>
                    <router-link class="col-5 mx-1 text-decoration-none border shadow-sm p-3 mb-5 bg-body" to="/role/project-leader/project-lists">
                    <div class="p-5 rounded d-flex justify-content-center align-items-center" >
                        <span class="fs-2 mx-3">
                                <img src="../../assets/list.png" alt="list" width="30">
                            </span>
                            <span class="fs-5 mx-3 text-dark">ดูโครงการทั้งหมด</span>
                        </div> 
                    </router-link>
                    
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script setup>
import Navbar from '../Navbar.vue';
import {useRouter} from 'vue-router'
const router = useRouter()
</script>

<style lang="css" scoped>

</style>