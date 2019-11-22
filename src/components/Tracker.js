import React, {Component} from 'react';
import CanvasDraw from "react-canvas-draw";

class Tracker extends Component{
    constructor(props){
        super(props);
        this.state = {x: 0, y: 0, clicked: false};
        this.mouse_down = this.mouse_down.bind(this);
        this.mouse_up = this.mouse_up.bind(this);
    }

    static dist(x1, y1, x2, y2){
        return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    }

    static getDerivedStateFromProps(props, state){
        // console.log(props);
        // console.log(state);
        // console.log("---")
        if (props.isPositionOutside){
            return {
                clicked: false
            };
        }
        // console.log(props.position.x + " " + props.position.y);
        if (state.clicked && Tracker.dist(state.x, state.y, props.position.x, props.position.y)>500){
            props.change_cord(props.position.x/5, props.position.y/5);
            console.log(props);
            return {
                x: props.position.x,
                y: props.position.y
            };
        }
        return null;
    }

    mouse_down(){
        console.log("SUKAAAA");
        this.setState({clicked: true});
    }

    mouse_up(){
        console.log("SUKAAAA");
        this.setState({clicked: false});
    }

    render(){
        return (
            <div style={{height: "200px", border: "1px solid"}} onMouseDown={this.mouse_down} onMouseUp={this.mouse_up}>
                <CanvasDraw canvasWidth={"100%"} canvasHeight={"100%"} brushRadius={5} lazyRadius={0}/>
            </div>
        )
    }
}

export default Tracker;