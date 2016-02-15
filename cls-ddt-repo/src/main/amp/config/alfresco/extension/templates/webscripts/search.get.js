function main() {
	logger.log("Inside whitepapers.get.js");
	var querySearch = "TYPE:\"gn:ddt\"";
	//search?rif=&num=&cli=&codcli=&dataddt=2015-10-16
	if(args.rif !== ''){
		querySearch=querySearch+" AND @gn\\:riferimento:*"+args.rif+"*";
	}
	if(args.codcli !== ''){
		querySearch=querySearch+" AND @gn\\:codicecliente:*"+args.codcli+"*";
	}
	if(args.cli !== ''){
		querySearch=querySearch+" AND @gn\\:cliente:*"+args.cli+"*";
	}
	if(args.dataddt !== ''){
		querySearch=querySearch+" AND @gn\\:dataddt:"+args.dataddt;
	}
	if(args.num !== ''){
		querySearch=querySearch+" AND @gn\\:numeroddt:*"+args.num+"*";
	}
//	var luceneQuery = "TYPE:\"gn:ddt\" AND @gn\\:numeroddt:?atteopagnoncel?";
	var luceneQuery = "TYPE:\"gn:ddt\" AND @gn\\:riferimento:"+args.rif+ " AND @gn\\:numeroddt:?"+args.num+"?";

	docDdt  = search.luceneSearch(querySearch);
	
	if (docDdt == null || docDdt.length == 0) {
		status.code = 400;
		status.message = querySearch;
		status.redirect = true;
	}else
	{
		var ddtInfo = new Array();
	    for (i = 0; i < docDdt.length; i++) {
	        var whitepaper = new documentEntry(docDdt[i]);
	        ddtInfo[i] = whitepaper;
	    }
	    model.ddt = ddtInfo;
		
	}
}
	

function documentEntry(document) {
    this.document = document;
}
main();