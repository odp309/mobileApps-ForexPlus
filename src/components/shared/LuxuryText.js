import React from "react";
import { Text, StyleSheet } from "react-native";
import sizes from "../../theme/sizes";

// Paragraph Text
const ParagraphText = ({ children, style }) => {
  return <Text style={[styles.paragraphs, style]}>{children}</Text>;
};

// Body Small Text
const BodySmallText = ({ children, style }) => {
  return <Text style={[styles.bodysmall, style]}>{children}</Text>;
};

// Body Regular Text
const BodyRegularText = ({ children, style }) => {
  return <Text style={[styles.bodyregular, style]}>{children}</Text>;
};
// Body Large Text
const BodyLargeText = ({ children, style }) => {
  return <Text style={[styles.bodylarge, style]}>{children}</Text>;
};
// Heading Six Text
const HeadingSixText = ({ children, style }) => {
  return <Text style={[styles.headingsix, style]}>{children}</Text>;
};
// Heading Five Text
const HeadingFiveText = ({ children, style }) => {
  return <Text style={[styles.headingfive, style]}>{children}</Text>;
};
// Heading Four Text
const HeadingFourText = ({ children, style }) => {
  return <Text style={[styles.headingfour, style]}>{children}</Text>;
};
// Heading Three Text
const HeadingThreeText = ({ children, style }) => {
  return <Text style={[styles.headingthree, style]}>{children}</Text>;
};
// Heading Two Text
const HeadingTwoText = ({ children, style }) => {
  return <Text style={[styles.headingtwo, style]}>{children}</Text>;
};
// Heading One Text
const HeadingOneText = ({ children, style }) => {
  return <Text style={[styles.headingone, style]}>{children}</Text>;
};

// Styles for each custom text component
const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.medium,
    lineHeight: sizes.lineHeight.large,
  },
  bodysmall: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.small,
    lineHeight: sizes.lineHeight.small,
  },
  bodyregular: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.medium,
    lineHeight: sizes.lineHeight.small,
  },
  bodylarge: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.large,
    lineHeight: sizes.lineHeight.small,
  },
  headingsix: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl,
    lineHeight: sizes.lineHeight.large,
  },
  headingfive: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl2,
    lineHeight: sizes.lineHeight.xl,
  },
  headingfour: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl3,
    lineHeight: sizes.lineHeight.xl2,
  },
  headingthree: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl4,
    lineHeight: sizes.lineHeight.xl3,
  },
  headingtwo: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl5,
    lineHeight: sizes.lineHeight.xl4,
  },
  headingone: {
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.xl6,
    lineHeight: sizes.lineHeight.xl5,
  },
});

export {
  ParagraphText,
  BodySmallText,
  BodyRegularText,
  BodyLargeText,
  HeadingSixText,
  HeadingFiveText,
  HeadingFourText,
  HeadingThreeText,
  HeadingTwoText,
  HeadingOneText,
};
