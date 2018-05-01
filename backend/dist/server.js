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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./logic/components/log/db.js":
/*!************************************!*\
  !*** ./logic/components/log/db.js ***!
  \************************************/
/*! exports provided: fetchLogs, saveLog, saveCustomLog, deleteLog, saveTime */
/*! exports used: deleteLog, fetchLogs, saveCustomLog, saveLog, saveTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_format__ = __webpack_require__(/*! date-fns/format */ \"date-fns/format\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns_format__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_log__ = __webpack_require__(/*! ../../../models/log */ \"./models/log.js\");\n// modules\n\n// models\n\n\nconst fetchLogs = async query => __WEBPACK_IMPORTED_MODULE_1__models_log__[\"a\" /* default */].find(query).sort({ created_at: -1 }).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchLogs;\n\n\nconst saveLog = async log => new __WEBPACK_IMPORTED_MODULE_1__models_log__[\"a\" /* default */](log).save();\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = saveLog;\n\n\nconst saveCustomLog = async log => new __WEBPACK_IMPORTED_MODULE_1__models_log__[\"a\" /* default */](log).save((err, result) => {\n  if (err) throw err;\n  if (result.date === __WEBPACK_IMPORTED_MODULE_0_date_fns_format___default()(new Date(), 'YYYY-MM-DD')) return result;\n  return 'added successfully!';\n});\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = saveCustomLog;\n\n\nconst deleteLog = async query => __WEBPACK_IMPORTED_MODULE_1__models_log__[\"a\" /* default */].remove(query).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = deleteLog;\n\n\nconst saveTime = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_1__models_log__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = saveTime;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/log/db.js\n// module id = ./logic/components/log/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/log/db.js?");

/***/ }),

/***/ "./logic/components/log/route.js":
/*!***************************************!*\
  !*** ./logic/components/log/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db__ = __webpack_require__(/*! ./db */ \"./logic/components/log/db.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_helper__ = __webpack_require__(/*! ../../main/helper */ \"./logic/main/helper.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n// components\n\n// db helpers\n\n// helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchLogs', ({ query: { wis, userId, date } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])({ wis, userId, date }).then(logs => res.json(__WEBPACK_IMPORTED_MODULE_1_ramda__[\"reverse\"](logs))).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveLog', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* saveLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveCustomLog', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"c\" /* saveCustomLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/insertLogToNextDay', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* saveLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/deleteLog', ({ query }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"a\" /* deleteLog */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(query._id) }).then(() => res.send(query)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveStartTime', ({ body }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* saveTime */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(body._id) }, { $push: { times: { start: body.start, end: 'running' } } }).then(() => res.send(body)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveEndTime', ({ body }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* saveTime */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(body._id), 'times.end': 'running' }, { $set: { 'times.$.end': new Date(body.end) } }).then(() => res.send(body)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchTotalDurations', ({ query }, res) => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"a\" /* defaultQueryGenerator */])(query), { date: query.today })), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"f\" /* getStartDayOfWeek */])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"e\" /* getStartDayOfMonth */])(query.today) } }, { date: { $lte: query.today } }]\n}))]).then(success => res.json({\n  today: Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"i\" /* sumLogs */])(success[0]), 'Home'),\n  thisWeek: Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"i\" /* sumLogs */])(success[1]), 'Home'),\n  thisMonth: Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"i\" /* sumLogs */])(success[2]), 'Home')\n})).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/calculateTotalDuration', (req, res) => {\n  const query = Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"h\" /* modifiedQuery */])(req.query);\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(query, 'Report').then(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"i\" /* sumLogs */]).then(sum => Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"b\" /* formattedSeconds */])(sum, 'Report')).then(totalDuration => res.json(totalDuration)).catch(logger);\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/convertJSONToCSV', (req, res) => {\n  const query = Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"h\" /* modifiedQuery */])(req.query);\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(query).then(logs => Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"d\" /* getJSON */])(logs)).then(csv => {\n    res.setHeader('Content-disposition', 'attachment; filename=data.csv');\n    res.set('Content-Type', 'text/csv');\n    res.status(200).send(csv);\n  }).catch(logger);\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/barChartData', ({ query }, res) => {\n  const newQuery = {\n    wis: query.wis,\n    userId: query.userId,\n    $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n  };\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* fetchLogs */])(newQuery).then(logs => res.send(Object(__WEBPACK_IMPORTED_MODULE_4__main_helper__[\"c\" /* getBarChartData */])(logs, query))).catch(logger);\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/log/route.js\n// module id = ./logic/components/log/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/log/route.js?");

/***/ }),

/***/ "./logic/components/tag/db.js":
/*!************************************!*\
  !*** ./logic/components/tag/db.js ***!
  \************************************/
