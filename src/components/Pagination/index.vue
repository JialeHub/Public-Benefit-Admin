<template>
  <div class="pagination">
    <el-pagination
            v-if="total > 0"
            :page-sizes="page_sizes"
            :page-size="size"
            :layout="layout"
            :total="total"
            :current-page.sync="current"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data() {
      return {
        current: 1,
        total: 0,
        size: 10,
        page_sizes: [10, 20, 50, 100, 200],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    },
    created() {
      this.size = this.$storeGet.setting.pagingSize
    },
    watch: {
      total(newValue, oldValue) {
        let size = this.size;
        if (
            newValue % size === 0
            && newValue === oldValue - 1
            && oldValue !== 1
        ) {
          setTimeout(() => {
            this.$emit("getNewData");
          }, 500);
        }
      }
    },
    methods: {
      handleCurrentChange(current) {
        this.current = current;
        this.$emit("getNewData");
      },
      handleSizeChange(size) {
        this.size = size;
        this.$emit("getNewData");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pagination {
    background-color: #fff;
    padding: 10px 0 0 2px;
  }
</style>
