<template>
    <div id="experiences" class="container mx-auto min-h-96 bg-slate-400 p-10">
        <div class="lineSections">
            <div class="lineSection">
                <div class="number">1</div>
                <div class="lineHolder">
                <div class="line"></div>
                </div>
            </div>
            <div class="lineSection">
                <div class="number">2</div>
                <div class="lineHolder">
                <div class="line"></div>
                </div>
            </div>
            <div class="lineSection">
                <div class="number">3</div>
                <div class="lineHolder">
                <div class="line"></div>
                </div>
            </div>
            <div class="lineSection">
                <div class="number">4</div>
                <div class="lineHolder">
                <div class="line"></div>
                </div>
            </div>
            <div class="lineSection">
                <div class="number">5</div>
                <div class="lineHolder">
                <div class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// You can add GSAP animations here
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animateHeading = () => {
    const colors = ["#F2309B", "#25C7D9",  "#04BF8A", "#F2D338", "#F23030"]

    gsap.set(".line", {background:gsap.utils.wrap(colors)})

    const animation = gsap.fromTo(".line", {y:-100}, {y:200, ease:"none", duration:1, stagger:0.7})

    ScrollTrigger.create({
        trigger: ".lineSections",
        start: "top 90vp",
        end:"bottom 300",
        markers:false,
        animation: animation,
        scrub:1
    })
}

onMounted(() => {
  animateHeading()
})

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

body {
  background:#0a0a0a;
  color:#ccc;
  font-family:"Staatliches", sans-serif;
  margin:0;
}

.spacer {
  height:60vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

.lineSection {
  border-bottom:2px solid #777;
  padding:3vw;
  background:#151515;
  display:flex;
  align-items:center;
}

.number {
  font-size:180px;
  width:140px;
  text-align:center;
}

.lineHolder {
  width:20px;
  height:200px;
  overflow:hidden;
  background:#222;
}

.line {
  width:100%;
  height:100px;
  background:#ff7b3e; /* orange */
}

</style>
