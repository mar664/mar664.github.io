(function () {
  class Modal {
    // set default values for incrementer
    static DATA_ATTRIBUTE_BASE = "data-mr-modal";
    static DATA_ATTRIBUTE_OPEN = `${Modal.DATA_ATTRIBUTE_BASE}-open`;
    static DATA_ATTRIBUTE_CLOSE = `${Modal.DATA_ATTRIBUTE_BASE}-close`;
    static DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE = `${Modal.DATA_ATTRIBUTE_OPEN}-trigger-type`;
    static DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE = `${Modal.DATA_ATTRIBUTE_CLOSE}-trigger-type`;
    static DATA_ATTRIBUTE_OPEN_TRIGGER = `${Modal.DATA_ATTRIBUTE_OPEN}-trigger`;
    static DATA_ATTRIBUTE_CLOSE_TRIGGER = `${Modal.DATA_ATTRIBUTE_CLOSE}-trigger`;
    static DATA_ATTRIBUTE_OPEN_EFFECT = `${Modal.DATA_ATTRIBUTE_OPEN}-effect`;
    static DATA_ATTRIBUTE_CLOSE_EFFECT = `${Modal.DATA_ATTRIBUTE_CLOSE}-effect`;
    static DATA_ATTRIBUTE_OPEN_DURATION = `${Modal.DATA_ATTRIBUTE_OPEN}-duration`;
    static DATA_ATTRIBUTE_CLOSE_DURATION = `${Modal.DATA_ATTRIBUTE_CLOSE}-duration`;

    static DATA_ATTRIBUTE_CLOSE_ON_CLICK_UNDERLAY = `${Modal.DATA_ATTRIBUTE_BASE}-close-on-click-underlay`;

    static DEFAULT_DURATION = 1000;

    static DEFAULT_TRIGGER_TYPE = "Class";

    static DEFAULT_CLOSE_TRIGGER = ".close-modal";

    static DEFAULT_EFFECT = "Fade";

    static DEFAULT_CLOSE_ON_CLICK_UNDERLAY = true;

    constructor(element) {
      this.element = element;
      this.id = "dffdfd";
      this.setup();
    }

    setup() {
      this.openDuration = this.getIntValue(
        Modal.DATA_ATTRIBUTE_OPEN_DURATION,
        Modal.DEFAULT_DURATION
      );

      this.openEffectType = this.getStrValue(
        Modal.DATA_ATTRIBUTE_OPEN_EFFECT,
        Modal.DEFAULT_EFFECT
      );

      this.openTriggerType = this.getStrValue(
        Modal.DATA_ATTRIBUTE_OPEN_TRIGGER_TYPE,
        Modal.DEFAULT_TRIGGER_TYPE
      );

      this.openTrigger = this.getStrValue(
        Modal.DATA_ATTRIBUTE_OPEN_TRIGGER,
        undefined
      );

      this.closeDuration = this.getIntValue(
        Modal.DATA_ATTRIBUTE_CLOSE_DURATION,
        Modal.DEFAULT_DURATION
      );

      this.closeEffectType = this.getStrValue(
        Modal.DATA_ATTRIBUTE_CLOSE_EFFECT,
        Modal.DEFAULT_EFFECT
      );

      this.closeTriggerType = this.getStrValue(
        Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER_TYPE,
        Modal.DEFAULT_TRIGGER_TYPE
      );

      this.closeTrigger = this.getStrValue(
        Modal.DATA_ATTRIBUTE_CLOSE_TRIGGER,
        Modal.DEFAULT_CLOSE_TRIGGER
      );

      this.closeOnClickUnderlay = this.getBoolValue(
        Modal.DATA_ATTRIBUTE_CLOSE_ON_CLICK_UNDERLAY,
        Modal.DEFAULT_CLOSE_ON_CLICK_UNDERLAY
      );

      this.setupOpenEffect();

      this.setupCloseEffect();

      if (this.openTrigger === undefined) {
        throw new Error("Open trigger must be defined");
      }

      let openButton;
      switch (this.openTriggerType) {
        case "Class":
          openButton = document.querySelector(this.openTrigger);
          break;
        case "Element":
          openButton = document.querySelector(`*[data-id=${this.openTrigger}]`);
          break;
        default:
          throw new Error("open trigger not found");
      }

      openButton.onclick = function () {
        this.element.classList.add("fade-in");
        this.element.firstElementChild.classList.add(this.openEffectClass);
      }.bind(this);

      let closeButton;
      switch (this.closeTriggerType) {
        case "Class":
          closeButton = document.querySelector(this.closeTrigger);
          break;
        case "Element":
          closeButton = document.querySelector(
            `*[data-id=${this.closeTrigger}]`
          );
          break;
        default:
          throw new Error("close trigger not found");
      }

      closeButton.onclick = function () {
        this.handleCloseModal();
      }.bind(this);

      if (this.closeOnClickUnderlay) {
        // if user clicks outside modal close it
        window.onclick = function (event) {
          if (event.target === this.element) {
            this.handleCloseModal();
          }
        }.bind(this);
      }

      this.modalContainerCSS();
      this.element.classList.add(`modal-container-${this.id}`);

      this.animateFadeCSSRule();
    }

    handleCloseModal() {
      this.element.classList.remove("fade-in");
      this.element.firstElementChild.classList.remove(this.openEffectClass);
      this.element.classList.add("fade-out");
      this.element.firstElementChild.classList.add(this.closeEffectClass);
      setTimeout(() => {
        this.element.classList.remove("fade-out");
        this.element.firstElementChild.classList.remove(this.closeEffectClass);
      }, this.closeDuration);
    }

    setupOpenEffect() {
      switch (this.openEffectType.split("-")[0]) {
        case "Fade":
          this.animateFadeCSSRule();
          break;
        case "Slide":
          const slideDir = this.openEffectType
            .split("-")
            .slice(-1)[0]
            .toLowerCase();

          this.animateSlideInCSSRule(slideDir);
          this.openEffectClass = `slide-in-from-${slideDir}`;
          break;
      }
    }

    setupCloseEffect() {
      switch (this.closeEffectType.split("-")[0]) {
        case "Fade":
          this.animateFadeCSSRule();
          break;
        case "Slide":
          const slideDir = this.closeEffectType
            .split("-")
            .slice(-1)[0]
            .toLowerCase();
          console.log(slideDir);
          this.animateSlideOutCSSRule(slideDir);
          this.closeEffectClass = `slide-out-to-${slideDir}`;
          break;
      }
    }

    getIntValue(attribute, defaultValue) {
      return parseInt(this.element.getAttribute(attribute)) || defaultValue;
    }

    getStrValue(attribute, defaultValue) {
      return this.element.getAttribute(attribute) || defaultValue;
    }

    getBoolValue(attribute, defaultValue) {
      const value = this.element.getAttribute(attribute);
      if (value) {
        if (value === "false") {
          return false;
        }
      }
      return defaultValue;
    }

    static findAllElements() {
      return [
        ...document.querySelectorAll(`*[${Modal.DATA_ATTRIBUTE_BASE}='true']`),
      ];
    }

    static setupAllInstances() {
      return Modal.findAllElements().map(function (instance) {
        return new Modal(instance);
      });
    }

    static insertCSSRule(rule) {
      const css = window.document.styleSheets[0];
      css.insertRule(rule, css.cssRules.length);
    }

    animateSlideInCSSRule(dir) {
      Modal.insertCSSRule(`@keyframes animate-slide-in-from-${dir} {
          from {
              ${dir}: -300px;
            }
            to {
              ${dir}: 0;
            }
          }`);
      Modal.insertCSSRule(`.slide-in-from-${dir} {
                animation-name: animate-slide-in-from-${dir};
                animation-duration: ${this.openDuration}ms;
                  }`);
    }

    animateSlideOutCSSRule(dir) {
      Modal.insertCSSRule(`@keyframes animate-slide-out-to-${dir} {
          from {
              ${dir}: 0;
            }
            to {
              ${dir}: -300px;
            }
          }`);
      Modal.insertCSSRule(`.slide-out-to-${dir} {
                animation-name: animate-slide-out-to-${dir};
                animation-duration: ${this.closeDuration}ms;
                  }`);
    }

    animateFadeCSSRule() {
      Modal.insertCSSRule(`@keyframes animate-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }`);

      Modal.insertCSSRule(`@keyframes animate-fade-out {
          from {
            opacity: 1
          }
          to {
            opacity: 0;
          }
        }`);
    }

    modalContainerCSS() {
      Modal.insertCSSRule(`
      .modal-container-${this.id} {
        display: none; 
        position: fixed;
        align-items: center;
        justify-content: center;
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0, 0, 0); 
        background-color: rgba(0, 0, 0, 0.4); 
      }`);

      Modal.insertCSSRule(`.fade-in {
          animation-name: animate-fade-in;
          animation-duration: ${this.openDuration}ms;
          display: flex;
        }`);

      Modal.insertCSSRule(`.fade-out {
          animation-name: animate-fade-out;
          animation-duration: ${this.closeDuration}ms;
          display: flex;
        }`);
    }
  }

  let webflow_preview_observer;
  let modals;

  // check if node is an instance of a specific type
  function _instanceOf(target, type) {
    return Object.prototype.toString.call(target) === `[object ${type}]`;
  }

  // observer webflow for user switching from previewer to designer
  function observeForWebflowPreviewer() {
    const element = document.querySelector("html");

    webflow_preview_observer = new MutationObserver(function (
      mutationsList,
      observer
    ) {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          _instanceOf(mutation.target, "HTMLHtmlElement")
        ) {
          const htmlElement = mutation.target;

          if (htmlElement.classList.contains("wf-design-mode")) {
            console.log("disconnecting webflow preview observer");
            observer.disconnect();
          }
        }
      }
    });

    // Start observing changes to the 'class' attribute of the <html> element
    webflow_preview_observer.observe(element, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function setupModals() {
    // Intersection Observer setup
    modals = Modal.setupAllInstances();
  }

  function loadScript() {
    setupModals();

    //observeForWebflowPreviewer();
  }

  // check whether page has already loaded for dynamic insert in webflow preview
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadScript();
    });
  } else {
    loadScript();
  }
})();
