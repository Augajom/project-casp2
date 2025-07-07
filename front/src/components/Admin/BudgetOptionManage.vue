<template>
  <div>
      <AdminBar />
      <div class="container mt-3 shadow-sm border rounded p-3">
        <div class="row ">
          <h3 class="mt-3 mx-3"><b>จัดการเเละเเก้ไขตัวเลือกด้านงบประมาณ</b></h3>
          <p class="mx-3">สำหรับเเก้ไขตัวเลือกด้านงบประมาณของเเต่ละประเภทโครงการ</p>
        </div>
        <div class="row ">
          <h6 class="mx-3">โปรดเลือกประเภทของโครงการ</h6>
          <div class="row mx-3 mt-2">
            <div class="col-12 mt-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="no_income" v-model="options_value"  value="1" >
                <label class="form-check-label mx-2" for="no_income">
                  โครงการบริหารวิชาการที่ไม่มีรายได้
                </label>
              </div>
            </div>
            <div class="col-12 mt-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="with_income" v-model="options_value" value="2" >
                <label class="form-check-label mx-2" for="with_income">
                  โครงการบริการวิชาการที่มีรายได้จากค่าบริการวิชาการ
                </label>
              </div>
            </div>
            <div class="col-12 mt-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="short_term_courses" v-model="options_value" value="3" >
                <label class="form-check-label mx-2" for="short_term_courses">
                  โครงการหลักสูตรระยะสั้น
                </label>
              </div>
            </div>
            <div class="col-12 mt-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="teacher_student_dev" v-model="options_value" value="4" >
                <label class="form-check-label mx-2" for="teacher_student_dev">
                  โครงการบริการวิชาการที่ไม่มีรายได้สำหรับพัฒนาครูและนักเรียน
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- {{ options_value }} -->
        <div class="d-flex justify-content-center mt-3">
          <button class="btn btn-secondary mx-3" :disabled="options_value == 0">เลือก</button>
          <button class="btn btn-danger mx-3" @click="options_value = 0">รีเซ็ต</button>
        </div>
      </div>

      <div class="container mt-3 shadow-sm border rounded p-3">
        <div class="row">
          <div class="d-flex justify-content-between">
            <h3 class="mt-3 mx-3"><b>จัดการเเละเเก้ไขตัวเลือกด้านงบประมาณ {{ projects_object.project_type }}</b></h3>
            <div class="mt-3 mx-3"><img src="../../assets/add_circle.png" style="cursor: pointer;" width="25" alt="add"></div>
          </div>
          <p class="mx-3">สำหรับเเก้ไขตัวเลือกด้านงบประมาณของประเภท {{ projects_object.project_type }}</p>
        </div>
        <div class="row mx-3 mt-2 mb-2" style="height: 20px;width:100%;">
          <div class="col-2">ชื่อรายการ</div>
          <div class="col-2">รายละเอียด</div>
          <div class="col-2">หน่วยที่ 1</div>
          <div class="col-2">หน่วยที่ 2</div>
          <div class="col-2">หน่วยที่ 3</div>
          <div class="col-2">หน่วยที่ 4</div>
          <!-- <div class="col-2">หน่วยที่ 5 (ผลรวม)</div> -->
        </div>
        
        <div v-for="(option,index) in projects_object.budget_options" class="row mx-2 mb-3" style="height: 55px;width:100%;" :key="index">
            <div class="col-2 border-end">
              <textarea class="form-control" placeholder="ชื่อรายการตัวเลือก" type="text"  v-model="option.name"></textarea>
            </div>
            <div class="col-2 border-end">
              <textarea class="form-control" placeholder="รายละเอียด ( pop up )" type="text" v-model="option.details"></textarea>
            </div>

            <div class="col-2 border-end">
              <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <input type="checkbox" class="form-check-input " style="width:30px !important;" disabled checked >
                </div>
                <div class="col-8">
                  <input type="text" class="form-control fs-6" placeholder="หน่วย" required>
                </div>
              </div>
            </div>
            <div class="col-2 border-end">
              <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <input type="checkbox" class="form-check-input " style="width:30px;">
                </div>
                <div class="col-8">
                  <input type="text" class="form-control fs-6">
                </div>
              </div>
            </div>
            <div class="col-2 border-end">
              <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <input type="checkbox" class="form-check-input " style="width:30px;">
                </div>
                <div class="col-8">
                  <input type="text" class="form-control fs-6">
                </div>
              </div>
            </div>
            <div class="col-2 ">
              <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <input type="checkbox" class="form-check-input " style="width:30px;">
                </div>
                <div class="col-8">
                  <input type="text" class="form-control fs-6">
                </div>
              </div>
            </div>
            <!-- <div class="col-1 border-end">
              <div class="row">
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <input type="checkbox" class="form-check-input " style="width:30px;" disabled checked>
                </div>
                <div class="col-8">
                  <input type="text" class="form-control fs-6">
                </div>
              </div>
            </div> -->
            <!-- <div class="col-1">
            
            </div> -->
        </div>
      </div>
  </div>
  
</template>

<script setup>
import AdminBar from "./AdminBar.vue";
import { ref,reactive } from 'vue'
let projects_object = reactive({
  project_type: null,
  budget_options:[
    { 
      id: 1,
      name: "ค่าตอบแทนวิทยากรภายใน",
      details:"",
      categories: [
        {
          unit1: "",
          enabled:true
        }, 
        {
          unit2: "",
          enabled:false
        }, 
        {
          unit3: "",
          enabled:false
        }, 
        {
          unit4: "",
          enabled:false
        }, 
        {
          unit5: "",
          enabled:true
        }
      ], 
      note:{
        checked:false, value:''
      },
      hide:false 
    }
  ]

})

let options_value = ref(0)

const addOptions = (num_project_type)=>{
  
}
</script>

<style lang="css" scoped>

</style>
