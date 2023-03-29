import { Component } from "react";
import Todo from "./Todo";
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {
                name: '',
                description: '',
                userId: ''
            },
            q: ''
        };
    }
    componentWillMount() {
        this.setState({
            list: [
                { id: 1, name: 'Task1', description: 'description Task1', userId: 1 },
                { id: 2, name: 'Task2', description: 'description Task2', userId: 1 },
                { id: 3, name: 'Task3', description: 'description Task3', userId: 1 },
                { id: 4, name: 'Task4', description: 'description Task4', userId: 2 },
                { id: 5, name: 'Task5', description: 'description Task5', userId: 3 },
                { id: 6, name: 'Task6', description: 'description Task6', userId: 4 },
                { id: 7, name: 'Todo1', description: 'description Todo1', userId: 5 },
                { id: 8, name: 'Todo2', description: 'description Todo2', userId: 5 },
                { id: 9, name: 'Todo3', description: 'description Todo3', userId: 6 },
                { id: 10, name: 'Todo4', description: 'description Todo4', userId: 7 },
                { id: 11, name: 'Todo5', description: 'description Todo5', userId: 8 },
                { id: 12, name: 'Todo6', description: 'description Todo6', userId: 9 }
            ]
        });
    }
    seleteItem = (key) => {
        console.log(key);
        this.setState({
            detail: this.state.list.find(task => task.id === key)
        })
    }
    setQ = (value) => {
        console.log(this.state.q);
        this.setState({
            q: value,
            detail: {}
        });
    }
    render() {
        const listItems = this.state.list.filter(task => task.name.includes(this.state.q)).map((todo) =>
            <li key={todo.id}><a onClick={() => this.seleteItem(todo.id)}>{todo.name} </a></li>
        );
        const q = this.state.q;
        return (
            <div>
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={q}
                            /*
                            // set the value of our useState q
                            //  anytime the user types in the search box
                            */
                            onChange={(e) => this.setQ(e.target.value)}
                        />
                        <span className="sr-only"> Search Todo here</span>
                    </label>
                </div>
                <section>
                    <nav>
                        <ul>
                            {listItems}
                        </ul>
                    </nav>
                    <article>
                        <h1>Detail</h1>
                        <Todo name={this.state.detail.name} description={this.state.detail.description} userId={this.state.detail.userId} />
                    </article>
                </section>
            </div>)
    }
}
export default TodoList;