<template>
  <div>
    <AdminBar />
    <div class="mx-3 my-3">
      <img
        src="../../assets/arrow_back.png"
        @click="Back()"
        style="width: 20px; cursor: pointer"
        alt="arrow_back"
      />
    </div>
    <hr />
    <div class="container mt-3 border p-3">
      <div class="row">
        <h4 class="d-flex align-items-end mt-3 mx-3">
          <span class="mx-3">
            <img
              src="../../assets/manage_accounts.png"
              style="width: 30px"
              alt="manageAcc"
            />
          </span>
          <span> ตั้งค่าสิทธิ์ </span>
        </h4>
      </div>
      <hr />
      <!-- user info zone -->
      <div class="p-3 d-flex">
        <div v-for="(user, index) in formattedUsers" class="row" :key="index">
          <div class="col-lg-4 col-md-6">
            <span
              ><b>ชื่อ :</b> <span class="mx-2">{{ user.user_name }}</span></span
            >
          </div>
          <div class="col-lg-4 col-md-6">
            <span
              ><b>รหัสประจำตัว :</b> <span>{{ user.user_employeeID }}</span></span
            >
          </div>

          <div class="col-lg-4 col-md-6">
            <span
              ><b>สังกัด :</b> <span>{{ user.affiliation_name }}</span></span
            >
          </div>
          <div class="col-lg-4 col-md-6 d-block">
            <span class=""><b>อีเมล :</b> {{ user.user_email }}</span>
          </div>
          <div class="col-lg-4 col-md-8 d-block">
            <span class=""
              ><b>เข้าระบบเมื่อ :</b>
              {{
                new Date(user.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              }}</span
            >
          </div>
        </div>
        <div class="col-1" v-for="(user, index) in formattedUsers" :key="index">
          <button @click="editProfile(user)" class="btn btn-warning text-white">
            แก้ไข
          </button>
        </div>
      </div>
      <hr />
      <!-- user role zone -->
      <div class="row p-2">
        <div class="row my-2">
          <h4>เพิ่มสิทธิ์</h4>
        </div>
        <div class="row">
          <div class="col-11">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <img src="../../assets/contacts.png" width="25px" alt="contact" />
              </span>
              <select class="form-select" v-model="roleSelected">
                <option
                  v-for="(role, index) in roles"
                  :value="{
                    user_id: formattedUsers[0].user_id,
                    role_id: role.id,
                    name: role.name,
                  }"
                  :key="index"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-1">
            <button @click="AddRole" class="btn btn-success">เพิ่ม</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="p-3">
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th scope="col">ชื่อสิทธิ์</th>
              <th scope="col">สถานะสิทธิ์</th>
              <th scope="col">อัพเดทเมื่อ</th>
              <th>
                <div class="d-grid text-center">ดำเนินการ</div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in formattedUsers" :key="index">
            <tr v-for="(access, index) in user.user_permissions" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ access.permission_name }}</td>
              <td>
                <div v-if="access.permission_isActive == 1" class="text-success">
                  ใช้สิทธิ์ได้
                </div>
                <div v-else class="text-danger">ใช้สิทธิ์ไม่ได้</div>
              </td>
              <td>
                {{
                  new Date(access.permission_updated_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                }}
              </td>
              <td scope="row" class="d-flex justify-content-center">
                <div
                  v-if="access.permission_isActive == 0"
                  @click="
                    ActiveRole({ roleID: access.permission_id, userID: user.user_id })
                  "
                  style="cursor: pointer"
                  class="text-success"
                >
                  อนุญาต
                </div>
                <div
                  v-else
                  @click="
                    InActiveRole({ roleID: access.permission_id, userID: user.user_id })
                  "
                  style="cursor: pointer"
                  class="mx-3 text-warning"
                >
                  ไม่อนุญาต
                </div>
              </td>
              <td>
                <div
                  @click="
                    DeleteRole({
                      roleID: access.permission_id,
                      userID: user.user_id,
                      username: user.user_name,
                    })
                  "
                  style="cursor: pointer"
                  class="mx-3 text-danger"
                >
                  ลบสิทธิ์
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import AdminBar from "./AdminBar.vue";
import axios from "axios";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
var roles = ref([]);

var roleSelected = ref({});

var roleInfo = ref([]);

// Toast setup
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const AddRole = async () => {
  if (!roleSelected.value.role_id) {
    return await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "กรุณาเลือกสิทธิ์",
    });
  }
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/add/permission",
      roleSelected.value
    );

    if (response.data.success) {
      refreshTable();
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: "สิทธิ์ถูกเพิ่มเรียบร้อยแล้ว",
      });
      //console.log("Role added successfully:", response.data);
    } else {
      refreshTable();
      //console.log(response.data)
      await Toast.fire({
        icon: "error",
        iconColor: "red",
        title: "เกิดข้อผิดพลาดในการเพิ่มสิทธิ์",
      });
    }
  } catch (error) {
    console.error("Error adding role:", error);
    await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "ไม่สามารถเพิ่มสิทธิ์ได้, กรุณาลองใหม่",
    });
  }

  //console.log("Selected role data:", roleSelected.value);
  //console.log("pass if",roleSelected.value)
};

