---
title: How to send analytics 
description: Using navigator.sendBeacon and Fetch to send analytics data.
slug: how-to-send-analytics
tags: []
---
# How to send analytics 

Use the page event  : 

visibilitychange


function checkVisibilityControl() {
                if (typeof document.hidden !== "undefined") { 
                    return {
                        hidden: "hidden",
                        visibilityChange: "visibilitychange",
                    }// Opera 12.10 and Firefox 18 and later support
                }
                if (typeof document.msHidden !== "undefined") {
                    return {
                        hidden: "msHidden",
                        visibilityChange: "msvisibilitychange"
                    }
                } 
                if (typeof document.webkitHidden !== "undefined") {
                    return {
                        hidden: "webkitHidden",
                        visibilityChange: "webkitvisibilitychange"
                    }
                }
                return {
                    hidden: '',
                    visibilityChange: 'pagehide'
                }
            } 

in order to send the event use the navigator.sendBeacon (doesn't allows for getting errors), or use the fetch api, which allows for dealing with errors and use the parameter 'keepalive' : true, this is to avoid the request to be interrupted in case browser close.


  