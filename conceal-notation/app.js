// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var B = Object.create;
var C = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var ee = Object.getOwnPropertyNames;
var ne = Object.getPrototypeOf, te = Object.prototype.hasOwnProperty;
var re = (e)=>C(e, "__esModule", {
        value: !0
    })
;
var V = (e, n)=>()=>(n || e((n = {
            exports: {}
        }).exports, n), n.exports)
;
var le = (e, n, t, l)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let o of ee(n))!te.call(e, o) && (t || o !== "default") && C(e, o, {
        get: ()=>n[o]
        ,
        enumerable: !(l = G(n, o)) || l.enumerable
    });
    return e;
}, H = (e, n)=>le(re(C(e != null ? B(ne(e)) : {}, "default", !n && e && e.__esModule ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var Z = V((r)=>{
    "use strict";
    var y, h1, T, R;
    typeof performance == "object" && typeof performance.now == "function" ? (J1 = performance, r.unstable_now = function() {
        return J1.now();
    }) : (L = Date, K1 = L.now(), r.unstable_now = function() {
        return L.now() - K1;
    });
    var J1, L, K1;
    typeof window > "u" || typeof MessageChannel != "function" ? (_ = null, N = null, j = function() {
        if (_ !== null) try {
            var e = r.unstable_now();
            _(!0, e), _ = null;
        } catch (n) {
            throw setTimeout(j, 0), n;
        }
    }, y = function(e) {
        _ !== null ? setTimeout(y, 0, e) : (_ = e, setTimeout(j, 0));
    }, h1 = function(e, n) {
        N = setTimeout(e, n);
    }, T = function() {
        clearTimeout(N);
    }, r.unstable_shouldYield = function() {
        return !1;
    }, R = r.unstable_forceFrameRate = function() {}) : (Q1 = window.setTimeout, S = window.clearTimeout, typeof console < "u" && (X1 = window.cancelAnimationFrame, typeof window.requestAnimationFrame != "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), typeof X1 != "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")), v = !1, w = null, g1 = -1, E = 5, F = 0, r.unstable_shouldYield = function() {
        return r.unstable_now() >= F;
    }, R = function() {}, r.unstable_forceFrameRate = function(e) {
        0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < e ? Math.floor(1000 / e) : 5;
    }, q = new MessageChannel, P1 = q.port2, q.port1.onmessage = function() {
        if (w !== null) {
            var e = r.unstable_now();
            F = e + E;
            try {
                w(!0, e) ? P1.postMessage(null) : (v = !1, w = null);
            } catch (n) {
                throw P1.postMessage(null), n;
            }
        } else v = !1;
    }, y = function(e) {
        w = e, v || (v = !0, P1.postMessage(null));
    }, h1 = function(e, n) {
        g1 = Q1(function() {
            e(r.unstable_now());
        }, n);
    }, T = function() {
        S(g1), g1 = -1;
    });
    var _, N, j, Q1, S, X1, v, w, g1, E, F, q, P1;
    function Y1(e, n) {
        var t = e.length;
        e.push(n);
        e: for(;;){
            var l = t - 1 >>> 1, o = e[l];
            if (o !== void 0 && 0 < x(o, n)) e[l] = n, e[t] = o, t = l;
            else break e;
        }
    }
    function a(e) {
        return e = e[0], e === void 0 ? null : e;
    }
    function I(e) {
        var n = e[0];
        if (n !== void 0) {
            var t = e.pop();
            if (t !== n) {
                e[0] = t;
                e: for(var l = 0, o = e.length; l < o;){
                    var f = 2 * (l + 1) - 1, b = e[f], m = f + 1, d = e[m];
                    if (b !== void 0 && 0 > x(b, t)) d !== void 0 && 0 > x(d, b) ? (e[l] = d, e[m] = t, l = m) : (e[l] = b, e[f] = t, l = f);
                    else if (d !== void 0 && 0 > x(d, t)) e[l] = d, e[m] = t, l = m;
                    else break e;
                }
            }
            return n;
        }
        return null;
    }
    function x(e, n) {
        var t = e.sortIndex - n.sortIndex;
        return t !== 0 ? t : e.id - n.id;
    }
    var s = [], c = [], oe = 1, u = null, i = 3, M = !1, p = !1, k = !1;
    function $(e) {
        for(var n = a(c); n !== null;){
            if (n.callback === null) I(c);
            else if (n.startTime <= e) I(c), n.sortIndex = n.expirationTime, Y1(s, n);
            else break;
            n = a(c);
        }
    }
    function U(e) {
        if (k = !1, $(e), !p) if (a(s) !== null) p = !0, y(W1);
        else {
            var n = a(c);
            n !== null && h1(U, n.startTime - e);
        }
    }
    function W1(e, n) {
        p = !1, k && (k = !1, T()), M = !0;
        var t = i;
        try {
            for($(n), u = a(s); u !== null && (!(u.expirationTime > n) || e && !r.unstable_shouldYield());){
                var l = u.callback;
                if (typeof l == "function") {
                    u.callback = null, i = u.priorityLevel;
                    var o = l(u.expirationTime <= n);
                    n = r.unstable_now(), typeof o == "function" ? u.callback = o : u === a(s) && I(s), $(n);
                } else I(s);
                u = a(s);
            }
            if (u !== null) var f = !0;
            else {
                var b = a(c);
                b !== null && h1(U, b.startTime - n), f = !1;
            }
            return f;
        } finally{
            u = null, i = t, M = !1;
        }
    }
    var ie1 = R;
    r.unstable_IdlePriority = 5;
    r.unstable_ImmediatePriority = 1;
    r.unstable_LowPriority = 4;
    r.unstable_NormalPriority = 3;
    r.unstable_Profiling = null;
    r.unstable_UserBlockingPriority = 2;
    r.unstable_cancelCallback = function(e) {
        e.callback = null;
    };
    r.unstable_continueExecution = function() {
        p || M || (p = !0, y(W1));
    };
    r.unstable_getCurrentPriorityLevel = function() {
        return i;
    };
    r.unstable_getFirstCallbackNode = function() {
        return a(s);
    };
    r.unstable_next = function(e) {
        switch(i){
            case 1:
            case 2:
            case 3:
                var n = 3;
                break;
            default:
                n = i;
        }
        var t = i;
        i = n;
        try {
            return e();
        } finally{
            i = t;
        }
    };
    r.unstable_pauseExecution = function() {};
    r.unstable_requestPaint = ie1;
    r.unstable_runWithPriority = function(e, n) {
        switch(e){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                e = 3;
        }
        var t = i;
        i = e;
        try {
            return n();
        } finally{
            i = t;
        }
    };
    r.unstable_scheduleCallback = function(e, n, t) {
        var l = r.unstable_now();
        switch(typeof t == "object" && t !== null ? (t = t.delay, t = typeof t == "number" && 0 < t ? l + t : l) : t = l, e){
            case 1:
                var o = -1;
                break;
            case 2:
                o = 250;
                break;
            case 5:
                o = 1073741823;
                break;
            case 4:
                o = 10000;
                break;
            default:
                o = 5000;
        }
        return o = t + o, e = {
            id: oe++,
            callback: n,
            priorityLevel: e,
            startTime: t,
            expirationTime: o,
            sortIndex: -1
        }, t > l ? (e.sortIndex = t, Y1(c, e), a(s) === null && e === a(c) && (k ? T() : k = !0, h1(U, t - l))) : (e.sortIndex = o, Y1(s, e), p || M || (p = !0, y(W1))), e;
    };
    r.unstable_wrapCallback = function(e) {
        var n = i;
        return function() {
            var t = i;
            i = n;
            try {
                return e.apply(this, arguments);
            } finally{
                i = t;
            }
        };
    };
});
var O = V((fe, A)=>{
    "use strict";
    A.exports = Z();
});
var D = H(O()), z = H(O()), { unstable_now: be , unstable_shouldYield: pe , unstable_IdlePriority: de , unstable_ImmediatePriority: _e , unstable_LowPriority: ye , unstable_NormalPriority: me , unstable_Profiling: ve , unstable_UserBlockingPriority: we , unstable_cancelCallback: he , unstable_continueExecution: ke , unstable_getCurrentPriorityLevel: ge , unstable_getFirstCallbackNode: Pe , unstable_next: xe , unstable_pauseExecution: Te , unstable_requestPaint: Ie , unstable_runWithPriority: Me , unstable_scheduleCallback: Ce , unstable_wrapCallback: Le  } = z, { default: ue , ...ae } = z, Ne = (D.default ?? ue) ?? ae;
const __object_assign$ = Object.assign;
var G1 = Object.create;
var h = Object.defineProperty;
var J = Object.getOwnPropertyDescriptor;
var K = Object.getOwnPropertyNames;
var Q = Object.getPrototypeOf, X = Object.prototype.hasOwnProperty;
var Z1 = (e)=>h(e, "__esModule", {
        value: !0
    })
;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (t, r)=>(typeof require != "undefined" ? require : t)[r]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var O1 = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports)
;
var ee1 = (e, t, r, u)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let o of K(t))!X.call(e, o) && (r || o !== "default") && h(e, o, {
        get: ()=>t[o]
        ,
        enumerable: !(u = J(t, o)) || u.enumerable
    });
    return e;
}, P = (e, t)=>ee1(Z1(h(e != null ? G1(Q(e)) : {}, "default", !t && e && e.__esModule ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var z1 = O1((n)=>{
    "use strict";
    var S = __object_assign$, y = 60103, I = 60106;
    n.Fragment = 60107;
    n.StrictMode = 60108;
    n.Profiler = 60114;
    var w = 60109, A = 60110, F = 60112;
    n.Suspense = 60113;
    var L = 60115, q = 60116;
    typeof Symbol == "function" && Symbol.for && (l = Symbol.for, y = l("react.element"), I = l("react.portal"), n.Fragment = l("react.fragment"), n.StrictMode = l("react.strict_mode"), n.Profiler = l("react.profiler"), w = l("react.provider"), A = l("react.context"), F = l("react.forward_ref"), n.Suspense = l("react.suspense"), L = l("react.memo"), q = l("react.lazy"));
    var l, j = typeof Symbol == "function" && Symbol.iterator;
    function te1(e) {
        return e === null || typeof e != "object" ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function _(e) {
        for(var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++)t += "&args[]=" + encodeURIComponent(arguments[r]);
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var D1 = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }, M = {};
    function d(e, t, r) {
        this.props = e, this.context = t, this.refs = M, this.updater = r || D1;
    }
    d.prototype.isReactComponent = {};
    d.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null) throw Error(_(85));
        this.updater.enqueueSetState(this, e, t, "setState");
    };
    d.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function N() {}
    N.prototype = d.prototype;
    function C1(e, t, r) {
        this.props = e, this.context = t, this.refs = M, this.updater = r || D1;
    }
    var R = C1.prototype = new N;
    R.constructor = C1;
    S(R, d.prototype);
    R.isPureReactComponent = !0;
    var $ = {
        current: null
    }, U = Object.prototype.hasOwnProperty, T = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function V1(e, t, r) {
        var u, o = {}, f = null, s = null;
        if (t != null) for(u in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (f = "" + t.key), t)U.call(t, u) && !T.hasOwnProperty(u) && (o[u] = t[u]);
        var c = arguments.length - 2;
        if (c === 1) o.children = r;
        else if (1 < c) {
            for(var i = Array(c), p = 0; p < c; p++)i[p] = arguments[p + 2];
            o.children = i;
        }
        if (e && e.defaultProps) for(u in c = e.defaultProps, c)o[u] === void 0 && (o[u] = c[u]);
        return {
            $$typeof: y,
            type: e,
            key: f,
            ref: s,
            props: o,
            _owner: $.current
        };
    }
    function re1(e, t) {
        return {
            $$typeof: y,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        };
    }
    function k(e) {
        return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function ne1(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, function(r) {
            return t[r];
        });
    }
    var x = /\/+/g;
    function E(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? ne1("" + e.key) : t.toString(36);
    }
    function m(e, t, r, u, o) {
        var f = typeof e;
        (f === "undefined" || f === "boolean") && (e = null);
        var s = !1;
        if (e === null) s = !0;
        else switch(f){
            case "string":
            case "number":
                s = !0;
                break;
            case "object":
                switch(e.$$typeof){
                    case y:
                    case I:
                        s = !0;
                }
        }
        if (s) return s = e, o = o(s), e = u === "" ? "." + E(s, 0) : u, Array.isArray(o) ? (r = "", e != null && (r = e.replace(x, "$&/") + "/"), m(o, t, r, "", function(p) {
            return p;
        })) : o != null && (k(o) && (o = re1(o, r + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(x, "$&/") + "/") + e)), t.push(o)), 1;
        if (s = 0, u = u === "" ? "." : u + ":", Array.isArray(e)) for(var c = 0; c < e.length; c++){
            f = e[c];
            var i = u + E(f, c);
            s += m(f, t, r, i, o);
        }
        else if (i = te1(e), typeof i == "function") for(e = i.call(e), c = 0; !(f = e.next()).done;)f = f.value, i = u + E(f, c++), s += m(f, t, r, i, o);
        else if (f === "object") throw t = "" + e, Error(_(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
        return s;
    }
    function v(e, t, r) {
        if (e == null) return e;
        var u = [], o = 0;
        return m(e, u, "", "", function(f) {
            return t.call(r, f, o++);
        }), u;
    }
    function oe(e) {
        if (e._status === -1) {
            var t = e._result;
            t = t(), e._status = 0, e._result = t, t.then(function(r) {
                e._status === 0 && (r = r.default, e._status = 1, e._result = r);
            }, function(r) {
                e._status === 0 && (e._status = 2, e._result = r);
            });
        }
        if (e._status === 1) return e._result;
        throw e._result;
    }
    var B1 = {
        current: null
    };
    function a() {
        var e = B1.current;
        if (e === null) throw Error(_(321));
        return e;
    }
    var ue1 = {
        ReactCurrentDispatcher: B1,
        ReactCurrentBatchConfig: {
            transition: 0
        },
        ReactCurrentOwner: $,
        IsSomeRendererActing: {
            current: !1
        },
        assign: S
    };
    n.Children = {
        map: v,
        forEach: function(e, t, r) {
            v(e, function() {
                t.apply(this, arguments);
            }, r);
        },
        count: function(e) {
            var t = 0;
            return v(e, function() {
                t++;
            }), t;
        },
        toArray: function(e) {
            return v(e, function(t) {
                return t;
            }) || [];
        },
        only: function(e) {
            if (!k(e)) throw Error(_(143));
            return e;
        }
    };
    n.Component = d;
    n.PureComponent = C1;
    n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ue1;
    n.cloneElement = function(e, t, r) {
        if (e == null) throw Error(_(267, e));
        var u = S({}, e.props), o = e.key, f = e.ref, s = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (f = t.ref, s = $.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
            for(i in t)U.call(t, i) && !T.hasOwnProperty(i) && (u[i] = t[i] === void 0 && c !== void 0 ? c[i] : t[i]);
        }
        var i = arguments.length - 2;
        if (i === 1) u.children = r;
        else if (1 < i) {
            c = Array(i);
            for(var p = 0; p < i; p++)c[p] = arguments[p + 2];
            u.children = c;
        }
        return {
            $$typeof: y,
            type: e.type,
            key: o,
            ref: f,
            props: u,
            _owner: s
        };
    };
    n.createContext = function(e, t) {
        return t === void 0 && (t = null), e = {
            $$typeof: A,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, e.Provider = {
            $$typeof: w,
            _context: e
        }, e.Consumer = e;
    };
    n.createElement = V1;
    n.createFactory = function(e) {
        var t = V1.bind(null, e);
        return t.type = e, t;
    };
    n.createRef = function() {
        return {
            current: null
        };
    };
    n.forwardRef = function(e) {
        return {
            $$typeof: F,
            render: e
        };
    };
    n.isValidElement = k;
    n.lazy = function(e) {
        return {
            $$typeof: q,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: oe
        };
    };
    n.memo = function(e, t) {
        return {
            $$typeof: L,
            type: e,
            compare: t === void 0 ? null : t
        };
    };
    n.useCallback = function(e, t) {
        return a().useCallback(e, t);
    };
    n.useContext = function(e, t) {
        return a().useContext(e, t);
    };
    n.useDebugValue = function() {};
    n.useEffect = function(e, t) {
        return a().useEffect(e, t);
    };
    n.useImperativeHandle = function(e, t, r) {
        return a().useImperativeHandle(e, t, r);
    };
    n.useLayoutEffect = function(e, t) {
        return a().useLayoutEffect(e, t);
    };
    n.useMemo = function(e, t) {
        return a().useMemo(e, t);
    };
    n.useReducer = function(e, t, r) {
        return a().useReducer(e, t, r);
    };
    n.useRef = function(e) {
        return a().useRef(e);
    };
    n.useState = function(e) {
        return a().useState(e);
    };
    n.version = "17.0.2";
});
var g = O1((le, H1)=>{
    "use strict";
    H1.exports = z1();
});
var W = P(g()), Y = P(g()), { Fragment: pe1 , StrictMode: ae1 , Profiler: ye1 , Suspense: de1 , Children: _e1 , Component: ve1 , PureComponent: me1 , __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: he1 , cloneElement: Ee , createContext: Se , createElement: Ce1 , createFactory: Re , createRef: $e , forwardRef: ke1 , isValidElement: ge1 , lazy: Oe , memo: Pe1 , useCallback: je , useContext: xe1 , useDebugValue: Ie1 , useEffect: we1 , useImperativeHandle: Ae , useLayoutEffect: Fe , useMemo: Le1 , useReducer: qe , useRef: De , useState: Me1 , version: Ne1  } = Y, { default: ie , ...fe } = Y, Ue = (W.default ?? ie) ?? fe;
const __object_assign$1 = Object.assign;
var Ps = Object.create;
var Or = Object.defineProperty;
var Ts = Object.getOwnPropertyDescriptor;
var Ls = Object.getOwnPropertyNames;
var zs = Object.getPrototypeOf, Os = Object.prototype.hasOwnProperty;
var Ms = (e)=>Or(e, "__esModule", {
        value: !0
    })
;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (n, t)=>(typeof require != "undefined" ? require : n)[t]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var Ri = (e, n)=>()=>(n || e((n = {
            exports: {}
        }).exports, n), n.exports)
;
var Rs = (e, n, t, r)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let l of Ls(n))!Os.call(e, l) && (t || l !== "default") && Or(e, l, {
        get: ()=>n[l]
        ,
        enumerable: !(r = Ts(n, l)) || r.enumerable
    });
    return e;
}, Di = (e, n)=>Rs(Ms(Or(e != null ? Ps(zs(e)) : {}, "default", !n && e && e.__esModule ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var Es = Ri((ie2)=>{
    "use strict";
    var yr = Ue, M = __object_assign$1, U = Ne;
    function v(e) {
        for(var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++)n += "&args[]=" + encodeURIComponent(arguments[t]);
        return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    if (!yr) throw Error(v(227));
    var Ko = new Set, ot = {};
    function Je(e, n) {
        kn(e, n), kn(e + "Capture", n);
    }
    function kn(e, n) {
        for(ot[e] = n, e = 0; e < n.length; e++)Ko.add(n[e]);
    }
    var we2 = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ds = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ii = Object.prototype.hasOwnProperty, Fi = {}, ji = {};
    function Is(e) {
        return Ii.call(ji, e) ? !0 : Ii.call(Fi, e) ? !1 : Ds.test(e) ? ji[e] = !0 : (Fi[e] = !0, !1);
    }
    function Fs(e, n, t, r) {
        if (t !== null && t.type === 0) return !1;
        switch(typeof n){
            case "function":
            case "symbol":
                return !0;
            case "boolean":
                return r ? !1 : t !== null ? !t.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
            default:
                return !1;
        }
    }
    function js(e, n, t, r) {
        if (n === null || typeof n > "u" || Fs(e, n, t, r)) return !0;
        if (r) return !1;
        if (t !== null) switch(t.type){
            case 3:
                return !n;
            case 4:
                return n === !1;
            case 5:
                return isNaN(n);
            case 6:
                return isNaN(n) || 1 > n;
        }
        return !1;
    }
    function X2(e, n, t, r, l, i, o) {
        this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = i, this.removeEmptyString = o;
    }
    var H2 = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        H2[e] = new X2(e, 0, !1, e, null, !1, !1);
    });
    [
        [
            "acceptCharset",
            "accept-charset"
        ],
        [
            "className",
            "class"
        ],
        [
            "htmlFor",
            "for"
        ],
        [
            "httpEquiv",
            "http-equiv"
        ]
    ].forEach(function(e) {
        var n = e[0];
        H2[n] = new X2(n, 1, !1, e[1], null, !1, !1);
    });
    [
        "contentEditable",
        "draggable",
        "spellCheck",
        "value"
    ].forEach(function(e) {
        H2[e] = new X2(e, 2, !1, e.toLowerCase(), null, !1, !1);
    });
    [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
    ].forEach(function(e) {
        H2[e] = new X2(e, 2, !1, e, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        H2[e] = new X2(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
    [
        "checked",
        "multiple",
        "muted",
        "selected"
    ].forEach(function(e) {
        H2[e] = new X2(e, 3, !0, e, null, !1, !1);
    });
    [
        "capture",
        "download"
    ].forEach(function(e) {
        H2[e] = new X2(e, 4, !1, e, null, !1, !1);
    });
    [
        "cols",
        "rows",
        "size",
        "span"
    ].forEach(function(e) {
        H2[e] = new X2(e, 6, !1, e, null, !1, !1);
    });
    [
        "rowSpan",
        "start"
    ].forEach(function(e) {
        H2[e] = new X2(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Hl = /[\-:]([a-z])/g;
    function Wl(e) {
        return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var n = e.replace(Hl, Wl);
        H2[n] = new X2(n, 1, !1, e, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var n = e.replace(Hl, Wl);
        H2[n] = new X2(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
    [
        "xml:base",
        "xml:lang",
        "xml:space"
    ].forEach(function(e) {
        var n = e.replace(Hl, Wl);
        H2[n] = new X2(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    [
        "tabIndex",
        "crossOrigin"
    ].forEach(function(e) {
        H2[e] = new X2(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    H2.xlinkHref = new X2("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    [
        "src",
        "href",
        "action",
        "formAction"
    ].forEach(function(e) {
        H2[e] = new X2(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Al(e, n, t, r) {
        var l = H2.hasOwnProperty(n) ? H2[n] : null, i = l !== null ? l.type === 0 : r ? !1 : !(!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N");
        i || (js(n, t, l, r) && (t = null), r || l === null ? Is(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
    }
    var qe1 = yr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, An = 60103, We = 60106, ke2 = 60107, $l = 60108, Kn = 60114, Ql = 60109, Yl = 60110, gr = 60112, Gn = 60113, Kt = 60120, wr = 60115, Xl = 60116, Kl = 60121, Gl = 60128, Go = 60129, Zl = 60130, nl = 60131;
    typeof Symbol == "function" && Symbol.for && (F = Symbol.for, An = F("react.element"), We = F("react.portal"), ke2 = F("react.fragment"), $l = F("react.strict_mode"), Kn = F("react.profiler"), Ql = F("react.provider"), Yl = F("react.context"), gr = F("react.forward_ref"), Gn = F("react.suspense"), Kt = F("react.suspense_list"), wr = F("react.memo"), Xl = F("react.lazy"), Kl = F("react.block"), F("react.scope"), Gl = F("react.opaque.id"), Go = F("react.debug_trace_mode"), Zl = F("react.offscreen"), nl = F("react.legacy_hidden"));
    var F, Ui = typeof Symbol == "function" && Symbol.iterator;
    function On(e) {
        return e === null || typeof e != "object" ? null : (e = Ui && e[Ui] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var Rr;
    function $n(e) {
        if (Rr === void 0) try {
            throw Error();
        } catch (t) {
            var n = t.stack.trim().match(/\n( *(at )?)/);
            Rr = n && n[1] || "";
        }
        return `
` + Rr + e;
    }
    var Dr = !1;
    function _t(e, n) {
        if (!e || Dr) return "";
        Dr = !0;
        var t = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            if (n) if (n = function() {
                throw Error();
            }, Object.defineProperty(n.prototype, "props", {
                set: function() {
                    throw Error();
                }
            }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(n, []);
                } catch (s) {
                    var r = s;
                }
                Reflect.construct(e, [], n);
            } else {
                try {
                    n.call();
                } catch (s) {
                    r = s;
                }
                e.call(n.prototype);
            }
            else {
                try {
                    throw Error();
                } catch (s) {
                    r = s;
                }
                e();
            }
        } catch (s) {
            if (s && r && typeof s.stack == "string") {
                for(var l = s.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u];)u--;
                for(; 1 <= o && 0 <= u; o--, u--)if (l[o] !== i[u]) {
                    if (o !== 1 || u !== 1) do if (o--, u--, 0 > u || l[o] !== i[u]) return `
` + l[o].replace(" at new ", " at ");
                    while (1 <= o && 0 <= u)
                    break;
                }
            }
        } finally{
            Dr = !1, Error.prepareStackTrace = t;
        }
        return (e = e ? e.displayName || e.name : "") ? $n(e) : "";
    }
    function Us(e) {
        switch(e.tag){
            case 5:
                return $n(e.type);
            case 16:
                return $n("Lazy");
            case 13:
                return $n("Suspense");
            case 19:
                return $n("SuspenseList");
            case 0:
            case 2:
            case 15:
                return e = _t(e.type, !1), e;
            case 11:
                return e = _t(e.type.render, !1), e;
            case 22:
                return e = _t(e.type._render, !1), e;
            case 1:
                return e = _t(e.type, !0), e;
            default:
                return "";
        }
    }
    function dn(e) {
        if (e == null) return null;
        if (typeof e == "function") return e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch(e){
            case ke2:
                return "Fragment";
            case We:
                return "Portal";
            case Kn:
                return "Profiler";
            case $l:
                return "StrictMode";
            case Gn:
                return "Suspense";
            case Kt:
                return "SuspenseList";
        }
        if (typeof e == "object") switch(e.$$typeof){
            case Yl:
                return (e.displayName || "Context") + ".Consumer";
            case Ql:
                return (e._context.displayName || "Context") + ".Provider";
            case gr:
                var n = e.render;
                return n = n.displayName || n.name || "", e.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
            case wr:
                return dn(e.type);
            case Kl:
                return dn(e._render);
            case Xl:
                n = e._payload, e = e._init;
                try {
                    return dn(e(n));
                } catch  {}
        }
        return null;
    }
    function De1(e) {
        switch(typeof e){
            case "boolean":
            case "number":
            case "object":
            case "string":
            case "undefined":
                return e;
            default:
                return "";
        }
    }
    function Zo(e) {
        var n = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function Vs(e) {
        var n = Zo(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
        if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
            var l = t.get, i = t.set;
            return Object.defineProperty(e, n, {
                configurable: !0,
                get: function() {
                    return l.call(this);
                },
                set: function(o) {
                    r = "" + o, i.call(this, o);
                }
            }), Object.defineProperty(e, n, {
                enumerable: t.enumerable
            }), {
                getValue: function() {
                    return r;
                },
                setValue: function(o) {
                    r = "" + o;
                },
                stopTracking: function() {
                    e._valueTracker = null, delete e[n];
                }
            };
        }
    }
    function Nt(e) {
        e._valueTracker || (e._valueTracker = Vs(e));
    }
    function Jo(e) {
        if (!e) return !1;
        var n = e._valueTracker;
        if (!n) return !0;
        var t = n.getValue(), r = "";
        return e && (r = Zo(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
    }
    function Gt(e) {
        if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
        try {
            return e.activeElement || e.body;
        } catch  {
            return e.body;
        }
    }
    function tl(e, n) {
        var t = n.checked;
        return M({}, n, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: t ?? e._wrapperState.initialChecked
        });
    }
    function Vi(e, n) {
        var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
        t = De1(n.value != null ? n.value : t), e._wrapperState = {
            initialChecked: r,
            initialValue: t,
            controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null
        };
    }
    function qo(e, n) {
        n = n.checked, n != null && Al(e, "checked", n, !1);
    }
    function rl(e, n) {
        qo(e, n);
        var t = De1(n.value), r = n.type;
        if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
        else if (r === "submit" || r === "reset") {
            e.removeAttribute("value");
            return;
        }
        n.hasOwnProperty("value") ? ll(e, n.type, t) : n.hasOwnProperty("defaultValue") && ll(e, n.type, De1(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
    }
    function Bi(e, n, t) {
        if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
            var r = n.type;
            if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
            n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
        }
        t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
    }
    function ll(e, n, t) {
        (n !== "number" || Gt(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
    }
    function Bs(e) {
        var n = "";
        return yr.Children.forEach(e, function(t) {
            t != null && (n += t);
        }), n;
    }
    function il(e, n) {
        return e = M({
            children: void 0
        }, n), (n = Bs(n.children)) && (e.children = n), e;
    }
    function pn(e, n, t, r) {
        if (e = e.options, n) {
            n = {};
            for(var l = 0; l < t.length; l++)n["$" + t[l]] = !0;
            for(t = 0; t < e.length; t++)l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
        } else {
            for(t = "" + De1(t), n = null, l = 0; l < e.length; l++){
                if (e[l].value === t) {
                    e[l].selected = !0, r && (e[l].defaultSelected = !0);
                    return;
                }
                n !== null || e[l].disabled || (n = e[l]);
            }
            n !== null && (n.selected = !0);
        }
    }
    function ol(e, n) {
        if (n.dangerouslySetInnerHTML != null) throw Error(v(91));
        return M({}, n, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        });
    }
    function Hi(e, n) {
        var t = n.value;
        if (t == null) {
            if (t = n.children, n = n.defaultValue, t != null) {
                if (n != null) throw Error(v(92));
                if (Array.isArray(t)) {
                    if (!(1 >= t.length)) throw Error(v(93));
                    t = t[0];
                }
                n = t;
            }
            n == null && (n = ""), t = n;
        }
        e._wrapperState = {
            initialValue: De1(t)
        };
    }
    function bo(e, n) {
        var t = De1(n.value), r = De1(n.defaultValue);
        t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
    }
    function Wi(e) {
        var n = e.textContent;
        n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
    }
    var ul = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg"
    };
    function eu(e) {
        switch(e){
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml";
        }
    }
    function sl(e, n) {
        return e == null || e === "http://www.w3.org/1999/xhtml" ? eu(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var Pt, nu = function(e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
            MSApp.execUnsafeLocalFunction(function() {
                return e(n, t, r, l);
            });
        } : e;
    }(function(e, n) {
        if (e.namespaceURI !== ul.svg || "innerHTML" in e) e.innerHTML = n;
        else {
            for(Pt = Pt || document.createElement("div"), Pt.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = Pt.firstChild; e.firstChild;)e.removeChild(e.firstChild);
            for(; n.firstChild;)e.appendChild(n.firstChild);
        }
    });
    function ut(e, n) {
        if (n) {
            var t = e.firstChild;
            if (t && t === e.lastChild && t.nodeType === 3) {
                t.nodeValue = n;
                return;
            }
        }
        e.textContent = n;
    }
    var Zn = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }, Hs = [
        "Webkit",
        "ms",
        "Moz",
        "O"
    ];
    Object.keys(Zn).forEach(function(e) {
        Hs.forEach(function(n) {
            n = n + e.charAt(0).toUpperCase() + e.substring(1), Zn[n] = Zn[e];
        });
    });
    function tu(e, n, t) {
        return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || Zn.hasOwnProperty(e) && Zn[e] ? ("" + n).trim() : n + "px";
    }
    function ru(e, n) {
        e = e.style;
        for(var t in n)if (n.hasOwnProperty(t)) {
            var r = t.indexOf("--") === 0, l = tu(t, n[t], r);
            t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
        }
    }
    var Ws = M({
        menuitem: !0
    }, {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    });
    function al(e, n) {
        if (n) {
            if (Ws[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(v(137, e));
            if (n.dangerouslySetInnerHTML != null) {
                if (n.children != null) throw Error(v(60));
                if (!(typeof n.dangerouslySetInnerHTML == "object" && "__html" in n.dangerouslySetInnerHTML)) throw Error(v(61));
            }
            if (n.style != null && typeof n.style != "object") throw Error(v(62));
        }
    }
    function fl(e, n) {
        if (e.indexOf("-") === -1) return typeof n.is == "string";
        switch(e){
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0;
        }
    }
    function Jl(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var cl = null, mn = null, hn = null;
    function Ai(e) {
        if (e = Et(e)) {
            if (typeof cl != "function") throw Error(v(280));
            var n = e.stateNode;
            n && (n = _r(n), cl(e.stateNode, e.type, n));
        }
    }
    function lu(e) {
        mn ? hn ? hn.push(e) : hn = [
            e
        ] : mn = e;
    }
    function iu() {
        if (mn) {
            var e = mn, n = hn;
            if (hn = mn = null, Ai(e), n) for(e = 0; e < n.length; e++)Ai(n[e]);
        }
    }
    function ql(e, n) {
        return e(n);
    }
    function ou(e, n, t, r, l) {
        return e(n, t, r, l);
    }
    function bl() {}
    var uu = ql, Ae1 = !1, Ir = !1;
    function ei() {
        (mn !== null || hn !== null) && (bl(), iu());
    }
    function As(e, n, t) {
        if (Ir) return e(n, t);
        Ir = !0;
        try {
            return uu(e, n, t);
        } finally{
            Ir = !1, ei();
        }
    }
    function st(e, n) {
        var t = e.stateNode;
        if (t === null) return null;
        var r = _r(t);
        if (r === null) return null;
        t = r[n];
        e: switch(n){
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
                break e;
            default:
                e = !1;
        }
        if (e) return null;
        if (t && typeof t != "function") throw Error(v(231, n, typeof t));
        return t;
    }
    var dl = !1;
    if (we2) try {
        nn = {}, Object.defineProperty(nn, "passive", {
            get: function() {
                dl = !0;
            }
        }), window.addEventListener("test", nn, nn), window.removeEventListener("test", nn, nn);
    } catch  {
        dl = !1;
    }
    var nn;
    function $s(e, n, t, r, l, i, o, u, s) {
        var d = Array.prototype.slice.call(arguments, 3);
        try {
            n.apply(t, d);
        } catch (y) {
            this.onError(y);
        }
    }
    var Jn = !1, Zt = null, Jt = !1, pl = null, Qs = {
        onError: function(e) {
            Jn = !0, Zt = e;
        }
    };
    function Ys(e, n, t, r, l, i, o, u, s) {
        Jn = !1, Zt = null, $s.apply(Qs, arguments);
    }
    function Xs(e, n, t, r, l, i, o, u, s) {
        if (Ys.apply(this, arguments), Jn) {
            if (Jn) {
                var d = Zt;
                Jn = !1, Zt = null;
            } else throw Error(v(198));
            Jt || (Jt = !0, pl = d);
        }
    }
    function be1(e) {
        var n = e, t = e;
        if (e.alternate) for(; n.return;)n = n.return;
        else {
            e = n;
            do n = e, (n.flags & 1026) !== 0 && (t = n.return), e = n.return;
            while (e)
        }
        return n.tag === 3 ? t : null;
    }
    function su(e) {
        if (e.tag === 13) {
            var n = e.memoizedState;
            if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
        }
        return null;
    }
    function $i(e) {
        if (be1(e) !== e) throw Error(v(188));
    }
    function Ks(e) {
        var n = e.alternate;
        if (!n) {
            if (n = be1(e), n === null) throw Error(v(188));
            return n !== e ? null : e;
        }
        for(var t = e, r = n;;){
            var l = t.return;
            if (l === null) break;
            var i = l.alternate;
            if (i === null) {
                if (r = l.return, r !== null) {
                    t = r;
                    continue;
                }
                break;
            }
            if (l.child === i.child) {
                for(i = l.child; i;){
                    if (i === t) return $i(l), e;
                    if (i === r) return $i(l), n;
                    i = i.sibling;
                }
                throw Error(v(188));
            }
            if (t.return !== r.return) t = l, r = i;
            else {
                for(var o = !1, u = l.child; u;){
                    if (u === t) {
                        o = !0, t = l, r = i;
                        break;
                    }
                    if (u === r) {
                        o = !0, r = l, t = i;
                        break;
                    }
                    u = u.sibling;
                }
                if (!o) {
                    for(u = i.child; u;){
                        if (u === t) {
                            o = !0, t = i, r = l;
                            break;
                        }
                        if (u === r) {
                            o = !0, r = i, t = l;
                            break;
                        }
                        u = u.sibling;
                    }
                    if (!o) throw Error(v(189));
                }
            }
            if (t.alternate !== r) throw Error(v(190));
        }
        if (t.tag !== 3) throw Error(v(188));
        return t.stateNode.current === t ? e : n;
    }
    function au(e) {
        if (e = Ks(e), !e) return null;
        for(var n = e;;){
            if (n.tag === 5 || n.tag === 6) return n;
            if (n.child) n.child.return = n, n = n.child;
            else {
                if (n === e) break;
                for(; !n.sibling;){
                    if (!n.return || n.return === e) return null;
                    n = n.return;
                }
                n.sibling.return = n.return, n = n.sibling;
            }
        }
        return null;
    }
    function Qi(e, n) {
        for(var t = e.alternate; n !== null;){
            if (n === e || n === t) return !0;
            n = n.return;
        }
        return !1;
    }
    var fu, ni, cu, du, ml = !1, se = [], Ne2 = null, Pe2 = null, Te1 = null, at = new Map, ft = new Map, Mn = [], Yi = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function hl(e, n, t, r, l) {
        return {
            blockedOn: e,
            domEventName: n,
            eventSystemFlags: t | 16,
            nativeEvent: l,
            targetContainers: [
                r
            ]
        };
    }
    function Xi(e, n) {
        switch(e){
            case "focusin":
            case "focusout":
                Ne2 = null;
                break;
            case "dragenter":
            case "dragleave":
                Pe2 = null;
                break;
            case "mouseover":
            case "mouseout":
                Te1 = null;
                break;
            case "pointerover":
            case "pointerout":
                at.delete(n.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                ft.delete(n.pointerId);
        }
    }
    function Rn(e, n, t, r, l, i) {
        return e === null || e.nativeEvent !== i ? (e = hl(n, t, r, l, i), n !== null && (n = Et(n), n !== null && ni(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
    }
    function Gs(e, n, t, r, l) {
        switch(n){
            case "focusin":
                return Ne2 = Rn(Ne2, e, n, t, r, l), !0;
            case "dragenter":
                return Pe2 = Rn(Pe2, e, n, t, r, l), !0;
            case "mouseover":
                return Te1 = Rn(Te1, e, n, t, r, l), !0;
            case "pointerover":
                var i = l.pointerId;
                return at.set(i, Rn(at.get(i) || null, e, n, t, r, l)), !0;
            case "gotpointercapture":
                return i = l.pointerId, ft.set(i, Rn(ft.get(i) || null, e, n, t, r, l)), !0;
        }
        return !1;
    }
    function Zs(e) {
        var n = $e1(e.target);
        if (n !== null) {
            var t = be1(n);
            if (t !== null) {
                if (n = t.tag, n === 13) {
                    if (n = su(t), n !== null) {
                        e.blockedOn = n, du(e.lanePriority, function() {
                            U.unstable_runWithPriority(e.priority, function() {
                                cu(t);
                            });
                        });
                        return;
                    }
                } else if (n === 3 && t.stateNode.hydrate) {
                    e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
                    return;
                }
            }
        }
        e.blockedOn = null;
    }
    function Ut(e) {
        if (e.blockedOn !== null) return !1;
        for(var n = e.targetContainers; 0 < n.length;){
            var t = ii(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
            if (t !== null) return n = Et(t), n !== null && ni(n), e.blockedOn = t, !1;
            n.shift();
        }
        return !0;
    }
    function Ki(e, n, t) {
        Ut(e) && t.delete(n);
    }
    function Js() {
        for(ml = !1; 0 < se.length;){
            var e = se[0];
            if (e.blockedOn !== null) {
                e = Et(e.blockedOn), e !== null && fu(e);
                break;
            }
            for(var n = e.targetContainers; 0 < n.length;){
                var t = ii(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
                if (t !== null) {
                    e.blockedOn = t;
                    break;
                }
                n.shift();
            }
            e.blockedOn === null && se.shift();
        }
        Ne2 !== null && Ut(Ne2) && (Ne2 = null), Pe2 !== null && Ut(Pe2) && (Pe2 = null), Te1 !== null && Ut(Te1) && (Te1 = null), at.forEach(Ki), ft.forEach(Ki);
    }
    function Dn(e, n) {
        e.blockedOn === n && (e.blockedOn = null, ml || (ml = !0, U.unstable_scheduleCallback(U.unstable_NormalPriority, Js)));
    }
    function pu(e) {
        function n(l) {
            return Dn(l, e);
        }
        if (0 < se.length) {
            Dn(se[0], e);
            for(var t = 1; t < se.length; t++){
                var r = se[t];
                r.blockedOn === e && (r.blockedOn = null);
            }
        }
        for(Ne2 !== null && Dn(Ne2, e), Pe2 !== null && Dn(Pe2, e), Te1 !== null && Dn(Te1, e), at.forEach(n), ft.forEach(n), t = 0; t < Mn.length; t++)r = Mn[t], r.blockedOn === e && (r.blockedOn = null);
        for(; 0 < Mn.length && (t = Mn[0], t.blockedOn === null);)Zs(t), t.blockedOn === null && Mn.shift();
    }
    function Tt(e, n) {
        var t = {};
        return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
    }
    var on = {
        animationend: Tt("Animation", "AnimationEnd"),
        animationiteration: Tt("Animation", "AnimationIteration"),
        animationstart: Tt("Animation", "AnimationStart"),
        transitionend: Tt("Transition", "TransitionEnd")
    }, Fr = {}, mu = {};
    we2 && (mu = document.createElement("div").style, "AnimationEvent" in window || (delete on.animationend.animation, delete on.animationiteration.animation, delete on.animationstart.animation), "TransitionEvent" in window || delete on.transitionend.transition);
    function Sr(e) {
        if (Fr[e]) return Fr[e];
        if (!on[e]) return e;
        var n = on[e], t;
        for(t in n)if (n.hasOwnProperty(t) && t in mu) return Fr[e] = n[t];
        return e;
    }
    var hu = Sr("animationend"), vu = Sr("animationiteration"), yu = Sr("animationstart"), gu = Sr("transitionend"), wu = new Map, ti = new Map, qs = [
        "abort",
        "abort",
        hu,
        "animationEnd",
        vu,
        "animationIteration",
        yu,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        gu,
        "transitionEnd",
        "waiting",
        "waiting"
    ];
    function ri(e, n) {
        for(var t = 0; t < e.length; t += 2){
            var r = e[t], l = e[t + 1];
            l = "on" + (l[0].toUpperCase() + l.slice(1)), ti.set(r, n), wu.set(r, l), Je(l, [
                r
            ]);
        }
    }
    var bs = U.unstable_now;
    bs();
    var L = 8;
    function rn(e) {
        if ((1 & e) !== 0) return L = 15, 1;
        if ((2 & e) !== 0) return L = 14, 2;
        if ((4 & e) !== 0) return L = 13, 4;
        var n = 24 & e;
        return n !== 0 ? (L = 12, n) : (e & 32) !== 0 ? (L = 11, 32) : (n = 192 & e, n !== 0 ? (L = 10, n) : (e & 256) !== 0 ? (L = 9, 256) : (n = 3584 & e, n !== 0 ? (L = 8, n) : (e & 4096) !== 0 ? (L = 7, 4096) : (n = 4186112 & e, n !== 0 ? (L = 6, n) : (n = 62914560 & e, n !== 0 ? (L = 5, n) : e & 67108864 ? (L = 4, 67108864) : (e & 134217728) !== 0 ? (L = 3, 134217728) : (n = 805306368 & e, n !== 0 ? (L = 2, n) : (1073741824 & e) !== 0 ? (L = 1, 1073741824) : (L = 8, e))))));
    }
    function ea(e) {
        switch(e){
            case 99:
                return 15;
            case 98:
                return 10;
            case 97:
            case 96:
                return 8;
            case 95:
                return 2;
            default:
                return 0;
        }
    }
    function na(e) {
        switch(e){
            case 15:
            case 14:
                return 99;
            case 13:
            case 12:
            case 11:
            case 10:
                return 98;
            case 9:
            case 8:
            case 7:
            case 6:
            case 4:
            case 5:
                return 97;
            case 3:
            case 2:
            case 1:
                return 95;
            case 0:
                return 90;
            default:
                throw Error(v(358, e));
        }
    }
    function ct(e, n) {
        var t = e.pendingLanes;
        if (t === 0) return L = 0;
        var r = 0, l = 0, i = e.expiredLanes, o = e.suspendedLanes, u = e.pingedLanes;
        if (i !== 0) r = i, l = L = 15;
        else if (i = t & 134217727, i !== 0) {
            var s = i & ~o;
            s !== 0 ? (r = rn(s), l = L) : (u &= i, u !== 0 && (r = rn(u), l = L));
        } else i = t & ~o, i !== 0 ? (r = rn(i), l = L) : u !== 0 && (r = rn(u), l = L);
        if (r === 0) return 0;
        if (r = 31 - Ie2(r), r = t & ((0 > r ? 0 : 1 << r) << 1) - 1, n !== 0 && n !== r && (n & o) === 0) {
            if (rn(n), l <= L) return n;
            L = l;
        }
        if (n = e.entangledLanes, n !== 0) for(e = e.entanglements, n &= r; 0 < n;)t = 31 - Ie2(n), l = 1 << t, r |= e[t], n &= ~l;
        return r;
    }
    function Su(e) {
        return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function qt(e, n) {
        switch(e){
            case 15:
                return 1;
            case 14:
                return 2;
            case 12:
                return e = ln(24 & ~n), e === 0 ? qt(10, n) : e;
            case 10:
                return e = ln(192 & ~n), e === 0 ? qt(8, n) : e;
            case 8:
                return e = ln(3584 & ~n), e === 0 && (e = ln(4186112 & ~n), e === 0 && (e = 512)), e;
            case 2:
                return n = ln(805306368 & ~n), n === 0 && (n = 268435456), n;
        }
        throw Error(v(358, e));
    }
    function ln(e) {
        return e & -e;
    }
    function jr(e) {
        for(var n = [], t = 0; 31 > t; t++)n.push(e);
        return n;
    }
    function Er(e, n, t) {
        e.pendingLanes |= n;
        var r = n - 1;
        e.suspendedLanes &= r, e.pingedLanes &= r, e = e.eventTimes, n = 31 - Ie2(n), e[n] = t;
    }
    var Ie2 = Math.clz32 ? Math.clz32 : la, ta = Math.log, ra = Math.LN2;
    function la(e) {
        return e === 0 ? 32 : 31 - (ta(e) / ra | 0) | 0;
    }
    var ia = U.unstable_UserBlockingPriority, oa = U.unstable_runWithPriority, Vt = !0;
    function ua(e, n, t, r) {
        Ae1 || bl();
        var l = li, i = Ae1;
        Ae1 = !0;
        try {
            ou(l, e, n, t, r);
        } finally{
            (Ae1 = i) || ei();
        }
    }
    function sa(e, n, t, r) {
        oa(ia, li.bind(null, e, n, t, r));
    }
    function li(e, n, t, r) {
        if (Vt) {
            var l;
            if ((l = (n & 4) === 0) && 0 < se.length && -1 < Yi.indexOf(e)) e = hl(null, e, n, t, r), se.push(e);
            else {
                var i = ii(e, n, t, r);
                if (i === null) l && Xi(e, r);
                else {
                    if (l) {
                        if (-1 < Yi.indexOf(e)) {
                            e = hl(i, e, n, t, r), se.push(e);
                            return;
                        }
                        if (Gs(i, e, n, t, r)) return;
                        Xi(e, r);
                    }
                    Ru(e, n, r, null, t);
                }
            }
        }
    }
    function ii(e, n, t, r) {
        var l = Jl(r);
        if (l = $e1(l), l !== null) {
            var i = be1(l);
            if (i === null) l = null;
            else {
                var o = i.tag;
                if (o === 13) {
                    if (l = su(i), l !== null) return l;
                    l = null;
                } else if (o === 3) {
                    if (i.stateNode.hydrate) return i.tag === 3 ? i.stateNode.containerInfo : null;
                    l = null;
                } else i !== l && (l = null);
            }
        }
        return Ru(e, n, r, l, t), null;
    }
    var xe2 = null, oi = null, Bt = null;
    function Eu() {
        if (Bt) return Bt;
        var e, n = oi, t = n.length, r, l = "value" in xe2 ? xe2.value : xe2.textContent, i = l.length;
        for(e = 0; e < t && n[e] === l[e]; e++);
        var o = t - e;
        for(r = 1; r <= o && n[t - r] === l[i - r]; r++);
        return Bt = l.slice(e, 1 < r ? 1 - r : void 0);
    }
    function Ht(e) {
        var n = e.keyCode;
        return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Lt() {
        return !0;
    }
    function Gi() {
        return !1;
    }
    function b(e) {
        function n(t, r, l, i, o) {
            this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
            for(var u in e)e.hasOwnProperty(u) && (t = e[u], this[u] = t ? t(i) : i[u]);
            return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Lt : Gi, this.isPropagationStopped = Gi, this;
        }
        return M(n.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var t = this.nativeEvent;
                t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = Lt);
            },
            stopPropagation: function() {
                var t = this.nativeEvent;
                t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = Lt);
            },
            persist: function() {},
            isPersistent: Lt
        }), n;
    }
    var Nn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, ui = b(Nn), St = M({}, Nn, {
        view: 0,
        detail: 0
    }), aa = b(St), Ur, Vr, In, kr = M({}, St, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: si,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== In && (In && e.type === "mousemove" ? (Ur = e.screenX - In.screenX, Vr = e.screenY - In.screenY) : Vr = Ur = 0, In = e), Ur);
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Vr;
        }
    }), Zi = b(kr), fa = M({}, kr, {
        dataTransfer: 0
    }), ca = b(fa), da = M({}, St, {
        relatedTarget: 0
    }), Br = b(da), pa = M({}, Nn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), ma = b(pa), ha = M({}, Nn, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        }
    }), va = b(ha), ya = M({}, Nn, {
        data: 0
    }), Ji = b(ya), ga = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, wa = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, Sa = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function Ea(e) {
        var n = this.nativeEvent;
        return n.getModifierState ? n.getModifierState(e) : (e = Sa[e]) ? !!n[e] : !1;
    }
    function si() {
        return Ea;
    }
    var ka = M({}, St, {
        key: function(e) {
            if (e.key) {
                var n = ga[e.key] || e.key;
                if (n !== "Unidentified") return n;
            }
            return e.type === "keypress" ? (e = Ht(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wa[e.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: si,
        charCode: function(e) {
            return e.type === "keypress" ? Ht(e) : 0;
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function(e) {
            return e.type === "keypress" ? Ht(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        }
    }), xa = b(ka), Ca = M({}, kr, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }), qi = b(Ca), _a = M({}, St, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: si
    }), Na = b(_a), Pa = M({}, Nn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), Ta = b(Pa), La = M({}, kr, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
    }), za = b(La), Oa = [
        9,
        13,
        27,
        32
    ], ai = we2 && "CompositionEvent" in window, qn = null;
    we2 && "documentMode" in document && (qn = document.documentMode);
    var Ma = we2 && "TextEvent" in window && !qn, ku = we2 && (!ai || qn && 8 < qn && 11 >= qn), bi = String.fromCharCode(32), eo = !1;
    function xu(e, n) {
        switch(e){
            case "keyup":
                return Oa.indexOf(n.keyCode) !== -1;
            case "keydown":
                return n.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1;
        }
    }
    function Cu(e) {
        return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var un = !1;
    function Ra(e, n) {
        switch(e){
            case "compositionend":
                return Cu(n);
            case "keypress":
                return n.which !== 32 ? null : (eo = !0, bi);
            case "textInput":
                return e = n.data, e === bi && eo ? null : e;
            default:
                return null;
        }
    }
    function Da(e, n) {
        if (un) return e === "compositionend" || !ai && xu(e, n) ? (e = Eu(), Bt = oi = xe2 = null, un = !1, e) : null;
        switch(e){
            case "paste":
                return null;
            case "keypress":
                if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
                    if (n.char && 1 < n.char.length) return n.char;
                    if (n.which) return String.fromCharCode(n.which);
                }
                return null;
            case "compositionend":
                return ku && n.locale !== "ko" ? null : n.data;
            default:
                return null;
        }
    }
    var Ia = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function no(e) {
        var n = e && e.nodeName && e.nodeName.toLowerCase();
        return n === "input" ? !!Ia[e.type] : n === "textarea";
    }
    function _u(e, n, t, r) {
        lu(r), n = bt(n, "onChange"), 0 < n.length && (t = new ui("onChange", "change", null, t, r), e.push({
            event: t,
            listeners: n
        }));
    }
    var bn = null, dt = null;
    function Fa(e) {
        zu(e, 0);
    }
    function xr(e) {
        var n = an(e);
        if (Jo(n)) return e;
    }
    function ja(e, n) {
        if (e === "change") return n;
    }
    var Nu = !1;
    we2 && (we2 ? (Ot = "oninput" in document, Ot || (Hr = document.createElement("div"), Hr.setAttribute("oninput", "return;"), Ot = typeof Hr.oninput == "function"), zt = Ot) : zt = !1, Nu = zt && (!document.documentMode || 9 < document.documentMode));
    var zt, Ot, Hr;
    function to() {
        bn && (bn.detachEvent("onpropertychange", Pu), dt = bn = null);
    }
    function Pu(e) {
        if (e.propertyName === "value" && xr(dt)) {
            var n = [];
            if (_u(n, dt, e, Jl(e)), e = Fa, Ae1) e(n);
            else {
                Ae1 = !0;
                try {
                    ql(e, n);
                } finally{
                    Ae1 = !1, ei();
                }
            }
        }
    }
    function Ua(e, n, t) {
        e === "focusin" ? (to(), bn = n, dt = t, bn.attachEvent("onpropertychange", Pu)) : e === "focusout" && to();
    }
    function Va(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown") return xr(dt);
    }
    function Ba(e, n) {
        if (e === "click") return xr(n);
    }
    function Ha(e, n) {
        if (e === "input" || e === "change") return xr(n);
    }
    function Wa(e, n) {
        return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
    }
    var ee2 = typeof Object.is == "function" ? Object.is : Wa, Aa = Object.prototype.hasOwnProperty;
    function pt(e, n) {
        if (ee2(e, n)) return !0;
        if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
        var t = Object.keys(e), r = Object.keys(n);
        if (t.length !== r.length) return !1;
        for(r = 0; r < t.length; r++)if (!Aa.call(n, t[r]) || !ee2(e[t[r]], n[t[r]])) return !1;
        return !0;
    }
    function ro(e) {
        for(; e && e.firstChild;)e = e.firstChild;
        return e;
    }
    function lo(e, n) {
        var t = ro(e);
        e = 0;
        for(var r; t;){
            if (t.nodeType === 3) {
                if (r = e + t.textContent.length, e <= n && r >= n) return {
                    node: t,
                    offset: n - e
                };
                e = r;
            }
            e: {
                for(; t;){
                    if (t.nextSibling) {
                        t = t.nextSibling;
                        break e;
                    }
                    t = t.parentNode;
                }
                t = void 0;
            }
            t = ro(t);
        }
    }
    function Tu(e, n) {
        return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Tu(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
    }
    function io() {
        for(var e = window, n = Gt(); n instanceof e.HTMLIFrameElement;){
            try {
                var t = typeof n.contentWindow.location.href == "string";
            } catch  {
                t = !1;
            }
            if (t) e = n.contentWindow;
            else break;
            n = Gt(e.document);
        }
        return n;
    }
    function vl(e) {
        var n = e && e.nodeName && e.nodeName.toLowerCase();
        return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
    }
    var $a = we2 && "documentMode" in document && 11 >= document.documentMode, sn = null, yl = null, et = null, gl = !1;
    function oo(e, n, t) {
        var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
        gl || sn == null || sn !== Gt(r) || (r = sn, "selectionStart" in r && vl(r) ? r = {
            start: r.selectionStart,
            end: r.selectionEnd
        } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset
        }), et && pt(et, r) || (et = r, r = bt(yl, "onSelect"), 0 < r.length && (n = new ui("onSelect", "select", null, n, t), e.push({
            event: n,
            listeners: r
        }), n.target = sn)));
    }
    ri("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
    ri("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
    ri(qs, 2);
    for(Wr = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Mt = 0; Mt < Wr.length; Mt++)ti.set(Wr[Mt], 0);
    var Wr, Mt;
    kn("onMouseEnter", [
        "mouseout",
        "mouseover"
    ]);
    kn("onMouseLeave", [
        "mouseout",
        "mouseover"
    ]);
    kn("onPointerEnter", [
        "pointerout",
        "pointerover"
    ]);
    kn("onPointerLeave", [
        "pointerout",
        "pointerover"
    ]);
    Je("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    Je("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    Je("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
    ]);
    Je("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    Je("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    Je("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Qn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lu = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qn));
    function uo(e, n, t) {
        var r = e.type || "unknown-event";
        e.currentTarget = t, Xs(r, n, void 0, e), e.currentTarget = null;
    }
    function zu(e, n) {
        n = (n & 4) !== 0;
        for(var t = 0; t < e.length; t++){
            var r = e[t], l = r.event;
            r = r.listeners;
            e: {
                var i = void 0;
                if (n) for(var o = r.length - 1; 0 <= o; o--){
                    var u = r[o], s = u.instance, d = u.currentTarget;
                    if (u = u.listener, s !== i && l.isPropagationStopped()) break e;
                    uo(l, u, d), i = s;
                }
                else for(o = 0; o < r.length; o++){
                    if (u = r[o], s = u.instance, d = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped()) break e;
                    uo(l, u, d), i = s;
                }
            }
        }
        if (Jt) throw e = pl, Jt = !1, pl = null, e;
    }
    function z2(e, n) {
        var t = Iu(n), r = e + "__bubble";
        t.has(r) || (Mu(n, e, 2, !1), t.add(r));
    }
    var so = "_reactListening" + Math.random().toString(36).slice(2);
    function Ou(e) {
        e[so] || (e[so] = !0, Ko.forEach(function(n) {
            Lu.has(n) || ao(n, !1, e, null), ao(n, !0, e, null);
        }));
    }
    function ao(e, n, t, r) {
        var l = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, i = t;
        if (e === "selectionchange" && t.nodeType !== 9 && (i = t.ownerDocument), r !== null && !n && Lu.has(e)) {
            if (e !== "scroll") return;
            l |= 2, i = r;
        }
        var o = Iu(i), u = e + "__" + (n ? "capture" : "bubble");
        o.has(u) || (n && (l |= 4), Mu(i, e, l, n), o.add(u));
    }
    function Mu(e, n, t, r) {
        var l = ti.get(n);
        switch(l === void 0 ? 2 : l){
            case 0:
                l = ua;
                break;
            case 1:
                l = sa;
                break;
            default:
                l = li;
        }
        t = l.bind(null, n, t, e), l = void 0, !dl || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, {
            capture: !0,
            passive: l
        }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, {
            passive: l
        }) : e.addEventListener(n, t, !1);
    }
    function Ru(e, n, t, r, l) {
        var i = r;
        if ((n & 1) === 0 && (n & 2) === 0 && r !== null) e: for(;;){
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || u.nodeType === 8 && u.parentNode === l) break;
                if (o === 4) for(o = r.return; o !== null;){
                    var s = o.tag;
                    if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
                    o = o.return;
                }
                for(; u !== null;){
                    if (o = $e1(u), o === null) return;
                    if (s = o.tag, s === 5 || s === 6) {
                        r = i = o;
                        continue e;
                    }
                    u = u.parentNode;
                }
            }
            r = r.return;
        }
        As(function() {
            var d = i, y = Jl(t), C2 = [];
            e: {
                var h2 = wu.get(e);
                if (h2 !== void 0) {
                    var S = ui, k = e;
                    switch(e){
                        case "keypress":
                            if (Ht(t) === 0) break e;
                        case "keydown":
                        case "keyup":
                            S = xa;
                            break;
                        case "focusin":
                            k = "focus", S = Br;
                            break;
                        case "focusout":
                            k = "blur", S = Br;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            S = Br;
                            break;
                        case "click":
                            if (t.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            S = Zi;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            S = ca;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            S = Na;
                            break;
                        case hu:
                        case vu:
                        case yu:
                            S = ma;
                            break;
                        case gu:
                            S = Ta;
                            break;
                        case "scroll":
                            S = aa;
                            break;
                        case "wheel":
                            S = za;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            S = va;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            S = qi;
                    }
                    var E = (n & 4) !== 0, c = !E && e === "scroll", a = E ? h2 !== null ? h2 + "Capture" : null : h2;
                    E = [];
                    for(var f = d, p; f !== null;){
                        p = f;
                        var m = p.stateNode;
                        if (p.tag === 5 && m !== null && (p = m, a !== null && (m = st(f, a), m != null && E.push(mt(f, m, p)))), c) break;
                        f = f.return;
                    }
                    0 < E.length && (h2 = new S(h2, k, null, t, y), C2.push({
                        event: h2,
                        listeners: E
                    }));
                }
            }
            if ((n & 7) === 0) {
                e: {
                    if (h2 = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", h2 && (n & 16) === 0 && (k = t.relatedTarget || t.fromElement) && ($e1(k) || k[Pn])) break e;
                    if ((S || h2) && (h2 = y.window === y ? y : (h2 = y.ownerDocument) ? h2.defaultView || h2.parentWindow : window, S ? (k = t.relatedTarget || t.toElement, S = d, k = k ? $e1(k) : null, k !== null && (c = be1(k), k !== c || k.tag !== 5 && k.tag !== 6) && (k = null)) : (S = null, k = d), S !== k)) {
                        if (E = Zi, m = "onMouseLeave", a = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (E = qi, m = "onPointerLeave", a = "onPointerEnter", f = "pointer"), c = S == null ? h2 : an(S), p = k == null ? h2 : an(k), h2 = new E(m, f + "leave", S, t, y), h2.target = c, h2.relatedTarget = p, m = null, $e1(y) === d && (E = new E(a, f + "enter", k, t, y), E.target = p, E.relatedTarget = c, m = E), c = m, S && k) n: {
                            for(E = S, a = k, f = 0, p = E; p; p = tn(p))f++;
                            for(p = 0, m = a; m; m = tn(m))p++;
                            for(; 0 < f - p;)E = tn(E), f--;
                            for(; 0 < p - f;)a = tn(a), p--;
                            for(; f--;){
                                if (E === a || a !== null && E === a.alternate) break n;
                                E = tn(E), a = tn(a);
                            }
                            E = null;
                        }
                        else E = null;
                        S !== null && fo(C2, h2, S, E, !1), k !== null && c !== null && fo(C2, c, k, E, !0);
                    }
                }
                e: {
                    if (h2 = d ? an(d) : window, S = h2.nodeName && h2.nodeName.toLowerCase(), S === "select" || S === "input" && h2.type === "file") var _ = ja;
                    else if (no(h2)) if (Nu) _ = Ha;
                    else {
                        _ = Va;
                        var w = Ua;
                    }
                    else (S = h2.nodeName) && S.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (_ = Ba);
                    if (_ && (_ = _(e, d))) {
                        _u(C2, _, t, y);
                        break e;
                    }
                    w && w(e, h2, d), e === "focusout" && (w = h2._wrapperState) && w.controlled && h2.type === "number" && ll(h2, "number", h2.value);
                }
                switch(w = d ? an(d) : window, e){
                    case "focusin":
                        (no(w) || w.contentEditable === "true") && (sn = w, yl = d, et = null);
                        break;
                    case "focusout":
                        et = yl = sn = null;
                        break;
                    case "mousedown":
                        gl = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        gl = !1, oo(C2, t, y);
                        break;
                    case "selectionchange":
                        if ($a) break;
                    case "keydown":
                    case "keyup":
                        oo(C2, t, y);
                }
                var N;
                if (ai) e: {
                    switch(e){
                        case "compositionstart":
                            var T = "onCompositionStart";
                            break e;
                        case "compositionend":
                            T = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            T = "onCompositionUpdate";
                            break e;
                    }
                    T = void 0;
                }
                else un ? xu(e, t) && (T = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (T = "onCompositionStart");
                T && (ku && t.locale !== "ko" && (un || T !== "onCompositionStart" ? T === "onCompositionEnd" && un && (N = Eu()) : (xe2 = y, oi = "value" in xe2 ? xe2.value : xe2.textContent, un = !0)), w = bt(d, T), 0 < w.length && (T = new Ji(T, e, null, t, y), C2.push({
                    event: T,
                    listeners: w
                }), N ? T.data = N : (N = Cu(t), N !== null && (T.data = N)))), (N = Ma ? Ra(e, t) : Da(e, t)) && (d = bt(d, "onBeforeInput"), 0 < d.length && (y = new Ji("onBeforeInput", "beforeinput", null, t, y), C2.push({
                    event: y,
                    listeners: d
                }), y.data = N));
            }
            zu(C2, n);
        });
    }
    function mt(e, n, t) {
        return {
            instance: e,
            listener: n,
            currentTarget: t
        };
    }
    function bt(e, n) {
        for(var t = n + "Capture", r = []; e !== null;){
            var l = e, i = l.stateNode;
            l.tag === 5 && i !== null && (l = i, i = st(e, t), i != null && r.unshift(mt(e, i, l)), i = st(e, n), i != null && r.push(mt(e, i, l))), e = e.return;
        }
        return r;
    }
    function tn(e) {
        if (e === null) return null;
        do e = e.return;
        while (e && e.tag !== 5)
        return e || null;
    }
    function fo(e, n, t, r, l) {
        for(var i = n._reactName, o = []; t !== null && t !== r;){
            var u = t, s = u.alternate, d = u.stateNode;
            if (s !== null && s === r) break;
            u.tag === 5 && d !== null && (u = d, l ? (s = st(t, i), s != null && o.unshift(mt(t, s, u))) : l || (s = st(t, i), s != null && o.push(mt(t, s, u)))), t = t.return;
        }
        o.length !== 0 && e.push({
            event: n,
            listeners: o
        });
    }
    function er() {}
    var Ar = null, $r = null;
    function Du(e, n) {
        switch(e){
            case "button":
            case "input":
            case "select":
            case "textarea":
                return !!n.autoFocus;
        }
        return !1;
    }
    function wl(e, n) {
        return e === "textarea" || e === "option" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    var co = typeof setTimeout == "function" ? setTimeout : void 0, Qa = typeof clearTimeout == "function" ? clearTimeout : void 0;
    function fi(e) {
        e.nodeType === 1 ? e.textContent = "" : e.nodeType === 9 && (e = e.body, e != null && (e.textContent = ""));
    }
    function vn(e) {
        for(; e != null; e = e.nextSibling){
            var n = e.nodeType;
            if (n === 1 || n === 3) break;
        }
        return e;
    }
    function po(e) {
        e = e.previousSibling;
        for(var n = 0; e;){
            if (e.nodeType === 8) {
                var t = e.data;
                if (t === "$" || t === "$!" || t === "$?") {
                    if (n === 0) return e;
                    n--;
                } else t === "/$" && n++;
            }
            e = e.previousSibling;
        }
        return null;
    }
    var Qr = 0;
    function Ya(e) {
        return {
            $$typeof: Gl,
            toString: e,
            valueOf: e
        };
    }
    var Cr = Math.random().toString(36).slice(2), Ce2 = "__reactFiber$" + Cr, nr = "__reactProps$" + Cr, Pn = "__reactContainer$" + Cr, mo = "__reactEvents$" + Cr;
    function $e1(e) {
        var n = e[Ce2];
        if (n) return n;
        for(var t = e.parentNode; t;){
            if (n = t[Pn] || t[Ce2]) {
                if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for(e = po(e); e !== null;){
                    if (t = e[Ce2]) return t;
                    e = po(e);
                }
                return n;
            }
            e = t, t = e.parentNode;
        }
        return null;
    }
    function Et(e) {
        return e = e[Ce2] || e[Pn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function an(e) {
        if (e.tag === 5 || e.tag === 6) return e.stateNode;
        throw Error(v(33));
    }
    function _r(e) {
        return e[nr] || null;
    }
    function Iu(e) {
        var n = e[mo];
        return n === void 0 && (n = e[mo] = new Set), n;
    }
    var Sl = [], fn = -1;
    function Ve(e) {
        return {
            current: e
        };
    }
    function O2(e) {
        0 > fn || (e.current = Sl[fn], Sl[fn] = null, fn--);
    }
    function D2(e, n) {
        fn++, Sl[fn] = e.current, e.current = n;
    }
    var Fe1 = {}, Q2 = Ve(Fe1), Z2 = Ve(!1), Ke = Fe1;
    function xn(e, n) {
        var t = e.type.contextTypes;
        if (!t) return Fe1;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
        var l = {}, i;
        for(i in t)l[i] = n[i];
        return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
    }
    function J2(e) {
        return e = e.childContextTypes, e != null;
    }
    function tr() {
        O2(Z2), O2(Q2);
    }
    function ho(e, n, t) {
        if (Q2.current !== Fe1) throw Error(v(168));
        D2(Q2, n), D2(Z2, t);
    }
    function Fu(e, n, t) {
        var r = e.stateNode;
        if (e = n.childContextTypes, typeof r.getChildContext != "function") return t;
        r = r.getChildContext();
        for(var l in r)if (!(l in e)) throw Error(v(108, dn(n) || "Unknown", l));
        return M({}, t, r);
    }
    function Wt(e) {
        return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Fe1, Ke = Q2.current, D2(Q2, e), D2(Z2, Z2.current), !0;
    }
    function vo(e, n, t) {
        var r = e.stateNode;
        if (!r) throw Error(v(169));
        t ? (e = Fu(e, n, Ke), r.__reactInternalMemoizedMergedChildContext = e, O2(Z2), O2(Q2), D2(Q2, e)) : O2(Z2), D2(Z2, t);
    }
    var ci = null, Xe = null, Xa = U.unstable_runWithPriority, di = U.unstable_scheduleCallback, El = U.unstable_cancelCallback, Ka = U.unstable_shouldYield, yo = U.unstable_requestPaint, kl = U.unstable_now, Ga = U.unstable_getCurrentPriorityLevel, Nr = U.unstable_ImmediatePriority, ju = U.unstable_UserBlockingPriority, Uu = U.unstable_NormalPriority, Vu = U.unstable_LowPriority, Bu = U.unstable_IdlePriority, Yr = {}, Za = yo !== void 0 ? yo : function() {}, me2 = null, At = null, Xr = !1, go = kl(), A = 10000 > go ? kl : function() {
        return kl() - go;
    };
    function Cn() {
        switch(Ga()){
            case Nr:
                return 99;
            case ju:
                return 98;
            case Uu:
                return 97;
            case Vu:
                return 96;
            case Bu:
                return 95;
            default:
                throw Error(v(332));
        }
    }
    function Hu(e) {
        switch(e){
            case 99:
                return Nr;
            case 98:
                return ju;
            case 97:
                return Uu;
            case 96:
                return Vu;
            case 95:
                return Bu;
            default:
                throw Error(v(332));
        }
    }
    function Ge(e, n) {
        return e = Hu(e), Xa(e, n);
    }
    function ht(e, n, t) {
        return e = Hu(e), di(e, n, t);
    }
    function pe2() {
        if (At !== null) {
            var e = At;
            At = null, El(e);
        }
        Wu();
    }
    function Wu() {
        if (!Xr && me2 !== null) {
            Xr = !0;
            var e = 0;
            try {
                var n = me2;
                Ge(99, function() {
                    for(; e < n.length; e++){
                        var t = n[e];
                        do t = t(!0);
                        while (t !== null)
                    }
                }), me2 = null;
            } catch (t) {
                throw me2 !== null && (me2 = me2.slice(e + 1)), di(Nr, pe2), t;
            } finally{
                Xr = !1;
            }
        }
    }
    var Ja = qe1.ReactCurrentBatchConfig;
    function oe(e, n) {
        if (e && e.defaultProps) {
            n = M({}, n), e = e.defaultProps;
            for(var t in e)n[t] === void 0 && (n[t] = e[t]);
            return n;
        }
        return n;
    }
    var rr = Ve(null), lr = null, cn = null, ir = null;
    function pi() {
        ir = cn = lr = null;
    }
    function mi(e) {
        var n = rr.current;
        O2(rr), e.type._context._currentValue = n;
    }
    function Au(e, n) {
        for(; e !== null;){
            var t = e.alternate;
            if ((e.childLanes & n) === n) {
                if (t === null || (t.childLanes & n) === n) break;
                t.childLanes |= n;
            } else e.childLanes |= n, t !== null && (t.childLanes |= n);
            e = e.return;
        }
    }
    function yn(e, n) {
        lr = e, ir = cn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & n) !== 0 && (ue2 = !0), e.firstContext = null);
    }
    function re2(e, n) {
        if (ir !== e && n !== !1 && n !== 0) if ((typeof n != "number" || n === 1073741823) && (ir = e, n = 1073741823), n = {
            context: e,
            observedBits: n,
            next: null
        }, cn === null) {
            if (lr === null) throw Error(v(308));
            cn = n, lr.dependencies = {
                lanes: 0,
                firstContext: n,
                responders: null
            };
        } else cn = cn.next = n;
        return e._currentValue;
    }
    var Ee1 = !1;
    function hi(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null
            },
            effects: null
        };
    }
    function $u(e, n) {
        e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects
        });
    }
    function Le2(e, n) {
        return {
            eventTime: e,
            lane: n,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        };
    }
    function ze(e, n) {
        if (e = e.updateQueue, e !== null) {
            e = e.shared;
            var t = e.pending;
            t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
        }
    }
    function wo(e, n) {
        var t = e.updateQueue, r = e.alternate;
        if (r !== null && (r = r.updateQueue, t === r)) {
            var l = null, i = null;
            if (t = t.firstBaseUpdate, t !== null) {
                do {
                    var o = {
                        eventTime: t.eventTime,
                        lane: t.lane,
                        tag: t.tag,
                        payload: t.payload,
                        callback: t.callback,
                        next: null
                    };
                    i === null ? l = i = o : i = i.next = o, t = t.next;
                }while (t !== null)
                i === null ? l = i = n : i = i.next = n;
            } else l = i = n;
            t = {
                baseState: r.baseState,
                firstBaseUpdate: l,
                lastBaseUpdate: i,
                shared: r.shared,
                effects: r.effects
            }, e.updateQueue = t;
            return;
        }
        e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
    }
    function vt(e, n, t, r) {
        var l = e.updateQueue;
        Ee1 = !1;
        var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
        if (u !== null) {
            l.shared.pending = null;
            var s = u, d = s.next;
            s.next = null, o === null ? i = d : o.next = d, o = s;
            var y = e.alternate;
            if (y !== null) {
                y = y.updateQueue;
                var C3 = y.lastBaseUpdate;
                C3 !== o && (C3 === null ? y.firstBaseUpdate = d : C3.next = d, y.lastBaseUpdate = s);
            }
        }
        if (i !== null) {
            C3 = l.baseState, o = 0, y = d = s = null;
            do {
                u = i.lane;
                var h3 = i.eventTime;
                if ((r & u) === u) {
                    y !== null && (y = y.next = {
                        eventTime: h3,
                        lane: 0,
                        tag: i.tag,
                        payload: i.payload,
                        callback: i.callback,
                        next: null
                    });
                    e: {
                        var S = e, k = i;
                        switch(u = n, h3 = t, k.tag){
                            case 1:
                                if (S = k.payload, typeof S == "function") {
                                    C3 = S.call(h3, C3, u);
                                    break e;
                                }
                                C3 = S;
                                break e;
                            case 3:
                                S.flags = S.flags & -4097 | 64;
                            case 0:
                                if (S = k.payload, u = typeof S == "function" ? S.call(h3, C3, u) : S, u == null) break e;
                                C3 = M({}, C3, u);
                                break e;
                            case 2:
                                Ee1 = !0;
                        }
                    }
                    i.callback !== null && (e.flags |= 32, u = l.effects, u === null ? l.effects = [
                        i
                    ] : u.push(i));
                } else h3 = {
                    eventTime: h3,
                    lane: u,
                    tag: i.tag,
                    payload: i.payload,
                    callback: i.callback,
                    next: null
                }, y === null ? (d = y = h3, s = C3) : y = y.next = h3, o |= u;
                if (i = i.next, i === null) {
                    if (u = l.shared.pending, u === null) break;
                    i = u.next, u.next = null, l.lastBaseUpdate = u, l.shared.pending = null;
                }
            }while (1)
            y === null && (s = C3), l.baseState = s, l.firstBaseUpdate = d, l.lastBaseUpdate = y, xt |= o, e.lanes = o, e.memoizedState = C3;
        }
    }
    function So(e, n, t) {
        if (e = n.effects, n.effects = null, e !== null) for(n = 0; n < e.length; n++){
            var r = e[n], l = r.callback;
            if (l !== null) {
                if (r.callback = null, r = t, typeof l != "function") throw Error(v(191, l));
                l.call(r);
            }
        }
    }
    var Qu = new yr.Component().refs;
    function or1(e, n, t, r) {
        n = e.memoizedState, t = t(r, n), t = t == null ? n : M({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
    }
    var Pr = {
        isMounted: function(e) {
            return (e = e._reactInternals) ? be1(e) === e : !1;
        },
        enqueueSetState: function(e, n, t) {
            e = e._reactInternals;
            var r = q(), l = Oe1(e), i = Le2(r, l);
            i.payload = n, t != null && (i.callback = t), ze(e, i), Me2(e, l, r);
        },
        enqueueReplaceState: function(e, n, t) {
            e = e._reactInternals;
            var r = q(), l = Oe1(e), i = Le2(r, l);
            i.tag = 1, i.payload = n, t != null && (i.callback = t), ze(e, i), Me2(e, l, r);
        },
        enqueueForceUpdate: function(e, n) {
            e = e._reactInternals;
            var t = q(), r = Oe1(e), l = Le2(t, r);
            l.tag = 2, n != null && (l.callback = n), ze(e, l), Me2(e, r, t);
        }
    };
    function Eo(e, n, t, r, l, i, o) {
        return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : n.prototype && n.prototype.isPureReactComponent ? !pt(t, r) || !pt(l, i) : !0;
    }
    function Yu(e, n, t) {
        var r = !1, l = Fe1, i = n.contextType;
        return typeof i == "object" && i !== null ? i = re2(i) : (l = J2(n) ? Ke : Q2.current, r = n.contextTypes, i = (r = r != null) ? xn(e, l) : Fe1), n = new n(t, i), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Pr, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), n;
    }
    function ko(e, n, t, r) {
        e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && Pr.enqueueReplaceState(n, n.state, null);
    }
    function xl(e, n, t, r) {
        var l = e.stateNode;
        l.props = t, l.state = e.memoizedState, l.refs = Qu, hi(e);
        var i = n.contextType;
        typeof i == "object" && i !== null ? l.context = re2(i) : (i = J2(n) ? Ke : Q2.current, l.context = xn(e, i)), vt(e, t, l, r), l.state = e.memoizedState, i = n.getDerivedStateFromProps, typeof i == "function" && (or1(e, n, i, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && Pr.enqueueReplaceState(l, l.state, null), vt(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4);
    }
    var Rt = Array.isArray;
    function Fn(e, n, t) {
        if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
            if (t._owner) {
                if (t = t._owner, t) {
                    if (t.tag !== 1) throw Error(v(309));
                    var r = t.stateNode;
                }
                if (!r) throw Error(v(147, e));
                var l = "" + e;
                return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === l ? n.ref : (n = function(i) {
                    var o = r.refs;
                    o === Qu && (o = r.refs = {}), i === null ? delete o[l] : o[l] = i;
                }, n._stringRef = l, n);
            }
            if (typeof e != "string") throw Error(v(284));
            if (!t._owner) throw Error(v(290, e));
        }
        return e;
    }
    function Dt(e, n) {
        if (e.type !== "textarea") throw Error(v(31, Object.prototype.toString.call(n) === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : n));
    }
    function Xu(e) {
        function n(c, a) {
            if (e) {
                var f = c.lastEffect;
                f !== null ? (f.nextEffect = a, c.lastEffect = a) : c.firstEffect = c.lastEffect = a, a.nextEffect = null, a.flags = 8;
            }
        }
        function t(c, a) {
            if (!e) return null;
            for(; a !== null;)n(c, a), a = a.sibling;
            return null;
        }
        function r(c, a) {
            for(c = new Map; a !== null;)a.key !== null ? c.set(a.key, a) : c.set(a.index, a), a = a.sibling;
            return c;
        }
        function l(c, a) {
            return c = Ue1(c, a), c.index = 0, c.sibling = null, c;
        }
        function i(c, a, f) {
            return c.index = f, e ? (f = c.alternate, f !== null ? (f = f.index, f < a ? (c.flags = 2, a) : f) : (c.flags = 2, a)) : a;
        }
        function o(c) {
            return e && c.alternate === null && (c.flags = 2), c;
        }
        function u(c, a, f, p) {
            return a === null || a.tag !== 6 ? (a = qr(f, c.mode, p), a.return = c, a) : (a = l(a, f), a.return = c, a);
        }
        function s(c, a, f, p) {
            return a !== null && a.elementType === f.type ? (p = l(a, f.props), p.ref = Fn(c, a, f), p.return = c, p) : (p = Xt(f.type, f.key, f.props, null, c.mode, p), p.ref = Fn(c, a, f), p.return = c, p);
        }
        function d(c, a, f, p) {
            return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = br(f, c.mode, p), a.return = c, a) : (a = l(a, f.children || []), a.return = c, a);
        }
        function y(c, a, f, p, m) {
            return a === null || a.tag !== 7 ? (a = En(f, c.mode, p, m), a.return = c, a) : (a = l(a, f), a.return = c, a);
        }
        function C4(c, a, f) {
            if (typeof a == "string" || typeof a == "number") return a = qr("" + a, c.mode, f), a.return = c, a;
            if (typeof a == "object" && a !== null) {
                switch(a.$$typeof){
                    case An:
                        return f = Xt(a.type, a.key, a.props, null, c.mode, f), f.ref = Fn(c, null, a), f.return = c, f;
                    case We:
                        return a = br(a, c.mode, f), a.return = c, a;
                }
                if (Rt(a) || On(a)) return a = En(a, c.mode, f, null), a.return = c, a;
                Dt(c, a);
            }
            return null;
        }
        function h4(c, a, f, p) {
            var m = a !== null ? a.key : null;
            if (typeof f == "string" || typeof f == "number") return m !== null ? null : u(c, a, "" + f, p);
            if (typeof f == "object" && f !== null) {
                switch(f.$$typeof){
                    case An:
                        return f.key === m ? f.type === ke2 ? y(c, a, f.props.children, p, m) : s(c, a, f, p) : null;
                    case We:
                        return f.key === m ? d(c, a, f, p) : null;
                }
                if (Rt(f) || On(f)) return m !== null ? null : y(c, a, f, p, null);
                Dt(c, f);
            }
            return null;
        }
        function S(c, a, f, p, m) {
            if (typeof p == "string" || typeof p == "number") return c = c.get(f) || null, u(a, c, "" + p, m);
            if (typeof p == "object" && p !== null) {
                switch(p.$$typeof){
                    case An:
                        return c = c.get(p.key === null ? f : p.key) || null, p.type === ke2 ? y(a, c, p.props.children, m, p.key) : s(a, c, p, m);
                    case We:
                        return c = c.get(p.key === null ? f : p.key) || null, d(a, c, p, m);
                }
                if (Rt(p) || On(p)) return c = c.get(f) || null, y(a, c, p, m, null);
                Dt(a, p);
            }
            return null;
        }
        function k(c, a, f, p) {
            for(var m = null, _ = null, w = a, N = a = 0, T = null; w !== null && N < f.length; N++){
                w.index > N ? (T = w, w = null) : T = w.sibling;
                var P2 = h4(c, w, f[N], p);
                if (P2 === null) {
                    w === null && (w = T);
                    break;
                }
                e && w && P2.alternate === null && n(c, w), a = i(P2, a, N), _ === null ? m = P2 : _.sibling = P2, _ = P2, w = T;
            }
            if (N === f.length) return t(c, w), m;
            if (w === null) {
                for(; N < f.length; N++)w = C4(c, f[N], p), w !== null && (a = i(w, a, N), _ === null ? m = w : _.sibling = w, _ = w);
                return m;
            }
            for(w = r(c, w); N < f.length; N++)T = S(w, c, N, f[N], p), T !== null && (e && T.alternate !== null && w.delete(T.key === null ? N : T.key), a = i(T, a, N), _ === null ? m = T : _.sibling = T, _ = T);
            return e && w.forEach(function(Se1) {
                return n(c, Se1);
            }), m;
        }
        function E(c, a, f, p) {
            var m = On(f);
            if (typeof m != "function") throw Error(v(150));
            if (f = m.call(f), f == null) throw Error(v(151));
            for(var _ = m = null, w = a, N = a = 0, T = null, P3 = f.next(); w !== null && !P3.done; N++, P3 = f.next()){
                w.index > N ? (T = w, w = null) : T = w.sibling;
                var Se2 = h4(c, w, P3.value, p);
                if (Se2 === null) {
                    w === null && (w = T);
                    break;
                }
                e && w && Se2.alternate === null && n(c, w), a = i(Se2, a, N), _ === null ? m = Se2 : _.sibling = Se2, _ = Se2, w = T;
            }
            if (P3.done) return t(c, w), m;
            if (w === null) {
                for(; !P3.done; N++, P3 = f.next())P3 = C4(c, P3.value, p), P3 !== null && (a = i(P3, a, N), _ === null ? m = P3 : _.sibling = P3, _ = P3);
                return m;
            }
            for(w = r(c, w); !P3.done; N++, P3 = f.next())P3 = S(w, c, N, P3.value, p), P3 !== null && (e && P3.alternate !== null && w.delete(P3.key === null ? N : P3.key), a = i(P3, a, N), _ === null ? m = P3 : _.sibling = P3, _ = P3);
            return e && w.forEach(function(Ns) {
                return n(c, Ns);
            }), m;
        }
        return function(c, a, f, p) {
            var m = typeof f == "object" && f !== null && f.type === ke2 && f.key === null;
            m && (f = f.props.children);
            var _ = typeof f == "object" && f !== null;
            if (_) switch(f.$$typeof){
                case An:
                    e: {
                        for(_ = f.key, m = a; m !== null;){
                            if (m.key === _) {
                                switch(m.tag){
                                    case 7:
                                        if (f.type === ke2) {
                                            t(c, m.sibling), a = l(m, f.props.children), a.return = c, c = a;
                                            break e;
                                        }
                                        break;
                                    default:
                                        if (m.elementType === f.type) {
                                            t(c, m.sibling), a = l(m, f.props), a.ref = Fn(c, m, f), a.return = c, c = a;
                                            break e;
                                        }
                                }
                                t(c, m);
                                break;
                            } else n(c, m);
                            m = m.sibling;
                        }
                        f.type === ke2 ? (a = En(f.props.children, c.mode, p, f.key), a.return = c, c = a) : (p = Xt(f.type, f.key, f.props, null, c.mode, p), p.ref = Fn(c, a, f), p.return = c, c = p);
                    }
                    return o(c);
                case We:
                    e: {
                        for(m = f.key; a !== null;){
                            if (a.key === m) if (a.tag === 4 && a.stateNode.containerInfo === f.containerInfo && a.stateNode.implementation === f.implementation) {
                                t(c, a.sibling), a = l(a, f.children || []), a.return = c, c = a;
                                break e;
                            } else {
                                t(c, a);
                                break;
                            }
                            else n(c, a);
                            a = a.sibling;
                        }
                        a = br(f, c.mode, p), a.return = c, c = a;
                    }
                    return o(c);
            }
            if (typeof f == "string" || typeof f == "number") return f = "" + f, a !== null && a.tag === 6 ? (t(c, a.sibling), a = l(a, f), a.return = c, c = a) : (t(c, a), a = qr(f, c.mode, p), a.return = c, c = a), o(c);
            if (Rt(f)) return k(c, a, f, p);
            if (On(f)) return E(c, a, f, p);
            if (_ && Dt(c, f), typeof f > "u" && !m) switch(c.tag){
                case 1:
                case 22:
                case 0:
                case 11:
                case 15:
                    throw Error(v(152, dn(c.type) || "Component"));
            }
            return t(c, a);
        };
    }
    var ur = Xu(!0), Ku = Xu(!1), kt = {}, ce = Ve(kt), yt = Ve(kt), gt = Ve(kt);
    function Qe(e) {
        if (e === kt) throw Error(v(174));
        return e;
    }
    function Cl(e, n) {
        switch(D2(gt, n), D2(yt, e), D2(ce, kt), e = n.nodeType, e){
            case 9:
            case 11:
                n = (n = n.documentElement) ? n.namespaceURI : sl(null, "");
                break;
            default:
                e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = sl(n, e);
        }
        O2(ce), D2(ce, n);
    }
    function _n() {
        O2(ce), O2(yt), O2(gt);
    }
    function xo(e) {
        Qe(gt.current);
        var n = Qe(ce.current), t = sl(n, e.type);
        n !== t && (D2(yt, e), D2(ce, t));
    }
    function vi(e) {
        yt.current === e && (O2(ce), O2(yt));
    }
    var R = Ve(0);
    function sr(e) {
        for(var n = e; n !== null;){
            if (n.tag === 13) {
                var t = n.memoizedState;
                if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return n;
            } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
                if ((n.flags & 64) !== 0) return n;
            } else if (n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
            }
            if (n === e) break;
            for(; n.sibling === null;){
                if (n.return === null || n.return === e) return null;
                n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
        }
        return null;
    }
    var ve2 = null, _e2 = null, de2 = !1;
    function Gu(e, n) {
        var t = ne2(5, null, null, 0);
        t.elementType = "DELETED", t.type = "DELETED", t.stateNode = n, t.return = e, t.flags = 8, e.lastEffect !== null ? (e.lastEffect.nextEffect = t, e.lastEffect = t) : e.firstEffect = e.lastEffect = t;
    }
    function Co(e, n) {
        switch(e.tag){
            case 5:
                var t = e.type;
                return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, !0) : !1;
            case 6:
                return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, !0) : !1;
            case 13:
                return !1;
            default:
                return !1;
        }
    }
    function _l(e) {
        if (de2) {
            var n = _e2;
            if (n) {
                var t = n;
                if (!Co(e, n)) {
                    if (n = vn(t.nextSibling), !n || !Co(e, n)) {
                        e.flags = e.flags & -1025 | 2, de2 = !1, ve2 = e;
                        return;
                    }
                    Gu(ve2, t);
                }
                ve2 = e, _e2 = vn(n.firstChild);
            } else e.flags = e.flags & -1025 | 2, de2 = !1, ve2 = e;
        }
    }
    function _o(e) {
        for(e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)e = e.return;
        ve2 = e;
    }
    function It(e) {
        if (e !== ve2) return !1;
        if (!de2) return _o(e), de2 = !0, !1;
        var n = e.type;
        if (e.tag !== 5 || n !== "head" && n !== "body" && !wl(n, e.memoizedProps)) for(n = _e2; n;)Gu(e, n), n = vn(n.nextSibling);
        if (_o(e), e.tag === 13) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(v(317));
            e: {
                for(e = e.nextSibling, n = 0; e;){
                    if (e.nodeType === 8) {
                        var t = e.data;
                        if (t === "/$") {
                            if (n === 0) {
                                _e2 = vn(e.nextSibling);
                                break e;
                            }
                            n--;
                        } else t !== "$" && t !== "$!" && t !== "$?" || n++;
                    }
                    e = e.nextSibling;
                }
                _e2 = null;
            }
        } else _e2 = ve2 ? vn(e.stateNode.nextSibling) : null;
        return !0;
    }
    function Kr() {
        _e2 = ve2 = null, de2 = !1;
    }
    var gn = [];
    function yi() {
        for(var e = 0; e < gn.length; e++)gn[e]._workInProgressVersionPrimary = null;
        gn.length = 0;
    }
    var nt = qe1.ReactCurrentDispatcher, te2 = qe1.ReactCurrentBatchConfig, wt = 0, I = null, W2 = null, V2 = null, ar = !1, tt = !1;
    function K2() {
        throw Error(v(321));
    }
    function gi(e, n) {
        if (n === null) return !1;
        for(var t = 0; t < n.length && t < e.length; t++)if (!ee2(e[t], n[t])) return !1;
        return !0;
    }
    function wi(e, n, t, r, l, i) {
        if (wt = i, I = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, nt.current = e === null || e.memoizedState === null ? ba : ef, e = t(r, l), tt) {
            i = 0;
            do {
                if (tt = !1, !(25 > i)) throw Error(v(301));
                i += 1, V2 = W2 = null, n.updateQueue = null, nt.current = nf, e = t(r, l);
            }while (tt)
        }
        if (nt.current = pr, n = W2 !== null && W2.next !== null, wt = 0, V2 = W2 = I = null, ar = !1, n) throw Error(v(300));
        return e;
    }
    function Ye() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return V2 === null ? I.memoizedState = V2 = e : V2 = V2.next = e, V2;
    }
    function en() {
        if (W2 === null) {
            var e = I.alternate;
            e = e !== null ? e.memoizedState : null;
        } else e = W2.next;
        var n = V2 === null ? I.memoizedState : V2.next;
        if (n !== null) V2 = n, W2 = e;
        else {
            if (e === null) throw Error(v(310));
            W2 = e, e = {
                memoizedState: W2.memoizedState,
                baseState: W2.baseState,
                baseQueue: W2.baseQueue,
                queue: W2.queue,
                next: null
            }, V2 === null ? I.memoizedState = V2 = e : V2 = V2.next = e;
        }
        return V2;
    }
    function ae2(e, n) {
        return typeof n == "function" ? n(e) : n;
    }
    function jn(e) {
        var n = en(), t = n.queue;
        if (t === null) throw Error(v(311));
        t.lastRenderedReducer = e;
        var r = W2, l = r.baseQueue, i = t.pending;
        if (i !== null) {
            if (l !== null) {
                var o = l.next;
                l.next = i.next, i.next = o;
            }
            r.baseQueue = l = i, t.pending = null;
        }
        if (l !== null) {
            l = l.next, r = r.baseState;
            var u = o = i = null, s = l;
            do {
                var d = s.lane;
                if ((wt & d) === d) u !== null && (u = u.next = {
                    lane: 0,
                    action: s.action,
                    eagerReducer: s.eagerReducer,
                    eagerState: s.eagerState,
                    next: null
                }), r = s.eagerReducer === e ? s.eagerState : e(r, s.action);
                else {
                    var y = {
                        lane: d,
                        action: s.action,
                        eagerReducer: s.eagerReducer,
                        eagerState: s.eagerState,
                        next: null
                    };
                    u === null ? (o = u = y, i = r) : u = u.next = y, I.lanes |= d, xt |= d;
                }
                s = s.next;
            }while (s !== null && s !== l)
            u === null ? i = r : u.next = o, ee2(r, n.memoizedState) || (ue2 = !0), n.memoizedState = r, n.baseState = i, n.baseQueue = u, t.lastRenderedState = r;
        }
        return [
            n.memoizedState,
            t.dispatch
        ];
    }
    function Un(e) {
        var n = en(), t = n.queue;
        if (t === null) throw Error(v(311));
        t.lastRenderedReducer = e;
        var r = t.dispatch, l = t.pending, i = n.memoizedState;
        if (l !== null) {
            t.pending = null;
            var o = l = l.next;
            do i = e(i, o.action), o = o.next;
            while (o !== l)
            ee2(i, n.memoizedState) || (ue2 = !0), n.memoizedState = i, n.baseQueue === null && (n.baseState = i), t.lastRenderedState = i;
        }
        return [
            i,
            r
        ];
    }
    function No(e, n, t) {
        var r = n._getVersion;
        r = r(n._source);
        var l = n._workInProgressVersionPrimary;
        if (l !== null ? e = l === r : (e = e.mutableReadLanes, (e = (wt & e) === e) && (n._workInProgressVersionPrimary = r, gn.push(n))), e) return t(n._source);
        throw gn.push(n), Error(v(350));
    }
    function Zu(e, n, t, r) {
        var l = Y2;
        if (l === null) throw Error(v(349));
        var i = n._getVersion, o = i(n._source), u = nt.current, s = u.useState(function() {
            return No(l, n, t);
        }), d = s[1], y = s[0];
        s = V2;
        var C5 = e.memoizedState, h5 = C5.refs, S = h5.getSnapshot, k = C5.source;
        C5 = C5.subscribe;
        var E = I;
        return e.memoizedState = {
            refs: h5,
            source: n,
            subscribe: r
        }, u.useEffect(function() {
            h5.getSnapshot = t, h5.setSnapshot = d;
            var c = i(n._source);
            if (!ee2(o, c)) {
                c = t(n._source), ee2(y, c) || (d(c), c = Oe1(E), l.mutableReadLanes |= c & l.pendingLanes), c = l.mutableReadLanes, l.entangledLanes |= c;
                for(var a = l.entanglements, f = c; 0 < f;){
                    var p = 31 - Ie2(f), m = 1 << p;
                    a[p] |= c, f &= ~m;
                }
            }
        }, [
            t,
            n,
            r
        ]), u.useEffect(function() {
            return r(n._source, function() {
                var c = h5.getSnapshot, a = h5.setSnapshot;
                try {
                    a(c(n._source));
                    var f = Oe1(E);
                    l.mutableReadLanes |= f & l.pendingLanes;
                } catch (p) {
                    a(function() {
                        throw p;
                    });
                }
            });
        }, [
            n,
            r
        ]), ee2(S, t) && ee2(k, n) && ee2(C5, r) || (e = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: ae2,
            lastRenderedState: y
        }, e.dispatch = d = ki.bind(null, I, e), s.queue = e, s.baseQueue = null, y = No(l, n, t), s.memoizedState = s.baseState = y), y;
    }
    function Ju(e, n, t) {
        var r = en();
        return Zu(r, e, n, t);
    }
    function Vn(e) {
        var n = Ye();
        return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = n.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: ae2,
            lastRenderedState: e
        }, e = e.dispatch = ki.bind(null, I, e), [
            n.memoizedState,
            e
        ];
    }
    function fr(e, n, t, r) {
        return e = {
            tag: e,
            create: n,
            destroy: t,
            deps: r,
            next: null
        }, n = I.updateQueue, n === null ? (n = {
            lastEffect: null
        }, I.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
    }
    function Po(e) {
        var n = Ye();
        return e = {
            current: e
        }, n.memoizedState = e;
    }
    function cr1() {
        return en().memoizedState;
    }
    function Nl(e, n, t, r) {
        var l = Ye();
        I.flags |= e, l.memoizedState = fr(1 | n, t, void 0, r === void 0 ? null : r);
    }
    function Si(e, n, t, r) {
        var l = en();
        r = r === void 0 ? null : r;
        var i = void 0;
        if (W2 !== null) {
            var o = W2.memoizedState;
            if (i = o.destroy, r !== null && gi(r, o.deps)) {
                fr(n, t, i, r);
                return;
            }
        }
        I.flags |= e, l.memoizedState = fr(1 | n, t, i, r);
    }
    function To(e, n) {
        return Nl(516, 4, e, n);
    }
    function dr(e, n) {
        return Si(516, 4, e, n);
    }
    function qu(e, n) {
        return Si(4, 2, e, n);
    }
    function bu(e, n) {
        if (typeof n == "function") return e = e(), n(e), function() {
            n(null);
        };
        if (n != null) return e = e(), n.current = e, function() {
            n.current = null;
        };
    }
    function es(e, n, t) {
        return t = t != null ? t.concat([
            e
        ]) : null, Si(4, 2, bu.bind(null, n, e), t);
    }
    function Ei() {}
    function ns(e, n) {
        var t = en();
        n = n === void 0 ? null : n;
        var r = t.memoizedState;
        return r !== null && n !== null && gi(n, r[1]) ? r[0] : (t.memoizedState = [
            e,
            n
        ], e);
    }
    function ts(e, n) {
        var t = en();
        n = n === void 0 ? null : n;
        var r = t.memoizedState;
        return r !== null && n !== null && gi(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [
            e,
            n
        ], e);
    }
    function qa(e, n) {
        var t = Cn();
        Ge(98 > t ? 98 : t, function() {
            e(!0);
        }), Ge(97 < t ? 97 : t, function() {
            var r = te2.transition;
            te2.transition = 1;
            try {
                e(!1), n();
            } finally{
                te2.transition = r;
            }
        });
    }
    function ki(e, n, t) {
        var r = q(), l = Oe1(e), i = {
            lane: l,
            action: t,
            eagerReducer: null,
            eagerState: null,
            next: null
        }, o = n.pending;
        if (o === null ? i.next = i : (i.next = o.next, o.next = i), n.pending = i, o = e.alternate, e === I || o !== null && o === I) tt = ar = !0;
        else {
            if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
                var u = n.lastRenderedState, s = o(u, t);
                if (i.eagerReducer = o, i.eagerState = s, ee2(s, u)) return;
            } catch  {} finally{}
            Me2(e, l, r);
        }
    }
    var pr = {
        readContext: re2,
        useCallback: K2,
        useContext: K2,
        useEffect: K2,
        useImperativeHandle: K2,
        useLayoutEffect: K2,
        useMemo: K2,
        useReducer: K2,
        useRef: K2,
        useState: K2,
        useDebugValue: K2,
        useDeferredValue: K2,
        useTransition: K2,
        useMutableSource: K2,
        useOpaqueIdentifier: K2,
        unstable_isNewReconciler: !1
    }, ba = {
        readContext: re2,
        useCallback: function(e, n) {
            return Ye().memoizedState = [
                e,
                n === void 0 ? null : n
            ], e;
        },
        useContext: re2,
        useEffect: To,
        useImperativeHandle: function(e, n, t) {
            return t = t != null ? t.concat([
                e
            ]) : null, Nl(4, 2, bu.bind(null, n, e), t);
        },
        useLayoutEffect: function(e, n) {
            return Nl(4, 2, e, n);
        },
        useMemo: function(e, n) {
            var t = Ye();
            return n = n === void 0 ? null : n, e = e(), t.memoizedState = [
                e,
                n
            ], e;
        },
        useReducer: function(e, n, t) {
            var r = Ye();
            return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = r.queue = {
                pending: null,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: n
            }, e = e.dispatch = ki.bind(null, I, e), [
                r.memoizedState,
                e
            ];
        },
        useRef: Po,
        useState: Vn,
        useDebugValue: Ei,
        useDeferredValue: function(e) {
            var n = Vn(e), t = n[0], r = n[1];
            return To(function() {
                var l = te2.transition;
                te2.transition = 1;
                try {
                    r(e);
                } finally{
                    te2.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = Vn(!1), n = e[0];
            return e = qa.bind(null, e[1]), Po(e), [
                e,
                n
            ];
        },
        useMutableSource: function(e, n, t) {
            var r = Ye();
            return r.memoizedState = {
                refs: {
                    getSnapshot: n,
                    setSnapshot: null
                },
                source: e,
                subscribe: t
            }, Zu(r, e, n, t);
        },
        useOpaqueIdentifier: function() {
            if (de2) {
                var e = !1, n = Ya(function() {
                    throw e || (e = !0, t("r:" + (Qr++).toString(36))), Error(v(355));
                }), t = Vn(n)[1];
                return (I.mode & 2) === 0 && (I.flags |= 516, fr(5, function() {
                    t("r:" + (Qr++).toString(36));
                }, void 0, null)), n;
            }
            return n = "r:" + (Qr++).toString(36), Vn(n), n;
        },
        unstable_isNewReconciler: !1
    }, ef = {
        readContext: re2,
        useCallback: ns,
        useContext: re2,
        useEffect: dr,
        useImperativeHandle: es,
        useLayoutEffect: qu,
        useMemo: ts,
        useReducer: jn,
        useRef: cr1,
        useState: function() {
            return jn(ae2);
        },
        useDebugValue: Ei,
        useDeferredValue: function(e) {
            var n = jn(ae2), t = n[0], r = n[1];
            return dr(function() {
                var l = te2.transition;
                te2.transition = 1;
                try {
                    r(e);
                } finally{
                    te2.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = jn(ae2)[0];
            return [
                cr1().current,
                e
            ];
        },
        useMutableSource: Ju,
        useOpaqueIdentifier: function() {
            return jn(ae2)[0];
        },
        unstable_isNewReconciler: !1
    }, nf = {
        readContext: re2,
        useCallback: ns,
        useContext: re2,
        useEffect: dr,
        useImperativeHandle: es,
        useLayoutEffect: qu,
        useMemo: ts,
        useReducer: Un,
        useRef: cr1,
        useState: function() {
            return Un(ae2);
        },
        useDebugValue: Ei,
        useDeferredValue: function(e) {
            var n = Un(ae2), t = n[0], r = n[1];
            return dr(function() {
                var l = te2.transition;
                te2.transition = 1;
                try {
                    r(e);
                } finally{
                    te2.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = Un(ae2)[0];
            return [
                cr1().current,
                e
            ];
        },
        useMutableSource: Ju,
        useOpaqueIdentifier: function() {
            return Un(ae2)[0];
        },
        unstable_isNewReconciler: !1
    }, tf = qe1.ReactCurrentOwner, ue2 = !1;
    function G2(e, n, t, r) {
        n.child = e === null ? Ku(n, null, t, r) : ur(n, e.child, t, r);
    }
    function Lo(e, n, t, r, l) {
        t = t.render;
        var i = n.ref;
        return yn(n, l), r = wi(e, n, t, r, i, l), e !== null && !ue2 ? (n.updateQueue = e.updateQueue, n.flags &= -517, e.lanes &= ~l, ye2(e, n, l)) : (n.flags |= 1, G2(e, n, r, l), n.child);
    }
    function zo(e, n, t, r, l, i) {
        if (e === null) {
            var o = t.type;
            return typeof o == "function" && !Ti(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, rs(e, n, o, r, l, i)) : (e = Xt(t.type, null, r, n, n.mode, i), e.ref = n.ref, e.return = n, n.child = e);
        }
        return o = e.child, (l & i) === 0 && (l = o.memoizedProps, t = t.compare, t = t !== null ? t : pt, t(l, r) && e.ref === n.ref) ? ye2(e, n, i) : (n.flags |= 1, e = Ue1(o, r), e.ref = n.ref, e.return = n, n.child = e);
    }
    function rs(e, n, t, r, l, i) {
        if (e !== null && pt(e.memoizedProps, r) && e.ref === n.ref) if (ue2 = !1, (i & l) !== 0) (e.flags & 16384) !== 0 && (ue2 = !0);
        else return n.lanes = e.lanes, ye2(e, n, i);
        return Pl(e, n, t, r, i);
    }
    function Gr(e, n, t) {
        var r = n.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
        if (r.mode === "hidden" || r.mode === "unstable-defer-without-hiding") if ((n.mode & 4) === 0) n.memoizedState = {
            baseLanes: 0
        }, jt(n, t);
        else if ((t & 1073741824) !== 0) n.memoizedState = {
            baseLanes: 0
        }, jt(n, i !== null ? i.baseLanes : t);
        else return e = i !== null ? i.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = {
            baseLanes: e
        }, jt(n, e), null;
        else i !== null ? (r = i.baseLanes | t, n.memoizedState = null) : r = t, jt(n, r);
        return G2(e, n, l, t), n.child;
    }
    function ls(e, n) {
        var t = n.ref;
        (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 128);
    }
    function Pl(e, n, t, r, l) {
        var i = J2(t) ? Ke : Q2.current;
        return i = xn(n, i), yn(n, l), t = wi(e, n, t, r, i, l), e !== null && !ue2 ? (n.updateQueue = e.updateQueue, n.flags &= -517, e.lanes &= ~l, ye2(e, n, l)) : (n.flags |= 1, G2(e, n, t, l), n.child);
    }
    function Oo(e, n, t, r, l) {
        if (J2(t)) {
            var i = !0;
            Wt(n);
        } else i = !1;
        if (yn(n, l), n.stateNode === null) e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), Yu(n, t, r), xl(n, t, r, l), r = !0;
        else if (e === null) {
            var o = n.stateNode, u = n.memoizedProps;
            o.props = u;
            var s = o.context, d = t.contextType;
            typeof d == "object" && d !== null ? d = re2(d) : (d = J2(t) ? Ke : Q2.current, d = xn(n, d));
            var y = t.getDerivedStateFromProps, C6 = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function";
            C6 || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && ko(n, o, r, d), Ee1 = !1;
            var h6 = n.memoizedState;
            o.state = h6, vt(n, r, o, l), s = n.memoizedState, u !== r || h6 !== s || Z2.current || Ee1 ? (typeof y == "function" && (or1(n, t, y, r), s = n.memoizedState), (u = Ee1 || Eo(n, t, u, r, h6, s, d)) ? (C6 || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (n.flags |= 4)) : (typeof o.componentDidMount == "function" && (n.flags |= 4), n.memoizedProps = r, n.memoizedState = s), o.props = r, o.state = s, o.context = d, r = u) : (typeof o.componentDidMount == "function" && (n.flags |= 4), r = !1);
        } else {
            o = n.stateNode, $u(e, n), u = n.memoizedProps, d = n.type === n.elementType ? u : oe(n.type, u), o.props = d, C6 = n.pendingProps, h6 = o.context, s = t.contextType, typeof s == "object" && s !== null ? s = re2(s) : (s = J2(t) ? Ke : Q2.current, s = xn(n, s));
            var S = t.getDerivedStateFromProps;
            (y = typeof S == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== C6 || h6 !== s) && ko(n, o, r, s), Ee1 = !1, h6 = n.memoizedState, o.state = h6, vt(n, r, o, l);
            var k = n.memoizedState;
            u !== C6 || h6 !== k || Z2.current || Ee1 ? (typeof S == "function" && (or1(n, t, S, r), k = n.memoizedState), (d = Ee1 || Eo(n, t, d, r, h6, k, s)) ? (y || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, s)), typeof o.componentDidUpdate == "function" && (n.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (n.flags |= 256)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h6 === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h6 === e.memoizedState || (n.flags |= 256), n.memoizedProps = r, n.memoizedState = k), o.props = r, o.state = k, o.context = s, r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h6 === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h6 === e.memoizedState || (n.flags |= 256), r = !1);
        }
        return Tl(e, n, t, r, i, l);
    }
    function Tl(e, n, t, r, l, i) {
        ls(e, n);
        var o = (n.flags & 64) !== 0;
        if (!r && !o) return l && vo(n, t, !1), ye2(e, n, i);
        r = n.stateNode, tf.current = n;
        var u = o && typeof t.getDerivedStateFromError != "function" ? null : r.render();
        return n.flags |= 1, e !== null && o ? (n.child = ur(n, e.child, null, i), n.child = ur(n, null, u, i)) : G2(e, n, u, i), n.memoizedState = r.state, l && vo(n, t, !0), n.child;
    }
    function Mo(e) {
        var n = e.stateNode;
        n.pendingContext ? ho(e, n.pendingContext, n.pendingContext !== n.context) : n.context && ho(e, n.context, !1), Cl(e, n.containerInfo);
    }
    var Ft = {
        dehydrated: null,
        retryLane: 0
    };
    function Ro(e, n, t) {
        var r = n.pendingProps, l = R.current, i = !1, o;
        return (o = (n.flags & 64) !== 0) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), o ? (i = !0, n.flags &= -65) : e !== null && e.memoizedState === null || r.fallback === void 0 || r.unstable_avoidThisFallback === !0 || (l |= 1), D2(R, l & 1), e === null ? (r.fallback !== void 0 && _l(n), e = r.children, l = r.fallback, i ? (e = Do(n, e, l, t), n.child.memoizedState = {
            baseLanes: t
        }, n.memoizedState = Ft, e) : typeof r.unstable_expectedLoadTime == "number" ? (e = Do(n, e, l, t), n.child.memoizedState = {
            baseLanes: t
        }, n.memoizedState = Ft, n.lanes = 33554432, e) : (t = Li({
            mode: "visible",
            children: e
        }, n.mode, t, null), t.return = n, n.child = t)) : e.memoizedState !== null ? i ? (r = Fo(e, n, r.children, r.fallback, t), i = n.child, l = e.child.memoizedState, i.memoizedState = l === null ? {
            baseLanes: t
        } : {
            baseLanes: l.baseLanes | t
        }, i.childLanes = e.childLanes & ~t, n.memoizedState = Ft, r) : (t = Io(e, n, r.children, t), n.memoizedState = null, t) : i ? (r = Fo(e, n, r.children, r.fallback, t), i = n.child, l = e.child.memoizedState, i.memoizedState = l === null ? {
            baseLanes: t
        } : {
            baseLanes: l.baseLanes | t
        }, i.childLanes = e.childLanes & ~t, n.memoizedState = Ft, r) : (t = Io(e, n, r.children, t), n.memoizedState = null, t);
    }
    function Do(e, n, t, r) {
        var l = e.mode, i = e.child;
        return n = {
            mode: "hidden",
            children: n
        }, (l & 2) === 0 && i !== null ? (i.childLanes = 0, i.pendingProps = n) : i = Li(n, l, 0, null), t = En(t, l, r, null), i.return = e, t.return = e, i.sibling = t, e.child = i, t;
    }
    function Io(e, n, t, r) {
        var l = e.child;
        return e = l.sibling, t = Ue1(l, {
            mode: "visible",
            children: t
        }), (n.mode & 2) === 0 && (t.lanes = r), t.return = n, t.sibling = null, e !== null && (e.nextEffect = null, e.flags = 8, n.firstEffect = n.lastEffect = e), n.child = t;
    }
    function Fo(e, n, t, r, l) {
        var i = n.mode, o = e.child;
        e = o.sibling;
        var u = {
            mode: "hidden",
            children: t
        };
        return (i & 2) === 0 && n.child !== o ? (t = n.child, t.childLanes = 0, t.pendingProps = u, o = t.lastEffect, o !== null ? (n.firstEffect = t.firstEffect, n.lastEffect = o, o.nextEffect = null) : n.firstEffect = n.lastEffect = null) : t = Ue1(o, u), e !== null ? r = Ue1(e, r) : (r = En(r, i, l, null), r.flags |= 2), r.return = n, t.return = n, t.sibling = r, n.child = t, r;
    }
    function jo(e, n) {
        e.lanes |= n;
        var t = e.alternate;
        t !== null && (t.lanes |= n), Au(e.return, n);
    }
    function Zr(e, n, t, r, l, i) {
        var o = e.memoizedState;
        o === null ? e.memoizedState = {
            isBackwards: n,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: t,
            tailMode: l,
            lastEffect: i
        } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l, o.lastEffect = i);
    }
    function Uo(e, n, t) {
        var r = n.pendingProps, l = r.revealOrder, i = r.tail;
        if (G2(e, n, r.children, t), r = R.current, (r & 2) !== 0) r = r & 1 | 2, n.flags |= 64;
        else {
            if (e !== null && (e.flags & 64) !== 0) e: for(e = n.child; e !== null;){
                if (e.tag === 13) e.memoizedState !== null && jo(e, t);
                else if (e.tag === 19) jo(e, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue;
                }
                if (e === n) break e;
                for(; e.sibling === null;){
                    if (e.return === null || e.return === n) break e;
                    e = e.return;
                }
                e.sibling.return = e.return, e = e.sibling;
            }
            r &= 1;
        }
        if (D2(R, r), (n.mode & 2) === 0) n.memoizedState = null;
        else switch(l){
            case "forwards":
                for(t = n.child, l = null; t !== null;)e = t.alternate, e !== null && sr(e) === null && (l = t), t = t.sibling;
                t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Zr(n, !1, l, t, i, n.lastEffect);
                break;
            case "backwards":
                for(t = null, l = n.child, n.child = null; l !== null;){
                    if (e = l.alternate, e !== null && sr(e) === null) {
                        n.child = l;
                        break;
                    }
                    e = l.sibling, l.sibling = t, t = l, l = e;
                }
                Zr(n, !0, t, null, i, n.lastEffect);
                break;
            case "together":
                Zr(n, !1, null, null, void 0, n.lastEffect);
                break;
            default:
                n.memoizedState = null;
        }
        return n.child;
    }
    function ye2(e, n, t) {
        if (e !== null && (n.dependencies = e.dependencies), xt |= n.lanes, (t & n.childLanes) !== 0) {
            if (e !== null && n.child !== e.child) throw Error(v(153));
            if (n.child !== null) {
                for(e = n.child, t = Ue1(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null;)e = e.sibling, t = t.sibling = Ue1(e, e.pendingProps), t.return = n;
                t.sibling = null;
            }
            return n.child;
        }
        return null;
    }
    var is, Ll, os, us;
    is = function(e, n) {
        for(var t = n.child; t !== null;){
            if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
            else if (t.tag !== 4 && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === n) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === n) return;
                t = t.return;
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    };
    Ll = function() {};
    os = function(e, n, t, r) {
        var l = e.memoizedProps;
        if (l !== r) {
            e = n.stateNode, Qe(ce.current);
            var i = null;
            switch(t){
                case "input":
                    l = tl(e, l), r = tl(e, r), i = [];
                    break;
                case "option":
                    l = il(e, l), r = il(e, r), i = [];
                    break;
                case "select":
                    l = M({}, l, {
                        value: void 0
                    }), r = M({}, r, {
                        value: void 0
                    }), i = [];
                    break;
                case "textarea":
                    l = ol(e, l), r = ol(e, r), i = [];
                    break;
                default:
                    typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = er);
            }
            al(t, r);
            var o;
            t = null;
            for(d in l)if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
                var u = l[d];
                for(o in u)u.hasOwnProperty(o) && (t || (t = {}), t[o] = "");
            } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (ot.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
            for(d in r){
                var s = r[d];
                if (u = l?.[d], r.hasOwnProperty(d) && s !== u && (s != null || u != null)) if (d === "style") if (u) {
                    for(o in u)!u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (t || (t = {}), t[o] = "");
                    for(o in s)s.hasOwnProperty(o) && u[o] !== s[o] && (t || (t = {}), t[o] = s[o]);
                } else t || (i || (i = []), i.push(d, t)), t = s;
                else d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (ot.hasOwnProperty(d) ? (s != null && d === "onScroll" && z2("scroll", e), i || u === s || (i = [])) : typeof s == "object" && s !== null && s.$$typeof === Gl ? s.toString() : (i = i || []).push(d, s));
            }
            t && (i = i || []).push("style", t);
            var d = i;
            (n.updateQueue = d) && (n.flags |= 4);
        }
    };
    us = function(e, n, t, r) {
        t !== r && (n.flags |= 4);
    };
    function Bn(e, n) {
        if (!de2) switch(e.tailMode){
            case "hidden":
                n = e.tail;
                for(var t = null; n !== null;)n.alternate !== null && (t = n), n = n.sibling;
                t === null ? e.tail = null : t.sibling = null;
                break;
            case "collapsed":
                t = e.tail;
                for(var r = null; t !== null;)t.alternate !== null && (r = t), t = t.sibling;
                r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
        }
    }
    function rf(e, n, t) {
        var r = n.pendingProps;
        switch(n.tag){
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return null;
            case 1:
                return J2(n.type) && tr(), null;
            case 3:
                return _n(), O2(Z2), O2(Q2), yi(), r = n.stateNode, r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (It(n) ? n.flags |= 4 : r.hydrate || (n.flags |= 256)), Ll(n), null;
            case 5:
                vi(n);
                var l = Qe(gt.current);
                if (t = n.type, e !== null && n.stateNode != null) os(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 128);
                else {
                    if (!r) {
                        if (n.stateNode === null) throw Error(v(166));
                        return null;
                    }
                    if (e = Qe(ce.current), It(n)) {
                        r = n.stateNode, t = n.type;
                        var i = n.memoizedProps;
                        switch(r[Ce2] = n, r[nr] = i, t){
                            case "dialog":
                                z2("cancel", r), z2("close", r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                z2("load", r);
                                break;
                            case "video":
                            case "audio":
                                for(e = 0; e < Qn.length; e++)z2(Qn[e], r);
                                break;
                            case "source":
                                z2("error", r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                z2("error", r), z2("load", r);
                                break;
                            case "details":
                                z2("toggle", r);
                                break;
                            case "input":
                                Vi(r, i), z2("invalid", r);
                                break;
                            case "select":
                                r._wrapperState = {
                                    wasMultiple: !!i.multiple
                                }, z2("invalid", r);
                                break;
                            case "textarea":
                                Hi(r, i), z2("invalid", r);
                        }
                        al(t, i), e = null;
                        for(var o in i)i.hasOwnProperty(o) && (l = i[o], o === "children" ? typeof l == "string" ? r.textContent !== l && (e = [
                            "children",
                            l
                        ]) : typeof l == "number" && r.textContent !== "" + l && (e = [
                            "children",
                            "" + l
                        ]) : ot.hasOwnProperty(o) && l != null && o === "onScroll" && z2("scroll", r));
                        switch(t){
                            case "input":
                                Nt(r), Bi(r, i, !0);
                                break;
                            case "textarea":
                                Nt(r), Wi(r);
                                break;
                            case "select":
                            case "option":
                                break;
                            default:
                                typeof i.onClick == "function" && (r.onclick = er);
                        }
                        r = e, n.updateQueue = r, r !== null && (n.flags |= 4);
                    } else {
                        switch(o = l.nodeType === 9 ? l : l.ownerDocument, e === ul.html && (e = eu(t)), e === ul.html ? t === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(t, {
                            is: r.is
                        }) : (e = o.createElement(t), t === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, t), e[Ce2] = n, e[nr] = r, is(e, n, !1, !1), n.stateNode = e, o = fl(t, r), t){
                            case "dialog":
                                z2("cancel", e), z2("close", e), l = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                z2("load", e), l = r;
                                break;
                            case "video":
                            case "audio":
                                for(l = 0; l < Qn.length; l++)z2(Qn[l], e);
                                l = r;
                                break;
                            case "source":
                                z2("error", e), l = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                z2("error", e), z2("load", e), l = r;
                                break;
                            case "details":
                                z2("toggle", e), l = r;
                                break;
                            case "input":
                                Vi(e, r), l = tl(e, r), z2("invalid", e);
                                break;
                            case "option":
                                l = il(e, r);
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, l = M({}, r, {
                                    value: void 0
                                }), z2("invalid", e);
                                break;
                            case "textarea":
                                Hi(e, r), l = ol(e, r), z2("invalid", e);
                                break;
                            default:
                                l = r;
                        }
                        al(t, l);
                        var u = l;
                        for(i in u)if (u.hasOwnProperty(i)) {
                            var s = u[i];
                            i === "style" ? ru(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && nu(e, s)) : i === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && ut(e, s) : typeof s == "number" && ut(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (ot.hasOwnProperty(i) ? s != null && i === "onScroll" && z2("scroll", e) : s != null && Al(e, i, s, o));
                        }
                        switch(t){
                            case "input":
                                Nt(e), Bi(e, r, !1);
                                break;
                            case "textarea":
                                Nt(e), Wi(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + De1(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? pn(e, !!r.multiple, i, !1) : r.defaultValue != null && pn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof l.onClick == "function" && (e.onclick = er);
                        }
                        Du(t, r) && (n.flags |= 4);
                    }
                    n.ref !== null && (n.flags |= 128);
                }
                return null;
            case 6:
                if (e && n.stateNode != null) us(e, n, e.memoizedProps, r);
                else {
                    if (typeof r != "string" && n.stateNode === null) throw Error(v(166));
                    t = Qe(gt.current), Qe(ce.current), It(n) ? (r = n.stateNode, t = n.memoizedProps, r[Ce2] = n, r.nodeValue !== t && (n.flags |= 4)) : (r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[Ce2] = n, n.stateNode = r);
                }
                return null;
            case 13:
                return O2(R), r = n.memoizedState, (n.flags & 64) !== 0 ? (n.lanes = t, n) : (r = r !== null, t = !1, e === null ? n.memoizedProps.fallback !== void 0 && It(n) : t = e.memoizedState !== null, r && !t && (n.mode & 2) !== 0 && (e === null && n.memoizedProps.unstable_avoidThisFallback !== !0 || (R.current & 1) !== 0 ? B2 === 0 && (B2 = 3) : ((B2 === 0 || B2 === 3) && (B2 = 4), Y2 === null || (xt & 134217727) === 0 && (Ln & 134217727) === 0 || wn(Y2, $))), (r || t) && (n.flags |= 4), null);
            case 4:
                return _n(), Ll(n), e === null && Ou(n.stateNode.containerInfo), null;
            case 10:
                return mi(n), null;
            case 17:
                return J2(n.type) && tr(), null;
            case 19:
                if (O2(R), r = n.memoizedState, r === null) return null;
                if (i = (n.flags & 64) !== 0, o = r.rendering, o === null) if (i) Bn(r, !1);
                else {
                    if (B2 !== 0 || e !== null && (e.flags & 64) !== 0) for(e = n.child; e !== null;){
                        if (o = sr(e), o !== null) {
                            for(n.flags |= 64, Bn(r, !1), i = o.updateQueue, i !== null && (n.updateQueue = i, n.flags |= 4), r.lastEffect === null && (n.firstEffect = null), n.lastEffect = r.lastEffect, r = t, t = n.child; t !== null;)i = t, e = r, i.flags &= 2, i.nextEffect = null, i.firstEffect = null, i.lastEffect = null, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : {
                                lanes: e.lanes,
                                firstContext: e.firstContext
                            }), t = t.sibling;
                            return D2(R, R.current & 1 | 2), n.child;
                        }
                        e = e.sibling;
                    }
                    r.tail !== null && A() > Il && (n.flags |= 64, i = !0, Bn(r, !1), n.lanes = 33554432);
                }
                else {
                    if (!i) if (e = sr(o), e !== null) {
                        if (n.flags |= 64, i = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), Bn(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !de2) return n = n.lastEffect = r.lastEffect, n !== null && (n.nextEffect = null), null;
                    } else 2 * A() - r.renderingStartTime > Il && t !== 1073741824 && (n.flags |= 64, i = !0, Bn(r, !1), n.lanes = 33554432);
                    r.isBackwards ? (o.sibling = n.child, n.child = o) : (t = r.last, t !== null ? t.sibling = o : n.child = o, r.last = o);
                }
                return r.tail !== null ? (t = r.tail, r.rendering = t, r.tail = t.sibling, r.lastEffect = n.lastEffect, r.renderingStartTime = A(), t.sibling = null, n = R.current, D2(R, i ? n & 1 | 2 : n & 1), t) : null;
            case 23:
            case 24:
                return Pi(), e !== null && e.memoizedState !== null != (n.memoizedState !== null) && r.mode !== "unstable-defer-without-hiding" && (n.flags |= 4), null;
        }
        throw Error(v(156, n.tag));
    }
    function lf1(e) {
        switch(e.tag){
            case 1:
                J2(e.type) && tr();
                var n = e.flags;
                return n & 4096 ? (e.flags = n & -4097 | 64, e) : null;
            case 3:
                if (_n(), O2(Z2), O2(Q2), yi(), n = e.flags, (n & 64) !== 0) throw Error(v(285));
                return e.flags = n & -4097 | 64, e;
            case 5:
                return vi(e), null;
            case 13:
                return O2(R), n = e.flags, n & 4096 ? (e.flags = n & -4097 | 64, e) : null;
            case 19:
                return O2(R), null;
            case 4:
                return _n(), null;
            case 10:
                return mi(e), null;
            case 23:
            case 24:
                return Pi(), null;
            default:
                return null;
        }
    }
    function xi(e, n) {
        try {
            var t = "", r = n;
            do t += Us(r), r = r.return;
            while (r)
            var l = t;
        } catch (i) {
            l = `
Error generating stack: ` + i.message + `
` + i.stack;
        }
        return {
            value: e,
            source: n,
            stack: l
        };
    }
    function zl(e, n) {
        try {
            console.error(n.value);
        } catch (t) {
            setTimeout(function() {
                throw t;
            });
        }
    }
    var of = typeof WeakMap == "function" ? WeakMap : Map;
    function ss(e, n, t) {
        t = Le2(-1, t), t.tag = 3, t.payload = {
            element: null
        };
        var r = n.value;
        return t.callback = function() {
            hr || (hr = !0, Fl = r), zl(e, n);
        }, t;
    }
    function as(e, n, t) {
        t = Le2(-1, t), t.tag = 3;
        var r = e.type.getDerivedStateFromError;
        if (typeof r == "function") {
            var l = n.value;
            t.payload = function() {
                return zl(e, n), r(l);
            };
        }
        var i = e.stateNode;
        return i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
            typeof r != "function" && (fe1 === null ? fe1 = new Set([
                this
            ]) : fe1.add(this), zl(e, n));
            var o = n.stack;
            this.componentDidCatch(n.value, {
                componentStack: o !== null ? o : ""
            });
        }), t;
    }
    var uf = typeof WeakSet == "function" ? WeakSet : Set;
    function Vo(e) {
        var n = e.ref;
        if (n !== null) if (typeof n == "function") try {
            n(null);
        } catch (t) {
            Re1(e, t);
        }
        else n.current = null;
    }
    function sf(e, n) {
        switch(n.tag){
            case 0:
            case 11:
            case 15:
            case 22:
                return;
            case 1:
                if (n.flags & 256 && e !== null) {
                    var t = e.memoizedProps, r = e.memoizedState;
                    e = n.stateNode, n = e.getSnapshotBeforeUpdate(n.elementType === n.type ? t : oe(n.type, t), r), e.__reactInternalSnapshotBeforeUpdate = n;
                }
                return;
            case 3:
                n.flags & 256 && fi(n.stateNode.containerInfo);
                return;
            case 5:
            case 6:
            case 4:
            case 17:
                return;
        }
        throw Error(v(163));
    }
    function af(e, n, t) {
        switch(t.tag){
            case 0:
            case 11:
            case 15:
            case 22:
                if (n = t.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
                    e = n = n.next;
                    do {
                        if ((e.tag & 3) === 3) {
                            var r = e.create;
                            e.destroy = r();
                        }
                        e = e.next;
                    }while (e !== n)
                }
                if (n = t.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
                    e = n = n.next;
                    do {
                        var l = e;
                        r = l.next, l = l.tag, (l & 4) !== 0 && (l & 1) !== 0 && (gs(t, e), yf(t, e)), e = r;
                    }while (e !== n)
                }
                return;
            case 1:
                e = t.stateNode, t.flags & 4 && (n === null ? e.componentDidMount() : (r = t.elementType === t.type ? n.memoizedProps : oe(t.type, n.memoizedProps), e.componentDidUpdate(r, n.memoizedState, e.__reactInternalSnapshotBeforeUpdate))), n = t.updateQueue, n !== null && So(t, n, e);
                return;
            case 3:
                if (n = t.updateQueue, n !== null) {
                    if (e = null, t.child !== null) switch(t.child.tag){
                        case 5:
                            e = t.child.stateNode;
                            break;
                        case 1:
                            e = t.child.stateNode;
                    }
                    So(t, n, e);
                }
                return;
            case 5:
                e = t.stateNode, n === null && t.flags & 4 && Du(t.type, t.memoizedProps) && e.focus();
                return;
            case 6:
                return;
            case 4:
                return;
            case 12:
                return;
            case 13:
                t.memoizedState === null && (t = t.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null && pu(t))));
                return;
            case 19:
            case 17:
            case 20:
            case 21:
            case 23:
            case 24:
                return;
        }
        throw Error(v(163));
    }
    function Bo(e, n) {
        for(var t = e;;){
            if (t.tag === 5) {
                var r = t.stateNode;
                if (n) r = r.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                else {
                    r = t.stateNode;
                    var l = t.memoizedProps.style;
                    l = l != null && l.hasOwnProperty("display") ? l.display : null, r.style.display = tu("display", l);
                }
            } else if (t.tag === 6) t.stateNode.nodeValue = n ? "" : t.memoizedProps;
            else if ((t.tag !== 23 && t.tag !== 24 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === e) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === e) return;
                t = t.return;
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    }
    function Ho(e, n) {
        if (Xe && typeof Xe.onCommitFiberUnmount == "function") try {
            Xe.onCommitFiberUnmount(ci, n);
        } catch  {}
        switch(n.tag){
            case 0:
            case 11:
            case 14:
            case 15:
            case 22:
                if (e = n.updateQueue, e !== null && (e = e.lastEffect, e !== null)) {
                    var t = e = e.next;
                    do {
                        var r = t, l = r.destroy;
                        if (r = r.tag, l !== void 0) if ((r & 4) !== 0) gs(n, t);
                        else {
                            r = n;
                            try {
                                l();
                            } catch (i) {
                                Re1(r, i);
                            }
                        }
                        t = t.next;
                    }while (t !== e)
                }
                break;
            case 1:
                if (Vo(n), e = n.stateNode, typeof e.componentWillUnmount == "function") try {
                    e.props = n.memoizedProps, e.state = n.memoizedState, e.componentWillUnmount();
                } catch (i) {
                    Re1(n, i);
                }
                break;
            case 5:
                Vo(n);
                break;
            case 4:
                fs(e, n);
        }
    }
    function Wo(e) {
        e.alternate = null, e.child = null, e.dependencies = null, e.firstEffect = null, e.lastEffect = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.return = null, e.updateQueue = null;
    }
    function Ao(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function $o(e) {
        e: {
            for(var n = e.return; n !== null;){
                if (Ao(n)) break e;
                n = n.return;
            }
            throw Error(v(160));
        }
        var t = n;
        switch(n = t.stateNode, t.tag){
            case 5:
                var r = !1;
                break;
            case 3:
                n = n.containerInfo, r = !0;
                break;
            case 4:
                n = n.containerInfo, r = !0;
                break;
            default:
                throw Error(v(161));
        }
        t.flags & 16 && (ut(n, ""), t.flags &= -17);
        e: n: for(t = e;;){
            for(; t.sibling === null;){
                if (t.return === null || Ao(t.return)) {
                    t = null;
                    break e;
                }
                t = t.return;
            }
            for(t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;){
                if (t.flags & 2 || t.child === null || t.tag === 4) continue n;
                t.child.return = t, t = t.child;
            }
            if (!(t.flags & 2)) {
                t = t.stateNode;
                break e;
            }
        }
        r ? Ol(e, t, n) : Ml(e, t, n);
    }
    function Ol(e, n, t) {
        var r = e.tag, l = r === 5 || r === 6;
        if (l) e = l ? e.stateNode : e.stateNode.instance, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = er));
        else if (r !== 4 && (e = e.child, e !== null)) for(Ol(e, n, t), e = e.sibling; e !== null;)Ol(e, n, t), e = e.sibling;
    }
    function Ml(e, n, t) {
        var r = e.tag, l = r === 5 || r === 6;
        if (l) e = l ? e.stateNode : e.stateNode.instance, n ? t.insertBefore(e, n) : t.appendChild(e);
        else if (r !== 4 && (e = e.child, e !== null)) for(Ml(e, n, t), e = e.sibling; e !== null;)Ml(e, n, t), e = e.sibling;
    }
    function fs(e, n) {
        for(var t = n, r = !1, l, i;;){
            if (!r) {
                r = t.return;
                e: for(;;){
                    if (r === null) throw Error(v(160));
                    switch(l = r.stateNode, r.tag){
                        case 5:
                            i = !1;
                            break e;
                        case 3:
                            l = l.containerInfo, i = !0;
                            break e;
                        case 4:
                            l = l.containerInfo, i = !0;
                            break e;
                    }
                    r = r.return;
                }
                r = !0;
            }
            if (t.tag === 5 || t.tag === 6) {
                e: for(var o = e, u = t, s = u;;)if (Ho(o, s), s.child !== null && s.tag !== 4) s.child.return = s, s = s.child;
                else {
                    if (s === u) break e;
                    for(; s.sibling === null;){
                        if (s.return === null || s.return === u) break e;
                        s = s.return;
                    }
                    s.sibling.return = s.return, s = s.sibling;
                }
                i ? (o = l, u = t.stateNode, o.nodeType === 8 ? o.parentNode.removeChild(u) : o.removeChild(u)) : l.removeChild(t.stateNode);
            } else if (t.tag === 4) {
                if (t.child !== null) {
                    l = t.stateNode.containerInfo, i = !0, t.child.return = t, t = t.child;
                    continue;
                }
            } else if (Ho(e, t), t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === n) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === n) return;
                t = t.return, t.tag === 4 && (r = !1);
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    }
    function Jr(e, n) {
        switch(n.tag){
            case 0:
            case 11:
            case 14:
            case 15:
            case 22:
                var t = n.updateQueue;
                if (t = t !== null ? t.lastEffect : null, t !== null) {
                    var r = t = t.next;
                    do (r.tag & 3) === 3 && (e = r.destroy, r.destroy = void 0, e !== void 0 && e()), r = r.next;
                    while (r !== t)
                }
                return;
            case 1:
                return;
            case 5:
                if (t = n.stateNode, t != null) {
                    r = n.memoizedProps;
                    var l = e !== null ? e.memoizedProps : r;
                    e = n.type;
                    var i = n.updateQueue;
                    if (n.updateQueue = null, i !== null) {
                        for(t[nr] = r, e === "input" && r.type === "radio" && r.name != null && qo(t, r), fl(e, l), n = fl(e, r), l = 0; l < i.length; l += 2){
                            var o = i[l], u = i[l + 1];
                            o === "style" ? ru(t, u) : o === "dangerouslySetInnerHTML" ? nu(t, u) : o === "children" ? ut(t, u) : Al(t, o, u, n);
                        }
                        switch(e){
                            case "input":
                                rl(t, r);
                                break;
                            case "textarea":
                                bo(t, r);
                                break;
                            case "select":
                                e = t._wrapperState.wasMultiple, t._wrapperState.wasMultiple = !!r.multiple, i = r.value, i != null ? pn(t, !!r.multiple, i, !1) : e !== !!r.multiple && (r.defaultValue != null ? pn(t, !!r.multiple, r.defaultValue, !0) : pn(t, !!r.multiple, r.multiple ? [] : "", !1));
                        }
                    }
                }
                return;
            case 6:
                if (n.stateNode === null) throw Error(v(162));
                n.stateNode.nodeValue = n.memoizedProps;
                return;
            case 3:
                t = n.stateNode, t.hydrate && (t.hydrate = !1, pu(t.containerInfo));
                return;
            case 12:
                return;
            case 13:
                n.memoizedState !== null && (Ni = A(), Bo(n.child, !0)), Qo(n);
                return;
            case 19:
                Qo(n);
                return;
            case 17:
                return;
            case 23:
            case 24:
                Bo(n, n.memoizedState !== null);
                return;
        }
        throw Error(v(163));
    }
    function Qo(e) {
        var n = e.updateQueue;
        if (n !== null) {
            e.updateQueue = null;
            var t = e.stateNode;
            t === null && (t = e.stateNode = new uf), n.forEach(function(r) {
                var l = Sf.bind(null, e, r);
                t.has(r) || (t.add(r), r.then(l, l));
            });
        }
    }
    function ff(e, n) {
        return e !== null && (e = e.memoizedState, e === null || e.dehydrated !== null) ? (n = n.memoizedState, n !== null && n.dehydrated === null) : !1;
    }
    var cf = Math.ceil, mr = qe1.ReactCurrentDispatcher, Ci = qe1.ReactCurrentOwner, x = 0, Y2 = null, j = null, $ = 0, Ze = 0, Rl = Ve(0), B2 = 0, Tr = null, Tn = 0, xt = 0, Ln = 0, _i = 0, Dl = null, Ni = 0, Il = 1 / 0;
    function zn() {
        Il = A() + 500;
    }
    var g2 = null, hr = !1, Fl = null, fe1 = null, je1 = !1, rt = null, Yn = 90, jl = [], Ul = [], ge2 = null, lt = 0, Vl = null, $t = -1, he2 = 0, Qt = 0, it = null, Yt = !1;
    function q() {
        return (x & 48) !== 0 ? A() : $t !== -1 ? $t : $t = A();
    }
    function Oe1(e) {
        if (e = e.mode, (e & 2) === 0) return 1;
        if ((e & 4) === 0) return Cn() === 99 ? 1 : 2;
        if (he2 === 0 && (he2 = Tn), Ja.transition !== 0) {
            Qt !== 0 && (Qt = Dl !== null ? Dl.pendingLanes : 0), e = he2;
            var n = 4186112 & ~Qt;
            return n &= -n, n === 0 && (e = 4186112 & ~e, n = e & -e, n === 0 && (n = 8192)), n;
        }
        return e = Cn(), (x & 4) !== 0 && e === 98 ? e = qt(12, he2) : (e = ea(e), e = qt(e, he2)), e;
    }
    function Me2(e, n, t) {
        if (50 < lt) throw lt = 0, Vl = null, Error(v(185));
        if (e = Lr(e, n), e === null) return null;
        Er(e, n, t), e === Y2 && (Ln |= n, B2 === 4 && wn(e, $));
        var r = Cn();
        n === 1 ? (x & 8) !== 0 && (x & 48) === 0 ? Bl(e) : (le1(e, t), x === 0 && (zn(), pe2())) : ((x & 4) === 0 || r !== 98 && r !== 99 || (ge2 === null ? ge2 = new Set([
            e
        ]) : ge2.add(e)), le1(e, t)), Dl = e;
    }
    function Lr(e, n) {
        e.lanes |= n;
        var t = e.alternate;
        for(t !== null && (t.lanes |= n), t = e, e = e.return; e !== null;)e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
        return t.tag === 3 ? t.stateNode : null;
    }
    function le1(e, n) {
        for(var t = e.callbackNode, r = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o;){
            var u = 31 - Ie2(o), s = 1 << u, d = i[u];
            if (d === -1) {
                if ((s & r) === 0 || (s & l) !== 0) {
                    d = n, rn(s);
                    var y = L;
                    i[u] = 10 <= y ? d + 250 : 6 <= y ? d + 5000 : -1;
                }
            } else d <= n && (e.expiredLanes |= s);
            o &= ~s;
        }
        if (r = ct(e, e === Y2 ? $ : 0), n = L, r === 0) t !== null && (t !== Yr && El(t), e.callbackNode = null, e.callbackPriority = 0);
        else {
            if (t !== null) {
                if (e.callbackPriority === n) return;
                t !== Yr && El(t);
            }
            n === 15 ? (t = Bl.bind(null, e), me2 === null ? (me2 = [
                t
            ], At = di(Nr, Wu)) : me2.push(t), t = Yr) : n === 14 ? t = ht(99, Bl.bind(null, e)) : (t = na(n), t = ht(t, cs.bind(null, e))), e.callbackPriority = n, e.callbackNode = t;
        }
    }
    function cs(e) {
        if ($t = -1, Qt = he2 = 0, (x & 48) !== 0) throw Error(v(327));
        var n = e.callbackNode;
        if (Be() && e.callbackNode !== n) return null;
        var t = ct(e, e === Y2 ? $ : 0);
        if (t === 0) return null;
        var r = t, l = x;
        x |= 16;
        var i = hs();
        (Y2 !== e || $ !== r) && (zn(), Sn(e, r));
        do try {
            mf();
            break;
        } catch (u) {
            ms(e, u);
        }
        while (1)
        if (pi(), mr.current = i, x = l, j !== null ? r = 0 : (Y2 = null, $ = 0, r = B2), (Tn & Ln) !== 0) Sn(e, 0);
        else if (r !== 0) {
            if (r === 2 && (x |= 64, e.hydrate && (e.hydrate = !1, fi(e.containerInfo)), t = Su(e), t !== 0 && (r = Xn(e, t))), r === 1) throw n = Tr, Sn(e, 0), wn(e, t), le1(e, A()), n;
            switch(e.finishedWork = e.current.alternate, e.finishedLanes = t, r){
                case 0:
                case 1:
                    throw Error(v(345));
                case 2:
                    He(e);
                    break;
                case 3:
                    if (wn(e, t), (t & 62914560) === t && (r = Ni + 500 - A(), 10 < r)) {
                        if (ct(e, 0) !== 0) break;
                        if (l = e.suspendedLanes, (l & t) !== t) {
                            q(), e.pingedLanes |= e.suspendedLanes & l;
                            break;
                        }
                        e.timeoutHandle = co(He.bind(null, e), r);
                        break;
                    }
                    He(e);
                    break;
                case 4:
                    if (wn(e, t), (t & 4186112) === t) break;
                    for(r = e.eventTimes, l = -1; 0 < t;){
                        var o = 31 - Ie2(t);
                        i = 1 << o, o = r[o], o > l && (l = o), t &= ~i;
                    }
                    if (t = l, t = A() - t, t = (120 > t ? 120 : 480 > t ? 480 : 1080 > t ? 1080 : 1920 > t ? 1920 : 3000 > t ? 3000 : 4320 > t ? 4320 : 1960 * cf(t / 1960)) - t, 10 < t) {
                        e.timeoutHandle = co(He.bind(null, e), t);
                        break;
                    }
                    He(e);
                    break;
                case 5:
                    He(e);
                    break;
                default:
                    throw Error(v(329));
            }
        }
        return le1(e, A()), e.callbackNode === n ? cs.bind(null, e) : null;
    }
    function wn(e, n) {
        for(n &= ~_i, n &= ~Ln, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n;){
            var t = 31 - Ie2(n), r = 1 << t;
            e[t] = -1, n &= ~r;
        }
    }
    function Bl(e) {
        if ((x & 48) !== 0) throw Error(v(327));
        if (Be(), e === Y2 && (e.expiredLanes & $) !== 0) {
            var n = $, t = Xn(e, n);
            (Tn & Ln) !== 0 && (n = ct(e, n), t = Xn(e, n));
        } else n = ct(e, 0), t = Xn(e, n);
        if (e.tag !== 0 && t === 2 && (x |= 64, e.hydrate && (e.hydrate = !1, fi(e.containerInfo)), n = Su(e), n !== 0 && (t = Xn(e, n))), t === 1) throw t = Tr, Sn(e, 0), wn(e, n), le1(e, A()), t;
        return e.finishedWork = e.current.alternate, e.finishedLanes = n, He(e), le1(e, A()), null;
    }
    function df() {
        if (ge2 !== null) {
            var e = ge2;
            ge2 = null, e.forEach(function(n) {
                n.expiredLanes |= 24 & n.pendingLanes, le1(n, A());
            });
        }
        pe2();
    }
    function ds(e, n) {
        var t = x;
        x |= 1;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (zn(), pe2());
        }
    }
    function ps(e, n) {
        var t = x;
        x &= -2, x |= 8;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (zn(), pe2());
        }
    }
    function jt(e, n) {
        D2(Rl, Ze), Ze |= n, Tn |= n;
    }
    function Pi() {
        Ze = Rl.current, O2(Rl);
    }
    function Sn(e, n) {
        e.finishedWork = null, e.finishedLanes = 0;
        var t = e.timeoutHandle;
        if (t !== -1 && (e.timeoutHandle = -1, Qa(t)), j !== null) for(t = j.return; t !== null;){
            var r = t;
            switch(r.tag){
                case 1:
                    r = r.type.childContextTypes, r != null && tr();
                    break;
                case 3:
                    _n(), O2(Z2), O2(Q2), yi();
                    break;
                case 5:
                    vi(r);
                    break;
                case 4:
                    _n();
                    break;
                case 13:
                    O2(R);
                    break;
                case 19:
                    O2(R);
                    break;
                case 10:
                    mi(r);
                    break;
                case 23:
                case 24:
                    Pi();
            }
            t = t.return;
        }
        Y2 = e, j = Ue1(e.current, null), $ = Ze = Tn = n, B2 = 0, Tr = null, _i = Ln = xt = 0;
    }
    function ms(e, n) {
        do {
            var t = j;
            try {
                if (pi(), nt.current = pr, ar) {
                    for(var r = I.memoizedState; r !== null;){
                        var l = r.queue;
                        l !== null && (l.pending = null), r = r.next;
                    }
                    ar = !1;
                }
                if (wt = 0, V2 = W2 = I = null, tt = !1, Ci.current = null, t === null || t.return === null) {
                    B2 = 1, Tr = n, j = null;
                    break;
                }
                e: {
                    var i = e, o = t.return, u = t, s = n;
                    if (n = $, u.flags |= 2048, u.firstEffect = u.lastEffect = null, s !== null && typeof s == "object" && typeof s.then == "function") {
                        var d = s;
                        if ((u.mode & 2) === 0) {
                            var y = u.alternate;
                            y ? (u.updateQueue = y.updateQueue, u.memoizedState = y.memoizedState, u.lanes = y.lanes) : (u.updateQueue = null, u.memoizedState = null);
                        }
                        var C7 = (R.current & 1) !== 0, h7 = o;
                        do {
                            var S;
                            if (S = h7.tag === 13) {
                                var k = h7.memoizedState;
                                if (k !== null) S = k.dehydrated !== null;
                                else {
                                    var E = h7.memoizedProps;
                                    S = E.fallback === void 0 ? !1 : E.unstable_avoidThisFallback !== !0 ? !0 : !C7;
                                }
                            }
                            if (S) {
                                var c = h7.updateQueue;
                                if (c === null) {
                                    var a = new Set;
                                    a.add(d), h7.updateQueue = a;
                                } else c.add(d);
                                if ((h7.mode & 2) === 0) {
                                    if (h7.flags |= 64, u.flags |= 16384, u.flags &= -2981, u.tag === 1) if (u.alternate === null) u.tag = 17;
                                    else {
                                        var f = Le2(-1, 1);
                                        f.tag = 2, ze(u, f);
                                    }
                                    u.lanes |= 1;
                                    break e;
                                }
                                s = void 0, u = n;
                                var p = i.pingCache;
                                if (p === null ? (p = i.pingCache = new of, s = new Set, p.set(d, s)) : (s = p.get(d), s === void 0 && (s = new Set, p.set(d, s))), !s.has(u)) {
                                    s.add(u);
                                    var m = wf.bind(null, i, d, u);
                                    d.then(m, m);
                                }
                                h7.flags |= 4096, h7.lanes = n;
                                break e;
                            }
                            h7 = h7.return;
                        }while (h7 !== null)
                        s = Error((dn(u.type) || "A React component") + ` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
                    }
                    B2 !== 5 && (B2 = 2), s = xi(s, u), h7 = o;
                    do {
                        switch(h7.tag){
                            case 3:
                                i = s, h7.flags |= 4096, n &= -n, h7.lanes |= n;
                                var _ = ss(h7, i, n);
                                wo(h7, _);
                                break e;
                            case 1:
                                i = s;
                                var w = h7.type, N = h7.stateNode;
                                if ((h7.flags & 64) === 0 && (typeof w.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (fe1 === null || !fe1.has(N)))) {
                                    h7.flags |= 4096, n &= -n, h7.lanes |= n;
                                    var T = as(h7, i, n);
                                    wo(h7, T);
                                    break e;
                                }
                        }
                        h7 = h7.return;
                    }while (h7 !== null)
                }
                ys(t);
            } catch (P4) {
                n = P4, j === t && t !== null && (j = t = t.return);
                continue;
            }
            break;
        }while (1)
    }
    function hs() {
        var e = mr.current;
        return mr.current = pr, e === null ? pr : e;
    }
    function Xn(e, n) {
        var t = x;
        x |= 16;
        var r = hs();
        Y2 === e && $ === n || Sn(e, n);
        do try {
            pf();
            break;
        } catch (l) {
            ms(e, l);
        }
        while (1)
        if (pi(), x = t, mr.current = r, j !== null) throw Error(v(261));
        return Y2 = null, $ = 0, B2;
    }
    function pf() {
        for(; j !== null;)vs(j);
    }
    function mf() {
        for(; j !== null && !Ka();)vs(j);
    }
    function vs(e) {
        var n = ws(e.alternate, e, Ze);
        e.memoizedProps = e.pendingProps, n === null ? ys(e) : j = n, Ci.current = null;
    }
    function ys(e) {
        var n = e;
        do {
            var t = n.alternate;
            if (e = n.return, (n.flags & 2048) === 0) {
                if (t = rf(t, n, Ze), t !== null) {
                    j = t;
                    return;
                }
                if (t = n, t.tag !== 24 && t.tag !== 23 || t.memoizedState === null || (Ze & 1073741824) !== 0 || (t.mode & 4) === 0) {
                    for(var r = 0, l = t.child; l !== null;)r |= l.lanes | l.childLanes, l = l.sibling;
                    t.childLanes = r;
                }
                e !== null && (e.flags & 2048) === 0 && (e.firstEffect === null && (e.firstEffect = n.firstEffect), n.lastEffect !== null && (e.lastEffect !== null && (e.lastEffect.nextEffect = n.firstEffect), e.lastEffect = n.lastEffect), 1 < n.flags && (e.lastEffect !== null ? e.lastEffect.nextEffect = n : e.firstEffect = n, e.lastEffect = n));
            } else {
                if (t = lf1(n), t !== null) {
                    t.flags &= 2047, j = t;
                    return;
                }
                e !== null && (e.firstEffect = e.lastEffect = null, e.flags |= 2048);
            }
            if (n = n.sibling, n !== null) {
                j = n;
                return;
            }
            j = n = e;
        }while (n !== null)
        B2 === 0 && (B2 = 5);
    }
    function He(e) {
        var n = Cn();
        return Ge(99, hf.bind(null, e, n)), null;
    }
    function hf(e, n) {
        do Be();
        while (rt !== null)
        if ((x & 48) !== 0) throw Error(v(327));
        var t = e.finishedWork;
        if (t === null) return null;
        if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(v(177));
        e.callbackNode = null;
        var r = t.lanes | t.childLanes, l = r, i = e.pendingLanes & ~l;
        e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= l, e.mutableReadLanes &= l, e.entangledLanes &= l, l = e.entanglements;
        for(var o = e.eventTimes, u = e.expirationTimes; 0 < i;){
            var s = 31 - Ie2(i), d = 1 << s;
            l[s] = 0, o[s] = -1, u[s] = -1, i &= ~d;
        }
        if (ge2 !== null && (r & 24) === 0 && ge2.has(e) && ge2.delete(e), e === Y2 && (j = Y2 = null, $ = 0), 1 < t.flags ? t.lastEffect !== null ? (t.lastEffect.nextEffect = t, r = t.firstEffect) : r = t : r = t.firstEffect, r !== null) {
            if (l = x, x |= 32, Ci.current = null, Ar = Vt, o = io(), vl(o)) {
                if ("selectionStart" in o) u = {
                    start: o.selectionStart,
                    end: o.selectionEnd
                };
                else e: if (u = (u = o.ownerDocument) && u.defaultView || window, (d = u.getSelection && u.getSelection()) && d.rangeCount !== 0) {
                    u = d.anchorNode, i = d.anchorOffset, s = d.focusNode, d = d.focusOffset;
                    try {
                        u.nodeType, s.nodeType;
                    } catch  {
                        u = null;
                        break e;
                    }
                    var y = 0, C8 = -1, h8 = -1, S = 0, k = 0, E = o, c = null;
                    n: for(;;){
                        for(var a; E !== u || i !== 0 && E.nodeType !== 3 || (C8 = y + i), E !== s || d !== 0 && E.nodeType !== 3 || (h8 = y + d), E.nodeType === 3 && (y += E.nodeValue.length), (a = E.firstChild) !== null;)c = E, E = a;
                        for(;;){
                            if (E === o) break n;
                            if (c === u && ++S === i && (C8 = y), c === s && ++k === d && (h8 = y), (a = E.nextSibling) !== null) break;
                            E = c, c = E.parentNode;
                        }
                        E = a;
                    }
                    u = C8 === -1 || h8 === -1 ? null : {
                        start: C8,
                        end: h8
                    };
                } else u = null;
                u = u || {
                    start: 0,
                    end: 0
                };
            } else u = null;
            $r = {
                focusedElem: o,
                selectionRange: u
            }, Vt = !1, it = null, Yt = !1, g2 = r;
            do try {
                vf();
            } catch (P5) {
                if (g2 === null) throw Error(v(330));
                Re1(g2, P5), g2 = g2.nextEffect;
            }
            while (g2 !== null)
            it = null, g2 = r;
            do try {
                for(o = e; g2 !== null;){
                    var f = g2.flags;
                    if (f & 16 && ut(g2.stateNode, ""), f & 128) {
                        var p = g2.alternate;
                        if (p !== null) {
                            var m = p.ref;
                            m !== null && (typeof m == "function" ? m(null) : m.current = null);
                        }
                    }
                    switch(f & 1038){
                        case 2:
                            $o(g2), g2.flags &= -3;
                            break;
                        case 6:
                            $o(g2), g2.flags &= -3, Jr(g2.alternate, g2);
                            break;
                        case 1024:
                            g2.flags &= -1025;
                            break;
                        case 1028:
                            g2.flags &= -1025, Jr(g2.alternate, g2);
                            break;
                        case 4:
                            Jr(g2.alternate, g2);
                            break;
                        case 8:
                            u = g2, fs(o, u);
                            var _ = u.alternate;
                            Wo(u), _ !== null && Wo(_);
                    }
                    g2 = g2.nextEffect;
                }
            } catch (P1) {
                if (g2 === null) throw Error(v(330));
                Re1(g2, P1), g2 = g2.nextEffect;
            }
            while (g2 !== null)
            if (m = $r, p = io(), f = m.focusedElem, o = m.selectionRange, p !== f && f && f.ownerDocument && Tu(f.ownerDocument.documentElement, f)) {
                for(o !== null && vl(f) && (p = o.start, m = o.end, m === void 0 && (m = p), ("selectionStart" in f) ? (f.selectionStart = p, f.selectionEnd = Math.min(m, f.value.length)) : (m = (p = f.ownerDocument || document) && p.defaultView || window, m.getSelection && (m = m.getSelection(), u = f.textContent.length, _ = Math.min(o.start, u), o = o.end === void 0 ? _ : Math.min(o.end, u), !m.extend && _ > o && (u = o, o = _, _ = u), u = lo(f, _), i = lo(f, o), u && i && (m.rangeCount !== 1 || m.anchorNode !== u.node || m.anchorOffset !== u.offset || m.focusNode !== i.node || m.focusOffset !== i.offset) && (p = p.createRange(), p.setStart(u.node, u.offset), m.removeAllRanges(), _ > o ? (m.addRange(p), m.extend(i.node, i.offset)) : (p.setEnd(i.node, i.offset), m.addRange(p)))))), p = [], m = f; m = m.parentNode;)m.nodeType === 1 && p.push({
                    element: m,
                    left: m.scrollLeft,
                    top: m.scrollTop
                });
                for(typeof f.focus == "function" && f.focus(), f = 0; f < p.length; f++)m = p[f], m.element.scrollLeft = m.left, m.element.scrollTop = m.top;
            }
            Vt = !!Ar, $r = Ar = null, e.current = t, g2 = r;
            do try {
                for(f = e; g2 !== null;){
                    var w = g2.flags;
                    if (w & 36 && af(f, g2.alternate, g2), w & 128) {
                        p = void 0;
                        var N = g2.ref;
                        if (N !== null) {
                            var T = g2.stateNode;
                            switch(g2.tag){
                                case 5:
                                    p = T;
                                    break;
                                default:
                                    p = T;
                            }
                            typeof N == "function" ? N(p) : N.current = p;
                        }
                    }
                    g2 = g2.nextEffect;
                }
            } catch (P2) {
                if (g2 === null) throw Error(v(330));
                Re1(g2, P2), g2 = g2.nextEffect;
            }
            while (g2 !== null)
            g2 = null, Za(), x = l;
        } else e.current = t;
        if (je1) je1 = !1, rt = e, Yn = n;
        else for(g2 = r; g2 !== null;)n = g2.nextEffect, g2.nextEffect = null, g2.flags & 8 && (w = g2, w.sibling = null, w.stateNode = null), g2 = n;
        if (r = e.pendingLanes, r === 0 && (fe1 = null), r === 1 ? e === Vl ? lt++ : (lt = 0, Vl = e) : lt = 0, t = t.stateNode, Xe && typeof Xe.onCommitFiberRoot == "function") try {
            Xe.onCommitFiberRoot(ci, t, void 0, (t.current.flags & 64) === 64);
        } catch  {}
        if (le1(e, A()), hr) throw hr = !1, e = Fl, Fl = null, e;
        return (x & 8) !== 0 || pe2(), null;
    }
    function vf() {
        for(; g2 !== null;){
            var e = g2.alternate;
            Yt || it === null || ((g2.flags & 8) !== 0 ? Qi(g2, it) && (Yt = !0) : g2.tag === 13 && ff(e, g2) && Qi(g2, it) && (Yt = !0));
            var n = g2.flags;
            (n & 256) !== 0 && sf(e, g2), (n & 512) === 0 || je1 || (je1 = !0, ht(97, function() {
                return Be(), null;
            })), g2 = g2.nextEffect;
        }
    }
    function Be() {
        if (Yn !== 90) {
            var e = 97 < Yn ? 97 : Yn;
            return Yn = 90, Ge(e, gf);
        }
        return !1;
    }
    function yf(e, n) {
        jl.push(n, e), je1 || (je1 = !0, ht(97, function() {
            return Be(), null;
        }));
    }
    function gs(e, n) {
        Ul.push(n, e), je1 || (je1 = !0, ht(97, function() {
            return Be(), null;
        }));
    }
    function gf() {
        if (rt === null) return !1;
        var e = rt;
        if (rt = null, (x & 48) !== 0) throw Error(v(331));
        var n = x;
        x |= 32;
        var t = Ul;
        Ul = [];
        for(var r = 0; r < t.length; r += 2){
            var l = t[r], i = t[r + 1], o = l.destroy;
            if (l.destroy = void 0, typeof o == "function") try {
                o();
            } catch (s) {
                if (i === null) throw Error(v(330));
                Re1(i, s);
            }
        }
        for(t = jl, jl = [], r = 0; r < t.length; r += 2){
            l = t[r], i = t[r + 1];
            try {
                var u = l.create;
                l.destroy = u();
            } catch (s) {
                if (i === null) throw Error(v(330));
                Re1(i, s);
            }
        }
        for(u = e.current.firstEffect; u !== null;)e = u.nextEffect, u.nextEffect = null, u.flags & 8 && (u.sibling = null, u.stateNode = null), u = e;
        return x = n, pe2(), !0;
    }
    function Yo(e, n, t) {
        n = xi(t, n), n = ss(e, n, 1), ze(e, n), n = q(), e = Lr(e, 1), e !== null && (Er(e, 1, n), le1(e, n));
    }
    function Re1(e, n) {
        if (e.tag === 3) Yo(e, e, n);
        else for(var t = e.return; t !== null;){
            if (t.tag === 3) {
                Yo(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (fe1 === null || !fe1.has(r))) {
                    e = xi(n, e);
                    var l = as(t, e, 1);
                    if (ze(t, l), l = q(), t = Lr(t, 1), t !== null) Er(t, 1, l), le1(t, l);
                    else if (typeof r.componentDidCatch == "function" && (fe1 === null || !fe1.has(r))) try {
                        r.componentDidCatch(n, e);
                    } catch  {}
                    break;
                }
            }
            t = t.return;
        }
    }
    function wf(e, n, t) {
        var r = e.pingCache;
        r !== null && r.delete(n), n = q(), e.pingedLanes |= e.suspendedLanes & t, Y2 === e && ($ & t) === t && (B2 === 4 || B2 === 3 && ($ & 62914560) === $ && 500 > A() - Ni ? Sn(e, 0) : _i |= t), le1(e, n);
    }
    function Sf(e, n) {
        var t = e.stateNode;
        t !== null && t.delete(n), n = 0, n === 0 && (n = e.mode, (n & 2) === 0 ? n = 1 : (n & 4) === 0 ? n = Cn() === 99 ? 1 : 2 : (he2 === 0 && (he2 = Tn), n = ln(62914560 & ~he2), n === 0 && (n = 4194304))), t = q(), e = Lr(e, n), e !== null && (Er(e, n, t), le1(e, t));
    }
    var ws;
    ws = function(e, n, t) {
        var r = n.lanes;
        if (e !== null) if (e.memoizedProps !== n.pendingProps || Z2.current) ue2 = !0;
        else if ((t & r) !== 0) ue2 = (e.flags & 16384) !== 0;
        else {
            switch(ue2 = !1, n.tag){
                case 3:
                    Mo(n), Kr();
                    break;
                case 5:
                    xo(n);
                    break;
                case 1:
                    J2(n.type) && Wt(n);
                    break;
                case 4:
                    Cl(n, n.stateNode.containerInfo);
                    break;
                case 10:
                    r = n.memoizedProps.value;
                    var l = n.type._context;
                    D2(rr, l._currentValue), l._currentValue = r;
                    break;
                case 13:
                    if (n.memoizedState !== null) return (t & n.child.childLanes) !== 0 ? Ro(e, n, t) : (D2(R, R.current & 1), n = ye2(e, n, t), n !== null ? n.sibling : null);
                    D2(R, R.current & 1);
                    break;
                case 19:
                    if (r = (t & n.childLanes) !== 0, (e.flags & 64) !== 0) {
                        if (r) return Uo(e, n, t);
                        n.flags |= 64;
                    }
                    if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), D2(R, R.current), r) break;
                    return null;
                case 23:
                case 24:
                    return n.lanes = 0, Gr(e, n, t);
            }
            return ye2(e, n, t);
        }
        else ue2 = !1;
        switch(n.lanes = 0, n.tag){
            case 2:
                if (r = n.type, e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), e = n.pendingProps, l = xn(n, Q2.current), yn(n, t), l = wi(null, n, r, e, l, t), n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0) {
                    if (n.tag = 1, n.memoizedState = null, n.updateQueue = null, J2(r)) {
                        var i = !0;
                        Wt(n);
                    } else i = !1;
                    n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, hi(n);
                    var o = r.getDerivedStateFromProps;
                    typeof o == "function" && or1(n, r, o, e), l.updater = Pr, n.stateNode = l, l._reactInternals = n, xl(n, r, e, t), n = Tl(null, n, r, !0, i, t);
                } else n.tag = 0, G2(null, n, l, t), n = n.child;
                return n;
            case 16:
                l = n.elementType;
                e: {
                    switch(e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), e = n.pendingProps, i = l._init, l = i(l._payload), n.type = l, i = n.tag = kf(l), e = oe(l, e), i){
                        case 0:
                            n = Pl(null, n, l, e, t);
                            break e;
                        case 1:
                            n = Oo(null, n, l, e, t);
                            break e;
                        case 11:
                            n = Lo(null, n, l, e, t);
                            break e;
                        case 14:
                            n = zo(null, n, l, oe(l.type, e), r, t);
                            break e;
                    }
                    throw Error(v(306, l, ""));
                }
                return n;
            case 0:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), Pl(e, n, r, l, t);
            case 1:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), Oo(e, n, r, l, t);
            case 3:
                if (Mo(n), r = n.updateQueue, e === null || r === null) throw Error(v(282));
                if (r = n.pendingProps, l = n.memoizedState, l = l !== null ? l.element : null, $u(e, n), vt(n, r, null, t), r = n.memoizedState.element, r === l) Kr(), n = ye2(e, n, t);
                else {
                    if (l = n.stateNode, (i = l.hydrate) && (_e2 = vn(n.stateNode.containerInfo.firstChild), ve2 = n, i = de2 = !0), i) {
                        if (e = l.mutableSourceEagerHydrationData, e != null) for(l = 0; l < e.length; l += 2)i = e[l], i._workInProgressVersionPrimary = e[l + 1], gn.push(i);
                        for(t = Ku(n, null, r, t), n.child = t; t;)t.flags = t.flags & -3 | 1024, t = t.sibling;
                    } else G2(e, n, r, t), Kr();
                    n = n.child;
                }
                return n;
            case 5:
                return xo(n), e === null && _l(n), r = n.type, l = n.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, wl(r, l) ? o = null : i !== null && wl(r, i) && (n.flags |= 16), ls(e, n), G2(e, n, o, t), n.child;
            case 6:
                return e === null && _l(n), null;
            case 13:
                return Ro(e, n, t);
            case 4:
                return Cl(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = ur(n, null, r, t) : G2(e, n, r, t), n.child;
            case 11:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), Lo(e, n, r, l, t);
            case 7:
                return G2(e, n, n.pendingProps, t), n.child;
            case 8:
                return G2(e, n, n.pendingProps.children, t), n.child;
            case 12:
                return G2(e, n, n.pendingProps.children, t), n.child;
            case 10:
                e: {
                    r = n.type._context, l = n.pendingProps, o = n.memoizedProps, i = l.value;
                    var u = n.type._context;
                    if (D2(rr, u._currentValue), u._currentValue = i, o !== null) if (u = o.value, i = ee2(u, i) ? 0 : (typeof r._calculateChangedBits == "function" ? r._calculateChangedBits(u, i) : 1073741823) | 0, i === 0) {
                        if (o.children === l.children && !Z2.current) {
                            n = ye2(e, n, t);
                            break e;
                        }
                    } else for(u = n.child, u !== null && (u.return = n); u !== null;){
                        var s = u.dependencies;
                        if (s !== null) {
                            o = u.child;
                            for(var d = s.firstContext; d !== null;){
                                if (d.context === r && (d.observedBits & i) !== 0) {
                                    u.tag === 1 && (d = Le2(-1, t & -t), d.tag = 2, ze(u, d)), u.lanes |= t, d = u.alternate, d !== null && (d.lanes |= t), Au(u.return, t), s.lanes |= t;
                                    break;
                                }
                                d = d.next;
                            }
                        } else o = u.tag === 10 && u.type === n.type ? null : u.child;
                        if (o !== null) o.return = u;
                        else for(o = u; o !== null;){
                            if (o === n) {
                                o = null;
                                break;
                            }
                            if (u = o.sibling, u !== null) {
                                u.return = o.return, o = u;
                                break;
                            }
                            o = o.return;
                        }
                        u = o;
                    }
                    G2(e, n, l.children, t), n = n.child;
                }
                return n;
            case 9:
                return l = n.type, i = n.pendingProps, r = i.children, yn(n, t), l = re2(l, i.unstable_observedBits), r = r(l), n.flags |= 1, G2(e, n, r, t), n.child;
            case 14:
                return l = n.type, i = oe(l, n.pendingProps), i = oe(l.type, i), zo(e, n, l, i, r, t);
            case 15:
                return rs(e, n, n.type, n.pendingProps, r, t);
            case 17:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), n.tag = 1, J2(r) ? (e = !0, Wt(n)) : e = !1, yn(n, t), Yu(n, r, l), xl(n, r, l, t), Tl(null, n, r, !0, e, t);
            case 19:
                return Uo(e, n, t);
            case 23:
                return Gr(e, n, t);
            case 24:
                return Gr(e, n, t);
        }
        throw Error(v(156, n.tag));
    };
    function Ef(e, n, t, r) {
        this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.flags = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function ne2(e, n, t, r) {
        return new Ef(e, n, t, r);
    }
    function Ti(e) {
        return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function kf(e) {
        if (typeof e == "function") return Ti(e) ? 1 : 0;
        if (e != null) {
            if (e = e.$$typeof, e === gr) return 11;
            if (e === wr) return 14;
        }
        return 2;
    }
    function Ue1(e, n) {
        var t = e.alternate;
        return t === null ? (t = ne2(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.nextEffect = null, t.firstEffect = null, t.lastEffect = null), t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : {
            lanes: n.lanes,
            firstContext: n.firstContext
        }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
    }
    function Xt(e, n, t, r, l, i) {
        var o = 2;
        if (r = e, typeof e == "function") Ti(e) && (o = 1);
        else if (typeof e == "string") o = 5;
        else e: switch(e){
            case ke2:
                return En(t.children, l, i, n);
            case Go:
                o = 8, l |= 16;
                break;
            case $l:
                o = 8, l |= 1;
                break;
            case Kn:
                return e = ne2(12, t, n, l | 8), e.elementType = Kn, e.type = Kn, e.lanes = i, e;
            case Gn:
                return e = ne2(13, t, n, l), e.type = Gn, e.elementType = Gn, e.lanes = i, e;
            case Kt:
                return e = ne2(19, t, n, l), e.elementType = Kt, e.lanes = i, e;
            case Zl:
                return Li(t, l, i, n);
            case nl:
                return e = ne2(24, t, n, l), e.elementType = nl, e.lanes = i, e;
            default:
                if (typeof e == "object" && e !== null) switch(e.$$typeof){
                    case Ql:
                        o = 10;
                        break e;
                    case Yl:
                        o = 9;
                        break e;
                    case gr:
                        o = 11;
                        break e;
                    case wr:
                        o = 14;
                        break e;
                    case Xl:
                        o = 16, r = null;
                        break e;
                    case Kl:
                        o = 22;
                        break e;
                }
                throw Error(v(130, e == null ? e : typeof e, ""));
        }
        return n = ne2(o, t, n, l), n.elementType = e, n.type = r, n.lanes = i, n;
    }
    function En(e, n, t, r) {
        return e = ne2(7, e, r, n), e.lanes = t, e;
    }
    function Li(e, n, t, r) {
        return e = ne2(23, e, r, n), e.elementType = Zl, e.lanes = t, e;
    }
    function qr(e, n, t) {
        return e = ne2(6, e, null, n), e.lanes = t, e;
    }
    function br(e, n, t) {
        return n = ne2(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, n;
    }
    function xf(e, n, t) {
        this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = t, this.callbackNode = null, this.callbackPriority = 0, this.eventTimes = jr(0), this.expirationTimes = jr(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jr(0), this.mutableSourceEagerHydrationData = null;
    }
    function Cf(e, n, t) {
        var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: We,
            key: r == null ? null : "" + r,
            children: e,
            containerInfo: n,
            implementation: t
        };
    }
    function vr(e, n, t, r) {
        var l = n.current, i = q(), o = Oe1(l);
        e: if (t) {
            t = t._reactInternals;
            n: {
                if (be1(t) !== t || t.tag !== 1) throw Error(v(170));
                var u = t;
                do {
                    switch(u.tag){
                        case 3:
                            u = u.stateNode.context;
                            break n;
                        case 1:
                            if (J2(u.type)) {
                                u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                                break n;
                            }
                    }
                    u = u.return;
                }while (u !== null)
                throw Error(v(171));
            }
            if (t.tag === 1) {
                var s = t.type;
                if (J2(s)) {
                    t = Fu(t, s, u);
                    break e;
                }
            }
            t = u;
        } else t = Fe1;
        return n.context === null ? n.context = t : n.pendingContext = t, n = Le2(i, o), n.payload = {
            element: e
        }, r = r === void 0 ? null : r, r !== null && (n.callback = r), ze(l, n), Me2(l, o, i), o;
    }
    function el(e) {
        if (e = e.current, !e.child) return null;
        switch(e.child.tag){
            case 5:
                return e.child.stateNode;
            default:
                return e.child.stateNode;
        }
    }
    function Xo(e, n) {
        if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
            var t = e.retryLane;
            e.retryLane = t !== 0 && t < n ? t : n;
        }
    }
    function zi(e, n) {
        Xo(e, n), (e = e.alternate) && Xo(e, n);
    }
    function _f() {
        return null;
    }
    function Oi(e, n, t) {
        var r = t != null && t.hydrationOptions != null && t.hydrationOptions.mutableSources || null;
        if (t = new xf(e, n, t != null && t.hydrate === !0), n = ne2(3, null, null, n === 2 ? 7 : n === 1 ? 3 : 0), t.current = n, n.stateNode = t, hi(n), e[Pn] = t.current, Ou(e.nodeType === 8 ? e.parentNode : e), r) for(e = 0; e < r.length; e++){
            n = r[e];
            var l = n._getVersion;
            l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
                n,
                l
            ] : t.mutableSourceEagerHydrationData.push(n, l);
        }
        this._internalRoot = t;
    }
    Oi.prototype.render = function(e) {
        vr(e, this._internalRoot, null, null);
    };
    Oi.prototype.unmount = function() {
        var e = this._internalRoot, n = e.containerInfo;
        vr(null, e, null, function() {
            n[Pn] = null;
        });
    };
    function Ct(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function Nf(e, n) {
        if (n || (n = e ? e.nodeType === 9 ? e.documentElement : e.firstChild : null, n = !(!n || n.nodeType !== 1 || !n.hasAttribute("data-reactroot"))), !n) for(var t; t = e.lastChild;)e.removeChild(t);
        return new Oi(e, 0, n ? {
            hydrate: !0
        } : void 0);
    }
    function zr(e, n, t, r, l) {
        var i = t._reactRootContainer;
        if (i) {
            var o = i._internalRoot;
            if (typeof l == "function") {
                var u = l;
                l = function() {
                    var d = el(o);
                    u.call(d);
                };
            }
            vr(n, o, e, l);
        } else {
            if (i = t._reactRootContainer = Nf(t, r), o = i._internalRoot, typeof l == "function") {
                var s = l;
                l = function() {
                    var d = el(o);
                    s.call(d);
                };
            }
            ps(function() {
                vr(n, o, e, l);
            });
        }
        return el(o);
    }
    fu = function(e) {
        if (e.tag === 13) {
            var n = q();
            Me2(e, 4, n), zi(e, 4);
        }
    };
    ni = function(e) {
        if (e.tag === 13) {
            var n = q();
            Me2(e, 67108864, n), zi(e, 67108864);
        }
    };
    cu = function(e) {
        if (e.tag === 13) {
            var n = q(), t = Oe1(e);
            Me2(e, t, n), zi(e, t);
        }
    };
    du = function(e, n) {
        return n();
    };
    cl = function(e, n, t) {
        switch(n){
            case "input":
                if (rl(e, t), n = t.name, t.type === "radio" && n != null) {
                    for(t = e; t.parentNode;)t = t.parentNode;
                    for(t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++){
                        var r = t[n];
                        if (r !== e && r.form === e.form) {
                            var l = _r(r);
                            if (!l) throw Error(v(90));
                            Jo(r), rl(r, l);
                        }
                    }
                }
                break;
            case "textarea":
                bo(e, t);
                break;
            case "select":
                n = t.value, n != null && pn(e, !!t.multiple, n, !1);
        }
    };
    ql = ds;
    ou = function(e, n, t, r, l) {
        var i = x;
        x |= 4;
        try {
            return Ge(98, e.bind(null, n, t, r, l));
        } finally{
            x = i, x === 0 && (zn(), pe2());
        }
    };
    bl = function() {
        (x & 49) === 0 && (df(), Be());
    };
    uu = function(e, n) {
        var t = x;
        x |= 2;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (zn(), pe2());
        }
    };
    function Ss(e, n) {
        var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!Ct(n)) throw Error(v(200));
        return Cf(e, n, null, t);
    }
    var Pf = {
        Events: [
            Et,
            an,
            _r,
            lu,
            iu,
            Be,
            {
                current: !1
            }
        ]
    }, Hn = {
        findFiberByHostInstance: $e1,
        bundleType: 0,
        version: "17.0.2",
        rendererPackageName: "react-dom"
    }, Tf = {
        bundleType: Hn.bundleType,
        version: Hn.version,
        rendererPackageName: Hn.rendererPackageName,
        rendererConfig: Hn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: qe1.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = au(e), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Hn.findFiberByHostInstance || _f,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (Wn = __REACT_DEVTOOLS_GLOBAL_HOOK__, !Wn.isDisabled && Wn.supportsFiber)) try {
        ci = Wn.inject(Tf), Xe = Wn;
    } catch  {}
    var Wn;
    ie2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Pf;
    ie2.createPortal = Ss;
    ie2.findDOMNode = function(e) {
        if (e == null) return null;
        if (e.nodeType === 1) return e;
        var n = e._reactInternals;
        if (n === void 0) throw typeof e.render == "function" ? Error(v(188)) : Error(v(268, Object.keys(e)));
        return e = au(n), e = e === null ? null : e.stateNode, e;
    };
    ie2.flushSync = function(e, n) {
        var t = x;
        if ((t & 48) !== 0) return e(n);
        x |= 1;
        try {
            if (e) return Ge(99, e.bind(null, n));
        } finally{
            x = t, pe2();
        }
    };
    ie2.hydrate = function(e, n, t) {
        if (!Ct(n)) throw Error(v(200));
        return zr(null, e, n, !0, t);
    };
    ie2.render = function(e, n, t) {
        if (!Ct(n)) throw Error(v(200));
        return zr(null, e, n, !1, t);
    };
    ie2.unmountComponentAtNode = function(e) {
        if (!Ct(e)) throw Error(v(40));
        return e._reactRootContainer ? (ps(function() {
            zr(null, null, e, !1, function() {
                e._reactRootContainer = null, e[Pn] = null;
            });
        }), !0) : !1;
    };
    ie2.unstable_batchedUpdates = ds;
    ie2.unstable_createPortal = function(e, n) {
        return Ss(e, n, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
    };
    ie2.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
        if (!Ct(t)) throw Error(v(200));
        if (e == null || e._reactInternals === void 0) throw Error(v(38));
        return zr(e, n, t, !1, r);
    };
    ie2.version = "17.0.2";
});
var Mi = Ri((Rf, xs)=>{
    "use strict";
    function ks() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ks);
        } catch (e) {
            console.error(e);
        }
    }
    ks(), xs.exports = Es();
});
var Cs = Di(Mi()), _s = Di(Mi()), { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Df , createPortal: If , findDOMNode: Ff , flushSync: jf , hydrate: Uf , render: Vf , unmountComponentAtNode: Bf , unstable_batchedUpdates: Hf , unstable_createPortal: Wf , unstable_renderSubtreeIntoContainer: Af , version: $f  } = _s, { default: Lf , ...zf } = _s, Qf = (Cs.default ?? Lf) ?? zf;
function bytesToUuid(bytes) {
    const bits = [
        ...bytes
    ].map((bit)=>{
        const s = bit.toString(16);
        return bit < 16 ? "0" + s : s;
    });
    return [
        ...bits.slice(0, 4),
        "-",
        ...bits.slice(4, 6),
        "-",
        ...bits.slice(6, 8),
        "-",
        ...bits.slice(8, 10),
        "-",
        ...bits.slice(10, 16), 
    ].join("");
}
let _nodeId;
let _clockseq;
let _lastMSecs = 0;
let _lastNSecs = 0;
function generate(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf ?? [];
    options ??= {};
    let { node =_nodeId , clockseq =_clockseq  } = options;
    if (node === undefined || clockseq === undefined) {
        const seedBytes = (options.random ?? options.rng) ?? crypto.getRandomValues(new Uint8Array(16));
        if (node === undefined) {
            node = _nodeId = [
                seedBytes[0] | 1,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5], 
            ];
        }
        if (clockseq === undefined) {
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
    }
    let { msecs =new Date().getTime() , nsecs =_lastNSecs + 1  } = options;
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    }
    if (nsecs > 10000) {
        throw new Error("Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    const tl = ((msecs & 268435455) * 10000 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;
    const tmh = msecs / 4294967296 * 10000 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;
    b[i++] = tmh >>> 24 & 15 | 16;
    b[i++] = tmh >>> 16 & 255;
    b[i++] = clockseq >>> 8 | 128;
    b[i++] = clockseq & 255;
    for(let n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf ?? bytesToUuid(b);
}
function* makeChanges(lines1, start, end, newLines) {
    if (start > end) {
        throw RangeError('"end" must be equal to or larger than "start"');
    }
    if (start < 0 || end < 0) {
        throw Error('"end" and "start" must be more than -1');
    }
    const insertLineID = lines1.at(end + 1)?.id ?? "_end";
    if (end - start + 1 > newLines.length) {
        for(let i = 0; i < newLines.length; i++){
            const text = newLines[i];
            if (lines1[start + i].text === text) continue;
            yield {
                type: "update",
                id: lines1[start + i].id,
                text
            };
        }
        for(let i1 = start + newLines.length; i1 <= end; i1++){
            yield {
                type: "delete",
                id: lines1[i1].id
            };
        }
    } else {
        for(let i = 0; i < end - start + 1; i++){
            const text = newLines[i];
            if (lines1[start + i].text === text) continue;
            yield {
                type: "update",
                id: lines1[start + i].id,
                text
            };
        }
        for(let i2 = end - start + 1; i2 < newLines.length; i2++){
            yield {
                type: "insert",
                id: insertLineID,
                newlineID: String(generate()),
                text: newLines[i2]
            };
        }
    }
}
function applyCommit(revision, commit) {
    if (revision.id !== commit.parentID) {
        throw Error("commit rejected");
    }
    const lines2 = [
        ...revision.lines
    ];
    for (const change of commit.changes){
        const idx = lines2.findIndex((line)=>line.id === change.id
        );
        if (change.type === "insert") {
            lines2.splice(idx === -1 ? lines2.length : idx, 0, {
                text: change.text,
                id: change.newlineID
            });
        } else if (change.type === "update") {
            lines2[idx] = {
                ...lines2[idx],
                text: change.text
            };
        } else if (change.type === "delete") {
            lines2.splice(idx, 1);
        }
    }
    return {
        id: commit.id,
        previous: revision,
        lines: lines2
    };
}
const { Deno  } = globalThis;
typeof Deno?.noColor === "boolean" ? Deno.noColor : true;
new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", 
].join("|"), "g");
var DiffType;
(function(DiffType1) {
    DiffType1["removed"] = "removed";
    DiffType1["common"] = "common";
    DiffType1["added"] = "added";
})(DiffType || (DiffType = {}));
function isKeyedCollection(x) {
    return [
        Symbol.iterator,
        "size"
    ].every((k)=>k in x
    );
}
function equal(c, d) {
    const seen = new Map();
    return function compare(a, b) {
        if (a && b && (a instanceof RegExp && b instanceof RegExp || a instanceof URL && b instanceof URL)) {
            return String(a) === String(b);
        }
        if (a instanceof Date && b instanceof Date) {
            const aTime = a.getTime();
            const bTime = b.getTime();
            if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
                return true;
            }
            return aTime === bTime;
        }
        if (typeof a === "number" && typeof b === "number") {
            return Number.isNaN(a) && Number.isNaN(b) || a === b;
        }
        if (Object.is(a, b)) {
            return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
            if (a && b && !constructorsEqual(a, b)) {
                return false;
            }
            if (a instanceof WeakMap || b instanceof WeakMap) {
                if (!(a instanceof WeakMap && b instanceof WeakMap)) return false;
                throw new TypeError("cannot compare WeakMap instances");
            }
            if (a instanceof WeakSet || b instanceof WeakSet) {
                if (!(a instanceof WeakSet && b instanceof WeakSet)) return false;
                throw new TypeError("cannot compare WeakSet instances");
            }
            if (seen.get(a) === b) {
                return true;
            }
            if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
                return false;
            }
            if (isKeyedCollection(a) && isKeyedCollection(b)) {
                if (a.size !== b.size) {
                    return false;
                }
                let unmatchedEntries = a.size;
                for (const [aKey, aValue] of a.entries()){
                    for (const [bKey, bValue] of b.entries()){
                        if (aKey === aValue && bKey === bValue && compare(aKey, bKey) || compare(aKey, bKey) && compare(aValue, bValue)) {
                            unmatchedEntries--;
                        }
                    }
                }
                return unmatchedEntries === 0;
            }
            const merged = {
                ...a,
                ...b
            };
            for (const key of [
                ...Object.getOwnPropertyNames(merged),
                ...Object.getOwnPropertySymbols(merged), 
            ]){
                if (!compare(a && a[key], b && b[key])) {
                    return false;
                }
                if (key in a && !(key in b) || key in b && !(key in a)) {
                    return false;
                }
            }
            seen.set(a, b);
            if (a instanceof WeakRef || b instanceof WeakRef) {
                if (!(a instanceof WeakRef && b instanceof WeakRef)) return false;
                return compare(a.deref(), b.deref());
            }
            return true;
        }
        return false;
    }(c, d);
}
function constructorsEqual(a, b) {
    return a.constructor === b.constructor || a.constructor === Object && !b.constructor || !a.constructor && b.constructor === Object;
}
function clamp(min, num, max) {
    return Math.max(min, Math.min(num, max));
}
function countIndent(text) {
    return text.length - text.trimStart().length;
}
function selectedTextFromLines(lines3, selection) {
    const text = lines3.slice(selection.start.line, selection.end.line + 1).map((l)=>l.text
    );
    const start = text[0].slice(0, selection.start.column);
    const end = text[text.length - 1].slice(selection.end.column);
    text[text.length - 1] = text[text.length - 1].slice(0, selection.end.column);
    text[0] = text[0].slice(selection.start.column, text[0].length);
    const selected = text.join("\n");
    return [
        start,
        selected,
        end
    ];
}
const className = "input";
function getInputElement() {
    const e = document.getElementsByClassName(className);
    return e[0] instanceof HTMLTextAreaElement ? e[0] : void 0;
}
function TextInput({ editor: editor1 , cursorView  }) {
    const [isComposition, setComposition] = Me1(false);
    const handleInput = ()=>{
        if (isComposition) {
            return;
        }
        const textarea = getInputElement();
        if (textarea == null) {
            throw Error("textarea == null");
        }
        editor1.input(textarea.value);
        textarea.value = "";
    };
    const handleCompositionStart = je(()=>{
        setComposition(true);
    }, []);
    const handleCompositionEnd = je(()=>{
        setComposition(false);
        handleInput();
    }, []);
    const handleKeyDown = je((e)=>{
        let prevent = true;
        if (e.ctrlKey) {
            switch(e.key){
                default:
                    prevent = false;
            }
        } else if (e.altKey) {
            switch(e.key){
                default:
                    prevent = false;
            }
        } else {
            switch(e.key){
                case "Backspace":
                    editor1.backSpace();
                    break;
                default:
                    prevent = false;
            }
        }
        if (prevent) {
            e.preventDefault();
        }
    }, []);
    Fe(()=>{
        const textarea = getInputElement();
        if (textarea != null && cursorView.left > 0) {
            setTimeout(()=>textarea.focus()
            , 0);
        }
    }, [
        cursorView
    ]);
    we1(()=>{
        const textarea = getInputElement();
        if (textarea == null) {
            return;
        }
        const selection = editor1.selection;
        if (selection.start.line !== -1) {
            const [, text] = selectedTextFromLines(editor1.getLines(), selection);
            textarea.value = text;
            textarea.select();
        } else {
            textarea.value = "";
        }
    }, [
        editor1.selection
    ]);
    return Ue.createElement("textarea", {
        className: className,
        style: {
            position: "absolute",
            left: cursorView.left,
            top: cursorView.top,
            width: isComposition ? "auto" : 1,
            height: cursorView.height,
            lineHeight: cursorView.height,
            opacity: isComposition ? 1 : 0
        },
        onInput: handleInput,
        onKeyDown: handleKeyDown,
        onCompositionStart: handleCompositionStart,
        onCompositionEnd: handleCompositionEnd,
        spellCheck: "false",
        wrap: "off"
    });
}
function or(left, right) {
    function parse(input, context = Object.create(null)) {
        const result = left(input, context);
        if (result.ok) {
            return result;
        } else {
            return right(input, context);
        }
    }
    parse.left = left;
    parse.right = right;
    return parse;
}
function choice(...parsers1) {
    function parse(input, context = Object.create(null)) {
        const { parsers  } = parse;
        const lastIndex = parsers.length - 1;
        for(let i = 0; i < lastIndex; i += 1){
            const result = parsers[i](input, context);
            if (result.ok) {
                return result;
            }
        }
        return parsers[lastIndex](input, context);
    }
    parse.parsers = parsers1;
    return parse;
}
var ErrorKind;
(function(ErrorKind1) {
    ErrorKind1[ErrorKind1["NoError"] = 0] = "NoError";
    ErrorKind1[ErrorKind1["Char"] = 1] = "Char";
    ErrorKind1[ErrorKind1["AnyChar"] = 2] = "AnyChar";
    ErrorKind1[ErrorKind1["OneOfChars"] = 3] = "OneOfChars";
    ErrorKind1[ErrorKind1["NoneOfChars"] = 4] = "NoneOfChars";
    ErrorKind1[ErrorKind1["EscapedWith"] = 5] = "EscapedWith";
    ErrorKind1[ErrorKind1["EscapedBy"] = 6] = "EscapedBy";
    ErrorKind1[ErrorKind1["String"] = 7] = "String";
    ErrorKind1[ErrorKind1["Octal"] = 8] = "Octal";
    ErrorKind1[ErrorKind1["Digit"] = 9] = "Digit";
    ErrorKind1[ErrorKind1["Hex"] = 10] = "Hex";
    ErrorKind1[ErrorKind1["LowerHex"] = 11] = "LowerHex";
    ErrorKind1[ErrorKind1["UpperHex"] = 12] = "UpperHex";
    ErrorKind1[ErrorKind1["Alphabet"] = 13] = "Alphabet";
    ErrorKind1[ErrorKind1["LowerAlphabet"] = 14] = "LowerAlphabet";
    ErrorKind1[ErrorKind1["UpperAlphabet"] = 15] = "UpperAlphabet";
    ErrorKind1[ErrorKind1["Byte"] = 16] = "Byte";
    ErrorKind1[ErrorKind1["AnyByte"] = 17] = "AnyByte";
    ErrorKind1[ErrorKind1["Slice"] = 18] = "Slice";
    ErrorKind1[ErrorKind1["Space"] = 19] = "Space";
    ErrorKind1[ErrorKind1["CarriageReturn"] = 20] = "CarriageReturn";
    ErrorKind1[ErrorKind1["LineFeed"] = 21] = "LineFeed";
    ErrorKind1[ErrorKind1["CarriageReturnLineFeed"] = 22] = "CarriageReturnLineFeed";
    ErrorKind1[ErrorKind1["Linebreak"] = 23] = "Linebreak";
    ErrorKind1[ErrorKind1["Tab"] = 24] = "Tab";
    ErrorKind1[ErrorKind1["Whitespace"] = 25] = "Whitespace";
    ErrorKind1[ErrorKind1["EndOfFile"] = 26] = "EndOfFile";
    ErrorKind1[ErrorKind1["Many"] = 27] = "Many";
    ErrorKind1[ErrorKind1["SepBy"] = 28] = "SepBy";
    ErrorKind1[ErrorKind1["SepEndBy"] = 29] = "SepEndBy";
    ErrorKind1[ErrorKind1["Satisfy"] = 30] = "Satisfy";
    ErrorKind1[ErrorKind1["MissingPositionContext"] = 31] = "MissingPositionContext";
})(ErrorKind || (ErrorKind = {}));
function __byte(byte1) {
    function parse(input, context = Object.create(null)) {
        if (input[0] === parse.byte) {
            return {
                ok: true,
                input: input.subarray(1),
                output: parse.byte,
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Byte,
                context
            };
        }
    }
    parse.byte = byte1;
    return parse;
}
function anyByte() {
    return (input, context = Object.create(null))=>{
        if (input.length === 0) {
            return {
                ok: false,
                input,
                error: ErrorKind.AnyByte,
                context
            };
        } else {
            return {
                ok: true,
                input: input.subarray(1),
                output: input[0],
                context
            };
        }
    };
}
function slice(slice1) {
    function parse(input, context = Object.create(null)) {
        const { slice: slice2  } = parse;
        const max = slice2.length;
        for(let i = 0; i < max; i += 1){
            if (slice2[i] !== input[i]) {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.Slice,
                    context
                };
            }
        }
        return {
            ok: true,
            input: input.slice(max),
            output: slice2,
            context
        };
    }
    parse.slice = slice1;
    return parse;
}
function ensureSingleCharacter(str) {
    if (str.length !== 1) {
        throw new TypeError("Argument of character parser must be a single character.");
    }
}
function __char(char1) {
    ensureSingleCharacter(char1);
    function parse(input, context = Object.create(null)) {
        const { char: char2 , charCode  } = parse;
        if (input.charCodeAt(0) === charCode) {
            return {
                ok: true,
                input: input.slice(1),
                output: char2,
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Char,
                context
            };
        }
    }
    parse.char = char1;
    parse.charCode = char1.charCodeAt(0);
    return parse;
}
function anyChar() {
    return (input, context = Object.create(null))=>{
        if (input === "") {
            return {
                ok: false,
                input,
                error: ErrorKind.AnyChar,
                context
            };
        } else {
            return {
                ok: true,
                input: input.slice(1),
                output: input.charAt(0),
                context
            };
        }
    };
}
function oneOfChars(...chars) {
    chars.forEach(ensureSingleCharacter);
    function parse(input, context = Object.create(null)) {
        const firstCharCode = input.charCodeAt(0);
        if (parse.charCodes.includes(firstCharCode)) {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.OneOfChars,
                context
            };
        }
    }
    parse.charCodes = chars.map((char3)=>char3.charCodeAt(0)
    );
    return parse;
}
function noneOfChars(...chars) {
    chars.forEach(ensureSingleCharacter);
    function parse(input, context = Object.create(null)) {
        const firstCharCode = input.charCodeAt(0);
        if (parse.charCodes.includes(firstCharCode)) {
            return {
                ok: false,
                input,
                error: ErrorKind.NoneOfChars,
                context
            };
        } else {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        }
    }
    parse.charCodes = chars.map((char4)=>char4.charCodeAt(0)
    );
    return parse;
}
function escapedWith(controlChar, entries) {
    ensureSingleCharacter(controlChar);
    entries.forEach(([key])=>ensureSingleCharacter(key)
    );
    function parse(input, context = Object.create(null)) {
        const firstCharCode = input.charCodeAt(0);
        if (firstCharCode === parse.controlCharCode) {
            const value = parse.map.get(input.charCodeAt(1));
            if (value !== undefined) {
                return {
                    ok: true,
                    input: input.slice(2),
                    output: value,
                    context
                };
            } else {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.EscapedWith,
                    context
                };
            }
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.EscapedWith,
                context
            };
        }
    }
    parse.controlCharCode = controlChar.charCodeAt(0);
    parse.map = new Map(entries.map(([key, value])=>[
            key.charCodeAt(0),
            value
        ]
    ));
    return parse;
}
function escapedBy(controlChar, transformer1) {
    ensureSingleCharacter(controlChar);
    function parse(input, context = Object.create(null)) {
        if (input.length < 2) {
            return {
                ok: false,
                input,
                error: ErrorKind.EscapedBy,
                context
            };
        }
        const { controlCharCode , transformer  } = parse;
        const firstCharCode = input.charCodeAt(0);
        if (firstCharCode === controlCharCode) {
            const output = transformer(input[1]);
            if (output !== null && output !== undefined) {
                return {
                    ok: true,
                    input: input.slice(2),
                    output: output,
                    context
                };
            } else {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.EscapedBy,
                    context
                };
            }
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.EscapedBy,
                context
            };
        }
    }
    parse.controlCharCode = controlChar.charCodeAt(0);
    parse.transformer = transformer1;
    return parse;
}
function string(literal1) {
    function parse(input, context = Object.create(null)) {
        const { literal  } = parse;
        if (input.slice(0, literal.length) === literal) {
            return {
                ok: true,
                input: input.slice(literal.length),
                output: literal,
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.String,
                context
            };
        }
    }
    parse.literal = literal1;
    return parse;
}
function octal() {
    return (input, context = Object.create(null))=>{
        const charCode = input.charCodeAt(0);
        if (charCode >= 48 && charCode <= 55) {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Octal,
                context
            };
        }
    };
}
function digit() {
    return (input, context = Object.create(null))=>{
        const charCode = input.charCodeAt(0);
        if (charCode >= 48 && charCode <= 57) {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Digit,
                context
            };
        }
    };
}
function hex(hexCase1 = "both") {
    function parse(input, context = Object.create(null)) {
        const charCode = input.charCodeAt(0);
        if (charCode >= 48 && charCode <= 57) {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        }
        const { hexCase  } = parse;
        if (hexCase === "both") {
            if (charCode >= 65 && charCode <= 70) {
                return {
                    ok: true,
                    input: input.slice(1),
                    output: input[0],
                    context
                };
            } else if (charCode >= 97 && charCode <= 102) {
                return {
                    ok: true,
                    input: input.slice(1),
                    output: input[0],
                    context
                };
            } else {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.Hex,
                    context
                };
            }
        } else if (hexCase === "upper") {
            if (charCode >= 65 && charCode <= 70) {
                return {
                    ok: true,
                    input: input.slice(1),
                    output: input[0],
                    context
                };
            } else if (charCode >= 97 && charCode <= 102) {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.UpperHex,
                    context
                };
            } else {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.Hex,
                    context
                };
            }
        } else {
            if (charCode >= 97 && charCode <= 102) {
                return {
                    ok: true,
                    input: input.slice(1),
                    output: input[0],
                    context
                };
            } else if (charCode >= 65 && charCode <= 70) {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.LowerHex,
                    context
                };
            } else {
                return {
                    ok: false,
                    input,
                    error: ErrorKind.Hex,
                    context
                };
            }
        }
    }
    parse.hexCase = hexCase1;
    return parse;
}
function alpha() {
    return (input, context = Object.create(null))=>{
        const charCode = input.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
            return {
                ok: true,
                input: input.slice(1),
                output: input.charAt(0),
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Alphabet,
                context
            };
        }
    };
}
function lower() {
    return (input, context = Object.create(null))=>{
        const charCode = input.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) {
            return {
                ok: true,
                input: input.slice(1),
                output: input.charAt(0),
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.LowerAlphabet,
                context
            };
        }
    };
}
function upper() {
    return (input, context = Object.create(null))=>{
        const charCode = input.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            return {
                ok: true,
                input: input.slice(1),
                output: input.charAt(0),
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.UpperAlphabet,
                context
            };
        }
    };
}
function map(parser, fn) {
    function parse(input, context = Object.create(null)) {
        const result = parse.parser(input, context);
        if (result.ok) {
            return {
                ...result,
                output: parse.fn(result.output)
            };
        } else {
            return result;
        }
    }
    parse.parser = parser;
    parse.fn = fn;
    return parse;
}
function mapErr(parser, fn) {
    function parse(input, context = Object.create(null)) {
        const result = parse.parser(input, context);
        if (result.ok) {
            return result;
        } else {
            return {
                ...result,
                error: parse.fn(result.error)
            };
        }
    }
    parse.parser = parser;
    parse.fn = fn;
    return parse;
}
function optional(parser) {
    function parse(input, context = Object.create(null)) {
        const result = parse.parser(input, context);
        if (result.ok) {
            return result;
        } else {
            return {
                ok: true,
                input,
                output: null,
                context: result.context
            };
        }
    }
    parse.parser = parser;
    return parse;
}
function satisfy(predicate) {
    function parse(input, context = Object.create(null)) {
        const first = input[0];
        if (parse.predicate(first)) {
            return {
                ok: true,
                input: input.slice(1),
                output: first,
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Satisfy,
                context
            };
        }
    }
    parse.predicate = predicate;
    return parse;
}
function lazy(fn) {
    function parse(input, context = Object.create(null)) {
        parse.parser ??= parse.fn();
        return parse.parser(input, context);
    }
    parse.fn = fn;
    parse.parser = null;
    return parse;
}
function many(parser, min1, max1) {
    if (min1 > max1) {
        throw new RangeError("Maximum value must be greater than minimum value.");
    }
    function parse(input, context = Object.create(null)) {
        const { min , max  } = parse;
        const output = [];
        let count = 0;
        let result = parser(input, context);
        while(result.ok && count < max){
            count += 1;
            input = result.input;
            context = result.context;
            output.push(result.output);
            result = parser(input, context);
        }
        if (count < min) {
            return {
                ok: false,
                input,
                error: {
                    kind: ErrorKind.Many,
                    output
                },
                context: context
            };
        } else {
            return {
                ok: true,
                input,
                output,
                context: context
            };
        }
    }
    parse.min = min1;
    parse.max = max1;
    return parse;
}
function many0(parser) {
    function parse(input, context = Object.create(null)) {
        const items = [];
        let result = parse.parser(input, context);
        while(result.ok){
            items.push(result.output);
            result = parser(result.input, result.context);
        }
        return {
            ok: true,
            input: result.input,
            output: items,
            context: result.context
        };
    }
    parse.parser = parser;
    return parse;
}
function many1(parser) {
    function parse(input, context = Object.create(null)) {
        const items = [];
        let result = parse.parser(input, context);
        if (!result.ok) {
            return result;
        }
        while(result.ok){
            items.push(result.output);
            result = parse.parser(result.input, result.context);
        }
        return {
            ok: true,
            input: result.input,
            output: items,
            context: result.context
        };
    }
    parse.parser = parser;
    return parse;
}
function manyUntil(parser1, end1) {
    function parse(input, context = Object.create(null)) {
        const { parser , end  } = parse;
        const output = [];
        while(true){
            const endResult = end(input, context);
            if (endResult.ok) {
                return {
                    ok: true,
                    input,
                    output,
                    context: context
                };
            }
            const result = parser(input, context);
            if (result.ok) {
                input = result.input;
                context = result.context;
                output.push(result.output);
            } else {
                return result;
            }
        }
    }
    parse.parser = parser1;
    parse.end = end1;
    return parse;
}
function sepBy(separator1, parser2, min2 = 0, max2 = Infinity) {
    if (min2 > max2) {
        throw new RangeError("Maximum value must be greater than minimum value.");
    }
    function parse(input, context = Object.create(null)) {
        const { min , max , parser , separator  } = parse;
        const output = [];
        let count = 0;
        let result = parser(input, context);
        while(result.ok && count < max){
            output.push(result.output);
            input = result.input;
            context = result.context;
            count += 1;
            const sep = separator(input, context);
            if (!sep.ok) {
                break;
            }
            result = parser(sep.input, sep.context);
        }
        if (count < min) {
            return {
                ok: false,
                input,
                error: {
                    kind: ErrorKind.SepBy,
                    output
                },
                context: context
            };
        } else {
            return {
                ok: true,
                input,
                output,
                context: context
            };
        }
    }
    parse.parser = parser2;
    parse.separator = separator1;
    parse.min = min2;
    parse.max = max2;
    return parse;
}
function sepBy1(separator2, parser3) {
    function parse(input, context = Object.create(null)) {
        const { parser , separator  } = parse;
        const output = [];
        let result = parser(input, context);
        if (!result.ok) {
            return result;
        }
        while(result.ok){
            output.push(result.output);
            input = result.input;
            context = result.context;
            const sep = separator(input, context);
            if (!sep.ok) {
                break;
            }
            result = parser(sep.input, context);
        }
        return {
            ok: true,
            input,
            output,
            context: context
        };
    }
    parse.parser = parser3;
    parse.separator = separator2;
    return parse;
}
function sepEndBy(separator3, parser4, min3 = 0, max3 = Infinity) {
    if (min3 > max3) {
        throw new RangeError("Maximum value must be greater than minimum value.");
    }
    function parse(input, context = Object.create(null)) {
        const { min , max , parser , separator  } = parse;
        const output = [];
        let count = 0;
        let result = parser(input, context);
        while(result.ok && count < max){
            output.push(result.output);
            input = result.input;
            context = result.context;
            count += 1;
            const sep = separator(input, context);
            input = sep.input;
            context = sep.context;
            if (!sep.ok) {
                break;
            }
            result = parser(input, context);
        }
        if (count < min) {
            return {
                ok: false,
                input,
                error: {
                    kind: ErrorKind.SepEndBy,
                    output
                },
                context: context
            };
        } else {
            return {
                ok: true,
                input,
                output,
                context: context
            };
        }
    }
    parse.parser = parser4;
    parse.separator = separator3;
    parse.min = min3;
    parse.max = max3;
    return parse;
}
function sepEndBy1(separator, parser) {
    function parse(input, context = Object.create(null)) {
        const output = [];
        let result = parser(input, context);
        if (!result.ok) {
            return result;
        }
        while(result.ok){
            output.push(result.output);
            input = result.input;
            context = result.context;
            const sep = separator(input, context);
            input = sep.input;
            context = sep.context;
            if (!sep.ok) {
                break;
            }
            result = parser(sep.input, context);
        }
        return {
            ok: true,
            input,
            output,
            context: context
        };
    }
    parse.parser = parser;
    parse.separator = separator;
    return parse;
}
function between(start, end, parser) {
    function parse(input, context = Object.create(null)) {
        const left = parse.start(input, context);
        if (!left.ok) {
            return left;
        }
        const mid = parse.parser(left.input, left.context);
        if (!mid.ok) {
            return mid;
        }
        const right = parse.end(mid.input, mid.context);
        if (!right.ok) {
            return right;
        }
        return {
            ok: true,
            input: right.input,
            output: mid.output,
            context: right.context
        };
    }
    parse.start = start;
    parse.parser = parser;
    parse.end = end;
    return parse;
}
function serial(...parsers) {
    function parse(input, context = Object.create(null)) {
        const output = [];
        for (const parser of parse.parsers){
            const result = parser(input, context);
            if (!result.ok) {
                return result;
            }
            input = result.input;
            context = result.context;
            output.push(result.output);
        }
        return {
            ok: true,
            input,
            output: output,
            context: context
        };
    }
    parse.parsers = parsers;
    return parse;
}
function prefix(prefix1, parser) {
    function parse(input, context = Object.create(null)) {
        const preceded = parse.prefix(input, context);
        if (!preceded.ok) {
            return preceded;
        }
        return parse.parser(preceded.input, preceded.context);
    }
    parse.parser = parser;
    parse.prefix = prefix1;
    return parse;
}
function suffix(parser, suffix1) {
    function parse(input, context = Object.create(null)) {
        const result = parser(input, context);
        if (!result.ok) {
            return result;
        }
        const terminated = suffix1(result.input, result.context);
        if (terminated.ok) {
            return {
                ...terminated,
                output: result.output
            };
        } else {
            return terminated;
        }
    }
    parse.parser = parser;
    parse.suffix = suffix1;
    return parse;
}
const positionCtxSymbol = Symbol("positionContext");
function withPositionCtx(parser) {
    function parse(input, context = Object.create(null)) {
        const positionCtx = {
            [positionCtxSymbol]: {
                position: {
                    offset: 0,
                    line: 1,
                    column: 0
                },
                lastInput: input
            }
        };
        return parse.parser(input, Object.assign(context, positionCtx));
    }
    parse.parser = parser;
    return parse;
}
function position() {
    return (input, context)=>{
        if (!context?.[positionCtxSymbol]) {
            return {
                ok: false,
                input,
                error: ErrorKind.MissingPositionContext,
                context: context
            };
        }
        const ctx = context[positionCtxSymbol];
        const position1 = Object.assign({}, ctx.position);
        const consumed = ctx.lastInput.slice(0, ctx.lastInput.length - input.length);
        const offset = consumed.length;
        position1.offset += offset;
        const lines4 = consumed.split(/\r?\n/);
        if (lines4.length === 1) {
            position1.column += offset;
        } else {
            const lastIndex = lines4.length - 1;
            position1.line += lastIndex;
            position1.column = lines4[lastIndex].length;
        }
        return {
            ok: true,
            input,
            output: position1,
            context: Object.assign({}, context, {
                [positionCtxSymbol]: {
                    position: position1,
                    lastInput: input
                }
            })
        };
    };
}
function spanned(parser) {
    return map(serial(position(), parser, position()), ([start, value, end])=>({
            value,
            start,
            end
        })
    );
}
function space() {
    return (input, context = Object.create(null))=>{
        if (input.charCodeAt(0) === 32) {
            return {
                ok: true,
                input: input.slice(1),
                output: " ",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Space,
                context
            };
        }
    };
}
function cr() {
    return (input, context = Object.create(null))=>{
        if (input.charCodeAt(0) === 13) {
            return {
                ok: true,
                input: input.slice(1),
                output: "\r",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.CarriageReturn,
                context
            };
        }
    };
}
function lf() {
    return (input, context = Object.create(null))=>{
        if (input.charCodeAt(0) === 10) {
            return {
                ok: true,
                input: input.slice(1),
                output: "\n",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.LineFeed,
                context
            };
        }
    };
}
function crlf() {
    return (input, context = Object.create(null))=>{
        if (input.charCodeAt(0) === 13 && input.charCodeAt(1) === 10) {
            return {
                ok: true,
                input: input.slice(2),
                output: "\r\n",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.CarriageReturnLineFeed,
                context
            };
        }
    };
}
function linebreak() {
    return (input, context = Object.create(null))=>{
        const firstCharCode = input.charCodeAt(0);
        if (firstCharCode === 10) {
            return {
                ok: true,
                input: input.slice(1),
                output: "\n",
                context
            };
        } else if (firstCharCode === 13 && input.charCodeAt(1) === 10) {
            return {
                ok: true,
                input: input.slice(2),
                output: "\r\n",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Linebreak,
                context
            };
        }
    };
}
function tab() {
    return (input, context = Object.create(null))=>{
        if (input.charCodeAt(0) === 9) {
            return {
                ok: true,
                input: input.slice(1),
                output: "\t",
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Tab,
                context
            };
        }
    };
}
const UNICODE_WHITESPACE = [
    9,
    10,
    11,
    12,
    13,
    32,
    133,
    160,
    5760,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8232,
    8233,
    8239,
    8287,
    12288, 
];
function whitespace() {
    return (input, context = Object.create(null))=>{
        if (UNICODE_WHITESPACE.includes(input.charCodeAt(0))) {
            return {
                ok: true,
                input: input.slice(1),
                output: input[0],
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.Whitespace,
                context
            };
        }
    };
}
function trim(parser) {
    function parse(input, context = Object.create(null)) {
        return parse.parser(input.trimStart(), context);
    }
    parse.parser = parser;
    return parse;
}
function eof() {
    return (input, context = Object.create(null))=>{
        if (input.length === 0) {
            return {
                ok: true,
                input,
                output: undefined,
                context
            };
        } else {
            return {
                ok: false,
                input,
                error: ErrorKind.EndOfFile,
                context
            };
        }
    };
}
const mod = {
    or,
    choice,
    byte: __byte,
    anyByte,
    slice,
    ErrorKind,
    char: __char,
    anyChar,
    oneOfChars,
    noneOfChars,
    escapedWith,
    escapedBy,
    string,
    octal,
    digit,
    hex,
    alpha,
    lower,
    upper,
    map,
    mapErr,
    optional,
    satisfy,
    lazy,
    many,
    many0,
    many1,
    manyUntil,
    sepBy,
    sepBy1,
    sepEndBy,
    sepEndBy1,
    withPositionCtx,
    position,
    spanned,
    between,
    serial,
    prefix,
    suffix,
    space,
    cr,
    lf,
    crlf,
    linebreak,
    tab,
    whitespace,
    trim,
    eof
};
const $node = mod.lazy(()=>mod.choice($bracket, $inlineCode, mod.anyChar())
);
const $bracket = mod.map(mod.between(mod.char("["), mod.char("]"), mod.manyUntil($node, mod.char("]"))), (inner)=>({
        type: "bracket",
        inner: [
            "[",
            ...inner,
            "]"
        ]
    })
);
const $inlineCode = mod.map(mod.between(mod.char("`"), mod.char("`"), mod.manyUntil(mod.anyChar(), mod.char("`"))), (inner)=>({
        type: "inlineCode",
        inner: [
            "`",
            ...inner,
            "`"
        ]
    })
);
const $line = mod.many0($node);
const urlRegexp = /\[(.*?)(https?:\/\/[^\s\]]+)(.*)\]/;
function processNode(parsed, counter) {
    if (typeof parsed === "string") {
        return {
            type: "character",
            character: parsed,
            index: counter(),
            notation: false
        };
    } else {
        const inner = parsed.inner.map((p)=>processNode(p, counter)
        );
        inner[0].notation = true;
        inner[inner.length - 1].notation = true;
        if (parsed.type === "inlineCode") {
            return {
                type: "inlineCode",
                inner
            };
        }
        if (String(parsed.inner[1]).match(/[*/-]/) && parsed.inner[2] === " ") {
            return {
                type: "decoration",
                decorationType: String(parsed.inner[1]),
                inner
            };
        }
        if (inner.every((n)=>n.type === "character"
        )) {
            const text = inner.map((n)=>n.character
            ).join("");
            const m = text.match(urlRegexp);
            if (m != null) {
                const url = m[2];
                const label = (m[1] + m[3]).trim();
                const labelStart = text.indexOf(label);
                const labelEnd = labelStart + label.length - 1;
                if (label !== "") {
                    for(let i = 0; i < inner.length; i++){
                        inner[i].notation = i < labelStart || labelEnd < i;
                    }
                }
                return {
                    type: "anchor",
                    url,
                    inner
                };
            }
            return {
                type: "bracket",
                text,
                inner
            };
        }
        return {
            type: "unknown",
            inner
        };
    }
}
function parseLine(line, codeBlockIndent = Number.POSITIVE_INFINITY) {
    const txt = line.trimStart();
    const indent = line.length - txt.length;
    const parsed = $line(txt);
    if (!parsed.ok) {
        throw Error("parse failed: " + line);
    }
    const counter = (()=>{
        let count = indent;
        return ()=>count++
        ;
    })();
    return [
        indent,
        parsed.output.map((p)=>processNode(p, counter)
        )
    ];
}
function getCharDOM(line, column) {
    const l = document.getElementsByClassName(`l-${line}`);
    const c = l[0]?.getElementsByClassName(`c-${column}`);
    return c?.[0];
}
const defaultPosition = {
    line: -1,
    column: -1
};
function positionFromElement(element1, clientX, clientY) {
    const line = element1.closest(".line");
    const lineMatch = line?.className.match(/l-(\d+)/);
    const lineIndex = parseInt(String(lineMatch?.[1]));
    if (isNaN(lineIndex)) {
        console.log("isNaN(lineIndex)");
        return defaultPosition;
    }
    const chars = Array.from(line.getElementsByClassName("char-index")).map((element)=>{
        const rect = element.getBoundingClientRect();
        const medX = rect.left + rect.width / 2;
        const medY = rect.top + rect.height / 2;
        const distance = Math.pow(clientX - medX, 2) + Math.pow(clientY - medY, 2);
        return {
            element,
            distance,
            medX
        };
    }).sort((a, b)=>a.distance - b.distance
    );
    if (chars.length === 0) {
        return defaultPosition;
    }
    const __char1 = chars[0];
    if (__char1.element.className.includes("dummy")) {
        return {
            line: lineIndex,
            column: 0
        };
    }
    const charMatch = __char1.element.className.match(/c-(\d+)/);
    const charIndex = parseInt(String(charMatch?.[1]));
    if (isNaN(charIndex)) {
        console.log("isNaN(charIndex)");
        return defaultPosition;
    }
    return {
        line: lineIndex,
        column: clientX < __char1.medX ? charIndex : charIndex + 1
    };
}
const Char = ({ column , notation , children , dummy  })=>Ue.createElement("span", {
        className: `char-index${dummy ? " dummy" : ""} ${notation ? "notation" : ""} c-${column}`
    }, children)
;
const Line = ({ line , cursor , children  })=>Ue.createElement("div", {
        className: `line l-${line} ${cursor ? "cursor-line" : ""}`
    }, children)
;
function mapToElement(node) {
    if (node.type === "character") {
        return Ue.createElement(Char, {
            key: node.index,
            column: node.index,
            notation: node.notation
        }, node.character);
    }
    const inner = node.inner.map(mapToElement);
    if (node.type === "bracket") {
        return Ue.createElement("a", {
            href: "blah"
        }, inner);
    }
    if (node.type === "anchor") {
        return Ue.createElement("a", {
            href: node.url
        }, inner);
    }
    if (node.type === "inlineCode") {
        return Ue.createElement("code", null, inner);
    }
    if (node.type === "decoration") {
        if (node.decorationType === "*") {
            return Ue.createElement("strong", null, inner);
        }
        if (node.decorationType === "/") {
            return Ue.createElement("i", null, inner);
        }
        if (node.decorationType === "-") {
            return Ue.createElement("del", null, inner);
        }
    }
    return Ue.createElement(Ue.Fragment, null, inner);
}
function LineView(props) {
    if (props.line.cache == null || props.line.text !== props.line.cache.key) {
        const [indent, node] = parseLine(props.line.text);
        const textDOM = node.map(mapToElement);
        if (textDOM.length === 0) {
            if (indent === 0) {
                textDOM.push(Ue.createElement(Char, {
                    column: 0,
                    dummy: true
                }, "\u200B"));
            } else {
                textDOM.push(Ue.createElement("br", null));
            }
        }
        if (indent !== 0) {
            const indentWidth = `${1.5 * indent}em`;
            const indentDOM = Array.from(Array(indent), (_, i)=>Ue.createElement(Char, {
                    key: i,
                    column: i
                }, Ue.createElement("span", {
                    className: "pad"
                }, " "))
            );
            indentDOM.push(Ue.createElement("span", {
                className: "dot"
            }));
            props.line.cache = {
                key: props.line.text,
                element: Ue.createElement(Ue.Fragment, null, Ue.createElement("span", {
                    className: "indent-mark",
                    style: {
                        width: indentWidth
                    }
                }, indentDOM), Ue.createElement("span", {
                    className: "indent",
                    style: {
                        marginLeft: indentWidth
                    }
                }, textDOM))
            };
        } else {
            props.line.cache = {
                key: props.line.text,
                element: Ue.createElement(Ue.Fragment, null, textDOM)
            };
        }
    }
    return Ue.createElement(Line, {
        line: props.lnum,
        cursor: props.cursor
    }, props.line.cache.element);
}
function getAbsoluteRect(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
    };
}
const defaultSelection = {
    start: defaultPosition,
    end: defaultPosition
};
const defaultSelectionProps = {
    top: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    },
    center: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    },
    bottom: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    }
};
const Rect = ({ rect  })=>Ue.createElement("div", {
        style: {
            position: "absolute",
            pointerEvents: "none",
            backgroundColor: "green",
            opacity: ".4",
            ...rect
        }
    })
;
function SelectionView(props) {
    return Ue.createElement("span", null, Ue.createElement(Rect, {
        rect: props.top
    }), Ue.createElement(Rect, {
        rect: props.center
    }), Ue.createElement(Rect, {
        rect: props.bottom
    }));
}
class Editor {
    cursor;
    selection;
    callback;
    constructor(revision){
        this.revision = revision;
        this.cursor = defaultPosition;
        this.selection = defaultSelection;
        this.callback = ()=>console.log("callback was not defined")
        ;
    }
    commitChanges(changes) {
        this.revision = applyCommit(this.revision, {
            id: String(generate()),
            parentID: this.revision.id,
            changes
        });
    }
    getLines() {
        return this.revision.lines;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    setCursor(cursor) {
        this.cursor = cursor;
        this.callback();
    }
    setSelection(selection) {
        this.selection = selection;
        this.callback();
    }
    input(str) {
        const lines5 = this.getLines();
        if (this.selection.start.line === -1) {
            const currentCursorLine = lines5.at(this.cursor.line);
            if (!currentCursorLine) return;
            const cursorLine = currentCursorLine;
            const indentStr = cursorLine.text.slice(0, countIndent(cursorLine.text));
            const a = cursorLine.text.slice(0, this.cursor.column);
            const b = cursorLine.text.slice(this.cursor.column, cursorLine.text.length);
            const newLines = (a + str.split("\n").map((line, index)=>index === 0 ? line : `${indentStr}${line}`
            ).join("\n") + b).split("\n");
            this.commitChanges([
                ...makeChanges(lines5, this.cursor.line, this.cursor.line, newLines), 
            ]);
            this.cursor = {
                line: this.cursor.line + newLines.length - 1,
                column: (newLines.at(-1)?.length ?? 0) - b.length
            };
        } else {
            const [start, , end] = selectedTextFromLines(lines5, this.selection);
            const newLines = (start + str + end).split("\n");
            this.commitChanges([
                ...makeChanges(lines5, this.selection.start.line, this.selection.end.line, newLines), 
            ]);
            this.cursor = {
                line: this.selection.start.line + (newLines.length - 1),
                column: newLines[newLines.length - 1].length - end.length
            };
            this.selection = defaultSelection;
        }
        this.callback();
    }
    backSpace() {
        const lines6 = this.getLines();
        const currentLine = lines6[this.cursor.line];
        if (this.cursor.column === 0) {
            if (this.cursor.line === 0) {
                return;
            }
            const previousLine = lines6[this.cursor.line - 1];
            this.commitChanges([
                ...makeChanges(lines6, this.cursor.line - 1, this.cursor.line, [
                    previousLine.text + currentLine.text, 
                ]), 
            ]);
            this.cursor = {
                line: this.cursor.line - 1,
                column: previousLine.text.length
            };
        } else {
            const text = currentLine.text;
            this.commitChanges([
                ...makeChanges(lines6, this.cursor.line, this.cursor.line, [
                    text.slice(0, this.cursor.column - 1) + text.slice(this.cursor.column, text.length), 
                ]), 
            ]);
            this.cursor = {
                line: this.cursor.line,
                column: this.cursor.column - 1
            };
        }
        this.callback();
    }
    revision;
}
function EditorView(props) {
    const { editor: editor2  } = props;
    const { cursor , selection: selection1  } = editor2;
    const [, reRender] = Me1(1);
    we1(()=>{
        editor2.setCallback(()=>reRender(Math.random())
        );
    }, []);
    const lines7 = props.editor.getLines();
    const [cursorView, setCursorView] = Me1({
        left: 0,
        top: 0,
        height: 0
    });
    const selectionStart = De(defaultPosition);
    const [selectionView, setSelectionView] = Me1(defaultSelectionProps);
    const handleClick = je((e)=>{
        const t = e.target;
        const anchor = t.closest("a");
        if (anchor != null) {
            console.log(anchor);
            if (anchor.closest(".cursor-line") != null) {
                console.log("prevent");
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, []);
    const handleMouseDown = je((e)=>{
        const pos = positionFromElement(e.target, e.clientX, e.clientY);
        const t = e.target;
        const anchor = t.closest("a");
        if (anchor != null && pos.line !== editor2.cursor.line) {
            e.preventDefault();
            return;
        }
        editor2.setCursor(pos);
        editor2.setSelection(defaultSelection);
        selectionStart.current = pos;
        setSelectionView(defaultSelectionProps);
    }, []);
    Fe(()=>{
        const len = lines7[cursor.line]?.text.length ?? -1;
        const col = clamp(0, cursor.column, len - 1);
        const __char2 = getCharDOM(cursor.line, col);
        if (__char2 == null) {
            console.log("cursorView: char == null");
            setCursorView({
                left: 0,
                top: 0,
                height: 0
            });
            return;
        }
        const rect = getAbsoluteRect(__char2);
        const absoluteX = rect.left + (cursor.column === len ? rect.width : 0);
        const absoluteY = rect.top;
        setCursorView({
            left: absoluteX,
            top: absoluteY,
            height: rect.height
        });
    }, [
        cursor
    ]);
    const handleMouseMove = je((e)=>{
        if (e.buttons !== 1) {
            return;
        }
        const pos = positionFromElement(e.target, e.clientX, e.clientY);
        if (pos.line === -1) return;
        const selection = [
            pos,
            selectionStart.current
        ].sort((a, b)=>{
            if (a.line !== b.line) {
                return a.line - b.line;
            }
            return a.column - b.column;
        });
        if (equal(selection[0], selection[1])) {
            editor2.setSelection(defaultSelection);
        } else {
            editor2.setSelection({
                start: selection[0],
                end: selection[1]
            });
        }
        editor2.setCursor(pos);
    }, []);
    Fe(()=>{
        const startlen = lines7[selection1.start.line]?.text.length ?? -1;
        const startcol = clamp(0, selection1.start.column, startlen - 1);
        const start = getCharDOM(selection1.start.line, startcol);
        const endlen = lines7[selection1.end.line]?.text.length ?? -1;
        const endcol = clamp(0, selection1.end.column, endlen - 1);
        const end = getCharDOM(selection1.end.line, endcol);
        if (!start || !end) {
            setSelectionView(defaultSelectionProps);
            return;
        }
        const startRect = getAbsoluteRect(start);
        const endRect = getAbsoluteRect(end);
        if (endRect.top < startRect.top + startRect.height / 2) {
            const view = {
                ...startRect,
                width: endRect.left + (selection1.end.column === endlen ? endRect.width : 0) - startRect.left
            };
            setSelectionView({
                ...defaultSelectionProps,
                center: view
            });
        } else {
            const lineView = document.getElementsByClassName("line").item(0);
            const lineRect = getAbsoluteRect(lineView);
            const topLeft = startRect.left + (selection1.start.column === startlen ? startRect.width : 0);
            const top = {
                ...startRect,
                left: topLeft,
                width: lineRect.left + lineRect.width - topLeft
            };
            const center = {
                ...lineRect,
                top: startRect.top + startRect.height,
                height: endRect.top - (startRect.top + startRect.height)
            };
            const bottom = {
                ...endRect,
                left: lineRect.left,
                width: endRect.left - lineRect.left + (selection1.end.column === endlen ? endRect.width : 0)
            };
            setSelectionView({
                top,
                center,
                bottom
            });
        }
    }, [
        selection1
    ]);
    return Ue.createElement("span", {
        className: "editor",
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove
    }, Ue.createElement("span", {
        className: "cursor",
        style: {
            left: cursorView.left,
            top: cursorView.top,
            height: `${cursorView.height}px`
        }
    }), Ue.createElement(SelectionView, Object.assign({}, selectionView)), Ue.createElement(TextInput, {
        editor: editor2,
        cursorView: cursorView
    }), Ue.createElement("span", null, lines7.map((line, index)=>Ue.createElement(LineView, {
            key: line.id,
            line: line,
            lnum: index,
            cursor: index === editor2.cursor.line
        })
    )));
}
const lines = [
    "[denote https://github.com/kuuote/denote]のデモです",
    "\t[https://scrapbox.io/help-jp/ブラケティング Scrapboxの記法]に似た物をいくつかサポートしています",
    "\t\t[リンク]",
    "\t\t[* 太字]",
    "\t\t[/ 斜体]",
    "\t\t[- 打ち消し]",
    "\t\t`コードブロック`", 
].map((e)=>({
        text: e,
        id: String(generate())
    })
);
const editor = new Editor({
    id: String(generate()),
    lines
});
window.editor = editor;
const root = document.getElementById("react-root");
Qf.render(Ue.createElement(EditorView, {
    editor: editor
}), root);
