export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
} 