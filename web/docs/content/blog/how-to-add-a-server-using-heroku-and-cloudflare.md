---
title: How to add a server using heroku and cloudflare
description: undefined
slug: how-to-add-a-server-using-heroku-and-cloudflare
tags: ['system design','product development']
---
# How to add a server using heroku and cloudflare

create the server in heroku
create some basic web site
open the app to get the website heroku url.
go to cloudflare
add a cname for the server example CNAME: staging  , CONTENT: https://staging-servername.herokuapp.com/ 
add initiate the DNS in Heroku using the cmd: heroku domains:add staging.example.com

  