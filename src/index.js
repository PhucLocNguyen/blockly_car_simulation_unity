import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './languages/i18n'; // Đảm bảo cấu hình i18n cho đa ngôn ngữ
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import LanguageProvider from './context/LanguageProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Giữ nguyên hoặc thay đổi chế độ offline tùy ý
serviceWorker.unregister();
