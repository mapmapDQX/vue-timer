<template>
  <div id="timer">
    <div class="timer">
      <div class="time">
        {{ formatTime }}
      </div>
      <div class="button">
        <button v-on:click="start_timer" v-if="!timerOn">Start</button>
        <button v-on:click="stop_timer" v-if="timerOn">Stop</button>
      </div>
    </div>
  </div>
  <table class="table" border="1">
    <thead>
      <tr>
        <th scope="col">残り時間</th>
        <th scope="col">ジュエル</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.time }}</td>
        <td>{{ item.jewel }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'timer',
  data() {
    return {
      min: 6,
      sec: 0,
      timerOn: false,
      timerObj: null,
      items: [
        { time: "５：３０", jewel: "ジュエルラッシュ" },
        { time: "４：５５", jewel: "ジュエルラッシュ" },
        { time: "４：３０", jewel: "ボーナスジュエル (内周)" },
        { time: "４：２０", jewel: "ジュエルラッシュ" },
        { time: "３：４５", jewel: "ジュエルラッシュ" },
        { time: "３：３０", jewel: "ボーナスジュエル (外周)" },
        { time: "３：１０", jewel: "ジュエルラッシュ" },
        { time: "２：３５", jewel: "ジュエルラッシュ" },
        { time: "２：３０", jewel: "ボーナスジュエル (内周)" },
        { time: "２：００", jewel: "ジュエルラッシュ" },
        { time: "１：３０", jewel: "ボーナスジュエル (外周)" },
        { time: "１：２５", jewel: "ジュエルラッシュ" },
        { time: "０：５０", jewel: "ジュエルラッシュ" },
        { time: "０：３０", jewel: "ボーナスジュエル (内周)" },
      ]
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
}
.time {
  display: inline;
  font-size: 30px;
}
.button {
  display: inline;
}
</style>
