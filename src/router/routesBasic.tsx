// React Router本体をインポート
import { createBrowserRouter } from "react-router-dom";

// ルーティングで使用するページをインポート
import {Top} from "../Components/pages/Top";
import  Mypage  from "../Components/pages/Mypage";
import { HeaderLayout } from "../Components/templates/Headerlayout";
import  {Quiz}  from "../Components/pages/Quiz";
import { Settings } from "../Components/pages/Settings";

// ルーティングテーブルを定義
const routesBasic = createBrowserRouter([
    {path: '/', element:<HeaderLayout><Top /></ HeaderLayout>},
    {path: '/mypage', element:<HeaderLayout><Mypage/></HeaderLayout>},
    {path: '/quiz', element:<HeaderLayout><Quiz/></HeaderLayout>},
    {path: '/settings', element:<HeaderLayout><Settings/></HeaderLayout>},
])

export default routesBasic;