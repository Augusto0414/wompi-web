const COLORS = {
  BASE: "#101828",
  WHITE: "#ffffff",
  GRAY_50: "#f9fafb",
  GRAY_100: "#f3f4f6",
  GRAY_300: "#d1d5db",
  GRAY_500: "#6b7280",
  GRAY_600: "#4b5563",
  GRAY_700: "#374151",
  GRAY_900: "#111827",
} as const;

export const styles = {
  whiteBg: { backgroundColor: COLORS.WHITE },
  gray50Bg: { backgroundColor: COLORS.GRAY_50 },
  textGray300: { color: COLORS.GRAY_300 },
  textGray500: { color: COLORS.GRAY_500 },
  textGray600: { color: COLORS.GRAY_600 },
  textGray700: { color: COLORS.GRAY_700 },
  textGray900: { color: COLORS.GRAY_900 },
  textWhite: { color: COLORS.WHITE },
  borderGray100: { borderColor: COLORS.GRAY_100 },
  baseColorBg: { backgroundColor: COLORS.BASE },
  baseColorText: { color: COLORS.BASE },
  baseColorBorder: { borderColor: COLORS.BASE },
  approvedBadge: { backgroundColor: COLORS.GRAY_50, color: COLORS.BASE },
  itemQuantity: { backgroundColor: COLORS.GRAY_50, color: COLORS.GRAY_600 },
};
