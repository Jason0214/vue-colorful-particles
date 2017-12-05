<template>
  <div>
    <colorfulParticles :config="particleConfig"></colorfulParticles>
    <div>
      <input type="checkbox" id="mouse-click" v-model="particleConfig.mouse_click">
      <label for="mouse-click">mouse click</label>
      <input type="checkbox" id="mouse-move" v-model="particleConfig.mouse_move">
      <label for="mouse-move">mouse move</label>
      <br/>
      <label for="spawn-interval">spawn interval</label>
      <input type="text" id="spawn-interval" v-model="particleConfig.spawn_interval">
      <input type="checkbox" id="fix-position" v-model="particleConfig.fix_position">
      <label for="fix-position">fix position</label>
      <br/>
      <label for="color">color selection</label>
      <input id = 'color' type="text"  v-model="colorBuf">
      <button @click="parseColorInput">GO</button>
      <br/>
      <label for="radius-min">Radius Min</label>
      <input id="radius-min" type="text" v-model="particleConfig.radius_range[0]">
      <label for="radius-max">Radius Max</label>
      <input id="radius-max" type="text" v-model="particleConfig.radius_range[1]">
      <br/>
      <label for="spawn-min">Spawn Min</label>
      <input id="spawn-min" type="text" v-model="particleConfig.spawn_range[0]">
      <label for="spawn-max">Spawn Max</label>
      <input id="spawn-max" type="text" v-model="particleConfig.spawn_range[1]">
    </div>
  </div>

</template>

<script>
  import colorfulParticles from './colorful-particles'
  export default {
    data () {
      return {
        particleConfig: {
          mouse_click: false,
          mouse_move: true,
          fix_position: false,
          position_list: [[400, 400], [800, 400]],
          spawn_range: [1, 4],
          radius_range: [4, 20],
          colors: [],
          spawn_interval: 200
        },

        radius_min: 4,
        radius_max: 10,
        colorBuf: '#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900,#FF4E50,#F9D423'
      }
    },
    mounted () {
    },
    components: {
      colorfulParticles
    },
    methods: {
      parseColorInput: function () {
        this.particleConfig.colors = this.colorBuf.split(',')
      }
    }
  }
</script>

<style scoped>
</style>
