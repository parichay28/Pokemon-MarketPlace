import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation';
import fetchStates from '../reducers/fetchStates'

const DEFAULT_GENERATION = {
    generationId: '',
    expiration: ''
}
const MINIMUM_DELAY = 3000;
class Generation extends Component {
    /*
    constructor(){
        this.state = {};
    }
    This can also be done using modern syntax of JS i.e. writing state={}
    */

    state = { generation: DEFAULT_GENERATION };
    timer = null;

    componentDidMount() {
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    /*
    
    NO LONGER NEEDED SINCE THIS FUNCTION IS MAPPED TO PROPS OF THIS COMPONENT

    fetchGeneration = () => {
        fetch('http://localhost:3000/generation')
            .then(response => response.json())
            .then(json => {
                console.log('json', json)
                // below line is no longer needed since we use redux state instead of local state of this component
                //this.setState({generation: json.generation});
                /*this.props.dispatch(generationActionCreator(json.generation));
                this.props.dispatchGeneration(json.generation);
            })
            .catch(error => console.log('error', error));
    };
    
    */


    fetchNextGeneration = () => {
        this.props.fetchGeneration();
        let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();

        if (delay < MINIMUM_DELAY) {
            delay = MINIMUM_DELAY;
        }
        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    }


    render() {

        console.log('this.props', this.props);

        /* const generation = this.state.generation 
        is equivalent to
        const { generation } = this.state ---> this is called destructuring*/

        const { generation } = this.props;

        if (generation.status === fetchStates.error) {
            return <div>{generation.message}</div>;
        }

        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on: </h3>


                {/* THIS IS THE WAY TO ADD COMMENTS IN JSX
                new Date() returns the expiration field's date format in human readable form and since JSX renders string values we convert it by using .toString()
                */}

                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const generation = state.generation;
    return { generation };
};

/*const mapDispatchToProps = (dispatch) => {
    return { 
        /*dispatchGeneration: (generation) => dispatch(
            generationActionCreator(generation)
        ),
        fetchGeneration: () => fetchGeneration(dispatch)
     };
};*/



const componentsConnector = connect(
    mapStateToProps,
    { fetchGeneration });
export default componentsConnector(Generation);