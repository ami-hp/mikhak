
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/mikhak',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/mikhak/login"
  }
],
  assets: {
    'index.csr.html': {size: 2738, hash: 'f3aaaa3aa1ad50e37fea0c43f7bcfed11b1b28838a797605ae4a40d44212a7e5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1096, hash: '0090cd3da7ade93ab2ea0c8b940f158a99d8b1855fd89565fd1a27505f30aa41', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12340, hash: '97f90ac34934bb3b54b66515222b1a486a7a2d94f250572500dd1e9cb9e68950', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-TN77NH5T.css': {size: 11028, hash: '4g9LEg9LQzk', text: () => import('./assets-chunks/styles-TN77NH5T_css.mjs').then(m => m.default)}
  },
};
