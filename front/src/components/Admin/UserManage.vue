<template>
    <div>
        <AdminBar />
        <div class="container mt-3">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <div class="mt-2 fs-4 d-flex justify-content-center align-items-center">
                        <div >
                            <img src="../../assets/arrow_back.png" @click="Back()"  style="width: 20px;cursor: pointer;" alt="arrow_back">
                        </div>
                        ระบบจัดการรายชื่อผู้ใช้งาน
                    </div>
                    <div class="mt-2">
                        <div class="my-3 d-flex justify-content-end">
                            <button @click="router.push('/role/admin/add')" class="btn btn-success d-flex">
                                <span class="material-icons">add</span>
                                <span>
                                เพิ่มผู้ใช้งาน  
                                </span>
                            
                            </button>
                        </div>
                        <div class="position-relative" style="width: 350px;">
                            <input type="text" class="form-control rounded-pill ps-5" v-model="searchQuery" placeholder="ค้นหาผู้ใช้ด้วย ชื่อ อีเมล สังกัด สิทธิ์">
                            <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    ลำดับ ({{ formattedUsers.length }})
                                </th>
                                <th scope="col" >ชื่อ</th>
                                <th scope="col" >อีเมล</th>
                                <th scope="col">สังกัด</th>
                                <th scope="col" >สิทธิ์ที่ใช้งานได้</th>
                                <th scope="col">
                                    <div>การดำเนินการ</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="( user, index ) in formattedUsers" :key="user.user_id">
                                <th scope="row">
                                    {{ index+1 }}
                                </th>
                                <td>{{ user.user_name }}</td>
                                <td>{{ user.user_email }}</td>
                                <td style="max-width: 150px;">{{ user.affiliation_name }}</td>
                                <td >
                                    <div v-if="user.user_permissions.length != 0">
                                        <span v-for="(role,index) in user.user_permissions"  :key="index">
                                            <li >{{ role.permission_name }}</li>
                                        </span>
                                    </div>
                                    <div v-else>
                                        <span>No Access Permissions</span>
                                    </div>
                                </td>
                                <td class="d-flex align-items-end" >
                                    <div class="mx-3" style="margin-top:30px;margin-bottom: 30px;">
                                        <button class="btn btn-secondary" @click="redirectToPage('/role/admin/manage',user)"> ตั้งค่าสิทธิ์</button>
                                    </div>
                                    <div class="mx-3 " @click="DeleteUser({ userID : user.user_id, username: user.user_name})" style="margin-top:30px;margin-bottom: 30px;">
                                        <button class="btn btn-danger">ลบผู้ใช้นี้</button>
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { useRouter } from 'vue-router'
import AdminBar from './AdminBar.vue'
import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
//   iconColor: 'black',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
})

const router = useRouter()
var AllUserPermissions = ref([])
const searchQuery = ref('')

const DeleteUser = async (data)=>{
    const { userID, username } = data
    await swalWithBootstrapButtons.fire({
        title: "คุณเเน่ใจหรือไม่ ?",
        text: `คุณต้องการจะลบบัญชีนี้ของ ${username} ใช่หรือไม่`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ฉันต้องการลบ",
        cancelButtonText: "ไม่, ยกเลิก",
        reverseButtons: true,
        customClass: {
            confirmButton: 'btn btn-success mx-2 ', 
            cancelButton: 'btn btn-danger mx-2'
        }
        }).then( async (result) => {
        if (result.isConfirmed) {
           const response = await axios.post('http://localhost:5000/admin/delete/account',{ userID : userID })
            if(response.data.success){
                RefreshTable()
                await Toast.fire({
                                icon: 'success',
                                iconColor: 'green',
                                title: `ลบบัญชีนี้เรียบร้อยเเล้ว`,
                            })
            }
            //console.log('confirmed')
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            await swalWithBootstrapButtons.fire({
            title: "ยกเลิกการลบ",
            text: "ยกเลิกการลบสิทธิ์",
            icon: "error"
            });
        }
    });
    
}

const Back = ()=>{
    router.back()
}

const formattedUsers = computed(() => {
    return Object.values(AllUserPermissions.value.reduce((acc, user) => {
        if (!acc[user.user_id]) {
            acc[user.user_id] = {
                user_id: user.user_id,
                user_employeeID: user.user_employeeID,
                user_name: user.user_name,
                user_email: user.user_email,
                affiliation_name: user.affiliation_name,
                user_permissions: []
            }
        }
        acc[user.user_id].user_permissions.push({
            permission_id: user.permission_id,
            permission_isActive: user.access_isActive,
            permission_name: user.permission_eng_name,
        })
        return acc
    }, {})).filter(user => {
        const query = searchQuery.value.toLowerCase()
        const matchesName = user.user_name.toLowerCase().includes(query)
        const matchesEmail = user.user_email.toLowerCase().includes(query)
        const matchesAffiliation = user.affiliation_name.toLowerCase().includes(query)
        const matchesPermission = user.user_permissions.some(permission => 
            permission.permission_name.toLowerCase().includes(query) && 
            permission.permission_isActive
        )

        return matchesName || matchesEmail || matchesAffiliation || matchesPermission
    })
})

const redirectToPage = (path,data)=> {
    router.push({ path, query: { userID: data.user_id } })
}
const RefreshTable = async()=>{
    try {
        const response = await axios.post('http://localhost:5000/admin/users/permissions');
        AllUserPermissions.value = response.data.result;
        // AllUserPermissions.value = formattedUsers
        //console.log("AllUserPermissions:",AllUserPermissions.value)
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        Swal.fire('Error', 'Failed to fetch user permissions', 'error');
    }
}
onMounted(async () => {
    try {
        const response = await axios.post('http://localhost:5000/admin/users/permissions');
        AllUserPermissions.value = response.data.result;
        // AllUserPermissions.value = formattedUsers
        //console.log("AllUserPermissions:",AllUserPermissions.value)
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        Swal.fire('Error', 'Failed to fetch user permissions', 'error');
    }
})
//console.log("formattedUsers:",formattedUsers)

</script>


<style lang="css" scoped>

</style>