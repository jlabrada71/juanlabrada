const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(rgb1, rgb2) {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const rgb2hsl = ([r, g, b]) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  const hsl2rgb = ([h, s, l]) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

  function rgb2hex([r, g, b]) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  function rgba2hexa([r,g,b,a]) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;
  
    return "#" + r + g + b + a;
  }



  function hex2rgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
     ] : null;
  }

  function hexa2rgba(h) {
    let r = 0, g = 0, b = 0, a = 1;
  
    if (h.length == 5) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
      a = "0x" + h[4] + h[4];
  
    } else if (h.length == 9) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
      a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);
  
    return [r, g, b, a]
  }

  // RGB to HLC conversion function
function rgb2hlc([r1, g1, b1 ]) {
    // Extract the RGB components
    const r = r1 / 255;
    const g = g1 / 255;
    const b = b1 / 255;
  
    // Calculate the maximum and minimum values among the RGB components
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
  
    // Calculate the lightness
    const lightness = (max + min) / 2;
  
    let hue, chroma;
  
    // Calculate chroma if the color is not gray
    if (max !== min) {
      const delta = max - min;
  
      // Calculate chroma
      chroma = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
  
      // Calculate hue based on which color component is the maximum
      if (max === r) {
        hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
      } else if (max === g) {
        hue = ((b - r) / delta + 2) * 60;
      } else {
        hue = ((r - g) / delta + 4) * 60;
      }
    } else {
      // If it's a gray color, chroma and hue are both 0
      chroma = 0;
      hue = 0;
    }
  
    return [hue, lightness, chroma];
  }

  function hlc2rgb([h, l, c]) {
    // Ensure hue is in the range [0, 360)
    h = ((h % 360) + 360) % 360;
    
    // Convert hue to radians
    const hRadians = (h / 360) * 2 * Math.PI;
    
    // Calculate the chroma and intermediate values
    const chroma = (1 - Math.abs(2 * l - 1)) * c;
    const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
    
    let r, g, b;
    
    if (h >= 0 && h < 60) {
      r = chroma;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = chroma;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = chroma;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = chroma;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = chroma;
    } else {
      r = chroma;
      g = 0;
      b = x;
    }
    
    // Calculate the lightness adjustment
    const m = l - chroma / 2;
    
    // Apply the adjustment and convert to 8-bit integers
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return [r, g, b ];
  }

export { 
    luminance,
    contrast, 
    rgb2hsl, 
    hsl2rgb, 
    rgb2hex, 
    hex2rgb,
    rgb2hlc,
    hlc2rgb,
    rgba2hexa,
    hexa2rgba
 }