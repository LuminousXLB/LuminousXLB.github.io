document.addEventListener('DOMContentLoaded', function () {
    const noprint = [
        {
            'elem': document.querySelector("body > header"),
            'classAttr': 'hidden'
        },
        {
            'elem': document.querySelector("body > main > div > div > div > div.bg-secondary-bg.col-span-2.rounded.px-6.py-8.lg\\:col-span-6 > div.my-4"),
            'classAttr': 'hidden'
        },
        {
            'elem': document.querySelector("body > main > div > div > div > div.bg-secondary-bg.col-span-2.rounded.px-6.py-8.lg\\:col-span-6 > div.-mx-2.mt-4.flex.flex-col.border-t.px-2.pt-4.md\\:flex-row.md\\:justify-between"),
            'classAttr': 'hidden'
        },
        {
            'elem': document.querySelector("body > footer"),
            'classAttr': 'hidden'
        },
        {
            'elem': document.querySelector('main'),
            'classAttr': ''
        }
    ]

    addEventListener('beforeprint', e => {
        for (const { elem, classAttr } of noprint) {
            elem.setAttribute('class', classAttr);
        }
    });
    
    addEventListener('afterprint', e => {
        location.reload()
    });

}, false);
