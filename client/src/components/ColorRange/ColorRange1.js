import React from 'react';
import getColorRange from 'utils/getColorRange';
import styles from './ColorRange1.module.scss';
import invColorRange from 'utils/invColorRange';
import ColorBar2 from 'components/ColorBar/ColorBar2';
import RangeThumb1 from 'components/RangeThumb/RangeThumb1';

class ColorRange1 extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      position: {
        thumbLeft: {
          left: 0,
          right: 0,
        },
        thumbRight: {
          left: 0,
          right: 0
        }
      }
    };
    this.ref = {
      rangeBar: React.createRef(),
      thumbLeft: React.createRef(),
      thumbRight: React.createRef(),
      opacityLeft: React.createRef(),
      opacityRight: React.createRef()
    };
    this.rangeBarRect = null;
    this.thumbLeftRect = null;
    this.thumbRightRect = null;
  }

  componentDidMount = ()=> {
    const { hiddenThumbs, initialColorRange } = this.props;
    this.rangeBar = this.ref.rangeBar.current;
    
    this.rangeBarRect = this.rangeBar.getBoundingClientRect();
    
    if(hiddenThumbs && initialColorRange) {
      this.opacityLeft = this.ref.opacityLeft.current;
      this.opacityRight = this.ref.opacityRight.current;

      const barWidth = this.rangeBarRect.width;

      const rangePositionsX = invColorRange(barWidth, initialColorRange);
  
      this.opacityLeft.style.right = `${barWidth - rangePositionsX[0]}px`;
      this.opacityRight.style.left = `${rangePositionsX[1]}px`;
    }

    if(!hiddenThumbs) {
      this.thumbLeft = this.ref.thumbLeft.current;
      this.thumbRight = this.ref.thumbRight.current;
  
      //Establezco la posición inicial de los thumbs
      this.thumbLeft.style.left = "40%";
      this.thumbRight.style.left = "70%";
  
      this.thumbLeftRect = this.thumbLeft.getBoundingClientRect();
      this.thumbRightRect = this.thumbRight.getBoundingClientRect();
  
      //Defino las posiciones de los thumbas para que las 
      //opacidades queden acordees
      this.setState({
        position: {
          thumbLeft: {
            left: this.thumbLeft.offsetLeft,
            right: this.rangeBarRect.width - this.thumbLeft.offsetLeft,
          },
          thumbRight: {
            left: this.thumbRight.offsetLeft,
            right: this.rangeBarRect.width - this.thumbRight.offsetLeft,
          }
        }
      });
  
      this.configureThumbLeft();
      this.configureThumbRight();
    }
  }

  configureThumbLeft = ()=> {
    const mousedown = {x: 0, y: 0, state: false};

    window.addEventListener("mouseup", (ev)=> {
      mousedown.state = false;
    });

    this.thumbLeft.addEventListener("mouseup", (ev)=> {
      mousedown.state = false;
    });

    this.thumbLeft.addEventListener("mousedown", (ev)=> {
      mousedown.x = ev.clientX;
      mousedown.y = ev.clientY;
      mousedown.state = true;      
    });

    window.addEventListener("mousemove", (ev)=> {
      if(mousedown.state === false) return;

      const position = {
        left: ev.clientX - this.rangeBarRect.left - (this.thumbLeftRect.width/2),
        right: this.rangeBarRect.width - (ev.clientX - this.rangeBarRect.left)
      };

      const limitX = [0, this.thumbRight.offsetLeft - this.thumbLeftRect.width]; 

      if(position.left >= limitX[0] && position.left <= limitX[1]) {
        this.thumbLeft.style.left = `${position.left}px`;

        this.setState(({position: prevPosition})=> (
          {position: {...prevPosition, thumbLeft: position}} 
        ));
        
        this.onChangePositionThumb();
      }
    });
  }

  configureThumbRight = ()=> {
    const mousedown = {x: 0, y: 0, state: false};

    window.addEventListener("mouseup", (ev)=> {
      mousedown.state = false;
    });

    this.thumbRight.addEventListener("mouseup", (ev)=> {
      mousedown.state = false;
    });

    this.thumbRight.addEventListener("mousedown", (ev)=> {
      mousedown.x = ev.clientX;
      mousedown.y = ev.clientY;
      mousedown.state = true;      
    });

    window.addEventListener("mousemove", (ev)=> {
      if(mousedown.state === false) return;

      const position = {
        left: ev.clientX - this.rangeBarRect.left - (this.thumbRightRect.width/2),
        right: this.rangeBarRect.width - (ev.clientX - this.rangeBarRect.left)
      };

      const limitX = [
        this.thumbLeft.offsetLeft + this.thumbLeftRect.width,
        this.rangeBarRect.width - this.thumbRightRect.width
      ]; 

      if(position.left >= limitX[0] && position.left <= limitX[1]) {
        this.thumbRight.style.left = `${position.left}px`;

        this.setState(({position: prevPosition})=> (
          {position: {...prevPosition, thumbRight: position}} 
        ));

        this.onChangePositionThumb();
      }
    });
  }

  onChangePositionThumb = ()=> {
    const { onChange } = this.props;
    const { position } = this.state;

    const colorRange = getColorRange(
      this.rangeBarRect.width, 
      [position.thumbLeft.left, 
      position.thumbRight.left]);
    
    if(typeof onChange === "function") 
      onChange({colorRange});
  }

  render = ()=> {
    const { width, height, hiddenThumbs } = this.props;
    const { position } = this.state;

    return (
      <div className={styles.color_range1} 
        style={{width: width || "max-content", 
        height: height || "max-content"}}>
        <div className={styles.color_bar}>
          <ColorBar2 width="100%" height="100%"/>
          <div className={styles.opacity_left}
            ref={this.ref.opacityLeft}
            style={{right: `${position.thumbLeft.right}px`}}></div>
          <div className={styles.opacity_right}
            ref={this.ref.opacityRight}
            style={{left: `${position.thumbRight.left}px`}}></div>
        </div>
        <div className={styles.range_bar} ref={this.ref.rangeBar}>
          {!hiddenThumbs && 
          <React.Fragment>
            <RangeThumb1 refThumb={this.ref.thumbLeft}/>
            <RangeThumb1 refThumb={this.ref.thumbRight}/>
          </React.Fragment>}
        </div> 
      </div>
    )
  }
}

export default ColorRange1;