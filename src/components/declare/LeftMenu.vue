<template>
  <div class="left-menu in">
    <div title="Sản phẩm" pos="right" uk-tooltip>
      <i class="fa fa-boxes"></i>
      <span>Sản phẩm</span>
    </div>
    <div title="Giảm giá" pos="right" uk-tooltip>
      <i class="fa fa-percentage"></i>
      <span>Giảm giá</span>
    </div>
    <div title="Kho" pos="right" uk-tooltip>
      <i class="fa fa-warehouse"></i>
      <span>Kho</span>
    </div>
    <div title="Phiếu nhập kho" pos="right" uk-tooltip>
      <i class="fa fa-clipboard"></i>
      <span>Phiếu nhập kho</span>
    </div>
    <div title="Chuyển kho" pos="right" uk-tooltip>
      <i class="fa fa-exchange-alt"></i>
      <span>Chuyển kho</span>
    </div>
    <div title="Bán hàng" pos="right" uk-tooltip>
      <i class="fa fa-shopping-cart"></i>
      <span>Bán hàng</span>
    </div>
    <div title="Cửa hàng" pos="right" uk-tooltip>
      <i class="fa fa-store"></i>
      <span>Cửa hàng</span>
    </div>
    <div title="Người dùng" pos="right" uk-tooltip>
      <i class="fa fa-users"></i>
      <span>Người dùng</span>
    </div>
    <div title="Báo cáo" pos="right" uk-tooltip>
      <i class="fa fa-chart-bar"></i>
      <span>Báo cáo</span>
    </div>
    <div title="Sản phẩm" pos="right" uk-tooltip>
      <i class="fa fa-cogs"></i>
      <span>Cài đặt</span>
    </div>
    <div @click="closeMenu" v-show="menuStatus == 'close'" title="Thu hẹp Menu" pos="right" uk-tooltip>
      <i class="fa fa-caret-square-left"></i>
      <span>Đóng menu</span>
    </div>
    <div @click="openMenu" v-show="menuStatus == 'open'" title="Mở rộng Menu" pos="right" uk-tooltip>
      <i class="fa fa-caret-square-right"></i>
      <span>Mở menu</span>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                base_url: 'http://localhost:4000/',
                menuStatus: 'open'
            }
        },
        methods: {
            openMenu() {
                $('.left-menu').removeClass('in');
                $('.content').removeClass('in');
                this.menuStatus = 'close';
            },
            closeMenu() {
                $('.left-menu').addClass('in');
                $('.content').addClass('in');
                this.menuStatus = 'open';
            }
        }
    }
</script>

<style scoped>
  .left-menu {
    float: left;
    height: calc(100% - 50px);
    width: 180px;
    background: #000;
    overflow: auto;
  }

  .left-menu.in {
    width: 50px;
  }

  .left-menu.in > div {
    text-align: center;
  }

  .left-menu.in > div i {
    width: auto;
    margin-left: -3px;
  }

  .left-menu.in > div span {
    display: none;
  }

  .left-menu > div {
    padding: 15px;
    border-bottom: 1px solid #222;
    background: #000;
    color: #fff;
  }

  .left-menu > div:last-child {
    border-bottom: 0;
  }

  .left-menu > div:hover {
    background: #fafafa;
    color: #000;
    cursor: pointer;
  }

  .left-menu > div i {
    width: 24px;
    font-size: 16px;
  }

  .left-menu > div a,
  .left-menu > div a:hover,
  .left-menu > div a:focus {
    text-decoration: none;
  }

  .left-menu > div span {
    font-size: small;
  }

  .uk-tooltip {

  }
</style>
