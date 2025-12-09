<template>
  <div>
     <ActionFeedback 
      :message="feedbackMessage" 
      :color="feedbackColor"
      v-model:show="showFeedback">
    </ActionFeedback>
   
    <div width="600" class="mx-auto">
      <div>Utm Generation form</div>
      <div>
        <v-form ref="utmForm" v-model="formValidity">
          <v-text-field
            v-model="form.url"
            label="target url?  (e.g. https://www.example.com)"
            :rules="nameRules"
          />

          <p>Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign.</p>
          <v-text-field
            v-model="form.id"
            label="Campaign id?"
            :rules="nameRules"
          />
          
          <p>Use utm_source to identify a search engine, newsletter name, or other source.</p>
          <v-text-field
            v-model="form.source"
            label="Campaign source? The referrer (e.g. google, newsletter)"
            :rules="nameRules"
            required
          />
          
          <p>Use utm_medium to identify a medium such as email or cost-per-click.</p>
          <v-text-field
            v-model="form.medium"
            label="Campaign medium? Marketing medium (e.g. cpc, banner, email)"
            :rules="nameRules"
            required
          />
          
          <p>Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign.</p>
          <v-text-field
            v-model="form.campaign"
            label="Campaign name? Product, promo code, or slogan (e.g. spring_sale) One of campaign name or campaign id are required."
            :rules="nameRules"
          />
          
          <p>Used for paid search. Use utm_term to note the keywords for this ad.</p>
          <v-text-field
            v-model="form.term"
            label="Campaign term? Identify the paid keywords.(e.g. running+shoes)"
            :rules="nameRules"
          />
          
          <p>Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL.</p>
          <v-text-field
            v-model="form.content"
            label="Campaign content? (e.g. logolink)"
            :rules="nameRules"
          />

          <div>
            <h2>Final Url</h2>
            <h3>{{finalUrl}}</h3>
          </div>
        </v-form>
      </div>
      <div>
        <!-- <v-btn block color="success" :loading="loading" @click="submit">
          Generate
        </v-btn> -->
      </div>
    </div>
    
  </div>
</template>
<script setup>
import MessageRepositoryProxy from '@/messages/lib/message-repository-proxy'
import { ref } from 'vue'

const loading = ref(false);

const showFeedback = ref (false)
const feedbackMessage = ref ('Thanks for sending your message.')
const feedbackColor = ref('success')

const formValidity = ref (false)
const nameRules = ref([value => (value != null && value.trim().length > 1) || 'I like to know your name.'])


const form = ref({
  url: 'https://juanlabrada.com',
  id: '',
  source: '',
  medium: '',
  campaign: '',
  term: '',
  content: ''
})

const utmForm = ref(null)

const utmList = computed(() => Object.keys(form.value).map(key => (key !== 'url' && form.value[key].trim() !== '') ? `utm_${key}=${form.value[key]}`: '').reduce((a,v) => v !== '' ? a += '&' + v : a, ''))

const finalUrl = computed(() => `${form.value.url}?${utmList.value.substring(1)}`)

async function submit () {
  const validationResult = await utmForm.value.validate();
  
  if (!validationResult.valid) {
    return
  }
  // show the waiting image
  loading.value = true
  form.value.date = new Date(Date.now())
  

      // hide the waiting image
  utmForm.value.resetValidation()
  utmForm.value.reset()
  loading.value = false
  showFeedback.value = true
}

</script>

