export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/plugin.js',
      format: 'iife',
      name: 'rchdriverjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/plugin.cjs.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
};
