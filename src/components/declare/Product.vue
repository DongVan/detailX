<template>
  <div class="wrapper">
    <nav-header></nav-header>
    <div class="content">
      <div class="products-box">
        <div class="form-group title-box">
          <div class="left">
            <h3><b>SẢN PHẨM</b></h3>
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

            <router-link tag="a" to="/add">
              <button class="btn btn-danger" title="Tạo mới sản phẩm"><span class="fa fa-plus-circle"></span>&nbsp; Tạo mới</button>
            </router-link>

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
            <th v-for="d in thead" @click="tSort($event, d.record, 'number')" class="sorting" v-if="d.record=='id'">{{d.title}}
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
          <span :class="{'tbl-button': true, 'is_active': table_index == 0}" @click="onClickPage(0)">1</span>
          <span v-if="isDotFirst">...</span>
          <span v-if="isButtonNumber1" class="tbl-button" @click="onClickPage(table_index - 1)">{{table_index}}</span>
          <span v-if="isButtonNumber2" class="tbl-button is_active">{{table_index + 1}}</span>
          <span v-if="isButtonNumber3" class="tbl-button" @click="onClickPage(table_index + 1)">{{table_index + 2}}</span>
          <span v-if="isDotSecond">...</span>
          <span v-if="isMaxLength" :class="{'tbl-button': true, 'is_active': table_index + 1 == table_max}"
                @click="onClickPage(table_max - 1)">{{ table_max }}</span>
          <span class="tbl-button" @click="nextPage"><i class="fa fa-chevron-right"></i></span>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
    import Header from './Header'

    var myMixi = {
        data() {
            return {}
        },
        methods: {
            convertString(str) {
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
                    {'title': 'Họ và tên', 'record': 'name', 'filter': ''},
                    {'title': 'Số điện thoại', 'record': 'phone', 'filter': ''},
                    {'title': 'Email', 'record': 'email', 'filter': ''}
                ],
                data_current: [],
                table_index: 0,
                table_max: 0,
                table_rows: 5,
                order: '',
                field: '',
                filter: [],
                search: '',
                column: ''
            }
        },
        watch: {
            customers(value) {
                this.processingData();
            },
            table_index() {
                this.processingData();
            },
            search() {
                this.customers = this.tFilter;
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
                return this.table_index - 1 > 0;
            },
            isButtonNumber2() {
                return (this.table_index >= 1 && this.table_index < this.table_max - 1) || (this.table_index == 1);
            },
            isButtonNumber3() {
                return this.table_index < this.table_max - 2;
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
            // Processing data
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
                    this.table_max = Math.round(Object.keys(data).length / this.table_rows);
                    // Data current
                    this.data_current = tmp;
                } else {
                    this.table_max = 0;
                    this.data_current = [];
                }
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
                            value = this.convertString(value);
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

  .tbl-pagination .tbl-button.is_active {
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
</style>
