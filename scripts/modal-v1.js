(() => {
  "use strict";
  ({
    712: function (e, t) {
      var i,
        n,
        o,
        s,
        r,
        l,
        a,
        d =
          (this && this.__awaiter) ||
          function (e, t, i, n) {
            return new (i || (i = Promise))(function (o, s) {
              function r(e) {
                try {
                  a(n.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function l(e) {
                try {
                  a(n.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function a(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof i
                      ? t
                      : new i(function (e) {
                          e(t);
                        })).then(r, l);
              }
              a((n = n.apply(e, t || [])).next());
            });
          },
        c =
          (this && this.__setFunctionName) ||
          function (e, t, i) {
            return (
              "symbol" == typeof t &&
                (t = t.description ? "[".concat(t.description, "]") : ""),
              Object.defineProperty(e, "name", {
                configurable: !0,
                value: i ? "".concat(i, " ", t) : t,
              })
            );
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      class h {
        static uuidv4() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              const t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }
        static isReduced() {
          return (
            !0 === window.matchMedia("(prefers-reduced-motion: reduce)").matches
          );
        }
      }
      (h.Enums = class {
        static isEnumValue(e, t) {
          return "string" == typeof e && Object.values(t).includes(e);
        }
        static isInEnum(e, t, i = !1) {
          const n = Object.values(e).some((e) => e === t);
          if (i && !n)
            throw new Error(
              `Value '${t}' must be in enum ${JSON.stringify(e)}`
            );
          return n;
        }
      }),
        (h.CSS = class {
          static insertCSSRule(e) {
            const t = window.document.styleSheets[0];
            t.insertRule(e, t.cssRules.length);
          }
        }),
        (h.Events =
          (c((i = class {}), "Events"), (i.Key = { ESC: "Escape" }), i)),
        (h.DOM =
          (c(
            (n = class {
              static instanceOf(e, t) {
                return Object.prototype.toString.call(e) === `[object ${t}]`;
              }
              static focusFirstDescendant(e) {
                for (let t = 0; t < e.childNodes.length; t++) {
                  const i = e.childNodes[t];
                  if (h.DOM.attemptFocus(i) || h.DOM.focusFirstDescendant(i))
                    return !0;
                }
                return !1;
              }
              static focusLastDescendant(e) {
                for (let t = e.childNodes.length - 1; t >= 0; t--) {
                  const i = e.childNodes[t];
                  if (h.DOM.attemptFocus(i) || h.DOM.focusLastDescendant(i))
                    return !0;
                }
                return !1;
              }
              static attemptFocus(e) {
                if (!h.DOM.isFocusable(e)) return !1;
                h.DOM.IgnoreUtilFocusChanges = !0;
                try {
                  e.focus();
                } catch (e) {}
                return (
                  (h.DOM.IgnoreUtilFocusChanges = !1),
                  document.activeElement === e
                );
              }
            }),
            "DOM"
          ),
          (n.IgnoreUtilFocusChanges = !1),
          (n.isFocusable = function (e) {
            if (e.tabIndex < 0) return !1;
            if ("disabled" in e && e.disabled) return !1;
            switch (e.nodeName) {
              case "A":
                return (
                  !!e.getAttribute("href") && "ignore" != e.getAttribute("rel")
                );
              case "INPUT":
                return "hidden" != e.getAttribute("type");
              case "BUTTON":
              case "SELECT":
              case "TEXTAREA":
                return !0;
              default:
                return !1;
            }
          }),
          n)),
        (t.default = h),
        (function (e) {
          (e.Left = "Left"),
            (e.Right = "Right"),
            (e.Top = "Top"),
            (e.Bottom = "Bottom");
        })(o || (o = {})),
        (function (e) {
          (e.click = "click"),
            (e.focus = "focus"),
            (e.keyup = "keyup"),
            (e.animationend = "animationend");
        })(s || (s = {})),
        (function (e) {
          (e.Fade = "Fade"),
            (e["Slide From Right"] = "Slide From Right"),
            (e["Slide From Left"] = "Slide From Left"),
            (e["Slide From Top"] = "Slide From Top"),
            (e["Slide From Bottom"] = "Slide From Bottom");
        })(r || (r = {})),
        (function (e) {
          (e.Fade = "Fade"),
            (e["Slide To Right"] = "Slide To Right"),
            (e["Slide To Left"] = "Slide To Left"),
            (e["Slide To Top"] = "Slide To Top"),
            (e["Slide To Bottom"] = "Slide To Bottom");
        })(l || (l = {})),
        (function (e) {
          (e.Element = "Element"), (e.Class = "Class");
        })(a || (a = {})),
        (function () {
          class e {
            constructor(e) {
              (this.isVisible = !1),
                (this.eventListeners = []),
                (this.modalContainer = e),
                (this.id =
                  this.modalContainer.getAttribute("id") || h.uuidv4()),
                (this.modalContainer.id = this.id),
                this.parseDataAttributesValues(),
                this.setup();
            }
            parseDataAttributesValues() {
              const t = h.isReduced()
                ? 0
                : this.getIntValue(
                    e.DATA_ATTRIBUTE_OPEN_DURATION,
                    e.DEFAULT_DURATION
                  );
              if (void 0 === t)
                throw new Error("Open duration must not be undefined");
              (this.openDuration = t),
                console.log("openDuration", this.openDuration);
              const i = this.getStrValue(
                e.DATA_ATTRIBUTE_OPEN_EFFECT,
                e.DEFAULT_OPEN_EFFECT
              );
              if (!i || !h.Enums.isEnumValue(i, r))
                throw new Error("Open effect type not valid");
              (this.openEffectType = i),
                console.log("openEffectType", this.openEffectType);
              const n = this.getStrValue(
                e.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE,
                e.DEFAULT_TRIGGER_TYPE
              );
              if (!n || !h.Enums.isEnumValue(n, a))
                throw new Error("Open trigger type not valid");
              (this.openTriggerType = n),
                console.log("openTriggerType", this.openTriggerType);
              const o = this.getStrValue(e.DATA_ATTRIBUTE_OPEN_TRIGGER, void 0);
              if (!o) throw new Error("Open trigger not defined");
              (this.openTrigger = o),
                console.log("openTrigger", this.openTrigger);
              const s = h.isReduced()
                ? 0
                : this.getIntValue(
                    e.DATA_ATTRIBUTE_CLOSE_DURATION,
                    e.DEFAULT_DURATION
                  );
              if (void 0 === s) throw new Error("Close duration not valid");
              (this.closeDuration = s),
                console.log("closeDuration", this.closeDuration);
              const d = this.getStrValue(
                e.DATA_ATTRIBUTE_CLOSE_EFFECT,
                e.DEFAULT_CLOSE_EFFECT
              );
              if (!d || !h.Enums.isEnumValue(d, l))
                throw new Error("Close effect type not valid");
              (this.closeEffectType = d),
                console.log("closeEffectType", this.closeEffectType);
              const c = this.getStrValue(
                e.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE,
                e.DEFAULT_TRIGGER_TYPE
              );
              if (!c || !h.Enums.isEnumValue(c, a))
                throw new Error("Secondary close trigger type invalid");
              (this.secondaryCloseTriggerType = c),
                console.log(
                  "secondaryCloseTriggerType",
                  this.secondaryCloseTriggerType
                ),
                (this.secondaryCloseTrigger = this.getStrValue(
                  e.DATA_ATTRIBUTE_CLOSE_TRIGGER,
                  void 0
                )),
                console.log(
                  "secondaryCloseTrigger",
                  this.secondaryCloseTrigger
                );
              const u = this.getBoolValue(
                e.DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY,
                e.DEFAULT_CLOSE_ON_CLICK_OVERLAY
              );
              if (void 0 === u)
                throw new Error("Close on click overlay must be defined");
              this.closeOnClickOverlay = u;
            }
            setupFocusTrapDivs() {
              const e = document.createElement("div");
              (this.preTrapNode = this.modalContainer.insertBefore(
                e,
                this.modal
              )),
                (this.preTrapNode.tabIndex = 0);
              const t = document.createElement("div");
              (this.postTrapNode = this.modalContainer.insertBefore(
                t,
                this.modal.nextSibling
              )),
                (this.postTrapNode.tabIndex = 0);
            }
            validateValidModalContainer() {
              const e = ["dialog", "alertdialog"];
              if (
                !(this.modal.getAttribute("role") || "")
                  .trim()
                  .split(/\s+/g)
                  .some(function (t) {
                    return e.some(function (e) {
                      return t === e;
                    });
                  })
              )
                throw new Error(
                  "Modal() requires a DOM element with ARIA role of dialog or alertdialog."
                );
            }
            setup() {
              const e = this.modalContainer.querySelector(
                'section[aria-modal="true"]'
              );
              if (!e)
                throw new Error(
                  "Modal() requires a section container within the modal container with aria-modal='true'"
                );
              (this.modal = e), this.validateValidModalContainer();
              const t = this.modalContainer.querySelector(
                'div[data-mr-modal-overlay="true"]'
              );
              if (
                (t
                  ? (this.overlay = t)
                  : ((this.overlay = document.createElement("div")),
                    this.modalContainer.insertBefore(this.overlay, this.modal)),
                this.setupFocusTrapDivs(),
                void 0 === this.openTrigger)
              )
                throw new Error("Open trigger must be defined");
              let i;
              switch (this.openTriggerType) {
                case "Class":
                  i = document.querySelector(this.openTrigger);
                  break;
                case "Element":
                  i = document.querySelector(
                    `*[data-mr-modal-id="${this.openTrigger}"]`
                  );
                  break;
                default:
                  throw new Error("Open trigger type must be defined");
              }
              if (!i) throw new Error("Open trigger type must be defined");
              (this.openButton = i),
                this.addEventListener(
                  this.openButton,
                  s.click,
                  this.handleOpenModal.bind(this)
                ),
                (this.focusAfterClosed = this.openButton);
              const n = this.modalContainer.querySelector(
                '*[data-mr-modal-close="true"]'
              );
              if (!n) throw new Error("Close button doesn't exist");
              if (
                ((this.closeButton = n),
                (this.closeModalHandler = this.handleCloseModal.bind(this)),
                this.closeButton &&
                  this.addEventListener(
                    this.closeButton,
                    s.click,
                    this.closeModalHandler
                  ),
                this.secondaryCloseTriggerType && this.secondaryCloseTrigger)
              ) {
                let e = null;
                switch (this.secondaryCloseTriggerType) {
                  case "Class":
                    e = this.modalContainer.querySelector(
                      this.secondaryCloseTrigger
                    );
                    break;
                  case "Element":
                    e = this.modalContainer.querySelector(
                      `*[data-mr-modal-id="${this.secondaryCloseTrigger}"]`
                    );
                    break;
                  default:
                    console.log("secondary close trigger type was not defined");
                }
                e && (this.secondaryCloseButton = e),
                  this.secondaryCloseButton &&
                    this.addEventListener(
                      this.secondaryCloseButton,
                      s.click,
                      this.closeModalHandler
                    );
              }
              this.insertModalStyles(),
                (this.modalContainer.style.display = "none"),
                (this.modal.style.display = "none"),
                (this.overlay.style.display = "none");
            }
            handleAnimationOpenEnd() {
              console.log("Open animation ended"),
                this.focusFirst
                  ? this.focusFirst.focus()
                  : h.DOM.focusFirstDescendant(this.modal),
                this.setFocusTrapEventListener(),
                this.setEscapeEventListener(),
                this.setClickOverlayEventListener();
            }
            handleAnimationCloseEnd() {
              console.log("Close animation ended"),
                (this.modalContainer.style.display = "none"),
                (this.overlay.style.display = "none"),
                (this.modal.style.display = "none"),
                (this.modal.style.margin = "0"),
                this.openButton.focus();
            }
            handleCloseModal() {
              return d(this, void 0, void 0, function* () {
                (document.body.style.overflow = "auto"),
                  this.removeFocusTrapEventListener(),
                  this.removeEscapeEventListener(),
                  this.removeClickOverlayEventListener();
                const e = this.overlay.animate(
                    ...this.getAnimateFadeOut(this.overlay)
                  ),
                  t = this.modal.animate(...this.getAnimateClose(this.overlay));
                return (
                  yield e.finished,
                  e.commitStyles(),
                  e.cancel(),
                  yield t.finished,
                  t.commitStyles(),
                  t.cancel(),
                  this.handleAnimationCloseEnd(),
                  !0
                );
              });
            }
            handleOpenModal() {
              return d(this, void 0, void 0, function* () {
                document.body.style.overflow = "hidden";
                const e = this.overlay.animate(
                    ...this.getAnimateFadeIn(this.overlay)
                  ),
                  t = this.modal.animate(...this.getAnimateOpen(this.modal));
                (this.modalContainer.style.display = "flex"),
                  yield e.finished,
                  e.commitStyles(),
                  e.cancel(),
                  yield t.finished,
                  t.commitStyles(),
                  t.cancel(),
                  this.handleAnimationOpenEnd();
              });
            }
            handleEscapeEvent(e) {
              return d(this, void 0, void 0, function* () {
                e.key === h.Events.Key.ESC &&
                  (yield this.handleCloseModal()) &&
                  e.stopPropagation();
              });
            }
            addEventListener(e, t, i, n = !1) {
              e.addEventListener(t, i, n),
                this.eventListeners.push({
                  element: e,
                  type: t,
                  handler: i,
                  capture: n,
                });
            }
            removeEventListener(e, t, i, n = !1) {
              e.removeEventListener(t, i, n),
                (this.eventListeners = this.eventListeners.filter(
                  (o) =>
                    o.element !== e ||
                    o.type !== t ||
                    o.handler !== i ||
                    o.capture !== n
                ));
            }
            setEscapeEventListener() {
              var e;
              console.log("setting escape event listener"),
                (this.escapeHandler =
                  null !== (e = this.escapeHandler) && void 0 !== e
                    ? e
                    : this.handleEscapeEvent.bind(this)),
                this.addEventListener(document, s.keyup, this.escapeHandler);
            }
            removeEscapeEventListener() {
              console.log("removing escape event listener"),
                this.removeEventListener(document, s.keyup, this.escapeHandler);
            }
            setFocusTrapEventListener() {
              var e;
              console.log("setting focus event listener"),
                (this.focusEventHandler =
                  null !== (e = this.focusEventHandler) && void 0 !== e
                    ? e
                    : this.handleTrapFocus.bind(this)),
                this.addEventListener(
                  document,
                  s.focus,
                  this.focusEventHandler,
                  !0
                );
            }
            removeFocusTrapEventListener() {
              console.log("removing focus event listener"),
                this.removeEventListener(
                  document,
                  s.focus,
                  this.focusEventHandler,
                  !0
                );
            }
            setClickOverlayEventListener() {
              var e;
              console.log("setting overlay event listener"),
                this.closeOnClickOverlay &&
                  ((this.closeModalHandler =
                    null !== (e = this.closeModalHandler) && void 0 !== e
                      ? e
                      : this.handleCloseModal.bind(this)),
                  this.addEventListener(
                    this.overlay,
                    s.click,
                    this.closeModalHandler
                  ));
            }
            removeClickOverlayEventListener() {
              console.log("removing overlay event listener"),
                this.closeOnClickOverlay &&
                  this.removeEventListener(
                    this.overlay,
                    s.click,
                    this.closeModalHandler
                  );
            }
            handleTrapFocus(e) {
              if (e.target == this.preTrapNode)
                h.DOM.focusLastDescendant(this.modal);
              else if (e.target == this.postTrapNode)
                h.DOM.focusFirstDescendant(this.modal);
              else if (!this.modal.contains(e.target))
                throw new Error("Focus trap not working correctly");
            }
            getIntValue(e, t) {
              const i = parseInt(this.modalContainer.getAttribute(e));
              return Number.isNaN(i) ? t : i;
            }
            getStrValue(e, t) {
              return this.modalContainer.getAttribute(e) || t;
            }
            getBoolValue(e, t) {
              const i = this.modalContainer.getAttribute(e);
              return (!i || "false" !== i) && t;
            }
            getAnimateOpen(e) {
              switch (this.openEffectType.split(" ")[0]) {
                case "Fade":
                  return this.getAnimateFadeIn(e);
                case "Slide":
                  return (
                    (this.slideInDir = this.openEffectType
                      .split(" ")
                      .slice(-1)[0]),
                    this.getAnimateSlideIn(e)
                  );
                default:
                  throw new Error("open effect type not found");
              }
            }
            getAnimateClose(e) {
              switch (this.closeEffectType.split(" ")[0]) {
                case "Fade":
                  return this.getAnimateFadeOut(e);
                case "Slide":
                  return (
                    (this.slideOutDir = this.closeEffectType
                      .split(" ")
                      .slice(-1)[0]),
                    this.getAnimateSlideOut(e)
                  );
                default:
                  throw new Error("close effect type not found");
              }
            }
            getAnimateFadeIn(e) {
              return (
                (e.style.opacity = "0"),
                (e.style.display = "block"),
                [
                  [{ opacity: 0 }, { opacity: 1 }],
                  {
                    duration: this.openDuration,
                    iterations: 1,
                    fill: "forwards",
                  },
                ]
              );
            }
            getAnimateFadeOut(e) {
              return (
                (e.style.opacity = "1"),
                [
                  [{ opacity: 1 }, { opacity: 0 }],
                  {
                    duration: this.closeDuration,
                    iterations: 1,
                    fill: "forwards",
                  },
                ]
              );
            }
            getAnimateSlideIn(e) {
              const t = `margin${this.slideInDir}`;
              (e.style[t] = "-300%"), (e.style.display = "block");
              const i = [{}, {}];
              return (
                (i[0][t] = "-300%"),
                (i[1][t] = "0"),
                [
                  i,
                  {
                    duration: this.openDuration,
                    iterations: 1,
                    fill: "forwards",
                  },
                ]
              );
            }
            getAnimateSlideOut(e) {
              const t = `margin${this.slideOutDir}`;
              e.style[t] = "0";
              const i = [{}, {}];
              return (
                (i[0][t] = "0"),
                (i[1][t] = "-300%"),
                [
                  i,
                  {
                    duration: this.closeDuration,
                    iterations: 1,
                    fill: "forwards",
                  },
                ]
              );
            }
            insertModalStyles() {
              (this.modalContainer.style.position = "fixed"),
                (this.modalContainer.style.alignItems = "center"),
                (this.modalContainer.style.justifyContent = "center"),
                (this.modalContainer.style.zIndex = "1400"),
                (this.modalContainer.style.left = "0"),
                (this.modalContainer.style.top = "0"),
                (this.modalContainer.style.width = "100vw"),
                (this.modalContainer.style.height = "100vh"),
                (this.modalContainer.style.overflow = "hidden"),
                (this.overlay.style.position = "fixed"),
                (this.overlay.style.left = "0"),
                (this.overlay.style.top = "0"),
                (this.overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)"),
                (this.overlay.style.height = "100vh"),
                (this.overlay.style.width = "100vw"),
                (this.overlay.style.overflow = "auto");
            }
            disconnect() {
              this.eventListeners.forEach(
                ({ element: e, type: t, capture: i, handler: n }) => {
                  this.removeEventListener(e, t, n, i);
                }
              );
            }
            static findAllElements() {
              return [
                ...document.querySelectorAll(
                  `*[${e.DATA_ATTRIBUTE_BASE}='true']`
                ),
              ];
            }
            static setupAllInstances() {
              return e
                .findAllElements()
                .map(function (t) {
                  try {
                    return new e(t);
                  } catch (e) {
                    console.log(e);
                  }
                })
                .filter((e) => void 0 !== e);
            }
          }
          let t, i;
          function n() {
            (i = e.setupAllInstances()),
              (function () {
                const e = document.querySelector("html");
                (t = new MutationObserver(function (e, t) {
                  for (const n of e)
                    "attributes" === n.type &&
                      "class" === n.attributeName &&
                      h.DOM.instanceOf(n.target, "HTMLHtmlElement") &&
                      n.target.classList.contains("wf-design-mode") &&
                      (console.log("disconnecting webflow preview observer"),
                      t.disconnect(),
                      i.forEach(function (e) {
                        e &&
                          (console.log("disconnecting modal"), e.disconnect());
                      }));
                })),
                  e
                    ? t.observe(e, {
                        attributes: !0,
                        attributeFilter: ["class"],
                      })
                    : console.log(
                        "Webflow designer iframe html element not found"
                      );
              })();
          }
          (e.MODAL_ATTRIBUTE_PREFIX = "mr-modal"),
            (e.MODAL_CLASS_PREFIX = "mr-modal"),
            (e.DATA_ATTRIBUTE_BASE = `data-${e.MODAL_ATTRIBUTE_PREFIX}`),
            (e.DATA_ATTRIBUTE_OPEN = `${e.DATA_ATTRIBUTE_BASE}-open`),
            (e.DATA_ATTRIBUTE_CLOSE = `${e.DATA_ATTRIBUTE_BASE}-close`),
            (e.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE = `${e.DATA_ATTRIBUTE_OPEN}-trigger-type`),
            (e.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE = `${e.DATA_ATTRIBUTE_CLOSE}-trigger-type`),
            (e.DATA_ATTRIBUTE_OPEN_TRIGGER = `${e.DATA_ATTRIBUTE_OPEN}-trigger`),
            (e.DATA_ATTRIBUTE_CLOSE_TRIGGER = `${e.DATA_ATTRIBUTE_CLOSE}-trigger`),
            (e.DATA_ATTRIBUTE_OPEN_EFFECT = `${e.DATA_ATTRIBUTE_OPEN}-effect`),
            (e.DATA_ATTRIBUTE_CLOSE_EFFECT = `${e.DATA_ATTRIBUTE_CLOSE}-effect`),
            (e.DATA_ATTRIBUTE_OPEN_DURATION = `${e.DATA_ATTRIBUTE_OPEN}-duration`),
            (e.DATA_ATTRIBUTE_CLOSE_DURATION = `${e.DATA_ATTRIBUTE_CLOSE}-duration`),
            (e.DATA_ATTRIBUTE_CLOSE_ON_CLICK_OVERLAY = `${e.DATA_ATTRIBUTE_BASE}-close-on-click-overlay`),
            (e.DEFAULT_DURATION = 1e3),
            (e.DEFAULT_TRIGGER_TYPE = a.Element),
            (e.DEFAULT_OPEN_EFFECT = r.Fade),
            (e.DEFAULT_CLOSE_EFFECT = l.Fade),
            (e.DEFAULT_CLOSE_ON_CLICK_OVERLAY = !0),
            "loading" === document.readyState
              ? document.addEventListener("DOMContentLoaded", function () {
                  n();
                })
              : n();
        })();
    },
  })[712](0, {});
})();
