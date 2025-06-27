import Tab from "@/component/view-modify-cancel/tab";
import React from "react";
type TabType = {
  tabTitle: "modify" | "cancel" | "view";
};
const tabs: TabType[] = [
  {
    tabTitle: "cancel",
  },
  {
    tabTitle: "view",
  },
  {
    tabTitle: "modify",
  },
];
const page = () => {
  return (
    <div className=" flex items-center justify-center gap-7 flex-col">
      <h2 className=" text-left text-stone-200 text-2xl ">
        what are you looking for ?{" "}
      </h2>
      <Tab tabs={tabs} />
    </div>
  );
};

export default page;
