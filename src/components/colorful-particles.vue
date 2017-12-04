<template>
  <div id="particle-container" :style="{background:this.BACKGROUND}">
  </div>
</template>

<script>
  import sketch from 'sketch-js'

  function random (min, max) {
    if (Array.isArray(min) && max === undefined) {
      return min[Math.round(random(0, min.length - 1))]
    }
    return Math.random() * (max - min) + min
  }

  function Particle () {
    this.init()
  }

  let context = null
  let particles = []
  let pool = []

  export default {
    data () {
      return {
        BACKGROUND: '#222',
        // particle config
        MAX_PARTICLES: 200,
        COLORS: ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'],
        RADIUS_DECREASE_SPEED: 0.96,
        RADIUS_RANGE: [5, 40],
        SPAWN_RANGE: [1, 4],

        // particle display config
        MOUSE_MOVE: true,
        MOUSE_CLICK: false,
        FIX_POSITION: false,
        POSITION_LIST: [[400, 400]],
        SPAWN_INTERVAL: 200,

        timeoutVar: null
      }
    },
    props: ['config'],
    watch: {
      config: function () {
        this.MOUSE_MOVE = this.config['mouse_move'] || false
        this.MOUSE_CLICK = this.config['mouse_click'] || false
        this.FIX_POSITION = this.config['fix_position'] || false
        if (this.FIX_POSITION) {
          this.POSITION_LIST = this.config['position_list']
          this.SPAWN_INTERVAL = this.config['spawn_interval']
        }
        this.SPAWN_RANGE = this.config['spawn_range'] || [4, 10]
        this.RADIUS_RANGE = this.config['radius_range'] || [5, 40]
        this.COLORS = this.config['colors'] || ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423']
        this.MAX_PARTICLES = this.config['max_particles'] || 200
        this.BACKGROUND = this.config['background'] || '#222'
      }
    },
    mounted () {
      // init context
      context = sketch.create({
        container: this.$el,
        retina: 'auto'
      })
      this.configContext(this.MAX_PARTICLES, this.SPAWN_RANGE[0], this.SPAWN_RANGE[1], this.POSITION_LIST)
      this.configParticle(this.RADIUS_DECREASE_SPEED, this.RADIUS_RANGE[0], this.RADIUS_RANGE[1], this.COLORS)
    },
    methods: {
      configContext: function (maxParticles, particleGenerateMin, particleGenerateMax, positionList) {
        context.spawn = function (x, y) {
          let particle
          if (particles.length >= maxParticles) {
            pool.push(particles.shift())
          }
          particle = pool.length ? pool.pop() : new Particle()
          particle.init(x, y)
          particles.push(particle)
        }
        context.update = () => {
          let i, particle
          for (i = particles.length - 1; i >= 0; i--) {
            particle = particles[i]
            if (particle.alive) {
              particle.move()
            } else {
              pool.push(particles.splice(i, 1)[0])
            }
          }
        }
        context.draw = function () {
          this.globalCompositeOperation = 'lighter'
          for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].draw(this)
          }
        }
        if (this.MOUSE_MOVE || this.MOUSE_CLICK) {
          // init callback
          let eventCallBack = () => {
            let touch, max, i, j, n
            for (i = 0, n = context.touches.length; i < n; i++) {
              touch = context.touches[i]
              max = random(particleGenerateMin, particleGenerateMax)
              for (j = 0; j < max; j++) {
                context.spawn(touch.x, touch.y)
              }
            }
          }

          // bind callback
          if (this.MOUSE_MOVE) {
            context.mousemove = eventCallBack
          } else {
            context.mousemove = undefined
          }
          if (this.MOUSE_CLICK) {
            context.click = eventCallBack
          } else {
            context.click = undefined
          }
        }

        if (this.FIX_POSITION) {
          if (this.timeoutVar) {
            clearInterval(this.timeoutVar)
            this.timeoutVar = null
          }

          this.timeoutVar = setInterval(() => {
            for (let i = 0; i < positionList.length; i++) {
              let max = random(particleGenerateMin, particleGenerateMax)
              for (let j = 0; j < max; j++) {
                context.spawn(positionList[i][0], positionList[i][1])
              }
            }
          }, this.SPAWN_INTERVAL)
        } else {
          if (this.timeoutVar) {
            clearInterval(this.timeoutVar)
            this.timeoutVar = null
          }
        }
      },
      configParticle: function (radiusDecreaseSpeed, radiusMin, radiusMax, colors) {
        Particle.prototype = {
          init: function (x, y) {
            this.alive = true
            this.radius = random(radiusMin, radiusMax)
            this.color = random(colors)
            this.wander = random(0.5, 2.0)
            this.drag = random(0.9, 0.99)
            let force = random(2, 8)
            this.theta = random(0, Math.PI * 2)
            this.x = x
            this.y = y
            this.vx = Math.sin(this.theta) * force
            this.vy = Math.cos(this.theta) * force
          },
          move: function () {
            this.x += this.vx
            this.y += this.vy
            this.vx *= this.drag
            this.vy *= this.drag
            this.theta += random(-1, 1) * this.wander
            this.vx += Math.sin(this.theta) * 0.1
            this.vy += Math.cos(this.theta) * 0.1
            this.radius *= radiusDecreaseSpeed
            this.alive = this.radius > 0.5
          },
          draw: function (context) {
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            context.fillStyle = this.color
            context.fill()
          }
        }
      }
    }
  }
</script>

<style scoped>
  #particle-container{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: inherit;
  }
  canvas{
    all: inherit;
  }
</style>
