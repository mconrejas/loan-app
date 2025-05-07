import Navbar from '../components/Navbar'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Render Navbar */}
        <Navbar />
        {/* Render the child components of this layout */}
        {children}
      </body>
    </html>
  );
}
