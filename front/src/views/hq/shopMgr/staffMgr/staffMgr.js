import UserMgr from './components/userMgr/userMgr.vue'
import RoleMgr from './components/roleMgr/roleMgr.vue'
import DeptMgr from './components/deptMgr/deptMgr.vue'

export default {
  components: {
    UserMgr,
    RoleMgr,
    DeptMgr
  },
  data() {
    return {
      activeTab: 'userMgr'
    }
  },
  methods: {
    handleClick(tab, event) {
      // if (tab.label == '人员管理') { //eslint-disable-line
      //   this.$store.dispatch('FetchRoleList', { name: '' })
      //   // this.$store.dispatch('FetchDeptList', { name: '' })
      // }
      // if (tab.label == '角色管理') { //eslint-disable-line
      //   this.$store.dispatch('FetchRoleList', { name: '' })
      // }
      // if (tab.label == '部门管理') { //eslint-disable-line
      //   // this.$store.dispatch('FetchDeptList', { name: '' })
      // }
    }
  }
}
