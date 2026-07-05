/**
 * Minimal className combiner — joins truthy class fragments with a space.
 * Avoids a dependency for what is a three-line utility.
 */
type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
