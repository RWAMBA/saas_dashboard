export enum Permission {
  ViewAnalytics = 'view_analytics',
  ExportData = 'export_data',
  ImportData = 'import_data',
  ManageUsers = 'manage_users',
  ManageSettings = 'manage_settings',
  ViewAuditLogs = 'view_audit_logs',
  ManageApiKeys = 'manage_api_keys',
}

export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  Analyst = 'analyst',
  Viewer = 'viewer',
}

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.Admin]: Object.values(Permission),
  [Role.Manager]: [
    Permission.ViewAnalytics,
    Permission.ExportData,
    Permission.ImportData,
    Permission.ManageUsers,
  ],
  [Role.Analyst]: [
    Permission.ViewAnalytics,
    Permission.ExportData,
    Permission.ImportData,
  ],
  [Role.Viewer]: [
    Permission.ViewAnalytics,
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return RolePermissions[userRole]?.includes(permission) ?? false;
} 