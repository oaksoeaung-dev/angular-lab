export interface ToastDataModel {
  message: string;
  tone: ToastTone;
}

export type ToastTone = 'success' | 'danger';
