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

/***/ "./logic/db.js":
/*!*********************!*\
  !*** ./logic/db.js ***!
  \*********************/
/*! exports provided: fetchUsers, fetchLogs, fetchTags, saveUser, saveLog, saveCustomLog, countUser, countTags, saveTag, updateTag, deleteLog, saveTime */
/*! exports used: countTags, countUser, deleteLog, fetchLogs, fetchTags, fetchUsers, saveCustomLog, saveLog, saveTag, saveTime, saveUser, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_format__ = __webpack_require__(/*! date-fns/format */ \"date-fns/format\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns_format__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_log__ = __webpack_require__(/*! ../models/log */ \"./models/log.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_tag__ = __webpack_require__(/*! ../models/tag */ \"./models/tag.js\");\n// modules\n\n// models\n\n\n\n\nconst fetchUsers = async query => __WEBPACK_IMPORTED_MODULE_1__models_user__[\"a\" /* default */].find(query).sort({ name: 1 }).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"f\"] = fetchUsers;\n\n\nconst fetchLogs = async query => __WEBPACK_IMPORTED_MODULE_2__models_log__[\"a\" /* default */].find(query).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = fetchLogs;\n\n\nconst fetchTags = async query => __WEBPACK_IMPORTED_MODULE_3__models_tag__[\"a\" /* default */].find(query).sort({ number: -1 }).limit(5).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = fetchTags;\n\n\nconst saveUser = async user => new __WEBPACK_IMPORTED_MODULE_1__models_user__[\"a\" /* default */](user).save();\n/* harmony export (immutable) */ __webpack_exports__[\"k\"] = saveUser;\n\n\nconst saveLog = async log => new __WEBPACK_IMPORTED_MODULE_2__models_log__[\"a\" /* default */](log).save();\n/* harmony export (immutable) */ __webpack_exports__[\"h\"] = saveLog;\n\n\nconst saveCustomLog = async log => new __WEBPACK_IMPORTED_MODULE_2__models_log__[\"a\" /* default */](log).save((err, result) => {\n  if (err) throw err;\n  if (result.date === __WEBPACK_IMPORTED_MODULE_0_date_fns_format___default()(new Date(), 'YYYY-MM-DD')) return result;\n  return 'added successfully!';\n});\n/* harmony export (immutable) */ __webpack_exports__[\"g\"] = saveCustomLog;\n\n\nconst countUser = async query => __WEBPACK_IMPORTED_MODULE_1__models_user__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = countUser;\n\n\nconst countTags = async query => __WEBPACK_IMPORTED_MODULE_3__models_tag__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countTags;\n\n\nconst saveTag = async tag => new __WEBPACK_IMPORTED_MODULE_3__models_tag__[\"a\" /* default */](tag).save();\n/* harmony export (immutable) */ __webpack_exports__[\"i\"] = saveTag;\n\n\nconst updateTag = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_3__models_tag__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"l\"] = updateTag;\n\n\nconst deleteLog = async query => __WEBPACK_IMPORTED_MODULE_2__models_log__[\"a\" /* default */].remove(query).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = deleteLog;\n\n\nconst saveTime = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_2__models_log__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"j\"] = saveTime;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/db.js\n// module id = ./logic/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/db.js?");

/***/ }),

/***/ "./logic/helper.js":
/*!*************************!*\
  !*** ./logic/helper.js ***!
  \*************************/
