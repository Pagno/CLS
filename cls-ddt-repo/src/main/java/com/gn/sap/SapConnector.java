package com.gn.sap;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Properties;

import com.gn.model.DdtModel;
import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.ext.DestinationDataProvider;



public class SapConnector {
	private String function_name;
	private DdtModel ddtModel = null;
    static String DESTINATION_NAME1 = "ABAP_AS_WITHOUT_POOL";

	public SapConnector()
	{	
	}
	public SapConnector(DdtModel ddtModel)
	{	
		super();
		this.setDdtModel(ddtModel);
	}
	
	public DdtModel getDdtModel() {
		return ddtModel;
	}

	public void setDdtModel(DdtModel ddtModel) {
		this.ddtModel = ddtModel;
	}
	private Properties connectProperties=null;
	private void initConnection() 
    {
        connectProperties = new Properties();
        File inCfg = new File(DESTINATION_NAME1+".jcoDestination");
        FileInputStream fos;
		try {
			fos = new FileInputStream(inCfg);
	        connectProperties.load(fos);
		} catch (Exception e) {
	        connectProperties.setProperty(DestinationDataProvider.JCO_ASHOST, "10.190.201.16");
	        connectProperties.setProperty(DestinationDataProvider.JCO_SYSNR,  "35");
	        connectProperties.setProperty(DestinationDataProvider.JCO_CLIENT, "700");
	        connectProperties.setProperty(DestinationDataProvider.JCO_USER,   "GN_WEB");
	        connectProperties.setProperty(DestinationDataProvider.JCO_PASSWD, "GN_WEB2015");
	        connectProperties.setProperty(DestinationDataProvider.JCO_LANG,   "IT");
	        createDestinationDataFile(DESTINATION_NAME1, connectProperties);
		} 
        
    }
	static void createDestinationDataFile(String destinationName, Properties connectProperties)
    {
        File destCfg = new File(destinationName+".jcoDestination");
        try
        {
            FileOutputStream fos = new FileOutputStream(destCfg, false);
            connectProperties.store(fos, "for tests only !");
            fos.close();
        }
        catch (Exception e)
        {
            throw new RuntimeException("Unable to create the destination files", e);
        }
    }
	
	public void connect() throws JCoException, ParseException	{
		  initConnection();
		 JCoDestination destination;
			destination = JCoDestinationManager.getDestination(DESTINATION_NAME1);
		
			JCoFunction function = destination.getRepository().getFunction("ZSD_DATI_DDT_ALFRESCO");
	        if(function == null){
	            throw new RuntimeException("ZSD_DATI_DDT_ALFRESCO not found in SAP.");
	        }
        	function.getImportParameterList().setValue("I_VBELN", this.getDdtModel().getRiferimento());
        	String dataCaricamento = new SimpleDateFormat("yyyyMMdd").format(this.getDdtModel().getDataCaricamentoDdt());
        	function.getImportParameterList().setValue("I_ERDAT", dataCaricamento);
        	function.getImportParameterList().setValue("I_UNAME", this.getDdtModel().getUsername());
            function.execute(destination);
            
	        this.getDdtModel().setPaese(function.getExportParameterList().getString("E_ORT01"));
	        this.getDdtModel().setCliente(function.getExportParameterList().getString("E_NAME1"));
	        this.getDdtModel().setCodiceCliente(function.getExportParameterList().getString("E_KUNAG"));
	        this.getDdtModel().setVia(function.getExportParameterList().getString("E_STRAS"));
	        this.getDdtModel().setRegione ( function.getExportParameterList().getString("E_REGIO"));
	        this.getDdtModel().setCap ( function.getExportParameterList().getString("E_PSTLZ"));
	        this.getDdtModel().setStato(function.getExportParameterList().getString("E_LAND1"));
	        this.getDdtModel().setNumeroDdt(function.getExportParameterList().getString("E_XABLN"));
	        String dataDdt = function.getExportParameterList().getString("E_WADAT");
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	        this.getDdtModel().setDataDdt(sdf.parse(dataDdt));
	        
	}
}
