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
                src="../../assets/PDFPic/MFU.png"
                alt=""
                style="height: 13rem; margin-right: 10px"
              />
              <div class="text-header">
                <img
                  src="../../assets/PDFPic/cas.jpg"
                  alt=""
                  style="height: 4rem; border-radius: 100px"
                />
                <h3>แบบฟอร์มข้อเสนอโครงการบริการวิชาการ</h3>
                <p>หลักสูตรระยะสั้น (ประเภทเทียบเคียงหลักสูตรการศึกษา)</p>
                <p>ปีงบประมาณ พ.ศ.{{ fiscalYear || 'กรุณากดส่งโครงการเพื่อแสดงปีงบประมาณ' }}</p>
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
              <h3 style="">รายละเอียดโครงการ/คณะบริหารโครงการ</h3>
            </div>
            <div
              class="name-list text-box"
              style="margin: 2rem 1rem 0.5rem 1rem; display: flex"
            >
              <h3 style="width: 300px;">ชื่อโครงการ</h3>
              <h3>{{projectData.p1.project_name}}</h3>
            </div>
            <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
            <div v-if="projectData.p1.agency_group.length > 1"> 
              <div
                v-for="(agency, index) in projectData.p1.agency_group"
                :key="index"
                class="name-list text-box"
                style="margin: 0 1rem 1rem 1rem;"
              >
                <div style="display: flex;">
                  <h3 style="width: 300px;">ชื่อหัวหน้าหน่วยงาน {{ index + 1 }}</h3>
                  <h3>{{ agency.executive_board_leader_name }}</h3>
                </div>
                <div style="display: flex; margin-top: 1rem;">
                  <h3 style="width: 920px;">
                    หน่วยงานคณะบริหารโครงการ {{ index + 1 }} &nbsp;&nbsp;&nbsp;
                    {{ agency.executive_board }}
                  </h3>
                  <h3 style="font-weight: normal">
                    ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp;
                    {{ agency.percentage_of_participation }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- กรณีมีแค่ 1 หน่วยงาน -->
            <div v-else>
              <div class="name-list text-box" style="margin: 0 1rem 1rem 1rem;">
                <div style="display: flex;">
                  <h3 style="width: 300px;">ชื่อหัวหน้าหน่วยงาน</h3>
                  <h3>{{ projectData.p1.agency_group[0].executive_board_leader_name || '-'}}</h3>
                </div>
                <div style=" display: flex; margin-top: 1rem;">
                  <h3 style="width: 890px; margin-right: 2rem;">
                    หน่วยงานคณะบริหารโครงการ &nbsp;&nbsp;&nbsp;
                    {{ projectData.p1.agency_group[0].executive_board }}
                  </h3>
                  <h3 style="font-weight: normal">
                    ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp;
                    {{ projectData.p1.agency_group[0].percentage_of_participation }}
                  </h3>
                </div>
              </div>
            </div>
            <div
              class="name-list text-box"
              style="margin: 0 1rem 1rem 1rem; display: flex"
            >
              <h3 style="width: 890px; margin-right: 2rem">ชื่อหัวหน้าคณะบริหารโครงการ &nbsp;&nbsp;&nbsp; {{projectData.p1.project_manager_leader_lists[0].project_manager_leader || '-'}}</h3>
              <h3 style="font-weight: normal">
                    ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp;
                    {{projectData.p1.project_manager_leader_lists[0].percentage_of_participation || '-'}}
                  </h3>
            </div>
            <div
              class="name-list text-box"
              style="margin: 0 1rem 1rem 1rem; display: flex"
            >
              <h3 style="width: 700px">รายชื่อคณะบริหารโครงการ</h3>
            </div>

            <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
            <div v-if="projectData.p1.project_manager_team_lists.length > 1"> 
              <div
                v-for="(agency, index) in projectData.p1.project_manager_team_lists"
                :key="index"
                class="name-list text-box"
                style="margin: 0 1rem 1rem 1rem; display: flex; justify-content: space-between;"
              >
              <h3 style="width: 890px; margin-right: 2rem">&nbsp;&nbsp;{{ index + 1 }}. {{ agency.project_manager_team }}</h3>
              <h3>ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp; {{ agency.percentage_of_participation }}</h3>
              </div>
            </div>

            <!-- กรณีมีแค่ 1 หน่วยงาน -->
            <div v-else>
              <div
              class="name-list text-box"
              style="margin: 0 1rem 0.5rem 1rem; display: flex; justify-content: space-between;"
            >
              <h3 style="width: 890px; margin-right: 2rem">&nbsp;&nbsp;1. {{ projectData.p1.project_manager_team_lists[0].project_manager_team || '-'}}</h3>
              <h3>ร้อยละการมีส่วนร่วม &nbsp;&nbsp;&nbsp; {{ projectData.p1.project_manager_team_lists[0].percentage_of_participation || '-'}}</h3>
            </div>
            </div>
          </div>

          </div>
          <div class="pdf-page">
          <div class="con-header-3 text-box">
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
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                ประเด็นของการบริการวิชาการ (เลือกได้มากกว่า 2 ประเภท หากลักษณะโครงการเป็นแบบบูรณาการ)
              </h3>
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div
                v-if="Object.values(projectData.p2.academicServiceIssues || {}).filter(type => type.checked).length > 1"
              >
                <div
                  v-for="(item, index) in Object.values(projectData.p2.academicServiceIssues || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3 style="width: 700px">&nbsp;&nbsp;{{ index + 1 }}.&nbsp;&nbsp; {{ item.value }}</h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                  v-for="(item, index) in Object.values(projectData.p2.academicServiceIssues || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3 style="width: 700px">&nbsp;&nbsp;1.&nbsp;{{ item.value }}</h3>
                </div>
              </div>

              <!-- <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                ประเด็นของการให้บริการวิชาการ (เลือกได้มากกว่า 2 ประเภท
                หากลักษณะโครงการเป็นแบบบูรณาการ)
              </h3> -->
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <!-- <div
                v-if="Object.values(projectData.p2.academicServiceIssues).filter(type => type.checked).length > 1"
              >
                <div
                  v-for="(item, index) in Object.values(projectData.p2.academicServiceIssues).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3 style="width: 700px">{{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}</h3>
                </div>
              </div> -->

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <!-- <div v-else>
                <div
                  v-for="(item, index) in Object.values(projectData.p2.academicServiceIssues).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3 style="width: 700px">1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div> -->
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
              <div v-if="projectData.p2.sdgs.filter(item => item.is_check).length > 1">
                <div
                  v-for="(item, index) in projectData.p2.sdgs.filter(item => item.is_check)"
                  :key="item.id"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3>
                    &nbsp;&nbsp;{{ index + 1 }}.&nbsp;&nbsp;{{ item.topic }} : {{ item.value }}
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 รายการ -->
              <div v-else>
                <div
                  v-for="(item) in projectData.p2.sdgs.filter(item => item.is_check)"
                  :key="item.id"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3>
                    &nbsp;&nbsp;1.&nbsp;&nbsp;&nbsp;{{ item.topic }} : {{ item.value }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="pdf-page">
          <div class="con-header-3333333333333 text-box">
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
              <h3>รายละเอียดหลักสูตรระยะสั้น</h3>
            </div>
            <div class="text-con" style="margin: 1rem 0 1rem 0">
              <!-- ดึงข้อมูลมาแสดง -->
              <h3
                style="
                  margin: 2rem 1rem 1rem 1rem;
                  font-weight: bold;
                "
              >
                การเทียบเคียงหลักสูตรระยะสั้นกับหลักสูตรการศึกษา
              </h3>
            </div>
            
            <div class="table-con">
                <table
                style="
                  width: 97.2%;
                  table-layout: fixed;
                  margin: 0rem 10rem 0 1rem;
                "
              >
                <thead style="border: 4px solid black; text-align: center;">
                  <tr>
                    <th
                      
                      style="background-color: #d1e6ff; border-left: 4px solid black; border-top: 4px solid black; border-right: 4px solid black; padding: 14px;"
                    >
                      รายละเอียด
                    </th>
                    <th  style="background-color: #d1e6ff; border-top: 4px solid black; border-right: 4px solid black;">
                      หลักสูตรระยะสั้น
                    </th>
                    <th
                      
                      style="background-color: #d1e6ff; border-top: 4px solid black; border-right: 4px solid black;"
                    >
                      รายวิชาในหลักสูตรการศึกษา
                    </th>
                  </tr>
                </thead>
                <tbody style="border: 4px solid black;">
                  <tr>
                    <td style="font-weight: bold; border-right: 4px solid black; border-bottom: 4px solid black; padding: 10px;">1.ชื่อ</td>
                    <td style="font-weight: bold; border-right: 4px solid black; border-bottom: 4px solid black; padding: 10px; word-wrap: break-word; white-space: normal; max-width: 200px;">ชื่อหลักสูตรระยะสั้น : {{ projectData.p2.alignment_list[0].course_name.short_course }}</td>
                    <td style="padding: 0; border-bottom: 4px solid black;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="border-bottom: 4px solid black; padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;">ชื่อหลักสูตร : {{ projectData.p2.alignment_list[0].curriculum.name }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;">รายวิชา : {{ projectData.p2.alignment_list[0].curriculum.subject }}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; border-right: 4px solid black; border-bottom: 4px solid black; padding: 10px;">2.ผลลัพธ์การเรียนรู้</td>
                    <td style="font-weight: bold; border-right: 4px solid black; border-bottom: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ projectData.p2.alignment_list[0].learning_outcome[0] }}</td>
                    <td style="font-weight: bold; border-right: 4px solid black; border-bottom: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ projectData.p2.alignment_list[0].learning_outcome[1] }}</td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; border-right: 4px solid black; padding: 10px;">3.คำอธิบายรายวิชา</td>
                    <td style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ projectData.p2.alignment_list[0].subject_description[0] }}</td>
                    <td style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;">{{ projectData.p2.alignment_list[0].subject_description[1] }}</td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; border-right: 4px solid black; border-top: 4px solid black; padding: 10px;">4.จำนวนชั่วโมง</td>
                    <td style="white-space: normal; font-weight: bold; border-right: 4px solid black; border-top: 4px solid black;">ภาคทฤษฎี : {{ projectData.p2.alignment_list[0].hours.column1.theory || '0'}} ชั่วโมง <br> ภาคปฏิบัติ : {{ projectData.p2.alignment_list[0].hours.column1.practice || '0'}} ชั่วโมง</td>
                    <td style="white-space: normal; font-weight: bold; border-right: 4px solid black; border-top: 4px solid black;">ภาคทฤษฎี : {{ projectData.p2.alignment_list[0].hours.column2.theory || '0'}} ชั่วโมง <br> ภาคปฏิบัติ : {{ projectData.p2.alignment_list[0].hours.column2.practice || '0'}} ชั่วโมง</td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; border-right: 4px solid black; border-top: 4px solid black; padding: 10px;">5.จำนวนหน่วยกิต</td>
                    <td style="font-weight: bold; border-right: 4px solid black; border-top: 4px solid black;">{{ projectData.p2.alignment_list[0].credit[0]}}</td>
                    <td style="font-weight: bold; border-right: 4px solid black; border-top: 4px solid black;">{{ projectData.p2.alignment_list[0].credit[1]}}</td>
                  </tr>

                  <tr style="border-top: 4px solid black;">
                    <td style="font-weight: bold; border-right: 4px solid black;  padding: 10px;">6.การตัดสินผลการเรียน</td>
                    <td style="padding: 0; border-bottom: 4px solid black; border-right: 4px solid black;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px; font-weight: bold;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation.use_SU" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">ใช้สัญลักษณ์ S, U</td>
                        </tr>
                        <tr>
                          <td style="border-top: 4px solid black; padding: 10px; font-weight: bold;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation.use_ABC" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">ใช้สัญลักษณ์ A, B+, B</td>
                        </tr>
                        <tr>
                          <td v-if="projectData.p2.alignment_list[0].evaluation.use_other == true" style="border-top: 4px solid black; padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation.use_other" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">{{ projectData.p2.alignment_list[0].evaluation.other_text }}</td>
                          <td v-else style="border-top: 4px solid black; padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation.use_other" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">อื่น ๆ</td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding: 0;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px; font-weight: bold;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation_short.use_SU" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">ใช้สัญลักษณ์ S, U</td>
                        </tr>
                        <tr>
                          <td style="border-top: 4px solid black; padding: 10px; font-weight: bold;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation_short.use_ABC" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">ใช้สัญลักษณ์ A, B+, B</td>
                        </tr>
                        <tr>
                          <td v-if="projectData.p2.alignment_list[0].evaluation_short.use_other == true" style="border-top: 4px solid black; padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation_short.use_other" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">{{ projectData.p2.alignment_list[0].evaluation_short.other_text }}</td>
                          <td v-else style="border-top: 4px solid black; padding: 10px; font-weight: bold; word-wrap: break-word; white-space: normal; max-width: 200px;"><input type="checkbox" :checked="projectData.p2.alignment_list[0].evaluation_short.use_other" disabled style="
                            transform: scale(1.5);
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                          ">อื่น ๆ</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>

          </div>
          <div class="pdf-page">
          <div class="con-header-3333333333333 text-box">
            <div
              class="header-3"
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
              <h3>รายละเอียดผลลัพธ์การเรียนรู้ของหลักสูตรระยะสั้น ที่ผู้เข้าอบรมต้องทำได้</h3>
            </div>
            
            <div class="table-con">
                <table
                style="
                  text-align: center;
                  width: 97.2%;
                  table-layout: fixed;
                  margin: 0rem 10rem 0 1rem;
                "
              >
                <thead style="border: 4px solid black;">
                  <tr>
                    <th
                      rowspan="2"
                      style="background-color: #d1e6ff; border-left: 4px solid black; border-top: 4px solid black; border-right: 4px solid black; padding: 14px;"
                    >
                      ผลลัพธ์การเรียนรู้
                    </th>
                    <th  
                      colspan="3"
                      style="background-color: #d1e6ff; padding: 10px; border-top: 4px solid black; border-right: 4px solid black;">
                      รายละเอียดผลลัพธ์การเรียนรู้ของหลักสูตรระยะสั้น
                    </th>
                  </tr>
                  <tr>
                    <th
                      style="background-color: #d1e6ff; border-top: 4px solid black; border-right: 4px solid black; padding: 14px;"
                    >
                      ด้านความรู้<br>(Cognitive)
                    </th>
                    <th  
                      style="background-color: #d1e6ff; border-top: 4px solid black; border-right: 4px solid black;">
                      ด้านทักษะ<br>(Psychomotor)
                    </th>
                    <th  
                      style="background-color: #d1e6ff; border-top: 4px solid black; border-right: 4px solid black;">
                      ด้านเจตคติ<br>(Affective)
                    </th>
                  </tr>
                </thead>
                <tbody style="border: 4px solid black;">
                  <tr
                    v-for="(slo, index) in projectData.p2.sloList"
                    :key="index"
                  >
                    <td
                      style="font-weight: bold; border-right: 4px solid black; padding: 10px; "
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      SLO {{ index + 1 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px; text-align: start;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ slo.col1 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px; text-align: start;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ slo.col2 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px; text-align: start;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ slo.col3 }}
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>

          </div>
          <div class="pdf-page">
          <div class="con-header-3333333333333 text-box">
            <div
              class="header-3"
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
              <h3>แผนการจัดการเรียนรู้</h3>
            </div>
            
            <div class="table-con">
                <table
                style="
                  width: 97.2%;
                  table-layout: fixed;
                  margin: 0rem 10rem 0 1rem;
                "
              >
                <thead style="border: 4px solid black; text-align: center;">
                  <tr>
                    <th
                      style="background-color: #d1e6ff; border-left: 4px solid black; border-top: 4px solid black; border-right: 4px solid black; padding: 14px;"
                    >
                      หัวข้อการเรียนรู้
                    </th>
                    <th  
                      style="background-color: #d1e6ff; padding: 10px; border-top: 4px solid black; border-right: 4px solid black;">
                      วิธีการสอน/<br>กิจกรรมการเรียนรู้
                    </th>
                    <th  
                      style="background-color: #d1e6ff; padding: 10px; border-top: 4px solid black; border-right: 4px solid black;">
                      งาน
                    </th>
                    <th  
                      style="background-color: #d1e6ff; padding: 10px; border-top: 4px solid black; border-right: 4px solid black;">
                      วิธีการ/เครื่องมือ<br>วัดประเมิน
                    </th>
                  </tr>
                </thead>
                <tbody style="border: 4px solid black;">
                  <tr
                    v-for="(plan, index) in projectData.p2.planList"
                    :key="index"
                  >
                    <td
                      style="font-weight: bold; border-right: 4px solid black; padding: 10px; word-wrap: break-word; white-space: normal; max-width: 200px;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ index + 1 }}. {{ plan.col1 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ plan.col2 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ plan.col3 }}
                    </td>
                    <td
                      style="font-weight: bold; border-right: 4px solid black; word-wrap: break-word; white-space: normal; max-width: 200px;"
                      :style="{ borderTop: index !== 0 ? '4px solid black' : '' }"
                    >
                      {{ plan.col4 }}
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>
          </div>
          
          <div class="pdf-page">
          <div class="con-header-4 text-box">
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
              <h3>หลักการและเหตุผล</h3>
            </div>
            <div class="text-con">
              <h3
                style="
                  margin: 1rem 1rem 5rem 2rem;
                  font-weight: normal;
                "
              >
                {{projectData.p3.projectDetails}}
              </h3>
            </div>
          </div>
          
          <div class="con-header-5 text-box">
            <div
              class="header-5"
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
              <h3>วัตถุประสงค์</h3>
            </div>
            <div class="text-con">
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div v-if="projectData.p3.projectObjectives.length > 1"> 
                <div
                  v-for="(agency, index) in projectData.p3.projectObjectives"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 1rem 0;"
                >
                  <div
                class="name-list"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >
                <h3 style="width: 1260px">&nbsp;&nbsp;{{ index + 1 }}. {{ agency.value }}</h3>
              </div>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                class="name-list"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >
                <h3 style="width: 1260px">&nbsp;&nbsp;1. {{ projectData.p3.projectObjectives[0].value }}</h3>
              </div>
              </div>
            </div>
          </div>

          </div>

           <div class="pdf-page">

          <div class="con-header-6 text-box">
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
          <div class="con-header-7 text-box">
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
            <div class="text-con">
              <h3
                style="
                  margin: 0 1rem 2rem 2rem;
                  font-weight: normal;
                "
              >
                {{projectData.p3.toc}}
              </h3>
            </div>
          </div>
          <div class="con-header-8 text-box">
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
            <div class="text-con">
              <h3
                style="
                  margin: 2rem 1rem 0.5rem 1rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >
                &nbsp;&nbsp;<b>สถานที่จัดโครงการ</b> &nbsp;&nbsp;&nbsp; {{projectData.p4.location}}
              </h3>
              <h3
                style="
                  margin: 0 1rem 2rem 1rem;
                  font-size: 24px;
                  font-weight: bold;
                "
              >
                &nbsp;&nbsp;วันดำเนินโครงการ
              </h3>
              <div class="place-con">
                <div
                  class="place-list"
                  style="margin: 0 1rem 1rem 1rem; display: flex"
                >
                  <h3
                    style="
                      width: 500px;
                      margin-left: 10px;
                      font-weight: normal;
                      font-size: 20px;
                    "
                  >
                    &nbsp;วันเริ่มดำเนินการ : &nbsp;&nbsp;&nbsp; {{projectData.p4.startDate}}
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
              <div v-if="projectData.p4.multipleSessions.length > 1"> 
                <div
                  v-for="(agency, index) in projectData.p4.multipleSessions"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 1rem 0;"
                >
                  <div
                class="name-list"
                style="margin: 0 1rem 0.5rem 1rem; display: flex"
              >
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
                    &nbsp;วันที่ดำเนินการ : {{ agency.date }} 
                  </h3>
              </div>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-if="projectData.p4?.multipleSessions?.length == 1 && projectData.p4.multipleSessions[0].location && projectData.p4.multipleSessions[0].date" class="name-list" style="margin: 0 1rem 0.5rem 1rem; display: flex">
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

          <div class="con-header-9 text-box">
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
                    &nbsp;&nbsp;ประเภทของกลุ่มเป้าหมาย
                  </h3>
              <!-- กรณีมีมากกว่า 1 หน่วยงาน -->
              <div
                v-if="Object.values(projectData.p4.targetGroups || {}).filter(type => type.checked).length > 1"
              >
                <div
                  v-for="(item, index) in Object.values(projectData.p4.targetGroups || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3
                    style="
                      margin: 1rem 1rem 0rem 1rem;
                      font-size: 24px;
                      font-weight: normal;
                    "
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;{{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}
                  </h3>
                </div>
              </div>

              <!-- กรณีมีแค่ 1 หน่วยงาน -->
              <div v-else>
                <div
                  v-for="(item, index) in Object.values(projectData.p4.targetGroups || {}).filter(type => type.checked)"
                  :key="index"
                  class="name-list"
                  style="margin: 0 1rem 0.5rem 1rem; display: flex"
                >
                  <h3 style="width: 700px; font-size: 24px; font-weight: normal;">&nbsp;&nbsp;&nbsp;&nbsp;1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div>
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-size: 24px;
                  font-weight: normal;
                "
              >
                &nbsp;&nbsp;<b>พื้นที่ของกลุ่มเป้าหมาย :</b> &nbsp;&nbsp;&nbsp;{{projectData.p4.targetArea}}
              </h3>
              <!-- <h3
                style="
                  margin: 0 1rem 2rem 1rem;
                  font-size: 18px;
                  font-weight: normal;
                "
              >
                การสำรวจความต้องการของกลุ่มเป้าหมาย :
              </h3>
              <div class="checkbox-con">
                <p
                  style="
                    margin: 0 1rem 2rem 5rem;
                    display: flex;
                    align-items: end;
                  "
                >
                  <input
                    type="checkbox"
                    style="
                      transform: scale(1.5);
                      margin-right: 0.5rem;
                      margin-bottom: 0.5rem;
                    "
                  />ข้อมูลจากรายงานการสรุปผลความต้องการของศูนย์บริการวิชาการ
                </p>
              </div> -->
            </div>
          </div>

          <div class="con-header-10 text-box">
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
            <div class="text-con" style="margin: 1rem 0 1rem 0">
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                &nbsp;&nbsp;แนวทางการประเมินผลโครงการหรือวิธีการวัด (Assessment)
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
                    &nbsp;{{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}
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
                  <h3 style="width: 700px; font-size: 24px; font-weight: normal;">&nbsp;1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div>
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                &nbsp;&nbsp;แนวทางการติดตามผลโครงการ
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
                      margin: 1rem 1rem 0.5rem 2rem;
                      font-size: 24px;
                      font-weight: normal;
                    "
                  >
                    &nbsp;{{ index + 1 }}.&nbsp;&nbsp;&nbsp; {{ item.value }}
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
                  <h3 style="font-size: 24px; font-weight: normal;">&nbsp;1. &nbsp;&nbsp;&nbsp;{{ item.value }}</h3>
                </div>
              </div>
              <h3
                style="
                  margin: 2rem 1rem 2rem 1rem;
                  font-weight: bold;
                "
              >
                &nbsp;&nbsp;ประมาณการช่วงเวลาในการติดตามผล
              </h3>
              <div
                  class="place-list"
                  style="margin: 0 1rem 1rem 1rem; display: flex"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                margin: 5px 1rem 1rem 1rem;
                color: #ffff;
              "
            >
              <h3 style="">งบประมาณรายจ่าย</h3>
            </div>
            <div class="budget-con-1">
              <table
                v-if="combinedItems.length"
                style="
                  width: 95%;
                  border-collapse: collapse;
                  margin-left: 2rem;
                  margin-bottom: 2rem;
                  border:4px solid black;
                "
              >
              <colgroup>
                <col style="width: 20%;">
                <col style="width: 60%;">
                <col style="width: 20%;">
              </colgroup>
                <thead style="text-align: center;">
                  <tr>
                    <th style="padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">หมวด</th>
                    <th style="padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">รายละเอียด</th>
                    <th style="padding: 8px; border-bottom:4px solid black;">จำนวนเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in combinedItems" :key="index">
                    <td style="padding: 8px; border-right:4px solid black; border-bottom:4px solid black;">
                      {{ item.category }}
                    </td>
                    <td style="padding: 8px; text-align: start; border-right:4px solid black; border-bottom:4px solid black;">
                      <div>
                        {{ item.name }} {{ item.unit1.toLocaleString() }} บาท
                        <template v-if="item.unit2">
                          x {{ item.unit2.toLocaleString() }} {{ item.categories.unit2 }}
                        </template>
                        <template v-if="item.unit3">
                          x {{ item.unit3.toLocaleString() }} {{ item.categories.unit3 }}
                        </template>
                        <template v-if="item.unit4">
                          x {{ Number(item.unit4).toLocaleString() }} {{ item.categories.unit4 }}
                        </template>
                      </div>
                      <div v-if="item.note?.checked" style="margin-top: 4px; font-style: italic;">
                        <b>หมายเหตุ : {{ item.note.value }}</b>
                      </div>
                    </td>
                    <td style="padding: 8px; text-align: end; border-bottom:4px solid black;">
                      {{
                        (
                          item.unit1 *
                          (item.unit2 ?? 1) *
                          (item.unit3 ?? 1) *
                          (item.unit4 ?? 1)
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                class="total"
                style="
                  display: flex;
                  align-items: start;
                  justify-content: end;
                  margin: 0 1rem 0 0rem;
                "
              >
                <h2 style="font-weight: bold">
                  รวมจำนวนเงินทั้งสิ้น
                  {{ Number(projectData.p6?.total ?? 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) }}
                  บาท
                </h2>
              </div>
            </div>
            </div>
            </div>

            <div class="pdf-page">
            <div class="con-header-12 text-box">
              <div
                class="header-12"
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
                <h3 style="">สรุปรายละเอียดงบประมาณ</h3>
              </div>

              <div class="registration-fee-con text-box">
                <div
                  class="registration-fee-head"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 1rem;
                  "
                >
                  <h3 style="font-weight: bold;">&nbsp;ค่าลงทะเบียน</h3>
                </div>
                
                <!-- กรณีมีข้อมูลและมีมากกว่า 1 หน่วยงาน -->
                <div v-if="projectData.p7 && projectData.p7.rows && Array.isArray(projectData.p7.rows) && projectData.p7.rows.length > 1"> 
                  <div v-for="(agency, index) in projectData.p7.rows" :key="index" class="name-list" style="margin: 0 1rem 1rem 0;">
                    <div
                      class="registration-fee-list"
                      style="display: flex; align-items: start; justify-content: space-between; margin: 0 1rem 0 2rem;"
                    >
                      <h4 style="font-weight: normal; font-size: 27px;">
                        &nbsp;{{ index + 1 }}. ประเภทอัตรา
                        รายละเอียดคำนวณ <b>{{ (agency.rate != null && agency.people != null) ? (agency.rate * agency.people).toLocaleString() : '-' }}</b>
                        คือประเภท <b>{{ agency.type || '-' }}</b>  อัตรา <b>{{ agency.rate ? agency.rate.toLocaleString() : '-' }}</b> (บาท) 
                        จำนวน <b>{{ agency.people ? agency.people.toLocaleString() : '-' }}</b> (คน)
                      </h4>
                    </div>
                  </div>
                </div>

                <!-- กรณีมีข้อมูลและมีแค่ 1 หน่วยงาน -->
                <div v-else-if="projectData.p7 && projectData.p7.rows && Array.isArray(projectData.p7.rows) && projectData.p7.rows.length === 1">
                  <div
                    class="registration-fee-list"
                    style="
                      display: flex;
                      align-items: start;
                      justify-content: space-between;
                      margin: 0 1rem 0 2rem;
                    "
                  >
                    <h4 style="font-weight: normal; font-size: 27px;">
                      &nbsp;1. ประเภทอัตรา
                      รายละเอียดคำนวณ
                      <b>{{ 
                        (projectData.p7.rows[0].rate != null && projectData.p7.rows[0].people != null)
                          ? (projectData.p7.rows[0].rate * projectData.p7.rows[0].people).toLocaleString()
                          : '-' 
                      }}</b>
                      คือประเภท <b>{{ projectData.p7.rows[0].type || '-' }}</b>  
                      อัตรา <b>{{ projectData.p7.rows[0].rate ? projectData.p7.rows[0].rate.toLocaleString() : '-' }}</b> (บาท) 
                      จำนวน <b>{{ projectData.p7.rows[0].people ? projectData.p7.rows[0].people.toLocaleString() : '-' }}</b> (คน)
                    </h4>
                  </div>
                </div>

                <!-- กรณีไม่มีข้อมูล -->
                <div v-else>
                  <div
                    class="registration-fee-list"
                    style="
                      display: flex;
                      align-items: start;
                      justify-content: space-between;
                      margin: 0 1rem 0 2rem;
                    "
                  >
                    <h4 style="font-weight: normal; font-size: 27px;">
                      1. ประเภทอัตรา
                      รายละเอียดคำนวณ <b>-</b>
                      คือประเภท <b>-</b>  
                      อัตรา <b>-</b> (บาท) 
                      จำนวน <b>-</b> (คน)
                    </h4>
                  </div>
                </div>
                  
                <div class="registration-fee-list"
                  style="display: flex; align-items: start; justify-content: end; margin: 0 1rem 0 0rem;">
                  <h2 style="font-weight: bold;">
                    รวมประมาณการรายรับ
                    {{
                      (projectData.p7 && projectData.p7.rows && Array.isArray(projectData.p7.rows))
                        ? projectData.p7.rows.reduce((total, row) => {
                            const rate = Number(row?.rate) || 0;
                            const people = Number(row?.people) || 0;
                            return total + rate * people;
                          }, 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                        : '-'
                    }} บาท
                    รวมจำนวนกลุ่มเป้าหมาย
                    {{
                      (projectData.p7 && projectData.p7.rows && Array.isArray(projectData.p7.rows))
                        ? projectData.p7.rows.reduce((total, row) => total + (Number(row?.people) || 0), 0).toLocaleString()
                        : '-'
                    }} คน
                  </h2>
                </div>
              </div>

              <div class="support-fee-con text-box">
                <div
                  class="support-fee-head"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 1rem;
                    width: 1000px;
                  "
                >
                  <h3 style="font-weight: bold;">&nbsp;ค่าสนับสนุนอื่น ๆ (ค่าบูธ/หน่วยงานภายนอก)</h3>
                </div>
                
                <!-- กรณีมีข้อมูลและมีมากกว่า 1 หน่วยงาน -->
                <div v-if="projectData.p7 && projectData.p7.conditions && Array.isArray(projectData.p7.conditions) && projectData.p7.conditions.length > 1"> 
                  <div v-for="(agency, index) in projectData.p7.conditions" :key="index" class="name-list" style="margin: 0 1rem 1rem 0;">
                    <div
                      class="support-fee-list"
                      style="
                        margin: 2rem 1rem 0 2rem;
                      "
                    >
                      <h3 style="font-weight: normal; margin-bottom: 1rem;">
                        &nbsp;{{ index + 1 }}. อัตรา {{ agency.amount ? agency.amount.toLocaleString() : '-' }} (บาท) 
                        จำนวน {{ agency.units ? agency.units.toLocaleString() : '-' }} (หน่วยงาน) 
                        รวมจำนวนเงิน {{ (agency.amount != null && agency.units != null) ? (agency.amount * agency.units).toLocaleString() : '-' }} (บาท)
                      </h3>
                      <h3 style="font-weight: bold; margin-left: 2rem;">เกณฑ์ข้อกำหนด/เงื่อนไข</h3>
                      <h3 style="font-weight: normal; margin:0 0 1rem 3rem;">{{ agency.condition || '-' }}</h3>
                    </div>
                  </div>
                </div>

                <!-- กรณีมีข้อมูลและมีแค่ 1 หน่วยงาน -->
                <div v-else-if="projectData.p7 && projectData.p7.conditions && Array.isArray(projectData.p7.conditions) && projectData.p7.conditions.length === 1">
                  <div class="support-fee-list" style="margin: 0 1rem 0 2rem;">
                    <h3 style="font-weight: normal; margin-bottom: 1rem;">
                      &nbsp;1. อัตรา {{ projectData.p7.conditions[0].amount ? projectData.p7.conditions[0].amount.toLocaleString() : '-' }} (บาท)
                      จำนวน {{ projectData.p7.conditions[0].units ? projectData.p7.conditions[0].units.toLocaleString() : '-' }} (หน่วยงาน)
                      รวมจำนวนเงิน {{
                        (projectData.p7.conditions[0].amount != null && projectData.p7.conditions[0].units != null) 
                          ? (projectData.p7.conditions[0].amount * projectData.p7.conditions[0].units).toLocaleString() 
                          : '-'
                      }} (บาท)
                    </h3>
                    <h3 style="font-weight: bold; margin-left: 2rem;">เกณฑ์ข้อกำหนด/เงื่อนไข</h3>
                    <h3 style="font-weight: normal; margin:0 0 1rem 3rem;">{{ projectData.p7.conditions[0].condition || '-' }}</h3>
                  </div>
                </div>

                <!-- กรณีไม่มีข้อมูล -->
                <div v-else>
                  <div class="support-fee-list" style="margin: 0 1rem 0 2rem;">
                    <h3 style="font-weight: normal; margin-bottom: 1rem;">
                      1. อัตรา - (บาท)
                      จำนวน - (หน่วยงาน)
                      รวมจำนวนเงิน - (บาท)
                    </h3>
                    <h3 style="font-weight: bold; margin-left: 2rem;">เกณฑ์ข้อกำหนด / เงื่อนไข</h3>
                    <h3 style="font-weight: normal; margin:0 0 1rem 3rem;">-</h3>
                  </div>
                </div>
                  
                <div
                  class="support-fee-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: end;
                    margin: 0 1rem 0 0rem;
                  "
                >
                  <h2 style="font-weight: bold;">
                    รวมประมาณการรายรับ {{
                      (projectData.p7 && projectData.p7.conditions && Array.isArray(projectData.p7.conditions))
                        ? projectData.p7.conditions.reduce((total, c) => {
                            const amount = Number(c?.amount) || 0;
                            const units = Number(c?.units) || 0;
                            return total + amount * units;
                          }, 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                        : '-'
                    }} บาท (ค่าสนับสนุนอื่น ๆ)
                  </h2>
                </div>
              </div>

              <div class="total-list-con text-box">
                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 1100px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">ประมาณการรายรับ</h3>
                  <h3 style="font-weight: normal; width: 400px;">{{ projectData.p7?.totalIncome ? Number(projectData.p7.totalIncome).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                  <h3 style="font-weight: normal; width: 200px;">บาท</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 1100px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">ค่าใช้จ่าย</h3>
                  <h3 style="font-weight: normal; width: 400px;">{{ projectData.p6?.total ? Number(projectData.p6.total).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                  <h3 style="font-weight: normal; width: 200px;">บาท</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 2rem 1rem 0 2rem;
                    width: 1100px;
                  "
                >
                  <h3 style="font-weight: normal; width: 500px;">ค่าดำเนินการส่วนกลาง</h3>
                  <h3 style="font-weight: normal; width: 400px;">{{ projectData.p7?.CommonFee ? Number(projectData.p7.CommonFee).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                  <h3 style="font-weight: normal; width: 200px;">บาท</h3>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    margin: 2rem 1rem 0 2rem;
                  "
                >
                  <div class="d-flex">
                    <h3 style="font-weight: normal; width: 500px;">รวมค่าใช้จ่ายทั้งหมด</h3>
                    <h3 style="font-weight: normal; width: 400px;">{{
                      (projectData.p6?.total && projectData.p7?.CommonFee) 
                        ? ((Number(projectData.p6.total) || 0) + (Number(projectData.p7.CommonFee) || 0)).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                        : '-'
                    }}</h3>
                    <h3 style="font-weight: normal; width: 110px">บาท</h3>
                  </div>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">
                <div
                  class="total-list"
                  style="
                    margin: 2rem 1rem 0 2rem;
                  "
                >
                  <div class="d-flex">
                  <h3 style="font-weight: normal; width: 500px;">รวมรายได้หลังหักค่าใช้จ่าย</h3>
                  <h3 style="font-weight: normal; width: 400px;">{{ projectData.p7?.netIncomeAfterCost ? Number(projectData.p7.netIncomeAfterCost).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                  <h3 style="font-weight: normal">บาท</h3>
                  </div>
                </div>
                <hr style="height: 6px; width: 79rem; background-color: black; border: none; margin-left: 1rem;">

                <div
                  class="total-list"
                  style="
                    margin: 2rem 1rem 0 2rem;
                  "
                >
                  <div style="display: flex;">
                    <h3 style="font-weight: bold; width: 500px;">จุดคุ้มทุน</h3>
                    <h3 style="font-weight: bold; width: 400px;">{{ projectData.p7?.breakEvenPoint ? Number(projectData.p7.breakEvenPoint).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                    <h3 style="font-weight: bold; ">คน</h3>
                  </div>
                  <h3 style="font-weight: bold;">ร้อยละของกำไรสุทธิ (Net Profit Margin) {{ projectData.p7?.netProfitPercent ? Number(projectData.p7.netProfitPercent).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }}</h3>
                </div>
              </div>

              <div class="compensation-con text-box">
                <div
                  class="compensation-head"
                  style="
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                    margin: 4rem 1rem 0 1rem;
                    width: 1000px;
                  "
                >
                  <h3 style="font-weight: bold;">การจัดสรรค่าตอบแทนในกรณีที่ปรากฏมีรายได้เหนือค่าใช้จ่าย</h3>
                </div>

                <table
                  style="
                    width: 97.5%;
                    text-align: center;
                    table-layout: fixed;
                    margin-left: 1rem;
                  "
                >
                  <thead style="border-top:4px solid #6f78a1; border-bottom:4px solid #6f78a1;">
                    <tr>
                      <th style="background-color: #d1e6ff; padding: 14px;">
                        มหาวิทยาลัย<br>(ร้อยละ 50)
                      </th>
                      <th style="background-color: #d1e6ff">
                        หน่วยงานคณะบริหารโครงการ<br>(ร้อยละ 25)
                      </th>
                      <th style="background-color: #d1e6ff;">
                        คณะบริหารโครงการ<br>(ร้อยละ 25)
                      </th>
                    </tr>
                  </thead>
                  <tbody style="background-color: #e3e3e3;">
                    <tr>
                      <td style="font-weight: bold;">
                        {{ projectData.p7?.universityIncome ? Number(projectData.p7.universityIncome).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }} บาท
                      </td>
                      <td style="font-weight: bold;">
                        {{ projectData.p7?.facultyManageShare ? Number(projectData.p7.facultyManageShare).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }} บาท
                      </td>
                      <td style="font-weight: bold;">
                        {{ projectData.p7?.facultyManageShare ? Number(projectData.p7.facultyManageShare).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : '-' }} บาท
                      </td>
                    </tr>
                  </tbody>
                </table>
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

  pdf.save("Short-Term-Form.pdf")
}

const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/get/all/data", {
      project_id: project_id.value,
      project_type: project_type.value,
    })

    const raw = response.data.data[0]
    console.log(raw)
    fiscalYear.value = raw.fiscal_year || null;
    approved.value = raw.project_status || null;

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


// Table
const tableRows = computed(() => { 
  const p3 = projectData.value?.p3
  if (!p3) return []

  const inputData = p3.input || []
  const outputData = p3.outputs || []
  const userData = p3.outcome_user || []
  const changeData = p3.outcome_change || []

  const checkedImpacts = (p3.impacts || []).filter(imp => imp.isCheck)
  const impactTexts = checkedImpacts.map(
    (imp, index) => `${index + 1}. ${imp.title} : ${imp.value}`
  )

  const inputQueue = [...inputData.map(i => i.value)]
  const outputQueue = [...outputData.map(i => i.value)]
  const userQueue = [...userData.map(i => i.value)]
  const changeQueue = [...changeData.map(i => i.value)]
  const impactQueue = [...impactTexts]

  // เตรียม output สำหรับ static row ล่วงหน้า
  const output1 = outputData?.[0]?.value?.trim() ? `2.3 ${outputData[0].value.trim()}` : "-"
  const output2 = outputData?.[1]?.value?.trim() ? `2.4 ${outputData[1].value.trim()}` : "-"

  let staticOutcomeUserMinor = 1;
let staticOutcomeChangeMinor = 1;

const staticRows = [
  {
    input: "1.1 งบประมาณโครงการ",
    output: "2.1 จำนวนผู้เข้าร่วมโครงการไม่น้อยกว่าร้อยละ 80",
    outcomeUser: "3.1 User ผู้ใช้ประโยชน์จากผลผลิตของงานบริการวิชาการ งานบริการวิชาการที่เกิดผลลัพธ์ที่สำคัญต้องมีผู้ใช้ประโยชน์ (User) มีการยอมรับหรือการนำไปใช้ในหลายระดับ",
    outcomeChange: "3.2 Change การเปลี่ยนแปลงที่เกิดขึ้นพิจารณาการใช้ประโยชน์ผลผลิต (Output) แยกตามผู้ใช้ (User) แต่ละประเภท ซึ่งการเปลี่ยนแปลงอาจเกิดขึ้นต่างช่วงเวลากัน",
    impact: impactQueue.shift() || "-"
  },
  {
    input: "1.2 หัวหน้าคณะบริหารโครงการ",
    output: "2.2 ผู้เข้าร่วมโครงการมีความพึงพอใจในระดับค่าเฉลี่ยรวมไม่น้อยกว่า 4.50",
    // ไล่เลข 3.1.1, 3.2.1 สำหรับบรรทัดนี้
    outcomeUser: userQueue.length > 0 ? `3.1.${staticOutcomeUserMinor++} ${userQueue.shift().trim()}` : "-",
    outcomeChange: changeQueue.length > 0 ? `3.2.${staticOutcomeChangeMinor++} ${changeQueue.shift().trim()}` : "-",
    impact: impactQueue.shift() || "-"
  },
  {
    input: "1.3 ระยะเวลาดำเนินการ",
    output: output1,
    outcomeUser: userQueue.length > 0 ? `3.1.${staticOutcomeUserMinor++} ${userQueue.shift().trim()}` : "-",
    outcomeChange: changeQueue.length > 0 ? `3.2.${staticOutcomeChangeMinor++} ${changeQueue.shift().trim()}` : "-",
    impact: impactQueue.shift() || "-"
  },
]

  // ลบ output 2 ตัวแรกออกจาก queue เพราะใช้ใน staticRows แล้ว
  outputQueue.shift()
  outputQueue.shift()

  let inputCounter = 4;
let outputCounter = 5;

let outcomeUserMajor = 1;    // 3.1.x
let outcomeUserMinor = 1;

let outcomeChangeMajor = 2;  // 3.2.x
let outcomeChangeMinor = 1;

const dynamicRows = [];

while (
  inputQueue.length > 0 ||
  outputQueue.length > 0 ||
  userQueue.length > 0 ||
  changeQueue.length > 0 ||
  impactQueue.length > 0
) {
  const rawInput = inputQueue.shift();
  const rawOutput = outputQueue.shift();
  const rawUser = userQueue.shift();
  const rawChange = changeQueue.shift();

  const inputText = rawInput?.trim() ? `1.${inputCounter++} ${rawInput.trim()}` : "-";
  const outputText = rawOutput?.trim() ? `2.${outputCounter++} ${rawOutput.trim()}` : "-";

  const outcomeUserText = rawUser?.trim()
    ? `3.${outcomeUserMajor}.${outcomeUserMinor++} ${rawUser.trim()}`
    : "-";

  const outcomeChangeText = rawChange?.trim()
    ? `3.${outcomeChangeMajor}.${outcomeChangeMinor++} ${rawChange.trim()}`
    : "-";

  dynamicRows.push({
    input: inputText,
    output: outputText,
    outcomeUser: outcomeUserText,
    outcomeChange: outcomeChangeText,
    impact: impactQueue.shift() || "-"
  });
}

  return [...staticRows, ...dynamicRows]
})

const combinedItems = computed(() => {
  const items = [];
  const p6 = projectData.value?.p6;

  if (p6?.compensation?.checked) {
    p6.compensation.selectedCompensations.forEach((item) => {
      items.push({ ...item, category: "ค่าตอบแทน" });
    });
  }

  if (p6?.foodAccommodation?.checked) {
    p6.foodAccommodation.selectedFoodAccommodation.forEach((item) => {
      items.push({ ...item, category: "ค่าอาหารและที่พัก" });
    });
  }

  if (p6?.otherExpenses?.checked) {
    p6.otherExpenses.selectedOtherExpenses.forEach((item) => {
      items.push({ ...item, category: "ค่าใช้จ่ายอื่น ๆ" });
    });
  }

  return items;
});

onMounted(async () => {
  project_id.value = route.query.project_id || ''
  project_type.value = Number(route.query.project_type || 0)

  await getDataWhenProjectID()
})
</script>

<style>
*{
  white-space: pre-line;
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

.text-box {
  overflow-wrap: anywhere;
}
</style>
