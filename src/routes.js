import Home from './components/home/Home'
import Register from './components/home/login/Register'
import Login from './components/home/login/Login'

// Khai bao
import Menu from './components/declare/Menu'
import LeftMenu from './components/declare/LeftMenu'
import Pos from './components/declare/Pos'
import Store from './components/declare/Store'
import Product from './components/declare/Product'
import Warehouse from './components/declare/Warehouse'


export const routes = [
  {
    path: '/', name: 'Login', component: Login,
  },
  {
    path: '/register', name: 'Register', component: Register
  },
  {
    path: '/login', name: 'Login', component: Login
  },

  // Khai báo
  {
    path: '/declare/menu', name: 'Menu', component: Menu
  },
  {
    path: '/declare/left-menu', name: 'LeftMenu', component: LeftMenu
  },
  {
    path: '/declare/pos', name: 'Pos', component: Pos
  },
  {
    path: '/declare/store', name: 'Store', component: Store
  },
  {
    path: '/declare/product', name: 'Product', component: Product
  },
  {
    path: '/declare/warehouse', name: 'Warehouse', component: Warehouse
  }
];
