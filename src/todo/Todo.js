import { Component } from "react";
class Todo extends Component {
    render() {
        return (
            <div>
                <ul>
                <li><b>Name:</b> {this.props.name}</li>
                <li><b>Description: </b> {this.props.description}</li>
                <li><b>UserId: </b>{this.props.userId}</li>
                </ul>
            </div>)
    }
}
export default Todo;