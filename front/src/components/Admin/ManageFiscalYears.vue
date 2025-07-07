<template>
    <div>
        <AdminBar />
        <div class="container mt-5 p-3 border rounded-3 shadow-sm">
            <div class="mx-3">
                <h3 class="fw-bold ">ระบบจัดการการเปิด - ปิด ปีงบประมาณ</h3>
                <span class="fs-5">จัดการช่วงการเปิด เเละปิดของเเต่ละปีงบประมาณ</span>
            </div>
            <hr>
            <!-- add fiscal year form,  1 row-->
            <div class="mx-3 mt-3">
                <div>
                    <span class="fs-5 fw-bold">กรอกช่วงเวลาเริ่มต้นและสิ้นสุดของปีงบประมาณ</span>
                </div>
                <div class="row mt-3">
                    <div class="col-4 fw-bold">กรอกปีงบประมาณ (<span class="text-danger">ตัวเลขเท่านั้น</span>)</div>
                    <div class="col-4 fw-bold">วันที่เริ่มเปิดการส่งข้อเสนอ</div>
                    <div class="col-4 fw-bold">วันที่สิ้นสุดการเปิดข้อเสนอ</div>
                </div>
                <div class="row mt-2">
                    <div class="col-4">
                        <input type="text" v-model="formData.fiscalYear" class="form-control" placeholder="กรอกปีงบประมาณ เช่น 2566" required />
                    </div>
                    <div class="col-4">
                        <input type="date" v-model="formData.startDate" class="form-control" placeholder="กรอกวันที่เริ่มเปิดการส่งข้อเสนอ" required />
                    </div>
                    <div class="col-4">
                        <input type="date" v-model="formData.endDate" class="form-control" placeholder="กรอกวันที่สิ้นสุดการเปิดข้อเสนอ" required />
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <button class="btn btn-secondary mx-3" @click="resetForm">รีเซ็ต</button>
                    <button class="btn btn-primary mx-3" @click="submitForm" :disabled="!isSubmit">บันทึก</button>
                </div>
            </div>
        </div>
        

        <div class="container mt-5 p-3 border rounded-3 shadow-sm">
            <div class="mx-3 mt-3">
                <h3 class="fw-bold ">ข้อมูลปีงบประมาณ</h3>
                <span class="fs-5">ปีงบประมาณ พร้อมช่วงเวลาเปิด - ปิด การใช้งาน </span>
            </div>
            <div>
                <table class="table table-striped table-bordered mt-3">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-center">ปีงบประมาณ</th>
                      <th class="text-center">วันที่เริ่มเปิดการส่งข้อเสนอ</th>
                      <th class="text-center">วันที่สิ้นสุดการเปิดข้อเสนอ</th>
                      <th class="text-center">สถานะ</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="fiscalInfo.length === 0">
                      <td class="text-center" colspan="6">ไม่พบข้อมูลปีงบประมาณ</td>
                    </tr>
                    <tr v-else v-for="(fiscal, index) in fiscalInfo" :key="index">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ fiscal.fiscal_year }}</td>
                      <td class="text-center">{{ formatThaiDate(fiscal.start_date) }}</td>
                      <td class="text-center">{{ formatThaiDate(fiscal.end_date) }}</td>
                      <td style="text-align: center; vertical-align: middle;">
                        <span v-if="fiscal.status !== 'inactive'" style="
                            display: inline-block;
                            height: 10px;
                            width: 10px;
                            border-radius: 50%;
                            background-color: green;
                          "></span>
                        <span v-else style="
                            display: inline-block;
                            height: 10px;
                            width: 10px;
                            border-radius: 50%;
                            background-color: red;
                          "></span>
                      </td>
                      <td style="width: 100px; text-align: center;">
                        <button type="button" class="btn btn-danger btn-sm" @click="deleteFiscalYear(fiscal.id)">ลบ</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script setup>
// API calling
import axios from 'axios';
// Import necessary components
import AdminBar from '@/components/Admin/AdminBar.vue';
// Import necessary libraries
import { ref,reactive, watch, onMounted } from 'vue';

