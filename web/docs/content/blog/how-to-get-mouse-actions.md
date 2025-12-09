---
title: How to get mouse actions?
description: undefined
slug: how-to-get-mouse-actions
tags: ['experiments','UI Design']
---
# How to get mouse actions?

Mouse movement
-------------------------------
```
document.onmousemove = function(e){
  var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
  console.log(pageCoords);
};
```

Touch actions
------------------------------------
```
var src = document.getElementById("src");

src.addEventListener('touchstart', rotate);
src.addEventListener('touchmove', rotate);
src.addEventListener('touchend', rotate);

function rotate (e) {
  var touch = e.changedTouches.item(0);

  // Turn off default event handling
  e.preventDefault();

  // Rotate element 'src'.
  src.style.width = touch.radiusX * 2 + 'px';
  src.style.height = touch.radiusY * 2 + 'px';
  src.style.transform = "rotate(" + touch.rotationAngle + "deg)";
};
```


  