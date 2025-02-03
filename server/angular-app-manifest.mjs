
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://ami-hp.github.io/mikhak/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/https://ami-hp.github.io/mikhak"
  },
  {
    "renderMode": 2,
    "route": "/https://ami-hp.github.io/mikhak/login"
  }
],
  assets: {
    'index.csr.html': {size: 2832, hash: '41b2e2bcaee35b362108df813741c973f0451fbf5928d0c2c44b0565adad208b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1190, hash: '3e412f7d3a9a281b9f2674493fbd058d7517eec31d79dd263100503add179d54', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 3013, hash: 'a262cdf0b3c1a02f12caa6a7f8ddd3681106a6a3eaa93c2c6be7f583fe66955a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 3013, hash: 'a262cdf0b3c1a02f12caa6a7f8ddd3681106a6a3eaa93c2c6be7f583fe66955a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-A5QH4QQ7.css': {size: 14940, hash: 'Rxr6+sk+OJw', text: () => import('./assets-chunks/styles-A5QH4QQ7_css.mjs').then(m => m.default)}
  },
};
