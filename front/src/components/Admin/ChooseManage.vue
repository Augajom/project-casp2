<template>
  <div>
    <AdminBar />
    <div class="container mt-5 text-center">
      <h3>ระบบจัดการข้อมูลเว็ปไซต์</h3>
    </div>
    <div class="mt-3 p-5">
      <div class="mx-5 row d-flex justify-content-between">
        <div class="col-6 p-3 border rounded" id="box">
        <router-link to="/role/admin/budget/manage" style="text-decoration: none;color:black">
          <div class=" text-center h5">
              จัดการเเละเเก้ไขตัวเลือกด้านงบประมาณ
          </div>
        </router-link>
        </div>
        <div class="col-6 p-3 border rounded" id="box">
        <router-link to="/role/admin/profile/manage" style="text-decoration: none;color:black">
          <div class="text-center h5">
                  จัดการเเละเเก้ไข Link สำหรับเเสดงใบหน้า Profile ของผู้ใช้งาน
          </div>
        </router-link>
          
        </div>
      </div>
    </div>
  </div>
  

</template>

<script setup>
import { ref, reactive } from "vue";
import AdminBar from "./AdminBar.vue";
</script>

<style lang="css" scoped>
#box:hover{
    text-decoration: none;
    transition: .5s ease-in-out;
    color: rgb(224, 224, 224);
    background-color: rgb(224, 224, 224);
}
</style>
