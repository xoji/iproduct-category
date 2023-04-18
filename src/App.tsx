import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [state, setState] = useState({
    text: "",
  });

  function onChange(e: React.FormEvent<HTMLInputElement>)  {
    setState({ text: e.currentTarget.value });
  }

  function submit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (state) {
      axios.post('https://iproduct.uz/api/category', {
        name: state
      }).then(res => {
        if (res.data.success) {
          (window as any).Telegram.WebApp.close();
        }
      });
    }
  }

  useEffect(() => {
    (window as any).Telegram.WebApp.expand();
  }, [])

  return (
    <div className={'form-container'}>
      <input type="text" placeholder={'Имя категории'} className={'category-input'} onChange={onChange} value={state.text}/>
      <button className={'submit-btn'} onClick={submit}>Добавить</button>
    </div>
  );
}

export default App;