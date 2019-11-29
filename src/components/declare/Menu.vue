<template>
  <div class="wrapper">
    <nav-header></nav-header>
    <div class="box">
      <div class="container">
        <!--      <div class="menu-icon">-->
        <!--        <div class="text-center">-->
        <!--          <div class="list-item">-->
        <!--            <h3>Khai báo</h3>-->
        <!--            <div class="uk-inline" title="Cửa hàng">-->
        <!--              <router-link tag="a" to="/declare/store">-->
        <!--                <div class="item">-->
        <!--                  <img :src="base_url + 'public/image/icon/store.png'"/>-->
        <!--                </div>-->
        <!--                <p>Cửa hàng</p>-->
        <!--              </router-link>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Kho">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/warehouse.png'"/>-->
        <!--              </div>-->
        <!--              <p>Kho</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Sản phẩm">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/product.png'"/>-->
        <!--              </div>-->
        <!--              <p>Sản phẩm</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Giảm giá">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/voucher.png'"/>-->
        <!--              </div>-->
        <!--              <p>Giảm giá</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Người dùng">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/user.png?v=1'"/>-->
        <!--              </div>-->
        <!--              <p>Người dùng</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Cài đặt">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/settings.png'"/>-->
        <!--              </div>-->
        <!--              <p>Cài đặt</p>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="list-item">-->
        <!--            <h3>Triển khai</h3>-->
        <!--            <div class="uk-inline" title="POS">-->
        <!--              <router-link tag="a" to="/declare/pos">-->
        <!--                <div class="item">-->
        <!--                  <img :src="base_url + 'public/image/icon/pos.png'"/>-->
        <!--                </div>-->
        <!--                <p>Bán hàng</p>-->
        <!--              </router-link>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Giao dịch">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/transaction.png'"/>-->
        <!--              </div>-->
        <!--              <p>Giao dịch</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Khách hàng">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/customer.png?v=1'"/>-->
        <!--              </div>-->
        <!--              <p>Khách hàng</p>-->
        <!--            </div>-->
        <!--            <div class="uk-inline" title="Báo cáo">-->
        <!--              <div class="item">-->
        <!--                <img :src="base_url + 'public/image/icon/report.png'"/>-->
        <!--              </div>-->
        <!--              <p>Báo cáo</p>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->


        <div class="text-center menu-workflow">
          <div class="mRow uk-child-width-1-5 uk-text-center" uk-grid>
            <div class="menu-circle">
              <div title="Màn hình sản phẩm:
                          Cho phép khai báo các thông tin liên quan đến sản phẩm,
                          danh mục sản phẩm, thương hiệu"
                   pos="right"
                   delay="500"
                   uk-tooltip>
                <img :src="base_url + 'public/image/icon/product.png'" alt="Sản phẩm"/>
              </div>
              <p>Sản phẩm</p>
              <div class="arrow-right">
                <span class="fa fa-long-arrow-alt-right"></span>
              </div>
              <div class="menu-circle discount">
                <div
                  title="Màn hình giảm giá:
                        Cho phép khai báo các thông tin giảm giá sản phẩm, tạo voucher giảm giá cho đơn hàng"
                  pos="right"
                  delay="500"
                  uk-tooltip>
                  <router-link tag="a" to="/declare/store">
                    <img :src="base_url + 'public/image/icon/voucher.png'" alt="Giảm giá"/>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="menu-square">
              <div>
                <router-link tag="a" to="/declare/store">
                  <img :src="base_url + 'public/image/icon/clipboard.png'" alt="Phiếu nhập kho"/>
                </router-link>
              </div>
              <p>Phiếu nhập kho</p>
              <div class="arrow-right">
                <span class="fa fa-long-arrow-alt-right"></span>
              </div>
            </div>
            <div class="menu-circle">
              <div>
                <router-link tag="a" to="/declare/warehouse">
                  <img :src="base_url + 'public/image/icon/warehouse.png'" alt="Kho"/>
                </router-link>
              </div>
              <p>Kho</p>
              <div class="arrow-right">
                <span class="fa fa-long-arrow-alt-right"></span>
              </div>
              <div class="arrow-down">
                <span class="fa fa-long-arrow-alt-down"></span>
              </div>
            </div>
            <div class="menu-square">
              <div>
                <router-link tag="a" to="/declare/store">
                  <img :src="base_url + 'public/image/icon/exchange.png'" alt="Chuyển kho"/>
                </router-link>
              </div>
              <p>Chuyển kho</p>
              <div class="arrow-right">
                <span class="fa fa-long-arrow-alt-right"></span>
              </div>
            </div>
            <div class="menu-circle">
              <div>
                <router-link tag="a" to="/declare/warehouse">
                  <img :src="base_url + 'public/image/icon/warehouse.png'" alt="Kho"/>
                </router-link>
              </div>
              <p>Kho</p>
              <div></div>
            </div>
          </div>
          <div class="clear"></div>

          <div class="mRow uk-child-width-1-5 uk-text-center" uk-grid>
            <div></div>
            <div></div>
            <div class="menu-square">
              <div>
                <router-link tag="a" to="/declare/pos">
                  <img :src="base_url + 'public/image/icon/pos.png'" alt="Bán hàng"/>
                </router-link>
              </div>
              <p>Bán hàng</p>
              <div class="arrow-right">
                <span class="fa fa-long-arrow-alt-right"></span>
              </div>

              <div class="menu-circle store">
                <div>
                  <router-link tag="a" to="/declare/store">
                    <img :src="base_url + 'public/image/icon/store.png'" alt="Cửa hàng"/>
                  </router-link>
                </div>
              </div>
              <div class="menu-circle users">
                <div>
                  <router-link tag="a" to="/declare/store">
                    <img :src="base_url + 'public/image/icon/user.png'" alt="Nhân viên"/>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="menu-square">
              <div>
                <router-link tag="a" to="/declare/store">
                  <img :src="base_url + 'public/image/icon/report.png'" alt="Báo cáo"/>
                </router-link>
              </div>
              <p>Báo cáo</p>
              <div></div>
            </div>
            <div class="menu-circle">
              <div>
                <router-link tag="a" to="/declare/store">
                  <img :src="base_url + 'public/image/icon/settings.png'" alt="Cài đặt"/>
                </router-link>
              </div>
              <p>Cài đặt</p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="menu">
      <a href="#offcanvas-usage" uk-toggle>
        <span class="fa fa-bars"></span> Menu
      </a>
    </div>
    <div id="offcanvas-usage" uk-offcanvas>
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <ul uk-accordion="multiple: true">
          <li>
            <a href="#">Cửa hàng</a>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Kho</a>
            <div class="uk-accordion-content">
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Sản phẩm</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Giảm giá</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Người dùng</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Cài đặt</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">POS</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Giao dịch</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Khách hàng</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" href="#">Báo cáo</a>
            <div class="uk-accordion-content">
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="guide">
      <span class="fa fa-bookmark"></span> hướng dẫn
    </div>
  </div>
