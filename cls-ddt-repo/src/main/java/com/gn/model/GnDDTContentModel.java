package com.gn.model;

import  org.alfresco.service.namespace.QName;


public class GnDDTContentModel {
	public static final String NAMESPACE_CLS_DDT_CONTENT_MODEL_URI = "gninformatica.invoice";
	public static final String NAMESPACE_CLS_DDT_CONTENT_MODEL_PREFIX = "gn";
	public static final String NAMESPACE_CLS_DDT_CONTENT_MODEL_TYPE = "ddt";

	// Types
	public static final String CLS_NUM_DDT_STR = "numeroddt";
	public static final QName CLS_NUM_DDT_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_NUM_DDT_STR);
	
	public static final String CLS_RIFERIMENTO_STR = "riferimento";
	public static final QName CLS_RIFERIMENTO_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_RIFERIMENTO_STR);
	
	public static final String CLS_DATA_DDT_STR = "dataddt";
	public static final QName CLS_DATA_DDT_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_DATA_DDT_STR);
	
	public static final String CLS_DATA_CARICAMENTO_STR = "datacaricamento";
	public static final QName CLS_DATA_CARICAMENTO_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_DATA_CARICAMENTO_STR);
	
	public static final String CLS_CODICE_CLIENTE_STR = "codicecliente";
	public static final QName CLS_CODICE_CLIENTE_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_CODICE_CLIENTE_STR);

	public static final String CLS_CLIENTE_STR = "cliente";
	public static final QName CLS_CLIENTE_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_CODICE_CLIENTE_STR);
	
	public static final String CLS_PAESE_STR = "paese";
	public static final QName CLS_PAESE_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_PAESE_STR);
	
	public static final String CLS_VIA_STR = "via";
	public static final QName CLS_VIA_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_VIA_STR);
	
	public static final String CLS_REGIONE_STR = "regione";
	public static final QName CLS_REGIONE_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_REGIONE_STR);
	
	public static final String CLS_CAP_STR = "cap";
	public static final QName CLS_CAP_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_CAP_STR);
	
	public static final String CLS_STATO_STR = "stato";
	public static final QName CLS_STATO_QNAME = QName.createQName(NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, CLS_STATO_STR);
	
}
