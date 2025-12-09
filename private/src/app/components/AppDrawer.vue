<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="12">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
          </v-row>

          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>

          <v-list-item
            v-else
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="grey--text">
                  <router-link :to="{name: 'Notes', params: {category: item.category }}">
                    {{ item.category }}
                  </router-link>
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>

        </template>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  props: ['drawer'],
  mounted () {
  },
  data: () => ({
    items: [
      { heading: 'Software Development' },
      { icon: 'chat_bubble', category: 'Design Principles', link: '/' },
      { icon: 'help', category: 'Refactoring', link: '/' },
      { icon: 'settings', category: 'Design Patterns', link: '/' },
      { icon: 'settings', category: 'Test Driven Development', link: '/' },
      { icon: 'settings', category: 'Domain Driven Design', link: '/' },
      { icon: 'settings', category: 'Architecture', link: '/' },
      { divider: true },
      { heading: 'UI Development' },
      { icon: 'phonelink', category: 'VueJS', link: '/' },
      { icon: 'phonelink', category: 'Web Design', link: '/' },
      { icon: 'phonelink', category: 'Vuetify', link: '/' },
      { icon: 'phonelink', category: 'Storybook', link: '/' },

      { divider: true },
      { heading: 'Leading and Coaching Teams' },
      { icon: 'phonelink', category: 'Agile', link: '/' },
      { icon: 'phonelink', category: 'Scrum And XP', link: '/' },
      { icon: 'phonelink', category: 'Coaching', link: '/' },
      { icon: 'phonelink', category: 'Negotiation', link: '/' },
      { icon: 'phonelink', category: 'Leadership', link: '/' },
      { icon: 'phonelink', category: 'Mindset', link: '/' },
      { divider: true },
      { heading: 'Products' },
      { icon: 'settings', category: 'Code Generation', link: '/' },
      { icon: 'chat_bubble', category: 'Design Editor', link: '/' },
      { divider: true },
      { heading: 'Contact' },
      { icon: 'keyboard', category: 'Contact', link: '/' },
      { icon: 'keyboard', category: 'Chat', link: '/' }
    ]
  })
}
</script>
