export interface PendingPost {
    id: number;  // Auto-incremented field from the backend
    type: string; // Job, Internship, etc.
    content: string;
    adminId: number;
    createdAt: string; // You may use Date type depending on how you handle it
    approved: boolean;
}
