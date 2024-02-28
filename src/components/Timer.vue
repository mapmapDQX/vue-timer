<template>
  <div id="timer">
    <div class="timer">
      <div class="time">{{ formatTime }}</div>
      <div class="button" @click="start_timer" v-if="!timerOn">Start</div>
      <div class="button" @click="stop_timer" v-if="timerOn">Stopt</div>
    </div>
  </div>
  <table class="table" style="font-size: 24px" border="1">
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
      sec: 330,
      timerOn: false,
      timerObj: null,
      items: [
        { time: "５：３０", jewel: "スタート", sec: 325, ontime: false },
        { time: "４：５５", jewel: "ジュエルラッシュ", sec: 295, ontime: false },
        { time: "４：３０", jewel: "ボーナスジュエル (内周)", sec: 270, ontime: false },
        { time: "４：２０", jewel: "ジュエルラッシュ", sec: 260, ontime: false },
        { time: "３：４５", jewel: "ジュエルラッシュ", sec: 225, ontime: false },
        { time: "３：３０", jewel: "ボーナスジュエル (外周)", sec: 210, ontime: false },
        { time: "３：１０", jewel: "ジュエルラッシュ", sec: 190, ontime: false },
        { time: "２：３５", jewel: "ジュエルラッシュ", sec: 155, ontime: false },
        { time: "２：３０", jewel: "ボーナスジュエル (内周)", sec: 150, ontime: false },
        { time: "２：００", jewel: "ジュエルラッシュ", sec: 120, ontime: false },
        { time: "１：３０", jewel: "ボーナスジュエル (外周)", sec: 90, ontime: false },
        { time: "１：２５", jewel: "ジュエルラッシュ", sec: 85, ontime: false },
        { time: "０：５０", jewel: "ジュエルラッシュ", sec: 50, ontime: false },
        { time: "０：３０", jewel: "ボーナスジュエル (内周)", sec: 30, ontime: false }
      ]
    }
  },
  methods: {
    // タイマーカウント関数(1秒ごとに呼び出される)
    timer_count: function() {
      // 残り時間が一致するテーブル行の色を変える
      for (let i = 0; i < this.items.length; i++) {
        if (this.sec == this.items[i].sec + 5) {
          this.items[i].ontime = true
        }
      }
      // タイマーカウント処理
      if(this.sec <= 0) {
        clearInterval(this.timerObj)
        this.timerOn = false
        this.sec = 330
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].ontime = false
        }
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
    },

    getBGColor(item) {
      return item.ontime ? '#606000' : 'black'
    }
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        Math.floor(this.sec / 60).toString(),
        (this.sec % 60).toString()
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
  font-size: 40px;
}
.button {
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  display: inline-block;
  border: 2px solid rgb(255,194,64);
  background: linear-gradient(to bottom, rgb(255,244,92), rgb(240,229,86));
  font-size: 30px;
  color: black;
}
</style>
