chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AndroidInterface') {
    if (message.method === 'showToast') {
      console.log('Toast message received:', message.args[0]);

      // 仮の処理（本来は OS ネイティブの処理を呼ぶ）
      alert(message.args[0]);

      // `evaluateJavascript` 相当の処理
      sendResponse({ result: 'javascript: handleReturnValue(\'Hello from Chrome!\')' });
    } else {
      sendResponse({ error: 'Unknown method' });
    }
  }
  return true; // 非同期レスポンスを許可
});
