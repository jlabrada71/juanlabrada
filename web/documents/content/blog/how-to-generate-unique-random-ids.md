---
title: How to generate unique random ids
description: Having unique ids is a frequent need. Sometimes using a database can help on this but at the cost of speed. Here are a few faster alternatives.
slug: how-to-generate-unique-random-ids
tags: ['design patterns','experiments','product development']
---
# How to generate unique random ids

Unodered    
"".concat(Math.round(1e12*Math.random())).concat(Date.now())

Ordered
"".concat(Date.now()).concat(Math.round(1e12*Math.random()))


  