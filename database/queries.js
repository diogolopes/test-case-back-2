exports.consulta_clientes = function (cpfCliente, unidade, nome, cnpj, matricula, protocolo, nif, dtInicial, dtFinal){

    let str_query = "SELECT DISTINCT "+
					    "dados.ID_DDO_CAD_ENTG_LGL AS id," +
				    	"unidade.NM_UDD_NEG AS unidadenegocio," +
				    	"dados.NM_CTBT AS nome," +
				    	"dados.NR_CPF AS cpf," +
				    	"dados.NR_CNPJ AS cnpj " +
				    "FROM dbo.LGLCADDDO_CAD_ENTG_LGL dados " +
				    "LEFT JOIN dbo.DCOCADUDD_NEG unidade ON unidade.ID_UDD_NEG = dados.ID_UDD_NEG " +
				    "LEFT JOIN dbo.LGLCADMAT matricula ON matricula.ID_DDO_CAD_ENTG_LGL = dados.ID_DDO_CAD_ENTG_LGL " +
				    "LEFT JOIN LGLCTRENQ_TRN ENQTRN on matricula.NR_MAT = ENQTRN.NR_MAT " +
                    "WHERE 1 = 1 "
                    
    if (cpfCliente){
        //str_query = str_query + " AND dados.NR_CPF = '" + cpfCliente +"' "
        str_query = str_query + " AND dados.NR_CPF = CAST(CAST('"+ cpfCliente +"' AS BIGINT) AS VARCHAR)" 
    }
    
    if (unidade){
        str_query = str_query + " AND unidade.ID_UDD_NEG = " + unidade
    }

    if (nome){
        str_query = str_query + " AND UPPER(dados.NM_CTBT) LIKE ('%" + nome.toUpperCase() + "%') "
    }

    if (cnpj){
        str_query = str_query + " AND dados.NR_CNPJ = '" + cnpj + "' "
    }

   if (matricula){
        str_query = str_query + " AND matricula.NR_MAT = " + matricula
    }

    if (protocolo){
        str_query = str_query + " AND movimento.ID_PTL_FNA = " + protocolo
    }

    if (nif){
        str_query = str_query + " AND UPPER(dados.NR_ID_FSC) LIKE ('%" + nif.toUpperCase() + "%') "
    }

    if (dtInicial && dtFinal){

        dtInicial = dtInicial.split('/')
        dtFinal = dtFinal.split('/')
    
        dtInicial = dtInicial[2] + dtInicial[1] + dtInicial[0]
        dtFinal = dtFinal[2] + dtFinal[1] + dtFinal[0]

        str_query = str_query + " AND ENQTRN.DT_TRN BETWEEN '"+ dtInicial +"' AND '" + dtFinal + "' "
    }

    str_query = str_query + "group BY dados.ID_DDO_CAD_ENTG_LGL, unidade.NM_UDD_NEG, dados.NM_CTBT, dados.NR_CPF, dados.NR_CNPJ order by 1 asc"
                
    return str_query
}

exports.detalhar_cliente =  function (id_cliente){

    let str_query = "select dados.ID_DDO_CAD_ENTG_LGL as id," +
        "CASE " +
	        "WHEN(dados.NR_CPF is not null and dados.NR_CNPJ is not null) THEN 'PF' " +
	        "WHEN(dados.NR_CPF is not null) THEN 'PF' " +
	        "WHEN(dados.NR_CNPJ is NOT NULL) THEN 'PJ' " +
        "END as tipo," +  
        "dados.NM_CTBT AS nome," + 
        "endereco.NM_LGR as logradouro, " +
        "Convert(VARCHAR(20), endereco.NR_LGR) as numero, " +
        "endereco.NM_BRO as bairro," +
        "endereco.NM_CDE as cidade," +
        "endereco.NR_CEP as cep," +
        "endereco.ID_UF as estado " +
		"FROM dbo.LGLCADDDO_CAD_ENTG_LGL dados " +
        "LEFT JOIN dbo.LGLCADEND endereco ON endereco.ID_DDO_CAD_ENTG_LGL = dados.ID_DDO_CAD_ENTG_LGL " +
        "WHERE dados.ID_DDO_CAD_ENTG_LGL = " + id_cliente

        return str_query
}

