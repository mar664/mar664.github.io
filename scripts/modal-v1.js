(() => {
  "use strict";
  ({
    712: function (e, t) {
      var i,
        s,
        n,
        o,
        r,
        a,
        l,
        d =
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
      class c {
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
      (c.Enums = class {
        static isEnumValue(e, t) {
          return "string" == typeof e && Object.values(t).includes(e);
        }
        static isInEnum(e, t, i = !1) {
          const s = Object.values(e).some((e) => e === t);
          if (i && !s)
            throw new Error(
              `Value '${t}' must be in enum ${JSON.stringify(e)}`
            );
          return s;
        }
      }),
        (c.CSS = class {
          static insertCSSRule(e) {
            const t = window.document.styleSheets[0];
            t.insertRule(e, t.cssRules.length);
          }
        }),
        (c.Events =
          (d((i = class {}), "Events"), (i.Key = { ESC: "Escape" }), i)),
        (c.DOM =
          (d(
            (s = class {
              static instanceOf(e, t) {
                return Object.prototype.toString.call(e) === `[object ${t}]`;
              }
              static focusFirstDescendant(e) {
                for (let t = 0; t < e.childNodes.length; t++) {
                  const i = e.childNodes[t];
                  if (c.DOM.attemptFocus(i) || c.DOM.focusFirstDescendant(i))
                    return !0;
                }
                return !1;
              }
              static focusLastDescendant(e) {
                for (let t = e.childNodes.length - 1; t >= 0; t--) {
                  const i = e.childNodes[t];
                  if (c.DOM.attemptFocus(i) || c.DOM.focusLastDescendant(i))
                    return !0;
                }
                return !1;
              }
              static attemptFocus(e) {
                if (!c.DOM.isFocusable(e)) return !1;
                c.DOM.IgnoreUtilFocusChanges = !0;
                try {
                  e.focus();
                } catch (e) {}
                return (
                  (c.DOM.IgnoreUtilFocusChanges = !1),
                  document.activeElement === e
                );
              }
            }),
            "DOM"
          ),
          (s.IgnoreUtilFocusChanges = !1),
          (s.isFocusable = function (e) {
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
          s)),
        (t.default = c),
        (function (e) {
          (e.left = "left"),
            (e.right = "right"),
            (e.top = "top"),
            (e.bottom = "bottom");
        })(n || (n = {})),
        (function (e) {
          (e.click = "click"),
            (e.focus = "focus"),
            (e.keyup = "keyup"),
            (e.animationend = "animationend");
        })(o || (o = {})),
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
        })(a || (a = {})),
        (function (e) {
          (e.Element = "Element"), (e.Class = "Class");
        })(l || (l = {})),
        (function () {
          class e {
            constructor(t) {
              (this.isVisible = !1),
                (this.eventListeners = []),
                (this.modalContainer = t),
                (this.id =
                  this.modalContainer.getAttribute("id") || c.uuidv4()),
                (this.modalContainer.id = this.id),
                (this.modalContainerClass = `${e.MODAL_CLASS_PREFIX}-container-${this.id}`),
                (this.modalOverlayClass = `${e.MODAL_CLASS_PREFIX}-overlay-${this.id}`),
                (this.modalFadeInClass = `${e.MODAL_FADE_IN_CLASS}-${this.id}`),
                (this.modalFadeOutClass = `${e.MODAL_FADE_OUT_CLASS}-${this.id}`),
                this.parseDataAttributesValues(),
                this.setup();
            }
            parseDataAttributesValues() {
              const t = c.isReduced()
                ? 0
                : this.getIntValue(
                    e.DATA_ATTRIBUTE_OPEN_DURATION,
                    e.DEFAULT_DURATION
                  );
              if (void 0 === t)
                throw new Error("Open duration must not be undefined");
              this.openDuration = t;
              const i = this.getStrValue(
                e.DATA_ATTRIBUTE_OPEN_EFFECT,
                e.DEFAULT_OPEN_EFFECT
              );
              if (!i || !c.Enums.isEnumValue(i, r))
                throw new Error("Open effect type not valid");
              this.openEffectType = i;
              const s = this.getStrValue(
                e.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE,
                e.DEFAULT_TRIGGER_TYPE
              );
              if (!s || !c.Enums.isEnumValue(s, l))
                throw new Error("Open trigger type not valid");
              this.openTriggerType = s;
              const n = this.getStrValue(e.DATA_ATTRIBUTE_OPEN_TRIGGER, void 0);
              if (!n) throw new Error("Open trigger not defined");
              this.openTrigger = n;
              const o = c.isReduced()
                ? 0
                : this.getIntValue(
                    e.DATA_ATTRIBUTE_CLOSE_DURATION,
                    e.DEFAULT_DURATION
                  );
              if (void 0 === o) throw new Error("Close duration not valid");
              this.closeDuration = o;
              const d = this.getStrValue(
                e.DATA_ATTRIBUTE_CLOSE_EFFECT,
                e.DEFAULT_CLOSE_EFFECT
              );
              if (!d || !c.Enums.isEnumValue(d, a))
                throw new Error("Close effect type not valid");
              this.closeEffectType = d;
              const h = this.getStrValue(
                e.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE,
                e.DEFAULT_TRIGGER_TYPE
              );
              if (!(!h || (h && c.Enums.isEnumValue(h, l))))
                throw new Error("Secondary close trigger type invalid");
              (this.closeEffectType = d),
                (this.secondaryCloseTrigger = this.getStrValue(
                  e.DATA_ATTRIBUTE_CLOSE_TRIGGER,
                  void 0
                ));
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
                    `*[data-w-id="${this.openTrigger}"]`
                  );
                  break;
                default:
                  throw new Error("Open trigger type must be defined");
              }
              if (!i) throw new Error("Open trigger type must be defined");
              (this.openButton = i),
                this.addEventListener(
                  this.openButton,
                  o.click,
                  this.handleOpenModal.bind(this)
                ),
                (this.focusAfterClosed = this.openButton);
              const s = this.modalContainer.querySelector(
                '*[data-mr-modal-close="true"]'
              );
              if (!s) throw new Error("Close button doesn't exist");
              if (
                ((this.closeButton = s),
                (this.closeModalHandler = this.handleCloseModal.bind(this)),
                this.closeButton &&
                  this.addEventListener(
                    this.closeButton,
                    o.click,
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
                      `*[data-w-id="${this.secondaryCloseTrigger}"]`
                    );
                    break;
                  default:
                    console.log("secondary close trigger type was not defined");
                }
                e && (this.secondaryCloseButton = e),
                  this.secondaryCloseButton &&
                    this.addEventListener(
                      this.secondaryCloseButton,
                      o.click,
                      this.closeModalHandler
                    );
              }
              this.insertModalStyles(),
                (this.modalContainer.style.display = "none"),
                (this.modal.style.display = "none"),
                (this.overlay.style.display = "none");
            }
            handleAnimationOpenEnd() {
              console.log("Animation ended"),
                this.focusFirst
                  ? this.focusFirst.focus()
                  : c.DOM.focusFirstDescendant(this.modal),
                this.setFocusTrapEventListener(),
                this.setEscapeEventListener(),
                this.setClickOverlayEventListener();
            }
            handleAnimationCloseEnd() {
              console.log("Animation ended"),
                (this.modalContainer.style.display = "none"),
                this.openButton.focus(),
                this.removeFocusTrapEventListener(),
                this.removeEscapeEventListener(),
                this.removeClickOverlayEventListener();
            }
            handleCloseModal() {
              return (
                (document.body.style.overflow = "auto"),
                this.removeFocusTrapEventListener(),
                (this.isVisible = !1),
                this.overlay.animate(...this.getAnimateFadeOut()),
                this.modal
                  .animate(...this.getAnimateClose())
                  .addEventListener(
                    "finish",
                    this.handleAnimationCloseEnd.bind(this)
                  ),
                this.removeEscapeEventListener(),
                this.removeClickOverlayEventListener(),
                !0
              );
            }
            handleOpenModal() {
              (document.body.style.overflow = "hidden"),
                (this.isVisible = !0),
                this.overlay.animate(...this.getAnimateFadeIn()),
                this.modal
                  .animate(...this.getAnimateOpen())
                  .addEventListener(
                    "finish",
                    this.handleAnimationOpenEnd.bind(this)
                  ),
                (this.modalContainer.style.display = "flex");
            }
            handleEscapeEvent(e) {
              e.key === c.Events.Key.ESC &&
                this.handleCloseModal() &&
                e.stopPropagation();
            }
            addEventListener(e, t, i, s = !1) {
              e.addEventListener(t, i, s),
                this.eventListeners.push({
                  element: e,
                  type: t,
                  handler: i,
                  capture: s,
                });
            }
            removeEventListener(e, t, i, s = !1) {
              e.removeEventListener(t, i, s),
                (this.eventListeners = this.eventListeners.filter(
                  (n) =>
                    n.element !== e ||
                    n.type !== t ||
                    n.handler !== i ||
                    n.capture !== s
                ));
            }
            setEscapeEventListener() {
              var e;
              console.log("setting escape event listener"),
                (this.escapeHandler =
                  null !== (e = this.escapeHandler) && void 0 !== e
                    ? e
                    : this.handleEscapeEvent.bind(this)),
                this.addEventListener(document, o.keyup, this.escapeHandler);
            }
            removeEscapeEventListener() {
              console.log("removing escape event listener"),
                this.removeEventListener(document, o.keyup, this.escapeHandler);
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
                  o.focus,
                  this.focusEventHandler,
                  !0
                );
            }
            removeFocusTrapEventListener() {
              console.log("removing focus event listener"),
                this.removeEventListener(
                  document,
                  o.focus,
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
                    o.click,
                    this.closeModalHandler
                  ));
            }
            removeClickOverlayEventListener() {
              console.log("removing overlay event listener"),
                this.closeOnClickOverlay &&
                  this.removeEventListener(
                    this.overlay,
                    o.click,
                    this.closeModalHandler
                  );
            }
            handleTrapFocus(e) {
              if (e.target == this.preTrapNode)
                c.DOM.focusLastDescendant(this.modal);
              else if (e.target == this.postTrapNode)
                c.DOM.focusFirstDescendant(this.modal);
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
            getAnimateOpen() {
              switch (this.openEffectType.toLowerCase().split(" ")[0]) {
                case "fade":
                  return this.getAnimateFadeIn();
                case "slide":
                  return (
                    (this.slideInDir = this.openEffectType
                      .split(" ")
                      .slice(-1)[0]),
                    this.getAnimateSlideIn()
                  );
                default:
                  throw new Error("open effect type not found");
              }
            }
            getAnimateClose() {
              switch (this.closeEffectType.toLowerCase().split(" ")[0]) {
                case "fade":
                  return this.getAnimateFadeOut();
                case "slide":
                  return (
                    (this.slideOutDir = this.closeEffectType
                      .split(" ")
                      .slice(-1)[0]),
                    this.getAnimateSlideOut()
                  );
                default:
                  throw new Error("close effect type not found");
              }
            }
            getAnimateFadeIn() {
              return [
                [{ opacity: 0 }, { opacity: 1, display: "block" }],
                {
                  duration: this.openDuration,
                  iterations: 1,
                  fill: "forwards",
                },
              ];
            }
            getAnimateFadeOut() {
              return [
                [{ opacity: 1 }, { opacity: 0, display: "none" }],
                {
                  duration: this.closeDuration,
                  iterations: 1,
                  fill: "forwards",
                },
              ];
            }
            getAnimateSlideIn() {
              const e = `margin${this.slideInDir}`,
                t = [{}, {}];
              return (
                (t[0][e] = "-300%"),
                (t[1][e] = 0),
                (t[1].display = "block"),
                [
                  t,
                  {
                    duration: this.openDuration,
                    iterations: 1,
                    fill: "forwards",
                  },
                ]
              );
            }
            getAnimateSlideOut() {
              const e = `margin${this.slideOutDir}`,
                t = [{}, {}];
              return (
                (t[0][e] = 0),
                (t[1][e] = "-300%"),
                (t[1].display = "none"),
                [
                  t,
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
                ({ element: e, type: t, capture: i, handler: s }) => {
                  this.removeEventListener(e, t, s, i);
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
          function s() {
            (i = e.setupAllInstances()),
              (function () {
                const e = document.querySelector("html");
                (t = new MutationObserver(function (e, t) {
                  for (const s of e)
                    "attributes" === s.type &&
                      "class" === s.attributeName &&
                      c.DOM.instanceOf(s.target, "HTMLHtmlElement") &&
                      s.target.classList.contains("wf-design-mode") &&
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
            (e.DEFAULT_TRIGGER_TYPE = l.Element),
            (e.DEFAULT_OPEN_EFFECT = r.Fade),
            (e.DEFAULT_CLOSE_EFFECT = a.Fade),
            (e.DEFAULT_CLOSE_ON_CLICK_OVERLAY = !0),
            (e.MODAL_FADE_IN_CLASS = `${e.MODAL_CLASS_PREFIX}-fade-in`),
            (e.MODAL_FADE_OUT_CLASS = `${e.MODAL_CLASS_PREFIX}-fade-out`),
            (e.MODAL_HIDE_CLASS = `${e.MODAL_CLASS_PREFIX}-hide`),
            (e.MODAL_SLIDE_IN_FROM_CLASS = `${e.MODAL_CLASS_PREFIX}-slide-in-from`),
            (e.MODAL_SLIDE_OUT_TO_CLASS = `${e.MODAL_CLASS_PREFIX}-slide-out-to`),
            (e.MODAL_SLIDE_IN_FROM_ANIMATION_NAME = `${e.MODAL_CLASS_PREFIX}-animate-slide-in-from`),
            (e.MODAL_SLIDE_OUT_TO_ANIMATION_NAME = `${e.MODAL_CLASS_PREFIX}-animate-slide-out-to`),
            (e.MODAL_FADE_IN_ANIMATION_NAME = `${e.MODAL_CLASS_PREFIX}-animate-fade-in`),
            (e.MODAL_FADE_OUT_ANIMATION_NAME = `${e.MODAL_CLASS_PREFIX}-animate-fade-out`),
            (e.MODAL_PREVENT_SCROLL_CLASS = `${e.MODAL_CLASS_PREFIX}-prevent-scroll`),
            "loading" === document.readyState
              ? document.addEventListener("DOMContentLoaded", function () {
                  s();
                })
              : s();
        })();
    },
  })[712](0, {});
})();
