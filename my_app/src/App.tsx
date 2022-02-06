import React from 'react';
import logo from './logo.svg';
import './App.css';
import GitHubStore from './store/GitHubStore/GitHubStore';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          World!
        </a>
        <button onClick={ ()=> {

          const gitHubStore = new GitHubStore();

          const EXAMPLE_ORGANIZATION = 'ktsstudio';

          gitHubStore.getOrganizationReposList({
          organizationName: EXAMPLE_ORGANIZATION
        }).then(result => {
          console.log(result); // в консоли появится список репозиториев в ktsstudio
        })}}>Click!</button>
      </header>
    </div>
  );
}

export default App;
