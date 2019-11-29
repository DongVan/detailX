<template>
  <div class="wrapper">
    <nav-header></nav-header>
    <div class="content">
      <div class="products-box">
        <div class="form-group title-box">
          <div class="left">
            <h3><b>CỬA HÀNG</b></h3>
          </div>
          <div class="right">
            <div class="uk-inline">
              <select v-model="column">
                <option value="">Tất cả</option>
                <option v-for="col in thead" :key="col.record" :value="col.record">{{ col.title }}</option>
              </select>
            </div>
            <div class="uk-inline">
              <input type="text" class="uk-search-row" v-model="search" placeholder="Tìm kiếm ..."/>
            </div>
            <button class="btn btn-danger" title="Tạo mới sản phẩm" @click="open_add_modal"><span class="fa fa-plus-circle"></span>&nbsp; Tạo mới</button>

            <div class="uk-inline" title="Import data">
              <button class="btn btn-primary"><span class="fa fa-upload"></span>&nbsp; Import</button>
            </div>

            <div class="uk-inline" title="Xuất ra file excel">
              <button class="btn btn-success"><span class="fa fa-file-excel"></span>&nbsp; Excel</button>
            </div>
            <div class="uk-inline">
              <button class="btn btn-info" title="Hiển thị"><span class="fa fa-table"></span>&nbsp; <span uk-icon="icon: chevron-down; ratio: 0.7"></span></button>
              <div uk-dropdown="mode: click">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th v-for="d in thead" @click="tSort($event, d.record, 'number')" class="sorting" v-if="d.record=='id'">
              {{d.title}}
              <i class="fa fa-sort"></i></th>
            <th v-for="d in thead" @click="tSort($event, d.record, 'string')" class="sorting" v-if="d.record!='id'">{{d.title}}
              <i class="fa fa-sort"></i></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(record) in data_current" :key=record.id>
            <td v-for="d in thead">
              {{tRender(d.record, record[d.record])}}
            </td>
            <td>
              <span class="fa fa-pen"></span>
              <span class="fa fa-trash"></span>
            </td>
          </tr>
          <tr class="text-center" v-show="!data_current || data_current.length == 0">
            <td class="text-center" :colspan="thead.length + 1">Empty</td>
          </tr>
          </tbody>
        </table>
        <div class="tbl-pagination">
          <span class="tbl-button" @click="prevPage"><i class="fa fa-chevron-left"></i></span>
          <span :class="{'tbl-button': true, 'is-active': table_index == 0}" @click="onClickPage(0)">1</span>
          <span v-if="isDotFirst">...</span>
          <span v-if="isButtonNumber1" class="tbl-button  t1" @click="onClickPage(table_index - 1)">{{table_index}}</span>
          <span v-if="isButtonNumber2" class="tbl-button is-active t2">{{table_index + 1}}</span>
          <span v-if="isButtonNumber3" class="tbl-button t3" @click="onClickPage(table_index + 1)">{{table_index + 2}}</span>
          <span v-if="isDotSecond">...</span>
          <span v-if="isMaxLength" :class="{'tbl-button': true, 'is-active': table_index + 1 == table_max}"
                @click="onClickPage(table_max - 1)">{{ table_max }}</span>
          <span class="tbl-button" @click="nextPage"><i class="fa fa-chevron-right"></i></span>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="uk-modals">
      <div id="modal-add" uk-modal="bg-close: false">
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-modal-body">
            <h3><b>TẠO MỚI</b></h3>

            <form>
              <div class="form-group">
                <label>Mã <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataAdd['code']" required/>
                <span class="fa fa-question-circle" title="Mã là mã của cửa hàng"></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Tên <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataAdd['name']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng"></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Số điện thoại </label>
                <input type="text" class="uk-input" v-model="dataAdd['phone']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng"></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Email </label>
                <input type="text" class="uk-input" v-model="dataAdd['email']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng"></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Địa chỉ </label>
                <input type="text" class="uk-input" v-model="dataAdd['address']" required/>
                <span class="fa fa-question-circle" title="Địa chỉ là vị trí, địa chỉ của store"></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Diễn giải</label>
                <textarea class="uk-textarea" v-model="dataAdd['description']" rows="5"></textarea>
                <span class="fa fa-question-circle" title="Diễn giải là những thông tin khác liên quan đến cửa hàng"></span>
                <div class="clear"></div>
              </div>
            </form>
          </div>
          <div class="uk-modal-footer text-center">
            <button type="submit" class="btn btn-success" @click="submitAddForm($event)"><span class="fa fa-save"></span> Lưu</button>
            <button type="submit" class="btn btn-success"><span class="fa fa-save"></span> Lưu và tạo mới</button>
            <button type="button" class="btn btn-default uk-modal-close"><span class="fa fa-times-circle"></span> Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from './Header'

    var data = [
        {'id': 1, 'name': 'Store 1', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 2, 'name': 'Store 2', 'code': 'STORE2', 'phone': '032346548', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 3, 'name': 'Store 3', 'code': 'STORE3', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 4, 'name': 'Store 4', 'code': 'STORE4', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 5, 'name': 'Store 5', 'code': 'STORE5', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 6, 'name': 'Store 6', 'code': 'STORE6', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 7, 'name': 'Store 7', 'code': 'STORE7', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 8, 'name': 'Store 8', 'code': 'STORE8', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 9, 'name': 'Store 9', 'code': 'STORE9', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 10, 'name': 'Store 10', 'code': 'STORE10', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 11, 'name': 'Store 11', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 12, 'name': 'Store 12', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 13, 'name': 'Store 13', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 14, 'name': 'Store 14', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 15, 'name': 'Store 15', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 16, 'name': 'Store 16', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 17, 'name': 'Store 17', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 18, 'name': 'Store 18', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'},
        {'id': 19, 'name': 'Store 19', 'code': 'STORE1', 'phone': '0123456987', 'email': 'dong@gmail.com', 'address': 'HN'}
    ];
    var myMixi = {
        data() {
            return {
                'message': 'HelloWorld !'
            }
        },
        watch: {
            fix_customers(value) {
                this.customers = value;
            },
            customers() {
                this.processingData();
            },
            table_index() {
                this.processingData();
            },
            search() {
                this.customers = this.tFilter;
            },
            column() {
                this.search = '';
            }
        },
        computed: {
            isMaxLength() {
                return this.table_max > 1;
            },
            isDotFirst() {
                return this.table_index > 2;
            },
            isDotSecond() {
                return this.table_max > 3 && this.table_index != this.table_max - 1 && this.table_index != this.table_max - 2 && this.table_index != this.table_max - 3;
            },
            isButtonNumber1() {
                return this.table_index - 1 > 0 && this.table_max > 1;
            },
            isButtonNumber2() {
                return (this.table_index >= 1 && this.table_index < this.table_max - 1) || (this.table_index == 1 && this.table_max > 2);
            },
            isButtonNumber3() {
                return this.table_index < this.table_max - 2 && this.table_max > 2;
            },
            tFilter() {
                if (!this.fix_customers.length) {
                    return [];
                }
                return this.fix_customers.filter(item => {
                    let props = (this.search && this.column) ? [item[this.column]] : Object.values(item);
                    return props.some(prop => !this.search || ((typeof prop === 'string') ? this.convertString(prop).includes(this.convertString(this.search)) : this.convertString(prop).includes(this.convertString(this.search))));
                })
            }
        },
        methods: {
            processingData() {
                var arr = this.customers;
                var tmp = []; // tmp current data
                if (arr && Object.keys(arr).length > 0 && this.table_rows > 0) {
                    var start = this.table_index * this.table_rows;
                    var condition = (this.table_index + 1) * this.table_rows;
                    for (var i = start; i < condition && i < Object.keys(arr).length; i++) {
                        tmp.push(arr[i]);
                    }
                    // Max length
                    this.table_max = Math.ceil(Object.keys(arr).length / this.table_rows);
                    // Data current
                    this.data_current = tmp;
                } else {
                    this.table_max = 0;
                    this.data_current = [];
                }

                console.log(Object.keys(arr).length);
                console.log(Object.keys(arr).length / this.table_rows);
                console.log(this.table_max);
            },
            convertString(str) {
                str = str + '';
                str = str.toString().toLowerCase();
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                str = str.replace(/đ/g, "d");
                return str;
            },
            // Pagination
            prevPage() {
                this.table_index = this.table_index > 0 && this.table_index - 1;
            },
            nextPage() {
                if (this.table_index < this.table_max - 1 && this.table_max > 0) {
                    this.table_index = this.table_index + 1;
                }
            },
            onClickPage(index) {
                this.table_index = index;
            },
            // table render
            tRender: function (record, value) {
                record = record ? record : '';
                if (record == 'sex') {
                    value = (value == 'male' || value == 'M') ? 'Nam' : (value == 'female' || value == 'F' ? 'Nữ' : '');
                }

                if (record == 'type') {
                    value = (value && value == 'unlimited') ? 'UNLIMITED' : ((value && value == 'time') ? 'FROM DATE - TO DATE' : 'ONE TIME ONLY');
                }
                if (record == 'from_date') {
                    value = (value && value != '0000-00-00 00:00:00') ? get_date(value) : '';
                }

                if (record == 'to_date') {
                    value = (value && value != '0000-00-00 00:00:00') ? get_date(value) : '';
                }
                if (record == 'grand_total') {
                    value = value ? format_currency2(currency, value) : 0;
                }
                if (record == 'is_active') {
                    var no = '<strong class="fa fa-times-rectangle" uk-tooltip="Không"></strong>';
                    var yes = '<strong class="fa fa-check-square" uk-tooltip="Có"></strong>';
                    value = value == 'Y' ? yes : no;
                }

                return value;
            },
            // Sort
            tOrder(objs, type, field, sort) {
                function convertString(str) {
                    str = str.toString().toLowerCase();
                    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                    str = str.replace(/đ/g, "d");
                    return str;
                }

                function change_alias(value, type) {
                    if (type == 'number') {
                        value = parseFloat(value);
                    } else {
                        if (value.length > 0) {
                            value = convertString(value);
                        } else {
                            value = '';
                        }

                    }
                    return value;
                }

                function compare(a, b) {
                    if (a && b) {
                        var t1 = a[field] ? change_alias(a[field], type) : '';
                        var t2 = b[field] ? change_alias(b[field], type) : '';
                        if (sort == 'asc') {
                            if (t1 < t2) {
                                return -1;
                            }
                            if (t1 > t2) {
                                return 1;
                            }
                            return 0;
                        } else {
                            if (t1 > t2) {
                                return -1;
                            }
                            if (t1 < t2) {
                                return 1;
                            }
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                }

                return objs.sort(compare);
            },
            tSort(e, field, type) {
                e = $(e.currentTarget);
                this.field = field;
                if (e.hasClass('sorting')) {
                    e.parents('table').find('thead tr th').removeClass().addClass('sorting');
                    e.removeClass().addClass('sorting-asc');
                    e.parents('table').find('thead tr th i').removeClass().addClass('fa fa-sort');
                    e.find('i').removeClass().addClass('fa fa-sort-down');
                    this.customers = this.tOrder(this.customers, type, field, 'asc');
                    this.order = 'asc';
                } else if (e.hasClass('sorting-asc')) {
                    e.parents('table').find('thead tr th').removeClass().addClass('sorting');
                    e.removeClass().addClass('sorting-desc');
                    e.parents('table').find('thead tr th i').removeClass().addClass('fa fa-sort');
                    e.find('i').removeClass().addClass('fa fa-sort-up');
                    this.customers = this.tOrder(this.customers, type, field, 'desc');
                    this.order = 'desc';
                } else {
                    e.parents('table').find('thead tr th').removeClass().addClass('sorting');
                    e.removeClass().addClass('sorting-asc');
                    e.parents('table').find('thead tr th i').removeClass().addClass('fa fa-sort');
                    e.find('i').removeClass().addClass('fa fa-sort-down');
                    this.customers = this.tOrder(this.customers, type, field, 'asc');
                    this.order = 'asc';
                }
            },
            alertNotify(type, message, time) {
                return UIkit.notification({
                    message: message,
                    status: type,
                    pos: 'top-right',
                    timeout: time
                });
            }
        },
        created() {
            // var window_size = $(window).width();
            // if (window_size > 1520) {
            //     this.table_rows = 15;
            // } else if (window_size >= 1380 && window_size <= 1520) {
            //     this.table_rows = 12;
            // } else {
            //     this.table_rows = 10;
            // }
        }
    };
    export default {
        mixins: [myMixi],
        components: {'nav-header': Header},
        data() {
            return {
                fix_customers: data,
                customers: data,
                thead: [
                    {'title': 'ID', 'record': 'id', 'filter': ''},
                    {'title': 'Tên', 'record': 'name', 'filter': ''},
                    {'title': 'Mã', 'record': 'code', 'filter': ''},
                    {'title': 'Số điện thoại', 'record': 'phone', 'filter': ''},
                    {'title': 'Email', 'record': 'email', 'filter': ''},
                    {'title': 'Address', 'record': 'address', 'filter': ''}
                ],
                data_current: [],
                table_index: 0,
                table_max: 0,
                table_rows: 10,
                order: 'desc',
                field: '',
                filter: [],
                search: '',
                column: '',

                // Form data
                dataAdd: {
                    'id': '', 'code': '', 'name': '', 'phone': '', 'email': '', 'description': '', 'address': ''
                }
            }
        },
        methods: {
            open_add_modal() {
                UIkit.modal('#modal-add').show();
            },
            submitAddForm() {
                var data = this.fix_customers;
                var form = this.dataAdd;
                var id = 1;
                if (Object.keys(data).length > 0) {
                    id = parseInt(data[Object.keys(data).length - 1]['id']) + 1;
                }
                if (form['code'] != '' && form['name'] != '') {
                    data.push( {'id': id, 'name': form['name'], 'code': form['code'], 'phone': form['phone'], 'email': form['email']});
                    UIkit.modal('#modal-add').hide();
                } else {
                    this.alertNotify('danger', 'Các trường đánh dấu * không được để trống.');
                }

                this.fix_customers = data;
            }
        },
        created() {
            this.processingData();
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    background: #fafafa;
  }

  .wrapper .content {
    height: calc(100% - 50px);
    overflow: auto;
  }

  .wrapper .content .products-box {
    float: right;
    width: 100%;
    padding: 20px;
  }

  .wrapper .content .products-box .title-box {

  }

  .wrapper .content .products-box .title-box h3 {
    margin-bottom: 0;
  }

  .wrapper .content .products-box .title-box input,
  .wrapper .content .products-box .title-box select {
    height: 34px;
    padding: 5px;
  }

  .wrapper .content .products-box .title-box input {
    width: 200px;
  }

  .wrapper .content .products-box .title-box button {
    border-radius: 0;
  }

  select {
    height: 26px;
  }

  table {
    border: 1px solid #ddd;
    background: #fff;
  }

  table tr th {
    cursor: pointer;
    text-transform: uppercase;
  }

  table tr th i {
    float: right;
  }

  table tr th i.fa-sort {
    color: #ccc;
  }

  table tr td {
    text-align: left;
    vertical-align: middle;
  }

  table tr td:last-child {
    text-align: right;
  }

  table tr td:last-child span {
    border: 1px solid #999;
    width: 25px;
    height: 25px;
    padding: 5px;
    background: #fff;
  }

  table tr td:last-child span:hover {
    background: orangered;
    color: #fff;
    border-color: orangered;
    cursor: pointer;
  }

  .tbl-pagination {
    float: right;
    font-size: small;
    font-weight: 700;
  }

  .tbl-pagination .tbl-button {
    padding: 4px 9px;
    border: 1px solid #ddd;
    background: #fff;
  }

  .tbl-pagination .tbl-button.is-active {
    background: #222;
    border: 1px solid #222;
    color: #fff;
  }

  .tbl-pagination .tbl-button:hover {
    cursor: pointer;
    background: rgb(0, 140, 255);
    border: 1px solid rgb(0, 140, 255);
    color: #fff;
  }

  .text-center {
    text-align: center !important;
  }

  /*Modal*/
  #modal-add {
    /*padding: 0;*/
  }

  #modal-add .uk-modal-dialog {
    width: 600px;
    max-height: 100%;
  }

  #modal-add .uk-modal-body {
    height: calc(100% - 65px);
    overflow: auto;
  }

  #modal-add .uk-modal-footer {
    padding: 12px;
  }

  #modal-add .uk-modal-footer button {
    border-radius: 0;
    height: 40px;
  }

  #modal-add .uk-modal-footer button span {
    margin-right: 5px;
  }

  .uk-modal-body label {
    float: left;
    width: 20%;
    line-height: 30px;
    padding-right: 10px;
  }

  .uk-modal-body input,
  .uk-modal-body textarea {
    float: left;
    width: calc(80% - 25px);
  }

  .uk-modal-body .form-group > span {
    float: left;
    width: 25px;
    line-height: 30px;
    text-align: right;
    font-size: 15px;
    cursor: pointer;
  }

  .uk-modal-body .form-group > span:hover {
    opacity: 0.9;
  }

  .uk-input {
    height: 30px;
  }
</style>
