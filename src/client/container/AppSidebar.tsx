/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Plus } from 'react-feather';

import { getSettings, getNotes } from '../selectors/index';
import { NoteItem } from '../types/index';
import { Folder, NotesSortKey } from '../utils/enums';
import { TestID } from '../assets/TestID';
import { LabelText } from '../assets/LabelText';
import {
  addNote,
  swapFolder,
  updateActiveNote,
  assignFavoriteToNotes,
  assignTrashToNotes,
  updateSelectedNotes,
  unassignTrashFromNotes,
} from '../slices/note';
import { toggleSettingsModal, togglePreviewMarkdown } from '../slices/settings';
import { newNoteHandlerHelper, getActiveNote } from '../utils/helper';
import { ActionButton } from '../component/AppSidebar/ActionButton';
import { ScratchpadOption } from '../component/AppSidebar/ScratchpadOption';
import { FolderOption } from '../component/AppSidebar/FolderOption';
import { CategoryList } from './CategoryList';

export const AppSidebar: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes);
  const { previewMarkdown, notesSortKey } = useSelector(getSettings);

  const activeNote = getActiveNote(notes, activeNoteId);
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch();

  const _addNote = (note: NoteItem) => dispatch(addNote(note));
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }));
  const _updateSelectedNotes = (noteId: string, multiSelect: boolean) =>
    dispatch(updateSelectedNotes({ noteId, multiSelect }));
  const _swapFolder = (sortOrderKey: NotesSortKey) => (folder: Folder) =>
    dispatch(swapFolder({ folder, sortOrderKey }));
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal());
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown());
  const _assignTrashToNotes = (noteId: string) => dispatch(assignTrashToNotes(noteId));
  const _unassignTrashFromNotes = (noteId: string) => dispatch(unassignTrashFromNotes(noteId));
  const _assignFavoriteToNotes = (noteId: string) => dispatch(assignFavoriteToNotes(noteId));

  // ===========================================================================
  // Handlers
  // ===========================================================================
  const swapFolderHandler = _swapFolder(notesSortKey);

  const newNoteHandler = () =>
    newNoteHandlerHelper(
      activeFolder,
      previewMarkdown,
      activeNote,
      activeCategoryId,
      swapFolderHandler,
      _togglePreviewMarkdown,
      _addNote,
      _updateActiveNote,
      _updateSelectedNotes
    );

  return (
    <aside className="app-sidebar">
      <ActionButton
        dataTestID={TestID.ACTION_BUTTON}
        handler={newNoteHandler}
        icon={Plus}
        label={LabelText.CREATE_NEW_NOTE}
        text={LabelText.NEW_NOTE}
      ></ActionButton>
      <section className="app-sidebar-main">
        <ScratchpadOption
          active={activeFolder === Folder.SCRATCHPAD}
          swapFolder={swapFolderHandler}
        />
        <FolderOption
          active={activeFolder === Folder.ALL}
          swapFolder={swapFolderHandler}
          text={LabelText.NOTES}
          dataTestID={TestID.FOLDER_NOTES}
          folder={Folder.ALL}
          addNoteType={_unassignTrashFromNotes}
        />
        <FolderOption
          active={activeFolder === Folder.FAVORITES}
          text={LabelText.FAVORITES}
          dataTestID={TestID.FOLDER_FAVORITES}
          folder={Folder.FAVORITES}
          swapFolder={swapFolderHandler}
          addNoteType={_assignFavoriteToNotes}
        />
        <FolderOption
          active={activeFolder === Folder.TRASH}
          text={LabelText.TRASH}
          dataTestID={TestID.FOLDER_TRASH}
          folder={Folder.TRASH}
          swapFolder={swapFolderHandler}
          addNoteType={_assignTrashToNotes}
        />
        <CategoryList />
      </section>
    </aside>
  );
};
