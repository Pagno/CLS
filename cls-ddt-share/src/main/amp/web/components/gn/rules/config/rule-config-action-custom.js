if (typeof Gn == "undefined" || !Gn)
{
   var Gn = {};
}

/**
 * RuleConfigActionCustom.
 *
 * @namespace SomeCo
 * @class SomeCo.RuleConfigActionCustom
 */
(function()
{

   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Selector = YAHOO.util.Selector,
      Event = YAHOO.util.Event;

   /**
    * Alfresco Slingshot aliases
    */
    var $html = Alfresco.util.encodeHTML,
       $hasEventInterest = Alfresco.util.hasEventInterest;
   
   Gn.RuleConfigActionCustom = function(htmlId)
   {
	   Gn.RuleConfigActionCustom.superclass.constructor.call(this, htmlId);

      // Re-register with our own name
      this.name = "Gn.RuleConfigActionCustom";
      Alfresco.util.ComponentManager.reregister(this);

      // Instance variables
      this.customisations = YAHOO.lang.merge(this.customisations, Gn.RuleConfigActionCustom.superclass.customisations);
      this.renderers = YAHOO.lang.merge(this.renderers, Gn.RuleConfigActionCustom.superclass.renderers);
      
      return this;
   };

   YAHOO.extend(Gn.RuleConfigActionCustom, Alfresco.RuleConfigAction,
   {

      /**
       * CUSTOMISATIONS
       */

      customisations:
      {         
         SetDdtCls:
         {
            text: function(configDef, ruleConfig, configEl)
            {
	             // Display as path
	             this._getParamDef(configDef, "destination-folder")._type = "path";
	             this._getParamDef(configDef, "destination-error-folder")._type = "path";
	             return configDef;
            },
            edit: function(configDef, ruleConfig, configEl)
            {
                // Hide all parameters since we are using a cusotm ui but set default values
                this._hideParameters(configDef.parameterDefinitions);

                // Make parameter renderer create a "Destination" button that displays an destination folder browser
                configDef.parameterDefinitions.push({
                   type: "arca:destination-dialog-button",
                   displayLabel: this.msg("label.to"),
                   _buttonLabel: this.msg("button.select-folder"),
                   _destinationParam: "destination-folder"
                });
                configDef.parameterDefinitions.push({
                    type: "arca:destination-dialog-button",
                    displayLabel: "Error Folder",
                    _buttonLabel: this.msg("button.select-folder"),
                    _destinationParam: "destination-error-folder"
                 });
                return configDef;
            }
         },
      },

   });

})();