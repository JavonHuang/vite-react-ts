import { createHashRouter,useRouteError,redirect,RouterProvider} from "react-router-dom";
import { Suspense, lazy,memo, useState, useEffect } from 'react'
import { post } from "@/request/index";
import React from "react";
import KeepAlive from 'react-activation'
import { useAppSelector,useAppDispatch } from '@/hooks/useReduxHook';
import { GetRouter } from '@/store/slice/system'

type IRouterBeforeLoad = (res:any, redirectUrl: string) => Boolean;
let routerLoader: IRouterBeforeLoad;
let _redirectUrl: string = "/";

const routes = [
  {
    path: '/',
    auth: false,
    name:"login",
    component:lazy(() => import('@/page/login/login'))
  },
  {
    path: '/Portal',
    name:"Portal",
    component:lazy(() => import('@/page/portal/portal')),
    children: [
      // { 
      //   path: '/Portal/Home',
      //   name:"Home",
      //   component:lazy(() => import('@/page/home/home'))
      // },
      // { 
      //   path: '/Portal/Lifecycle',
      //   name:"Lifecycle",
      //   component:lazy(() => import('@/page/lifecycle/lifecycle'))
      // },
      // { 
      //   path: '/Portal/NotFound',
      //   name:"NotFound",
      //   component:lazy(() => import('@/page/error/NotFound'))
      // },
      { 
        path: '*',
        component:lazy(() => import('../page/error/NotFound'))
      },
    ]
  },
  { 
    path: '*',
    component:lazy(() => import('../page/error/NotFound'))
  },
]


function ErrorBoundary() {
  let error:any = useRouteError();
  return <div>
    <div>{ error.message}</div>
    <div>{ error.stack}</div>
  </div>;
  return <></>
}

// 路由处理方式
const generateRouter = (routers:any) => {
  return routers.map((item:any) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={
      <div>加载中...</div>
    }>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      {/* <KeepAlive id={item.name} cacheKey={item.name}> */}
        <item.component />
      {/* </KeepAlive> */}
    </Suspense>
    item.errorElement = <ErrorBoundary></ErrorBoundary>
    item.loader = async (res: any) => {
      if (routerLoader && !item.children) {
        if (routerLoader(res,_redirectUrl)) {
          return res;
        } else { 
          return redirect(_redirectUrl);
        }
      }
      return res;
    }
    return item
  })
}

const RouterLoader = (fun: IRouterBeforeLoad) => {
  routerLoader = fun;
}

const Router = memo(() => { 
  let [myRouter, setMyRouter] = useState(createHashRouter(generateRouter([...routes])));
  const routerList = useAppSelector((state) => state.system.routerList)
  const dispatch = useAppDispatch()
  useEffect(() => { 
    init()
  }, [routerList])
  const init = async () => { 
    let modules = import.meta.glob("@/page/**/**.tsx");
    console.log(modules)
    
    let portalChildren:any = [];
    Object.keys(modules).map((key, item) => {
      let index = routerList.findIndex((r: any) => r.url == key);
      if (index>-1) { 
        portalChildren.push({
          path: key.replace('.tsx','').replace('/src/page','/Portal'),
          auth: false,
          name:key.replace('.tsx','').replace('/src/page',''),
          component:lazy((modules[key] as any))
        });
      }
    });
    routes[1].children?.concat(portalChildren)
    setMyRouter(createHashRouter(generateRouter(routes)))
  }
  return <RouterProvider router={myRouter}></RouterProvider>;
 
})
export{ Router,RouterLoader}