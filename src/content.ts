const injectAndroidInterface = () => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('androidInterface.js');
  document.documentElement.appendChild(script);
  script.onload = () => {
    script.remove();
  };
};

injectAndroidInterface();

// メッセージリスナーは変更なし
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || event.data.type !== 'AndroidInterface') return;

  chrome.runtime.sendMessage(event.data, (response) => {
    window.postMessage({ messageId: event.data.messageId, result: response?.result, error: response?.error }, '*');
  });
});
