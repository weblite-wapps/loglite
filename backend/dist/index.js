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
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("// modules\nconst R = __webpack_require__(/*! ramda */ \"ramda\");\nvar isAfter = __webpack_require__(/*! date-fns/is_after */ \"date-fns/is_after\");\nvar differenceInSeconds = __webpack_require__(/*! date-fns/difference_in_seconds */ \"date-fns/difference_in_seconds\");\n\nconst sumTimes = times => R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times);\n\nexports.sumTimes = times => R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times);\n\nexports.sumLogs = logs => R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs);\n\nexports.formattedSeconds = (seconds, pageName) => {\n  if (pageName === 'Home') {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `${Math.floor(seconds / 3600)}h` : `${Math.floor(seconds / 3600)}h${Math.floor(seconds % 3600 / 60)}m`;\n  } else {\n    if (Math.floor(seconds / 3600) === 0) {\n      return `Total: ${Math.floor(seconds / 60)}m`;\n    }\n    return Math.floor(seconds % 3600 / 60) === 0 ? `Total: ${Math.floor(seconds / 3600)}h` : `Total: ${Math.floor(seconds / 3600)}h${Math.floor(seconds % 3600 / 60)}m`;\n  }\n};\n\nexports.formattedTags = tags => R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags));\n\n//////////////////\n// WEBPACK FOOTER\n// ./server.helper.js\n// module id = ./server.helper.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server.helper.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("// helpers\nconst sumLogs = __webpack_require__(/*! ./server.helper */ \"./server.helper.js\").sumLogs;\nconst sumTimes = __webpack_require__(/*! ./server.helper */ \"./server.helper.js\").sumTimes;\nconst formattedSeconds = __webpack_require__(/*! ./server.helper */ \"./server.helper.js\").formattedSeconds;\nconst formattedTags = __webpack_require__(/*! ./server.helper */ \"./server.helper.js\").formattedTags;\nvar format = __webpack_require__(/*! date-fns/format */ \"date-fns/format\");\nvar differenceInDays = __webpack_require__(/*! date-fns/difference_in_days */ \"date-fns/difference_in_days\");\nvar addDays = __webpack_require__(/*! date-fns/add_days */ \"date-fns/add_days\");\n// modules\nconst path = __webpack_require__(/*! path */ \"path\");\nconst https = __webpack_require__(/*! https */ \"https\");\nconst R = __webpack_require__(/*! ramda */ \"ramda\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nvar json2csv = __webpack_require__(/*! json2csv */ \"json2csv\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nconst MongoClient = __webpack_require__(/*! mongodb */ \"mongodb\").MongoClient;\nconst ObjectID = __webpack_require__(/*! mongodb */ \"mongodb\").ObjectID;\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst privateKey = fs.readFileSync(path.resolve('./src/certs/express.key'), 'utf8');\nconst certificate = fs.readFileSync(path.resolve('./src/certs/express.crt'), 'utf8');\n\nconst credentials = { key: privateKey, cert: certificate };\napp.use(cors({\n  origin: '*'\n}));\nvar httpsServer = https.createServer(credentials, app);\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\napp.use(bodyParser.json()); // support json encoded bodies\napp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies\n\n// Handler for internal server errors\nfunction errorHandler(err, req, res, next) {\n  console.log(err.message);\n  console.log(err.stack);\n  res.status(500);\n  res.render('error_template', { error: err });\n}\napp.use(errorHandler);\n\nvar db;\nMongoClient.connect('mongodb://localhost:27017/LogLite', (err, database) => {\n  if (err) throw err.message;\n  db = database;\n  httpsServer.listen(3080);\n});\n\napp.get('/', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).sort({ date: -1 }).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(R.reverse(doc));\n  });\n});\n\napp.get('/fetchTags', (req, res) => {\n  const query = { wis: req.query.wis };\n  db.collection('tagsInfo').find(query).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(doc);\n  });\n});\n\napp.get('/serachTags', (req, res) => {\n  db.collection('tagsInfo').find({ wis: req.query.wis, label: { $regex: \".*\" + req.query.label + \".*\" } }).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(doc);\n  });\n});\n\napp.post('/insertLog', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) return console.log(err);\n    res.send(result.ops[0]);\n  });\n});\n\napp.post('/insertCustomLog', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) return console.log(err);\n    if (result.ops[0].date === format(new Date(), 'YYYY-MM-DD')) res.send(result.ops[0]);else res.send('added successfully!');\n  });\n});\n\napp.post('/insertTags', (req, res) => {\n  const query = { wis: req.body.wis };\n  var addOrUpdateTag = tag => db.collection('tagsInfo').find({ wis: req.body.wis, label: tag }).count((err, doc) => {\n    doc === 0 ? db.collection('tagsInfo').insertOne({ label: tag, number: 1, wis: req.body.wis }) : db.collection('tagsInfo').update({ label: tag }, { $inc: { number: 1 } });\n  });\n  R.forEach(addOrUpdateTag, req.body.tags);\n  db.collection('tagsInfo').find(query).sort({ number: -1 }).limit(5).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(doc);\n  });\n});\n\napp.post('/insertLogToNextDay', (req, res) => {\n  db.collection('logsInfo').insertOne(req.body, (err, result) => {\n    if (err) return console.log(err);\n    res.send(result.ops[0]);\n  });\n});\n\napp.post('/deleteLog', (req, res) => {\n  query = { _id: ObjectID(req.query._id) };\n  db.collection('logsInfo').remove(query, (err, result) => {\n    if (err) throw err;\n    res.send('deleted successfully!');\n  });\n});\n\napp.post('/saveStartTime', (req, res) => {\n  db.collection(\"logsInfo\").update({ _id: ObjectID(req.body._id) }, { $push: { times: { start: req.body.startTime, end: 'running' } } }, function (err, result) {\n    if (err) throw err;\n    res.send('start time updated!');\n  });\n});\n\napp.post('/saveEndTime', (req, res) => {\n  db.collection(\"logsInfo\").update({ _id: ObjectID(req.body._id), \"times.end\": 'running' }, { $set: { \"times.$.end\": req.body.endTime } }, function (err, result) {\n    if (err) throw err;\n    res.send('end time updated!');\n  });\n});\n\napp.post('/todayTotalDuration', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    date: req.body.date\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.send(formattedSeconds(sumLogs(doc), 'Home'));\n  });\n});\n\napp.post('/thisWeekTotalDurations', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }]\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.send(formattedSeconds(sumLogs(doc), 'Home'));\n  });\n});\n\napp.post('/thisMonthTotalDurations', (req, res) => {\n  const query = {\n    wis: req.body.wis,\n    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }]\n  };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.send(formattedSeconds(sumLogs(doc), 'Home'));\n  });\n});\n\napp.get('/fetchPreviousDayData', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(doc);\n  });\n});\n\napp.get('/fetchNextDayData', (req, res) => {\n  const query = { wis: req.query.wis, date: req.query.date };\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.json(doc);\n  });\n});\n\napp.get('/calculateTotalDuration', (req, res) => {\n  var query = null;\n  if (!req.query.selectedTags) {\n    query = {\n      wis: req.query.wis,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else if (Array.isArray(req.query.selectedTags)) {\n    query = {\n      wis: req.query.wis,\n      tags: { $in: req.query.selectedTags },\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else {\n    query = {\n      wis: req.query.wis,\n      tags: req.query.selectedTags,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  }\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.send(formattedSeconds(sumLogs(doc), 'Report'));\n  });\n});\n\napp.get('/convertJSONToCSV', (req, res) => {\n  var query = null;\n  if (!req.query.selectedTags) {\n    query = {\n      wis: req.query.wis,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else if (Array.isArray(req.query.selectedTags)) {\n    query = {\n      wis: req.query.wis,\n      tags: { $in: req.query.selectedTags },\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  } else {\n    query = {\n      wis: req.query.wis,\n      tags: req.query.selectedTags,\n      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n    };\n  }\n  db.collection('logsInfo').find(query).sort({ date: -1 }).toArray((err, doc) => {\n    var docFormatted = R.map(log => R.dissoc('times', R.assoc('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)), doc);\n    const tagsLens = R.lensProp('tags');\n    docFormatted = R.map(log => R.set(tagsLens, formattedTags(log.tags), log), docFormatted);\n    var fields = ['title', 'tags', 'duration', 'date'];\n    json2csv({ data: docFormatted, fields: fields }, function (err, csv) {\n      res.setHeader('Content-disposition', 'attachment; filename=data.csv');\n      res.set('Content-Type', 'text/csv');\n      res.status(200).send(csv);\n    });\n  });\n});\n\napp.get('/barChartData', (req, res) => {\n  var query = {\n    wis: req.query.wis,\n    $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }]\n  };\n  var dates = Array(differenceInDays(new Date(req.query.endDate), new Date(req.query.startDate)) + 1).fill(req.query.startDate);\n  dates = dates.map((date, index) => format(addDays(new Date(date), index), 'YYYY-MM-DD'));\n  db.collection('logsInfo').find(query).toArray((err, doc) => {\n    if (err) throw err;\n    res.send(R.map(date => ({ name: date, duration: Math.floor(sumLogs(R.filter(log => log.date === date, doc)) / 60) }), dates));\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./server.js\n// module id = ./server.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server.js?");

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
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = body-parser\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"cors\"\n// module id = cors\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "date-fns/add_days":
/*!************************************!*\
  !*** external "date-fns/add_days" ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/add_days\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/add_days\"\n// module id = date-fns/add_days\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/add_days%22?");

/***/ }),

