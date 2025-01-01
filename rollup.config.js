import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/alpine-wake-lock.js',
      format: 'umd',
      name: 'AlpineWakeLock'
    },
    {
      file: 'dist/alpine-wake-lock.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    terser()
  ]
} 