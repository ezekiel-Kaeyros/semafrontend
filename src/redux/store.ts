import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/auth-slice';
import ChatBotSlice from './features/chat-bot-slice';
import BulkMessageSlice from './features/bulk-message-slice';
import TombolaServiceSlice from './features/tombola-slice';
import ModalReducer from './features/modal-slice';
import PricingReducer from './features/pricing';
import { stepReducer } from './features/loyaltyProgram';
import setObject from './features/qrCodeSlice';
import senarioCreateReducer from './features/senarioCreate-slice';
import setScenarioObject from './features/filter-actions';
import selectDetailValue from './features/modal-slice';
// import pointOfSaleViewReducer from './features/create-point-of-sale-slice';
// import ChannelClusterReducer from './features/channel-cluster-slice';
// import ActivityReducer from './features/activities-slice';

export const store = configureStore({
  reducer: {
    AuthReducer,
    ChatBotSlice,
    BulkMessageSlice,
    ModalReducer,
    PricingReducer,
    TombolaServiceSlice,
    stepReducer,
    setObject,
    senarioCreateReducer,
    setScenarioObject,
    selectDetailValue,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
