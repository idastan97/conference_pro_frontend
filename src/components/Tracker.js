import React, {Component} from 'react';
import CanvasDraw from "react-canvas-draw";

class Tracker extends Component{
    constructor(props){
        super(props);
        this.state = {x: -100, y: -100, clicked: false};
        this.mouse_down = this.mouse_down.bind(this);
        this.mouse_up = this.mouse_up.bind(this);
        this.clear = this.clear.bind(this);
    }

    static dist(x1, y1, x2, y2){
        return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    }

    mouse_down() {
        // this.props.pen_down(90);
        console.log("mouse down");
        this.setState({clicked: true});
    }

    mouse_up() {
        // this.props.pen_up();
        console.log("mouse up");
        this.setState({clicked: false});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isPositionOutside){
            this.state.clicked = false;
        }
        if (!prevState.clicked && this.state.clicked){
            this.props.change_cord(this.props.position.y, this.props.position.x);
            this.state.x = this.props.position.x;
            this.state.y = this.props.position.y;
            this.props.pen_down(90);
        }
        if (prevState.clicked && !this.state.clicked){
            this.props.pen_up();
        }
        if (prevState.clicked && this.state.clicked){
            if (Tracker.dist(this.props.position.x, this.props.position.y, this.state.x, this.state.y)>100){
                this.props.change_cord(this.props.position.y, this.props.position.x);
                this.state.x = this.props.position.x;
                this.state.y = this.props.position.y;
            }
        }

    }

    clear() {
        console.log("Have no fucking idea how to clear it")
    }

    render(){
        let self = this;
        return (
            <div style={{height: "250px"}} onMouseDown={self.mouse_down} onMouseUp={self.mouse_up}>
                <CanvasDraw style={{border: "1px solid black"}} canvasWidth={"100%"} canvasHeight={"80%"} brushRadius={2} lazyRadius={0}/>
                <button className="btn-dark" onClick={self.clear}>Reset</button>
            </div>
        )
    }
}

export default Tracker;