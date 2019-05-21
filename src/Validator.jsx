import React, { Component, cloneElement, createContext } from 'react';

const ValidatorContext = createContext({});

export class ValidatorGroup extends Component {
    stack = {}
    constructor(props) {
        super(props);

        this.props = props;
        this.addStack = this.addStack.bind(this);
        this.removeStack = this.removeStack.bind(this);
        this.register = this.register.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    addStack(key) {
        this.stack[key] = true;
        console.log(this.stack);
    }

    register(key) {
        this.stack[key] = false;
    }

    removeStack(key) {
        this.stack[key] = false;
        console.log(this.stack);
    }

    isValid() {
        return !Object.keys(this.stack).some(item => this.stack[item] === false);
    }

    render() {
        return (
            <ValidatorContext.Provider value={{
                isValid: this.isValid,
                addStack: this.addStack,
                register: this.register,
                removeStack: this.removeStack
            }}>
                {this.props.children}
            </ValidatorContext.Provider>
        );
    }
}


export class Submit extends Component {
    static contextType = ValidatorContext;

    constructor(props) {
        super(props);
        this.props = props;

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log(this.context.isValid());
        if (this.props.children.props.onClick) {
            this.props.children.props.onClick(e);
        }
    }

    render() {
        return cloneElement(this.props.children, { onClick: this.onClick });
    }
}


export class Validator extends Component {
    static contextType = ValidatorContext;

    constructor(props) {
        super(props);
        this.props = props;

        this.key = Date.now();
        this.state = {
            errorMessage: ""
        }

        this.onChange = this.onChange.bind(this);
        this.checkMinMax = this.checkMinMax.bind(this);
        this.addErrorToStack = this.addErrorToStack.bind(this);
        this.removeErrorToStack = this.removeErrorToStack.bind(this);

    }

    componentDidMount() {
        this.context.register(this.key);
    }

    onChange(e) {
        this.checkMinMax(e.target.value);
        if (this.props.children.props.onChange) {
            this.props.children.props.onChange(e);
        }
    }

    checkMinMax(val) {
        const { min, max } = this.props;
        if (val.length < min || val.length > max) {
            this.setState({ errorMessage: "Please provide text" });
            this.addErrorToStack();
        }
        else this.clearError()
    }

    addErrorToStack() {
        this.context.addStack(this.key)
    }

    removeErrorToStack() {
        this.context.removeStack(this.key)

    }

    clearError() {
        this.setState({ errorMessage: "" });
        this.removeErrorToStack();
    }

    render() {
        return cloneElement(this.props.children, { onChange: this.onChange });

    }
}