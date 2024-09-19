import { BsArrowsAngleExpand, BsLayoutSidebar, BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toggleChatOpen } from '../../../../redux/slices/chatSlice';

export const HeaderBar = () => {
  const dispatch = useDispatch();

  return (
    <div className={'flex w-full gap-2'}>
      <button className={'btn btn-xs btn-ghost'}>
        <BsArrowsAngleExpand className={''} />
      </button>
      <button className={'btn btn-xs btn-ghost'}>
        <BsLayoutSidebar className={''} />
      </button>
      <span className={'flex-1'} />
      <button className={'btn btn-xs btn-ghost'} onClick={() => dispatch(toggleChatOpen())}>
        <BsX className={'text-lg'} />
      </button>
    </div>
  );
};
