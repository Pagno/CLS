<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{"ddt" : [
    <#list ddt as child>
        {
            "chiavesap" : "${child.document }"
        }
    </#list>
    ]
}