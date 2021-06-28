import { configureStore } from '@reduxjs/toolkit';
import getaction from '../redux/action';

export default configureStore({
  reducer: {
    get: getaction,
  },
});