import React, { Component } from "react";
import { ValidatorGroup, Validator, Submit } from "./Validator";

export default class Demo extends Component {
    constructor(props, context) {
        super();
        this.state = {
            userName: "",
            surName: ""
        }
        this.save = this.save.bind(this);
        this.handleSurName = this.handleSurName.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
    }

    errorText(msg) {
        return (<h1>{msg}</h1>);
    }

    save() {
        alert("saved");
    }

    handleUserName(e) {
        this.setState({ userName: e.target.value });
    }

    handleSurName(e) {
        this.setState({ surName: e.target.value });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <ValidatorGroup onChange>
                        <div>
                            <div>
                                <Validator min={2} max={3}>
                                    <input type="text" placeholder="Username" onChange={this.handleUserName} />
                                </Validator>
                            </div>
                        </div>
                        <div>
                            <Validator min={10} max={20} >
                                <input type="text" placeholder="Surname" onChange={this.handleUserName} />
                            </Validator>
                        </div>
                        <Submit>
                            <button onClick={this.save}>Save</button>
                        </Submit>
                    </ValidatorGroup>

                    <ValidatorGroup onChange>
                        <div>
                            <div>
                                <Validator onError={(e) => console.log(e)} min={2} max={3}>
                                    <input type="text" placeholder="Username" onChange={this.handleUserName} />
                                </Validator>
                            </div>
                        </div>
                        <div>
                            <Validator min={10} max={20} >
                                <input type="text" placeholder="Surname" onChange={this.handleUserName} />
                            </Validator>
                        </div>
                        <Submit>
                            <button onClick={this.save}>Save</button>
                        </Submit>
                    </ValidatorGroup>
                </header >


            </div>
        );
    }
}