var inboxes = {
    	name: "trasportatore/widgets/Container",
	    config :{
	    	widgets:[{
				name: "trasportatore/widgets/Group",
				config:{
					id:"Upload Documents",
					widgets:[{
						name : "trasportatore/widgets/FileUpload"
					}]
				}
		    },{
		    	name: "trasportatore/upload/Group",
		    	config:{
					id:"Search Documents",
					widgets :[{
						name: "trasportatore/widgets/Search",
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