// Import SweetAlert2 for alerts
import Swal from 'sweetalert2';
// Define reactive form data
const formData = reactive({
    fiscalYear: '',
    startDate: '',
    endDate: ''
});

const fiscalInfo = reactive([])

const isSubmit = ref(false)



// functions

function deleteFiscalYear(fiscalId) {

  Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการลบปีงบประมาณนี้หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'ลบข้อมูล',
    cancelButtonText: 'ยกเลิก',
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.post(`http://localhost:5000/admin/fiscal/delete`, {
          fiscal_id: fiscalId
        });

        if (response.data.success) {
          Swal.fire('ลบเรียบร้อย', 'ข้อมูลปีงบประมาณถูกลบเรียบร้อยแล้ว', 'success');
          // ล้างข้อมูลหรือลบจาก list โดยตรง หรือ reload
          setTimeout(() => window.location.reload(), 1500);
        } else {
          Swal.fire('เกิดข้อผิดพลาด', response.data.message || 'ไม่สามารถลบข้อมูลได้', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', 'error');
      }
    }
  });
}

function resetForm() {
  formData.fiscalYear = '';
  formData.startDate = '';
  formData.endDate = '';
  isSubmit.value = false;
}

function toThaiDateOnly(dateString) {
  const utcDate = new Date(dateString);
  
  // เพิ่มเวลา +7 ชั่วโมง (ไทย)
  utcDate.setHours(utcDate.getHours() + 7);

  // คืนค่าที่ตัดเวลา เหลือแค่ปี-เดือน-วัน (00:00:00)
  return new Date(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDate());
}

async function submitForm() {
  const result = await Swal.fire({
    title: 'ยืนยันการบันทึก',
    text: 'คุณต้องการบันทึกข้อมูลปีงบประมาณใช่หรือไม่?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'บันทึก',
    cancelButtonText: 'ยกเลิก',
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  // แปลงวันที่ใหม่เป็น Date object
  const newStart = toThaiDateOnly(formData.startDate);
  const newEnd = toThaiDateOnly(formData.endDate);

  const isDuplicate = fiscalInfo.some(item => {
  const existingStart = toThaiDateOnly(item.start_date);
  const existingEnd = toThaiDateOnly(item.end_date);

    return (
      (newStart > existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd < existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd) ||
      newStart.getTime() === existingEnd.getTime() ||
      newEnd.getTime() === existingStart.getTime()
    );
  });

  if (isDuplicate) {
    return Swal.fire({
      icon: 'warning',
      title: 'ช่วงวันซ้ำกับปีงบประมาณที่มีอยู่แล้ว',
      text: 'กรุณาเลือกช่วงวันที่ใหม่',
      customClass: {
        title: 'my-swal-title'
      }
    });
  }

  try {
    const response = await axios.post('http://localhost:5000/admin/fiscal/add', {
      fiscal_year: formData.fiscalYear,
      start_date: formData.startDate,
      end_date: formData.endDate
    });

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: response.data.message
      });
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะส่งข้อมูล:', error);
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
      text: error.response?.data?.message || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
    });
  }
}


function validateForm() {
  isSubmit.value =
    /^\d{4}$/.test(formData.fiscalYear.trim()) && // regular expression
    formData.startDate.trim() !== '' &&
    formData.endDate.trim() !== '' &&
    formData.startDate.trim() < formData.endDate.trim()
}

const formatThaiDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.toLocaleString('th-TH', { month: 'long' })
  const year = date.getFullYear() + 543 
  return `${day} ${month} ${year}`
}

// 
watch(formData, validateForm, { deep: true })

onMounted( async () => {
  try {
    const response = await axios.get('http://localhost:5000/admin/fiscals')
    fiscalInfo.push(...response.data.data);
    
  } catch (error) {
    console.error('Error fetching data:', error)
  }
});
</script>

<style lang="css">
  .my-swal-title {
    font-size: 24px !important; /* เปลี่ยนขนาดตามที่ต้องการ เช่น 16px, 14px */
  }
</style>