
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/mikhak',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/mikhak/login",
    "route": "/mikhak"
  },
  {
    "renderMode": 2,
    "route": "/mikhak/login"
  }
],
  assets: {
    'index.csr.html': {size: 2738, hash: '915ca6e687d51ec8e2a9e5adb0fa985938a517402faa08ea14fef348455216a9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1096, hash: 'ead3f65116ba231491f01153c80f89da2e1b58604a318c75c26898024c77f7e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12622, hash: '29303e6c33dd8147e67d1ca79b4ef2c23fc458ea6235fe788b7cc08cd0ad4de2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-QHUSWRAP.css': {size: 11194, hash: '9kjFpYJdzmE', text: () => import('./assets-chunks/styles-QHUSWRAP_css.mjs').then(m => m.default)}
  },
};
