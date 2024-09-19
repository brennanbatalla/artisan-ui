import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  error: any;
  resetErrorBoundary: any;
};

export const ErrorBoundaryPage = ({ error, resetErrorBoundary }: Props) => {
  const navigate = useNavigate();

  const handleNav = () => {
    resetErrorBoundary();
    navigate('/', {});
  };

  useEffect(() => {
    // TODO - report error
    console.error(error);
  }, []);

  return (
    <div className={'flex flex-col items-center justify-center h-full w-full'}>
      <h1 className={'text-xl sm:text-3xl text-center translate-y-[-50%] text-gray-800'}>
        Mission Control, we have a problem.
        <br />
        <br />
        {/*<SentimentVeryDissatisfiedOutlined fontSize={'inherit'} className={'text-[10rem]'} />*/}
        <br />
        <br />
        If the issue continues, please contact us.
      </h1>

      <button onClick={handleNav}>To Safety</button>
    </div>
  );
};
