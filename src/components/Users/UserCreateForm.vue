<template>
  <div class="q-pa-md">

    <q-form
      @submit="onSubmit"
      class="q-gutter-lg"
    >
      <q-input
        filled
        v-model="firstname"
        label="Your firstname *"
        hint="Firstname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your firstname']"
      />

      <q-input
        filled
        v-model="lastname"
        label="Your lastname *"
        hint="Lirstname"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your lastname',
        ]"
      />
      <q-input
        filled
        v-model="email"
        label="Your E-Mail *"
        hint="E-Mail"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age'
        ]"
      />
      <q-input
        filled
        v-model="tel"
        label="Your phone number *"
        hint="Phone Number"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
        ]"
      />
        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-select
              filled
              v-model="rolemodel"
              multiple
              :options="options"
              counter
              hint="Roles"
              style="width: 250px"
              :rules="[
                val => val !== null && val !== '' || 'Please select at least one role',
              ]"
            ></q-select>
          </div>
        </div>

        <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn flat right label="Cancel" class="q-mr-xl" v-close-popup="popupSwitch" @click="togglePopupSwitch"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { userStore } from "src/store/UserStore";
import { roleStore } from "src/store/RoleStore";

export default defineComponent({
    name: "UserCreateForm",
    setup(){
      const firstname = ref();
      const lastname = ref();
      const email = ref();
      const tel = ref();
      const popupSwitch = ref(false)
      const rolemodel = ref(null)
      const options = roleStore.roles.map((role)=> role.name)

      const onSubmit = () => {
        let selectedRoleIds = []

        rolemodel.value.forEach((selectedRole)=>{
          selectedRoleIds.concat(getRoleIdByName(selectedRole))
        })

        const newUser = {firstname: firstname.value, lastname: lastname.value, email: email.value, tel: tel.value}

        //own fetch compoonent => improve readable
        fetch('http://localhost:3003/api/v1/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        }).then((resp)=>{
          return resp.json()
        }).then((jsonResp)=>{
          const userCache = userStore.users;
          userCache.push(jsonResp.data) //including user _id
          userStore.setUsers(userCache)

          fetch('http://localhost:3003/api/v1/userroles', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userid: jsonResp.data._id,
              roles: selectedRoleIds
            })
          }).then((resp)=>{
            return resp.json()
          }).then((jsonResp)=>{
            console.log(jsonResp)
          })
          .catch((e)=>{
            console.error(e)
          })
        })
        .catch((e)=>{
          console.error(e)
        })


      }

      const togglePopupSwitch = () =>{
        popupSwitch.value = !popupSwitch.value;
      }

      const getRoleIdByName = (rolename) => {
        const temp = roleStore.roles.map((role)=> role.name === rolename ? role._id : null)
        return temp.filter(val => val)
      }

      return { firstname, lastname, email, tel, popupSwitch, rolemodel, options ,onSubmit , togglePopupSwitch , roleStore}
    }
})

</script>
