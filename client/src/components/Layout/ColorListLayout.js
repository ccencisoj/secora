import React from 'react';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import NavPrimary from 'components/Nav/NavPrimary';
import styles from './ColorListLayout.module.scss';
import ColorList1 from 'components/ColorList/ColorList1';
import { useCustomRouter } from 'hooks/CustomRouterContext';
import APIColorAction1 from 'components/ColorAction/APIColorAction1';
import FileColorAction1 from 'components/ColorAction/FileColorAction1';
import ActionAccordion1 from 'components/ActionAccordion/ActionAccordion1';

const mapStateToProps = (store)=> ({
  colorListLength: store.colorList.colorListLength
}); 

class ColorListLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { colorListLength } = this.props;

    return (
      <div className={styles.color_list_layout}>
        <div className={styles.nav}>
          <NavPrimary/>
        </div>
        <div className={styles.main}>
          <p className={styles.title}>Mi listado de colores</p>
          <div className={styles.row}>
            <div className={styles.color_list}>
              <ColorList1/> 
            </div>
            <div className={styles.color_actions}>
              {colorListLength !== null && 
              <React.Fragment>
                <ActionAccordion1 
                  icon={Icon.Link2} 
                  label="API Color Detecter"
                  content={APIColorAction1}
                  hiddenAccordion={colorListLength === 0}/>
                <ActionAccordion1 
                  icon={Icon.Download} 
                  label="Descargar Color Detecter"
                  content={FileColorAction1}
                  hiddenAccordion={colorListLength === 0}/>
              </React.Fragment>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

{/* <p className={styles.sentence}>
  Aun no has agregado un color.
  <Button 
    label="Volver al inicio" 
    linkTheme={true}
    onClick={()=> customRouter.push("/")}/>
</p> */}

const ConnColorListLayout = connect(
  mapStateToProps, null)(ColorListLayout);

export default (props)=> {
  const customRouter = useCustomRouter();

  return <ConnColorListLayout {...props}
    customRouter={customRouter}/>
}