---
title: CSS Tricks
description: A collection of tricks to pull off some CSS effects
createdAt: '12/19/2024'

slug: tricks
tags: ['css','tricks']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'css, tricks'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '12/19/2024'
---

# Some CSS Tricks

## First tricks

Original Source [Discord Made The Coolest CSS Only Input Animation](https://www.youtube.com/watch?v=cowG052uyQw)

### Context

```html
<div class="row">
  <div class="box"></div>
  <div class="box"></div>
  <input type="search" placeholder="Search" />
  <div class="box"></div>
</div>
```


```css 
:root {
  --bg-color: hsl(223, 6%, 20%);
  --bg-color-dark: hsl(225, 6%, 12%);
  --foreground-color: hsl(210, 9%, 87%);
  --foreground-color-dark: hsl(214, 8%, 61%);
  --outline-color: hsl(200, 100%, 50%);
} 

body {
  background-color: var(--bg-color);
  color: var(--foreground-color);
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
}

.row {
  display: flex;
  gap: 1rem;
  margin: 1rem;
  margin-top: 2rem;
}

.box {
  width: 30px;
  background-color: var(--foreground-color-dark);
}

```

### Change the width when the element is focused

Change this:

```html
<input type="search" placeholder="Search" />

```

To this:

```html
<input class="input" type="search" placeholder="Search" />
```

Add this to the CSS:
```css
.input {
  width: 9em;
}

.input:focus {
  width: 15em;
}
```

### Animate the width change

Change this:
```css
.input {
  width: 9em;
}

```

To this:

```css
.input {
  width: 9em;
  transition: width 0.25s; 
}

```

### Remove the border

Change this:

```css
.input {
  width: 9em;
  transition: width 0.25s; 
}

```

To this:

```css
.input {
  width: 9em;
  transition: width 0.25s; 
  border: none;
}

```

### Remove the default outline
Change this:

```css
.input {
  width: 9em;
  transition: width 0.25s; 
  border: none;
}

```

To this:

```css
.input {
  width: 9em;
  transition: width 0.25s; 
  border: none;
  outline: none;
}

```

### Add an outline color without changing the element size

Add this:

```css
.input:focus-visible {
  box-shadow: 0 0 0 .25rem var(--outline-color);

}

```

### Change the placeholder color

Add this

```css
.input::placeholder {
  color: var(--foreground-color-dark);
}

```

### Disable transitions for prefer motion reduced users

Add this: 
```css
@media (prefers-reduced-motion: reduce) {
  .input {
    transition: none
  }
}
```

### Keep the input size when there is input even if it is not focused

Change this:

```css
.input:focus {
  width: 15em;
}
```

To this:

```css
.input:not(placeholder-shown),
.input:focus {
  width: 15em;
}
```

### Add Icons to the input

Change this:

```html
<input type="search" placeholder="Search" />
```

To this:
```html
<div class="search-wrapper">
  <input type="search" placeholder="Search" />
  <svg class="search-icon">icon code</svg>
</div>
```

### Add Selectable Icons to the input

Change this:

```html
<div class="search-wrapper">
  <input type="search" placeholder="Search" />
  <svg class="search-icon">icon code</svg>
</div>
```

To this:
```html
<div class="search-wrapper">
  <input type="search" placeholder="Search" />
  <svg class="search-icon">icon code</svg>
  <button class="x-icon">
    <svg>icon code</svg>
  </button>
</div>
```
Note: the **class** is set to the button because I want the button to have all the stylings.

### Position the icons relative to the inputs

Add this:

```css
.search-wrapper {
  position: relative;
}

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
}
```

### Color the icons 

Change this:

```css
.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
}
```

To this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
}

button {
  all: unset; 
  cursor: pointer;
}
```

### Add an outline to make the 'x' selectable

Change this:

```css
.input:focus-visible {
  box-shadow: 0 0 0 .25rem var(--outline-color);

}

```

To this:

```css
.input:focus-visible,
button:focus-visible {
  box-shadow: 0 0 0 .25rem var(--outline-color);

}

```

### Make an icon invisible and prevent accidental clicks on it

Change this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
}

```
To this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

```

- **opacity: 0**  makes the button invisible
- **pointer-events: none** prevent the button to react to clicks
- **visibility: hidden** prevent the button to react to 'tabs'


### Make the search icon visible and active if there is no input

- Basically, we need select the element(icon) when the wrapper has an element in a given condition(the input is showing the placeholder) 

Add this:

```css
.search-wrapper:has(.input:placeholder-shown) .search-icon {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}
```

### To remove the default 'x' when the input type is 'search'

Add this:

```css
/* clears the 'X' from Internet Explorer */
input[type="search"]::-ms-clear,
input[type="search"]::-ms-reveal {
  appearance: none;
  width: 0;
  height: 0;
}

/* clears the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button, 
input[type="search"]::-webkit-search-results-decoration {
  appearance: none;
}

```

### To animate the Icon changes

Change this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

```

To this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition-property: opacity, rotate;
  transition-duration: 0.15s;
  rotate: 90deg;
}

.search-wrapper:has(.input:placeholder-shown) .search-icon,
.search-wrapper:has(.input:not(placeholder-shown)) .x-icon {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
  rotate: 0deg;
}

```

Note: it is important to add the 'deg' even for 0.
Note that for selecting the x-icon we are reversing the selector condition.

### To make the changes transition smooth

Change this:

```css
.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition-property: opacity, rotate;
  transition-duration: 0.15s;
  rotate: 90deg;
}


```


To this:

```css

.search-icon,
.x-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  right: 0.25rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--foreground-color-dark);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition-behavior: discrete;
  transition-property: opacity, rotate, visibility;
  transition-duration: 0.15s;
  rotate: 90deg;
}

```
This allows to transition for properties like **visibility** and **display**.


 [/about](/blog/about).  

```js
const personName = personObject?.name
```


