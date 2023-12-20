import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import { dts } from 'rollup-plugin-dts';

import packageJson from './package.json' assert {type: 'json'};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const globals = { 'react': 'React', 'react-dom': 'ReactDOM' };

export default [
  {
    input: ['./src/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        globals,
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions, browser: true }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({ minimize: true, modules: true, extract: false }),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [
      alias({
        entries: [
          { find: 'utils', replacement: '../../utils' },
        ]
      }),
      dts()
    ]
  },
];