</template>

<script>
    import Header from './Header'

    export default {
        components: {'nav-header': Header},
        data() {
            return {
                base_url: 'http://localhost:4000/'
            }
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    font-size: 16px;
    /*background-image: linear-gradient(to bottom, #192be7, #2d55f0, #4d76f4, #7196f4, #98b3f0, #b3b7f0, #c9bdef, #dbc3ee, #f9acd9, #ff97aa, #ff906a, #e79a21);*/
    /*color: #fff;*/
    background: #fafafa;
  }

  .wrapper.black-mode {
    background: #000;
    color: #fff;
  }

  .wrapper .header {
    padding: 20px;
    height: 100px;
  }

  .wrapper .header .left img {
    width: 100px;
  }

  .wrapper .header .right strong {
    font-weight: 500;
    margin: 0 10px;
  }

  .wrapper .header .right .uk-profile {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: 0;
  }

  .wrapper .header .right .uk-profile:hover {
    cursor: pointer;
    color: #333;
  }

  .wrapper .box {
    display: flex;
    align-items: center;
    height: calc(100% - 50px);
    padding-top: 80px;
  }

  .wrapper .box .menu-icon {
    display: flex;
    align-items: center;
    width: 70%;
    height: calc(100% - 165px);
    margin: auto;
    max-width: 1200px;
    min-width: 800px;
  }

  .wrapper .box .menu-icon {
    /*display: none;*/
    margin: auto;
  }

  .wrapper .box .menu-icon .list-item:first-child {
    margin-bottom: 25px;
  }

  .wrapper .box .menu-icon .list-item h3 {
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .wrapper .box .menu-icon .list-item .item {
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 25px;
    display: flex;
    align-items: center;
    margin: 15px;
    -webkit-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    -moz-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    cursor: pointer;
  }

  .wrapper .box .menu-icon .list-item .item {
    border: 1px solid #ddd;
  }

  .wrapper .box .menu-icon .list-item .item img {
    padding: 15px;
  }

  .wrapper .box .menu-icon .list-item .item:hover img {
    transform: scale(1.03);
  }

  .wrapper .box .menu-icon .list-item .item:hover p {
    color: #000;
  }

  .wrapper .box .menu-icon .list-item a {
    color: #333;
    text-decoration: unset;
  }


  /* Menu WorkFlow */
  .wrapper .box .menu-workflow {
    color: #333;
    text-decoration: unset;
  }

  .wrapper .box .menu-workflow .mRow {
    text-align: center;
    position: relative;
    margin-bottom: 30px;
  }

  .wrapper .box .menu-workflow .mRow1 {
    margin-bottom: 20px;
  }

  .wrapper .box .menu-workflow .mRow:nth-child(4) {
    margin-bottom: 0;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle,
  .wrapper .box .menu-workflow .mRow .menu-square {
    text-align: center;
    margin: auto;
    position: relative;
    height: 165px;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle > div:first-child,
  .wrapper .box .menu-workflow .mRow .menu-square > div:first-child {
    width: 120px;
    height: 120px;
    margin: auto;
    -webkit-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    -moz-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.12);
    background: #47dba9;
  }

  .wrapper .box .menu-workflow .mRow .menu-square > div:first-child {
    background: #ffa0a2;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle > div:first-child:hover,
  .wrapper .box .menu-workflow .mRow .menu-square > div:first-child:hover {
    -webkit-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.3);
    -moz-box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.3);
    box-shadow: 4px 2px 5px 1px rgba(62, 36, 36, 0.3);
    cursor: pointer;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle p,
  .wrapper .box .menu-workflow .mRow .menu-square p {
    margin-top: 12px;
  }

  .wrapper .box .menu-workflow .mRow .menu-square > div:first-child {
    width: 150px;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle > div:first-child {
    border-radius: 50%;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle > div:first-child img,
  .wrapper .box .menu-workflow .mRow .menu-square > div:first-child img {
    padding: 18px;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .wrapper .box .menu-workflow .mRow .menu-circle > div:first-child img {
    padding: 25px;
  }

  .wrapper .box .menu-workflow .mRow div span {
    font-size: 25px;
  }

  .wrapper .box .menu-workflow .mRow .arrow-right {
    position: absolute;
    top: 60px;
    right: 0;
    margin-top: -10px;
    margin-right: -20px;
  }

  .wrapper .box .menu-workflow .mRow .arrow-down {
    margin-top: -10px;
  }

  .discount {
    position: absolute !important;
    top: 0px;
    left: 20px;
    margin-left: 20px;
  }

  .discount > div {
    width: 50px !important;;
    height: 50px !important;;
  }

  .discount > div img {
    padding: 10px !important;;
  }

  .store {
    position: absolute !important;
    top: 0px;
    left: 0px;
  }

  .store > div {
    width: 50px !important;;
    height: 50px !important;;
  }

  .store > div img {
    padding: 10px !important;;
  }


  .users {
    position: absolute !important;
    top: 55px;
    left: 0px;
  }

  .users > div {
    width: 50px !important;;
    height: 50px !important;;
  }

  .users > div img {
    padding: 10px !important;;
  }


  .wrapper .menu {
    position: absolute;
    top: 47%;
    left: 0;
    padding: 5px;
    background: #bb3537;
    color: #fff;
    text-transform: capitalize;
    width: 46px;
    font-size: 12px;
    text-align: center;
    margin-top: -70px;
  }

  .wrapper .menu a {
    color: #fff;
    display: block;
  }

  .wrapper .menu a:hover {
    text-decoration: none;
  }

  .wrapper .menu:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  .wrapper .guide {
    position: absolute;
    top: 47%;
    left: 0;
    padding: 5px;
    background: #0f6ecd;
    color: #fff;
    text-transform: capitalize;
    width: 46px;
    font-size: 12px;
    text-align: center;
    margin-top: -20px;
  }

  .wrapper .guide:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  #offcanvas-usage .uk-offcanvas-bar {
    width: 300px;
    padding: 30px;
  }

  #offcanvas-usage .uk-offcanvas-close {
    margin-top: -10px;
    margin-right: -10px;
  }

  #offcanvas-usage,
  #offcanvas-usage li .uk-accordion-title {
    font-size: 14px;
  }
</style>

