import React, { Component } from 'react'

export default class Ex extends Component {

    constructor(props){
        super(props);
        this.state = {
            hello : "Hello react"
        }
    }

    render() {
        return (
            <div>
                <h1>Hello React</h1>
            </div>
        )
    }
}
