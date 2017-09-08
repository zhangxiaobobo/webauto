var mkdirp = require('mkdirp');

var src_img = './src/img/',
  src_img_public = './src/img/public/',
  src_img_test = './src/img/test/',

  src_views = './src/views/',
  src_views_data = './src/views/data',
  src_views_components = './src/views/components',

  src_js = './src/js/',
  src_js_public = './src/js/public/',
  src_js_page = './src/js/page/',
  src_js_plugin = './src/js/plugin/',

  src_lang = './src/lang/',
  src_lang_en = './src/lang/en/',
  src_lang_cn = './src/lang/cn/',

  src_scss = './src/scss/',
  src_scss_page = './src/scss/page/',
  src_scss_plugin = './src/scss/plugin/',
  src_scss_public = './src/scss/public/',
  src_scss_skin = './src/scss/skin/';

var dirs = [src_img, src_img_public, src_img_test, src_views, src_views_data, src_views_components, src_js, src_js_public, src_js_page, src_js_plugin, src_lang, src_lang_en, src_lang_cn, src_scss, src_scss_page, src_scss_plugin, src_scss_plugin, src_scss_public, src_scss_skin];

var flag = dirs.forEach(dir => {
  mkdirp.sync(dir);
  console.log('mkdir success' + dir);
});
