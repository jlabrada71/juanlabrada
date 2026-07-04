<template>
  <section id="experiments" class="w-full py-24 px-6" style="background: #0b1326;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Playground</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Experiments
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Gallery 1</h3>
          <p class="font-hanken text-cyber-muted text-sm">Changing image width and height on hover within a grid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <ImageGallery4 />
          </div>
        </div>

        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Gallery 2</h3>
          <p class="font-hanken text-cyber-muted text-sm">Expanding image width on hover within a grid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <ImageGallery1 />
          </div>
        </div>

        <div class="glass-card p-6 flex flex-col gap-3">
          <h3 class="font-geist font-semibold text-cyber-text">Mermaid Graph</h3>
          <p class="font-hanken text-cyber-muted text-sm">Generating UML diagrams from text using Mermaid.</p>
          <div class="mt-auto overflow-hidden rounded-lg">
            <MermaidDemo />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