/*! exports provided: fetchTags, countTags, saveTag, updateTag */
/*! exports used: countTags, fetchTags, saveTag, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_tag__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\n\nconst fetchTags = async query => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].find(query).sort({ number: -1 }).limit(5).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchTags;\n\n\nconst countTags = async query => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countTags;\n\n\nconst saveTag = async tag => new __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */](tag).save();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = saveTag;\n\n\nconst updateTag = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = updateTag;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/tag/db.js\n// module id = ./logic/components/tag/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].get('/fetchTags', ({ query: { wis, userId } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTags */])({ wis, userId }).then(logs => res.json(logs)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].get('/serachTags', ({ query: { wis, userId, label } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTags */])({ wis, userId, label: { $regex: `.*${label}.*` } }).then(tags => res.json(tags)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/saveTags', ({ body: { wis, userId, tags } }, res) => {\n  const addOrUpdateTag = tag => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* countTags */])({ wis, userId, label: tag }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"c\" /* saveTag */])({ label: tag, number: 1, userId, wis });\n    } else Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"d\" /* updateTag */])({ label: tag }, { $inc: { number: 1 } });\n  });\n  __WEBPACK_IMPORTED_MODULE_0_ramda__[\"forEach\"](addOrUpdateTag, tags);\n  Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTags */])({ wis, userId }).then(fetchedTags => res.json(fetchedTags)).catch(logger);\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/tag/route.js\n// module id = ./logic/components/tag/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/*! exports used: countUser, fetchUsers, saveUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_user__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\n\nconst fetchUsers = async query => __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */].find(query).sort({ name: 1 }).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchUsers;\n\n\nconst saveUser = async user => new __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */](user).save();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = saveUser;\n\n\nconst countUser = async query => __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countUser;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/user/db.js\n// module id = ./logic/components/user/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].get('/fetchUsers', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"b\" /* fetchUsers */])({ wis: req.query.wis }).then(users => res.json(users)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].post('/saveUser', ({ body: { wis, userId, username } }, res) => {\n  Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"a\" /* countUser */])({ wis, id: userId }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"c\" /* saveUser */])({ wis, name: username, id: userId }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/user/route.js\n// module id = ./logic/components/user/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/helper.js":
/*!******************************!*\
  !*** ./logic/main/helper.js ***!
  \******************************/
