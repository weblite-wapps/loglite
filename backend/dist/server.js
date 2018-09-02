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

/***/ "./logic/components/log/db.js":
/*!************************************!*\
  !*** ./logic/components/log/db.js ***!
  \************************************/
/*! exports provided: fetchLogs, saveLog, deleteLog, saveTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchLogs\", function() { return fetchLogs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveLog\", function() { return saveLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteLog\", function() { return deleteLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTime\", function() { return saveTime; });\n/* harmony import */ var _models_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/log */ \"./models/log.js\");\n// models\n\n\nconst fetchLogs = async query => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ created_at: -1 }).exec();\n\nconst saveLog = async log => new _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"](log).save();\n\nconst deleteLog = async query => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].remove(query).exec();\n\nconst saveTime = async (query, updateObject) => _models_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/log/db.js?");

/***/ }),

/***/ "./logic/components/log/route.js":
/*!***************************************!*\
  !*** ./logic/components/log/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"./logic/components/log/db.js\");\n/* harmony import */ var _main_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/helper */ \"./logic/main/helper.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n// components\n\n// db helpers\n\n// helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/fetchLogs\", ({ query: { wis, userId, date } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])({ wis, userId, date }).then(logs => res.json(ramda__WEBPACK_IMPORTED_MODULE_1__[\"reverse\"](logs))).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveLog\", (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(req.body).then(log => res.send(log)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveCustomLog\", (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(req.body).then(log => res.send(log)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/insertLogToNextDay\", (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveLog\"])(req.body).then(log => res.send(log)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/deleteLog\", ({ query }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"deleteLog\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(query._id) }).then(() => res.send(query)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveStartTime\", ({ body }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveTime\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body._id) }, { $push: { times: { start: body.start, end: \"running\" } } }).then(() => res.send(body)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/saveEndTime\", ({ body }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"saveTime\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body.runningId), \"times.end\": \"running\" }, { $set: { \"times.$.end\": new Date(body.end) } }).then(() => res.send(body)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/fetchTotalDurations\", ({ query }, res) => Promise.all([Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_extends({}, Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), { date: query.today })), Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_extends({}, Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), {\n  $and: [{ date: { $gte: Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"getStartDayOfWeek\"])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(_extends({}, Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"defaultQueryGenerator\"])(query), {\n  $and: [{ date: { $gte: Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"getStartDayOfMonth\"])(query.today) } }, { date: { $lte: query.today } }]\n}))]).then(success => res.json({\n  today: Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"formattedSeconds\"])(Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[0]), \"Home\"),\n  thisWeek: Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"formattedSeconds\"])(Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[1]), \"Home\"),\n  thisMonth: Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"formattedSeconds\"])(Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"])(success[2]), \"Home\")\n})).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/calculateTotalDuration\", (req, res) => {\n  const query = Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"modifiedQuery\"])(req.query);\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(query, \"Report\").then(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"sumLogs\"]).then(sum => Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"formattedSeconds\"])(sum, \"Report\")).then(totalDuration => res.json(totalDuration)).catch(logger);\n});\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/convertJSONToCSV\", (req, res) => {\n  const query = Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"modifiedQuery\"])(req.query);\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(query).then(logs => Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"getJSON\"])(logs)).then(csv => {\n    res.setHeader(\"Content-disposition\", \"attachment; filename=data.csv\");\n    res.set(\"Content-Type\", \"text/csv\");\n    res.status(200).send(csv);\n  }).catch(logger);\n});\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/barChartData\", ({ query }, res) => {\n  const newQuery = {\n    wis: query.wis,\n    userId: query.userId,\n    $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n  };\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(newQuery).then(logs => res.send(Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"getBarChartData\"])(logs, query))).catch(logger);\n});\n\n_setup_server__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/leaderboardData\", ({ query }, res) => {\n  const newQuery = {\n    wis: query.wis,\n    $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n  };\n  Object(_db__WEBPACK_IMPORTED_MODULE_3__[\"fetchLogs\"])(newQuery).then(logs => res.send(Object(_main_helper__WEBPACK_IMPORTED_MODULE_4__[\"getLeaderboardData\"])(logs))).catch(logger);\n});\n\n//# sourceURL=webpack:///./logic/components/log/route.js?");

/***/ }),

/***/ "./logic/components/tag/db.js":
/*!************************************!*\
  !*** ./logic/components/tag/db.js ***!
  \************************************/
