<@markup id="css" >
   <#-- CSS Dependencies -->
   <@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/dashlets/hello-world.css" group="dashlets" />
   <@link href="${url.context}/res/components/search/search.css" group="search"/>
</@>


<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script type="text/javascript" src="${url.context}/res/components/search/search-lib.js" group="dashlets"/>
   <@script type="text/javascript" src="${url.context}/res/components/form/date-picker.js" group="dashlets"/>
   <@script type="text/javascript" src="${page.url.context}/res/components/dashlets/hello-world.js" group="dashlets"></@script>
</@>

<@markup id="widgets">
   <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
    <@uniqueIdDiv>
    <#assign el=args.htmlid?html>
    <#assign controlId = el + "-start-cntrl">
    <div class="dashlet documentcustomsearch">
    	<div class="title">${msg("header")}</div>
    	<div class="toolbar flat-button">
			<div id="${el}-dialog" class="create-site">

   			<div class="bd">
          		        	

            	<#-- numDDT -->
            	<div class="yui-gd">
               		<div class="yui-u first"><label for="${el}-numDdt-label">${msg("label.numddt")}:</label></div>
              	 	<div class="yui-u"><input id="${el}-numDdt" type="text" name="title" tabindex="0" maxlength="255" />&nbsp;*</div>
            	</div>

	            <#-- DateDDT -->
    	        <div class="yui-gd">
        	       <div class="yui-u first"><label for="${el}-shortName">${msg("label.shortName")}:</label></div>
            	   <div class="yui-u">
                	  <input id="${el}-shortName" type="text" name="shortName" tabindex="0" maxlength="255" />&nbsp;*<br>
                 	 <span class="help">${msg("label.shortNameHelp")}</span>
               		</div>
            	</div>

            	<#-- DESCRIPTION -->
	            <div class="yui-gd">
   		            <div class="yui-u first"><label for="${el}-description">${msg("label.description")}:</label></div>
        			<div class="yui-u"><textarea id="${el}-description" name="description" rows="3" tabindex="0"></textarea></div>
            	</div>
            
	            <#-- SITEPRESET -->
   	    		<div class="yui-gd">
    	        	<div class="yui-u first"><label for="${el}-sitePreset">${msg("label.type")}:</label></div>               
            	</div>

            	<#-- ACCESS -->
            	<div class="yui-gd">
            		<div class="yui-u first"><label for="${el}-isPublic">${msg("label.access")}:</label></div>
            		<div class="yui-u">
            			<input id="${el}-isPublic" type="radio" checked="checked" tabindex="0" name="-" /> <label for="${el}-isPublic">${msg("label.isPublic")}</label><br />
            	    	<div class="moderated">
             	      		<input id="${el}-isModerated" type="checkbox" tabindex="0" name="-" disabled /> <label for="${el}-isModerated">${msg("label.isModerated")}</label><br />
                     		<span class="help">${msg("label.moderatedHelp")}</span>
                 		</div>
               		</div>
            	</div>
            	<div class="yui-gd">
               		<div class="yui-u first">&nbsp;</div>
               		<div class="yui-u">
                  		<input id="${el}-isPrivate" type="radio" checked="checked" tabindex="0" name="-" /> <label for="${el}-isPrivate">${msg("label.isPrivate")}</label>
               		</div>
            	</div>

            	
            	
                <div class="yui-gd">
                <div class="yui-u first"><label for="fd">${msg("label.startdate")}:</label></div>
                <div class="yui-u overflow">
                   <span id="${el}-startdate">
                      <input id="fd" type="text" name="fromdate" readonly="readonly" tabindex="6" />
                      <span id="calendarpicker" class="yui-button yui-link-button"><span class="first-child"><a tabindex="8" href="" id="calendarendpicker-button"></a></span></span>
              		
                   </span>
                </div>
             </div>
               	
             
       			<div class="detail-list-item last-item">
                	<button id="${el}-testButton">${msg('label.button')}</button>
             	</div>
    		</div>
    	</div>
    	<div id="${el}-list" class="body scrollableList" <#if args.height??>style="height: ${args.height?html}px;"</#if>>
        	<div id="${el}-search-results"></div>
        </div>
    </div>
    
	</@>
</@>