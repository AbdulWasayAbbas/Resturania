export default function Footer() {
  return (
    <footer className="text-center bg-[#800000] py-5 mt-0 border-t border-black">
      © {new Date().getFullYear()}  <span className="font-bold text-lg">Restaurania. </span> All rights reserved.
    </footer>
  );
}
