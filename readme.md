[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Stencil Prefix Demo

Demo to show my methods for handling namespacing of stencil components when using the `dist` output / lazy-loader.

1) Set extras on the `stencil.config.ts`:

```ts
...
extras: {
  scriptDataOpts: true,
  tagNameTransform: true,
}
```

2) make / export a `registerLibPrefix()` from the index of the library (have a look at this project for implementation). 
This registers a namespace prefix within the library. 

**Usage** 

Browser / CDN loader:

```html
<script type="module">
  import { registerLibPrefix } from '@my-lib/your-lib';
  registerLibPrefix('my-namespace');
</script>
<script type="module" src="@my-lib/your-lib/your-lib.esm.js"></script>
```

For the bundler loader:

```js
import { defineCustomElements } from '@my-lib/your-lib/loader';
import { registerLibPrefix } from '@my-lib/your-lib';
const transformTagName = registerLibPrefix('my-namespace');

defineCustomElements(window, {
  transformTagName
})
```

3) Augment Stencil's JSX `h()` function to catch / transform internal component tags (have a look at this project for implementation). 

**Usage** 

```tsx
import { Component, Host, Prop, Element, h } from '@stencil/core';
```

Becomes:

```tsx
import { Component, Host, Prop, Element } from '@stencil/core';
import { h } from '../../utils/h';
```

4) For internal dom apis, wrap tags in `transformTag()` (have a look at this project for implementation):

```js
this.host.querySelector('my-component');
```

Becomes:

```js
import { h, transformTag } from '../../utils/h';
this.host.querySelector(transformTag('my-component'));
``` 

5) To handle CSS scoping, use `<Host>` with the original tag name as a class:

```tsx
<Host class="my-component">
  <slot></slot>
</Host>
```

```css
.my-component {
  /* styles */
}
```
