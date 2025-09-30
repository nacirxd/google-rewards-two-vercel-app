(function(w, d, k, c, s) {
    w[k] = w[k] || {
        b: [],
        s: s
    };
    w[k].b.push(c);
    if (!w[k].l) {
        var t = d.createElement('script');
        t.src = s;
        d.head.appendChild(t);
    } else {
        w[k].ld();
    }
})(window, document, 'cpd', {
    "sticky": true,
    "theme": "default light",
    "url": "https://orders.cartpanda.com",
    "brandName": "Cartpanda",
    "brand": "cartpanda",
    "position": "bottom-left",
    "dialog-headline": "Cartpanda is the reseller of this product.",
    "dialog-text": "You can order in confidence, knowing that Cartpanda\u2019s customer support is here to help you along the way if needed.",
    "secure-label": "Secure Order",
    "footer-layout": "default",
    "footer": new Date().getFullYear() + " \u00a9 Cartpanda Inc. (United States) Inc. and\/or its licensors. Review legal terms of use <a href='https://cartpanda.com/buyers-seller-terms' target='_blank' onclick=\" window.open('https://cartpanda.com/buyers-seller-terms', '_blank', 'width=800,height=600,scrollbars=yes,status=yes,resizable=yes,screenx=0,screeny=0');; return false;\">here<\/a> and privacy policy <a href='https://cartpanda.com/privacy-policy' target='_blank' onclick=\" window.open('https://cartpanda.com/privacy-policy', '_blank', 'width=800,height=600,scrollbars=yes,status=yes,resizable=yes,screenx=0,screeny=0');; return false;\">here<\/a>. Contact us <a href='https://orders.cartpanda.com' target='_blank' onclick=\" window.open('https://orders.cartpanda.com', '_blank', 'width=800,height=600,scrollbars=yes,status=yes,resizable=yes,screenx=0,screeny=0');; return false;\">here<\/a>.",
    "impl": "cpc"
}, 'https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/loader.js');
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const afid = urlParams.get("afid");
    if (afid) {
        document.querySelectorAll("a").forEach(link => {
            if (link.href) {
                const linkUrl = new URL(link.href, window.location.origin);
                linkUrl.searchParams.set("afid", afid);
                link.href = linkUrl.toString();
            }
        });
    }

    const visitToken = localStorage.getItem('visit_token') || crypto.randomUUID();
    var sessionToken = localStorage.getItem('session_token') || crypto.randomUUID();
    localStorage.setItem('visit_token', visitToken);
    localStorage.setItem('session_token', sessionToken);
    const now = Date.now();
    const lastActive = parseInt(localStorage.getItem('last_active_at')) || 0;
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    if (now - lastActive > INACTIVITY_LIMIT) {
        localStorage.setItem('last_active_at', now);
        sessionToken = crypto.randomUUID();
        localStorage.setItem('session_token', sessionToken);
    }

    const matchingLinks = new Set();
    document.querySelectorAll("a").forEach(link => {
        const href = link.href;
        if (href.includes('/checkout') || href.includes('/ckt')) {
            matchingLinks.add(href);
        }
    });
    matchingLinks.forEach(matchingLink => {
        fetch('https://orders.cartpanda.com/api/track-visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_id: window.location.href,
                page_type: 'sales',
                visit_token: visitToken,
                cartpanda_link: matchingLink,
                session_token: sessionToken
            })
        });
    });
});