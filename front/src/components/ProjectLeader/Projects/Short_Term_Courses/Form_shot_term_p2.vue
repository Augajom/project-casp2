<template>
  <div>
      <NavbarProject class="fixed-top" propText="โครงการหลักสูตรระยะสั้น (ประเภทเทียบเคียงหลักสูตรการศึกษา)" />
      <ProgressBar class="fixed-top border" :step="currentStep" @update:step="currentStep" />
      <Loader v-if="loading"/>
      <div style="margin-top: 220px">
        <div class="container d-flex justify-content-center" style="max-width: 1300px; margin-top: 100px">
          <div class="d-flex flex-column border p-3 px-5 shadow p-3 mb-5" style="
              max-width: 1200px;
              min-width: 1200px;
              background-color: #374375;
              border-radius: 12px;
              height: auto;
            ">
            <div class="row text-white fs-3 mt-3">
              <p>ส่วนที่ 2 ลักษณะของโครงการเเละประเด็นด้าน SDGs</p>
            </div>
            <div></div>
             <div class="mb-2">
              <!--ส่วนที่2-->
              <p class="text-white fs-5">
                ประเด็นของการบริการวิชาการ
                <span class="text-white-50 fs-6"
                  >(เลือกได้มากกว่า 2 ประเภท หากลักษณะโครงการเป็นแบบบูรณาการ)</span
                >
              </p>
              <!-- <p class="text-white">ประเด็นของการบริการวิชาการ: {{ Project_Data_P2.academicServiceIssues }}</p> -->
              <div class="container">
                <div class="row row-cols-2 g-0 gy-3 justify-content-between">
                  <div class="col d-flex align-items-center">
                    <input
                      class="form-check-input me-2 circle-input"
                      v-model="Project_Data_ST_P2.academicServiceIssues.social_education.checked"
                      type="checkbox"
                      id="Social"
                      value="ด้านสังคม/การศึกษา"
                    />
                    <label class="form-check-label text-white mx-2" for="Social/Education"
                      >ด้านสังคม/การศึกษา</label
                    >
                  </div>
                  <div class="col d-flex align-items-center">
                    <input
                      class="form-check-input me-2 circle-input"
                      v-model="Project_Data_ST_P2.academicServiceIssues.medical_health.checked"
                      type="checkbox"
                      id="Medical"
                      value="ด้านการเเพทย์/ด้านสาธารณสุข"
                    />
                    <label class="form-check-label text-white mx-2" for="Medical"
                      >ด้านการเเพทย์/ด้านสาธารณสุข</label
                    >
                  </div>
                  <div class="col d-flex align-items-center">
                    <input
                      class="form-check-input me-2 circle-input"
                      v-model="Project_Data_ST_P2.academicServiceIssues.economy_career.checked"
                      type="checkbox"
                      id="Economic"
                      value="ด้านเศรษฐกิจ/อาชีพ"
                    />
                    <label class="form-check-label text-white mx-2" for="Economic"
                      >ด้านเศรษฐกิจ/อาชีพ</label
                    >
                  </div>
                  <div class="col d-flex align-items-center">
                    <input
                      class="form-check-input me-2 circle-input"
                      v-model="Project_Data_ST_P2.academicServiceIssues.environment.checked"
                      type="checkbox"
                      id="Environment"
                      value="ด้านสิ่งเเวดล้อม"
                    />
                    <label class="form-check-label text-white mx-2" for="Environment"
                      >ด้านสิ่งเเวดล้อม</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <!--ส่วนที่2-->
              <p class="text-white fs-5">รายละเอียดหลักสูตรระยะสั้น</p>
              <div class="container">
                <p class="text-white fs-5">
                  1. ผลลัพธ์การเรียนรู้ที่คาดหวัง (Short course learning outcome)
                </p>
                <input type="text" class="form-control mt-0 custom-input" placeholder="อธิบายผลลัพธ์การเรียนรู้ที่คาดหวัง"
                  v-model="Project_Data_ST_P2.learning_outcome" />
                <p class="text-white fs-5 mt-2">2. จำนวนชั่วโมงในการอบรม (ทฤษฎี/ปฏิบัติ)</p>
                <div class="container">
                  <div class="container mt-2">
                    <div style="display: flex; align-items: center">
                      <span class="text-white fs-5">ภาคทฤษฎี</span>
                      <input type="number" class="form-control custom-input2"
                        style="width: auto; margin-left: 8px; margin-right: 8px" placeholder="โปรดกรอกข้อมูล"
                        v-model="Project_Data_ST_P2.course_hours.theory" />
                      <span class="text-white fs-5">ชั่วโมง</span>
                    </div>
                  </div>

                  <div class="container mt-2">
                    <div style="display: flex; align-items: center">
                      <span class="text-white fs-5">ภาคปฏิบัติ</span>
                      <input type="number" class="form-control custom-input2"
                        style="width: auto; margin-left: 8px; margin-right: 8px" placeholder="โปรดกรอกข้อมูล"
                        v-model="Project_Data_ST_P2.course_hours.practice" />
                      <span class="text-white fs-5">ชั่วโมง</span>
                    </div>
                  </div>
                </div>

                <p class="text-white fs-5 mt-2">
                  3. การเทียบเคียงหลักสูตรระยะสั้นกับหลักสูตรการศึกษา
                </p>
                <div v-for="(item, index) in Project_Data_ST_P2.alignment_list" :key="index">
                  <div class="container">
                    <div class="row">
                      <div class="container">
                        <div class="row mt-3 align-items-start">
                          <!-- คอลัมน์ "รายละเอียด / 3.1 ชื่อหลักสูตร" -->
                          <div class="col">
                            <p class="text-white fs-5 mb-1">รายละเอียด</p>
                            <p class="text-white fs-5 mb-0">3.1 ชื่อหลักสูตร</p>
                          </div>

                          <!-- คอลัมน์ "หลักสูตรระยะสั้น" -->
                          <div class="col-md-4">
                            <p class="text-white fs-5 mb-1">หลักสูตรระยะสั้น</p>
                            <input type="text" class="form-control custom-input2" placeholder="โปรดกรอกข้อมูล"
                              style="width: 308px" v-model="item.course_name.short_course" />
                          </div>

                          <!-- คอลัมน์ "รายวิชาในหลักสูตรการศึกษา" -->
                          <div class="col">
                            <p class="text-white fs-5 mb-1">รายวิชาในหลักสูตรการศึกษา</p>

                            <div class="mb-2 d-flex align-items-center">
                              <label class="text-white fs-6 mb-0" style="width: 80px">หลักสูตร :</label>
                              <input type="text" class="form-control custom-input2" placeholder="โปรดกรอกข้อมูล"
                                style="width: 200px; margin-left: 8px" v-model="item.curriculum.name" />
                            </div>

                            <div class="d-flex align-items-center">
                              <label class="text-white fs-6 mb-0" style="width: 80px">รายวิชา :</label>
                              <input type="text" class="form-control custom-input2" placeholder="โปรดกรอกข้อมูล"
                                style="width: 200px; margin-left: 8px" v-model="item.curriculum.subject" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- ผลลัพธ์การเรียนรู้ -->
                      <div class="row mt-3 mb-2" v-if="item.learning_outcome && item.learning_outcome.length >= 2">
                        <div class="col">
                          <p class="text-white fs-5">3.2 ผลลัพธ์การเรียนรู้</p>
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.learning_outcome[0]" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.learning_outcome[1]" />
                        </div>
                      </div>

                      <!-- คำอธิบายรายวิชา -->
                      <div class="row mt-3 mb-2">
                        <div class="col">
                          <p class="text-white fs-5">3.3 คำอธิบายรายวิชา</p>
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.subject_description[0]" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.subject_description[1]" />
                        </div>
                      </div>

                      <!-- จำนวนชั่วโมง -->
                      <div class="row mt-3 mb-2">
                        <div class="col">
                          <p class="text-white fs-5">3.4 จำนวนชั่วโมง</p>
                        </div>
                        <div class="col">
                          <div style="display: flex; align-items: center">
                            <span class="text-white fs-5" style="width: 100px">ภาคทฤษฎี :</span>
                            <input type="number" class="form-control custom-input2" style="width: 150px; margin: 0 8px"
                              placeholder="โปรดกรอกข้อมูล" v-model="item.hours.column1.theory" />
                            <span class="text-white fs-5">ชั่วโมง</span>
                          </div>
                          <div class="mt-2" style="display: flex; align-items: center">
                            <span class="text-white fs-5" style="width: 100px">ภาคปฏิบัติ :</span>
                            <input type="number" class="form-control custom-input2" style="width: 150px; margin: 0 8px"
                              placeholder="โปรดกรอกข้อมูล" v-model="item.hours.column1.practice" />
                            <span class="text-white fs-5">ชั่วโมง</span>
                          </div>
                        </div>
                        <div class="col">
                          <div style="display: flex; align-items: center">
                            <span class="text-white fs-5" style="width: 100px">ภาคทฤษฎี :</span>
                            <input type="number" class="form-control custom-input2" style="width: 150px; margin: 0 8px"
                              placeholder="โปรดกรอกข้อมูล" v-model="item.hours.column2.theory" />
                            <span class="text-white fs-5">ชั่วโมง</span>
                          </div>
                          <div class="mt-2" style="display: flex; align-items: center">
                            <span class="text-white fs-5" style="width: 100px">ภาคปฏิบัติ :</span>
                            <input type="number" class="form-control custom-input2" style="width: 150px; margin: 0 8px"
                              placeholder="โปรดกรอกข้อมูล" v-model="item.hours.column2.practice" />
                            <span class="text-white fs-5">ชั่วโมง</span>
                          </div>
                        </div>
                      </div>

                      <!-- จำนวนหน่วยกิต -->
                      <div class="row mt-3 mb-2">
                        <div class="col">
                          <p class="text-white fs-5">3.5 จำนวนหน่วยกิต</p>
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.credit[0]" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control custom-input2" style="width: 308px"
                            placeholder="โปรดกรอกข้อมูล" v-model="item.credit[1]" />
                        </div>
                      </div>

                      <!-- การตัดสินผลการเรียน -->
                      <div class="row mt-3 mb-4">
                        <div class="col">
                          <p class="text-white fs-5">3.6 การตัดสินผลการเรียน</p>
                        </div>
                        <div class="col">
                          <div class="form-check mb-2">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolS-' + index"
                              v-model="item.evaluation.use_SU" />
                            <label class="form-check-label text-white mx-2" :for="'symbolS-' + index">
                              ใช้สัญลักษณ์ S, U
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolA-' + index"
                              v-model="item.evaluation.use_ABC" />
                            <label class="form-check-label text-white mx-2" :for="'symbolA-' + index">
                              ใช้สัญลักษณ์ A, B+, B
                            </label>
                          </div>
                          <div class="more-con d-flex align-items-center mb-2 mt-2">
                          <div class="form-check" style="width: 4rem;">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolOther-' + index"
                              v-model="item.evaluation.use_other" />
                            <label class="form-check-label text-white mx-2" :for="'symbolOther-' + index">
                             อื่น ๆ
                            </label>
                          </div>
                          <div class="input">
                            <input type="text" class="form-control form-control-sm ms-2"
                              v-model="item.evaluation.other_text" :disabled="!item.evaluation.use_other" placeholder="ระบุ"
                              style="max-width: 200px;" />
                          </div>
                          </div>
                        </div>
                        <div class="col">
                          <!-- ใช้สัญลักษณ์ S, U -->
                          <div class="form-check mb-2">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolS-' + index"
                              v-model="item.evaluation_short.use_SU" />
                            <label class="form-check-label text-white mx-2" :for="'symbolS-' + index">
                              ใช้สัญลักษณ์ S, U
                            </label>
                          </div>

                          <!-- ใช้สัญลักษณ์ A, B+, B -->
                          <div class="form-check mb-2">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolA-' + index"
                              v-model="item.evaluation_short.use_ABC" />
                            <label class="form-check-label text-white mx-2" :for="'symbolA-' + index">
                              ใช้สัญลักษณ์ A, B+, B
                            </label>
                          </div>

                          <!-- อื่น ๆ พร้อมช่องกรอกข้อความ -->
                          <div class="more-con d-flex align-items-center mb-2 mt-2">
                          <div class="form-check" style="width: 4rem;">
                            <input class="form-check-input circle-input" type="checkbox" :id="'symbolOther-' + index"
                              v-model="item.evaluation_short.use_other" />
                            <label class="form-check-label text-white mx-2" :for="'symbolOther-' + index">
                              อื่น ๆ
                            </label>
                            
                          </div>
                          <div class="input">
                            <input type="text" class="form-control form-control-sm ms-2"
                              v-model="item.evaluation_short.other_text" :disabled="!item.evaluation_short.use_other" placeholder="ระบุ"
                              style="max-width: 200px;" />
                          </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!-- Section 4: รายละเอียดผลลัพธ์การเรียนรู้ -->
              <p class="text-white fs-5">
                4.รายละเอียดผลลัพธ์การเรียนรู้ของหลักสูตรระยะสั้น ที่ผู้อบรมต้องทำได้
              </p>

              <div class="container">
                <!-- หัวข้อ -->
                <div class="row mt-3 mb-2">
                  <div class="col-2">
                    <p class="text-white fs-5">ผลลัพธ์การเรียนรู้</p>
                  </div>
                  <div class="col">
                    <p class="text-white fs-5 text-center">
                      รายละเอียดผลลัพธ์การเรียนรู้ของหลักสูตรระยะสั้น
                    </p>
                    <div class="row">
                      <div class="col d-flex justify-content-center align-items-center">
                        <p class="text-white fs-5">ด้านความรู้<br />(Cognitive)</p>
                      </div>
                      <div class="col d-flex justify-content-center align-items-center">
                        <p class="text-white fs-5">ด้านทักษะ<br />(Psychomotor)</p>
                      </div>
                      <div class="col d-flex justify-content-center align-items-center">
                        <p class="text-white fs-5">ด้านเจตคติ<br />(Affective)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- SLO Rows -->
                <div id="slo-container">
                  <div class="row mb-2 align-items-center" v-for="(slo, index) in Project_Data_ST_P2.sloList" :key="index">
                    <div class="col d-flex justify-content-center align-items-center">
                      <!-- SLO label, dynamically displaying the SLO index -->
                      <p class="text-white fs-5 mb-0">SLO {{ index + 1 }}</p>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="slo.col1" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                    <div class="col">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="slo.col2" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                    <div class="col">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="slo.col3" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                  </div>
                </div>

                <!-- Remove SLO Button (only when there are more than 3 SLOs) -->
                <div class="d-flex justify-content-center mb-2" v-if="Project_Data_ST_P2.sloList.length > 3">
                  <button class="btn btn-danger beautiful-box" style="width: 200px" @click="removeSLO">
                    <i class="fa fa-minus mx-1" aria-hidden="true"></i> ลบ SLO
                  </button>
                </div>

                <!-- Add SLO Button (only when there are fewer than 6 SLOs) -->
                <div class="d-flex justify-content-center mb-3" v-if="Project_Data_ST_P2.sloList.length < 6">
                  <button class="btn beautiful-box" style="width: 200px; background-color: #0d6efd; color: white;" @click="addSLO">
                    <i class="fa fa-plus mx-1" aria-hidden="true"></i> เพิ่ม SLO
                  </button>
                </div>
              </div>

              <!-- Section 5: แผนการจัดการเรียนรู้ -->
              <div class="container">
                <!-- หัวข้อหลัก -->
                <p class="text-white fs-5">5.แผนการจัดการเรียนรู้</p>

                <!-- Table headers -->
                <div class="row mt-1 mb-2">
                  <div class="col d-flex justify-content-center">
                    <p class="text-white fs-5">หัวข้อการเรียนรู้</p>
                  </div>
                  <div class="col d-flex justify-content-center">
                    <p class="text-white fs-5 text-center">
                      วิธีการสอบ<br />/กิจกรรมการเรียนรู้
                    </p>
                  </div>
                  <div class="col d-flex justify-content-center">
                    <p class="text-white fs-5">งาน</p>
                  </div>
                  <div class="col d-flex justify-content-center">
                    <p class="text-white fs-5 text-center">
                      วิธีการ<br />/เครื่องมือวัดประเมิน
                    </p>
                  </div>
                </div>

                <!-- Plan Rows -->
                <div id="plan-container">
                  <div class="row mb-2 align-items-center" v-for="(plan, index) in Project_Data_ST_P2.planList"
                    :key="index">
                    <div class="col d-flex justify-content-center">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="plan.col1" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                    <div class="col d-flex justify-content-center">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="plan.col2" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                    <div class="col d-flex justify-content-center">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="plan.col3" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                    <div class="col d-flex justify-content-center">
                      <input type="text" class="form-control custom-input2" style="width: 250px; height: 50px"
                        v-model="plan.col4" placeholder="โปรดกรอกข้อมูล" />
                    </div>
                  </div>
                </div>

                <!-- Remove Plan Button (only when there are more than 3 Plans) -->
                <div class="d-flex justify-content-center mb-2" v-if="Project_Data_ST_P2.planList.length > 1">
                  <button class="btn btn-danger beautiful-box" style="width: 200px" @click="removePlan">
                    <i class="fa fa-minus mx-1" aria-hidden="true"></i> ลบ Plan
                  </button>
                </div>

                <!-- Add Plan Button (only when there are fewer than 6 Plans) -->
                <div class="d-flex justify-content-center mb-3" v-if="Project_Data_ST_P2.planList.length < 6">
                  <button class="btn beautiful-box" style="width: 200px; background-color: #0d6efd; color: white;" @click="addPlan">
                    <i class="fa fa-plus mx-1" aria-hidden="true"></i> เพิ่ม Plan
                  </button>
                </div>
              </div>
            </div>

            <!-- <p>Selected SDGs: {{ Project_Data_P2.sdgs }}</p> -->
            <div class="mb-2 mt-3">
              <!--ส่วนที่ 3-->
              <p class="text-white fs-5">
                ความสอดคล้องกับเป้าหมายการพัฒนาที่ยั่งยืน<span class="text-white-50 fs-6">
                  (Sustainable Development Goals: SDGs)</span>
                <span class="text-white-50 fs-6 block" style="display: block">(สามารถเลือกได้มากกว่า 1 ข้อ)</span>
              </p>
              <div class="container">
                <div class="row d-flex flex-column">
                  <div v-for="(sdg, index) in sdgs" :key="sdg.id" class="col-12 d-flex flex-wrap align-items-center mb-3">
                    <div class="d-flex align-items-center mx-3">
                      <input class="form-check-input circle-input" type="checkbox" :id="sdg.id" v-model="sdg.isCheck"
                        @change="updateSelectedSDGs(sdg)" />
                    </div>

                    <label class="d-flex align-items-center flex-grow-1" :for="sdg.id">
                      <img :src="sdg.img_order_path" class="sdg-img me-2 rounded" alt="SDGs" @mouseover="showPopup = index" @mousemove="handleMouseMove($event, index)"
                        @mouseleave="showPopup = null" />

                      <div class="flex-grow-1">
                        <span class="text-white"> {{ index + 1 + ". " + sdg.topic }} </span>
                        <!-- <input type="text" class="form-control mt-2 custom-input" v-model="sdg.value"  @input="updateSDGValue(sdg)"  :disabled="!sdg.isCheck"
                              placeholder="อธิบายความสอดคล้องของโครงการกับเป้าหมายการพัฒนาที่ยั่งยืนข้อนี้" :class="{ 'is-invalid': sdg.isCheck && sdg.required && !sdg.value }" >
                              <div v-if="sdg.isCheck && sdg.required && !sdg.value" class="invalid-feedback">
                                กรุณากรอกข้อมูล
                              </div> -->
                        <textarea class="form-control mt-2 custom-input"
                          v-model="sdg.value"
                          @input="updateSDGValue(sdg)"
                          :disabled="!sdg.isCheck"
                          placeholder="อธิบายความสอดคล้องของโครงการกับเป้าหมายการพัฒนาที่ยั่งยืนข้อนี้"
                          :class="{ 'is-invalid': sdg.isCheck && sdg.required && !sdg.value }"
                          rows="1"></textarea>
                        <div v-show="sdg.isCheck && sdg.required && !sdg.value" class="invalid-feedback">
                          กรุณากรอกข้อมูล
                        </div>
                      </div>
                    </label>

                    <div v-if="showPopup === index" class="popup" :style="popupStyle">
                    {{ sdg.pop_info }}
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6 d-flex justify-content-end">
                  <button class="btn btn-secondary" style="width: 140px" :disabled="currentStep === 1">
                    <router-link class="text-white text-decoration-none" @click="nextStep" :to="{
                      path: '/pl/st/p_1',
                      query: { project_id: project_id || '', project_type: 3 },
                    }">ย้อนกลับ</router-link>
                  </button>
              </div>
              <div class="col-6">
                <button class="btn btn-success" style="width: 140px" @click="submitForm" :disabled="!isCanGo">
                  <!-- <router-link class="text-white text-decoration-none"  @click="nextStep" :to="{path:'/pl/no_income/p_2',query:{project_id: project_id || '',project_type:1}}"> -->
                  <span>บันทึก</span>
                  <!-- </router-link> -->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script setup>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import { ref, reactive, watch, onMounted, watchEffect, onUnmounted } from "vue";
