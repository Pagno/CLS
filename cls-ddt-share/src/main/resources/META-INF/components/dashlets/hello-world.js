/**
 * Extras root namespace.
 * 
 * @namespace Extras
 */
// Ensure Extras root object exists
if (typeof Extras == "undefined" || !Extras) {
	var Extras = {};
}

(function() {
	/**
	 * YUI Library aliases
	 */
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Element = YAHOO.util.Element;

	/**
	 * Alfresco Slingshot aliases
	 */
	var $html = Alfresco.util.encodeHTML;

	//Fetched JSON
	var workflowsData = null;
	//Contains the result JSON after filtering
	var filteredData = [];
	//Keeps sorting direction
	var sortDirection = {
			date: "DESCENDING",
			priority: "DESCENDING"
	}
	//Has the selected filter, initially: description
	var selectedFilter = "description";
	//Selected workflow id's
	var indexArray = [];
	//Selected tab
	var tab = "assigned";

    // Set webscript template
    var webscript = YAHOO.lang.substitute("api/task-instances?authority={authority}&properties={properties}",
    {
        authority: encodeURIComponent(Alfresco.constants.USERNAME),
        properties: ["bpm_priority", "bpm_status", "bpm_dueDate", "bpm_description"].join(",")
    });
    
    var autoCompleteItem = '<li id="{username}" onclick="Extras.selectUsername(this.id)">{username}<span class="placeholder"> ({name})</span></li>';
	
    //Set webscript for completed tasks
    var tasksDoneAPI = YAHOO.lang.substitute("api/task-instances?authority={authority}&properties={properties}&exclude=wcmwf:*&pooledTasks=false&state=COMPLETED&pooledTasks=false&state=COMPLETED",
    {
        authority: encodeURIComponent(Alfresco.constants.USERNAME),
        properties: ["bpm_priority", "bpm_status", "bpm_dueDate", "bpm_description"].join(",")
    });
	/**
	 * ConsoleFilterWorkflows constructor.
	 * 
	 * @param {String}
	 *            htmlId The HTML id of the parent element
	 * @return {FilterWorkflows} The new FilterWorkflows instance
	 * @constructor
	 */
	Extras.FilterWorkflows = function(htmlId) {
		this.name = "Extras.FilterWorkflows";
		Extras.FilterWorkflows.superclass.constructor.call(this, htmlId);

		/* Register this component */
		Alfresco.util.ComponentManager.register(this);

		/* Load YUI Components */
		Alfresco.util.YUILoaderHelper.require([ "button", "container",
				"datasource", "datatable", "json", "history" ],
				this.onComponentsLoaded, this);

		/* Define panel handlers */
		var parent = this;

		// NOTE: the panel registered first is considered the "default" view and
		// is displayed first

		/* Search Panel Handler */
		FormPanelHandler = function FormPanelHandler_constructor() {
			FormPanelHandler.superclass.constructor.call(this, "form");
		};

		YAHOO.extend(FormPanelHandler, Alfresco.ConsolePanelHandler,
        {
	         /**
			 * Called by the ConsolePanelHandler when this panel shall be loaded
			 * 
			 * @method onLoad
			 */
	         onLoad: function onLoad()
	         {	        	 
	        	 
	         }
        });
		new FormPanelHandler();
      
		return this;
	}
	
	YAHOO.extend(Extras.FilterWorkflows, Alfresco.ConsoleTool,
    {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
       options:
       {
         /**
          * Number of characters required for a search.
          * 
          * @property minSearchTermLength
          * @type int
          * @default 1
          */
          minSearchTermLength: 1
       },
      
       /**
        * Fired by YUI when parent element is available for scripting.
        * Component initialisation, including instantiation of YUI widgets and event listener binding.
        *
        * @method onReady
        */
       onReady: function FilterWorkflows_onReady()
       {
         // Call super-class onReady() method
          Extras.FilterWorkflows.superclass.onReady.call(this);
          Extras.renderCalendar();
		  
         //Set event listeners Toolbar 1
          YAHOO.util.Event.addListener(YAHOO.util.Dom.get("search-workflows-button"), "click", Extras.doFilterDdt);
          YAHOO.util.Event.addListener(YAHOO.util.Dom.get("wfsearch-date-input"), "click", Extras.showCalendar);
          
          //Get messages
          Extras.getTemplateMessages();
          
          //Ddt list-item template
        
	      	ddtItem = '<div class="list-item">\
	      		<a href="{url}" target="_blank">\
	      			<div class="priority">\
	      				<div class="circle {isDone}"></div>\
	      			</div>\
	      			<div class="properties-content">\
	      				<div class="wf-title">\
	      					<span><strong>'+messages.title+'</strong> {wfTitle}</span>\
	      				</div>\
	      				<div class="wf-properties">\
	      					<span class="property"><strong>'+messages.from+'</strong> {type}</span>\
	      					<span class="property"><strong>'+messages.priority+'</strong> {priority}</span>\
	      					<span class="property"><strong>'+messages.type+'</strong> {cliente}</span>\
	      				</div>\
	      			</div>\
	      		</a>\
	      	</div>';
//          totalTasksMsg = YAHOO.util.Dom.get("totalWorkflows").innerHTML;
          //Send AJAX request to get all workflows
//          Extras.getAllWorkflows(webscript);

       }
       
    });
	
	/**
	 * Sends an AJAX Request go retrieve all assigned workflows
	 */
	Extras.getAllWorkflows = function(scriptToCall) {
		if(typeof scriptToCall !== "string") {
			scriptToCall = (tab == "assigned"? webscript : tasksDoneAPI);
		}
		Alfresco.util.Ajax.request(
		{
			url: Alfresco.constants.PROXY_URI + scriptToCall,
			method: Alfresco.util.Ajax.GET,
			responseContentType: Alfresco.util.Ajax.JSON,
			successCallback:
			{
				fn: function(responce){
					var workflows = responce.json.data;
					YAHOO.util.Dom.get("list-items").innerHTML="";
					workflows.sort(function(a,b){
						return Extras.dateFromISO8601(b.workflowInstance.startDate) - Extras.dateFromISO8601(a.workflowInstance.startDate);
					});
					workflowsData = filteredData = workflows;
					Extras.showAllWorkflows();
				},
				scope: this
			},
			failureCallback:
			{
				fn: function(responce){
					alert(JSON.stringify(responce));
				},
				scope: this
			}
		});
	};
	
	/**
	 * Parses a date from Alfresco format
	 * i.e. 2015-05-16T16:55:22:00
	 */
	Extras.dateFromISO8601 = function(isostr) {
		var parts = isostr.match(/\d+/g);
		return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
	};
	
	/**
	 * Parses a string to Date object
	 * format dd/mm/yyyy
	 */
	Extras.dateFromString = function(dateString) {
		var parts = dateString.split('/');
		return new Date(parts[2], parts[1]-1, parts[0]);
	};
	
	/**
	 * Calculates difference between a date and today in days
	 */
	Extras.daysPassed = function(dateFrom) {
		var today = new Date();
		today.setHours(0,0,0,0);
		dateFrom.setHours(0,0,0,0);
		return parseInt((today - dateFrom)/(1000*60*60*24));
	};
	
	
	/**
	 * Since the workflow list item is custom, the messages should be set depending on the browser locale.
	 * In the VIEW, there is a hidden div where all properties are comma separated.
	 * This function reads all the properties and creates a global variable of them.
	 */
	Extras.getTemplateMessages = function() {
		var msgArray = YAHOO.util.Dom.get("list-item-messages").innerHTML.split(',');
		messages = {
			"title":msgArray[0],
			"before":msgArray[1],
			"from":msgArray[2],
			"type":msgArray[3],
			"priority":msgArray[4],
			"day":msgArray[5],
			"days":msgArray[6],
			"priority":msgArray[7],
			"empty":msgArray[8],
			"loading":msgArray[9],
			"prompt_Title":msgArray[10],
			"prompt_Text":msgArray[11],
			"prompt_Yes":msgArray[12],
			"prompt_No":msgArray[13],
			"deleting":msgArray[14],
			"error":msgArray[15]
		};
	};
	
	/**
	 * Switches between the filter controls depending of the filter selection
	 */
	Extras.changeFilter = function() {
		selectedFilter = YAHOO.util.Dom.get("properties").value;
		switch(selectedFilter){
		case "description":
			YAHOO.util.Dom.get("wfsearch-term-input").style.display = "block";
			YAHOO.util.Dom.get("wfsearch-priority-input").style.display = "none";
			YAHOO.util.Dom.get("cal-filter").style.display = "none";
			YAHOO.util.Dom.get("people-api").style.display = "none";
			break;
		case "priority":
			YAHOO.util.Dom.get("wfsearch-term-input").style.display = "none";
			YAHOO.util.Dom.get("wfsearch-priority-input").style.display = "block";
			YAHOO.util.Dom.get("cal-filter").style.display = "none";
			YAHOO.util.Dom.get("people-api").style.display = "none";
			break;
		case "date":
			YAHOO.util.Dom.get("wfsearch-term-input").style.display = "none";
			YAHOO.util.Dom.get("wfsearch-priority-input").style.display = "none";
			YAHOO.util.Dom.get("cal-filter").style.display = "block";
			YAHOO.util.Dom.get("people-api").style.display = "none";
			break;
		case "initiator":
			YAHOO.util.Dom.get("wfsearch-term-input").style.display = "none";
			YAHOO.util.Dom.get("wfsearch-priority-input").style.display = "none";
			YAHOO.util.Dom.get("cal-filter").style.display = "none";
			YAHOO.util.Dom.get("people-api").style.display = "block";
			break;
		default:
			Extras.showAllWorkflows();
		}
	};
	
	/**
	 * It shows all workflows that were initially red.
	 * It does not send AJAX request to the API to read the new ones
	 */
	Extras.showAllWorkflows = function(ddtData) {
      	YAHOO.util.Dom.get("list-items").innerHTML = "";
      	if(ddtData.length == 0)
      	{
      		YAHOO.util.Dom.get("list-items").innerHTML = messages.empty;
      		return;
      	}
		for(var i=0; i<ddtData.length; i++)
        {
	   		 var wf = ddtData[i];
	     	 //var date = Extras.dateFromISO8601(wf.workflowInstance.startDate);
	       	 YAHOO.util.Dom.get("list-items").innerHTML += Extras.setDdtListElement(wf);
        }
	};
	
	/**
	 * Filtering workflows by desciption
	 */
	Extras.filterByDescription = function() {
		var term = YAHOO.util.Dom.get("wfsearch-term-input").value;
		if(term == "") Extras.showAllWorkflows()
		YAHOO.util.Dom.get("list-items").innerHTML = "";
		for(var i=0; i<filteredData.length; i++)
        {
	   		 var wf = filteredData[i];
			 if(wf.workflowInstance.message.toUpperCase().indexOf(term.toUpperCase()) != -1)
			 {
				 indexArray.push(wf.id);
		       	 YAHOO.util.Dom.get("list-items").innerHTML += Extras.setWorkflowListElement(wf);
			 }
        }
		Extras.updateFilteredData(indexArray);
	};

	/**
	 * Filtering workflows by priority
	 */
   	Extras.filterByPriority = function() {
		var priority = parseInt(YAHOO.util.Dom.get("wfsearch-priority-input").value);
      	YAHOO.util.Dom.get("list-items").innerHTML = "";
		for(var i=0; i<filteredData.length; i++)
        {
	   		 var wf = filteredData[i];
			 if(wf.workflowInstance.priority == priority)
			 {
				 indexArray.push(wf.id);
		       	 YAHOO.util.Dom.get("list-items").innerHTML += Extras.setWorkflowListElement(wf);
			 }
        }
		Extras.updateFilteredData(indexArray);
   		
   	};
   	
   	/**
   	 * Filtering workflows by date when they were started
   	 */
   	Extras.filterByDate = function(){
		var dateString = YAHOO.util.Dom.get("wfsearch-date-input").value;
		if(date == "") return;
		var dateEntered = Extras.dateFromString(dateString);
      	YAHOO.util.Dom.get("list-items").innerHTML = "";
		for(var i=0; i<filteredData.length; i++)
        {
	   		 var wf = filteredData[i];
	     	 var date = Extras.dateFromISO8601(wf.workflowInstance.startDate);
	     	 date.setHours(0,0,0,0);
			 if(dateEntered.toDateString() == date.toDateString())
			 {
				 indexArray.push(wf.id);
		       	 YAHOO.util.Dom.get("list-items").innerHTML += Extras.setWorkflowListElement(wf);
			 }
        }
		Extras.updateFilteredData(indexArray);
   	};
   	
   	/**
   	 * Filtering workflows by initiator.
   	 * By initiator, it's ment the username of the initiator
   	 */
   	Extras.filterByInitiator = function() {
   		var username = YAHOO.util.Dom.get("wfsearch-initiator-input").value;
		if(username == "") return;
      	YAHOO.util.Dom.get("list-items").innerHTML = "";
		for(var i=0; i<filteredData.length; i++)
        {
	   		 var wf = filteredData[i];
			 if(wf.workflowInstance.initiator.userName.toUpperCase().indexOf(username.trim().toUpperCase()) != -1)
			 {
				 indexArray.push(wf.id);
		       	 YAHOO.util.Dom.get("list-items").innerHTML += Extras.setWorkflowListElement(wf);
			 }
        }
		Extras.updateFilteredData(indexArray);
   	};   	
   	
   	/**
   	 * Click event for the search button
   	 */
   	Extras.doFilter = function() {
		switch(selectedFilter){
		case "description":
			Extras.filterByDescription();
			break;
		case "priority":
			Extras.filterByPriority();
			break;
		case "date":
			Extras.filterByDate();
			break;
		case "initiator":
			Extras.filterByInitiator();
			break;
		default:
			Extras.showAllWorkflows();
		}
      	YAHOO.util.Dom.get("totalWorkflows").innerHTML = totalTasksMsg.replace("{0}",filteredData.length);
	};
	/**
   	 * Click event for the search button
   	 */
   	Extras.doFilterDdt = function() {
   		var cliente = YAHOO.util.Dom.get("wfsearch-cliente-input").value;
   		var codcli = YAHOO.util.Dom.get("wfsearch-codcli-input").value;
   		var numddt = YAHOO.util.Dom.get("wfsearch-numero-input").value;
   		var rif = YAHOO.util.Dom.get("wfsearch-rif-input").value;
   		var date = YAHOO.util.Dom.get("wfsearch-date-input").value;
		var datestr ='';
   		if(date !== ''){
	   		var parts = date.split('/');
			datestr =  parts[2]+'-'+parts[1]+'-'+parts[0];
		}else{}
		
		var webscriptDdt = YAHOO.lang.substitute("cls/ddt/search?rif={riferimento}&num={numeroddt}&cli={cliente}&codcli={codicecliente}&dataddt={dataddt}",
		{
			riferimento: rif,
			numeroddt: numddt,
			codicecliente:codcli,
			dataddt:datestr,
			cliente:cliente
		});


		Alfresco.util.Ajax.request(
		{
			url: Alfresco.constants.PROXY_URI  + webscriptDdt,
			method: Alfresco.util.Ajax.GET,
			responseContentType: Alfresco.util.Ajax.JSON,
			successCallback:
			{
				fn: function(responce){
					var workflows = responce.json.ddt;
					YAHOO.util.Dom.get("list-items").innerHTML="";
					workflowsData = filteredData = workflows;
					Extras.showAllWorkflows(workflows);
				},
				scope: this
			},
			failureCallback:
			{
				fn: function(responce){
					YAHOO.util.Dom.get("list-items").innerHTML=messages.empty;
				},
				scope: this
			}
		});
	};

	/**
	 * Render client calendar for the FilterByDate control
	 */
	Extras.renderCalendar = function() {
		myCal = new YAHOO.widget.Calendar("calendar-div");
		//draw the calendar on screen
		myCal.render();
		myCal.hide();
		//define the ripDate function which gets the selected date
		var ripDate = function(type, args) {
			//get the date components
			var dates = args[0];
			var date = dates[0];
			var theYear = date[0];
			var theMonth = date[1];
			var theDay = date[2];
			
			var theDate = theDay + "/" + theMonth + "/" + theYear;
			YAHOO.util.Dom.get("wfsearch-date-input").value = theDate;
			myCal.hide();
		}
		//subscribe to the select event on Calendar cells
		myCal.selectEvent.subscribe(ripDate);
	};
	
	/**
	 * Click event on the textbox to show the calendars
	 */
	var calendar_visibility=false;
	Extras.showCalendar = function (){
		if(calendar_visibility===false){
			calendar_visibility=true;
			myCal.show();
		}else{
			calendar_visibility=false;
			myCal.hide();
			YAHOO.util.Dom.get("wfsearch-date-input").value = "";
		}
		
	};
	
	
	Extras.setDdtListElement = function(wf) {
    	//var date = Extras.dateFromISO8601(wf.workflowInstance.startDate);
		return YAHOO.lang.substitute(ddtItem,{
      		 url: Extras.getWorkflowURL(wf.riferimento),
      		 isDone: "done",
      		 wfTitle: wf.numeroddt,
      		 cliente: wf.cliente,
      		 type: wf.codicecliente,
      		 days: wf.cliente,
      		 annot: "",
      		 priority: wf.riferimento
      	 });
	};
	/**
	 * Arguments: indexArray (array of workflow id's)
	 * It removes all items which are not in the list,
	 * updates the filtered data with the results
	 */
	Extras.updateFilteredData = function(indexArray) {
		var updateData = [];
		for(var i=0; i<filteredData.length; i++)
        {
	   		 var wf = filteredData[i];
			 if(indexArray.indexOf(wf.id) != -1)
			 {
				 updateData.push(wf);
			 }
        }
		filteredData = updateData;
		indexArray = [];
	};
	/**
	 * Returns the URL for the Workflow when an item is clicked
	 * Since there are tabs, there should be a propper URL to acces Task Details
	 */
	Extras.getWorkflowURL = function(id) {
		
		url = Alfresco.constants.PROXY_URI + "getddt?key="+id;
			
		return url;
	};

	/**
	 * OnHover Show Balloon for complete all tasks
	 */
	Extras.onCompleteTaskHover = function() {
		completeTasks_balloon.show();
	};
	
	/**
	 * OnMouseLeave event to hide the Balloon
	 */
	Extras.onCompleteTaskBlur = function() {
		completeTasks_balloon.hide();
	};

})();