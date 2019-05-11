/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./helper/date.helper.js":
/*!*******************************!*\
  !*** ./helper/date.helper.js ***!
  \*******************************/
/*! exports provided: formattedDate, getYesterday, getSixDaysAgo, getStartDayOfWeek, getStartDayOfMonth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formattedDate\", function() { return formattedDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getYesterday\", function() { return getYesterday; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSixDaysAgo\", function() { return getSixDaysAgo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStartDayOfWeek\", function() { return getStartDayOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStartDayOfMonth\", function() { return getStartDayOfMonth; });\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_0__);\n// modules\n\nconst formattedDate = date => Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"format\"])(date, \"YYYY-MM-DD\");\nconst getYesterday = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"subDays\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"startOfDay\"])(date), 1));\nconst getSixDaysAgo = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"subDays\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"startOfDay\"])(date), 6));\nconst getStartDayOfWeek = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"subDays\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"startOfWeek\"])(date), 1));\nconst getStartDayOfMonth = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__[\"startOfMonth\"])(date));\n\n//# sourceURL=webpack:///./helper/date.helper.js?");

/***/ }),

/***/ "./helper/query.helper.js":
/*!********************************!*\
  !*** ./helper/query.helper.js ***!
  \********************************/
/*! exports provided: sumLogs, defaultQueryGenerator, queryGenerator, modifiedQuery, getJSON, getBarChartData, getLeaderboardData, checkInProgress, getRunningTimeId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumLogs\", function() { return sumLogs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultQueryGenerator\", function() { return defaultQueryGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryGenerator\", function() { return queryGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"modifiedQuery\", function() { return modifiedQuery; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJSON\", function() { return getJSON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBarChartData\", function() { return getBarChartData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLeaderboardData\", function() { return getLeaderboardData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkInProgress\", function() { return checkInProgress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRunningTimeId\", function() { return getRunningTimeId; });\n/* harmony import */ var json2csv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! json2csv */ \"json2csv\");\n/* harmony import */ var json2csv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json2csv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_2__);\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// modules\n\n\n\n\nconst sumTimes = times => ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"]((acc, time) => time.end === \"running\" ? acc + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInSeconds\"])(new Date(), time.start) : acc + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInSeconds\"])(time.end, time.start), 0)(times);\n\nconst sumLogs = logs => ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"]((acc, log) => acc + sumTimes(log.times), 0)(logs);\nconst defaultQueryGenerator = ({\n  wis,\n  userId\n}) => ({\n  wis,\n  userId\n});\nconst queryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId,\n  $and: [{\n    date: {\n      $gte: query.startDate\n    }\n  }, {\n    date: {\n      $lte: query.endDate\n    }\n  }]\n});\n\nconst formattedTags = tags => ramda__WEBPACK_IMPORTED_MODULE_1__[\"slice\"](1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n\nconst modifiedQuery = query => {\n  if (!query.selectedTags) {\n    return _objectSpread({}, queryGenerator(query));\n  } else if (Array.isArray(query.selectedTags)) {\n    return _objectSpread({}, queryGenerator(query), {\n      tags: {\n        $in: query.selectedTags\n      }\n    });\n  }\n\n  return _objectSpread({}, queryGenerator(query), {\n    tags: query.selectedTags\n  });\n};\nconst getJSON = logs => {\n  let formattedData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"dissoc\"](\"times\", ramda__WEBPACK_IMPORTED_MODULE_1__[\"assoc\"](\"duration\", formattedSeconds(sumTimes(log.times), \"Home\"), log)), logs);\n  const tagsLens = ramda__WEBPACK_IMPORTED_MODULE_1__[\"lensProp\"](\"tags\");\n  formattedData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"set\"](tagsLens, formattedTags(log.tags), log), formattedData);\n  const fields = [\"title\", \"tags\", \"duration\", \"date\"];\n  return json2csv__WEBPACK_IMPORTED_MODULE_0___default()({\n    data: formattedData,\n    fields\n  });\n};\nconst getBarChartData = (logs, query) => {\n  let dates = Array(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInDays\"])(new Date(query.endDate), new Date(query.startDate)) + 1).fill(query.startDate);\n  dates = dates.map((date, index) => Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"addDays\"])(new Date(date), index), \"YYYY-MM-DD\"));\n  return ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](date => ({\n    name: date,\n    duration: Math.floor(sumLogs(ramda__WEBPACK_IMPORTED_MODULE_1__[\"filter\"](log => log.date === date, logs)) / 60)\n  }), dates);\n};\nconst getLeaderboardData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](logs => ({\n  userId: logs[0].userId,\n  score: Math.floor(sumLogs(logs) / 60),\n  workInProgress: checkInProgress(logs)\n})), ramda__WEBPACK_IMPORTED_MODULE_1__[\"values\"], ramda__WEBPACK_IMPORTED_MODULE_1__[\"groupBy\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"](\"userId\")));\nconst checkInProgress = ramda__WEBPACK_IMPORTED_MODULE_1__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"or\"], false), ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"findIndex\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"propEq\"](\"end\", \"running\"))(log.times) !== -1), ramda__WEBPACK_IMPORTED_MODULE_1__[\"filter\"](log => log.date === Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(new Date(), \"YYYY-MM-DD\")));\nconst getRunningTimeId = times => ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"]((acc, item) => item.end === \"running\" ? acc = item._id : acc, \"\", times); // export const getAnalysisData = (logs, userId) => R.compose(\n// )(logs)\n// const data = [\n//   {\n//     \"name\": \"Sat\",\n//     \"userMean\": 4000,\n//     \"wisMean\": 2400,\n//   },\n//   {\n//     \"name\": \"Sun\",\n//     \"userMean\": 3000,\n//     \"wisMean\": 1398,\n//   },\n//   {\n//     \"name\": \"Mon\",\n//     \"userMean\": 2000,\n//     \"wisMean\": 9800,\n//   },\n// ]\n\n//# sourceURL=webpack:///./helper/query.helper.js?");

