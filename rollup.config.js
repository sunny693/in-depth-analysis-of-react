import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies || {});
const plugins = [];
function handleFile(pathStr) { return String(pathStr).toLowerCase() }

export default [
  {
    input: 'src/react/index.js',
    sign: 'React'
  },
  {
    input: 'src/react-dom/index.js',
    sign: 'ReactDOM'
  }
].reduce((curArr, { input, sign }) => curArr.concat(
  [
    {
      file: handleFile(`build/${sign}/${sign}-esm.js`),
      format: 'esm',
      indent: false,
      plugins,
      sign,
    },
    {
      file: handleFile(`build/${sign}/${sign}-umd.js`),
      format: 'umd',
      name: sign,
      indent: false,
      plugins,
      sign,
    },
    {
      file: handleFile(`build/${sign}/${sign}-umd.min.js`),
      format: 'umd',
      name: sign,
      indent: false,
      plugins: plugins.concat(
        terser(
          {
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              warnings: false,
            },
          }
        )
      ),
      sign,
    }
  ].map(({ plugin, sign, ...output }) => {
    return {
      input,
      output,
      external: sign === 'ReactDOM' ? external.concat('react') : external,
      plugins
    }
  })
), [])