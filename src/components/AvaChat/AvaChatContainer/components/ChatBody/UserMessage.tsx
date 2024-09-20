import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IBaseMessage } from '../../../../../models/IChat';
import { useEffect, useState } from 'react';

interface Props {
  message: IBaseMessage;
  editMode: boolean;
  setEditMode: (arg: boolean) => void;
  submitEdit: (arg: string) => void;
  loading: boolean;
}

export const UserMessage = ({ message, editMode, setEditMode, loading, submitEdit }: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (editMode) {
      setInput(message.message);
    }
  }, [editMode, message]);

  return (
    <div className={'flex gap-1 items-end'}>
      <span className={'flex-1'} />
      {!editMode && (
        <>
          <button className={'btn btn-ghost btn-xs p-1'} onClick={() => setEditMode(true)}>
            <PencilIcon className={'w-3'} />
          </button>
          <div
            className={`mt-[10px] max-w-[90%] whitespace-pre-wrap py-1 px-2 rounded-lg text-sm bg-primary-600 text-white rounded-tr-none`}>
            {message?.message}
          </div>
        </>
      )}

      {editMode && (
        <>
          <textarea
            rows={1}
            className={'textarea textarea-primary w-full lg:w-1/2 mr-2'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            <button
              disabled={loading}
              className={'btn btn-xs btn-circle btn-outline text-error mr-1'}
              onClick={() => setEditMode(false)}>
              <XMarkIcon className={'w-4'} />
            </button>
            <button
              disabled={loading}
              className={'btn btn-xs btn-circle btn-outline text-success'}
              onClick={() => submitEdit(input)}>
              {loading ? <div className={'loading'} /> : <CheckIcon className={'w-4'} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
