<template>
  <div>
    <button class="cta">
      <font-awesome-icon icon="play" />
    </button>
  </div>
</template>

<script>
const ACCESS_TOKEN = "1407651166934bd8aecc0defe98d7b7c";
export default {
  name: 'Frankie',
  data() {
    return {
      text: ""
    }
  },
  methods: {
    api() {
      return new Promise((resolve, reject) => {
        fetch("https://api.dialogflow.com/v1/query", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            query: this.text,
            lang: "en",
            sessionId: Math.random()
              .toString(36)
              .slice(2)
          })
        })
          .then(response => response.json())
          .then(json => resolve(json))
          .catch(error => reject(error));
      });
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.cta {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #65e52c;
  color: #fff;
  border: none;
  font-size: 48px;
  padding: 0;
  outline: none;
  transition: 0.2s;
}
.cta:hover,
.cta:active,
.cta:focus {
  transform: scale(1.1);
}
</style>
