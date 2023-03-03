import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './PageAnimation1.module.scss';

const mapStateToProps = (store)=> ({
  hiddenPageAnimation: store.common.hiddenPageAnimation
});

class PageAnimation1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { hiddenPageAnimation } = this.props;

    const styles_page_animation = clsx({
      [styles.page_animation]: true,
      [styles.visible_page_animation]: !hiddenPageAnimation,
      [styles.hidden_page_animation]: hiddenPageAnimation
    });

    return (
      <div className={styles_page_animation}>
        <div className={styles.figure} style={{"--i": 0}}></div>
        <div className={styles.figure} style={{"--i": 1}}></div>
        <div className={styles.figure} style={{"--i": 2}}></div>
        <div className={styles.figure} style={{"--i": 3}}></div>
        <div className={styles.figure} style={{"--i": 4}}></div>
        <div className={styles.figure} style={{"--i": 5}}></div>
      </div>
    )
  }
}

const ConnPageAnimation1 = connect(
  mapStateToProps, null)(PageAnimation1);

export default ConnPageAnimation1;