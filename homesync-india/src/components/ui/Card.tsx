import React from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string; // Kept for backward compatibility
  contentClassName?: string; // Kept for backward compatibility
  style?: ViewStyle;
}

export const Card = ({
  children,
  title,
  style,
  // Ignored props for compatibility
  className,
  contentClassName,
}: CardProps) => {
  return (
    <PaperCard style={[styles.card, style]}>
      {title && (
        <PaperCard.Title 
          title={title} 
          titleStyle={styles.cardTitle}
        />
      )}
      <PaperCard.Content style={styles.cardContent}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardContent: {
    paddingTop: 0,
  },
});

export default Card;
