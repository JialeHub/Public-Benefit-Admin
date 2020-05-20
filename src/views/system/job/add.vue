<template>
  <el-dialog
          title="新增岗位"
          width="500px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px" hide-required-asterisk>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
                v-model="form.sort"
                controls-position="right"
                :min="1">
        </el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId">
        <tree-select
                v-model="form.deptId"
                :options="dept"
                :normalizer="normalizer"
                :default-expand-level="1"
                placeholder=""/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import TreeSelect from '@riophae/vue-treeselect'
  import {addJobApi} from '@/api/job'

  export default {
    name: "AddJob",
    components: {TreeSelect},
    props: {
      dept: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        visible: false,
        form: {
          name: '',
          sort: 999,
          enabled: true,
          deptId: null
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          sort: {required: true, message: '请输入排序', trigger: 'blur'},
          deptId: {required: true, message: '请选择部门', trigger: 'blur'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            addJobApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.SubmitButton.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
