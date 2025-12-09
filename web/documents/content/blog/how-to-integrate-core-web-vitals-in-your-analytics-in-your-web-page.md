---
title: How to integrate Core Web Vitals in your analytics in your web page.
description: Different ways of implementing Core Web Vitals
slug: how-to-integrate-core-web-vitals-in-your-analytics-in-your-web-page
tags: ['system design','product development','design patterns']
---
# How to integrate Core Web Vitals in your analytics in your web page.

https://github.com/GoogleChrome/web-vitals#usage
https://www.simoahava.com/analytics/track-core-web-vitals-in-ga4-with-google-tag-manager/
https://web.dev/lcp/

```
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
      fetch('/analytics', {body, method: 'POST', keepalive: true});
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```


  