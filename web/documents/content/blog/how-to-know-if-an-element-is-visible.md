---
title: How to know if an element is visible
description: undefined
slug: how-to-know-if-an-element-is-visible
tags: ['design patterns','product development','experiments','UI Design','web design']
---
# How to know if an element is visible

```
function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}
```

Another perspective on the problem:
------------------------------------------------
```
function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

var handler = onVisibilityChange(el, function() {
    /* Your code go here */
});


// jQuery
$(window).on('DOMContentLoaded load resize scroll', handler);

/* // Non-jQuery
if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
}
*/
```

Just another solution, this time using Interception observer
-----------------------------------
```
// the callback function that will be fired
// when the element apears in the viewport
function onEntry(entry) {
  entry.forEach((change) => {
    change.target.classList.add('visible');
  });
}

// list of options
let options = {
  threshold: [0.5]
};

// instantiate a new Intersection Observer
let observer = new IntersectionObserver(onEntry, options);

// list of paragraphs
let elements = document.querySelectorAll('p');

// loop through all elements
// pass each element to observe method
// ES2015 for-of loop can traverse through DOM Elements
for (let elm of elements) {
  observer.observe(elm);
}
```

More on the interception observer
-------------------------------------------------
var observer = new IntersectionObserver(changes => {
  for (const change of changes) {
    console.log(change.time);               // Timestamp when the change occurred
    console.log(change.rootBounds);         // Unclipped area of root
    console.log(change.boundingClientRect); // target.boundingClientRect()
    console.log(change.intersectionRect);   // boundingClientRect, clipped by its containing block ancestors, and intersected with rootBounds
    console.log(change.isIntersecting); 
    console.log(change.intersectionRatio);  // Ratio of intersectionRect area to boundingClientRect area
    console.log(change.target);             // the Element target
  }
}, {});

// Watch for intersection events on a specific target Element.
observer.observe(target);

// Stop watching for intersection events on a specific target Element.
observer.unobserve(target);

// Stop observing threshold events on all target elements.
observer.disconnect();

  