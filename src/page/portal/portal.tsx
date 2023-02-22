import React, { useEffect,memo,useState} from 'react'
import { Outlet } from 'react-router-dom'
import "./portal.scss";
import LeftMenu from './leftMenu';
import { useAppSelector,useAppDispatch } from '@/hooks/useReduxHook';
import {useMount  } from "@/hooks/useMount";
import { GetRouter } from '@/store/slice/system'
const Portal = () => {
  const isLoadRouter = useAppSelector((state) => state.system.isLoadRouter)
  const dispatch = useAppDispatch()
  // let [count, setCount] = useState(0)

  useMount(() => { 
    dispatch(GetRouter())
  });

  return <>
    {isLoadRouter ?
      <div className="portal">
        <div className='portal-header'>
          头部
          {/* <button className="home" onClick={() => setCount(++count)}>增加</button> */}
        </div>
        <div className='portal-main'>
          <div className='portal-main-left'>
            <LeftMenu></LeftMenu>
          </div>
          <div className='portal-main-context'>
            <Outlet />
          </div>
        </div>
      </div> :null}
  </>
}
export default memo(Portal);