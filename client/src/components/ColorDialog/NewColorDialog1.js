import React from 'react';
import clsx from 'clsx';
import agent from 'agent';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import styles from './NewColorDialog1.module.scss';
import { useCustomRouter } from 'hooks/CustomRouterContext';
import { 
  ADD_COLOR,
  ADD_COLOR_NOTIFICATION,
  HIDDEN_NEW_COLOR_DIALOG
} from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  hiddenNewColorDialog: store.colorPanel.hiddenNewColorDialog,
  colorRange: store.common.colorRange
});

const mapActionsToProps = (dispatch)=> ({
  hideNewColorDialog: ()=> dispatch({
    type: HIDDEN_NEW_COLOR_DIALOG
  }),
  addColor: (color)=> dispatch({
    type: ADD_COLOR,
    payload: {
      color: color
    }
  }),
  addColorNotification: (colorNotification)=> dispatch({
    type: ADD_COLOR_NOTIFICATION,
    payload: {
      colorNotification: colorNotification
    }
  })
});

class NewColorDialog1 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values, { resetForm, setErrors })=> {    
    const { colorRange, addColor, addColorNotification } = this.props;
    const colorName = values.name.toUpperCase();

    if(colorName.length === 0) return;
    
    agent.Color.save({
      name: colorName,
      range: colorRange
    }).then((response)=> {
      const color = response.data.color;
      
      addColorNotification({
        id: color.id,
        label: "Se ha agregado el color",
        value: color.name
      });
      resetForm();
    })
    .catch((error)=> {
      setErrors({name: error.response.data.message});
    });
  }

  render = ()=> {
    const { 
      customRouter,
      hideNewColorDialog, 
      hiddenNewColorDialog
    } = this.props;

    const styles_new_color_dialog = clsx({
      [styles.new_color_dialog]: true,
      [styles.visible]: !hiddenNewColorDialog,
      [styles.hidden]: hiddenNewColorDialog
    });

    return (
      <div className={styles_new_color_dialog}>
        <div className={styles.header}>
          <Button 
            icon={Icon.X} 
            blackTheme={true}
            onClick={()=> hideNewColorDialog()}/>
        </div>
        <Formik 
          initialValues={{name: ""}}
          onSubmit={this.handleSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          })=> (
            <form className={styles.form} 
              onSubmit={handleSubmit}>
              <div className={styles.main}>
                <p className={styles.title}>
                  Agregar a mi listado el rango de colores
                </p>
                <Field 
                  name="name"
                  value={values.name}
                  error={errors.name}
                  placeholder="Nombre del color" 
                  uppercase={true}
                  onBlur={handleBlur}
                  onChange={handleChange}/>
              </div>
              <div className={styles.footer}>
                <Button 
                  type="submit"
                  label="Agregar Color"
                  primary={true}/>
                <Button 
                  label="Mi listado de colores"
                  secondary={true}
                  onClick={()=> {
                    customRouter.push("/colorList");
                    hideNewColorDialog();
                  }}
                  onHover={()=> customRouter.prefetch("/colorList")}/>
              </div>
            </form>
            )}
        </Formik>
      </div>
    )
  }
}

const ConnNewColorDialog1 = connect(
  mapStateToProps, mapActionsToProps)(NewColorDialog1);

export default (props)=> {
  const customRouter = useCustomRouter();

  return <ConnNewColorDialog1 {...props} 
    customRouter={customRouter}/>
}