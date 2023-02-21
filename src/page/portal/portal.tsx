import React, { useEffect,memo,useState} from 'react'
import { Outlet } from 'react-router-dom'
import "./portal.scss";
import LeftMenu from './leftMenu';
import { useAppDispatch } from '@/hooks/useReduxHook';
import {useMount  } from "@/hooks/useMount";
import { GetRouter } from '@/store/slice/system'
const Portal=()=> {
  const dispatch = useAppDispatch()
  // let [count, setCount] = useState(0)

  // useMount(() => { 
  //   dispatch(GetRouter())
  // });

  return <div className="portal">
    <div className='portal-header'>
      头部
      {/* <button className="home" onClick={() => setCount(++count)}>增加</button> */}
    </div>
    <div className='portal-main'>
      <div className='portal-main-left'>
        <LeftMenu></LeftMenu>
      </div>
      <div className='portal-main-context'>
      <Outlet/>
      </div>
   </div>
  </div>
}
export default memo(Portal);