import React from "react";
import { View } from "react-native";
import BalanceHeader from "../../screens/BalanceHeaders/BalanceHeader";
import PicPayCardHeader from "../../screens/BalanceHeaders/PicPayCardHeader";

export default function ListItem({ item }) {
    
  return (
    <View>
      {item.title == "Balance" ? <BalanceHeader /> : <PicPayCardHeader />}
    </View>
  );
}
