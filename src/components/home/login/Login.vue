<template>
  <div class="wrapper">
    <div class="header">
      <div class="left">
        <router-link tag="a" to="/">
          <img src="../../../../public/image/logo.png" alt="SW Logo"/>
        </router-link>
      </div>
      <div class="right">
        <router-link tag="a" to="/"><span uk-icon="close"></span></router-link>
      </div>
    </div>
    <div class="box text-center">
      <h1>Đăng nhập</h1>
      <h4>Bạn đã có tài khoản?
        <router-link tag="a" to="/register">Đăng ký</router-link>
      </h4>
      <div class="col-xs-6 login-box text-left">
        <div class="form-group">
          <input class="uk-input uk-form-width-large" v-model="email" type="text" placeholder="Email">
        </div>
        <div class="form-group" style="margin-bottom: 20px">
          <input class="uk-input uk-form-width-large" v-model="password" type="password" placeholder="Mật khẩu">
        </div>
        <div class="form-group">
          <div class="left">
            <input type="checkbox" class="uk-checkbox"/> Ghi nhớ đăng nhập
          </div>
          <div class="right">
            <router-link tag="a" to="/">Quên mật khẩu</router-link>
          </div>
          <div class="clear"></div>
        </div>
        <div class="form-group">
          <button class="uk-button uk-button-primary" @click="actionLogin">Đăng nhập</button>
        </div>
      </div>
      <div class="col-xs-6 video-box">
        <iframe width="100%" height="225px" src="https://www.youtube.com/embed/0xcQcCuJc8M?list=RD0xcQcCuJc8M" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="clear"></div>
      <br/>
      <br/>
      <br/>
      <div class="policy-box">
        * Bằng cách đăng ký, bạn đồng ý với Điều khoản sử dụng của chúng tôi và nhận email & cập nhật SW và xác nhận rằng bạn đã đọc Chính sách bảo mật của chúng tôi
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                'email': '',
                'password': ''
            }
        },
        methods: {
            actionLogin() {
                var email = this.email;
                if (email == 'admin@gmail.com') {
                    this.$router.push({path: './declare/menu'});
                } else if (email == 'user@gmail.com') {
                    this.$router.push({path: './menu'});
                } else{
                    UIkit.notification({
                        message: 'Tài khoản hoặc mật khẩu không đúng',
                        status: 'danger',
                        pos: 'top-right',
                        timeout: 4000
                    });
                }
            }
        }
    }
</script>

<style scoped>
  input[type=checkbox] {
    margin-top: -4px;
  }

  .uk-input, .uk-select, .uk-textarea {
    border: 1px solid #999;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size: 18px;
    color: #888;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    font-size: 18px;
    color: #888;
  }

  :-ms-input-placeholder { /* IE 10+ */
    font-size: 18px;
    color: #888;
  }

  :-moz-placeholder { /* Firefox 18- */
    font-size: 18px;
    color: #888;
  }

  .wrapper {
    font-size: 16px;
  }

  .wrapper .header {
    padding: 20px;
    height: 100px;
  }

  .wrapper .header .left img {
    width: 100px;
  }

  .wrapper .header .right span {
    width: 30px;
    height: 30px;
  }

  .wrapper .box {
    width: 70%;
    margin: auto;
    max-width: 1200px;
    min-width: 800px;
  }

  .wrapper .box h4 {
    margin-top: 0;
  }

  .wrapper .box .col-xs-6 {
    padding: 20px 40px 0;

  }

  .wrapper .box .login-box {
    border-right: 1px solid #999;
  }

  .wrapper .box .login-box .uk-input {
    border: 0;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
    height: 42px;
  }

  .wrapper .box .login-box .uk-input:hover,
  .wrapper .box .login-box .uk-input:focus {
    border-bottom: 1px solid #666;
  }

  .wrapper .box .login-box button {
    margin-top: 20px;
    border-radius: 20px;
  }

  .wrapper .box .video-box {
    padding-top: 10px;
    padding-bottom: 10px;
  }


  .wrapper .box .policy-box {
    font-size: 14px;
    margin: auto;
    width: 500px;
    color: gray;
  }
</style>