/***/ }),

/***/ "./helper/time.helper.js":
/*!*******************************!*\
  !*** ./helper/time.helper.js ***!
  \*******************************/
/*! exports provided: formattedSeconds, formatTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formattedSeconds\", function() { return formattedSeconds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatTime\", function() { return formatTime; });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);\n// modules\n\n\nconst formattedSeconds = (seconds, pageName) => {\n  if (pageName === \"Home\") {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n  }\n\n  if (Math.floor(seconds / 3600) === 0) {\n    return `Total: ${Math.floor(seconds / 60)}m`;\n  }\n\n  return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n};\nconst formatTime = time => Object(date_fns__WEBPACK_IMPORTED_MODULE_1__[\"setHours\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_1__[\"setMinutes\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_1__[\"setSeconds\"])(new Date(), ramda__WEBPACK_IMPORTED_MODULE_0__[\"slice\"](6, 8, time)), ramda__WEBPACK_IMPORTED_MODULE_0__[\"slice\"](3, 5, time)), ramda__WEBPACK_IMPORTED_MODULE_0__[\"slice\"](0, 2, time));\n\n//# sourceURL=webpack:///./helper/time.helper.js?");

/***/ }),

/***/ "./logic/components/log/db.js":
/*!************************************!*\
  !*** ./logic/components/log/db.js ***!
  \************************************/
/*! exports provided: fetchLogs, saveLog, deleteLog, saveTime, updateLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchLogs\", function() { return fetchLogs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveLog\", function() { return saveLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteLog\", function() { return deleteLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTime\", function() { return saveTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateLog\", function() { return updateLog; });\n/* harmony import */ var _models_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/log */ \"./models/log.js\");\n// models\n\nconst fetchLogs = async query => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  created_at: -1\n}).exec();\nconst saveLog = async log => new _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"](log).save();\nconst deleteLog = async query => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].remove(query).exec();\nconst saveTime = async (query, updateObject) => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOneAndUpdate(query, updateObject, {\n  new: true\n}).select(\"times\").exec();\nconst updateLog = async (query, updateObject) => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/log/db.js?");

/***/ }),

