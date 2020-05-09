const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./utils/api.js')
const generateMarkdown = require('./utils/generateMarkdown.js')

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}

const init = async _ => {
  let gnrObject = {}
  do {
    const { gnrUser, gnrRepo } = await prompt([
      {
        type: 'input',
        name: 'gnrUser',
        message: 'What is your GitHub user name?'
      },
      {
        type: 'input',
        name: 'gnrRepo',
        message: 'What is your repository name?'
      }
    ])
    gnrObject = await api.getUser(gnrUser, gnrRepo)
    if (!gnrObject) {
      console.error('Repo not found!')
    } else {
      console.log(`${gnrObject.fullName} found!`)
    }
  } while (!gnrObject)
  // const ghApi = await api.getUser(gnrUser)
  Object.assign(gnrObject, await prompt([

    {
      type: 'input',
      name: 'inst',
      message: 'What are the installation instructions?'
    },
    {
      type: 'input',
      name: 'use',
      message: 'What is the usage description?'
    },
   
    {
      type: 'input',
      name: 'con',
      message: 'Who are the contributors?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'What are the tests?'
    },
    {
      type: 'input',
      name: 'qs',
      message: 'Any questions?'
    }
  ]))
  writeToFile(gnrObject.title, await generateMarkdown(gnrObject))
}

init()
