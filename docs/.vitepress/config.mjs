// import { defineConfig } from 'vitepress'
// import fs from 'fs'
// import path from 'path'



// function getDynamicSidebar() {
//   const docsPath = path.resolve(__dirname, '../')
//   const sidebar = []

//   // Lê as subpastas (ex: code_reviewer, gerencia, sac)
//   const categories = fs.readdirSync(docsPath).filter(f => 
//     fs.statSync(path.join(docsPath, f)).isDirectory() && !f.startsWith('.')
//   )

//   categories.forEach(cat => {
//     const catPath = path.join(docsPath, cat)
//     const files = fs.readdirSync(catPath).filter(f => f.endsWith('.md'))

//     sidebar.push({
//       text: cat.replace(/_/g, ' ').toUpperCase(), // Ex: CODE REVIEWER
//       items: files.map(file => ({
//         text: file.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
//         link: `/${cat}/${file.replace('.md', '')}` // Link exato para o arquivo
//       }))
//     })


//     // teste de duplicação da sidebar
//         sidebar.push({
//       text: cat.replace(/_/g, ' ').toUpperCase(), // Ex: CODE REVIEWER
//       collapsed: true,
//       items: files.map(file => ({
//         text: file.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
//         link: `/${cat}/${file.replace('.md', '')}` // Link exato para o arquivo
//       }))
//     })
    
//   })

//   return sidebar
// }



// // https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "Promptzilla",
//   description: "Promp like a man. Make a huge mess like Godzilla!",
//   themeConfig: {
//     // https://vitepress.dev/reference/default-theme-config
//     nav: [
//       { text: 'Home', link: '/' },
//       { text: 'Examples', link: '/markdown-examples' }
//     ],

//     sidebar: getDynamicSidebar(),


//     // sidebar: [
//     //   {
//     //     text: 'Examples',
//     //     items: [
//     //       { text: 'Markdown Examples', link: '/markdown-examples' },
//     //       { text: 'Runtime API Examples', link: '/api-examples' },
//     //       { text: 'Code Reviewer', link: '/code_reviewer/agent-code-reviewer' }
//     //     ]
//     //   }
//     // ],

//     socialLinks: [
//       { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
//     ]
//   }
// })





import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Função auxiliar para buscar todos os arquivos .md recursivamente
function getAllMdFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const name = path.join(dir, file)
    if (fs.statSync(name).isDirectory()) {
      getAllMdFiles(name, allFiles)
    } else if (file.endsWith('.md') && file !== 'index.md') {
      allFiles.push(name)
    }
  })
  return allFiles
}

function getMultiSidebar() {
  const docsPath = path.resolve(__dirname, '..')
  const sidebar = {}

  try {
    // 1. Pegamos as pastas das equipes (primeiro nível)
    const teams = fs.readdirSync(docsPath).filter(f => {
      const fullPath = path.join(docsPath, f)
      return fs.statSync(fullPath).isDirectory() && 
             !f.startsWith('.') && f !== 'node_modules' && f !== 'public'
    })

    teams.forEach(team => {
      const teamPath = path.join(docsPath, team)
      // 2. Buscamos TODOS os arquivos .md dentro dessa equipe (incluindo subpastas)
      const allFiles = getAllMdFiles(teamPath)

      if (allFiles.length > 0) {
        sidebar[`/${team}/`] = [
          {
            text: team.replace(/_/g, ' ').toUpperCase(),
            items: allFiles.map(filePath => {
              // Calculamos o caminho relativo à pasta da equipe para gerar o link correto
              const relativePath = path.relative(teamPath, filePath)
              const fileId = relativePath.replace('.md', '')
              const fileName = path.basename(filePath, '.md').replace(/-/g, ' ')
              
              return {
                text: fileName.charAt(0).toUpperCase() + fileName.slice(1),
                link: `/${team}/${fileId}`
              }
            })
          }
        ]
      }
    })
  } catch (err) {
    console.error("Erro ao gerar Multi-Sidebar:", err)
  }

  return sidebar
}

export default defineConfig({
  title: "Promptzilla",
  description: "Promp like a man. Make a huge mess like Godzilla!",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // Remova o .html dos links internos, o VitePress cuida disso
      { text: 'Dev', link: '/developer/code_reviewer/agent-code-reviewer' },
      { text: 'Projetos', link: '/projetos/' }
    ],

    sidebar: getMultiSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/seu-usuario/promptzilla' }
    ]
  }
})
