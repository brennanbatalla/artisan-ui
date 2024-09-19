import Ava_Headshot from '../../../../../assets/avaHeadshot.png';

export const WelcomeHeader = () => {
  return (
    <div className={'flex flex-col items-center justify-center gap-1 mt-8'}>
      <img className={'rounded-full'} src={Ava_Headshot} width={50} alt={'Ava loading...'} />
      <h3 className={'text-lg font-bold'}>Hey 👋, I'm Ava!</h3>
      <p className={'text-sm text-gray-600'}>Ask me anything or pick a place to start</p>
    </div>
  );
};
