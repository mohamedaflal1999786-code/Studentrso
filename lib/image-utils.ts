/**
 * Utility to validate and process student profile pictures
 * Enforces a strict 2MB maximum file size limit
 */

export const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please choose an image file (JPEG, PNG, WEBP, or GIF).' };
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size is ${sizeInMb}MB. Maximum allowed profile picture size is 2MB.`,
    };
  }

  return { valid: true };
}

export function processAvatarFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return reject(new Error(validation.error || 'Invalid file.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image file.'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 400; // Optimal square size for avatars
          let width = img.width;
          let height = img.height;

          // Crop or scale while preserving aspect ratio
          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(reader.result as string);
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          resolve(dataUrl);
        } catch {
          // Fallback to direct raw base64 if canvas operation fails
          resolve(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
