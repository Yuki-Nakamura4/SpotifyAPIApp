import QuizGenerator from '../organisms/QuizGenerator';

const Mypage = () => {
  return (
    <div>
      <p>マイページよ</p>
      <br />
      <div>ランダムで4人の人気アーティストを取得するテスト↓</div>
      <br />
      <QuizGenerator />
    </div>
  );
};

export default Mypage;