import repeatdely from './repeatdely'

const install = function(Vue) {
  Vue.directive('repeatdely', repeatdely)
}

if (window.Vue) {
  window['repeatdely'] = repeatdely
  Vue.use(install); // eslint-disable-line
}

repeatdely.install = install
export default repeatdely
