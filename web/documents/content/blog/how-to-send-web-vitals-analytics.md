---
title: How to send web-vitals analytics
description: The web-vitals library is a tiny (~1K), modular library for measuring all the Web Vitals metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools (e.g. Chrome User Experience Report, Page Speed Insights, Search Console's Speed Report).

The library supports all of the Core Web Vitals as well as all of the other Web Vitals that can be measured in the field:
slug: how-to-send-web-vitals-analytics
tags: ['design patterns','system design','product development']
---
# How to send web-vitals analytics

https://github.com/GoogleChrome/web-vitals#load-web-vitals-from-a-cdn
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToAnalytics(metric) {
  // Replace with whatever serialization method you prefer.
  // Note: JSON.stringify will likely include more data than you need.
  const body = JSON.stringify(metric);

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
      fetch('/analytics', {body, method: 'POST', keepalive: true});
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);

  