/*! exports provided: fetchTags, countTags, saveTag, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTags\", function() { return countTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTag\", function() { return saveTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTag\", function() { return updateTag; });\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\n\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ number: -1 }).limit(5).exec();\n\nconst countTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\nconst saveTag = async tag => new _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag).save();\n\nconst updateTag = async (query, updateObject) => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"/fetchTags\", ({ query: { wis, userId } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({ wis, userId }).then(logs => res.json(logs)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"/serachTags\", ({ query: { wis, userId, label } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({ wis, userId, label: { $regex: `.*${label}.*` } }).then(tags => res.json(tags)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"/saveTags\", ({ body: { wis, userId, tags } }, res) => {\n  const addOrUpdateTag = tag => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"countTags\"])({ wis, userId, label: tag }).then(number => number === 0 ? Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTag\"])({ label: tag, number: 1, userId, wis }) : Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTag\"])({ label: tag }, { $inc: { number: 1 } }));\n  ramda__WEBPACK_IMPORTED_MODULE_0__[\"forEach\"](addOrUpdateTag, tags);\n  Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({ wis, userId }).then(fetchedTags => res.json(fetchedTags)).catch(logger);\n});\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUsers\", function() { return fetchUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveUser\", function() { return saveUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countUser\", function() { return countUser; });\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\n\nconst fetchUsers = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ name: 1 }).exec();\n\nconst saveUser = async user => new _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"](user).save();\n\nconst countUser = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/fetchUsers', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({ wis: req.query.wis }).then(users => res.json(users)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/saveUser', ({ body: { wis, userId, username } }, res) => {\n  Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"countUser\"])({ wis, id: userId }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"saveUser\"])({ wis, name: username, id: userId }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/helper.js":
/*!******************************!*\
  !*** ./logic/main/helper.js ***!
  \******************************/
