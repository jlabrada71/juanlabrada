---
title: How to make different the first character in a paragraph CSS solution
description: Making the first letter different for articles is common in articles. This can be easily done in CSS.
slug: how-to-make-different-the-first-character-in-a-paragraph-css-solution
tags: ['web design','UI Design']
---
# How to make different the first character in a paragraph CSS solution

@import url(http://fonts.googleapis.com/css?family=Gentium+Book+Basic:400,700,700italic,400italic);
body {
    color: #555;
    font-size: 1.1em;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

hr {
    margin: 50px 0;
}

.container {
    margin: 50px auto;
    max-width: 700px;
}

p:first-of-type:first-letter {
    font-size: 3em;
    font-weight: bold;
    color: deepPink;
    font-family: "Gentium Book Basic", serif;
    float:left;
}

p:first-letter {
    font-size: 1em;
}

  