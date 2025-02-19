import"./chunk-MLBA5OOW.js";import"./chunk-IVBC5U6I.js";import{a as u,c as m}from"./chunk-MXVWTELI.js";import"./chunk-ZWXP3DUJ.js";import"./chunk-7SCE5T4C.js";import"./chunk-WZQQXBRB.js";import"./chunk-32ZFFMGE.js";import"./chunk-NWDWDO22.js";import"./chunk-65E3RAOE.js";import"./chunk-R46SCLF3.js";import{d as h}from"./chunk-VIX42KOB.js";import"./chunk-O4HI6334.js";import{a as r,e as n,h as c}from"./chunk-3B44UYHW.js";import"./chunk-PTOJFFWQ.js";import"./chunk-BLPUKQJE.js";var l=class extends r{static properties={siteId:{attribute:"site-id",type:String},tool:{type:String},_results:{state:!0},_i18n:{state:!0}};constructor(){super(),this.searchTerms="",this.searchMinLengthValue=3,this.iconMapping={announcement:"si si-sakai-announcements",assignments:"si si-sakai-assignment-grades",chat:"si si-sakai-chat","sakai.conversations":"si si-sakai-conversations",forums:"si si-sakai-forums",lessons:"si si-sakai-lessonbuildertool",commons:"si si-sakai-commons",content:"si si-sakai-resources",wiki:"si si-sakai-rwiki"},this.loadTranslations("search").then(s=>{this._i18n=s,this.toolNameMapping={announcement:this._i18n.toolname_announcement,assignments:this._i18n.toolname_assignment,chat:this._i18n.toolname_chat,"sakai.conversations":this._i18n.toolname_conversations,forums:this._i18n.toolname_forum,lessons:this._i18n.toolname_lesson,commons:this._i18n.toolname_commons,content:this._i18n.toolname_resources,wiki:this._i18n.toolname_wiki}})}handleKeydownOnResult(s){s.code==="Escape"&&(s.preventDefault(),this.closeResults())}closeResults(){this._results=[],this.dispatchEvent(new CustomEvent("hiding-search-results")),this.querySelector("input").focus()}shouldUpdate(){return this._i18n}search(s){s.preventDefault();let i=document.getElementById("sakai-search-input")?.value;if(this.closeResults(),i.length>this.searchMinLengthValue-1){let t=`/api/search?terms=${i}${this.siteId?`&site=${this.siteId}`:""}${this.tool?`&tool=${this.tool}`:""}`;fetch(t,{cache:"no-cache",credentials:"same-origin"}).then(a=>{if(a.ok)return a.json();throw new Error(`Failed to get search results from ${t}.`)}).then(a=>{this.dispatchEvent(new CustomEvent("showing-search-results")),this._results=a,this.noResults=this._results.length===0,this._results.forEach(e=>{e.title.length===0&&(e.title=e.tool)}),this.updateComplete.then(()=>{this.noResults||this.querySelector(".search-result-link").focus(),document.querySelectorAll(".search-result-link").forEach(e=>{e.addEventListener("keydown",o=>{switch(o.stopPropagation(),o.code){case"ArrowDown":e.nextElementSibling.classList.contains("search-result-link")&&(e.nextElementSibling.focus(),o.preventDefault());break;case"ArrowUp":e.previousElementSibling.classList.contains("search-result-link")&&(e.previousElementSibling.focus(),o.preventDefault());break;default:}})})}),this.requestUpdate()}).catch(a=>console.error(a))}}render(){return n`
      <form class="input-group position-relative" @submit=${this.search}>
        <input type="search"
          class="sakaiSearch form-control"
          autocomplete="off"
          id="sakai-search-input"
          pattern=".{${this.searchMinLengthValue},}"
          title="${this._i18n.search_min_length.replace("{}",this.searchMinLengthValue)}"
          placeholder="${this._i18n.search_placeholder}"
          value=${this.searchTerms}
          aria-label="${this._i18n.search_placeholder}"
        />
        <button class="btn btn-primary" type="submit" id="sakai-search-button">
          Search Sakai
        </button>
      </form>
      ${this.noResults?n`
        <div class="list-group-item d-flex justify-content-between align-items-start">
           <span class="no-results">No results found :(</span>
        </div>
      `:""}
      ${this._results&&this._results.length>0?n`
        <div class="d-flex justify-content-end">
          <button type="button"
              class="btn icon-button mt-2 mb-1 fs-3 p-0"
              title="${this._i18n.close_results_tooltip}"
              aria-label="${this._i18n.close_results_tooltip}"
              @click=${this.closeResults}>
            <i class="si si-close"></i>
          </button>
        </div>
        <div>
          ${this._results&&this._results.map(s=>n`
            <a class="search-result-link" href="${s.url}" @click=${this.toggleField} @keydown=${this.handleKeydownOnResult}>
              <div class="card mb-2">
                <div class="card-body">
                  <div class="card-text">
                    <div class="mb-2">
                      <i class="search-result-tool-icon ${this.iconMapping[s.tool]}" title="${this.toolNameMapping[s.tool]}"></i>
                      <span class="search-result-toolname">${this.toolNameMapping[s.tool]}</span>
                      <span>${this._i18n.from_site}</span>
                      <span class="search-result-site-title">${s.siteTitle}</span>
                    </div>
                    <div>
                      <span class="search-result-title-label">${this._i18n.search_result_title}</span>
                      <span class="search-result-title">${s.title}</span>
                    </div>
                    <div class="search-result">${h(s.searchResult)}</div>
                  </div>
                </div>
              </div>
            </a>
          `)}
        </div>
      `:""}
    `}};customElements.define("sakai-search",l);customElements.define("sakai-calendar",u);customElements.define("sakai-grades",m);async function p(){let s=(await c("jumptotop")).jumptotop_title,i=document.querySelector(".portal-main-container"),t=document.createElement("button");t.title=s,t.ariaLabel=s,t.classList.add("jump-to-top"),t.insertAdjacentHTML("beforeend",'<i class="si si-arrow-up-circle-fill"></i>'),t.addEventListener("click",function(){i.scrollTo({top:0,behavior:"smooth"})}),i.appendChild(t),i.addEventListener("scroll",function(){i.scrollTop>500?t.classList.add("show"):t.classList.remove("show")})}p();
