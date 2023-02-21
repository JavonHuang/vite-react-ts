// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { resolve } from 'path'


export default defineConfig({
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:8080,//配置端口
    open:false,//配置默认打开浏览器
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@':resolve('src')
    },
  },
  //全局引入
  css: {
    preprocessorOptions: {
      scss: {
        /**如果引入多个文件，可以使用
       * '@import "@/assets/scss/globalVariable1.scss";
       * @import"@/assets/scss/globalVariable2.scss";'
      **/
        additionalData: '@import "@/style/globalVar.scss";',
      }
    }
  },
  plugins: [
    react()
  ],
})
