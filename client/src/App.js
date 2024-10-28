import {
  Routes,
  Route
} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Policy from './pages/Policy/Policy';
import PagenotFound from './pages/PagenotFound';
import Category from './components/Category/Category';
// import Header from './components/Layout/Header/Header';
import Register from './pages/Auth/Register/Register';
// import Footer from './components/Layout/Footer/Footer';
import Login from './pages/Auth/Login/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/private';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';

import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Createcategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search/Search';
import Header from './components/Layout/Header/Header';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Categories from './pages/Categories/Categories';
import CategoryProduct from './pages/CategoryProduct/CategoryProduct';
import CartPage from './pages/CartPage/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<Createcategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />

        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/category' element={<Category />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