import parseJwt from "../../../../../utils/DecodeToken";
import ProgressBar from "@/components/ProgressBar.vue";
import NavbarProject from "@/components/NavbarProject.vue";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const router = useRouter();
const loading = ref(false)
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  //   iconColor: 'black',
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
const currentStep = ref(2);
const showPopup = ref(false);

const mousePosition = ref({ x: 0, y: 0 });
const popupStyle = ref({});

let project_id = ref(null);
let project_type = ref(null);
let user_id = ref(null);
let affiliation_id = ref(null);

let isInitialized = false;
let canEdit = false;
const isCanGo = ref(false);

const sdgs = reactive([
  {
    id: 'SDG1',
    topic: 'No Poverty',
    pop_info: `เป้าหมายที่ 1: ยุติความยากจนทุกรูปแบบในทุกที่ (End poverty in all its forms everywhere)`,
    img_order_path: '/img/SDGs/SDG-Goal-01.png',
    // selected: true,
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG2',
    topic: 'Zero Hunger',
    pop_info: `เป้าหมายที่ 2: ยุติความหิวโหย บรรลุความมั่นคงทางอาหาร และโภชนาการที่ดี (End hunger, achieve food security and improved nutrition, and promote sustainable agriculture)`,
    img_order_path: '/img/SDGs/SDG-Goal-02.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG3',
    topic: 'Good Health and Well-Being',
    pop_info: `เป้าหมายที่ 3: สร้างหลักประกันให้มีสุขภาพที่ดีและความเป็นอยู่ที่ดีของทุกคนในทุกช่วงวัย (Ensure healthy lives and promote well-being for all at all ages)`,
    img_order_path: '/img/SDGs/SDG-Goal-03.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG4',
    topic: 'Quality Education',
    pop_info: `เป้าหมายที่ 4: สร้างหลักประกันว่าทุกคนได้รับการศึกษาที่มีคุณภาพอย่างครอบคลุมและเสมอภาค (Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-04.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG5',
    topic: 'Gender Equality',
    pop_info: `เป้าหมายที่ 5: บรรลุความเสมอภาคระหว่างเพศ และเพิ่มพลังอำนาจให้แก่ผู้หญิงและเด็กหญิงทุกคน (Achieve gender equality and empower all women and girls)`,
    img_order_path: '/img/SDGs/SDG-Goal-05.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG6',
    topic: 'Clean Water and Sanitation',
    pop_info: `เป้าหมายที่ 6: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงน้ำและสุขาภิบาลที่ถูกสุขลักษณะ (Ensure availability and sustainable management of water and sanitation for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-06.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG7',
    topic: 'Affordable and Clean Energy',
    pop_info: `เป้าหมายที่ 7: สร้างหลักประกันว่าทุกคนสามารถเข้าถึงพลังงานสมัยใหม่ที่มั่นคงและยั่งยืน (Ensure access to affordable, reliable, sustainable and modern energy for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-07.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG8',
    topic: 'Decent Work and Economic Growth',
    pop_info: `เป้าหมายที่ 8: ส่งเสริมการเติบโตทางเศรษฐกิจที่ยั่งยืน และการมีงานที่เหมาะสมสำหรับทุกคน (Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all)`,
    img_order_path: '/img/SDGs/SDG-Goal-08.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG9',
    topic: 'Industry, Innovation, and Infrastructure',
    pop_info: `เป้าหมายที่ 9: พัฒนาโครงสร้างพื้นฐาน ส่งเสริมนวัตกรรม และเพิ่มขีดความสามารถด้านอุตสาหกรรม (Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation)`,
    img_order_path: '/img/SDGs/SDG-Goal-09.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG10',
    topic: 'Reduced Inequality',
    pop_info: `เป้าหมายที่ 10: ลดความเหลื่อมล้ำภายในและระหว่างประเทศ (Reduce inequality within and among countries)`,
    img_order_path: '/img/SDGs/SDG-Goal-10.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG11',
    topic: 'Sustainable Cities and Communities',
    pop_info: `เป้าหมายที่ 11: ทำให้เมืองและที่อยู่อาศัยมีความยั่งยืน (Make cities and human settlements inclusive, safe, resilient, and sustainable)`,
    img_order_path: '/img/SDGs/SDG-Goal-11.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG12',
    topic: 'Responsible Consumption and Production',
    pop_info: `เป้าหมายที่ 12: สร้างหลักประกันให้มีรูปแบบการผลิตและการบริโภคที่ยั่งยืน (Ensure sustainable consumption and production patterns)`,
    img_order_path: '/img/SDGs/SDG-Goal-12.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG13',
    topic: 'Climate Action',
    pop_info: `เป้าหมายที่ 13: ดำเนินมาตรการอย่างเร่งด่วนเพื่อลดผลกระทบจากการเปลี่ยนแปลงสภาพภูมิอากาศ (Take urgent action to combat climate change and its impacts)`,
    img_order_path: '/img/SDGs/SDG-Goal-13.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG14',
    topic: 'Life Below Water',
    pop_info: `เป้าหมายที่ 14: อนุรักษ์และใช้ประโยชน์จากทรัพยากรทางทะเลอย่างยั่งยืน (Conserve and sustainably use the oceans, seas, and marine resources)`,
    img_order_path: '/img/SDGs/SDG-Goal-14.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG15',
    topic: 'Life on Land',
    pop_info: `เป้าหมายที่ 15: ปกป้องและฟื้นฟูระบบนิเวศบนบก และหยุดยั้งการสูญเสียความหลากหลายทางชีวภาพ (Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss)`,
    img_order_path: '/img/SDGs/SDG-Goal-15.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG16',
    topic: 'Peace, Justice, and Strong Institutions',
    pop_info: `เป้าหมายที่ 16: ส่งเสริมสังคมที่สงบสุข ยุติธรรม และมีประสิทธิภาพ (Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels)`,
    img_order_path: '/img/SDGs/SDG-Goal-16.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  },
  {
    id: 'SDG17',
    topic: 'Partnerships for the Goals',
    pop_info: `เป้าหมายที่ 17: เสริมสร้างวิธีการดำเนินงานและฟื้นฟูความเป็นหุ้นส่วนเพื่อการพัฒนาที่ยั่งยืน (Strengthen the means of implementation and revitalize the global partnership for sustainable development)`,
    img_order_path: '/img/SDGs/SDG-Goal-17.png',
    checked: false,
    description: '',
    required: false,
    value: ''
  }
])

var Project_Data_ST_P2 = reactive({
  academicServiceIssues: {
    social_education: { checked: false, value: "ด้านสังคม/การศึกษา" },
    medical_health: { checked: false, value: "ด้านการแพทย์/ด้านสาธารณสุข" },
    economy_career: { checked: false, value: "ด้านเศรษฐกิจ/อาชีพ" },
    environment: { checked: false, value: "ด้านสิ่งแวดล้อม" },
  },
  learning_outcome: "",
  course_hours: {
    theory: "",
    practice: "",
  },
  alignment_list: [
    {
      course_name: { short_course: "" },
      curriculum: { name: "", subject: "" },
      learning_outcome: ["", ""],
      subject_description: ["", ""],
      hours: {
        column1: { theory: "", practice: "" },
        column2: { theory: "", practice: "" },
      },
      credit: ["", ""],
      evaluation: { use_SU: false, use_ABC: false, use_other: false,
        other_text: '' },
      evaluation_short: { use_SU: false, use_ABC: false, use_other: false,
          other_text: '' }
    },
  ],
  sloList: [
    { col1: "", col2: "", col3: "" },
    { col1: "", col2: "", col3: "" },
    { col1: "", col2: "", col3: "" },
  ],
  planList: [
    { col1: "", col2: "", col3: "", col4: "" },
  ],
  sdgs: [],
});

const handleMouseMove = (event, index) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  };
  popupStyle.value = {
    left: `${mousePosition.value.x + 15}px`,
    top: `${mousePosition.value.y + 15}px`,
    position: "fixed",
  };
  showPopup.value = index;
};

const addSLO = () => {
  Project_Data_ST_P2.sloList.push({ col1: "", col2: "", col3: "" });
};

const removeSLO = () => {
  if (Project_Data_ST_P2.sloList.length > 3) {
    Project_Data_ST_P2.sloList.pop();
  }
};

const addPlan = () => {
  Project_Data_ST_P2.planList.push({ col1: "", col2: "", col3: "", col4: "" });
};

const removePlan = () => {
  if (Project_Data_ST_P2.planList.length > 1) {
    Project_Data_ST_P2.planList.pop();
  }
};

watchEffect(() => {
  sdgs.forEach((sdg) => {
    const matched = Project_Data_ST_P2.sdgs.find((selected) => selected.id === sdg.id);
    sdg.isCheck = !!matched;
    sdg.value = matched ? matched.value : "";
  });
});
const updateSelectedSDGs = (sdg) => {
  if (sdg.isCheck) {
    if (!Project_Data_ST_P2.sdgs.some((item) => item.id === sdg.id)) {
      Project_Data_ST_P2.sdgs.push({
        id: sdg.id,
        topic: sdg.topic,
        is_check: true,
        value: sdg.value,
      });
    }
  } else {
    Project_Data_ST_P2.sdgs = Project_Data_ST_P2.sdgs.filter(
      (item) => item.id !== sdg.id
    );
  }
};
const updateSDGValue = (sdg) => {
  if (sdg.isCheck) {
    const existingSDG = Project_Data_ST_P2.sdgs.find((item) => item.id === sdg.id);
    if (existingSDG) {
      existingSDG.value = sdg.value;
    } else {
      Project_Data_ST_P2.sdgs.push({
        id: sdg.id,
        topic: sdg.topic,
        is_check: true,
        value: sdg.value,
      });
    }
  }
};

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}



const getDataWhenProjectID = async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/ST/get/p_2", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
    });

    const project_data = JSON.parse(response.data.data[0].project_data_p_2);
    //console.log("data", project_data);
    if (project_data != null) {
        Object.assign(Project_Data_ST_P2.academicServiceIssues, project_data.academicServiceIssues || {});
        Project_Data_ST_P2.sdgs = project_data.sdgs || [];
        Object.assign(Project_Data_ST_P2.course_hours, project_data.course_hours || {});
        Project_Data_ST_P2.learning_outcome = project_data.learning_outcome || "";
        Project_Data_ST_P2.alignment_list = project_data.alignment_list || [];
        Project_Data_ST_P2.sloList = project_data.sloList || [];
        Project_Data_ST_P2.planList = project_data.planList || [];

        isCanGo.value = true;
    } else {
      isCanGo.value = false;
    }
    // //console.log('sending a request to fetch editing data project id = ',project_id)
  } catch (err) {
    //console.log(err);
    //console.log("error fetching editing data = ", project_id.value);
  }
};

const autoSave = debounce(async () => {
  try {
    const response = await axios.post("http://localhost:5000/pl/p_2/shot_term/save", {
      project_id: project_id.value,
      project_type: project_type.value,
      project_user: user_id.value,
      project_data: Project_Data_ST_P2,
      project_affiliation: affiliation_id.value,
    });

    //console.log("response", response.data);

    if (response.data.success) {
      project_id.value = response.data.insert_id;
      //console.log("project_id", project_id.value);
      router.replace({
        path: "/pl/st/p_3",
        query: { project_id: project_id.value || "", project_type: 3 },
      });
      await setTimeout(() => {
                loading.value = false
              }, 500)
      await Toast.fire({
        icon: "success",
        iconColor: "green",
        title: `บันทึกอัตโนมัติสำเร็จ`,
      });
    } else {
      throw new Error("Save failed");
    }
  } catch (error) {
    console.error(error);
    await Toast.fire({
      icon: "error",
      iconColor: "red",
      title: `บันทึกล้มเหลว, กรุณาลองใหม่`,
    });
  }
}, 3000);

function isProject_Data_ST_P2_Valid(oldVal, newVal) {
  const hasProjectType = Object.values(newVal.academicServiceIssues).some((item) => item.checked);

  // ตรวจว่าอย่างน้อย 1 sdg ถูกเลือก
  const hasSelectedSdg = Array.isArray(newVal.sdgs) && newVal.sdgs.some(sdg => sdg.is_check);

  const hasEmptyCheckedSdg =
    Array.isArray(newVal.sdgs) &&
    newVal.sdgs.some((sdg) => sdg.is_check && (!sdg.value || sdg.value.trim() === ""));

  // ตรวจ sloList ว่าทุก col ไม่ว่าง
  const isSloListValid = Array.isArray(newVal.sloList) && newVal.sloList.every(
    item => item.col1.trim() !== "" && item.col2.trim() !== "" && item.col3.trim() !== ""
  );

  // ตรวจ planList ว่าทุก col ไม่ว่าง
  const isPlanListValid = Array.isArray(newVal.planList) && newVal.planList.every(
    item => item.col1.trim() !== "" && item.col2.trim() !== "" && item.col3.trim() !== "" && item.col4.trim() !== ""
  );

  const hasLearningOutcome = typeof newVal.learning_outcome === "string" && newVal.learning_outcome.trim() !== "";

  const hasValidCourseHours =
  newVal.course_hours &&
  String(newVal.course_hours.theory).trim() !== "" &&
  String(newVal.course_hours.practice).trim() !== "" &&
  !isNaN(Number(newVal.course_hours.theory)) &&
  !isNaN(Number(newVal.course_hours.practice)) &&
  Number(newVal.course_hours.theory) >= 0 &&
  Number(newVal.course_hours.practice) >= 0;

  // ✅ ตรวจให้ทุกรายการใน alignment_list มีการกรอกข้อมูลที่จำเป็น
  const everyAlignmentHasData =
  Array.isArray(newVal.alignment_list) &&
  newVal.alignment_list.length > 0 &&
  newVal.alignment_list.every(item =>
    (item.course_name?.short_course?.toString().trim() || "") !== "" &&
    (item.curriculum?.name?.toString().trim() || "") !== "" &&
    (item.curriculum?.subject?.toString().trim() || "") !== "" &&

    // ตรวจว่า learning_outcome ทุกช่องไม่ว่าง
    Array.isArray(item.learning_outcome) &&
    item.learning_outcome.length === 2 &&
    item.learning_outcome.every(lo => lo?.toString().trim() !== "") &&

    // ตรวจว่า subject_description ทุกช่องไม่ว่าง
    Array.isArray(item.subject_description) &&
    item.subject_description.length === 2 &&
    item.subject_description.every(desc => desc?.toString().trim() !== "") &&

    // ตรวจว่า credit ทุกช่องไม่ว่าง
    Array.isArray(item.credit) &&
    item.credit.length === 2 &&
    item.credit.every(c => c?.toString().trim() !== "") &&

    // ตรวจ evaluation ต้องเลือกอย่างน้อย 1 อย่าง
    (
      item.evaluation?.use_SU ||
      item.evaluation?.use_ABC ||
      (item.evaluation?.use_other && item.evaluation?.other_text?.trim() !== "")
    ) &&

    // ตรวจ evaluation_short ต้องเลือกอย่างน้อย 1 อย่าง
    (
      item.evaluation_short?.use_SU ||
      item.evaluation_short?.use_ABC ||
      (item.evaluation_short?.use_other && item.evaluation_short?.other_text?.trim() !== "")
    )
  );



  //console.log("Validation Check:", {
  //   hasProjectType,
  //   hasEmptyCheckedSdg,
  //   hasLearningOutcome,
  //   hasValidCourseHours,
  //   everyAlignmentHasData,
  //   hasEmptyCheckedSdg

  // });

  return (
    hasProjectType &&
    hasSelectedSdg &&           
    !hasEmptyCheckedSdg &&
    hasLearningOutcome &&
    hasValidCourseHours &&
    everyAlignmentHasData &&
    isSloListValid &&          
    isPlanListValid      
  );
}



watch(
  Project_Data_ST_P2,
  (newVal, oldVal) => {
    if (isInitialized && !canEdit) return;
    isCanGo.value = isProject_Data_ST_P2_Valid(oldVal, newVal);
  },
  { deep: true }
);

watchEffect(() => {
  sdgs.forEach((sdg) => {
    const matched = Project_Data_ST_P2.sdgs.find((selected) => selected.id === sdg.id);
    sdg.isCheck = !!matched;
    sdg.value = matched ? matched.value : "";
  });
});

watch(
  () => Project_Data_ST_P2.sdgs,
  (newVal, oldVal) => {
    //console.log("Updated SDGs:", newVal);
  },
  { deep: true }
);

onMounted(async () => {
  const route = useRoute();
  const user = parseJwt(cookies.get("accesstoken"));
  user_id.value = user.user_id;
  affiliation_id.value = user.affiliation_id;

  if (route.query.project_type) {
    const projectType = route.query.project_type;
    project_type.value = projectType;
  }

  if (route.query.project_id) {
    const projectId = route.query.project_id;
    project_id.value = projectId;

    isInitialized = true;
    canEdit = false; // true
    await getDataWhenProjectID();
    canEdit = true;
  } else {
    isInitialized = true;
    canEdit = true; //false
  }
  //console.log("Project id:", project_id.value);
  //console.log("Project Type:", project_type.value);
  //console.log("user_id:", user_id.value);
});
onUnmounted(() => {
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
  });
});
const nextStep = () => {
  if (currentStep.value < 7) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
const submitForm = async () => {
  loading.value = true
  await autoSave();
  nextStep();
};
</script>

<!--  -->

<style scoped>
.form-check-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-check-input {
  transform: scale(1.5);
}

.block {
  display: block;
}

.custom-input {
  max-width: 100%;
  min-width: 300px;
  min-height: 50px;         /* ✅ เพิ่มความสูงเริ่มต้นเท่ากับ .beautiful-box */
  border-radius: 6px;        /* ✅ ใส่ให้เหมือนกัน ถ้ายังไม่มี */
  resize: vertical;          /* ✅ อนุญาตให้ขยายแนวตั้ง */
  overflow-y: auto;          /* ✅ ให้ scroll ถ้าขยายไม่ได้ */
}


.custom-input2 {
  width: 50px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.sdg-img {
  width: 70px;
  height: 70px;
}

.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.918);
  z-index: 1000;
  color: white;
  padding: 10px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  pointer-events: none;
}

.circle-input {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid white;
}


</style>
