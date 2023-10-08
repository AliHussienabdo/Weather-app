/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_apis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/apis.js */ \"./src/modules/apis.js\");\n/* harmony import */ var _modules_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/dom.js */ \"./src/modules/dom.js\");\n\r\n\r\n\r\nwindow.addEventListener('load',async() =>{\r\n    let Loc = await (0,_modules_apis_js__WEBPACK_IMPORTED_MODULE_0__.getLocation)();\r\n    await (0,_modules_apis_js__WEBPACK_IMPORTED_MODULE_0__.doFetch)(Loc);\r\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderDom)();\r\n});\r\n\r\nconst search = document.querySelector('.search-btn');\r\nconst input = document.querySelector('.input-txt');\r\nconst ToggleDegree = document.querySelector('#toggle-degree');\r\n\r\nsearch.addEventListener('click',(e) => {\r\n    e.preventDefault();\r\n    if(input.value != ''){\r\n        (0,_modules_apis_js__WEBPACK_IMPORTED_MODULE_0__.doFetch)(input.value).then(() => {\r\n            (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_1__.clearDom)();\r\n            (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderDom)();\r\n        });\r\n    }\r\n});\r\n\r\nToggleDegree.addEventListener('click', () => {\r\n    (0,_modules_dom_js__WEBPACK_IMPORTED_MODULE_1__.toggleTemp)();\r\n    if(ToggleDegree.innerHTML == 'to F<sup>o</sup>'){\r\n        ToggleDegree.innerHTML = 'to C<sup>o</sup>';\r\n    }\r\n    else {\r\n        ToggleDegree.innerHTML = 'to F<sup>o</sup>';\r\n    }\r\n})\r\n\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/apis.js":
/*!*****************************!*\
  !*** ./src/modules/apis.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HourlyInfo: () => (/* binding */ HourlyInfo),\n/* harmony export */   TodayInfo: () => (/* binding */ TodayInfo),\n/* harmony export */   WeekInfo: () => (/* binding */ WeekInfo),\n/* harmony export */   doFetch: () => (/* binding */ doFetch),\n/* harmony export */   generalInfo: () => (/* binding */ generalInfo),\n/* harmony export */   getLocation: () => (/* binding */ getLocation)\n/* harmony export */ });\nlet generalInfo = {};\r\nlet TodayInfo = {};\r\nlet WeekInfo = [];\r\nlet HourlyInfo = [];\r\n\r\nasync function getLocation() {\r\n  try {\r\n    let response = await fetch(\r\n      \"https://api.geoapify.com/v1/ipinfo?apiKey=7027fd9accb146f2a3027aefdc0b563b\"\r\n    );\r\n    response = await response.json();\r\n    return response.city.name;\r\n\r\n  } catch (err) {\r\n    console.log(err);\r\n  }\r\n}\r\n\r\nasync function doFetch(location) {\r\n  try {\r\n    // location = location.replace(/\\s/g,'');\r\n    let response = await fetch(\r\n      `https://api.weatherapi.com/v1/forecast.json?key=279b5151b6ee4b24a54184726230310&q=${location}&days=3&aqi=no&alerts=no`\r\n    );\r\n    response = await response.json();\r\n    console.log(response)\r\n    processJSON(response);\r\n  } catch (err) {\r\n    console.log(err);\r\n  }\r\n}\r\n\r\nfunction processJSON(response) {\r\n  const ForeCast = response.forecast.forecastday;\r\n  const TodayForecast = ForeCast[0];\r\n\r\n  TodayInfo = {\r\n    temp_c: TodayForecast.day.avgtemp_c,\r\n    temp_f: TodayForecast.day.avgtemp_f,\r\n    wind: TodayForecast.day.maxwind_kph,\r\n    humidity: TodayForecast.day.avghumidity,\r\n    rain: TodayForecast.day.daily_chance_of_rain,\r\n    icon: TodayForecast.day.condition.icon,\r\n    condition: TodayForecast.day.condition.text\r\n  };\r\n\r\n  WeekInfo = [];\r\n  ForeCast.forEach((now) =>{\r\n    WeekInfo.push({\r\n      date: now.date,\r\n      temp_c: now.day.avgtemp_c,\r\n      temp_f:now.day.avgtemp_f, \r\n      icon: now.day.condition.icon,\r\n      condition: now.day.condition.text\r\n    });\r\n  }); \r\n\r\n  HourlyInfo = [];\r\n  let hr = 0;\r\n  TodayForecast.hour.forEach((hour) => {\r\n    HourlyInfo.push({\r\n      name: hr++,\r\n      temp_c: hour.temp_c,\r\n      temp_f: hour.temp_f, \r\n      icon: hour.condition.icon,\r\n      condition: hour.condition.text\r\n    });\r\n  });\r\n\r\n  generalInfo = {\r\n    country: response.location.country, \r\n    city: response.location.name,\r\n    date: TodayForecast.date,\r\n    localtime: response.location.localtime,\r\n    // localtime_epoch: response.location.localtime.localtime_epoch\r\n  }\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/modules/apis.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearDom: () => (/* binding */ clearDom),\n/* harmony export */   renderDom: () => (/* binding */ renderDom),\n/* harmony export */   toggleTemp: () => (/* binding */ toggleTemp)\n/* harmony export */ });\n/* harmony import */ var _apis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apis.js */ \"./src/modules/apis.js\");\n\r\n\r\n\r\nlet tempDegree = 'temp_c';\r\nlet degree = 'C';\r\n\r\nconst location = document.getElementById('location');\r\nconst DateAndTime = document.getElementById('date-time');\r\n\r\nconst todayTemp = document.getElementById('today-temp');\r\nconst todayGeneralInfo = document.getElementById('today-general-info');\r\nconst hours = document.getElementById('hourly-info');\r\n\r\nconst week = document.getElementById('week-info');\r\n\r\n\r\nfunction renderDom(){\r\n    renderLocaionDateTime();\r\n    renderToday();\r\n    renderHours();\r\n    renderForcast();\r\n}\r\n\r\n\r\nfunction getDateName(date = new Date(),options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }){\r\n    return date.toLocaleDateString('en-US',options );    \r\n}\r\n\r\nfunction toggleTemp(){\r\n    if(tempDegree === 'temp_c') {\r\n        tempDegree = 'temp_f';\r\n        degree = 'F';\r\n    }\r\n    else {\r\n        tempDegree = 'temp_c';\r\n        degree = 'C';\r\n    }\r\n\r\n    clearDom();\r\n    renderDom();\r\n}\r\n\r\nfunction renderLocaionDateTime(){\r\n    location.innerHTML = `${_apis_js__WEBPACK_IMPORTED_MODULE_0__.generalInfo.city}, ${_apis_js__WEBPACK_IMPORTED_MODULE_0__.generalInfo.country}`;\r\n    let dayName = getDateName(new Date(_apis_js__WEBPACK_IMPORTED_MODULE_0__.generalInfo.localtime));\r\n    DateAndTime.innerHTML = `${dayName}`;\r\n}\r\n\r\nfunction renderToday(){\r\n\r\n    todayTemp.innerHTML = \r\n    `<img src=\"${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo.icon}\"/>\r\n    <p>${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo.condition}</p>\r\n    <p>${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo[tempDegree]} <sup>o</sup>${degree} </p>`\r\n\r\n    todayGeneralInfo.innerHTML = \r\n        `<div class=\"wind\">Wind speed: ${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo.wind} km/h</div>\r\n         <div class=\"humidity\">Humidity: ${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo.humidity} %</div>\r\n         <div class=\"rain\">chance of Rain: ${_apis_js__WEBPACK_IMPORTED_MODULE_0__.TodayInfo.rain} %</div>\r\n        `;\r\n}\r\n\r\nfunction renderHours(){\r\n\r\n    _apis_js__WEBPACK_IMPORTED_MODULE_0__.HourlyInfo.forEach(hour => {\r\n        hours.innerHTML +=\r\n        `<div class=\"hour\">\r\n            <p>${hour.name}</p>\r\n            <p>${hour.condition}</p>\r\n            <img src=\"${hour.icon}\">\r\n            <p>${hour[tempDegree]}<sup>o</sup>${degree} </p>\r\n        </div>`;\r\n    })\r\n\r\n}\r\n\r\nfunction renderForcast(){\r\n\r\n    _apis_js__WEBPACK_IMPORTED_MODULE_0__.WeekInfo.forEach(day => {\r\n        week.innerHTML += \r\n        `<div class=\"day\">\r\n            <p>${getDateName(new Date(day.date), {weekday:'long'})}</p>\r\n            <p>${day.condition}</p>\r\n            <img src=\"${day.icon}\">\r\n            <p>${day[tempDegree]}<sup>o</sup> ${degree} </p>\r\n        </div>`;\r\n    })\r\n}\r\n\r\nfunction clearDom(){\r\n    week.innerHTML = '';\r\n    hours.innerHTML = '';\r\n    todayTemp.innerHTML = '';\r\n    todayGeneralInfo.innerHTML = '';\r\n    location.innerHTML = '';\r\n    DateAndTime.innerHTML = '';\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/modules/dom.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;