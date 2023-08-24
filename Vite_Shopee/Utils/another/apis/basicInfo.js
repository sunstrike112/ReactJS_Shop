export const apiBasicInfo = {
  filter: `/mst/basic-info/filter`,
  listNew: `/employee-list/filter`,
  filterSub: `/mst/basic-info-sub/filter`,
  update: (id) => `/mst/basic-info/${id}`,
  delete: (id) => `/mst/basic-info/${id}`,
  deleteSub: `/mst/basic-info-sub`,
  create: (id) => `/mst/basic-info/${id}`,
  createSub: `/mst/basic-info-sub`,
  updateSub: (id) => `/mst/basic-info-sub/${id}`,
  detailBasicInfoSub: (id) => `/mst/basic-info-sub/detail/${id}`,
};
