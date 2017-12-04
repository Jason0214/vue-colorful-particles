<template>
  <div id="particle-container">
  </div>
</template>

<script>
  import sketch from 'sketch-js'
  function Particle () {
    this.init()
  }
  Particle.prototype = {
    init: function (x, y, radius) {
      this.alive = true
      this.radius = radius || 10
      this.wander = 0.15
      this.theta = random(0, 2 * Math.PI)
      this.drag = 0.92
      this.color = '#fff'
      this.x = x || 0.0
      this.y = y || 0.0
      this.vx = 0.0
      this.vy = 0.0
    },
    move: function () {
      this.x += this.vx
      this.y += this.vy
      this.vx *= this.drag
      this.vy *= this.drag
      this.theta += random(-0.5, 0.5) * this.wander
      this.vx += Math.sin(this.theta) * 0.1
      this.vy += Math.cos(this.theta) * 0.1
      this.radius *= 0.96
      this.alive = this.radius > 0.5
    },
    draw: function (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }
  function random (min, max) {
    if (Array.isArray(min) && max === undefined) {
      return min[Math.round(random(0, min.length))]
    }
    return Math.random() * (max - min) + min
  }
  let MAX_PARTICLES = 280
  let COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423']
  let particles = []
  let pool = []
  export default {
    data () {
      return {
        demo: null
      }
    },
    mounted () {
      // console.log(this.$el)
      // init demo container
      this.demo = sketch.create({
        container: this.$el,
        retina: 'auto'
      })
      this.demo.spawn = function (x, y) {
        let particle, theta, force
        if (particles.length >= MAX_PARTICLES) {
          pool.push(particles.shift())
        }
        particle = pool.length ? pool.pop() : new Particle()
        particle.init(x, y, random(5, 40))
        particle.wander = random(0.5, 2.0)
        particle.color = random(COLOURS)
        particle.drag = random(0.9, 0.99)
        theta = random(0, Math.PI * 2)
        force = random(2, 8)
        particle.vx = Math.sin(theta) * force
        particle.vy = Math.cos(theta) * force
        particles.push(particle)
      }
      this.demo.update = function () {
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
      this.demo.draw = function () {
        this.globalCompositeOperation = 'lighter'
        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].draw(this)
        }
      }
      this.demo.mousemove = function () {
        let touch, max, i, j, n
        for (i = 0, n = this.touches.length; i < n; i++) {
          touch = this.touches[i]
          max = random(1, 4)
          for (j = 0; j < max; j++) {
            this.spawn(touch.x, touch.y)
          }
        }
      }
    },
    methods: {
      // mousemove: function (event) {
      //   let touch, max, i, j, n
      //   for (i = 0, n = this.demo.touches.length; i < n; i++) {
      //     touch = this.demo.touches[i]
      //     max = random(1, 4)
      //     for (j = 0; j < max; j++) {
      //       this.spawn(touch.x, touch.y)
      //     }
      //   }
      // }
    }
  }
</script>

<style scoped>
  #particle-container{
    background: #222;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  canvas{
    all: inherit;
  }
</style>
