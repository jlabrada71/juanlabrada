<template>
  <div class="pt-14">
    <h1>
      {{ title }}
    </h1>
    <v-timeline>
      <v-timeline-item
        v-for="experience in experiences"
        :key="experience.id"
        large
        fill-dot
      >
         <template #opposite>
          <h2>{{ experience.time }}</h2>
        </template>
        <GlassmorphCard width="25vw" height="40vh">
          <template v-slot:front>
            <v-card class="elevation-2 mx-5 pa-5">
              <v-card-title class="d-flex align-center mb-3">
                <h4 class="text-h5 mx-3" >
                  {{ experience.job }}
                </h4>
                
                <img v-if="experience.image" width="60" height="60" :src="experience.image" :alt="experience.job" class="rounded-lg">
                
              </v-card-title>
              <v-card-text>
                <div class="d-flex flex-wrap">
                  <div
                    v-for="technology of experience.technologies"
                    :key="technology.name"
                    class="mx-2"
                  >
                  <picture>
                    <source media="(min-width:60px)" :srcset="technology.logo">
                    <source media="(min-width:60px)" :srcset="technology.logo">
                    <img width="60"
                      alt="Technology"
                      :aspect-ratio="1"
                      :src="technology.logo">
                  </picture>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:back>
            <v-card class="elevation-2 mx-5 pa-5">
              <v-card-title class="d-flex align-center mb-3">
                <h4 class="text-h5 mx-3" >
                  {{ experience.job }}
                </h4>
                
                <img v-if="experience.image" width="60" height="60" :src="experience.image" :alt="experience.job" class="rounded-lg">
                
              </v-card-title>
              <v-card-text>
                <ul>
                  <li
                    v-for="project of experience.description"
                    :key="project"
                    style="text-align: left"
                  >
                    {{ project }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </template>
        </GlassmorphCard>
        
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    experiences: {
      type: Array,
      default: () => []
    }
  }
}
</script>
