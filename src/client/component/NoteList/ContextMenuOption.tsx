import React, { useContext, KeyboardEventHandler, MouseEventHandler } from 'react';
import { Icon } from 'react-feather';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { MenuUtilitiesContext } from '../../container/ContextMenu';

/**
 * Comment
 */
export interface ContextMenuOptionProps {
  dataTestID: string;
  handler: MouseEventHandler & KeyboardEventHandler;
  icon: Icon;
  text: string;
  optionType?: string;
}

/**
 * Comment
 */
export const ContextMenuOption: React.FC<ContextMenuOptionProps> = ({
  dataTestID,
  handler,
  optionType,
  icon: IconCmp,
  text,
  ...rest
}) => {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { setOptionsId } = useContext(MenuUtilitiesContext);

  // ===========================================================================
  // Handler
  // ===========================================================================
  const optionHandler: MouseEventHandler & KeyboardEventHandler = (
    event: React.MouseEvent<Element, MouseEvent> & React.KeyboardEvent<Element>
  ) => {
    handler(event);
    setOptionsId('');
  };

  return (
    <div
      data-testid={dataTestID}
      className={optionType === 'delete' ? 'nav-item delete-option' : 'nav-item'}
      role="button"
      onClick={optionHandler}
      onKeyPress={optionHandler}
      tabIndex={0}
      {...rest}
    >
      <IconCmp className="nav-item-icon" size={18} />
      {text}
    </div>
  );
};
