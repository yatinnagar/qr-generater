import QrCode from "qrcode";
import { useState } from "react";
import "./App.css";
import useLocalStorage from "use-local-storage";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function App() {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isDarkMode, setDarkMode] = useState(true);
  const [theme,setTheme]=useLocalStorage('theme'?'dark':'light');
  function switchTheme(){
    const newTheme=theme==='light'?'dark':'light';
    setTheme(newTheme);
  }

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    switchTheme();
  };
  function generateQrCode() {
    QrCode.toDataURL(
      url,
      {
        width: 750,
        margin: 2,
        color: {
          dark:!0?"#0a0a0aff":"#dbdad5ff" ,
          light:!0?"#dbdad5ff":"#0a0a0aff"
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        console.log(url);
        setQrcode(url);
      }
    );
  }
  return (
    <div className="app" data-theme={theme}>
       <DarkModeSwitch
        
        style={{ textAlign:'left',marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={60}
      />
      <div className="container">
        <h1>QR Code Generater</h1>
       
        <input
          type="text"
          placeholder="e.g www.google.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button onClick={generateQrCode}>Generate</button>
        {qrcode && (
          <>
            <img src={qrcode} alt="" />
            <br></br>
            <a href={qrcode} download="qrcode.png">
              
              Download
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
