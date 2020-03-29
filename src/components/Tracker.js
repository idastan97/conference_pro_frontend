import React, {Component} from 'react';
import CanvasDraw from "react-canvas-draw";

class Tracker extends Component{
    constructor(props){
        super(props);
        this.state = {x: 0, y: 0, clicked: false};
        this.mouse_down = this.mouse_down.bind(this);
        this.mouse_up = this.mouse_up.bind(this);
        this.clear = this.clear.bind(this);
    }

    static dist(x1, y1, x2, y2){
        return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    }

    static getDerivedStateFromProps(props, state){
        if (props.isPositionOutside){
            return {
                clicked: false
            };
        }
        // console.log(props.position.x + " " + props.position.y);
        if (state.clicked && Tracker.dist(state.x, state.y, props.position.x, props.position.y)>500){
            props.change_cord(props.position.x/5, props.position.y/5);
            // console.log(props);
            return {
                x: props.position.x,
                y: props.position.y
            };
        }
        return null;
    }

    mouse_down() {
        this.setState({clicked: true});
    }

    mouse_up() {
        this.setState({clicked: false});
    }

    clear() {
        console.log("Have no fucking idea how to clear it")
    }

    render(){
        let self = this;
        return (
            <div style={{height: "250px"}} onMouseDown={self.mouse_down} onMouseUp={self.mouse_up}>
                <CanvasDraw style={{border: "1px solid black"}} canvasWidth={"100%"} canvasHeight={"80%"} brushRadius={5} lazyRadius={0}/>
                <button className="btn-dark" onClick={self.clear}>Reset</button>
            </div>
        )
    }
}

export default Tracker;