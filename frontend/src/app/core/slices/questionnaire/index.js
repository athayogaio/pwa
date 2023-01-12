/* eslint no-param-reassign: 0 */
import { createSlice } from "@reduxjs/toolkit";
import postQuestionnaireSlice from "./postQuestionnaire";

const initialState = {
  questionnaire: [],
  errorMessage: null,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
});

export default questionnaireSlice.reducer;