/***/ "./logic/components/log/route.js":
/*!***************************************!*\
  !*** ./logic/components/log/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"./logic/components/log/db.js\");\n/* harmony import */ var _helper_query_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helper/query.helper */ \"./helper/query.helper.js\");\n/* harmony import */ var _helper_date_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helper/date.helper */ \"./helper/date.helper.js\");\n/* harmony import */ var _helper_time_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helper/time.helper */ \"./helper/time.helper.js\");\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// modules\n\n // components\n\n // db helpers\n\n // helpers\n\n\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/fetchLogs\", ({\n  query: {\n    wis,\n    userId,\n    date\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])({\n  wis,\n  userId,\n  date\n}).then(logs => res.json(ramda__WEBPACK_IMPORTED_MODULE_1__[\"reverse\"](logs))).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveLog\", (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(_objectSpread({}, req.body, {\n  created_at: new Date()\n})).then(log => res.send(log)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveCustomLog\", (_ref, res) => {\n  let {\n    body: {\n      start,\n      end\n    }\n  } = _ref,\n      other = _objectWithoutProperties(_ref.body, [\"start\", \"end\"]);\n\n  return Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(_objectSpread({}, other, {\n    created_at: new Date(),\n    times: [{\n      start: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formatTime\"])(start),\n      end: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formatTime\"])(end)\n    }]\n  })).then(log => res.send(log)).catch(logger);\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/insertLogToNextDay\", (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(_objectSpread({}, req.body, {\n  created_at: new Date()\n})).then(log => res.send(log)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/deleteLog\", ({\n  query\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"deleteLog\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(query._id)\n}).then(() => res.send(query)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveStartTime\", ({\n  body\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveTime\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body._id)\n}, {\n  $push: {\n    times: {\n      start: new Date(),\n      end: \"running\"\n    }\n  }\n}).then(({\n  times\n}) => {\n  res.send(_objectSpread({}, body, {\n    start: new Date(),\n    runningTimeId: Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"getRunningTimeId\"])(times)\n  }));\n}).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveEndTime\", ({\n  body\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveTime\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body.runningId),\n  \"times.end\": \"running\"\n}, {\n  $set: {\n    \"times.$.end\": body.end || new Date()\n  }\n}).then(() => res.send(_objectSpread({}, body, {\n  end: body.end || new Date()\n}))).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/fetchTotalDurations\", ({\n  query\n}, res) => Promise.all([Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), {\n  date: query.today\n})), Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), {\n  $and: [{\n    date: {\n      $gte: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_5__[\"getStartDayOfWeek\"])(query.today)\n    }\n  }, {\n    date: {\n      $lte: query.today\n    }\n  }]\n})), Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), {\n  $and: [{\n    date: {\n      $gte: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_5__[\"getStartDayOfMonth\"])(query.today)\n    }\n  }, {\n    date: {\n      $lte: query.today\n    }\n  }]\n}))]).then(success => res.json({\n  today: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[0]), \"Home\"),\n  thisWeek: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[1]), \"Home\"),\n  thisMonth: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[2]), \"Home\")\n})).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/calculateTotalDuration\", (req, res) => {\n  const query = Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"modifiedQuery\"])(req.query);\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(query, \"Report\").then(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"]).then(sum => Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_6__[\"formattedSeconds\"])(sum, \"Report\")).then(totalDuration => res.json(totalDuration)).catch(logger);\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/convertJSONToCSV\", (req, res) => {\n  const query = Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"modifiedQuery\"])(req.query);\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(query).then(logs => Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"getJSON\"])(logs)).then(csv => {\n    res.setHeader(\"Content-disposition\", \"attachment; filename=data.csv\");\n    res.set(\"Content-Type\", \"text/csv\");\n    res.status(200).send(csv);\n  }).catch(logger);\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/barChartData\", ({\n  query\n}, res) => {\n  const newQuery = {\n    wis: query.wis,\n    userId: query.userId,\n    $and: [{\n      date: {\n        $gte: query.startDate\n      }\n    }, {\n      date: {\n        $lte: query.endDate\n      }\n    }]\n  };\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(newQuery).then(logs => res.send(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"getBarChartData\"])(logs, query))).catch(logger);\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/leaderboardData\", ({\n  query\n}, res) => {\n  const newQuery = {\n    wis: query.wis,\n    $and: [{\n      date: {\n        $gte: query.startDate\n      }\n    }, {\n      date: {\n        $lte: query.endDate\n      }\n    }]\n  };\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(newQuery).then(logs => res.send(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_4__[\"getLeaderboardData\"])(logs))).catch(logger);\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/getAnalysisData\", ({\n  query: {\n    wis,\n    userId\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])({\n  wis\n}).then(logs => res.send(getAnalysisData(logs, userId))).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/updateLog\", ({\n  body,\n  body: {\n    _id\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"updateLog\"])({\n  _id\n}, body).then(log => res.send(log)).catch(logger));\n\n//# sourceURL=webpack:///./logic/components/log/route.js?");

/***/ }),

/***/ "./logic/components/pin/db.js":
/*!************************************!*\
  !*** ./logic/components/pin/db.js ***!
  \************************************/
