// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:8080,//配置端口
    open:true,//配置默认打开浏览器
  },
  plugins: [react()],
})
