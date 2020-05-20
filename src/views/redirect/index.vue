<script>
  export default {
    name: 'Redirect',
    created() {
      const {query} = this.$route;
      this.$router.replace({name: query.name})
    },
    render(h) {
      return h()
    },
  }
</script>
