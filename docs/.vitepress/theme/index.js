// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import PromptRunner from './components/PromptRunner.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registra o componente globalmente para ser usado nos arquivos .md
    app.component('PromptRunner', PromptRunner)
  }
}