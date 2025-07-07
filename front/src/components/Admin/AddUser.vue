<template>
  <div>
    <AdminBar />
    <div class="container border mt-5 p-3">
      <div class="row p-2">
        <h4 class="d-flex align-items-end mt-3 mx-3 mb-3">
          <div>
            <img
              src="../../assets/arrow_back.png"
              @click="BackToUserManage()"
              style="width: 20px; cursor: pointer"
              alt="arrow_back"
            />
          </div>
          <span class="mx-3">
            <img src="../../assets/person_add.png" style="width: 30px" alt="manageAcc" />
          </span>
          <span> เพิ่มผู้ใช้เข้าสู่ระบบ </span>
        </h4>
        <hr />
        <div class="p-3">
          <div class="row"></div>
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="email" class="form-label"
                  >อีเมล ( MFU Mail ) <span class="text-danger">*</span></label
                >
                <input
                  type="email"
                  v-model="userData.email"
                  class="form-control"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  Example : user@lamduan.mfu.ac.th
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="EnglishName" class="form-label"
                  >ชื่อ-นามสกุล ( English Name ) <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  v-model="userData.name"
                  class="form-control"
                  aria-describedby="nameHelp"
                  required
                />
                <div id="nameHelp" class="form-text">Example : Suthiphon HongThai</div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="mb-3">
                <label for="code" class="form-label"
                  >รหัสประจำตัว <span class="text-danger">*</span></label
                >
                <input
                  type="number"
                  v-model="userData.code"
                  class="form-control"
                  aria-describedby="emailHelp"
                />
                <!-- <div id="emailHelp" class="form-text">Example : </div> -->
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="affiliation" class="form-label"
                  >สังกัด <span class="text-danger">*</span></label
                >
                <select
                  class="form-select"
                  v-model="userData.affiliation_ID"
                  id="affiliation"
                  aria-describedby="affiliationHelp"
                >
                  <option value="" disabled selected>เลือกสังกัด</option>
                  <option
                    v-for="(item, index) in affiliations"
                    :value="item.affiliation_ID"
                    :key="index"
                  >
                    {{ item.affiliation_name }}
                  </option>
                </select>
                <div id="affiliationHelp" class="form-text"></div>
              </div>
            </div>

            <div class="col-lg-8 mt-4 d-flex align-items-center">
              <div class="mb-3">
                <button @click="AddUser" class="btn btn-success">เพิ่ม</button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div class="p-3">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-10">
              <p class="text-center" style="font-size: 26px">
                <span class="text-danger">*</span>เพิ่มผู้ใช้หลายคน<span
                  class="text-danger"
                  >*</span
                >
              </p>

              <!-- กล่องปุ่มแนบไฟล์ -->
              <div
                class="d-flex justify-content-center align-items-center flex-wrap mx-auto"
                style="max-width: 50rem; gap: 1rem"
              >
                <!-- ปุ่มแทน input -->
                <label
                  for="file-upload"
                  class="btn btn-sm btn-info text-white mb-1"
                  style="margin-top: 0.5rem"
                >
                  แนบไฟล์
                </label>
                <input
                  id="file-upload"
                  type="file"
                  class="d-none"
                  @change="handleFileChange"
                />

                <p
                  class="mb-0"
                  style="margin-top: 0.5rem; min-width: 150px; text-align: center"
                >
                  <span v-if="fileName">{{ fileName }}</span>
                  <span v-else>ยังไม่ได้เลือกไฟล์</span>
                </p>

                <button @click="uploadUser" class="btn btn-success mt-1">เพิ่ม</button>
              </div>

              <div class="exp-con">
                <div id="nameHelp" class="form-text mt-4 text-center">Example</div>
                <table
                  class="table table-bordered mx-auto mt-2"
                  style="table-layout: fixed; width: 100%"
                >
                  <thead class="table-light text-center">
                    <tr>
                      <th style="width: 20rem; background-color: #a6c9ec;">Email</th>
                      <th style="background-color: #a6c9ec;">ID</th>
                      <th style="background-color: #a6c9ec;">Name</th>
                      <th style="background-color: #a6c9ec;">Affiliation</th>
                      <th style="background-color: #a6c9ec;">Role</th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr>
                      <td class="m-0 text-break">user1@lamduan.mfu.ac.th</td>
                      <td class="m-0 text-break">6531111111</td>
                      <td class="m-0 text-break">นายสมชาย ใจดี</td>
                      <td class="m-0 text-break">1</td>
                      <td class="m-0 text-break">1</td>
                    </tr>
                    <tr>
                      <td class="m-0 text-break">user2@lamduan.mfu.ac.th</td>
                      <td class="m-0 text-break">6532222222</td>
                      <td class="m-0 text-break">นางสมหญิง ใจเด็ด</td>
                      <td class="m-0 text-break">6</td>
                      <td class="m-0 text-break">1,2,3,4</td>
                    </tr>
                    <tr>
                      <td class="text-danger align-middle m-0 text-break">อีเมล</td>
                      <td class="text-danger align-middle m-0 text-break">รหัสประจำตัว</td>
                      <td class="text-danger align-middle m-0 text-break">ชื่อ-นามสกุล</td>
                      <td class="text-danger align-middle m-0 text-break">รหัสสังกัด</td>
                      <td class="text-danger align-middle m-0 text-break">รหัสบทบาท<br>(หากต้องการเพิ่มหลายบทบาทให้ใส่ลูกน้ำคั้น)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="list-con d-flex justify-content-center gap-5 mt-4 flex-wrap">
                <div class="container p-0" style="width: 34rem;">
                  <h5 class="mb-3 text-center">รายการรหัสสังกัด</h5>
                  <button
                    class="btn btn-primary w-100"
                    @click="showListAffiliations = !showListAffiliations"
                  >
                    {{ showListAffiliations ? "ซ่อนรายการ" : "ดูรหัสสังกัด" }}
                  </button>

                  <transition name="slide-fade">
                    <ul v-if="showListAffiliations" class="list-group mt-3 text-start">
                      <li
                        class="list-group-item"
                        v-for="item in affiliationList"
                        :key="item.affiliation_ID"
                      >
                        {{ item.affiliation_ID }} = {{ item.affiliation_name }}
                      </li>
                    </ul>
                  </transition>
                </div>
              </div>

              <div class="list-con d-flex justify-content-center gap-5 mt-4 flex-wrap">
                <div class="container p-0" style="width: 34rem;">
                  <h5 class="mb-3 text-center">รายการรหัสบทบาท</h5>
                  <button
                    class="btn btn-primary w-100"
                    @click="showListPermissions = !showListPermissions"
                  >
                    {{ showListPermissions ? "ซ่อนรายการ" : "ดูรหัสบทบาท" }}
                  </button>

                  <transition name="slide-fade">
                    <ul
                      v-show="showListPermissions"
                      class="list-group mt-3 text-start"
                      style="overflow-y: auto"
                    >
                      <li
                        class="list-group-item"
                        v-for="(name, id) in permission"
                        :key="id"
                      >
                        {{ id }} = {{ name }}
                      </li>
                    </ul>
                  </transition>
                </div>
              </div>

              <div class="download-form mt-4 text-center">
                <a href="/users_add_form.xlsx" download
                  >ดาวน์โหลดไฟล์ฟอร์มตัวอย่าง (.xlsx)</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import AdminBar from "./AdminBar.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
