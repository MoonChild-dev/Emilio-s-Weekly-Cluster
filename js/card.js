// Create a class for the element
class MsgBoxCard extends HTMLElement {
  static observedAttributes = ["title","imgsrc"];
content;
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    //    this.render();
    }

  render(){
    this.content=this.innerHTML;

    this.innerHTML=`
    <div class="msgboxcard">
    <div class="msgboxcardTitle"><div>${this.getAttribute("title")} <img src='${this.getAttribute("imgsrc")??""}'></div> <img class="pix" src="/assets/images/icons/close.png"></div>
    <div class="msgboxcardBody">${this.content}</div>
    </div>
    `;
  }
}

class CustomElements {
    constructor(){
        customElements.define("msgbox-card", MsgBoxCard);
    }
}
export default new CustomElements();