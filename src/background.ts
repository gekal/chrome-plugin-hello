chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AndroidInterface' && message.method === 'showToast') {
    const [toastMessage] = message.args;

    // 実際の Android 連携処理を実装
    // ここではダミーレスポンスを返します
    setTimeout(() => {
      sendResponse(`Toast message: ${toastMessage}`);
    }, 1000);

    // 非同期レスポンスを送信するために true を返す
    return true;
  }
});
