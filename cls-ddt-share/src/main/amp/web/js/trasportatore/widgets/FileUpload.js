define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/FileUpload.html",
        "alfresco/buttons/AlfButton",
        "alfresco/dialogs/AlfDialog",
    	"dojo/topic",
    	"dojo/_base/lang",
	    "dojo/query",
	    "dojo/request"
    ],
    function(declare, _Widget, Core, _Templated, template, AlfButton, AlfDialog, topic, lang, query, request) {
        return declare([_Widget, Core, _Templated], {
            templateString: template,
            i18nRequirements: [ {i18nFile: "./i18n/messages.properties"} ],
            cssRequirements: [{cssFile:"./css/FileUpload.css"}],
            
            selectBtn : null,
            inputBtn : null,
            dialog: null,
            closeDialogBtn: null,
            
            buildRendering: function example_widgets_TemplateWidget__buildRendering() {
                this.inherited(arguments);
                
            	
            	this.selectBtn = new AlfButton({label:"Scegli il file",publishTopic:"SELECT_FILE"});
            	this.selectBtn.placeAt(this.uploadNode);
            	topic.subscribe(
	                "SELECT_FILE",
	                lang.hitch(this, this.handleResults)
	            );

            },
            
            startup: function(){
            	this.inputBtn = query(".inputfile");
            },
			
            handleResults: function(){
				this.inputBtn[0].click();
				this.inputBtn[0].onchange = function(evt){
	            	var request = new XMLHttpRequest();
	            	request.onreadystatechange = function() {
					    if (request.readyState == XMLHttpRequest.DONE) {
					    
            				this.closeDialogBtn = new AlfButton({label:"Close",publishTopic:"CLOSE_DIALOG"});
            				
					        this.dialog = new AlfDialog({title:"Success",content:"Caricamento avvenuto con successo.",duration:2,
					        	widgetsButtons: [
									{
										name: "alfresco/buttons/AlfButton",
										config: {
											label: "Close dialog",
											publishTopic: "CUSTOM_TOPIC"
										}
									}
								]	
					        });
					        this.dialog.show();
					    }
					}
		            
	            	var formData = new FormData();
	            	var url = Alfresco.constants.PROXY_URI + "api/upload";
	         
		         	formData.append("filedata", evt.target.files[0]);
			        formData.append("filename", evt.target.files[0].name);
			        formData.append("destination", "destination");
			        formData.append("siteId", "cls");
			        formData.append("containerId", "documentLibrary");
			        formData.append("uploaddirectory", "/Documenti Di Trasporto");
			        
			        request.open("POST", url, true);
			        request.send(formData);
		        }
            }
        });
});