function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-r  from-indigo-500 via-indigo-400  to-indigo-500">
      {children}
    </div>
  );
}
export default Layout;
