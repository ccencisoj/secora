import React from 'react';
import convert from 'color-convert';
import styles from './ColorBar1.module.scss';

class ColorBar1 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = {
      canvas: React.createRef(),
      resize: React.createRef()
    };
    this.mousedown = {
      resize: {
        x: 0,
        y: 0,
        state: false
      }
    };
  }

  componentDidMount = ()=> {
    const resize = this.ref.resize.current;
    const canvas = this.ref.canvas.current;
    const resizeRect = resize.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    //Inicializo la barra de color
    this.updateColorBar(canvasRect.width, canvasRect.height);  

    resize.addEventListener("mousedown", (ev)=> {
      this.mousedown.resize.x = ev.clientX;
      this.mousedown.resize.y = ev.clientY;
      this.mousedown.resize.state = true;
    });

    resize.addEventListener("mouseup", (ev)=> {
      this.mousedown.resize.state = false;
    });

    window.addEventListener("mouseup", (ev)=> {
      this.mousedown.resize.state = false;
    });
  
    window.addEventListener("mousemove", (ev)=> {
      if(!this.mousedown.resize.state) return; 

      const resizeLeft = ev.clientX - (resizeRect.width/2);
      const resizeTop = ev.clientY - (resizeRect.height/2);
      
      resize.style.left = `${resizeLeft}px`;
      resize.style.top = `${resizeTop}px`;

      this.updateColorBar(resizeLeft, resizeTop);
    });
  }

  updateColorBar = (cWidth, cHeight)=> {
    const canvas = this.ref.canvas.current;
    const ctx = canvas.getContext("2d");

    canvas.width = cWidth;
    canvas.height = cHeight;
    canvas.style.width = `${cWidth}px`;
    canvas.style.height = `${cHeight}px`;

    for(let i = 0; i < cWidth; i++) {
      ctx.beginPath();
      ctx.fillStyle = `hsl(${i * (360/cWidth)}, 100%, 50%)`;
      ctx.rect(i, 0, 1, cHeight);
      ctx.fill();
      ctx.closePath();
    }
  }

  render = ()=> {
    return (
      <div className={styles.color_bar1}>
        <canvas className={styles.canvas} ref={this.ref.canvas}></canvas>
        <div className={styles.resize} ref={this.ref.resize}></div>
      </div>
    )
  }
}

export default ColorBar1;