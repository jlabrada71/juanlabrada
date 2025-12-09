---
title: How to generate schemas from JSON files
description: Requiring a schema to validate JSON data is a common task. Usually, you start by simply sending the data to the service. As more data is added, one day dealing with data complexity turns out to be difficult. So, validating that the data is as expected turns out mandatory. The simplest way to come up with a first schema to be used for validation is to generate it based on json data. In this post I present two tools that helps pull off this task very easly.
slug: how-to-generate-schemas-from-json-files
tags: ['design patterns','Code Generation','experiments','product development','system design']
---
# How to generate schemas from JSON files

This tool generate schemas not only for validation but also for different additional purposes like MySql table definition.
https://github.com/Nijikokun/generate-schema

This tool in addition to help create a schema it also offers operations to compose different schemas. 
https://github.com/aspecto-io/genson-js



  