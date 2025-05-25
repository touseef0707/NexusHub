import { toast as hotToast } from 'react-hot-toast';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export const toast = ({ title, description, variant = 'default' }: ToastProps) => {
  // If it's a destructive toast, use error styling
  if (variant === 'destructive') {
    return hotToast.error(description || title || 'An error occurred');
  }
  
  // Otherwise use success styling
  return hotToast.success(description || title || 'Success');
}; 