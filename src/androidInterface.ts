interface AndroidInterface {
  showToast: (message: string) => void;
}

declare global {
  interface Window {
    AndroidInterface: AndroidInterface;
  }
}

window.AndroidInterface = {
  showToast: function (message: string): void {
    console.log(`Mocked AndroidInterface.showToast called with: ${message}`);
    // Webviewのスクリプトを評価する
    (window as any).handleReturnValue('Hello from Mocked!');
  },
};

// モジュールとして認識させるための空のエクスポート
export {};
