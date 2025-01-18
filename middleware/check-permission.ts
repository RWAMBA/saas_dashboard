import { AuditLogger } from '@/lib/audit-logger';
import { hasPermission } from '@/lib/permissions';
import { getCurrentUser } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
import type { Permission } from '@/lib/permissions';

export async function checkPermission(permission: Permission) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const hasRequiredPermission = hasPermission(session.role, permission);

  if (!hasRequiredPermission) {
    await AuditLogger.log({
      action: 'permission_denied',
      userId: session.id,
      details: {
        permission,
        role: session.role
      }
    });

    return NextResponse.json(
      { error: 'Permission denied' },
      { status: 403 }
    );
  }

  return NextResponse.next();
} 