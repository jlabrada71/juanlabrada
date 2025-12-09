---
title: Git Tips
description: Commands frequently used in git for branch management.
slug: git-tips
tags: ['product development','Productivity']
---
# Git Tips

- create branch based on another (for example in a feature based flow).
   This creates a new branch sun-feature based on sun branch
```
git checkout -b sun-feature sun
```

- merge your changes to sun without a fast-forward
```
git checkout sun
git pull
git merge --no-ff sun-feature
```
- merge changes in parent branch into your branch (in case parent branch have been updated)
in this case sun has changes not included in sun-feature, the command merges sun changes into sun-feature
```
git checkout sun-feature
git merge sun
```

- merge changes in remote branch into your current branch 
```
git pull origin sun
```

- merge changes from specific commit into your code
```
git cherry-pick <commit hash>  ex: f13bd3c3531f26e805c606729857f39987a2420f
```

- merge changes from specific set of commits into your code
  this includes the older commit.
```
git cherry-pick <older-commit-hash>^..<newer-commit-hash>
- push changes to the server
```
git push origin sun  # push merged result to remote sun branch
git push origin sun-feature # push feature branch -optional
```

git fetch is the command that tells your local git to retrieve the latest meta-data info from the original (yet doesn’t do any file transferring. It’s more like just checking to see if there are any changes available).

git pull on the other hand does that AND brings (copy) those changes from the remote repository.

```
git fetch    
git diff ...origin
```

There generally are at least three copies of a project on your workstation.

- One copy is your own repository with your own commit history (the already saved one, so to say).
- The second copy is your working copy where you are editing and building (not committed yet to your repo).
- The third copy is your local “cached” copy of a remote repository (probably the original from where you cloned yours).
Delete a branch
================
```
// delete branch locally
git branch -d localBranchName

// delete branch remotely
git push origin --delete remoteBranchName
```

Show branch graph in console
--------------------------
```
git log --graph --oneline --all
```
Show all branches ordered by  recent dates
----------------------------------------------
```
git branch -a --sort=-committerdate | head
```

Push a local branch to a different remote branch
-------------------------------------------------------------
```
git push <remoteserver> <localbranchname>:<remotebranchname>
git push git push heroku testbranch:main     
```
TAGS
==========
Print tags that match a pattern descending : git tag --sort=committerdate -l <pattern>

Checkout latest tag in a new branch:
tag=$(git describe --tags `git rev-list --tags --max-count=1`)
git checkout $tag -b latest-$tag

Checkout a given tag: 
git checkout tags/<tag> -b <branch>

Create a tag:   git tag <tag_name>

Create a tag for a commit: git tag <tag_name> <commit_sha>

Create a tag for the last commit: git tag < tag_name > HEAD  ( HEAD ~ 1 )( HEAD ~ 2 )

List existing tags: git tag

List commits sha: git log --oneline

Push created tags: git push --tags
Show revision list by branch (or tags --tags):  git rev-list --branches --pretty

Get all commit messages from < branch older > to < branch newer ( DEFAULTS to HEAD ) >
git cherry -v < branch older > < branch newer >

List branches yet to be merged
--------------------------------------------
git branch -a --sort=-committerdate --no-merged 

List branches merged in a given branch (not branch == HEAD)
-----------------------------------------------------------------------------------
git branch -a --sort=-committerdate --merged < branch name >
git rev-list --branches --pretty | grep 'into < branch name >'

Comparing Branches
==========================
Diff two branches
git diff branch1..branch2

Diff show differing filenames only 
git diff --name-only

Compare a file between two branches
git diff branch1..branch2 -- <file>

Compare commits between two branches
git log branch1..branch2

Compare commits using commits abbreviations
git log --oneline --graph --decorate --abbrev-commit branch1..branch2

compares the top of the right branch (branch2, the HEAD) with the common ancestor of the two branches(note the ... three dots)
git diff branch1...branch2

how to create a patch from changes in a branch and apply to another branch
------------------------------------------------------------------------------------------------------
```
git diff master Branch1 > ../patchfile
git checkout Branch2    
git apply ../patchfile
```
How to see the log and changes for the lastest commit
----------------------------------------------------------------------------
```
git log --name-status HEAD^..HEAD
git diff HEAD^..HEAD
```

Stash Utils
================================================================
Original stash info:
(https://www.atlassian.com/git/tutorials/saving-changes/git-stash)[atlassian]
Stash files
----------------------------------------------------------------
```
git stash           # Stash all modified files
git stash -u        # Stash all files including non tracked files
git stash -p        # Stash especific files or changes (partial stash)
git stash save "<some description>"  #Create a stash with a description
```

Restore stashed changes
----------------------------------------------------------------
```
git stash pop                               # reapply the most recent created stash: stash@{0}
git stash pop stash@{2}                     # reapply the changes stored in stash@{2}
git stash branch <branch-name> stash@{1}    # creates a branch from your stash
```

View what is stashed
----------------------------------------------------------------
```
git stash list      # show the stash list
git stash show      # lists the files modified in stash
git stash show -p   # shows the details changes in the stashed files
```

Cleaning your Stash
----------------------------------------------------------------
```
git stash drop stash@{1}   #this drops especific stash
git stash clear            #this deletes all stashes
```
How to find a commit using the log message
--------------------------------------
```
git log --all --grep='rebid 3.0 compability'
```


  