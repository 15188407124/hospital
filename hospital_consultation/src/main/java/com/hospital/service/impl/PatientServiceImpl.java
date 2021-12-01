package com.hospital.service.impl;

import com.hospital.bean.OrderPatient;
import com.hospital.bean.Patient;
import com.hospital.bean.PatientCode;
import com.hospital.mapper.PatientMapper;
import com.hospital.service.PatientService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("patientService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class PatientServiceImpl implements PatientService {
	@Resource(name = "patientMapper")
	private PatientMapper patientMapper;

	@Override
	public void detailOrder(String patientId) {
		patientMapper.detailOrder(patientId);
	}

	@Override
	public void patientUpdateAdd(Patient patient) {
		patientMapper.patientUpdateAdd(patient);
	}

	@Override
	public void patientUpdateInfo(Patient patient) {
		patientMapper.patientUpdateInfo(patient);
	}

	@Override
	public void msgSave(int doctorId, int mark, String msg, String patientId) {
		patientMapper.msgSave(doctorId,mark,msg,patientId);
	}

	@Override
	public List<Map<String, Object>> patientQueryMsg(String patientId, int mark) {
		List<Map<String,Object>> list = patientMapper.patientQueryMsg(patientId,mark);
		return list;
	}

	@Override
	public List<OrderPatient> OrderQuery(String patientName, String  cerificateNo, int doctorId) {
		List<OrderPatient> list = patientMapper.OrderQuery(patientName,cerificateNo,doctorId);
		return list;
	}

	@Override
	public List<Map<String, Object>> patientQueryTotal() {
		List<Map<String,Object>> maps = patientMapper.patientQueryTotal();
		return maps;
	}

	@Override
	public List<Map<String, Object>> findPagePatientQuery(PatientCode patientCode) {
		List<Map<String,Object>> maps = patientMapper.findPagePatientQuery(patientCode);
		return maps;
	}

	@Override
	public List<Map<String, Object>> pagePatientQuery(int currNo, int pageSize) {
		List<Map<String, Object>> maps = patientMapper.pagePatientQuery(currNo, pageSize);
		return maps;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
	public void patientAdd(Patient patient) {
		patientMapper.patientAdd(patient);
	}

	@Override
	public List<Map<String, Object>> patientQuery(PatientCode patientCode) {
		return patientMapper.patientQuery(patientCode);
	}

	@Override
	public List<Map<String, Object>> patientQueryBycerificateNo(String cerificateNo) {
		return patientMapper.patientQueryBycerificateNo(cerificateNo);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void patientUpdate(Patient patient) {
		patientMapper.patientUpdate(patient);

	}

	@Override
	public void jiesuan(String patientId) {
		patientMapper.jiesun(patientId);

	}

	@Override
	public void patientLeave(String patientId) {
		patientMapper.patientLeave(patientId);

	}

	@Override
	public List<Map<String, Object>> patientStatistics(Map<String, Object> map) {
		int inHospitalTotal = 0;
		int outHospitalTotal = 0;
		// 查询入院统计
		List<Map<String, Object>> inList = patientMapper.inHospital(map);
		// 查询出所有的科室
		List<Map<String, Object>> list = patientMapper.departmentQuery(null);
		if (list != null) {
			for (Map<String, Object> okMap : list) {
				for (Map<String, Object> map2 : inList) {
					String id1 = okMap.get("parameter_values") + "";
					String id2 = map2.get("departmentId") + "";
					if (id1.equals(id2)) {
						okMap.put("inNum", map2.get("number"));
						inHospitalTotal = Integer.parseInt(map2.get("total").toString());
						okMap.put("inPercentage", map2.get("percentage"));
					}
				}
			}
		}
		// 查询出院统计
		List<Map<String, Object>> outList = patientMapper.outHospital(map);
		for (Map<String, Object> okMap : list) {
			for (Map<String, Object> map2 : outList) {
				String id1 = okMap.get("parameter_values") + "";
				String id2 = map2.get("departmentId") + "";
				if (id1.equals(id2)) {
					okMap.put("outNum", map2.get("number"));
					outHospitalTotal = Integer.parseInt(map2.get("total").toString());
					okMap.put("outPercentage", map2.get("percentage"));
				}
			}
		}
		for (Map<String, Object> okMap : list) {
			okMap.put("inTotal", inHospitalTotal);
			okMap.put("outTotal", outHospitalTotal);
		}
		return list;
	}

	@Override
	public List<Map<String,Object>> patientOrderQuery(int doctorId) {
		List<Map<String,Object>> list = patientMapper.patientOrderQuery(doctorId);
		return list;
	}
}
