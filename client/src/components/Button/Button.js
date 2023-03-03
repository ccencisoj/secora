import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      type,
      label, 
      icon: Icon, 
      secondary, 
      blackTheme,
      lightTheme, 
      linkTheme,
      redLinkTheme,
      onClick,
      onHover
    } = this.props;

    const styles_button = clsx({
      [styles.button]: true,
      [styles.secondary]: secondary,
      [styles.icon_button]: Icon,
      [styles.black_theme]: blackTheme,
      [styles.light_theme]: lightTheme,
      [styles.link_theme]: linkTheme,
      [styles.red_link_theme]: redLinkTheme
    });

    return (
      <button type={type || "button"} 
        className={styles_button} 
        onClick={onClick} onMouseMove={onHover}>
        {Icon && <Icon className={styles.icon}/>}
        {label && <p className={styles.label}>{label}</p>}
      </button>
    )
  }
}

export default Button;