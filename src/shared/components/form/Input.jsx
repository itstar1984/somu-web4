import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {Input} from 'reactstrap';

class InputComponent extends Component
{
    constructor(props)
    {
        super(props);
    }

    componentWillReceiveProps(props)
    {
        console.log(props);
    }

    render(){
        console.log(this.props);
        const {name,value} = this.props.input;
        console.log(value);
        return (
            <Input name={name} defaultValue={value}></Input>
        )
    }
}

InputComponent.propTypes = {
    input:{
        name:PropTypes.string,
        value:PropTypes.string
    }
}

export default InputComponent;