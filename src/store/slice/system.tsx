import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { post } from "@/request";

export interface ISystem {
  isLogin: Boolean,
  routerList: Array<any>,
  isLoadRouter:Boolean,
}


//异步状态处理
export const GetRouter =createAsyncThunk<
// payload creator 返回值类型
Array<any>
>(
  "num/GetPosts", async (userId, thunkApi) => { 
    let globalState: any = thunkApi.getState();
    if (!globalState["system"]["isLoadRouter"]) {
      const response = await post(`/router/list`, userId)
      return response.data as Array<any>;
    } else { 
      return Promise.resolve(globalState["system"]["routerList"]);
    }
  }
);
  
const initialState:ISystem = {
  isLogin: false,
  routerList: [],
  isLoadRouter:false,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setIsLogin(state,action: PayloadAction<Boolean>) { 
      state.isLogin = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(GetRouter.fulfilled, (state, { payload }) => {
      if (JSON.stringify(state.routerList)!=JSON.stringify(payload)) { 
        state.routerList = payload;
        state.isLoadRouter = true;
      }
    })
    builder.addCase(GetRouter.rejected, (state, { payload }) => {
      state.routerList =[];
    })
  }
})

// reducer方法的每一个case都会生成一个Action
export const { setIsLogin } = systemSlice.actions

export default systemSlice.reducer
