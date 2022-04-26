<template>
    <div id="componentB">
        <input type="text" v-model="msg"/>
    </div>
</template>

<script>

export default {
  data: function () {
    return {
      msg: 'This is component B'
    };
  },
  methods: {

  },
  created: function () {},
  computed: {

  },
  mounted: function () {
    console.log('Mounted component-b.vue component');
  },
  watch: {

  }
};

</script>

<style scoped>
</style>
