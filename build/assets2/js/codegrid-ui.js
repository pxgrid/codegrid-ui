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

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash+coffeescript+git+handlebars+jade+less+markdown+ruby+sass+scss+stylus+typescript+yaml&plugins=line-numbers+autolinker */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=_self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==n)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,o,s=a;s&&!e.test(s.className);)s=s.parentNode;s&&(l=(s.className.match(e)||[,""])[1],o=t.languages[l]),a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,s=a.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var u=a.textContent,g={element:a,language:l,grammar:o,code:u};if(!u||!o)return t.hooks.run("complete",g),void 0;if(t.hooks.run("before-highlight",g),r&&_self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){g.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(g.element),t.hooks.run("after-highlight",g),t.hooks.run("complete",g)},c.postMessage(JSON.stringify({language:g.language,code:g.code}))}else g.highlightedCode=t.highlight(g.code,g.grammar,g.language),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",g),t.hooks.run("complete",g)},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var o=n[l];o="Array"===t.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],g=u.inside,c=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){u.lastIndex=0;var m=u.exec(d);if(m){c&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),N=[p,1];b&&N.push(b);var O=new a(l,g?t.tokenize(m,g):m,h);N.push(O),w&&N.push(w),Array.prototype.splice.apply(r,N)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+o+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;_self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),_self.close()},!1),_self.Prism):_self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;
Prism.languages.bash=Prism.languages.extend("clike",{comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},string:{pattern:/("|')(\\?[\s\S])*?\1/,inside:{property:/\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/}},number:{pattern:/([^\w\.])-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,lookbehind:!0},"function":/\b(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)\b/,keyword:/\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/}),Prism.languages.insertBefore("bash","keyword",{property:/\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/}),Prism.languages.insertBefore("bash","comment",{important:/^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/});;
!function(e){var n=/#(?!\{).+/,t={pattern:/#\{[^}]+\}/,alias:"variable"};e.languages.coffeescript=e.languages.extend("javascript",{comment:n,string:[/'(?:\\?[^\\])*?'/,{pattern:/"(?:\\?[^\\])*?"/,inside:{interpolation:t}}],keyword:/\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,"class-member":{pattern:/@(?!\d)\w+/,alias:"variable"}}),e.languages.insertBefore("coffeescript","comment",{"multiline-comment":{pattern:/###[\s\S]+?###/,alias:"comment"},"block-regex":{pattern:/\/{3}[\s\S]*?\/{3}/,alias:"regex",inside:{comment:n,interpolation:t}}}),e.languages.insertBefore("coffeescript","string",{"inline-javascript":{pattern:/`(?:\\?[\s\S])*?`/,inside:{delimiter:{pattern:/^`|`$/,alias:"punctuation"},rest:e.languages.javascript}},"multiline-string":[{pattern:/'''[\s\S]*?'''/,alias:"string"},{pattern:/"""[\s\S]*?"""/,alias:"string",inside:{interpolation:t}}]}),e.languages.insertBefore("coffeescript","keyword",{property:/(?!\d)\w+(?=\s*:(?!:))/})}(Prism);;
Prism.languages.git={comment:/^#.*$/m,string:/("|')(\\?.)*?\1/m,command:{pattern:/^.*\$ git .*$/m,inside:{parameter:/\s(--|-)\w+/m}},coord:/^@@.*@@$/m,deleted:/^-(?!-).+$/m,inserted:/^\+(?!\+).+$/m,commit_sha1:/^commit \w{40}$/m};;
!function(e){var a=/\{\{\{[\w\W]+?\}\}\}|\{\{[\w\W]+?\}\}/g;e.languages.handlebars=e.languages.extend("markup",{handlebars:{pattern:a,inside:{delimiter:{pattern:/^\{\{\{?|\}\}\}?$/i,alias:"punctuation"},string:/(["'])(\\?.)+?\1/,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,"boolean":/\b(true|false)\b/,block:{pattern:/^(\s*~?\s*)[#\/]\S+/i,lookbehind:!0,alias:"keyword"},brackets:{pattern:/\[[^\]]+\]/,inside:{punctuation:/\[|\]/,variable:/[\w\W]+/}},punctuation:/[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,variable:/[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/}}}),e.languages.insertBefore("handlebars","tag",{"handlebars-comment":{pattern:/\{\{![\w\W]*?\}\}/,alias:["handlebars","comment"]}}),e.hooks.add("before-highlight",function(e){"handlebars"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(a,function(a){return e.tokenStack.push(a),"___HANDLEBARS"+e.tokenStack.length+"___"}))}),e.hooks.add("before-insert",function(e){"handlebars"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),e.hooks.add("after-highlight",function(a){if("handlebars"===a.language){for(var n,t=0;n=a.tokenStack[t];t++)a.highlightedCode=a.highlightedCode.replace("___HANDLEBARS"+(t+1)+"___",e.highlight(n,a.grammar,"handlebars"));a.element.innerHTML=a.highlightedCode}})}(Prism);;
!function(e){e.languages.jade={"multiline-comment":{pattern:/((?:^|\n)([\t ]*))\/\/.*(\n\2[\t ]+.+)*/,lookbehind:!0,alias:"comment"},"multiline-script":{pattern:/((?:^|\n)([\t ]*)script\b.*\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0,inside:{rest:e.languages.javascript}},filter:{pattern:/((?:^|\n)([\t ]*)):.+(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"}}},"multiline-plain-text":{pattern:/((?:^|\n)([\t ]*)[\w\-#.]+\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0},markup:{pattern:/((?:^|\n)[\t ]*)<.+/,lookbehind:!0,inside:{rest:e.languages.markup}},comment:{pattern:/((?:^|\n)[\t ]*)\/\/.+/,lookbehind:!0},doctype:{pattern:/((?:^|\n)[\t ]*)doctype(?: .+)?/,lookbehind:!0},"flow-control":{pattern:/((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|each|while)(?: .+)?/,lookbehind:!0,inside:{each:{pattern:/((?:^|\n)[\t ]*)each .+? in\b/,lookbehind:!0,inside:{keyword:/\b(?:each|in)\b/,punctuation:/,/}},branch:{pattern:/((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|while)/,lookbehind:!0,alias:"keyword"},rest:e.languages.javascript}},keyword:{pattern:/((?:^|\n)[\t ]*)(?:block|extends|include|append|prepend)\b.+/,lookbehind:!0},mixin:[{pattern:/((?:^|\n)[\t ]*)mixin .+/,lookbehind:!0,inside:{keyword:/^mixin/,"function":/\w+(?=\s*\(|\s*$)/,punctuation:/[(),.]/}},{pattern:/((?:^|\n)[\t ]*)\+.+/,lookbehind:!0,inside:{name:{pattern:/^\+\w+/,alias:"function"},rest:e.languages.javascript}}],script:{pattern:/((?:^|\n)[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*) .+/,lookbehind:!0,inside:{rest:e.languages.javascript}},"plain-text":{pattern:/((?:^|\n)[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/,lookbehind:!0},tag:{pattern:/((?:^|\n)[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/,lookbehind:!0,inside:{attributes:[{pattern:/&[^(]+\([^)]+\)/,inside:{rest:e.languages.javascript}},{pattern:/\([^)]+\)/,inside:{"attr-value":{pattern:/(=\s*)(?:\{[^}]*\}|[^,)\n]+)/,lookbehind:!0,inside:{rest:e.languages.javascript}},"attr-name":/[\w-]+(?=\s*!?=|\s*[,)])/,punctuation:/[!=(),]/}}],punctuation:/[:]/}},code:[{pattern:/((?:^|\n)[\t ]*(?:-|!?=)).+/,lookbehind:!0,inside:{rest:e.languages.javascript}}],punctuation:/[.\-!=|]/};for(var t="((?:^|\\n)([\\t ]*)):{{filter_name}}(\\n(?:\\2[\\t ]+.+|\\s*?(?=\\n)))+",n=[{filter:"atpl",language:"twig"},{filter:"coffee",language:"coffeescript"},"ejs","handlebars","hogan","less","livescript","markdown","mustache","plates",{filter:"sass",language:"scss"},"stylus","swig"],a={},i=0,s=n.length;s>i;i++){var l=n[i];l="string"==typeof l?{filter:l,language:l}:l,e.languages[l.language]&&(a["filter-"+l.filter]={pattern:RegExp(t.replace("{{filter_name}}",l.filter)),lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"},rest:e.languages[l.language]}})}e.languages.insertBefore("jade","filter",a)}(Prism);;
Prism.languages.less=Prism.languages.extend("css",{comment:[/\/\*[\w\W]*?\*\//,{pattern:/(^|[^\\])\/\/.*/,lookbehind:!0}],atrule:{pattern:/@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,inside:{punctuation:/[:()]/}},selector:{pattern:/(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,inside:{variable:/@+[\w-]+/}},property:/(\b|\B)(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,punctuation:/[{}();:,]/,operator:/[+\-*\/]/}),Prism.languages.insertBefore("less","punctuation",{"function":Prism.languages.less.function}),Prism.languages.insertBefore("less","property",{variable:[{pattern:/@[\w-]+\s*:/,inside:{punctuation:/:/}},/@@?[\w-]+/],"mixin-usage":{pattern:/([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,lookbehind:!0,alias:"function"}});;
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/(^|\n)>(?:[\t ]*>)*/,lookbehind:!0,alias:"punctuation"},code:[{pattern:/(^|\n)(?: {4}|\t).+/,lookbehind:!0,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*\n(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/((?:^|\n)\s*)#+.+/,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/((?:^|\n)\s*)([*-])([\t ]*\2){2,}(?=\s*(?:\n|$))/,lookbehind:!0,alias:"punctuation"},list:{pattern:/((?:^|\n)\s*)(?:[*+-]|\d+\.)(?=[\t ].)/,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:[^>]|\\>)+>)(?:[\t ]+(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\))$/,punctuation:/[[\]\(\)<>:]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:\n(?!\n)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*\s*$|__\s*$/}},italic:{pattern:/(^|[^\\])(?:\*(?:\n(?!\n)|.)+?\*|_(?:\n(?!\n)|.)+?_)/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:[^"]|\\")*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:[^"]|\\")*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold);;
Prism.languages.ruby=Prism.languages.extend("clike",{comment:/#(?!\{[^\r\n]*?\})[^\r\n]*(\r?\n|$)/,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*[?!]?\b/}),Prism.languages.insertBefore("ruby","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0},variable:/[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/,symbol:/:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/}),Prism.languages.ruby.string={pattern:/("|')(#\{[^}]+\}|\\\n|\\?.)*?\1/,inside:{interpolation:{pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:Prism.util.clone(Prism.languages.ruby)}}}};;
!function(e){e.languages.sass=e.languages.extend("css",{comment:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/^(?:[ \t]*)(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var a=/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,s=/[-+]{1,2}|==?|!=|\|?\||\?|\*|\/|%/;e.languages.insertBefore("sass","property",{"variable-line":{pattern:/(^|(?:\r?\n|\r))[ \t]*\$.+/,lookbehind:!0,inside:{punctuation:/:/,variable:a,operator:s}},"property-line":{pattern:/(^|(?:\r?\n|\r))[ \t]*(?:[^:\s]+[ ]*:.*|:[^:\s]+.*)/i,lookbehind:!0,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:a,operator:s,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,delete e.languages.sass.selector,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*).+(?:,(?:\r?\n|\r)\1[ \t]+.+)*/,lookbehind:!0}})}(Prism);;
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+(\{|;))/i,inside:{rule:/@[\w-]+/}},url:/([-a-z]+-)*url(?=\()/i,selector:{pattern:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{placeholder:/%[-_\w]+/i}}}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/i,alias:"selector"},statement:/\B!(default|optional)\b/i,"boolean":/\b(true|false)\b/,"null":/\b(null)\b/,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);;
Prism.languages.stylus={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},keyword:/(px|r?em|ex|ch|vw|vh|vmin|vmax|deg|grad|rad|turn|m?s|k?Hz|dpi|dppx|dpcm)\b|\b(is|defined|not|isnt|and|or|unless|for|in)\b/g,atrule:/@[\w-]+(?=\s+\S+)/gi,url:/url\((["']?).*?\1\)/gi,variable:/^\s*([\w-]+)(?=\s*[+-\\]?=)/gm,string:/("|')(\\\n|\\?.)*?\1/g,important:/\B!important\b/gi,hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/\d+\.?\d*%?/g,selector:[{pattern:/::?(after|before|first-letter|first-line|selection)/g,alias:"pseudo-element"},{pattern:/:(?:active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|in-range|invalid|lang|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-of-type|only-child|optional|out-of-range|read-only|read-write|required|root|target|valid|visited)(?:\(.*\))?/g,alias:"pseudo-class"},{pattern:/\[[\w-]+?\s*[*~$^|=]?(?:=\s*\S+)?\]/g,inside:{"attr-name":{pattern:/(\[)([\w-]+)(?=\s*[*~$^|=]{0,2})/g,lookbehind:!0},punctuation:/\[|\]/g,operator:/[*~$^|=]/g,"attr-value":{pattern:/\S+/}},alias:"attr"},{pattern:/\.[a-z-]+/i,alias:"class"},{pattern:/#[a-z-]+/i,alias:"id"},{pattern:/\b(html|head|title|base|link|meta|style|script|noscript|template|body|section|nav|article|aside|h[1-6]|header|footer|address|main|p|hr|pre|blockquote|ol|ul|li|dl|dt|dd|figure|figcaption|div|a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|dbo|span|br|wbr|ins|del|image|iframe|embed|object|param|video|audio|source|track|canvas|map|area|sv|math|table|caption|colgroup|col|tbody|thead|tfoot|tr|td|th|form|fieldset|legeng|label|input|button|select|datalist|optgroup|option|textarea|keygen|output|progress|meter|details|summary|menuitem|menu)\b/g,alias:"tag"}],property:[/^\s*([a-z-]+)(?=\s+[\w\W]+|\s*:)(?!\s*\{|\r?\n)/gim,{pattern:/(\(\s*)([a-z-]+)(?=\s*:)/gi,lookbehind:!0}],"function":/[-a-z0-9]+(?=\()/gi,punctuation:/[\{\};:]/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g};;
Prism.languages.typescript=Prism.languages.extend("javascript",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/});;
Prism.languages.yaml={scalar:{pattern:/([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:(\n[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,lookbehind:!0,alias:"string"},comment:/#[^\n]+/,key:{pattern:/(\s*[:\-,[{\n?][ \t]*(![^\s]+)?[ \t]*)[^\n{[\]},#]+?(?=\s*:\s)/,lookbehind:!0,alias:"atrule"},directive:{pattern:/((^|\n)[ \t]*)%[^\n]+/,lookbehind:!0,alias:"important"},datetime:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*(\n|$|,|]|}))/,lookbehind:!0,alias:"number"},"boolean":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=\n|$|,|]|})/i,lookbehind:!0,alias:"important"},"null":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=\n|$|,|]|})/i,lookbehind:!0,alias:"important"},string:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')(?=[ \t]*(\n|$|,|]|}))/,lookbehind:!0},number:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\dA-Fa-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=\n|$|,|]|})/i,lookbehind:!0},tag:/![^\s]+/,important:/[&*][\w]+/,punctuation:/([:[\]{}\-,|>?]|---|\.\.\.)/};;
Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var a,n=e.code.match(/\n(?!$)/g).length+1,l=new Array(n+1);l=l.join("<span></span>"),a=document.createElement("span"),a.className="line-numbers-rows",a.innerHTML=l,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(a)}}});;
!function(){if(self.Prism){var i=/\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:#=?&amp;]+/,n=/\b\S+@[\w.]+[a-z]{2}/,t=/\[([^\]]+)]\(([^)]+)\)/,e=["comment","url","attr-value","string"];for(var a in Prism.languages){var r=Prism.languages[a];Prism.languages.DFS(r,function(a,r,l){e.indexOf(l)>-1&&"Array"!==Prism.util.type(r)&&(r.pattern||(r=this[a]={pattern:r}),r.inside=r.inside||{},"comment"==l&&(r.inside["md-link"]=t),"attr-value"==l?Prism.languages.insertBefore("inside","punctuation",{"url-link":i},r):r.inside["url-link"]=i,r.inside["email-link"]=n)}),r["url-link"]=i,r["email-link"]=n}Prism.hooks.add("wrap",function(i){if(/-link$/.test(i.type)){i.tag="a";var n=i.content;if("email-link"==i.type&&0!=n.indexOf("mailto:"))n="mailto:"+n;else if("md-link"==i.type){var e=i.content.match(t);n=e[2],i.content=e[1]}i.attributes.href=n}})}}();;

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

  var i = 0;
  var modifier = 'js-drawer--show';
  var html = document.documentElement;
  var body = document.body;
  var scrollTop;
  var scrollbarWidth = ( function () {

    // http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    var outer = document.createElement( 'div' );
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';

    document.body.appendChild( outer );

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

  var isHidden = true;
  var openEl, closeEl, toggleEl;
  var openEls   = document.querySelectorAll( '[data-drawer-show]' );
  var closeEls  = document.querySelectorAll( '[data-drawer-hide]' );
  var toggleEls = document.querySelectorAll( '[data-drawer-toggle]' );

  for ( i = 0, openEl; openEl = openEls[ i ]; i = ( i + 1 )|0 ) {

    openEl.addEventListener( 'click', navOpen );

  }

  for ( i = 0, closeEl; closeEl = closeEls[ i ]; i = ( i + 1 )|0 ) {

    closeEl.addEventListener( 'click', navClose );

  }

  for ( i = 0, toggleEl; toggleEl = toggleEls[ i ]; i = ( i + 1 )|0 ) {

    toggleEl.addEventListener( 'click', navToggle );

  }

  function navOpen () {

    if ( !isHidden ) { return; }

    isHidden = false;
    scrollTop = html.scrollTop || body.scrollTop;
    html.className += ' ' + modifier;
    html.style.paddingRight  = scrollbarWidth + 'px';
    body.style.marginTop     = -scrollTop     + 'px';
    body.style.paddingBottom =  scrollTop     + 'px';

  };

  function navClose () {

    if ( isHidden ) { return; }

    var re = new RegExp( ' ' + modifier );
    isHidden = true;
    html.className = html.className.replace( re, '' );
    html.style.paddingRight  = 0;
    body.style.marginTop     = 0;
    body.style.paddingBottom = 0;
    window.scrollTo( 0, scrollTop );

  };

  function navToggle () {

    if ( isHidden ) {

      navOpen();

    } else {

      navClose();

    }

  };

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

        if ( CG2.screenType !== 'middle' ) { return; }

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

      if ( parent !== null && parent.matches( selector ) ) {

        return parent;

      }

      element = parent;

    }

    return null;

  }

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $el = document.querySelector( '.CG2-searchOption__body' );

  if ( !$el ) { return; }

  var $open  = $el.querySelector( '.CG2-searchOption__opener' );
  var $close = $el.querySelector( '.CG2-searchOption__button' );
  var modifier = 'CG2-searchOption--show';

  $open.addEventListener( 'click', show );
  $close.addEventListener( 'click', hide );

  function show ( e ) {

    e.preventDefault();
    $el.classList.add( modifier );

  }

  function hide ( e ) {

    e.preventDefault();
    $el.classList.remove( modifier );

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

  var _replaceTargetRe = /([0-9]+)/g;

  var _replaceFunc = function(str, ptn1) {

    var num = ptn1|0;

    return lookup[num] || num;

  };

  var replace = function( text ) {

    return text.replace(_replaceTargetRe, _replaceFunc);

  };

  var $inner = document.querySelector( '.CG2-articleSeriesNav__inner' );
  var $clone = $inner.cloneNode( true );

  Array.prototype.forEach.call( $clone.querySelectorAll( 'li' ) , function( $li ) {

    var $leaf = $li.querySelector( 'a' ) || $li;

    $leaf.textContent = replace( $leaf.textContent );

  } );

  $el.replaceChild( $clone, $inner );

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var $elAll   = document.querySelectorAll( '.CG2-livecode[data-livecode-deferredplay]:not( [data-livecode-from-oldjade] )' );
  var modifire = 'CG2-livecode--isRunning';

  var attach   = function( $el ) {

    var isRunning = false;
    var $play   = $el.querySelectorAll( '[data-livecode-play]' );
    var $iframe = $el.querySelector( 'iframe[data-livecode-src]' );
    var src = $iframe.getAttribute( 'data-livecode-src' );

    var toggle = function ( e ) {

      e.preventDefault();

      if ( isRunning ) {

        $iframe.removeAttribute( 'src' );
        $el.classList.remove( modifire );
        isRunning = false;

      } else {

        $iframe.setAttribute( 'src', src );
        $el.classList.add( modifire );
        isRunning = true;

      }

    }

    Array.prototype.forEach.call( $play, function( $item ) {

      $item.addEventListener( 'click', toggle );

    } );

  }

  Array.prototype.forEach.call( $elAll, attach );
  
  CG2.vent.addEventListener( 'livecode-converted', function ( e ) {

    var deferredplay = e.element.getAttribute( 'data-livecode-deferredplay' ) !== null;

    if ( deferredplay ) { attach( e.element ); }

  } );

} );

window.addEventListener( 'DOMContentLoaded', function () {

  'use strict';

  var url = location.href.replace( location.hash, '' );
  var html = [
    '<div class="CG2-articleUtil__socialItem CG2-articleUtil__socialItem--twitter">',
      '<a href="http://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="' + url + '" data-text="<%= title %>" data-hashtags="codegrid">Tweet</a>',
    '</div>',
    '<div class="CG2-articleUtil__socialItem CG2-articleUtil__socialItem--facebook">',
      '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent( url ) + '&amp;send=false&amp;layout=standard&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=68" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:68px;" allowTransparency="true"></iframe>',
    '</div>'
  ].join( '' );
  var $elAll = document.querySelectorAll( '.CG2-articleUtil' );

  Array.prototype.forEach.call( $elAll, function( $el ) {

    var $button      = $el.querySelector( '[data-socialitems-append]' );
    var $placeholder = $el.querySelector( '.CG2-articleUtil__socialItems' );

    var append = function ( e ) {
      
      e.preventDefault();

      if ( $button.classList.contains( 'CG2-button--disabled' ) ) {

        return;

      }

      $button.classList.add( 'CG2-button--disabled' );
      $placeholder.innerHTML = html;
      twttr.widgets.load();

    }

    $button.addEventListener( 'click', append );

  } );

} );

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
    '<section class="CG2-livecode" <% if ( isDeferredPlay ) { %>data-livecode-deferredplay<% } %> data-livecode-from-oldjade>',
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
          'data-livecode-src="<%= iframeSrc %>" ',
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

    Array.prototype.forEach.call( $elAll, function( $el ) {

      var $iframe = $el.querySelector( 'iframe' );
      var $title  = $el.querySelector( 'div.Demo-title' );
      var $text   = $el.querySelector( 'div.Demo-comment' );

      var className = $iframe.getAttribute( 'class' );
      var modifierS = 'CG2-livecode__frame--small';
      var modifierL = 'CG2-livecode__frame--large';

      var title          = $title ? $title.innerHTML : '';
      var text           = $text  ? $text.innerHTML  : '';
      var iframeClass    = /sizeS/.test( className ) ? modifierS : /sizeL/.test( className ) ? modifierL : '';
      var iframeSrc      = $iframe.getAttribute( 'src' );
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
