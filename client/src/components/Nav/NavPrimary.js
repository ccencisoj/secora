import React from 'react';
import * as Icon from 'react-feather';
import Button from 'components/Button/Button';
import styles from './NavPrimary.module.scss';
import { useCustomRouter } from 'hooks/CustomRouterContext';

class NavPrimary extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { hiddenBackButton, customRouter } = this.props;

    return (
      <div className={styles.nav_primary}>
        <div className={styles.left_side}>
          {!hiddenBackButton && 
          <Button 
            icon={Icon.ChevronLeft} 
            lightTheme={true}
            onClick={()=> customRouter.back()}/>}
        </div>
        <div className={styles.right_side}></div>
      </div>
    )
  }
}

export default (props)=> {
  const customRouter = useCustomRouter();

  return <NavPrimary {...props}
    customRouter={customRouter}/>
}