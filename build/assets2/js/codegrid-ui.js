/**
 * @author mrdoob / http://mrdoob.com/
 */

var EventDispatcher = function () {}

EventDispatcher.prototype = {

	constructor: EventDispatcher,

	apply: function ( object ) {

		object.addEventListener = EventDispatcher.prototype.addEventListener;
		object.hasEventListener = EventDispatcher.prototype.hasEventListener;
		object.removeEventListener = EventDispatcher.prototype.removeEventListener;
		object.dispatchEvent = EventDispatcher.prototype.dispatchEvent;

	},

	addEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		var listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	},

	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		var listeners = this._listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	},

	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	},

	dispatchEvent: function ( event ) {
			
		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			var array = [];
			var length = listenerArray.length;

			for ( var i = 0; i < length; i ++ ) {

				array[ i ] = listenerArray[ i ];

			}

			for ( var i = 0; i < length; i ++ ) {

				array[ i ].call( this, event );

			}

		}

	}

};

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash+coffeescript+ruby+git+handlebars+http+jade+json+less+markdown+jsx+sass+scss+stylus+typescript+yaml&plugins=line-numbers+autolinker */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),l=0;r=i[l++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i);var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var i=n.tokenize(e,t);return a.stringify(n.util.encode(i),r)},tokenize:function(e,t){var a=n.Token,r=[e],i=t.rest;if(i){for(var l in i)t[l]=i[l];delete t.rest}e:for(var l in t)if(t.hasOwnProperty(l)&&t[l]){var o=t[l];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;if(h&&!u.pattern.global){var p=u.pattern.toString().match(/[imuy]*$/)[0];u.pattern=RegExp(u.pattern.source,p+"g")}u=u.pattern||u;for(var m=0,y=0;m<r.length;y+=(r[m].matchedStr||r[m]).length,++m){var v=r[m];if(r.length>e.length)break e;if(!(v instanceof a)){u.lastIndex=0;var b=u.exec(v),k=1;if(!b&&h&&m!=r.length-1){if(u.lastIndex=y,b=u.exec(e),!b)break;for(var w=b.index+(g?b[1].length:0),_=b.index+b[0].length,A=m,S=y,P=r.length;P>A&&_>S;++A)S+=(r[A].matchedStr||r[A]).length,w>=S&&(++m,y=S);if(r[m]instanceof a||r[A-1].greedy)continue;k=A-m,v=e.slice(y,S),b.index-=y}if(b){g&&(f=b[1].length);var w=b.index+f,b=b[0].slice(f),_=w+b.length,x=v.slice(0,w),O=v.slice(_),j=[m,k];x&&j.push(x);var N=new a(l,c?n.tokenize(b,c):b,d,b,h);j.push(N),O&&j.push(O),Array.prototype.splice.apply(r,j)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.matchedStr=a||null,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var i={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=(o?" ":"")+s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,i=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),i&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
!function(e){var t={variable:[{pattern:/\$?\(\([\w\W]+?\)\)/,inside:{variable:[{pattern:/(^\$\(\([\w\W]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\([^)]+\)|`[^`]+`/,inside:{variable:/^\$\(|^`|\)$|`$/}},/\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]};e.languages.bash={shebang:{pattern:/^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,alias:"important"},comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},string:[{pattern:/((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,lookbehind:!0,greedy:!0,inside:t},{pattern:/(["'])(?:\\\\|\\?[^\\])*?\1/g,greedy:!0,inside:t}],variable:t.variable,"function":{pattern:/(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,lookbehind:!0},keyword:{pattern:/(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,lookbehind:!0},"boolean":{pattern:/(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,lookbehind:!0},operator:/&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];]/};var a=t.variable[1].inside;a["function"]=e.languages.bash["function"],a.keyword=e.languages.bash.keyword,a.boolean=e.languages.bash.boolean,a.operator=e.languages.bash.operator,a.punctuation=e.languages.bash.punctuation}(Prism);
!function(e){var t=/#(?!\{).+/,n={pattern:/#\{[^}]+\}/,alias:"variable"};e.languages.coffeescript=e.languages.extend("javascript",{comment:t,string:[{pattern:/'(?:\\?[^\\])*?'/,greedy:!0},{pattern:/"(?:\\?[^\\])*?"/,greedy:!0,inside:{interpolation:n}}],keyword:/\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,"class-member":{pattern:/@(?!\d)\w+/,alias:"variable"}}),e.languages.insertBefore("coffeescript","comment",{"multiline-comment":{pattern:/###[\s\S]+?###/,alias:"comment"},"block-regex":{pattern:/\/{3}[\s\S]*?\/{3}/,alias:"regex",inside:{comment:t,interpolation:n}}}),e.languages.insertBefore("coffeescript","string",{"inline-javascript":{pattern:/`(?:\\?[\s\S])*?`/,inside:{delimiter:{pattern:/^`|`$/,alias:"punctuation"},rest:e.languages.javascript}},"multiline-string":[{pattern:/'''[\s\S]*?'''/,greedy:!0,alias:"string"},{pattern:/"""[\s\S]*?"""/,greedy:!0,alias:"string",inside:{interpolation:n}}]}),e.languages.insertBefore("coffeescript","keyword",{property:/(?!\d)\w+(?=\s*:(?!:))/}),delete e.languages.coffeescript["template-string"]}(Prism);
!function(e){e.languages.ruby=e.languages.extend("clike",{comment:/#(?!\{[^\r\n]*?\}).*/,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/});var n={pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:e.util.clone(e.languages.ruby)}};e.languages.insertBefore("ruby","keyword",{regex:[{pattern:/%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,inside:{interpolation:n}},{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}],variable:/[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,symbol:/:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.insertBefore("ruby","number",{builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.ruby.string=[{pattern:/%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,inside:{interpolation:n}},{pattern:/("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,inside:{interpolation:n}}]}(Prism);
Prism.languages.git={comment:/^#.*/m,deleted:/^[-–].*/m,inserted:/^\+.*/m,string:/("|')(\\?.)*?\1/m,command:{pattern:/^.*\$ git .*$/m,inside:{parameter:/\s(--|-)\w+/m}},coord:/^@@.*@@$/m,commit_sha1:/^commit \w{40}$/m};
!function(e){var a=/\{\{\{[\w\W]+?\}\}\}|\{\{[\w\W]+?\}\}/g;e.languages.handlebars=e.languages.extend("markup",{handlebars:{pattern:a,inside:{delimiter:{pattern:/^\{\{\{?|\}\}\}?$/i,alias:"punctuation"},string:/(["'])(\\?.)*?\1/,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/,"boolean":/\b(true|false)\b/,block:{pattern:/^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,lookbehind:!0,alias:"keyword"},brackets:{pattern:/\[[^\]]+\]/,inside:{punctuation:/\[|\]/,variable:/[\w\W]+/}},punctuation:/[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,variable:/[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/}}}),e.languages.insertBefore("handlebars","tag",{"handlebars-comment":{pattern:/\{\{![\w\W]*?\}\}/,alias:["handlebars","comment"]}}),e.hooks.add("before-highlight",function(e){"handlebars"===e.language&&(e.tokenStack=[],e.code=e.code.replace(a,function(a){return e.tokenStack.push(a),"___HANDLEBARS"+e.tokenStack.length+"___"}))}),e.hooks.add("after-highlight",function(a){if("handlebars"===a.language){for(var n,t=0;n=a.tokenStack[t];t++)a.highlightedCode=a.highlightedCode.replace("___HANDLEBARS"+(t+1)+"___",e.highlight(n,a.grammar,"handlebars").replace(/\$/g,"$$$$"));a.element.innerHTML=a.highlightedCode}})}(Prism);
Prism.languages.http={"request-line":{pattern:/^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,inside:{property:/^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,"attr-name":/:\w+/}},"response-status":{pattern:/^HTTP\/1.[01] [0-9]+.*/m,inside:{property:{pattern:/(^HTTP\/1.[01] )[0-9]+.*/i,lookbehind:!0}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var httpLanguages={"application/json":Prism.languages.javascript,"application/xml":Prism.languages.markup,"text/xml":Prism.languages.markup,"text/html":Prism.languages.markup};for(var contentType in httpLanguages)if(httpLanguages[contentType]){var options={};options[contentType]={pattern:new RegExp("(content-type:\\s*"+contentType+"[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*","i"),lookbehind:!0,inside:{rest:httpLanguages[contentType]}},Prism.languages.insertBefore("http","header-name",options)};
!function(e){e.languages.jade={comment:{pattern:/(^([\t ]*))\/\/.*((?:\r?\n|\r)\2[\t ]+.+)*/m,lookbehind:!0},"multiline-script":{pattern:/(^([\t ]*)script\b.*\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0,inside:{rest:e.languages.javascript}},filter:{pattern:/(^([\t ]*)):.+((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"}}},"multiline-plain-text":{pattern:/(^([\t ]*)[\w\-#.]+\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0},markup:{pattern:/(^[\t ]*)<.+/m,lookbehind:!0,inside:{rest:e.languages.markup}},doctype:{pattern:/((?:^|\n)[\t ]*)doctype(?: .+)?/,lookbehind:!0},"flow-control":{pattern:/(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,lookbehind:!0,inside:{each:{pattern:/^each .+? in\b/,inside:{keyword:/\b(?:each|in)\b/,punctuation:/,/}},branch:{pattern:/^(?:if|unless|else|case|when|default|while)\b/,alias:"keyword"},rest:e.languages.javascript}},keyword:{pattern:/(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,lookbehind:!0},mixin:[{pattern:/(^[\t ]*)mixin .+/m,lookbehind:!0,inside:{keyword:/^mixin/,"function":/\w+(?=\s*\(|\s*$)/,punctuation:/[(),.]/}},{pattern:/(^[\t ]*)\+.+/m,lookbehind:!0,inside:{name:{pattern:/^\+\w+/,alias:"function"},rest:e.languages.javascript}}],script:{pattern:/(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,lookbehind:!0,inside:{rest:e.languages.javascript}},"plain-text":{pattern:/(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,lookbehind:!0},tag:{pattern:/(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,lookbehind:!0,inside:{attributes:[{pattern:/&[^(]+\([^)]+\)/,inside:{rest:e.languages.javascript}},{pattern:/\([^)]+\)/,inside:{"attr-value":{pattern:/(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,lookbehind:!0,inside:{rest:e.languages.javascript}},"attr-name":/[\w-]+(?=\s*!?=|\s*[,)])/,punctuation:/[!=(),]+/}}],punctuation:/:/}},code:[{pattern:/(^[\t ]*(?:-|!?=)).+/m,lookbehind:!0,inside:{rest:e.languages.javascript}}],punctuation:/[.\-!=|]+/};for(var t="(^([\\t ]*)):{{filter_name}}((?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+",n=[{filter:"atpl",language:"twig"},{filter:"coffee",language:"coffeescript"},"ejs","handlebars","hogan","less","livescript","markdown","mustache","plates",{filter:"sass",language:"scss"},"stylus","swig"],a={},i=0,r=n.length;r>i;i++){var s=n[i];s="string"==typeof s?{filter:s,language:s}:s,e.languages[s.language]&&(a["filter-"+s.filter]={pattern:RegExp(t.replace("{{filter_name}}",s.filter),"m"),lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"},rest:e.languages[s.language]}})}e.languages.insertBefore("jade","filter",a)}(Prism);
Prism.languages.json={property:/".*?"(?=\s*:)/gi,string:/"(?!:)(\\?[^"])*?"(?!:)/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,punctuation:/[{}[\]);,]/g,operator:/:/g,"boolean":/\b(true|false)\b/gi,"null":/\bnull\b/gi},Prism.languages.jsonp=Prism.languages.json;
Prism.languages.less=Prism.languages.extend("css",{comment:[/\/\*[\w\W]*?\*\//,{pattern:/(^|[^\\])\/\/.*/,lookbehind:!0}],atrule:{pattern:/@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,inside:{punctuation:/[:()]/}},selector:{pattern:/(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,inside:{variable:/@+[\w-]+/}},property:/(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,punctuation:/[{}();:,]/,operator:/[+\-*\/]/}),Prism.languages.insertBefore("less","punctuation",{"function":Prism.languages.less.function}),Prism.languages.insertBefore("less","property",{variable:[{pattern:/@[\w-]+\s*:/,inside:{punctuation:/:/}},/@@?[\w-]+/],"mixin-usage":{pattern:/([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,lookbehind:!0,alias:"function"}});
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold);
!function(a){var e=a.util.clone(a.languages.javascript);a.languages.jsx=a.languages.extend("markup",e),a.languages.jsx.tag.pattern=/<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i,a.languages.jsx.tag.inside["attr-value"].pattern=/=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;var s=a.util.clone(a.languages.jsx);delete s.punctuation,s=a.languages.insertBefore("jsx","operator",{punctuation:/=(?={)|[{}[\];(),.:]/},{jsx:s}),a.languages.insertBefore("inside","attr-value",{script:{pattern:/=(\{(?:\{[^}]*\}|[^}])+\})/i,inside:s,alias:"language-javascript"}},a.languages.jsx.tag)}(Prism);
!function(e){e.languages.sass=e.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var a=/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,t=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];e.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:a,operator:t}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:a,operator:t,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,delete e.languages.sass.selector,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism);
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)*url(?=\()/i,selector:{pattern:/(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-_\w]+/,variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.scss.property={pattern:/(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,inside:{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}},Prism.languages.insertBefore("scss","important",{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},"boolean":/\b(?:true|false)\b/,"null":/\bnull\b/,operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);
!function(n){var t={url:/url\((["']?).*?\1\)/i,string:/("|')(?:[^\\\r\n]|\\(?:\r\n|[\s\S]))*?\1/,interpolation:null,func:null,important:/\B!(?:important|optional)\b/i,keyword:{pattern:/(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,lookbehind:!0},hexcode:/#[\da-f]{3,6}/i,number:/\b\d+(?:\.\d+)?%?/,"boolean":/\b(?:true|false)\b/,operator:[/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],punctuation:/[{}()\[\];:,]/};t.interpolation={pattern:/\{[^\r\n}:]+\}/,alias:"variable",inside:n.util.clone(t)},t.func={pattern:/[\w-]+\([^)]*\).*/,inside:{"function":/^[^(]+/,rest:n.util.clone(t)}},n.languages.stylus={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0},"atrule-declaration":{pattern:/(^\s*)@.+/m,lookbehind:!0,inside:{atrule:/^@[\w-]+/,rest:t}},"variable-declaration":{pattern:/(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,lookbehind:!0,inside:{variable:/^\S+/,rest:t}},statement:{pattern:/(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,lookbehind:!0,inside:{keyword:/^\S+/,rest:t}},"property-declaration":{pattern:/((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,lookbehind:!0,inside:{property:{pattern:/^[^\s:]+/,inside:{interpolation:t.interpolation}},rest:t}},selector:{pattern:/(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,lookbehind:!0,inside:{interpolation:t.interpolation,punctuation:/[{},]/}},func:t.func,string:t.string,interpolation:t.interpolation,punctuation:/[{}()\[\];:.]/}}(Prism);
Prism.languages.typescript=Prism.languages.extend("javascript",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/});
Prism.languages.yaml={scalar:{pattern:/([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:/(\s*(?:^|[:\-,[{\r\n?])[ \t]*(![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,lookbehind:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*($|,|]|}))/m,lookbehind:!0,alias:"number"},"boolean":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=$|,|]|})/im,lookbehind:!0,alias:"important"},"null":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=$|,|]|})/im,lookbehind:!0,alias:"important"},string:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')(?=[ \t]*($|,|]|}))/m,lookbehind:!0},number:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\da-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,lookbehind:!0},tag:/![^\s]+/,important:/[&*][\w]+/,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./};
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var n,a=e.code.match(/\n(?!$)/g),l=a?a.length+1:1,r=new Array(l+1);r=r.join("<span></span>"),n=document.createElement("span"),n.setAttribute("aria-hidden","true"),n.className="line-numbers-rows",n.innerHTML=r,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(n)}}})}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var i=/\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:#=?&amp;]+/,n=/\b\S+@[\w.]+[a-z]{2}/,e=/\[([^\]]+)]\(([^)]+)\)/,t=["comment","url","attr-value","string"];Prism.plugins.autolinker={processGrammar:function(a){a&&!a["url-link"]&&(Prism.languages.DFS(a,function(a,r,l){t.indexOf(l)>-1&&"Array"!==Prism.util.type(r)&&(r.pattern||(r=this[a]={pattern:r}),r.inside=r.inside||{},"comment"==l&&(r.inside["md-link"]=e),"attr-value"==l?Prism.languages.insertBefore("inside","punctuation",{"url-link":i},r):r.inside["url-link"]=i,r.inside["email-link"]=n)}),a["url-link"]=i,a["email-link"]=n)}},Prism.hooks.add("before-highlight",function(i){Prism.plugins.autolinker.processGrammar(i.grammar)}),Prism.hooks.add("wrap",function(i){if(/-link$/.test(i.type)){i.tag="a";var n=i.content;if("email-link"==i.type&&0!=n.indexOf("mailto:"))n="mailto:"+n;else if("md-link"==i.type){var t=i.content.match(e);n=t[2],i.content=t[1]}i.attributes.href=n}})}}();

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

var CG2 = {};

CG2.vent = new EventDispatcher();

;( function () {

  var win = window;

  var BREAK_POINT = {
    large  : Infinity,
    base   : 980 - 1,
    middle : 768 - 1,
    small  : 640 - 1
  };

  var onresize = function () {

    var _screenType = CG2.screenType;

    for ( var i in BREAK_POINT ) {

      if ( window.matchMedia( '(max-width: ' + BREAK_POINT[ i ] + 'px)' ).matches ) {

        CG2.screenType = i;

      }

    }

    if ( CG2.screenType !== _screenType ) {

      CG2.vent.dispatchEvent( { type: 'onmediachange', screenType: CG2.screenType } );

    }

  }

  onresize();
  win.addEventListener( 'resize', onresize );

} )();

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var modifier = 'CG2-pageHeader__userMenu--show';
  var $head = document.querySelector( '.CG2-pageHeader__userHeader' );
  var $nav  = document.querySelector( '.CG2-pageHeader__userMenu' );

  if ( !$head ) { return; }

  var navToggle = function () {

    $nav.classList.toggle( modifier );

  }

  $head.addEventListener( 'click', navToggle );

} );

/**
 * @author yomotsu / http://yomotsu.net
 * repository: https://github.com/yomotsu/PXG-drawer
 *
 */
window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var DISTANCE_THRESHOLD = 5;
  var ANGLE_THREHOLD = 60;
  var WILL_CLOSE_X = 30;

  var ua = ( function () {
    return {
      pointer: 'PointerEvent' in window,
      touch: typeof document.ontouchstart !== 'undefined'
    }
  } )();
  var _pointerstart = ua.pointer   ? 'pointerdown' :
                      ua.touch     ? 'touchstart' :
                      'mousedown';
  var _pointermove  = ua.pointer   ? 'pointermove' :
                      ua.touch     ? 'touchmove' :
                      'mousemove';
  var _pointerend   = ua.pointer   ? 'pointerup' :
                      ua.touch     ? 'touchend' :
                      'mouseup';

  var modifier = {
    show    : 'js-drawer--show',
    dragging: 'js-drawer--dragging'
  };
  var $win  = window;
  var $html = document.documentElement;
  var $body = document.body;
  var scrollTop;
  var scrollbarWidth = ( function () {

    // http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    var outer = document.createElement( 'div' );
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';

    $body.appendChild( outer );

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement( 'div' );
    inner.style.width = '100%';
    outer.appendChild( inner );

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild( outer );

    return widthNoScroll - widthWithScroll;

  } )();

  var isDragReady  = false;
  var isDragging   = false;
  var isHidden     = true;
  var isTouchVScrolling = false;

  var _pointerId = null;
  var dragStartCoord = { x: 0|0, y: 0|0 };
  var $openEl, $closeEl, $toggleEl;
  var $panel     = document.querySelector( '.CG2-drawer__panel' );
  var $openEls   = document.querySelectorAll( '[data-drawer-show]' );
  var $closeEls  = document.querySelectorAll( '[data-drawer-hide]' );
  var $toggleEls = document.querySelectorAll( '[data-drawer-toggle]' );

  if ( !$panel ) { return; }

  Array.prototype.forEach.call( $openEls, function( $openEl ) {

    $openEl.addEventListener( 'click', navOpen );

  } );

  Array.prototype.forEach.call( $closeEls, function( $closeEl ) {

    $closeEl.addEventListener( 'click', navClose );

  } );

  Array.prototype.forEach.call( $toggleEls, function( $toggleEl ) {

    $toggleEl.addEventListener( 'click', navToggle );

  } );

  $panel.addEventListener( _pointerstart, dragstart );

  if ( ua.touch ) {

    $panel.addEventListener( _pointerstart, handleTouchVScrollStart );
    $panel.addEventListener( _pointermove,  handleTouchVScrollMove );
    $panel.addEventListener( _pointerend,   handleTouchVScrollEnd );

  }

  $win.addEventListener( 'keyup', keyup );

  //

  function navOpen () {

    if ( !isHidden ) { return; }

    isHidden = false;
    scrollTop = $html.scrollTop || $body.scrollTop;
    $html.className += ' ' + modifier.show;
    $html.style.paddingRight  = scrollbarWidth + 'px';
    $body.style.marginTop     = -scrollTop     + 'px';
    $body.style.paddingBottom =  scrollTop     + 'px';
    $panel.style.marginLeft   = 0;

  }

  function navClose () {

    if ( isHidden ) { return; }

    var re = new RegExp( ' ' + modifier.show );
    isHidden = true;
    $html.className = $html.className.replace( re, '' );
    $html.style.paddingRight  = 0;
    $body.style.marginTop     = 0;
    $body.style.paddingBottom = 0;
    window.scrollTo( 0, scrollTop );

  }

  function navToggle () {

    if ( isHidden ) {

      navOpen();

    } else {

      navClose();

    }

  }

  function keyup ( event ) {

    if ( event.keyCode === 27 ) {

      navClose();

    }
    
  }

  function dragstart ( event ) {

    var eventCoord;

    if ( !ua.touch ) {

      if ( /A|BUTTON|INPUT|TEXTAREA|SELECT/.test( event.target.nodeName ) ) {

        return;

      }

      // prevent text/element selection with cursor drag
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      event.returnValue = false;

    }

    if ( event.pointerId ) {

      _pointerId = event.pointerId;

    } else if ( event.changedTouches ) {

      _pointerId = event.changedTouches[ event.changedTouches.length - 1 ].identifier;

    }

    eventCoord = getEventCoord( event );
    dragStartCoord.x = eventCoord.x;
    dragStartCoord.y = eventCoord.y;

    isDragReady = false;
    isDragging  = false;

    $panel.addEventListener( _pointermove, dragmove );
    $panel.addEventListener( _pointerend,  dragend );

  }

  function dragmove ( event ) {

    var eventCoord;

    if ( !ua.touch ) {

      // prevent text/element selection with cursor drag
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      event.returnValue = false;

    }

    eventCoord = getEventCoord( event );
    var x = Math.max( eventCoord.x - dragStartCoord.x, 0 );

    if ( !isDragReady ) {

      var triangle = getTriangleSide(
        dragStartCoord.x,
        dragStartCoord.y,
        eventCoord.x,
        eventCoord.y
      );

      if ( triangle.z > DISTANCE_THRESHOLD ) {

        if ( getAngle( triangle ) > ANGLE_THREHOLD ) {

          isDragReady = true;

        } else {

          dragend( event );
          return;

        }

      } else {

        return;

      }

    }

    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;

    if ( !isDragging ) {

      $html.className += ' ' + modifier.dragging;
      isDragging = true;

    }

    $panel.style.marginLeft = x + 'px';

  }

  function dragend ( event ) {

    var x, re, i, l;

    if ( event.pointerId && pointerId !== event.pointerId ) {

      return;

    } else if ( event.changedTouches ) {

      for ( i = 0, l = event.changedTouches.length; i < l; i ++ ) {

        if ( _pointerId === event.changedTouches[ i ].identifier ) {

          break;

        }

        if ( i === event.changedTouches.length ) {

          return;

        }

      }

    }

    x = Math.max( getEventCoord( event ).x - dragStartCoord.x, 0 );

    if ( WILL_CLOSE_X < x ) {

      navClose();

    } else {

      $panel.style.marginLeft = 0;

    }

    re = new RegExp( ' ' + modifier.dragging );
    $html.className = $html.className.replace( re, '' );

    $panel.removeEventListener( _pointermove, dragmove );
    $panel.removeEventListener( _pointerend,  dragend );

    isDragReady = false;
    isDragging  = false;

  }

  function handleTouchVScrollStart ( event ) {

    isTouchVScrolling = true;

  }

  function handleTouchVScrollEnd ( event ) {

    isTouchVScrolling = false;

  }

  function handleTouchVScrollMove ( event ) {

    if ( !isTouchVScrolling ) { return; }

    // console.log( event );

  }

  function getEventCoord ( event ) {

    var x, y, i, l, _event = null;

    if ( event.pointerId ) {

      if ( _pointerId === event.pointerId ) {

        _event = event;

      }

    } else if ( event.changedTouches ) {

      for ( i = 0|0, l = event.changedTouches.length; i < l; i = ( i + 1 )|0 ) {

        if ( _pointerId === event.changedTouches[ i ].identifier ) {

          _event = event.changedTouches[ i ];

        }

      }

    } else {

      _event = event;

    }

    if ( _event === null ) {

      return false;

    }

    x = _event.clientX|0;
    y = _event.clientY|0;

    return { x: x, y: y };

  };

  function getTriangleSide ( x1, y1, x2, y2 ) {

    var x = Math.abs( x1 - x2 );
    var y = Math.abs( y1 - y2 );
    var z = Math.sqrt( x * x + y * y );

    return {
      x: x,
      y: y,
      z: z
    };

  }

  function getAngle ( triangle ) {

    var cos = triangle.y / triangle.z;
    var radian = Math.acos( cos );

    return 180 / ( Math.PI / radian );

  }


} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var i, l;
  var $navs = document.querySelectorAll( '.CG2-compactNav' );

  if ( $navs.length === 0 ) { return; }
  
  for ( i = 0, l = $navs.length; i < l; i = ( i + 1 )|0 ) {

    ( function () {

      var $nav     = $navs[ i ];
      var $current = $nav.querySelector( '.CG2-compactNav__item--current a' );
      var $trigger = $nav.querySelector( '.CG2-compactNav__navOpener' );
      var modifier = 'CG2-compactNav--show';

      $current.addEventListener( 'click', toggle );
      $trigger.addEventListener( 'click', toggle );

      function toggle ( e ) {

        if ( CG2.screenType === 'large' ) { return; }

        e.preventDefault();
        $nav.classList.toggle( modifier );

      }

    } )();

  }

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var CLASS_NAME_CURRENT_TAB = 'CG2-compactNav__item--current';
  var SELECTOR_CURRENT_TAB = '.' + CLASS_NAME_CURRENT_TAB;
  var ATTR_NAME_CURRENT_PANE = 'data-cg2-tab-pane';
  var SELECTOR_CURRENT_PANE = '[' + ATTR_NAME_CURRENT_PANE + '="current"]';

  var i, l;
  var $tabs = document.querySelectorAll( '[data-cg2-tab-button]' );

  if ( $tabs.length === 0 ) { return; }

  // elementMatches(element, selector)
  // Element.matches for unsupported browsers
  var elementMatches = function () {

    var proto = Element.prototype;
    var matches = proto.matches = proto.msMatchesSelector || proto.webkitMatchesSelector;

    return function( element, selector ) {

      return matches.call( element, selector );

    };

  }();

  // initialize tabs click event
  Array.prototype.forEach.call( $tabs, function ( $tab ) {

    $tab.addEventListener( 'click', onClickTab );

  } );

  function onClickTab ( e ) {

    e.preventDefault();

    var $this   = e.target;
    var $li     = closest( $this, 'li' );
    var $ul     = closest( $li,   'ul' );
    var $target = null;
    var selector = $this.getAttribute( 'href' );

    if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

    $target = document.querySelector( selector );

    activateTab( $li, $ul );
    activatePane( $target, closest( $target, '[data-cg2-tab-content]' ) );
    syncTab( '[href="' + $this.getAttribute( 'href' ) + '"]' );

  }

  // sync current status for other tab set
  function syncTab ( selector ) {

    var i, l;
    var $tabs = document.querySelectorAll( '[data-cg2-tab-button]' + selector );

    Array.prototype.forEach.call( $tabs, function ( $tab ) {

      var $li  = closest( $tab, 'li' );
      var $ul  = closest( $li,  'ul' );

      if ( $li.classList.contains( CLASS_NAME_CURRENT_TAB ) ) { return }

      activateTab( $li, $ul );

    } );

  }

  // switch current tab
  function activateTab ( element, container ) {

    var $active = container.querySelector( SELECTOR_CURRENT_TAB );

    $active.classList.remove( CLASS_NAME_CURRENT_TAB );
    element.classList.add( CLASS_NAME_CURRENT_TAB );

  }

  // switch current pane
  function activatePane ( element, container ) {

    var $active = container.querySelector( SELECTOR_CURRENT_PANE );

    $active.setAttribute( ATTR_NAME_CURRENT_PANE, '' );
    element.setAttribute( ATTR_NAME_CURRENT_PANE, 'current' );

  }

  // get closest parent node by selector
  function closest ( element, selector ) {

    var parent = null;

    while ( element !== null ) {

      parent = element.parentElement;

      if ( parent !== null && elementMatches( parent, selector ) ) {

        return parent;

      }

      element = parent;

    }

    return null;

  }

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-articleSeriesNav' );

  if ( !$el ) { return; }

  var lookup = [
    '\uFF10', // 0
    '\uFF11', // 1
    '\uFF12', // 2
    '\uFF13', // 3
    '\uFF14', // 4
    '\uFF15', // 5
    '\uFF16', // 6
    '\uFF17', // 7
    '\uFF18', // 8
    '\uFF19', // 9
    //---
    '\u2469', // (10)
    '\u246A', // (11)
    '\u246B', // (12)
    '\u246C', // (13)
    '\u246D', // (14)
    '\u246E', // (15)
    '\u246F', // (16)
    '\u2470', // (17)
    '\u2471', // (18)
    '\u2472', // (19)
    '\u2473', // (20)
    //---
    '\u3251', // (21)
    '\u3252', // (22)
    '\u3253', // (23)
    '\u3254', // (24)
    '\u3255', // (25)
    '\u3256', // (26)
    '\u3257', // (27)
    '\u3258', // (28)
    '\u3259', // (29)
    '\u325A', // (30)
    '\u325B', // (31)
    '\u325C', // (32)
    '\u325D', // (33)
    '\u325E', // (34)
    '\u325F', // (35)
    //---
    '\u32B1', // (36)
    '\u32B2', // (37)
    '\u32B3', // (38)
    '\u32B4', // (39)
    '\u32B5', // (40)
    '\u32B6', // (41)
    '\u32B7', // (42)
    '\u32B8', // (43)
    '\u32B9', // (44)
    '\u32BA', // (45)
    '\u32BB', // (46)
    '\u32BC', // (47)
    '\u32BD', // (48)
    '\u32BE', // (49)
    '\u32BF'  // (50)
  ];

  var replaceNumber = function () {

    // ”1.5”が"1"と"5"に別れるのを防ぐために小数もマッチさせる
    var _replaceTargetRe = /([0-9]+\.?[0-9]*)/g;
    var _replaceFunc = function ( match, p1 ) {

      // Arrayもオブジェクトなので、数値にキャストせずずるく利用する
      return lookup[p1] || p1;

    };

    return function ( text ) {

      return text.replace( _replaceTargetRe, _replaceFunc );

    }

  }();

  var replaceAbbrWord = function ( text ) {

    return text.replace( /\b([A-Z]+)\b/g, '<abbr>$1</abbr>' );

  }

  var $inner = document.querySelector( '.CG2-articleSeriesNav__inner' );
  var $clone = $inner.cloneNode( true );

  Array.prototype.forEach.call( $clone.querySelectorAll( 'li' ) , function( $li ) {

    var $leaf = $li.querySelector( 'a' ) || $li;

    $leaf.innerHTML = replaceNumber( $leaf.textContent );
    $leaf.innerHTML = replaceAbbrWord( $leaf.textContent );

  } );

  $el.replaceChild( $clone, $inner );

} );

// 埋め込みコードの遅延開始
// CGMDから出力された
// 
//   <div class="CG2-livecode" data-livecode-deferred>
//     <header class="CG2-livecode__header">
//       <div class="CG2-livecode__label">
//         DEMOタイトル
//       </div>
//       <div class="CG2-livecode__nav">
//         <ul>
//           <li>
//             <a href="http://example.com/demo.html" target="_blank">
//               <span class="CG2-icon-tool"></span> 新規タブで開く
//             </a>
//           </li>
//         </ul>
//       </div>
//     </header>
//     <div class="CG2-livecode__body">
//       <iframe src="http://example.com/demo.html" data-deferred></iframe>
//     </div>
//   </div>
// 
// を
// 
//   <div class="CG2-livecode" data-livecode-deferred>
//     <header class="CG2-livecode__header">
//       <div class="CG2-livecode__label">
//         DEMOタイトル
//       </div>
//       <div class="CG2-livecode__nav">
//         <ul>
// +         <li>
// +           <a href="#" data-livecode-play>
// +             サンプルを停止する
// +           </a>
// +         </li>
//           <li>
//             <a href="http://example.com/demo.html" target="_blank">
//               <span class="CG2-icon-tool"></span> 新規タブで開く
//             </a>
//           </li>
//         </ul>
//       </div>
//     </header>
//     <div class="CG2-livecode__body">
// +     <iframe data-src="http://example.com/demo.html" data-deferred></iframe>
// +     <div class="CG2-livecode__clickToPlay" data-livecode-play></div>
//     </div>
//   </div>
// 
// にする



window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var fragment = document.createElement( 'div' );
  var modifier = 'CG2-livecode--isRunning';
  var $elAll   = document.querySelectorAll( '.CG2-livecode[data-livecode-deferred]:not( [data-livecode-from-oldjade] )' );

  fragment.innerHTML = '<li><a href="#" data-livecode-play>サンプルを停止する</a></li>';
  var $button = fragment.querySelector( 'li' );

  fragment.innerHTML = '<div class="CG2-livecode__clickToPlay" data-livecode-play></div>';
  var $cover = fragment.querySelector( 'div' );

  var attach   = function( $el ) {

    // build template
    var isCGMD = $el.getAttribute( 'data-livecode-from-oldjade' ) === null;

    if ( isCGMD ) {

      var $navUl = $el.querySelector( '.CG2-livecode__nav ul' );
      $navUl.insertBefore( $button.cloneNode( true ), $navUl.firstElementChild );
      var $body = $el.querySelector( '.CG2-livecode__body' );
      $body.appendChild( $cover.cloneNode( true ) );

    }

    //

    var isRunning = false;
    var $play   = $el.querySelectorAll( '[data-livecode-play]' );
    var $iframe = $el.querySelector( 'iframe' );
    var src = $iframe.src || $iframe.getAttribute( 'data-src' );

    var toggle = function ( e ) {

      e.preventDefault();

      if ( isRunning ) {

        $iframe.removeAttribute( 'src' );
        $el.classList.remove( modifier );
        isRunning = false;

      } else {

        $iframe.setAttribute( 'src', src );
        $el.classList.add( modifier );
        isRunning = true;

      }

    }

    $iframe.removeAttribute( 'src' );

    Array.prototype.forEach.call( $play, function( $item ) {

      $item.addEventListener( 'click', toggle );

    } );

  }

  if ( $elAll.length !== 0 ) {

    Array.prototype.forEach.call( $elAll, attach );
    
  }
  
  CG2.vent.addEventListener( 'livecode-converted', function ( e ) {

    var deferredplay = e.element.getAttribute( 'data-livecode-deferred' ) !== null;

    if ( deferredplay ) { attach( e.element ); }

  } );

} );

window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  //-
  //- ドロップダウンボックスのプレースホルダのスタイル
  //-
  function setupSelectPlaceholder() {
    // プレースホルダのクラス名
    var CLASSNAME_PLACEHOLDER_SELECTED = 'CG2-form__placeholder_selected'

    // フォーム内の<select>を抽出
    // セレクタ固定にもやっとするが、いまのとこかなり特定のやつ（フォーム）に依存しているので…
    var selectList = document.querySelectorAll('.CG2-form__table select')
    if (selectList.length === 0) { return }

    // プレースホルダを持った<select>のみ抽出
    // <select>のプレースホルダは、最初の<option>のうちvalueが空なもの
    // ref. https://html.spec.whatwg.org/multipage/forms.html#placeholder-label-option
    selectList = Array.prototype.filter.call(selectList, function (select) {
      return select.querySelector('option[value=""]:first-child') !== null
    })
    if (selectList.length === 0) { return }

    // 初期表示とイベントハンドリング
    selectList.forEach(function (select) {
      select.addEventListener('change', function (event) {
        updateView(select)
      })
      updateView(select)
    })

    // <option>を拾ってプレースホルダか否かでスタイルを切り替える
    function updateView(select) {
      var placeholderElement = select.querySelector('option[value=""]:first-child')

      if (placeholderElement.selected) {
        select.classList.add(CLASSNAME_PLACEHOLDER_SELECTED)
      }
      else {
        select.classList.remove(CLASSNAME_PLACEHOLDER_SELECTED)
      }
    }
  }

  setupSelectPlaceholder()

})

;( function () {


  //     UNDERSCORE PARTIAL (_.template)
  //
  //     Underscore.js 1.8.3
  //     http://underscorejs.org
  //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  var _ = {};

  // Current version.
  _.VERSION = '1.8.3_partial';

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    //settings = _.defaults({}, settings, _.templateSettings);
    settings = _.templateSettings;

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // -------------------------

  var template = _.template( [
    '<section class="CG2-livecode" <% if ( isDeferredPlay ) { %>data-livecode-deferred<% } %> data-livecode-from-oldjade>',
      '<h1><%= title %></h1>',
      '<p><%= text %></p>',
      '<header class="CG2-livecode__header">',
        '<div class="CG2-livecode__nav">',
          '<ul>',
            '<% if ( isDeferredPlay ) { %>',
              '<li><a href="#" data-livecode-play>',
                'サンプルを停止する',
              '</a></li>',
            '<% } %>',
            // '<li><a href="#">',
            //   'ソースコード：<%= fileName %>',
            // '</a></li>',
            '<li><a href="<%= iframeSrc %>" target="_blank">',
              '<span class="CG2-icon-tool"></span> 新規タブで開く',
            '</a></li>',
          '</ul>',
        '</div>',
      '</header>',
      '<div class="CG2-livecode__body">',
        '<iframe ',
          '<% if ( !isDeferredPlay ) { %> src="<%= iframeSrc %>" <% } %> ',
          'data-src="<%= iframeSrc %>" ',
          'class="<%= iframeClass %>"',
          'width="<%= iframeWidth %>" ',
          'height="<%= iframeHeight %>" ',
          'style="<%= iframeStyle %>" ',
          'allowfullscreen="allowfullscreen" ',
        '></iframe>',
        '<% if ( isDeferredPlay ) { %>',
          '<div class="CG2-livecode__clickToPlay" data-livecode-play></div>',
        '<% } %>',
      '</div>',
    '</section>'
  ].join( '' ) );

  var $div = document.createElement( 'div' );

  var attach = function () {}

  window.addEventListener( 'DOMContentLoaded', function () {

    var $elAll = document.querySelectorAll( 'div.Demo' );

    if ( $elAll.length === 0 ) { return; }

    Array.prototype.forEach.call( $elAll, function( $el ) {

      var $iframe = $el.querySelector( 'iframe' );

      if ( !$iframe ) { return; }

      var $title  = $el.querySelector( 'div.Demo-title' );
      var $text   = $el.querySelector( 'div.Demo-comment' );

      var className = $iframe.getAttribute( 'class' );
      var modifierS = 'CG2-livecode__frame--small';
      var modifierL = 'CG2-livecode__frame--large';

      var title          = $title ? $title.innerHTML : '';
      var text           = $text  ? $text.innerHTML  : '';
      var iframeClass    = /sizeS/.test( className ) ? modifierS : /sizeL/.test( className ) ? modifierL : '';
      var iframeSrc      = $iframe.getAttribute( 'src' ) || $iframe.getAttribute( 'data-src' );
      var iframeWidth    = $iframe.getAttribute( 'width' );
      var iframeHeight   = $iframe.getAttribute( 'height' );
      var iframeStyle    = $iframe.getAttribute( 'style' );
      var isDeferredPlay = $iframe.getAttribute( 'data-trigger' ) === 'data-trigger';

      var data = {
        title          : title,
        text           : text,
        iframeClass    : iframeClass,
        iframeSrc      : iframeSrc,
        iframeWidth    : iframeWidth,
        iframeHeight   : iframeHeight,
        iframeStyle    : iframeStyle,
        isDeferredPlay : isDeferredPlay
      }

      var html = template( data );
      $div.innerHTML = html;
      var $livecore = $div.querySelector( '.CG2-livecode' );
      $el.parentNode.replaceChild( $livecore, $el );
      CG2.vent.dispatchEvent( { type: 'livecode-converted', element: $livecore } );

    } );

  } );

} )();

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  // Prism
  var $elAll = document.querySelectorAll( 'pre.code' );

  if ( $elAll.length === 0 ) { return; }

  // http://prismjs.com/extending.html#api
  Array.prototype.forEach.call( $elAll, function( $el ) {

    Array.prototype.some.call( $el.classList, function( className ) {

      if ( className !== 'code' ) {

        var lang = className === 'html' ? 'markup' : className;
        var src = Prism.highlight( $el.innerText, Prism.languages[ lang ] );
        $el.innerHTML = src;
        return true;

      }

    } );

  } );

} );
