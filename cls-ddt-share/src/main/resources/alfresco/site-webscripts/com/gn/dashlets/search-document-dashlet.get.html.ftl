<script type="text/javascript">//<![CDATA[
   new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}");
   new Extras.FilterWorkflows("${args.htmlid}").setMessages(${messages});
//]]></script>
<div class="dashlet padding-bottom-12">
   <div class="title-wrap title">
	   <div id="assigned" class="tab active-tab-assigned">${msg("header.assigned")}</div>
   </div>
   <!-- <div class="title">${msg("header")}</div> -->
   <div class="toolbar flat-button">
   		<div class="align-left">
   			<label>${msg("label.riferimento")}:</label>
   		</div>
   		<div class="align-left">
   			<input id="wfsearch-rif-input" type="text" class="search_box_input" placeholder="${msg("placeholder.search_term")}" />
   		</div>
   </div>
  <div class="toolbar flat-button">
   		<div class="align-left">
   			<label>${msg("label.codicecliente")}:</label>
   		</div>
   		<div class="align-left">
   			<input id="wfsearch-codcli-input" type="text" class="search_box_input" placeholder="${msg("placeholder.search_term")}" />
   		</div>
   </div>
  <div class="toolbar flat-button">
   		<div class="align-left">
   			<label>${msg("label.cliente")}:</label>
   		</div>
   		<div class="align-left">
   			<input id="wfsearch-cliente-input" type="text" class="search_box_input" placeholder="${msg("placeholder.search_term")}" />
   		</div>
   </div>
    <div class="toolbar flat-button">
   		<div class="align-left">
   			<label>${msg("label.numeroddt")}:</label>
   		</div>
   		<div class="align-left">
   			<input id="wfsearch-numero-input" type="text" class="search_box_input" placeholder="${msg("placeholder.search_term")}" />
   		</div>
   </div>
   <div class="toolbar flat-button">
   		<div class="align-left">
   			<label>${msg("label.dataddt")}:</label>
   		</div>
   		<div id="cal-filter" class="align-left">
   			<input id="wfsearch-date-input" type="text" class="search_box_input" placeholder="${msg("placeholder.date")}" readonly/>
   			<div id="calendar-div" class="absolute"></div>
   		</div>
	</div>
	
   <div class="toolbar flat-button">
   		<div class="align-right yui-button yui-push-button search-icon border-width-0">
   			<button id="reset-workflows-button" type="button">${msg("btn.reset")}</button>
   		</div>
   		<div class="align-right yui-button yui-push-button search-icon border-width-0">
   			<button id="search-workflows-button" type="button">${msg("btn.search")}</button>
   		</div>
	</div>
   
   <div class="body scrollableList" <#if args.height??>style="height: ${args.height}px;"</#if>>
     <div id="list-items" class="detail-list-item first-item last-item">
     	${msg("workflows.loading")}
     </div>
   </div>
   <div id="list-item-messages" style="display:none; visbility: hidden;">
   ${msg("wf.title")},${msg("wf.before")},${msg("wf.from")},${msg("wf.type")},${msg("wf.priority")},${msg("passed.day")},${msg("passed.days")},${msg("prop.priority")},${msg("workflows.empty")},${msg("workflows.loading")},${msg("prompt.title")},${msg("prompt.text")},${msg("prompt.yes")},${msg("prompt.no")},${msg("workflows.deleting")},${msg("workflows.error")}
   </div>
</div>