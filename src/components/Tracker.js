import React, {Component} from 'react';

class Tracker extends Component{
    constructor(props){
        super(props);
        this.state = {x: 0, y: 0};
    }

    static dist(x1, y1, x2, y2){
        return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    }

    static getDerivedStateFromProps(props, state){
        // console.log(props.position.x + " " + props.position.y);
        if (Tracker.dist(state.x, state.y, props.position.x, props.position.y)>500){
            props.change_cord(props.position.x/5, props.position.y/5);
            return {
                x: props.position.x,
                y: props.position.y
            };
        }
        return null;
    }

    render(){
        return (
            <div style={{height: "200px", border: "1px solid"}}/>
        )
    }
}

export default Tracker;