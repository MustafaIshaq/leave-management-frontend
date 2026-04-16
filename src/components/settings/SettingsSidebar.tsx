"use client";

type SettingsTab =
  | "general"
  | "carry-forward"
  | "leave-types"
  | "departments"
  | "public-holidays";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onChangeTab: (tab: SettingsTab) => void;
}

const tabs: { key: SettingsTab; label: string }[] = [
  { key: "general", label: "General" },
  { key: "carry-forward", label: "Carry forward" },
  { key: "leave-types", label: "Leave types" },
  { key: "departments", label: "Departments" },
  { key: "public-holidays", label: "Public holidays" },
];

export default function SettingsSidebar({
  activeTab,
  onChangeTab,
}: SettingsSidebarProps) {
  return (
    <aside className="w-full lg:w-64">
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChangeTab(tab.key)}
              className={`border-l-4 px-6 py-4 text-left text-2xl transition ${
                isActive
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}