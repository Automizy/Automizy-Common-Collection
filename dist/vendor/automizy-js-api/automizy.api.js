(function($){
var $AA = {};
(function(){
    $AA = new function () {
        var t = this;
        t.xhr = {};
        t.url = {};
        t.d = {
            version: '0.1.0',
            login:false,
            hasOpenLoginForm:true,
            lastAjaxData:{},
            data:{},
            ad:{
                error:function (jqXHR, textStatus, errorThrown) {
                    if(arguments.length === 3) {
                        if ($.inArray(jqXHR.status, [404, 405]) >= 0) {
                            alert(jqXHR.status + ' (' + errorThrown + ')');
                        } else if ($.inArray(jqXHR.status, [403]) >= 0) {
                            $AA.d.lastAjaxData = this;
                            $AA.openLoginDialog();
                        } else if ($.inArray(jqXHR.status, [400, 401]) >= 0) {
                            alert(jqXHR.status + ' (' + errorThrown + ')');
                            $AA.openLoginDialog();
                        } else {
                            console.error(jqXHR.status, textStatus, errorThrown);
                        }
                    }else{
                        console.log('<----------- Automizy Api Error');
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                        console.log('Automizy Api Error ----------->');
                        $AA.openLoginDialog();
                    }
                }
            }
        };


        var baseApiUrl = window.automizyApiBaseUrl || window.AutomizyBaseApiUrl || "https://api.automizy.com";
        var loginApiUrl = window.automizyApiLoginPhp || window.AutomizyLoginApiUrl || "https://login.automizy.com/api/login.php";
        var refreshApiUrl = window.automizyApiRefreshPhp || window.AutomizyRefreshApiUrl || "https://login.automizy.com/api/refresh.php";

        t.u = {
            //base:baseApiUrl,
            //loginPhp: loginApiUrl,
            //refreshPhp: refreshApiUrl,
            //oauth: baseUrl + '/oauth',
            //segments: baseUrl + '/segments',
            //campaigns: baseUrl + '/campaigns',
            //splitTests: baseUrl + '/split-tests',
            //newsletters: baseUrl + '/newsletters',
            //automationEmails: baseUrl + '/automations/emails',
            //contacts: baseUrl + '/contacts',
            //contactTags: baseUrl + '/contacts/tags',
            //contactsTagManager: baseUrl + '/contacts/tag-manager',
            //customFields: baseUrl + '/custom-fields',
            //users: baseUrl + '/users',
            //jobs: baseUrl + '/jobs',
            //webhooks: baseUrl + '/webhooks',
            //images: baseUrl + '/images',
            //templates: baseUrl + '/templates',
            //forms: baseUrl + '/forms',
            //automations: baseUrl + '/automations',
            //account: baseUrl + '/account',
            //accountStatistics: baseUrl + '/account/statistics',
            //contactImports: baseUrl + '/contact-imports',
            //tags: baseUrl + '/tags',
            //clients: baseUrl + '/clients',
            //updates: baseUrl + '/updates',
            //plugins: baseUrl + '/plugins',
            //milestones: baseUrl + '/milestones',
            //leadScores: baseUrl + '/lead-scores',
            //unbounceForms: baseUrl + '/external/unbounce/forms',
            //autoDetectedForms: baseUrl + '/forms/autodetect',
            //invoices: baseUrl + '/invoices',

            //emailPreview: baseUrl + '/email-preview'
        };

        t.m = [];
    }();
})();

(function(){

    $AA.baseUrl = function(url){
        if(typeof url !== 'undefined') {
            $AA.url.base = url;
            return $AA;
        }
        return $AA.url.base;
    };

    $AA.createUrl = function(name){
        if(typeof $AA.url[name] === 'undefined'){
            $AA.url[name] = {
                urlOrApiName:'',
                useBaseUrl:false
            };
        }
        $AA[name + 'Url'] = function(urlOrApiName, useBaseUrl){
            if(typeof urlOrApiName !== 'undefined') {
                $AA.url[name].urlOrApiName = urlOrApiName;
                $AA.url[name].useBaseUrl = useBaseUrl || false;
                return $AA;
            }
            return $AA.url[name].useBaseUrl ? ($AA.baseUrl() + '/' + $AA.url[name].urlOrApiName) : $AA.url[name].urlOrApiName;
        };
        return $AA[name + 'Url'];
    };

    $AA.baseUrl(window.automizyApiBaseUrl || window.AutomizyBaseApiUrl || "https://api.automizy.com");

    $AA.createUrl('login')(window.automizyApiLoginPhp || window.AutomizyLoginApiUrl || "https://login.automizy.com/api/login.php");
    $AA.createUrl('refresh')(window.automizyApiRefreshPhp || window.AutomizyRefreshApiUrl || "https://login.automizy.com/api/refresh.php");
    $AA.createUrl('oauth')("oauth", true);
    $AA.createUrl('images')("images", true);
    $AA.createUrl('emaileditorImages')("images?directory=emaileditor", true);
    $AA.createUrl('emailPreview')("email-preview", true);

    $AA.createUrl('loginPage')(window.AutomizyLoginPageUrl || "https://login.automizy.com");

})();

(function(){
    $AA.cookie = function () {
        function extend () {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[ i ];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        }

        function init (converter) {
            function api (key, value, attributes) {
                var result;

                // Write

                if (arguments.length > 1) {
                    attributes = extend({
                        path: '/'
                    }, api.defaults, attributes);

                    if (typeof attributes.expires === 'number') {
                        var expires = new Date();
                        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                        attributes.expires = expires;
                    }

                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}

                    value = encodeURIComponent(String(value));
                    value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);

                    return (document.cookie = [
                        key, '=', value,
                        attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                        attributes.path    && '; path=' + attributes.path,
                        attributes.domain  && '; domain=' + attributes.domain,
                        attributes.secure  && '; secure'
                    ].join(''));
                }

                // Read

                if (!key) {
                    result = {};
                }

                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling "get()"
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    var cookie = parts.slice(1).join('=');

                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }

                    cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                }

                return result;
            }

            api.get = api.set = api;
            api.getJSON = function () {
                return api.apply({
                    json: true
                }, [].slice.call(arguments));
            };
            api.defaults = {};

            api.remove = function (key, attributes) {
                api(key, '', extend(attributes, {
                    expires: -1
                }));
            };

            api.withConverter = init;

            return api;
        }

        return init();
    }();
})();

(function(){
    $AA.date = {};
    $AA.date.now = function () {
        return new Date().getTime();
    };
    $AA.date.timestamp = function () {
        return Math.floor($AA.date.now() / 1000);
    };
})();

