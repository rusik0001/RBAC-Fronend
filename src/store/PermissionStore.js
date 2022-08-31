import { reactive } from 'vue'

export const permissionStore = reactive({
  permissions: [],
  setPermissions(permissions){
    this.permissions = permissions;
  }
})
