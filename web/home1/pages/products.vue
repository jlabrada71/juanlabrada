<template>
  <Html>
    <Head>
      <Title>Product to help developers in their work</Title>
      <Meta name="description" content="In this pages you can find a code generator based on Domain Driven Design, a custom made Continuous Integration and a pallete explorer." />
    </Head>
  </Html>

  <v-row>
    <v-col class="text-left">
      <h1>Products</h1>
      <p>
        Did you find a bug? Report it here <a
          href="https://github.com/jlabrada71/juanlabrada/issues"
          target="_blank"
          rel="noopener noreferrer"
          title="contribute"
        >
          issue board
        </a>.
      </p>
      <div class="d-flex flex-wrap ma-8 background">
        <div class="pa-4">
          <GlassmorphCard  height="200px">
            <template v-slot:front>
              <div class="pa-4" transition="fab-transition">
                <div>
                  <h2><a href="https://github.com/jlabrada71/mabayjs" target="_blank">MabayJS</a></h2>
                </div>
                <div>
                  <span>Model based code generator.</span>
                </div>  
              </div>
            </template>
            <template v-slot:back>
              <div class="pa-4" transition="fab-transition">
                <div>
                  <h2><a href="https://github.com/jlabrada71/mabayjs" target="_blank">MabayJS</a></h2>
                </div>
                <div>
                  <span>Model based code generator.</span>
                </div>  
              </div>
            </template>
          </GlassmorphCard>
        </div>
        <div class="pa-4">
          <GlassmorphCard  height="200px">
            <template v-slot:front>
              <div class="pa-4" transition="fab-transition">
                <div>
                  <h2><a href="https://github.com/jlabrada71/luisitin" target="_blank">Luisitin</a></h2>
                </div>
                <div>
                  <span>Continuous Integration solution.</span>
                </div>  
              </div>
            </template>
            <template v-slot:back>
              <div>
                <div class="pa-4">
                  <div>
                    <h2><a href="https://github.com/jlabrada71/luisitin" target="_blank">Luisitin</a></h2>
                  </div>
                  <div>
                    <span>Continuous Integration solution.</span>
                  </div>  
                </div>
              </div>
              
            </template>
          </GlassmorphCard>
        </div>
        
        <div class="pa-4">
          <GlassmorphCard height="200px">
            <template v-slot:front>
              <div>
                <div class="pa-4">
                  <div>
                    <h2><NuxtLink to="/color-tools">Palette Generator</NuxtLink></h2>
                  </div>
                  <div>
                    <span>Harmonic Colors Palette generator.</span>
                  </div>  
                </div>
              </div>
            </template>
            <template v-slot:back>
              <div>
                <div class="pa-4">
                  <div>
                    <h2><NuxtLink to="/color-tools">Palette Generator</NuxtLink></h2>
                  </div>
                  <div>
                    <span>Harmonic Colors Palette generator.</span>
                  </div>  
                </div>
              </div>              
            </template>
          </GlassmorphCard>      
        </div>

        <div class="pa-4">
          <GlassmorphCard  height="200px">
            <template v-slot:front>
              <div>
                <div class="pa-4">
                  <div>
                    <h2><NuxtLink to="/utm-builder">Utm url builder</NuxtLink></h2>
                  </div>
                  <div>
                    <span>This tool helps create Utm urls for ad campaigns.</span>
                  </div>  
                </div>
              </div>
            </template>
            <template v-slot:back>
              <div>
                <div class="pa-4">
                  <div>
                    <h2><NuxtLink to="/utm-builder">Utm url builder</NuxtLink></h2>
                  </div>
                  <div>
                    <span>This tool helps create Utm urls for ad campaigns.</span>
                  </div>  
                </div>
              </div>              
            </template>
          </GlassmorphCard>      
        </div>

      </div>
         
      <p>I look forward to bring up more exciting features in the future.</p>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    setup () {
      useHead({
        titleTemplate: '%s - useHead example',
        bodyAttrs: {
          class: 'test'
        }
      })
      return { dynamic: ref(49) }
    },
    head: {
      title: 'Another title'
    }
  }
  </script>
<style scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.icon {
  --white-shade-1: #ffffff;
  --white-rgba: rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  height: 65px;
  width: 65px;
  background-color: var(--white-rgba);
  font-size: 25px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--white-shade-1);
}

.icon:hover {
  --theme-color-1: #0084ff;
  --white-shade-1: #ffffff;
  transform: translateY(-10px);
  background-color: var(--white-shade-1);
  color: var(--theme-color-1);
}

.background {
  background-image: url("@/assets/images/background-1.jpg");
}

</style>
