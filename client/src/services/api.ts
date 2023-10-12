import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IProduct } from './models';

export class ProductsQueryParam {
    scrumMasterName?: string;
    developer?: string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API as string,
    }),
    tagTypes: ['Product'],
    endpoints: build => ({
        getProducts: build.query<IProduct[], { scrumMasterName?: string, developer?: string }>({
            query: ({ scrumMasterName, developer }) => ({
                url: `/products?`
                    + (scrumMasterName ? `scrumMasterName=${scrumMasterName}` : '')
                    + ((scrumMasterName && developer) && '&')
                    + (developer ? `developer=${developer}` : '')
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id: "LIST" }]
        }),
        addProduct: build.mutation<IProduct, Partial<IProduct>>({
            query: (body) => ({
                url: `product`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }]
        }),
        editProduct: build.mutation<IProduct, Partial<IProduct>>({
            query: ({ productId, ...body }) => ({
                url: `product/${productId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }]
        }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation, useEditProductMutation, useLazyGetProductsQuery } = api;