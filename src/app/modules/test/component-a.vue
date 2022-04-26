<template>
    <div id="componentA">
        <input type="text" v-model="msg"/>
    </div>
</template>

<script>

export default {
  data: function () {
    return {
      msg: 'This is component A'
    };
  },
  methods: {

  },
  created: function () {},
  computed: {

  },
  mounted: function () {
    console.log('Mounted component-a.vue component');
  },
  watch: {

  }
};

</script>

<style scoped>
</style>
