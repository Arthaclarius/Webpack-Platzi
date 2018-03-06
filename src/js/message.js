import renderToDOM from './renderToDom'

const waitTime = new Promise((res, rej) => {
  setTimeout(() => {
    res(true)
  }, 5000)
})


export const firstMessage = 'Za Warudo Exported'
export const delayMessage = async () => {
  const message = await waitTime
  
  const element = document.createElement('p')
  element.textContent = message

  renderToDOM(element)
}