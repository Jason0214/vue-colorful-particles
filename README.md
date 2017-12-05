# vue-colorful-particles

> A Vue.js project 

## Description
**Vue implementation of [sketch.js/particles](http://soulwire.github.io/sketch.js/examples/particles.html)**

**this project [demo](https://g.lujc.me)**

## Use
``` bash
npm install vue-colorful-particles --save
```

**Set some of the following parameters and Pass the object to the component through props `config`**

``` javascript 
{
    // enable spawn particles on mouse event
    mouse_move: true,
    mouse_click: true,
    
    // enable spawn particles on some fix point
    fix_position: true,
    position_list: [[100, 100], [200, 423], ...],
    spawn_interval: 200, 

    // set a list colors from which particle would randomly choose a color
    colors: ['#000', '#123456', ...],

    // in every spawn, number of particles generated is in the range of `spawn_range`
    spawn_range: [1, 4],

    // new generated particles radius would be in the range of `radius_range`
    radius_range: [10, 20],

    // in every time quantum, particle would shrink in a fixed ratio 
    radius_decrease_speed: 0.96,

    // maximum particles allowd
    max_particles: 200,

    // background color
    background: '#222'
}
```


## Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
