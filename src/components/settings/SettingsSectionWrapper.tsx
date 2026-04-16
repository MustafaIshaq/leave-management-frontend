interface SettingsSectionWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSectionWrapper({
  title,
  description,
  children,
}: SettingsSectionWrapperProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-4xl font-light text-slate-800">{title}</h2>

      {description && (
        <p className="mb-6 text-xl text-slate-600">{description}</p>
      )}

      <div className="border-t pt-6">{children}</div>
    </section>
  );
}