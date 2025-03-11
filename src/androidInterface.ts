interface AndroidInterface {
  showToast: (message: string) => Promise<string>;
}

interface MessageResponse {
  messageId: string;
  result?: any;
  error?: string;
}

interface MessageRequest {
  type: string;
  method: string;
  args: any[];
  messageId: string;
}

declare global {
  interface Window {
    AndroidInterface: AndroidInterface;
  }
}

window.AndroidInterface = {
  showToast: function (message: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const messageId = Math.random().toString(36).substring(2, 9);

      // ウェブページ内でのメッセージリスナーを設定
      const listener = (event: MessageEvent): void => {
        const data = event.data as MessageResponse;

        if (event.source !== window || !data || data.messageId !== messageId) return;
        window.removeEventListener('message', listener);

        if (data.error) {
          reject(new Error(data.error));
        } else {
          resolve(data.result);
        }
      };

      window.addEventListener('message', listener);

      // コンテンツスクリプトにメッセージを送信
      const request: MessageRequest = {
        type: 'AndroidInterface',
        method: 'showToast',
        args: [message],
        messageId: messageId,
      };

      window.postMessage(request, '*');
    });
  },
};

// モジュールとして認識させるための空のエクスポート
export {};
