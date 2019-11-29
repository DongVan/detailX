<template>
  <div>
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <a href="#">
              <img src="../../../public/image/logo-white.png" alt="RetailX Logo" class="uk-logo"/>
            </a>
          </li>
          <li class="uk-active">
            <router-link tag="a" to="/declare/menu">
              <span class="fa fa-home"></span>
            </router-link>
          </li>
          <li>
            <a href="#offcanvas-usage" uk-toggle><span class="fa fa-bars"></span> Menu</a>
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
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li><a href="#"><span class="fa fa-cogs"></span> Cài đặt</a></li>
          <li>
            <router-link tag="a" to="/declare/pos">
              <span class="fa fa-desktop"></span> POS
            </router-link>
          </li>
          <li class="uk-active">
            <a href="#"><img :src="base_url + 'public/image/icon/profile.png'" alt="Profile"/> TOM &nbsp;<span uk-icon="icon: chevron-down; ratio: 0.7"></span></a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li class="uk-active"><a href="#">Active</a></li>
                <li><a href="#">Item</a></li>
                <li class="uk-nav-header">Header</li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
                <li class="uk-nav-divider"></li>
                <li><a href="#">Item</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                base_url: 'http://localhost:4000/'
            }
        }
    }
</script>

<style scoped>
  nav {
    border-bottom: 1px solid #222;
    height: 50px;
    background: #000;
  }

  nav .uk-navbar-nav {
    height: 50px;
  }

  nav .uk-navbar-nav > li > a {
    display: block;
    height: 50px;
    min-height: 50px;
    line-height: 50px;
    color: #fff;
  }
  nav .uk-navbar-nav > li > a:hover {
    color: #ddd;
  }

  nav .uk-logo {
    width: 100px !important;
  }

  nav ul li a img {
    margin-top: -5px;
    width: 35px !important;
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
