const path = require('path');
const childProcess = require('child_process');
const { build } = require('esbuild');
const pkg = require('../package.json');

const electronSource = path.join(__dirname, '..', 'src-electron');

const gitRevision = childProcess
  .execSync('git rev-parse HEAD')
  .toString()
  .trim();

const isProduction = process.env.NODE_ENV === 'production';

const hrstart = process.hrtime();
build({
  entryPoints: ['app.ts', 'preload.ts', 'service/windowsHello.ts'].map((f) =>
    path.join(electronSource, f),
  ),
  platform: 'node',
  bundle: true,
  target: 'node16',
  drop: isProduction ? ['console', 'debugger'] : [],
  // Help esbuild locate missing dependencies.
  alias: {
    '@onekeyhq/shared': path.join(__dirname, '../../../packages/shared'),
    'react-native': path.join(
      __dirname,
      '../../desktop/src-electron/libs/react-native-mock',
    ),
    'react-native-uuid': path.join(
      __dirname,
      '../../../node_modules/react-native-uuid/dist',
    ),
    'axios': path.join(
      __dirname,
      '../../../node_modules/axios/dist/esm/axios.js',
    ),
  },
  // Avoid introducing dependencies that lead to script bloat.
  external: Object.keys({
    ...pkg.dependencies,
    ...pkg.devDependencies,
  }),
  tsconfig: path.join(electronSource, 'tsconfig.json'),
  outdir: path.join(__dirname, '..', 'dist'),
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    'process.env.DESK_CHANNEL': JSON.stringify(process.env.DESK_CHANNEL || ''),
    'process.env.COMMITHASH': JSON.stringify(gitRevision),
  },
})
  .then(() => {
    const hrend = process.hrtime(hrstart);
    console.log(
      '[Electron Build] Finished in %dms',
      (hrend[1] / 1_000_000 + hrend[0] * 1000).toFixed(1),
    );
  })
  .catch(() => process.exit(1));