/***/ "date-fns/difference_in_days":
/*!**********************************************!*\
  !*** external "date-fns/difference_in_days" ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/difference_in_days\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/difference_in_days\"\n// module id = date-fns/difference_in_days\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/difference_in_days%22?");

/***/ }),

/***/ "date-fns/difference_in_seconds":
/*!*************************************************!*\
  !*** external "date-fns/difference_in_seconds" ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/difference_in_seconds\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/difference_in_seconds\"\n// module id = date-fns/difference_in_seconds\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/difference_in_seconds%22?");

/***/ }),

/***/ "date-fns/format":
/*!**********************************!*\
  !*** external "date-fns/format" ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/format\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/format\"\n// module id = date-fns/format\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/format%22?");

/***/ }),

/***/ "date-fns/is_after":
/*!************************************!*\
  !*** external "date-fns/is_after" ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns/is_after\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"date-fns/is_after\"\n// module id = date-fns/is_after\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22date-fns/is_after%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = express\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"fs\"\n// module id = fs\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"https\"\n// module id = https\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "json2csv":
/*!***************************!*\
  !*** external "json2csv" ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"json2csv\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"json2csv\"\n// module id = json2csv\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22json2csv%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongodb\"\n// module id = mongodb\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"path\"\n// module id = path\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"ramda\"\n// module id = ramda\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ });