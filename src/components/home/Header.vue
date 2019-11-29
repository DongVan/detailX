<template>
  <div>
    <div class="uk-position-relative">
      <img src="../../../public/image/bg.jpg" alt="Background" class="uk-intro">
      <div class="uk-position-top">
        <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
          <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
              <li class="uk-active">
                <a href="#">
                  <img src="../../../public/image/logo.png" alt="SW Logo" class="uk-logo"/>
                </a>
              </li>
              <li class="uk-active"><a href="#">Khám phá</a></li>
              <li><a href="#">Mẫu</a></li>
            </ul>
          </div>
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li>
                <a href="#">Ngôn ngữ &nbsp;<span uk-icon="icon: chevron-down; ratio: 0.7"></span></a>
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
              <li class="uk-active">
                <router-link tag="a" to="/register">Đăng ký</router-link>
              </li>
              <li>
                <router-link tag="a" to="/login">Đăng nhập</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .uk-position-relative img.uk-logo {
    width: 100px;
    margin-right: 20px;
  }

  img.uk-intro {
    width: 100%;
  }

  .uk-position-relative .uk-navbar {
    background: #fff;
    padding-left: 20px;
  }

  .uk-position-relative .uk-navbar img {
    width: 100px;
  }

  a > span > svg {
    width: 15px !important;
    font-size: 15px;
  }

  .uk-navbar-right > ul > li:last-child{
    background: #000;
  }
  .uk-navbar-right > ul > li:last-child a{
    color: #fff;
  }
</style>
