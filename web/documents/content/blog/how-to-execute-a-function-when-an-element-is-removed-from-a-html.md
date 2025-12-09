---
title: How to execute a function when an element is removed from a html
description: Use case, we want to know how much time an element has been visible. For example, an ad before refresh.

slug: how-to-execute-a-function-when-an-element-is-removed-from-a-html
tags: ['product development','experiments','design patterns']
---
# How to execute a function when an element is removed from a html

```
function onRemove(element, onDetachCallback) {
    const observer = new MutationObserver(function () {
        function isDetached(el) {
            if (el.parentNode === document) {
                return false;
            } else if (el.parentNode === null) {
                return true;
            } else {
                return isDetached(el.parentNode);
            }
        }

        if (isDetached(element)) {
            observer.disconnect();
            onDetachCallback();
        }
    })

    observer.observe(document, {
         childList: true,
         subtree: true
    });
}
```

  