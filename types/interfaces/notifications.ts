export type NotificationTypes = 'success' | 'error' | 'info';

export type Notification = {
  id: number;
  message: string;
  autoHideDuration: number;
  type: NotificationTypes;
  direction: string;
  position: string;
};
