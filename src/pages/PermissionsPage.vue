<template>
  <q-btn color="primary" icon="add_circle_outline" label="Create Permission" class="q-mt-md q-ml-md" @click="togglePermissionCreateModal"/>

    <div class="q-pa-md">
      <q-table
        title="Permission"
        :rows="permissionStore.permissions"
        :columns="columns"
        row-key="name"
        @row-click="roleEdit"
      />
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card>
          <q-card-actions align="right" class="text-primary">
            <PermissionCreateForm />
          </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import PermissionCreateForm from 'src/components/Permissions/PermissionCreateForm.vue'
  import { permissionStore } from "../store/PermissionStore"

  const columns =  [{
        name: 'name',
        label: 'name',
        align: 'left',
        field:'name'
    }
  ]

  export default defineComponent({
    name: "PermissionPage",
    components: {
      PermissionCreateForm
    },
    setup() {
        const prompt = ref(false)

        const togglePermissionCreateModal = () => {
          prompt.value = !prompt.value;
        }

        const roleEdit = (event, row) => {
          console.log(`Edit ${row.name}`)
        }

        return { columns, prompt, permissionStore , roleEdit , togglePermissionCreateModal};
    },

})
  </script>
