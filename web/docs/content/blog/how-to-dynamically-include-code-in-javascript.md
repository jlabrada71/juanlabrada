---
title: How to dynamically include code in javascript
description: Keeping your javascripts light is something pressured by UX requirements. Pages with big javascripts tend to load slowly, on the other hand for a provider is difficult to know in advance what tools to include because they are known only when the script is run.
slug: how-to-dynamically-include-code-in-javascript
tags: ['design patterns','system design','experiments','product development']
---
# How to dynamically include code in javascript

There are basically two ways to deal with this issue. One is dynamically importing the libraries required, although this solution has the downside of slowing down some functionalities until the library is fetch from a remote server into the browser. Another solution is to determine at compile time whether the library is required or not and then include it in.
For example, assume you have a page that serves a custom script to different clients. And that clients can select which features to include and which features to set aside. You can have a build process that only includes the features that the client selected and that way you can have a final file as light as needed by the user. PrebidJS has in place a similar solution based on only including modules that are defined in a json file into the final javascript. The json file can be created dynamically using a user interface that allows to select which modules to include.

  