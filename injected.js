chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.hostHeader) {
      photonAddHostLabel(message.hostHeader);
    }
});

function photonAddHostLabel(hostName) {
  var div = document.createElement("div");
  div.id = "photon-host";
  div.innerHTML = hostName;
  document.body.appendChild(div);
  window.setTimeout(function(){
    div.style.opacity = 1;
  });

  div.addEventListener("click", function() {
    div.style.opacity = 0;
    window.setTimeout(function() {
      div.parentNode.removeChild(div);
    }, 1);
  });

}
