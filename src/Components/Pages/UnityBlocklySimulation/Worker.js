// worker.js
self.onmessage = function(e) {
    const code = e.data;
    // Xử lý mã tại đây
    self.postMessage(result); // Gửi kết quả về main thread
}
