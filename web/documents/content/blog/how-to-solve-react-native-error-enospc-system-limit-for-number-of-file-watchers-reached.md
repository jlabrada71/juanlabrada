---
title: How to solve React Native Error - ENOSPC - System limit for number of file watchers reached
description: undefined
slug: how-to-solve-react-native-error-enospc-system-limit-for-number-of-file-watchers-reached
tags: ['system design','product development']
---
# How to solve React Native Error: ENOSPC: System limit for number of file watchers reached

# insert the new value into the system config
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# check that the new value was applied
cat /proc/sys/fs/inotify/max_user_watches

  