/*! exports provided: defaultQueryGenerator, queryGenerator, sumLogs, formattedSeconds, modifiedQuery, getJSON, getBarChartData */
/*! exports used: defaultQueryGenerator, formattedSeconds, getBarChartData, getJSON, modifiedQuery, sumLogs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json2csv__ = __webpack_require__(/*! json2csv */ \"json2csv\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json2csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json2csv__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_seconds__ = __webpack_require__(/*! date-fns/difference_in_seconds */ \"date-fns/difference_in_seconds\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_seconds__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_format__ = __webpack_require__(/*! date-fns/format */ \"date-fns/format\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_format__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_difference_in_days__ = __webpack_require__(/*! date-fns/difference_in_days */ \"date-fns/difference_in_days\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_difference_in_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_date_fns_difference_in_days__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_add_days__ = __webpack_require__(/*! date-fns/add_days */ \"date-fns/add_days\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_add_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_date_fns_add_days__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n\n\n\n\n\nconst defaultQueryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId\n});\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = defaultQueryGenerator;\n\n\nconst queryGenerator = query => ({\n  wis: query.wis,\n  userId: query.userId,\n  $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n});\n/* unused harmony export queryGenerator */\n\n\nconst formattedTags = tags => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"slice\"](1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n\nconst sumTimes = times => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"reduce\"]((acc, time) => time.end === 'running' ? acc : acc + __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_seconds___default()(time.end, time.start), 0)(times);\n\nconst sumLogs = logs => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"reduce\"]((acc, log) => acc + sumTimes(log.times), 0)(logs);\n/* harmony export (immutable) */ __webpack_exports__[\"f\"] = sumLogs;\n\n\nconst formattedSeconds = (seconds, pageName) => {\n  if (pageName === 'Home') {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n  }\n  if (Math.floor(seconds / 3600) === 0) {\n    return `Total: ${Math.floor(seconds / 60)}m`;\n  }\n  return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor(seconds % 3600 / 60)}m`;\n};\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = formattedSeconds;\n\n\nconst modifiedQuery = query => {\n  if (!query.selectedTags) {\n    return _extends({}, queryGenerator(query));\n  } else if (Array.isArray(query.selectedTags)) {\n    return _extends({}, queryGenerator(query), {\n      tags: { $in: query.selectedTags }\n    });\n  }\n  return _extends({}, queryGenerator(query), {\n    tags: query.selectedTags\n  });\n};\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = modifiedQuery;\n\n\nconst getJSON = logs => {\n  // let formattedData = logs.map( R.compose())\n  let formattedData = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"dissoc\"]('times', __WEBPACK_IMPORTED_MODULE_1_ramda__[\"assoc\"]('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)), logs);\n  const tagsLens = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"lensProp\"]('tags');\n  formattedData = __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_1_ramda__[\"set\"](tagsLens, formattedTags(log.tags), log), formattedData);\n  const fields = ['title', 'tags', 'duration', 'date'];\n  return __WEBPACK_IMPORTED_MODULE_0_json2csv___default()({ data: formattedData, fields });\n};\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = getJSON;\n\n\nconst getBarChartData = (logs, query) => {\n  let dates = Array(__WEBPACK_IMPORTED_MODULE_4_date_fns_difference_in_days___default()(new Date(query.endDate), new Date(query.startDate)) + 1).fill(query.startDate);\n  dates = dates.map((date, index) => __WEBPACK_IMPORTED_MODULE_3_date_fns_format___default()(__WEBPACK_IMPORTED_MODULE_5_date_fns_add_days___default()(new Date(date), index), 'YYYY-MM-DD'));\n  return __WEBPACK_IMPORTED_MODULE_1_ramda__[\"map\"](date => ({\n    name: date,\n    duration: Math.floor(sumLogs(__WEBPACK_IMPORTED_MODULE_1_ramda__[\"filter\"](log => log.date === date, logs)) / 60) }), dates);\n};\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = getBarChartData;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/helper.js\n// module id = ./logic/helper.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/helper.js?");

/***/ }),

