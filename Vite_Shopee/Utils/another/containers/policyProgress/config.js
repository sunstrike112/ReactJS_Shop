const dataPayloadMain = ({ data, employeeId, policyProgress }) => ({
  employeeId,
  policyProgress: data.policyProgress?.trim() || null,
  fiscalYear: data.fiscalYear?.slice(0, 4) || null,
  tobeFyFiscal: data.tobeFyFiscal || null,
  tobeFyFiscalPlus1: data.tobeFyFiscalPlus1 || null,
  tobeFyFiscalPlus2: data.tobeFyFiscalPlus2 || null,
  tobeFyFiscalPlus3: data.tobeFyFiscalPlus3 || null,
  asis: data.asis?.trim() || null,
  riskSelection: data.riskSelection || null,
  riskDescription: data.riskDescription?.trim() || null,
  assignDescription: data.assignDescription?.trim() || null,
  policy: data.policy,
  version: policyProgress.version,
});

export { dataPayloadMain };
