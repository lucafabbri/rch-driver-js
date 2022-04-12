export default {
    input: 'dist/esm/index.js',
    output: [
        {
            file: 'dist/esm/plugin.js',
            format: 'iife',
            name: 'rch-driver-js',
            sourcemap: true,
            inlineDynamicImports: true,
            extend: true
        },
        {
            file: 'dist/esm/plugin.cjs.js',
            format: 'cjs',
            sourcemap: true,
            inlineDynamicImports: true,
        },
    ],
};
