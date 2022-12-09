if (self.CavalryLogger) { CavalryLogger.start_js_script(document.currentScript); }/*FB_PKG_DELIM*/

__d("GenderConst",[],(function(a,b,c,d,e,f){e.exports={NOT_A_PERSON:0,FEMALE_SINGULAR:1,MALE_SINGULAR:2,FEMALE_SINGULAR_GUESS:3,MALE_SINGULAR_GUESS:4,MIXED_UNKNOWN:5,NEUTER_SINGULAR:6,UNKNOWN_SINGULAR:7,FEMALE_PLURAL:8,MALE_PLURAL:9,NEUTER_PLURAL:10,UNKNOWN_PLURAL:11}}),null);
__d("IntlVariations",[],(function(a,b,c,d,e,f){e.exports={BITMASK_NUMBER:28,BITMASK_GENDER:3,NUMBER_ZERO:16,NUMBER_ONE:4,NUMBER_TWO:8,NUMBER_FEW:20,NUMBER_MANY:12,NUMBER_OTHER:24,GENDER_MALE:1,GENDER_FEMALE:2,GENDER_UNKNOWN:3}}),null);
__d("UserAgent_DEPRECATED",[],(function(a,b,c,d,e,f){var g=!1,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(g)return;g=!0;var a=navigator.userAgent,b=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(a),c=/(Mac OS X)|(Windows)|(Linux)/.exec(a);s=/\b(iPhone|iP[ao]d)/.exec(a);t=/\b(iP[ao]d)/.exec(a);q=/Android/i.exec(a);u=/FBAN\/\w+;/i.exec(a);v=/FBAN\/mLite;/i.exec(a);w=/Mobile/i.exec(a);r=!!/Win64/.exec(a);if(b){h=b[1]?parseFloat(b[1]):b[5]?parseFloat(b[5]):NaN;h&&document&&document.documentMode&&(h=document.documentMode);var d=/(?:Trident\/(\d+.\d+))/.exec(a);m=d?parseFloat(d[1])+4:h;i=b[2]?parseFloat(b[2]):NaN;j=b[3]?parseFloat(b[3]):NaN;k=b[4]?parseFloat(b[4]):NaN;k?(b=/(?:Chrome\/(\d+\.\d+))/.exec(a),l=b&&b[1]?parseFloat(b[1]):NaN):l=NaN}else h=i=j=l=k=NaN;if(c){if(c[1]){d=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);n=d?parseFloat(d[1].replace("_",".")):!0}else n=!1;o=!!c[2];p=!!c[3]}else n=o=p=!1}function y(){return x()||h}function a(){return x()||m>h}function b(){return y()&&r}function c(){return x()||i}function d(){return x()||j}function z(){return x()||k}function e(){return z()}function A(){return x()||l}function B(){return x()||o}function C(){return x()||n}function D(){return x()||p}function E(){return x()||s}function F(){return x()||s||t||q||w}function G(){return x()||v!=null?null:u}function H(){return x()||q}function I(){return x()||t}f.ie=y;f.ieCompatibilityMode=a;f.ie64=b;f.firefox=c;f.opera=d;f.webkit=z;f.safari=e;f.chrome=A;f.windows=B;f.osx=C;f.linux=D;f.iphone=E;f.mobile=F;f.nativeApp=G;f.android=H;f.ipad=I}),66);
__d("isScalar",[],(function(a,b,c,d,e,f){function a(a){return/string|number|boolean/.test(typeof a)}f["default"]=a}),66);
__d("DOM",["$","DOMQuery","Event","FBLogger","FbtResultBase","HTML","UserAgent_DEPRECATED","createArrayFromMixed","fb-error","isNode","isScalar","isTextNode"],(function(a,b,c,d,e,f,g){a=function(a,b,c){a=document.createElement(a);b&&h.setAttributes(a,b);c!=null&&h.setContent(a,c);return a};var h={find:d("DOMQuery").find,findPushSafe:d("DOMQuery").findPushSafe,scry:d("DOMQuery").scry,getSelection:d("DOMQuery").getSelection,contains:d("DOMQuery").contains,getRootElement:d("DOMQuery").getRootElement,isNodeOfType:d("DOMQuery").isNodeOfType,isInputNode:d("DOMQuery").isInputNode,create:a,setAttributes:function(a,b){b.type&&(a.type=b.type);for(var d in b){var e=b[d],f=/^on/i.test(d);f&&typeof e!=="function"&&c("FBLogger")("dom").warn("Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s",d,typeof e);if(d=="type")continue;else d=="style"?typeof e==="string"?a.style.cssText=e:Object.assign(a.style,e):f?c("Event").listen(a,d.substr(2),e):d in a?a[d]=e:a.setAttribute&&a.setAttribute(d,e)}},prependContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));return j(b,a,function(b){a.firstChild?a.insertBefore(b,a.firstChild):a.appendChild(b)})},insertAfter:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){a.nextSibling?d.insertBefore(b,a.nextSibling):d.appendChild(b)})},insertBefore:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){d.insertBefore(b,a)})},setContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));while(a.firstChild)i(a.firstChild);return h.appendContent(a,b)},appendContent:function(a,b){if(!a)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));return j(b,a,function(b){a.appendChild(b)})},replace:function(a,b){if(!a||!a.parentNode)throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));var d=a.parentNode;return j(b,d,function(b){d.replaceChild(b,a)})},remove:function(a){i(typeof a==="string"?c("$")(a):a)},empty:function(a){a=typeof a==="string"?c("$")(a):a;while(a.firstChild)i(a.firstChild)}};function i(a){a.parentNode&&a.parentNode.removeChild(a)}function j(a,b,e){a=c("HTML").replaceJSONWrapper(a);if(a instanceof c("HTML")&&b.firstChild===null&&-1===a.toString().indexOf("<script")){var f=d("UserAgent_DEPRECATED").ie();if(!f||f>7&&!d("DOMQuery").isNodeOfType(b,["table","tbody","thead","tfoot","tr","select","fieldset"])){var g=f?'<em style="display:none;">&nbsp;</em>':"";b.innerHTML=g+a;f&&b.removeChild(b.firstChild);return Array.from(b.childNodes)}}else if(c("isTextNode")(b)){b.data=a;return[a]}g=document.createDocumentFragment();var h;f=[];b=[];a=c("createArrayFromMixed")(a);a.length===1&&a[0]instanceof c("FbtResultBase")&&(a=a[0].getContents());for(var i=0;i<a.length;i++){h=c("HTML").replaceJSONWrapper(a[i]);if(h instanceof c("HTML")){b.push(h.getAction());var j=h.getNodes();for(var k=0;k<j.length;k++)f.push(j[k]),g.appendChild(j[k])}else if(c("isScalar")(h)||h instanceof c("FbtResultBase")){k=document.createTextNode(h);f.push(k);g.appendChild(k)}else c("isNode")(h)?(f.push(h),g.appendChild(h)):(Array.isArray(h)&&c("FBLogger")("dom").warn("Nest arrays not supported"),h!==null&&c("FBLogger")("dom").warn("No way to set content %s",h))}e(g);b.forEach(function(a){a()});return f}b=h;g["default"]=b}),98);
__d("ArbiterMixin",["Arbiter","guid"],(function(a,b,c,d,e,f,g){var h="arbiter$"+c("guid")(),i=Object.prototype.hasOwnProperty;a={_getArbiterInstance:function(){return i.call(this,h)?this[h]:this[h]=new(c("Arbiter"))()},inform:function(a,b,c){return this._getArbiterInstance().inform(a,b,c)},subscribe:function(a,b,c){return this._getArbiterInstance().subscribe(a,b,c)},subscribeOnce:function(a,b,c){return this._getArbiterInstance().subscribeOnce(a,b,c)},unsubscribe:function(a){this._getArbiterInstance().unsubscribe(a)},unsubscribeCurrentSubscription:function(){this._getArbiterInstance().unsubscribeCurrentSubscription()},releaseCurrentPersistentEvent:function(){this._getArbiterInstance().releaseCurrentPersistentEvent()},registerCallback:function(a,b){return this._getArbiterInstance().registerCallback(a,b)},query:function(a){return this._getArbiterInstance().query(a)}};b=a;g["default"]=b}),98);
__d("mixin",[],(function(a,b,c,d,e,f){function a(){var a=function(){},b=0,c;while(b<0||arguments.length<=b?void 0:arguments[b]){c=b<0||arguments.length<=b?void 0:arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a.prototype[d]=c[d]);b+=1}return a}f["default"]=a}),66);
__d("errorCode",[],(function(a,b,c,d,e,f){"use strict";function a(a){throw new Error('errorCode("'+a+'"): This should not happen. Oh noes!')}f["default"]=a}),66);
__d("FbtTable",["invariant"],(function(a,b,c,d,e,f,g){"use strict";var h={ARG:{INDEX:0,SUBSTITUTION:1},access:function(a,b,c){if(c>=b.length){typeof a==="string"||Array.isArray(a)||g(0,21388,JSON.stringify(a));return a}var d=b[c];d=d[h.ARG.INDEX];if(d==null)return h.access(a,b,c+1);typeof a!=="string"&&!Array.isArray(a)||g(0,20954,typeof a);for(var e=0;e<d.length;++e){var f=a[d[e]];if(f==null)continue;f=h.access(f,b,c+1);if(f!=null)return f}return null}};e.exports=h}),null);
__d("FbtTableAccessor",[],(function(a,b,c,d,e,f){"use strict";a={getEnumResult:function(a){return[[a],null]},getGenderResult:function(a,b,c){return[a,b]},getNumberResult:function(a,b,c){return[a,b]},getSubstitution:function(a){return[null,a]},getPronounResult:function(a){return[[a,"*"],null]}};e.exports=a}),null);
__d("FbtNumberType",["FBLogger","IntlNumberTypeConfig","IntlVariations","createTrustedFunction","createTrustedScriptWithoutValidation_DO_NOT_USE"],(function(a,b,c,d,e,f,g){var h;try{h=c("createTrustedFunction")(c("createTrustedScriptWithoutValidation_DO_NOT_USE")("IntlVariations"),c("createTrustedScriptWithoutValidation_DO_NOT_USE")('"use strict"; return (function(n) {'+c("IntlNumberTypeConfig").impl+"});"))(c("IntlVariations"))}catch(a){throw c("FBLogger")("i18n.error","FbtNumberType").catching(a).mustfixThrow("Unable to create variation number getter. Error=`%s`, IntlNumberTypeConfig=`%s`, IntlVariations=`%s`",a.message||a,JSON.stringify(c("IntlNumberTypeConfig")),JSON.stringify(c("IntlVariations")))}a={getVariation:h};b=a;g["default"]=b}),98);
__d("IntlNumberType",["FbtNumberType"],(function(a,b,c,d,e,f,g){a=function(a){return c("FbtNumberType")};g.get=a}),98);
__d("IntlVariationResolverImpl",["invariant","FbtHooks","IntlNumberType","IntlVariations"],(function(a,b,c,d,e,f,g){var h,i="_1";a={EXACTLY_ONE:i,getNumberVariations:function(a){var c=b("IntlNumberType").get((h||(h=b("FbtHooks"))).getViewerContext().locale).getVariation(a);c&b("IntlVariations").BITMASK_NUMBER||g(0,11647,c,typeof c);return a===1?[i,c,"*"]:[c,"*"]},getGenderVariations:function(a){a&b("IntlVariations").BITMASK_GENDER||g(0,11648,a,typeof a);return[a,"*"]}};e.exports=a}),null);
__d("IntlVariationResolver",["IntlVariationHoldout","IntlVariationResolverImpl"],(function(a,b,c,d,e,f,g){a={getNumberVariations:function(a){return d("IntlVariationHoldout").disable_variation?a===1?[d("IntlVariationResolverImpl").EXACTLY_ONE,"*"]:["*"]:d("IntlVariationResolverImpl").getNumberVariations(a)},getGenderVariations:function(a){return d("IntlVariationHoldout").disable_variation?["*"]:d("IntlVariationResolverImpl").getGenderVariations(a)}};b=a;g["default"]=b}),98);
__d("NumberFormatConsts",["NumberFormatConfig"],(function(a,b,c,d,e,f){a={get:function(a){return b("NumberFormatConfig")}};e.exports=a}),null);
__d("escapeRegex",[],(function(a,b,c,d,e,f){"use strict";function a(a){return a.replace(/([.?*+\^$\[\]\\(){}|\-])/g,"\\$1")}e.exports=a}),null);
__d("intlNumUtils",["FbtHooks","NumberFormatConsts","escapeRegex"],(function(a,b,c,d,e,f){var g,h=3;f=["\u0433\u0440\u043d.","\u0434\u0435\u043d.","\u043b\u0432.","\u043c\u0430\u043d.","\u0564\u0580.","\u062c.\u0645.","\u062f.\u0625.","\u062f.\u0627.","\u062f.\u0628.","\u062f.\u062a.","\u062f.\u062c.","\u062f.\u0639.","\u062f.\u0643.","\u062f.\u0644.","\u062f.\u0645.","\u0631.\u0633.","\u0631.\u0639.","\u0631.\u0642.","\u0631.\u064a.","\u0644.\u0633.","\u0644.\u0644.","\u0783.","B/.","Bs.","Fr.","kr.","L.","p.","S/."];var i={};function j(a){i[a]||(i[a]=new RegExp(a,"i"));return i[a]}var k=j(f.reduce(function(a,c,d){return a+(d?"|":"")+"("+b("escapeRegex")(c)+")"},""));function l(a,c,d,e,f,g,i){d===void 0&&(d="");e===void 0&&(e=".");f===void 0&&(f=0);g===void 0&&(g={primaryGroupSize:h,secondaryGroupSize:h});var k=g.primaryGroupSize||h;g=g.secondaryGroupSize||k;i=i&&i.digits;var l;c==null?l=a.toString():typeof a==="string"?l=r(a,c):l=p(a,c);a=l.split(".");c=a[0];l=a[1];if(Math.abs(parseInt(c,10)).toString().length>=f){a="$1"+d+"$2$3";f="(\\d)(\\d{"+(k-0)+"})($|\\D)";k=c.replace(j(f),a);if(k!=c){c=k;f="(\\d)(\\d{"+(g-0)+"})("+b("escapeRegex")(d)+")";g=j(f);while((k=c.replace(g,a))!=c)c=k}}i!=null&&(c=m(c,i),l=l&&m(l,i));d=c;l&&(d+=e+l);return d}function m(a,b){var c="";for(var d=0;d<a.length;++d){var e=b[a.charCodeAt(d)-48];c+=e!==void 0?e:a[d]}return c}function a(a,c){var d=b("NumberFormatConsts").get((g||(g=b("FbtHooks"))).getViewerContext().locale);return l(a,c,"",d.decimalSeparator,d.minDigitsForThousandsSeparator,d.standardDecimalPatternInfo,d.numberingSystemData)}function n(a,c){var d=b("NumberFormatConsts").get((g||(g=b("FbtHooks"))).getViewerContext().locale);return l(a,c,d.numberDelimiter,d.decimalSeparator,d.minDigitsForThousandsSeparator,d.standardDecimalPatternInfo,d.numberingSystemData)}function o(a){return a&&Math.floor(Math.log10(Math.abs(a)))}function c(a,b,c){var d=o(a),e=a;d<c&&(e=a*Math.pow(10,-d+c));a=Math.pow(10,o(e)-c+1);e=Math.round(e/a)*a;if(d<c){e/=Math.pow(10,-d+c);if(b==null)return n(e,c-d-1)}return n(e,b)}function p(a,b){b=b==null?0:b;var c=Math.pow(10,b);a=a;a=Math.round(a*c)/c;a+="";if(!b)return a;if(a.indexOf("e-")!==-1)return a;c=a.indexOf(".");var d;c==-1?(a+=".",d=b):d=b-(a.length-c-1);for(var b=0,c=d;b<c;b++)a+="0";return a}var q=function(a,b){a=a;for(var c=0;c<b;c++)a+="0";return a};function r(a,b){var c=a.indexOf("."),d=c===-1?a:a.slice(0,c);a=c===-1?"":a.slice(c+1);return b!=null?d+"."+q(a.slice(0,b),b-a.length):d}function s(a,c,d){d===void 0&&(d="");var e=u(),f=a;e&&(f=a.split("").map(function(a){return e[a]||a}).join("").trim());f=f.replace(/^[^\d]*\-/,"\x02");f=f.replace(k,"");a=b("escapeRegex")(c);c=b("escapeRegex")(d);d=j("^[^\\d]*\\d.*"+a+".*\\d[^\\d]*$");if(!d.test(f)){d=j("(^[^\\d]*)"+a+"(\\d*[^\\d]*$)");if(d.test(f)){f=f.replace(d,"$1\x01$2");return t(f)}d=j("^[^\\d]*[\\d "+b("escapeRegex")(c)+"]*[^\\d]*$");d.test(f)||(f="");return t(f)}d=j("(^[^\\d]*[\\d "+c+"]*)"+a+"(\\d*[^\\d]*$)");f=d.test(f)?f.replace(d,"$1\x01$2"):"";return t(f)}function t(a){a=a.replace(/[^0-9\u0001\u0002]/g,"").replace("\x01",".").replace("\x02","-");var b=Number(a);return a===""||isNaN(b)?null:b}function u(){var a=b("NumberFormatConsts").get((g||(g=b("FbtHooks"))).getViewerContext().locale),c={};a=a.numberingSystemData&&a.numberingSystemData.digits;if(a==null)return null;for(var d=0;d<a.length;d++)c[a.charAt(d)]=d.toString();return c}function d(a){var c=b("NumberFormatConsts").get((g||(g=b("FbtHooks"))).getViewerContext().locale);return s(a,c.decimalSeparator||".",c.numberDelimiter)}var v={formatNumber:a,formatNumberRaw:l,formatNumberWithThousandDelimiters:n,formatNumberWithLimitedSigFig:c,parseNumber:d,parseNumberRaw:s,truncateLongNumber:r,getFloatString:function(a,b,c){a=String(a);a=a.split(".");b=v.getIntegerString(a[0],b);return a.length===1?b:b+c+a[1]},getIntegerString:function(a,b){b=b;b===""&&(b=",");a=String(a);var c=/(\d+)(\d{3})/;while(c.test(a))a=a.replace(c,"$1"+b+"$2");return a}};e.exports=v}),null);
__d("IntlPhonologicalRewrites",["IntlPhonologicalRules"],(function(a,b,c,d,e,f){"use strict";a={get:function(a){return b("IntlPhonologicalRules")}};e.exports=a}),null);
__d("IntlRedundantStops",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({equivalencies:{".":["\u0964","\u104b","\u3002"],"\u2026":["\u0e2f","\u0eaf","\u1801"],"!":["\uff01"],"?":["\uff1f"]},redundancies:{"?":["?",".","!","\u2026"],"!":["!","?","."],".":[".","!"],"\u2026":["\u2026",".","!"]}})}),null);
__d("IntlPunctuation",["FbtHooks","IntlPhonologicalRewrites","IntlRedundantStops"],(function(a,b,c,d,e,f,g){d="[.!?\u3002\uff01\uff1f\u0964\u2026\u0eaf\u1801\u0e2f\uff0e]";var h={};function i(a){var b;b=(b=a)!=null?b:"";var c=h[b];c==null&&(c=h[b]=j(a));return c}function j(a){var b=[];a=c("IntlPhonologicalRewrites").get(a);for(var d in a.patterns){var e=a.patterns[d];for(var f in a.meta){var g=new RegExp(f.slice(1,-1),"g"),h=a.meta[f];d=d.replace(g,h);e=e.replace(g,h)}e==="javascript"&&(e=function(a){return a.slice(1).toLowerCase()});b.push([new RegExp(d.slice(1,-1),"g"),e])}return b}function a(a){var b=i(c("FbtHooks").getViewerContext().locale);a=a;for(var d=0;d<b.length;d++){var e=b[d],f=e[0];e=e[1];a=a.replace(f,e)}return a.replace(/\x01/g,"")}var k=new Map();for(var e in c("IntlRedundantStops").equivalencies)for(var f=[e].concat(c("IntlRedundantStops").equivalencies[e]),l=Array.isArray(f),m=0,f=l?f:f[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var n;if(l){if(m>=f.length)break;n=f[m++]}else{m=f.next();if(m.done)break;n=m.value}n=n;k.set(n,e)}var o=new Map();for(var n in c("IntlRedundantStops").redundancies)o.set(n,new Set(c("IntlRedundantStops").redundancies[n]));function p(a,b){a=k.get(a);b=k.get(b);return((a=o.get(a))==null?void 0:a.has(b))===!0}function b(a,b){return p(a[a.length-1],b)?"":b}g.PUNCT_CHAR_CLASS=d;g.applyPhonologicalRules=a;g.dedupeStops=b}),98);
__d("substituteTokens",["invariant","IntlPunctuation"],(function(a,b,c,d,e,f,g,h){b=Object.prototype.hasOwnProperty;var i=new RegExp("\\{([^}]+)\\}("+d("IntlPunctuation").PUNCT_CHAR_CLASS+"*)","g");function j(a){return a}function a(a,b){if(b==null)return a;typeof b==="object"||h(0,6041,a);var c=[],e=[];a=a.replace(i,function(a,f,g){a=b[f];if(a!=null&&typeof a==="object"){c.push(a);e.push(f);return"\x17"+g}else if(a===null)return"";return String(a)+d("IntlPunctuation").dedupeStops(String(a),g)}).split("\x17").map(d("IntlPunctuation").applyPhonologicalRules);if(a.length===1)return a[0];var f=a[0]!==""?[a[0]]:[];for(var g=0;g<c.length;g++)f.push(j(c[g])),a[g+1]!==""&&f.push(a[g+1]);return f}f.exports=a}),34);
__d("fbt",["invariant","FbtEnv","FbtHooks","FbtQTOverrides","FbtResultBase","FbtTable","FbtTableAccessor","GenderConst","IntlVariationResolver","intlNumUtils","substituteTokens"],(function(a,b,c,d,e,f,g){var h;b("FbtEnv").setupOnce();var i=b("FbtQTOverrides").overrides,j=b("IntlVariationResolver").getGenderVariations,k=b("IntlVariationResolver").getNumberVariations,l=Object.prototype.hasOwnProperty,m=!1,n=b("FbtTable").ARG,o={number:0,gender:1},p={object:0,possessive:1,reflexive:2,subject:3},q={};function a(a,c,d){if(((d==null?void 0:d.hk)||(d==null?void 0:d.ehk))&&m)return{text:a,fbt:!0,hashKey:d.hk};a=(h||(h=b("FbtHooks"))).getTranslatedInput({table:a,args:c,options:d});c=a.args;a=a.table;var e={};if(a.__vcg!=null){c=c||[];var f=(h||(h=b("FbtHooks"))).getViewerContext();f=f.GENDER;var k=j(f);c.unshift(b("FbtTableAccessor").getGenderResult(k,null,f))}c&&(typeof a!=="string"&&(a=b("FbtTable").access(a,c,0)),e=r(c),a!==null||g(0,479));var l;if(Array.isArray(a)){k=a[0];l=a[1];f="1_"+l;i[f]!=null&&i[f]!==""&&(k=i[f],(h||(h=b("FbtHooks"))).onTranslationOverride(l));(h||(h=b("FbtHooks"))).logImpression(l)}else if(typeof a==="string")k=a;else throw new Error("Table access did not result in string: "+(a===void 0?"undefined":JSON.stringify(a))+", Type: "+typeof a);c=q[k];f=s(e);if(c&&!f)return c;else{a=b("substituteTokens")(k,e);c=this._wrapContent(a,k,l,d==null?void 0:d.eo);f||(q[k]=c);return c}}function r(a){var b={};a.forEach(function(a){a=a[n.SUBSTITUTION];if(!a)return;for(var c in a)l.call(a,c)&&(b[c]==null||g(0,56656,c),b[c]=a[c])});return b}function s(a){for(var a in a)return!0;return!1}function c(a,c){return b("FbtTableAccessor").getEnumResult(a)}function d(a){return b("FbtTableAccessor").getGenderResult(j(a),null,a)}function f(a,c,d){var e;e=(e={},e[a]=c,e);if(d)if(d[0]===o.number){var f=d.length>1?d[1]:c;typeof f==="number"||g(0,484);var h=k(f);typeof c==="number"&&(e[a]=b("intlNumUtils").formatNumberWithThousandDelimiters(c));return b("FbtTableAccessor").getNumberResult(h,e,f)}else if(d[0]===o.gender){a=d[1];a!=null||g(0,485);return b("FbtTableAccessor").getGenderResult(j(a),e,a)}else g(0,486);else return b("FbtTableAccessor").getSubstitution(e)}function t(a,b,c){return this._param(a,b,c)}function u(a,c,d){var e=k(a),f={};c&&(typeof d==="number"?f[c]=b("intlNumUtils").formatNumberWithThousandDelimiters(d):f[c]=d||b("intlNumUtils").formatNumberWithThousandDelimiters(a));return b("FbtTableAccessor").getNumberResult(e,f,a)}function v(a,c,d){c!==b("GenderConst").NOT_A_PERSON||!d||!d.human||g(0,11835);d=w(a,c);return b("FbtTableAccessor").getPronounResult(d)}function w(a,c){switch(c){case b("GenderConst").NOT_A_PERSON:return a===p.object||a===p.reflexive?b("GenderConst").NOT_A_PERSON:b("GenderConst").UNKNOWN_PLURAL;case b("GenderConst").FEMALE_SINGULAR:case b("GenderConst").FEMALE_SINGULAR_GUESS:return b("GenderConst").FEMALE_SINGULAR;case b("GenderConst").MALE_SINGULAR:case b("GenderConst").MALE_SINGULAR_GUESS:return b("GenderConst").MALE_SINGULAR;case b("GenderConst").MIXED_UNKNOWN:case b("GenderConst").FEMALE_PLURAL:case b("GenderConst").MALE_PLURAL:case b("GenderConst").NEUTER_PLURAL:case b("GenderConst").UNKNOWN_PLURAL:return b("GenderConst").UNKNOWN_PLURAL;case b("GenderConst").NEUTER_SINGULAR:case b("GenderConst").UNKNOWN_SINGULAR:return a===p.reflexive?b("GenderConst").NOT_A_PERSON:b("GenderConst").UNKNOWN_PLURAL}return b("GenderConst").NOT_A_PERSON}function x(a,c,d){var e=j(d),f={};f[a]=c;return b("FbtTableAccessor").getGenderResult(e,f,d)}function y(a,c,d,e){a=typeof a==="string"?[a]:a;var f=(h||(h=b("FbtHooks"))).getErrorListener({translation:c,hash:d});a=h.getFbtResult({contents:a,errorListener:f,extraOptions:e,patternHash:d,patternString:c});return a}function z(){m=!0}function A(){m=!1}function B(a){return a instanceof b("FbtResultBase")}var C=function(){};C._=a;C._enum=c;C._implicitParam=t;C._name=x;C._param=f;C._plural=u;C._pronoun=v;C._subject=d;C._wrapContent=y;C.disableJsonExportMode=A;C.enableJsonExportMode=z;C.isFbtInstance=B;C._getCachedFbt=void 0;e.exports=C}),null);
__d("isBulletinDotComURI",[],(function(a,b,c,d,e,f){var g=new RegExp("(^|\\.)bulletin\\.com$","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.indexOf(a.getProtocol())!==-1&&g.test(a.getDomain())}f["default"]=a}),66);
__d("getElementPosition",["getElementRect"],(function(a,b,c,d,e,f,g){function a(a){a=c("getElementRect")(a);return{x:a.left,y:a.top,width:a.right-a.left,height:a.bottom-a.top}}g["default"]=a}),98);