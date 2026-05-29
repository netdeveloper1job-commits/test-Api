"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceTrackerRoutes = exports.ComplianceTrackerParentRoute = void 0;
exports.ComplianceTrackerParentRoute = 'compliance-tracker';
exports.ComplianceTrackerRoutes = {
    create: 'create',
    update: 'update/:complianceTrackerId',
    delete: ':id',
    view_one: 'complianceTrackerById/:id',
    view_all: 'view-all',
    getComplianceTrackerByComplianceCategoryId: 'getComplianceTrackerByComplianceCategoryId/:complianceCategoryId',
};
//# sourceMappingURL=compliance-tracker.http.routes.js.map