(function(){
    var Token = function () {
        var t = this;
        t.d = {
            access_token: $AA.cookie.get('AutomizyApiAccessToken') || false,
            refresh_token: $AA.cookie.get('AutomizyApiRefreshToken') || false,
            client_id: $AA.cookie.get('AutomizyApiClientId') || false,
            username: $AA.cookie.get('AutomizyApiUsername') || false,
            expires: parseInt($AA.cookie.get('AutomizyApiExpires')) || 0,
            scope: $AA.cookie.get('AutomizyApiScope') || null,
            token_type: $AA.cookie.get('AutomizyApiTokenType') || "Bearer",
            error:function(){},
            success:function(){},
            loginError:function(){},
            loginAjaxError:function(){},
            loginAjaxSuccess:function(){},
            refreshAjaxError:function(){},
            refreshAjaxSuccess:function(){},
            refreshLoopTimeout:false
        };
    };

    var p = Token.prototype;

    p.refreshLoop = function(){
        var t = this;
        if ($AA.date.timestamp() > parseInt($AA.cookie.get('AutomizyApiExpires')) - 120) {
            t.refresh();
        }
        clearTimeout(t.d.refreshLoopTimeout);
        t.d.refreshLoopTimeout = setTimeout(function(){
            t.refreshLoop();
        }, 30000);
    };
    p.refreshLoopStop = function(){
        var t = this;
        clearTimeout(t.d.refreshLoopTimeout);
    };
    p.refreshLoopStart = function(){
        var t = this;
        t.refreshLoop();
    };
    p.refreshLoopRestart = function(){
        var t = this;
        t.refreshLoopStop();
        t.refreshLoopStart();
    };

    p.loggedIn = function(loggedIn){
        var t = this;
        if (typeof loggedIn !== 'undefined') {
            t.d.loggedIn = $AA.parseBoolean(loggedIn);
            return t;
        }
        return t.d.loggedIn;
    };

    p.get = function () {
        var t = this;
        if($AA.cookie.get('AutomizyApiAccessToken') !== false){
            t.loggedIn(true);
            t.refreshLoopRestart();
        }else{
            t.refreshLoopStop();
            t.loggedIn(false);
        }
        return $AA.cookie.get('AutomizyApiAccessToken');
    };

    p.set = function (token) {
        var t = this;

        if(typeof token.access_token !== 'undefined'){
            t.d.access_token = token.access_token;
            $AA.cookie.set('AutomizyApiAccessToken', token.access_token, t.cookieAttributes())
        }
        if(typeof token.expires_in !== 'undefined'){
            t.d.expires = $AA.date.timestamp() + parseInt(token.expires_in) - 10;
            $AA.cookie.set('AutomizyApiExpires', t.d.expires, t.cookieAttributes())
        }
        if(typeof token.refresh_token !== 'undefined'){
            t.d.refresh_token = token.refresh_token;
            $AA.cookie.set('AutomizyApiRefreshToken', token.refresh_token, t.cookieAttributes())
        }
        if(typeof token.scope !== 'undefined'){
            t.d.scope = token.scope;
            if(t.d.scope !== false)$AA.cookie.set('AutomizyApiScope', token.scope, t.cookieAttributes());
        }
        if(typeof token.token_type !== 'undefined'){
            t.d.token_type = token.token_type;
            $AA.cookie.set('AutomizyApiTokenType', token.token_type, t.cookieAttributes())
        }
        if(typeof token.client_id !== 'undefined'){
            t.d.client_id = token.client_id;
            $AA.cookie.set('AutomizyApiClientId', token.client_id, t.cookieAttributes())
        }
        if(typeof token.username !== 'undefined'){
            t.d.username = token.username;
            $AA.cookie.set('AutomizyApiUsername', token.username, t.cookieAttributes())
        }

        return true;
    };

    p.refresh = function () {
        var t = this;
        return $.ajax({
            type: "POST",
            url: $AA.refreshUrl(),
            data: {
                refresh_token: $AA.cookie.get('AutomizyApiRefreshToken'),
                username: $AA.cookie.get('AutomizyApiUsername'),
                admin:($AA.cookie.get('automizyAdminUser') == 1)
            },
            success: function (data, textStatus, jqXHR) {
                t.set(data);
                t.loggedIn(true);
                t.refreshAjaxSuccess.apply(t, [data, textStatus, jqXHR]);
            },
            error: function(jqXHR, textStatus, errorThrown){
                t.refreshAjaxError.apply(t, [jqXHR, textStatus, errorThrown]);
            }
        });
    };

    p.error = function(error){
        var t = this;
        if (typeof error === 'function') {
            t.d.error = error;
            return t;
        }
        return t.d.error;
    };
    p.success = function(success){
        var t = this;
        if (typeof success === 'function') {
            t.d.success = success;
            return t;
        }
        return t.d.success;
    };
    p.loginError = function(loginError){
        var t = this;
        if (typeof loginError === 'function') {
            t.d.loginError = loginError;
            return t;
        }
        return t.d.loginError;
    };
    p.loginAjaxError = function(loginAjaxError){
        var t = this;
        if (typeof loginAjaxError === 'function') {
            t.d.loginAjaxError = loginAjaxError;
            return t;
        }
        return t.d.loginAjaxError;
    };
    p.loginAjaxSuccess = function(loginAjaxSuccess){
        var t = this;
        if (typeof loginAjaxSuccess === 'function') {
            t.d.loginAjaxSuccess = loginAjaxSuccess;
            return t;
        }
        return t.d.loginAjaxSuccess;
    };
    p.refreshAjaxError = function(refreshAjaxError){
        var t = this;
        if (typeof refreshAjaxError === 'function') {
            t.d.refreshAjaxError = refreshAjaxError;
            return t;
        }
        return t.d.refreshAjaxError;
    };
    p.refreshAjaxSuccess = function(refreshAjaxSuccess){
        var t = this;
        if (typeof refreshAjaxSuccess === 'function') {
            t.d.refreshAjaxSuccess = refreshAjaxSuccess;
            return t;
        }
        return t.d.refreshAjaxSuccess;
    };

    p.passwordLogin = function (obj) {
        var t = this;
        var obj = obj || {};
        obj.username = obj.username || false;
        obj.password = obj.password || false;
        obj.hash = obj.hash || false;

        if (obj.username === false || obj.password === false) {
            t.loginError.apply(t, ['The username and password must be provide!']);
            return false;
        }

        $AA.cookie.set('AutomizyApiUsername', obj.username, t.cookieAttributes());
        $AA.cookie.set('automizyLoginPageUrl', $AA.loginPageUrl(), t.cookieAttributes());

        var data = {
            username: obj.username,
            password: obj.password
        };
        if(obj.hash !== false){
            data.hash = obj.hash;
        }

        return $.ajax({
            type: "POST",
            url: $AA.loginUrl(),
            data: data,
            success: function (data, textStatus, jqXHR) {
                t.set(data);
                t.loggedIn(true);
                t.refreshLoopRestart();
                t.d.loginAjaxSuccess.apply(t, [data, textStatus, jqXHR]);
            },
            error: function(jqXHR, textStatus, errorThrown){
                t.d.loginAjaxError.apply(t, [jqXHR, textStatus, errorThrown]);
            }
        });
    };

    p.credentialsLogin = function (obj) {
        var t = this;
        var obj = obj || {};
        obj.clientId = obj.clientId || false;
        obj.clientSecret = obj.clientSecret || false;
        obj.hash = obj.hash || false;

        if (obj.clientId === false || obj.clientSecret === false) {
            t.loginError.apply(t, ['The clientId and clientSecret must be provide!']);
            return false;
        }

        var data = {
            grant_type: "client_credentials",
            client_id: obj.clientId,
            client_secret: obj.clientSecret
        };
        if(obj.hash !== false){
            data.hash = obj.hash;
        }

        return $.ajax({
            type: "POST",
            url: $AA.oauthUrl(),
            data: data,
            success: function (data, textStatus, jqXHR) {
                t.set(data);
                t.loggedIn(true);
                t.refreshLoopRestart();
                t.d.loginAjaxSuccess.apply(t, [data, textStatus, jqXHR]);
            },
            error: function(jqXHR, textStatus, errorThrown){
                t.d.loginAjaxError.apply(t, [jqXHR, textStatus, errorThrown]);
            }
        });
    };

    p.login = function (obj) {
        var t = this;
        var obj = obj || {};
        if (typeof obj.username !== 'undefined' && typeof obj.password !== 'undefined') {
            return t.passwordLogin(obj);
        }else if (typeof obj.clientId !== 'undefined' && typeof obj.clientSecret !== 'undefined') {
            return t.credentialsLogin(obj);
        } else {
            t.loginError.apply(t, ['Missing parameters!']);
            return false;
        }
    };

    p.cookieAttributes = function(){
        var obj = {};
        if(location.host.indexOf('.protopmail.com') >= 0){
            obj.domain = '.protopmail.com';
        }else if(location.host.indexOf('.automizy.com') >= 0){
            obj.domain = '.automizy.com';
        }else{
            obj.domain = location.hostname;
        }
        return obj;
    };

    p.logout = function(){
        var t = this;
        t.loggedIn(false);
        t.refreshLoopStop();
        t.d.access_token = false;
        t.d.refresh_token = false;
        t.d.username = false;
        t.d.client_id = false;
        t.d.expires = 0;
        $AA.cookie.remove('AutomizyApiAccessToken', t.cookieAttributes());
        $AA.cookie.remove('AutomizyApiRefreshToken', t.cookieAttributes());
        $AA.cookie.remove('AutomizyApiClientId', t.cookieAttributes());
        $AA.cookie.remove('AutomizyApiExpires', t.cookieAttributes());
        $AA.cookie.remove('AutomizyApiUsername', t.cookieAttributes());
    };

    $AA.m.Token = Token;
    $AA.d.token = new Token();
    $AA.token = function () {
        return $AA.d.token;
    }
})();

