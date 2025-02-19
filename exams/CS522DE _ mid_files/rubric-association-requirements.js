import{a as $}from"./chunk-FZYQHLIC.js";import{a as l}from"./chunk-7AEHLPXC.js";import{a as n}from"./chunk-J25DCTAA.js";import"./chunk-4VLFYQ4P.js";import{d as c}from"./chunk-VIX42KOB.js";import{a as f}from"./chunk-QPXFJ53C.js";import{e,f as a}from"./chunk-3B44UYHW.js";import"./chunk-PTOJFFWQ.js";import"./chunk-BLPUKQJE.js";var u=class extends n{static properties={rubricId:{attribute:"rubric-id",type:Number},siteId:{attribute:"site-id",type:String},entityId:{attribute:"entity-id",type:String},toolId:{attribute:"tool-id",type:String},evaluatedItemId:{attribute:"evaluated-item-id",type:String},evaluatedItemOwnerId:{attribute:"evaluated-item-owner-id",type:String},forcePreview:{attribute:"force-preview",type:Boolean},instructor:{type:Boolean}};constructor(){super(),this.forcePreview=!1}set siteId(t){this._siteId=t,this.i18nLoaded.then(i=>this.initLightbox(i,t))}get siteId(){return this._siteId}render(){return e`
      <a @click=${this.showRubric} href="javascript:;" title="${this._i18n.preview_rubric}">
        <span class="si si-sakai-rubrics"></span>
      </a>
    `}showRubric(){this.forcePreview?this.showRubricLightbox(this.rubricId):this.showRubricLightbox(this.rubricId,{"tool-id":this.toolId,"entity-id":this.entityId,"evaluated-item-id":this.evaluatedItemId,"evaluated-item-owner-id":this.evaluatedItemOwnerId})}releaseEvaluation(){let t=`/api/sites/${this.siteId}/rubric-evaluations/tools/${this.toolId}/items/${this.entityId}/evaluations/${this.evaluatedItemId}`;return fetch(t,{credentials:"include"}).then(i=>{if(i.status===200)return i.json();if(i.status!==204)throw new Error(`Network error while getting evaluation at ${t}`);return null}).then(async i=>{let s=i._embedded.evaluations[0];s&&(s.status=2,t=`/api/sites/${this.siteId}/rubric-evaluations/${s.id}`,await fetch(t,{body:JSON.stringify(s),credentials:"include",headers:{"Content-Type":"application/json"},method:"PATCH"}).then(r=>{if(!r.ok)throw new Error("Failed to release evaluation")}))}).catch(i=>console.error(i))}};customElements.define("sakai-rubric-student-button",u);var h=class extends n{static properties={criteria:{type:Array},weighted:{type:Boolean}};shouldUpdate(){return this.criteria&&super.shouldUpdate()}render(){return e`
      <div class="criterion grading style-scope sakai-rubric-criterion-preview">
        ${this.criteria&&this.criteria.map(t=>e`
          ${this.isCriterionGroup(t)?e`
            <div id="criterion_row_${t.id}" class="criterion-row criterion-group">
              <div class="criterion-detail">
                <h4 class="criterion-title">${t.title}</h4>
                <p>${c(t.description)}</p>
              </div>
            </div>
          `:e`
            <div id="criterion_row_${t.id}" class="criterion-row">
              <div class="criterion-detail">
                <h4 class="criterion-title">${t.title}</h4>
                <p>${c(t.description)}</p>
                ${this.weighted?e`
                  <div class="criterion-weight">
                    <span>${this._i18n.weight}</span>
                    <span>${t.weight.toLocaleString(this.locale)}</span>
                    <span>${this._i18n.percent_sign}</span>
                  </div>
                `:a}
              </div>
              <div class="criterion-ratings">
                <div class="cr-table">
                  <div class="cr-table-row">
                  ${t.ratings.map(i=>e`
                    <div class="rating-item" id="rating_item_${i.id}" >
                      <h5 class="criterion-item-title">${i.title}</h5>
                      <div class="div-description">
                        <p>${i.description}</p>
                      </div>
                      <span class="points">
                        ${this.weighted&&i.points>0?e`
                            <b>
                              (${parseFloat((i.points*(t.weight/100)).toFixed(2)).toLocaleString(this.locale)})
                            </b>`:a}
                        ${i.points.toLocaleString(this.locale)}
                        ${this._i18n.points}
                      </span>
                    </div>
                  `)}
                  </div>
                </div>
              </div>
            </div>
          `}
        `)}
      </div>
    `}};!customElements.get("sakai-rubric-criterion-preview")&&customElements.define("sakai-rubric-criterion-preview",h);var p=class extends n{static properties={criterion:{type:Object}};set criterion(t){let i=this._criterion;this._criterion=t,this._criterion.comments=t.comments&&t.comments.indexOf("null")===0?"":t.comments,this.triggerId=`criterion-comment-${t.id}-trigger`,this.requestUpdate("criterion",i),this.updateComplete.then(()=>{let s=this.querySelector("button");bootstrap.Popover.getInstance(s)?.hide(),new bootstrap.Popover(s)})}get criterion(){return this._criterion}handleClose(){bootstrap.Popover.getInstance(document.getElementById(this.triggerId))?.hide()}shouldUpdate(){return this._i18n}render(){return e`
      <button id="${f(this.triggerId)}"
          type="button"
          tabindex="0"
          data-bs-toggle="popover"
          data-bs-html="true"
          data-bs-content="${this.criterion.comments}"
          data-bs-title="${this.criterion.title}"
          aria-label="${this._i18n.criterion_comment_student}"
          class="btn btn-transparent">
        <i class="bi bi-chat${this.criterion.comments?"-fill":""} ${this.criterion.comments?"active":""}"></i>
      </button>
    `}};customElements.define("sakai-rubric-student-comment",p);var b=class extends n{static properties={criteria:{type:Array},totalPoints:Number,association:{type:Object},outcomes:{type:Array},preview:Boolean,entityId:{attribute:"entity-id",type:String},weighted:Boolean};set criteria(t){let i=this._criteria;this._criteria=t,this.criteria.forEach(s=>{s.selectedvalue||(s.selectedvalue=0),s.pointrange=this.getHighLow(s.ratings)}),this.outcomes&&this.handleOutcomes(),this.requestUpdate("criteria",i)}get criteria(){return this._criteria}set outcomes(t){let i=this._outcomes;this._outcomes=t,this.criteria&&this.handleOutcomes(),this.requestUpdate("outcomes",i)}get outcomes(){return this._outcomes}handleClose(){this.querySelectorAll("sakai-rubric-student-comment").forEach(t=>t.handleClose())}shouldUpdate(){return this.association&&this.criteria&&super.shouldUpdate()}render(){return e`
      <div class="criterion grading style-scope sakai-rubric-criterion-student" style="margin-bottom: 20px;">
        ${this.criteria.map(t=>e`
          ${this.isCriterionGroup(t)?e`
            <div id="criterion_row_${t.id}" class="criterion-row criterion-group">
              <div class="criterion-detail">
                <h4 class="criterion-title">${t.title}</h4>
                <p>${c(t.description)}</p>
              </div>
            </div>
          `:e`
            <div id="criterion_row_${t.id}" class="criterion-row">
              <div class="criterion-detail">
                <h4 class="criterion-title">${t.title}</h4>
                <p>${c(t.description)}</p>
              </div>
              ${this.weighted?e`
                <div class="criterion-weight">
                  <span>${this._i18n.weight}</span>
                  <span>${t.weight.toLocaleString(this.locale)}</span>
                  <span>${this._i18n.percent_sign}</span>
                </div>
              `:a}
              <div class="criterion-ratings">
                <div class="cr-table">
                  <div class="cr-table-row">
                  ${$(t.ratings,i=>i.id,i=>e`
                    <div class="rating-item student ${i.selected?"selected":""}" id="rating-item-${i.id}">
                      <h5 class="criterion-item-title">${i.title}</h5>
                      <p>${i.description}</p>
                      <span class="points">
                        ${this.weighted&&i.points>0?e`
                          <b>
                              (${parseFloat((i.points*(t.weight/100)).toFixed(2)).toLocaleString(this.locale)})
                          </b>
                        `:a}
                        ${i.points.toLocaleString(this.locale)}
                        ${this._i18n.points}
                      </span>
                    </div>
                  `)}
                  </div>
                </div>
              </div>
              <div class="criterion-actions">
              ${this.preview?a:e`
                <sakai-rubric-student-comment .criterion=${t}></sakai-rubric-student-comment>
                <strong class="points-display ${this.getOverriddenClass(t.pointoverride,t.selectedvalue)}">
                  ${t.selectedvalue.toLocaleString(this.locale)}
                  ${t.selectedRatingId?"":"0"}
                  &nbsp;
                </strong>
                ${this.isOverridden(t.pointoverride,t.selectedvalue)?e`<strong class="points-display">${t.pointoverride.toLocaleString(this.locale)}</strong>`:a}
              `}
              </div>
            </div>
          `}
        `)}
      </div>
      ${this.preview?a:e`
      <div class="rubric-totals" style="margin-bottom: 5px;">
        <div class="total-points"><span>${this._i18n.total}</span>: <strong>${this.totalPoints.toLocaleString(this.locale,{maximumFractionDigits:2})}</strong></div>
      </div>
      `}
    `}handleOutcomes(){this.outcomes.forEach(t=>{this.criteria.forEach(i=>{if(t.criterionId===i.id){let s=null;i.ratings.forEach(r=>{r.id==t.selectedRatingId?(r.selected=!0,s=r):r.selected=!1}),i.selectedRatingId=t.selectedRatingId,t.pointsAdjusted?(i.pointoverride=t.points,i.selectedvalue=s!=null?s.points:0):(i.pointoverride="",i.selectedvalue=t.points),i.comments=t.comments,i.comments==="undefined"&&(i.comments="")}})}),this.updateTotalPoints()}isOverridden(t,i){return this.association.parameters.fineTunePoints?!!((t||t===0)&&parseFloat(t)!==parseFloat(i)):!1}updateTotalPoints(){this.totalPoints=this.criteria.reduce((t,i)=>i.pointoverride?t+parseFloat(i.pointoverride):i.selectedvalue?t+parseFloat(i.selectedvalue):t,0),this.ready=!0}getOverriddenClass(t,i){return this.association.parameters.fineTunePoints&&(t||t===0)&&parseFloat(t)!==parseFloat(i)?"strike":""}};customElements.define("sakai-rubric-criterion-student",b);var m=class extends l(n){static properties={entityId:{attribute:"entity-id",type:String},toolId:{attribute:"tool-id",type:String},siteId:{attribute:"site-id",type:String},preview:{type:Boolean},instructor:{type:Boolean},evaluatedItemId:{attribute:"evaluated-item-id",type:String},rubricId:{attribute:"rubric-id",type:String},forcePreview:{attribute:"force-preview",type:Boolean},enablePdfExport:{attribute:"enable-pdf-export",type:Object},_rubric:{state:!0}};constructor(){super(),this.setRubricRequirements=["site-id","rubric-id","preview"],this.options={}}attributeChangedCallback(t,i,s){super.attributeChangedCallback(t,i,s),(t==="entity-id"&&this.toolId||t==="tool-id"&&this.entityId)&&this._init(),this.setRubricRequirements.includes(t)&&this._setRubric(),t==="rubric-id"&&!s&&(this._rubric=void 0)}handleClose(){let t=this.querySelector("sakai-rubric-criterion-student");t&&t.handleClose()}shouldUpdate(){return this.siteId&&this.i18nLoaded&&this._rubric&&(this.instructor||!this.options.hideStudentPreview)}render(){return console.debug("SakaiRubricStudent.render"),e`
      <hr class="itemSeparator" />

      <div class="rubric-details student-view">
        <h3>
          <span>${this._rubric.title}</span>
          ${this.enablePdfExport?e`
            <sakai-rubric-pdf
                site-id="${this.siteId}"
                rubric-title="${this._rubric.title}"
                rubric-id="${this._rubric.id}"
                tool-id="${this.toolId}"
                entity-id="${this.entityId}"
                evaluated-item-id="${this.evaluatedItemId}">
            </sakai-rubric-pdf>
          `:a}
        </h3>

        ${this.instructor==="true"?e`
        <div class="rubrics-tab-row">
          <a href="javascript:void(0);"
              id="rubric-grading-or-preview-button"
              class="rubrics-tab-button rubrics-tab-selected"
              @keypress=${this.openGradePreviewTab}
              @click=${this.openGradePreviewTab}>
            ${this._i18n.grading_rubric}
          </a>
          <a href="javascript:void(0);"
              id="rubric-student-summary-button"
              class="rubrics-tab-button"
              @keypress=${this.makeStudentSummary}
              @click=${this.makeStudentSummary}>
            ${this._i18n.student_summary}
          </a>
          <a href="javascript:void(0);"
              id="rubric-criteria-summary-button"
              class="rubrics-tab-button"
              @keypress=${this.makeCriteriaSummary}
              @click=${this.makeCriteriaSummary}>
            ${this._i18n.criteria_summary}
          </a>
        </div>
        `:a}

        <div id="rubric-grading-or-preview" class="rubric-tab-content rubrics-visible">
          ${this.preview||this.forcePreview?e`
          <sakai-rubric-criterion-preview .criteria=${this._rubric.criteria}
            ?weighted=${this._rubric.weighted}>
          </sakai-rubric-criterion-preview>
          `:e`
          <sakai-rubric-criterion-student
            .criteria=${this._rubric.criteria}
            .association=${this.association}
            .outcomes=${this.evaluation.criterionOutcomes}
            ?preview=${this.preview}
            entity-id="${this.entityId}"
            ?weighted=${this._rubric.weighted}>
          </sakai-rubric-criterion-student>
          `}
        </div>
        <div id="rubric-student-summary-${this.instanceSalt}" class="rubric-tab-content"></div>
        <div id="rubric-criteria-summary-${this.instanceSalt}" class="rubric-tab-content"></div>
      </div>
    `}_setRubric(){if(!this.siteId||!this.rubricId||!this.preview)return;let t=`/api/sites/${this.siteId}/rubrics/${this.rubricId}`;fetch(t,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(i=>{if(i.ok)return i.json();throw new Error(`Network error while getting rubric at ${t}`)}).then(i=>this._rubric=i).catch(i=>console.error(i))}_init(){console.debug("SakaiRubricStudent.init"),this.apiGetAssociation().then(t=>{if(t){this.association=t,this.options=t.parameters;let i=t.rubricId,s=`/api/sites/${t.siteId}/rubrics/${i}`;fetch(s,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(r=>{if(r.ok)return r.json();throw new Error("Server error while getting rubric")}).then(r=>{if(this.evaluatedItemId){let w=`/api/sites/${t.siteId}/rubric-evaluations/tools/${this.toolId}/items/${this.entityId}/evaluations/${this.evaluatedItemId}`;fetch(w,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(d=>{if(d.status===200)return d.json();if(d.status!==204)throw new Error(`Network error while getting evaluation at ${w}`);return null}).then(d=>{d?(this.evaluation=d,this.preview=!1):(this.evaluation={criterionOutcomes:[]},this.preview=!0),this._rubric=r}).catch(d=>console.error(d))}else this.evaluation={criterionOutcomes:[]},this.preview=!0,this._rubric=r}).catch(r=>console.error(r)),this.options.hideStudentPreview==null&&(this.options.hideStudentPreview=!1)}}).catch(t=>console.error(t))}openGradePreviewTab(t){t.stopPropagation(),this.openRubricsTab("rubric-grading-or-preview")}makeStudentSummary(t){t.stopPropagation(),this.makeASummary("student",this.siteId)}makeCriteriaSummary(t){t.stopPropagation(),this.makeASummary("criteria",this.siteId)}};!customElements.get("sakai-rubric-student")&&customElements.define("sakai-rubric-student",m);var v=class extends n{static properties={association:{type:Object},associationId:{attribute:"association-id",type:String},isAssociated:Boolean,entityId:{attribute:"entity-id",type:String},siteId:{attribute:"site-id",type:String},toolId:{attribute:"tool-id",type:String},dontAssociateLabel:{attribute:"dont-associate-label",type:String},associateLabel:{attribute:"associate-label",type:String},dontAssociateValue:{attribute:"dont-associate-value",type:Number},associateValue:{attribute:"associate-value",type:Number},fineTunePoints:{attribute:"fine-tune-points",type:String},hideStudentPreview:{attribute:"hide-student-preview",type:String},readOnly:{attribute:"read-only",type:Boolean},_selectedRubricId:{state:!0},_rubrics:{state:!0}};constructor(){super(),this.selectedConfigOptions={},this.isAssociated=!1}set siteId(t){this._siteId=t,this.i18nLoaded.then(i=>this.initLightbox(i,t)),this._getRubrics()}get siteId(){return this._siteId}set entityId(t){this._entityId=t,this.toolId&&this._getAssociation()}get entityId(){return this._entityId}set association(t){this._association=t,this._selectedRubricId=t.rubricId,this.selectedConfigOptions=t.parameters?t.parameters:{},this.isAssociated=!0,this._getRubrics()}get association(){return this._association}_toggleFineTunePoints(t){t.target.checked||confirm(this._i18n.adjust_scores_warning)||t.preventDefault()}_getAssociation(){let t=`/api/sites/${this.siteId}/rubric-associations/tools/${this.toolId}`;this.entityId&&(t+=`/items/${this.entityId}`),fetch(t,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(i=>{if(i.ok)return i.status===204?{}:i.json();throw i.status===404&&(this.style.display="none"),new Error("Network error while getting association")}).then(i=>{this.association=i,this.association?(this.isAssociated=1,this._selectedRubricId=this.association.rubricId):this.isAssociated=0,this._getRubrics()}).catch(i=>console.error(i))}_getRubrics(){let t=`/api/sites/${this.siteId}/rubrics?withshared=true`;fetch(t,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(i=>{if(i.ok)return i.status===204?{}:i.json();throw new Error("Network error while requesting rubrics")}).then(i=>this._handleRubrics(i)).catch(i=>console.error(i))}_handleRubrics(t){this._rubrics=t.slice().filter(i=>!i.draft),this._rubrics.length&&!this.isAssociated&&(this._selectedRubricId=this._rubrics[0].id)}_rubricSelected(t){this._selectedRubricId=t.target.value}_showRubric(t){t.preventDefault(),t.stopPropagation(),this.isAssociated&&this.showRubricLightbox(this._selectedRubricId)}_associate(t){this.isAssociated=t.target.value==1}shouldUpdate(){return super.shouldUpdate()&&this._rubrics&&this._rubrics.length>0}render(){return console.debug("SakaiRubricAssociation.render()"),e`
      <h4>${this._i18n.grading_rubric}</h4>
      <div class="sak-banner-warn"><small>${this._i18n.rubric_points_warning}</small></div>
      <div class="sakai-rubric-association form">
        ${this.readOnly?a:e`
          <div class="radio">
            <label>
              <input
                  @click="${this._associate}"
                  name="rbcs-associate"
                  type="radio"
                  .value="${this.dontAssociateValue}"
                  ?checked=${!this.isAssociated}
                  ?disabled=${this.readOnly}>${this.dontAssociateLabel}
            </label>
          </div>

          <div class="radio">
            <label>
              <input @click="${this._associate}" name="rbcs-associate" type="radio" class="me-1" .value="${this.associateValue}" ?checked=${this.isAssociated} ?disabled=${this.readOnly}>${this.associateLabel}
            </label>
          </div>
        `}
        <div class="rubrics-list">

          <div class="rubrics-selections">
            <select @change="${this._rubricSelected}"
                name="rbcs-rubricslist"
                aria-label="${this._i18n.rubric_selector_label}"
                class="form-control"
                ?disabled=${!this.isAssociated||this.readOnly}>
              ${this._rubrics.map(t=>e`
              <option value="${t.id}" ?selected=${t.id===this._selectedRubricId}>
                ${t.title} ${t.maxPoints?`(${t.maxPoints} ${this._i18n.points})`:""}
              </option>
              `)}
            </select>

            <button type="button" @click="${this._showRubric}" class="btn btn-link" ?disabled=${!this.isAssociated}>
              ${this._i18n.preview_rubric}
            </button>
          </div>

          ${this.readOnly?"":e`
            <div class="rubric-options">
              <div class="checkbox">
                <label>
                  <input
                      name="rbcs-config-fineTunePoints"
                      type="checkbox"
                      @click=${this._toggleFineTunePoints}
                      ?checked=${this.selectedConfigOptions.fineTunePoints}
                      value="1"
                      ?disabled=${!this.isAssociated||this.readOnly}>${this.fineTunePoints}
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input name="rbcs-config-hideStudentPreview" type="checkbox" ?checked=${this.selectedConfigOptions.hideStudentPreview} value="1" ?disabled=${!this.isAssociated||this.readOnly}>${this.hideStudentPreview}
                </label>
              </div>
            </div>
        `}
        </div>
      </div>
    `}};customElements.define("sakai-rubric-association",v);var g=class extends l(n){static properties={display:{type:String},siteId:{attribute:"site-id",type:String},toolId:{attribute:"tool-id",type:String},entityId:{attribute:"entity-id",type:String},_rubricId:{state:!0}};constructor(){super(),this.display="button"}set siteId(t){this._siteId=t,this.i18nLoaded.then(i=>this.initLightbox(i,t))}get siteId(){return this._siteId}attributeChangedCallback(t,i,s){super.attributeChangedCallback(t,i,s),this.toolId&&this.entityId&&this._setRubricId()}shouldUpdate(){return this._rubricId}render(){return console.debug("SakaiRubricStudentPreviewButton.render"),e`
      ${this.display==="button"?e`
        <h3>${this._i18n.grading_rubric}</h3>
        <button type="button" class="btn btn-link" aria-haspopup="true" @click=${this._showRubric}>${this._i18n.preview_rubric}</button>
      `:e`
        <span class="si si-sakai-rubrics" style="cursor: pointer;" title="${this.tr("preview_rubric")}" @click="${this._showRubric}"></span>
      `}
    `}_setRubricId(){this.apiGetAssociation().then(t=>{t&&!t.parameters.hideStudentPreview&&(this._rubricId=t.rubricId)}).catch(t=>console.error(t))}_showRubric(t){return t.preventDefault(),this.showRubricLightbox(this._rubricId),!1}};customElements.define("sakai-rubric-student-preview-button",g);window.top.rubrics=window.top.rubrics||{};window.top.rubrics.utils=window.top.rubrics.utils||{lightbox:null,windowRef:window!=window.top?window.top:window,initLightbox(o,t){let i=window.top.rubrics;if(this.lightbox)return;let s=document.createElement("template");s.innerHTML=`
      <div id="rubric-preview" class="modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Rubric Preview</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${o.close_dialog}"></button>
            </div>
            <div class="modal-body">
              <sakai-rubric-student site-id="${t}"></sakai-rubric-student>
            </div>
          </div>
        </div>
      </div>
    `,document.body.prepend(s.content),this.lightbox=this.windowRef.document.getElementById("rubric-preview")},closeLightbox(){let o=this.windowRef.document.querySelector("sakai-rubric-student");o.handleClose(),o.removeAttribute("rubric-id"),o.removeAttribute("preview"),o.removeAttribute("tool-id"),o.removeAttribute("entity-id"),o.removeAttribute("evaluated-item-id"),o.removeAttribute("instructor"),o.removeAttribute("evaluated-item-owner-id"),o.removeAttribute("peer-or-self")},showRubric(o,t,i){let s=this.windowRef.rubrics,r=this.windowRef.document.querySelector("sakai-rubric-student");t?(r.removeAttribute("rubric-id"),t["force-preview"]?r.setAttribute("force-preview",""):r.removeAttribute("force-preview"),r.setAttribute("tool-id",t["tool-id"]),r.setAttribute("entity-id",t["entity-id"]),r.setAttribute("evaluated-item-id",t["evaluated-item-id"]),r.setAttribute("instructor",t.instructor),r.setAttribute("evaluated-item-owner-id",t["evaluated-item-owner-id"]),r.setAttribute("peer-or-self",t["peer-or-self"])):(r.setAttribute("rubric-id",o),r.setAttribute("preview",""),r.removeAttribute("tool-id"),r.removeAttribute("entity-id"),r.removeAttribute("evaluated-item-id"),r.removeAttribute("instructor"),r.removeAttribute("evaluated-item-owner-id"),r.removeAttribute("peer-or-self")),bootstrap.Modal.getOrCreateInstance(this.lightbox).show(),this.lightbox.addEventListener("hidden.bs.modal",()=>this.closeLightbox())}};window.emitLitDebugLogEvents=!0;