const router = useRouter();

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  //   iconColor: 'black',
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const affiliations = ref([]);

const userData = reactive({
  name: "",
  email: "",
  code: "",
  affiliation_ID: "",
});

const AddUser = async () => {
  if (!userData.name || !userData.email || !userData.code || !userData.affiliation_ID) {
    return await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `กรุณากรอกข้อมูลให้ครบก่อนส่ง`,
    });
  }
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/add/account",
      userData
    );
    //console.log('User  added successfully:', response.data);
    if (response.data.success) {
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `${response.data.message}`,
      });
      setTimeout(() => {
        router.push("/role/admin/userlists");
      });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `${error.response?.data?.message}`,
    });
  }
};

// Upload User
const selectedFile = ref(null);
const fileName = ref("");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".xlsx")) {
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "กรุณาเลือกไฟล์ .xlsx เท่านั้น",
    });
    event.target.value = "";
    selectedFile.value = null;
    fileName.value = "";
    return;
  }

  selectedFile.value = file;
  fileName.value = file.name;
};

const uploadUser = async () => {
  if (!selectedFile.value) {
    return await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "กรุณาเลือกไฟล์ก่อน",
    });
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const res = await axios.post(
      "http://localhost:5000/admin/upload-user-form",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: "อัปโหลดข้อมูลผู้ใช้เรียบร้อยแล้ว",
      });

      // ล้างข้อมูล
      selectedFile.value = null;
      fileName.value = "";
      document.getElementById("file-upload").value = "";

      // ย้ายไปยังหน้ารายการผู้ใช้
      setTimeout(() => {
        router.push("/role/admin/userlists");
      }, 500);
    } else {
      await Toast.fire({
        icon: "error",
        iconColor: "red",
        title: res.data.message || "อัปโหลดล้มเหลว",
      });
    }
  } catch (error) {
    await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: error.response?.data?.message || "เกิดข้อผิดพลาด",
    });
  }
};

const showListAffiliations = ref(false);
const affiliationList = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:5000/affiliations");
    if (res.data.success) {
      affiliationList.value = res.data.result;
    }
  } catch (err) {
    console.error("โหลด affiliations ล้มเหลว:", err);
  }
});

const showListPermissions = ref(false);

const permission = {
  1: "หัวหน้าคณะบริหารโครงการ (Project Leader)",
  2: "หัวหน้าหน่วยงาน (Dean/Director/Head)",
  3: "คณะกรรมการบริหารฯ (Academic Services Board of Commitee)",
  4: "ผู้ดูแลระบบ (Admin)",
};

//
const BackToUserManage = () => {
  router.back();
};
onMounted(async () => {
  try {
    var response = await axios.get("http://localhost:5000/affiliations");
    affiliations.value = response.data.result;
    //console.log(response.data.result)
  } catch (err) {
    //console.log(err)
  }
});

watch(
  userData,
  (newValue, oldValue) => {
    // //console.log('User  data changed:', newValue);
  },
  { deep: true }
);
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px; /* กำหนดสูงสุดที่เหมาะสมกับเนื้อหา */
  opacity: 1;
  overflow: hidden;
  padding-top: initial;
  padding-bottom: initial;
  margin-top: initial;
  margin-bottom: initial;
}
</style>
