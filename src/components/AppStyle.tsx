import { StyleSheet } from 'react-native';
import { colors, spacing, layout, shadows, fontSizes, fontWeights } from '../common';

export const timerItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.padding.lg,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timerInfo: {
    flex: 1,
  },
  timerName: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  timerTime: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.primary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.progressBackground,
    borderRadius: 3,
    marginRight: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.progress,
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.subtitle,
    color: colors.textSecondary,
    minWidth: 40,
  },
  alertContainer: {
    backgroundColor: '#FFF3CD',
    padding: layout.padding.sm,
    borderRadius: layout.borderRadius.md,
    marginBottom: spacing.md,
  },
  alertText: {
    fontSize: fontSizes.small,
    color: '#856404',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: layout.padding.sm,
    paddingHorizontal: layout.padding.md,
    borderRadius: layout.borderRadius.md,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.success,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resetButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.subtitle,
  },
});