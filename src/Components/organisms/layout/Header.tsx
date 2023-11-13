import { memo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Header = memo(() => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuOpen = () => {
      setOpenMenu(!openMenu);
    };
    const navigate = useNavigate();

    // 不要な再レンダリングが走らないようuseCallbackでラップ
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onClickTop = useCallback(() => navigate("/"),[]);
    const onClickMypage = useCallback(() => navigate("/mypage"),[]);
    const onClickSetting = useCallback(() => navigate("/setting"),[]);

  return (
    <>
    <div className="flex items-center bg-cyan-700 h-14 w-full">
      <button className="ml-5 text-2xl text-white font-Quicksand font-500" onClick={onClickTop} >タイトル</button>
      <p className="text-base text-white hover:text-sky-100 ml-auto mr-5 invisible sm:visible font-Quicksand font-600 cursor-pointer" onClick={onClickMypage}>MY PAGE</p>
      <p className="text-base text-white mr-5 invisible sm:visible font-Quicksand">/</p> 
      <p className="text-base text-white hover:text-sky-100 mr-5 invisible sm:visible font-Quicksand font-600 cursor-pointer" onClick={onClickSetting}>SETTING</p>
      <FontAwesomeIcon size="lg" icon={faBars} style={{color: "#ffffff",}} className="mr-5 sm:hidden" onClick={handleMenuOpen}/>
      <nav className={
              openMenu
                ? 'text-left fixed bg-slate-100 left-0 top-0 w-7/12 h-screen flex flex-col justify-start pt-8 px-3 transition ease-linear duration-200 sm:hidden'
                : 'fixed left-[-100%] transition ease-linear duration-200'
      }>
          <ul className="mt-6">
            <button className="pl-2 py-4 w-full text-left hover:bg-slate-200">TOP</button>
            <br />
            <button className="pl-2 py-4 w-full text-left hover:bg-slate-200">マイページ</button>
            <br />
            <button className="pl-2 py-4 w-full text-left hover:bg-slate-200">設定</button>
          </ul>
      </nav>
    </div>
    {/* <div className="flex items-center bg-white h-7 w-full"></div> */}
    </>
  );
});