/***/ "./logic/route.js":
/*!************************!*\
  !*** ./logic/route.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setup_server__ = __webpack_require__(/*! ../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db__ = __webpack_require__(/*! ./db */ \"./logic/db.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper__ = __webpack_require__(/*! ./helper */ \"./logic/helper.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n\n// components\n\n// db helpers\n\n// helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/initialFetch', ({ query }, res) => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), { date: query.today })), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* fetchTags */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query))), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), { date: query.today })), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: query.startOfWeek } }, { date: { $lte: query.today } }]\n})), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: query.startOfMonth } }, { date: { $lte: query.today } }]\n}))]).then(success => res.json({\n  logs: success[0],\n  tags: success[1],\n  totalDurations: {\n    today: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[2]), 'Home'),\n    thisWeek: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[3]), 'Home'),\n    thisMonth: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[4]), 'Home')\n  }\n})).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchUsers', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"f\" /* fetchUsers */])({ wis: req.query.wis }).then(users => res.json(users)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchLogs', ({ query: { wis, userId, date } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])({ wis, userId, date }).then(logs => res.json(__WEBPACK_IMPORTED_MODULE_1_ramda__[\"reverse\"](logs))).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchTags', ({ query: { wis, userId } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* fetchTags */])({ wis, userId }).then(logs => res.json(logs)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/serachTags', ({ query: { wis, userId, label } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* fetchTags */])({ wis, userId, label: { $regex: `.*${label}.*` } }).then(tags => res.json(tags)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveUser', ({ body: { wis, userId, username } }, res) => {\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"b\" /* countUser */])({ wis, id: userId }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"k\" /* saveUser */])({ wis, name: username, id: userId }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveLog', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"h\" /* saveLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveCustomLog', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"g\" /* saveCustomLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveTags', ({ body: { wis, userId, tags } }, res) => {\n  const addOrUpdateTag = tag => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"a\" /* countTags */])({ wis, userId, label: tag }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"i\" /* saveTag */])({ label: tag, number: 1, userId, wis });\n    } else Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"l\" /* updateTag */])({ label: tag }, { $inc: { number: 1 } });\n  });\n  __WEBPACK_IMPORTED_MODULE_1_ramda__[\"forEach\"](addOrUpdateTag, tags);\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"e\" /* fetchTags */])({ wis, userId }).then(fetchedTags => res.json(fetchedTags)).catch(logger);\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/insertLogToNextDay', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"h\" /* saveLog */])(req.body).then(log => res.send(log)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/deleteLog', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"c\" /* deleteLog */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(req.query._id) }).then(() => res.send('deleted successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveStartTime', ({ body: { _id, start } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"j\" /* saveTime */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id) }, { $push: { times: { start, end: 'running' } } }).then(() => res.send('saved successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].post('/saveEndTime', ({ body: { _id, end } }, res) => Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"j\" /* saveTime */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id), 'times.end': 'running' }, { $set: { 'times.$.end': new Date(end) } }).then(() => res.send('saved successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/fetchTotalDurations', ({ query }, res) => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), { date: query.today })), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: query.startOfWeek } }, { date: { $lte: query.today } }]\n})), Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(_extends({}, Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"a\" /* defaultQueryGenerator */])(query), {\n  $and: [{ date: { $gte: query.startOfMonth } }, { date: { $lte: query.today } }]\n}))]).then(success => res.json({\n  today: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[0]), 'Home'),\n  thisWeek: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[1]), 'Home'),\n  thisMonth: Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */])(success[2]), 'Home')\n})).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/calculateTotalDuration', (req, res) => {\n  const query = Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"e\" /* modifiedQuery */])(req.query);\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(query, 'Report').then(__WEBPACK_IMPORTED_MODULE_4__helper__[\"f\" /* sumLogs */]).then(sum => Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"b\" /* formattedSeconds */])(sum, 'Report')).then(totalDuration => res.json(totalDuration)).catch(logger);\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/convertJSONToCSV', (req, res) => {\n  const query = Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"e\" /* modifiedQuery */])(req.query);\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(query).then(logs => Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"d\" /* getJSON */])(logs)).then(csv => {\n    res.setHeader('Content-disposition', 'attachment; filename=data.csv');\n    res.set('Content-Type', 'text/csv');\n    res.status(200).send(csv);\n  }).catch(logger);\n});\n\n__WEBPACK_IMPORTED_MODULE_2__setup_server__[\"a\" /* default */].get('/barChartData', ({ query }, res) => {\n  const newQuery = {\n    wis: query.wis,\n    userId: query.userId,\n    $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]\n  };\n  Object(__WEBPACK_IMPORTED_MODULE_3__db__[\"d\" /* fetchLogs */])(newQuery).then(logs => res.send(Object(__WEBPACK_IMPORTED_MODULE_4__helper__[\"c\" /* getBarChartData */])(logs, query))).catch(logger);\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/route.js\n// module id = ./logic/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/route.js?");

/***/ }),

/***/ "./models/log.js":
/*!***********************!*\
  !*** ./models/log.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\n// create a schema\nconst LogSchema = new Schema({\n  title: String,\n  tags: [String],\n  date: String,\n  times: [{\n    start: Date,\n    end: Schema.Types.Mixed\n  }],\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Log', LogSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/log.js\n// module id = ./models/log.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/log.js?");

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
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mongodb__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_route__ = __webpack_require__(/*! ../logic/route */ \"./logic/route.js\");\n// modules\n\n\n\n\n\n__WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_1__server__[\"a\" /* default */]).listen(3080);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/dev.index.js\n// module id = ./setup/dev.index.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/dev.index.js?");

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

/***/ "date-fns/add_days":
/*!************************************!*\
  !*** external "date-fns/add_days" ***!
  \************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/add_days\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/add_days\"\n// module id = date-fns/add_days\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/add_days%22?");

/***/ }),

/***/ "date-fns/difference_in_days":
/*!**********************************************!*\
  !*** external "date-fns/difference_in_days" ***!
  \**********************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/difference_in_days\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/difference_in_days\"\n// module id = date-fns/difference_in_days\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/difference_in_days%22?");

/***/ }),

/***/ "date-fns/difference_in_seconds":
/*!*************************************************!*\
  !*** external "date-fns/difference_in_seconds" ***!
  \*************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/difference_in_seconds\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/difference_in_seconds\"\n// module id = date-fns/difference_in_seconds\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/difference_in_seconds%22?");

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