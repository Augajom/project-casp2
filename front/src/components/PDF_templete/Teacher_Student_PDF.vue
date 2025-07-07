<template>
  <div v-if="projectData">
    <!-- ส่วนที่ต้องการแปลงเป็น PDF -->
    <div id="pdf-content">
      <div class="container text-box">
        <div class="pdf-page">
          <div class="con-header1">
            <div
              class="header-1"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 0.25rem;
                margin: 5px 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <img
                src="../../assets/PDFPic/MFU-tc.png"
                alt=""
                style="height: 13rem; margin-right: 10px;"
              />
              <div class="text-header">
                <h3 style="margin-top: 1rem;">โครงการบริการวิชาการที่ไม่มีรายได้</h3>
                <h3>สำหรับพัฒนาครูและนักเรียน</h3>
                <h3>ปีงบประมาณ พ.ศ.{{ fiscalYear || 'กรุณากดส่งโครงการเพื่อแสดงปีงบประมาณ' }}</h3>
                <p>งบประมาณจากมูลนิธิมหาวิทยาลัยแม่ฟ้าหลวงเพื่อการพัฒนาครูชนบท</p>
              </div>
            </div>
          </div>
          <div class="con-header-2">
            <div
              class="header-2"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5px 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3 style="">ชื่อโครงการ/หัวหน้าโครงการ</h3>
            </div>
            <div
              class="name-list text-box"
              style="margin: 2rem 1rem 0.5rem 1rem; display: flex"
            >
              <h3 style="width: 200px;">ชื่อโครงการ</h3>
              <h3 style="width: 1100px">{{projectData.p1.project_name}}</h3>
            </div>
            <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
            <div v-if="projectData.p1.agency_group.length > 1"> 
              <div
                v-for="(agency, index) in projectData.p1.agency_group"
                :key="index"
                class="name-list text-box"
                style="margin: 2rem 1rem 1rem 1rem;"
              >
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหน่วยงาน {{ index + 1 }}</h3>
                  <h3 style="width: 700px; margin-right: 1rem;">{{ agency.executive_board || '-'}}</h3>
                </div>
              </div>
            </div>

            <!-- กรณีมีแค่ 1 หน่วยงาน -->
            <div v-else>
              <div class="name-list text-box" style="margin: 0 1rem 1rem 1rem;">
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหน่วยงาน</h3>
                  <h3 style="width: 700px; margin-right: 1rem;">{{ projectData.p1.agency_group[0].executive_board || '-'}}</h3>
                  <h3>ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp; {{ projectData.p1.agency_group[0].percentage_of_participation || '-'}}</h3>
                </div>
              </div>
            </div>
            <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
            <div v-if="projectData.p1.project_manager_leader_name_list.length > 1"> 
              <div
                v-for="(agency, index) in projectData.p1.project_manager_leader_name_list"
                :key="index"
                class="name-list text-box"
                style="margin: 2rem 1rem 1rem 1rem;"
              >
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหัวหน้าโครงการ {{ index + 1 }}</h3>
                  <h3 style="width: 1100px">{{ agency.project_manager_leader_name }}</h3>
                </div>
              </div>
            </div>

            <!-- กรณีมีแค่ 1 หน่วยงาน -->
            <div v-else>
              <div class="name-list text-box" style="margin: 0 1rem 1rem 1rem;">
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหัวหน้าโครงการ</h3>
                  <h3 style="width: 1100px">{{ projectData.p1.project_manager_leader_name_list[0].project_manager_leader_name || '-'}}</h3>
                </div>
              </div>
            </div>
            <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
            <div v-if="projectData.p1.agency_group.length > 1"> 
              <div
                v-for="(agency, index) in projectData.p1.agency_group"
                :key="index"
                class="name-list text-box"
                style="margin: 2rem 1rem 1rem 1rem;"
              >
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหัวหน้า<br>หน่วยงาน {{ index + 1 }}</h3>
                  <h3 style="width: 1100px">{{ agency.executive_board_leader_name || '-'}}</h3>
                </div>
              </div>
            </div>

            <!-- กรณีมีแค่ 1 หน่วยงาน -->
            <div v-else>
              <div class="name-list text-box" style="margin: 0 1rem 1rem 1rem;">
                <div style="display: flex;">
                  <h3 style="width: 200px;">ชื่อหัวหน้า<br>หน่วยงาน</h3>
                  <h3 style="width: 1100px">{{ projectData.p1.agency_group[0].executive_board_leader_name || '-'}}</h3>
                </div>
              </div>
            </div>
          </div>

          </div>

          <div class="pdf-page">
          
          <div class="con-header-3">
            <div
              class="header-3"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5px 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>ลักษณะของโครงการ และประเด็น SDGs</h3>
            </div>
            <div class="text-con" style="margin: 1rem 0 1rem 0">
              <h2
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                ความสอดคล้องกับวัตถุประสงค์ของมูลนิธิมหาลัยแม่ฟ้าหลวงเพื่อการพัฒนาครูชนบท
              </h2>
             <!-- กรณีมีมากกว่า 1 รายการ -->
              <div v-if="projectData.p2.objectives.length > 1">
                <div
                  v-for="(item, index) in projectData.p2.objectives"
                  :key="item.id"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    {{ index + 1 }}. &nbsp;&nbsp;&nbsp;{{ getObjectiveText(item.id) }}
                    <br v-if="!hideReason(item.id)">
                    <span v-if="!hideReason(item.id)">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เหตุผล :</b> {{ item.description }}
                    </span>
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 รายการ -->
              <div v-else>
                <div
                  v-for="item in projectData.p2.objectives"
                  :key="item.id"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    1. &nbsp;&nbsp;&nbsp;{{ getObjectiveText(item.id) }}
                    <br v-if="!hideReason(item.id)">
                    <span v-if="!hideReason(item.id)">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เหตุผล :</b> {{ item.description }}
                    </span>
                  </h3>
                </div>
              </div>

              <!-- ดึงข้อมูลมาแสดง -->
              <h2
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                สาระวิชาที่เกี่ยวข้อง
              </h2>
              <!-- แสดงวิชาทั่วไป (subjects) ถ้ามี -->
              <div v-if="projectData.p2.subjects.length > 0">
                <div
                  v-for="(item, index) in projectData.p2.subjects"
                  :key="index"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    {{ index + 1 }}. &nbsp;&nbsp;&nbsp;{{ getSubjectName(item) }}
                  </h3>
                </div>

                <!-- แสดงวิชาอื่น ๆ (other_subject) ถ้ามี -->
                <div
                  v-if="projectData.p2.other_subject"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    {{ projectData.p2.subjects.length + 1 }}. &nbsp;&nbsp;&nbsp;วิชาอื่น ๆ : {{ projectData.p2.other_subject }}
                  </h3>
                </div>
              </div>

              <!-- ถ้าไม่มี subjects แต่มี other_subject -->
              <div v-else-if="projectData.p2.other_subject">
                <div
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    1. &nbsp;&nbsp;&nbsp;วิชาอื่น ๆ : {{ projectData.p2.other_subject }}
                  </h3>
                </div>
              </div>

              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                ความสอดคล้องกับเป้าหมายการพัฒนาที่ยั่งยืน (Sustainable
                Development Goals: SDGs)
              </h3>
              <!-- กรณีมีมากกว่า 1 รายการ -->
              <div v-if="projectData.p2.sdgs.length > 1">
                <div
                  v-for="(item, index) in projectData.p2.sdgs"
                  :key="item.id"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    {{ index + 1 }}. &nbsp;&nbsp;&nbsp;{{ item.topic }} : {{ item.description }}
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 รายการ -->
              <div v-else>
                <div
                  v-for="(item) in projectData.p2.sdgs"
                  :key="item.id"
                  class="name-list text-box"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    1. &nbsp;&nbsp;&nbsp;{{ item.topic }} : {{ item.description }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div class="pdf-page">
          <div class="con-header-4">
            <div
              class="header-4"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 2rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>หลักการและเหตุผล วัตถุประสงค์ ตัวชี้วัดของโครงการ</h3>
            </div>
            <div class="text-con text-box" style="margin: 1rem 0 1rem 0">
              <h2
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                หลักการและเหตุผล (ความสำคัญของโครงการ)
              </h2>
              <h2
                style="
                  margin: 2rem 1rem 2rem 2.5rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >
                {{ projectData.p3.principle_reason }}
              </h2>
              <!-- ดึงข้อมูลมาแสดง -->
              <h2
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                หลักการและเหตุผล (ความเชื่อมโยงของโครงการกับแผนพัฒนามหาวิทยาลัยแม่ฟ้าหลวง)
              </h2>
              <h2
                style="
                  margin: 2rem 1rem 2rem 2.5rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >
                {{ projectData.p3.relate_to_other }}
              </h2>
              <h2
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                วัตถุประสงค์โครงการ
              </h2>
                <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div v-if="projectData.p3.objectives.length > 1"> 
                <div
                  v-for="(agency, index) in projectData.p3.objectives"
                  :key="index"
                  class="name-list text-box"
                  style="margin: 0 1rem 1rem 0;"
                >
                  <div
                class="name-list"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >
                <h2 style=" font-size: 24px; font-weight: normal;">&nbsp;&nbsp;&nbsp;{{ index + 1 }}. {{ agency.objective }}</h2>
              </div>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                class="name-list text-box"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >
                <h3>&nbsp;&nbsp;&nbsp;1. {{ projectData.p3.objectives[0].objective }}</h3>
              </div>
              </div>
            </div>
          </div>
           </div>

           <div class="pdf-page">
           <div class="con-header-6">
            <div
              class="header-6"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 2rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>เส้นทางสู่ผลกระทบของโครงการ (Impact Pathway)</h3>
            </div>
            <div class="text-con" style="margin: 1rem">
              <table
                cellspacing="0"
                cellpadding="20"
                style="
                  border: 4px solid black;
                  width: 100%;
                  table-layout: fixed;
                "
              >
                <thead style="text-align: center;">
                  <tr>
                    <th
                      rowspan="2"
                      style="background-color: #cc6600; border-left:4px solid black; border-right: 4px solid black; border-top:4px solid black;"
                    >
                      Input
                    </th>
                    <th rowspan="2" style="background-color: #f4a300 ; border-right: 4px solid black; border-top:4px solid black;">
                      Output
                    </th>
                    <th
                      colspan="2"
                      style="background-color: #fbc16a; border-bottom: 4px solid black; border-right: 4px solid black; border-top:4px solid black;"
                    >
                      Outcome
                    </th>
                    <th rowspan="2" style="background-color: #f9d8a6; border-top:4px solid black; border-right:4px solid black;">
                      Impact
                    </th>
                  </tr>
                  <tr>
                    <th
                      style="
                        background-color: #fbc16a;
                        padding: 0 10px 0 10px;
                        border-right: 1px dashed black;
                      "
                    >
                      User
                    </th>
                    <th style="background-color: #fbc16a; border-right: 4px solid black;">Change</th>
                  </tr>
                </thead>
                <tbody style="text-align: start;">
                 
                  <tr v-for="(row, index) in tableRows" :key="index">
                    <td style="vertical-align: top; border-right: 4px solid black; border-top: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ row.input }}</td>
                    <td style="vertical-align: top; border-right: 4px solid black; border-top: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ row.output }}</td>
                    <td style="vertical-align: top; border-right: 1px dashed black; border-top: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ row.outcomeUser }}</td>
                    <td style="vertical-align: top; border-right: 4px solid black; border-top: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ row.outcomeChange }}</td>
                    <td style="vertical-align: top; border-top: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ row.impact }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
            </div>
        <div class="pdf-page">
          <div class="con-header-7">
            <div
              class="header-7"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>ทฤษฎีการเปลี่ยนแปลง (ToC)</h3>
            </div>
            <div class="text-con text-box">
              <h3
                style="
                  margin: 0 1rem 2rem 2.5rem;
                  font-weight: normal;
                "
              >
                {{projectData.p3.toc}}
              </h3>
            </div>
          </div>

          <div class="con-header-8">
            <div
              class="header-8"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>แผนการดำเนินงานและกลุ่มเป้าหมาย</h3>
            </div>
            <div class="text-con text-box">
              <h3
                style="
                  margin: 2rem 1rem 0.5rem 1rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >&nbsp;&nbsp;&nbsp;
                <b>สถานที่จัดโครงการ</b> &nbsp;&nbsp;&nbsp; {{projectData.p4.detail_venue}}
              </h3>
              <h3
                style="
                  margin: 0 1rem 2rem 1.1rem;
                  font-size: 24px;
                  font-weight: bold;
                "
              >
                &nbsp;&nbsp;&nbsp;&nbsp;วันดำเนินโครงการ
              </h3>
              <div class="place-con">
                <div
                  class="place-list"
                  style="margin: 0 1rem 1rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3
                    style="
                      width: 500px;
                      margin-left: 10px;
                      font-weight: normal;
                      font-size: 20px;
                    "
                  >
                    วันเริ่มดำเนินการ : &nbsp;&nbsp;&nbsp; {{projectData.p4.startDate}}
                  </h3>
                  <h3 style="font-weight: normal; font-size: 20px">
                    วันที่สิ้นสุด : &nbsp;&nbsp;&nbsp; {{projectData.p4.endDate}}
                  </h3>
                </div>
                <div
                  class="place-list"
                  style="margin: 0 1rem 1rem 1rem; display: flex"
                >
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div v-if="projectData.p4 && projectData.p4.multipleSessions && projectData.p4.multipleSessions.length > 1">
                <div
                  v-for="(agency, index) in projectData.p4.multipleSessions"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 1rem 0;"
                >
                  <div
                    class="name-list"
                    style="margin: 0 1rem 0.5rem 1rem; display: flex"
                  >&nbsp;&nbsp;
                    <h3
                      style="
                        width: 500px;
                        margin-left: 40px;
                        font-weight: normal;
                        font-size: 20px;
                      "
                    >
                      - ครั้งที่ {{ index + 1 }} สถานที่ : {{ agency.location }}
                    </h3>
                    <h3 style="font-weight: normal; font-size: 20px">
                      วันที่ดำเนินการ : {{ agency.date }} 
                    </h3>
                  </div>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div
                v-else-if="projectData.p4 && projectData.p4.multipleSessions && projectData.p4.multipleSessions.length === 1 && projectData.p4.multipleSessions[0].location && projectData.p4.multipleSessions[0].date"
                class="name-list"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >&nbsp;&nbsp;
                <h3
                  style="
                    width: 500px;
                    margin-left: 40px;
                    font-weight: normal;
                    font-size: 20px;
                  "
                >
                  - ครั้งที่ 1 สถานที่ : {{ projectData.p4.multipleSessions[0].location }}
                </h3>
                <h3 style="font-weight: normal; font-size: 20px">
                  วันที่ดำเนินการ : {{ projectData.p4.multipleSessions[0].date }} 
                </h3>
              </div>

            
                </div>
              </div>
            </div>
          </div>
          </div>
        <div class="pdf-page">

          <div class="con-header-9">
            <div
              class="header-9"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>กลุ่มเป้าหมาย</h3>
            </div>
            <div class="text-con">
              <h3
                    style="
                      margin: 2rem 1rem 0.5rem 1rem;
                      font-weight: bold;
                    "
                  >
                    ประเภทของกลุ่มเป้าหมาย
                  </h3>
                <div>
                  <div
                    class="name-list text-box"
                    style="margin: 0 1rem 0.5rem 2rem; display: flex"
                  >
                    <h3 style="width: 300px">
                      ครู
                    </h3>
                    <h3 style="width: 400px">
                      จำนวน {{ projectData.p4.teacher_target.amount || '0' }} คน
                    </h3>
                    <h3 style="max-width: 34rem;">
                      ประเภทกลุ่มเป้าหมาย : {{ projectData.p4.teacher_target.detail || '-' }} 
                    </h3>
                  </div>
                </div>
                <div>
                  <div
                    class="name-list text-box"
                    style="margin: 0 1rem 0.5rem 2rem; display: flex"
                  >
                    <h3 style="width: 300px">
                      นักเรียน 
                    </h3>
                    <h3 style="width: 400px">
                      จำนวน {{ projectData.p4.student_target.amount || '0' }} คน
                    </h3>
                    <h3 style="max-width: 34rem;">
                      ประเภทกลุ่มเป้าหมาย : {{ projectData.p4.student_target.detail || '-' }}
                    </h3>
                  </div>
                </div>

              <h3
                class="text-box"
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >
                <b>พื้นที่ของกลุ่มเป้าหมาย :</b> &nbsp;&nbsp;&nbsp;{{projectData.p4.target_area}}
              </h3>
            </div>
          </div>

          <div class="con-header-10">
            <div
              class="header-10"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 5px 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3>การประเมินผลและการติดตามผล (ติดตามผลลัพธ์ของโครงการ)</h3>
            </div>
            <div class="text-con text-box" style="margin: 1rem 0 1rem 0">
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                แนวทางการประเมินผลโครงการหรือวิธีการวัด (Assessment)
              </h3>
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div
                v-if="Object.values(projectData.p5.assessmentMethods || {}).filter(type => type.checked).length > 1"
              >
                <div
                  v-for="(item, index) in Object.values(projectData.p5.assessmentMethods || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3
                    style="
                      margin: 1rem 1rem 0.5rem 2rem;
                      font-size: 24px;
                      font-weight: normal;
                    "
                  >
                    {{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                  v-for="(item, index) in Object.values(projectData.p5.assessmentMethods || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 2rem; display: flex;"
                >
                  <h3 style="width: 700px; font-size: 24px; font-weight: normal;">1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div>
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                แนวทางการติดตามผลโครงการ
              </h3>
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div
                v-if="Object.values(projectData.p5.followUpMethods || {}).filter(type => type.checked).length > 1"
              >
                <div
                  v-for="(item, index) in Object.values(projectData.p5.followUpMethods || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3
                    style="
                      margin: 1rem 1rem 2rem 2rem;
                      font-size: 24px;
                      font-weight: normal;
                    "
                  >
                    {{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                  v-for="(item, index) in Object.values(projectData.p5.followUpMethods || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 3rem; display: flex;"
                >
                  <h3 style="width: 700px; font-size: 24px; font-weight: normal;">1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div>
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                ประมาณการช่วงเวลาในการติดตามผล
              </h3>
              <div
                  class="place-list"
                  style="margin: 0 1rem 1rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;
                  <h3
                    style="
                      width: 500px;
                      margin-left: 10px;
                      font-weight: normal;
                      font-size: 20px;
                    "
                  >
                    ระยะเวลาเริ่มต้น : &nbsp;&nbsp;&nbsp; {{projectData.p5.followUpDuration.startDate}}
                  </h3>
                  <h3 style="font-weight: normal; font-size: 20px">
                    ระยะเวลาสิ้นสุด : &nbsp;&nbsp;&nbsp; {{projectData.p5.followUpDuration.endDate}}
                  </h3>
                </div>
                
            </div>
          </div>
    
          </div>

           <div class="pdf-page">
          <div class="con-header-11 text-box">
            <div
              class="header-11"
              style="
                background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 1rem;
                margin: 2rem 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3 style="">งบประมาณรายจ่าย</h3>
            </div>

            <div class="budget-con-1">

              <table
                style="
                  width: 95%;
                  border-collapse: collapse;
                  margin-left: 2rem;
                  margin-bottom: 2rem;
                  table-layout: fixed;
                  border:4px solid black;
                "
              >
                <thead style="text-align: center;">
                  <tr>
                    <th style="border: 1px solid black; padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">รายการ</th>
                    <th style="border: 1px solid black; padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">รายละเอียด</th>
                    <th style="border: 1px solid black; padding: 8px; border-bottom:4px solid black;">จำนวนเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in (projectData.p6 || [])" :key="item.id">
                    <td style="padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">
                      {{ item.label || 'ไม่มีชื่อรายการ' }}
                    </td>
                    <td style="padding: 8px; text-align: start; border-right:4px solid black; border-bottom:4px solid black;">
                      <div>{{ item.amount1.toLocaleString() || 0 }} {{ item.unit1 || '' }}
                    <template v-if="item.amount2 && item.unit2"> × {{ item.amount2.toLocaleString() || 0 }} {{ item.unit2 }} </template>
                    <template v-if="item.amount3 && item.unit3"> × {{ item.amount3.toLocaleString() || 0 }} {{ item.unit3 }} </template>
                    </div>
                    <div v-if="item.customText"><b>หมายเหตุ : {{ item.customText }}</b></div>
                    </td>
                    <td style="padding: 8px; text-align: end; border-bottom:4px solid black;">
                      {{ safeFormatNumber(item.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="total mx-3 mt-5">
                <h2 style="font-weight: bold; display: flex; align-items: center; justify-content: end;">
                  รวมจำนวนเงินทั้งสิ้น
                  <!-- {{ safeFormatNumber((projectData.p6 || []).reduce((sum, item) => sum + (item.total || 0), 0)) }} -->
                    {{ safeFormatNumber(totalBudget) }}
                  บาท
                </h2>
              </div>
            </div>
            </div>
            </div>
        <div class="pdf-page">

            <div class="con-header-12">
              <div
                class="header-12"
                style="
                  background: linear-gradient(to right, #0c1b5f, #4b7cc7);
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  padding: 1rem;
                  margin: 2rem 1rem 1rem 1rem;
                  color: #ffff;
                "
              >
                <h3 style="">สรุปรายละเอียดงบประมาณ</h3>
              </div>

              <div class="total-list-con">
                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 700px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">จำนวนกลุ่มเป้าหมาย</h3>
                  <h3 style="font-weight: normal; width: 500px;">{{ Number(projectData.p7?.targetGroupCount || 0).toLocaleString() }}</h3>
                  <h3 style="font-weight: normal; width: 4rem;">คน</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 700px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">ค่าใช้จ่ายต่อคน</h3>
                  <h3 style="font-weight: normal; width: 500px;">{{ Number(projectData.p7?.costPerPerson || 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) }}</h3>
                  <h3 style="font-weight: normal; width: 5rem;">บาท</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 700px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">รวมค่าใช้จ่ายทั้งหมด</h3>
                  <h3 style="font-weight: normal; width: 500px;">{{ projectData.p6 && projectData.p6.length ? safeFormatNumber(projectData.p6.reduce((sum, item) => sum + (item.total || 0), 0)) : '0.00' }}</h3>
                  <h3 style="font-weight: normal; width: 5rem;">บาท</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">
              </div>

              <div class="approved-con" style="font-size: 60px; text-align: center; color: red; margin: 10rem 0rem 0 0;">
                <div class="approved-list" v-if="approved == 8">
                  <p>อนุมัติ</p>
                </div>
                <div class="approved-list" v-if="approved == 9">
                  <p>อนุมัติเเบบมีเงื่อนไข</p>
                </div>
                <div class="approved-list" v-if="approved == 10">
                  <p>เห็นชอบในหลักการ Major Revision</p>
                </div>
                <div class="approved-list" v-if="approved == 11">
                  <p>เห็นชอบในหลักการ ให้ใช้งบประมาณจากแหล่งอื่น</p>
                </div>
                <div class="approved-list" v-if="approved == 12">
                  <p>เห็นชอบในหลักการ ให้ประชาสัมพันธ์</p>
                </div>
                <div class="approved-list" v-if="approved == 13">
                  <p>เห็นชอบในหลักการ ให้สำรวจกลุ่มเป้าหมาย</p>
                </div>
              </div>

            </div>
            <footer style="margin-top: 1rem"></footer>
            </div>
      </div>
    </div>

    <!-- ปุ่มสำหรับบันทึกเป็น PDF -->
    <button
      @click="downloadPdf"
      style="
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 999;
        padding: 2rem;
        font-size: 24px;
      "
    >
      ดาวน์โหลด PDF
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from "vue-router";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import axios from 'axios' // ✅ ถ้ายังไม่ import
const route = useRoute()

// ตัวแปร
const project_id = ref('')
const project_type = ref(0)
const projectData = ref(null)
const fiscalYear = ref(null);
const approved = ref(null);

const safeFormatNumber = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};
const totalBudget = computed(() => {
  if (!projectData.value?.p6 || !Array.isArray(projectData.value.p6)) return 0;
  return projectData.value.p6.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
});

const downloadPdf = async () => {
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const pages = document.querySelectorAll(".pdf-page")

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      willReadFrequently: true,
      logging: false,
    })

    const imgData = canvas.toDataURL("image/jpeg", 1.0)
    const imgProps = pdf.getImageProperties(imgData)

    const margin = 10
    const pdfWidth = pageWidth - margin * 2
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width
    const position = 10

    if (imgHeight < pageHeight - margin * 2) {
      pdf.addImage(imgData, "JPEG", margin, position, pdfWidth, imgHeight)
    } else {
      const totalPages = Math.ceil(imgHeight / (pageHeight - margin * 2))
      const imgHeightPx = canvas.height
      const pageHeightPx = ((pageHeight - margin * 2) * canvas.height) / imgHeight

      for (let j = 0; j < totalPages; j++) {
        const pageCanvas = document.createElement("canvas")
        pageCanvas.width = canvas.width
        pageCanvas.height = pageHeightPx

        const ctx = pageCanvas.getContext("2d")
        ctx.drawImage(
          canvas,
          0,
          j * pageHeightPx,
          canvas.width,
          pageHeightPx,
          0,
          0,
          canvas.width,
          pageHeightPx
        )

        const pageData = pageCanvas.toDataURL("image/jpeg", 1.0)
        pdf.addImage(pageData, "JPEG", margin, margin, pdfWidth, pageHeight - margin * 2)

        if (j < totalPages - 1 || i < pages.length - 1) {
          pdf.addPage()
        }
      }
    }

    if (i < pages.length - 1) {
      pdf.addPage()
    }
  }

  pdf.save("Teacher-Student-Form.pdf")
}

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/get/all/data", {
      project_id: project_id.value,
      project_type: project_type.value,
    })

    const raw = response.data.data[0]
    fiscalYear.value = raw.fiscal_year || null;
    approved.value = raw.project_status || null;

    // Parse the budget data properly
    let p6Data = [];
    try {
      const parsedP6 = JSON.parse(raw.project_data_p_6 || '[]');
      // Handle both old array format and new object format
      if (Array.isArray(parsedP6)) {
        p6Data = parsedP6;
      } else if (parsedP6 && parsedP6.budget_items) {
        p6Data = parsedP6.budget_items;
      }
    } catch (e) {
      console.error("Error parsing p6 data:", e);
      p6Data = [];
    }

    projectData.value = {
      p1: JSON.parse(raw.project_data_p_1 || '{}'),
      p2: JSON.parse(raw.project_data_p_2 || '{}'),
      p3: JSON.parse(raw.project_data_p_3 || '{}'),
      p4: JSON.parse(raw.project_data_p_4 || '{}'),
      p5: JSON.parse(raw.project_data_p_5 || '{}'),
      p6: p6Data, 
      p7: JSON.parse(raw.project_data_p_7 || '{}'),
    }
  } catch (err) {
    console.error("❌ error fetching editing data", err)
  }
}

//Table
const tableRows = computed(() => {
  const p3 = projectData.value?.p3
  if (!p3) return []

  const inputData = p3.inputs || []
  const outputData = p3.outputs || []
  const userData = p3.outcome_users || []
  const changeData = p3.outcome_changes || []

  const impactDataEconomy = p3.impact_economy || []
  const impactDataSocialty = p3.impact_socialty || []
  const impactDataEnvironment = p3.impact_environment || []

  // Helper normalize text เพื่อกรอง output ที่คล้าย static
  const staticOutputs = [
    "จำนวนผู้เข้าร่วมโครงการไม่น้อยกว่าร้อยละ 80",
    "ผู้เข้าร่วมโครงการมีความพึงพอใจในระดับค่าเฉลี่ยรวมไม่น้อยกว่า 4.50"
  ]
  const normalizeText = (text) =>
    text?.toLowerCase().replace(/\s+/g, " ").trim()

  const isStaticOutput = (text) => {
    const norm = normalizeText(text)
    return staticOutputs.some(so => norm.includes(normalizeText(so)))
  }

  // เตรียมคิวข้อมูล
  const inputQueue = [...inputData.map(i => i.input)]
  const rawOutputQueue = [...outputData.map(o => o.output)]
  const outputQueue = rawOutputQueue.filter(o => !isStaticOutput(o))
  const userQueue = [...userData.map(u => u.outcome_user)]
  const changeQueue = [...changeData.map(c => c.outcome_change)]

  // รวม impact ทุกประเภท พร้อมเพิ่มหัวข้อและเลขลำดับ
  let impactQueue = []

  impactDataEconomy.forEach(imp => {
    impactQueue.push(`${impactQueue.length + 1}. เศรษฐกิจ : ${imp.economy || '-'}`)
  })

  impactDataSocialty.forEach(imp => {
    impactQueue.push(`${impactQueue.length + 1}. สังคม : ${imp.socialty || '-'}`)
  })

  impactDataEnvironment.forEach(imp => {
    impactQueue.push(`${impactQueue.length + 1}. สิ่งแวดล้อม : ${imp.environment || '-'}`)
  })

  // เตรียม static rows พร้อมหมายเลขหัวข้อ 3.1 และ 3.2
  let staticUserIndex = 1
  let staticChangeIndex = 1

  // Clone user & change queues สำหรับ static rows เพื่อไม่ให้ตัดข้อมูลใน queue จริง
  const userClone = [...userQueue]
  const changeClone = [...changeQueue]

  const staticRows = [
    {
      input: "1.1 งบประมาณโครงการ",
      output: `2.1 ${staticOutputs[0]}`,
      outcomeUser: "3.1 User ผู้ใช้ประโยชน์จากผลผลิตของงานบริการวิชาการ งานบริการวิชาการที่เกิดผลลัพธ์ที่สำคัญต้องมีผู้ใช้ประโยชน์ (User) มีการยอมรับหรือการนำไปใช้ในหลายระดับ",
      outcomeChange: "3.2 Change การเปลี่ยนแปลงที่เกิดขึ้นพิจารณาการใช้ประโยชน์ผลผลิต (Output) แยกตามผู้ใช้ (User) แต่ละประเภท ซึ่งการเปลี่ยนแปลงอาจเกิดขึ้นต่างช่วงเวลากัน",
      impact: impactQueue.shift() || "-"
    },
    {
      input: "1.2 หัวหน้าคณะบริหารโครงการ",
      output: `2.2 ${staticOutputs[1]}`,
      outcomeUser: userClone.length ? `3.1.${staticUserIndex++} ${userClone.shift().trim()}` : "-",
      outcomeChange: changeClone.length ? `3.2.${staticChangeIndex++} ${changeClone.shift().trim()}` : "-",
      impact: impactQueue.shift() || "-"
    },
    {
      input: "1.3 ระยะเวลาดำเนินการ",
      output: outputQueue.length ? `2.3 ${outputQueue.shift().trim()}` : "-",
      outcomeUser: userClone.length ? `3.1.${staticUserIndex++} ${userClone.shift().trim()}` : "-",
      outcomeChange: changeClone.length ? `3.2.${staticChangeIndex++} ${changeClone.shift().trim()}` : "-",
      impact: impactQueue.shift() || "-"
    },
  ]

  // อัพเดต queue จริง หลัง clone
  userQueue.splice(0, userQueue.length, ...userClone)
  changeQueue.splice(0, changeQueue.length, ...changeClone)

  // หมายเลขเริ่มต้นสำหรับ dynamic rows
  let inputIndex = 4
  let outputIndex = 5
  let userMajor = 1
  let userMinor = staticUserIndex
  let changeMajor = 2
  let changeMinor = staticChangeIndex

  const dynamicRows = []

  while (
    inputQueue.length > 0 ||
    outputQueue.length > 0 ||
    userQueue.length > 0 ||
    changeQueue.length > 0 ||
    impactQueue.length > 0
  ) {
    const inputRaw = inputQueue.shift()
    const outputRaw = outputQueue.shift()
    const userRaw = userQueue.shift()
    const changeRaw = changeQueue.shift()

    const inputText = inputRaw?.trim() ? `1.${inputIndex++} ${inputRaw.trim()}` : "-"
    const outputText = outputRaw?.trim() ? `2.${outputIndex++} ${outputRaw.trim()}` : "-"
    const userText = userRaw?.trim() ? `3.${userMajor}.${userMinor++} ${userRaw.trim()}` : "-"
    const changeText = changeRaw?.trim() ? `3.${changeMajor}.${changeMinor++} ${changeRaw.trim()}` : "-"

    dynamicRows.push({
      input: inputText,
      output: outputText,
      outcomeUser: userText,
      outcomeChange: changeText,
      impact: impactQueue.shift() || "-"
    })
  }

  return [...staticRows, ...dynamicRows]
})







const totalExpense = computed(() => {
  const p6 = projectData.value?.p6;
  if (!p6) return 0;

  const sectionKeyMap = {
    compensation: 'selectedCompensations',
    foodAccommodation: 'selectedFoodAccommodation',
    otherExpenses: 'selectedOtherExpenses'
  };

  return Object.entries(sectionKeyMap).reduce((total, [section, listKey]) => {
    const sectionData = p6[section];
    if (sectionData?.checked) {
      const items = sectionData[listKey] || [];
      return total + items.reduce((sum, item) => sum + item.unit1 * item.unit2 * item.unit3, 0);
    }
    return total;
  }, 0);
});

const getObjectiveText = (id) => {
  switch (id) {
    case 'improveTeaching':
      return 'เพื่อพัฒนาครูชนบทให้มีความรู้ความสามารถในการสอน';
    case 'improveQuality':
      return 'เพื่อพัฒนาคุณภาพการศึกษาระดับโรงเรียนในรูปแบบต่างๆ';
    case 'localStudent':
      return 'เพื่อนักเรียนที่อยู่ในท้องถิ่นชนบท';
    case 'promoteVolunteer':
      return 'เพื่อดำเนินการส่งเสริมกิจกรรมสาธารณะ';
    case 'nonPolitics':
      return 'ไม่ดำเนินการเกี่ยวข้องกับการเมือง';
    default:
      return id;
  }
};

const hideReason = (id) => {
  return id === 'promoteVolunteer' || id === 'nonPolitics';
};

const getSubjectName = (key) => {
  switch (key) {
    case 'science':
      return 'วิชาวิทยาศาสตร์';
    case 'math':
      return 'วิชาคณิตศาสตร์';
    case 'thai':
      return 'วิชาภาษาไทย';
    case 'social_Sci':
      return 'วิชาสังคม';
    case 'health_edu':
      return 'วิชาสุขศึกษา พลศึกษา';
    case 'bacis_work':
      return 'วิชาการงานพื้นฐานอาชีพ';
    case 'language':
      return 'วิชาภาษาต่างประเทศ';
    default:
      return key;
  }
};



onMounted(async () => {
  project_id.value = route.query.project_id || ''
  project_type.value = Number(route.query.project_type || 0)

  await getDataWhenProjectID()
})
</script>

<style>
* {
   white-space: pre-line;
 }

.text-box {
  overflow-wrap: anywhere;
}

/* เพื่อให้แน่ใจว่ารูปไม่ถูกตัดตอนแปลงเป็น canvas */
#pdf-content {
  background: white;
  padding: 10px;
  overflow: visible;
  /* ลองตั้งค่าให้เป็น visible */
  display: block;
}

td {
  padding: 10px;
}

button:hover {
  background-color: red;
  color: white;
  transition: 1s;
}
</style>
