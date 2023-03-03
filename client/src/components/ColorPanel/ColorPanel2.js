import React from 'react';
import clsx from 'clsx';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styles from './ColorPanel2.module.scss';
import { useCustomRouter } from 'hooks/CustomRouterContext';
import ColorRange1 from 'components/ColorRange/ColorRange1';
import SquareButton1 from 'components/SquareButton/SquareButton1';
import NewColorDialog1 from 'components/ColorDialog/NewColorDialog1';
import { 
  SET_COLOR_RANGE,
  TOGGLE_NEW_COLOR_DIALOG
} from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  hiddenColorPanel: store.colorPanel.hiddenColorPanel  
});

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

class ColorPanel2 extends React.Component {
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
    const { 
      toggleNewColorDialog, 
      customRouter
    } = this.props;

    const styles_color_panel = clsx({
      [styles.color_panel]: true
    }); 

    return (
      <div className={styles_color_panel}>
        <div className={styles.dialogs}>
        <NewColorDialog1/>
        </div>
        <div className={styles.row}>
          <div className={styles.color_range_wrapper}>
            <div className={styles.color_range}>
              <ColorRange1 
                width="100%"
                height="100%"
                initialColorRange={this.initialColorRange}
                onChange={this.changedColorRange}/>
            </div>
          </div>
          <div className={styles.actions_wrapper}>
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

const ConnColorPanel2 = connect(
  mapStateToProps, mapActionsToProps)(ColorPanel2);

export default (props)=> {
  const customRouter = useCustomRouter();

  return <ConnColorPanel2 {...props} 
    customRouter={customRouter}/>
}