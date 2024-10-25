import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/cjs/index.cjs', format: 'cjs' }],
    plugins: [
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
    ],
  },
];
