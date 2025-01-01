
export default {
  basePath: '/mikhak',
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
