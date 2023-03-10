
import "./login.scss";
import { useNavigate,useLocation } from "react-router-dom";
import { useUtilsNavigate } from "@/utils/useUtilsNavigate";
import { GetRouter } from '@/store/slice/system'
import {  useAppDispatch } from '@/hooks/useReduxHook';
import { Button } from 'antd';
function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  console.log("login")
  const handleClick = async () => {
    dispatch(GetRouter())
    useUtilsNavigate(navigate, location, '/Portal/home' + '?id=878787', {
      state: {
        name: '测试传值',
      }
    });
  }
  

  return <div className={"login"}>
    <div className={ "main"}>
      <div>
      <Button className="login-btn" onClick={handleClick}>登录</Button>
      </div>
    </div>
  </div>
}
export default Login