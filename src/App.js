import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  };

  useEffect(() => {
    loadRepositories();
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio: ${Date.now()}`,
      url: "https://github.com/SirMcClay/Desafio-Conceitos-do-Node.js.git",
      techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    setRepositories([]);

    await api.delete(`repositories/${id}`);

    setTimeout(loadRepositories, 10);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

