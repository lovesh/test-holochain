function yourApp(){alert('your UI code here!')}

function holoTextWrite (message, callback) {
    var xhr = new XMLHttpRequest()
    var url = '/fn/readerWriter/holoTextWrite'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText)
      }
    }
    xhr.send(message)
  }
  
  function holoTextRead (hash, callback) {
    var xhr = new XMLHttpRequest()
    var url = '/fn/readerWriter/holoTextRead'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText)
      }
    }
    xhr.send(hash)
  }