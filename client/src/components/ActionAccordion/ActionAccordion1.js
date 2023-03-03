import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'react-feather';
import styles from './ActionAccordion1.module.scss';

class ActionAccordion1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: 0,
      hiddenContent: props.hiddenContent || false
    };
    this.ref = {
      content: React.createRef(),
      contentWrapper: React.createRef()
    };
    this.contentWrapper = null;
    this.content = null;
    this.contentRect = null;
  }

  componentDidMount = ()=> {    
    this.content = this.ref.content.current;
    this.contentRect = this.content.getBoundingClientRect();
    this.setState({contentHeight: this.contentRect.height});
  }
  
  toggleContent = ()=> {
    this.contentWrapper = this.ref.contentWrapper.current;
    this.contentWrapper.style.transition = "all 300ms";

    this.setState(({ hiddenContent })=> ({
      hiddenContent: hiddenContent ? false : true
    }));
  }

  render = ()=> {
    const { icon: Icon, label, content: Content, hiddenAccordion } = this.props;
    const { hiddenContent, contentHeight } = this.state;

    console.log(hiddenAccordion);

    const styles_action_accordion = clsx({
      [styles.action_accordion]: true,
      [styles.visible_content]: !hiddenContent,
      [styles.hidden_content]: hiddenContent,
      [styles.visible_accordion]: !hiddenAccordion,
      [styles.hidden_accordion]: hiddenAccordion,
    });

    return (
      <div className={styles_action_accordion}>
        <div className={styles.header} onClick={()=> this.toggleContent()}>
          <div className={styles.icon_wrapper}>
            {Icon && <Icon className={styles.icon}/>}
          </div>
          {label && <p className={styles.label}>{label}</p>}
          <ChevronDown className={styles.chevron_down}/>
        </div>
        <div className={styles.content_wrapper} 
          ref={this.ref.contentWrapper}
          style={{height: `${hiddenContent ? 0 : contentHeight}px`}}>
          <div className={styles.content} 
          ref={this.ref.content}><Content/></div>
        </div>
      </div>
    )
  }
}

export default ActionAccordion1;