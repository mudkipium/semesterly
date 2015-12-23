(function(q, e) {
    "object" === typeof exports ? e(exports) : "function" === typeof define && define.amd ? define(["exports"], e) : e(q)
})(this, function(q) {
    function e(b) {
        this._targetElement = b;
        this._options = {
            nextLabel: "Next &rarr;",
            prevLabel: "&larr; Back",
            skipLabel: "Skip",
            doneLabel: "Try  ",
            tooltipPosition: "bottom",
            tooltipClass: "",
            exitOnEsc: !0,
            exitOnOverlayClick: !0,
            showStepNumbers: !0,
            keyboardNavigation: !0,
            showButtons: !0,
            showBullets: !0
        }
    }

    function v() {
        "undefined" === typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep;
        if (this._introItems.length <= this._currentStep) "function" === typeof this._introCompleteCallback && this._introCompleteCallback.call(this), s.call(this, this._targetElement);
        else {
            var b = this._introItems[this._currentStep];
            "undefined" !== typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, b.element);
            t.call(this, b)
        }
    }

    function x() {
        if (0 === this._currentStep) return !1;
        var b = this._introItems[--this._currentStep];
        "undefined" !== typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this,
            b.element);
        t.call(this, b)
    }

    function s(b) {
        var a = b.querySelector(".introjs-overlay");
        a.style.opacity = 0;
        setTimeout(function() {
            a.parentNode && a.parentNode.removeChild(a)
        }, 500);
        (b = b.querySelector(".introjs-helperLayer")) && b.parentNode.removeChild(b);
        if (b = document.querySelector(".introjs-showElement")) b.className = b.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
        if ((b = document.querySelectorAll(".introjs-fixParent")) && 0 < b.length)
            for (var c = b.length - 1; 0 <= c; c--) b[c].className = b[c].className.replace(/introjs-fixParent/g,
                "").replace(/^\s+|\s+$/g, "");
        window.removeEventListener ? window.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown);
        this._currentStep = void 0
    }

    function y(b, a, c) {
        a.style.top = null;
        a.style.right = null;
        a.style.bottom = null;
        a.style.left = null;
        if (this._introItems[this._currentStep]) {
            var d = "",
                d = this._introItems[this._currentStep],
                d = "string" === typeof d.tooltipClass ? d.tooltipClass : this._options.tooltipClass;
            a.className = ("introjs-tooltip " + d).replace(/^\s+|\s+$/g,
                "");
            switch (this._introItems[this._currentStep].position) {
                case "top":
                    a.style.left = "15px";
                    a.style.top = "-" + (p(a).height + 10) + "px";
                    c.className = "introjs-arrow bottom";
                    break;
                case "right":
                    a.style.left = p(b).width + 20 + "px";
                    c.className = "introjs-arrow left";
                    break;
                case "left":
                    a.style.top = null;
                    a.style.right = p(b).width + 20 + "px";
                    c.className = "introjs-arrow right";
                    break;
                default:
                    a.style.bottom = "-" + (p(a).height + 10) + "px", c.className = "introjs-arrow top"
            }
        }
    }

    function w(b) {
        if (b && this._introItems[this._currentStep]) {
            var a =
                p(this._introItems[this._currentStep].element);
            b.setAttribute("style", "width: " + (a.width) + "px; height:" + (a.height) + "px; top:" + (a.top) + "px;left: " + (a.left) + "px;")
        }
    }

    function t(b) {
        var a;
        "undefined" !== typeof this._introChangeCallback && this._introChangeCallback.call(this, b.element);
        var c = this,
            d = document.querySelector(".introjs-helperLayer");
        p(b.element);
        if (null != d) {
            var f = d.querySelector(".introjs-helperNumberLayer"),
                A = d.querySelector(".introjs-tooltiptext"),
                h = d.querySelector(".introjs-arrow"),
                n = d.querySelector(".introjs-tooltip"),
                g = d.querySelector(".introjs-skipbutton"),
                m = d.querySelector(".introjs-prevbutton"),
                j = d.querySelector(".introjs-nextbutton");
            n.style.opacity = 0;
            w.call(c, d);
            var k = document.querySelectorAll(".introjs-fixParent");
            if (k && 0 < k.length)
                for (a = k.length - 1; 0 <= a; a--) k[a].className = k[a].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            a = document.querySelector(".introjs-showElement");
            a.className = a.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g,
                "");
            c._lastShowElementTimer && clearTimeout(c._lastShowElementTimer);
            c._lastShowElementTimer = setTimeout(function() {
                null != f && (f.innerHTML = b.step);
                A.innerHTML = b.intro;
                y.call(c, b.element, n, h);
                d.querySelector(".introjs-bullets li > a.active").className = "";
                d.querySelector('.introjs-bullets li > a[data-stepnumber="' + b.step + '"]').className = "active";
                n.style.opacity = 1
            }, 350)
        } else {
            var g = document.createElement("div"),
                k = document.createElement("div"),
                l = document.createElement("div"),
                m = document.createElement("div"),
                j = document.createElement("div"),
                e = document.createElement("div");
            g.className = "introjs-helperLayer";
            w.call(c, g);
            this._targetElement.appendChild(g);
            k.className = "introjs-arrow";
            m.className = "introjs-tooltiptext";
            m.innerHTML = b.intro;
            j.className = "introjs-bullets";
            !1 === this._options.showBullets && (j.style.display = "none");
            var q = document.createElement("ul");
            a = 0;
            for (var u = this._introItems.length; a < u; a++) {
                var t = document.createElement("li"),
                    r = document.createElement("a");
                r.onclick = function() {
                    c.goToStep(this.getAttribute("data-stepnumber"))
                };
                0 === a && (r.className = "active");
                r.href = "javascript:void(0);";
                r.innerHTML = "&nbsp;";
                r.setAttribute("data-stepnumber", this._introItems[a].step);
                t.appendChild(r);
                q.appendChild(t)
            }
            j.appendChild(q);
            e.className = "introjs-tooltipbuttons";
            !1 === this._options.showButtons && (e.style.display = "none");
            l.className = "introjs-tooltip";
            l.appendChild(m);
            l.appendChild(j);
            !0 == this._options.showStepNumbers && (a = document.createElement("span"), a.className = "introjs-helperNumberLayer", a.innerHTML = b.step, g.appendChild(a));
            l.appendChild(k);
            g.appendChild(l);
            j = document.createElement("a");
            j.onclick = function() {
                c._introItems.length - 1 != c._currentStep && v.call(c)
            };
            j.href = "javascript:void(0);";
            j.innerHTML = this._options.nextLabel;
            m = document.createElement("a");
            m.onclick = function() {
                0 != c._currentStep && x.call(c)
            };
            m.href = "javascript:void(0);";
            m.innerHTML = this._options.prevLabel;
            g = document.createElement("a");
            g.className = "introjs-button introjs-skipbutton";
            g.href = "javascript:void(0);";
            g.innerHTML = this._options.skipLabel;
            g.onclick = function() {
                c._introItems.length -
                    1 == c._currentStep && "function" === typeof c._introCompleteCallback && c._introCompleteCallback.call(c);
                c._introItems.length - 1 != c._currentStep && "function" === typeof c._introExitCallback && c._introExitCallback.call(c);
                s.call(c, c._targetElement)
            };
            e.appendChild(g);
            1 < this._introItems.length && (e.appendChild(m), e.appendChild(j));
            l.appendChild(e);
            y.call(c, b.element, l, k)
        }
        0 == this._currentStep ? (m.className = "introjs-button introjs-prevbutton introjs-disabled", j.className = "introjs-button introjs-nextbutton", g.innerHTML =
            this._options.skipLabel) : this._introItems.length - 1 == this._currentStep ? (g.innerHTML = this._options.doneLabel, m.className = "introjs-button introjs-prevbutton", j.className = "introjs-button introjs-nextbutton introjs-disabled") : (m.className = "introjs-button introjs-prevbutton", j.className = "introjs-button introjs-nextbutton", g.innerHTML = this._options.skipLabel);
        j.focus();
        b.element.className += " introjs-showElement";
        a = z(b.element, "position");
        "absolute" !== a && "relative" !== a && (b.element.className += " introjs-relativePosition");
        for (a = b.element.parentNode; null != a && "body" !== a.tagName.toLowerCase();) k = z(a, "z-index"), /[0-9]+/.test(k) && (a.className += " introjs-fixParent"), a = a.parentNode;
        a = b.element.getBoundingClientRect();
        0 <= a.top && 0 <= a.left && a.bottom + 80 <= window.innerHeight && a.right <= window.innerWidth || (l = b.element.getBoundingClientRect(), a = void 0 != window.innerWidth ? window.innerHeight : document.documentElement.clientHeight, k = l.bottom - (l.bottom - l.top), l = l.bottom - a, 0 > k || b.element.clientHeight > a ? window.scrollBy(0, k - 30) : window.scrollBy(0,
            l + 100))
    }

    function z(b, a) {
        var c = "";
        b.currentStyle ? c = b.currentStyle[a] : document.defaultView && document.defaultView.getComputedStyle && (c = document.defaultView.getComputedStyle(b, null).getPropertyValue(a));
        return c && c.toLowerCase ? c.toLowerCase() : c
    }

    function B(b) {
        var a = document.createElement("div"),
            c = "",
            d = this;
        a.className = "introjs-overlay";
        if ("body" === b.tagName.toLowerCase()) c += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;", a.setAttribute("style", c);
        else {
            var f = p(b);
            f && (c += "width: " + f.width + "px; height:" +
                f.height + "px; top:" + f.top + "px;left: " + f.left + "px;", a.setAttribute("style", c))
        }
        b.appendChild(a);
        a.onclick = function() {
            !0 == d._options.exitOnOverlayClick && (s.call(d, b), void 0 != d._introExitCallback && d._introExitCallback.call(d))
        };
        setTimeout(function() {
            c += "opacity: .8;";
            a.setAttribute("style", c)
        }, 10);
        return !0
    }

    function p(b) {
        var a = {};
        a.width = b.offsetWidth;
        a.height = b.offsetHeight;
        for (var c = 0, d = 0; b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop);) c += b.offsetLeft, d += b.offsetTop, b = b.offsetParent;
        a.top = d;
        a.left = c;
        return a
    }
    var u = function(b) {
        if ("object" === typeof b) return new e(b);
        if ("string" === typeof b) {
            if (b = document.querySelector(b)) return new e(b);
            throw Error("There is no element with given selector.");
        }
        return new e(document.body)
    };
    u.version = "0.6.0";
    u.fn = e.prototype = {
        clone: function() {
            return new e(this)
        },
        setOption: function(b, a) {
            this._options[b] = a;
            return this
        },
        setOptions: function(b) {
            var a = this._options,
                c = {},
                d;
            for (d in a) c[d] = a[d];
            for (d in b) c[d] = b[d];
            this._options = c;
            return this
        },
        start: function() {
            a: {
                var b = this._targetElement,
                    a = [],
                    c = this;
                if (this._options.steps)
                    for (var d = [], f = 0, d = this._options.steps.length; f < d; f++) {
                        var e = this._options.steps[f];
                        e.step = f + 1;
                        "string" === typeof e.element && (e.element = document.querySelector(e.element));
                        a.push(e)
                    } else {
                        d = b.querySelectorAll("*[data-intro]");
                        if (1 > d.length) break a;
                        f = 0;
                        for (e = d.length; f < e; f++) {
                            var h = d[f],
                                n = parseInt(h.getAttribute("data-step"), 10);
                            0 < n && (a[n - 1] = {
                                element: h,
                                intro: h.getAttribute("data-intro"),
                                step: parseInt(h.getAttribute("data-step"), 10),
                                tooltipClass: h.getAttribute("data-tooltipClass"),
                                position: h.getAttribute("data-position") || this._options.tooltipPosition
                            })
                        }
                        f = n = 0;
                        for (e = d.length; f < e; f++)
                            if (h = d[f], null == h.getAttribute("data-step")) {
                                for (;
                                    "undefined" != typeof a[n];) n++;
                                a[n] = {
                                    element: h,
                                    intro: h.getAttribute("data-intro"),
                                    step: n + 1,
                                    tooltipClass: h.getAttribute("data-tooltipClass"),
                                    position: h.getAttribute("data-position") || this._options.tooltipPosition
                                }
                            }
                    }
                f = [];
                for (d = 0; d < a.length; d++) a[d] && f.push(a[d]);
                a = f;
                a.sort(function(b, a) {
                    return b.step - a.step
                });
                c._introItems = a;
                B.call(c, b) && (v.call(c),
                    b.querySelector(".introjs-skipbutton"), b.querySelector(".introjs-nextbutton"), c._onKeyDown = function(a) {
                        if (27 === a.keyCode && !0 == c._options.exitOnEsc) s.call(c, b), void 0 != c._introExitCallback && c._introExitCallback.call(c);
                        else if (37 === a.keyCode) x.call(c);
                        else if (39 === a.keyCode || 13 === a.keyCode) v.call(c), a.preventDefault ? a.preventDefault() : a.returnValue = !1
                    }, c._onResize = function() {
                        w.call(c, document.querySelector(".introjs-helperLayer"))
                    }, window.addEventListener ? (this._options.keyboardNavigation && window.addEventListener("keydown",
                        c._onKeyDown, !0), window.addEventListener("resize", c._onResize, !0)) : document.attachEvent && (this._options.keyboardNavigation && document.attachEvent("onkeydown", c._onKeyDown), document.attachEvent("onresize", c._onResize)))
            }
            return this
        },
        goToStep: function(b) {
            this._currentStep = b - 2;
            "undefined" !== typeof this._introItems && v.call(this);
            return this
        },
        exit: function() {
            s.call(this, this._targetElement)
        },
        refresh: function() {
            w.call(this, document.querySelector(".introjs-helperLayer"));
            return this
        },
        onbeforechange: function(b) {
            if ("function" ===
                typeof b) this._introBeforeChangeCallback = b;
            else throw Error("Provided callback for onbeforechange was not a function");
            return this
        },
        onchange: function(b) {
            if ("function" === typeof b) this._introChangeCallback = b;
            else throw Error("Provided callback for onchange was not a function.");
            return this
        },
        oncomplete: function(b) {
            if ("function" === typeof b) this._introCompleteCallback = b;
            else throw Error("Provided callback for oncomplete was not a function.");
            return this
        },
        onexit: function(b) {
            if ("function" === typeof b) this._introExitCallback =
                b;
            else throw Error("Provided callback for onexit was not a function.");
            return this
        }
    };
    return q.introJs = u
});