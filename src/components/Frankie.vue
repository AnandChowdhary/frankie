<template>
  <div>
    <button class="cta">
      <font-awesome-icon @click="init" v-if="status === 0" icon="play" />
      <font-awesome-icon @click="startSpeechRecognition" v-else-if="status === 1" icon="microphone" />
      <font-awesome-icon v-else icon="microphone-slash" />
    </button>
    <select class="languages" v-model="selectedVoice">
      <option v-for="(language, id) in languages" v-bind:key="`lang-${id}`" :value="language.name">{{language.name}}</option>
    </select>
  </div>
</template>

<script>
const ACCESS_TOKEN = '1407651166934bd8aecc0defe98d7b7c';
const recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // eslint-disable-line
const synthesis = window.speechSynthesis;
const socket = new WebSocket('ws://localhost:8085');
export default {
  name: 'Frankie',
  data() {
    return {
      text: '',
      status: 0,
      selectedVoice: null,
      languages: null
    }
  },
  watch: {
    languages() {
      if (!this.selectedVoice) {
        this.selectedVoice = this.languages[0];
      }
    },
    status() {
      socket.send(status);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // Speech recognition
			recognition.onresult = event => {
        this.status = 1;
        const query = event.results[0][0].transcript;
        this.api(query).then(reply => {
					try {
						reply = reply.result.speech;
					} catch (e) {
						reply = "I don't know what to say...";
          }
          this.speak(reply).then(() => {
            this.startSpeechRecognition();
          });
        }).catch(() => {});
      }
      // Websocket
      socket.onmessage = event => {
        if (event.data.includes('yes')) {
          if (this.status < 2) {
            this.startSpeechRecognition();
          }
        }
      }
      // Speech synthesis
      this.languages = synthesis.getVoices();
      // Start program
      this.status = 1;
    },
    startSpeechRecognition() {
      recognition.start();
      this.status = 2;
    },
    api(query) {
      return new Promise((resolve, reject) => {
        fetch('https://api.dialogflow.com/v1/query', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            query: query,
            lang: 'en',
            sessionId: Math.random()
              .toString(36)
              .slice(2)
          })
        })
          .then(response => response.json())
          .then(json => resolve(json))
          .catch(error => reject(error));
      });
    },
    speak(text) {
      return new Promise(resolve => {
        const utterance = new SpeechSynthesisUtterance(text);
				for (let i = 0; i < this.languages.length; i++) {
					if (this.languages[i].name == this.selectedVoice) {
						utterance.voice = this.languages[i];
						break;
					}
				}
				utterance.onend = () => { resolve(); };
        speechSynthesis.speak(utterance);
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
.languages {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
}
</style>
