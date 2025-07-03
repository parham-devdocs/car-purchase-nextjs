"use client";

import React, { ReactNode, useState } from "react";
import Button from "../Button";
import Form from "./form";
type Tab = {
  tabTitle: "modify" | "cancel" | "view";
};
const Tab = ({ tabs, bgColor }: { tabs: Tab[]; bgColor?: string }) => {
  const [selectedTab, setSelectedTab] = useState<"modify" | "cancel" | "view">(
    "view"
  );
  return (
    <div className=" flex flex-col items-center w-full gap-6">
      <div className={`   space-x-3 ${bgColor ? bgColor : " bg-transparent"}`}>
        {tabs.map((tab) => {
          return (
            <Button
              className={`${
                selectedTab === tab.tabTitle
                  ? " bg-violet-500 dark:bg-violet-800 "
                  : ""
              }`}
              key={tab.tabTitle}
              label={tab.tabTitle}
              fn={() => setSelectedTab(tab.tabTitle)}
            />
          );
        })}
      </div>
      <Form action={selectedTab} />
    </div>
  );
};

export default Tab;
