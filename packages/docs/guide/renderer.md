# Renderer

## plotly renderer <sup style="color:#42b983">New in 0.4.6+</sup>

No longer include plotly-renderer in vue-pivottable, but you can use it like this:

### Install

```bash
npm install @vue-pivottable/plotly-renderer
```

### Usage

Just define a custom `renderer` function and pass it as props.

#### es6

```js
import PlotlyRenderer from '@vue-pivottable/plotly-renderer'

const renderer = (() => ({
  'Grouped Column Chart': PlotlyRenderer['Grouped Column Chart'],
  'Stacked Column Chart': PlotlyRenderer['Stacked Column Chart'],
  'Grouped Bar Chart': PlotlyRenderer['Grouped Bar Chart'],
  'Stacked Bar Chart': PlotlyRenderer['Stacked Bar Chart'],
  'Line Chart': PlotlyRenderer['Line Chart'],
  'Dot Chart': PlotlyRenderer['Dot Chart'],
  'Area Chart': PlotlyRenderer['Area Chart'],
  'Scatter Chart': PlotlyRenderer['Scatter Chart'],
  'Multiple Pie Chart': PlotlyRenderer['Multiple Pie Chart']
}))()
```

#### browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plotly Renderer</title>
  <link rel="stylesheet" href="https://unpkg.com/vue-pivottable@0.4.5/dist/vue-pivottable.css">
  <script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-pivottable@0.4.5/dist/vue-pivottable.umd.js"></script>
  <script src="dist/plotly-renderer.umd.js"></script>
</head>
<body>
  <div id="app">
    <vue-pivottable-ui
      :data="[{color: 'blue', shape: 'circle'},{color: 'red', shape: 'triangle'}]"
      renderer-name="Area Chart"
      :renderers="renderers"
      :rows="['color']"
      :cols="['shape']"
    >
    </vue-pivottable-ui>
  </div>
  <script type="text/javascript">
    Vue.use(VuePivottable.default)
    new Vue({
      el: '#app',
      computed: {
        renderers () {
          return (() => ({
            'Grouped Column Chart': PlotlyRenderer['Grouped Column Chart'],
            'Stacked Column Chart': PlotlyRenderer['Stacked Column Chart'],
            'Grouped Bar Chart': PlotlyRenderer['Grouped Bar Chart'],
            'Stacked Bar Chart': PlotlyRenderer['Stacked Bar Chart'],
            'Line Chart': PlotlyRenderer['Line Chart'],
            'Dot Chart': PlotlyRenderer['Dot Chart'],
            'Area Chart': PlotlyRenderer['Area Chart'],
            'Scatter Chart': PlotlyRenderer['Scatter Chart'],
            'Multiple Pie Chart': PlotlyRenderer['Multiple Pie Chart']
          }))()
        }
      }
    })
  </script>
</body>
</html>

```