/*! exports provided: defaultQueryGenerator, queryGenerator, sumLogs, formattedSeconds, modifiedQuery, getJSON, getBarChartData, getLeaderboardData, checkInProgress, formattedDate, getYesterday, getStartDayOfWeek, getStartDayOfMonth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultQueryGenerator\", function() { return defaultQueryGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryGenerator\", function() { return queryGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumLogs\", function() { return sumLogs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formattedSeconds\", function() { return formattedSeconds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"modifiedQuery\", function() { return modifiedQuery; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJSON\", function() { return getJSON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBarChartData\", function() { return getBarChartData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLeaderboardData\", function() { return getLeaderboardData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkInProgress\", function() { return checkInProgress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formattedDate\", function() { return formattedDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getYesterday\", function() { return getYesterday; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStartDayOfWeek\", function() { return getStartDayOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStartDayOfMonth\", function() { return getStartDayOfMonth; });\n/* harmony import */ var json2csv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! json2csv */ \"json2csv\");\n/* harmony import */ var json2csv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json2csv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_2__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n\n\nconst defaultQueryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId\n});\n\nconst queryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId,\n  $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n});\n\nconst formattedTags = tags => ramda__WEBPACK_IMPORTED_MODULE_1__[\"slice\"](1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n\nconst sumTimes = times => ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"]((acc, time) => time.end === \"running\" ? acc + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInSeconds\"])(new Date(), time.start) : acc + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInSeconds\"])(time.end, time.start), 0)(times);\n\nconst sumLogs = logs => ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"]((acc, log) => acc + sumTimes(log.times), 0)(logs);\n\nconst formattedSeconds = (seconds, pageName) => {\n  if (pageName === \"Home\") {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n  }\n  if (Math.floor(seconds / 3600) === 0) {\n    return `Total: ${Math.floor(seconds / 60)}m`;\n  }\n  return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n};\n\nconst modifiedQuery = query => {\n  if (!query.selectedTags) {\n    return _extends({}, queryGenerator(query));\n  } else if (Array.isArray(query.selectedTags)) {\n    return _extends({}, queryGenerator(query), {\n      tags: { $in: query.selectedTags }\n    });\n  }\n  return _extends({}, queryGenerator(query), {\n    tags: query.selectedTags\n  });\n};\n\nconst getJSON = logs => {\n  // let formattedData = logs.map( R.compose())\n  let formattedData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"dissoc\"](\"times\", ramda__WEBPACK_IMPORTED_MODULE_1__[\"assoc\"](\"duration\", formattedSeconds(sumTimes(log.times), \"Home\"), log)), logs);\n  const tagsLens = ramda__WEBPACK_IMPORTED_MODULE_1__[\"lensProp\"](\"tags\");\n  formattedData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"set\"](tagsLens, formattedTags(log.tags), log), formattedData);\n  const fields = [\"title\", \"tags\", \"duration\", \"date\"];\n  return json2csv__WEBPACK_IMPORTED_MODULE_0___default()({ data: formattedData, fields });\n};\n\nconst getBarChartData = (logs, query) => {\n  let dates = Array(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"differenceInDays\"])(new Date(query.endDate), new Date(query.startDate)) + 1).fill(query.startDate);\n  dates = dates.map((date, index) => Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"addDays\"])(new Date(date), index), \"YYYY-MM-DD\"));\n  return ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](date => ({\n    name: date,\n    duration: Math.floor(sumLogs(ramda__WEBPACK_IMPORTED_MODULE_1__[\"filter\"](log => log.date === date, logs)) / 60)\n  }), dates);\n};\n\nconst getLeaderboardData = ramda__WEBPACK_IMPORTED_MODULE_1__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](logs => ({\n  userId: logs[0].userId,\n  score: Math.floor(sumLogs(logs) / 60),\n  workInProgress: checkInProgress(logs)\n})), ramda__WEBPACK_IMPORTED_MODULE_1__[\"values\"], ramda__WEBPACK_IMPORTED_MODULE_1__[\"groupBy\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"](\"userId\")));\n\nconst checkInProgress = ramda__WEBPACK_IMPORTED_MODULE_1__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"reduce\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"or\"], false), ramda__WEBPACK_IMPORTED_MODULE_1__[\"map\"](log => ramda__WEBPACK_IMPORTED_MODULE_1__[\"findIndex\"](ramda__WEBPACK_IMPORTED_MODULE_1__[\"propEq\"](\"end\", \"running\"))(log.times) !== -1), ramda__WEBPACK_IMPORTED_MODULE_1__[\"filter\"](log => log.date === Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(new Date(), \"YYYY-MM-DD\")));\n\nconst formattedDate = date => Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(date, \"YYYY-MM-DD\");\n\nconst getYesterday = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"subDays\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"startOfDay\"])(date), 1));\n\nconst getStartDayOfWeek = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"subDays\"])(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"startOfWeek\"])(date), 1));\n\nconst getStartDayOfMonth = date => formattedDate(Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"startOfMonth\"])(date));\n\n//# sourceURL=webpack:///./logic/main/helper.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _components_user_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var _components_log_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/log/route */ \"./logic/components/log/route.js\");\n/* harmony import */ var _components_tag_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var _components_log_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/log/db */ \"./logic/components/log/db.js\");\n/* harmony import */ var _components_tag_db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/tag/db */ \"./logic/components/tag/db.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helper */ \"./logic/main/helper.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n// components\n\n\n\n\n// db helpers\n\n\n// helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/initialFetch', ({ query }, res) => Promise.all([Object(_components_log_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchLogs\"])(_extends({}, Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"defaultQueryGenerator\"])(query), {\n  $and: [{ date: { $gte: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"getYesterday\"])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(_components_tag_db__WEBPACK_IMPORTED_MODULE_6__[\"fetchTags\"])(_extends({}, Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"defaultQueryGenerator\"])(query))), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchLogs\"])(_extends({}, Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"defaultQueryGenerator\"])(query), { date: query.today })), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchLogs\"])(_extends({}, Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"defaultQueryGenerator\"])(query), {\n  $and: [{ date: { $gte: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"getStartDayOfWeek\"])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchLogs\"])(_extends({}, Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"defaultQueryGenerator\"])(query), {\n  $and: [{ date: { $gte: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"getStartDayOfMonth\"])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(_components_log_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchLogs\"])({ wis: query.wis, date: query.today })]).then(success => res.json({\n  logs: success[0],\n  tags: success[1],\n  totalDurations: {\n    today: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"formattedSeconds\"])(Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"sumLogs\"])(success[2]), 'Home'),\n    thisWeek: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"formattedSeconds\"])(Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"sumLogs\"])(success[3]), 'Home'),\n    thisMonth: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"formattedSeconds\"])(Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"sumLogs\"])(success[4]), 'Home')\n  },\n  leaderboard: Object(_helper__WEBPACK_IMPORTED_MODULE_7__[\"getLeaderboardData\"])(success[5])\n})).catch(logger));\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/log.js":
/*!***********************!*\
  !*** ./models/log.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\n// create a schema\nconst LogSchema = new Schema({\n  title: String,\n  tags: [String],\n  date: String,\n  times: [{\n    start: Date,\n    end: Schema.Types.Mixed\n  }],\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Log', LogSchema));\n\n//# sourceURL=webpack:///./models/log.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\n// create a schema\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Tag', TagSchema));\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\n// create a schema\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('User', UserSchema));\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect('mongodb://localhost:27017/Loglite');\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = Promise;\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection;\ndb.on('error', console.log);\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/prod.index.js":
/*!*****************************!*\
  !*** ./setup/prod.index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ \"https\");\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var _logic_main_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n\n\n\n// components\n\n\n\n\nconst privateKey = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve('./src/certs/express.key'), 'utf8');\nconst certificate = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve('./src/certs/express.crt'), 'utf8');\n\nhttps__WEBPACK_IMPORTED_MODULE_1___default.a.createServer({ key: privateKey, cert: certificate }, _server__WEBPACK_IMPORTED_MODULE_3__[\"default\"]).listen(3080);\n\n//# sourceURL=webpack:///./setup/prod.index.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n// modules\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()({ origin: '*' }));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: true }));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./setup/prod.index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/prod.index.js */\"./setup/prod.index.js\");\n\n\n//# sourceURL=webpack:///multi_./setup/prod.index.js?");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

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