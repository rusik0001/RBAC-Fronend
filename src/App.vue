<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { userStore } from "./store/UserStore"
import { roleStore } from "./store/RoleStore"
import { permissionStore } from "./store/PermissionStore"
import { userRoleStore } from './store/UserRoleStore'
import { rolePermissionStore } from './store/RolePermissionStore'

export default defineComponent({
  name: 'App',
  setup(){
    console.log(userStore.users)
    onMounted(()=>{
          //first version => refactoring required
          fetch("http://localhost:3003/api/v1/users").then( resp => resp.json())
          .then((jsonResp)=>{
            console.log(jsonResp.message);
            if(jsonResp.status === 200) userStore.setUsers(jsonResp.data)
            })
          .catch((e)=>{
            console.error(e)
          })

          fetch("http://localhost:3003/api/v1/roles").then( resp => resp.json())
          .then((jsonResp)=>{
            console.log(jsonResp.message);
            if(jsonResp.status === 200) roleStore.setRoles(jsonResp.data)
            })
          .catch((e)=>{
            console.error(e)
          })

          fetch("http://localhost:3003/api/v1/permissions").then( resp => resp.json())
          .then((jsonResp)=>{
            console.log(jsonResp.message);
            if(jsonResp.status === 200) permissionStore.setPermissions(jsonResp.data)
            })
          .catch((e)=>{
            console.error(e)
          })

          fetch("http://localhost:3003/api/v1/userrole").then( resp => resp.json())
          .then((jsonResp)=>{
            console.log(jsonResp.message);
            if(jsonResp.status === 200) userRoleStore.setUserRoles(jsonResp.data)
            })
          .catch((e)=>{
            console.error(e)
          })

          fetch("http://localhost:3003/api/v1/rolepermission").then( resp => resp.json())
          .then((jsonResp)=>{
            console.log(jsonResp.message);
            if(jsonResp.status === 200) rolePermissionStore.setRolePermissions(jsonResp.data)
            })
          .catch((e)=>{
            console.error(e)
          })
        })
  }
})
</script>
