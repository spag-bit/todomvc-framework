export const TODO_DATA = {
  TC_001: {
    itemText: 'Buy Groceries', 
    placeholderText: 'What needs to be done?',
    expectedCountText: '1 item left'
  },
  TC_002: {
      // Initial setup (Precondition: At least 2 tasks)
      initialTasks: ['Fix Car', 'Pet the dog'],
      // Phase 1: Edit in "All" view
      editInAll: {
        oldText: 'Fix Car',
        newText: 'Wash Car'
      },
      // Phase 2: Edit in "Active" view
      editInActive: {
        oldText: 'Pet the dog',
        newText: 'Walk the dog'
      },
      // Phase 3: Edit in "Completed" view
      editInCompleted: {
        // We will complete 'Walk the dog' first, then edit it
        oldText: 'Walk the dog', 
        newText: 'Go jogging'
      }
    },
  TC_003: { taskName: 'Submit Exam' },
  // TC_004: { itemText: 'Read Book' },
  TC_004: { initialItems: ['Task One', 'Enougn thinking','Task Three'],
            targetToDelete: 'Enougn thinking'
  },
  TC_005: { itemText: 'Tab Sync Test' },
  TC_006: { itemText: 'XPath Stability Check' },
  TC_007: { itemText: 'Persistent Task' },
  BUG_001: { itemText: 'ThisIsAnExtremelyLongWordThatShouldNormallyWrapButMightBreakTheLayoutTheLay' }
};