
import { UserMenu } from "@/components/auth/UserMenu";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <UserMenu />
      </div>
    </header>
  );
}
