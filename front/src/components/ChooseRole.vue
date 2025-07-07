<template>
    <div>
            <Navbar class="fixed-top" />
            <div class="container d-flex justify-content-center align-items-center p-5 mt-5 mb-5" style="height: 70vh;">
                <div class="container" style="max-width: 500px;min-width: 500px;">
                    <div class="mt-5 d-flex justify-content-center" >
                        <h2>สถานะสิทธิ์การใช้งาน</h2>
                    </div>
                    <div class="px-5 mt-3">
                        <div class="input-group d-flex justify-content-center" v-for="(item,index) in formattedUsers" :key="index" style="max-width: 500px;">
                            <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="userPermissions.permission_selected"  style="min-width: 450px;max-width: 500px;">
                                <option value="" selected>กรุณาเลือกสิทธิ์</option>
                                <option v-for="(permission, index) in item.user_permissions" :key="index" :value = " permission.permission_id">
                                    {{ permission.permission_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <button class="btn btn-primary fs-5 enter" @click="GoToRole(userPermissions.permission_selected)" style="width: 95%; min-width: 300px;">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </div>
            </div>
    </div>

    <!-- <p v-if="!isSystemOpen">ระบบปิดอยู่ ขณะนี้ไม่สามารถเสนอโปรเจคได้</p>
        <p v-else>ระบบเปิดอยู่ คุณสามารถเสนอโปรเจคได้</p> -->
</template>

<script setup>
import { ref,reactive,onMounted,computed,watch, inject } from 'vue'
import Navbar from './Navbar.vue'
import axios from "axios"
import Swal from "sweetalert2"
import parseJwt from '../../utils/DecodeToken'
import  {useRouter}  from "vue-router"
const router = useRouter()
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()
import { useAuthStore } from '../../store/authStore'


// const store = inject('store');
// const isSystemOpen = computed(() => store.isSubmitProjectVisible);

const authStore = useAuthStore()
// //console.log(authStore)
const access_token = cookies.get('accesstoken')

const extract_token = parseJwt(access_token)
const userPermissions = reactive({
    permission_selected: '',
    permissions: []
})
const formattedUsers = computed(() => {
    return Object.values(userPermissions.permissions.reduce((acc, user) => {
        if (!acc[user.user_id]) {
            acc[user.user_id] = {
                user_id: user.user_id,
                user_employeeID: user.user_employeeID,
                user_name: user.user_name,
                user_email: user.user_email,
                affiliation_name: user.affiliation_name,
                user_permissions: []
            };
        }
        acc[user.user_id].user_permissions.push({
            permission_id: user.permission_id,
            permission_name: user.permission_name,            
        });
        return acc;
    }, {}));
})

const GoToRole = (e)=>{
    if(e == ''){
        return Swal.fire({
            icon: "error",
            title: "No Permissions Found!",
            text: "Please Select the Permission",
          })
    }

    const selectedPermission = userPermissions.permissions.find(
        (perm) => perm.permission_id === e
    )
    //console.log(selectedPermission)
    if (!selectedPermission) {
        return Swal.fire({
            icon: "error",
            title: "Invalid Permission",
            text: "Selected permission does not exist.",
        });
    }
    switch(e){
        case 1:
            authStore.save({ info: formattedUsers.value})
            router.push('/role/project-direction')
        break;
        case 2:
            authStore.save({ info: formattedUsers.value})
            router.push('/role/department-head')
        break;
        case 3:
            authStore.save({ info: formattedUsers.value})
            router.push('/role/executive-board')
        break;
        case 4:
            authStore.save({ info: formattedUsers.value})
            router.push('/role/admin')
        break;
    }
}


onMounted( async()=>{
    
    try {
        const response = await axios.post('http://localhost:5000/user/permission', extract_token);
        // console.log(response.data.result)
        userPermissions.permissions = response.data.result

        if(userPermissions.permissions.length < 1){
            await Swal.fire({
            icon: "error",
            title: "No Permissions",
            text: "Please Contact Admin",
          })
        }
    } catch (error) {
        console.error('Error fetching user permissions:', error);
    }
});
</script>

<style lang="css" scoped>
.enter:hover{
  color: white !important;
  background-color: rgb(17, 67, 110) !important;
}
</style>