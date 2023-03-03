import React from 'react';
import store from 'store';
import { Provider } from 'react-redux';
import { CustomRouterProvider } from 'hooks/CustomRouterContext';

import '../../public/scss/styles.scss';
import '../../public/scss/variables.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { Component, pageProps } = this.props; 

    return (
      <React.Fragment>
        <Provider store={store}>
          <CustomRouterProvider>
            <Component {...pageProps}/>
          </CustomRouterProvider>
        </Provider>
      </React.Fragment>
    )
  }
}

export default App;