import Navbar from '../components/Navbar'; 
// import App from '../components/admin';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Render Navbar */}
        <Navbar />
        {/* <App /> */}
        {/* Render the child components of this layout */}
        {children}
      </body>
    </html>
  );
}
