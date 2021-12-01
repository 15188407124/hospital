package com.hospital.mapper;

import com.hospital.bean.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 药品dao
 * 
 */
@Repository("drugsMapper")
public interface DrugsMapper {
	/**
	 * 药品的入库
	 * 
	 * @param drugs
	 */
	void drugsSave(Drugs drugs);

	/**
	 * 查询药品(根据ID)
	 * 
	 * @param id
	 * @return
	 */
	Drugs drugsFindById(@Param("id") String id);

	/**
	 * 更新药品
	 * 
	 * @param drugs
	 */
	void DrugsUpdate(Drugs drugs);

	/**
	 * 药品的条件查询
	 * 
	 * @param drugsCode
	 * @return
	 */
	List<Drugs> drugsFind(DrugsCode drugsCode);

	/**
	 * 根据药品编号查询是否在库存中含有该药品
	 * 
	 * @param drugId
	 * @return
	 */
	Integer drugsStockQueryById(@Param("drugId") String drugId);

	/**
	 * 更新库存
	 * 
	 * @param drugs
	 */
	void drugsStockAdd(Drugs drugs);

	/**
	 * 插入库存
	 * 
	 * @param drugs
	 */
	void drugsStockSave(Drugs drugs);

	/**
	 * 库存查询
	 */
	List<Stock> stockQuery(DrugsCode drugsCode);

	/**
	 * 药品发放
	 * 
	 * @param grant
	 */
	void grantAdd(Grant grant);

	/**
	 * 更新库存
	 */
	void stockUpdate(Grant grant);

	/**
	 * 药品发放查询
	 * 
	 * @param patientId
	 * @return
	 */
	List<Stock> grantQuery(@Param("patientId") String patientId);

	/**
	 * 退药
	 * 
	 * @param withdrawalDrug
	 */
	void DrugWithdrawal(WithdrawalDrug withdrawalDrug);

	/**
	 * 退药后更新用户拥有的药品数量
	 * @param withdrawalDrug
	 */
    void updateGrantDrugNum(WithdrawalDrug withdrawalDrug);
}
