import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PageAnimation1 from 'components/PageAnimation/PageAnimation1';
import { 
  HIDE_PAGE_ANIMATION, 
  SHOW_PAGE_ANIMATION
} from 'constants/actionTypes';

const CustomRouterContext = React.createContext({});

const CustomRouterProvider = ({children})=> {
  const router = useRouter();
  const dispatch = useDispatch();

  const hidePageAnimation = ()=> dispatch({
    type: HIDE_PAGE_ANIMATION
  });

  const showPageAnimation = ()=> dispatch({
    type: SHOW_PAGE_ANIMATION
  });

  const push = (...params)=> {    
    showPageAnimation();

    setTimeout(()=> {
      router.push(...params).then(()=> {
        hidePageAnimation();
      });
    }, 500);
  }

  const back = ()=> {
    showPageAnimation();

    setTimeout(() => {
      router.back();
    }, 300);

    setTimeout(()=> {
      hidePageAnimation();
    }, 600);
  }

  const prefetch = (...params)=> 
    router.prefetch(...params);

  return (
    <CustomRouterContext.Provider 
      value={{push, back, prefetch}}>
      <PageAnimation1/>
      {children}
    </CustomRouterContext.Provider>
  )
}

const useCustomRouter = ()=> {
  return React.useContext(CustomRouterContext);
}

export { CustomRouterProvider, useCustomRouter };