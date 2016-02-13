package com.gn.model;

import java.util.Date;

public class DdtModel {
	//input
	private String riferimento;
	private String username;
	private Date dataCaricamentoDdt; 
	//output
	private String numeroDdt;
	private Date dataDdt;
	private String codiceCliente;
	private String cliente;
	private String paese;
	private String via;
	private String regione;
	private String cap;
	private String stato;
	
	public DdtModel(){
	}

	public String getRiferimento() {
		return riferimento;
	}

	public void setRiferimento(String riferimento) {
		this.riferimento = riferimento;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getDataCaricamentoDdt() {
		return dataCaricamentoDdt;
	}

	public void setDataCaricamentoDdt(Date dataCaricamentoDdt) {
		this.dataCaricamentoDdt = dataCaricamentoDdt;
	}

	public String getNumeroDdt() {
		return numeroDdt;
	}

	public void setNumeroDdt(String numeroDdt) {
		this.numeroDdt = numeroDdt;
	}

	public Date getDataDdt() {
		return dataDdt;
	}

	public void setDataDdt(Date dataDdt) {
		this.dataDdt = dataDdt;
	}

	public String getCodiceCliente() {
		return codiceCliente;
	}

	public void setCodiceCliente(String codiceCliente) {
		this.codiceCliente = codiceCliente;
	}

	public String getCliente() {
		return cliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public String getPaese() {
		return paese;
	}

	public void setPaese(String paese) {
		this.paese = paese;
	}

	public String getVia() {
		return via;
	}

	public void setVia(String via) {
		this.via = via;
	}

	public String getRegione() {
		return regione;
	}

	public void setRegione(String regione) {
		this.regione = regione;
	}

	public String getCap() {
		return cap;
	}

	public void setCap(String cap) {
		this.cap = cap;
	}

	public String getStato() {
		return stato;
	}

	public void setStato(String stato) {
		this.stato = stato;
	}
	

}
