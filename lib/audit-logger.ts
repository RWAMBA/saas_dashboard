import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";

export type AuditAction = 
  | 'login'
  | 'logout'
  | 'data_export'
  | 'data_import'
  | 'settings_change'
  | 'user_invite'
  | 'role_change'
  | 'api_key_create'
  | 'api_key_revoke'
  | 'permission_denied';

export interface AuditLogData {
  action: AuditAction;
  details?: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
}

export class AuditLogger {
  static async log(data: AuditLogData) {
    const session = await getServerSession();
    const userId = data.userId || session?.user?.id;

    try {
      await prisma.auditLog.create({
        data: {
          action: data.action,
          details: data.details ? JSON.stringify(data.details) : null,
          userId: userId || null,
          ipAddress: data.ipAddress || null,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Don't throw - audit logging should not break main functionality
    }
  }

  static async getRecentLogs(limit = 50) {
    return prisma.auditLog.findMany({
      take: limit,
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
} 