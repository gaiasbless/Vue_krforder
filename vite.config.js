import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://service.k-rf.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        secure: false,
        ws: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),                                  // @ 앨리어스 설정
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),        // 부트스트램 설정
      '@bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),        // 부트스트램 설정
    }
  },
  build: {
//    outDir: 'D:\\test\\test'          // 배포 위치 개별 설정 (기본 : VueRoot/dist)
  }
})
