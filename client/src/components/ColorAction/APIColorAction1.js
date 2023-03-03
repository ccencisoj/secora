import React from 'react';
import Button from 'components/Button/Button';
import styles from './APIColorAction1.module.scss';
import CopyField1 from 'components/CopyField/CopyField1';
import agent from 'agent';

class APIColorAction1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiURL: null};
  }

  componentDidMount = ()=> {
    agent.Color.getAPIData().then((response)=> {
      const apiURL = response.data.apiData.url;
      this.setState({apiURL});
    });
  }

  render = ()=> {
    const { apiURL } = this.state;

    return (
      <div className={styles.api_color_action}>
        <CopyField1 value={apiURL}/>
        <Button label="Ver documentacion" linkTheme={true}/>
      </div>
    )
  }
}

export default APIColorAction1;