import './App.css';
import 'antd/dist/reset.css';
import Product from './page/Product';
import { Routes, Route } from "react-router-dom";
import Users from './page/Users';
import Homepage from './page/Homepage';
import ProductDetail from './component/ProductDetail';
import Cart from './component/Cart';
import Login from './component/Login';
import Register from './component/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRefeshToken } from './redux/reducers/user.slice';
import Cookies from 'js-cookie';
import Account from './component/Account';
import Collections from './page/collections/Collections';
import Searchpage from './page/Searchpage';
import Order from './page/Order';
import Statistic from './page/Statistic';

function App() {
    const dispatch = useDispatch();
    const { _id, role, refresh_token } = useSelector((state) => state.userReducer)

    useEffect(() => {
        let _token = refresh_token || Cookies.get('token');
        dispatch(userRefeshToken(_token));
    }, [])

    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Homepage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Account />} />
                    <Route path="/collection/:id" element={<Collections />} />
                    <Route path="/search" element={<Searchpage />} />
                </Route>

                {_id && role && <Route path="/admin">
                    <Route path="product" element={<Product />} />
                    <Route path="order" element={<Order />} />
                    <Route path="user" element={<Users />} />
                    <Route path="statistic" element={<Statistic />} />
                </Route>}
            </Routes>
        </>
    );
}

export default App;
