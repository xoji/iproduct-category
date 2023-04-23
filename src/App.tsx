import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {ClipLoader} from "react-spinners";

function App() {

  const [state, setState] = useState({
    text: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  function onChange(e: React.FormEvent<HTMLInputElement>)  {
    setState({ text: e.currentTarget.value });
  }

  function submit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (state) {
      setLoading(true);
      axios.post('http://localhost:4000/api/category', {
        name: state
      }).then(res => {
        if (res.data.status) {
          setLoading(false);
          (window as any).Telegram.WebApp.close();
        }
      });
    }
  }

  useEffect(() => {
    (window as any).Telegram.WebApp.expand();
  }, [])

  return (
    <>
      <div className={'form-container'}>
        <input type="text" placeholder={'Имя категории'} className={'category-input'} onChange={onChange} value={state.text}/>
        <button className={'submit-btn'} onClick={submit}>Добавить</button>
      </div>
      {
        loading ?
          <div className="loading-container">
            <ClipLoader
              color="#ffffff"
              size={50}
            />
          </div> : <></>
      }
    </>
  );
}

export default App;