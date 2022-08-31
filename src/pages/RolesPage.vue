<template>
  <q-btn color="primary" icon="add_circle_outline" label="Create Role" class="q-mt-md q-ml-md" @click="toggleRoleCreateModal"/>

    <div class="q-pa-md">
      <q-table
        title="Role"
        :rows="roleStore.roles"
        :columns="columns"
        row-key="name"
        @row-click="roleEdit"
      />
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card>
          <q-card-actions align="right" class="text-primary">
            <RoleCreateForm />
          </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import RoleCreateForm from 'src/components/Roles/RoleCreateForm.vue'
  import { roleStore } from "../store/RoleStore"

  const columns =  [{
        name: 'name',
        label: 'name',
        align: 'left',
        field:'name'
    }
  ]

  export default defineComponent({
    name: "RolePage",
    components: {
      RoleCreateForm
    },
    setup() {
        const prompt = ref(false)

        const toggleRoleCreateModal = () => {
          prompt.value = !prompt.value;
        }

        const roleEdit = (event, row) => {
          console.log(`Edit ${row.name}`)
        }

        return { columns, prompt, roleStore , roleEdit , toggleRoleCreateModal};
    },

})
  </script>
