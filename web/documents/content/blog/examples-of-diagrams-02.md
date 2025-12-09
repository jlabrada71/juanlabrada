---
title: Examples of diagrams
description: A better design makes it easier to make changes.
createdAt: '01/20/2023'

slug: examples-of-diagrams-02
tags: ['design principles','tdd']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'design'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '01/20/2023'
---

# Hello Content

<mermaid>
flowchart LR
  id2(Commande fournisseur)-->id3(Reçu d'achat)
  id2-->id4(Facture d'achat)
  id4-->id5(Ecriture de paiement)
  id1(Demande de matériel)-->id7(Appel d'offre)
  id7-->id8[Devis Fournisseur]
  id1-->id2
  id8-->id2
  id3-->id4
</mermaid>