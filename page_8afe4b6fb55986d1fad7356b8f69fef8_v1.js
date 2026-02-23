
; /* Start:"a:4:{s:4:"full";s:85:"/local/templates/main/components/interlabs/feedbackform/quiz/script.js?17531557711446";s:6:"source";s:70:"/local/templates/main/components/interlabs/feedbackform/quiz/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
"use strict";

if (typeof window.interlabs === "undefined") {
    window.interlabs = {};
}
if (typeof window.interlabs.feedbackform === "undefined") {
    window.interlabs.feedbackform = {};
}
$(document).ready(function () {
    /**
     * open dialog
     */
    $('.interlabs-feedbackform__container__dialog').each(function () {

        var dialog = $(this);

        var form = dialog.find('form');

        var fields = form.data('validatefields');

        dialog.find('.js-interlabs-feedbackform__dialog__close, .js-interlabs-feedbackform__dialog__cancel-button').on('click', function () {
            window.interlabs.feedbackform.closeDialog(this);
        });
    });

    window.interlabs.feedbackform.closeDialog = function (context) {
        var container = $(context).parents('.interlabs-feedbackform__container:first');
        var dialog = container.find('.interlabs-feedbackform__container__dialog:first');
        dialog.addClass('hidden');
    };

    window.interlabs.feedbackform.closeSuccessDialog = function (context) {
        var container = $(context).parents('.interlabs-feedbackform__container:first');
        var dialogSuccsess = container.find('.interlabs-feedbackform__container-succsess:first');
        var dialog = container.find('.interlabs-feedbackform__container__dialog:first');
        dialogSuccsess.addClass('hidden');
        dialog.removeClass('hidden');
    };
});
//# sourceMappingURL=script.js.map

/* End */
;; /* /local/templates/main/components/interlabs/feedbackform/quiz/script.js?17531557711446*/
