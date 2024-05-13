const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r  from-indigo-500 via-indigo-400  to-indigo-500">
      {children}
    </main>
  );
};
export default Layout;
