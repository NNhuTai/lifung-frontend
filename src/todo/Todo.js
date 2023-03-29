import { Component } from "react";
class Todo extends Component {
    render() {
        return (
            <div>
                <p>Name: {this.props.name}</p> 
                <p>description:  {this.props.description}</p>
                <p>userId: {this.props.userId}</p>
            </div>)
    }
}
export default Todo;