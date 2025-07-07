<template>
    <div class="p-3" style="margin-top: 55px; background-color: white;">
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-line" :style="{ width: progressWidth }"></div>
            </div>
            <div v-for="(num, index) in steps" :key="num" class="step-container">
                <!-- Label for even steps (Above) -->
                <div v-if="index % 2 !== 0" class="label above">{{ labels[num - 1] }}</div>

                <!-- Step Circle -->
                <div class="step text-wrap"
                    :class="{ active: num <= step, clickable: isPageAvailable(num) }"
                    @click="goToPage(num)">
                {{ num }}
                </div>

                <!-- Label for odd steps (Below) -->
                <div v-if="index % 2 === 0" class="label below">{{ labels[num - 1] }}</div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { computed, defineProps, defineEmits, onMounted, ref, } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios'
const route = useRoute()
const router = useRouter();

const props = defineProps({
    step: { type: Number, required: true }
});

const emit = defineEmits(["update:step"]);

const steps = 7;

const labels = [
    "ชื่อโครงการ",
    "ลักษณะของโครงการและประเด็นด้าน SDGs",
    "หลักการและเหตุผล",
    "แผนการดำเนินงานและกลุ่มเป้าหมาย",
    "การประเมินผล",
    "งบประมาณรายจ่าย",
    "สรุปรายละเอียดงบประมาณ"
];

const progressWidth = computed(() => ((props.step - 1) / (steps - 1)) * 100 + "%");

const updateProgress = (num) => {
    emit("update:step", num);
};

const project_id = ref('')
const project_type = ref(0)
const projectData = ref(null)

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/get/all/data", {
      project_id: project_id.value,
      project_type: project_type.value,
    })

    const raw = response.data.data[0]

    projectData.value = {
      p1: JSON.parse(raw.project_data_p_1 || '{}'),
      p2: JSON.parse(raw.project_data_p_2 || '{}'),
      p3: JSON.parse(raw.project_data_p_3 || '{}'),
      p4: JSON.parse(raw.project_data_p_4 || '{}'),
      p5: JSON.parse(raw.project_data_p_5 || '{}'),
      p6: JSON.parse(raw.project_data_p_6 || '{}'),
      p7: JSON.parse(raw.project_data_p_7 || '{}'),
    }
  } catch (err) {
    console.error("❌ error fetching editing data", err)
  }
}

const formPaths = computed(() => {
  const base = project_type.value === 1 ? "no_income"
            : project_type.value === 2 ? "in_come"
            : project_type.value === 3 ? "st"
            : "TS";

  return {
    1: `/pl/${base}/p_1?project_id=${project_id.value}&project_type=${project_type.value}`,
    2: `/pl/${base}/p_2?project_id=${project_id.value}&project_type=${project_type.value}`,
    3: `/pl/${base}/p_3?project_id=${project_id.value}&project_type=${project_type.value}`,
    4: `/pl/${base}/p_4?project_id=${project_id.value}&project_type=${project_type.value}`,
    5: `/pl/${base}/p_5?project_id=${project_id.value}&project_type=${project_type.value}`,
    6: `/pl/${base}/p_6?project_id=${project_id.value}&project_type=${project_type.value}`,
    7: `/pl/${base}/p_7?project_id=${project_id.value}&project_type=${project_type.value}`,
  };
});

const isPageAvailable = (pageNum) => {
  const data = projectData.value?.[`p${pageNum}`];
  return data && Object.keys(data).length > 0;
};

const goToPage = (num) => {
  if (isPageAvailable(num)) {
    const path = formPaths.value[num];
    router.push(path);
  }
};

onMounted(async () => {
  project_id.value = route.query.project_id || ''
  project_type.value = Number(route.query.project_type || 0)

  await getDataWhenProjectID()
})
</script>

<style scoped>
.progress-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
    max-width: 1200px;
    
    position: relative;
}

.progress-bar {
    position: absolute;
    top: 21px;
    left: 6%;
    width: 88%;
    height: 4px;
    background: #ccc;
    transform: translateY(-50%);
    z-index: 1;
}

.progress-line {
    height: 100%;
    background: #2c3e50;
    transition: width 0.8s ease;
}

.step {
    position: relative;
    width: 40px;
    height: 40px;
    background: #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    color: white;
    z-index: 2;
    cursor: pointer;
    transition: background 0.8s ease;
}

.step.active {
    background: #2c3e50;
}

.step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
}

.label {
    width: 150px;
    font-size: 12px;
    text-align: center;
    width: max-content;
    position: absolute;
}


.label.above {
    bottom: 50px;
}

.label.below {
    top: 50px; 
}

.step.clickable {
  cursor: pointer;
  background-color: #374375;
}

.step:not(.clickable) {
  cursor: not-allowed;
  /* opacity: 0.5; */
  /* background-color: #a1a1a1; */
}
</style>

