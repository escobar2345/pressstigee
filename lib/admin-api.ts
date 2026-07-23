/**
 * admin-api.ts
 * 
 * Admin API client for communicating with the Python backend.
 * All requests are made to http://localhost:8000/admin/api/*
 * 
 * Usage:
 *   import { adminAPI } from '@/lib/admin-api';
 *   const kpis = await adminAPI.getKPIs();
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_URL?.replace(/\/$/, "") ||
  "https://backend-acend.onrender.com";


interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class AdminAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        credentials: "include", // Include cookies for session
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      // Handle auth errors
      if (response.status === 401 || response.status === 403) {
        // Redirect to login or show error
        console.error("Admin auth failed");
        throw new Error("Unauthorized access");
      }

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} ${error}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET /api/kpis
   * Get main dashboard KPIs
   */
  async getKPIs() {
    return this.request<any>("/api/kpis");
  }

  /**
   * GET /api/stats
   * Get overall system statistics
   */
  async getStats() {
    return this.request<any>("/api/stats");
  }

  /**
   * GET /api/users
   * Get all users with optional pagination
   */
  async getUsers(skip: number = 0, limit: number = 100) {
    return this.request<any>(`/api/users?skip=${skip}&limit=${limit}`);
  }

  /**
   * GET /api/partners
   * Get all partners/non-admin users
   */
  async getPartners() {
    return this.request<any>("/api/partners");
  }

  /**
   * GET /api/revenue-trend
   * Get revenue data for charts
   */
  async getRevenueTrend() {
    return this.request<any>("/api/revenue-trend");
  }

  /**
   * GET /api/referrals-trend
   * Get referrals data for charts
   */
  async getReferralsTrend() {
    return this.request<any>("/api/referrals-trend");
  }

  /**
   * GET /api/payouts
   * Get pending payouts list
   */
  async getPayouts() {
    return this.request<any>("/api/payouts");
  }

  /**
   * GET /api/notifications-sent
   * Get notification history
   */
  async getNotificationsHistory() {
    return this.request<any>("/api/notifications-sent");
  }

  /**
   * POST /api/send-notification
   * Send notification to partners
   */
  async sendNotification(
    title: string,
    message: string,
    audience: string = "all"
  ) {
    return this.request<any>("/api/send-notification", {
      method: "POST",
      body: JSON.stringify({ title, message, audience }),
    });
  }

  /**
   * PUT /api/user/{user_id}/status
   * Update user/partner status
   */
  async updateUserStatus(userId: number, status: string) {
    return this.request<any>(`/api/user/${userId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  /**
   * POST /api/process-payout
   * Process payout for a partner
   */
  async processPayout(partnerId: number, amount: string) {
    return this.request<any>("/api/process-payout", {
      method: "POST",
      body: JSON.stringify({ partner_id: partnerId, amount }),
    });
  }

  /**
   * GET /api/services-breakdown
   * Get breakdown of services
   */
  async getServicesBreakdown() {
    return this.request<any>("/api/services-breakdown");
  }

  /**
   * GET /api/recent-activity
   * Get recent system activity
   */
  async getRecentActivity() {
    return this.request<any>("/api/recent-activity");
  }
}

// Export singleton instance
export const adminAPI = new AdminAPI();

export type { ApiResponse };
