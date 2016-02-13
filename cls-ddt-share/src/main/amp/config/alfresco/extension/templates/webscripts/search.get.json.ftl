<#assign props = document.properties?keys>

 <#list props as t>

{

    <#-- If the property exists -->

    <#if document.properties[t]?exists>

       <#-- If it is a date, format it accordingly-->

       <#if document.properties[t]?is_date>

       "${t}": "${document.properties[t]?string("yyyy-MM-dd")}"

       <#-- If it is a boolean, format it accordingly-->

       <#elseif document.properties[t]?is_boolean>

       "${t}": "${document.properties[t]?string("yes", "no")}"

       <#-- Otherwise treat it as a string -->

       <#else>

       "${t}": "${document.properties[t]}"

       </#if>

    </#if> }

    <#if t_has_next>,</#if>

 </#list>

]