/*! exports provided: defaultQueryGenerator, queryGenerator, sumLogs, formattedSeconds, modifiedQuery, getJSON, getBarChartData, formattedDate, getYesterday, getStartDayOfWeek, getStartDayOfMonth */
/*! exports used: defaultQueryGenerator, formattedSeconds, getBarChartData, getJSON, getStartDayOfMonth, getStartDayOfWeek, getYesterday, modifiedQuery, sumLogs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json2csv__ = __webpack_require__(/*! json2csv */ \"json2csv\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json2csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json2csv__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n\n\nconst defaultQueryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId\n});\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = defaultQueryGenerator;\n\n\nconst queryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId,\n  $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n});\n/* unused harmony export queryGenerator */\n\n\nconst formattedTags = tags => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"slice\"](1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n\nconst sumTimes = times => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"reduce\"]((acc, time) => time.end === 'running' ? acc : acc + Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"differenceInSeconds\"])(time.end, time.start), 0)(times);\n\nconst sumLogs = logs => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"reduce\"]((acc, log) => acc + sumTimes(log.times), 0)(logs);\n/* harmony export (immutable) */ __webpack_exports__[\"i\"] = sumLogs;\n\n\nconst formattedSeconds = (seconds, pageName) => {\n  if (pageName === 'Home') {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n  }\n  if (Math.floor(seconds / 3600) === 0) {\n    return `Total: ${Math.floor(seconds / 60)}m`;\n  }\n  return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n};\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = formattedSeconds;\n\n\nconst modifiedQuery = query => {\n  if (!query.selectedTags) {\n    return _extends({}, queryGenerator(query));\n  } else if (Array.isArray(query.selectedTags)) {\n    return _extends({}, queryGenerator(query), {\n      tags: { $in: query.selectedTags }\n    });\n  }\n  return _extends({}, queryGenerator(query), {\n    tags: query.selectedTags\n  });\n};\n/* harmony export (immutable) */ __webpack_exports__[\"h\"] = modifiedQuery;\n\n\nconst getJSON = logs => {\n  // let formattedData = logs.map( R.compose())\n  let formattedData = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"dissoc\"]('times', __WEBPACK_IMPORTED_MODULE_1_ramda__[\"assoc\"]('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)), logs);\n  const tagsLens = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"lensProp\"]('tags');\n  formattedData = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"set\"](tagsLens, formattedTags(log.tags), log), formattedData);\n  const fields = ['title', 'tags', 'duration', 'date'];\n  return __WEBPACK_IMPORTED_MODULE_0_json2csv___default()({ data: formattedData, fields });\n};\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = getJSON;\n\n\nconst getBarChartData = (logs, query) => {\n  let dates = Array(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"differenceInDays\"])(new Date(query.endDate), new Date(query.startDate)) + 1).fill(query.startDate);\n  dates = dates.map((date, index) => Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"format\"])(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"addDays\"])(new Date(date), index), 'YYYY-MM-DD'));\n  return __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](date => ({\n    name: date,\n    duration: Math.floor(sumLogs(__WEBPACK_IMPORTED_MODULE_1_ramda__[\"filter\"](log => log.date === date, logs)) / 60) }), dates);\n};\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = getBarChartData;\n\n\nconst formattedDate = date => Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"format\"])(date, 'YYYY-MM-DD');\n/* unused harmony export formattedDate */\n\n\nconst getYesterday = date => formattedDate(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"subDays\"])(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"startOfDay\"])(date), 1));\n/* harmony export (immutable) */ __webpack_exports__[\"g\"] = getYesterday;\n\n\nconst getStartDayOfWeek = date => formattedDate(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"subDays\"])(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"startOfWeek\"])(date), 1));\n/* harmony export (immutable) */ __webpack_exports__[\"f\"] = getStartDayOfWeek;\n\n\nconst getStartDayOfMonth = date => formattedDate(Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__[\"startOfMonth\"])(date));\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = getStartDayOfMonth;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/main/helper.js\n// module id = ./logic/main/helper.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/main/helper.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_server__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_user_route__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_log_route__ = __webpack_require__(/*! ../components/log/route */ \"./logic/components/log/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_tag_route__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_log_db__ = __webpack_require__(/*! ../components/log/db */ \"./logic/components/log/db.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tag_db__ = __webpack_require__(/*! ../components/tag/db */ \"./logic/components/tag/db.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper__ = __webpack_require__(/*! ./helper */ \"./logic/main/helper.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// components\n\n\n\n\n// db helpers\n\n\n// helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].get('/initialFetch', ({ query }, res) => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_4__components_log_db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"g\" /* getYesterday */])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(__WEBPACK_IMPORTED_MODULE_5__components_tag_db__[\"b\" /* fetchTags */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"a\" /* defaultQueryGenerator */])(query))), Object(__WEBPACK_IMPORTED_MODULE_4__components_log_db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"a\" /* defaultQueryGenerator */])(query), { date: query.today })), Object(__WEBPACK_IMPORTED_MODULE_4__components_log_db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"f\" /* getStartDayOfWeek */])(query.today) } }, { date: { $lte: query.today } }]\n})), Object(__WEBPACK_IMPORTED_MODULE_4__components_log_db__[\"b\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"e\" /* getStartDayOfMonth */])(query.today) } }, { date: { $lte: query.today } }]\n}))]).then(success => res.json({\n  logs: success[0],\n  tags: success[1],\n  totalDurations: {\n    today: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"i\" /* sumLogs */])(success[2]), 'Home'),\n    thisWeek: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"i\" /* sumLogs */])(success[3]), 'Home'),\n    thisMonth: Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_6__helper__[\"i\" /* sumLogs */])(success[4]), 'Home')\n  }\n})).catch(logger));\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/main/route.js\n// module id = ./logic/main/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/log.js":
/*!***********************!*\
  !*** ./models/log.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\n// create a schema\nconst LogSchema = new Schema({\n  title: String,\n  tags: [String],\n  date: String,\n  times: [{\n    start: Date,\n    end: Schema.Types.Mixed\n  }],\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Log', LogSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/log.js\n// module id = ./models/log.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/log.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\n// create a schema\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Tag', TagSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/tag.js\n// module id = ./models/tag.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\n// create a schema\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', UserSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/user.js\n// module id = ./models/user.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/dev.index.js":
/*!****************************!*\
  !*** ./setup/dev.index.js ***!
  \****************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mongodb__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_main_route__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n\n// components\n\n\n\n\n__WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_1__server__[\"a\" /* default */]).listen(3080);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/dev.index.js\n// module id = ./setup/dev.index.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/dev.index.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n\n\n__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect('mongodb://localhost:27017/Loglite');\n__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = Promise;\nconst db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;\ndb.on('error', console.log);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/mongodb.js\n// module id = ./setup/mongodb.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);\n// modules\n\n\n\n\nconst app = __WEBPACK_IMPORTED_MODULE_0_express___default()();\n\napp.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()({ origin: '*' }));\napp.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());\napp.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: true }));\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (app);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/server.js\n// module id = ./setup/server.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./setup/dev.index.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/dev.index.js */\"./setup/dev.index.js\");\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./setup/dev.index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./setup/dev.index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = body-parser\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"cors\"\n// module id = cors\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! dynamic exports provided */
/*! exports used: addDays, differenceInDays, differenceInSeconds, format, startOfDay, startOfMonth, startOfWeek, subDays */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns\"\n// module id = date-fns\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns%22?");

/***/ }),

/***/ "date-fns/format":
/*!**********************************!*\
  !*** external "date-fns/format" ***!
  \**********************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/format\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/format\"\n// module id = date-fns/format\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/format%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = express\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http\"\n// module id = http\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "json2csv":
/*!***************************!*\
  !*** external "json2csv" ***!
  \***************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"json2csv\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"json2csv\"\n// module id = json2csv\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22json2csv%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongoose\"\n// module id = mongoose\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! dynamic exports provided */
/*! exports used: assoc, dissoc, filter, forEach, lensProp, map, reduce, reverse, set, slice */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"ramda\"\n// module id = ramda\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ });