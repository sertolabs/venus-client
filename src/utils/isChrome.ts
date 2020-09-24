const isChromeRuntime = () => {
  // @ts-ignore
  return window.chrome && chrome.runtime && chrome.runtime.id
}

export default isChromeRuntime
