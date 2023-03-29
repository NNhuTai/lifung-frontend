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
            search: '',
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
            ],
            listFilter: [
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
            ],
            name: '',
            description: '',
            userId: '',
            userN: '',
            userListId: []
        };
    }
    componentWillMount() {
        this.setState({
            userListId: this.state.list.map(todo => todo.userId)
        });
        this.loadData();

    }

    loadData = () => {
        const axios = require('axios');
        axios.get('http://localhost:8080/todo/get')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    list: response.data,
                    listFilter: response.data,
                    userListId: response.data.map(todo => todo.userId)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    seleteItem = (key) => {
        console.log(key);
        this.setState({
            detail: this.state.list.find(task => task.id === key)
        })
    }
    setQ = (value) => {
        this.setState({
            search: value,
            detail: {}
        });
    }
    handleClick = () => {
        console.log("")
        const axios = require('axios');
        let data = {
            'name': this.state.name,
            'description': this.state.description,
            'userId': this.state.userId
        };
        axios.post('http://localhost:8080/todo/create', { ...data }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChange = (event) => {
        console.log(event.target.value);
        if (event.target.value == '') {
            this.setState({
                userN: event.target.value,
                listFilter: this.state.list
            });
        }
        else {
            this.setState({
                userN: event.target.value,
                listFilter: this.state.list.filter(task => task.userId == event.target.value)
            });
        }
    };

    render() {

        const listItems = this.state.listFilter.filter(task => task.name.includes(this.state.search)).map((todo) =>
            <li key={todo.id}><a onClick={() => this.seleteItem(todo.id)}>{todo.name} </a></li>
        );
        const userList = this.state.userListId.map((todo) =>
            <option value={todo}>{todo}</option>
        );

        const search = this.state.search;
        const value = this.state.userN;
        return (
            <div>
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <span className="sr-only"> Search Todo here</span>
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={search}
                            /*
                            // set the value of our useState q
                            //  anytime the user types in the search box
                            */
                            onChange={(e) => this.setQ(e.target.value)}
                        />
                    </label>
                </div>
                <br></br>

                <span className="sr-only"> Search by UserID </span>
                <select value={value} onChange={this.handleChange}>
                    <option value=''></option>
                    {userList}
                </select>
                <br></br>
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
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        })
                    }}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={this.state.description}
                    onChange={(e) => {
                        this.setState({
                            description: e.target.value
                        })
                    }}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="userId"
                    value={this.state.userId}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        this.setState({
                            userId: e.target.value
                        })
                    }}
                />
                <button onClick={this.handleClick}> Create Todo</button>
            </div>)
    }
}
export default TodoList;