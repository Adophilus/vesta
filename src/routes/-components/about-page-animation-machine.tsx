import { createMachine } from 'xstate';

const feedbackMachine = createMachine({
  states: {
    HERO: {
      on: {
        next: {
          target: 'SHORT_DESCRIPTION'
        }
      },
    },
    SHORT_DESCRIPTION: {
      on: {
        next: {
          target: ''
        }
      }
    }
  }
});


