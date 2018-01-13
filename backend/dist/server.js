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

/***/ "./server.helper.js":
/*!**************************!*\
  !*** ./server.helper.js ***!
  \**************************/
/*! exports provided: sumTimes, sumLogs, formattedSeconds, formattedTags */
/*! exports used: formattedSeconds, formattedTags, sumLogs, sumTimes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_difference_in_seconds__ = __webpack_require__(/*! date-fns/difference_in_seconds */ \"date-fns/difference_in_seconds\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_difference_in_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_difference_in_seconds__);\n// modules\n\n\n\nconst sumTimes = times => __WEBPACK_IMPORTED_MODULE_0_ramda__[\"reduce\"]((acc, time) => time.end === 'running' ? acc : acc + __WEBPACK_IMPORTED_MODULE_1_date_fns_difference_in_seconds___default()(time.end, time.start), 0)(times);\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = sumTimes;\n\n\nconst sumLogs = logs => __WEBPACK_IMPORTED_MODULE_0_ramda__[\"reduce\"]((acc, log) => acc + sumTimes(log.times), 0)(logs);\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = sumLogs;\n\n\nconst formattedSeconds = (seconds, pageName) => {\n  if (pageName === 'Home') {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h${Math.floor(seconds % 3600 / 60)}m`;\n  }\n  if (Math.floor(seconds / 3600) === 0) {\n    return `Total: ${Math.floor(seconds / 60)}m`;\n  }\n  return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h${Math.floor(seconds % 3600 / 60)}m`;\n};\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = formattedSeconds;\n\n\nconst formattedTags = tags => __WEBPACK_IMPORTED_MODULE_0_ramda__[\"slice\"](1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = formattedTags;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./server.helper.js\n// module id = ./server.helper.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server.helper.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_https__ = __webpack_require__(/*! https */ \"https\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_https___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_https__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_json2csv__ = __webpack_require__(/*! json2csv */ \"json2csv\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_json2csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_json2csv__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cors__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cors__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_body_parser__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_body_parser__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mongodb__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mongodb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_mongodb__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_format__ = __webpack_require__(/*! date-fns/format */ \"date-fns/format\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_date_fns_format__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_days__ = __webpack_require__(/*! date-fns/difference_in_days */ \"date-fns/difference_in_days\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_days__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_add_days__ = __webpack_require__(/*! date-fns/add_days */ \"date-fns/add_days\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_add_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_date_fns_add_days__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__server_helper__ = __webpack_require__(/*! ./server.helper */ \"./server.helper.js\");\n// modules\n\n\n\n\n\n\n\n\n\n\n\n\n// helpers\n\n\nconst app = __WEBPACK_IMPORTED_MODULE_2_express___default()();\nconst privateKey = __WEBPACK_IMPORTED_MODULE_4_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve('./src/certs/express.key'), 'utf8');\nconst certificate = __WEBPACK_IMPORTED_MODULE_4_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve('./src/certs/express.crt'), 'utf8');\n\nconst credentials = { key: privateKey, cert: certificate };\napp.use(__WEBPACK_IMPORTED_MODULE_5_cors___default()({\n  origin: '*'\n}));\nconst httpsServer = __WEBPACK_IMPORTED_MODULE_1_https___default.a.createServer(credentials, app);\n\napp.use(__WEBPACK_IMPORTED_MODULE_6_body_parser___default.a.json()); // support json encoded bodies\napp.use(__WEBPACK_IMPORTED_MODULE_6_body_parser___default.a.urlencoded({ extended: true })); // support encoded bodies\n\nconst logger = console.log;\n\n// Handler for internal server errors\nfunction errorHandler(err, req, res) {\n  res.status(500);\n  res.render('error_template', { error: err });\n}\napp.use(errorHandler);\n\nlet db;\n__WEBPACK_IMPORTED_MODULE_7_mongodb__[\"MongoClient\"].connect('mongodb://localhost:27017/LogLite', (err, database) => {\n  if (err) throw err.message;\n  db = database;\n  httpsServer.listen(3080);\n});\n\napp.get('/', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).sort({ date: -1 }).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(__WEBPACK_IMPORTED_MODULE_8_ramda__[\"reverse\"](doc));\n  });\n});\n\napp.get('/fetchTags', (req, res) => {\n  const query = { wis: req.query.wis };\n  db.collection('tagsInfo').find(query).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(doc);\n  });\n});\n\napp.get('/serachTags', (req, res) => {\n  db.collection('tagsInfo').find({ wis: req.query.wis, label: { $regex: `.*${req.query.label}.*` } }).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(doc);\n  });\n});\n\napp.post('/insertLog', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) logger(err);\n    res.send(result.ops[0]);\n  });\n});\n\napp.post('/insertCustomLog', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) logger(err);\n    if (result.ops[0].date === __WEBPACK_IMPORTED_MODULE_9_date_fns_format___default()(new Date(), 'YYYY-MM-DD')) res.send(result.ops[0]);else res.send('added successfully!');\n  });\n});\n\napp.post('/insertTags', (req, res) => {\n  const query = { wis: req.body.wis };\n  const addOrUpdateTag = tag => db.collection('tagsInfo').find({ wis: req.body.wis, label: tag }).count((err, doc) => {\n    if (doc === 0) {\n      db.collection('tagsInfo').insertOne({ label: tag, number: 1, wis: req.body.wis });\n    } else {\n      db.collection('tagsInfo').update({ label: tag }, { $inc: { number: 1 } });\n    }\n  });\n  __WEBPACK_IMPORTED_MODULE_8_ramda__[\"forEach\"](addOrUpdateTag, req.body.tags);\n  db.collection('tagsInfo').find(query).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(doc);\n  });\n});\n\napp.post('/insertLogToNextDay', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) logger(err);\n    res.send(result.ops[0]);\n  });\n});\n\napp.post('/deleteLog', (req, res) => {\n  const query = { _id: Object(__WEBPACK_IMPORTED_MODULE_7_mongodb__[\"ObjectID\"])(req.query._id) };\n  db.collection('logsInfo').remove(query, err => {\n    if (err) logger(err);\n    res.send('deleted successfully!');\n  });\n});\n\napp.post('/saveStartTime', (req, res) => {\n  db.collection('logsInfo').update({ _id: Object(__WEBPACK_IMPORTED_MODULE_7_mongodb__[\"ObjectID\"])(req.body._id) }, { $push: { times: { start: req.body.startTime, end: 'running' } } }, err => {\n    if (err) logger(err);\n    res.send('start time updated!');\n  });\n});\n\napp.post('/saveEndTime', (req, res) => {\n  db.collection('logsInfo').update({ _id: Object(__WEBPACK_IMPORTED_MODULE_7_mongodb__[\"ObjectID\"])(req.body._id), 'times.end': 'running' }, { $set: { 'times.$.end': req.body.endTime } }, err => {\n    if (err) logger(err);\n    res.send('end time updated!');\n  });\n});\n\napp.post('/todayTotalDuration', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    date: req.body.date\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.send(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"a\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"c\" /* sumLogs */])(doc), 'Home'));\n  });\n});\n\napp.post('/thisWeekTotalDurations', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }]\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.send(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"a\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"c\" /* sumLogs */])(doc), 'Home'));\n  });\n});\n\napp.post('/thisMonthTotalDurations', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }]\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.send(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"a\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"c\" /* sumLogs */])(doc), 'Home'));\n  });\n});\n\napp.get('/fetchPreviousDayData', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(doc);\n  });\n});\n\napp.get('/fetchNextDayData', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.json(doc);\n  });\n});\n\napp.get('/calculateTotalDuration', (req, res) => {\n  let query = null;\n  if (!req.query.selectedTags) {\n    query = {\n      wis: req.query.wis,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else if (Array.isArray(req.query.selectedTags)) {\n    query = {\n      wis: req.query.wis,\n      tags: { $in: req.query.selectedTags },\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else {\n    query = {\n      wis: req.query.wis,\n      tags: req.query.selectedTags,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  }\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.send(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"a\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"c\" /* sumLogs */])(doc), 'Report'));\n  });\n});\n\napp.get('/convertJSONToCSV', (req, res) => {\n  let query = null;\n  if (!req.query.selectedTags) {\n    query = {\n      wis: req.query.wis,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else if (Array.isArray(req.query.selectedTags)) {\n    query = {\n      wis: req.query.wis,\n      tags: { $in: req.query.selectedTags },\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else {\n    query = {\n      wis: req.query.wis,\n      tags: req.query.selectedTags,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  }\n  db.collection('logsInfo').find(query).sort({ date: -1 }).toArray((err, doc) => {\n    if (err) logger(err);\n    let docFormatted = __WEBPACK_IMPORTED_MODULE_8_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_8_ramda__[\"dissoc\"]('times', __WEBPACK_IMPORTED_MODULE_8_ramda__[\"assoc\"]('duration', Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"a\" /* formattedSeconds */])(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"d\" /* sumTimes */])(log.times), 'Home'), log)), doc);\n    const tagsLens = __WEBPACK_IMPORTED_MODULE_8_ramda__[\"lensProp\"]('tags');\n    docFormatted = __WEBPACK_IMPORTED_MODULE_8_ramda__[\"map\"](log => __WEBPACK_IMPORTED_MODULE_8_ramda__[\"set\"](tagsLens, Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"b\" /* formattedTags */])(log.tags), log), docFormatted);\n    const fields = ['title', 'tags', 'duration', 'date'];\n    __WEBPACK_IMPORTED_MODULE_3_json2csv___default()({ data: docFormatted, fields }, (error, csv) => {\n      res.setHeader('Content-disposition', 'attachment; filename=data.csv');\n      res.set('Content-Type', 'text/csv');\n      res.status(200).send(csv);\n    });\n  });\n});\n\napp.get('/barChartData', (req, res) => {\n  const query = {\n    wis: req.query.wis,\n    $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n  };\n  let dates = Array(__WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_days___default()(new Date(req.query.endDate), new Date(req.query.startDate)) + 1).fill(req.query.startDate);\n  dates = dates.map((date, index) => __WEBPACK_IMPORTED_MODULE_9_date_fns_format___default()(__WEBPACK_IMPORTED_MODULE_11_date_fns_add_days___default()(new Date(date), index), 'YYYY-MM-DD'));\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) logger(err);\n    res.send(__WEBPACK_IMPORTED_MODULE_8_ramda__[\"map\"](date => ({\n      name: date,\n      duration: Math.floor(Object(__WEBPACK_IMPORTED_MODULE_12__server_helper__[\"c\" /* sumLogs */])(__WEBPACK_IMPORTED_MODULE_8_ramda__[\"filter\"](log => log.date === date, doc)) / 60) }), dates));\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./server.js\n// module id = ./server.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./server.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./server.js */\"./server.js\");\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./server.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./server.js?");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"fs\"\n// module id = fs\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"https\"\n// module id = https\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22https%22?");

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

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! dynamic exports provided */
/*! exports used: MongoClient, ObjectID */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongodb\"\n// module id = mongodb\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"path\"\n// module id = path\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22path%22?");

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