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
        <td :style="{'background-color': getBGColor(item)}">{{ item.time }}</td>
        <td :style="{'background-color': getBGColor(item)}">{{ item.jewel }}</td>
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
        { time: "５：３０", jewel: "ジュエルラッシュ", min: 5, sec: 30, ontime: false },
        { time: "４：５５", jewel: "ジュエルラッシュ", min: 4, sec: 55, ontime: false },
        { time: "４：３０", jewel: "ボーナスジュエル (内周)", min: 4, sec: 30, ontime: false },
        { time: "４：２０", jewel: "ジュエルラッシュ", min: 4, sec: 20, ontime: false },
        { time: "３：４５", jewel: "ジュエルラッシュ", min: 3, sec: 45, ontime: false },
        { time: "３：３０", jewel: "ボーナスジュエル (外周)", min: 3, sec: 30, ontime: false },
        { time: "３：１０", jewel: "ジュエルラッシュ", min: 3, sec: 10, ontime: false },
        { time: "２：３５", jewel: "ジュエルラッシュ", min: 2, sec: 35, ontime: false },
        { time: "２：３０", jewel: "ボーナスジュエル (内周)", min: 2, sec: 30, ontime: false },
        { time: "２：００", jewel: "ジュエルラッシュ", min: 2, sec: 0, ontime: false },
        { time: "１：３０", jewel: "ボーナスジュエル (外周)", min: 1, sec: 30, ontime: false },
        { time: "１：２５", jewel: "ジュエルラッシュ", min: 1, sec: 25, ontime: false },
        { time: "０：５０", jewel: "ジュエルラッシュ", min: 0, sec: 50, ontime: false },
        { time: "０：３０", jewel: "ボーナスジュエル (内周)", min: 0, sec: 30, ontime: false }
      ]
    }
  },
  methods: {
    // タイマーカウント関数(1秒ごとに呼び出される)
    timer_count: function() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if(this.sec <= 0 && this.min <= 0) {
        clearInterval(this.timerObj)
        this.timerOn = false
        this.min = 6
        this.sec = 0
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].ontime = false
        }
      } else {
        this.sec --;
      }

      for (let i = 0; i < this.items.length; i++) {
        if (this.min == this.items[i].min && this.sec == this.items[i].sec) {
          this.items[i].ontime = true
        }
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
    },

    getBGColor(item) {
      return item.ontime ? '#606000' : 'black'
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
