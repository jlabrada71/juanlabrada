---
title: How to load a script dynamically
description: undefined
slug: how-to-load-a-script-dynamically
tags: ['design patterns','experiments','product development']
---
# How to load a script dynamically

(function() {
  var script = document.createElement('script');
  script.async = true;
  var useSSL = 'https:' == document.location.protocol;
  script.src = (useSSL ? 'https:' : 'http:') + '//' + 'TARGET_URL';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(script, node);
})();

  