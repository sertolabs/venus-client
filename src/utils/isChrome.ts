const isChromeRuntime = () => {
  return window.chrome && chrome.runtime && chrome.runtime.id
}

export default isChromeRuntime
