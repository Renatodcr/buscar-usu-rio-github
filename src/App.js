import React, { useState } from 'react';
import api from './api';
import './App.css';


function App() {
  const [devs, setDevs] = useState([]);
  const [github_username, setGithubUsername] = useState('');

  async function buscarUsuario() {

    const reponse = await api.get(`/${github_username}`);

    setDevs([...devs, reponse.data]);
    setGithubUsername('');
  }

  return (
    <div className="app">
      <aside>
        <form>
          <div>
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          <button onClick={buscarUsuario} type="button">Buscar Usuário</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="block">
                <h1>{dev.name}</h1>
                <p>{dev.bio}</p>
                <a href={dev.html_url}>Acessar Github</a>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
