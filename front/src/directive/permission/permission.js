
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const funcs = store.getters && store.getters.funcs

    if (value) {
      const hasFunc = funcs.some(func => String(value) === String(func))
      if (!hasFunc) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need funcKey! Like v-permission="1001"`)
    }

    // if (value && value instanceof Array && value.length > 0) {
    //   const permissionRoles = value

    //   const hasPermission = roles.some(role => {
    //     return permissionRoles.includes(role)
    //   })

    //   if (!hasPermission) {
    //     el.parentNode && el.parentNode.removeChild(el)
    //   }
    // } else {
    //   throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    // }
  }
}
