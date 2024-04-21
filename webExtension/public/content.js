chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (window.location.hostname === "gemini.google.com") {
    if (request && request.prompt) {
      const prompt = request.prompt;
      console.log("request", request);
      const txtArea = document.querySelector("rich-textarea");
      if (txtArea) {
        const txtEditor = txtArea.querySelector(".ql-editor");
        txtEditor.firstChild.textContent = prompt;
        setTimeout(() => {
          const btn = document.querySelector(
            'button[aria-label="Enviar mensaje"]'
          );
          if (btn) {
            btn.click();
          } else {
            console.log("button not found");
          }
        }, 3000);
      }
      sendResponse({ recived: true });
    }
  } else {
    if (request && request.prompt) {
      console.log("request", request);
      // prettier-ignore
      const txtArea = document.getElementById('prompt-textarea');
      if (txtArea) {
        setTimeout(() => {
          txtArea.value = request.prompt;

          const event = new Event('input', {
            bubbles: true,
            cancelable: true,
          });

          txtArea.dispatchEvent(event);
        }, 2000);

        setTimeout(() => {
          const sendButton = document.querySelector(
            'button[data-testid="send-button"]'
          );
          sendButton.click();
        }, 3000);
      }
      sendResponse({ recived: true });
    }
  }
});