exports.detalhar_contribuinte =  function (unidade, cpfContribuinte, cnpjContribuinte, nomeContribuinte){

    let str_query = "select distinct dados.ID_DDO_CAD_ENTG_LGL as id," +
        "CASE " +
	        "WHEN(dados.NR_CPF is not null and dados.NR_CNPJ is not null) THEN 'PF' " +
	        "WHEN(dados.NR_CPF is not null) THEN 'PF' " +
	        "WHEN(dados.NR_CNPJ is NOT NULL) THEN 'PJ' " +
        "END as tipo," +  
        "dados.NM_CTBT AS nome," + 
        "convert(varchar, dados.DT_NSC, 103) as nascimento," + 
        "dados.NR_CPF AS cpf," +
        "dados.NR_CNPJ AS cnpj," +
        //"endereco.NM_LGR + ' ' +  Convert(VARCHAR(20), endereco.NR_LGR) + ' ' + ISNULL( endereco.DS_CPL_LGR , '' ) as logradouro," +
        "endereco.NM_LGR as logradouro, " +
        "Convert(VARCHAR(20), endereco.NR_LGR) as numero, " +
        "endereco.NM_BRO as bairro," +
        "endereco.NM_CDE as cidade," +
        "endereco.NR_CEP as cep," +
        "endereco.ID_UF as estado, " +
        "sistema.NM_SIS_ORI as sistemaOrigem " +
		"FROM dbo.LGLCADDDO_CAD_ENTG_LGL dados " +
        "INNER JOIN dbo.LGLCADEND endereco ON endereco.ID_DDO_CAD_ENTG_LGL = dados.ID_DDO_CAD_ENTG_LGL " +
        "INNER JOIN GDRDOMSIS_ORI sistema ON dados.ID_SIS_ORI = sistema.ID_SIS_ORI " +
        "INNER JOIN dbo.LGLMVFNAPU movimento ON movimento.ID_DDO_CAD_ENTG_LGL = dados.ID_DDO_CAD_ENTG_LGL " +
        "WHERE 1=1 "

        if (unidade){
            str_query = str_query + " AND dados.ID_UDD_NEG= " + unidade
        }

        if (cpfContribuinte){
            //str_query = str_query + " AND dados.NR_CPF = '" + cpfContribuinte + "'"
            str_query = str_query + " AND dados.NR_CPF = CAST(CAST('"+ cpfContribuinte +"' AS BIGINT) AS VARCHAR)" 
        }

        if (cnpjContribuinte){
            str_query = str_query + " AND dados.NR_CNPJ = '" + cnpjContribuinte + "'"
        }

        if (nomeContribuinte){
            str_query = str_query + " AND dados.NM_CTBT = '" + nomeContribuinte + "'"
        }

        return str_query
}

