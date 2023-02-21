import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { post } from "@/request";

export interface ISystem {
  isLogin: Boolean,
  routerList: Array<any>,
}


//异步状态处理
export const GetRouter =createAsyncThunk<
// payload creator 返回值类型
Array<any>
>(
  "num/GetPosts", async (userId, thunkApi) => { 
    const response = await post(`/router/list`,userId)
    return response.data as Array<any>;
  }
);
  
const initialState:ISystem = {
  isLogin: false,
  routerList: [],
}

export const systemSlice = createSlice({
  name: 'num',
  initialState,
  reducers: {
    setIsLogin(state,action: PayloadAction<Boolean>) { 
      state.isLogin = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(GetRouter.fulfilled, (state, { payload }) => {
      state.routerList =payload;
    })
    builder.addCase(GetRouter.rejected, (state, { payload }) => {
      state.routerList =[];
    })
  }
})

// reducer方法的每一个case都会生成一个Action
export const { setIsLogin } = systemSlice.actions

export default systemSlice.reducer
