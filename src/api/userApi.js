import { DatabaseFilled } from "@ant-design/icons";
import { GET_API, POST_API } from "../utils/method";

export const apiUserRegister = async (user) => {
    const { data, status } = await POST_API("register", { user: user });
    if (status !== 200) return {};
    return data;
}

export const apiUserLogin = async (user) => {
    const { data, status } = await POST_API("login", { user: user });
    if (status !== 200) return {};
    return data;
}

export const apiUserLogout = async () => {
    const { data, status } = await POST_API("logout", {});
    if (status !== 200) return false;
    return data
}

export const apiUserRefreshToken = async (token) => {
    const { data, status } = await POST_API("refresh_token", { token: token });
    if (status !== 200) return {};
    return data;
}

export const apiUpdateCart = async (cart, userId) => {
    const { data, status } = await POST_API("add-cart", { cart: cart, userId: userId });
    if (status !== 200) return {};
    return data;
}

export const apiUpdateUserInfo = async (userInfo) => {
    const { data, status } = await POST_API("update-user-info", { userInfo: userInfo });
    if (status !== 200) return null;
    return data;
}

export const apiGetListUser = async () => {
    const { data, status } = await POST_API("get-list-user", {});
    if (status !== 200) return [];
    return data;
}

export const apiDeleteUser = async (userId) => {
    const { data, status } = await POST_API("delete-user", { userId: userId });
    if (status !== 200) return null;
    return data;
}