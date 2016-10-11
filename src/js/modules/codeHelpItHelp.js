define([
    "js/core/core"
], function () {
    var CodeHelpItHelp = function () {
        var t = this;
        t.d = {
            dialogs:{},
            inputs:{},
            buttons:{}
        };

        t.d.$widget = $('<div></div>');
        t.d.$title = $('<div></div>').appendTo(t.d.$widget);
        t.d.$widget.append('<br/><br/>');
        t.d.dialogs.emailPreview = $A.newDialog({
            title:$A.translate('Preview')

        });
        t.d.inputs.email = $A.newInput({
            label:$A.translate("Enter your developers' email address:"),
            labelAfter:$A.newButton({
                skin:'nobox-orange',
                click:function(){
                    alert('Something wrong!');
                },
                create:function(){
                    var $html = $('<span></span>');
                    var $icon = $('<span class="fa fa-eye"></span>').appendTo($html);
                    $html.append(' ' + $A.translate('Preview'));
                    this.widget().css('margin','0 0 0 12px');
                    this.html($html);
                }
            }),
            breakLabel:true,
            target:t.d.$widget
        });
        t.d.buttons.send = $A.newButton({
            text:$A.translate("Send Instructions"),
            skin:'simple-orange',
            newRow:true,
            target:t.d.$widget,
            click:function(){
                alert('Something wrong!');
            }
        });

        t.title($A.translate('Ask for IT help now by sending the instructions.'));

    };

    var p = CodeHelpItHelp.prototype;

    p.title = function(title){
        var t = this;
        if(typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            return t;
        }
        return t.d.title;
    };
    p.widget = function(){
        var t = this;
        return t.d.$widget;
    };

    $ACC.m.CodeHelpItHelp = CodeHelpItHelp;

    return $ACC.m.CodeHelpItHelp;
});