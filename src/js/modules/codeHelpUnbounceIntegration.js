define([
    "js/core/core",
    "js/modules/codeHelp",
    "js/modules/codeHelpItHelp"
], function () {
    var CodeHelpUnbounceIntegration = function () {
        var t = this;
        t.d = {
            hash:'<HASH>'
        };

        t.d.$doItYourself = $('<div></div>');
        $('<div></div>').html($A.translate('Copy the URL below:')).appendTo(t.d.$doItYourself);
        t.d.$code = $('<pre class="automizy-code-content"></pre>').html('https://api.automizy.com/external/unbounce/'+t.hash()).appendTo(t.d.$doItYourself);
        $('<div></div>').html($A.translate('Next steps:')).appendTo(t.d.$doItYourself);
        t.d.$list = $('<ol></ol>').appendTo(t.d.$doItYourself);
        $('<li></li>').html($A.translate("Login to Unbounce and open the landing page you want to connect with Automizy.")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate('Scroll down to <b>"Basic Form Integrations"</b> panel.')).appendTo(t.d.$list);
        $('<li></li>').html($A.translate('Click <b>"Webhook: POST or URL"</b> button.')).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("<b>Insert the script code</b> to the popup window by hitting Ctrl+V (PC) or @+V (Mac).")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("<b>Go to the live landing page and subscribe</b> (if you don't do this Automizy won't recognise the form).")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("You're done!")).appendTo(t.d.$list);

        t.d.itHelp = $ACC.newCodeHelpItHelp()
            .email('ithelp-integration-unbounce-en')
            .subject($A.translate("Help me connect Automizy with Unbounce please"))
            .fields({
                hash: t.hash()
            });

        t.d.scriptInsertion = $ACC.newCodeHelp()
            .title($A.translate('Connect Automizy with unbounce'))
            .description('Unbounce form is missing')
            .doItYourselfContent(t.d.$doItYourself)
            .askForItHelpContent(t.d.itHelp.widget());
    };

    var p = CodeHelpUnbounceIntegration.prototype;

    p.type = function(type){
        var t = this;
        if(typeof type !== 'undefined'){
            t.d.type = type;

            if(t.d.type === 'install'){
                t.d.scriptInsertion.description('');
            }else if(t.d.type === 'trigger'){
                t.d.scriptInsertion.description($A.translate('Unbounce form is missing.'));
            }

            return t;
        }
        return t.d.type;
    };
    p.hash = function(hash){
        var t = this;
        if(typeof hash !== 'undefined'){
            t.d.hash = hash;
            t.d.$code.text('https://api.automizy.com/external/unbounce/'+t.d.hash);
            return t;
        }
        return t.d.hash;
    };
    p.open = function(){
        var t = this;
        t.d.scriptInsertion.open();
        return t;
    };

    $ACC.m.CodeHelpUnbounceIntegration = CodeHelpUnbounceIntegration;
    $ACC.newCodeHelpUnbounceIntegration = function () {
        return new $ACC.m.CodeHelpUnbounceIntegration();
    };

    $ACC.modules.unbounceIntegration = $ACC.newCodeHelpUnbounceIntegration();

    return $ACC.m.CodeHelpUnbounceIntegration;
});