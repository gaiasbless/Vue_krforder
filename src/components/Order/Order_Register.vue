<template>
  <div class="w-100 d-flex flex-column p-2" style="min-width: 900px">

    <div class="d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/Telephone-outbound.svg" width="18" height="18">
      <h5><b>발주 등록</b></h5>
    </div>

    <span class="text-info" style="font-size: 80%; text-decoration: underline;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      등록된 전체 발주 목록이 출력 됩니다.
    </span>

    <form class="px-4" style="width: 900px" v-on:submit.prevent="API_RegisterOrderInfo" autocomplete="off">
      <div class="row mt-3 text-center">
        <span class="fs-2"><b>발&nbsp;&nbsp;&nbsp;&nbsp;주&nbsp;&nbsp;&nbsp;&nbsp;서</b></span>
      </div>
      <div class="row mt-1">
        <div class="col p-0">
          <span class="ps-1">발주번호 : {{ ReceiveCompanyInfo[0].OrderNumber }}</span>
        </div>
        <div class="col p-0 text-end">
          <span class="">발주일자 : {{ OrderInfo.OrderDate_Display }}</span>
        </div>
      </div>
      <div class="row border border-dark border-2">
        <div class="col p-1 d-flex flex-column border border-top-0 border-bottom-0 border-start-0 border-end-2 border-dark">
          <div class="row">
            <div class="col">
              <img class="mt-0 ms-2 me-2" src="@bootstrap-icons/icons/telephone-outbound-fill.svg" width="18" height="18">
              <span class="fs-5 fw-bold">발신</span>
            </div>
            <div class="col">
            </div>
          </div>
          <span class="mt-2 ms-4 order_text_large fw-bold">{{ OrderCompanyInfo[0].CompanyName }}</span>
          <span class="mt-0 ms-4 order_text_small">{{ OrderCompanyInfo[0].Address }}</span>
          <span class="mt-0 ms-4 order_text_small" v-if="OrderCompanyInfo[0].Telephone !== null">유선전화: {{ OrderCompanyInfo[0].Telephone }}</span>
          <span class="mt-0 ms-4 order_text_small" v-if="OrderCompanyInfo[0].Fax !== null">팩스: {{ OrderCompanyInfo[0].Fax }}</span>
          <span class="mt-3 ms-4 fw-bold">담당자 : {{ OrderCompanyInfo[0].ManagerName }}</span>
          <span class="mt-0 ms-4 order_text_small">휴대전화: {{ OrderCompanyInfo[0].MobilePhone }}</span>
          <span class="mt-0 ms-4 order_text_small">이메일: {{ OrderCompanyInfo[0].Email }}</span>
        </div>
        <div class="col p-1 d-flex flex-column text-end">
          <div class="row">
            <div class="col text-start">
              <img class="mt-0 ms-2 me-2" src="@bootstrap-icons/icons/telephone-inbound-fill.svg" width="18" height="18">
              <span class="fs-5 fw-bold">수신</span>
            </div>
            <div class="col">
              <button class="btn btn-primary" style="width: 80px; padding: 3px; font-size: 90%;" type="button" v-on:click="DisplayDialog_SelectCompany">업체선택</button>
            </div>
          </div>
          <span class="mt-2 me-4 order_text_large fw-bold">{{ ReceiveCompanyInfo[0].CompanyName }}</span>
          <span class="mt-0 me-4 order_text_small">{{ ReceiveCompanyInfo[0].Address }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Telephone !== null">유선전화: {{ ReceiveCompanyInfo[0].Telephone }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Fax !== null">팩스: {{ ReceiveCompanyInfo[0].Fax }}</span>
          <span class="mt-3 me-4 fw-bold">담당자 : {{ ReceiveCompanyInfo[0].ManagerName }}</span>
          <span class="mt-0 me-4 order_text_small">휴대전화: {{ ReceiveCompanyInfo[0].MobilePhone }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Email !== null">이메일: {{ ReceiveCompanyInfo[0].Email }}</span>
        </div>
      </div>

      <div class="row mt-2">
        <table class="border border-dark border-2">
          <tr>
            <td class="table_title table_col1" style="width: 40px">순번</td>
            <td class="table_title table_col2" style="width: 210px">제품코드</td>
            <td class="table_title table_col3">제품명</td>
            <td class="table_title table_col4" style="width: 220px">규격</td>
            <td class="table_title table_col5" style="width: 80px">총수량</td>
            <td class="table_title table_col6" style="width: 70px">수량/롤</td>
            <td class="table_title table_col7" style="width: 70px">수량/포장</td>
          </tr>
          <!-- 제품 순번 1 -->
          <tr>
            <td class="table_cell fw-bold" rowspan="3">1</td>
            <td class="table_cell">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode_01" v-on:click="DisplayDialog_SelectProduct( 1 )" v-on:keydown.prevent required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName_01" v-on:click="DisplayDialog_SelectProduct( 1 )" v-on:keydown.prevent required/>
            </td>
            <td class="table_cell">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Width_01" v-on:keypress="InputLimit_OnlyNumber($event)" required/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Height_01" v-on:keypress="InputLimit_OnlyNumber($event)" required/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_01" v-on:keypress="InputLimit_OnlyNumber($event)" required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Unit_01" v-on:keypress="InputLimit_OnlyNumber($event)" required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Package_01" v-on:keydown.prevent required/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.RequestMessage_01"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.Purpose_01"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 버튼 영역 1 -->
        <div class="row mt-1 mb-1 ms-0">
          <div class="col text-center">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_02" aria-expanded="false" aria-controls="ProductLayer_02"
            v-if="!OrderFromState.DisplayProduct2" v-on:click="OrderFromState.DisplayProduct2=true">추가</button>
          </div>
        </div>
      </div>

      <!-- 제품 순번 2 -->
      <div class="row collapse" id="ProductLayer_02">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">2</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode_02" v-on:click="DisplayDialog_SelectProduct( 2 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName_02" v-on:click="DisplayDialog_SelectProduct( 2 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Width_02" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct2"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Height_02" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_02" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Unit_02" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Package_02" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.RequestMessage_02"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.Purpose_02"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 2 -->
        <div class="row mt-1 mb-1 ms-0">
          <div class="col text-center">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_03" aria-expanded="false" aria-controls="ProductLayer_03"
            v-if="!OrderFromState.DisplayProduct3" v-on:click="OrderFromState.DisplayProduct3=true">추가</button>
            <button class="btn btn-primary ms-1" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_02" aria-expanded="true" aria-controls="ProductLayer_02"
            v-if="OrderFromState.DisplayProduct2 && !OrderFromState.DisplayProduct3" v-on:click="OrderFromState.DisplayProduct2=false">삭제</button>
          </div>
        </div>
      </div>

      <!-- 제품 순번 3 -->
      <div class="row collapse" id="ProductLayer_03">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">3</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode_03" v-on:click="DisplayDialog_SelectProduct( 3 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName_03" v-on:click="DisplayDialog_SelectProduct( 3 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Width_03" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct3"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Height_03" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_03" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Unit_03" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Package_03" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.RequestMessage_03"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.Purpose_03"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 3 -->
        <div class="row mt-1 mb-1 ms-0">
          <div class="col text-center">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_04" aria-expanded="false" aria-controls="ProductLayer_04"
            v-if="!OrderFromState.DisplayProduct4" v-on:click="OrderFromState.DisplayProduct4=true">추가</button>
            <button class="btn btn-primary ms-1" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_03" aria-expanded="true" aria-controls="ProductLayer_03"
            v-if="OrderFromState.DisplayProduct3 && !OrderFromState.DisplayProduct4" v-on:click="OrderFromState.DisplayProduct3=false">삭제</button>
          </div>
        </div>
      </div>

      <!-- 제품 순번 4 -->
      <div class="row collapse" id="ProductLayer_04">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">4</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode_04" v-on:click="DisplayDialog_SelectProduct( 4 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName_04" v-on:click="DisplayDialog_SelectProduct( 4 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Width_04" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct4"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo.Dimenstion_Height_04" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_04" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Unit_04" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo.Quantity_Package_04" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.RequestMessage_04"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.Purpose_04"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 4 -->
        <div class="row mt-1 mb-1 ms-0">
          <div class="col text-center">
            <button class="btn btn-primary ms-1" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_04" aria-expanded="true" aria-controls="ProductLayer_04"
            v-on:click="OrderFromState.DisplayProduct4=false">삭제</button>
          </div>
        </div>
      </div>

      <!-- 납기 요청일 -->
      <div class="row mt-2">
        <table>
          <tr>
            <td class="table_title" style="width: 100px">납기 요청일</td>
            <td class="table_cell">
              <Datepicker inputClassName="dp-custom-input" v-model="OrderInfo.RequestDeliverDate" ref="Datepicker_RequestDeliverDate" placeholder="납기 요청일 선택 입력" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="true" autoApply></Datepicker>
            </td>
          </tr>
        </table>
      </div>
      <!-- 비고 입력 -->
      <div class="row mt-3">
        <table style="min-height: 150px">
          <tr>
            <td class="table_title" style="width: 100px">비고</td>
            <td class="table_cell">
              <textarea class="form-control" v-model="OrderInfo.ExtraMessage" id="floatingTextarea2" style="height: 150px; border: none;"></textarea>
            </td>
          </tr>
        </table>
      </div>

      <div class="row mt-4 mb-5 d-flex align-items-center justify-content-center">
        <button class="col-4 btn btn-primary" type="submit">발주서 등록</button>
      </div>
    </form>

    <!-- 다이얼로그 -->
    <component v-bind:is="Component_Content" v-bind:OrderSequence="OrderSequence" v-bind:key="Component_Content" v-on:Event_ReturnResult="Event_ReturnResult"></component>
  </div>

</template>

<script setup>
  import '@vuepic/vue-datepicker/dist/main.css'
  import Dialog_SelectCompany from '@/components/Common/Dialog_SelectCompany.vue'
  import Dialog_SelectProduct from '@/components/Common/Dialog_SelectProduct.vue'

  // 외부데이터 반환
  const Emits = defineEmits( [ "Event_UpdateMenu" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue'
  import router from '@/router'
  import moment from 'moment'
  import LogManager from '@/utility/LogManager'
  import Datepicker from '@vuepic/vue-datepicker'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let Component_Content = shallowRef( null )
  let OrderCompanyInfo = ref( [{}] )
  let ReceiveCompanyInfo = ref( [{}] )
  let OrderSequence = ref( 0 )
  let OrderFromState = ref( {
    DisplayProduct1: true,
    DisplayProduct2: false,
    DisplayProduct3: false,
    DisplayProduct4: false,
  } )
  let OrderInfo = ref( {
    OrderCompanyIndex: 0,
    ReceiveCompanyIndex: 0,
    ReceiveManagerIndex: 0,
    OrderDate: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ),
    OrderDate_Display: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY년 M월 D일" ),
    ProductCode_01: "",
    ProductName_01: "",
    Dimenstion_Width_01: null,
    Dimenstion_Height_01: null,
    Quantity_01: null,
    Quantity_Unit_01: null,
    Quantity_Package_01: 0,
    RequestMessage_01: "",
    Purpose_01: "",
    ProductCode_02: "",
    ProductName_02: "",
    Dimenstion_Width_02: null,
    Dimenstion_Height_02: null,
    RequestMessage_02: "",
    Quantity_02: null,
    Quantity_Unit_02: null,
    Quantity_Package_02: 0,
    NoticeInfo_02: "",
    Purpose_02: "",
    ProductCode_03: "",
    ProductName_03: "",
    Dimenstion_Width_03: null,
    Dimenstion_Height_03: null,
    Quantity_03: null,
    Quantity_Unit_03: null,
    Quantity_Package_03: 0,
    RequestMessage_03: "",
    Purpose_03: "",
    ProductCode_04: "",
    ProductName_04: "",
    Dimenstion_Width_04: null,
    Dimenstion_Height_04: null,
    Quantity_04: null,
    Quantity_Unit_04: null,
    Quantity_Package_04: 0,
    RequestMessage_04: "",
    Purpose_04: "",
    RequestDeliverDate: "",
    ExtraMessage: ""
  } )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Register", 'onMounted()' )
    DisplayLayout_Default()
  })
  onBeforeUnmount(() => {
    LogManager.w( "Order_Register", 'onBeforeUnmount()' )
    Component_Content.value = null
  })
  // 감시자
  watch(() => [OrderInfo.value.Quantity_01, OrderInfo.value.Quantity_Unit_01], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register", "Watch", "Quantity_01 : " + NewValue[0] + " / Quantity_Unit_01 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value.Quantity_Package_01 = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value.Quantity_Package_01 = 0
  })
  watch(() => [OrderInfo.value.Quantity_02, OrderInfo.value.Quantity_Unit_02], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register", "Watch", "Quantity_02 : " + NewValue[0] + " / Quantity_Unit_02 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value.Quantity_Package_02 = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value.Quantity_Package_02 = 0
  })
  watch(() => [OrderInfo.value.Quantity_03, OrderInfo.value.Quantity_Unit_03], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register", "Watch", "Quantity_03 : " + NewValue[0] + " / Quantity_Unit_03 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value.Quantity_Package_03 = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value.Quantity_Package_03 = 0
  })
  watch(() => [OrderInfo.value.Quantity_04, OrderInfo.value.Quantity_Unit_04], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register", "Watch", "Quantity_04 : " + NewValue[0] + " / Quantity_Unit_04 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value.Quantity_Package_04 = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value.Quantity_Package_04 = 0
  })
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    // API 요청 - 발주회사 정보 수집
    API_GetOrderCompanyInfo()
    // API 요청 - 수신회사 정보 수집 (기본값 코리아 라벨, 김영민 과장 적용)
    API_GetReceiveCompanyInfo( 2, 2 )
  }
  // 레이아웃 출력 - 제품선택 출력
  function DisplayLayout_SelectProduct( Sequece, ProductCode, ProductName ) {
    switch( Sequece ) {
      case 1:
        OrderInfo.value.ProductCode_01 = ProductCode
        OrderInfo.value.ProductName_01 = ProductName
        break;
      case 2:
        OrderInfo.value.ProductCode_02 = ProductCode
        OrderInfo.value.ProductName_02 = ProductName
        break;
      case 3:
        OrderInfo.value.ProductCode_03 = ProductCode
        OrderInfo.value.ProductName_03 = ProductName
        break;
      case 4:
        OrderInfo.value.ProductCode_04 = ProductCode
        OrderInfo.value.ProductName_04 = ProductName
        break;
    }
  }
  // 다이얼로그 출력 - 업체선택
  function DisplayDialog_SelectCompany() {
    Component_Content.value = Dialog_SelectCompany
  }
  // 다이얼로그 출력 - 제품선택
  function DisplayDialog_SelectProduct( Sequence ) {
    OrderSequence.value = Sequence
    Component_Content.value = Dialog_SelectProduct
  }
  // 입력제한 - 전체
  function InputLimit_Prevent( Event ) {
    Event.preventDefault()
  }
  // 입력제한 - 숫자만
  function InputLimit_OnlyNumber( Event ) {
    let char = String.fromCharCode( Event.keyCode )
    if( /^[0-9]+$/.test( char ) ) return true
    else Event.preventDefault()
  }
  // 업체선택 결과 반영
  function Event_ReturnResult( ResultType, Value1, Value2, Value3 ) {
    LogManager.w( "Order_Register", "Event_ReturnResult" ,"반환데이터", ResultType + " / " + Value1 + " / " + Value2 + " / " + Value3 )
    if( ResultType === "Result_SelectCompany" ) {
      if( Value1 > 0 && Value2 > 0 ) API_GetReceiveCompanyInfo( Value1, Value2 )
    }
    else if( ResultType === "Result_SelectProduct" ) {
      if( Value1 > 0 ) DisplayLayout_SelectProduct( Value1, Value2, Value3 )
    }
    Component_Content.value = null
  }
  // API 요청 - 발주회사 정보 수집
  function API_GetOrderCompanyInfo() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'COMPANY_INDEX', 1 );        // 발주회사 색인번호는 KRF - 1 고정값 호출
    LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/GetOrderCompanyInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        OrderCompanyInfo.value = response.data.data
        OrderInfo.value.OrderCompanyIndex = response.data.data[0].idx
      }
      else if( response.data.success == -10 ) {
        alert( "발주서 등록 권한이 없습니다." )
        Emits( "Event_UpdateMenu", "list" )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 수신회사 정보 수집
  function API_GetReceiveCompanyInfo( CompanyIndex, ManagerIndex ) {
    var PostParams = new URLSearchParams();
    PostParams.append( 'COMPANY_INDEX', CompanyIndex )
    PostParams.append( 'MANAGER_INDEX', ManagerIndex )        // 수신회사 매니저 기본값 2 적용 (김영민 과장)
    LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/GetReceiveCompanyInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        ReceiveCompanyInfo.value = response.data.data
        OrderInfo.value.ReceiveCompanyIndex = response.data.data[0].idx
        OrderInfo.value.ReceiveManagerIndex = response.data.data[0].ManagerIndex
      }
      else if( response.data.success == -10 ) {
        alert( "발주서 등록 권한이 없습니다." )
        Emits( "Event_UpdateMenu", "list" )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 발주서 등록
  function API_RegisterOrderInfo() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_COMPANY_INDEX', OrderInfo.value.OrderCompanyIndex )
    PostParams.append( 'RECEIVE_COMPANY_INDEX', OrderInfo.value.ReceiveCompanyIndex )
    PostParams.append( 'RECEIVE_MANAGER_INDEX', OrderInfo.value.ReceiveManagerIndex )
    PostParams.append( 'ORDER_TYPE', 2 )  // 외부발주 2 고정값
    PostParams.append( 'ORDER_NUMBER', ReceiveCompanyInfo.value[0].OrderNumber )
    PostParams.append( 'ORDER_DATE', OrderInfo.value.OrderDate )
    if( OrderFromState.value.DisplayProduct1 ) {
      PostParams.append( 'PRODUCT_CODE_01', OrderInfo.value.ProductCode_01 )
      PostParams.append( 'PRODUCT_NAME_01', OrderInfo.value.ProductName_01 )
      PostParams.append( 'DIMENSION_WIDTH_01', OrderInfo.value.Dimenstion_Width_01 )
      PostParams.append( 'DIMENSION_HEIGHT_01', OrderInfo.value.Dimenstion_Height_01 )
      PostParams.append( 'QUANTITY_01', OrderInfo.value.Quantity_01 )
      PostParams.append( 'QUANTITY_UNIT_01', OrderInfo.value.Quantity_Unit_01 )
      PostParams.append( 'REQUEST_MESSAGE_01', OrderInfo.value.RequestMessage_01 )
      PostParams.append( 'PURPOSE_01', OrderInfo.value.Purpose_01 )
    }
    if( OrderFromState.value.DisplayProduct2 ) {
      PostParams.append( 'PRODUCT_CODE_02', OrderInfo.value.ProductCode_02 )
      PostParams.append( 'PRODUCT_NAME_02', OrderInfo.value.ProductName_02 )
      PostParams.append( 'DIMENSION_WIDTH_02', OrderInfo.value.Dimenstion_Width_02 )
      PostParams.append( 'DIMENSION_HEIGHT_02', OrderInfo.value.Dimenstion_Height_02 )
      PostParams.append( 'QUANTITY_02', OrderInfo.value.Quantity_02 )
      PostParams.append( 'QUANTITY_UNIT_02', OrderInfo.value.Quantity_Unit_02 )
      PostParams.append( 'REQUEST_MESSAGE_02', OrderInfo.value.RequestMessage_02 )
      PostParams.append( 'PURPOSE_02', OrderInfo.value.Purpose_02 )
    }
    if( OrderFromState.value.DisplayProduct3 ) {
      PostParams.append( 'PRODUCT_CODE_03', OrderInfo.value.ProductCode_03 )
      PostParams.append( 'PRODUCT_NAME_03', OrderInfo.value.ProductName_03 )
      PostParams.append( 'DIMENSION_WIDTH_03', OrderInfo.value.Dimenstion_Width_03 )
      PostParams.append( 'DIMENSION_HEIGHT_03', OrderInfo.value.Dimenstion_Height_03 )
      PostParams.append( 'QUANTITY_03', OrderInfo.value.Quantity_03 )
      PostParams.append( 'QUANTITY_UNIT_03', OrderInfo.value.Quantity_Unit_03 )
      PostParams.append( 'REQUEST_MESSAGE_03', OrderInfo.value.RequestMessage_03 )
      PostParams.append( 'PURPOSE_03', OrderInfo.value.Purpose_03 )
    }
    if( OrderFromState.value.DisplayProduct4 ) {
      PostParams.append( 'PRODUCT_CODE_04', OrderInfo.value.ProductCode_04 )
      PostParams.append( 'PRODUCT_NAME_04', OrderInfo.value.ProductName_04 )
      PostParams.append( 'DIMENSION_WIDTH_04', OrderInfo.value.Dimenstion_Width_04 )
      PostParams.append( 'DIMENSION_HEIGHT_04', OrderInfo.value.Dimenstion_Height_04 )
      PostParams.append( 'QUANTITY_04', OrderInfo.value.Quantity_04 )
      PostParams.append( 'QUANTITY_UNIT_04', OrderInfo.value.Quantity_Unit_04 )
      PostParams.append( 'REQUEST_MESSAGE_04', OrderInfo.value.RequestMessage_04 )
      PostParams.append( 'PURPOSE_04', OrderInfo.value.Purpose_04 )
    }
    PostParams.append( 'REQUEST_DELIVER_DATE', moment( OrderInfo.value.RequestDeliverDate, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) )
    PostParams.append( 'EXTRA_MESSAGE', OrderInfo.value.ExtraMessage )
    LogManager.w( AppInstance?.type.__name, "API_RegisterOrderInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/RegisterOrderInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_RegisterOrderInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        alert( "발주서 등록이 완료 되었습니다." )
        Emits( "Event_UpdateMenu", "list" )
      }
      else if( response.data.success == -10 ) {
        alert( "발주서 등록 권한이 없습니다." )
        Emits( "Event_UpdateMenu", "list" )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_RegisterOrderInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
      Emits( "Event_UpdateMenu", "list" )
    })
  }
