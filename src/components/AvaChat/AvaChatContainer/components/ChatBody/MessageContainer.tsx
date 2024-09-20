import { IMessage } from '../../../../../models/IChat';
import AVA_AVATAR from '../../../../../assets/avaHeadshot.png';
import { PencilIcon } from '@heroicons/react/24/outline';

interface Props {
  messageBody: IMessage;
}

export const MessageContainer = ({ messageBody }: Props) => {
  const currentMessage = messageBody?.edits?.[messageBody.edits.length - 1];

  return (
    <>
      <div className={'flex gap-1 items-end'}>
        <span className={'flex-1'} />
        <button className={'btn btn-ghost btn-xs p-1'}>
          <PencilIcon className={'w-3'} />
        </button>
        <div
          className={`mt-[10px] max-w-[90%] whitespace-pre-wrap py-1 px-2 rounded-lg text-sm bg-primary-600 text-white rounded-tr-none`}>
          {currentMessage?.message}
        </div>
      </div>

      <div className={'flex gap-2'}>
        <img src={AVA_AVATAR} className={'rounded-full min-w-[40px] h-[40px]'} alt={'Ava'} />

        <div>
          <div
            className={`mt-[10px] max-w-[90%] whitespace-pre-wrap py-1 px-2 rounded-lg text-sm bg-gray-200`}>
            {currentMessage?.response || <div className={'loading'} />}
          </div>
          {currentMessage?.quickOptions?.length ? (
            <div className={'flex gap-1 flex-wrap py-2'}>
              {currentMessage.quickOptions.map((option, i) => (
                <button className={'btn btn-primary btn-outline btn-xs rounded-full'} key={i}>
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
