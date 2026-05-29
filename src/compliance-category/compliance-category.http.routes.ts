export const ComplianceCategoryParentRoute = 'compliance-category';

export const ComplianceCategoryRoutes = {
  create: 'create',
  update: 'update/:complianceCategoryId',
  delete: ':id',
  view_one: 'complianceCategoryById/:id',
  view_all: 'view-all',
  getComplianceCategoryByIndustryId: 'getComplianceCategoryByIndustryId/:industryId'
};
