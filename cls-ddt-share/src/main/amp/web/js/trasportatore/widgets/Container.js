define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/Container.html"
    ],
    function(declare, _Widget, Core, _Templated, template) {
        return declare([_Widget, Core, _Templated], {
            templateString: template,
            cssRequirements: [{cssFile:"./css/Container.css"}],
            
            buildRendering: function example_widgets_TemplateWidget__buildRendering() {
               
                this.inherited(arguments);

            }
        });
});