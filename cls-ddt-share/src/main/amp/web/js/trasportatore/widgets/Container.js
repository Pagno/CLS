/**
 * @author Paolo Predonzani (http://softwareloop.com/)
 */

define([
    "alfresco/core/ProcessWidgets",
    'dojo/_base/declare',
    'dojo/text!./templates/Container.html',
    "dojo/topic",
    "dojo/hash",
    "dojo/_base/lang",
    "dijit/registry",
    "dojo/query",
    "dojo/ready"
], function (ProcessWidgets, declare, template, topic, hash, lang, registry, query, ready) {
    return declare([ProcessWidgets], {
        cssRequirements: [
            {cssFile: "./css/Container.css"}
        ],

        templateString: template,

        buildRendering: function () {
            this.inherited(arguments);
        }
    });
});