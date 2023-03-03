import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import Button from 'components/Button/Button';
import styles from './FileColorAction1.module.scss';
import LanguageList1 from 'components/LanguageList/LanguageList1';

const mapStateToProps = (store)=> ({
  selectedLanguage: store.colorAction.selectedLanguage
});

class FileColorAction1 extends React.Component {
  constructor(props) {
    super(props);
  }

  download = ()=> {
    const { selectedLanguage } = this.props;
    const extname = selectedLanguage.extname.slice(1);
    const a = document.createElement("a");
    a.href = agent.Color.getFileURL(extname);
    a.click();
  }

  render = ()=> {
    const { selectedLanguage } = this.props;
    const extname = selectedLanguage ? selectedLanguage.extname : "";

    return (
      <div className={styles.file_color_action}>
        <LanguageList1/>
        <Button 
          label={`Descargar ${extname}`} 
          secondary={true}
          onClick={this.download}/>
      </div>
    )
  }
}

const ConnFileColorAction1 = connect(
  mapStateToProps, null)(FileColorAction1);

export default ConnFileColorAction1;