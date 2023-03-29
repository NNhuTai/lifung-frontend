import logo from './logo.svg';
import './App.css';
import Todo from './todo/Todo';
import TodoList from './todo/TodoList';

function App() {
  return (
    <div className="App">
      <header >
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TodoList/>
      </header>
    </div>
  );
}
export default App;
