import { BsArrowsAngleContract, BsArrowsAngleExpand, BsLayoutSidebar, BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  selectIsChatExpanded,
  toggleChatExpansion,
  toggleChatOpen
} from '../../../../redux/slices/chatSlice';
import { useAppSelector } from '../../../../redux/store';

export const HeaderBar = () => {
  const dispatch = useDispatch();
  const isExpanded = useAppSelector(selectIsChatExpanded);

  return (
    <div className={'flex w-full gap-2'}>
      <button className={'btn btn-xs btn-ghost'} onClick={() => dispatch(toggleChatExpansion())}>
        {!isExpanded ? <BsArrowsAngleExpand className={''} /> : <BsArrowsAngleContract />}
      </button>
      {!isExpanded && (
        <button className={'btn btn-xs btn-ghost'}>
          <BsLayoutSidebar className={''} />
        </button>
      )}
      <span className={'flex-1'} />
      <button className={'btn btn-xs btn-ghost'} onClick={() => dispatch(toggleChatOpen())}>
        <BsX className={'text-lg'} />
      </button>
    </div>
  );
};
