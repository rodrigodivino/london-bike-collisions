(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return l(8335)}])},8335:function(e,n,l){"use strict";l.r(n),l.d(n,{default:function(){return S}});var o,r=l(5893),i=l(9008),t=l(214),a=l.n(t),s=l(5152),d=(0,s.default)((function(){return Promise.all([l.e(269),l.e(542)]).then(l.bind(l,9542))}),{loadableGenerated:{webpack:function(){return[9542]}},ssr:!1}),c=l(7294),u=l(6559),f=(0,s.default)((function(){return l.e(44).then(l.bind(l,44))}),{loadableGenerated:{webpack:function(){return[44]}},ssr:!1}),v=(0,s.default)((function(){return Promise.all([l.e(269),l.e(277)]).then(l.bind(l,7277))}),{loadableGenerated:{webpack:function(){return[7277]}},ssr:!1});!function(e){e.fatal="fatal",e.serious="serious",e.slight="slight"}(o||(o={}));var h,_,g=l(8421),m=l.n(g);(function(e){e.DISCRETE_COLOR="DISCRETE_COLOR",e.SHAPE="SHAPE"})((_=h||(h={})).LegendMode||(_.LegendMode={})),_.isMode=function(e,n){return n.mode===e};var b=h.LegendMode,y=function(e){var n=e.legendStore,l=e.$onLegendClick$,o=Object.values(n).sort((function(e,n){return(0,u.j2p)(e.mode,n.mode)})),i=function(e,n){var o;(null===e||void 0===e||null===(o=e.options)||void 0===o?void 0:o.disabledIsClickable)&&(null===l||void 0===l||l(e,n))},t=function(e){return e?m().clickable:""};return(0,r.jsx)("div",{className:m().container,children:(0,r.jsx)("div",{className:m().legendPane,children:o.map((function(e){return(0,r.jsxs)("div",{className:m().legendBox,children:[(0,r.jsx)("span",{className:m().legendTitle,children:e.title}),function(){var n,l,o;if(null===e||void 0===e||null===(n=e.options)||void 0===n?void 0:n.disabled)return(0,r.jsx)("div",{className:"".concat(m().disabledMessage," ").concat(t(null===e||void 0===e||null===(l=e.options)||void 0===l?void 0:l.disabledIsClickable)),onClick:function(){return i(e,null)},children:(0,r.jsx)("span",{children:null!==(o=null===e||void 0===e?void 0:e.options.disabledMessage)&&void 0!==o?o:""})});if(h.isMode(b.DISCRETE_COLOR,e))return e.data.map((function(n){var l;return(0,r.jsxs)("div",{onClick:function(){return i(e,null)},className:"".concat(m().colorLegendLine," ").concat(t(null===e||void 0===e||null===(l=e.options)||void 0===l?void 0:l.isClickable)),children:[(0,r.jsx)("div",{className:m().colorLegendLineColor,style:{backgroundColor:n.color}}),(0,r.jsxs)("div",{className:m().colorLegendLineLabel,children:[" ",n.label," "]})]},n.label)}));if(h.isMode(b.SHAPE,e))return e.data.map((function(n){var l;return(0,r.jsxs)("div",{onClick:function(){return i(e,null)},className:"".concat(m().markerLegendLine," ").concat(t(null===e||void 0===e||null===(l=e.options)||void 0===l?void 0:l.isClickable)),children:[n.shape,(0,r.jsxs)("div",{className:m().markerLegendLabel,children:[" ",n.label]})]},n.label)}));throw new Error("Legend type ".concat(e.mode," not supported"))}(),(0,r.jsx)("hr",{})]},e.id)}))})})};function p(e,n,l){return n in e?Object.defineProperty(e,n,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[n]=l,e}var L=function(){var e=(0,c.useState)({}),n=e[0],l=e[1];return[n,(0,c.useCallback)((function(e){l((function(n){return JSON.stringify(n[e.id])===JSON.stringify(e)?n:(n[e.id]=e,function(e){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{},o=Object.keys(l);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(l).filter((function(e){return Object.getOwnPropertyDescriptor(l,e).enumerable})))),o.forEach((function(n){p(e,n,l[n])}))}return e}({},n))}))}),[])]},j=l(1203);function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var l=0,o=new Array(n);l<n;l++)o[l]=e[l];return o}function C(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var o,r,i=[],t=!0,a=!1;try{for(l=l.call(e);!(t=(o=l.next()).done)&&(i.push(o.value),!n||i.length!==n);t=!0);}catch(s){a=!0,r=s}finally{try{t||null==l.return||l.return()}finally{if(a)throw r}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return x(e,n);var l=Object.prototype.toString.call(e).slice(8,-1);"Object"===l&&e.constructor&&(l=e.constructor.name);if("Map"===l||"Set"===l)return Array.from(l);if("Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return x(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var k=h.LegendMode,N={lat:51.507359,lng:-.126439},S=function(){console.log("process.env.NODE_ENV","production");var e=function(e){var n=(0,c.useState)(),l=n[0],o=n[1];return(0,c.useEffect)((function(){(0,u.gyn)(e,u.rA8).then((function(e){o(e)}))}),[e]),l}("/bike_collisions.csv"),n=C(L(),2),l=n[0],t=n[1],s=(0,c.useContext)(j.X)[0],h=(0,c.useCallback)((function(e){t({mode:k.DISCRETE_COLOR,id:"heatmap",title:"N\xba of Collisions",data:e.filter((function(e){return!(e.threshold.includes(1/0)||e.threshold.includes(-1/0))})).map((function(e){return{label:"".concat(e.threshold[0]," to ").concat(e.threshold[1]),color:e.color}}))})}),[t]),_=(0,c.useCallback)((function(e){t({mode:k.SHAPE,data:e,id:"markers",title:"Collision Location",options:{disabled:0===e.length,disabledMessage:"Zoom to see",disabledIsClickable:!0}})}),[t]),g=(0,c.useCallback)((function(e){var n,l,o;"markers"===e.id&&(null===e||void 0===e||null===(n=e.options)||void 0===n?void 0:n.disabled)&&(null===s||void 0===s||null===(l=s.mapRef)||void 0===l||null===(o=l.current)||void 0===o||o.setZoom(15))}),[null===s||void 0===s?void 0:s.mapRef]),m=(0,c.useMemo)((function(){return null===e||void 0===e?void 0:e.filter((function(e){return e.Severity!==o.slight}))}),[e]),b=(0,c.useMemo)((function(){return e}),[e]),p=(0,r.jsxs)("main",{className:a().main,children:[(0,r.jsxs)("div",{className:a().header,children:[(0,r.jsx)("h1",{className:a().title,children:"Bicycle collisions in london between 2005 and 2019"}),(0,r.jsx)("h2",{className:a().subtitle,children:"A look at the routes that have been dangerous for cyclists"})]}),(0,r.jsx)("div",{className:a().layerContainer,children:(0,r.jsx)("div",{className:a().interactiveLayer,children:(0,r.jsxs)(d,{initialCenter:N,initialZoom:12,children:[(0,r.jsx)("div",{className:a().layer,children:(0,r.jsx)(v,{$onColorLegendData$:h,data:null!==b&&void 0!==b?b:[]})}),(0,r.jsx)("div",{className:a().layer,children:(0,r.jsx)(f,{$onShapeLegendData$:_,data:null!==m&&void 0!==m?m:[]})}),(0,r.jsx)("div",{className:a().layer,children:(0,r.jsx)(y,{$onLegendClick$:g,legendStore:l})})]})})})]}),x=(0,r.jsx)("p",{children:"Loading"});return(0,r.jsxs)("div",{className:a().root,children:[(0,r.jsxs)(i.default,{children:[(0,r.jsx)("title",{children:"London Bike Collisions"}),(0,r.jsx)("meta",{name:"description",content:"London Bike Collisions Data Visualization"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",integrity:"sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==",crossOrigin:""})]}),e&&e.length>0?p:x,(0,r.jsxs)("footer",{className:a().footer,children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("b",{children:"Data:"})," ",(0,r.jsx)("a",{href:"https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567",children:"Bike Collisions in London"})," (2005-2019). \xa0",(0,r.jsx)("b",{children:"Data Source:"})," ",(0,r.jsx)("a",{href:"https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567",children:"CycleStreets"}),"."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("b",{children:"Design:"})," Rodrigo Divino. \xa0 ",(0,r.jsx)("b",{children:"Implementation:"})," Rodrigo Divino."]})]})]})}},8421:function(e){e.exports={container:"legends-overlay_container__yJ7pk",legendPane:"legends-overlay_legendPane__CqVjA",legendBox:"legends-overlay_legendBox__5qKB_",legendTitle:"legends-overlay_legendTitle__j41nx",colorLegendLine:"legends-overlay_colorLegendLine__TfFVP",colorLegendLineColor:"legends-overlay_colorLegendLineColor__KNbPj",colorLegendLineLabel:"legends-overlay_colorLegendLineLabel__osJua",markerLegend:"legends-overlay_markerLegend__omgF_",markerLegendLine:"legends-overlay_markerLegendLine__VWNGl",markerLegendLabel:"legends-overlay_markerLegendLabel__PZSWp",disabledMessage:"legends-overlay_disabledMessage__KpqgI",clickable:"legends-overlay_clickable__sM263"}},214:function(e){e.exports={root:"Home_root__wfVGa",main:"Home_main__nLjiQ",subtitle:"Home_subtitle__j4GMd",footer:"Home_footer____T7K",header:"Home_header__GCVRv",layerContainer:"Home_layerContainer__Lz_ve",interactiveLayer:"Home_interactiveLayer__qSzhN",layer:"Home_layer__JzMU_",svg:"Home_svg__F9k3h",canvas:"Home_canvas__x616u"}}},function(e){e.O(0,[774,561,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);