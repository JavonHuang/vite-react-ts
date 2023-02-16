import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { post } from "@/request";

export interface ICustomer {
  name: string,
  age: number,
  height: number,
  str:string,
}

//异步状态处理
export const GetCustomerInfo =createAsyncThunk<
// payload creator 返回值类型
ICustomer,
// payload creator 的第一个参数
string
>(
  "customer/GetPosts", async (userId, thunkApi) => { 
    console.log(userId)
    console.log(thunkApi)
    const response = await post(`/test/api`,userId)
    return response.data as ICustomer;
  }
);
  
const initialState:ICustomer = {
  name: "",
  age: 0,
  height: 0,
  str:""
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerName(state,action: PayloadAction<string>) { 
      state.name = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(GetCustomerInfo.fulfilled, (state, { payload }) => {
      state.str = JSON.stringify(payload);
    })
    builder.addCase(GetCustomerInfo.rejected, (state, { payload }) => {
      state.str ="";
    })
  }
})

// reducer方法的每一个case都会生成一个Action
export const { setCustomerName } =customerSlice.actions

export default customerSlice.reducer