(function(){
    $AA.initBasicFunctions = function (module, moduleName, settings) {

        var module = module || false;
        if (module === false) {
            return false;
        }
        var moduleName = moduleName || false;
        if (moduleName === false)
            return false;
        var moduleNameLower = moduleName.toLowerCase();
        var moduleNameLowerFirst = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);

        var settings = settings || {};


        var p = module.prototype;

        p.init = p.init || function () {
                var t = this;

                t.d = t.d || {};
                t.d.option = t.d.option || {};
                t.d.xhr = t.d.xhr || {};
                t.d.xhr.get = false;
                t.d.xhr.insert = false;
                t.d.xhr.update = false;
                t.d.xhr.delete = false;
                t.d.xhr.export = false;
                t.d.xhr.getAll = false;
                t.d.xhr.getRecordById = false;
                t.d.xhr.getFieldById = false;
                t.d.xhr.getAllIdNamePair = false;

                if (typeof t.d.urlSuffix === 'undefined') {
                    t.d.urlSuffix = '';
                }
                if (typeof t.d.itemsDir === 'undefined') {
                    t.d.itemsDir = false;
                }
                if (typeof t.d.fields === 'undefined') {
                    t.d.fields = false;
                }
                if (typeof t.d.format === 'undefined') {
                    t.d.format = false;
                }
                if (typeof t.d.limit === 'undefined') {
                    t.d.limit = false;
                }
                if (typeof t.d.page === 'undefined') {
                    t.d.page = false;
                }
                if (typeof t.d.order_by === 'undefined') {
                    t.d.order_by = false;
                }
                if (typeof t.d.order_dir === 'undefined') {
                    t.d.order_dir = false;
                }
                if (typeof t.d.links === 'undefined') {
                    t.d.links = false;
                }
                if (typeof t.d.set === 'undefined') {
                    t.d.set = {};
                }
                if (typeof t.d.hasEmbedded === 'undefined') {
                    t.d.hasEmbedded = true;
                }
                if (typeof t.d.hasId === 'undefined') {
                    t.d.hasId = true;
                }
                if (typeof t.d.parentName === 'undefined') {
                    t.d.parentName = moduleNameLowerFirst;
                }
            };
        p.initParameter = p.initParameter || function (obj) {
                var t = this;
                if (typeof obj.urlSuffix !== 'undefined')
                    t.urlSuffix(obj.urlSuffix);
                if (typeof obj.itemsDir !== 'undefined')
                    t.itemsDir(obj.itemsDir);
                if (typeof obj.format !== 'undefined')
                    t.format(obj.format);
                if (typeof obj.fields !== 'undefined')
                    t.fields(obj.fields);
                if (typeof obj.limit !== 'undefined')
                    t.limit(obj.limit);
                if (typeof obj.page !== 'undefined')
                    t.page(obj.page);
                if (typeof obj.orderBy !== 'undefined' || typeof obj.order_by !== 'undefined')
                    t.orderBy(obj.orderBy || obj.order_by);
                if (typeof obj.orderDir !== 'undefined' || typeof obj.order_dir !== 'undefined')
                    t.orderDir(obj.orderDir || obj.order_dir);
                if (typeof obj.order !== 'undefined')
                    t.order(obj.order);
                if (typeof obj.links !== 'undefined')
                    t.links(obj.links);
            };

        p.setOptions = p.setOptions || function (obj) {
                if (typeof obj.fields !== 'undefined')
                    t.d.option.fields = obj.fields;  //mezők vesszővel
                if (typeof obj.format !== 'undefined')
                    t.d.option.format = obj.format; //format data
                if (typeof obj.limit !== 'undefined')
                    t.d.option.limit = obj.limit; //hány darab
                if (typeof obj.page !== 'undefined')
                    t.d.option.page = obj.page;  //hanyadik elemtől
                if (typeof obj.where !== 'undefined')
                    t.d.option.where = obj.where;  //feltétel
                if (typeof obj.order_by !== 'undefined')
                    t.d.option.order_by = obj.order_by; //mi szerint rendezzen
                if (typeof obj.order_dir !== 'undefined')
                    t.d.option.order_dir = obj.order_dir; //desc vagy asc
                if (typeof obj.order !== 'undefined')
                    t.d.option.order = obj.order; //name:desc
                if (typeof obj.links !== 'undefined')
                    t.d.option.links = obj.links; //milyen linkek kellenek vesszővel
            };
        p.getDataFromParameter = p.getDataFromParameter || function (obj) {
                var data = {};
                if (obj.fields !== false)
                    data.fields = obj.fields;
                if (obj.format !== false)
                    data.format = obj.format;
                if (obj.limit !== false)
                    data.limit = obj.limit;
                if (obj.page !== false)
                    data.page = obj.page;
                if (obj.where !== false)
                    data.where = obj.where;
                if (obj.order_dir !== false)
                    data.order_dir = obj.order_dir;
                if (obj.order_by !== false)
                    data.order_by = obj.order_by;
                if (obj.order !== false)
                    data.order = obj.order;
                if (obj.links !== false)
                    data.links = obj.links;
                return data;
            };

        p.get = p.get || function (obj, isMod, async) {
                var t = this;
                var isMod = true;   //modify the options from the 'obj' object
                if (typeof async !== 'undefined') {
                    async = $AA.parseBoolean(async);
                } else {
                    var async = true;
                }

                if (typeof isMod !== 'undefined') {
                    isMod = $AA.parseBoolean(isMod);
                }
                if (isMod && (typeof obj === 'object' || typeof obj === 'array')) {
                    t.setOptions(obj)
                }

                var data = {};
                if (typeof obj === 'object' || typeof obj === 'array') {
                    data = t.getDataFromParameter(obj);
                } else {
                    for (var i in t.d.option) {
                        if (t.d.option[i] !== false) {
                            data[i] = t.d.option[i];
                        }
                    }
                }

                if (typeof data.order === 'undefined' && typeof data.order_by !== 'undefined') {
                    data.order = data.order_by + ':' + data.order_dir || 'asc'
                }

                t.d.xhr.get = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + t.d.urlSuffix,
                    type: 'GET',
                    dataType: 'json',
                    async: async,
                    data: data,
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                if (!async) {
                    return t.d.xhr.get.responseJSON;
                }
                return t.d.xhr.get;
            };
        p.getSync = p.getSync || function (obj, isMod) {
                var obj = obj || false;
                var isMod = isMod || false;
                return this.get.apply(this, [obj, isMod, false]);
            };
        p.export = p.export || function (obj, isMod, async) {
                var t = this;
                var isMod = true;
                if (typeof async !== 'undefined') {
                    async = $AA.parseBoolean(async);
                } else {
                    var async = true;
                }

                if (typeof isMod !== 'undefined') {
                    isMod = $AA.parseBoolean(isMod);
                }
                if (isMod && (typeof obj === 'object' || typeof obj === 'array')) {
                    t.setOptions(obj)
                }

                var data = {};
                if (typeof obj === 'object' || typeof obj === 'array') {
                    data = t.getDataFromParameter(obj);
                } else {
                    for (var i in t.d.option) {
                        if (t.d.option[i] !== false) {
                            data[i] = t.d.option[i];
                        }
                    }
                }

                if (typeof data.order === 'undefined' && typeof data.order_by !== 'undefined') {
                    data.order = data.order_by + ':' + data.order_dir || 'asc'
                }
                data.showContent = false;
                t.d.xhr.export = $.ajax({
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.addEventListener("progress", function (evt) {

                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                console.log(parseInt(percentComplete * 100));
                            }
                        }, false);
                        return xhr;
                    },
                    url: $AA[moduleNameLowerFirst + 'Url']() + t.d.urlSuffix,
                    type: 'GET',
                    //dataType: 'json',
                    async: async,
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + $AA.token().get(),
                        Accept: 'text/csv'
                    },
                    error: $AA.token().error()
                });
                if (!async) {
                    return t.d.xhr.export.responseJSON;
                }
                return t.d.xhr.export;
            };

        p.insert = p.insert || function (obj, async) {
                $AA.xhr[moduleNameLowerFirst + 'Modified'] = true;
                $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] = true;
                var t = this;
                if (typeof async !== 'undefined') {
                    async = $AA.parseBoolean(async);
                } else {
                    var async = true;
                }

                var data = obj;

                t.d.xhr.insert = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + t.d.urlSuffix,
                    type: 'POST',
                    dataType: 'json',
                    async: async,
                    data: data,
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                if (!async) {
                    return t.d.xhr.insert.responseJSON;
                }
                return t.d.xhr.insert;
            };
        p.insertSync = p.insertSync || function (obj) {
                var obj = obj || false;
                return this.insert.apply(this, [obj, false]);
            };

        p.update = p.update || function (obj, id, async) {
                $AA.xhr[moduleNameLowerFirst + 'Modified'] = true;
                $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] = true;
                var t = this;
                if (typeof async !== 'undefined') {
                    async = $AA.parseBoolean(async);
                } else {
                    var async = true;
                }

                var data = obj;
                var id = id || obj.id || 0;
                delete data.id;

                t.d.xhr.update = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + '/' + id + t.d.urlSuffix,
                    type: 'PATCH',
                    dataType: 'json',
                    async: async,
                    data: data,
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                if (!async) {
                    return t.d.xhr.update.responseJSON;
                }
                return t.d.xhr.update;
            };
        p.updateSync = p.updateSync || function (obj, id) {
                var obj = obj || false;
                var id = id || false;
                return this.update.apply(this, [obj, id, false]);
            };

        p.delete = p.delete || function (id, async) {
                $AA.xhr[moduleNameLowerFirst + 'Modified'] = true;
                $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] = true;
                var t = this;
                if (typeof async !== 'undefined') {
                    async = $AA.parseBoolean(async);
                } else {
                    var async = true;
                }

                t.d.xhr.delete = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + '/' + id + t.d.urlSuffix,
                    type: 'DELETE',
                    dataType: 'json',
                    async: async,
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                if (!async) {
                    return t.d.xhr.delete.responseJSON;
                }
                return t.d.xhr.delete;
            };
        p.deleteSync = p.deleteSync || function (id) {
                var id = id || false;
                return this.delete.apply(this, [id, false]);
            };


        /*
         [
         [
         ['name', '=', 'Tilda'],
         ['age', '<=', 18]
         ],
         [
         ['name', 'like', 'Thom%'],
         ['age', 'in', [18, 20, 21]]
         ],
         [
         ['name', 'like', 'Thom%'],
         ['age', 'between', [18, 22]]
         ]
         ]
         */


        p.getAll = p.getAll || function () {
                var t = this;
                t.d.xhr.getAll = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + t.d.urlSuffix,
                    type: 'GET',
                    dataType: 'json',
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                return t.d.xhr.getAll;
            };
        p.getRecordById = p.getRecordById || function (id) {
                var t = this;

                var data = {};

                for (var i in t.d.option) {
                    if (t.d.option[i] !== false) {
                        data[i] = t.d.option[i];
                    }
                }

                if (typeof data.order === 'undefined' && typeof data.order_by !== 'undefined') {
                    data.order = data.order_by + ':' + data.order_dir || 'asc'
                }

                t.d.xhr.getRecordById = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + '/' + id + t.d.urlSuffix,
                    type: 'GET',
                    dataType: 'json',
                    data: data,
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    error: $AA.token().error()
                });
                return t.d.xhr.getRecordById;
            };
        p.getFieldById = p.getFieldById || function (id, fieldName) {
                var t = this;
                var fieldTree = fieldName.split('.');
                t.d.xhr.getFieldById = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + '/' + id + t.d.urlSuffix,
                    type: 'GET',
                    dataType: 'json',
                    data: {fields: fieldTree[0], links: ''},
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    converters: {
                        'text json': function (result) {
                            var field = $.parseJSON(result)[fieldTree[0]];
                            for (var i = 1; i < fieldTree.length; i++) {
                                field = field[fieldTree[i]];
                            }
                            return field;
                        }
                    },
                    error: $AA.token().error()
                });
                return t.d.xhr.getFieldById;
            };
        p.getAllIdNamePair = p.getAllIdNamePair || function (nameFieldName) {
                var t = this;
                var fieldTree = nameFieldName.split('.');
                t.d.xhr.getAllIdNamePair = $.ajax({
                    url: $AA[moduleNameLowerFirst + 'Url']() + t.d.urlSuffix,
                    type: 'GET',
                    dataType: 'json',
                    data: {fields: 'id,' + fieldTree[0], links: ''},
                    headers: {Authorization: 'Bearer ' + $AA.token().get()},
                    converters: {
                        'text json': function (result) {
                            var res = $.parseJSON(result)._embedded;
                            res = res[Object.keys(res)[0]];
                            var arr = [];
                            for (var i in res) {
                                var field = res[i][fieldTree[0]];
                                for (var j = 1; j < fieldTree.length; j++) {
                                    field = field[fieldTree[j]];
                                }
                                arr.push([res[i]['id'], field]);
                            }
                            return arr;
                        }
                    },
                    error: $AA.token().error()
                });
                return t.d.xhr.getAllIdNamePair;
            };


        p.urlSuffix = p.urlSuffix || function (urlSuffix) {
                var t = this;
                if (typeof urlSuffix !== 'undefined') {
                    t.d.urlSuffix = urlSuffix;
                    return t;
                }
                return t.d.urlSuffix;
            };
        p.itemsDir = p.itemsDir || function (itemsDir) {
                var t = this;
                if (typeof itemsDir !== 'undefined') {
                    t.d.itemsDir = itemsDir;
                    return t;
                }
                return t.d.itemsDir;
            };
        p.fields = p.fields || function (fields) {
                var t = this;
                if (typeof fields !== 'undefined') {
                    if (fields !== false && fields.length > 0) {
                        t.d.option.fields = fields;
                    }
                    return t;
                }
                return t.d.option.fields;
            };
        p.limit = p.limit || function (limit) {
                var t = this;
                if (typeof limit !== 'undefined') {
                    t.d.option.limit = limit;
                    return t;
                }
                return t.d.option.limit;
            };
        p.format = p.format || function (format) {
                var t = this;
                if (typeof format !== 'undefined') {
                    t.d.option.format = format;
                    return t;
                }
                return t.d.option.format;
            };
        p.page = p.page || function (page) {
                var t = this;
                if (typeof page !== 'undefined') {
                    t.d.option.page = page;
                    return t;
                }
                return t.d.option.page;
            };
        p.where = p.where || function (where) {
                var t = this;
                if (typeof where !== 'undefined') {
                    t.d.option.where = where;
                    return t;
                }
                return t.d.option.where;
            };
        p.orderBy = p.order_by = p.orderBy || p.order_by || function (order_by) {
                var t = this;
                if (typeof order_by !== 'undefined') {
                    if (order_by === false)return t;
                    t.d.option.order_by = order_by;
                    return t;
                }
                return t.d.option.order_by;
            };
        p.orderDir = p.order_dir = p.orderDir || p.order_dir || function (order_dir) {
                var t = this;
                if (typeof order_dir !== 'undefined') {
                    if (order_dir === false)return t;
                    t.d.option.order_dir = order_dir;
                    return t;
                }
                return t.d.option.order_dir;
            };
        p.order = p.order || function (order) {
                var t = this;
                if (typeof order !== 'undefined') {
                    if (order === false)return t;
                    t.d.option.order = order;
                    return t;
                }
                return t.d.option.order;
            };
        p.links = p.links || function (links) {
                var t = this;
                if (typeof links !== 'undefined') {
                    t.d.option.links = links;
                    return t;
                }
                return t.d.option.links;
            };
        p.set = p.values = p.set || p.values || function (set, value) {
                var t = this;
                if (typeof set === 'string' && typeof value !== 'undefined') {
                    t.d.option.set[set] = value;
                    return t;
                }
                if (typeof set === 'object' || typeof set === 'array') {
                    for (var i in set) {
                        t.d.option.set[i] = set[i];
                    }
                    return t;
                }
                return t.d.option.set;
            };
        p.url = p.url || function(){
                return $AA[moduleNameLowerFirst+'Url'].apply(this, arguments);
            };


        $AA.createUrl(moduleNameLowerFirst)(settings.url || 'ping', !(typeof settings.useBaseUrl !== 'undefined' && settings.useBaseUrl === false));

        $AA.m[moduleName] = module;
        $AA[moduleNameLowerFirst] = function (obj) {
            var t = new module(obj);
            return t;
        };
        $AA.d.data[moduleNameLowerFirst] = {};


        $AA.xhr[moduleNameLowerFirst + 'Running'] = false;
        $AA.xhr[moduleNameLowerFirst + 'FirstRunCompleted'] = false;
        $AA.xhr[moduleNameLowerFirst + 'Modified'] = false;
        $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] = false;
        $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = false;
        $AA['refresh'+moduleName+'DefaultOptions'] = {};
        $AA['refresh'+moduleName] = function (defaultOptions) {

            var options = defaultOptions || $AA['refresh'+moduleName+'DefaultOptions'];
            $AA['refresh'+moduleName+'DefaultOptions'] = options;
            var newModule = $AA[moduleNameLowerFirst](options);

            $AA.xhr[moduleNameLowerFirst + 'Running'] = true;
            $AA.xhr[moduleNameLowerFirst] = newModule.limit(2147483648).get().done(function (data) {
                $AA.xhr[moduleNameLowerFirst + 'FirstRunCompleted'] = true;
                $AA.xhr[moduleNameLowerFirst + 'Running'] = false;
                if(newModule.d.hasEmbedded){
                    var arr = data._embedded[newModule.d.parentName];
                }else {
                    var arr = data;
                }

                for (var i = 0; i < arr.length; i++) {
                    if(newModule.d.hasId) {
                        $AA.d.data[moduleNameLowerFirst][arr[i].id] = arr[i];
                    }else{
                        $AA.d.data[moduleNameLowerFirst][arr[i]] = arr[i];
                    }
                }
            });
            return $AA.xhr[moduleNameLowerFirst];
        };
        $AA['get'+moduleName] = function (options) {
            if($AA.xhr[moduleNameLowerFirst + 'Modified'] === true && $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] === true){
                $AA.xhr[moduleNameLowerFirst + 'GetAfterFirstModified'] = false;
                if(typeof options !== 'undefined'){
                    return $AA['refresh'+moduleName](options).done(function(){
                        $AA.xhr[moduleNameLowerFirst + 'Modified'] = false;
                        $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = false;
                    });
                }
                return $AA['refresh'+moduleName]().done(function(){
                    $AA.xhr[moduleNameLowerFirst + 'Modified'] = false;
                    $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = false;
                });
            }
            if($AA.xhr[moduleNameLowerFirst + 'GetRunning']){
                return $AA.xhr[moduleNameLowerFirst];
            }
            $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = true;
            if($AA.xhr[moduleNameLowerFirst + 'FirstRunCompleted'] === true && typeof options === 'undefined'){
                return $AA.xhr[moduleNameLowerFirst];
            }
            if(typeof options !== 'undefined'){
                return $AA['refresh'+moduleName](options).done(function(){
                    $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = false;
                });
            }
            return $AA['refresh'+moduleName]().done(function(){
                $AA.xhr[moduleNameLowerFirst + 'GetRunning'] = false;
            });
        };
    };
})();

