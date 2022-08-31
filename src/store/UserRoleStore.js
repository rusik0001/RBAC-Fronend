import { reactive } from 'vue'

export const userRoleStore = reactive({
  userroles: [],
  setUserRoles(userroles){
    this.userRoles = userroles;
  }
})

