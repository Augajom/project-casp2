<template>
  <div>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="container border p-5" style="max-width: 800px;">
            <div class="row">
                <div class="col-8 ">
                <!-- logo -->
                    <div class="row mb-3"><h2>The Center For Academic</h2></div>
                <!-- error message -->
                    <div class="row mb-3 mx-2">
                        404. That’s an error.
                    </div>
                <!-- error details -->
                    <div class="row mb-3 mx-2">
                        The requested URL was not found on this server.
                        
                    </div>
                    <div class="row " style="margin-left: -2px;cursor: pointer;color: blue;">
                        <p @click="router.back()">Back to previous page</p> 
                    </div>
                </div>
                <!-- for imgage -->
                <div class="col-4 d-flex justify-content-center align-items-center">
                    <div>
                        <h1 class="mx-2">404</h1>
                        <h5>Not Found</h5>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import notfoundImg from '@/assets/notfound404.png';
const router = useRouter();

onMounted(() => {
  document.title = '404 - Page Not Found';
})
</script>

<style lang="css" scoped></style>
