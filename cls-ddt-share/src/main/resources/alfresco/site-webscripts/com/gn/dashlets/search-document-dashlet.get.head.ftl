<#include "/org/alfresco/components/component.head.inc">
<@script type="text/javascript" src="${page.url.context}/res/components/console/consoletool.js"></@script>
<@script type="text/javascript" src="${url.context}/res/components/dashlets/hello-world.js"></@script>
<@link rel="stylesheet" type="text/css" href="${url.context}/res/components/dashlets/hello-world.css" />
<@script src="${url.context}/res/yui/calendar/calendar.js" group="form"/>


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