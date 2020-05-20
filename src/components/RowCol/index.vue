<template>
  <el-row>
    <el-col :span="12">
      <slot name="l"/>
    </el-col>
    <el-col :span="12">
      <slot name="r"/>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "RowCol"
  }
</script>
