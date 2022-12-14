<template>
  <div class="w-100 d-flex flex-column p-2 align-items-center" style="min-width: 900px">

    <div class="row" style="width: 900px">
      <div class="col-md-auto px-0">
        <img class="ms-3" src="@bootstrap-icons/icons/Telephone-outbound.svg" width="18" height="18">
      </div>
      <div class="col">
        <h5><b>발주서 상세 내역</b></h5>
      </div>
    </div>

    <div class="row" style="width: 900px; margin-top: -5px" v-if="OrderInfo[0].State != 0">
      <div class="col ms-2">
        <span class="fw-bold text-danger" style="font-size: 90%; text-decoration: underline;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>
          이미 전달되었거나 취소 또는 반려 처리된 발주서는 수정할 수 없습니다.
        </span>
      </div>
    </div>

    <form class="px-4" style="width: 900px" v-on:submit.prevent="API_ModifyOrderInfo" autocomplete="off">
      <div class="row mt-3 text-center">
        <span class="fs-2"><b>발&nbsp;&nbsp;&nbsp;&nbsp;주&nbsp;&nbsp;&nbsp;&nbsp;서</b></span>
      </div>
      <div class="row mt-1">
        <div class="col p-0">
          <span class="fw-bold ps-1">발주번호 : {{ OrderNumber }}</span>
        </div>
        <div class="col p-0 text-end">
          <span class="fw-bold">발주일자 : {{ OrderFromState.DisplayProduct1 ? OrderInfo[0].RegisterDate : "" }}</span>
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

      <div class="row mt-2" v-if="OrderFromState.DisplayProduct1">
        <table class="border border-dark border-2">
          <tr>
            <td class="table_title table_col1">순번</td>
            <td class="table_title table_col2">제품코드</td>
            <td class="table_title table_col3">제품명</td>
            <td class="table_title table_col4">규격</td>
            <td class="table_title table_col5">총수량</td>
            <td class="table_title table_col6">수량/롤</td>
            <td class="table_title table_col7">수량/포장</td>
          </tr>
          <!-- 제품 순번 1 -->
          <tr>
            <td class="table_cell fw-bold" rowspan="3">1</td>
            <td class="table_cell">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo[0].ProductCode" v-on:click="DisplayDialog_SelectProduct( 1 )" v-on:keydown.prevent required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo[0].ProductName" v-on:click="DisplayDialog_SelectProduct( 1 )" v-on:keydown.prevent required/>
            </td>
            <td class="table_cell">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo[0].Dimension_Width" v-on:keypress="InputLimit_OnlyNumber($event)" required/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo[0].Dimension_Height" v-on:keypress="InputLimit_OnlyNumber($event)" required/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[0].Quantity" v-on:keypress="InputLimit_OnlyNumber($event)" required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[0].Quantity_Unit" v-on:keypress="InputLimit_OnlyNumber($event)" required/>
            </td>
            <td class="table_cell">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[0].Quantity_Package" v-on:keydown.prevent required/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo[0].Request_Message"/>
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
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo[0].Purpose"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 버튼 영역 1 -->
        <div class="row mt-1 ms-0">
          <div class="col text-center" v-if="OrderInfo[0].State == 0">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button"
            data-bs-toggle="collapse" data-bs-target="#ProductLayer_02" aria-expanded="false" aria-controls="ProductLayer_02"
            v-if="!OrderFromState.DisplayProduct2" v-on:click="OrderFromState.DisplayProduct2=true">추가</button>
          </div>
        </div>
      </div>

      <!-- 제품 순번 2 -->
      <div class="row" id="ProductLayer_02" v-if="OrderFromState.DisplayProduct2">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">2</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo[1].ProductCode" v-on:click="DisplayDialog_SelectProduct( 2 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo[1].ProductName" v-on:click="DisplayDialog_SelectProduct( 2 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo[1].Dimension_Width" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct2"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo[1].Dimension_Height" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[1].Quantity" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[1].Quantity_Unit" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[1].Quantity_Package" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct2"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo[1].Request_Message"/>
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
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo[1].Purpose"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 2 -->
        <div class="row mt-1 ms-0">
          <div class="col text-center" v-if="OrderInfo[0].State == 0">
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
      <div class="row" id="ProductLayer_03" v-if="OrderFromState.DisplayProduct3">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">3</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo[2].ProductCode" v-on:click="DisplayDialog_SelectProduct( 3 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo[2].ProductName" v-on:click="DisplayDialog_SelectProduct( 3 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo[2].Dimension_Width" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct3"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo[2].Dimension_Height" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[2].Quantity" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[2].Quantity_Unit" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[2].Quantity_Package" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct3"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo[2].Request_Message"/>
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
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo[2].Purpose"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 3 -->
        <div class="row mt-1 ms-0">
          <div class="col text-center" v-if="OrderInfo[0].State == 0">
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
      <div class="row" id="ProductLayer_04" v-if="OrderFromState.DisplayProduct4">
        <table>
          <tr>
            <td class="table_cell fw-bold table_col1" rowspan="3">4</td>
            <td class="table_cell table_col2">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo[3].ProductCode" v-on:click="DisplayDialog_SelectProduct( 4 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col3">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo[3].ProductName" v-on:click="DisplayDialog_SelectProduct( 4 )" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col4">
              <div class="row d-flex align-items-center">
                <div class="col-md-auto mx-0 ps-4 pe-0">가로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0" id="Input_ProductCode" type="text"  placeholder="필수" v-model="OrderInfo[3].Dimension_Width" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" v-bind:required="OrderFromState.DisplayProduct4"/></div>
                <div class="col-md-auto mx-0 px-0">mm / 세로 :</div>
                <div class="col mx-0 px-0"><input class="form-control table_input text-center px-0 text-left" type="text"  placeholder="필수" v-model="OrderInfo[3].Dimension_Height" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/></div>
                <div class="col-md-auto mx-0 ps-0 pe-4">mm</div>
              </div>
            </td>
            <td class="table_cell table_col5">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[3].Quantity" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col6">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[3].Quantity_Unit" v-on:keypress="InputLimit_OnlyNumber($event)" v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
            <td class="table_cell table_col7">
              <input class="form-control table_input text-center" type="text"  placeholder="필수" v-model="OrderInfo[3].Quantity_Package" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.prevent v-bind:required="OrderFromState.DisplayProduct4"/>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="6">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo[3].Request_Message"/>
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
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo[3].Purpose"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 4 -->
        <div class="row mt-1 ms-0">
          <div class="col text-center" v-if="OrderInfo[0].State == 0">
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
              <Datepicker inputClassName="dp-custom-input" v-model="OrderInfo[0].RequestDeliverDate" ref="Datepicker_RequestDeliverDate" placeholder="납기 요청일 선택 입력" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="true" autoApply></Datepicker>
            </td>
          </tr>
        </table>
      </div>
      <!-- 비고 입력 -->
      <div class="row mt-2">
        <table style="min-height: 150px">
          <tr>
            <td class="table_title" style="width: 100px">비고</td>
            <td class="table_cell">
              <textarea class="form-control" v-model="OrderInfo[0].ExtraMessage" id="floatingTextarea2" style="height: 150px; border: none;"></textarea>
            </td>
          </tr>
        </table>
      </div>

      <!-- 반려 사유 -->
      <div class="row mt-2" v-if="OrderInfo[0].State == -2">
        <table style="min-height: 150px">
          <tr>
            <td class="table_title" style="width: 100px">반려 사유</td>
            <td class="table_cell">
              <textarea class="form-control fw-bold text-danger" v-model="OrderInfo[0].RejectMessage" id="floatingTextarea2" style="height: 150px; border: none;" readonly></textarea>
            </td>
          </tr>
        </table>
      </div>

      <div class="row mt-4 mb-5">
        <div class="col d-flex align-items-center justify-content-center">
          <button class="btn btn-primary px-4 me-1" type="submit" onclick="return confirm( '수정된 발주서를 다시 등록 할까요?' )" v-if="OrderInfo[0].State == 0">수정</button>
          <button class="btn btn-outline-secondary px-4 ms-1" type="button" v-on:click="DisplayLayout_CancelConfirm()">취소</button>
        </div>
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

  // 외부데이터 전달
  const Props = defineProps( { OrderNumber:{ Type: String, default : "" } } )
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
    DisplayProduct1: false,
    DisplayProduct2: false,
    DisplayProduct3: false,
    DisplayProduct4: false,
  } )
  let OrderInfo = ref( [
    { Quantity: 0, Quantity_Unit: 0, Quantity_Package: 0, State: 0 },
    { Quantity: 0, Quantity_Unit: 0, Quantity_Package: 0, State: 0 },
    { Quantity: 0, Quantity_Unit: 0, Quantity_Package: 0, State: 0 },
    { Quantity: 0, Quantity_Unit: 0, Quantity_Package: 0, State: 0 }
] )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Register_Modify", 'onMounted()', 'Props', JSON.stringify( Props ) )
    DisplayLayout_Default()
  })
  onBeforeUnmount(() => {
    LogManager.w( "Order_Register_Modify", 'onBeforeUnmount()' )
    Component_Content.value = null
  })
  // 감시자
  watch(() => [OrderInfo.value[0].Quantity, OrderInfo.value[0].Quantity_Unit], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register_Modify", "Watch", "Quantity_01 : " + NewValue[0] + " / Quantity_Unit_01 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value[0].Quantity_Package = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value[0].Quantity_Package = 0
  })
  watch(() => [OrderInfo.value[1].Quantity, OrderInfo.value[1].Quantity_Unit], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register_Modify", "Watch", "Quantity_02 : " + NewValue[0] + " / Quantity_Unit_02 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value[1].Quantity_Package = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value[1].Quantity_Package = 0
  })
  watch(() => [OrderInfo.value[2].Quantity, OrderInfo.value[2].Quantity_Unit], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register_Modify", "Watch", "Quantity_03 : " + NewValue[0] + " / Quantity_Unit_03 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value[2].Quantity_Package = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value[2].Quantity_Package = 0
  })
  watch(() => [OrderInfo.value[3].Quantity, OrderInfo.value[3].Quantity_Unit], ( NewValue, OldValue ) => {
    LogManager.w( "Order_Register_Modify", "Watch", "Quantity_04 : " + NewValue[0] + " / Quantity_Unit_04 : " + NewValue[1] )
    if( NewValue[0] > 0 && NewValue[1] > 0 ) OrderInfo.value[3].Quantity_Package = Math.round(NewValue[0] / NewValue[1]) + (NewValue[0] % NewValue[1] > 0 ? 1 : 0)
    else OrderInfo.value[3].Quantity_Package = 0
  })
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    // API 요청 - 발주서 상세 정보 수집
    API_GetOrderDetailInfo()
  }
  // 레이아웃 출력 - 수정 취소
  function DisplayLayout_CancelConfirm() {
    if( OrderInfo.value[0].State == 0 ) {
      if( confirm( "수정 중인 데어터가 저장되지 않았습니다\n수정을 종료 할까요?" ) ) router.go( -1 )
    }
    else router.go( -1 )
  }
  // 레이아웃 출력 - 제품선택 출력
  function DisplayLayout_SelectProduct( Sequece, ProductCode, ProductName ) {
    switch( Sequece ) {
      case 1:
        OrderInfo.value[0].ProductCode = ProductCode
        OrderInfo.value[0].ProductName = ProductName
        break;
      case 2:
        OrderInfo.value[1].ProductCode = ProductCode
        OrderInfo.value[1].ProductName = ProductName
        break;
      case 3:
        OrderInfo.value[2].ProductCode = ProductCode
        OrderInfo.value[2].ProductName = ProductName
        break;
      case 4:
        OrderInfo.value[3].ProductCode = ProductCode
        OrderInfo.value[3].ProductName = ProductName
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
    LogManager.w( "Order_Register_Modify", "Event_ReturnResult" ,"반환데이터", ResultType + " / " + Value1 + " / " + Value2 + " / " + Value3 )
    if( ResultType === "Result_SelectCompany" ) {
      if( Value1 > 0 && Value2 > 0 ) API_GetReceiveCompanyInfo( Value1, Value2 )
    }
    else if( ResultType === "Result_SelectProduct" ) {
      if( Value1 > 0 ) DisplayLayout_SelectProduct( Value1, Value2, Value3 )
    }
    Component_Content.value = null
  }
  // API 요청 - 발주서 상세 정보 수집
  function API_GetOrderDetailInfo() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_NUMBER', Props.OrderNumber );
    LogManager.w( AppInstance?.type.__name, "API_GetOrderDetailInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/RegisterList/GetOrderDetailInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderDetailInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        OrderInfo.value = response.data.data
        OrderCompanyInfo.value = response.data.OrderCompany
        ReceiveCompanyInfo.value = response.data.ReceiveCompany
        OrderFromState.value.DisplayProduct1 = OrderInfo.value[0].Quantity > 0
        OrderFromState.value.DisplayProduct2 = OrderInfo.value[1].Quantity > 0
        OrderFromState.value.DisplayProduct3 = OrderInfo.value[2].Quantity > 0
        OrderFromState.value.DisplayProduct4 = OrderInfo.value[3].Quantity > 0
      }
      else if( response.data.success == -10 ) {
        alert( "발주서 수정 권한이 없습니다." )
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
      LogManager.w( AppInstance?.type.__name, "API_GetOrderDetailInfo()", "서버 요청 오류", ex )
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
  // API 요청 - 발주서 수정
  function API_ModifyOrderInfo() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_COMPANY_INDEX', OrderInfo.value[0].OrderCompanyIndex )
    PostParams.append( 'RECEIVE_COMPANY_INDEX', OrderInfo.value[0].ReceiveCompanyIndex )
    PostParams.append( 'RECEIVE_MANAGER_INDEX', OrderInfo.value[0].ReceiveManagerIndex )
    PostParams.append( 'ORDER_TYPE', 1 )  // 외부발주 1 고정값
    PostParams.append( 'ORDER_NUMBER', Props.OrderNumber )
    if( OrderFromState.value.DisplayProduct1 ) {
      PostParams.append( 'SERIAL_NUMBER_01', OrderInfo.value[0].SerialNumber )
      PostParams.append( 'PRODUCT_CODE_01', OrderInfo.value[0].ProductCode )
      PostParams.append( 'PRODUCT_NAME_01', OrderInfo.value[0].ProductName )
      PostParams.append( 'DIMENSION_WIDTH_01', OrderInfo.value[0].Dimension_Width )
      PostParams.append( 'DIMENSION_HEIGHT_01', OrderInfo.value[0].Dimension_Height )
      PostParams.append( 'QUANTITY_01', OrderInfo.value[0].Quantity )
      PostParams.append( 'QUANTITY_UNIT_01', OrderInfo.value[0].Quantity_Unit )
      PostParams.append( 'REQUEST_MESSAGE_01', OrderInfo.value[0].Request_Message )
      PostParams.append( 'PURPOSE_01', OrderInfo.value[0].Purpose )
    }
    if( OrderFromState.value.DisplayProduct2 ) {
      PostParams.append( 'SERIAL_NUMBER_02', OrderInfo.value[1].SerialNumber )
      PostParams.append( 'PRODUCT_CODE_02', OrderInfo.value[1].ProductCode )
      PostParams.append( 'PRODUCT_NAME_02', OrderInfo.value[1].ProductName )
      PostParams.append( 'DIMENSION_WIDTH_02', OrderInfo.value[1].Dimension_Width )
      PostParams.append( 'DIMENSION_HEIGHT_02', OrderInfo.value[1].Dimension_Height )
      PostParams.append( 'QUANTITY_02', OrderInfo.value[1].Quantity )
      PostParams.append( 'QUANTITY_UNIT_02', OrderInfo.value[1].Quantity_Unit )
      PostParams.append( 'REQUEST_MESSAGE_02', OrderInfo.value[1].Request_Message )
      PostParams.append( 'PURPOSE_02', OrderInfo.value[1].Purpose )
    }
    if( OrderFromState.value.DisplayProduct3 ) {
      PostParams.append( 'SERIAL_NUMBER_03', OrderInfo.value[2].SerialNumber )
      PostParams.append( 'PRODUCT_CODE_03', OrderInfo.value[2].ProductCode )
      PostParams.append( 'PRODUCT_NAME_03', OrderInfo.value[2].ProductName )
      PostParams.append( 'DIMENSION_WIDTH_03', OrderInfo.value[2].Dimension_Width )
      PostParams.append( 'DIMENSION_HEIGHT_03', OrderInfo.value[2].Dimension_Height )
      PostParams.append( 'QUANTITY_03', OrderInfo.value[2].Quantity )
      PostParams.append( 'QUANTITY_UNIT_03', OrderInfo.value[2].Quantity_Unit )
      PostParams.append( 'REQUEST_MESSAGE_03', OrderInfo.value[2].Request_Message )
      PostParams.append( 'PURPOSE_03', OrderInfo.value[2].Purpose )
    }
    if( OrderFromState.value.DisplayProduct4 ) {
      PostParams.append( 'SERIAL_NUMBER_04', OrderInfo.value[3].SerialNumber )
      PostParams.append( 'PRODUCT_CODE_04', OrderInfo.value[3].ProductCode )
      PostParams.append( 'PRODUCT_NAME_04', OrderInfo.value[3].ProductName )
      PostParams.append( 'DIMENSION_WIDTH_04', OrderInfo.value[3].Dimension_Width )
      PostParams.append( 'DIMENSION_HEIGHT_04', OrderInfo.value[3].Dimension_Height )
      PostParams.append( 'QUANTITY_04', OrderInfo.value[3].Quantity )
      PostParams.append( 'QUANTITY_UNIT_04', OrderInfo.value[3].Quantity_Unit )
      PostParams.append( 'REQUEST_MESSAGE_04', OrderInfo.value[3].Request_Message )
      PostParams.append( 'PURPOSE_04', OrderInfo.value[3].Purpose )
    }
    PostParams.append( 'REQUEST_DELIVER_DATE', moment( OrderInfo.value[0].RequestDeliverDate, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) )
    PostParams.append( 'EXTRA_MESSAGE', OrderInfo.value[0].ExtraMessage )
    PostParams.append( 'ORDER_DATE', OrderInfo.value[0].RegisterDate )
    LogManager.w( AppInstance?.type.__name, "API_ModifyOrderInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/RegisterList/ModifyOrderInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_ModifyOrderInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        alert( "발주서 수정이 완료 되었습니다." )
        router.go( -1 )
      }
      else if( response.data.success == -1 ) {
        alert( "발주서를 수정할 수 없습니다.\n\n발주서가 이미 전달되어 작업 진행 되었습니다.\n발주서 상태를 다시 확인하세요." )
        router.go( -1 )
      }
      else if( response.data.success == -10 ) {
        alert( "발주서 수정 권한이 없습니다." )
        router.go( -1 )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_ModifyOrderInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Order_Register_Modify',
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
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
.table_col2 { width: 200px }
.table_col3 { }
.table_col4 { width: 217px }
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
