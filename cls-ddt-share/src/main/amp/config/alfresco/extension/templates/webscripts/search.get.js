var luceneQuery = "TYPE:\"gn:ddt\" AND @gn\\:riferimento:"+args.id;

docDdt  = search.luceneSearch(luceneQuery);

if (docDdt == null || docDdt.length == 0) {
	status.code = 400;
	status.message = "Node " + args.key+ " does not have a PDF rendition";
	status.redirect = true;
}else
{
	
     model.document = docDdt[0];
}

function documentEntry(document,riferimento) {
    this.document = document;
    this.chiave = riferimento;
}

function getRating(curNode) {
    var rating = {};
    rating.rifer = curNode.properties["gn\\:riferimento"];
    return rating;
}