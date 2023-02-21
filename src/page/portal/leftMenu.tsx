import React, { useEffect ,memo} from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { useAppSelector } from '@/hooks/useReduxHook';
import { useUtilsNavigate } from "@/utils/useUtilsNavigate";

const LeftMenu = () => { 
  const navigate = useNavigate()
  const location = useLocation()
  const routerList = useAppSelector((state) => state.system.routerList)
  const handleClick = (url:any)=>{
    // navigate(url)
    useUtilsNavigate(navigate,location,url)
  }
  

  return <>
    {routerList.map((item) => <div key={item.path} onClick={() => handleClick(item.path + '?id=878787')}>{ item.text} </div>)}
  </>
}

export default memo(LeftMenu);