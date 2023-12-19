import { memo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = memo(() => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuOpen = () => {
      setOpenMenu(!openMenu);
    };
    const location = useLocation();
    const navigate = useNavigate();

    // 不要な再レンダリングが走らないようuseCallbackでラップ
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onClickTop = useCallback(() => navigate("/"),[]);
    const onClickMypage = useCallback(() => navigate("/mypage"),[]);
    const onClickQuiz = useCallback(() => navigate("/quiz"),[]);
    const onClickSettings = useCallback(() => navigate("/settings"),[]);

    const isTopPage = location.pathname === "/";
    const isMyPage = location.pathname === "/mypage";
    const isQuiz = location.pathname === "/quiz";
    const isSettings = location.pathname === "/settings";

  return (
    <>
    <div className="items-center bg-white h-32 w-full border-b border-slate-300">
      <div className="justify-center flex">
    <button className="mt-6 text-4xl text-center text-slate-500 font-Quicksand font-500" onClick={onClickTop} >KEY PALETTE</button>
    </div>
      <div className="mt-5 mb-4 flex justify-center space-x-8">
      <p className={`text-lg ${isTopPage ? 'text-red-400 border-b border-red-400' : 'text-slate-500'} hover:text-red-400  invisible sm:visible font-Quicksand font-600 cursor-pointer`} onClick={onClickTop}>TOP</p>
      <p className={`text-lg ${isMyPage ? 'text-red-400 border-b border-red-400' : 'text-slate-500'} hover:text-red-400  invisible sm:visible font-Quicksand font-600 cursor-pointer`} onClick={onClickMypage}>MY PAGE</p>
      <p className={`text-lg ${isQuiz ? 'text-red-400 border-b border-red-400' : 'text-slate-500'} hover:text-red-400  invisible sm:visible font-Quicksand font-600 cursor-pointer`} onClick={onClickQuiz}>QUIZ</p>
      <p className={`text-lg ${isSettings ? 'text-red-400 border-b border-red-400' : 'text-slate-500'} hover:text-red-400  invisible sm:visible font-Quicksand font-600 cursor-pointer`} onClick={onClickSettings}>SETTINGS</p>
      </div>
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
    </>
  );
});