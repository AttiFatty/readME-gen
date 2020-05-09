const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./rmTemp/temp.js')
const generateMarkdown = require('./rmTemp/gnrMrkdwn.js')

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
  
  Object.assign(gnrObject, await prompt([

    {
      type: 'input',
      name: 'inst',
      message: 'INTALLATION PROCESS?'
    },
    {
      type: 'input',
      name: 'use',
      message: 'USAGE?'
    },
   
    {
      type: 'input',
      name: 'con',
      message: 'CONTRIBUTORS?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'TESTS?'
    },
    {
      type: 'input',
      name: 'qs',
      message: 'QUESTIONS?'
    }
  ]))
  writeToFile(gnrObject.title, await generateMarkdown(gnrObject))
}

init()
