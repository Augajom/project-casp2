<template>
  <div>
    <AdminBar />
    <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px">
      <div v-if="fiscalYears.length === 0" class="text-center py-5">
        <h4 class="text-muted">ไม่มีข้อมูลปีงบประมาณในระบบขณะนี้</h4>
        <p class="text-muted">กรุณาติดต่อผู้ดูแลระบบเพื่อเพิ่มข้อมูล</p>
        <button @click="fetchFiscalYears" class="btn btn-primary mt-3">
          โหลดข้อมูลอีกครั้ง
        </button>
      </div>
      <div v-else>
        <div
          class="my-5 d-flex flex-column"
          style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px"
        >
          <div class="d-flex flex-column mb-5">
            <h5 class="">เลือกปีงบประมาณ ที่ต้องการแสดงผล</h5>
            <select
              v-model="selectedFiscalYear"
              class="form-select form-select-sm p-2"
              style="min-width: 200px; min-height: 40px"
            >
              <option v-for="year in fiscalYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <!-- Show current fiscal year in the dashboard -->
          <div
            v-if="selectedFiscalYear"
            @mouseover="showPopup = true"
            @mouseleave="showPopup = false"
            class="mb-3"
          >
            <h4>กำลังแสดงข้อมูลปีงบประมาณ พ.ศ. {{ selectedFiscalYear }}</h4>
          </div>
          <div v-if="showPopup" class="popup">
            ข้อมูลที่แสดงด้านล่างนี้ เป็นข้อมูลโครงการที่ได้ยื่นเสนอต่อศูนย์บริการวิชาการ
          </div>

          <div v-if="allProjectTypesSummary.length > 0">
            <div
              v-for="projectTypeData in allProjectTypesSummary"
              :key="projectTypeData.id"
              class="border-bottom border-dashed"
            >
              <div class="mb-4 mt-4">
                <h1 class="display-5 fw-bold">โครงการบริการวิชาการ</h1>
                <h1 class="display-6 fw-bold">ประเภท{{ projectTypeData.name }}</h1>
                <div v-if="projectTypeData.id === 4"></div>
              </div>

              <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">กำลังโหลด...</span>
                </div>
                <p class="mt-3">กำลังโหลดข้อมูลแดชบอร์ด...</p>
              </div>

              <!-- Add this condition to check if there are projects with status >= 6 -->
              <div v-else-if="projectTypeData.totalProjects > 0">
                <div
                  style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    align-items: flex-start;
                  "
                >
                  <div style="flex: 1; min-width: 400px; max-width: 800px">
                    <div style="width: 100%; height: 400px">
                      <canvas
                        :id="`chartCanvas-${projectTypeData.id}`"
                        style="width: 100%; height: 100%"
                      ></canvas>
                    </div>
                  </div>

                  <div
                    style="flex: 1; min-width: 400px; max-width: 600px; overflow-x: auto"
                  >
                    <table
                      border="1"
                      style="width: 100%; border-collapse: collapse; margin: 0 auto"
                    >
                      <thead>
                        <tr>
                          <th 
                          class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              background-color: #e0e0e0;
                              
                            "
                          >
                            หน่วยงาน
                          </th>
                          <th
                          class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              background-color: #e0e0e0;
                            "
                          >
                            จำนวน (โครงการ)
                          </th>
                          <th
                          class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              background-color: #e0e0e0;
                            "
                          >
                            งบประมาณ (บาท)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in projectTypeData.groupedData"
                          :key="index"
                        >
                          <td
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                            "
                          >
                            {{ item.affiliation }}
                          </td>
                          <td
                            class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                            "
                          >
                            {{ item.count }}
                          </td>
                          <td
                          class="text-end"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                            "
                          >
                            {{ item.total.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) }}
                          </td>
                        </tr>
                        <tr class="summary-row">
                          <td
                          class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              font-weight: bold;
                              background-color: #e0e0e0;
                            "
                          >
                            รวม
                          </td>
                          <td
                          class="text-center"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              font-weight: bold;
                              background-color: #e0e0e0;
                            "
                          >
                            {{ projectTypeData.totalProjects }}
                          </td>
                          <td
                          class="text-end"
                            style="
                              padding: 8px 12px;
                              text-align: left;
                              border: 1px solid #444;
                              font-weight: bold;
                              background-color: #e0e0e0;
                            "
                          >
                            {{ projectTypeData.totalBudget.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <p class="fw-bold fs-5" style="text-align: left; margin-top: 20px; align-items: start">
                  <span class="text-danger">*** </span>
                  ข้อมูลดังตารางข้างต้น ของประเภท
                  {{ projectTypeData.name }}  <br>คลิกเพื่อดาวน์โหลดไฟล์ <span class="text-danger">*** </span>
                </p>
                <div style="text-align: left; align-items: start">
                  <button
                    @click="exportExcel1(projectTypeData)"
                    style="
                      padding: 10px 15px;
                      background-color: #4caf50;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      cursor: pointer;
                      font-size: 16px;
                      margin-top: 10px;
                    "
                  >
                    ดาวน์โหลด
                  </button>
                </div>
                <p class="fw-bold fs-5" style="text-align: left; margin-top: 20px">
                  <span class="text-danger">*** </span>
                  ข้อมูลโครงการที่ผ่านการอนุมัติและเห็นชอบจากคณะกรรมการ ของประเภท
                  {{ projectTypeData.name }} คลิกเพื่อดาวน์โหลดไฟล์ <span class="text-danger">*** </span>
                </p>
                <div style="text-align: left" class="mb-5">
                  <button
                    @click="exportExcel2(projectTypeData)"
                    style="
                      padding: 10px 15px;
                      background-color: #4caf50;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      cursor: pointer;
                      font-size: 16px;
                      margin-top: 10px;
                    "
                  >
                    ดาวน์โหลด
                  </button>
                </div>
              </div>
              <!-- Show this message when there are no projects with status >= 6 -->
              <div v-else>
                <p>
                  ขณะนี้ยังไม่มีโครงการที่ได้รับการอนุมัติผ่านคณะกรรมการ ของประเภท
                  {{ projectTypeData.name }}
                </p>
              </div>
            </div>
            <!-- <div  class="mb-5 d-flex flex-column" >
        <hr style="margin: 40px 0; border-top: 1px dashed #ccc;">
      <p style="text-align: left; margin-top: 20px;">คลิกเพื่อดาวน์โหลดไฟล์ข้อมูลรวมของทั้งระบบ</p>
          <div style="text-align: left;">
            <button @click="exportExcel3()" style="padding: 10px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 10px;">
              ดาวน์โหลดไฟล์ Excel ที่ 3
            </button>
          </div>
      </div> -->
          </div>
          <div v-else class="text-center py-5">
            <!-- <p>กำลังโหลดข้อมูล...</p> -->
            <p class="text-muted">ไม่พบข้อมูลโครงการที่ได้รับการอนุมัติ</p>
            <button @click="fetchDashboardSummary" class="btn btn-primary mt-3">
              โหลดข้อมูลอีกครั้ง
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Chart, registerables } from "chart.js";

import AdminBar from "./AdminBar.vue";

Chart.register(...registerables);

const showPopup = ref(false);
const isLoading = ref(true);
const allProjectTypesSummary = ref([]);
const charts = ref({});
const fiscalYears = ref([]);
const selectedFiscalYear = ref("");
const API_BASE_URL = "http://localhost:5000/admin";

// Fetch fiscal years when component mounts
const fetchFiscalYears = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fiscal-years`);
    if (response.data?.success) {
      fiscalYears.value = Array.isArray(response.data.result) ? response.data.result : [];
      // Set default to latest fiscal year
      if (fiscalYears.value.length > 0) {
        selectedFiscalYear.value = fiscalYears.value[0];
      }
    }
  } catch (error) {
    console.error("Error fetching fiscal years:", error);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Error fetching fiscal years",
      text: error.message,
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

const fetchDashboardSummary = async () => {
  if (!selectedFiscalYear.value && fiscalYears.value.length > 0) {
    selectedFiscalYear.value = fiscalYears.value[0];
  }

  isLoading.value = true;
  try {
    const response = await axios.post(`${API_BASE_URL}/dashboard-summary`, {
      fiscal_year: selectedFiscalYear.value,
    });

    if (response.data?.success) {
      allProjectTypesSummary.value = Array.isArray(response.data.result)
        ? response.data.result
        : [];
    } else {
      allProjectTypesSummary.value = [];
    }
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Error fetching dashboard summary",
      text: error.message,
      showConfirmButton: false,
      timer: 3000,
    });
    allProjectTypesSummary.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Improved chart rendering with error handling
const renderChart = (projectTypeData) => {
  const chartId = `chartCanvas-${projectTypeData.id}`;

  // Wait for next tick to ensure DOM is updated
  nextTick(() => {
    const canvas = document.getElementById(chartId);
    if (!canvas) {
      console.warn(`Canvas element #${chartId} not found`);
      return;
    }

    // Ensure we have data to render
    if (!projectTypeData.groupedData || projectTypeData.groupedData.length === 0) {
      console.warn(`No data available for chart ${chartId}`);
      return;
    }

    // Destroy existing chart if it exists
    if (charts.value[chartId]) {
      // charts.value[chartId].destroy();
      try {
        charts.value[chartId].destroy();
      } catch (e) {
        console.warn("Error destroying chart:", e);
      }
    }

    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Could not get canvas context");
        return;
      }

      charts.value[chartId] = new Chart(ctx, {
        type: "bar",
        data: {
          labels: projectTypeData.groupedData.map((item) => item.affiliation),
          datasets: [
            {
              label: "จำนวนโครงการ",
              data: projectTypeData.groupedData.map((item) => item.count),
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          animation: {
            duration: 0, // Disable animations to prevent save error
          },

          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `จำนวนโครงการแบ่งตามหน่วยงาน (${projectTypeData.totalProjects} โครงการ)`,
              font: {
                size: 16,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "จำนวนโครงการ",
              },
              ticks: {
                precision: 0,
                stepSize: 1,
                callback: function (value) {
                  return Number.isInteger(value) ? value : null;
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "หน่วยงาน",
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error rendering chart:", error);
    }
  });
};

// Watch for data changes and render charts
watch(
  allProjectTypesSummary,
  (newVal) => {
    if (newVal.length > 0) {
      newVal.forEach((projectTypeData) => {
        if (projectTypeData.totalProjects > 0) {
          renderChart(projectTypeData);
        }
      });
    }
  },
  { deep: true }
);

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const downloadExcelFile = (buffer, fileName) => {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isIOS() || isSafari()) {
    // วิธีสำหรับ iOS/Safari
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 100);
  } else {
    saveAs(blob, fileName);
  }
};

const exportExcel1 = async (projectTypeData) => {
  try {
    if (!projectTypeData || (!projectTypeData.groupedData && !projectTypeData.projects)) {
      throw new Error("No data available to export");
    }

    // Filter out duplicate projects
    const uniqueProjects = [];
    const seenProjects = new Set();

    projectTypeData.projects?.forEach((project) => {
      if (!seenProjects.has(project.project_id)) {
        seenProjects.add(project.project_id);
        uniqueProjects.push(project);
      }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`สรุปงบประมาณ_${projectTypeData.name}`);

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Original format for other project types
    worksheet.mergeCells("A1:C1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = `สรุปงบประมาณตามหน่วยงาน (ประเภท${
      projectTypeData.name
    }) ประจำปีงบประมาณ พ.ศ. ${projectTypeData.fiscal_year || "…….."}`;
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    const headerRow = worksheet.addRow(["หน่วยงาน", "จำนวน (โครงการ)", "งบประมาณ (บาท)"]);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = borderStyle;
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9D9D9" } };
    });

    projectTypeData.groupedData.forEach((item) => {
      const row = worksheet.addRow([item.affiliation, item.count, item.total]);
      row.eachCell((cell) => {
        cell.border = borderStyle;
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
      row.getCell(3).numFmt = "#,##0";
    });

    const summaryRow = worksheet.addRow([
      "รวม",
      projectTypeData.totalProjects,
      projectTypeData.totalBudget,
    ]);
    summaryRow.eachCell((cell) => {
      cell.border = borderStyle;
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.font = { bold: true };
    });
    summaryRow.getCell(3).numFmt = "#,##0";

    worksheet.columns = [{ width: 60 }, { width: 40 }, { width: 45 }];

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `สรุปงบประมาณตามตาราง_${
      projectTypeData.name
    }_${new Date().toISOString().slice(0, 10)}.xlsx`;

    // ใช้ฟังก์ชันใหม่แทน saveAs
    downloadExcelFile(buffer, fileName);

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Export successful!",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Export error:", error);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Export failed",
      text: error.message,
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

const exportExcel2 = async (projectTypeData) => {
  try {
    if (!projectTypeData || (!projectTypeData.groupedData && !projectTypeData.projects)) {
      throw new Error("No data available to export");
    }

    // Filter out duplicate projects
    const uniqueProjects = [];
    const seenProjects = new Set();

    projectTypeData.projects?.forEach((project) => {
      if (!seenProjects.has(project.project_id)) {
        seenProjects.add(project.project_id);
        uniqueProjects.push(project);
      }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`สรุปงบประมาณ_${projectTypeData.name}`);

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // For project types 2 and 3
    if ([2, 3].includes(projectTypeData.id)) {
      // Title with fiscal year
      worksheet.mergeCells("A1:I1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = `${projectTypeData.name} ปีงบประมาณ พ.ศ. ${
        projectTypeData.fiscal_year || "…….."
      }`;
      titleCell.font = { bold: true, size: 14 };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };

      // Headers
      const headers = [
        "ที่",
        "ชื่อโครงการ",
        "หน่วยงาน",
        "วันดำเนินโครงการ",
        "งบประมาณโครงการ",
        "ค่าดำเนินการส่วนกลาง",
        "ค่าตอบแทนหน่วยงานคณะบริหารโครงการ",
        "ค่าตอบแทนคณะบริหารโครงการ",
        "รายได้สุทธิ",
      ];

      const headerRow = worksheet.addRow(headers);
      headerRow.font = { bold: true };
      headerRow.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = borderStyle;
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9D9D9" } };
      });

      // Add project rows
      projectTypeData.projects.forEach((project, index) => {
        const row = worksheet.addRow([
          index + 1,
          project.project_name || "-",
          project.affiliation_name || "-",
          project.operation_dates || "-",
          project.total_budget || 0,
          project.common_fee || 0,
          project.faculty_manage_share || 0,
          project.faculty_manage_share || 0,
          project.net_income_after_cost || 0,
        ]);

        row.eachCell((cell) => {
          cell.border = borderStyle;
          cell.alignment = { horizontal: "center", vertical: "middle" };
          if (cell.col >= 5 && cell.col <= 9) {
            cell.numFmt = "#,##0.00";
          }
        });
      });

      // Add summary row
      const summaryRow = worksheet.addRow([
        "",
        "",
        "",
        "รวม",
        projectTypeData.totalBudget,
        projectTypeData.projects.reduce((sum, p) => sum + (p.common_fee || 0), 0),
        projectTypeData.projects.reduce(
          (sum, p) => sum + (p.faculty_manage_share || 0),
          0
        ),
        projectTypeData.projects.reduce(
          (sum, p) => sum + (p.faculty_manage_share || 0),
          0
        ),
        projectTypeData.projects.reduce(
          (sum, p) => sum + (p.net_income_after_cost || 0),
          0
        ),
      ]);

      summaryRow.eachCell((cell) => {
        cell.border = borderStyle;
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.font = { bold: true };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9D9D9" } };
        if (cell.col >= 5 && cell.col <= 9) {
          cell.numFmt = "#,##0.00";
        }
      });

      // Set column widths
      worksheet.columns = [
        { width: 8 }, // ที่
        { width: 40 }, // ชื่อโครงการ
        { width: 30 }, // หน่วยงาน
        { width: 30 }, // วันดำเนินโครงการ
        { width: 25 }, // งบประมาณโครงการ
        { width: 30 }, // ค่าดำเนินการส่วนกลาง
        { width: 40 }, // ค่าตอบแทนหน่วยงานคณะบริหารโครงการ
        { width: 35 }, // ค่าตอบแทนคณะบริหารโครงการ
        { width: 25 }, // รายได้สุทธิ
      ];
    } else {
      worksheet.mergeCells("A1:E1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = `${projectTypeData.name} ปีงบประมาณ พ.ศ. ${
        projectTypeData.fiscal_year || "…….."
      }`;
      titleCell.font = { bold: true, size: 14 };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };

      // Headers
      const headers = [
        "ที่",
        "ชื่อโครงการ",
        "หน่วยงาน",
        "วันดำเนินโครงการ",
        "งบประมาณโครงการ",
      ];

      const headerRow = worksheet.addRow(headers);
      headerRow.font = { bold: true };
      headerRow.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = borderStyle;
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9D9D9" } };
      });

      // Add project rows
      projectTypeData.projects.forEach((project, index) => {
        const row = worksheet.addRow([
          index + 1,
          project.project_name || "-",
          project.affiliation_name || "-",
          project.operation_dates || "-",
          project.total_budget || 0,
        ]);

        row.eachCell((cell) => {
          cell.border = borderStyle;
          cell.alignment = { horizontal: "center", vertical: "middle" };
          if (cell.col >= 5 && cell.col <= 9) {
            cell.numFmt = "#,##0.00";
          }
        });
      });

      // Add summary row
      const summaryRow = worksheet.addRow([
        "",
        "",
        "",
        "รวม",
        projectTypeData.totalBudget,
      ]);

      summaryRow.eachCell((cell) => {
        cell.border = borderStyle;
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.font = { bold: true };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9D9D9" } };
        if (cell.col >= 5 && cell.col <= 9) {
          cell.numFmt = "#,##0.00";
        }
      });

      // Set column widths
      worksheet.columns = [
        { width: 8 }, // ที่
        { width: 40 }, // ชื่อโครงการ
        { width: 30 }, // หน่วยงาน
        { width: 30 }, // วันดำเนินโครงการ
        { width: 25 }, // งบประมาณโครงการ
      ];
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `สรุปงบประมาณโดยละเอียด_${
      projectTypeData.name
    }_${new Date().toISOString().slice(0, 10)}.xlsx`;

    // ใช้ฟังก์ชันใหม่แทน saveAs
    downloadExcelFile(buffer, fileName);

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Export successful!",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Export error:", error);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Export failed",
      text: error.message,
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

// onMounted(() => {
//   fetchDashboardSummary();
// });

onMounted(async () => {
  await fetchFiscalYears();
  await fetchDashboardSummary();
});

watch(selectedFiscalYear, (newVal) => {
  if (newVal) {
    fetchDashboardSummary();
  }
});

onBeforeUnmount(() => {
  // Clean up charts
  Object.values(charts.value).forEach((chart) => {
    if (chart) chart.destroy();
  });
});
</script>

<style>
/* .project-type-dashboard {
  margin-bottom: 60px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
} */
.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.918);
  z-index: 1000;
  color: white;
  padding: 10px;
  border-radius: 8px;
  max-width: 600px;
  text-align: center;
  pointer-events: none;
}
</style>
