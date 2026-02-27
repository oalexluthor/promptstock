import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'



function getDynamicSidebar() {
  const docsPath = path.resolve(__dirname, '../')
  const sidebar = []

  // Lê as subpastas (ex: code_reviewer, gerencia, sac)
  const categories = fs.readdirSync(docsPath).filter(f => 
    fs.statSync(path.join(docsPath, f)).isDirectory() && !f.startsWith('.')
  )

  categories.forEach(cat => {
    const catPath = path.join(docsPath, cat)
    const files = fs.readdirSync(catPath).filter(f => f.endsWith('.md'))

    sidebar.push({
      text: cat.replace(/_/g, ' ').toUpperCase(), // Ex: CODE REVIEWER
      items: files.map(file => ({
        text: file.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
        link: `/${cat}/${file.replace('.md', '')}` // Link exato para o arquivo
      }))
    })


    // teste de duplicação da sidebar
        sidebar.push({
      text: cat.replace(/_/g, ' ').toUpperCase(), // Ex: CODE REVIEWER
      collapsed: true,
      items: files.map(file => ({
        text: file.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
        link: `/${cat}/${file.replace('.md', '')}` // Link exato para o arquivo
      }))
    })
    
  })

  return sidebar
}



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Promptzilla",
  description: "Promp like a man. Make a huge mess like Godzilla!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: getDynamicSidebar(),


    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //       { text: 'Code Reviewer', link: '/code_reviewer/agent-code-reviewer' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
