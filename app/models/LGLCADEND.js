/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lglcadend', {
		idCadEnd: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ID_CAD_END'
		},
		idDdoCadEntgLgl: {
			type: DataTypes.BIGINT,
			allowNull: true,
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
		nmLgr: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NM_LGR'
		},
		nrLgr: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NR_LGR'
		},
		dsCplLgr: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DS_CPL_LGR'
		},
		nmBro: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NM_BRO'
		},
		nmCde: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NM_CDE'
		},
		idUf: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'ID_UF'
		},
		nrCep: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'NR_CEP'
		},
		nmPs: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'NM_PS'
		},
		dtIniVig: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DT_INI_VIG'
		},
		dtFimVig: {
			type: DataTypes.DATE,
			allowNull: true,
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
		}
	}, {
		timestamps: false,
		tableName: 'LGLCADEND'
	});
};
