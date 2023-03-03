import React from 'react';
import getBarColor from 'utils/getBarColor';
import styles from './ColorBar2.module.scss';

class ColorBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = {
      colorBar: React.createRef(),
      canvas: React.createRef()
    };
  }

  componentDidMount = ()=> {
    const { fromDegree, toDegree } = this.props;
    this.canvas = this.ref.canvas.current;
    this.ctx = this.canvas.getContext("2d");
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.cWidth = this.canvasRect.width;
    this.cHeight = this.canvasRect.height;

    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;

    this.configureCanvas({
      fromDegree: fromDegree || 0, 
      toDegree: toDegree || 360
    });
  }

  componentDidUpdate = ()=> {
    const { fromDegree, toDegree } = this.props;

    this.configureCanvas({
      fromDegree: fromDegree || 0, 
      toDegree: toDegree || 360
    });
  }
  
  configureCanvas = ({fromDegree, toDegree})=> {
    const aPosition = (this.cWidth/360) * fromDegree;
    const bPosition = (this.cWidth/360) * toDegree;
    const rWidth = (this.cWidth - aPosition) - (this.cWidth - bPosition);
    const rProportion = (rWidth/this.cWidth);
  
    for(let i = 0; i < this.cWidth; i++) {
      const positionX = (i*rProportion) + aPosition;
      const [hue, sat, lig] = getBarColor(this.cWidth, positionX);
  
      this.ctx.beginPath();
      this.ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lig}%)`;
      this.ctx.rect(i, 0, 1, this.cHeight);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  render = ()=> {
    const { width, height } = this.props;

    return (
      <canvas className={styles.canvas} ref={this.ref.canvas}
        style={{width: width || "max-content", height: height || "max-content"}}></canvas>
    )
  }
}

export default ColorBar2;