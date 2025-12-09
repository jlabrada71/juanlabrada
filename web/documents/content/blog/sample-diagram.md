---
title: Sample Diagram
description: 
createdAt: '09/19/2024'

slug: sample-diagram
tags: ['nuxt', 'content','mermaidjs']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'nuxt content, mermaid js diagrams'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '01/20/2023'
---

# Hello Content Diagram

This is a test diagram create with mermaid js 1

::show-diagram
---
diagram: stateDiagram 
    [*] --> Still 
    Still --> [*] 
    Still --> Moving 
    Moving --> Still 
    Moving --> Crash 
    Crash --> [*] 
---
::


# This is a class diagram

::show-diagram
---
diagram: classDiagram

    Animal <|-- Duck

    Animal <|-- Fish

    Animal <|-- Zebra

    class Animal {
      +int age

      +String gender

      +mate()
    }

    class Duck{
      +String beakColor

      +swim()

      +quack()
    }

    class Fish{
      -int sizeInFeet

      -canEat()
    }

    class Zebra{
      +bool is_wild

      +run()
    }
---
::
