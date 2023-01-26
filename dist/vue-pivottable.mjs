function Wo(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function ar(t) {
  if (k(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = jt(r) ? Jo(r) : ar(r);
      if (i)
        for (const o in i)
          e[o] = i[o];
    }
    return e;
  } else {
    if (jt(t))
      return t;
    if (vt(t))
      return t;
  }
}
const Ko = /;(?![^(]*\))/g, Yo = /:([^]+)/, Xo = /\/\*.*?\*\//gs;
function Jo(t) {
  const e = {};
  return t.replace(Xo, "").split(Ko).forEach((n) => {
    if (n) {
      const r = n.split(Yo);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function lr(t) {
  let e = "";
  if (jt(t))
    e = t;
  else if (k(t))
    for (let n = 0; n < t.length; n++) {
      const r = lr(t[n]);
      r && (e += r + " ");
    }
  else if (vt(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const zt = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const _r = () => {
}, Zo = () => !1, Qo = /^on[^a-z]/, ko = (t) => Qo.test(t), $t = Object.assign, _o = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, qo = Object.prototype.hasOwnProperty, lt = (t, e) => qo.call(t, e), k = Array.isArray, be = (t) => wn(t) === "[object Map]", ti = (t) => wn(t) === "[object Set]", bt = (t) => typeof t == "function", jt = (t) => typeof t == "string", ur = (t) => typeof t == "symbol", vt = (t) => t !== null && typeof t == "object", ei = (t) => vt(t) && bt(t.then) && bt(t.catch), ni = Object.prototype.toString, wn = (t) => ni.call(t), qr = (t) => wn(t).slice(8, -1), ri = (t) => wn(t) === "[object Object]", cr = (t) => jt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, oi = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, ii = oi((t) => t.charAt(0).toUpperCase() + t.slice(1)), dn = (t, e) => !Object.is(t, e), si = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ai = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Cr;
const li = () => Cr || (Cr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tr(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let ui;
function ci(t, e = ui) {
  e && e.active && e.effects.push(t);
}
const Kn = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, to = (t) => (t.w & kt) > 0, eo = (t) => (t.n & kt) > 0, fi = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= kt;
}, di = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      to(i) && !eo(i) ? i.delete(t) : e[n++] = i, i.w &= ~kt, i.n &= ~kt;
    }
    e.length = n;
  }
}, Yn = /* @__PURE__ */ new WeakMap();
let Te = 0, kt = 1;
const Xn = 30;
let St;
const ie = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Jn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class pi {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ci(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = St, n = se;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = St, St = this, se = !0, kt = 1 << ++Te, Te <= Xn ? fi(this) : Nr(this), this.fn();
    } finally {
      Te <= Xn && di(this), kt = 1 << --Te, St = this.parent, se = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    St === this ? this.deferStop = !0 : this.active && (Nr(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Nr(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let se = !0;
const no = [];
function ro() {
  no.push(se), se = !1;
}
function oo() {
  const t = no.pop();
  se = t === void 0 ? !0 : t;
}
function Nt(t, e, n) {
  if (se && St) {
    let r = Yn.get(t);
    r || Yn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Kn());
    const o = process.env.NODE_ENV !== "production" ? { effect: St, target: t, type: e, key: n } : void 0;
    hi(i, o);
  }
}
function hi(t, e) {
  let n = !1;
  Te <= Xn ? eo(t) || (t.n |= kt, n = !to(t)) : n = !t.has(St), n && (t.add(St), St.deps.push(t), process.env.NODE_ENV !== "production" && St.onTrack && St.onTrack(Object.assign({ effect: St }, e)));
}
function _t(t, e, n, r, i, o) {
  const s = Yn.get(t);
  if (!s)
    return;
  let a = [];
  if (e === "clear")
    a = [...s.values()];
  else if (n === "length" && k(t)) {
    const u = ai(r);
    s.forEach((f, c) => {
      (c === "length" || c >= u) && a.push(f);
    });
  } else
    switch (n !== void 0 && a.push(s.get(n)), e) {
      case "add":
        k(t) ? cr(n) && a.push(s.get("length")) : (a.push(s.get(ie)), be(t) && a.push(s.get(Jn)));
        break;
      case "delete":
        k(t) || (a.push(s.get(ie)), be(t) && a.push(s.get(Jn)));
        break;
      case "set":
        be(t) && a.push(s.get(ie));
        break;
    }
  const l = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: o } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? We(a[0], l) : We(a[0]));
  else {
    const u = [];
    for (const f of a)
      f && u.push(...f);
    process.env.NODE_ENV !== "production" ? We(Kn(u), l) : We(Kn(u));
  }
}
function We(t, e) {
  const n = k(t) ? t : [...t];
  for (const r of n)
    r.computed && Ir(r, e);
  for (const r of n)
    r.computed || Ir(r, e);
}
function Ir(t, e) {
  (t !== St || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger($t({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const gi = /* @__PURE__ */ Wo("__proto__,__v_isRef,__isVue"), io = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ur)
), mi = /* @__PURE__ */ fr(), vi = /* @__PURE__ */ fr(!0), bi = /* @__PURE__ */ fr(!0, !0), Ar = /* @__PURE__ */ yi();
function yi() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = W(this);
      for (let o = 0, s = this.length; o < s; o++)
        Nt(r, "get", o + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(W)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      ro();
      const r = W(this)[e].apply(this, n);
      return oo(), r;
    };
  }), t;
}
function fr(t = !1, e = !1) {
  return function(r, i, o) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && o === (t ? e ? co : uo : e ? $i : lo).get(r))
      return r;
    const s = k(r);
    if (!t && s && lt(Ar, i))
      return Reflect.get(Ar, i, o);
    const a = Reflect.get(r, i, o);
    return (ur(i) ? io.has(i) : gi(i)) || (t || Nt(r, "get", i), e) ? a : xt(a) ? s && cr(i) ? a : a.value : vt(a) ? t ? po(a) : fo(a) : a;
  };
}
const Si = /* @__PURE__ */ xi();
function xi(t = !1) {
  return function(n, r, i, o) {
    let s = n[r];
    if (fe(s) && xt(s) && !xt(i))
      return !1;
    if (!t && (!Zn(i) && !fe(i) && (s = W(s), i = W(i)), !k(n) && xt(s) && !xt(i)))
      return s.value = i, !0;
    const a = k(n) && cr(r) ? Number(r) < n.length : lt(n, r), l = Reflect.set(n, r, i, o);
    return n === W(o) && (a ? dn(i, s) && _t(n, "set", r, i, s) : _t(n, "add", r, i)), l;
  };
}
function Ei(t, e) {
  const n = lt(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && _t(t, "delete", e, void 0, r), i;
}
function wi(t, e) {
  const n = Reflect.has(t, e);
  return (!ur(e) || !io.has(e)) && Nt(t, "has", e), n;
}
function Oi(t) {
  return Nt(t, "iterate", k(t) ? "length" : ie), Reflect.ownKeys(t);
}
const Di = {
  get: mi,
  set: Si,
  deleteProperty: Ei,
  has: wi,
  ownKeys: Oi
}, so = {
  get: vi,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Tr(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Tr(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, Ci = /* @__PURE__ */ $t({}, so, {
  get: bi
}), dr = (t) => t, On = (t) => Reflect.getPrototypeOf(t);
function Ke(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = W(t), o = W(e);
  n || (e !== o && Nt(i, "get", e), Nt(i, "get", o));
  const { has: s } = On(i), a = r ? dr : n ? mr : gr;
  if (s.call(i, e))
    return a(t.get(e));
  if (s.call(i, o))
    return a(t.get(o));
  t !== i && t.get(e);
}
function Ye(t, e = !1) {
  const n = this.__v_raw, r = W(n), i = W(t);
  return e || (t !== i && Nt(r, "has", t), Nt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Xe(t, e = !1) {
  return t = t.__v_raw, !e && Nt(W(t), "iterate", ie), Reflect.get(t, "size", t);
}
function Fr(t) {
  t = W(t);
  const e = W(this);
  return On(e).has.call(e, t) || (e.add(t), _t(e, "add", t, t)), this;
}
function Mr(t, e) {
  e = W(e);
  const n = W(this), { has: r, get: i } = On(n);
  let o = r.call(n, t);
  o ? process.env.NODE_ENV !== "production" && ao(n, r, t) : (t = W(t), o = r.call(n, t));
  const s = i.call(n, t);
  return n.set(t, e), o ? dn(e, s) && _t(n, "set", t, e, s) : _t(n, "add", t, e), this;
}
function Pr(t) {
  const e = W(this), { has: n, get: r } = On(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && ao(e, n, t) : (t = W(t), i = n.call(e, t));
  const o = r ? r.call(e, t) : void 0, s = e.delete(t);
  return i && _t(e, "delete", t, void 0, o), s;
}
function Rr() {
  const t = W(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? be(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && _t(t, "clear", void 0, void 0, n), r;
}
function Je(t, e) {
  return function(r, i) {
    const o = this, s = o.__v_raw, a = W(s), l = e ? dr : t ? mr : gr;
    return !t && Nt(a, "iterate", ie), s.forEach((u, f) => r.call(i, l(u), l(f), o));
  };
}
function Ze(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, o = W(i), s = be(o), a = t === "entries" || t === Symbol.iterator && s, l = t === "keys" && s, u = i[t](...r), f = n ? dr : e ? mr : gr;
    return !e && Nt(o, "iterate", l ? Jn : ie), {
      // iterator protocol
      next() {
        const { value: c, done: p } = u.next();
        return p ? { value: c, done: p } : {
          value: a ? [f(c[0]), f(c[1])] : f(c),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Gt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(`${ii(t)} operation ${n}failed: target is readonly.`, W(this));
    }
    return t === "delete" ? !1 : this;
  };
}
function Ti() {
  const t = {
    get(o) {
      return Ke(this, o);
    },
    get size() {
      return Xe(this);
    },
    has: Ye,
    add: Fr,
    set: Mr,
    delete: Pr,
    clear: Rr,
    forEach: Je(!1, !1)
  }, e = {
    get(o) {
      return Ke(this, o, !1, !0);
    },
    get size() {
      return Xe(this);
    },
    has: Ye,
    add: Fr,
    set: Mr,
    delete: Pr,
    clear: Rr,
    forEach: Je(!1, !0)
  }, n = {
    get(o) {
      return Ke(this, o, !0);
    },
    get size() {
      return Xe(this, !0);
    },
    has(o) {
      return Ye.call(this, o, !0);
    },
    add: Gt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Gt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Gt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Gt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Je(!0, !1)
  }, r = {
    get(o) {
      return Ke(this, o, !0, !0);
    },
    get size() {
      return Xe(this, !0);
    },
    has(o) {
      return Ye.call(this, o, !0);
    },
    add: Gt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Gt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Gt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Gt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Je(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = Ze(o, !1, !1), n[o] = Ze(o, !0, !1), e[o] = Ze(o, !1, !0), r[o] = Ze(o, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [Ni, Ii, Ai, Fi] = /* @__PURE__ */ Ti();
function pr(t, e) {
  const n = e ? t ? Fi : Ai : t ? Ii : Ni;
  return (r, i, o) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(lt(n, i) && i in r ? n : r, i, o);
}
const Mi = {
  get: /* @__PURE__ */ pr(!1, !1)
}, Pi = {
  get: /* @__PURE__ */ pr(!0, !1)
}, Ri = {
  get: /* @__PURE__ */ pr(!0, !0)
};
function ao(t, e, n) {
  const r = W(n);
  if (r !== n && e.call(t, r)) {
    const i = qr(t);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const lo = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap();
function ji(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Vi(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ji(qr(t));
}
function fo(t) {
  return fe(t) ? t : hr(t, !1, Di, Mi, lo);
}
function po(t) {
  return hr(t, !0, so, Pi, uo);
}
function Qe(t) {
  return hr(t, !0, Ci, Ri, co);
}
function hr(t, e, n, r, i) {
  if (!vt(t))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const s = Vi(t);
  if (s === 0)
    return t;
  const a = new Proxy(t, s === 2 ? r : n);
  return i.set(t, a), a;
}
function ae(t) {
  return fe(t) ? ae(t.__v_raw) : !!(t && t.__v_isReactive);
}
function fe(t) {
  return !!(t && t.__v_isReadonly);
}
function Zn(t) {
  return !!(t && t.__v_isShallow);
}
function Qn(t) {
  return ae(t) || fe(t);
}
function W(t) {
  const e = t && t.__v_raw;
  return e ? W(e) : t;
}
function Li(t) {
  return si(t, "__v_skip", !0), t;
}
const gr = (t) => vt(t) ? fo(t) : t, mr = (t) => vt(t) ? po(t) : t;
function xt(t) {
  return !!(t && t.__v_isRef === !0);
}
function zi(t) {
  return xt(t) ? t.value : t;
}
const Bi = {
  get: (t, e, n) => zi(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return xt(i) && !xt(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Ui(t) {
  return ae(t) ? t : new Proxy(t, Bi);
}
const le = [];
function Hi(t) {
  le.push(t);
}
function Gi() {
  le.pop();
}
function mt(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  ro();
  const n = le.length ? le[le.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Wi();
  if (r)
    ue(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: o }) => `at <${No(n, o.type)}>`).join(`
`),
      i
    ]);
  else {
    const o = [`[Vue warn]: ${t}`, ...e];
    i.length && o.push(`
`, ...Ki(i)), console.warn(...o);
  }
  oo();
}
function Wi() {
  let t = le[le.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const n = e[0];
    n && n.vnode === t ? n.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const r = t.component && t.component.parent;
    t = r && r.vnode;
  }
  return e;
}
function Ki(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...Yi(n));
  }), e;
}
function Yi({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${No(t.component, t.type, r)}`, o = ">" + n;
  return t.props ? [i, ...Xi(t.props), o] : [i + o];
}
function Xi(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...ho(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function ho(t, e, n) {
  return jt(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : xt(e) ? (e = ho(t, W(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : bt(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = W(e), n ? e : [`${t}=`, e]);
}
const go = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function ue(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (o) {
    mo(o, e, n);
  }
  return i;
}
function kn(t, e, n, r) {
  if (bt(t)) {
    const o = ue(t, e, n, r);
    return o && ei(o) && o.catch((s) => {
      mo(s, e, n);
    }), o;
  }
  const i = [];
  for (let o = 0; o < t.length; o++)
    i.push(kn(t[o], e, n, r));
  return i;
}
function mo(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const s = e.proxy, a = process.env.NODE_ENV !== "production" ? go[n] : n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](t, s, a) === !1)
            return;
      }
      o = o.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      ue(l, null, 10, [t, s, a]);
      return;
    }
  }
  Ji(t, n, i, r);
}
function Ji(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = go[e];
    if (n && Hi(n), mt(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Gi(), r)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let pn = !1, _n = !1;
const Pt = [];
let Yt = 0;
const ye = [];
let Lt = null, Wt = 0;
const vo = /* @__PURE__ */ Promise.resolve();
let vr = null;
const Zi = 100;
function Qi(t) {
  const e = vr || vo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ki(t) {
  let e = Yt + 1, n = Pt.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    ze(Pt[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function br(t) {
  (!Pt.length || !Pt.includes(t, pn && t.allowRecurse ? Yt + 1 : Yt)) && (t.id == null ? Pt.push(t) : Pt.splice(ki(t.id), 0, t), bo());
}
function bo() {
  !pn && !_n && (_n = !0, vr = vo.then(So));
}
function yo(t) {
  k(t) ? ye.push(...t) : (!Lt || !Lt.includes(t, t.allowRecurse ? Wt + 1 : Wt)) && ye.push(t), bo();
}
function _i(t) {
  if (ye.length) {
    const e = [...new Set(ye)];
    if (ye.length = 0, Lt) {
      Lt.push(...e);
      return;
    }
    for (Lt = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), Lt.sort((n, r) => ze(n) - ze(r)), Wt = 0; Wt < Lt.length; Wt++)
      process.env.NODE_ENV !== "production" && xo(t, Lt[Wt]) || Lt[Wt]();
    Lt = null, Wt = 0;
  }
}
const ze = (t) => t.id == null ? 1 / 0 : t.id, qi = (t, e) => {
  const n = ze(t) - ze(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function So(t) {
  _n = !1, pn = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), Pt.sort(qi);
  const e = process.env.NODE_ENV !== "production" ? (n) => xo(t, n) : _r;
  try {
    for (Yt = 0; Yt < Pt.length; Yt++) {
      const n = Pt[Yt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        ue(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    Yt = 0, Pt.length = 0, _i(t), pn = !1, vr = null, (Pt.length || ye.length) && So(t);
  }
}
function xo(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Zi) {
      const r = e.ownerInstance, i = r && To(r.type);
      return mt(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const xe = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (li().__VUE_HMR_RUNTIME__ = {
  createRecord: In(ts),
  rerender: In(es),
  reload: In(ns)
});
const hn = /* @__PURE__ */ new Map();
function ts(t, e) {
  return hn.has(t) ? !1 : (hn.set(t, {
    initialDef: Pe(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Pe(t) {
  return Io(t) ? t.__vccOpts : t;
}
function es(t, e) {
  const n = hn.get(t);
  n && (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, Pe(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function ns(t, e) {
  const n = hn.get(t);
  if (!n)
    return;
  e = Pe(e), $r(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const o = Pe(i.type);
    xe.has(o) || (o !== n.initialDef && $r(o, e), xe.add(o)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (xe.add(o), i.ceReload(e.styles), xe.delete(o)) : i.parent ? br(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  yo(() => {
    for (const i of r)
      xe.delete(Pe(i.type));
  });
}
function $r(t, e) {
  $t(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function In(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch (r) {
      console.error(r), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let Jt = null, rs = null;
const os = (t) => t.__isSuspense;
function is(t, e) {
  e && e.pendingBranch ? k(t) ? e.effects.push(...t) : e.effects.push(t) : yo(t);
}
const ke = {};
function ss(t, e, { immediate: n, deep: r, flush: i, onTrack: o, onTrigger: s } = zt) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && mt('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && mt('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (S) => {
    mt("Invalid watch source: ", S, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Se;
  let u, f = !1, c = !1;
  if (xt(t) ? (u = () => t.value, f = Zn(t)) : ae(t) ? (u = () => t, r = !0) : k(t) ? (c = !0, f = t.some((S) => ae(S) || Zn(S)), u = () => t.map((S) => {
    if (xt(S))
      return S.value;
    if (ae(S))
      return ge(S);
    if (bt(S))
      return ue(
        S,
        l,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && a(S);
  })) : bt(t) ? e ? u = () => ue(
    t,
    l,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(l && l.isUnmounted))
      return p && p(), kn(t, l, 3, [g]);
  } : (u = _r, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const S = u;
    u = () => ge(S());
  }
  let p, g = (S) => {
    p = x.onStop = () => {
      ue(
        S,
        l,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, d = c ? new Array(t.length).fill(ke) : ke;
  const h = () => {
    if (x.active)
      if (e) {
        const S = x.run();
        (r || f || (c ? S.some((T, $) => dn(T, d[$])) : dn(S, d))) && (p && p(), kn(e, l, 3, [
          S,
          // pass undefined as the old value when it's changed for the first time
          d === ke ? void 0 : c && d[0] === ke ? [] : d,
          g
        ]), d = S);
      } else
        x.run();
  };
  h.allowRecurse = !!e;
  let y;
  i === "sync" ? y = h : i === "post" ? y = () => Lr(h, l && l.suspense) : (h.pre = !0, l && (h.id = l.uid), y = () => br(h));
  const x = new pi(u, y);
  return process.env.NODE_ENV !== "production" && (x.onTrack = o, x.onTrigger = s), e ? n ? h() : d = x.run() : i === "post" ? Lr(x.run.bind(x), l && l.suspense) : x.run(), () => {
    x.stop(), l && l.scope && _o(l.scope.effects, x);
  };
}
function as(t, e, n) {
  const r = this.proxy, i = jt(t) ? t.includes(".") ? ls(r, t) : () => r[t] : t.bind(r, r);
  let o;
  bt(e) ? o = e : (o = e.handler, n = e);
  const s = Se;
  zr(this);
  const a = ss(i, o.bind(r), n);
  return s ? zr(s) : Ds(), a;
}
function ls(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function ge(t, e) {
  if (!vt(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), xt(t))
    ge(t.value, e);
  else if (k(t))
    for (let n = 0; n < t.length; n++)
      ge(t[n], e);
  else if (ti(t) || be(t))
    t.forEach((n) => {
      ge(n, e);
    });
  else if (ri(t))
    for (const n in t)
      ge(t[n], e);
  return t;
}
const us = Symbol(), qn = (t) => t ? Cs(t) ? Ts(t) || t.proxy : qn(t.parent) : null, Re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ $t(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? Qe(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? Qe(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? Qe(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? Qe(t.refs) : t.refs,
    $parent: (t) => qn(t.parent),
    $root: (t) => qn(t.root),
    $emit: (t) => t.emit,
    $options: (t) => ds(t),
    $forceUpdate: (t) => t.f || (t.f = () => br(t.update)),
    $nextTick: (t) => t.n || (t.n = Qi.bind(t.proxy)),
    $watch: (t) => as.bind(t)
  })
), cs = (t) => t === "_" || t === "$", An = (t, e) => t !== zt && !t.__isScriptSetup && lt(t, e), fs = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: a, appContext: l } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let u;
    if (e[0] !== "$") {
      const g = s[e];
      if (g !== void 0)
        switch (g) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return o[e];
        }
      else {
        if (An(r, e))
          return s[e] = 1, r[e];
        if (i !== zt && lt(i, e))
          return s[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && lt(u, e)
        )
          return s[e] = 3, o[e];
        if (n !== zt && lt(n, e))
          return s[e] = 4, n[e];
        s[e] = 0;
      }
    }
    const f = Re[e];
    let c, p;
    if (f)
      return e === "$attrs" && (Nt(t, "get", e), process.env.NODE_ENV !== "production" && void 0), f(t);
    if (
      // css module (injected by vue-loader)
      (c = a.__cssModules) && (c = c[e])
    )
      return c;
    if (n !== zt && lt(n, e))
      return s[e] = 4, n[e];
    if (
      // global properties
      p = l.config.globalProperties, lt(p, e)
    )
      return p[e];
    process.env.NODE_ENV !== "production" && Jt && (!jt(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (i !== zt && cs(e[0]) && lt(i, e) ? mt(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === Jt && mt(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: o } = t;
    return An(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && lt(i, e) ? (mt(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== zt && lt(r, e) ? (r[e] = n, !0) : lt(t.props, e) ? (process.env.NODE_ENV !== "production" && mt(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && mt(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(o, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: o } }, s) {
    let a;
    return !!n[s] || t !== zt && lt(t, s) || An(e, s) || (a = o[0]) && lt(a, s) || lt(r, s) || lt(Re, s) || lt(i.config.globalProperties, s);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : lt(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (fs.ownKeys = (t) => (mt("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
function ds(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = t.appContext, a = o.get(e);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = e : (l = {}, i.length && i.forEach((u) => gn(l, u, s, !0)), gn(l, e, s)), vt(e) && o.set(e, l), l;
}
function gn(t, e, n, r = !1) {
  const { mixins: i, extends: o } = e;
  o && gn(t, o, n, !0), i && i.forEach((s) => gn(t, s, n, !0));
  for (const s in e)
    if (r && s === "expose")
      process.env.NODE_ENV !== "production" && mt('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = ps[s] || n && n[s];
      t[s] = a ? a(t[s], e[s]) : e[s];
    }
  return t;
}
const ps = {
  data: jr,
  props: ne,
  emits: ne,
  // objects
  methods: ne,
  computed: ne,
  // lifecycle
  beforeCreate: ht,
  created: ht,
  beforeMount: ht,
  mounted: ht,
  beforeUpdate: ht,
  updated: ht,
  beforeDestroy: ht,
  beforeUnmount: ht,
  destroyed: ht,
  unmounted: ht,
  activated: ht,
  deactivated: ht,
  errorCaptured: ht,
  serverPrefetch: ht,
  // assets
  components: ne,
  directives: ne,
  // watch
  watch: gs,
  // provide / inject
  provide: jr,
  inject: hs
};
function jr(t, e) {
  return e ? t ? function() {
    return $t(bt(t) ? t.call(this, this) : t, bt(e) ? e.call(this, this) : e);
  } : e : t;
}
function hs(t, e) {
  return ne(Vr(t), Vr(e));
}
function Vr(t) {
  if (k(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function ht(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function ne(t, e) {
  return t ? $t($t(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function gs(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = $t(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = ht(t[r], e[r]);
  return n;
}
function ms() {
  return {
    app: null,
    config: {
      isNativeTag: Zo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Lr = is, vs = (t) => t.__isTeleport, Eo = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), bs = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), ys = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let me = null;
function tr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const Ss = (...t) => Do(...t), wo = "__vInternal", Oo = ({ key: t }) => t ?? null, sn = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? jt(t) || xt(t) || bt(t) ? { i: Jt, r: t, k: e, f: !!n } : t : null;
function xs(t, e = null, n = null, r = 0, i = null, o = t === Eo ? 0 : 1, s = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Oo(e),
    ref: e && sn(e),
    scopeId: rs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Jt
  };
  return a ? (yr(l, n), o & 128 && t.normalize(l)) : n && (l.shapeFlag |= jt(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && mt("VNode created with invalid key (NaN). VNode type:", l.type), // avoid a block node from tracking itself
  !s && // has current parent block
  me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && me.push(l), l;
}
const Ne = process.env.NODE_ENV !== "production" ? Ss : Do;
function Do(t, e = null, n = null, r = 0, i = null, o = !1) {
  if ((!t || t === us) && (process.env.NODE_ENV !== "production" && !t && mt(`Invalid vnode type when creating vnode: ${t}.`), t = ys), tr(t)) {
    const a = mn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && yr(a, n), !o && me && (a.shapeFlag & 6 ? me[me.indexOf(t)] = a : me.push(a)), a.patchFlag |= -2, a;
  }
  if (Io(t) && (t = t.__vccOpts), e) {
    e = Es(e);
    let { class: a, style: l } = e;
    a && !jt(a) && (e.class = lr(a)), vt(l) && (Qn(l) && !k(l) && (l = $t({}, l)), e.style = ar(l));
  }
  const s = jt(t) ? 1 : os(t) ? 128 : vs(t) ? 64 : vt(t) ? 4 : bt(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && s & 4 && Qn(t) && (t = W(t), mt("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), xs(t, e, n, r, i, s, o, !0);
}
function Es(t) {
  return t ? Qn(t) || wo in t ? $t({}, t) : t : null;
}
function mn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: s } = t, a = e ? Os(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && Oo(a),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? k(i) ? i.concat(sn(e)) : [i, sn(e)] : sn(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && k(s) ? s.map(Co) : s,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Eo ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && mn(t.ssContent),
    ssFallback: t.ssFallback && mn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  };
}
function Co(t) {
  const e = mn(t);
  return k(t.children) && (e.children = t.children.map(Co)), e;
}
function ws(t = " ", e = 0) {
  return Ne(bs, null, t, e);
}
function yr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (k(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), yr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(wo in e) ? e._ctx = Jt : i === 3 && Jt && (Jt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    bt(e) ? (e = { default: e, _ctx: Jt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [ws(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Os(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = lr([e.class, r.class]));
      else if (i === "style")
        e.style = ar([e.style, r.style]);
      else if (ko(i)) {
        const o = e[i], s = r[i];
        s && o !== s && !(k(o) && o.includes(s)) && (e[i] = o ? [].concat(o, s) : s);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
ms();
let Se = null;
const zr = (t) => {
  Se = t, t.scope.on();
}, Ds = () => {
  Se && Se.scope.off(), Se = null;
};
function Cs(t) {
  return t.vnode.shapeFlag & 4;
}
function Ts(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Ui(Li(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in Re)
          return Re[n](t);
      },
      has(e, n) {
        return n in e || n in Re;
      }
    }));
}
const Ns = /(?:^|[-_])(\w)/g, Is = (t) => t.replace(Ns, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function To(t, e = !0) {
  return bt(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function No(t, e, n = !1) {
  let r = To(e);
  if (!r && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && t && t.parent) {
    const i = (o) => {
      for (const s in o)
        if (o[s] === e)
          return s;
    };
    r = i(t.components || t.parent.type.components) || i(t.appContext.components);
  }
  return r ? Is(r) : n ? "App" : "Anonymous";
}
function Io(t) {
  return bt(t) && "__vccOpts" in t;
}
function O(t, e, n) {
  const r = arguments.length;
  return r === 2 ? vt(e) && !k(e) ? tr(e) ? Ne(t, null, [e]) : Ne(t, e) : Ne(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && tr(n) && (n = [n]), Ne(t, e, n));
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Fn(t) {
  return !!(t && t.__v_isShallow);
}
function As() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(c) {
      return vt(c) ? c.__isVue ? ["div", t, "VueInstance"] : xt(c) ? [
        "div",
        {},
        ["span", t, f(c)],
        "<",
        a(c.value),
        ">"
      ] : ae(c) ? [
        "div",
        {},
        ["span", t, Fn(c) ? "ShallowReactive" : "Reactive"],
        "<",
        a(c),
        `>${fe(c) ? " (readonly)" : ""}`
      ] : fe(c) ? [
        "div",
        {},
        ["span", t, Fn(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...o(c.$)
        ];
    }
  };
  function o(c) {
    const p = [];
    c.type.props && c.props && p.push(s("props", W(c.props))), c.setupState !== zt && p.push(s("setup", c.setupState)), c.data !== zt && p.push(s("data", W(c.data)));
    const g = l(c, "computed");
    g && p.push(s("computed", g));
    const d = l(c, "inject");
    return d && p.push(s("injected", d)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), p;
  }
  function s(c, p) {
    return p = $t({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((g) => [
          "div",
          {},
          ["span", r, g + ": "],
          a(p[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(c, p = !0) {
    return typeof c == "number" ? ["span", e, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", r, c] : vt(c) ? ["object", { object: p ? W(c) : c }] : ["span", n, String(c)];
  }
  function l(c, p) {
    const g = c.type;
    if (bt(g))
      return;
    const d = {};
    for (const h in c.ctx)
      u(g, h, p) && (d[h] = c.ctx[h]);
    return d;
  }
  function u(c, p, g) {
    const d = c[g];
    if (k(d) && d.includes(p) || vt(d) && p in d || c.extends && u(c.extends, p, g) || c.mixins && c.mixins.some((h) => u(h, p, g)))
      return !0;
  }
  function f(c) {
    return Fn(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function Fs() {
  As();
}
process.env.NODE_ENV !== "production" && Fs();
const Ms = function(t, e, n) {
  const r = String(t).split(".");
  let i = r[0];
  const o = r.length > 1 ? n + r[1] : "", s = /(\d+)(\d{3})/;
  for (; s.test(i); )
    i = i.replace(s, `$1${e}$2`);
  return i + o;
}, Dn = function(t) {
  const n = Object.assign({}, {
    digitsAfterDecimal: 2,
    scaler: 1,
    thousandsSep: ",",
    decimalSep: ".",
    prefix: "",
    suffix: ""
  }, t);
  return function(r) {
    if (isNaN(r) || !isFinite(r))
      return "";
    const i = Ms(
      (n.scaler * r).toFixed(n.digitsAfterDecimal),
      n.thousandsSep,
      n.decimalSep
    );
    return `${n.prefix}${i}${n.suffix}`;
  };
}, Br = /(\d+)|(\D+)/g, _e = /\d/, Ur = /^0/, oe = (t, e) => {
  if (e !== null && t === null)
    return -1;
  if (t !== null && e === null)
    return 1;
  if (typeof t == "number" && isNaN(t))
    return -1;
  if (typeof e == "number" && isNaN(e))
    return 1;
  const n = Number(t), r = Number(e);
  if (n < r)
    return -1;
  if (n > r)
    return 1;
  if (typeof t == "number" && typeof e != "number")
    return -1;
  if (typeof e == "number" && typeof t != "number")
    return 1;
  if (typeof t == "number" && typeof e == "number")
    return 0;
  if (isNaN(r) && !isNaN(n))
    return -1;
  if (isNaN(n) && !isNaN(r))
    return 1;
  let i = String(t), o = String(e);
  if (i === o)
    return 0;
  if (!_e.test(i) || !_e.test(o))
    return i > o ? 1 : -1;
  for (i = i.match(Br), o = o.match(Br); i.length && o.length; ) {
    const s = i.shift(), a = o.shift();
    if (s !== a)
      return _e.test(s) && _e.test(a) ? s.replace(Ur, ".0") - a.replace(Ur, ".0") : s > a ? 1 : -1;
  }
  return i.length - o.length;
}, Ao = function(t) {
  const e = {}, n = {};
  for (const r in t) {
    const i = t[r];
    e[i] = r, typeof i == "string" && (n[i.toLowerCase()] = r);
  }
  return function(r, i) {
    return r in e && i in e ? e[r] - e[i] : r in e ? -1 : i in e ? 1 : r in n && i in n ? n[r] - n[i] : r in n ? -1 : i in n ? 1 : oe(r, i);
  };
}, Cn = function(t, e) {
  if (t) {
    if (typeof t == "function") {
      const n = t(e);
      if (typeof n == "function")
        return n;
    } else if (e in t)
      return t[e];
  }
  return oe;
}, X = Dn(), Qt = Dn({ digitsAfterDecimal: 0 }), Ct = Dn({
  digitsAfterDecimal: 1,
  scaler: 100,
  suffix: "%"
}), _ = {
  count(t = Qt) {
    return () => function() {
      return {
        count: 0,
        push() {
          this.count++;
        },
        value() {
          return this.count;
        },
        format: t
      };
    };
  },
  uniques(t, e = Qt) {
    return function([n]) {
      return function() {
        return {
          uniq: [],
          push(r) {
            Array.from(this.uniq).includes(r[n]) || this.uniq.push(r[n]);
          },
          value() {
            return t(this.uniq);
          },
          format: e,
          numInputs: typeof n < "u" ? 0 : 1
        };
      };
    };
  },
  sum(t = X) {
    return function([e]) {
      return function() {
        return {
          sum: 0,
          push(n) {
            isNaN(parseFloat(n[e])) || (this.sum += parseFloat(n[e]));
          },
          value() {
            return this.sum;
          },
          format: t,
          numInputs: typeof e < "u" ? 0 : 1
        };
      };
    };
  },
  extremes(t, e = X) {
    return function([n]) {
      return function(r) {
        return {
          val: null,
          sorter: Cn(
            typeof r < "u" ? r.sorters : null,
            n
          ),
          push(i) {
            let o = i[n];
            ["min", "max"].includes(t) && (o = parseFloat(o), isNaN(o) || (this.val = Math[t](o, this.val !== null ? this.val : o))), t === "first" && this.sorter(o, this.val !== null ? this.val : o) <= 0 && (this.val = o), t === "last" && this.sorter(o, this.val !== null ? this.val : o) >= 0 && (this.val = o);
          },
          value() {
            return this.val;
          },
          format(i) {
            return isNaN(i) ? i : e(i);
          },
          numInputs: typeof n < "u" ? 0 : 1
        };
      };
    };
  },
  quantile(t, e = X) {
    return function([n]) {
      return function() {
        return {
          vals: [],
          push(r) {
            const i = parseFloat(r[n]);
            isNaN(i) || this.vals.push(i);
          },
          value() {
            if (this.vals.length === 0)
              return null;
            this.vals.sort((i, o) => i - o);
            const r = (this.vals.length - 1) * t;
            return (this.vals[Math.floor(r)] + this.vals[Math.ceil(r)]) / 2;
          },
          format: e,
          numInputs: typeof n < "u" ? 0 : 1
        };
      };
    };
  },
  runningStat(t = "mean", e = 1, n = X) {
    return function([r]) {
      return function() {
        return {
          n: 0,
          m: 0,
          s: 0,
          push(i) {
            const o = parseFloat(i[r]);
            if (isNaN(o))
              return;
            this.n += 1, this.n === 1 && (this.m = o);
            const s = this.m + (o - this.m) / this.n;
            this.s = this.s + (o - this.m) * (o - s), this.m = s;
          },
          value() {
            if (t === "mean")
              return this.n === 0 ? 0 / 0 : this.m;
            if (this.n <= e)
              return 0;
            switch (t) {
              case "var":
                return this.s / (this.n - e);
              case "stdev":
                return Math.sqrt(this.s / (this.n - e));
              default:
                throw new Error("unknown mode for runningStat");
            }
          },
          format: n,
          numInputs: typeof r < "u" ? 0 : 1
        };
      };
    };
  },
  sumOverSum(t = X) {
    return function([e, n]) {
      return function() {
        return {
          sumNum: 0,
          sumDenom: 0,
          push(r) {
            isNaN(parseFloat(r[e])) || (this.sumNum += parseFloat(r[e])), isNaN(parseFloat(r[n])) || (this.sumDenom += parseFloat(r[n]));
          },
          value() {
            return this.sumNum / this.sumDenom;
          },
          format: t,
          numInputs: typeof e < "u" && typeof n < "u" ? 0 : 2
        };
      };
    };
  },
  fractionOf(t, e = "total", n = Ct) {
    return (...r) => function(i, o, s) {
      return {
        selector: { total: [[], []], row: [o, []], col: [[], s] }[e],
        inner: t(...Array.from(r || []))(i, o, s),
        push(a) {
          this.inner.push(a);
        },
        format: n,
        value() {
          return this.inner.value() / i.getAggregator(...Array.from(this.selector || [])).inner.value();
        },
        numInputs: t(...Array.from(r || []))().numInputs
      };
    };
  }
};
_.countUnique = (t) => _.uniques((e) => e.length, t);
_.listUnique = (t) => _.uniques((e) => e.join(t), (e) => e);
_.max = (t) => _.extremes("max", t);
_.min = (t) => _.extremes("min", t);
_.first = (t) => _.extremes("first", t);
_.last = (t) => _.extremes("last", t);
_.median = (t) => _.quantile(0.5, t);
_.average = (t) => _.runningStat("mean", 1, t);
_.var = (t, e) => _.runningStat("var", t, e);
_.stdev = (t, e) => _.runningStat("stdev", t, e);
const Be = ((t) => ({
  Count: t.count(Qt),
  "Count Unique Values": t.countUnique(Qt),
  "List Unique Values": t.listUnique(", "),
  Sum: t.sum(X),
  "Integer Sum": t.sum(Qt),
  Average: t.average(X),
  Median: t.median(X),
  "Sample Variance": t.var(1, X),
  "Sample Standard Deviation": t.stdev(1, X),
  Minimum: t.min(X),
  Maximum: t.max(X),
  First: t.first(X),
  Last: t.last(X),
  "Sum over Sum": t.sumOverSum(X),
  "Sum as Fraction of Total": t.fractionOf(t.sum(), "total", Ct),
  "Sum as Fraction of Rows": t.fractionOf(t.sum(), "row", Ct),
  "Sum as Fraction of Columns": t.fractionOf(t.sum(), "col", Ct),
  "Count as Fraction of Total": t.fractionOf(t.count(), "total", Ct),
  "Count as Fraction of Rows": t.fractionOf(t.count(), "row", Ct),
  "Count as Fraction of Columns": t.fractionOf(t.count(), "col", Ct)
}))(_), Ps = ((t) => ({
  Compte: t.count(Qt),
  "Compter les valeurs uniques": t.countUnique(Qt),
  "Liste des valeurs uniques": t.listUnique(", "),
  Somme: t.sum(X),
  "Somme de nombres entiers": t.sum(Qt),
  Moyenne: t.average(X),
  Médiane: t.median(X),
  "Variance de l'échantillon": t.var(1, X),
  "Écart-type de l'échantillon": t.stdev(1, X),
  Minimum: t.min(X),
  Maximum: t.max(X),
  Premier: t.first(X),
  Dernier: t.last(X),
  "Somme Total": t.sumOverSum(X),
  "Somme en fraction du total": t.fractionOf(t.sum(), "total", Ct),
  "Somme en tant que fraction de lignes": t.fractionOf(t.sum(), "row", Ct),
  "Somme en tant que fraction de colonnes": t.fractionOf(t.sum(), "col", Ct),
  "Comptage en tant que fraction du total": t.fractionOf(t.count(), "total", Ct),
  "Comptage en tant que fraction de lignes": t.fractionOf(t.count(), "row", Ct),
  "Comptage en tant que fraction de colonnes": t.fractionOf(t.count(), "col", Ct)
}))(_), Fo = {
  en: {
    aggregators: Be,
    localeStrings: {
      renderError: "An error occurred rendering the PivotTable results.",
      computeError: "An error occurred computing the PivotTable results.",
      uiRenderError: "An error occurred rendering the PivotTable UI.",
      selectAll: "Select All",
      selectNone: "Select None",
      tooMany: "(too many to list)",
      filterResults: "Filter values",
      totals: "Totals",
      vs: "vs",
      by: "by",
      cancel: "Cancel",
      only: "only"
    }
  },
  fr: {
    frAggregators: Ps,
    localeStrings: {
      renderError: "Une erreur est survenue en dessinant le tableau croisé.",
      computeError: "Une erreur est survenue en calculant le tableau croisé.",
      uiRenderError: "Une erreur est survenue en dessinant l'interface du tableau croisé dynamique.",
      selectAll: "Sélectionner tout",
      selectNone: "Ne rien sélectionner",
      tooMany: "(trop de valeurs à afficher)",
      filterResults: "Filtrer les valeurs",
      totals: "Totaux",
      vs: "sur",
      by: "par",
      apply: "Appliquer",
      cancel: "Annuler",
      only: "seul"
    }
  }
}, Rs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], $s = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Ee = (t) => `0${t}`.substr(-2, 2), js = {
  bin(t, e) {
    return (n) => n[t] - n[t] % e;
  },
  dateFormat(t, e, n = !1, r = Rs, i = $s) {
    const o = n ? "UTC" : "";
    return function(s) {
      const a = new Date(Date.parse(s[t]));
      return isNaN(a) ? "" : e.replace(/%(.)/g, function(l, u) {
        switch (u) {
          case "y":
            return a[`get${o}FullYear`]();
          case "m":
            return Ee(a[`get${o}Month`]() + 1);
          case "n":
            return r[a[`get${o}Month`]()];
          case "d":
            return Ee(a[`get${o}Date`]());
          case "w":
            return i[a[`get${o}Day`]()];
          case "x":
            return a[`get${o}Day`]();
          case "H":
            return Ee(a[`get${o}Hours`]());
          case "M":
            return Ee(a[`get${o}Minutes`]());
          case "S":
            return Ee(a[`get${o}Seconds`]());
          default:
            return `%${u}`;
        }
      });
    };
  }
};
class Rt {
  constructor(e = {}) {
    this.props = Object.assign({}, Rt.defaultProps, e), this.aggregator = this.props.aggregators[this.props.aggregatorName](
      this.props.vals
    ), this.tree = {}, this.rowKeys = [], this.colKeys = [], this.rowTotals = {}, this.colTotals = {}, this.allTotal = this.aggregator(this, [], []), this.sorted = !1, this.filteredData = [], Rt.forEachRecord(
      this.props.data,
      this.props.derivedAttributes,
      (n) => {
        this.filter(n) && (this.filteredData.push(n), this.processRecord(n));
      }
    );
  }
  filter(e) {
    for (const n in this.props.valueFilter)
      if (e[n] in this.props.valueFilter[n])
        return !1;
    return !0;
  }
  forEachMatchingRecord(e, n) {
    return Rt.forEachRecord(
      this.props.data,
      this.props.derivedAttributes,
      (r) => {
        if (this.filter(r)) {
          for (const i in e)
            if (e[i] !== (i in r ? r[i] : "null"))
              return;
          n(r);
        }
      }
    );
  }
  arrSort(e) {
    let n;
    const r = (() => {
      const i = [];
      for (n of Array.from(e))
        i.push(Cn(this.props.sorters, n));
      return i;
    })();
    return function(i, o) {
      for (const s of Object.keys(r || {})) {
        const a = r[s], l = a(i[s], o[s]);
        if (l !== 0)
          return l;
      }
      return 0;
    };
  }
  sortKeys() {
    if (!this.sorted) {
      this.sorted = !0;
      const e = (n, r) => this.getAggregator(n, r).value();
      switch (this.props.rowOrder) {
        case "value_a_to_z":
          this.rowKeys.sort((n, r) => oe(e(n, []), e(r, [])));
          break;
        case "value_z_to_a":
          this.rowKeys.sort((n, r) => -oe(e(n, []), e(r, [])));
          break;
        default:
          this.rowKeys.sort(this.arrSort(this.props.rows));
      }
      switch (this.props.colOrder) {
        case "value_a_to_z":
          this.colKeys.sort((n, r) => oe(e([], n), e([], r)));
          break;
        case "value_z_to_a":
          this.colKeys.sort((n, r) => -oe(e([], n), e([], r)));
          break;
        default:
          this.colKeys.sort(this.arrSort(this.props.cols));
      }
    }
  }
  getFilteredData() {
    return this.filteredData;
  }
  getColKeys() {
    return this.sortKeys(), this.colKeys;
  }
  getRowKeys() {
    return this.sortKeys(), this.rowKeys;
  }
  processRecord(e) {
    const n = [], r = [];
    for (const s of Array.from(this.props.cols))
      n.push(s in e ? e[s] : "null");
    for (const s of Array.from(this.props.rows))
      r.push(s in e ? e[s] : "null");
    const i = r.join(String.fromCharCode(0)), o = n.join(String.fromCharCode(0));
    this.allTotal.push(e), r.length !== 0 && (this.rowTotals[i] || (this.rowKeys.push(r), this.rowTotals[i] = this.aggregator(this, r, [])), this.rowTotals[i].push(e)), n.length !== 0 && (this.colTotals[o] || (this.colKeys.push(n), this.colTotals[o] = this.aggregator(this, [], n)), this.colTotals[o].push(e)), n.length !== 0 && r.length !== 0 && (this.tree[i] || (this.tree[i] = {}), this.tree[i][o] || (this.tree[i][o] = this.aggregator(
      this,
      r,
      n
    )), this.tree[i][o].push(e));
  }
  getAggregator(e, n) {
    let r;
    const i = e.join(String.fromCharCode(0)), o = n.join(String.fromCharCode(0));
    return e.length === 0 && n.length === 0 ? r = this.allTotal : e.length === 0 ? r = this.colTotals[o] : n.length === 0 ? r = this.rowTotals[i] : r = this.tree[i][o], r || {
      value() {
        return null;
      },
      format() {
        return "";
      }
    };
  }
}
Rt.forEachRecord = function(t, e, n) {
  let r, i;
  if (Object.getOwnPropertyNames(e).length === 0 ? r = n : r = function(o) {
    for (const s in e) {
      const a = e[s](o);
      a !== null && (o[s] = a);
    }
    return n(o);
  }, typeof t == "function")
    return t(r);
  if (Array.isArray(t))
    return Array.isArray(t[0]) ? (() => {
      const o = [];
      for (const s of Object.keys(t || {})) {
        const a = t[s];
        if (s > 0) {
          i = {};
          for (const l of Object.keys(t[0] || {})) {
            const u = t[0][l];
            i[u] = a[l];
          }
          o.push(r(i));
        }
      }
      return o;
    })() : (() => {
      const o = [];
      for (i of Array.from(t))
        o.push(r(i));
      return o;
    })();
  throw new Error("unknown input format");
};
Rt.defaultProps = {
  aggregators: Be,
  cols: [],
  rows: [],
  vals: [],
  aggregatorName: "Count",
  sorters: {},
  valueFilter: {},
  rowOrder: "key_a_to_z",
  colOrder: "key_a_to_z",
  derivedAttributes: {}
};
const Tn = {
  props: {
    data: {
      type: [Array, Object, Function],
      required: !0
    },
    aggregators: {
      type: Object,
      default: function() {
        return Be;
      }
    },
    aggregatorName: {
      type: String,
      default: "Count"
    },
    heatmapMode: String,
    tableColorScaleGenerator: {
      type: Function
    },
    tableOptions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    renderers: Object,
    rendererName: {
      type: String,
      default: "Table"
    },
    locale: {
      type: String,
      default: "en"
    },
    locales: {
      type: Object,
      default: function() {
        return Fo;
      }
    },
    rowTotal: {
      type: Boolean,
      default: !0
    },
    colTotal: {
      type: Boolean,
      default: !0
    },
    cols: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rows: {
      type: Array,
      default: function() {
        return [];
      }
    },
    vals: {
      type: Array,
      default: function() {
        return [];
      }
    },
    attributes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    valueFilter: {
      type: Object,
      default: function() {
        return {};
      }
    },
    sorters: {
      type: [Function, Object],
      default: function() {
        return {};
      }
    },
    derivedAttributes: {
      type: [Function, Object],
      default: function() {
        return {};
      }
    },
    rowOrder: {
      type: String,
      default: "key_a_to_z",
      validator: function(t) {
        return ["key_a_to_z", "value_a_to_z", "value_z_to_a"].indexOf(t) !== -1;
      }
    },
    colOrder: {
      type: String,
      default: "key_a_to_z",
      validator: function(t) {
        return ["key_a_to_z", "value_a_to_z", "value_z_to_a"].indexOf(t) !== -1;
      }
    },
    tableMaxWidth: {
      type: Number,
      default: 0,
      validator: function(t) {
        return t >= 0;
      }
    }
  },
  methods: {
    renderError() {
      return O("span", this.locales[this.locale].localeStrings.renderError || "An error occurred rendering the PivotTable results.");
    },
    computeError() {
      return O("span", this.locales[this.locale].localeStrings.computeError || "An error occurred computing the PivotTable results.");
    },
    uiRenderError() {
      return O("span", this.locales[this.locale].localeStrings.uiRenderError || "An error occurred rendering the PivotTable UI.");
    }
  }
};
function Vs(t) {
  const e = Math.min.apply(Math, t), n = Math.max.apply(Math, t);
  return (r) => {
    const i = 255 - Math.round(255 * (r - e) / (n - e));
    return { backgroundColor: `rgb(255,${i},${i})` };
  };
}
function qe(t = {}) {
  return {
    name: t.name,
    mixins: [
      Tn
    ],
    props: {
      heatmapMode: String,
      tableColorScaleGenerator: {
        type: Function,
        default: Vs
      },
      tableOptions: {
        type: Object,
        default: function() {
          return {
            clickCallback: null
          };
        }
      },
      localeStrings: {
        type: Object,
        default: function() {
          return {
            totals: "Totals"
          };
        }
      }
    },
    methods: {
      spanSize(n, r, i) {
        let o;
        if (r !== 0) {
          let a, l, u = !0;
          for (o = 0, l = i, a = l >= 0; a ? o <= l : o >= l; a ? o++ : o--)
            n[r - 1][o] !== n[r][o] && (u = !1);
          if (u)
            return -1;
        }
        let s = 0;
        for (; r + s < n.length; ) {
          let a, l, u = !1;
          for (o = 0, l = i, a = l >= 0; a ? o <= l : o >= l; a ? o++ : o--)
            n[r][o] !== n[r + s][o] && (u = !0);
          if (u)
            break;
          s++;
        }
        return s;
      }
    },
    render() {
      console.log(this.tableOptions), console.log(this.$props);
      const n = Object.assign(
        {},
        this.$props,
        this.$attrs.props
      );
      console.log({ props: n, message: "props" });
      const r = new Rt(n), i = r.props.cols, o = r.props.rows, s = r.getRowKeys(), a = r.getColKeys(), l = r.getAggregator([], []);
      let u = () => {
      }, f = () => {
      }, c = () => {
      };
      if (t.heatmapMode) {
        const g = this.tableColorScaleGenerator, d = a.map(
          (y) => r.getAggregator([], y).value()
        );
        f = g(d);
        const h = s.map(
          (y) => r.getAggregator(y, []).value()
        );
        if (c = g(h), t.heatmapMode === "full") {
          const y = [];
          s.map(
            (w) => a.map(
              (S) => y.push(r.getAggregator(w, S).value())
            )
          );
          const x = g(y);
          u = (w, S, T) => x(T);
        } else if (t.heatmapMode === "row") {
          const y = {};
          s.map((x) => {
            const w = a.map(
              (S) => r.getAggregator(x, S).value()
            );
            y[x] = g(w);
          }), u = (x, w, S) => y[x](S);
        } else if (t.heatmapMode === "col") {
          const y = {};
          a.map((x) => {
            const w = s.map(
              (S) => r.getAggregator(S, x).value()
            );
            y[x] = g(w);
          }), u = (x, w, S) => y[w](S);
        }
      }
      const p = (g, d, h) => {
        const y = n.tableOptions;
        if (console.log(this.tableOptions), console.log(this.tableOptions.clickCallback), y && y.clickCallback) {
          const x = {};
          let w = {};
          for (let S in i)
            h.hasOwnProperty(S) && (w = i[S], h[S] !== null && (x[w] = h[S]));
          for (let S in o)
            d.hasOwnProperty(S) && (w = o[S], d[S] !== null && (x[w] = d[S]));
          return (S) => y.clickCallback(S, g, x, r);
        }
      };
      return O("table", {
        class: ["pvtTable"]
      }, [
        O(
          "thead",
          [
            i.map((g, d) => O(
              "tr",
              {
                key: `colAttrs${d}`
              },
              [
                d === 0 && o.length !== 0 ? O("th", {
                  colSpan: o.length,
                  rowSpan: i.length
                }) : void 0,
                O("th", {
                  class: ["pvtAxisLabel"]
                }, g),
                a.map((h, y) => {
                  const x = this.spanSize(a, y, d);
                  return x === -1 ? null : O("th", {
                    class: ["pvtColLabel"],
                    key: `colKey${y}`,
                    colSpan: x,
                    rowSpan: d === i.length - 1 && o.length !== 0 ? 2 : 1
                  }, h[d]);
                }),
                d === 0 && this.rowTotal ? O("th", {
                  class: ["pvtTotalLabel"],
                  rowSpan: i.length + (o.length === 0 ? 0 : 1)
                }, this.localeStrings.totals) : void 0
              ]
            )),
            o.length !== 0 ? O(
              "tr",
              [
                o.map((g, d) => O("th", {
                  class: ["pvtAxisLabel"],
                  key: `rowAttr${d}`
                }, g)),
                this.rowTotal ? O("th", { class: ["pvtTotalLabel"] }, i.length === 0 ? this.localeStrings.totals : null) : i.length === 0 ? void 0 : O("th", { class: ["pvtTotalLabel"] }, null)
              ]
            ) : void 0
          ]
        ),
        O(
          "tbody",
          [
            s.map((g, d) => {
              const h = r.getAggregator(g, []);
              return O(
                "tr",
                {
                  key: `rowKeyRow${d}`
                },
                [
                  g.map((y, x) => {
                    const w = this.spanSize(s, d, x);
                    return w === -1 ? null : O("th", {
                      class: ["pvtRowLabel"],
                      key: `rowKeyLabel${d}-${x}`,
                      rowSpan: w,
                      colSpan: x === o.length - 1 && i.length !== 0 ? 2 : 1
                    }, y);
                  }),
                  a.map((y, x) => {
                    const w = r.getAggregator(g, y);
                    return O("td", {
                      class: ["pvVal"],
                      style: u(g, y, w.value()),
                      key: `pvtVal${d}-${x}`,
                      onClick: p(w.value(), g, y)
                    }, w.format(w.value()));
                  }),
                  this.rowTotal ? O("td", {
                    class: ["pvtTotal"],
                    style: c(h.value()),
                    onClick: n.tableOptions.clickCallback ? p(h.value(), g, []) : {}
                  }, h.format(h.value())) : void 0
                ]
              );
            }),
            O(
              "tr",
              [
                this.colTotal ? O("th", {
                  class: ["pvtTotalLabel"],
                  colSpan: o.length + (i.length === 0 ? 0 : 1)
                }, this.localeStrings.totals) : void 0,
                this.colTotal ? a.map((g, d) => {
                  const h = r.getAggregator([], g);
                  return O("td", {
                    class: ["pvtTotal"],
                    style: f(h.value()),
                    key: `total${d}`,
                    onClick: n.tableOptions.clickCallback ? p(h.value(), [], g) : {}
                  }, h.format(h.value()));
                }) : void 0,
                this.colTotal && this.rowTotal ? O("td", {
                  class: ["pvtGrandTotal"],
                  onClick: n.tableOptions.clickCallback ? p(l.value(), [], []) : {}
                }, l.format(l.value())) : void 0
              ]
            )
          ]
        )
      ]);
    },
    renderError(n) {
      return this.renderError(O);
    }
  };
}
const Ls = {
  name: "tsv-export-renderers",
  mixins: [Tn],
  render() {
    let t = null;
    try {
      const o = Object.assign(
        {},
        this.$props,
        this.$attrs.props
      );
      t = new Rt(o);
    } catch (o) {
      if (console && console.error(o.stack))
        return this.computeError(O);
    }
    const e = t.getRowKeys(), n = t.getColKeys();
    e.length === 0 && e.push([]), n.length === 0 && n.push([]);
    const r = t.props.rows.map((o) => o);
    n.length === 1 && n[0].length === 0 ? r.push(this.aggregatorName) : n.map((o) => r.push(o.join("-")));
    const i = e.map((o) => {
      const s = o.map((a) => a);
      return n.map((a) => {
        const l = t.getAggregator(o, a).value();
        s.push(l || "");
      }), s;
    });
    return i.unshift(r), O("textarea", {
      style: {
        width: "100%",
        height: `${window.innerHeight / 2}px`
      },
      attrs: {
        readOnly: !0
      },
      domProps: {
        value: i.map((o) => o.join("	")).join(`
`)
      }
    });
  },
  renderError(t) {
    return this.renderError(O);
  }
}, Sr = {
  Table: qe({ name: "vue-table" }),
  "Table Heatmap": qe({ heatmapMode: "full", name: "vue-table-heatmap" }),
  "Table Col Heatmap": qe({ heatmapMode: "col", name: "vue-table-col-heatmap" }),
  "Table Row Heatmap": qe({ heatmapMode: "row", name: "vue-table-col-heatmap" }),
  "Export Table TSV": Ls
}, xr = {
  name: "vue-pivottable",
  mixins: [
    Tn
  ],
  computed: {
    rendererItems() {
      return this.renderers || Object.assign({}, Sr);
    }
  },
  methods: {
    createPivottable() {
      const t = this.$props;
      return O(this.rendererItems[this.rendererName], {
        props: Object.assign(
          t,
          { localeStrings: t.locales[t.locale].localeStrings }
        )
      });
    },
    createWrapperContainer() {
      return O("div", {
        style: {
          display: "block",
          width: "100%",
          "overflow-x": "auto",
          "max-width": this.tableMaxWidth ? `${this.tableMaxWidth}px` : void 0
        }
      }, [
        this.createPivottable(O)
      ]);
    }
  },
  render() {
    return this.createWrapperContainer(O);
  },
  renderError(t) {
    return this.renderError(O);
  }
}, zs = {
  name: "draggable-attribute",
  props: {
    open: {
      type: Boolean,
      default: !1
    },
    sortable: {
      type: Boolean,
      default: !0
    },
    draggable: {
      type: Boolean,
      default: !0
    },
    name: {
      type: String,
      required: !0
    },
    attrValues: {
      type: Object,
      required: !1
    },
    valueFilter: {
      type: Object,
      default: function() {
        return {};
      }
    },
    sorter: {
      type: Function,
      required: !0
    },
    localeStrings: {
      type: Object,
      default: function() {
        return {
          selectAll: "Select All",
          selectNone: "Select None",
          tooMany: "(too many to list)",
          // too many values to show
          filterResults: "Filter values",
          only: "only"
        };
      }
    },
    menuLimit: Number,
    zIndex: Number,
    async: Boolean,
    unused: Boolean
  },
  data() {
    return {
      // open: false,
      filterText: "",
      attribute: "",
      values: [],
      filter: {}
    };
  },
  computed: {
    disabled() {
      return !this.sortable && !this.draggable;
    },
    sortonly() {
      return this.sortable && !this.draggable;
    }
  },
  methods: {
    setValuesInFilter(t, e) {
      const n = e.reduce((r, i) => (r[i] = !0, r), {});
      this.$emit("update:filter", { attribute: t, valueFilter: n });
    },
    addValuesToFilter(t, e) {
      const n = e.reduce((r, i) => (r[i] = !0, r), Object.assign({}, this.valueFilter));
      this.$emit("update:filter", { attribute: t, valueFilter: n });
    },
    removeValuesFromFilter(t, e) {
      const n = e.reduce((r, i) => (r[i] && delete r[i], r), Object.assign({}, this.valueFilter));
      this.$emit("update:filter", { attribute: t, valueFilter: n });
    },
    moveFilterBoxToTop(t) {
      this.$emit("moveToTop:filterbox", { attribute: t });
    },
    toggleValue(t) {
      t in this.valueFilter ? this.removeValuesFromFilter(this.name, [t]) : this.addValuesToFilter(this.name, [t]);
    },
    matchesFilter(t) {
      return t.toLowerCase().trim().includes(this.filterText.toLowerCase().trim());
    },
    selectOnly(t, e) {
      t.stopPropagation(), this.value = e, this.setValuesInFilter(this.name, Object.keys(this.attrValues).filter((n) => n !== e));
    },
    getFilterBox(t) {
      const e = Object.keys(this.attrValues).length < this.menuLimit, r = Object.keys(this.attrValues).filter(this.matchesFilter.bind(this)).sort(this.sorter);
      return t(
        "div",
        {
          staticClass: ["pvtFilterBox"],
          style: {
            display: "block",
            cursor: "initial",
            zIndex: this.zIndex
          },
          on: {
            click: (i) => {
              i.stopPropagation(), this.moveFilterBoxToTop(this.name);
            }
          }
        },
        [
          t(
            "div",
            {
              staticClass: "pvtSearchContainer"
            },
            [
              e || t("p", this.localeStrings.tooMany),
              e && t("input", {
                staticClass: ["pvtSearch"],
                attrs: {
                  type: "text",
                  placeholder: this.localeStrings.filterResults
                },
                domProps: {
                  value: this.filterText
                },
                on: {
                  input: (i) => {
                    this.filterText = i.target.value, this.$emit("input", i.target.value);
                  }
                }
              }),
              t("a", {
                staticClass: ["pvtFilterTextClear"],
                on: {
                  click: () => {
                    this.filterText = "";
                  }
                }
              }),
              t("a", {
                staticClass: ["pvtButton"],
                attrs: {
                  role: "button"
                },
                on: {
                  click: () => this.removeValuesFromFilter(this.name, Object.keys(this.attrValues).filter(this.matchesFilter.bind(this)))
                }
              }, this.localeStrings.selectAll),
              t("a", {
                staticClass: ["pvtButton"],
                attrs: {
                  role: "button"
                },
                on: {
                  click: () => this.addValuesToFilter(this.name, Object.keys(this.attrValues).filter(this.matchesFilter.bind(this)))
                }
              }, this.localeStrings.selectNone)
            ]
          ),
          e && t(
            "div",
            {
              staticClass: ["pvtCheckContainer"]
            },
            r.map((i) => {
              const o = !(i in this.valueFilter);
              return t(
                "p",
                {
                  class: {
                    selected: o
                  },
                  attrs: {
                    key: i
                  },
                  on: {
                    click: () => this.toggleValue(i)
                  }
                },
                [
                  t("input", {
                    attrs: {
                      type: "checkbox"
                    },
                    domProps: {
                      checked: o
                    }
                  }),
                  i,
                  t("a", {
                    staticClass: ["pvtOnly"],
                    on: {
                      click: (s) => this.selectOnly(s, i)
                    }
                  }, this.localeStrings.only),
                  t("a", {
                    staticClass: ["pvtOnlySpacer"]
                  })
                ]
              );
            })
          )
        ]
      );
    },
    toggleFilterBox(t) {
      if (t.stopPropagation(), !this.attrValues) {
        this.$listeners["no:filterbox"] && this.$emit("no:filterbox");
        return;
      }
      this.openFilterBox(this.name, !this.open), this.moveFilterBoxToTop(this.name);
    },
    openFilterBox(t, e) {
      this.$emit("open:filterbox", { attribute: t, open: e });
    }
  },
  render() {
    const t = Object.keys(this.valueFilter).length !== 0 ? "pvtFilteredAttribute" : "", e = this.$scopedSlots.pvtAttr;
    return O(
      "li",
      {
        attrs: {
          "data-id": this.disabled ? void 0 : this.name
        }
      },
      [
        O(
          "span",
          {
            staticClass: ["pvtAttr " + t],
            class: {
              sortonly: this.sortonly,
              disabled: this.disabled
            }
          },
          [
            e ? e({ name: this.name }) : this.name,
            !this.disabled && (!this.async || !this.unused && this.async) ? O("span", {
              staticClass: ["pvtTriangle"],
              on: {
                click: this.toggleFilterBox.bind(this)
              }
            }, "  ▾") : void 0,
            this.open ? this.getFilterBox(O) : void 0
          ]
        )
      ]
    );
  }
}, Mn = {
  props: ["values", "value"],
  model: {
    prop: "value",
    event: "input"
  },
  created() {
    this.$emit("input", this.value || this.values[0]);
  },
  methods: {
    handleChange(t) {
      this.$emit("input", t.target.value);
    }
  },
  render() {
    return O(
      "select",
      {
        staticClass: ["pvtDropdown"],
        domProps: {
          value: this.value
        },
        on: {
          change: this.handleChange
        }
      },
      [
        this.values.map((t) => {
          const e = t;
          return O("option", {
            attrs: {
              value: t,
              selected: t === this.value ? "selected" : void 0
            }
          }, e);
        })
      ]
    );
  }
};
var Bs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Us(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Hs(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      if (this instanceof r) {
        var i = [null];
        i.push.apply(i, arguments);
        var o = Function.bind.apply(e, i);
        return new o();
      }
      return e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var er = {}, Gs = {
  get exports() {
    return er;
  },
  set exports(t) {
    er = t;
  }
};
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function an(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? an = function(e) {
    return typeof e;
  } : an = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, an(t);
}
function Ws(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function It() {
  return It = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, It.apply(this, arguments);
}
function qt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    }))), r.forEach(function(i) {
      Ws(t, i, n[i]);
    });
  }
  return t;
}
function Ks(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Ys(t, e) {
  if (t == null)
    return {};
  var n = Ks(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function Xs(t) {
  return Js(t) || Zs(t) || Qs();
}
function Js(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = new Array(t.length); e < t.length; e++)
      n[e] = t[e];
    return n;
  }
}
function Zs(t) {
  if (Symbol.iterator in Object(t) || Object.prototype.toString.call(t) === "[object Arguments]")
    return Array.from(t);
}
function Qs() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
var ks = "1.10.2";
function Ut(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ht = Ut(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ue = Ut(/Edge/i), Hr = Ut(/firefox/i), nr = Ut(/safari/i) && !Ut(/chrome/i) && !Ut(/android/i), Mo = Ut(/iP(ad|od|hone)/i), _s = Ut(/chrome/i) && Ut(/android/i), Po = {
  capture: !1,
  passive: !1
};
function L(t, e, n) {
  t.addEventListener(e, n, !Ht && Po);
}
function V(t, e, n) {
  t.removeEventListener(e, n, !Ht && Po);
}
function vn(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function qs(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function Mt(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && vn(t, e) : vn(t, e)) || r && t === n)
        return t;
      if (t === n)
        break;
    } while (t = qs(t));
  }
  return null;
}
var Gr = /\s+/g;
function Q(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Gr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Gr, " ");
    }
}
function D(t, e, n) {
  var r = t && t.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in r) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), r[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function ce(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var r = D(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Ro(t, e, n) {
  if (t) {
    var r = t.getElementsByTagName(e), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function Bt() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function nt(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, s, a, l, u, f, c;
    if (t !== window && t !== Bt() ? (o = t.getBoundingClientRect(), s = o.top, a = o.left, l = o.bottom, u = o.right, f = o.height, c = o.width) : (s = 0, a = 0, l = window.innerHeight, u = window.innerWidth, f = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !Ht))
      do
        if (i && i.getBoundingClientRect && (D(i, "transform") !== "none" || n && D(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          s -= p.top + parseInt(D(i, "border-top-width")), a -= p.left + parseInt(D(i, "border-left-width")), l = s + o.height, u = a + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var g = ce(i || t), d = g && g.a, h = g && g.d;
      g && (s /= h, a /= d, c /= d, f /= h, l = s + f, u = a + c);
    }
    return {
      top: s,
      left: a,
      bottom: l,
      right: u,
      width: c,
      height: f
    };
  }
}
function Wr(t, e, n) {
  for (var r = Zt(t, !0), i = nt(t)[e]; r; ) {
    var o = nt(r)[n], s = void 0;
    if (n === "top" || n === "left" ? s = i >= o : s = i <= o, !s)
      return r;
    if (r === Bt())
      break;
    r = Zt(r, !1);
  }
  return !1;
}
function bn(t, e, n) {
  for (var r = 0, i = 0, o = t.children; i < o.length; ) {
    if (o[i].style.display !== "none" && o[i] !== N.ghost && o[i] !== N.dragged && Mt(o[i], n.draggable, t, !1)) {
      if (r === e)
        return o[i];
      r++;
    }
    i++;
  }
  return null;
}
function Er(t, e) {
  for (var n = t.lastElementChild; n && (n === N.ghost || D(n, "display") === "none" || e && !vn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function et(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== N.clone && (!e || vn(t, e)) && n++;
  return n;
}
function Kr(t) {
  var e = 0, n = 0, r = Bt();
  if (t)
    do {
      var i = ce(t), o = i.a, s = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * s;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function ta(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r])
          return Number(n);
    }
  return -1;
}
function Zt(t, e) {
  if (!t || !t.getBoundingClientRect)
    return Bt();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = D(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return Bt();
        if (r || e)
          return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Bt();
}
function ea(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Pn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var $e;
function $o(t, e) {
  return function() {
    if (!$e) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), $e = setTimeout(function() {
        $e = void 0;
      }, e);
    }
  };
}
function na() {
  clearTimeout($e), $e = void 0;
}
function jo(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function wr(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Yr(t, e) {
  D(t, "position", "absolute"), D(t, "top", e.top), D(t, "left", e.left), D(t, "width", e.width), D(t, "height", e.height);
}
function Rn(t) {
  D(t, "position", ""), D(t, "top", ""), D(t, "left", ""), D(t, "width", ""), D(t, "height", "");
}
var pt = "Sortable" + new Date().getTime();
function ra() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(D(i, "display") === "none" || i === N.ghost)) {
            t.push({
              target: i,
              rect: nt(i)
            });
            var o = qt({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var s = ce(i, !0);
              s && (o.top -= s.f, o.left -= s.e);
            }
            i.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(r) {
      t.push(r);
    },
    removeAnimationState: function(r) {
      t.splice(ta(t, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof r == "function" && r();
        return;
      }
      var o = !1, s = 0;
      t.forEach(function(a) {
        var l = 0, u = a.target, f = u.fromRect, c = nt(u), p = u.prevFromRect, g = u.prevToRect, d = a.rect, h = ce(u, !0);
        h && (c.top -= h.f, c.left -= h.e), u.toRect = c, u.thisAnimationDuration && Pn(p, c) && !Pn(f, c) && // Make sure animatingRect is on line between toRect & fromRect
        (d.top - c.top) / (d.left - c.left) === (f.top - c.top) / (f.left - c.left) && (l = ia(d, p, g, i.options)), Pn(c, f) || (u.prevFromRect = f, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, d, c, l)), l && (o = !0, s = Math.max(s, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, s) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, s) {
      if (s) {
        D(r, "transition", ""), D(r, "transform", "");
        var a = ce(this.el), l = a && a.a, u = a && a.d, f = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!f, r.animatingY = !!c, D(r, "transform", "translate3d(" + f + "px," + c + "px,0)"), oa(r), D(r, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), D(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          D(r, "transition", ""), D(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, s);
      }
    }
  };
}
function oa(t) {
  return t.offsetWidth;
}
function ia(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var we = [], $n = {
  initializeByDefault: !0
}, He = {
  mount: function(e) {
    for (var n in $n)
      $n.hasOwnProperty(n) && !(n in e) && (e[n] = $n[n]);
    we.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    we.forEach(function(s) {
      n[s.pluginName] && (n[s.pluginName][o] && n[s.pluginName][o](qt({
        sortable: n
      }, r)), n.options[s.pluginName] && n[s.pluginName][e] && n[s.pluginName][e](qt({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    we.forEach(function(a) {
      var l = a.pluginName;
      if (!(!e.options[l] && !a.initializeByDefault)) {
        var u = new a(e, n, e.options);
        u.sortable = e, u.options = e.options, e[l] = u, It(r, u.defaults);
      }
    });
    for (var o in e.options)
      if (e.options.hasOwnProperty(o)) {
        var s = this.modifyOption(e, o, e.options[o]);
        typeof s < "u" && (e.options[o] = s);
      }
  },
  getEventProperties: function(e, n) {
    var r = {};
    return we.forEach(function(i) {
      typeof i.eventProperties == "function" && It(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return we.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function Ie(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, s = t.toEl, a = t.fromEl, l = t.oldIndex, u = t.newIndex, f = t.oldDraggableIndex, c = t.newDraggableIndex, p = t.originalEvent, g = t.putSortable, d = t.extraEventProperties;
  if (e = e || n && n[pt], !!e) {
    var h, y = e.options, x = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Ht && !Ue ? h = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = s || n, h.from = a || n, h.item = i || n, h.clone = o, h.oldIndex = l, h.newIndex = u, h.oldDraggableIndex = f, h.newDraggableIndex = c, h.originalEvent = p, h.pullMode = g ? g.lastPutMode : void 0;
    var w = qt({}, d, He.getEventProperties(r, e));
    for (var S in w)
      h[S] = w[S];
    n && n.dispatchEvent(h), y[x] && y[x].call(e, h);
  }
}
var yt = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = Ys(r, ["evt"]);
  He.pluginEvent.bind(N)(e, n, qt({
    dragEl: E,
    parentEl: st,
    ghostEl: P,
    rootEl: Z,
    nextEl: re,
    lastDownEl: ln,
    cloneEl: tt,
    cloneHidden: Xt,
    dragStarted: Ae,
    putSortable: ct,
    activeSortable: N.active,
    originalEvent: i,
    oldIndex: ve,
    oldDraggableIndex: je,
    newIndex: Dt,
    newDraggableIndex: Kt,
    hideGhostForTarget: Bo,
    unhideGhostForTarget: Uo,
    cloneNowHidden: function() {
      Xt = !0;
    },
    cloneNowShown: function() {
      Xt = !1;
    },
    dispatchSortableEvent: function(a) {
      gt({
        sortable: n,
        name: a,
        originalEvent: i
      });
    }
  }, o));
};
function gt(t) {
  Ie(qt({
    putSortable: ct,
    cloneEl: tt,
    targetEl: E,
    rootEl: Z,
    oldIndex: ve,
    oldDraggableIndex: je,
    newIndex: Dt,
    newDraggableIndex: Kt
  }, t));
}
var E, st, P, Z, re, ln, tt, Xt, ve, Dt, je, Kt, tn, ct, he = !1, yn = !1, Sn = [], te, At, jn, Vn, Xr, Jr, Ae, de, Ve, Le = !1, en = !1, un, dt, Ln = [], rr = !1, xn = [], Nn = typeof document < "u", nn = Mo, Zr = Ue || Ht ? "cssFloat" : "float", sa = Nn && !_s && !Mo && "draggable" in document.createElement("div"), Vo = function() {
  if (Nn) {
    if (Ht)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
}(), Lo = function(e, n) {
  var r = D(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = bn(e, 0, n), s = bn(e, 1, n), a = o && D(o), l = s && D(s), u = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + nt(o).width, f = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + nt(s).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && a.float && a.float !== "none") {
    var c = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || u >= i && r[Zr] === "none" || s && r[Zr] === "none" && u + f > i) ? "vertical" : "horizontal";
}, aa = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, s = r ? e.width : e.height, a = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === a || o === l || i + s / 2 === a + u / 2;
}, la = function(e, n) {
  var r;
  return Sn.some(function(i) {
    if (!Er(i)) {
      var o = nt(i), s = i[pt].options.emptyInsertThreshold, a = e >= o.left - s && e <= o.right + s, l = n >= o.top - s && n <= o.bottom + s;
      if (s && a && l)
        return r = i;
    }
  }), r;
}, zo = function(e) {
  function n(o, s) {
    return function(a, l, u, f) {
      var c = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (o == null && (s || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (s && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(a, l, u, f), s)(a, l, u, f);
      var p = (s ? a : l).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || an(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Bo = function() {
  !Vo && P && D(P, "display", "none");
}, Uo = function() {
  !Vo && P && D(P, "display", "");
};
Nn && document.addEventListener("click", function(t) {
  if (yn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), yn = !1, !1;
}, !0);
var ee = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = la(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[pt]._onDragOver(r);
    }
  }
}, ua = function(e) {
  E && E.parentNode[pt]._isOutsideThisEl(e.target);
};
function N(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = It({}, e), t[pt] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Lo(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(s, a) {
      s.setData("Text", a.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: N.supportPointer !== !1 && "PointerEvent" in window,
    emptyInsertThreshold: 5
  };
  He.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  zo(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : sa, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? L(t, "pointerdown", this._onTapStart) : (L(t, "mousedown", this._onTapStart), L(t, "touchstart", this._onTapStart)), this.nativeDraggable && (L(t, "dragover", this), L(t, "dragenter", this)), Sn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), It(this, ra());
}
N.prototype = /** @lends Sortable.prototype */
{
  constructor: N,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (de = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, E) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, s = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (a || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, f = i.filter;
      if (ma(r), !E && !(/mousedown|pointerdown/.test(s) && e.button !== 0 || i.disabled) && !u.isContentEditable && (l = Mt(l, i.draggable, r, !1), !(l && l.animated) && ln !== l)) {
        if (ve = et(l), je = et(l, i.draggable), typeof f == "function") {
          if (f.call(this, e, l, this)) {
            gt({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: l,
              toEl: r,
              fromEl: r
            }), yt("filter", n, {
              evt: e
            }), o && e.cancelable && e.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(c) {
          if (c = Mt(u, c.trim(), r, !1), c)
            return gt({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: r,
              toEl: r
            }), yt("filter", n, {
              evt: e
            }), !0;
        }), f)) {
          o && e.cancelable && e.preventDefault();
          return;
        }
        i.handle && !Mt(u, i.handle, r, !1) || this._prepareDragStart(e, a, l);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, s = i.options, a = o.ownerDocument, l;
    if (r && !E && r.parentNode === o) {
      var u = nt(r);
      if (Z = o, E = r, st = E.parentNode, re = E.nextSibling, ln = r, tn = s.group, N.dragged = E, te = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Xr = te.clientX - u.left, Jr = te.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", l = function() {
        if (yt("delayEnded", i, {
          evt: e
        }), N.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Hr && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), gt({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), Q(E, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(f) {
        Ro(E, f.trim(), Bn);
      }), L(a, "dragover", ee), L(a, "mousemove", ee), L(a, "touchmove", ee), L(a, "mouseup", i._onDrop), L(a, "touchend", i._onDrop), L(a, "touchcancel", i._onDrop), Hr && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), yt("delayStart", this, {
        evt: e
      }), s.delay && (!s.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ue || Ht))) {
        if (N.eventCanceled) {
          this._onDrop();
          return;
        }
        L(a, "mouseup", i._disableDelayedDrag), L(a, "touchend", i._disableDelayedDrag), L(a, "touchcancel", i._disableDelayedDrag), L(a, "mousemove", i._delayedDragTouchMoveHandler), L(a, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && L(a, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    E && Bn(E), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    V(e, "mouseup", this._disableDelayedDrag), V(e, "touchend", this._disableDelayedDrag), V(e, "touchcancel", this._disableDelayedDrag), V(e, "mousemove", this._delayedDragTouchMoveHandler), V(e, "touchmove", this._delayedDragTouchMoveHandler), V(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? L(document, "pointermove", this._onTouchMove) : n ? L(document, "touchmove", this._onTouchMove) : L(document, "mousemove", this._onTouchMove) : (L(E, "dragend", this), L(Z, "dragstart", this._onDragStart));
    try {
      document.selection ? cn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (he = !1, Z && E) {
      yt("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && L(document, "dragover", ua);
      var r = this.options;
      !e && Q(E, r.dragClass, !1), Q(E, r.ghostClass, !0), N.active = this, e && this._appendGhost(), gt({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (At) {
      this._lastX = At.clientX, this._lastY = At.clientY, Bo();
      for (var e = document.elementFromPoint(At.clientX, At.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(At.clientX, At.clientY), e !== n); )
        n = e;
      if (E.parentNode[pt]._isOutsideThisEl(e), n)
        do {
          if (n[pt]) {
            var r = void 0;
            if (r = n[pt]._onDragOver({
              clientX: At.clientX,
              clientY: At.clientY,
              target: e,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = n.parentNode);
      Uo();
    }
  },
  _onTouchMove: function(e) {
    if (te) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, s = P && ce(P, !0), a = P && s && s.a, l = P && s && s.d, u = nn && dt && Kr(dt), f = (o.clientX - te.clientX + i.x) / (a || 1) + (u ? u[0] - Ln[0] : 0) / (a || 1), c = (o.clientY - te.clientY + i.y) / (l || 1) + (u ? u[1] - Ln[1] : 0) / (l || 1);
      if (!N.active && !he) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (P) {
        s ? (s.e += f - (jn || 0), s.f += c - (Vn || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: c
        };
        var p = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        D(P, "webkitTransform", p), D(P, "mozTransform", p), D(P, "msTransform", p), D(P, "transform", p), jn = f, Vn = c, At = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!P) {
      var e = this.options.fallbackOnBody ? document.body : Z, n = nt(E, !0, nn, !0, e), r = this.options;
      if (nn) {
        for (dt = e; D(dt, "position") === "static" && D(dt, "transform") === "none" && dt !== document; )
          dt = dt.parentNode;
        dt !== document.body && dt !== document.documentElement ? (dt === document && (dt = Bt()), n.top += dt.scrollTop, n.left += dt.scrollLeft) : dt = Bt(), Ln = Kr(dt);
      }
      P = E.cloneNode(!0), Q(P, r.ghostClass, !1), Q(P, r.fallbackClass, !0), Q(P, r.dragClass, !0), D(P, "transition", ""), D(P, "transform", ""), D(P, "box-sizing", "border-box"), D(P, "margin", 0), D(P, "top", n.top), D(P, "left", n.left), D(P, "width", n.width), D(P, "height", n.height), D(P, "opacity", "0.8"), D(P, "position", nn ? "absolute" : "fixed"), D(P, "zIndex", "100000"), D(P, "pointerEvents", "none"), N.ghost = P, e.appendChild(P), D(P, "transform-origin", Xr / parseInt(P.style.width) * 100 + "% " + Jr / parseInt(P.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (yt("dragStart", this, {
      evt: e
    }), N.eventCanceled) {
      this._onDrop();
      return;
    }
    yt("setupClone", this), N.eventCanceled || (tt = wr(E), tt.draggable = !1, tt.style["will-change"] = "", this._hideClone(), Q(tt, this.options.chosenClass, !1), N.clone = tt), r.cloneId = cn(function() {
      yt("clone", r), !N.eventCanceled && (r.options.removeCloneOnHide || Z.insertBefore(tt, E), r._hideClone(), gt({
        sortable: r,
        name: "clone"
      }));
    }), !n && Q(E, o.dragClass, !0), n ? (yn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (V(document, "mouseup", r._onDrop), V(document, "touchend", r._onDrop), V(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), L(document, "drop", r), D(E, "transform", "translateZ(0)")), he = !0, r._dragStartId = cn(r._dragStarted.bind(r, n, e)), L(document, "selectstart", r), Ae = !0, nr && D(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, s, a = this.options, l = a.group, u = N.active, f = tn === l, c = a.sort, p = ct || u, g, d = this, h = !1;
    if (rr)
      return;
    function y(J, Et) {
      yt(J, d, qt({
        evt: e,
        isOwner: f,
        axis: g ? "vertical" : "horizontal",
        revert: s,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: w,
        onMove: function(ut, b) {
          return zn(Z, n, E, i, ut, nt(ut), e, b);
        },
        changed: S
      }, Et));
    }
    function x() {
      y("dragOverAnimationCapture"), d.captureAnimationState(), d !== p && p.captureAnimationState();
    }
    function w(J) {
      return y("dragOverCompleted", {
        insertion: J
      }), J && (f ? u._hideClone() : u._showClone(d), d !== p && (Q(E, ct ? ct.options.ghostClass : u.options.ghostClass, !1), Q(E, a.ghostClass, !0)), ct !== d && d !== N.active ? ct = d : d === N.active && ct && (ct = null), p === d && (d._ignoreWhileAnimating = r), d.animateAll(function() {
        y("dragOverAnimationComplete"), d._ignoreWhileAnimating = null;
      }), d !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && (de = null), !a.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[pt]._isOutsideThisEl(e.target), !J && ee(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), h = !0;
    }
    function S() {
      Dt = et(E), Kt = et(E, a.draggable), gt({
        sortable: d,
        name: "change",
        toEl: n,
        newIndex: Dt,
        newDraggableIndex: Kt,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = Mt(r, a.draggable, n, !0), y("dragOver"), N.eventCanceled)
      return h;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || d._ignoreWhileAnimating === r)
      return w(!1);
    if (yn = !1, u && !a.disabled && (f ? c || (s = !Z.contains(E)) : ct === this || (this.lastPutMode = tn.checkPull(this, u, E, e)) && l.checkPut(this, u, E, e))) {
      if (g = this._getDirection(e, r) === "vertical", i = nt(E), y("dragOverValid"), N.eventCanceled)
        return h;
      if (s)
        return st = Z, x(), this._hideClone(), y("revert"), N.eventCanceled || (re ? Z.insertBefore(E, re) : Z.appendChild(E)), w(!0);
      var T = Er(n, a.draggable);
      if (!T || da(e, g, this) && !T.animated) {
        if (T === E)
          return w(!1);
        if (T && n === e.target && (r = T), r && (o = nt(r)), zn(Z, n, E, i, r, o, e, !!r) !== !1)
          return x(), n.appendChild(E), st = n, S(), w(!0);
      } else if (r.parentNode === n) {
        o = nt(r);
        var $ = 0, B, U = E.parentNode !== n, A = !aa(E.animated && E.toRect || i, r.animated && r.toRect || o, g), M = g ? "top" : "left", I = Wr(r, "top", "top") || Wr(E, "top", "top"), z = I ? I.scrollTop : void 0;
        de !== r && (B = o[M], Le = !1, en = !A && a.invertSwap || U), $ = pa(e, r, o, g, A ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, en, de === r);
        var q;
        if ($ !== 0) {
          var it = et(E);
          do
            it -= $, q = st.children[it];
          while (q && (D(q, "display") === "none" || q === P));
        }
        if ($ === 0 || q === r)
          return w(!1);
        de = r, Ve = $;
        var rt = r.nextElementSibling, K = !1;
        K = $ === 1;
        var H = zn(Z, n, E, i, r, o, e, K);
        if (H !== !1)
          return (H === 1 || H === -1) && (K = H === 1), rr = !0, setTimeout(fa, 30), x(), K && !rt ? n.appendChild(E) : r.parentNode.insertBefore(E, K ? rt : r), I && jo(I, 0, z - I.scrollTop), st = E.parentNode, B !== void 0 && !en && (un = Math.abs(B - nt(r)[M])), S(), w(!0);
      }
      if (n.contains(E))
        return w(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    V(document, "mousemove", this._onTouchMove), V(document, "touchmove", this._onTouchMove), V(document, "pointermove", this._onTouchMove), V(document, "dragover", ee), V(document, "mousemove", ee), V(document, "touchmove", ee);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    V(e, "mouseup", this._onDrop), V(e, "touchend", this._onDrop), V(e, "pointerup", this._onDrop), V(e, "touchcancel", this._onDrop), V(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (Dt = et(E), Kt = et(E, r.draggable), yt("drop", this, {
      evt: e
    }), st = E && E.parentNode, Dt = et(E), Kt = et(E, r.draggable), N.eventCanceled) {
      this._nulling();
      return;
    }
    he = !1, en = !1, Le = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), or(this.cloneId), or(this._dragStartId), this.nativeDraggable && (V(document, "drop", this), V(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), nr && D(document.body, "user-select", ""), D(E, "transform", ""), e && (Ae && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), P && P.parentNode && P.parentNode.removeChild(P), (Z === st || ct && ct.lastPutMode !== "clone") && tt && tt.parentNode && tt.parentNode.removeChild(tt), E && (this.nativeDraggable && V(E, "dragend", this), Bn(E), E.style["will-change"] = "", Ae && !he && Q(E, ct ? ct.options.ghostClass : this.options.ghostClass, !1), Q(E, this.options.chosenClass, !1), gt({
      sortable: this,
      name: "unchoose",
      toEl: st,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), Z !== st ? (Dt >= 0 && (gt({
      rootEl: st,
      name: "add",
      toEl: st,
      fromEl: Z,
      originalEvent: e
    }), gt({
      sortable: this,
      name: "remove",
      toEl: st,
      originalEvent: e
    }), gt({
      rootEl: st,
      name: "sort",
      toEl: st,
      fromEl: Z,
      originalEvent: e
    }), gt({
      sortable: this,
      name: "sort",
      toEl: st,
      originalEvent: e
    })), ct && ct.save()) : Dt !== ve && Dt >= 0 && (gt({
      sortable: this,
      name: "update",
      toEl: st,
      originalEvent: e
    }), gt({
      sortable: this,
      name: "sort",
      toEl: st,
      originalEvent: e
    })), N.active && ((Dt == null || Dt === -1) && (Dt = ve, Kt = je), gt({
      sortable: this,
      name: "end",
      toEl: st,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    yt("nulling", this), Z = E = st = P = re = tt = ln = Xt = te = At = Ae = Dt = Kt = ve = je = de = Ve = ct = tn = N.dragged = N.ghost = N.clone = N.active = null, xn.forEach(function(e) {
      e.checked = !0;
    }), xn.length = jn = Vn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        E && (this._onDragOver(e), ca(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, r = this.el.children, i = 0, o = r.length, s = this.options; i < o; i++)
      n = r[i], Mt(n, s.draggable, this.el, !1) && e.push(n.getAttribute(s.dataIdAttr) || ga(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e) {
    var n = {}, r = this.el;
    this.toArray().forEach(function(i, o) {
      var s = r.children[o];
      Mt(s, this.options.draggable, r, !1) && (n[i] = s);
    }, this), e.forEach(function(i) {
      n[i] && (r.removeChild(n[i]), r.appendChild(n[i]));
    });
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return Mt(e, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var r = this.options;
    if (n === void 0)
      return r[e];
    var i = He.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && zo(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    yt("destroy", this);
    var e = this.el;
    e[pt] = null, V(e, "mousedown", this._onTapStart), V(e, "touchstart", this._onTapStart), V(e, "pointerdown", this._onTapStart), this.nativeDraggable && (V(e, "dragover", this), V(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Sn.splice(Sn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Xt) {
      if (yt("hideClone", this), N.eventCanceled)
        return;
      D(tt, "display", "none"), this.options.removeCloneOnHide && tt.parentNode && tt.parentNode.removeChild(tt), Xt = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Xt) {
      if (yt("showClone", this), N.eventCanceled)
        return;
      Z.contains(E) && !this.options.group.revertClone ? Z.insertBefore(tt, E) : re ? Z.insertBefore(tt, re) : Z.appendChild(tt), this.options.group.revertClone && this.animate(E, tt), D(tt, "display", ""), Xt = !1;
    }
  }
};
function ca(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function zn(t, e, n, r, i, o, s, a) {
  var l, u = t[pt], f = u.options.onMove, c;
  return window.CustomEvent && !Ht && !Ue ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || nt(e), l.willInsertAfter = a, l.originalEvent = s, t.dispatchEvent(l), f && (c = f.call(u, l, s)), c;
}
function Bn(t) {
  t.draggable = !1;
}
function fa() {
  rr = !1;
}
function da(t, e, n) {
  var r = nt(Er(n.el, n.options.draggable)), i = 10;
  return e ? t.clientX > r.right + i || t.clientX <= r.right && t.clientY > r.bottom && t.clientX >= r.left : t.clientX > r.right && t.clientY > r.top || t.clientX <= r.right && t.clientY > r.bottom + i;
}
function pa(t, e, n, r, i, o, s, a) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, f = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!s) {
    if (a && un < u * i) {
      if (!Le && (Ve === 1 ? l > f + u * o / 2 : l < c - u * o / 2) && (Le = !0), Le)
        p = !0;
      else if (Ve === 1 ? l < f + un : l > c - un)
        return -Ve;
    } else if (l > f + u * (1 - i) / 2 && l < c - u * (1 - i) / 2)
      return ha(e);
  }
  return p = p || s, p && (l < f + u * o / 2 || l > c - u * o / 2) ? l > f + u / 2 ? 1 : -1 : 0;
}
function ha(t) {
  return et(E) < et(t) ? 1 : -1;
}
function ga(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function ma(t) {
  xn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && xn.push(r);
  }
}
function cn(t) {
  return setTimeout(t, 0);
}
function or(t) {
  return clearTimeout(t);
}
Nn && L(document, "touchmove", function(t) {
  (N.active || he) && t.cancelable && t.preventDefault();
});
N.utils = {
  on: L,
  off: V,
  css: D,
  find: Ro,
  is: function(e, n) {
    return !!Mt(e, n, e, !1);
  },
  extend: ea,
  throttle: $o,
  closest: Mt,
  toggleClass: Q,
  clone: wr,
  index: et,
  nextTick: cn,
  cancelNextTick: or,
  detectDirection: Lo,
  getChild: bn
};
N.get = function(t) {
  return t[pt];
};
N.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (N.utils = qt({}, N.utils, r.utils)), He.mount(r);
  });
};
N.create = function(t, e) {
  return new N(t, e);
};
N.version = ks;
var at = [], Fe, ir, sr = !1, Un, Hn, En, Me;
function va() {
  function t() {
    this.defaults = {
      scroll: !0,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(n) {
      var r = n.originalEvent;
      this.sortable.nativeDraggable ? L(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? L(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? L(document, "touchmove", this._handleFallbackAutoScroll) : L(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? V(document, "dragover", this._handleAutoScroll) : (V(document, "pointermove", this._handleFallbackAutoScroll), V(document, "touchmove", this._handleFallbackAutoScroll), V(document, "mousemove", this._handleFallbackAutoScroll)), Qr(), fn(), na();
    },
    nulling: function() {
      En = ir = Fe = sr = Me = Un = Hn = null, at.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, s = (n.touches ? n.touches[0] : n).clientY, a = document.elementFromPoint(o, s);
      if (En = n, r || Ue || Ht || nr) {
        Gn(n, this.options, a, r);
        var l = Zt(a, !0);
        sr && (!Me || o !== Un || s !== Hn) && (Me && Qr(), Me = setInterval(function() {
          var u = Zt(document.elementFromPoint(o, s), !0);
          u !== l && (l = u, fn()), Gn(n, i.options, u, r);
        }, 10), Un = o, Hn = s);
      } else {
        if (!this.options.bubbleScroll || Zt(a, !0) === Bt()) {
          fn();
          return;
        }
        Gn(n, this.options, Zt(a, !1), !1);
      }
    }
  }, It(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function fn() {
  at.forEach(function(t) {
    clearInterval(t.pid);
  }), at = [];
}
function Qr() {
  clearInterval(Me);
}
var Gn = $o(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, s = e.scrollSensitivity, a = e.scrollSpeed, l = Bt(), u = !1, f;
    ir !== n && (ir = n, fn(), Fe = e.scroll, f = e.scrollFn, Fe === !0 && (Fe = Zt(n, !0)));
    var c = 0, p = Fe;
    do {
      var g = p, d = nt(g), h = d.top, y = d.bottom, x = d.left, w = d.right, S = d.width, T = d.height, $ = void 0, B = void 0, U = g.scrollWidth, A = g.scrollHeight, M = D(g), I = g.scrollLeft, z = g.scrollTop;
      g === l ? ($ = S < U && (M.overflowX === "auto" || M.overflowX === "scroll" || M.overflowX === "visible"), B = T < A && (M.overflowY === "auto" || M.overflowY === "scroll" || M.overflowY === "visible")) : ($ = S < U && (M.overflowX === "auto" || M.overflowX === "scroll"), B = T < A && (M.overflowY === "auto" || M.overflowY === "scroll"));
      var q = $ && (Math.abs(w - i) <= s && I + S < U) - (Math.abs(x - i) <= s && !!I), it = B && (Math.abs(y - o) <= s && z + T < A) - (Math.abs(h - o) <= s && !!z);
      if (!at[c])
        for (var rt = 0; rt <= c; rt++)
          at[rt] || (at[rt] = {});
      (at[c].vx != q || at[c].vy != it || at[c].el !== g) && (at[c].el = g, at[c].vx = q, at[c].vy = it, clearInterval(at[c].pid), (q != 0 || it != 0) && (u = !0, at[c].pid = setInterval(function() {
        r && this.layer === 0 && N.active._onTouchMove(En);
        var K = at[this.layer].vy ? at[this.layer].vy * a : 0, H = at[this.layer].vx ? at[this.layer].vx * a : 0;
        typeof f == "function" && f.call(N.dragged.parentNode[pt], H, K, t, En, at[this.layer].el) !== "continue" || jo(at[this.layer].el, H, K);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== l && (p = Zt(p, !1)));
    sr = u;
  }
}, 30), Ho = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, s = e.dispatchSortableEvent, a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    a();
    var f = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(f.clientX, f.clientY);
    l(), u && !u.el.contains(c) && (s("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function Or() {
}
Or.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = bn(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Ho
};
It(Or, {
  pluginName: "revertOnSpill"
});
function Dr() {
}
Dr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Ho
};
It(Dr, {
  pluginName: "removeOnSpill"
});
var Tt;
function ba() {
  function t() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return t.prototype = {
    dragStart: function(n) {
      var r = n.dragEl;
      Tt = r;
    },
    dragOverValid: function(n) {
      var r = n.completed, i = n.target, o = n.onMove, s = n.activeSortable, a = n.changed, l = n.cancel;
      if (s.options.swap) {
        var u = this.sortable.el, f = this.options;
        if (i && i !== u) {
          var c = Tt;
          o(i) !== !1 ? (Q(i, f.swapClass, !0), Tt = i) : Tt = null, c && c !== Tt && Q(c, f.swapClass, !1);
        }
        a(), r(!0), l();
      }
    },
    drop: function(n) {
      var r = n.activeSortable, i = n.putSortable, o = n.dragEl, s = i || this.sortable, a = this.options;
      Tt && Q(Tt, a.swapClass, !1), Tt && (a.swap || i && i.options.swap) && o !== Tt && (s.captureAnimationState(), s !== r && r.captureAnimationState(), ya(o, Tt), s.animateAll(), s !== r && r.animateAll());
    },
    nulling: function() {
      Tt = null;
    }
  }, It(t, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: Tt
      };
    }
  });
}
function ya(t, e) {
  var n = t.parentNode, r = e.parentNode, i, o;
  !n || !r || n.isEqualNode(e) || r.isEqualNode(t) || (i = et(t), o = et(e), n.isEqualNode(r) && i < o && o++, n.insertBefore(e, n.children[i]), r.insertBefore(t, r.children[o]));
}
var F = [], Ot = [], Oe, Ft, De = !1, wt = !1, pe = !1, Y, Ce, rn;
function Sa() {
  function t(e) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    e.options.supportPointer ? L(document, "pointerup", this._deselectMultiDrag) : (L(document, "mouseup", this._deselectMultiDrag), L(document, "touchend", this._deselectMultiDrag)), L(document, "keydown", this._checkKeyDown), L(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function(i, o) {
        var s = "";
        F.length && Ft === e ? F.forEach(function(a, l) {
          s += (l ? ", " : "") + a.textContent;
        }) : s = o.textContent, i.setData("Text", s);
      }
    };
  }
  return t.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(n) {
      var r = n.dragEl;
      Y = r;
    },
    delayEnded: function() {
      this.isMultiDrag = ~F.indexOf(Y);
    },
    setupClone: function(n) {
      var r = n.sortable, i = n.cancel;
      if (this.isMultiDrag) {
        for (var o = 0; o < F.length; o++)
          Ot.push(wr(F[o])), Ot[o].sortableIndex = F[o].sortableIndex, Ot[o].draggable = !1, Ot[o].style["will-change"] = "", Q(Ot[o], this.options.selectedClass, !1), F[o] === Y && Q(Ot[o], this.options.chosenClass, !1);
        r._hideClone(), i();
      }
    },
    clone: function(n) {
      var r = n.sortable, i = n.rootEl, o = n.dispatchSortableEvent, s = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || F.length && Ft === r && (kr(!0, i), o("clone"), s()));
    },
    showClone: function(n) {
      var r = n.cloneNowShown, i = n.rootEl, o = n.cancel;
      this.isMultiDrag && (kr(!1, i), Ot.forEach(function(s) {
        D(s, "display", "");
      }), r(), rn = !1, o());
    },
    hideClone: function(n) {
      var r = this;
      n.sortable;
      var i = n.cloneNowHidden, o = n.cancel;
      this.isMultiDrag && (Ot.forEach(function(s) {
        D(s, "display", "none"), r.options.removeCloneOnHide && s.parentNode && s.parentNode.removeChild(s);
      }), i(), rn = !0, o());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && Ft && Ft.multiDrag._deselectMultiDrag(), F.forEach(function(r) {
        r.sortableIndex = et(r);
      }), F = F.sort(function(r, i) {
        return r.sortableIndex - i.sortableIndex;
      }), pe = !0;
    },
    dragStarted: function(n) {
      var r = this, i = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (i.captureAnimationState(), this.options.animation)) {
          F.forEach(function(s) {
            s !== Y && D(s, "position", "absolute");
          });
          var o = nt(Y, !1, !0, !0);
          F.forEach(function(s) {
            s !== Y && Yr(s, o);
          }), wt = !0, De = !0;
        }
        i.animateAll(function() {
          wt = !1, De = !1, r.options.animation && F.forEach(function(s) {
            Rn(s);
          }), r.options.sort && on();
        });
      }
    },
    dragOver: function(n) {
      var r = n.target, i = n.completed, o = n.cancel;
      wt && ~F.indexOf(r) && (i(!1), o());
    },
    revert: function(n) {
      var r = n.fromSortable, i = n.rootEl, o = n.sortable, s = n.dragRect;
      F.length > 1 && (F.forEach(function(a) {
        o.addAnimationState({
          target: a,
          rect: wt ? nt(a) : s
        }), Rn(a), a.fromRect = s, r.removeAnimationState(a);
      }), wt = !1, xa(!this.options.removeCloneOnHide, i));
    },
    dragOverCompleted: function(n) {
      var r = n.sortable, i = n.isOwner, o = n.insertion, s = n.activeSortable, a = n.parentEl, l = n.putSortable, u = this.options;
      if (o) {
        if (i && s._hideClone(), De = !1, u.animation && F.length > 1 && (wt || !i && !s.options.sort && !l)) {
          var f = nt(Y, !1, !0, !0);
          F.forEach(function(p) {
            p !== Y && (Yr(p, f), a.appendChild(p));
          }), wt = !0;
        }
        if (!i)
          if (wt || on(), F.length > 1) {
            var c = rn;
            s._showClone(r), s.options.animation && !rn && c && Ot.forEach(function(p) {
              s.addAnimationState({
                target: p,
                rect: Ce
              }), p.fromRect = Ce, p.thisAnimationDuration = null;
            });
          } else
            s._showClone(r);
      }
    },
    dragOverAnimationCapture: function(n) {
      var r = n.dragRect, i = n.isOwner, o = n.activeSortable;
      if (F.forEach(function(a) {
        a.thisAnimationDuration = null;
      }), o.options.animation && !i && o.multiDrag.isMultiDrag) {
        Ce = It({}, r);
        var s = ce(Y, !0);
        Ce.top -= s.f, Ce.left -= s.e;
      }
    },
    dragOverAnimationComplete: function() {
      wt && (wt = !1, on());
    },
    drop: function(n) {
      var r = n.originalEvent, i = n.rootEl, o = n.parentEl, s = n.sortable, a = n.dispatchSortableEvent, l = n.oldIndex, u = n.putSortable, f = u || this.sortable;
      if (r) {
        var c = this.options, p = o.children;
        if (!pe)
          if (c.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Q(Y, c.selectedClass, !~F.indexOf(Y)), ~F.indexOf(Y))
            F.splice(F.indexOf(Y), 1), Oe = null, Ie({
              sortable: s,
              rootEl: i,
              name: "deselect",
              targetEl: Y,
              originalEvt: r
            });
          else {
            if (F.push(Y), Ie({
              sortable: s,
              rootEl: i,
              name: "select",
              targetEl: Y,
              originalEvt: r
            }), r.shiftKey && Oe && s.el.contains(Oe)) {
              var g = et(Oe), d = et(Y);
              if (~g && ~d && g !== d) {
                var h, y;
                for (d > g ? (y = g, h = d) : (y = d, h = g + 1); y < h; y++)
                  ~F.indexOf(p[y]) || (Q(p[y], c.selectedClass, !0), F.push(p[y]), Ie({
                    sortable: s,
                    rootEl: i,
                    name: "select",
                    targetEl: p[y],
                    originalEvt: r
                  }));
              }
            } else
              Oe = Y;
            Ft = f;
          }
        if (pe && this.isMultiDrag) {
          if ((o[pt].options.sort || o !== i) && F.length > 1) {
            var x = nt(Y), w = et(Y, ":not(." + this.options.selectedClass + ")");
            if (!De && c.animation && (Y.thisAnimationDuration = null), f.captureAnimationState(), !De && (c.animation && (Y.fromRect = x, F.forEach(function(T) {
              if (T.thisAnimationDuration = null, T !== Y) {
                var $ = wt ? nt(T) : x;
                T.fromRect = $, f.addAnimationState({
                  target: T,
                  rect: $
                });
              }
            })), on(), F.forEach(function(T) {
              p[w] ? o.insertBefore(T, p[w]) : o.appendChild(T), w++;
            }), l === et(Y))) {
              var S = !1;
              F.forEach(function(T) {
                if (T.sortableIndex !== et(T)) {
                  S = !0;
                  return;
                }
              }), S && a("update");
            }
            F.forEach(function(T) {
              Rn(T);
            }), f.animateAll();
          }
          Ft = f;
        }
        (i === o || u && u.lastPutMode !== "clone") && Ot.forEach(function(T) {
          T.parentNode && T.parentNode.removeChild(T);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = pe = !1, Ot.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), V(document, "pointerup", this._deselectMultiDrag), V(document, "mouseup", this._deselectMultiDrag), V(document, "touchend", this._deselectMultiDrag), V(document, "keydown", this._checkKeyDown), V(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof pe < "u" && pe) && Ft === this.sortable && !(n && Mt(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; F.length; ) {
          var r = F[0];
          Q(r, this.options.selectedClass, !1), F.shift(), Ie({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: r,
            originalEvt: n
          });
        }
    },
    _checkKeyDown: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, It(t, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var r = n.parentNode[pt];
        !r || !r.options.multiDrag || ~F.indexOf(n) || (Ft && Ft !== r && (Ft.multiDrag._deselectMultiDrag(), Ft = r), Q(n, r.options.selectedClass, !0), F.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var r = n.parentNode[pt], i = F.indexOf(n);
        !r || !r.options.multiDrag || !~i || (Q(n, r.options.selectedClass, !1), F.splice(i, 1));
      }
    },
    eventProperties: function() {
      var n = this, r = [], i = [];
      return F.forEach(function(o) {
        r.push({
          multiDragElement: o,
          index: o.sortableIndex
        });
        var s;
        wt && o !== Y ? s = -1 : wt ? s = et(o, ":not(." + n.options.selectedClass + ")") : s = et(o), i.push({
          multiDragElement: o,
          index: s
        });
      }), {
        items: Xs(F),
        clones: [].concat(Ot),
        oldIndicies: r,
        newIndicies: i
      };
    },
    optionListeners: {
      multiDragKey: function(n) {
        return n = n.toLowerCase(), n === "ctrl" ? n = "Control" : n.length > 1 && (n = n.charAt(0).toUpperCase() + n.substr(1)), n;
      }
    }
  });
}
function xa(t, e) {
  F.forEach(function(n, r) {
    var i = e.children[n.sortableIndex + (t ? Number(r) : 0)];
    i ? e.insertBefore(n, i) : e.appendChild(n);
  });
}
function kr(t, e) {
  Ot.forEach(function(n, r) {
    var i = e.children[n.sortableIndex + (t ? Number(r) : 0)];
    i ? e.insertBefore(n, i) : e.appendChild(n);
  });
}
function on() {
  F.forEach(function(t) {
    t !== Y && t.parentNode && t.parentNode.removeChild(t);
  });
}
N.mount(new va());
N.mount(Dr, Or);
const Ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MultiDrag: Sa,
  Sortable: N,
  Swap: ba,
  default: N
}, Symbol.toStringTag, { value: "Module" })), wa = /* @__PURE__ */ Hs(Ea);
(function(t, e) {
  (function(r, i) {
    t.exports = i(wa);
  })(typeof self < "u" ? self : Bs, function(n) {
    return (
      /******/
      function(r) {
        var i = {};
        function o(s) {
          if (i[s])
            return i[s].exports;
          var a = i[s] = {
            /******/
            i: s,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return r[s].call(a.exports, a, a.exports, o), a.l = !0, a.exports;
        }
        return o.m = r, o.c = i, o.d = function(s, a, l) {
          o.o(s, a) || Object.defineProperty(s, a, { enumerable: !0, get: l });
        }, o.r = function(s) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
        }, o.t = function(s, a) {
          if (a & 1 && (s = o(s)), a & 8 || a & 4 && typeof s == "object" && s && s.__esModule)
            return s;
          var l = /* @__PURE__ */ Object.create(null);
          if (o.r(l), Object.defineProperty(l, "default", { enumerable: !0, value: s }), a & 2 && typeof s != "string")
            for (var u in s)
              o.d(l, u, function(f) {
                return s[f];
              }.bind(null, u));
          return l;
        }, o.n = function(s) {
          var a = s && s.__esModule ? (
            /******/
            function() {
              return s.default;
            }
          ) : (
            /******/
            function() {
              return s;
            }
          );
          return o.d(a, "a", a), a;
        }, o.o = function(s, a) {
          return Object.prototype.hasOwnProperty.call(s, a);
        }, o.p = "", o(o.s = "fb15");
      }({
        /***/
        "01f9": (
          /***/
          function(r, i, o) {
            var s = o("2d00"), a = o("5ca1"), l = o("2aba"), u = o("32e9"), f = o("84f2"), c = o("41a0"), p = o("7f20"), g = o("38fd"), d = o("2b4c")("iterator"), h = !([].keys && "next" in [].keys()), y = "@@iterator", x = "keys", w = "values", S = function() {
              return this;
            };
            r.exports = function(T, $, B, U, A, M, I) {
              c(B, $, U);
              var z = function(v) {
                if (!h && v in K)
                  return K[v];
                switch (v) {
                  case x:
                    return function() {
                      return new B(this, v);
                    };
                  case w:
                    return function() {
                      return new B(this, v);
                    };
                }
                return function() {
                  return new B(this, v);
                };
              }, q = $ + " Iterator", it = A == w, rt = !1, K = T.prototype, H = K[d] || K[y] || A && K[A], J = H || z(A), Et = A ? it ? z("entries") : J : void 0, ft = $ == "Array" && K.entries || H, ut, b, m;
              if (ft && (m = g(ft.call(new T())), m !== Object.prototype && m.next && (p(m, q, !0), !s && typeof m[d] != "function" && u(m, d, S))), it && H && H.name !== w && (rt = !0, J = function() {
                return H.call(this);
              }), (!s || I) && (h || rt || !K[d]) && u(K, d, J), f[$] = J, f[q] = S, A)
                if (ut = {
                  values: it ? J : z(w),
                  keys: M ? J : z(x),
                  entries: Et
                }, I)
                  for (b in ut)
                    b in K || l(K, b, ut[b]);
                else
                  a(a.P + a.F * (h || rt), $, ut);
              return ut;
            };
          }
        ),
        /***/
        "02f4": (
          /***/
          function(r, i, o) {
            var s = o("4588"), a = o("be13");
            r.exports = function(l) {
              return function(u, f) {
                var c = String(a(u)), p = s(f), g = c.length, d, h;
                return p < 0 || p >= g ? l ? "" : void 0 : (d = c.charCodeAt(p), d < 55296 || d > 56319 || p + 1 === g || (h = c.charCodeAt(p + 1)) < 56320 || h > 57343 ? l ? c.charAt(p) : d : l ? c.slice(p, p + 2) : (d - 55296 << 10) + (h - 56320) + 65536);
              };
            };
          }
        ),
        /***/
        "0390": (
          /***/
          function(r, i, o) {
            var s = o("02f4")(!0);
            r.exports = function(a, l, u) {
              return l + (u ? s(a, l).length : 1);
            };
          }
        ),
        /***/
        "0bfb": (
          /***/
          function(r, i, o) {
            var s = o("cb7c");
            r.exports = function() {
              var a = s(this), l = "";
              return a.global && (l += "g"), a.ignoreCase && (l += "i"), a.multiline && (l += "m"), a.unicode && (l += "u"), a.sticky && (l += "y"), l;
            };
          }
        ),
        /***/
        "0d58": (
          /***/
          function(r, i, o) {
            var s = o("ce10"), a = o("e11e");
            r.exports = Object.keys || function(u) {
              return s(u, a);
            };
          }
        ),
        /***/
        1495: (
          /***/
          function(r, i, o) {
            var s = o("86cc"), a = o("cb7c"), l = o("0d58");
            r.exports = o("9e1e") ? Object.defineProperties : function(f, c) {
              a(f);
              for (var p = l(c), g = p.length, d = 0, h; g > d; )
                s.f(f, h = p[d++], c[h]);
              return f;
            };
          }
        ),
        /***/
        "214f": (
          /***/
          function(r, i, o) {
            o("b0c5");
            var s = o("2aba"), a = o("32e9"), l = o("79e5"), u = o("be13"), f = o("2b4c"), c = o("520a"), p = f("species"), g = !l(function() {
              var h = /./;
              return h.exec = function() {
                var y = [];
                return y.groups = { a: "7" }, y;
              }, "".replace(h, "$<a>") !== "7";
            }), d = function() {
              var h = /(?:)/, y = h.exec;
              h.exec = function() {
                return y.apply(this, arguments);
              };
              var x = "ab".split(h);
              return x.length === 2 && x[0] === "a" && x[1] === "b";
            }();
            r.exports = function(h, y, x) {
              var w = f(h), S = !l(function() {
                var M = {};
                return M[w] = function() {
                  return 7;
                }, ""[h](M) != 7;
              }), T = S ? !l(function() {
                var M = !1, I = /a/;
                return I.exec = function() {
                  return M = !0, null;
                }, h === "split" && (I.constructor = {}, I.constructor[p] = function() {
                  return I;
                }), I[w](""), !M;
              }) : void 0;
              if (!S || !T || h === "replace" && !g || h === "split" && !d) {
                var $ = /./[w], B = x(
                  u,
                  w,
                  ""[h],
                  function(I, z, q, it, rt) {
                    return z.exec === c ? S && !rt ? { done: !0, value: $.call(z, q, it) } : { done: !0, value: I.call(q, z, it) } : { done: !1 };
                  }
                ), U = B[0], A = B[1];
                s(String.prototype, h, U), a(
                  RegExp.prototype,
                  w,
                  y == 2 ? function(M, I) {
                    return A.call(M, this, I);
                  } : function(M) {
                    return A.call(M, this);
                  }
                );
              }
            };
          }
        ),
        /***/
        "230e": (
          /***/
          function(r, i, o) {
            var s = o("d3f4"), a = o("7726").document, l = s(a) && s(a.createElement);
            r.exports = function(u) {
              return l ? a.createElement(u) : {};
            };
          }
        ),
        /***/
        "23c6": (
          /***/
          function(r, i, o) {
            var s = o("2d95"), a = o("2b4c")("toStringTag"), l = s(function() {
              return arguments;
            }()) == "Arguments", u = function(f, c) {
              try {
                return f[c];
              } catch {
              }
            };
            r.exports = function(f) {
              var c, p, g;
              return f === void 0 ? "Undefined" : f === null ? "Null" : typeof (p = u(c = Object(f), a)) == "string" ? p : l ? s(c) : (g = s(c)) == "Object" && typeof c.callee == "function" ? "Arguments" : g;
            };
          }
        ),
        /***/
        2621: (
          /***/
          function(r, i) {
            i.f = Object.getOwnPropertySymbols;
          }
        ),
        /***/
        "2aba": (
          /***/
          function(r, i, o) {
            var s = o("7726"), a = o("32e9"), l = o("69a8"), u = o("ca5a")("src"), f = o("fa5b"), c = "toString", p = ("" + f).split(c);
            o("8378").inspectSource = function(g) {
              return f.call(g);
            }, (r.exports = function(g, d, h, y) {
              var x = typeof h == "function";
              x && (l(h, "name") || a(h, "name", d)), g[d] !== h && (x && (l(h, u) || a(h, u, g[d] ? "" + g[d] : p.join(String(d)))), g === s ? g[d] = h : y ? g[d] ? g[d] = h : a(g, d, h) : (delete g[d], a(g, d, h)));
            })(Function.prototype, c, function() {
              return typeof this == "function" && this[u] || f.call(this);
            });
          }
        ),
        /***/
        "2aeb": (
          /***/
          function(r, i, o) {
            var s = o("cb7c"), a = o("1495"), l = o("e11e"), u = o("613b")("IE_PROTO"), f = function() {
            }, c = "prototype", p = function() {
              var g = o("230e")("iframe"), d = l.length, h = "<", y = ">", x;
              for (g.style.display = "none", o("fab2").appendChild(g), g.src = "javascript:", x = g.contentWindow.document, x.open(), x.write(h + "script" + y + "document.F=Object" + h + "/script" + y), x.close(), p = x.F; d--; )
                delete p[c][l[d]];
              return p();
            };
            r.exports = Object.create || function(d, h) {
              var y;
              return d !== null ? (f[c] = s(d), y = new f(), f[c] = null, y[u] = d) : y = p(), h === void 0 ? y : a(y, h);
            };
          }
        ),
        /***/
        "2b4c": (
          /***/
          function(r, i, o) {
            var s = o("5537")("wks"), a = o("ca5a"), l = o("7726").Symbol, u = typeof l == "function", f = r.exports = function(c) {
              return s[c] || (s[c] = u && l[c] || (u ? l : a)("Symbol." + c));
            };
            f.store = s;
          }
        ),
        /***/
        "2d00": (
          /***/
          function(r, i) {
            r.exports = !1;
          }
        ),
        /***/
        "2d95": (
          /***/
          function(r, i) {
            var o = {}.toString;
            r.exports = function(s) {
              return o.call(s).slice(8, -1);
            };
          }
        ),
        /***/
        "2fdb": (
          /***/
          function(r, i, o) {
            var s = o("5ca1"), a = o("d2c8"), l = "includes";
            s(s.P + s.F * o("5147")(l), "String", {
              includes: function(f) {
                return !!~a(this, f, l).indexOf(f, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          }
        ),
        /***/
        "32e9": (
          /***/
          function(r, i, o) {
            var s = o("86cc"), a = o("4630");
            r.exports = o("9e1e") ? function(l, u, f) {
              return s.f(l, u, a(1, f));
            } : function(l, u, f) {
              return l[u] = f, l;
            };
          }
        ),
        /***/
        "38fd": (
          /***/
          function(r, i, o) {
            var s = o("69a8"), a = o("4bf8"), l = o("613b")("IE_PROTO"), u = Object.prototype;
            r.exports = Object.getPrototypeOf || function(f) {
              return f = a(f), s(f, l) ? f[l] : typeof f.constructor == "function" && f instanceof f.constructor ? f.constructor.prototype : f instanceof Object ? u : null;
            };
          }
        ),
        /***/
        "41a0": (
          /***/
          function(r, i, o) {
            var s = o("2aeb"), a = o("4630"), l = o("7f20"), u = {};
            o("32e9")(u, o("2b4c")("iterator"), function() {
              return this;
            }), r.exports = function(f, c, p) {
              f.prototype = s(u, { next: a(1, p) }), l(f, c + " Iterator");
            };
          }
        ),
        /***/
        "456d": (
          /***/
          function(r, i, o) {
            var s = o("4bf8"), a = o("0d58");
            o("5eda")("keys", function() {
              return function(u) {
                return a(s(u));
              };
            });
          }
        ),
        /***/
        4588: (
          /***/
          function(r, i) {
            var o = Math.ceil, s = Math.floor;
            r.exports = function(a) {
              return isNaN(a = +a) ? 0 : (a > 0 ? s : o)(a);
            };
          }
        ),
        /***/
        4630: (
          /***/
          function(r, i) {
            r.exports = function(o, s) {
              return {
                enumerable: !(o & 1),
                configurable: !(o & 2),
                writable: !(o & 4),
                value: s
              };
            };
          }
        ),
        /***/
        "4bf8": (
          /***/
          function(r, i, o) {
            var s = o("be13");
            r.exports = function(a) {
              return Object(s(a));
            };
          }
        ),
        /***/
        5147: (
          /***/
          function(r, i, o) {
            var s = o("2b4c")("match");
            r.exports = function(a) {
              var l = /./;
              try {
                "/./"[a](l);
              } catch {
                try {
                  return l[s] = !1, !"/./"[a](l);
                } catch {
                }
              }
              return !0;
            };
          }
        ),
        /***/
        "520a": (
          /***/
          function(r, i, o) {
            var s = o("0bfb"), a = RegExp.prototype.exec, l = String.prototype.replace, u = a, f = "lastIndex", c = function() {
              var d = /a/, h = /b*/g;
              return a.call(d, "a"), a.call(h, "a"), d[f] !== 0 || h[f] !== 0;
            }(), p = /()??/.exec("")[1] !== void 0, g = c || p;
            g && (u = function(h) {
              var y = this, x, w, S, T;
              return p && (w = new RegExp("^" + y.source + "$(?!\\s)", s.call(y))), c && (x = y[f]), S = a.call(y, h), c && S && (y[f] = y.global ? S.index + S[0].length : x), p && S && S.length > 1 && l.call(S[0], w, function() {
                for (T = 1; T < arguments.length - 2; T++)
                  arguments[T] === void 0 && (S[T] = void 0);
              }), S;
            }), r.exports = u;
          }
        ),
        /***/
        "52a7": (
          /***/
          function(r, i) {
            i.f = {}.propertyIsEnumerable;
          }
        ),
        /***/
        5537: (
          /***/
          function(r, i, o) {
            var s = o("8378"), a = o("7726"), l = "__core-js_shared__", u = a[l] || (a[l] = {});
            (r.exports = function(f, c) {
              return u[f] || (u[f] = c !== void 0 ? c : {});
            })("versions", []).push({
              version: s.version,
              mode: o("2d00") ? "pure" : "global",
              copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            });
          }
        ),
        /***/
        "5ca1": (
          /***/
          function(r, i, o) {
            var s = o("7726"), a = o("8378"), l = o("32e9"), u = o("2aba"), f = o("9b43"), c = "prototype", p = function(g, d, h) {
              var y = g & p.F, x = g & p.G, w = g & p.S, S = g & p.P, T = g & p.B, $ = x ? s : w ? s[d] || (s[d] = {}) : (s[d] || {})[c], B = x ? a : a[d] || (a[d] = {}), U = B[c] || (B[c] = {}), A, M, I, z;
              x && (h = d);
              for (A in h)
                M = !y && $ && $[A] !== void 0, I = (M ? $ : h)[A], z = T && M ? f(I, s) : S && typeof I == "function" ? f(Function.call, I) : I, $ && u($, A, I, g & p.U), B[A] != I && l(B, A, z), S && U[A] != I && (U[A] = I);
            };
            s.core = a, p.F = 1, p.G = 2, p.S = 4, p.P = 8, p.B = 16, p.W = 32, p.U = 64, p.R = 128, r.exports = p;
          }
        ),
        /***/
        "5eda": (
          /***/
          function(r, i, o) {
            var s = o("5ca1"), a = o("8378"), l = o("79e5");
            r.exports = function(u, f) {
              var c = (a.Object || {})[u] || Object[u], p = {};
              p[u] = f(c), s(s.S + s.F * l(function() {
                c(1);
              }), "Object", p);
            };
          }
        ),
        /***/
        "5f1b": (
          /***/
          function(r, i, o) {
            var s = o("23c6"), a = RegExp.prototype.exec;
            r.exports = function(l, u) {
              var f = l.exec;
              if (typeof f == "function") {
                var c = f.call(l, u);
                if (typeof c != "object")
                  throw new TypeError("RegExp exec method returned something other than an Object or null");
                return c;
              }
              if (s(l) !== "RegExp")
                throw new TypeError("RegExp#exec called on incompatible receiver");
              return a.call(l, u);
            };
          }
        ),
        /***/
        "613b": (
          /***/
          function(r, i, o) {
            var s = o("5537")("keys"), a = o("ca5a");
            r.exports = function(l) {
              return s[l] || (s[l] = a(l));
            };
          }
        ),
        /***/
        "626a": (
          /***/
          function(r, i, o) {
            var s = o("2d95");
            r.exports = Object("z").propertyIsEnumerable(0) ? Object : function(a) {
              return s(a) == "String" ? a.split("") : Object(a);
            };
          }
        ),
        /***/
        6762: (
          /***/
          function(r, i, o) {
            var s = o("5ca1"), a = o("c366")(!0);
            s(s.P, "Array", {
              includes: function(u) {
                return a(this, u, arguments.length > 1 ? arguments[1] : void 0);
              }
            }), o("9c6c")("includes");
          }
        ),
        /***/
        6821: (
          /***/
          function(r, i, o) {
            var s = o("626a"), a = o("be13");
            r.exports = function(l) {
              return s(a(l));
            };
          }
        ),
        /***/
        "69a8": (
          /***/
          function(r, i) {
            var o = {}.hasOwnProperty;
            r.exports = function(s, a) {
              return o.call(s, a);
            };
          }
        ),
        /***/
        "6a99": (
          /***/
          function(r, i, o) {
            var s = o("d3f4");
            r.exports = function(a, l) {
              if (!s(a))
                return a;
              var u, f;
              if (l && typeof (u = a.toString) == "function" && !s(f = u.call(a)) || typeof (u = a.valueOf) == "function" && !s(f = u.call(a)) || !l && typeof (u = a.toString) == "function" && !s(f = u.call(a)))
                return f;
              throw TypeError("Can't convert object to primitive value");
            };
          }
        ),
        /***/
        7333: (
          /***/
          function(r, i, o) {
            var s = o("0d58"), a = o("2621"), l = o("52a7"), u = o("4bf8"), f = o("626a"), c = Object.assign;
            r.exports = !c || o("79e5")(function() {
              var p = {}, g = {}, d = Symbol(), h = "abcdefghijklmnopqrst";
              return p[d] = 7, h.split("").forEach(function(y) {
                g[y] = y;
              }), c({}, p)[d] != 7 || Object.keys(c({}, g)).join("") != h;
            }) ? function(g, d) {
              for (var h = u(g), y = arguments.length, x = 1, w = a.f, S = l.f; y > x; )
                for (var T = f(arguments[x++]), $ = w ? s(T).concat(w(T)) : s(T), B = $.length, U = 0, A; B > U; )
                  S.call(T, A = $[U++]) && (h[A] = T[A]);
              return h;
            } : c;
          }
        ),
        /***/
        7726: (
          /***/
          function(r, i) {
            var o = r.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
            typeof __g == "number" && (__g = o);
          }
        ),
        /***/
        "77f1": (
          /***/
          function(r, i, o) {
            var s = o("4588"), a = Math.max, l = Math.min;
            r.exports = function(u, f) {
              return u = s(u), u < 0 ? a(u + f, 0) : l(u, f);
            };
          }
        ),
        /***/
        "79e5": (
          /***/
          function(r, i) {
            r.exports = function(o) {
              try {
                return !!o();
              } catch {
                return !0;
              }
            };
          }
        ),
        /***/
        "7f20": (
          /***/
          function(r, i, o) {
            var s = o("86cc").f, a = o("69a8"), l = o("2b4c")("toStringTag");
            r.exports = function(u, f, c) {
              u && !a(u = c ? u : u.prototype, l) && s(u, l, { configurable: !0, value: f });
            };
          }
        ),
        /***/
        8378: (
          /***/
          function(r, i) {
            var o = r.exports = { version: "2.6.5" };
            typeof __e == "number" && (__e = o);
          }
        ),
        /***/
        "84f2": (
          /***/
          function(r, i) {
            r.exports = {};
          }
        ),
        /***/
        "86cc": (
          /***/
          function(r, i, o) {
            var s = o("cb7c"), a = o("c69a"), l = o("6a99"), u = Object.defineProperty;
            i.f = o("9e1e") ? Object.defineProperty : function(c, p, g) {
              if (s(c), p = l(p, !0), s(g), a)
                try {
                  return u(c, p, g);
                } catch {
                }
              if ("get" in g || "set" in g)
                throw TypeError("Accessors not supported!");
              return "value" in g && (c[p] = g.value), c;
            };
          }
        ),
        /***/
        "9b43": (
          /***/
          function(r, i, o) {
            var s = o("d8e8");
            r.exports = function(a, l, u) {
              if (s(a), l === void 0)
                return a;
              switch (u) {
                case 1:
                  return function(f) {
                    return a.call(l, f);
                  };
                case 2:
                  return function(f, c) {
                    return a.call(l, f, c);
                  };
                case 3:
                  return function(f, c, p) {
                    return a.call(l, f, c, p);
                  };
              }
              return function() {
                return a.apply(l, arguments);
              };
            };
          }
        ),
        /***/
        "9c6c": (
          /***/
          function(r, i, o) {
            var s = o("2b4c")("unscopables"), a = Array.prototype;
            a[s] == null && o("32e9")(a, s, {}), r.exports = function(l) {
              a[s][l] = !0;
            };
          }
        ),
        /***/
        "9def": (
          /***/
          function(r, i, o) {
            var s = o("4588"), a = Math.min;
            r.exports = function(l) {
              return l > 0 ? a(s(l), 9007199254740991) : 0;
            };
          }
        ),
        /***/
        "9e1e": (
          /***/
          function(r, i, o) {
            r.exports = !o("79e5")(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          }
        ),
        /***/
        a352: (
          /***/
          function(r, i) {
            r.exports = n;
          }
        ),
        /***/
        a481: (
          /***/
          function(r, i, o) {
            var s = o("cb7c"), a = o("4bf8"), l = o("9def"), u = o("4588"), f = o("0390"), c = o("5f1b"), p = Math.max, g = Math.min, d = Math.floor, h = /\$([$&`']|\d\d?|<[^>]*>)/g, y = /\$([$&`']|\d\d?)/g, x = function(w) {
              return w === void 0 ? w : String(w);
            };
            o("214f")("replace", 2, function(w, S, T, $) {
              return [
                // `String.prototype.replace` method
                // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                function(A, M) {
                  var I = w(this), z = A == null ? void 0 : A[S];
                  return z !== void 0 ? z.call(A, I, M) : T.call(String(I), A, M);
                },
                // `RegExp.prototype[@@replace]` method
                // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                function(U, A) {
                  var M = $(T, U, this, A);
                  if (M.done)
                    return M.value;
                  var I = s(U), z = String(this), q = typeof A == "function";
                  q || (A = String(A));
                  var it = I.global;
                  if (it) {
                    var rt = I.unicode;
                    I.lastIndex = 0;
                  }
                  for (var K = []; ; ) {
                    var H = c(I, z);
                    if (H === null || (K.push(H), !it))
                      break;
                    var J = String(H[0]);
                    J === "" && (I.lastIndex = f(z, l(I.lastIndex), rt));
                  }
                  for (var Et = "", ft = 0, ut = 0; ut < K.length; ut++) {
                    H = K[ut];
                    for (var b = String(H[0]), m = p(g(u(H.index), z.length), 0), v = [], C = 1; C < H.length; C++)
                      v.push(x(H[C]));
                    var R = H.groups;
                    if (q) {
                      var j = [b].concat(v, m, z);
                      R !== void 0 && j.push(R);
                      var G = String(A.apply(void 0, j));
                    } else
                      G = B(b, z, m, v, R, A);
                    m >= ft && (Et += z.slice(ft, m) + G, ft = m + b.length);
                  }
                  return Et + z.slice(ft);
                }
              ];
              function B(U, A, M, I, z, q) {
                var it = M + U.length, rt = I.length, K = y;
                return z !== void 0 && (z = a(z), K = h), T.call(q, K, function(H, J) {
                  var Et;
                  switch (J.charAt(0)) {
                    case "$":
                      return "$";
                    case "&":
                      return U;
                    case "`":
                      return A.slice(0, M);
                    case "'":
                      return A.slice(it);
                    case "<":
                      Et = z[J.slice(1, -1)];
                      break;
                    default:
                      var ft = +J;
                      if (ft === 0)
                        return H;
                      if (ft > rt) {
                        var ut = d(ft / 10);
                        return ut === 0 ? H : ut <= rt ? I[ut - 1] === void 0 ? J.charAt(1) : I[ut - 1] + J.charAt(1) : H;
                      }
                      Et = I[ft - 1];
                  }
                  return Et === void 0 ? "" : Et;
                });
              }
            });
          }
        ),
        /***/
        aae3: (
          /***/
          function(r, i, o) {
            var s = o("d3f4"), a = o("2d95"), l = o("2b4c")("match");
            r.exports = function(u) {
              var f;
              return s(u) && ((f = u[l]) !== void 0 ? !!f : a(u) == "RegExp");
            };
          }
        ),
        /***/
        ac6a: (
          /***/
          function(r, i, o) {
            for (var s = o("cadf"), a = o("0d58"), l = o("2aba"), u = o("7726"), f = o("32e9"), c = o("84f2"), p = o("2b4c"), g = p("iterator"), d = p("toStringTag"), h = c.Array, y = {
              CSSRuleList: !0,
              // TODO: Not spec compliant, should be false.
              CSSStyleDeclaration: !1,
              CSSValueList: !1,
              ClientRectList: !1,
              DOMRectList: !1,
              DOMStringList: !1,
              DOMTokenList: !0,
              DataTransferItemList: !1,
              FileList: !1,
              HTMLAllCollection: !1,
              HTMLCollection: !1,
              HTMLFormElement: !1,
              HTMLSelectElement: !1,
              MediaList: !0,
              // TODO: Not spec compliant, should be false.
              MimeTypeArray: !1,
              NamedNodeMap: !1,
              NodeList: !0,
              PaintRequestList: !1,
              Plugin: !1,
              PluginArray: !1,
              SVGLengthList: !1,
              SVGNumberList: !1,
              SVGPathSegList: !1,
              SVGPointList: !1,
              SVGStringList: !1,
              SVGTransformList: !1,
              SourceBufferList: !1,
              StyleSheetList: !0,
              // TODO: Not spec compliant, should be false.
              TextTrackCueList: !1,
              TextTrackList: !1,
              TouchList: !1
            }, x = a(y), w = 0; w < x.length; w++) {
              var S = x[w], T = y[S], $ = u[S], B = $ && $.prototype, U;
              if (B && (B[g] || f(B, g, h), B[d] || f(B, d, S), c[S] = h, T))
                for (U in s)
                  B[U] || l(B, U, s[U], !0);
            }
          }
        ),
        /***/
        b0c5: (
          /***/
          function(r, i, o) {
            var s = o("520a");
            o("5ca1")({
              target: "RegExp",
              proto: !0,
              forced: s !== /./.exec
            }, {
              exec: s
            });
          }
        ),
        /***/
        be13: (
          /***/
          function(r, i) {
            r.exports = function(o) {
              if (o == null)
                throw TypeError("Can't call method on  " + o);
              return o;
            };
          }
        ),
        /***/
        c366: (
          /***/
          function(r, i, o) {
            var s = o("6821"), a = o("9def"), l = o("77f1");
            r.exports = function(u) {
              return function(f, c, p) {
                var g = s(f), d = a(g.length), h = l(p, d), y;
                if (u && c != c) {
                  for (; d > h; )
                    if (y = g[h++], y != y)
                      return !0;
                } else
                  for (; d > h; h++)
                    if ((u || h in g) && g[h] === c)
                      return u || h || 0;
                return !u && -1;
              };
            };
          }
        ),
        /***/
        c649: (
          /***/
          function(r, i, o) {
            (function(s) {
              o.d(i, "c", function() {
                return g;
              }), o.d(i, "a", function() {
                return c;
              }), o.d(i, "b", function() {
                return l;
              }), o.d(i, "d", function() {
                return p;
              }), o("a481");
              function a() {
                return typeof window < "u" ? window.console : s.console;
              }
              var l = a();
              function u(d) {
                var h = /* @__PURE__ */ Object.create(null);
                return function(x) {
                  var w = h[x];
                  return w || (h[x] = d(x));
                };
              }
              var f = /-(\w)/g, c = u(function(d) {
                return d.replace(f, function(h, y) {
                  return y ? y.toUpperCase() : "";
                });
              });
              function p(d) {
                d.parentElement !== null && d.parentElement.removeChild(d);
              }
              function g(d, h, y) {
                var x = y === 0 ? d.children[0] : d.children[y - 1].nextSibling;
                d.insertBefore(h, x);
              }
            }).call(this, o("c8ba"));
          }
        ),
        /***/
        c69a: (
          /***/
          function(r, i, o) {
            r.exports = !o("9e1e") && !o("79e5")(function() {
              return Object.defineProperty(o("230e")("div"), "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          }
        ),
        /***/
        c8ba: (
          /***/
          function(r, i) {
            var o;
            o = function() {
              return this;
            }();
            try {
              o = o || new Function("return this")();
            } catch {
              typeof window == "object" && (o = window);
            }
            r.exports = o;
          }
        ),
        /***/
        ca5a: (
          /***/
          function(r, i) {
            var o = 0, s = Math.random();
            r.exports = function(a) {
              return "Symbol(".concat(a === void 0 ? "" : a, ")_", (++o + s).toString(36));
            };
          }
        ),
        /***/
        cadf: (
          /***/
          function(r, i, o) {
            var s = o("9c6c"), a = o("d53b"), l = o("84f2"), u = o("6821");
            r.exports = o("01f9")(Array, "Array", function(f, c) {
              this._t = u(f), this._i = 0, this._k = c;
            }, function() {
              var f = this._t, c = this._k, p = this._i++;
              return !f || p >= f.length ? (this._t = void 0, a(1)) : c == "keys" ? a(0, p) : c == "values" ? a(0, f[p]) : a(0, [p, f[p]]);
            }, "values"), l.Arguments = l.Array, s("keys"), s("values"), s("entries");
          }
        ),
        /***/
        cb7c: (
          /***/
          function(r, i, o) {
            var s = o("d3f4");
            r.exports = function(a) {
              if (!s(a))
                throw TypeError(a + " is not an object!");
              return a;
            };
          }
        ),
        /***/
        ce10: (
          /***/
          function(r, i, o) {
            var s = o("69a8"), a = o("6821"), l = o("c366")(!1), u = o("613b")("IE_PROTO");
            r.exports = function(f, c) {
              var p = a(f), g = 0, d = [], h;
              for (h in p)
                h != u && s(p, h) && d.push(h);
              for (; c.length > g; )
                s(p, h = c[g++]) && (~l(d, h) || d.push(h));
              return d;
            };
          }
        ),
        /***/
        d2c8: (
          /***/
          function(r, i, o) {
            var s = o("aae3"), a = o("be13");
            r.exports = function(l, u, f) {
              if (s(u))
                throw TypeError("String#" + f + " doesn't accept regex!");
              return String(a(l));
            };
          }
        ),
        /***/
        d3f4: (
          /***/
          function(r, i) {
            r.exports = function(o) {
              return typeof o == "object" ? o !== null : typeof o == "function";
            };
          }
        ),
        /***/
        d53b: (
          /***/
          function(r, i) {
            r.exports = function(o, s) {
              return { value: s, done: !!o };
            };
          }
        ),
        /***/
        d8e8: (
          /***/
          function(r, i) {
            r.exports = function(o) {
              if (typeof o != "function")
                throw TypeError(o + " is not a function!");
              return o;
            };
          }
        ),
        /***/
        e11e: (
          /***/
          function(r, i) {
            r.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
          }
        ),
        /***/
        f559: (
          /***/
          function(r, i, o) {
            var s = o("5ca1"), a = o("9def"), l = o("d2c8"), u = "startsWith", f = ""[u];
            s(s.P + s.F * o("5147")(u), "String", {
              startsWith: function(p) {
                var g = l(this, p, u), d = a(Math.min(arguments.length > 1 ? arguments[1] : void 0, g.length)), h = String(p);
                return f ? f.call(g, h, d) : g.slice(d, d + h.length) === h;
              }
            });
          }
        ),
        /***/
        f6fd: (
          /***/
          function(r, i) {
            (function(o) {
              var s = "currentScript", a = o.getElementsByTagName("script");
              s in o || Object.defineProperty(o, s, {
                get: function() {
                  try {
                    throw new Error();
                  } catch (f) {
                    var l, u = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(f.stack) || [!1])[1];
                    for (l in a)
                      if (a[l].src == u || a[l].readyState == "interactive")
                        return a[l];
                    return null;
                  }
                }
              });
            })(document);
          }
        ),
        /***/
        f751: (
          /***/
          function(r, i, o) {
            var s = o("5ca1");
            s(s.S + s.F, "Object", { assign: o("7333") });
          }
        ),
        /***/
        fa5b: (
          /***/
          function(r, i, o) {
            r.exports = o("5537")("native-function-to-string", Function.toString);
          }
        ),
        /***/
        fab2: (
          /***/
          function(r, i, o) {
            var s = o("7726").document;
            r.exports = s && s.documentElement;
          }
        ),
        /***/
        fb15: (
          /***/
          function(r, i, o) {
            if (o.r(i), typeof window < "u") {
              o("f6fd");
              var s;
              (s = window.document.currentScript) && (s = s.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)) && (o.p = s[1]);
            }
            o("f751"), o("f559"), o("ac6a"), o("cadf"), o("456d");
            function a(b) {
              if (Array.isArray(b))
                return b;
            }
            function l(b, m) {
              if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(b)))) {
                var v = [], C = !0, R = !1, j = void 0;
                try {
                  for (var G = b[Symbol.iterator](), ot; !(C = (ot = G.next()).done) && (v.push(ot.value), !(m && v.length === m)); C = !0)
                    ;
                } catch (Vt) {
                  R = !0, j = Vt;
                } finally {
                  try {
                    !C && G.return != null && G.return();
                  } finally {
                    if (R)
                      throw j;
                  }
                }
                return v;
              }
            }
            function u(b, m) {
              (m == null || m > b.length) && (m = b.length);
              for (var v = 0, C = new Array(m); v < m; v++)
                C[v] = b[v];
              return C;
            }
            function f(b, m) {
              if (b) {
                if (typeof b == "string")
                  return u(b, m);
                var v = Object.prototype.toString.call(b).slice(8, -1);
                if (v === "Object" && b.constructor && (v = b.constructor.name), v === "Map" || v === "Set")
                  return Array.from(b);
                if (v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v))
                  return u(b, m);
              }
            }
            function c() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            function p(b, m) {
              return a(b) || l(b, m) || f(b, m) || c();
            }
            o("6762"), o("2fdb");
            function g(b) {
              if (Array.isArray(b))
                return u(b);
            }
            function d(b) {
              if (typeof Symbol < "u" && Symbol.iterator in Object(b))
                return Array.from(b);
            }
            function h() {
              throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            function y(b) {
              return g(b) || d(b) || f(b) || h();
            }
            var x = o("a352"), w = /* @__PURE__ */ o.n(x), S = o("c649");
            function T(b, m, v) {
              return v === void 0 || (b = b || {}, b[m] = v), b;
            }
            function $(b, m) {
              return b.map(function(v) {
                return v.elm;
              }).indexOf(m);
            }
            function B(b, m, v, C) {
              if (!b)
                return [];
              var R = b.map(function(ot) {
                return ot.elm;
              }), j = m.length - C, G = y(m).map(function(ot, Vt) {
                return Vt >= j ? R.length : R.indexOf(ot);
              });
              return v ? G.filter(function(ot) {
                return ot !== -1;
              }) : G;
            }
            function U(b, m) {
              var v = this;
              this.$nextTick(function() {
                return v.$emit(b.toLowerCase(), m);
              });
            }
            function A(b) {
              var m = this;
              return function(v) {
                m.realList !== null && m["onDrag" + b](v), U.call(m, b, v);
              };
            }
            function M(b) {
              return ["transition-group", "TransitionGroup"].includes(b);
            }
            function I(b) {
              if (!b || b.length !== 1)
                return !1;
              var m = p(b, 1), v = m[0].componentOptions;
              return v ? M(v.tag) : !1;
            }
            function z(b, m, v) {
              return b[v] || (m[v] ? m[v]() : void 0);
            }
            function q(b, m, v) {
              var C = 0, R = 0, j = z(m, v, "header");
              j && (C = j.length, b = b ? [].concat(y(j), y(b)) : y(j));
              var G = z(m, v, "footer");
              return G && (R = G.length, b = b ? [].concat(y(b), y(G)) : y(G)), {
                children: b,
                headerOffset: C,
                footerOffset: R
              };
            }
            function it(b, m) {
              var v = null, C = function(Ge, Go) {
                v = T(v, Ge, Go);
              }, R = Object.keys(b).filter(function(Vt) {
                return Vt === "id" || Vt.startsWith("data-");
              }).reduce(function(Vt, Ge) {
                return Vt[Ge] = b[Ge], Vt;
              }, {});
              if (C("attrs", R), !m)
                return v;
              var j = m.on, G = m.props, ot = m.attrs;
              return C("on", j), C("props", G), Object.assign(v.attrs, ot), v;
            }
            var rt = ["Start", "Add", "Remove", "Update", "End"], K = ["Choose", "Unchoose", "Sort", "Filter", "Clone"], H = ["Move"].concat(rt, K).map(function(b) {
              return "on" + b;
            }), J = null, Et = {
              options: Object,
              list: {
                type: Array,
                required: !1,
                default: null
              },
              value: {
                type: Array,
                required: !1,
                default: null
              },
              noTransitionOnDrag: {
                type: Boolean,
                default: !1
              },
              clone: {
                type: Function,
                default: function(m) {
                  return m;
                }
              },
              element: {
                type: String,
                default: "div"
              },
              tag: {
                type: String,
                default: null
              },
              move: {
                type: Function,
                default: null
              },
              componentData: {
                type: Object,
                required: !1,
                default: null
              }
            }, ft = {
              name: "draggable",
              inheritAttrs: !1,
              props: Et,
              data: function() {
                return {
                  transitionMode: !1,
                  noneFunctionalComponentMode: !1
                };
              },
              render: function(m) {
                var v = this.$slots.default;
                this.transitionMode = I(v);
                var C = q(v, this.$slots, this.$scopedSlots), R = C.children, j = C.headerOffset, G = C.footerOffset;
                this.headerOffset = j, this.footerOffset = G;
                var ot = it(this.$attrs, this.componentData);
                return m(this.getTag(), ot, R);
              },
              created: function() {
                this.list !== null && this.value !== null && S.b.error("Value and list props are mutually exclusive! Please set one or another."), this.element !== "div" && S.b.warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props"), this.options !== void 0 && S.b.warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
              },
              mounted: function() {
                var m = this;
                if (this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional(), this.noneFunctionalComponentMode && this.transitionMode)
                  throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
                var v = {};
                rt.forEach(function(j) {
                  v["on" + j] = A.call(m, j);
                }), K.forEach(function(j) {
                  v["on" + j] = U.bind(m, j);
                });
                var C = Object.keys(this.$attrs).reduce(function(j, G) {
                  return j[Object(S.a)(G)] = m.$attrs[G], j;
                }, {}), R = Object.assign({}, this.options, C, v, {
                  onMove: function(G, ot) {
                    return m.onDragMove(G, ot);
                  }
                });
                !("draggable" in R) && (R.draggable = ">*"), this._sortable = new w.a(this.rootContainer, R), this.computeIndexes();
              },
              beforeDestroy: function() {
                this._sortable !== void 0 && this._sortable.destroy();
              },
              computed: {
                rootContainer: function() {
                  return this.transitionMode ? this.$el.children[0] : this.$el;
                },
                realList: function() {
                  return this.list ? this.list : this.value;
                }
              },
              watch: {
                options: {
                  handler: function(m) {
                    this.updateOptions(m);
                  },
                  deep: !0
                },
                $attrs: {
                  handler: function(m) {
                    this.updateOptions(m);
                  },
                  deep: !0
                },
                realList: function() {
                  this.computeIndexes();
                }
              },
              methods: {
                getIsFunctional: function() {
                  var m = this._vnode.fnOptions;
                  return m && m.functional;
                },
                getTag: function() {
                  return this.tag || this.element;
                },
                updateOptions: function(m) {
                  for (var v in m) {
                    var C = Object(S.a)(v);
                    H.indexOf(C) === -1 && this._sortable.option(C, m[v]);
                  }
                },
                getChildrenNodes: function() {
                  if (this.noneFunctionalComponentMode)
                    return this.$children[0].$slots.default;
                  var m = this.$slots.default;
                  return this.transitionMode ? m[0].child.$slots.default : m;
                },
                computeIndexes: function() {
                  var m = this;
                  this.$nextTick(function() {
                    m.visibleIndexes = B(m.getChildrenNodes(), m.rootContainer.children, m.transitionMode, m.footerOffset);
                  });
                },
                getUnderlyingVm: function(m) {
                  var v = $(this.getChildrenNodes() || [], m);
                  if (v === -1)
                    return null;
                  var C = this.realList[v];
                  return {
                    index: v,
                    element: C
                  };
                },
                getUnderlyingPotencialDraggableComponent: function(m) {
                  var v = m.__vue__;
                  return !v || !v.$options || !M(v.$options._componentTag) ? !("realList" in v) && v.$children.length === 1 && "realList" in v.$children[0] ? v.$children[0] : v : v.$parent;
                },
                emitChanges: function(m) {
                  var v = this;
                  this.$nextTick(function() {
                    v.$emit("change", m);
                  });
                },
                alterList: function(m) {
                  if (this.list) {
                    m(this.list);
                    return;
                  }
                  var v = y(this.value);
                  m(v), this.$emit("input", v);
                },
                spliceList: function() {
                  var m = arguments, v = function(R) {
                    return R.splice.apply(R, y(m));
                  };
                  this.alterList(v);
                },
                updatePosition: function(m, v) {
                  var C = function(j) {
                    return j.splice(v, 0, j.splice(m, 1)[0]);
                  };
                  this.alterList(C);
                },
                getRelatedContextFromMoveEvent: function(m) {
                  var v = m.to, C = m.related, R = this.getUnderlyingPotencialDraggableComponent(v);
                  if (!R)
                    return {
                      component: R
                    };
                  var j = R.realList, G = {
                    list: j,
                    component: R
                  };
                  if (v !== C && j && R.getUnderlyingVm) {
                    var ot = R.getUnderlyingVm(C);
                    if (ot)
                      return Object.assign(ot, G);
                  }
                  return G;
                },
                getVmIndex: function(m) {
                  var v = this.visibleIndexes, C = v.length;
                  return m > C - 1 ? C : v[m];
                },
                getComponent: function() {
                  return this.$slots.default[0].componentInstance;
                },
                resetTransitionData: function(m) {
                  if (!(!this.noTransitionOnDrag || !this.transitionMode)) {
                    var v = this.getChildrenNodes();
                    v[m].data = null;
                    var C = this.getComponent();
                    C.children = [], C.kept = void 0;
                  }
                },
                onDragStart: function(m) {
                  this.context = this.getUnderlyingVm(m.item), m.item._underlying_vm_ = this.clone(this.context.element), J = m.item;
                },
                onDragAdd: function(m) {
                  var v = m.item._underlying_vm_;
                  if (v !== void 0) {
                    Object(S.d)(m.item);
                    var C = this.getVmIndex(m.newIndex);
                    this.spliceList(C, 0, v), this.computeIndexes();
                    var R = {
                      element: v,
                      newIndex: C
                    };
                    this.emitChanges({
                      added: R
                    });
                  }
                },
                onDragRemove: function(m) {
                  if (Object(S.c)(this.rootContainer, m.item, m.oldIndex), m.pullMode === "clone") {
                    Object(S.d)(m.clone);
                    return;
                  }
                  var v = this.context.index;
                  this.spliceList(v, 1);
                  var C = {
                    element: this.context.element,
                    oldIndex: v
                  };
                  this.resetTransitionData(v), this.emitChanges({
                    removed: C
                  });
                },
                onDragUpdate: function(m) {
                  Object(S.d)(m.item), Object(S.c)(m.from, m.item, m.oldIndex);
                  var v = this.context.index, C = this.getVmIndex(m.newIndex);
                  this.updatePosition(v, C);
                  var R = {
                    element: this.context.element,
                    oldIndex: v,
                    newIndex: C
                  };
                  this.emitChanges({
                    moved: R
                  });
                },
                updateProperty: function(m, v) {
                  m.hasOwnProperty(v) && (m[v] += this.headerOffset);
                },
                computeFutureIndex: function(m, v) {
                  if (!m.element)
                    return 0;
                  var C = y(v.to.children).filter(function(ot) {
                    return ot.style.display !== "none";
                  }), R = C.indexOf(v.related), j = m.component.getVmIndex(R), G = C.indexOf(J) !== -1;
                  return G || !v.willInsertAfter ? j : j + 1;
                },
                onDragMove: function(m, v) {
                  var C = this.move;
                  if (!C || !this.realList)
                    return !0;
                  var R = this.getRelatedContextFromMoveEvent(m), j = this.context, G = this.computeFutureIndex(R, m);
                  Object.assign(j, {
                    futureIndex: G
                  });
                  var ot = Object.assign({}, m, {
                    relatedContext: R,
                    draggedContext: j
                  });
                  return C(ot, v);
                },
                onDragEnd: function() {
                  this.computeIndexes(), J = null;
                }
              }
            };
            typeof window < "u" && "Vue" in window && window.Vue.component("draggable", ft);
            var ut = ft;
            i.default = ut;
          }
        )
        /******/
      }).default
    );
  });
})(Gs);
const Oa = /* @__PURE__ */ Us(er), Da = {
  name: "vue-pivottable-ui",
  mixins: [
    Tn
  ],
  model: {
    prop: "config",
    event: "onRefresh"
  },
  props: {
    async: {
      type: Boolean,
      default: !1
    },
    hiddenAttributes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    hiddenFromAggregators: {
      type: Array,
      default: function() {
        return [];
      }
    },
    hiddenFromDragDrop: {
      type: Array,
      default: function() {
        return [];
      }
    },
    sortonlyFromDragDrop: {
      type: Array,
      default: function() {
        return [];
      }
    },
    disabledFromDragDrop: {
      type: Array,
      default: function() {
        return [];
      }
    },
    menuLimit: {
      type: Number,
      default: 500
    },
    config: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    appliedFilter() {
      return this.propsData.valueFilter;
    },
    rendererItems() {
      return this.renderers || Object.assign({}, Sr);
    },
    aggregatorItems() {
      return this.aggregators || Be;
    },
    numValsAllowed() {
      return this.aggregatorItems[this.propsData.aggregatorName]([])().numInputs || 0;
    },
    rowAttrs() {
      return this.propsData.rows.filter(
        (t) => !this.hiddenAttributes.includes(t) && !this.hiddenFromDragDrop.includes(t)
      );
    },
    colAttrs() {
      return this.propsData.cols.filter(
        (t) => !this.hiddenAttributes.includes(t) && !this.hiddenFromDragDrop.includes(t)
      );
    },
    unusedAttrs() {
      return this.propsData.attributes.filter(
        (t) => !this.propsData.rows.includes(t) && !this.propsData.cols.includes(t) && !this.hiddenAttributes.includes(t) && !this.hiddenFromDragDrop.includes(t)
      ).sort(Ao(this.unusedOrder));
    }
  },
  data() {
    return {
      propsData: {
        aggregatorName: "",
        rendererName: "",
        rowOrder: "key_a_to_z",
        colOrder: "key_a_to_z",
        vals: [],
        cols: [],
        rows: [],
        attributes: [],
        valueFilter: {},
        renderer: null
      },
      pivotData: [],
      openStatus: {},
      attrValues: {},
      unusedOrder: [],
      zIndices: {},
      maxZIndex: 1e3,
      openDropdown: !1,
      materializedInput: [],
      sortIcons: {
        key_a_to_z: {
          rowSymbol: "↕",
          colSymbol: "↔",
          next: "value_a_to_z"
        },
        value_a_to_z: {
          rowSymbol: "↓",
          colSymbol: "→",
          next: "value_z_to_a"
        },
        value_z_to_a: {
          rowSymbol: "↑",
          colSymbol: "←",
          next: "key_a_to_z"
        }
      }
    };
  },
  beforeUpdated(t) {
    this.materializeInput(t.data);
  },
  watch: {
    rowOrder: {
      handler(t) {
        this.propsData.rowOrder = t;
      }
    },
    colOrder: {
      handler(t) {
        this.propsData.colOrder = t;
      }
    },
    cols: {
      handler(t) {
        this.propsData.cols = t;
      }
    },
    rows: {
      handler(t) {
        this.propsData.rows = t;
      }
    },
    rendererName: {
      handler(t) {
        this.propsData.rendererName = t;
      }
    },
    appliedFilter: {
      handler(t, e) {
        this.$emit("update:valueFilter", t);
      },
      immediate: !0,
      deep: !0
    },
    valueFilter: {
      handler(t) {
        this.propsData.valueFilter = t;
      },
      immediate: !0,
      deep: !0
    },
    data: {
      handler(t) {
        this.init();
      },
      immediate: !0,
      deep: !0
    },
    attributes: {
      handler(t) {
        this.propsData.attributes = t.length > 0 ? t : Object.keys(this.attrValues);
      },
      deep: !0
    },
    propsData: {
      handler(t) {
        if (this.pivotData.length === 0)
          return;
        const e = {
          derivedAttributes: this.derivedAttributes,
          hiddenAttributes: this.hiddenAttributes,
          hiddenFromAggregators: this.hiddenFromAggregators,
          hiddenFromDragDrop: this.hiddenFromDragDrop,
          sortonlyFromDragDrop: this.sortonlyFromDragDrop,
          disabledFromDragDrop: this.disabledFromDragDrop,
          menuLimit: this.menuLimit,
          attributes: t.attributes,
          unusedAttrs: this.unusedAttrs,
          sorters: this.sorters,
          data: this.materializedInput,
          rowOrder: t.rowOrder,
          colOrder: t.colOrder,
          valueFilter: t.valueFilter,
          rows: t.rows,
          cols: t.cols,
          rendererName: t.rendererName,
          aggregatorName: t.aggregatorName,
          aggregators: this.aggregatorItems,
          vals: t.vals
        };
        this.$emit("onRefresh", e);
      },
      immediate: !1,
      deep: !0
    }
  },
  methods: {
    init() {
      this.materializeInput(this.data), this.propsData.vals = this.vals.slice(), this.propsData.rows = this.rows, this.propsData.cols = this.cols, this.propsData.rowOrder = this.rowOrder, this.propsData.colOrder = this.colOrder, this.propsData.rendererName = this.rendererName, this.propsData.aggregatorName = this.aggregatorName, this.propsData.attributes = this.attributes.length > 0 ? this.attributes : Object.keys(this.attrValues), this.unusedOrder = this.unusedAttrs, Object.keys(this.attrValues).forEach((t) => {
        let e = {};
        const n = this.valueFilter && this.valueFilter[t];
        n && Object.keys(n).length && (e = this.valueFilter[t]), this.updateValueFilter({
          attribute: t,
          valueFilter: e
        });
      });
    },
    assignValue(t) {
      this.$set(this.propsData.valueFilter, t, {});
    },
    propUpdater(t) {
      return (e) => {
        this.propsData[t] = e;
      };
    },
    updateValueFilter({ attribute: t, valueFilter: e }) {
      this.$set(this.propsData.valueFilter, t, e);
    },
    moveFilterBoxToTop({ attribute: t }) {
      this.maxZIndex += 1, this.zIndices[t] = this.maxZIndex + 1;
    },
    openFilterBox({ attribute: t, open: e }) {
      this.$set(this.openStatus, t, e);
    },
    closeFilterBox(t) {
      this.openStatus = {};
    },
    materializeInput(t) {
      if (this.pivotData === t)
        return;
      this.pivotData = t;
      const e = {}, n = [];
      let r = 0;
      Rt.forEachRecord(this.pivotData, this.derivedAttributes, function(i) {
        n.push(i);
        for (const o of Object.keys(i))
          o in e || (e[o] = {}, r > 0 && (e[o].null = r));
        for (const o in e) {
          const s = o in i ? i[o] : "null";
          s in e[o] || (e[o][s] = 0), e[o][s]++;
        }
        r++;
      }), this.materializedInput = n, this.attrValues = e;
    },
    makeDnDCell(t, e, n) {
      const r = this.$scopedSlots.pvtAttr;
      return O(
        Oa,
        {
          attrs: {
            draggable: "li[data-id]",
            group: "sharted",
            ghostClass: ".pvtPlaceholder",
            filter: ".pvtFilterBox",
            preventOnFilter: !1,
            tag: "td"
          },
          props: {
            value: t
          },
          staticClass: n,
          on: {
            sort: e.bind(this)
          }
        },
        [
          t.map((i) => O(zs, {
            scopedSlots: r ? {
              pvtAttr: (o) => O("slot", r(o))
            } : void 0,
            props: {
              sortable: this.sortonlyFromDragDrop.includes(i) || !this.disabledFromDragDrop.includes(i),
              draggable: !this.sortonlyFromDragDrop.includes(i) && !this.disabledFromDragDrop.includes(i),
              name: i,
              key: i,
              attrValues: this.attrValues[i],
              sorter: Cn(this.sorters, i),
              menuLimit: this.menuLimit,
              zIndex: this.zIndices[i] || this.maxZIndex,
              valueFilter: this.propsData.valueFilter[i],
              open: this.openStatus[i],
              async: this.async,
              unused: this.unusedAttrs.includes(i),
              localeStrings: this.locales[this.locale].localeStrings
            },
            domProps: {},
            on: {
              "update:filter": this.updateValueFilter,
              "moveToTop:filterbox": this.moveFilterBoxToTop,
              "open:filterbox": this.openFilterBox,
              "no:filterbox": () => this.$emit("no:filterbox")
            }
          }))
        ]
      );
    },
    rendererCell(t) {
      return this.$slots.rendererCell ? O("td", {
        staticClass: ["pvtRenderers pvtVals pvtText"]
      }, this.$slots.rendererCell) : O(
        "td",
        {
          staticClass: ["pvtRenderers"]
        },
        [
          O(Mn, {
            props: {
              values: Object.keys(this.rendererItems),
              value: t
            },
            on: {
              input: (e) => {
                this.propUpdater("rendererName")(e), this.propUpdater("renderer", this.rendererItems[this.rendererName]);
              }
            }
          })
        ]
      );
    },
    aggregatorCell(t, e) {
      return this.$slots.aggregatorCell ? O("td", {
        staticClass: ["pvtVals pvtText"]
      }, this.$slots.aggregatorCell) : O(
        "td",
        {
          staticClass: ["pvtVals"]
        },
        [
          O(
            "div",
            [
              O(Mn, {
                props: {
                  values: Object.keys(this.aggregatorItems),
                  value: t
                },
                on: {
                  input: (n) => {
                    this.propUpdater("aggregatorName")(n);
                  }
                }
              }),
              O("a", {
                staticClass: ["pvtRowOrder"],
                attrs: {
                  role: "button"
                },
                on: {
                  click: () => {
                    this.propUpdater("rowOrder")(this.sortIcons[this.propsData.rowOrder].next);
                  }
                }
              }, this.sortIcons[this.propsData.rowOrder].rowSymbol),
              O("a", {
                staticClass: ["pvtColOrder"],
                attrs: {
                  role: "button"
                },
                on: {
                  click: () => {
                    this.propUpdater("colOrder")(this.sortIcons[this.propsData.colOrder].next);
                  }
                }
              }, this.sortIcons[this.propsData.colOrder].colSymbol)
            ]
          ),
          this.numValsAllowed > 0 ? new Array(this.numValsAllowed).fill().map((n, r) => [
            O(Mn, {
              props: {
                values: Object.keys(this.attrValues).filter((i) => !this.hiddenAttributes.includes(i) && !this.hiddenFromAggregators.includes(i)),
                value: e[r]
              },
              on: {
                input: (i) => {
                  this.propsData.vals.splice(r, 1, i);
                }
              }
            })
          ]) : void 0
        ]
      );
    },
    outputCell(t, e) {
      return O(
        "td",
        {
          staticClass: ["pvtOutput"]
        },
        [
          O(xr, {
            props: Object.assign(
              t,
              { tableMaxWidth: this.tableMaxWidth }
            )
          })
        ]
      );
    }
  },
  render() {
    if (this.data.length < 1)
      return;
    const t = this.$scopedSlots.output, e = this.$slots.output, n = this.propsData.rendererName, r = this.propsData.aggregatorName, i = this.propsData.vals, o = this.makeDnDCell(
      this.unusedAttrs,
      (d) => {
        const h = d.item.getAttribute("data-id");
        this.sortonlyFromDragDrop.includes(h) && (!d.from.classList.contains("pvtUnused") || !d.to.classList.contains("pvtUnused")) || (d.from.classList.contains("pvtUnused") && (this.openFilterBox({ attribute: h, open: !1 }), this.unusedOrder.splice(d.oldIndex, 1), this.$emit("dragged:unused", h)), d.to.classList.contains("pvtUnused") && (this.openFilterBox({ attribute: h, open: !1 }), this.unusedOrder.splice(d.newIndex, 0, h), this.$emit("dropped:unused", h)));
      },
      "pvtAxisContainer pvtUnused pvtHorizList",
      O
    ), s = this.makeDnDCell(
      this.colAttrs,
      (d) => {
        const h = d.item.getAttribute("data-id");
        this.sortonlyFromDragDrop.includes(h) && (!d.from.classList.contains("pvtCols") || !d.to.classList.contains("pvtCols")) || (d.from.classList.contains("pvtCols") && (this.propsData.cols.splice(d.oldIndex, 1), this.$emit("dragged:cols", h)), d.to.classList.contains("pvtCols") && (this.propsData.cols.splice(d.newIndex, 0, h), this.$emit("dropped:cols", h)));
      },
      "pvtAxisContainer pvtHorizList pvtCols",
      O
    ), a = this.makeDnDCell(
      this.rowAttrs,
      (d) => {
        const h = d.item.getAttribute("data-id");
        this.sortonlyFromDragDrop.includes(h) && (!d.from.classList.contains("pvtRows") || !d.to.classList.contains("pvtRows")) || (d.from.classList.contains("pvtRows") && (this.propsData.rows.splice(d.oldIndex, 1), this.$emit("dragged:rows", h)), d.to.classList.contains("pvtRows") && (this.propsData.rows.splice(d.newIndex, 0, h), this.$emit("dropped:rows", h)));
      },
      "pvtAxisContainer pvtVertList pvtRows",
      O
    ), l = Object.assign({}, this.$props, {
      localeStrings: this.localeStrings,
      data: this.materializedInput,
      rowOrder: this.propsData.rowOrder,
      colOrder: this.propsData.colOrder,
      valueFilter: this.propsData.valueFilter,
      rows: this.propsData.rows,
      cols: this.propsData.cols,
      aggregators: this.aggregatorItems,
      rendererName: n,
      aggregatorName: r,
      vals: i
    });
    let u = null;
    try {
      u = new Rt(l);
    } catch (d) {
      if (console && console.error(d.stack))
        return this.computeError(O);
    }
    const f = this.rendererCell(n, O), c = this.aggregatorCell(r, i, O), p = this.outputCell(l, n.indexOf("Chart") > -1, O), g = this.$slots.colGroup;
    return O(
      "table",
      {
        staticClass: ["pvtUi"]
      },
      [
        g,
        O(
          "tbody",
          {
            on: {
              click: this.closeFilterBox
            }
          },
          [
            O(
              "tr",
              [
                f,
                o
              ]
            ),
            O(
              "tr",
              [
                c,
                s
              ]
            ),
            O(
              "tr",
              [
                a,
                e ? O("td", { staticClass: "pvtOutput" }, e) : void 0,
                t && !e ? O("td", { staticClass: "pvtOutput" }, t({ pivotData: u })) : void 0,
                !e && !t ? p : void 0
              ]
            )
          ]
        )
      ]
    );
  },
  renderError(t) {
    return this.uiRenderError(O);
  }
}, Ca = {
  aggregatorTemplates: _,
  aggregators: Be,
  derivers: js,
  locales: Fo,
  naturalSort: oe,
  numberFormat: Dn,
  getSort: Cn,
  sortAs: Ao,
  PivotData: Rt
}, Ta = {
  TableRenderer: Sr
}, Wn = {
  VuePivottable: xr,
  VuePivottableUi: Da
};
typeof window < "u" && window.Vue && window.Vue.use(xr);
const Na = (t) => {
  for (const e in Wn)
    t.component(Wn[e].name, Wn[e]);
};
export {
  Ca as PivotUtilities,
  Ta as Renderer,
  xr as VuePivottable,
  Da as VuePivottableUi,
  Na as default
};
