export const ComplianceConfigParentRoute = 'compliance-config';

export const ComplianceConfigRoutes = {
  create: 'create',
  update: 'update/:complianceConfigId',
  delete: ':id',
  view_one: 'complianceConfigById/:id',
  view_all: 'view-all',
  getComplianceConfigByComplianceCategoryId:
    'getComplianceConfigByComplianceCategoryId/:complianceCategoryId',
};