exports.consulta_movimentacao = function (cpf_cliente, tipoConsulta, dtInicial, dtFinal, nome, unidade) {
    
    dtInicial = dtInicial.split('/')
    dtFinal = dtFinal.split('/')

    dtInicial = dtInicial[2] + dtInicial[1] + dtInicial[0]
    dtFinal = dtFinal[2] + dtFinal[1] + dtFinal[0]

    let str_query

    if (tipoConsulta == "S"){

        str_query = "select " +
        "	ENTLGL.NM_CTBT as 'nome', " +
        "	COALESCE(ENTLGL.NR_CPF, ENTLGL.NR_CNPJ) as 'documento', " +
        "	format(ENQUADRAMENTO.NR_RET_RCT, '0000') as 'codigoRetencao', " +
        "	ENQUADRAMENTO.NR_EXTNS as 'codigoExtensao',"+
        "	ENQUADRAMENTO.NM_RET as 'descricaoRetencao', " +
        "	ENQUADRAMENTO.ID_VRB as 'codigoVerba', " +
        "	ENQUADRAMENTO.NM_VRB as 'descricaoVerba', " +
        "	SUM(ENQTRN.VL_CPO_INF) as 'valor' " +
        "From " +
        "	LGLCADDDO_CAD_ENTG_LGL ENTLGL " +
        "JOIN LGLCADMAT CADMAT on " +
        "	CADMAT.ID_DDO_CAD_ENTG_LGL = ENTLGL.ID_DDO_CAD_ENTG_LGL " +
        "JOIN LGLCTRENQ_TRN ENQTRN on " +
        "	CADMAT.NR_MAT = ENQTRN.NR_MAT " +
        "JOIN ( " +
        "	SELECT " +
        "		inf.ID_VIN_RET_VRB_CPO_INF, ret.ID_RET, ret.NM_RET, vrb.ID_VRB, vrb.NM_VRB, inf.ID_CPO_INF, inf.NM_CPO_BAS_LGL, rtv.NR_RET_RCT, ret.NR_EXTNS " +
        "	from " +
        "		LGLCADVIN_RET_VRB_CPO_INF INF " +
        "	inner join LGLCADRET_VRB rtv on " +
        "		rtv.ID_RET_VRB = inf.ID_RET_VRB " +
        "	inner join LGLCADRET ret on " +
        "		ret.ID_RET = rtv.ID_RET " +
        "	inner join LGLCADVRB vrb on " +
        "		vrb.ID_VRB = rtv.ID_VRB) as ENQUADRAMENTO ON " +
        "	ENQUADRAMENTO.ID_VIN_RET_VRB_CPO_INF = ENQTRN.ID_VIN_RET_VRB_CPO_INF " +
        "WHERE " +
        "	1 = 1 " +
        "	AND ENTLGL.NM_CTBT LIKE '%"+ nome +"%' " +
        "	AND ENTLGL.NR_CPF = " + "CAST(CAST('"+ cpf_cliente +"' AS BIGINT) AS VARCHAR)" +
        "	AND CADMAT.ID_TP_PLA IN (1, 2, 3)  " +
        "	AND CADMAT.ID_TBU_OPC IN (1, 2, 3) " +
        "	AND ENTLGL.ID_UDD_NEG = " + unidade +
        "	AND ENQTRN.DT_TRN BETWEEN '"+ dtInicial +"' AND '"+ dtFinal + " 23:59:00" + "' " +
        "GROUP BY " +
        "	ENTLGL.NM_CTBT, " +
        "	ENTLGL.NR_CPF, " +
        "	ENTLGL.NR_CNPJ, " +
        "	ENQUADRAMENTO.NR_RET_RCT, " +
        "	ENQUADRAMENTO.NM_RET, " +
        "	ENQUADRAMENTO.ID_VRB, " +
        "	ENQUADRAMENTO.NM_VRB, " +
        "   ENQUADRAMENTO.NR_EXTNS"

    }else if(tipoConsulta == "A"){

            str_query = "select " +
            "ENQTRN.ID_CTR_ENQ_TRN as 'id'," +
            "ENTLGL.NM_CTBT as 'nome'," +
            "CADMAT.NR_MAT as 'matricula'," +
            "COALESCE(ENTLGL.NR_CPF, ENTLGL.NR_CNPJ) as 'documento'," + 
            "format(ENQUADRAMENTO.NR_RET_RCT, '0000') as 'codigoRetencao'," +
            "ENQUADRAMENTO.NR_EXTNS as 'codigoExtensao',"+
            "ENQUADRAMENTO.NM_RET as 'descricaoRetencao'," +
            "ENQUADRAMENTO.ID_VRB as 'codigoVerba'," +
            "ENQUADRAMENTO.NM_VRB as 'descricaoVerba'," +
            "ENQTRN.VL_CPO_INF as 'valor'," +
            "convert(varchar,ENQTRN.DT_TRN, 103) as 'data'," +
            "convert(varchar,ENQTRN.DT_CRI, 103) as 'dataCriacao'," +
            "(SELECT NM_USR FROM GDRUSUCAD where ID_USR = ENQTRN.ID_USR) as 'criadoPor'," +
            "convert(varchar,ENQTRN.DT_ULT_ALT, 103) as 'dataAlteracao'," +
            "(SELECT NM_USR FROM GDRUSUCAD where ID_USR = ENQTRN.ID_USR_ALT) as 'alteradoPor'" +
            "From " +
            "	LGLCADDDO_CAD_ENTG_LGL ENTLGL " +
            "JOIN LGLCADMAT CADMAT on " +
            "	CADMAT.ID_DDO_CAD_ENTG_LGL = ENTLGL.ID_DDO_CAD_ENTG_LGL " +
            "JOIN LGLCTRENQ_TRN ENQTRN on " +
            "	CADMAT.NR_MAT = ENQTRN.NR_MAT " +
            "JOIN ( " +
            "	SELECT " +
            "		inf.ID_VIN_RET_VRB_CPO_INF, ret.ID_RET, ret.NM_RET, vrb.ID_VRB, vrb.NM_VRB, inf.ID_CPO_INF, inf.NM_CPO_BAS_LGL, rtv.NR_RET_RCT, ret.NR_EXTNS " +
            "	from " +
            "		LGLCADVIN_RET_VRB_CPO_INF INF " +
            "	inner join LGLCADRET_VRB rtv on " +
            "		rtv.ID_RET_VRB = inf.ID_RET_VRB " +
            "	inner join LGLCADRET ret on " +
            "		ret.ID_RET = rtv.ID_RET " +
            "	inner join LGLCADVRB vrb on " +
            "		vrb.ID_VRB = rtv.ID_VRB) as ENQUADRAMENTO ON " +
            "	ENQUADRAMENTO.ID_VIN_RET_VRB_CPO_INF = ENQTRN.ID_VIN_RET_VRB_CPO_INF " +
            "WHERE " +
            "	1 = 1 " +
            "	AND ENTLGL.NM_CTBT LIKE '%"+ nome +"%' " +
            "	AND ENTLGL.NR_CPF = " + "CAST(CAST('"+ cpf_cliente +"' AS BIGINT) AS VARCHAR)" +
            "	AND CADMAT.ID_TP_PLA IN (1, 2, 3)  " +
            "	AND CADMAT.ID_TBU_OPC IN (1, 2, 3) " +
            "	AND ENTLGL.ID_UDD_NEG = " + unidade +
            "	AND ENQTRN.DT_TRN BETWEEN '"+ dtInicial +"' AND '"+ dtFinal + " 23:59:00" + "' "
    }

    return str_query
}

