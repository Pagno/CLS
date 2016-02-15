package com.gn.action;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.imageio.ImageIO;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.action.ParameterDefinitionImpl;
import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.dictionary.DataTypeDefinition;
import org.alfresco.service.cmr.model.FileExistsException;
import org.alfresco.service.cmr.model.FileFolderService;
import org.alfresco.service.cmr.model.FileNotFoundException;
import org.alfresco.service.cmr.repository.ContentReader;
import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.security.AuthenticationService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.io.FilenameUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;

import com.gn.model.DdtModel;
import com.gn.model.GnDDTContentModel;
import com.gn.sap.SapConnector;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Reader;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;

public class readBarCode extends ActionExecuterAbstractBase {

	public static final String NAME = "cls-ddt-gn";
    public static final String PARAM_DESTINATION_FOLDER = "destination-folder";
    public static final String PARAM_DESTINATION_ERROR_FOLDER = "destination-error-folder";
    static String DESTINATION_NAME1 = "ABAP_AS_WITHOUT_POOL";
    


	private ContentService contentService;
	private NodeService nodeService;
	private AuthenticationService authenticationService;
	private FileFolderService fileFolderService;
	
	
	@Override
	protected void executeImpl(Action ruleAction, NodeRef nodeRef) {
		
		String username =  authenticationService.getCurrentUserName();
		Date dataCaricamentoDdt = Calendar.getInstance().getTime();
		Logger logger = Logger.getLogger(readBarCode.class.toString() + " User: " + username + 
				" Data" + new SimpleDateFormat("dd-MM-yyyy").format(dataCaricamentoDdt));
		DdtModel ddtModel = new DdtModel();
		ddtModel.setUsername(username);
		ddtModel.setDataCaricamentoDdt(dataCaricamentoDdt);
		
		// Leggo il nome del nodo sul quale viene eseguita l'azione
		logger.info("Leggo il nome del file " + nodeRef.getId());
		String fileName = (String) nodeService.getProperty(nodeRef, ContentModel.PROP_NAME);
		logger.info("Nome del nodo " + fileName);	

		
		// Estraggo le informazioni dal file
		logger.info("Estraggo le informazioni del documento " + nodeRef.getId());
		ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);
		InputStream barCodeInputStream = reader.getContentInputStream();

		Result result = null;
		try {
			BufferedImage barCodeBufferedImage;
			if (fileName.contains(".pdf")) {
				logger.info("Il documento " + nodeRef.getId() + " è un file pdf.");
				PDDocument document = PDDocument.load(barCodeInputStream);
	            List<PDPage> list = document.getDocumentCatalog().getAllPages();
	            PDPage page = list.get(0);
	            //for (PDPage page : list) {
	            barCodeBufferedImage = page.convertToImage();
	            document.close();
			}else{
				logger.info("Il documento " + nodeRef.getId() + " è una immagine.");
				barCodeBufferedImage = ImageIO.read(barCodeInputStream);
			}
			int heigth = barCodeBufferedImage.getHeight();
			int width = barCodeBufferedImage.getWidth();
			
			//TODO restringo l'area di interesse al barCode
			barCodeBufferedImage = barCodeBufferedImage.getSubimage(Math.round(width*0.1315f), Math.round(heigth*0.1023f), Math.round(width*0.1842f), Math.round(heigth*0.05581f));
			
			LuminanceSource source = new BufferedImageLuminanceSource(barCodeBufferedImage);
			BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
			Reader barCodeReader = new MultiFormatReader();

			result = barCodeReader.decode(bitmap);
			
			if (result != null && result.getText() != "") {
				//TODO dato il codiceDiSap richiamare una funzione su SAP inviando il BarCode, la data di oggi e l'utente di caricamento
				//TODO recuperare i dati di ritorno dalla chiamata di SAP e salvarli come metadati
				
				// Assegno al nuovo file il modello gn:invoice
				logger.info("Assegno al file " + fileName + " il tipo gn:ddt");
				nodeService.setType(nodeRef, QName.createQName(GnDDTContentModel.NAMESPACE_CLS_DDT_CONTENT_MODEL_URI, GnDDTContentModel.NAMESPACE_CLS_DDT_CONTENT_MODEL_TYPE));

				//sposto il file appena creato in un'altra directory e assegno il numero DDT letto al metadato
//				System.out.println("Barcode text is " + result.getText());
	        	NodeRef destinationParent = (NodeRef)ruleAction.getParameterValue(PARAM_DESTINATION_FOLDER);
				
				// Setto le informazioni necessarie per compilare i metadata
				Map<QName, Serializable> prop = new HashMap<QName, Serializable>();
				prop.put(GnDDTContentModel.CLS_NUM_DDT_QNAME,result.getText());
				String riferimento = "0000000000".concat(result.getText());
//				String riferimento = "0080710252";
				ddtModel.setRiferimento(riferimento.substring(riferimento.length()-10));
				SapConnector sap=new SapConnector(ddtModel);
				sap.connect();
				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_RIFERIMENTO_QNAME, ddtModel.getRiferimento());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_DATA_DDT_QNAME, ddtModel.getDataDdt());
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_CAP_QNAME, ddtModel.getCap());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_CLIENTE_QNAME, ddtModel.getCliente());
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_CODICE_CLIENTE_QNAME, ddtModel.getCodiceCliente());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_DATA_CARICAMENTO_QNAME, ddtModel.getDataCaricamentoDdt());
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_NUM_DDT_QNAME, ddtModel.getNumeroDdt());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_PAESE_QNAME, ddtModel.getPaese());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_REGIONE_QNAME, ddtModel.getRegione());
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_STATO_QNAME, ddtModel.getStato());				
				nodeService.setProperty(nodeRef, GnDDTContentModel.CLS_VIA_QNAME, ddtModel.getVia());


				String estensione = FilenameUtils.getExtension(fileName);
				fileFolderService.move(nodeRef,destinationParent, ddtModel.getRiferimento().concat(".".concat(estensione)));//Sposto il file nella cartella di destinazione corretta
			} else {	
				//Mando una mail di errata lettura del file e sposto il file in una cartella di errore
				System.out.println("Lettura Fallita.");
				NodeRef destinationErrorParent = (NodeRef)ruleAction.getParameterValue(PARAM_DESTINATION_ERROR_FOLDER);
				fileFolderService.move(nodeRef,destinationErrorParent, fileName);	
			}
			
			barCodeInputStream.close();
		} catch (Exception e) {
			logger.log(Level.SEVERE, e.getMessage());
			NodeRef destinationErrorParent = (NodeRef)ruleAction.getParameterValue(PARAM_DESTINATION_ERROR_FOLDER);
			//try {
				//fileFolderService.mo
		}
	}
	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> arg0) {
		// TODO Auto-generated method stub
		
	}
	
	public ContentService getContentService() {
		return contentService;
	}
	public void setContentService(ContentService contentService) {
		this.contentService = contentService;
	}
	public NodeService getNodeService() {
		return nodeService;
	}
	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}
	public AuthenticationService getAuthenticationService() {
		return authenticationService;
	}
	public void setAuthenticationService(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	public FileFolderService getFileFolderService() {
		return fileFolderService;
	}
	public void setFileFolderService(FileFolderService fileFolderService) {
		this.fileFolderService = fileFolderService;
	}
}