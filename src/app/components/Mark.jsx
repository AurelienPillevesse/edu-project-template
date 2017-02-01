import React, { Component, PropTypes } from 'react';

import { browserHistory } from 'react-router';

import clientInstance from './Client';

export default class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: null,
        };
        
        this.modifyAfterFind = this.modifyAfterFind.bind(this);
        this.infoAfterDelete = this.infoAfterDelete.bind(this);
    }

    modifyAfterFind(mark) {
        this.setState({
            mark: mark
        })
    }


    infoAfterDelete(info) {
        /*this.setState({
            info: info
        })*/
        browserHistory.push('/');
    }

    deleteMark(id){
        clientInstance.remove(id,this.infoAfterDelete)
    }

    componentDidMount() {
        clientInstance.find(this.props.params.id, this.modifyAfterFind)
    }

    render() {
        if(!this.state.mark) {
            return <div>Loading</div>;
        }
        if(!this.state.mark.length === 0) {
            return <div>Aucune donnée</div>;
        }
        return (
            <div>
                    <div>
                        <div>Date: {this.state.mark.date}</div>
                        <div>Title: {this.state.mark.title}</div>
                        <div>Content:{this.state.mark.content}</div>
                        <button onClick={() => this.deleteMark(this.state.mark.id)}>Supprimer la note</button>
                    </div>
            </div>
        );
    }
};