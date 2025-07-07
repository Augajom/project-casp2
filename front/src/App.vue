<template>
  <div>
        <router-view />
        <div class="d-flex justify-content-center" id="loader">
          <div class="spinner-grow text-primary "  role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
  </div>
  
    
</template>


<script setup>
import axios from 'axios'
import parseJwt from '../utils/DecodeToken'
import { ref,reactive, onMounted, computed, watch, onUnmounted } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()
import Navbar from '@/components/Navbar.vue'


</script>

<style >

</style> 
