function unicodeToString(info) {
  try {
    // var decoded = unicodeToChar(info.selectionText)
    return decodeURIComponent(unicodeToChar(info.selectionText))
  } catch (error) {
    // alert("Invalid Unicode")
    return `Invalid Unicode\n\n${info.selectionText}`
  }
}

chrome.contextMenus.create({
  title: "Unicode decode selection",
  id: "decoder",
  contexts: ["selection"],

}, () => { console.log("finished") })

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  var decoded = unicodeToString(info)
  console.log(decoded)

  chrome.storage.local.set({
    decoder: decoded
  })
  if (decoded) {
    chrome.scripting.executeScript({
      target: { tabId: tabs.id },
      files: ['content-script.js']
    });
  }
})

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi,
    function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}