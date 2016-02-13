<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{"ddt" : [
    <#list ddt as child>
        {
            "riferimento" : "${child.document.properties["gn:riferimento"]}",
            "numeroddt" : "<#if child.document.properties["gn:numeroddt"]?exists && child.document.properties["gn:numeroddt"] != "">${child.document.properties["gn:numeroddt"]}</#if>",
            "cliente" : "<#if child.document.properties["gn:cliente"]?exists && child.document.properties["gn:cliente"] != "">${child.document.properties["gn:cliente"]}</#if>",
            "codicecliente" : "<#if child.document.properties["gn:codicecliente"]?exists && child.document.properties["gn:codicecliente"] != "">${child.document.properties["gn:codicecliente"]}</#if>"
        }
        <#if !(child.document == ddt?last.document)>,</#if>
    </#list>
    ]
}