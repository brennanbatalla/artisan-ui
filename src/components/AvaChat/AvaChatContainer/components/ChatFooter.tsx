import { useState } from 'react';
import USER_AVATAR from '../../../../assets/myHeadshot.png';

export const ChatFooter = () => {
  const contextOptions = ['Onboarding', 'Referral'];
  const [input, setInput] = useState('');
  const [context, setContext] = useState(contextOptions[0]);

  return (
    <div className={'border-t pt-4 flex flex-col gap-4'}>
      <div className={'flex gap-4'}>
        <img src={USER_AVATAR} alt="avatar" width={40} className={'rounded-full'} />
        <input
          placeholder={'Your question here'}
          className={'outline-0 w-full placeholder:text-gray-500'}
          src={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className={'flex gap-4'}>
        <p className={' text-gray-600'}>Context:</p>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className={'outline-0 bg-gray-50'}>
          {contextOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
