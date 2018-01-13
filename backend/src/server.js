// helpers
const sumLogs = require('./server.helper').sumLogs
const sumTimes = require('./server.helper').sumTimes
const formattedSeconds = require('./server.helper').formattedSeconds
const formattedTags = require('./server.helper').formattedTags
var format = require('date-fns/format')
var differenceInDays = require('date-fns/difference_in_days')
var addDays = require('date-fns/add_days')
// modules
const path = require('path')
const https = require('https')
const R = require('ramda')
const express = require('express')
const app = express()
var json2csv = require('json2csv')
var fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require("mongodb").ObjectID
const cors = require('cors')
const privateKey  = fs.readFileSync(path.resolve(__dirname, 'certs/express.key'), 'utf8')
const certificate = fs.readFileSync(path.resolve(__dirname, 'certs/express.crt'), 'utf8')

const credentials = { key: privateKey, cert: certificate }
app.use(cors({
  origin: '*',
}))
var httpsServer = https.createServer(credentials, app)

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.log(err.message)
  console.log(err.stack)
  res.status(500);
  res.render('error_template', { error: err})
}
app.use(errorHandler)

var db
MongoClient.connect('mongodb://localhost:27017/LogLite', (err, database) => {
  if(err) throw err.message;
  db = database;
  httpsServer.listen(3080)
})



app.get('/', (req, res) => {
  const query = { wis: req.query.wis, date: req.query.date }
  db.collection('logsInfo').find(query).sort({date: -1}).toArray((err, doc) => {
    if(err) throw err
    res.json(R.reverse(doc))
  })
})

app.get('/fetchTags', (req, res) => {
  const query = { wis: req.query.wis }
  db.collection('tagsInfo').find(query).sort({number: -1}).limit(5).toArray((err, doc) => {
    if(err) throw err
    res.json(doc)
  })
})

app.get('/serachTags', (req, res) => {
  db.collection('tagsInfo')
    .find({wis: req.query.wis, label : {$regex : ".*" + req.query.label + ".*" }})
    .sort({number: -1})
    .limit(5)
    .toArray((err, doc) => {
      if(err) throw err
      res.json(doc)
    })
})

app.post('/insertLog', (req, res) => {
  db.collection('logsInfo').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result.ops[0])
  })
})

app.post('/insertCustomLog', (req, res) => {
  db.collection('logsInfo').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    if (result.ops[0].date === format(new Date(), 'YYYY-MM-DD')) res.send(result.ops[0])
    else res.send('added successfully!')
  })
})

app.post('/insertTags', (req, res) => {
  const query = { wis: req.body.wis }
  var addOrUpdateTag = tag =>
    db.collection('tagsInfo').find({wis: req.body.wis, label: tag}).count((err, doc) => {
      doc === 0 ?
      db.collection('tagsInfo').insertOne({ label: tag, number:1, wis: req.body.wis }) :
      db.collection('tagsInfo').update({ label: tag }, { $inc: { number: 1 } })
    })
  R.forEach(addOrUpdateTag, req.body.tags)
  db.collection('tagsInfo').find(query).sort({number: -1}).limit(5).toArray((err, doc) => {
    if(err) throw err
    res.json(doc)
  })
})

app.post('/insertLogToNextDay', (req, res) => {
  db.collection('logsInfo').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result.ops[0])
  })
})

app.post('/deleteLog', (req, res) => {
  query = { _id: ObjectID(req.query._id) }
  db.collection('logsInfo').remove(query, (err, result) => {
    if(err) throw err
    res.send('deleted successfully!')
  })
})

app.post('/saveStartTime', (req, res) => {
  db.collection("logsInfo").update({ _id: ObjectID(req.body._id) }, { $push: { times: {start: req.body.startTime, end: 'running'} } }, function(err, result) {
    if(err) throw err
    res.send('start time updated!')
  })
})

app.post('/saveEndTime', (req, res) => {
  db.collection("logsInfo").update({ _id: ObjectID(req.body._id), "times.end": 'running' }, { $set: { "times.$.end" : req.body.endTime } } , function(err, result) {
    if(err) throw err
    res.send('end time updated!')
  })
})

app.post('/todayTotalDuration', (req, res) => {
  const query = {
    wis: req.body.wis,
    date: req.body.date,
  }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.send(formattedSeconds(sumLogs(doc), 'Home'))
  })
})

app.post('/thisWeekTotalDurations', (req, res) => {
  const query = {
    wis: req.body.wis,
    $and: [ { date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } } ]
  }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.send(formattedSeconds(sumLogs(doc), 'Home'))
  })
})

app.post('/thisMonthTotalDurations', (req, res) => {
  const query = {
    wis: req.body.wis,
    $and: [ { date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } } ]
  }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.send(formattedSeconds(sumLogs(doc), 'Home'))
  })
})

app.get('/fetchPreviousDayData', (req, res) => {
  const query = { wis: req.query.wis, date: req.query.date }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.json(doc)
  })
})


app.get('/fetchNextDayData', (req, res) => {
  const query = { wis: req.query.wis, date: req.query.date }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.json(doc)
  })
})

app.get('/calculateTotalDuration', (req, res) => {
  var query = null
  if (!req.query.selectedTags) {
    query = {
      wis: req.query.wis,
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  } else if (Array.isArray(req.query.selectedTags)) {
    query = {
      wis: req.query.wis,
      tags:{ $in: req.query.selectedTags },
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  } else {
    query = {
      wis: req.query.wis,
      tags: req.query.selectedTags,
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  }
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.send(formattedSeconds(sumLogs(doc), 'Report'))
  })
})

app.get('/convertJSONToCSV', (req, res) => {
  var query = null
  if(!req.query.selectedTags) {
    query = {
      wis: req.query.wis,
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  } else if(Array.isArray(req.query.selectedTags)) {
    query = {
      wis: req.query.wis,
      tags:{ $in: req.query.selectedTags },
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  } else {
    query = {
      wis: req.query.wis,
      tags: req.query.selectedTags,
      $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
    }
  }
  db.collection('logsInfo').find(query).sort({date: -1}).toArray((err, doc) => {
    var docFormatted = R.map(log =>
      R.dissoc('times', R.assoc('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)) ,doc)
    const tagsLens = R.lensProp('tags')
    docFormatted = R.map(log => R.set(tagsLens, formattedTags(log.tags), log), docFormatted)
    var fields = ['title', 'tags', 'duration', 'date']
    json2csv({ data: docFormatted, fields: fields }, function(err, csv) {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv')
      res.set('Content-Type', 'text/csv')
      res.status(200).send(csv)
    })
  })
})

app.get('/barChartData', (req, res) => {
  var query = {
    wis: req.query.wis,
    $and: [ { date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } } ]
  }
  var dates = Array(
    differenceInDays(new Date(req.query.endDate), new Date(req.query.startDate)) + 1)
    .fill(req.query.startDate)
  dates = dates.map((date, index) =>
    format(addDays(new Date(date), index), 'YYYY-MM-DD'))
  db.collection('logsInfo').find(query).toArray((err, doc) => {
    if(err) throw err
    res.send(
      R.map(date => ({ name: date, duration: Math.floor(sumLogs(R.filter(log => log.date === date, doc)) / 60) }), dates)
    )
  })
})
