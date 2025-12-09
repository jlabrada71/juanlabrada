---
title: How to stop closing a page with unsaved changes.
description: How to stop closing a page with unsaved changes.
slug: how-to-stop-closing-a-page-with-unsaved-changes
tags: []
---
# How to stop closing a page with unsaved changes.

function beforeUnloadListener(event) {
  event.preventDefault();
  return event.returnValue = 'Are you sure you want to exit?';
};

// A function that invokes a callback when the page has unsaved changes.
onPageHasUnsavedChanges(() => {
  window.addEventListener('beforeunload', beforeUnloadListener);
});

// A function that invokes a callback when the page's unsaved changes are resolved.
onAllChangesSaved(() => {
  window.removeEventListener('beforeunload', beforeUnloadListener);
});

  