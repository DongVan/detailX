<template>
  <div class="wrapper">
    <nav-header></nav-header>
    <nav-left-menu></nav-left-menu>
    <div class="content in">
      <div class="products-box">
        <tbl-table :fixCustomers="fixCustomers" :fixTHead="fixTHead" :tHead="tHead" :tButtons="['edit', 'remove']" @sendData="receiptData">
          <h3 slot="title">
            <b>KHO</b>
          </h3>
          <div class="uk-inline" slot="buttons">
            <button class="btn btn-danger" title="Tạo mới sản phẩm" @click="open_add_modal" uk-tooltip>
              <span class="fa fa-plus-circle"></span>&nbsp; Tạo mới
            </button>
            <div class="uk-inline" title="Import data" uk-tooltip>
              <button class="btn btn-primary"><span class="fa fa-upload"></span>&nbsp; Import</button>
            </div>
            <div class="uk-inline" title="Xuất ra file excel" uk-tooltip>
              <button class="btn btn-success"><span class="fa fa-file-excel"></span>&nbsp; Excel</button>
            </div>
            <div class="uk-inline menu-list">
              <button class="btn btn-info" title="Hiển thị" uk-tooltip><span class="fa fa-table"></span>&nbsp; <span uk-icon="icon: chevron-down; ratio: 0.7"></span></button>
              <div uk-dropdown="mode: click">
                <div class="col-xs-6" v-for="record in fixTHead">
                  <div>
                    <input type="checkbox" class="uk-checkbox" :checked="record.checked" @click="showColumn(record.record, record.checked)"/> {{record.title}}
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </tbl-table>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
    <div class="uk-modals">
      <div id="modal-add" uk-modal="bg-close: false">
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-outside" type="button" uk-close></button>
          <div class="uk-modal-body">
            <h3><b>TẠO MỚI</b></h3>
            <form>
              <div class="form-group">
                <label>Mã <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataAdd['code']" required/>
                <span class="fa fa-question-circle" title="Mã là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Tên <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataAdd['name']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Số điện thoại </label>
                <input type="text" class="uk-input" v-model="dataAdd['phone']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Email </label>
                <input type="text" class="uk-input" v-model="dataAdd['email']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Địa chỉ </label>
                <input type="text" class="uk-input" v-model="dataAdd['address']" required/>
                <span class="fa fa-question-circle" title="Địa chỉ là vị trí, địa chỉ của store" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Diễn giải</label>
                <textarea class="uk-textarea" v-model="dataAdd['description']" rows="5"></textarea>
                <span class="fa fa-question-circle" title="Diễn giải là những thông tin khác liên quan đến cửa hàng" pos="right" uk-tooltip></span>
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

      <div id="modal-update" uk-modal="bg-close: false">
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-outside" type="button" uk-close></button>
          <div class="uk-modal-body">
            <h3 class="left">
              <b>CẬP NHẬT</b></h3>
            <!--            <div class="right quick-views">-->
            <!--              <span class="fa fa-chevron-left" @click="quickPrevious" title="Quay lại" uk-tooltip></span>-->
            <!--              <span class="fa fa-chevron-right" @click="quickNext" title="Tiếp theo" uk-tooltip></span>-->
            <!--            </div>-->
            <div class="clear"></div>
            <form>
              <div class="form-group">
                <label>Mã <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataUpdate['code']" required/>
                <span class="fa fa-question-circle" title="Mã là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Tên <span class="cl-red">*</span></label>
                <input type="text" class="uk-input" v-model="dataUpdate['name']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Số điện thoại </label>
                <input type="text" class="uk-input" v-model="dataUpdate['phone']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Email </label>
                <input type="text" class="uk-input" v-model="dataUpdate['email']" required/>
                <span class="fa fa-question-circle" title="Tên là mã của cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Địa chỉ </label>
                <input type="text" class="uk-input" v-model="dataUpdate['address']" required/>
                <span class="fa fa-question-circle" title="Địa chỉ là vị trí, địa chỉ của store" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
              <div class="form-group">
                <label>Diễn giải</label>
                <textarea class="uk-textarea" v-model="dataUpdate['description']" rows="5"></textarea>
                <span class="fa fa-question-circle" title="Diễn giải là những thông tin khác liên quan đến cửa hàng" pos="right" uk-tooltip></span>
                <div class="clear"></div>
              </div>
            </form>
          </div>
          <div class="uk-modal-footer text-center">
            <button type="submit" class="btn btn-success" @click="submitUpdateForm($event)"><span class="fa fa-save"></span> Lưu</button>
            <button type="submit" class="btn btn-success"><span class="fa fa-save"></span> Lưu và cập nhật</button>
            <button type="button" class="btn btn-default uk-modal-close"><span class="fa fa-times-circle"></span> Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from './Header'
    import LeftMenu from './LeftMenu'
    import Table from './Table'

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
    var thead = [
        {'title': 'ID', 'record': 'id', 'checked': true, 'filter': ''},
        {'title': 'Tên', 'record': 'name', 'checked': true, 'filter': ''},
        {'title': 'Số điện thoại', 'record': 'phone', 'checked': true, 'filter': ''},
        {'title': 'Email', 'record': 'email', 'checked': true, 'filter': ''},
        {'title': 'Địa chỉ', 'record': 'address', 'checked': true, 'filter': ''}
    ];
    export default {
        components: {'nav-header': Header, 'nav-left-menu': LeftMenu, 'tbl-table': Table},
        data() {
            return {
                fixCustomers: [],
                fixTHead: [],
                tHead: [],
                dataIndex: 0,
                selected: [],
                // Form data
                dataAdd: {
                    'id': '', 'code': '', 'name': '', 'phone': '', 'email': '', 'description': '', 'address': ''
                },
                dataUpdate: {
                    'id': '', 'code': '', 'name': '', 'phone': '', 'email': '', 'description': '', 'address': ''
                }
            }
        },
        methods: {
            receiptData(data, type, index) {
                if (type == 'edit' && data && Object.keys(data).length > 0) {
                    this.open_update_modal(data[0]);
                }

                if (type == 'remove' && data && Object.keys(data).length > 0) {
                    var id = data[0]['id'];
                    this.removeData(id);
                }
            },
            open_add_modal() {
                UIkit.modal('#modal-add').show();
            },
            submitAddForm() {
                var data = this.fixCustomers;
                var form = this.dataAdd;
                var id = 1;
                if (Object.keys(data).length > 0) {
                    id = parseInt(data[Object.keys(data).length - 1]['id']) + 1;
                }
                if (form['code'] != '' && form['name'] != '') {
                    data.push({'id': id, 'name': form['name'], 'code': form['code'], 'phone': form['phone'], 'email': form['email']});
                    UIkit.modal('#modal-add').hide();
                } else {
                    this.alertNotify('danger', 'Các trường đánh dấu * không được để trống.', 3500);
                }
                this.fixCustomers = data;
            },
            open_update_modal(data) {
                if (data && Object.keys(data).length > 0) {
                    this.selected = data;
                    this.dataUpdate = data;
                    UIkit.modal('#modal-update').show();
                }
            },
            submitUpdateForm() {
                var data = this.fixCustomers;
                var form = this.dataUpdate;
                var id = 0;
                var tmp = [];
                if (form['code'] != '' && form['name'] != '') {
                    id = form['id'];
                    tmp = {'id': id, 'name': form['name'], 'code': form['code'], 'phone': form['phone'], 'email': form['email']};
                    data.forEach((record) => {
                        if (record.id == id) {
                            record = tmp;
                        }
                    });
                    // this.fixCustomers = data;
                    UIkit.modal('#modal-update').hide();
                } else {
                    this.alertNotify('danger', 'Các trường đánh dấu * không được để trống.', 3500);
                }
            },
            removeData(id) {
                var data = this.fixCustomers;
                if (data && Object.keys(data).length > 0) {
                    UIkit.modal.confirm('Bạn có chắc chắn muốn xóa?').then(() => {
                        data.forEach((record, index) => {
                            if (record['id'] == id) {
                                data.splice(index, 1);
                                this.alertNotify('success', 'Thành công!', 3500);
                            }
                        });
                    });
                }
            },
            alertNotify(type, message, time) {
                return UIkit.notification({
                    message: message,
                    status: type,
                    pos: 'top-right',
                    timeout: time
                });
            },
            showColumn(record, checked) {
                var data = this.fixTHead;
                var thead = [];
                if (data && Object.keys(data).length > 0) {
                    data.forEach((value) => {
                        if (value['record'] == record) {
                            value['checked'] = !checked;
                        }
                        if (value['checked'] == true) {
                            thead.push(value);
                        }
                    });
                    this.tHead = thead;
                }
            }
        },
        created() {
            this.fixCustomers = data;
            this.fixTHead = thead;
            this.tHead = thead;
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    background: #fafafa;
  }

  .wrapper .content {
    float: left;
    width: calc(100% - 180px);
    height: calc(100% - 50px);
    overflow: auto;
  }

  .wrapper .content.in {
    width: calc(100% - 50px);
  }

  .wrapper .content .products-box {
    float: right;
    width: 100%;
    padding: 0 20px;
  }

  .wrapper .content .products-box .title-box h3 {
    margin-bottom: 0;
  }

  .wrapper .content .products-box .title-box input[type=text],
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

  .uk-modal-body h3 {
    margin-bottom: 30px;
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

  .uk-modal-body .form-group:last-child {
    margin-bottom: 0;
  }

  .uk-input {
    height: 30px;
  }

  .quick-views span {
    cursor: pointer;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background: #ddd;
  }

  .quick-views span:hover {
    cursor: pointer;
    background: #eee;
  }

  .menu-list .uk-dropdown {
    width: 350px;
    border: 1px solid #ccc;
    background: #fff;
    color: #000;
  }

  .menu-list .uk-dropdown > div.col-xs-6 > div {
    margin-bottom: 7px;
  }

  .menu-list .uk-dropdown .col-xs-6:last-child > div {
    margin-bottom: 0;
  }

  .menu-list .uk-dropdown .uk-checkbox {
    margin-top: -3px;
    border-color: #000;
    margin-right: 5px;
  }
</style>
