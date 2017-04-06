define([], function () {
    function hasFont(className, fontFamily) {
        var span = document.createElement('span');
        span.className = className;
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') === fontFamily) {
            document.body.removeChild(span);
            return true;
        }
        document.body.removeChild(span);
        return false;
    }

    window.AutomizyCommonCollection = window.$ACC = new AutomizyProject({
        name: 'automizy-common-collection',
        plugins: [
            {
                name: 'font-awesome',
                skipCondition: hasFont('fa', 'FontAwesome'),
                css: "vendor/fontawesome/css/font-awesome.min.css"
            },
            {
                name: 'automizy-js',
                skipCondition: typeof AutomizyJs !== 'undefined',
                css: "vendor/automizy-js/automizy.css",
                js: [
                    "vendor/automizy-js/automizy.js"
                ]
            },
            {
                name: 'automizy-js-api',
                skipCondition: typeof AutomizyJsApi !== 'undefined',
                js: "vendor/automizy-js-api/automizy.api.js"
            }
        ]
    });
});