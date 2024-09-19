import { IMessage } from '../../../../../models/IMessage';
import AVA_AVATAR from '../../../../../assets/avaHeadshot.png';

interface Props {
  messageBody: IMessage;
}

export const MessageContainer = ({ messageBody }: Props) => {
  return (
    <div className={'flex gap-2'}>
      {messageBody.role === 'AI' ? (
        <img
          src={AVA_AVATAR}
          className={'rounded-full min-w-[40px] h-[40px]'}
          alt={messageBody.role}
        />
      ) : (
        <span className={'flex-1'} />
      )}
      <div>
        <div
          className={`mt-[10px] max-w-[90%] whitespace-pre-wrap py-1 px-2 rounded-lg text-sm ${
            messageBody.role === 'User'
              ? 'bg-primary-600 text-white rounded-tr-none'
              : 'bg-gray-200'
          }`}>
          {messageBody.message}
        </div>
        {messageBody.role === 'AI' && messageBody.quickOptions.length ? (
          <div className={'flex gap-1 flex-wrap py-2'}>
            {messageBody.quickOptions.map((option, i) => (
              <button className={'btn btn-primary btn-outline btn-xs rounded-full'} key={i}>
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
