import { View } from "react-native";
import {
  BodyMediumText,
  BodySmallText,
  HeadingSixText,
} from "../../shared/StyledText";
import { useEffect } from "react";
import colors from "../../../theme/colors";

const ResultTitleAndDate = ({ title, subTitle, date }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <HeadingSixText style={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </HeadingSixText>
      {subTitle === undefined ? (
        <View></View>
      ) : (
        <BodyMediumText style={{ fontWeight: "bold", textAlign: "center" }}>
          {subTitle}
        </BodyMediumText>
      )}

      <BodySmallText style={{ color: colors.color.lightGrey }}>
        {/* {date.slice(0,date.length-7)} */}
        {date}
      </BodySmallText>
    </View>
  );
};

export default ResultTitleAndDate;
