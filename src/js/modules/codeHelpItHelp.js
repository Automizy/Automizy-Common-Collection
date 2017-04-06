define([
    "js/init/init"
], function () {
    $ACC.pluginsLoaded(function () {
        var CodeHelpItHelp = function () {
            var t = this;
            t.d = {
                dialogs: {},
                inputs: {},
                buttons: {},
                done: function () {},
                beforeSend: function () {},
                previewUrl: false
            };

            t.d.$widget = $('<div></div>');
            t.d.$title = $('<div></div>').appendTo(t.d.$widget);
            t.d.$widget.append('<br/><br/>');
            t.d.inputs.email = $A.newInput2({
                labelTop: $A.translate("Enter your developers' email address:"),
                name: 'email',
                validator:'email',
                width:400,
                buttonRight: {
                    skin:'nobox-orange',
                    text:'preview',
                    icon:'fa-eye',
                    click: function(){
                        var win = window.open(t.previewUrl(), '_blank');
                        win.focus();
                    }
                },
                target: t.d.$widget
            });
            t.d.$success = $('<div style="padding-bottom:12px; color:#008000">' + $A.translate('Send successful') + '</div>').appendTo(t.d.$widget).hide();
            t.d.buttons.send = $A.newButton({
                text: $A.translate("Send Instructions"),
                skin: 'simple-orange',
                newRow: true,
                target: t.d.$widget,
                click: function () {
                    if(t.d.inputs.email.validate()) {
                        $A.ajaxDocumentCover(1);
                        t.d.$success.hide();
                        $.ajax({
                            url: $AA.baseUrl() + '/public-email',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                emailAddress: t.d.inputs.email.val(),
                                htmlEmail: t.email(),
                                fields: t.fields(),
                                subject: t.subject()
                            },
                            headers: {Authorization: 'Bearer ' + $AA.token().get()}
                        }).always(function (data) {
                            t.d.$success.show(250);
                            $A.ajaxDocumentCover(0);
                        })
                    }
                }
            });

            t.title($A.translate('Ask for IT help now by sending the instructions.'));

        };

        var p = CodeHelpItHelp.prototype;

        p.previewUrl = function (previewUrl) {
            var t = this;
            if (typeof previewUrl !== 'undefined') {
                t.d.previewUrl = previewUrl;
                return t;
            }
            return t.d.previewUrl;
        };
        p.title = function (title) {
            var t = this;
            if (typeof title !== 'undefined') {
                t.d.title = title;
                t.d.$title.html(title);
                return t;
            }
            return t.d.title;
        };
        p.widget = function () {
            var t = this;
            return t.d.$widget;
        };
        p.fields = function (fields) {
            var t = this;
            if (typeof fields !== 'undefined') {
                t.d.fields = fields;
                return t;
            }
            return t.d.fields;
        };
        p.email = function (email) {
            var t = this;
            if (typeof email !== 'undefined') {
                t.d.email = email;
                t.previewUrl('https://app.automizy.com/public/email/' + t.d.email + '.html');
                return t;
            }
            return t.d.email;
        };
        p.subject = function (subject) {
            var t = this;
            if (typeof subject !== 'undefined') {
                t.d.subject = subject;
                return t;
            }
            return t.d.subject;
        };

        $ACC.m.CodeHelpItHelp = CodeHelpItHelp;
        $ACC.newCodeHelpItHelp = function () {
            return new $ACC.m.CodeHelpItHelp();
        };

        return $ACC.m.CodeHelpItHelp;
    });
});