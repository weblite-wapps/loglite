!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="/",r(r.s=0)}({"./components/snackbar.action.js":function(e,r,t){"use strict";t.d(r,"b",function(){return a}),t.d(r,"d",function(){return c}),t.d(r,"a",function(){return s}),t.d(r,"f",function(){return i}),t.d(r,"c",function(){return p}),t.d(r,"e",function(){return d});var n=t("redux-actions"),o=(t.n(n),t("./setup/redux.js")),a="SET_SNACKBAR_OPEN",c=Object(n.createAction)(a,function(e){return{value:e}}),s="PUSH_SNACKBAR_QUEUE",u=Object(n.createAction)(s,function(e){return{message:e}}),i=function(){return o.a.dispatch(u.apply(void 0,arguments))},p="SHIFT_SNACKBAR_QUEUE",d=Object(n.createAction)(p)},"./components/snackbar.container.react.js":function(e,r,t){"use strict";var n=t("react-redux"),o=(t.n(n),t("./components/snackbar.presentational.react.jsx")),a=t("./components/snackbar.action.js"),c=t("./components/snackbar.selector.js"),s=Object(n.connect)(function(e){return{open:Object(c.b)(e),message:Object(c.a)(e)}},function(e){return{onRequestClose:function(){return e(Object(a.d)(!1))}}})(o.a);r.a=s},"./components/snackbar.effect.js":function(e,r,t){"use strict";var n=t("ramda"),o=t.n(n),a=t("redux-observable"),c=(t.n(a),t("rxjs/add/operator/map")),s=(t.n(c),t("rxjs/add/operator/do")),u=(t.n(s),t("rxjs/add/operator/filter")),i=(t.n(u),t("rxjs/add/operator/mapTo")),p=(t.n(i),t("rxjs/add/operator/delay")),d=(t.n(p),t("./components/snackbar.action.js"));r.a=Object(a.combineEpics)(function(e,r){var t=r.getState,n=r.dispatch;return e.ofType(d.b).filter(function(e){return!o.a.path(["payload","value"])(e)}).delay(400).map(function(){return n(Object(d.e)())}).filter(function(){return 0!==t().snackbar.queue.length}).mapTo(Object(d.d)(!0))},function(e,r){var t=r.getState;return e.ofType(d.a).filter(function(){return!t().snackbar.open}).mapTo(Object(d.d)(!0))})},"./components/snackbar.presentational.react.jsx":function(e,r,t){"use strict";var n=t("react"),o=t.n(n),a=t("prop-types"),c=t.n(a),s=t("material-ui/Snackbar"),u=t.n(s),i=function(e){var r=e.open,t=e.message,n=e.onRequestClose;return o.a.createElement(u.a,{open:r,message:t.message||"",anchorOrigin:{vertical:"top",horizontal:"right"},autoHideDuration:t.autoHideDuration||3e3,onRequestClose:n})};i.propTypes={open:c.a.bool.isRequired,message:c.a.shape({}),onRequestClose:c.a.func.isRequired},i.defaultProps={message:{message:""}},r.a=i},"./components/snackbar.reducer.js":function(e,r,t){"use strict";r.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,r=arguments[1],t=r.type,n=r.payload;return p[t]?p[t](e,n):e};var n,o=t("ramda"),a=t.n(o),c=t("./components/snackbar.action.js"),s={queue:[],open:!1},u=a.a.lensProp("queue"),i=a.a.lensProp("open"),p=(n={},n[c.b]=function(e,r){var t=r.value;return a.a.set(i,t)(e)},n[c.a]=function(e,r){var t=r.message;return a.a.over(u,a.a.append(t))(e)},n[c.c]=function(e){return a.a.over(u,a.a.drop(1))(e)},n)},"./components/snackbar.selector.js":function(e,r,t){"use strict";t.d(r,"b",function(){return o}),t.d(r,"a",function(){return a});var n=t("reselect"),o=(t.n(n),function(e){return e.snackbar.open}),a=Object(n.createSelector)([function(e){return e.snackbar.queue}],function(e){return e.length?e[0]:{}})},"./setup/prod.index.js":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("./setup/root.jsx"),o=t("./components/snackbar.action.js");t.d(r,"snackbarMessage",function(){return o.f}),r.default=n.a},"./setup/redux.js":function(e,r,t){"use strict";var n=t("redux"),o=(t.n(n),t("redux-observable")),a=(t.n(o),t("./components/snackbar.effect.js")),c=t("./components/snackbar.reducer.js");r.a=Object(n.createStore)(Object(n.combineReducers)({snackbar:c.a}),Object(n.applyMiddleware)(Object(o.createEpicMiddleware)(a.a)))},"./setup/root.jsx":function(e,r,t){"use strict";var n=t("react"),o=t.n(n),a=t("react-redux"),c=(t.n(a),t("./setup/redux.js")),s=t("./components/snackbar.container.react.js");r.a=function(e){return o.a.createElement(a.Provider,{store:c.a},o.a.createElement(s.a,e))}},0:function(e,r,t){e.exports=t("./setup/prod.index.js")},"material-ui/Snackbar":function(e,r){e.exports=require("material-ui/Snackbar")},"prop-types":function(e,r){e.exports=require("prop-types")},ramda:function(e,r){e.exports=require("ramda")},react:function(e,r){e.exports=require("react")},"react-redux":function(e,r){e.exports=require("react-redux")},redux:function(e,r){e.exports=require("redux")},"redux-actions":function(e,r){e.exports=require("redux-actions")},"redux-observable":function(e,r){e.exports=require("redux-observable")},reselect:function(e,r){e.exports=require("reselect")},"rxjs/add/operator/delay":function(e,r){e.exports=require("rxjs/add/operator/delay")},"rxjs/add/operator/do":function(e,r){e.exports=require("rxjs/add/operator/do")},"rxjs/add/operator/filter":function(e,r){e.exports=require("rxjs/add/operator/filter")},"rxjs/add/operator/map":function(e,r){e.exports=require("rxjs/add/operator/map")},"rxjs/add/operator/mapTo":function(e,r){e.exports=require("rxjs/add/operator/mapTo")}})});