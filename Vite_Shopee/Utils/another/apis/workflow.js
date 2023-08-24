export const apiWorkflow = {
  getImportProcessList: `mst/workflow-import/filter/import`,
  assignImportProcess: `mst/workflow-import/assign`,
  getListApproverAndAgent: `mst/workflow/users/admin`,
  getProcessListIncomplete: `mst/workflow/filter`,
  getProcessListCompleted: `mst/workflow/filter/completed`,
  getHistoryProcess: (matterNo) => `mst/workflow/history/${matterNo}`,
  getDetailProcess: (matterNo) => `mst/workflow/detail/${matterNo}`,
  updateProcess: `mst/workflow/process`,
};
