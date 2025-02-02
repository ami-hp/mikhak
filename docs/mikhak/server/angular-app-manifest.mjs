
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  }
],
  assets: {
    'index.csr.html': {size: 2801, hash: '0a7a7e19c5ed917ec98ba81ed6ca3b1e0c0925e4c052709fce5a49edcbdbbde7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1159, hash: '0ffe9ccd5a06f93de7a704cdf0478cc3578efda0d91fdb1ee106f978e48b2eee', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 39334, hash: '0941bd1d66ffe4c25ea5d90033ad939264ce64142681d594cd24a92bec035b95', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12455, hash: 'b7ca327b4389e4219558a87652348a5ebe06fd25f28934d785cc8d1b0d7969cc', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-A5QH4QQ7.css': {size: 14940, hash: 'Rxr6+sk+OJw', text: () => import('./assets-chunks/styles-A5QH4QQ7_css.mjs').then(m => m.default)}
  },
};
