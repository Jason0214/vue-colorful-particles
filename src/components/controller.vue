<template>
  <div>
    <colorfulParticles :config="particleConfig"></colorfulParticles>
    <div>
      <input type="checkbox" id="mouse-click" v-model="particleConfig.mouse_click">
      <label for="mouse-click">mouse click</label>
      <input type="checkbox" id="mouse-move" v-model="particleConfig.mouse_move">
      <label for="mouse-move">mouse move</label>
      <input type="checkbox" id="fix-position" v-model="particleConfig.fix_position">
      <label for="fix-position">fix position</label>
    </div>
  </div>

</template>

<script>
  import colorfulParticles from './colorful-particles'
  export default {
    data () {
      return {
        particleConfig: {
          mouse_click: true,
          mouse_move: false,
          fix_position: false,
          position_list: [[400, 400]],
          spawn_range: [1, 4]
        }
      }
    },
    mounted () {
    },
    components: {
      colorfulParticles
    },
    methods: {
      check: function () {
        console.log(this.particleConfig)
      }
    }
  }
</script>

<style scoped>
</style>