/*! exports provided: fetchPins, savePin, deletePin, updatePins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPins\", function() { return fetchPins; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"savePin\", function() { return savePin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deletePin\", function() { return deletePin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updatePins\", function() { return updatePins; });\n/* harmony import */ var _models_pin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/pin */ \"./models/pin.js\");\n// models\n\nconst fetchPins = async query => _models_pin__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  created_at: -1\n}).exec();\nconst savePin = async pin => new _models_pin__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pin).save();\nconst deletePin = async query => _models_pin__WEBPACK_IMPORTED_MODULE_0__[\"default\"].remove(query).exec();\nconst updatePins = async (query, updateObject) => _models_pin__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateMany(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/pin/db.js?");

/***/ }),

/***/ "./logic/components/tag/db.js":
/*!************************************!*\
  !*** ./logic/components/tag/db.js ***!
  \************************************/
/*! exports provided: fetchTags, countTags, saveTag, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTags\", function() { return countTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTag\", function() { return saveTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTag\", function() { return updateTag; });\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  number: -1\n}).limit(10).exec();\nconst countTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\nconst saveTag = async tag => new _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag).save();\nconst updateTag = async (query, updateObject) => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n // components\n\n // db helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/fetchTags', ({\n  query: {\n    wis,\n    userId\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({\n  wis,\n  userId\n}).then(logs => res.json(logs)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/searchTags', ({\n  query: {\n    wis,\n    userId,\n    label\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({\n  wis,\n  userId,\n  label: {\n    $regex: `.*${label}.*`\n  }\n}).then(tags => res.json(tags)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/saveTags', ({\n  body: {\n    wis,\n    userId,\n    tags\n  }\n}, res) => {\n  const addOrUpdateTag = tag => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"countTags\"])({\n    wis,\n    userId,\n    label: tag\n  }).then(number => number === 0 ? Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTag\"])({\n    label: tag,\n    number: 1,\n    userId,\n    wis\n  }) : Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTag\"])({\n    label: tag\n  }, {\n    $inc: {\n      number: 1\n    }\n  }));\n\n  ramda__WEBPACK_IMPORTED_MODULE_0__[\"forEach\"](addOrUpdateTag, tags);\n  Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({\n    wis,\n    userId\n  }).then(fetchedTags => res.json(fetchedTags)).catch(logger);\n});\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUsers\", function() { return fetchUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveUser\", function() { return saveUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countUser\", function() { return countUser; });\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\nconst fetchUsers = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  name: 1\n}).exec();\nconst saveUser = async user => new _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"](user).save();\nconst countUser = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n // db helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/fetchUsers', ({\n  query: {\n    wis\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({\n  wis\n}).then(users => res.json(users)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/saveUser', ({\n  body: {\n    wis,\n    userId,\n    username\n  }\n}, res) => {\n  Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"countUser\"])({\n    wis,\n    id: userId\n  }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"saveUser\"])({\n        wis,\n        name: username,\n        id: userId\n      }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _components_user_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var _components_log_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/log/route */ \"./logic/components/log/route.js\");\n/* harmony import */ var _components_tag_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var _components_log_db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/log/db */ \"./logic/components/log/db.js\");\n/* harmony import */ var _components_tag_db__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/tag/db */ \"./logic/components/tag/db.js\");\n/* harmony import */ var _components_pin_db__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/pin/db */ \"./logic/components/pin/db.js\");\n/* harmony import */ var _helper_query_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../helper/query.helper */ \"./helper/query.helper.js\");\n/* harmony import */ var _helper_date_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../helper/date.helper */ \"./helper/date.helper.js\");\n/* harmony import */ var _helper_time_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../helper/time.helper */ \"./helper/time.helper.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// modules\n\n // components\n\n\n\n\n // db helpers\n\n\n\n // helpers\n\n\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get('/initialFetch', ({\n  query\n}, res) => Promise.all([Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query), {\n  $and: [{\n    date: {\n      $gte: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_10__[\"getSixDaysAgo\"])(query.today)\n    }\n  }, {\n    date: {\n      $lte: query.today\n    }\n  }]\n})), Object(_components_tag_db__WEBPACK_IMPORTED_MODULE_7__[\"fetchTags\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query))), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query), {\n  date: query.today\n})), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query), {\n  $and: [{\n    date: {\n      $gte: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_10__[\"getStartDayOfWeek\"])(query.today)\n    }\n  }, {\n    date: {\n      $lte: query.today\n    }\n  }]\n})), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchLogs\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query), {\n  $and: [{\n    date: {\n      $gte: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_10__[\"getStartDayOfMonth\"])(query.today)\n    }\n  }, {\n    date: {\n      $lte: query.today\n    }\n  }]\n})), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchLogs\"])({\n  wis: query.wis,\n  date: query.today\n}), Object(_components_pin_db__WEBPACK_IMPORTED_MODULE_8__[\"fetchPins\"])(_objectSpread({}, Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"defaultQueryGenerator\"])(query)))]).then(success => res.json({\n  logs: success[0],\n  tags: success[1],\n  totalDurations: {\n    today: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_11__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"sumLogs\"])(success[2]), 'Home'),\n    thisWeek: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_11__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"sumLogs\"])(success[3]), 'Home'),\n    thisMonth: Object(_helper_time_helper__WEBPACK_IMPORTED_MODULE_11__[\"formattedSeconds\"])(Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"sumLogs\"])(success[4]), 'Home')\n  },\n  leaderboard: Object(_helper_query_helper__WEBPACK_IMPORTED_MODULE_9__[\"getLeaderboardData\"])(success[5]),\n  pins: success[6],\n  time: new Date()\n})).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/toggleIsPinned\", ({\n  body: {\n    _id,\n    title,\n    tags,\n    value,\n    userId,\n    wis\n  }\n}, res) => Promise.all([Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"updateLog\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.Types.ObjectId(_id)\n}, {\n  $set: {\n    'isPinned': value\n  }\n}), value === true ? Object(_components_pin_db__WEBPACK_IMPORTED_MODULE_8__[\"savePin\"])({\n  logId: mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.Types.ObjectId(_id),\n  title,\n  tags,\n  created_at: new Date(),\n  lastDate: Object(_helper_date_helper__WEBPACK_IMPORTED_MODULE_10__[\"formattedDate\"])(new Date()),\n  userId,\n  wis\n}) : Object(_components_pin_db__WEBPACK_IMPORTED_MODULE_8__[\"deletePin\"])({\n  wis,\n  userId,\n  title\n})]).then(() => res.send({\n  _id,\n  value\n})).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveLogs\", ({\n  body: {\n    pins,\n    date,\n    userId,\n    wis\n  }\n}, res) => Promise.all(ramda__WEBPACK_IMPORTED_MODULE_0__[\"map\"](pin => Object(_components_log_db__WEBPACK_IMPORTED_MODULE_6__[\"saveLog\"])({\n  title: pin.title,\n  tags: pin.tags,\n  created_at: new Date(),\n  userId,\n  wis,\n  times: [],\n  date,\n  isPinned: true\n}), pins), Object(_components_pin_db__WEBPACK_IMPORTED_MODULE_8__[\"updatePins\"])({\n  wis,\n  userId\n}, {\n  $set: {\n    'lastDate': date\n  }\n})).then(success => res.send(ramda__WEBPACK_IMPORTED_MODULE_0__[\"flatten\"](success))).catch(logger));\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/log.js":
/*!***********************!*\
  !*** ./models/log.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a; // create a schema\n\nconst LogSchema = new Schema({\n  title: String,\n  tags: [String],\n  date: String,\n  times: [{\n    start: Date,\n    end: Schema.Types.Mixed\n  }],\n  isPinned: Boolean,\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Log', LogSchema));\n\n//# sourceURL=webpack:///./models/log.js?");

/***/ }),

/***/ "./models/pin.js":
/*!***********************!*\
  !*** ./models/pin.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a; // create a schema\n\nconst PinSchema = new Schema({\n  logId: String,\n  title: String,\n  tags: [String],\n  lastDate: String,\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Pin', PinSchema));\n\n//# sourceURL=webpack:///./models/pin.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a; // create a schema\n\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Tag', TagSchema));\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a; // create a schema\n\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('User', UserSchema));\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/dev.index.js":
/*!****************************!*\
  !*** ./setup/dev.index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var _logic_main_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n // components\n\n\n\n\nhttp__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).listen(3080);\n\n//# sourceURL=webpack:///./setup/dev.index.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect('mongodb://localhost:27017/Loglite');\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = Promise;\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection;\ndb.on('error', console.log);\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n// modules\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()({\n  origin: '*'\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: true\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./setup/dev.index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/dev.index.js */\"./setup/dev.index.js\");\n\n\n//# sourceURL=webpack:///multi_./setup/dev.index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns\");\n\n//# sourceURL=webpack:///external_%22date-fns%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "json2csv":
/*!***************************!*\
  !*** external "json2csv" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"json2csv\");\n\n//# sourceURL=webpack:///external_%22json2csv%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ });