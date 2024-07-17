// component
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ml-[320px] py-4">
      <div className="flex justify-center items-center text-sm font-light">
        <p>
          <span className="mr-2">© {currentYear} Masaki Nishi</span>{" "}
          <Link href="/user-terms/">利用規約</Link> |{" "}
          <Link href="/privacy-policy/">プライバシーポリシー</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
