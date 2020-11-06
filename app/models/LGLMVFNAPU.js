/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lglmvfnapu', {
		idMovFnaApu: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ID_MOV_FNA_APU'
		},
		idMatCon: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'LGLCADMAT',
				key: 'ID_MAT_CON'
			},
			field: 'ID_MAT_CON'
		},
		idDdoCadEntgLgl: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'LGLCADDDO_CAD_ENTG_LGL',
				key: 'ID_DDO_CAD_ENTG_LGL'
			},
			field: 'ID_DDO_CAD_ENTG_LGL'
		},
		idSisOri: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRDOMSIS_ORI',
				key: 'ID_SIS_ORI'
			},
			field: 'ID_SIS_ORI'
		},
		idTrnTp: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRTRNTP_CAD',
				key: 'ID_TRN_TP'
			},
			field: 'ID_TRN_TP'
		},
		idMntMovFnaApu: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'ID_MNT_MOV_FNA_APU'
		},
		dtCpt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_CPT'
		},
		idOriMov: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LGLDOMORI_MOV',
				key: 'ID_ORI_MOV'
			},
			field: 'ID_ORI_MOV'
		},
		dsTpTrn: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DS_TP_TRN'
		},
		idTpCtb: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRPRDTP_CTB',
				key: 'ID_TP_CTB'
			},
			field: 'ID_TP_CTB'
		},
		idTpEdd: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRPORTP_EDD',
				key: 'ID_TP_EDD'
			},
			field: 'ID_TP_EDD'
		},
		idPdc: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRCLNPDC',
				key: 'ID_PDC'
			},
			field: 'ID_PDC'
		},
		idTpBef: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRPRDTP_BEF',
				key: 'ID_TP_BEF'
			},
			field: 'ID_TP_BEF'
		},
		nrPcl: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'NR_PCL'
		},
		idPrcSsp: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'LGLPRDPRC_SSP',
				key: 'ID_PRC_SSP'
			},
			field: 'ID_PRC_SSP'
		},
		idRpvCus: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRPIRPV_CUS',
				key: 'ID_RPV_CUS'
			},
			field: 'ID_RPV_CUS'
		},
		idPtlFna: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'ID_PTL_FNA'
		},
		idEvt: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'ID_EVT'
		},
		idRsg: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'ID_RSG'
		},
		idLncIef: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'ID_LNC_IEF'
		},
		nrMesTmpPla: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'NR_MES_TMP_PLA'
		},
		nrIddCli: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'NR_IDD_CLI'
		},
		dtPg: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_PG'
		},
		dtMovFna: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DT_MOV_FNA'
		},
		nrMat: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NR_MAT'
		},
		txTbu: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'TX_TBU'
		},
		vlPgBrt: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'VL_PG_BRT'
		},
		vlLiq: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'VL_LIQ'
		},
		vlCrt: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_CRT'
		},
		vlDscIr: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_DSC_IR'
		},
		vlIseRna: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ISE_RNA'
		},
		vlSldIsePre1996: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_SLD_ISE_PRE_1996'
		},
		vlIseDep: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ISE_DEP'
		},
		vlIseIdd: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ISE_IDD'
		},
		vlIseRduIr: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ISE_RDU_IR'
		},
		vlIseMlsGrve: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ISE_MLS_GRVE'
		},
		vlAtuMot: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_ATU_MOT'
		},
		vlNom: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_NOM'
		},
		vlRdi: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_RDI'
		},
		vlTxSda: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_TX_SDA'
		},
		vlCrtPos: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_CRT_POS'
		},
		dtCad: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_CAD'
		},
		dtUltAlt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DT_ULT_ALT'
		},
		idUsrAlt: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRUSUCAD',
				key: 'ID_USR'
			},
			field: 'ID_USR_ALT'
		},
		dtCri: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '(getdate())',
			field: 'DT_CRI'
		},
		idUsr: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'GDRUSUCAD',
				key: 'ID_USR'
			},
			field: 'ID_USR'
		},
		idCadEmp: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'LGLCADEMP',
				key: 'ID_CAD_EMP'
			},
			field: 'ID_CAD_EMP'
		},
		idFtoGra: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'ID_FTO_GRA'
		},
		vlIof: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'VL_IOF'
		},
		idInv: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'ID_INV'
		},
		idTpOpe: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'GDRGNRTP_OPE',
				key: 'ID_TP_OPE'
			},
			field: 'ID_TP_OPE'
		},
		nrSeqLncIef: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'NR_SEQ_LNC_IEF'
		},
		dtPcm: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DT_PCM'
		}
	}, {
		timestamps: false,
		tableName: 'LGLMVFNAPU'
	});
};
