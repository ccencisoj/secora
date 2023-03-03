import React from 'react';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styles from './ColorPanel1.module.scss';
import { useCustomRouter } from 'hooks/CustomRouterContext';
import ColorRange1 from 'components/ColorRange/ColorRange1';
import SquareButton1 from 'components/SquareButton/SquareButton1';
import QuantityField1 from 'components/QuantityField/QuantityField1';
import NewColorDialog1 from 'components/ColorDialog/NewColorDialog1';
import { 
  SET_COLOR_RANGE,
  TOGGLE_NEW_COLOR_DIALOG
} from 'constants/actionTypes';

const mapActionsToProps = (dispatch)=> ({
  toggleNewColorDialog: ()=> dispatch({
    type: TOGGLE_NEW_COLOR_DIALOG
  }),
  setColorRange: (colorRange)=> dispatch({
    type: SET_COLOR_RANGE,
    payload: {
      colorRange: colorRange
    }
  })
});

class ColorPanel1 extends React.Component {
  constructor(props) {
    super(props);
    this.initialColorRange = [
      [180, 100, 50],
      [240, 100, 50]
    ];
    this.props.setColorRange(this.initialColorRange);
  }

  changedColorRange = ({ colorRange })=> {
    this.props.setColorRange(colorRange);
  }

  render = ()=> {
    const { toggleNewColorDialog, customRouter } = this.props;

    return (
      <div className={styles.color_panel}>
        <div className={styles.dialogs}>
        <NewColorDialog1/>
        </div>
        <div className={styles.row}>
          <div className={styles.container}>
            <div className={styles.color_range}>
              <ColorRange1 
                width="100%"
                height="100%"
                initialColorRange={this.initialColorRange}
                onChange={this.changedColorRange}/>
            </div>
            <div className={styles.quantity_field}>
              <QuantityField1 
                label="Cantidad de colores" 
                initialValue={10}/>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.actions}>
              <SquareButton1 icon={Icon.PlusCircle} 
                onClick={()=> toggleNewColorDialog()}/>
              <SquareButton1 icon={Icon.AlignCenter}
                onClick={()=> customRouter.push("/colorList")}
                onHover={()=> customRouter.prefetch("/colorList")}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ConnColorPanel1 = connect(
  null, mapActionsToProps)(ColorPanel1);

export default (props)=> {
  const customRouter = useCustomRouter();

  return <ConnColorPanel1 {...props} 
    customRouter={customRouter}/>
}