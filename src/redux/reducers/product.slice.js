import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateProduct, apiDeleteProduct, apiGetProduct, apiGetProductByCollection, apiGetProducts, apiSearchProduct, apiUpdateProduct } from "../../api/productApi";

const initProductState = {
    products: [],
    product: {},
    productByCollection: [],
    currentProduct: {},
    productSearch: [],
    showModal: false,
    isUpdate: false
}

export const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
    const product = await apiGetProducts();
    return product;
})

export const getProductById = createAsyncThunk("product/getProductById", async (id) => {
    const product = await apiGetProduct(id);
    return product;
})

export const getProductByCollection = createAsyncThunk("product/getProductByCollection", async (category) => {
    const product = await apiGetProductByCollection(category);
    return product;
})

export const createProduct = createAsyncThunk("product/createProduct", async (args) => {
    const { product, showModal } = args;
    const _product = await apiCreateProduct(product);
    return {
        _product,
        showModal
    };
})

export const updateProduct = createAsyncThunk("product/updateProduct", async (args) => {
    const { product, showModal } = args;
    const productUpdate = await apiUpdateProduct(product);
    return {
        productUpdate,
        showModal
    };
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (_id) => {
    await apiDeleteProduct(_id);
    return _id;
})

export const searchProduct = createAsyncThunk("product/searchProduct", async (search) => {
    const data = await apiSearchProduct(search);
    return data;
})

export const productSlice = createSlice({
    name: "product",
    initialState: initProductState,
    reducers: {
        showModal: (state, action) => {
            state.showModal = action.payload.showModal
            state.isUpdate = action.payload.isUpdate
            state.currentProduct = action.payload.currentProduct
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.products = action.payload 
            })
            .addCase(getProductByCollection.fulfilled, (state, action) => {
                state.productByCollection = action.payload
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                const newProducts = [...state.products, action.payload._product]
                state.products = newProducts
                state.showModal = action.payload.showModal
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.products = state.products.map(item => {
                    if (item._id === action.payload.productUpdate._id) {
                        item = action.payload.productUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const newProducts = state.products.filter(item => item._id !== action.payload)
                state.products = newProducts
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.productSearch = action.payload;
            })
    }
});

export const { showModal } = productSlice.actions;
export default productSlice.reducer;

