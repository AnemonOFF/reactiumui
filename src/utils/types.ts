export const themedColors = ["background", "foreground", "primary", "secondary", "success", "warning", "error", "text", "link"] as const;

export type ThemedColors = typeof themedColors[number];