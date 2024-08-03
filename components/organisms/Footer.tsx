// component
import Link from "next/link";

const Footer = ({ className }: { className: String }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`p-4 ${className}`}>
      <div className="flex justify-center items-center text-sm font-light text-center">
        <p>
          <span className="mr-2">© {currentYear} Masaki Nishi</span>
          <br className="sm:hidden block" />
          <Link href="/user-terms/">利用規約</Link> |{" "}
          <Link href="/privacy-policy/">プライバシーポリシー</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
