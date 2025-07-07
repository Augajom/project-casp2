<template>
    
    <div class="container p-5 d-flex justify-content-center align-items-center" style="max-width:800px;height: 100vh;min-width: 550px;">
      <div class="container mx-6 bg-primary p-5 rounded-3">
        <div class="row d-flex justify-content-center">
          <div class="d-flex justify-content-center">
            <img src="/img/cas.jpg" width="150px" style="border-radius: 50%;"  alt="CAS_LOGO">
          </div>
        </div>
        <div class="row justify-content-center mb-2">
            <!-- user's perspective -->
            <p class="text-center text-white fs-4 lh-3 mt-4"><b>The Center for Academic Services</b></p>
            <!-- <div class="text-white"><b>The Center Academic Services</b></div> -->
        </div>
        <div class="row justify-content-center mt-2">
            <button class="btn btn-light " @click="Login" style="max-width: 400px;min-width: 400px;">
              <div class="row align-items-center justify-content-start">
                <div class=" col-2 border-x-rigth">
                  <img src="/img/google.png" width="30" alt="google_logo">
                </div>
                <!-- <div class="col-10">Login Using MFU Mail</div> -->
                <!-- user's perspective -->
                <div class="col-10"><b>Login Using MFU Mail</b></div>
              </div>
              
            </button>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { googleSdkLoaded } from "vue3-google-login"
import axios from 'axios'
import Swal from "sweetalert2";
import {ref, reactive, nextTick,onMounted} from 'vue'
import  {useCookies} from "vue3-cookies";
const  {cookies}  = useCookies();
import  {useRouter}  from "vue-router";
const router = useRouter()
import { useAuthStore } from '../../store/authStore'
import parseJwt from '../../utils/DecodeToken'
const authStore = useAuthStore()



const userInfo = ref({})

// 21706456586-6jm6p160kta04n4d2ag7ft6uipjvr4e5.apps.googleusercontent.com
// @ is an alias to /src
const Login = ()=>{
    // //console.log("google login Process")
    googleSdkLoaded(()=>{
      google.accounts.oauth2.initCodeClient({
        client_id:"21706456586-6jm6p160kta04n4d2ag7ft6uipjvr4e5.apps.googleusercontent.com",
        scope: 'email profile openid',
        callback: (response)=> {
          //console.log(response)
          setUpToBackEnd(response.code)
        }
      }).requestCode()
    })
}

const setUpToBackEnd = async (code) => {
  try {
    const headers = {
      Authorization: code
    };
// 
    const response = await axios.post("http://localhost:5000/auth/google", { headers });
    const token = response.data.token;

    if (!token?.access_token || !token?.refresh_token) {
      throw new Error("ไม่พบ access_token หรือ refresh_token");
    }

    cookies.set("accesstoken", token.access_token);
    cookies.set("refreshtoken", token.refresh_token);

    const accessTokenExtract = await parseJwt(token.access_token);

    if (!accessTokenExtract || !accessTokenExtract.roles) {
      throw new Error("access_token ไม่มี roles หรือข้อมูลไม่ถูกต้อง");
    }

    // บันทึกค่าไว้ใน store
    authStore.save({
      info: accessTokenExtract,
      permissions: null
    });

    // reload เพื่อให้ router.beforeEach เห็นค่าที่อัพเดทแล้ว
    window.location.href = '/user/role';

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการล็อคอิน:", error);
    await Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถเข้าสู่ระบบได้ กรุณาติดศูนย์บริการวิชาการ"
    });
    router.push('/');
  }
};

onMounted(() => {
  const accessToken = cookies.get("accesstoken");
  const refreshToken= cookies.get("refreshtoken");
  if (accessToken && refreshToken) {
    router.push('/user/role');
  }else{
    return
  }
});
</script>

<style scoped>

.circle{
  border: 1px solid;
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  
}
</style>