const refreshTable = async () => {
  const roleData = router.currentRoute.value.query.userID;
  const response = await axios.post("http://localhost:5000/admin/access/user", {
    user_id: roleData,
  });
  roleInfo.value = response.data.result;
};

const Back = () => {
  router.back();
};
const ActiveRole = async (data) => {
  const { roleID, userID } = data;
  const response = await axios.post("http://localhost:5000/admin/active/role", data);
  //console.log(response)
  if (response.data.success) {
    refreshTable();
    await Toast.fire({
      icon: "success",
      iconColor: "green",
      title: `${response.data.message}`,
    });
  }
  //console.log("active :",{ roleID, userID })
};
const InActiveRole = async (data) => {
  const { roleID, userID } = data;
  const response = await axios.post("http://localhost:5000/admin/in-active/role", data);
  if (response.data.success) {
    refreshTable();
    await Toast.fire({
      icon: "error",
      iconColor: "green",
      title: `${response.data.message}`,
    });
  }
  //console.log("inactive",{ roleID, userID })
};

const DeleteRole = async (data) => {
  const { roleID, userID, username } = data;
  await swalWithBootstrapButtons
    .fire({
      title: "คุณเเน่ใจหรือไม่ ?",
      text: `คุณต้องการจะลบสิทธิ์นี้ของ ${username} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ฉันต้องการลบ",
      cancelButtonText: "ไม่, ยกเลิก",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-success mx-2 ",
        cancelButton: "btn btn-danger mx-2",
      },
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(
          "http://localhost:5000/admin/delete/role",
          data
        );
        if (response.data.success) {
          await refreshTable();
          await Toast.fire({
            icon: "success",
            iconColor: "green",
            title: `${response.data.message}`,
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await swalWithBootstrapButtons.fire({
          title: "ยกเลิกการลบ",
          text: "ยกเลิกการลบสิทธิ์",
          icon: "error",
        });
      }
    });

  //console.log("delete",{ roleID, userID })
};

const editProfile = async (user) => {
  let affiliationOptions = [];

  // 1. ดึงข้อมูลจาก API
  try {
    const res = await axios.get("http://localhost:5000/affiliations");
    if (res.data.success) {
      affiliationOptions = res.data.result;
    } else {
      console.error("Get affiliations error");
      return;
    }
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return;
  }

  // 2. สร้าง options HTML
  const optionsHtml = affiliationOptions
    .map((item) => {
      const selected = item.affiliation_name === user.affiliation_name ? "selected" : "";
      return `<option value="${item.affiliation_ID}" ${selected}>${item.affiliation_name}</option>`;
    })
    .join("");

  // 3. แสดง SweetAlert2
  const { value: formValues } = await Swal.fire({
    title: "แก้ไขข้อมูลผู้ใช้",
    html: `
      <style>
        .form-row {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .form-row p {
          width: 120px;
          margin: 0;
          font-weight: 600;
        }
        .form-row input, .form-row select {
          flex: 1;
          padding: 8px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      </style>
      <div>
        <div class="form-row">
          <p>ชื่อ :</p>
          <input id="swal-name" value="${user.user_name}" placeholder="ชื่อ" />
        </div>
        <div class="form-row">
          <p>รหัสประจำตัว :</p>
          <input id="swal-empid" value="${user.user_employeeID}" placeholder="รหัสประจำตัว" />
        </div>
        <div class="form-row">
          <p>อีเมล :</p>
          <input id="swal-email" value="${user.user_email}" placeholder="Email" />
        </div>
        <div class="form-row">
          <p>สังกัด :</p>
          <select id="swal-affiliation" style="width: 20rem;">
            ${optionsHtml}
          </select>
        </div>
      </div>
    `,
    width: "600px",
    showCancelButton: true,
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-secondary",
    },
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const empid = document.getElementById("swal-empid").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const affiliation = document.getElementById("swal-affiliation").value;

      if (!name || !empid || !email || !affiliation) {
        Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
        return false;
      }

      return {
        user_name: name,
        user_employeeID: empid,
        user_email: email,
        user_affiliation: affiliation,
        user_id: user.user_id,
      };
    },
  });

  // 4. ส่งข้อมูลกลับไป backend
  if (formValues) {
    try {
      const res = await axios.post("http://localhost:5000/admin/edit/user", formValues);
      if (res.data.success) {
        Swal.fire("สำเร็จ", "อัพเดทข้อมูลเรียบร้อยแล้ว", "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("ไม่สำเร็จ", res.data.message, "warning");
      }
    } catch (err) {
      Swal.fire("ผิดพลาด", err.response?.data?.message || "เกิดข้อผิดพลาด", "error");
    }
  }
};

onMounted(async () => {
  const roleData = router.currentRoute.value.query.userID;
  const response = await axios.post("http://localhost:5000/admin/access/user", {
    user_id: roleData,
  });
  roleInfo.value = response.data.result;
});

const allRoles = [
  { id: 1, name: "Project Leader" },
  { id: 2, name: "Department Head" },
  { id: 3, name: "Academic Services Board of Commitee" },
  { id: 4, name: "Admin" },
];

const rolesNotInRoleInfo = computed(() => {
  const activeRoleIDs = roleInfo.value.map((role) => role.permission_id);
  return allRoles.filter((role) => !activeRoleIDs.includes(role.id));
});

watch(rolesNotInRoleInfo, (newRoles) => {
  roles.value = newRoles;
});

const formattedUsers = computed(() => {
  return Object.values(
    roleInfo.value.reduce((acc, user) => {
      if (!acc[user.user_id]) {
        acc[user.user_id] = {
          user_id: user.user_id,
          user_employeeID: user.user_employeeID,
          user_name: user.user_name,
          user_email: user.user_email,
          affiliation_name: user.affiliation_name,
          created_at: user.created_at,
          user_permissions: [],
        };
      }
      acc[user.user_id].user_permissions.push({
        permission_id: user.permission_id,
        permission_isActive: user.access_isActive,
        permission_name: user.permission_eng_name,
        permission_updated_at: user.update_at,
      });
      return acc;
    }, {})
  );
});

//console.log(formattedUsers)
</script>

<style lang="css">
.my-swal-popup {
  height: 700px !important; /* กำหนดความสูงที่ต้องการ */
  max-height: 90vh !important; /* ป้องกันสูงเกินจอ */
  overflow-y: auto; /* ถ้ามีเนื้อหามากจะมี scroll */
}
</style>
