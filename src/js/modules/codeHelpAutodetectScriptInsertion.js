define([
    "js/core/core",
    "js/modules/codeHelp",
    "js/modules/codeHelpItHelp"
], function () {
    $ACC.pluginsLoaded(function () {
        var CodeHelpAutodetectScriptInsertion = function () {
            var t = this;
            t.d = {
                hash: '<HASH>',
                clicked: false,
                scriptInserted: false,
                type: false,
                scriptCode:"<!-- Automizy Autodetect -->\r\n"+
                    "<script>\r\n"+
                    "    (function (a, u, t, o, m, i, z, y) {\r\n"+
                    "        i = i || 'script';\r\n"+
                    "        z = a['AutomizyAutodetect'] = a['AutomizyAutodetect'] || {id:0};\r\n"+
                    "        if(z.id !== 0){return;}\r\n"+
                    "        z[i] = u.createElement(i); y = encodeURIComponent(document.URL);\r\n"+
                    "        z[i].src = t + '?id=' + o + '&v=' + (Math.ceil(new Date()/(m || 25000))) + (y.length < 1500 ? '&url=' + y : '');\r\n"+
                    "        z[i].async = 1; z.id = o; var fs = u.getElementsByTagName(i)[0];z[i].setAttribute('data-automizy-id',o);\r\n"+
                    "        fs.parentNode.insertBefore(z[i], z.fs);\r\n"+
                    "    })(window, document, 'https://scripts.automizy.com/autodetect.js', '[[hash]]');\r\n"+
                    "</script>\r\n"+
                    "<!-- End Automizy Autodetect -->"
            };

            t.d.$helpScriptInsertionDoItYourself = $('<div></div>');
            $('<div></div>').text($A.translate('Copy the code below:')).appendTo(t.d.$helpScriptInsertionDoItYourself);
            t.d.$code = $('<pre class="automizy-code-content"></pre>').appendTo(t.d.$helpScriptInsertionDoItYourself);
            $('<b></b>').text($A.translate('Important!')).appendTo(t.d.$helpScriptInsertionDoItYourself);
            $('<div></div>').text($A.translate('After you copied the installation code, go to your website and insert it to the header section by hitting ctrl+V (PC) or @+V (Mac).')).appendTo(t.d.$helpScriptInsertionDoItYourself);

            t.d.scriptInsertionItHelp = $ACC.newCodeHelpItHelp()
                .email('ithelp-autodetect-script-en')
                .subject($A.translate("Help me connect Automizy with our webpage please"))
                .fields({
                    hash: t.hash()
                });

            t.d.scriptInsertion = $ACC.newCodeHelp()
                .title($A.translate('Install code'))
                .description($A.translate('To get started with Automizy, add the installation code to your web- or blog pages!'))
                .doItYourselfContent(t.d.$helpScriptInsertionDoItYourself)
                .askForItHelpContent(t.d.scriptInsertionItHelp.widget());

        };

        var p = CodeHelpAutodetectScriptInsertion.prototype;

        p.hash = function (hash) {
            var t = this;
            if (typeof hash !== 'undefined') {
                t.d.hash = hash;
                t.d.$code.text(t.d.scriptCode.replace(/\[\[hash]]/g, t.d.hash));
                t.d.scriptInsertionItHelp.fields({
                    hash: t.hash()
                });
                return t;
            }
            return t.d.hash;
        };
        p.open = function () {
            var t = this;
            t.d.scriptInsertion.open();
            return t;
        };

        $ACC.m.CodeHelpAutodetectScriptInsertion = CodeHelpAutodetectScriptInsertion;
        $ACC.newCodeHelpAutodetectScriptInsertion = function () {
            return new $ACC.m.CodeHelpAutodetectScriptInsertion();
        };

        $ACC.modules.autodetectScriptInsertion = $ACC.newCodeHelpAutodetectScriptInsertion();

        return $ACC.m.CodeHelpAutodetectScriptInsertion;
    });
});