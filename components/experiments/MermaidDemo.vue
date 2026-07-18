<script setup>
import VueMermaidString from 'vue-mermaid-string'
import { ref } from 'vue'

let currentState = 'ConfigureAuction'

const baseDiagram = `
  stateDiagram
   direction TB

   accTitle: This is the accessible title
   accDescr: This is an accessible description

   classDef notMoving fill:white
   classDef movement font-style:italic
   classDef activeState fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow

   [*] --> Wrapper
   Wrapper --> PrebidJS : Configure Bids
   Wrapper --> PrebidJS : Request Bids

   state PrebidJS {
    AuctionConfigured --> ConfigureBidders
    ConfigureBidders --> [*]
    RequestingBids --> PrebidAuction

    ReturnBestBid --> BidsBack
    BidsBack --> ScaleBids

    ReturnScaledBids --> SelectWinner
    SelectWinner --> SetTargetting
   }

   state PrebidServer {
      PrebidAuction --> SelectBestBid
      SelectBestBid --> ReturnBestBid

   }

   state Wrapper {

    ConfigureAuction --> AuctionConfigured

    ScaleBids --> ReturnScaledBids
    SetTargetting --> RefreshSlot
    RefreshSlot --> AdServerAuction
    RenderCreative --> [*]

   }

   state AdServer {
      AdServerAuction --> AuctionWon
      AuctionWon --> RenderCreative
   }

   `

const diagram2 = ref(baseDiagram);

function generateDiagram() {
  

  diagram2.value = baseDiagram + `class ${currentState} activeState`
}

generateDiagram()

function moveNext() {
  const states = [
    'ConfigureAuction',
    'AuctionConfigured',
    'ConfigureBidders',
    'RequestingBids',
    'PrebidAuction',
    'SelectBestBid',
    'ReturnBestBid',
    'BidsBack',
    'ScaleBids',
    'ReturnScaledBids',
    'SelectWinner',
    'SetTargetting',
    'RefreshSlot',
    'AdServerAuction',
    'AuctionWon',
    'RenderCreative',
    'BidRendered',
    'AuctionLost'
  ]
  const nextIndex = states.indexOf(currentState) + 1
  currentState = states[nextIndex] || states[0]
  generateDiagram()
}
</script>

<template>
  <main>
    <vue-mermaid-string :value="diagram2" />
    <button @click="moveNext">Next</button>
  </main>
</template>

<style scoped></style>