---
title: Creating Vertical Rhythm in web pages
description:  To get clean designs you need to make good use of vertical rhythms. Different font sizes establishes hierarchy, and communicates meaning. This also needs to be considered when making responsive designs.
slug: creating-vertical-rhythm-in-web-pages
tags: ['UI Design','web design']
---
# Creating Vertical Rhythm in web pages

The three key elements for vertical rhythm are font sizes, line heights and spacings. These three elements should be considered for different screen sizes through media queries.

The first step is to define the default font size for the page. It will drive the design decisions for all the other elements. Closely related to this is the line-height. Along with defining the first pattern for design it also defines how clean your content will be.

body {
 /* Set default font size for mobile only */
    font-size: 12px;
    /* Set base line-height for mobile only */
    line-height: 1.5;     /* 12px * 1.5 = 18px */
}

These two declarations define the basic rhythm for the page. 

Define the spacing first for above and below of paragraph
p {
 margin-top: 1.5em; /* 18px */
 margin-bottom: 1.5em; /* 18px */
 
 /* !Font-size and line-height for reference only! */
 /* font-size: 1em; */ /* 12px */
 /* line-height: 1.5em; */ /* 18px */
}

In order to introduce contrast we define different sizes for headings.
h1 {
 font-size: 1.6667em; /* 20px/12px = 1.6667 em;  20px is the 'em' base for the current element*/
 line-height: 1.8000em; /* 36px/20px = 1.8em  */
 margin-top: 0.9em; /* 18px/20px = 0.9em  */
 margin-bottom: 0.9em; /* 18px/20px = 0.9em */
}





  