</script>

<script>
export default {
  name: 'Order_Register',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body, div {
  font-size: 97%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
thead th {
  font-size: 85%;
  background-color: #dddddd;
  color: black;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid #000000;
}
table td {
  font-size: 80%;
}
.order_text_large {
  font-size: 130%;
}
.order_text_small {
  font-size: 90%;
}
.table_title {
  height: 35px;
  background-color: #c3c3c3;
  font-size: 85%;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
}
.table_cell {
  font-size: 85%;
  text-align: center;
  border: 2px solid black;
}
.table_input {
  border: none;
  font-size: 110%;
  input:placeholder {
    color: red;
  }
}
.table_col1 { width: 40px }
.table_col2 { width: 210px }
.table_col3 { }
.table_col4 { width: 220px }
.table_col5 { width: 80px }
.table_col6 { width: 70px }
.table_col7 { width: 70px }
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #9bb7ff;
  opacity: 1; /* Firefox */
}

input::-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #5786ff;
}

input::-ms-input-placeholder { /* Microsoft Edge */
  color: #5786ff;
}
</style>

<style lang="scss">
.dp-custom-input {
  box-shadow: 0 0 0px #1976d2;
  // color: #ffffff;
  border-color: #ffffff;
  // border: none;

  &:hover {
    border-color: #1976d2;
  }
}
</style>
