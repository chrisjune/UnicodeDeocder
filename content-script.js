console.log("content-script ran")

function copyToClipboard(text) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = text
    input.select()
    document.execCommand('copy')
    input.remove()
}

chrome.storage.local.get("decoder", function (storage) {
    var decodedString=storage.decoder
    copyToClipboard(decodedString)
    alert(`Decoded String\n\n${decodedString}`)
    chrome.storage.local.remove("decoder");
});
