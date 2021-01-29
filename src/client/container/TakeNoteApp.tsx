import React, { useEffect } from 'react';
import SplitPane from 'react-split-pane';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { getSettings, getNotes, getCategories, getSync } from '../selectors/index';
import { TempStateProvider } from '../context/TempStateContext';
import {
  getWebsiteTitle,
  getActiveCategory,
  determineAppClass,
  getNoteBarConf,
} from '../utils/helper';
import { loadCategories, swapCategories } from '../slices/category';
import { loadNotes } from '../slices/note';
import { loadSettings } from '../slices/settings';
import { sync } from '../slices/sync';
import { NoteItem, CategoryItem } from '../types';
import { useInterval, useBeforeUnload } from '../utils/hook';

import { AppSidebar } from './AppSidebar';
import { NoteList } from './NoteList';
import { NoteEditor } from './NoteEditor';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { SettingsModal } from './SettingsModal';

export const TakeNoteApp: React.FC = ({}) => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { darkTheme, sidebarVisible } = useSelector(getSettings);
  const { activeFolder, activeCategoryId, notes } = useSelector(getNotes);
  const { categories } = useSelector(getCategories);
  const { pendingSync } = useSelector(getSync);

  const activeCategory = getActiveCategory(categories, activeCategoryId);
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch();
  const _loadNotes = () => dispatch(loadNotes());
  const _loadCategories = () => dispatch(loadCategories());
  const _loadSettings = () => dispatch(loadSettings());
  const _swapCategories = (categoryId: number, destinationId: number) =>
    dispatch(swapCategories({ categoryId, destinationId }));
  const _sync = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(sync({ notes, categories }));

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (result.type === 'CATEGORY') {
      _swapCategories(source.index, destination.index);
    }
  };

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    _loadNotes();
    _loadCategories();
    _loadSettings();
  }, []);

  useInterval(() => {
    _sync(notes, categories);
  }, 50000);

  useBeforeUnload((event: BeforeUnloadEvent) => (pendingSync ? event.preventDefault() : null));

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getWebsiteTitle(activeFolder, activeCategory)}</title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>
      <TempStateProvider>
        <div className={determineAppClass(darkTheme, sidebarVisible, activeFolder)}>
          <DragDropContext onDragEnd={onDragEnd}>
            <SplitPane split="vertical" minSize={150} maxSize={500} defaultSize={240}>
              <AppSidebar />
              <SplitPane split="vertical" {...getNoteBarConf(activeFolder)}>
                <NoteList />
                <NoteEditor />
              </SplitPane>
            </SplitPane>
          </DragDropContext>
          <SettingsModal />
          <KeyboardShortcuts />
        </div>
      </TempStateProvider>
    </HelmetProvider>
  );
};
