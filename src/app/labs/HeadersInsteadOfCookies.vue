<template>
  <div class="hello">
    Switch the backend to accept headers instead of cookies.
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    console.log(process.env.VUE_APP_API_URL);
    console.log(process);

    const url = 'yoyo';
    axios.defaults.headers.common.Authorization = localStorage.getItem('authToken');
    axios.get(process.env.VUE_APP_API_URL + url)
      .then((dataResponse) => {
        console.log('API Response : ', dataResponse);
      })
      .catch((error) => {
        console.error('API Error : ', error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
