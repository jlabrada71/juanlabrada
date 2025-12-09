---
title: Examples of diagrams
description: A better design makes it easier to make changes.
createdAt: '01/20/2023'

slug: examples-of-diagrams-01
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

::mermaid
```text
journey
    title Gestion des congés
    section Configuration
      Liste de jours fériés: 5: RH
      Types de congés: 5: RH
      Contrat de travail: 5: RH
    section Allocation de congés
        Allocation de congés: 5: RH
      Feuilles de présence: 5: Employé
      Calcul des congés: 5: Dokos
    section Demandes de congés
     Demandes de congés: 5: Employé
     Validation de congés: 5: RH
```

  :::mermaid
    ::::callout{color="amber" icon="i-heroicons-exclamation-triangle"}
    Actuellement les seules règles de calcul applicables sont les congés payés sur jours ouvrés et les congés payés sur jours ouvrables.\:br
    N'hésitez pas à ouvrir un ticket sur [Gitlab](https://gitlab.com/dokos/dokos/-/issues) pour que nous puissions ajouter d'autres règles de calcul spécifiques.
    ::::
  :::
::
