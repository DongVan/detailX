<template>
  <div class="container">
    <h1>HOME</h1>
    <br/>
    <div>
      <div class="form-group">
        <router-link tag="a" to="/add">
          <button class="btn btn-primary">Tạo mới</button>
        </router-link>
      </div>
      <div class="form-group">
        <select v-model="column">
          <option value="">Tất cả</option>
          <option v-for="col in thead" :key="col.record" :value="col.record">{{ col.title }}</option>
        </select>
        <input type="text" class="uk-input uk-search-row" v-model="search"/>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th v-for="d in thead" @click="tSort($event, d.record, 'number')" class="fa fa-sort" v-if="d=='id'">
            {{d.title}}
            <i></i></th>
          <th v-for="d in thead" @click="tSort($event, d.record, 'string')" class="sorting" v-if="d!='id'">{{d.title}}
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
            <span class="fa fa-pencil"></span>
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
  </div>
</template>

<script>
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
    var data = [
        {'id': 1, 'name': 'Khach hang 1', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 2, 'name': 'Khach hang 2', 'phone': '032346548', 'email': 'dong@gmail.com'},
        {'id': 3, 'name': 'Khach hang 3', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 4, 'name': 'Khach hang 4', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 5, 'name': 'Khach hang 5', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 6, 'name': 'Khach hang 6', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 7, 'name': 'Khach hang 7', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 8, 'name': 'Khach hang 8', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 9, 'name': 'Khach hang 9', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 10, 'name': 'Khach hang 10', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 11, 'name': 'Khach hang 11', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 12, 'name': 'Khach hang 12', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 13, 'name': 'Khach hang 13', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 14, 'name': 'Khach hang 14', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 15, 'name': 'Khach hang 15', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 16, 'name': 'Khach hang 16', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 17, 'name': 'Khach hang 17', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 18, 'name': 'Khach hang 18', 'phone': '0123456987', 'email': 'dong@gmail.com'},
        {'id': 19, 'name': 'Khach hang 19', 'phone': '0123456987', 'email': 'dong@gmail.com'}
    ];
    export default {
        mixins: [myMixi],
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
                    e.find('i').removeClass().addClass('fa fa-sort-asc');
                    this.customers = this.tOrder(this.customers, type, field, 'asc');
                    this.order = 'asc';
                } else if (e.hasClass('sorting-asc')) {
                    e.parents('table').find('thead tr th').removeClass().addClass('sorting');
                    e.removeClass().addClass('sorting-desc');
                    e.parents('table').find('thead tr th i').removeClass().addClass('fa fa-sort');
                    e.find('i').removeClass().addClass('fa fa-sort-desc');
                    this.customers = this.tOrder(this.customers, type, field, 'desc');
                    this.order = 'desc';
                } else {
                    e.parents('table').find('thead tr th').removeClass().addClass('sorting');
                    e.removeClass().addClass('sorting-asc');
                    e.parents('table').find('thead tr th i').removeClass().addClass('fa fa-sort');
                    e.find('i').removeClass().addClass('fa fa-sort-asc');
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
  select{
    height: 26px;
  }

  table {
    border: 1px solid #ddd;
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
