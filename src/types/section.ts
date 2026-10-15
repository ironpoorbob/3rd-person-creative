/** Shared by component props and content validation. Light is brand cream. */
export const colorModes = ['white', 'light', 'orange', 'dark'] as const;

export type ColorMode = (typeof colorModes)[number];

export interface SectionColorProps {
  colorMode?: ColorMode;
}
