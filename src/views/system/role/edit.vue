<template>
  <el-dialog
          title="编辑角色"
          width="600px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色权限" prop="permission">
            <el-input v-model="form.permission"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色级别" prop="level">
            <el-input-number
                    v-model="form.level"
                    controls-position="right"
                    :min="level">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据范围">
            <el-select v-model="form.dataScope">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="本级" value="本级"></el-option>
              <el-option label="自定义" value="自定义"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数据权限" v-if="form.dataScope==='自定义'">
        <tree-select v-model="form.deptIds"
                     :options="dept"
                     :normalizer="normalizer"
                     multiple
                     :flat="true"
                     :default-expand-level="1"
                     sort-value-by="INDEX"
                     placeholder=""/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.remark"></el-input>
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
  import {editRoleApi} from '@/api/role'

  export default {
    name: "EditRole",
    components: {TreeSelect},
    props: {
      dept: {
        type: Array,
        default: []
      },
      level: {
        type: Number
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
          id: null,
          nameZh: '',
          name: '',
          dataScope: '本级',
          level: 1,
          permission: '',
          deptIds: [],
          remark: ''
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          permission: {required: true, message: '请输入角色权限', trigger: 'blur'},
          level: {required: true, message: '请输入角色级别', trigger: 'blur'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            editRoleApi(data).then(() => {
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

<style lang="scss">
  .el-textarea__inner {
    height: 120px;
  }
</style>
