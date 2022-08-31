import { reactive } from 'vue'

export const rolePermissionStore = reactive({
  rolePermissions: [],
  setRolePermissions(rolePermissions){
    this.rolePermissions = rolePermissions;
  }
})
