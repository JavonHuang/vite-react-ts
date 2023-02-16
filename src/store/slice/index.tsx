import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { post } from "@/request";

export interface Iuser {
  name: string,
  age: number,
  height: number,
  str:string,
}

//异步状态处理
export const GetUserInfo =createAsyncThunk<
// payload creator 返回值类型
Iuser,
// payload creator 的第一个参数
string
>(
  "num/GetPosts", async (userId, thunkApi) => { 
    console.log(userId)
    console.log(thunkApi)
    const response = await post(`/test/api`,userId)
    return response.data as Iuser;
  }
);
  
const initialState:Iuser = {
  name: "",
  age: 0,
  height: 0,
  str:""
}

export const numSlice = createSlice({
  name: 'num',
  initialState,
  reducers: {
    setName(state,action: PayloadAction<string>) { 
      state.name = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(GetUserInfo.fulfilled, (state, { payload }) => {
      state.str = JSON.stringify(payload);
    })
    builder.addCase(GetUserInfo.rejected, (state, { payload }) => {
      state.str ="";
    })
  }
})

// reducer方法的每一个case都会生成一个Action
export const { setName } = numSlice.actions

export default numSlice.reducer