exports.valida_movimentacao = function (idMovimentacao) {
    
    str_query = "select * From LGLCTRENQ_TRN ENQTRN WHERE ENQTRN.ID_CTR_ENQ_TRN = " + idMovimentacao    
    
    return str_query
}

exports.consulta_retencao = function () {
    
    str_query = "select DISTINCT format(NR_RET_RCT ,'0000') as codigoRetencao from LGLCADRET_VRB"
    /* str_query = "select DISTINCT format(a.NR_RET_RCT ,'0000') as codigoRetencao," +
                "b.DS_RET as descricaoRetencao " +
                "from LGLCADRET_VRB a " +
                "INNER JOIN LGLCADRET b ON b.ID_RET = a.ID_RET" */

    return str_query
}

exports.consulta_extensao = function (idRetencao) {
    
    str_query = "SELECT distinct B.NR_EXTNS as codigoExtensao " + 
                "FROM LGLCADRET_VRB A "+
                "INNER JOIN LGLCADRET B ON A.ID_RET = B.ID_RET " + 
                "INNER JOIN LGLCADVRB C ON A.ID_VRB = C.ID_VRB " +
                "WHERE A.NR_RET_RCT = " + idRetencao

    return str_query
}

exports.consulta_enquadramento = function (nrRetencao, nrExtensao) {
    
    str_query = "SELECT format(A.NR_RET_RCT ,'0000') as codigoRetencao , B.NR_EXTNS as codigoExtensao, B.NM_RET as descricaoRetencao, C.NR_VRB as codigoVerba, C.NM_VRB as descricaoVerba " +
                "FROM LGLCADRET_VRB A " +
                "INNER JOIN LGLCADRET B ON A.ID_RET = B.ID_RET " +
                "INNER JOIN LGLCADVRB C ON A.ID_VRB = C.ID_VRB " + 
                "WHERE A.NR_RET_RCT = " + nrRetencao +
                " AND B.NR_EXTNS  = " + nrExtensao + 
                " ORDER BY A.NR_RET_RCT, B.NR_EXTNS, B.NM_RET, C.NR_VRB, C.NM_VRB"

    return str_query
}

exports.consulta_unidade_negocio = function () {

    str_query = "select unidadeNegocio.ID_UDD_NEG as idUnidade, unidadeNegocio.NM_UDD_NEG as descricaoUnidade FROM DCOCADUDD_NEG unidadeNegocio"

    return str_query
}

exports.get_ID_VIN_RET_VRB_CPO_INF = function (codRetencao, codExtensao, codVerba) {
    
    str_query = "SELECT inf.ID_VIN_RET_VRB_CPO_INF " +
                "from LGLCADVIN_RET_VRB_CPO_INF INF " +
                "inner join LGLCADRET_VRB rtv on " +
	            "rtv.ID_RET_VRB = inf.ID_RET_VRB " +
                "inner join LGLCADRET ret on " +
	            "ret.ID_RET = rtv.ID_RET " +
                "inner join LGLCADVRB vrb on " +
	            "vrb.ID_VRB = rtv.ID_VRB " +
                "WHERE rtv.NR_RET_RCT = " + codRetencao + " " +
                "AND ret.NR_EXTNS = " + codExtensao + " " +
                "AND vrb.NR_VRB = " + codVerba

    return str_query
}

