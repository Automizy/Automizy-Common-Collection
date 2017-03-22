define([
    "js/core/core",
    "js/modules/codeHelp"
], function () {
    $ACC.pluginsLoaded(function () {
        var CodeHelpOptimonkIntegration = function () {
            var t = this;
            t.d = {};


            var $list = $('<ol>')
                .append('<li>'+$A.translate('Create or log in to your account in')+' '+'<a href="http://www.optimonk.com/" target="_blank">Optimonk</a></li>')
                .append('<li>' + $A.translate('Create a new pop-up or nanobar campaign there') + '</li>')
                .append('<li>' + $A.translate('In the “Campaign settings”, scroll down to the integrations section') + '</li>')
                .append('<li>' + $A.translate('Click “Where would you like to keep the list of subscribers?“') + '</li>')
                .append('<li>' + $A.translate('Choose Automizy') + '</li>')
                .append('<li>' + $A.translate('Log in to Automizy') + '</li>');

            var $buttonRow = $('<div style="width: 100%; text-align: center;">');

            var $content = $('<div>')
                .append('<p>' + $A.translate('Well targeted pop-ups on your web pages can be a very effective way of collecting leads. Optimonk is just the right tool to get started with that!') + '</p>')
                .append('<p>' + $A.translate('This is the reason we provide you this native integration with Optimonk!') + '</p>')
                .append('<h3>' + $A.translate('How?') + '</h3>')
                .append('<p>' + $A.translate('Follow the steps below:') + '</p>')
                .append($list)
                .append($buttonRow);


            var inviteButton = $A.newButton({
                text: $A.translate('Connect with Optimonk'),
                click: function () {
                    window.open('http://www.optimonk.com/');
                },
                skin: 'simple-orange',
                target: $buttonRow,
                thick: true
            });


            t.d.optimonkIntegration = $ACC.newCodeHelp()
                .title($A.translate('Collect leads with on-site retargeting and send them straight to Automizy!'));
            t.d.optimonkIntegration.d.$mainBoxDescription.append($content);

        };

        var p = CodeHelpOptimonkIntegration.prototype;

        p.open = function () {
            var t = this;
            t.d.optimonkIntegration.open();
            return t;
        };

        $ACC.m.CodeHelpOptimonkIntegration = CodeHelpOptimonkIntegration;
        $ACC.newCodeHelpOptimonkIntegration = function () {
            return new $ACC.m.CodeHelpOptimonkIntegration();
        };

        $ACC.modules.optimonkIntegration = $ACC.newCodeHelpOptimonkIntegration();

        return $ACC.m.CodeHelpOptimonkIntegration;
    });
});