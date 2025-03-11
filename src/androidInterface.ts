interface AndroidInterface {
  showToast: (message: string) => Promise<string>;
}

declare global {
  interface Window {
    AndroidInterface: AndroidInterface;
  }
}

window.AndroidInterface = {
  showToast: function(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const messageId = Math.random().toString(36).substring(2, 9);

      window.addEventListener('message', function listener(event: MessageEvent) {
        if (event.source !== window || event.data?.messageId !== messageId) return;
        window.removeEventListener('message', listener);
        if (event.data.error) reject(event.data.error);
        else resolve(event.data.result);
      });

      window.postMessage({
        type: 'AndroidInterface',
        method: 'showToast',
        args: [message],
        messageId,
      }, '*');
    });
  },
};

// モジュールとして認識させるための空のエクスポート
export {};