import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./Authentication/Reducer";
import { programReducer } from "./Program/Reducer";
import { quizReducer } from "./Quiz/Reducer";
import uiReducer from "./UI/uiSlice.js";

// Using configureStore from Redux Toolkit is more modern
export const store = configureStore({
    reducer: {
        auth: authReducer,
        program: programReducer,
        quiz: quizReducer,
        ui: uiReducer,
    },
    // ✅ FIX: The middleware property is removed.
    // Redux Toolkit's configureStore automatically includes thunk and other useful middleware by default.
});

