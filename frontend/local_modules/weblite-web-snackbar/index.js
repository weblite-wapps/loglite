!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}("undefined"!=typeof self?self:this,function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=0)}({"./components/snackbar.action.js":function(e,r,t){"use strict";t.d(r,"b",function(){return a}),t.d(r,"d",function(){return c}),t.d(r,"a",function(){return s}),t.d(r,"f",function(){return i}),t.d(r,"c",function(){return p}),t.d(r,"e",function(){return d});var n=t("redux-actions"),o=(t.n(n),t("./setup/redux.js")),a="SET_SNACKBAR_OPEN",c=Object(n.createAction)(a,function(e){return{value:e}}),s="PUSH_SNACKBAR_QUEUE",u=Object(n.createAction)(s,function(e){return{message:e}}),i=function(){return o.a.dispatch(u.apply(void 0,arguments))},p="SHIFT_SNACKBAR_QUEUE",d=Object(n.createAction)(p)},"./components/snackbar.container.react.js":function(e,r,t){"use strict";var n=t("react-redux"),o=(t.n(n),t("./components/snackbar.presentational.react.jsx")),a=t("./components/snackbar.action.js"),c=t("./components/snackbar.selector.js"),s=Object(n.connect)(function(e,r){return{open:Object(c.b)(e),message:Object(c.a)(e),location:r.location}},function(e){return{onClose:function(){return e(Object(a.d)(!1))}}})(o.a);r.a=s},"./components/snackbar.effect.js":function(e,r,t){"use strict";var n=t("ramda"),o=(t.n(n),t("redux-observable")),a=(t.n(o),t("rxjs/add/operator/map")),c=(t.n(a),t("rxjs/add/operator/do")),s=(t.n(c),t("rxjs/add/operator/filter")),u=(t.n(s),t("rxjs/add/operator/mapTo")),i=(t.n(u),t("rxjs/add/operator/delay")),p=(t.n(i),t("./components/snackbar.action.js"));r.a=Object(o.combineEpics)(function(e,r){var t=r.getState,o=r.dispatch;return e.ofType(p.b).filter(function(e){return!n.path(["payload","value"])(e)}).delay(400).map(function(){return o(Object(p.e)())}).filter(function(){return 0!==t().snackbar.queue.length}).mapTo(Object(p.d)(!0))},function(e,r){var t=r.getState;return e.ofType(p.a).filter(function(){return!t().snackbar.open}).mapTo(Object(p.d)(!0))})},"./components/snackbar.presentational.react.jsx":function(e,r,t){"use strict";var n=t("react"),o=t.n(n),a=t("prop-types"),c=t.n(a),s=t("material-ui/Snackbar"),u=t.n(s),i=t("material-ui/transitions/Slide"),p=t.n(i),d=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};function f(e){return o.a.createElement(p.a,d({direction:"left"},e))}var l=function(e){var r=e.open,t=e.message,n=e.location,a=e.onClose;return o.a.createElement(u.a,{open:r,message:t.message||"",anchorOrigin:n,autoHideDuration:t.autoHideDuration||3e3,transition:f,onClose:a})};l.propTypes={open:c.a.bool.isRequired,message:c.a.shape({}),location:c.a.shape({}),onClose:c.a.func.isRequired},l.defaultProps={message:{message:""},location:{vertical:"top",horizontal:"right"}},r.a=l},"./components/snackbar.reducer.js":function(e,r,t){"use strict";r.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,r=arguments[1],t=r.type,n=r.payload;return i[t]?i[t](e,n):e};var n,o=t("ramda"),a=(t.n(o),t("./components/snackbar.action.js")),c={queue:[],open:!1},s=o.lensProp("queue"),u=o.lensProp("open"),i=((n={})[a.b]=function(e,r){var t=r.value;return o.set(u,t)(e)},n[a.a]=function(e,r){var t=r.message;return o.over(s,o.append(t))(e)},n[a.c]=function(e){return o.over(s,o.drop(1))(e)},n)},"./components/snackbar.selector.js":function(e,r,t){"use strict";t.d(r,"b",function(){return o}),t.d(r,"a",function(){return a});var n=t("reselect"),o=(t.n(n),function(e){return e.snackbar.open}),a=Object(n.createSelector)([function(e){return e.snackbar.queue}],function(e){return e.length?e[0]:{}})},"./setup/prod.index.js":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("./setup/root.jsx"),o=t("./components/snackbar.action.js");t.d(r,"snackbarMessage",function(){return o.f}),r.default=n.a},"./setup/redux.js":function(e,r,t){"use strict";var n=t("redux"),o=(t.n(n),t("redux-observable")),a=(t.n(o),t("./components/snackbar.effect.js")),c=t("./components/snackbar.reducer.js");r.a=Object(n.createStore)(Object(n.combineReducers)({snackbar:c.a}),Object(n.applyMiddleware)(Object(o.createEpicMiddleware)(a.a)))},"./setup/root.jsx":function(e,r,t){"use strict";var n=t("react"),o=t.n(n),a=t("react-redux"),c=(t.n(a),t("./setup/redux.js")),s=t("./components/snackbar.container.react.js");r.a=function(e){return o.a.createElement(a.Provider,{store:c.a},o.a.createElement(s.a,e))}},0:function(e,r,t){e.exports=t("./setup/prod.index.js")},"material-ui/Snackbar":function(e,r){e.exports=require("material-ui/Snackbar")},"material-ui/transitions/Slide":function(e,r){e.exports=require("material-ui/transitions/Slide")},"prop-types":function(e,r){e.exports=require("prop-types")},ramda:function(e,r){e.exports=require("ramda")},react:function(e,r){e.exports=require("react")},"react-redux":function(e,r){e.exports=require("react-redux")},redux:function(e,r){e.exports=require("redux")},"redux-actions":function(e,r){e.exports=require("redux-actions")},"redux-observable":function(e,r){e.exports=require("redux-observable")},reselect:function(e,r){e.exports=require("reselect")},"rxjs/add/operator/delay":function(e,r){e.exports=require("rxjs/add/operator/delay")},"rxjs/add/operator/do":function(e,r){e.exports=require("rxjs/add/operator/do")},"rxjs/add/operator/filter":function(e,r){e.exports=require("rxjs/add/operator/filter")},"rxjs/add/operator/map":function(e,r){e.exports=require("rxjs/add/operator/map")},"rxjs/add/operator/mapTo":function(e,r){e.exports=require("rxjs/add/operator/mapTo")}})});