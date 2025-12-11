<template>
  <h1>Drawing in a canvas</h1>
  <canvas id="myCanvas" ref="myCanvas" width="500" height="500" />
</template>
<script setup>
  import { onMounted, onUpdated, ref } from 'vue'
  import chroma from 'chroma-js'

  const myCanvas = ref(null)

  const rgb255 = (v ) => (v < 255 ? (v > 0 ? v : 0) : 255);
  const b1 = (v) => (v > 0.0031308 ? v ** (1 / 2.4) * 269.025 - 14.025 : v * 3294.6);
  const b2 = (v) => (v > 0.2068965 ? v ** 3 : (v - 4 / 29) * (108 / 841));
  const a1 = (v) => (v > 10.314724 ? ((v + 14.025) / 269.025) ** 2.4 : v / 3294.6);
  const a2 = (v) => (v > 0.0088564 ? v ** (1 / 3) : v / (108 / 841) + 4 / 29);

  function fromHCL(h, c, l) {
    const y = b2((l = (l + 16) / 116));
    const x = b2(l + (c / 500) * Math.cos((h *= Math.PI / 180)));
    const z = b2(l - (c / 200) * Math.sin(h));
    return [
      rgb255(b1(x * 3.021973625 - y * 1.617392459 - z * 0.404875592)),
      rgb255(b1(x * -0.943766287 + y * 1.916279586 + z * 0.027607165)),
      rgb255(b1(x * 0.069407491 - y * 0.22898585 + z * 1.159737864)),
    ];
  }

  function toHCL(r, g, b) {
	const y = a2((r = a1(r)) * 0.222488403 + (g = a1(g)) * 0.716873169 + (b = a1(b)) * 0.06060791);
	const l = 500 * (a2(r * 0.452247074 + g * 0.399439023 + b * 0.148375274) - y);
	const q = 200 * (y - a2(r * 0.016863605 + g * 0.117638439 + b * 0.865350722));
	const h = Math.atan2(q, l) * (180 / Math.PI);
	return [h < 0 ? h + 360 : h, Math.sqrt(l * l + q * q), 116 * y - 16];
}

function fromHEX([, p1, p2, p3, p4, p5, p6, p7, p8]) {
	const f = (v) => parseInt(v, 16);
	return p5 == null
		? [f(p1) * 17, f(p2) * 17, f(p3) * 17, +(p4 == null) || f(p4) / 15]
		: [f(p1 + p2), f(p3 + p4), f(p5 + p6), +(p7 == null) || f(p7 + p8) / 255];
}

function toHEX(has_alpha) {
	return has_alpha
		? ([r, g, b], a = 1) =>
				`#${(16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)}${Math.round(a * 255).toString(16)}`
		: ([r, g, b]) => `#${(16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)}`;
}

function fromRGB(str) {
	const [, r, g, b, a = 1.0] = /^rgba?\(([^,]*),([^,]*),([^,)]*),?([^)]*)?\)$/.exec(str);
	const f = (v, p = -1) => (-1 === (p = v.lastIndexOf("%")) ? +v : +v.slice(0, p) * 2.55);
	return [f(r), f(g), f(b), +a];
}

function toRGB(has_alpha, uses_pct) {
	const f = uses_pct
		? (v) => (v < 255 ? (v > 0 ? `${v / 2.55}%` : `0%`) : `100%`)
		: (v) => (v < 254.5 ? (v > 0.5 ? v.toPrecision(3) : `0`) : `255`);
	return has_alpha
		? ([r, g, b], a = 1) => `rgba(${f(r)},${f(g)},${f(b)},${a})`
		: ([r, g, b]) => `rgb(${f(r)},${f(g)},${f(b)})`;
}

function fromHSL(str) {
	const [, hh, ss, ll, a = 1.0] = /^hsla?\((-?[^,]*),([^,]*),([^,)]*),?([^)]*)?\)$/.exec(str);
	const h = (+hh < 0 ? 360 - (-hh % 360) : +hh % 360) / 60;
	const l = +ll.slice(0, ll.lastIndexOf("%")) / 100.0;
	const v1 = l + (+ss.slice(0, ss.lastIndexOf("%")) / 100.0) * (l < 0.5 ? l : 1 - l);
	const v2 = l + l - v1;
	const r = [255.0, 255.0, 255.0, +a];
	const i = Math.floor(h);
	r[((i + 1) >> 1) % 3] *= v1;
	r[((i << 1) | 2) % 3] *= v2;
	r[(7 - i) % 3] *= v2 + (v1 - v2) * (1 === i % 2 ? i + 1 - h : h - i);
	return r;
}

function toHSL(has_alpha) {
	const c = (l, d, h, x) =>
		`${(h = 60 * (x + h / d)) < 0 ? h + 360 : h > 360 ? h - 360 : h},${100 * (d / (l < 255 ? l : 510 - l))}%,${l / 5.1}%`;
	const f = ([r, g, b]) =>
		b > g
			? g > r
				? c(b + r, b - r, b - g, 3)
				: b > r
				? c(b + g, b - g, r - g, 4)
				: c(r + g, r - g, g - b, 0)
			: b > r
			? c(g + r, g - r, b - r, 2)
			: g > r
			? c(g + b, g - b, g - r, 1)
			: r !== b
			? c(r + b, r - b, g - b, 0)
			: `0,0%,${r / 2.55}%`;
	return has_alpha ? (r, a = 1) => `hsla(${f(r)},${a})` : (r) => `hsl(${f(r)})`;
}

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function drawSquare(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 40, 40);
  }

  function draw() {
    const th = toHEX(false);
    
    const ctx = myCanvas.value.getContext('2d')
    for( let i = 0; i < 150; i += 5)
      for(let j = 0; j < 150; j += 5) {        
        const color1 = th(fromHCL(0, i, j))
        console.log(color1)
        drawSquare(ctx, i*5, j*5, color1)
      }
    // for( let i = 0; i < 100; i += 5)
    //   for(let j = 0; j < 100; j += 5) {
    //     const color = hslToHex(5, i, j)
    //     console.log(color)
    //     drawSquare(ctx, i*5, j*5, color)
    //   }
  }

  onMounted(draw);
  onUpdated(draw);
</script>

<style>
#myCanvas {
  border: 1px solid grey;
}
</style>