(function(){
    var Segments = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Segments.prototype;
    p.calculateByArray = function(arr){
        var t = this;
        return $.ajax({
            url: t.url()+'/calculate' + t.d.urlSuffix,
            type: 'GET',
            data: arr,
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.calculateById = function(id){
        var t = this;
        return $.ajax({
            url: t.url()+'/'+id+'/calculate' + t.d.urlSuffix,
            type: 'GET',
            data: {
                waitForResponse:true,
                saveAfterFinish:false
            },
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.calculateAndSave = function(id){
        var t = this;
        return $.ajax({
            url: t.url()+'/'+id+'/calculate' + t.d.urlSuffix,
            type: 'GET',
            data: {
                waitForResponse:true,
                saveAfterFinish:true
            },
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    
    $AA.initBasicFunctions(Segments, "Segments", {
        url:'segments',
        useBaseUrl:true
    });

})();

(function(){
    var Campaigns = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Campaigns.prototype;

    p.getOpenStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getShareStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/shares' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getUnsubscribeStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/unsubscribes' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getBounceStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/bounces' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getGeoStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'raw'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/geo-locations' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof step !== 'undefined' && step !== false){
            data.step = step;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof step !== 'undefined' && step !== false){
            data.step = step;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDevicePieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDevicePieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDeviceTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDeviceTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenOsPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickOsPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenOsTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickOsTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenBrowserPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickBrowserPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenBrowserTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickBrowserTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getDomainTopListById = function (id, from, to, limit) {
        var t = this;
        var data = {
            format:'raw'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof limit !== 'undefined' && limit !== false){
            data.limit = limit;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/domains' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDomainListById = p.getOpenDomainPieById = function(id, from, to, limit, uniqueContacts){
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof limit !== 'undefined' && limit !== false){
            data.limit = limit;
        }
        if(typeof uniqueContacts !== 'undefined' && uniqueContacts !== false){
            data.uniqueContacts = uniqueContacts;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDomainListById = p.getClickDomainPieById = function (id, from, to, limit, uniqueContacts) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof limit !== 'undefined' && limit !== false){
            data.limit = limit;
        }
        if(typeof uniqueContacts !== 'undefined' && uniqueContacts !== false){
            data.uniqueContacts = uniqueContacts;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDomainTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDomainTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getHeatMapById = function (id, from, to) {
        var t = this;
        var data = {
            format:'raw'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/heat-map' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getLinksById = function (id) {
        var t = this;
        return $.ajax({
            url: t.url() + '/' + id + '/links',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getCombinedById = function (id, data) {
        var t = this;
        return $.ajax({
            url: t.url() + '/' + id + '/combined',
            type: 'POST',
            dataType: 'json',
            data:data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getStatisticsToPdfById = function (id) {
        var t = this;
        return $.ajax({
            url: t.url() + '/' + id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + $AA.token().get(),
                Accept: 'application/pdf'
            },
            error: $AA.token().error()
        });
    };
    
    $AA.initBasicFunctions(Campaigns, "Campaigns", {
        url:'campaigns',
        useBaseUrl:true
    });
    p.send = p.insert;

})();

(function(){
    var SplitTests = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = SplitTests.prototype;

    p.getOpenStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getShareStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/shares' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getUnsubscribeStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/unsubscribes' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getBounceStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'total'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/bounces' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getGeoStatById = function (id, from, to) {
        var t = this;
        var data = {
            format:'raw'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/geo-locations' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof step !== 'undefined' && step !== false){
            data.step = step;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        if(typeof step !== 'undefined' && step !== false){
            data.step = step;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDevicePieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDevicePieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'device'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenOsPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickOsPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'os'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenBrowserPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickBrowserPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'browser'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getOpenDomainPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/opens' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getClickDomainPieById = function (id, from, to) {
        var t = this;
        var data = {
            format:'aggregate',
            groupBy:'domain'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/clicks' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    
    $AA.initBasicFunctions(SplitTests, "SplitTests", {
        url:'split-tests',
        useBaseUrl:true
    });
    p.send = p.insert;

})();

(function(){
    var Newsletters = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };

    var p = Newsletters.prototype;

    p.copy = function (id, data, done) {
        var t = this;
        var data = data || {};
        data.copyData = data.copyData || {};
        var done = done || function(){};
        return t.getRecordById(id).done(function(getData){
            var insertData = {
                name:data.name || ((data.copyData.prefix || '') + getData.name + (data.copyData.suffix || '')),
                subject:data.subject || getData.subject,
                editorCode:data.editorCode || getData.editorCode,
                htmlCode:data.htmlCode || getData.htmlCode,
                maxWidth:data.maxWidth || getData.maxWidth,
                tags:data.tags || getData.tags
            };
            return t.insert(insertData).done(function(localData){
                done.apply(t, [localData]);
            });
        });
    };



    $AA.initBasicFunctions(Newsletters, "Newsletters", {
        url:'newsletters',
        useBaseUrl:true
    });

})();

(function(){
    var AutomationEmails = function (obj) {
        var t = this;
        t.d = {
            parentName: 'emails'
        };
        t.init();

        t.initParameter(obj || {});
    };

    var p = AutomationEmails.prototype;

    p.copy = function (id, data, done) {
        var t = this;
        var data = data || {};
        data.copyData = data.copyData || {};
        var done = done || function(){};
        return t.getRecordById(id).done(function(getData){
            var insertData = {
                name:data.name || ((data.copyData.prefix || '') + getData.name + (data.copyData.suffix || '')),
                subject:data.subject || getData.subject,
                editorCode:data.editorCode || getData.editorCode,
                htmlCode:data.htmlCode || getData.htmlCode,
                maxWidth:data.maxWidth || getData.maxWidth,
                tags:data.tags || getData.tags
            };
            return t.insert(insertData).done(function(localData){
                done.apply(t, [localData]);
            });
        });
    };


    $AA.initBasicFunctions(AutomationEmails, "AutomationEmails", {
        url:'automations/emails',
        useBaseUrl:true
    });

})();

(function(){
    var Contacts = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Contacts.prototype;

    p.getActivitiesById = function(id){
        var t = this;
        return $.ajax({
            url: t.url() + '/' + id + '/activities',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    
    $AA.initBasicFunctions(Contacts, "Contacts", {
        url:'contacts',
        useBaseUrl:true
    });

})();

(function(){
    var CustomFields = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = CustomFields.prototype;

    
    $AA.initBasicFunctions(CustomFields, "CustomFields", {
        url:'custom-fields',
        useBaseUrl:true
    });

})();

(function(){
    var Users = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Users.prototype;

    p.switch = function(site){
        var t = this;
        return $.ajax({
            url: t.url() + '/switch-site',
            type: 'POST',
            data:{site:site},
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        }).done(function(data) {
            $AA.token().set(data);
            $AA.token().refreshLoopRestart();
        }).error(function(errData){

        });
    };
    
    $AA.initBasicFunctions(Users, "Users", {
        url:'users',
        useBaseUrl:true
    });

})();

(function(){
    var Jobs = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Jobs.prototype;


    $AA.initBasicFunctions(Jobs, "Jobs", {
        url:'jobs',
        useBaseUrl:true
    });

})();

(function(){
    var Webhooks = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Webhooks.prototype;


    $AA.initBasicFunctions(Webhooks, "Webhooks", {
        url:'webhooks',
        useBaseUrl:true
    });

})();

(function(){
    var Templates = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };

    var p = Templates.prototype;

    p.copy = function (id, data, done) {
        var t = this;
        var data = data || {};
        data.copyData = data.copyData || {};
        var done = done || function(){};
        return t.getRecordById(id).done(function(getData){
            var insertData = {
                name:data.name || ((data.copyData.prefix || '') + getData.name + (data.copyData.suffix || '')),
                editorCode:data.editorCode || getData.editorCode,
                htmlCode:data.htmlCode || getData.htmlCode,
                maxWidth:data.maxWidth || getData.maxWidth
            };
            return t.insert(insertData).done(function(localData){
                done.apply(t, [localData]);
            });
        });
    };

    
    $AA.initBasicFunctions(Templates, "Templates", {
        url:'templates',
        useBaseUrl:true
    });

})();

(function(){
    var Forms = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Forms.prototype;


    p.getFullTimeLineById = function (id, from, to, step) {
        var t = this;
        var data = {
            format:'timeline'
        };
        if(typeof from !== 'undefined' && from !== false){
            data.from = from;
        }
        if(typeof to !== 'undefined' && to !== false){
            data.to = to;
        }
        return $.ajax({
            url: t.url() + '/' + id + '/conversion' + t.d.urlSuffix,
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };

    
    $AA.initBasicFunctions(Forms, "Forms", {
        url:'forms',
        useBaseUrl:true
    });

})();

(function(){
    var Automations = function (obj) {
        var t = this;
        t.d = {
            xhr:{}
        };
        t.init();
        t.d.xhr.getNodesById = false;
        t.d.xhr.insertNode = false;
        t.d.xhr.deleteNode = false;
        t.d.xhr.updateNode = false;
        t.d.xhr.acceptDraft = false;
        t.d.xhr.discardDraft = false;

        t.initParameter(obj || {});
    };


    var p = Automations.prototype;

    p.getNodesById = function(automationId){
        var t = this;
        t.d.xhr.getNodesById = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/nodes',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.getNodesById;
    };
    p.insertNode = function(obj, automationId){
        var t = this;
        t.d.xhr.insertNode = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/nodes',
            type: 'POST',
            dataType: 'json',
            data: obj,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.insertNode;
    };
    p.deleteNode = function(automationId, nodeId, keepBranch){
        var t = this;
        var keep = false;
        var keepParameter = '';
        if(typeof keepBranch !== 'undefined'){
            keep = parseInt(keepBranch);
        }
        if(keep === 0 || keep === 1){
            keepParameter = '?keep='+keep
        }
        t.d.xhr.deleteNode = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/nodes/' + nodeId + keepParameter,
            type: 'DELETE',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.deleteNode;
    };
    p.updateNode = function(obj, automationId, nodeId){
        var t = this;
        t.d.xhr.updateNode = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/nodes/' + nodeId,
            type: 'PATCH',
            dataType: 'json',
            data: obj,
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.updateNode;
    };
    p.acceptDraft = function(automationId){
        var t = this;
        t.d.xhr.acceptDraft = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/accept-draft',
            type: 'POST',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.acceptDraft;
    };
    p.discardDraft = function(automationId){
        var t = this;
        t.d.xhr.discardDraft = $.ajax({
            url: $AA.automationsUrl() + '/' + automationId + '/discard-draft',
            type: 'POST',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
        return t.d.xhr.discardDraft;
    };
    p.getCampaigns = function(){
        var t = this;
        return $.ajax({
            url: $AA.automationsUrl() + '/get-campaigns',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };



    moduleName = 'AutomationGetCampaigns';
    moduleNameLowerFirst = 'automationGetCampaigns';

    $AA.d.data[moduleNameLowerFirst] = {};

    $AA.xhr[moduleNameLowerFirst + 'Running'] = false;
    $AA['refresh'+moduleName] = function () {
        var newModule = $AA.automations();
        $AA.xhr[moduleNameLowerFirst + 'Running'] = true;
        $AA.xhr[moduleNameLowerFirst] = newModule.getCampaigns().done(function (data) {
            $AA.xhr[moduleNameLowerFirst + 'Running'] = false;
            var arr = data;

            for (var i = 0; i < arr.length; i++) {
                $AA.d.data[moduleNameLowerFirst][arr[i].campaignId] = arr[i];
            }
        });
        return $AA.xhr[moduleNameLowerFirst];
    };

    $AA.initBasicFunctions(Automations, "Automations", {
        url:'automations',
        useBaseUrl:true
    });

})();

(function(){
    var ContactImports = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = ContactImports.prototype;

    p.getContactsByIdAndType = function(id, type){
        var t = this;
        return $.ajax({
            url: t.url() + '/' + id + '/' + type,
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()},
            error: $AA.token().error()
        });
    };
    p.getForbiddenContactsById = function(id){
        return this.getContactsByIdAndType(id, 'creation-forbidden-errors');
    };
    p.getAlreadyInDatabaseContactsById = function(id){
        return this.getContactsByIdAndType(id, 'already-in-database-errors');
    };
    p.getInvalidContactsById = function(id){
        return this.getContactsByIdAndType(id, 'invalid-email-errors');
    };
    p.getUnsubscribedContactsById = function(id){
        return this.getContactsByIdAndType(id, 'unsubscribed-errors');
    };
    
    $AA.initBasicFunctions(ContactImports, "ContactImports", {
        url:'contact-imports',
        useBaseUrl:true
    });

})();

(function(){
    var Tags = function (obj) {};

    var p = Tags.prototype;
    p.get = function(){
        return $.ajax({
            url: $AA.tagsUrl(),
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        });
    };

    /* No Rest-Api, so the basic functions are disabled */

    $AA.createUrl('tags')('tags', true);
    $AA.m['Tags'] = Tags;
    $AA['tags'] = function (obj) {
        var t = new Tags(obj);
        return t;
    };

})();

(function(){
    var Milestones = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Milestones.prototype;


    $AA.initBasicFunctions(Milestones, "Milestones", {
        url:'milestones',
        useBaseUrl:true
    });

})();

(function(){
    var LeadScores = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = LeadScores.prototype;


    $AA.initBasicFunctions(LeadScores, "LeadScores", {
        url:'lead-scores',
        useBaseUrl:true
    });

})();

(function(){
    var ContactTags = function (obj) {
        var t = this;
        t.d = {
            hasEmbedded:false,
            hasId:false
        };
        t.init();

        t.initParameter(obj || {});
    };


    var p = ContactTags.prototype;
    
    $AA.initBasicFunctions(ContactTags, "ContactTags", {
        url:'contacts/tags',
        useBaseUrl:true
    });

})();

(function(){
    var UnbounceForms = function (obj) {
        var t = this;
        t.d = {
            hasEmbedded:false
        };
        t.init();

        t.initParameter(obj || {});
    };


    var p = UnbounceForms.prototype;

    
    $AA.initBasicFunctions(UnbounceForms, "UnbounceForms", {
        url:'external/unbounce/forms',
        useBaseUrl:true
    });

})();

(function(){
    var AutoDetectedForms = function (obj) {
        var t = this;
        t.d = {
            hasEmbedded:false
        };
        t.init();

        t.initParameter(obj || {});
    };


    var p = AutoDetectedForms.prototype;

    $AA.initBasicFunctions(AutoDetectedForms, "AutoDetectedForms", {
        url:'forms/autodetect',
        useBaseUrl:true
    });

})();

(function(){
    var Invoices = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Invoices.prototype;

    
    $AA.initBasicFunctions(Invoices, "Invoices", {
        url:'invoices',
        useBaseUrl:true
    });

})();

(function(){
    var ContactsTagManager = function (obj) {
        var t = this;
        t.d = {
            hasEmbedded:false,
            hasId:false
        };
        t.init();

        t.initParameter(obj || {});
    };


    var p = ContactsTagManager.prototype;
    
    $AA.initBasicFunctions(ContactsTagManager, "ContactsTagManager", {
        url:'contacts/tag-manager',
        useBaseUrl:true
    });

})();

(function(){
    var Account = function (obj) {};

    var p = Account.prototype;
    p.get = function(){
        return $.ajax({
            url: $AA.accountUrl(),
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        });
    };
    p.limits = function(){
        return $.ajax({
            url: $AA.accountUrl() + '/limits',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        });
    };
    p.getPackages  = function(){
        return $.ajax({
            url: $AA.accountUrl() + '/limits',
            type: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        });
    };

    /* No Rest-Api, so the basic functions are disabled */

    $AA.createUrl('account')('account', true);
    $AA.m['Account'] = Account;
    $AA['account'] = function (obj) {
        var t = new Account(obj);
        return t;
    };

})();

(function(){
    var AccountStatistics = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = AccountStatistics.prototype;


    $AA.initBasicFunctions(AccountStatistics, "AccountStatistics", {
        url:'account/statistics',
        useBaseUrl:true
    });

})();

(function(){
    var Clients = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Clients.prototype;

    p.create = function(){
        return $.ajax({
            url: t.url(),
            type: 'POST',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + $AA.token().get()}
        });
    };
    
    $AA.initBasicFunctions(Clients, "Clients", {
        url:'clients',
        useBaseUrl:true
    });

})();

(function(){
    var Updates = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };


    var p = Updates.prototype;

    $AA.initBasicFunctions(Updates, "Updates", {
        url:'updates',
        useBaseUrl:true
    });

})();

(function(){
    var Plugins = function (obj) {
        var t = this;
        t.init();

        t.initParameter(obj || {});
    };

    var p = Plugins.prototype;

    $AA.initBasicFunctions(Plugins, "Plugins", {
        url:'plugins',
        useBaseUrl:true
    });

})();

(function(){
    $AA.parseBoolean = function (value, nullOnFailure) {
        if (typeof value === 'string')
            value = value.toLowerCase();
        switch (value) {
            case true:
            case 'true':
            case 1:
            case '1':
            case 'on':
            case 'yes':
            case 'y':
            case '✓':
            case '✔':
            case '☑':
            case '☒':
                value = true;
                break;
            case false:
            case 'false':
            case 0:
            case '0':
            case 'off':
            case 'no':
            case 'n':
            case 'x':
            case '✗':
            case '✘':
            case '☐':
                value = false;
                break;
            default:
                if (nullOnFailure) {
                    value = null;
                } else {
                    value = false;
                }
                break;
        }
        return value;
    };
})();

(function(){

    $AA.refreshTable = function (table) {
        if (typeof table === 'undefined' || table === false) {
            return false;
        }
        var apiName = table.data('apiName');
        if(typeof $AA[apiName] === 'undefined'){
            return false;
        }
        var apiUrlSuffix = table.data('apiUrlSuffix');
        var apiItemsDir = table.data('apiItemsDir');
        var apiElementsDir = table.data('apiElementsDir');
        var apiFormat = table.data('apiFormat');
        var refreshComplete = table.data('refreshComplete');
        var orderBy = table.d.orderBy;
        var orderDir = table.d.orderDir;
        var limit = table.perPage();
        var page = table.page();
        var fields = table.data('fields') || false;
        var showId = false;
        var where = table.data('where') || [];
        var specialWhereArr = false;
        if(typeof table.data('whereFunction') === 'function'){
            var specialWhere = table.data('whereFunction')();
            if(specialWhere !== false){
                specialWhereArr = table.data('whereFunction')();
            }
        }
        if(typeof table.data('xhr') !== 'undefined'){
            table.data('xhr').abort();
        }
        if(typeof apiUrlSuffix === 'undefined'){
            apiUrlSuffix = '';
        }
        if(typeof apiItemsDir === 'undefined'){
            apiItemsDir = false;
        }
        if(typeof apiElementsDir === 'undefined'){
            apiElementsDir = false;
        }
        if(typeof apiFormat === 'undefined'){
            apiFormat = false;
        }
        if(typeof refreshComplete !== 'function'){
            refreshComplete = function(){};
        }

        if(fields === false) {
            fields = [];
            var cols = table.cols();
            for (var i = table.selectable() ? 1 : 0; i < cols.length; i++) {
                if (cols[i].active()) {
                    fields.push(cols[i].name());
                }
            }
            if ($.inArray('id', fields) === -1) {
                fields.push('id');
            }else{
                showId = true;
            }
            fields = fields.join();
        }else{
            fields = JSON.stringify(fields);
        }

        if((typeof table.d.searchValue === 'string' || typeof table.d.searchValue === 'number') && table.d.searchValue.length > 0){
            var cols = table.cols();
            for(var i = 0; i < cols.length; i++){
                var scols = table.d.settings.cols;
                var ss = {};
                for(var j = 0; j < scols.length; j++){
                    ss[scols[j].name || 0] = scols[j].searchable===false?false:true;
                }
                var name = cols[i].name();
                if(ss[name]){
                    var whereArr = [[name, 'like', '%'+table.d.searchValue+'%']];
                    if(specialWhereArr !== false){
                        for(var j = 0; j < specialWhereArr.length; j++){
                            whereArr.push(specialWhereArr[j]);
                        }
                    }
                    where.push(whereArr);
                }
            }
        }else{
            if(specialWhereArr !== false){
                where.push(specialWhereArr);
            }
        }

        table.d.$checkboxCheckAll.prop('checked', false).change();
        table.loading();
        var xhr = $AA[apiName]().links('').fields(fields).limit(limit).page(page).where(where).orderBy(orderBy).orderDir(orderDir).urlSuffix(apiUrlSuffix).format(apiFormat).get().done(function (data) {
            table.pageMax(data.page_count);

            table.totalEntries(data.total_items);
            table.writeEntries();


            if(apiItemsDir !== false){
                var dir = apiItemsDir.split('/');
                var records = data;
                for(var i = 0; i < dir.length; i++){
                    records = records[dir[i]];
                }
            }else{
                var records = data['_embedded'][apiName];
            }

            var length = records.length;
            //if (length > 0) {
                var rows = [];
                for (var i = 0; i < length; i++) {
                    var record = records[i];
                    if(apiElementsDir !== false){
                        record = records[i][apiElementsDir];
                    }
                    var row = {recordId: record['id'] || 0, values: {}};
                    for (var j in record) {
                        if (j.charAt(0) === '_' || (j === 'id' && !showId)) {
                            continue;
                        }
                        if (record[j] !== null && (typeof record[j] === 'object' || typeof record[j] === 'array')) {
                            if($.isArray(record[j])){
                                row.values[j] = record[j];
                            }else{
                                var isDateObj = false;
                                var dateObjCount = 0;
                                var isCodeValueObj = false;
                                var codeValueObjCount = 0;
                                var isCustomFields = false;
                                for (var k in record[j]) {
                                    if (k === 'date' || k === 'timezone' || k === 'timezone_type') {
                                        dateObjCount++;
                                    }
                                    if (k === 'code' || k === 'value') {
                                        codeValueObjCount++;
                                    }
                                    isDateObj = false;
                                    isCodeValueObj = false;
                                    isCustomFields = false;
                                    if (dateObjCount === 3) {
                                        isDateObj = true;
                                    } else if (codeValueObjCount == 2) {
                                        isCodeValueObj = true;
                                    } else if(j === 'customFields'){
                                        isCustomFields = true;
                                    }
                                }
                                if (isDateObj) {
                                    row.values[j] = record[j]['date'] || record[j][Object.keys(record[j])[0]] || '';
                                } else if (isCodeValueObj) {
                                    row.values[j] = record[j]['value'] || record[j][Object.keys(record[j])[0]] || '';
                                } else if (isCustomFields) {
                                    for (var l in record[j]) {
                                        if (record[j][l] !== null && (typeof record[j][l] === 'array' || typeof record[j][l] === 'object')) {
                                            if($.isArray(record[j][l])){
                                                row.values['customFields.' + l] = record[j][l];
                                                /*if(record[j][l].length > 0){
                                                    row.values['customFields.' + l] = '<ul style="margin: 0; padding-left: 17px;"><li>' + record[j][l].join('</li><li>') + '</li></ul>';
                                                }*/
                                            }else {
                                                row.values['customFields.' + l] = record[j][l]['date'] || record[j][l]['value'] || record[j][l][Object.keys(record[j][l])[0]] || '';
                                            }
                                        } else {
                                            row.values['customFields.' + l] = record[j][l];
                                        }
                                    }
                                } else {
                                    row.values[j] = record[j];
                                }
                            }
                        } else {
                            row.values[j] = record[j];
                        }
                    }
                    rows.push(row);
                }

                table.data({records:records});
                table.deleteRows();
                var col = table.getColByName('customFields');
                if(col !== false && typeof col.$cells === 'function'){
                    col.$cells().css('display', 'none');
                }
                table.rows(rows);

                /*for(var i = 0; i < rows.length; i++){
                    var ind = i;
                    (function(index) {
                        setTimeout(function(){
                            table.addRows(rows[index]);
                        }, i);
                    })(i);
                }*/

                table.d.stepFunction();

                setTimeout(function(){
                    refreshComplete.apply(table, [table, table.d.$widget]);
                }, 10);

            //}
        });
        table.data('xhr', xhr);
        return xhr;
    }
})();

(function(){

    $AA.exportTable = function (table, settings) {
        if (typeof table === 'undefined') {
            return false;
        }
        var settings = settings || {};
        var apiName = table.data('apiName');
        var apiUrlSuffix = table.data('apiUrlSuffix');
        var exportFields = table.data('exportFields') || [];
        if(exportFields.length > 0) {
            exportFields = exportFields.join(',');
        }else{
            exportFields = false;
        }
        var orderBy = table.d.orderBy;
        var orderDir = table.d.orderDir;
        if(typeof apiUrlSuffix === 'undefined'){
            apiUrlSuffix = '';
        }

        var where = [];
        if((typeof settings.search === 'string' || typeof settings.search === 'number') && settings.search.length > 0){
            var cols = table.cols();
            for(var i = 0; i < cols.length; i++){
                var scols = table.d.settings.cols;
                var ss = {};
                for(var j = 0; j < scols.length; j++){
                    ss[scols[j].name || 0] = scols[j].searchable===false?false:true;
                }
                var name = cols[i].name();
                if(ss[name]){
                    where.push([[name, 'like', '%'+settings.search+'%']]);
                }
            }
        }
        if(typeof settings.ids !== 'undefined'){
            if(where.length > 0){
                for(var i = 0; i < where.length; i++){
                    where[i].push(['id', 'in', settings.ids]);
                }
            }else {
                where.push([['id', 'in', settings.ids]]);
            }
        }

        var xhr = $AA[apiName]().orderBy(orderBy).orderDir(orderDir).fields(exportFields).where(where).urlSuffix(apiUrlSuffix).export().done(function(data, textStatus, jqXHR){
            window.location.href = jqXHR.getResponseHeader('X-Download-Url');
        });
    };
})();

(function(){
    $AA.dataToOptions = function (data, field, id) {
        var field = field || 'name';
        var id = id || 'id';
        return $.map(data, function(obj){
            return [[obj[id], obj[field]]]
        });
    };
})();

(function(){
    $AA.convertToObj = function (data, keyValue) {
        var keyValue = keyValue || 'id';
        var obj = {};
        for(var i = 0; i < data.length; i++){
            obj[data[i][keyValue]] = data[i];
        }
        return obj;
    };
})();

(function(){

    $AA.downloadContent = function (content, filename) {
        var supportsDownloadAttribute = 'download' in document.createElement('a');
        if(supportsDownloadAttribute) {
            var link = $('<a></a>');
            link.attr({
                href: 'data:attachment/csv,' + encodeURI(content),
                target: '_blank',
                download: filename
            })[0].click();
            setTimeout(function() {
                link.remove();
            }, 50);
        } else if(typeof safari !== 'undefined') {
            window.open('data:attachment/csv,' + encodeURI(content));
        }else if (window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([content], {type: "text/plain"});
            navigator.msSaveBlob(blob, filename);
        } else {
            alert($A.translate('Your browser is not supported the csv export.'))
        }
    };

})();

(function(){
    $AA.createUrl('account')('account', true);
    console.log('%c AutomizyJsApi module loaded! ', 'background: #000000; color: #bada55; font-size:14px');
})();
window.$AA = $AA;
window.AutomizyJsApi = $AA;
})($);