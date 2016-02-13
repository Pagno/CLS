var sitesMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_SITES_MENU");
if (sitesMenu) {
    sitesMenu.config.showCreateSite = false;
}


var s = widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_TITLE_MENU");

sitesMenu.config.renderFilterMethod = "ALL";

sitesMenu.config.renderFilter = [{
  target: "groupMemberships",
  property: "CLS_GROUP",
  renderOnAbsentProperty: true,
  values: [false]
}];