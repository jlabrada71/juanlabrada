---
title: How to rename 'master' to 'main' on GitHub and Heroku
description: undefined
slug: how-to-rename-master-to-main-on-github-and-heroku
tags: ['system design','product development']
---
# How to rename 'master' to 'main' on GitHub and Heroku

Step 1 
================
```
git fetch
git rebase origin/master master
git branch --move master main
git push --set-upstream origin main
```
Step 2: Set up main as the default branch in GitHub
=========================
- go to Settings tab
- click on Branches left menu option
- select 'main' as Default Branch
- click 'Update'
Step 3: Reconfigure Heroku to deploy from main
===============================
- go to Heroku automatic deploys
- select 'main' in the Choose branch to deploy combo
- click on 'Enable automatic deploys'
Step 4: Delete the master branch
============================
```
git push origin --delete master
```



  