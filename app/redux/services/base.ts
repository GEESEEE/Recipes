import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/store';

const V1 = 'v1'

export const baseQuery = (): any => fetchBaseQuery({
    baseUrl: `${
        'http://7fc9-5-132-11-58.ngrok.io' ?? '127.0.0.1'
    }/${V1}`,
    prepareHeaders: (headers, { getState }) => {
        const {token} = (getState() as RootState).auth;

        headers.set('Authorization', `Bearer ${token}`);

        return headers;
      },
})
