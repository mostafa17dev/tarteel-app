import { combineReducers } from "redux"

import records from "./records"
import ayahs from "./ayahs"
import demographicData from "./demographicData"
import data from "./data"
import preloadedAyahs from "./preloadedAyahs"

export default combineReducers({
  records,
  ayahs,
  demographicData,
  data,
  preloadedAyahs
})
