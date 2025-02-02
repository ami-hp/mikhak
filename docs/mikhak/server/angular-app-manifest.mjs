
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
    'index.csr.html': {size: 2801, hash: '500c6518cb81789448f624b3e4c1f1d60dcc57b3fac42e9c4b596f98c35e2efc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1159, hash: '9c37d599adf57c75231343483a2c60707b8416bc2eb4881d671674adf6b5720f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12455, hash: 'd08ea1a23a3935b1655a288be381add42cd8e905165d674a96c5e8795de1f7b5', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 39664, hash: 'd43f5e02ed2b2fc5e28f01bbea1daec686becd0ad9af2af8060eda2ecc160556', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-A5QH4QQ7.css': {size: 14940, hash: 'Rxr6+sk+OJw', text: () => import('./assets-chunks/styles-A5QH4QQ7_css.mjs').then(m => m.default)}
  },
};
