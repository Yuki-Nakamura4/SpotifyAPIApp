import React, { FC, ReactNode, memo } from 'react';
import { Header } from '../organisms/layout/Header';

type Props = {
  // ReactNodeはタグで囲った要素を渡していける
  // ReactNodeの定義は ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
  children: ReactNode;
}

export const HeaderLayout: FC<Props> = memo((props) => {
  // propsのプロパティの中からchildrenを展開
  const {children} = props;
  return (
    <>
  <Header />
  {children}
  </>
  ) 
});