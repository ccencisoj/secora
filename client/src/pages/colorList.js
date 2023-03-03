import React from 'react';
import { useRouter } from 'next/router';
import ColorListLayout from 'components/Layout/ColorListLayout';
import NotificationList2 from 'components/NotificationList/NotificationList2';

class ColorList extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <React.Fragment>
        <ColorListLayout/>
        <NotificationList2/>
      </React.Fragment>
    )
  }
}

export default (props)=>  {
  const router = useRouter();

  return <ColorList {...props}
    router={router}/>
}