import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Define the onTelegramAuth function globally so the widget can call it

    //@ts-ignore
    window.onTelegramAuth = (user) => {
      alert(
        `Logged in as ${user.first_name} ${user.last_name} (${user.id}${
          user.username ? ', @' + user.username : ''
        })`
      );
    };

    // Add the Telegram widget script dynamically
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'upfront_app_bot'); // Replace with your bot username
    script.setAttribute('data-size', 'large'); // Size: large, medium, small
    script.setAttribute('data-onauth', 'onTelegramAuth(user)'); // Auth callback
    script.setAttribute('data-request-access', 'write'); // Request write access (optional)

    // Append the script to the "telegram-login" container
    const container = document.getElementById('telegram-login')!;
    container.appendChild(script);

    // Cleanup: Remove script when component unmounts
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <h1>HELLO</h1>

      <div>
        <h1>Login with Telegram</h1>
        <div id="telegram-login"></div>
      </div>
    </>
  );
}

export default App;
