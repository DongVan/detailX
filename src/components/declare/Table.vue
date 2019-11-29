<template>
  <div class="wrapper">
    <div class="content">
      <div class="products-box">
        <div class="form-group title-box">
          <div class="left">
            <slot name="title"></slot>
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
            <slot name="buttons"></slot>
          </div>
          <div class="clear"></div>
        </div>
        <table class="table table-striped table-bordered">
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
          <tr v-for="(record, index) in data_current" :key=record.id>
            <td v-for="d in thead">
              {{tRender(d.record, record[d.record])}}
            </td>
            <td>
              <span class="fa fa-eye" @click="actionSelect(index, 'view')" v-if="showButton('view')"></span>
              <span class="fa fa-pen" @click="actionSelect(index, 'edit')" v-if="showButton('edit')"></span>
              <span class="fa fa-trash" @click="actionSelect(index, 'remove')" v-if="showButton('remove')"></span>
            </td>
          </tr>
          <tr class="text-center" v-show="!data_current || data_current.length == 0">
            <td class="text-center" :colspan="thead.length + 1">Empty</td>
          </tr>
          </tbody>
        </table>
        <div>
          <div class="left">
            Hiển thị {{table_index * table_rows + 1}} đến {{(table_index + 1) * table_rows < countRecord ? (table_index + 1) * table_rows : countRecord}} của {{countRecord}} mục
          </div>
          <div class="right tbl-pagination">
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
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
    var myMixi = {
        data() {
            return {
                'message': 'HelloWorld !'
            }
        },
        created() {
            var window_size = $(window).width();
            if (window_size > 1520) {
                this.table_rows = 15;
            } else if (window_size >= 1380 && window_size <= 1520) {
                this.table_rows = 12;
            } else {
                this.table_rows = 10;
            }
        }
    };
    export default {
        mixins: [myMixi],
        data() {
            return {
                fix_customers: [],
                customers: [],
                thead: [],
                buttons: [],
                data_current: [],
                table_index: 0,
                table_max: 0,
                table_rows: 10,
                order: 'desc',
                field: '',
                filter: [],
                search: '',
                column: '',
                selected: []
            }
        },
        props: ['fixCustomers', 'tHead', 'tButtons'],
        watch: {
            fixCustomers(value) {
                this.fix_customers = value;
                this.customers = value;
            },
            fix_customers(value) {
                this.customers = value;
            },
            customers() {
                this.processingData();
            },
            tHead(value) {
                this.thead = value;
            },
            table_index() {
                this.processingData();
            },
            search() {
                this.table_index = 0;
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
            },
            countRecord() {
                return Object.keys(this.customers).length;
            }
        },
        methods: {
            showButton(type) {
                var buttons = this.buttons;
                if (buttons.indexOf(type) != -1) {
                    return true;
                }
                return false;
            },
            alertNotify(type, message, time) {
                return UIkit.notification({
                    message: message,
                    status: type,
                    pos: 'top-right',
                    timeout: time
                });
            },
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
            onClickPage(index) {
                this.table_index = index;
            },
            prevPage() {
                this.table_index = this.table_index > 0 && this.table_index - 1;
            },
            nextPage() {
                if (this.table_index < this.table_max - 1 && this.table_max > 0) {
                    this.table_index = this.table_index + 1;
                }
            },
            // table render
            tRender(record, value) {
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
            actionSelect(index, type) {
                var data = this.customers;
                var record = this.data_current;
                var selected = [];
                var dataIndex = 0;
                if (Object.keys(record).length > 0 && index < Object.keys(record).length) {
                    dataIndex = this.table_index * this.table_rows + index;
                    selected.push(data[dataIndex]);
                }
                this.selected = selected;
                // Emit data
                this.$emit('sendData', this.selected, type);
            }
        },
        created() {
            this.fix_customers = this.fixCustomers;
            this.customers = this.fixCustomers;
            this.thead = this.tHead;
            this.buttons = this.tButtons;
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

  .wrapper .content .products-box .title-box input[type=text],
  .wrapper .content .products-box .title-box select {
    height: 34px;
    padding: 5px;
  }

  .wrapper .content .products-box .title-box input[type=text] {
    width: 200px;
  }

  .wrapper .content .products-box .title-box button {
    border-radius: 0;
  }

  table {
    border: 1px solid #ddd;
    background: #fff;
    font-size: small;
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
    padding: 5px;
    background: #fff;
    font-size: 12px;
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
