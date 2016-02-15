var inboxes = {
    	name: "trasportatore/widgets/Container",
	    config :{
	    	widgets:[{
				name: "trasportatore/widgets/Group",
				config:{
					id:"drafts",
					widgets:[{
						name : "trasportatore/widgets/FileUpload"
					}]
				}
		    }]
		}
    };
model.jsonModel = {
    widgets: [
        {
            name: "alfresco/layout/VerticalWidgets",
            config: {
                baseClass: "side-margins",
                widgets: [
                	inboxes
                ]
            }
        }
    ]
};