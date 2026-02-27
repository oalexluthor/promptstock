<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  template: { type: String, required: true },
  variables: { type: [Array, String], required: true }
})

// 1. Garantir que temos um array para o loop
const parsedVariables = computed(() => {
  return typeof props.variables === 'string' 
    ? JSON.parse(props.variables) 
    : props.variables
})

// 2. Inicializa o estado dos inputs
const inputs = reactive({})
// Usamos um watcher ou inicializamos direto se os dados forem estáticos
parsedVariables.value.forEach(v => {
  if (!(v in inputs)) inputs[v] = ''
})

const copied = ref(false)

// --- A FUNÇÃO QUE ESTAVA FALTANDO AQUI ---
const formatLabel = (str) => {
  if (!str) return ''
  return str.replace(/_/g, ' ').toUpperCase()
}

const finalPrompt = computed(() => {
  let result = props.template
  parsedVariables.value.forEach(v => {
    const value = inputs[v] || `{${v}}`
    result = result.replaceAll(`{${v}}`, value)
  })
  return result
})

const copyToClipboard = () => {
  navigator.clipboard.writeText(finalPrompt.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="prompt-container">
    <div v-for="variable in parsedVariables" :key="variable" class="input-group">
      <label :for="variable">{{ formatLabel(variable) }}</label>
      <textarea 
        v-model="inputs[variable]" 
        :id="variable" 
        rows="2" 
        placeholder="Digite aqui..."
      ></textarea>
    </div>

    <div class="preview-section">
      <h3>Prompt Finalizado:</h3>
      <div class="prompt-box">
        <pre>{{ finalPrompt }}</pre>
      </div>
      <button @click="copyToClipboard" class="copy-btn">
        {{ copied ? '✅ Copiado!' : '📋 Copiar Prompt' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.prompt-container { margin: 2rem 0; padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 8px; background: var(--vp-c-bg-soft); }
.input-group { margin-bottom: 1rem; }
.input-group label { display: block; font-weight: bold; margin-bottom: 0.5rem; font-size: 0.85rem; }
.input-group textarea { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-family: sans-serif; }
.prompt-box { background: #1a1a1a; color: #fff; padding: 1rem; border-radius: 4px; overflow-x: auto; white-space: pre-wrap; margin-bottom: 1rem; font-size: 0.9rem; }
.copy-btn { background: var(--vp-c-brand); color: white; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold; transition: opacity 0.2s; }
.copy-btn:hover { opacity: 0.8; }
</style>