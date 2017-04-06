define([
    "js/init/init",
    "js/modules/codeHelp"
], function () {
    $ACC.pluginsLoaded(function () {
        var CodeHelpZapierIntegration = function () {
            var t = this;
            t.d = {};


            var $list = $('<ol>')
                .append('<li><a href="https://zapier.com/developer/invite/56758/c26960a977765afe84058228493d7ef4/" target="_blank">' + $A.translate('Click this link') + '</a>' + ' ' + $A.translate('to receive an Automizy invitation for Zapier (Zapier allows public integration only after a specific volume of usage, therefore you can access the integration from this link only yet).') + '</li>')
                .append('<li>' + $A.translate('Log in to your Zapier account') + '</li>')
                .append('<li>' + $A.translate('Use Automizy as a trigger or as an action') + '</li>');

            var $buttonRow = $('<div style="width: 100%; text-align: center;">');

            var $content = $('<div>')
                .append('<p>' + $A.translate('There are tons of apps like CRM, webinar, sales outreach, payment and other tools out there. Zapier makes easy to integrate these apps with each other without any need of programming.') + '</p>')
                .append('<p>' + $A.translate('We support Zapier integration to let you seamlessly connect your existing apps with us.') + '</p>')
                .append('<h3>' + $A.translate('How?') + '</h3>')
                .append('<p>' + $A.translate('Follow the steps below:') + '</p>')
                .append($list)
                .append($buttonRow);


            var inviteButton = $A.newButton({
                text: $A.translate('Invite me to Zapier'),
                click: function () {
                    window.open('https://zapier.com/developer/invite/56758/c26960a977765afe84058228493d7ef4/');
                },
                skin: 'simple-orange',
                target: $buttonRow,
                thick: true
            });


            t.d.zapierIntegration = $ACC.newCodeHelp()
                .title($A.translate('Connect Automizy with the apps you already use!'));
            t.d.zapierIntegration.d.$mainBoxDescription.append($content);

        };

        var p = CodeHelpZapierIntegration.prototype;

        p.open = function () {
            var t = this;
            t.d.zapierIntegration.open();
            return t;
        };

        $ACC.m.CodeHelpZapierIntegration = CodeHelpZapierIntegration;
        $ACC.newCodeHelpZapierIntegration = function () {
            return new $ACC.m.CodeHelpZapierIntegration();
        };

        $ACC.modules.zapierIntegration = $ACC.newCodeHelpZapierIntegration();

        return $ACC.m.CodeHelpZapierIntegration;
    });
});