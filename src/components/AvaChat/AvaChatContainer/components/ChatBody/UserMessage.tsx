import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IBaseMessage } from '../../../../../models/IChat';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../redux/store';
import { removeMessage } from '../../../../../redux/slices/chatSlice';

interface Props {
  message: IBaseMessage;
  editMode: boolean;
  setEditMode: (arg: boolean) => void;
  submitEdit: (arg: string) => void;
  loading: boolean;
  chatId: string;
  messageId: string;
}

export const UserMessage = ({
  message,
  editMode,
  setEditMode,
  loading,
  submitEdit,
  chatId,
  messageId
}: Props) => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await dispatch(removeMessage({ chatId, messageId })).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

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
          <button
            disabled={deleting}
            className={'btn btn-ghost btn-xs p-1 text-error'}
            onClick={() => handleDelete()}>
            <TrashIcon className={'w-3'} />
          </button>
          <button
            disabled={deleting}
            className={'btn btn-ghost btn-xs p-1'}
            onClick={() => setEditMode(true)}>
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
