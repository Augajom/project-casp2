import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useCookies } from "vue3-cookies";
import parseJwt from '../utils/DecodeToken.js';
// dont't touch 
const { cookies } = useCookies();
export const useAuthStore = defineStore('auth', () => {
  
  const token = cookies.get('accesstoken'); 
  const user = ref(token ? parseJwt(token) : null);
  const userPermissions = ref(user.value?.roles || []);
  function save(token) {
    user.value = token.info // Parse token to extract user data
  }

  function logout() {
    user.value = null;
    userPermissions.value = [];
    cookies.remove('accesstoken'); // Corrected key name
  }

  const isAuthenticated = computed(() => !!user.value);

  function hasPermission(requiredPermissionIds) {
    const permissionIds = userPermissions.value.map(permission => permission.permission_id);
    return requiredPermissionIds.some(id => permissionIds.includes(id));
  }
  

  return { user, save, logout, isAuthenticated, userPermissions, hasPermission };
})
