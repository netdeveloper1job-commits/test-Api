export const ComplianceTrackerParentRoute = 'compliance-tracker';

export const ComplianceTrackerRoutes = {
  create: 'create',
  update: 'update/:complianceTrackerId',
  delete: ':id',
  view_one: 'complianceTrackerById/:id',
  view_all: 'view-all',
  getComplianceTrackerByComplianceCategoryId:
    'getComplianceTrackerByComplianceCategoryId/:complianceCategoryId',
};
