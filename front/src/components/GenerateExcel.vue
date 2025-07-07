<template>
  <div>
     <div class="row mt-2" style="margin-left: 1px;">
                <div class="btn btn-success row" style="width: 200px;" @click="handleExport">
                  <span class="col-6 "><img src="../assets/download.png" width="18px" alt="download"></span>
                  <span class="col-6 rounded">Excel</span>
                </div>
              </div> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
});

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const handleExport = async () => {
  try {
    // Show loading indicator
    Swal.fire({
      title: 'กำลังเตรียมไฟล์ Excel',
      html: 'กรุณารอสักครู่...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // 1. Fetch project data
    const response = await axios.post(`http://localhost:5000/pl/get/dataforexcel`, {

      projectId: props.projectId

    });
    
    const { project_name, project_type, budget_data, CommonFee} = response.data.data;
    
    // Check if there's data to export
    if (!budget_data || budget_data.length === 0) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'warning',
        title:`ไม่มีข้อมูลงบประมาณสำหรับโครงการนี้`,
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // 2. Generate Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("งบประมาณโครงการ");

    // Styles
    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // Title
    worksheet.mergeCells("A1:D1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = `ตารางสรุปประมาณการค่าใช้จ่าย ${project_name} ประเภท${project_type}`;
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.height = 50;

    // Header
    const headerRow = worksheet.addRow(['ลำดับที่', 'รายการ', 'รายละเอียดงบประมาณ', 'ประมาณการ']);
    headerRow.font = { bold: true };
    headerRow.height = 25;
    headerRow.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = borderStyle;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
    });

    // Data rows
    let rowIndex = 0;
budget_data.forEach((item) => {
    const detailsText = item.details ? String(item.details).replace(/\n/g, '\n') : '';
    
    if (item.isCategory) {
        // Add category header row
        const categoryRow = worksheet.addRow(['', item.list, '', '']);
        categoryRow.font = { bold: true };
        categoryRow.eachCell(cell => {
            cell.border = borderStyle;
            cell.alignment = { horizontal: "left", vertical: "middle" };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
        });
        categoryRow.height = 25;
    } else {
        // Add regular data row
        rowIndex++;
        const row = worksheet.addRow([rowIndex, item.list, detailsText, item.cost]);

        row.eachCell(cell => cell.border = borderStyle);
        
        // Cell alignments
        row.getCell(1).alignment = { horizontal: "center", vertical: "top" };
        row.getCell(2).alignment = { horizontal: "left", vertical: "top", wrapText: true };
        row.getCell(3).alignment = { horizontal: "left", vertical: "top", wrapText: true };
        row.getCell(4).alignment = { horizontal: "right", vertical: "top" };
        row.getCell(4).numFmt = '#,##0.00';

        // Auto-size column width for details
        const longestLine = detailsText.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
        const detailsCol = worksheet.getColumn(3);
        detailsCol.width = Math.min(Math.max(longestLine * 0.8, 10), 100);
    }
});

    // Row heights
    worksheet.eachRow(row => {
      const detailsCell = row.getCell(3);
      if (detailsCell.value && typeof detailsCell.value === 'string') {
        const lineCount = detailsCell.value.split('\n').length;
        row.height = Math.min(15 + (lineCount * 12), 100);
      }
    });

    // Total row
    const totalCost = budget_data.reduce((sum, item) => sum + (item.cost || 0), 0);
    const commonFee = parseFloat(response.data.data.CommonFee || 0);
    const commonFeeRow = worksheet.addRow(['', 'ค่าดำเนินงานส่วนกลาง', '', commonFee]);
    commonFeeRow.eachCell(cell => {
      cell.border = borderStyle;
      cell.alignment = { vertical: "middle" };
      if (cell.col === 4) cell.numFmt = '#,##0.00';
    });

    const totalWithCommonFee = totalCost + commonFee;
    const summaryRow = worksheet.addRow(['', '', 'รวมจำนวนเงินทั้งสิ้น', totalWithCommonFee]);
    summaryRow.height = 25;
    summaryRow.font = { bold: true };
    summaryRow.eachCell(cell => {
      cell.border = borderStyle;
      cell.alignment = { vertical: "middle" };
      if (cell.col === 3) cell.alignment = { horizontal: "right", vertical: "middle" };
      if (cell.col === 4) cell.numFmt = '#,##0.00';
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
    });
    // summaryRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6E6E6' } };

    // Column widths
    worksheet.columns = [
      { width: 10 },  // No.
      { width: 70 },  // List
      { width: 60 },  // Details
      { width: 20 }   // Cost
    ];

    // 3. Download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `สรุปงบประมาณ_${project_name}.xlsx`;
    
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    if (isIOS()) {
      // สำหรับ iOS - สร้าง URL แล้วดาวน์โหลด
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // ล้าง URL หลังจากดาวน์โหลด
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } else {
      // สำหรับเบราว์เซอร์อื่น
      saveAs(blob, fileName);
    }

    // Close loading and show success
    Swal.close();
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'ดาวน์โหลดไฟล์สำเร็จ!',
      showConfirmButton: false,
      timer: 2000
    });

  } catch (error) {
    console.error("Error exporting Excel:", error);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการสร้างไฟล์',
      text: error.response?.data?.message || error.message,
      showConfirmButton: false,
      timer: 3000
    });
  }
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>

