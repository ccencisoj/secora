import React from 'react';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import styles from './LanguageList1.module.scss';
import RadioButton1 from 'components/RadioButton/RadioButton1';
import { SET_SELECTED_LANGUAGE } from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  selectedLanguage: store.colorAction.selectedLanguage
}); 

const mapActionsToProps = (dispatch)=> ({
  setSelectedLanguage: (language)=> dispatch({
    type: SET_SELECTED_LANGUAGE,
    payload: {language}
  })
});

class LanguageList1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programmingLanguages: [
        {
          id: nanoid(),
          image: "/image/javascript_icon.svg", 
          name: "Javascript",
          extname: ".js"
        },
        {
          id: nanoid(),
          image: "/image/python_icon.svg", 
          name: "Python",
          extname: ".py"
        },
        {
          id: nanoid(),
          image: "/image/c_icon.svg", 
          name: "C",
          extname: ".c"
        },
        {
          id: nanoid(),
          image: "/image/cpp_icon.svg", 
          name: "C++",
          extname: ".cpp"
        },
        {
          id: nanoid(),
          image: "/image/java_icon.svg",
          name: "Java",
          extname: ".java"
        },
      ]
    };
  }

  componentDidMount = ()=> {
    const { setSelectedLanguage } = this.props;
    setSelectedLanguage(this.state.programmingLanguages[0]);
  }

  render = ()=> {
    const { selectedLanguage, setSelectedLanguage } = this.props;
    const { programmingLanguages } = this.state;

    return (
      <div className={styles.language_list}>
        {programmingLanguages.map((language)=> (
          <RadioButton1 
            key={language.id}
            image={language.image}
            label={language.name}
            actived={selectedLanguage && 
              language.id === selectedLanguage.id}
            onClick={()=> setSelectedLanguage(language)}/>
        ))}
      </div>
    )
  }
}

const ConnLanguageList1 = connect(
  mapStateToProps, mapActionsToProps)(LanguageList1);

export default ConnLanguageList1;