---
title: How to create a Chrome extension
description: A chrome extension is a useful way to add functionalities to web pages as users. They may help in getting ideas on improvement for pages, also as a way to streamline processes that are thought be to done manually but when done many times they turn error prone and repetitive.
slug: how-to-create-a-chrome-extension
tags: []
---
# How to create a Chrome extension

A chrome extension need to be thought in three parts:
- The code that is injected into the webpage.
- The code of the popup (extension user interface)
- The background process.
These three parts need to interact smoothly in order to get their job done.
One important thing regarding testing chrome extensions is that they require an actual page to be present in order for they to be able to inject code. If you see that the code in the content script is not running that be for three main reasons: there are errors, or there is not actually page being shown or the page need to be reloaded.


  