---
title: Use HTTPS? Login to Github Using gh
description: Use gh to manage PAT for git HTTPS use.
toc: false
tags:
  - git
  - cli
categories:
series:
date: '2022-06-19'
lastmod: '2022-06-20'
draft: false
---

Managing Personal Access Token from GitHub manually, to access to repositories via HTTPS, can be tedious.
This blog talks about authentication using [GitHub cli](https://cli.github.com/), which comes with a auth module.
It can help to keep the token for HTTPS use.


## Installation 

- Install `gh` following their official [README](https://github.com/cli/cli#installation).
- You'll need `git`, of course.

## Authentication

Execute the command below to login to your GitHub account and then following the interactive procedure.

``` console
gh auth login --scopes repo
```

For the first two questions:
```
? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? HTTPS
```

For the last question:
```
? How would you like to authenticate GitHub CLI?  [Use arrows to move, type to filter]
> Login with a web browser
  Paste an authentication token
```

Choosing "Login with a web browser" will open a web page for you to login.
It doesn't matter if you don't have GUI on your system. 
Just press "Enter" and the tool will provide a url for you to open elsewhere.

Choosing "Paste an authentication token" will require you to generate a PAT by yourself and paste it in the console.

## Access a Repo

Now, you can clone or push a repo using `git` via HTTPS and there won't be prompt for authentication.
