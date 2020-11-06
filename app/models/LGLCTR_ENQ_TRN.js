/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lglctrEnqTrn', {
		idTrn: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'ID_TRN'
		},
		idVinRetVrbCpoInf: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LGLCAD_VIN_RET_VRB_CPO_INF',
				key: 'ID_VIN_RET_VRB_CPO_INF'
			},
			field: 'ID_VIN_RET_VRB_CPO_INF'
		},
		vlCpoInf: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'VL_CPO_INF'
		},
		nrAnoTrn: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'NR_ANO_TRN'
		},
		idSisOri: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'ID_SIS_ORI'
		},
		nrCpf: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'NR_CPF'
		},
		nrMat: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'NR_MAT'
		},
		nmCtbt: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NM_CTBT'
		},
		idTpPla: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			field: 'ID_TP_PLA'
		},
		dtTrn: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_TRN'
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
		icStaTrn: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'IC_STA_TRN'
		},
		dtUltAltStaTrn: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DT_ULT_ALT_STA_TRN'
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
		/* idSldVgbl: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: '((0))',
			field: 'ID_SLD_VGBL'
		}, */
		nrCnpj: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NR_CNPJ'
		},
		nrDocPagTer: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			defaultValue: '((0))',
			field: 'NR_DOC_PAG_TER'
		},
		idCtrEnqTrn: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ID_CTR_ENQ_TRN'
		}
	}, {
		timestamps: false,
		tableName: 'LGLCTRENQ_TRN'
	});
};
