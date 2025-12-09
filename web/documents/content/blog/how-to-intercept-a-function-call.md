---
title: How to intercept a function call
description: undefined
slug: how-to-intercept-a-function-call
tags: ['design patterns','experiments']
---
# How to intercept a function call

function interfere() {
    const former = window.__uspapi;
    function middleman() {
        const args = arguments;
        console.log('calling __uspapi: caller is ' + middleman.caller.name);
        return former.apply(null, args);
    }
    window.__uspapi = middleman
    return former;
}

const formerUspapi = interfere();

  