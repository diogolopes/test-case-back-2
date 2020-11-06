/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lglcadddoCadEntgLgl', {
		idDdoCadEntgLgl: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			field: 'ID_DDO_CAD_ENTG_LGL'
		},
		nrSeqCad: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'NR_SEQ_CAD'
		},
		idUddNeg: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'DCOCADUDD_NEG',
				key: 'ID_UDD_NEG'
			},
			field: 'ID_UDD_NEG'
		},
		idUncCad: {
			type: DataTypes.BIGINT,
			allowNull: true,
			defaultValue: '(NULL)',
			field: 'ID_UNC_CAD'
		},
		nrCpf: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'NR_CPF'
		},
		nrCnpj: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'NR_CNPJ'
		},
		nrIdFsc: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'NR_ID_FSC'
		},
		nmCtbt: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NM_CTBT'
		},
		dtNsc: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DT_NSC'
		},
		dsNat: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DS_NAT'
		},
		dsNac: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DS_NAC'
		},
		nmPro: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'NM_PRO'
		},
		icRsdcExtr: {
			type: DataTypes.CHAR,
			allowNull: true,
			field: 'IC_RSDC_EXTR'
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
		dtIniVig: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_INI_VIG'
		},
		dtFimVig: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: '(NULL)',
			field: 'DT_FIM_VIG'
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
		idSexNsc: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ID_SEX_NSC'
		}
	}, {
		timestamps: false,
		tableName: 'LGLCADDDO_CAD_ENTG_LGL'
	});
};
