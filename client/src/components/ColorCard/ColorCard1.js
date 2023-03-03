import React from 'react';
import agent from 'agent';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Button from 'components/Button/Button';
import styles from './ColorCard1.module.scss';
import { DELETE_COLOR } from 'constants/actionTypes';
import ColorRange1 from 'components/ColorRange/ColorRange1';

const mapActionsToProps = (dispatch)=> ({
  deleteColor: (colorId)=> dispatch({
    type: DELETE_COLOR,
    payload: {
      colorId: colorId
    }
  })
});

class ColorCard1 extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteColor = ()=> {
    const { deleteColor, id: colorId } = this.props;

    agent.Color.delete(colorId)
    .then((response)=> {
      deleteColor(colorId);
    });
  }

  render = ()=> {
    const { name, range, deleted } = this.props;
    
    const styles_color_card = clsx({
      [styles.color_card]: true,
      [styles.deleted]: deleted
    });

    return (
      <div className={styles_color_card}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p className={styles.name}>{name}</p>
            <div className={styles.actions}>
              <Button 
                label="Descartar" 
                redLinkTheme={true}
                onClick={this.deleteColor}/>
            </div>
          </div>
          <div className={styles.color_range}>
            <ColorRange1 
              width="100%" 
              height="100%" 
              hiddenThumbs={true}
              initialColorRange={range}/>
          </div>
        </div>
      </div>
    )
  }
}

const ConnColorCard1 = connect(
  null, mapActionsToProps)(ColorCard1);

export default ConnColorCard1;