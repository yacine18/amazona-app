import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userAction';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderSceen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderSceen from './screens/PlaceOrderSceen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SellerScreen from './screens/SellerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="row">
            <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {
                cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )
              }
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#" >
                    {userInfo.name} <i className="fa fa-caret-down"></i>{''}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Signout</Link>
                    </li>

                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )
            }
            {
              userInfo && userInfo.isSeller && (
                <div className="dropdown">
                  <Link to="#seller">Seller {''} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin {''} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )
            }

          </div>
        </header>
        <main>

          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/seller/:id?' component={SellerScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/" exact component={HomeScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderSceen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/order/:id" component={OrderSceen}></Route>
          <PrivateRoute path="/orderhistory" component={OrderHistoryScreen}></PrivateRoute>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>

        </main>
        <footer className="row center">
          All right reserved
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
