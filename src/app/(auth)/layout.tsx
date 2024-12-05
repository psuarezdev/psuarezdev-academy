export default async function AuthLayout({ children }: { children: React.ReactNode; }) {
  return (
    <main className="flex items-center justify-center h-full bg-gray-100 dark:bg-black">
      {children}
    </main>
  );
}