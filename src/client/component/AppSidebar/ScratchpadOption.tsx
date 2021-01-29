import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Edit } from 'react-feather';

import { Folder } from '../../utils/enums';
import { TestID } from '../../assets/TestID';
import { LabelText } from '../../assets/LabelText';
import { iconColor } from '../../utils/constants';

export interface ScratchpadOptionProps {
  active: boolean;
  swapFolder: (folder: Folder) => {};
}

/**
 * An Component
 */
export const ScratchpadOption: React.FC<ScratchpadOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid={TestID.SCRATCHPAD}
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.SCRATCHPAD);
      }}
    >
      <Edit size={15} className="app-sidebar-icon" color={iconColor} />
      {LabelText.SCRATCHPAD}
    </div>
  );
};
