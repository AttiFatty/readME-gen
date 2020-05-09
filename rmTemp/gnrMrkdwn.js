const generateMarkdown = data => {
  return `
<a href="${data.link} title="${data.name}"></a>

${data.title.toUpperCase()}

${data.name}

${data.inst}

${data.use}

${data.con}

${data.test}

${data.qs}
`
}

module.exports = generateMarkdown
