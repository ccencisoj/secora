import React from 'react';
import clsx from 'clsx';
import agent from 'agent';
import { connect } from 'react-redux';
import styles from './ColorList1.module.scss';
import Button from 'components/Button/Button';
import ColorCard1 from 'components/ColorCard/ColorCard1';
import { useCustomRouter } from 'hooks/CustomRouterContext';
import { LOAD_COLOR_LIST, ADD_ERROR } from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  colorList: store.colorList.colorList,
  colorListLength: store.colorList.colorListLength,
});

const mapActionsToProps = (dispatch)=> ({
  loadColorList: (colorList)=> dispatch({
    type: LOAD_COLOR_LIST,
    payload: {
      colorList: colorList
    }
  }),
  addError: (error)=> dispatch({
    type: ADD_ERROR,
    payload: {error}
  })
});

class ColorList1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    const { loadColorList, addError } = this.props;

    agent.Color.getList().then((response)=> {
      const colorList = response.data.colors;
      loadColorList(colorList);
    })
    .catch((error)=> {
      addError({message: `No se ha podido cargar la lista de colores 
      debido a un error en el servidor`});
    });
  }
  
  render = ()=> {
    const { colorList, colorListLength, customRouter } = this.props;

    const styles_color_list = clsx({
      [styles.color_list]: true,
      [styles.visible_items]: colorListLength > 0,
      [styles.hidden_items]: colorListLength === 0,
    });
    
    return (
      <div className={styles_color_list}>
        {colorListLength !== null &&
        <React.Fragment>
        <div className={styles.items}>
          {colorList.map((color)=> 
          <ColorCard1 key={color.id} {...color}/>)}
        </div>
        <p className={styles.sentence}>
          Aun no has agregado un color.
          <Button 
            label="Volver al inicio" 
            linkTheme={true}
            onClick={()=> customRouter.push("/")}/>
        </p>
        </React.Fragment>}
      </div>
    )
  }
}

const ConnColorList1 = connect(
  mapStateToProps, mapActionsToProps)(ColorList1);

export default (props)=> {
  const customRouter = useCustomRouter();

  return <ConnColorList1 {...props}
    customRouter={customRouter}/>
}