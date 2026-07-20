export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface SetLog {
  weight: number;
  reps: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercise: string;
  sets: SetLog[];
  notes?: string;
}

export interface MealLog {
  id: string;
  date: string;
  mealType: MealType;
  title: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  photoUrl?: string;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  photoUrl: string;
  type: 'before' | 'after' | 'regular';
  weight?: number;
  bodyFat?: number;
  notes?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
}
