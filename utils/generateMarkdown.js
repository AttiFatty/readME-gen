const generateMarkdown = data => {
  return `
<a href="${data.link}" style="float:right"><img src="${data.avatar}" alt="${data.name}" title="${data.name}" width="120" height="120"></a>

 ${data.title.toUpperCase()}

${(data.lic) ? data.lic : 'None'}](https://img.shields.io/badge/License-${(data.lic) ? data.lic : 'None'}-brightgreen)

${data.name}

${data.desc}


${data.inst}

${data.use}

${data.con}

${data.test}

${data.qs}
`
}

module.exports = generateMarkdown
