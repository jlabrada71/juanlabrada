---
title: Sample C4 Diagram
description: 
createdAt: '09/19/2024'

slug: sample-mermaid-js-c4-diagram
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


# C4 Diagram

This is a test diagram create with mermaid js

::show-diagram
---
diagram: C4Context

      title System Context diagram for Internet Banking System

      Enterprise_Boundary(b0, "BankBoundary0") {

        Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")

        Person(customerB, "Banking Customer B")

        Person_Ext(customerC, "Banking Customer C", "desc")

        Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

        System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

        Enterprise_Boundary(b1, "BankBoundary") {

          SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

          System_Boundary(b2, "BankBoundary2") {

            System(SystemA, "Banking System A")

            System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")

          }

          System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")

          SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

          Boundary(b3, "BankBoundary3", "boundary") {

            SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")

            SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
          }
        }
      }

      BiRel(customerA, SystemAA, "Uses")

      BiRel(SystemAA, SystemE, "Uses")

      Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")

      Rel(SystemC, customerA, "Sends e-mails to")

      UpdateElementStyle(customerA, $fontColor="red", $bgColor="grey", $borderColor="red")

      UpdateRelStyle(customerA, SystemAA, $textColor="blue", $lineColor="blue", $offsetX="5")

      UpdateRelStyle(SystemAA, SystemE, $textColor="blue", $lineColor="blue", $offsetY="-10")

      UpdateRelStyle(SystemAA, SystemC, $textColor="blue", $lineColor="blue", $offsetY="-40", $offsetX="-50")
      
      UpdateRelStyle(SystemC, customerA, $textColor="red", $lineColor="red", $offsetX="-50", $offsetY="20")

      UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
    
---
::