exports.detalhar_movimentacao = function (idMovimentacao) {

    str_query = "select " +
    "	ENQTRN.ID_CTR_ENQ_TRN as 'id', " +    
    "	ENTLGL.NM_CTBT as 'nome', " +
    "	CADMAT.NR_MAT as 'matricula', " +
    "	COALESCE(ENTLGL.NR_CPF, ENTLGL.NR_CNPJ) as 'documento', " +
    "	format(ENQUADRAMENTO.NR_RET_RCT, '0000') as 'codigoRetencao', " +
    "	ENQUADRAMENTO.NR_EXTNS as 'codigoExtensao', " +
    "	ENQUADRAMENTO.NM_RET as 'descricaoRetencao', " +
    "	ENQUADRAMENTO.ID_VRB as 'codigoVerba', " +
    "	ENQUADRAMENTO.NM_VRB as 'descricaoVerba', " +
    "	ENQTRN.VL_CPO_INF as 'valor', " +
    "	convert(varchar, ENQTRN.DT_TRN, 103) as 'data', " +
    "	convert(varchar, ENQTRN.DT_CRI, 103) as 'dataCriacao', " +
    "	( " +
    "	SELECT " +
    "		NM_USR " +
    "	FROM " +
    "		GDRUSUCAD " +
    "	where " +
    "		ID_USR = ENQTRN.ID_USR) as 'criadoPor', " +
    "	convert(varchar, ENQTRN.DT_ULT_ALT, 103) as 'dataAlteracao', " +
    "	( " +
    "	SELECT " +
    "		NM_USR " +
    "	FROM " +
    "		GDRUSUCAD " +
    "	where " +
    "		ID_USR = ENQTRN.ID_USR_ALT) as 'alteradoPor' " +
    "	From LGLCADDDO_CAD_ENTG_LGL ENTLGL " +
    "JOIN LGLCADMAT CADMAT on " +
    "	CADMAT.ID_DDO_CAD_ENTG_LGL = ENTLGL.ID_DDO_CAD_ENTG_LGL " +
    "JOIN LGLCTRENQ_TRN ENQTRN on " +
    "	CADMAT.NR_MAT = ENQTRN.NR_MAT " +
    "JOIN ( " +
    "	SELECT " +
    "		inf.ID_VIN_RET_VRB_CPO_INF, ret.ID_RET, ret.NM_RET, vrb.ID_VRB, vrb.NM_VRB, inf.ID_CPO_INF, inf.NM_CPO_BAS_LGL, rtv.NR_RET_RCT, ret.NR_EXTNS " +
    "	from " +
    "		LGLCADVIN_RET_VRB_CPO_INF INF " +
    "	inner join LGLCADRET_VRB rtv on " +
    "		rtv.ID_RET_VRB = inf.ID_RET_VRB " +
    "	inner join LGLCADRET ret on " +
    "		ret.ID_RET = rtv.ID_RET " +
    "	inner join LGLCADVRB vrb on " +
    "		vrb.ID_VRB = rtv.ID_VRB) as ENQUADRAMENTO ON " +
    "	ENQUADRAMENTO.ID_VIN_RET_VRB_CPO_INF = ENQTRN.ID_VIN_RET_VRB_CPO_INF " +
    "WHERE ENQTRN.ID_CTR_ENQ_TRN = " + idMovimentacao

    return str_query
}

exports.get_gdrusucad = function (nmLoginUser){

    str_query = "SELECT g.ID_USR FROM GDRUSUCAD g where g.NM_LGI_USR = '" + nmLoginUser +"'"

    return str_query
}

exports.get_matriculas = function(idEntidade){

    str_query = "SELECT CADMAT.NR_MAT as 'matricula' from LGLCADDDO_CAD_ENTG_LGL LGLENT JOIN LGLCADMAT CADMAT ON CADMAT.ID_DDO_CAD_ENTG_LGL = LGLENT.ID_DDO_CAD_ENTG_LGL WHERE LGLENT.ID_DDO_CAD_ENTG_LGL = " + idEntidade

    return str_query
}