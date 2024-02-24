<template>
  <div id="timer">
    <div class="timer">
      <div class="time">
        {{ formatTime }}
      </div>
      <button v-on:click="start_timer" v-if="!timerOn">Start</button>
      <button v-on:click="stop_timer" v-if="timerOn">Stop</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'timer',
  data() {
    return {
      min: 0,
      sec: 10,
      timerOn: false,
      timerObj: null,
    }
  },
  methods: {
    timer_count: function() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if(this.sec <= 0 && this.min <= 0) {
        clearInterval(this.timerObj)
        this.timerOn = false
        this.min = 6
        this.sec = 0
      } else {
        this.sec --;
      }
    },

    start_timer: function() {
      let self = this;
      this.timerObj = setInterval(function() {self.timer_count()}, 1000)
      this.timerOn = true; //timerがONであることを状態として保持
    },

    stop_timer: function() {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    }
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        this.min.toString(),
        this.sec.toString()
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]
    }
  }
}
</script>

<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  font-size: 100px;
}
</style>
