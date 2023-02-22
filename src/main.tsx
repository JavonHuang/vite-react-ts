import "./main.scss";
import ReactDOM from 'react-dom';
import { Router } from './routes/route';
import { RouterBeforeEach } from "@/utils/useUtilsNavigate";
import { store,persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



RouterBeforeEach(( to,from) => {
  console.log("路由守卫to", to)
  console.log("路由守卫from", from)
  return true;
})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router></Router>
    </PersistGate>
    {/* <Counter></Counter> */}
    {/* <AliveScope>
      <RouterProvider router={Router()}/>
    </AliveScope> */}
  </Provider>,
  document.getElementById('root')
);
console.log(import.meta.env.VITE_APP_TITLE) // 123
