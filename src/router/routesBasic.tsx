// React Router本体をインポート
import { createBrowserRouter } from "react-router-dom";

// ルーティングで使用するページをインポート
import {Top} from "../Components/pages/Top";
import  Mypage  from "../Components/pages/Mypage";
import { HeaderLayout } from "../Components/templates/Headerlayout";
import { Setting } from "../Components/pages/Setting";

// ルーティングテーブルを定義
const routesBasic = createBrowserRouter([
    {path: '/', element:<HeaderLayout><Top /></ HeaderLayout>},
    {path: '/mypage', element:<HeaderLayout><Mypage/></HeaderLayout>},
    {path: '/setting', element:<HeaderLayout><Setting/></HeaderLayout>},
])

export default routesBasic;