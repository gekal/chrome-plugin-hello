document.addEventListener('DOMContentLoaded', (): void => {
  console.log('ポップアップが読み込まれました');

  // Chrome拡張機能APIを使用する例
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0];
    console.log('現在のタブ:', currentTab);
  });
});
