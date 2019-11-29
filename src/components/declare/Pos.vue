<template>
  <div class="wrapper">
    <div class="menu">
      <div class="btn-menu">
        <span class="fa fa-bars"></span>
      </div>
    </div>
    <div class="desktop">
      <div class="header-box">
        <div class="left">
          <div class="tab-order uk-inline">
            <div v-for="(tab, index) in tabs" :key="index" @click="selectOrder($event, index)" class="tab">
              <div class="left">
                <span v-if="tab.type=='mini'">{{tab.id}}</span>
                <span v-if="tab.type=='normal'">{{tab.name}}</span>
              </div>
              <div class="right">
                <span v-if="tab.type=='normal'" class="fa fa-times-circle" @click="removeTab"></span>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="uk-inline">
            <button class="uk-button uk-button-primary" @click="newTab"><span uk-icon="plus"></span></button>
          </div>
        </div>
        <div class="right">
          <div class="uk-inline">
            <button class="uk-button uk-button-danger" title="Tạo mới khách hàng" @click="openAddCustomer"><span uk-icon="user"></span></button>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="body-box">
        <div class="item" v-for="(record, index) in order" :key="index">
          <div class="photo">
            <img :src="base_url + record['options'].photo" :alt="record.name"/>
            <div class="qty">
              <span class="uk-badge">{{record.qty}}</span>
            </div>
          </div>
          <div class="name">{{record.name}}</div>
          <div class="price">{{formatNumber(record.price)}}</div>
          <div class="remove" @click="removeProduct(index)">
            <span class="fa fa-times-circle"></span>
          </div>
        </div>
      </div>
      <div class="payment-box">
        <div class="transaction">
          <div class="col-xs-6">
            <div class="left"><b>Items</b></div>
            <div class="right cl-orangered"><b>{{getItems}}</b></div>
          </div>
          <div class="col-xs-6">
            <div class="left"><b>Total</b></div>
            <div class="right  cl-orangered"><b>{{formatNumber(getSubtotal)}}</b></div>
          </div>
          <div class="col-xs-6">
            <div class="left"><b>Order Tax</b></div>
            <div class="right  cl-orangered"><b>0</b></div>
          </div>
          <div class="col-xs-6">
            <div class="left"><b>Discount</b></div>
            <div class="right  cl-orangered"><b>0</b></div>
          </div>
          <div class="col-xs-12">
            <div class="left">Total Order</div>
            <div class="right">{{formatNumber(getSubtotal)}}</div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="buttons">
          <div class="col-xs-6">
            <div class="col-xs-12">
              <button class="uk-button uk-button-default"><span class="fa fa-user-circle"></span> Chọn khách hàng</button>
            </div>
            <div class="col-xs-12">
              <button class="uk-button uk-button-default">Hủy</button>
            </div>
          </div>
          <div class="col-xs-6">
            <button class="uk-button uk-button-default" @click="openPaymentModal">PAYMENT</button>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="items">
      <div class="header-box">
        <div class="uk-inline uk-cat">
          <select class="uk-select">
            <option value="">Danh mục</option>
            <option value="">Tên</option>
            <option value="">Mã</option>
          </select>
        </div>
        <div class="uk-inline uk-sub">
          <select class="uk-select">
            <option value="">Danh mục con</option>
            <option value="">Tên</option>
            <option value="">Mã</option>
          </select>
        </div>
        <div class="uk-inline uk-search right">
          <span class="uk-form-icon" uk-icon="search"></span>
          <input class="uk-input" type="text" @input="filterProduct($event)">
        </div>
        <div class="clear"></div>
      </div>
      <div class="list-items">
        <div class="item" v-for="(product, index) in actionProduct" :key="index">
          <div class="photo uk-flex uk-flex-middle uk-cover-container" :title="product.name" @click="selectProduct(index)">
            <img :src="base_url + product.photo" :alt="product.name" class="uk-img"/>
            <div class="photo-hover">
              <span class="fa fa-plus-circle"></span>
            </div>
          </div>
          <div class="content">
            <p>{{product.name}}</p>
            <div>
              <p class="left">{{formatNumber(product.price)}}</p>
              <p class="right">Kho: {{formatNumber(product.stock)}}</p>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>

    <div class="modals-box">
      <div id="modal-customer" uk-modal>
        <div class="uk-modal-dialog">
          <div class="uk-modal-body">
            <button class="uk-modal-close-outside" type="button" uk-close></button>
            <div class="form-group">
              <h3><b>TẠO NHANH KHÁCH HÀNG</b></h3>
            </div>

            <div class="form-group">
              <label>Họ tên</label>
              <input type="text" class="uk-input"/>
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input type="text" class="uk-input"/>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="uk-input"/>
            </div>
            <div class="form-group">
              <label>Địa chỉ</label>
              <input type="text" class="uk-input"/>
            </div>
          </div>
          <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Hủy</button>
            <button class="uk-button uk-button-primary" type="button">Lưu</button>
          </div>
        </div>
      </div>

      <div id="modal-payment" uk-modal>
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-outside" type="button" uk-close></button>
          <div class="uk-modal-body">
            <h3><b>THANH TOÁN</b> <span class="right"><button class="uk-button uk-button-primary"><span class="fa fa-shopping-cart"></span> Thoán toán</button></span></h3>
            <div>
              <ul class="uk-tab" data-uk-tab="{connect:'#my-id'}">
                <li><a href="">Tiền mặt</a></li>
                <li><a href="">Thẻ</a></li>
                <li><a href="">Voucher</a></li>
              </ul>
              <ul id="my-id" class="uk-switcher uk-margin">
                <li>
                  <input type="text" class="uk-input" placeholder="Cash"/>
                </li>
                <li>
                  <input type="text" class="uk-input" placeholder="Credit Card"/>
                </li>
                <li>
                  <input type="text" class="uk-input" placeholder="Voucher"/>
                </li>
              </ul>
            </div>

            <div class="left">
              <div class="payment-order">
                <div class="form-group">
                  <div class="left">Total</div>
                  <div class="right">0</div>
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <div class="left">Cash</div>
                  <div class="right">0</div>
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <div class="left">Credit Card</div>
                  <div class="right">0</div>
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <div class="left">Voucher</div>
                  <div class="right">0</div>
                  <div class="clear"></div>
                </div>
                <div>
                  <div class="left">Discount</div>
                  <div class="right">0</div>
                  <div class="clear"></div>
                </div>
              </div>
              <div class="charge">
                <div class="left">Charge</div>
                <div class="right">0</div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="right">
              <div class="payment-calc">
                <table class="table table-bordered">
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>00</td>
                    <td>0</td>
                    <td><span class="fa fa-backspace"></span></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    var mixins = {
        methods: {
            formatCurrency(price, currency) {
                var number = price;
                switch (currency) {
                    case 'VND':
                        number = parseFloat(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ';
                        break;
                    case 'JPY':
                        number = parseFloat(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '¥';
                        break;
                    case 'EUR':
                        number = '€' + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '';
                        break;
                    case 'GBP':
                        number = '£' + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '';
                        break;
                    default:
                        number = '$' + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                }
                return number;
            },
            formatCurrency2(price, currency) {
                var number = price;
                switch (currency) {
                    case 'VND':
                        number = parseFloat(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                    case 'JPY':
                        number = parseFloat(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                    case 'EUR':
                        number = parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                    case 'GBP':
                        number = parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                    default:
                        number = parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        break;
                }
                return number;
            },
            formatNumber(number) {
                return parseFloat(number).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            },
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
        mixins: [mixins],
        data() {
            return {
                base_url: 'http://localhost:4000/',
                tabs: [{'id': 1, 'type': 'normal', 'name': 'Đơn hàng 1'}],
                currentIndex: 0, // current orrder
                products: [
                    {
                        'id': 1,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Bia Budweiser 500 ml',
                        'price': 15000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/1.jpg',
                        'stock': 100
                    },
                    {
                        'id': 2,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Strongbow dau de 330 ml',
                        'price': 20000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/2.jpg',
                        'stock': 5
                    },
                    {
                        'id': 3,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon bia Budweiser 330 ml',
                        'price': 300000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/3.jpg',
                        'stock': 5
                    },
                    {
                        'id': 4,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon bia Heineken 330 ml',
                        'price': 330000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/4.jpg',
                        'stock': 56
                    },
                    {
                        'id': 5,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon bia Heineken sleek 330 ml',
                        'price': 410000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/5.jpg',
                        'stock': 15
                    },
                    {
                        'id': 6,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon bia Sapporo 330 ml',
                        'price': 250000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/6.jpg',
                        'stock': 3
                    },
                    {
                        'id': 7,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon Strongbow dâu 330 ml',
                        'price': 198000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/7.jpg',
                        'stock': 23
                    },
                    {
                        'id': 8,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon Strongbow hoa eldeer 330 ml',
                        'price': 198000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/8.jpg',
                        'stock': 3
                    },
                    {
                        'id': 9,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon Strongbow mật ong 330 ml',
                        'price': 198000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/9.jpg',
                        'stock': 8
                    },
                    {
                        'id': 10,
                        'cat_id': 1,
                        'sub_id': 1,
                        'cat_name': 'Đồ uống',
                        'sub_name': 'Bia',
                        'name': 'Thùng 24 lon Strongbow táo 350 ml',
                        'price': 210000,
                        'currency': 'VND',
                        'photo': 'public/image/beer/9.jpg',
                        'stock': 14
                    },
                ],
                orders: [[]],
                order: [],
                search: ''
            }
        },
        computed: {
            getItems() {
                var cart = this.order;
                var count = 0;
                if (cart && Object.keys(cart).length > 0) {
                    cart.forEach(function (record) {
                        count += parseInt(record.qty);
                    });
                }
                return count;
            },
            getSubtotal() {
                var cart = this.order;
                var total = 0;
                if (cart && Object.keys(cart).length > 0) {
                    cart.forEach(function (record) {
                        total += parseFloat(record.price) * parseInt(record.qty);
                    });
                }
                return total;
            },
            actionProduct() {
                if (!this.products.length) {
                    return [];
                }
                return this.products.filter(item => {
                    let props = [item['name']];
                    return props.some(prop => !this.search || ((typeof prop === 'string') ? this.convertString(prop).includes(this.convertString(this.search)) : this.convertString(prop).includes(this.convertString(this.search))));
                })
            }
        },
        watch: {
            currentIndex(index) {
                this.order = this.orders[index];
            },
            order(data) {
                var currentIndex = this.currentIndex;
                if (currentIndex && this.orders && Object.keys(this.orders).length > 0) {
                    this.orders[currentIndex] = data;
                }
            }
        },
        methods: {
            filterProduct(e) {
                this.search = e.target.value;
            },
            selectProduct(index) {
                if (index >= 0) {
                    var product = this.products[index];
                    var product_id = product['id'];
                    var cart = this.order;
                    var tmp = [];
                    var checkAddItem = false;
                    if (Object.keys(cart).length == 0) {
                        checkAddItem = true;
                    } else {
                        cart.forEach(function (arr) {
                            tmp.push(arr['id']);
                        });
                        // Cap nhat san pham moi trong cart
                        if (tmp.indexOf(product_id) != -1) {
                            var i = tmp.indexOf(product_id);
                            let qty = parseInt(cart[i]['qty']);
                            cart[i]['qty'] = qty + 1;
                        } else {
                            checkAddItem = true;
                        }
                    }
                    // Them moi product vao cart
                    if (checkAddItem) {
                        tmp.push(product_id);
                        cart.push({
                            'id': product_id,
                            'name': product['name'],
                            'qty': 1,
                            'price': product['price'],
                            'options': product
                        });
                    }
                    this.order = cart;
                }
            },
            removeProduct(index) {
                if (index >= 0) {
                    var cart = this.order;
                    if (cart && cart[index]) {
                        cart.splice(index, 1);
                    }

                    this.order = cart;
                }
            },
            newTab() {
                if (this.tabs && Object.keys(this.tabs).length > 0 && Object.keys(this.tabs).length < 7) {
                    var dtIndex = this.tabs[this.tabs.length - 1]['id'];
                    this.tabs.forEach(function (record) {
                        record['type'] = 'mini';
                    });
                    this.tabs.push({'id': dtIndex + 1, 'type': 'normal', 'name': 'Đơn hàng ' + parseInt(dtIndex + 1)});
                    this.orders.push([]); // them 1 order moi vao orders
                    let length = this.orders.length;
                    this.currentIndex = length - 1;
                    // Change Class
                    var el = $('.tab-order');
                    el.find('.tab').addClass('mini-tab');
                }
            },
            selectOrder(e, index) {
                if (this.orders && Object.keys(this.orders).length > index) {
                    this.currentIndex = index;
                    // Change layout
                    var current_el = $(e.currentTarget);
                    var el = $('.tab-order');
                    // Change type
                    this.tabs.forEach(function (record) {
                        record['type'] = 'mini';
                    });
                    this.tabs[this.currentIndex]['type'] = 'normal';
                    // Change class
                    el.find('.tab').addClass('mini-tab');
                    current_el.removeClass('mini-tab');
                }
            },
            removeTab() {
                var index = this.currentIndex;
                var count = Object.keys(this.tabs).length;
                if (index == 0 && count == 1) {
                    this.order = [];
                    this.tabs[0] = {'id': 1, 'type': 'normal', 'name': 'Đơn hàng 1'};
                } else {
                    if (count > index) {
                        this.tabs.splice(index, 1);
                        this.orders.splice(index, 1);

                        // Change value currentIndex
                        if (index == 0) {
                            this.currentIndex = 0;
                        }
                        if (index > 0) {
                            this.currentIndex = index - 1;
                            this.tabs[this.currentIndex]['type'] = 'normal';
                            $('.tab:nth-child(' + index + ')').removeClass('mini-tab');
                        }

                        if (Object.keys(this.tabs).length == 1) {
                            this.tabs[0]['type'] = 'normal';
                            $('.tab').removeClass('mini-tab');
                        }
                    }
                }
            },

            //Modal
            openAddCustomer() {
                UIkit.modal('#modal-customer').show();
            },
            openPaymentModal() {
                UIkit.modal('#modal-payment').show();
            },
        }
    }
</script>

<style scoped>
  /* width */
  ::-webkit-scrollbar {
    width: 0px !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /*background: #f1f1f1;*/
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

  .wrapper {
    height: 100%;
    border: 1px solid green;
  }

  .wrapper .menu {
    float: left;
    width: 50px;
    height: 100%;
    border-right: 1px solid green;
    text-align: center;
  }

  .wrapper .menu .btn-menu {
    display: block;
    text-align: center;
    font-size: 26px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    border-bottom: 1px solid green;
    color: green;
  }

  .wrapper .menu .btn-menu:hover {
    background: green;
    color: #fff;
    border: green;
  }

  .wrapper .desktop {
    float: left;
    width: 30%;
    height: 100%;
    border-right: 1px solid green;
  }

  .wrapper .desktop .header-box {
    float: left;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid green;
    padding: 5px;
  }

  .wrapper .desktop .header-box button {
    width: 40px;
    text-align: center;
    padding: 0;
    border: 0;
    margin-top: 1px;
  }

  .wrapper .desktop .header-box button.uk-button-danger {
    float: right;
  }

  .wrapper .desktop .header-box .tab-order {
    height: 40px;
  }

  .wrapper .desktop .header-box .tab-order .tab {
    display: inline-block;
    width: 110px;
    background: #ad75a8;
    color: #fff;
    height: 40px;
    line-height: 40px;
    border: 1px solid #fff;
    padding: 0 5px;
    cursor: pointer;
  }

  .wrapper .desktop .header-box .tab-order .tab .right {
    line-height: 40px;
  }

  .wrapper .desktop .header-box .tab-order .tab .right span {
    color: #eee;
  }

  .wrapper .desktop .header-box .tab-order .tab .right span:hover {
    color: #333;
  }

  .wrapper .desktop .header-box .tab-order .tab.mini-tab {
    display: inline-block;
    width: 30px;
    border: 1px solid #fff;
    background: #999;
    text-align: center;
  }

  .wrapper .desktop .uk-customer,
  .wrapper .desktop .uk-scan {
    display: inline-block;
    width: 100%;
    height: 40px;
    border: 1px solid #fff;
    margin-bottom: 5px;
  }

  .wrapper .desktop .uk-customer > div,
  .wrapper .desktop .uk-scan > div {
    width: 100%;
  }

  .wrapper .desktop .uk-customer > div span:hover {
    background: #000;
  }

  .wrapper .desktop .uk-customer input,
  .wrapper .desktop .uk-scan input {
    width: 100%;
    border: 1px solid #999;
  }

  .wrapper .desktop .body-box {
    clear: both;
    height: calc(100% - 228px);
    overflow: auto;
  }

  .wrapper .desktop .body-box .item {
    height: 70px;
    border-bottom: 1px dotted #ccc;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .wrapper .desktop .body-box .item > div {
    display: inline-block;
  }

  .wrapper .desktop .body-box .item:last-child {
    border-bottom: unset;
  }

  .wrapper .desktop .body-box .item .photo {
    position: relative;
    width: 60px;
    margin-right: 20px;
  }

  .wrapper .desktop .body-box .item .photo img {
    max-width: 50px;
    max-height: 50px;
  }

  .wrapper .desktop .body-box .item .photo .qty {
    position: absolute;
    top: 0;
    right: 0;
  }

  .wrapper .desktop .body-box .item .photo .qty span.uk-badge {
    font-size: 11px;
    line-height: 22px;
  }

  .wrapper .desktop .body-box .item .name {
    width: calc(100% - 220px);
  }

  .wrapper .desktop .body-box .item .price {
    width: 100px;
    text-align: right;
  }

  .wrapper .desktop .body-box .item .remove {
    text-align: right;
    width: 35px;
    height: 50px;
    line-height: 54px;
  }

  .wrapper .desktop .body-box .item .remove span {
    font-size: 18px;
    color: #777;
  }

  .wrapper .desktop .body-box .item .remove span:hover {
    cursor: pointer;
    color: #000;
  }

  .wrapper .desktop .payment-box {
    height: 150px;
    border-top: 1px solid green;
  }

  .wrapper .desktop .payment-box .transaction {
    border-bottom: 1px solid green;
  }

  .wrapper .desktop .payment-box .transaction > div.col-xs-6 {
    padding: 4px 8px;
  }

  .wrapper .desktop .payment-box .transaction > div.col-xs-12 {
    padding: 10px 8px;
    background: #000;
    color: #fff;
    font-weight: bold;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-12,
  .wrapper .desktop .payment-box .buttons .col-xs-7,
  .wrapper .desktop .payment-box .buttons .col-xs-6,
  .wrapper .desktop .payment-box .buttons .col-xs-5 {
    padding: 0;
  }

  .wrapper .desktop .payment-box .buttons button {
    height: 40px !important;
    color: #fff;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-12:first-child button {
    background: #ff484b;
    border-color: #ff484b;
    text-transform: unset;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-12:first-child button:hover {
    background: #bb3537;
    border-color: #bb3537;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-12:nth-child(2) button {
    background: orange;
    border-color: orange;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-12:nth-child(2) button:hover {
    background: #b67600;
    border-color: #b67600;
  }

  .wrapper .desktop .payment-box .buttons .col-xs-6 > button {
    height: 80px !important;
    background: #32d296;
    border-color: #32d296;
  }
  .wrapper .desktop .payment-box .buttons .col-xs-6 > button:hover {
    height: 80px;
    background: #2bb380;
    border-color: #2bb380;
  }

  .wrapper .desktop .payment-box .buttons .uk-button {
    width: 100%;
    height: 50%;
  }

  .wrapper .items {
    float: left;
    width: calc(70% - 50px);
    height: 100%;
    background: #eee;
  }

  .wrapper .items .header-box {
    width: 100%;
    height: 50px;
    padding: 5px;
    border-bottom: 1px solid green;
    background: #fff;
  }

  .wrapper .items .header-box .uk-cat {
    width: 200px;
  }

  .wrapper .items .header-box .uk-select,
  .wrapper .items .header-box .uk-input {
    border: 1px solid #999;
  }

  .wrapper .items .header-box .uk-sub {
    width: 200px;

  }

  .wrapper .items .header-box .uk-search {
    width: calc(100% - 420px);
  }

  .wrapper .items .list-items {
    overflow: auto;
    height: calc(100% - 50px);
    background: #eee;
    padding: 10px;
  }

  .wrapper .items .list-items .item {
    position: relative;
    display: inline-block;
    width: 165px;
    height: 215px;
    border: 1px solid #eee;
    background: #fff;
    margin: 5px;
    -webkit-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.03);
    -moz-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.03);
    box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.03);
  }

  .wrapper .items .list-items .item .photo {
    width: 100%;
    height: 150px;
    max-width: unset;
    text-align: center;
    background: #fff;
    cursor: pointer;
  }

  .wrapper .items .list-items .item .photo:hover .photo-hover {
    display: flex;
  }

  .wrapper .items .list-items .item .photo img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .wrapper .items .list-items .item .photo-hover {
    display: none;
    position: absolute;
    top: 0;
    height: 150px;
    width: 100%;
    background: rgba(12, 148, 214, 0.3);
    color: #fff;
    align-items: center;
    margin-left: -10px;
  }

  .wrapper .items .list-items .item .photo-hover span {
    margin: auto;
    font-size: 35px;
  }

  .wrapper .items .list-items .item .content {
    padding: 5px 8px;
  }

  .wrapper .items .list-items .item .content p {
    margin: 0 0 5px 0;
    text-align: center;
  }

  .wrapper .items .list-items .item .content > p:first-child {
    margin-top: 5px;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 1;
    font-weight: bold;
  }

  .wrapper .items .list-items .item .content div > p {
    margin-bottom: 0;
  }

  .wrapper .items .list-items .item .content > div > p:first-child {
    color: orangered;
  }

  .wrapper .items .list-items .item .content > div > .right {
    color: grey;
  }

  #modal-customer .uk-modal-dialog {
    width: 500px !important;
  }

  #modal-payment .uk-modal-dialog {
    width: 700px !important;
    height: 100%;
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .left .payment-order {
    width: 200px;
    background: #ccc;
    padding: 20px 10px 50px 10px;
    margin-bottom: 20px;
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .right {
    width: calc(100% - 200px);
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .right .payment-calc {
    padding: 0 0 0 50px;
    margin-bottom: 20px;
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .right .payment-calc table {
    background: #ccc;
    border: 1px solid #999;
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .right .payment-calc table tr td {
    text-align: center;
    background: #fff;
    width: 33.3%;
    height: 74px;
    vertical-align: middle;
    font-size: 20px;
    border: 1px solid #999;
  }

  #modal-payment .uk-modal-dialog .uk-modal-body > .right .payment-calc table tr td:hover {
    background: rgb(11, 71, 110);
    color: #fff;
    cursor: pointer;
  }

  #modal-payment .uk-modal-dialog .charge {
    border: 1px solid #000;
    padding: 10px;
    font-weight: bold;
  }

  #modal-payment .uk-modal-dialog .charge:hover {
    cursor: pointer;
    background: #000;
    color: #fff;
  }

  #modal-payment .uk-modal-dialog .uk-tab {
    margin-left: -5px;
  }

  #modal-payment .uk-modal-dialog .uk-tab li {
    padding-left: 5px;
  }

  #modal-payment .uk-modal-dialog .uk-tab .uk-tab li a {
    border: 1px solid #ccc;
    padding: 5px 10px;
  }

  #modal-payment .uk-modal-dialog .uk-tab li.uk-active a {
    border: 1px solid #0b476e;
    background: #0b476e;
    color: #fff;
    padding: 5px 10px;
  }

</style>
